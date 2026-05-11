import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/page-shell";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — ethima" }] }),
  component: Account,
});

function Account() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const nav = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => { if (!loading && !user) nav({ to: "/auth" }); }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("bookings").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setBookings(data ?? []));
    supabase.from("customisation_requests").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setRequests(data ?? []));
  }, [user]);

  if (loading || !user) return <PageShell eyebrow="" title="Loading..."><div /></PageShell>;

  return (
    <PageShell eyebrow="Your atelier" title="My account." intro={user.email ?? ""}>
      <div className="mb-10 flex flex-wrap gap-3">
        {isAdmin && <Link to="/admin" className="border border-champagne/60 px-5 py-3 text-[0.65rem] tracking-[0.28em] uppercase text-champagne hover:bg-champagne hover:text-primary-foreground transition-all">Admin Dashboard</Link>}
        <button onClick={() => signOut().then(() => nav({ to: "/" }))} className="border border-border px-5 py-3 text-[0.65rem] tracking-[0.28em] uppercase text-ivory/80 hover:border-champagne hover:text-champagne transition-all">Sign out</button>
      </div>
      <div className="grid gap-12 lg:grid-cols-2">
        <Section title="My consultations" empty="No consultations yet." items={bookings} render={(b) => (
          <>
            <p className="font-serif text-xl text-ivory">{b.consultation_type}</p>
            <p className="text-sm text-ivory/65">{b.preferred_date} · {b.preferred_time} · {b.mode}</p>
            <p className="mt-2 eyebrow text-champagne">{b.status}</p>
          </>
        )} />
        <Section title="My customisation requests" empty="No requests yet." items={requests} render={(r) => (
          <>
            <p className="font-serif text-xl text-ivory">{r.metal} · {r.diamond_shape}</p>
            <p className="text-sm text-ivory/65">Size {r.size}{r.engraving ? ` · "${r.engraving}"` : ""}</p>
            <p className="mt-2 eyebrow text-champagne">{r.status}</p>
          </>
        )} />
      </div>
    </PageShell>
  );
}

function Section({ title, items, empty, render }: { title: string; items: any[]; empty: string; render: (i: any) => React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-champagne">{title}</h2>
      {items.length === 0 ? <p className="text-sm text-ivory/55">{empty}</p> : (
        <ul className="space-y-4">{items.map((i) => <li key={i.id} className="border border-border p-5 bg-[oklch(0.16_0.025_200/0.6)]">{render(i)}</li>)}</ul>
      )}
    </div>
  );
}
