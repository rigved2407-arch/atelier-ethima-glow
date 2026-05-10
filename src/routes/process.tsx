import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — ethima" },
      { name: "description", content: "From consultation to delivery — discover how ethima crafts your piece, your way." },
    ],
  }),
  component: Process,
});

const STEPS = [
  ["01", "Consult", "Share your story, inspirations, and intentions with our design team."],
  ["02", "Design", "We render a CAD model and refine every curve until it feels right."],
  ["03", "Craft", "Skilled artisans handcraft your piece using ethically grown diamonds."],
  ["04", "Review", "You review the finished piece. We perfect every last detail."],
  ["05", "Deliver", "Your piece is delivered with care, ready to be loved for a lifetime."],
];

function Process() {
  return (
    <PageShell eyebrow="The ethima Experience" title="Your piece, your way." intro="A guided, personal process — from first idea to final delivery.">
      <div className="space-y-px">
        {STEPS.map(([n, t, d]) => (
          <div key={n} className="grid items-baseline gap-6 border-t border-border py-10 md:grid-cols-[80px_1fr_2fr]">
            <span className="font-serif text-3xl text-champagne">{n}</span>
            <h3 className="font-serif text-2xl text-ivory">{t}</h3>
            <p className="text-sm leading-relaxed text-ivory/70">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <Link to="/consultation" className="inline-flex items-center bg-champagne px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all">
          Begin your journey
        </Link>
      </div>
    </PageShell>
  );
}
