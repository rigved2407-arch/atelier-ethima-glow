import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/page-shell";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ethima" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

const ADMIN_EMAIL = "hello@ethima.in";
type Tab = "orders" | "consultations";

function Admin() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) { window.location.href = "/auth?redirect=/admin"; return; }
    if (user.email !== ADMIN_EMAIL) { window.location.href = "/account"; return; }
  }, [user, loading]);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return;
    (async () => {
      setFetching(true);
      setError("");
      const [o, b] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      ]);
      if (o.error) { setError(o.error.message); setFetching(false); return; }
      if (b.error) { setError(b.error.message); setFetching(false); return; }
      setOrders(o.data ?? []);
      setBookings(b.data ?? []);
      setFetching(false);
    })();
  }, [user]);

  async function updateOrderStatus(id: string, status: string) {
    const { error: err } = await supabase.from("orders").update({ status }).eq("id", id);
    if (err) { toast.error(err.message); return; }
    toast.success("Status updated");
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  async function updateBookingStatus(id: string, status: string) {
    const { error: err } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (err) { toast.error(err.message); return; }
    toast.success("Status updated");
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  async function deleteOrder(id: string) {
    if (!confirm("Delete this order permanently?")) return;
    const { error: err } = await supabase.from("orders").delete().eq("id", id);
    if (err) { toast.error(err.message); return; }
    toast.success("Deleted");
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  async function deleteBooking(id: string) {
    if (!confirm("Delete this consultation permanently?")) return;
    const { error: err } = await supabase.from("bookings").delete().eq("id", id);
    if (err) { toast.error(err.message); return; }
    toast.success("Deleted");
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center">
        <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-champagne" />
      </div>
    );
  }

  if (!user) return null;

  const tabBtn = (t: Tab, label: string) => (
    <button key={t} onClick={() => setTab(t)}
      className={`border px-5 py-2.5 text-xs tracking-[0.16em] uppercase transition-all ${tab === t ? "border-champagne bg-champagne/10 text-champagne" : "border-border text-ivory/75 hover:border-champagne/50"}`}>
      {label} ({t === "orders" ? orders.length : bookings.length})
    </button>
  );

  return (
    <PageShell eyebrow="Atelier admin" title="Dashboard." intro="Manage orders and consultations.">
      <div className="mb-8 flex flex-wrap gap-3">
        {tabBtn("orders", "Orders")}
        {tabBtn("consultations", "Consultations")}
      </div>

      {fetching ? (
        <div className="flex items-center gap-3 text-sm text-ivory/60">
          <LoaderCircle className="h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : error ? (
        <div className="border border-red-500/40 bg-red-500/10 p-5">
          <p className="text-sm text-red-300">Failed to load:</p>
          <p className="mt-1 text-sm text-red-200/80">{error}</p>
        </div>
      ) : tab === "orders" && orders.length === 0 ? (
        <p className="text-sm text-ivory/50">No orders yet.</p>
      ) : tab === "consultations" && bookings.length === 0 ? (
        <p className="text-sm text-ivory/50">No consultations yet.</p>
      ) : tab === "orders" ? (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="border border-border p-5 bg-[oklch(0.16_0.025_200/0.6)]">
              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg text-ivory">{o.customer_name}</p>
                  <p className="text-sm text-ivory/65">{o.customer_email} · {o.customer_phone}</p>
                  <p className="mt-3 text-sm text-ivory/80">
                    {o.items?.map((i: any) => `${i.product} (${i.metal}) × ${i.quantity}`).join(", ")}
                  </p>
                  <p className="mt-1 text-sm text-champagne">₹{(o.total ?? 0).toLocaleString("en-IN")}</p>
                  {o.notes && <p className="mt-2 text-sm text-ivory/60 italic">"{o.notes}"</p>}
                  <p className="mt-2 text-xs text-ivory/40">{new Date(o.created_at).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="border border-border bg-transparent px-3 py-2 text-xs text-ivory">
                    {["pending","contacted","advance_paid","in_production","shipped","completed","cancelled"].map((s) => (
                      <option key={s} className="bg-background">{s}</option>
                    ))}
                  </select>
                  <button onClick={() => deleteOrder(o.id)}
                    className="text-[0.65rem] tracking-[0.28em] uppercase text-ivory/50 hover:text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="border border-border p-5 bg-[oklch(0.16_0.025_200/0.6)]">
              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg text-ivory">{b.full_name}</p>
                  <p className="text-sm text-ivory/65">{b.email} {b.phone && `· ${b.phone}`}</p>
                  <p className="mt-2 text-sm text-ivory/80">{b.consultation_type} · {b.mode} · {b.preferred_date} · {b.preferred_time}</p>
                  {b.vision && <p className="mt-2 text-sm text-ivory/60 italic">"{b.vision}"</p>}
                  <p className="mt-2 text-xs text-ivory/40">{new Date(b.created_at).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <select value={b.status} onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                    className="border border-border bg-transparent px-3 py-2 text-xs text-ivory">
                    {["pending","confirmed","completed","cancelled"].map((s) => (
                      <option key={s} className="bg-background">{s}</option>
                    ))}
                  </select>
                  <button onClick={() => deleteBooking(b.id)}
                    className="text-[0.65rem] tracking-[0.28em] uppercase text-ivory/50 hover:text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
