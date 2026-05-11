import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/page-shell";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — ethima" }] }),
  component: Admin,
});

type Tab = "bookings" | "requests" | "messages";

function Admin() {
  const { user, loading, isAdmin } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav({ to: "/auth" }); return; }
    if (!isAdmin) { nav({ to: "/account" }); return; }
  }, [user, loading, isAdmin, nav]);

  async function refresh() {
    const [b, r, m] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("customisation_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    setBookings(b.data ?? []);
    setRequests(r.data ?? []);
    setMessages(m.data ?? []);
  }
  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin]);

  async function setStatus(table: "bookings" | "customisation_requests", id: string, status: string) {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Updated"); refresh(); }
  }
  async function del(table: string, id: string) {
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); refresh(); }
  }

  if (!isAdmin) return <PageShell eyebrow="" title="Loading..."><div /></PageShell>;

  return (
    <PageShell eyebrow="Atelier admin" title="Dashboard." intro="Manage consultations, customisation requests, and messages.">
      <div className="mb-8 flex flex-wrap gap-3">
        {(["bookings", "requests", "messages"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`border px-5 py-2.5 text-xs tracking-[0.16em] uppercase transition-all ${tab === t ? "border-champagne bg-champagne/10 text-champagne" : "border-border text-ivory/75 hover:border-champagne/50"}`}>
            {t} ({t === "bookings" ? bookings.length : t === "requests" ? requests.length : messages.length})
          </button>
        ))}
      </div>

      {tab === "bookings" && (
        <ul className="space-y-3">{bookings.map((b) => (
          <li key={b.id} className="border border-border p-5 bg-[oklch(0.16_0.025_200/0.6)]">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-ivory">{b.full_name} — {b.consultation_type}</p>
                <p className="text-sm text-ivory/65">{b.email} {b.phone && `· ${b.phone}`}</p>
                <p className="text-sm text-ivory/65">{b.preferred_date} · {b.preferred_time} · {b.mode}</p>
                {b.vision && <p className="mt-2 text-sm text-ivory/80 italic">"{b.vision}"</p>}
              </div>
              <div className="flex flex-col gap-2">
                <select value={b.status} onChange={(e) => setStatus("bookings", b.id, e.target.value)} className="border border-border bg-transparent px-3 py-2 text-xs text-ivory">
                  {["pending","confirmed","completed","cancelled"].map(s => <option key={s} className="bg-background">{s}</option>)}
                </select>
                <button onClick={() => del("bookings", b.id)} className="text-[0.65rem] tracking-[0.28em] uppercase text-ivory/50 hover:text-red-400">Delete</button>
              </div>
            </div>
          </li>))}
        </ul>
      )}

      {tab === "requests" && (
        <ul className="space-y-3">{requests.map((r) => (
          <li key={r.id} className="border border-border p-5 bg-[oklch(0.16_0.025_200/0.6)]">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-ivory">{r.full_name ?? "Guest"} — {r.metal}</p>
                <p className="text-sm text-ivory/65">{r.email}</p>
                <p className="text-sm text-ivory/65">{r.diamond_shape} · Size {r.size}{r.engraving ? ` · "${r.engraving}"` : ""}</p>
                {r.notes && <p className="mt-2 text-sm text-ivory/80 italic">"{r.notes}"</p>}
              </div>
              <div className="flex flex-col gap-2">
                <select value={r.status} onChange={(e) => setStatus("customisation_requests", r.id, e.target.value)} className="border border-border bg-transparent px-3 py-2 text-xs text-ivory">
                  {["pending","in_design","quoted","completed","cancelled"].map(s => <option key={s} className="bg-background">{s}</option>)}
                </select>
                <button onClick={() => del("customisation_requests", r.id)} className="text-[0.65rem] tracking-[0.28em] uppercase text-ivory/50 hover:text-red-400">Delete</button>
              </div>
            </div>
          </li>))}
        </ul>
      )}

      {tab === "messages" && (
        <ul className="space-y-3">{messages.map((m) => (
          <li key={m.id} className="border border-border p-5 bg-[oklch(0.16_0.025_200/0.6)]">
            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex-1">
                <p className="font-serif text-lg text-ivory">{m.full_name}{m.subject && ` — ${m.subject}`}</p>
                <p className="text-sm text-ivory/65">{m.email}</p>
                <p className="mt-3 text-sm text-ivory/85 whitespace-pre-wrap">{m.message}</p>
              </div>
              <button onClick={() => del("contact_messages", m.id)} className="text-[0.65rem] tracking-[0.28em] uppercase text-ivory/50 hover:text-red-400 self-start">Delete</button>
            </div>
          </li>))}
        </ul>
      )}
    </PageShell>
  );
}
