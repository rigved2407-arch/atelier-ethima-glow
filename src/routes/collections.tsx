import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import catRings from "@/assets/cat-rings.jpg";
import catPendants from "@/assets/cat-pendants.jpg";
import catEarrings from "@/assets/cat-earrings.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — ethima" },
      { name: "description", content: "Explore the ethima edit — rings, pendants, earrings and bracelets crafted with lab-grown diamonds." },
    ],
  }),
  component: Collections,
});

const ITEMS = [
  { label: "Rings", img: catRings, desc: "Solitaires, bands and bespoke designs." },
  { label: "Pendants", img: catPendants, desc: "Delicate everyday brilliance." },
  { label: "Earrings", img: catEarrings, desc: "Studs, drops and quiet statements." },
  { label: "Bracelets", img: catBracelets, desc: "Refined chains, made to layer." },
];

function Collections() {
  return (
    <PageShell eyebrow="The ethima Edit" title="Collections" intro="Minimal pieces. Meaningful stories. A curated edit of fine jewellery that blends simplicity with intention.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((c) => (
          <Link to="/customise" key={c.label} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
              <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_200/0.85)] via-transparent to-transparent" />
            </div>
            <div className="mt-5">
              <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory">{c.label}</p>
              <p className="mt-2 text-sm text-ivory/65">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
