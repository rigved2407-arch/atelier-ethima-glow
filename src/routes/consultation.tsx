import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { CalendarDays, Clock, User, Heart, Gem } from "lucide-react";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book Your Consultation — ethima" },
      { name: "description", content: "Book a one-to-one consultation with the ethima atelier. Personal guidance, bespoke design support, no obligation." },
      { property: "og:title", content: "Book a Consultation — ethima" },
      { property: "og:description", content: "Personal guidance to design a piece that's truly yours." },
    ],
  }),
  component: Consultation,
});

const TYPES = ["Bespoke Design", "Engagement Ring", "Personalisation", "General Guidance"];
const MODES = ["In-studio", "Video Call", "WhatsApp"];
const TIMES = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

function Consultation() {
  const [type, setType] = useState(TYPES[0]);
  const [mode, setMode] = useState(MODES[1]);
  const [time, setTime] = useState(TIMES[1]);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <PageShell eyebrow="Consultation Confirmed" title="Thank you." intro="Your request has been received. A member of the ethima atelier will reach out within 24 hours to confirm your appointment.">
        <div className="border border-border p-10 bg-[oklch(0.16_0.025_200/0.6)] max-w-xl">
          <p className="eyebrow">Your appointment</p>
          <p className="mt-3 font-serif text-2xl text-ivory">{type}</p>
          <p className="mt-2 text-sm text-ivory/70">{mode} · {time}</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Need guidance?"
      title="Book your consultation."
      intro="Sit with us — in person or online. We'll listen, sketch, and design a piece that's unmistakably yours. No obligation, ever."
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-6">
          <Perk icon={User} t="Personal consultation" d="One-to-one with our lead designer." />
          <Perk icon={Gem} t="Bespoke design support" d="From concept sketch to CAD render." />
          <Perk icon={Heart} t="No obligation" d="Take your time. We're here when you're ready." />
          <div className="border border-border p-6 bg-[oklch(0.16_0.025_200/0.6)]">
            <p className="eyebrow">Atelier hours</p>
            <p className="mt-3 text-sm text-ivory/80">Mon — Sat · 10:00 AM — 7:00 PM</p>
            <p className="mt-1 text-sm text-ivory/55">By appointment only</p>
          </div>
        </aside>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name"><input required className={inputCls} /></Field>
            <Field label="Email"><input required type="email" className={inputCls} /></Field>
            <Field label="Phone / WhatsApp"><input className={inputCls} /></Field>
            <Field label="Preferred Date">
              <div className="relative">
                <input required type="date" className={inputCls} />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-champagne/70" />
              </div>
            </Field>
          </div>

          <Field label="Consultation Type">
            <div className="flex flex-wrap gap-3">
              {TYPES.map(o => <Chip key={o} active={type === o} onClick={() => setType(o)}>{o}</Chip>)}
            </div>
          </Field>

          <Field label="Mode">
            <div className="flex flex-wrap gap-3">
              {MODES.map(o => <Chip key={o} active={mode === o} onClick={() => setMode(o)}>{o}</Chip>)}
            </div>
          </Field>

          <Field label="Preferred Time">
            <div className="flex flex-wrap gap-3">
              {TIMES.map(o => (
                <Chip key={o} active={time === o} onClick={() => setTime(o)}>
                  <span className="inline-flex items-center gap-2"><Clock className="h-3 w-3" />{o}</span>
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Tell us about your vision (optional)">
            <textarea rows={4} placeholder="A piece you've imagined, an occasion, an inspiration..." className={`${inputCls} resize-none`} />
          </Field>

          <button type="submit" className="inline-flex items-center bg-champagne px-8 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all">
            Confirm Consultation
          </button>
        </form>
      </div>
    </PageShell>
  );
}

const inputCls = "w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-5 py-2.5 text-xs tracking-[0.16em] uppercase transition-all ${
        active ? "border-champagne bg-champagne/10 text-champagne" : "border-border text-ivory/75 hover:border-champagne/50"
      }`}
    >{children}</button>
  );
}

function Perk({ icon: Icon, t, d }: { icon: React.ComponentType<{ className?: string }>; t: string; d: string }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-champagne" />
      <div>
        <p className="font-serif text-xl text-ivory">{t}</p>
        <p className="mt-1 text-sm text-ivory/65">{d}</p>
      </div>
    </div>
  );
}
