import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ethima" },
      { name: "description", content: "ethima is a personalised fine jewellery atelier built on quiet luxury, lab-grown diamonds, and meaningful craftsmanship." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell eyebrow="Our Story" title="Elegance within reach." intro="ethima was founded on a simple belief — that fine jewellery should be personal, ethical, and made to last a lifetime.">
      <div className="grid gap-12 md:grid-cols-2">
        <p className="text-base leading-relaxed text-ivory/80">
          We are a boutique atelier dedicated to designing meaningful jewellery, one piece at a time. Each design begins with a conversation. We listen, sketch, refine, and craft — until your piece feels unmistakably yours.
        </p>
        <p className="text-base leading-relaxed text-ivory/70">
          Our diamonds are lab-grown — chemically and optically identical to mined diamonds, but kinder to people and the planet. We believe luxury should never come at a cost to our world. Anybody can buy a diamond — and with ethima, anybody can own one that's truly theirs.
        </p>
      </div>

      <div className="mt-20 grid gap-10 border-t border-border pt-14 md:grid-cols-3">
        {[
          ["Quiet Luxury", "Designed to be worn every day, not locked in a vault."],
          ["Personal Craftsmanship", "Every piece begins with a one-to-one design consultation."],
          ["Accessible Elegance", "Lab-grown diamonds make fine jewellery beautifully attainable."],
        ].map(([t, d]) => (
          <div key={t}>
            <h3 className="font-serif text-2xl text-ivory">{t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/65">{d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
