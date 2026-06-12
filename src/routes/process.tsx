import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — ethima | How Custom Jewellery Is Made" },
      { name: "description", content: "From consultation to delivery — discover how ethima crafts your lab-grown diamond jewellery, your way. A 4-step journey from design to doorstep." },
      { name: "keywords", content: "jewellery making process, custom jewellery design process, how jewellery is made, ethima process, bespoke jewellery steps" },
      { property: "og:title", content: "Our Process — ethima" },
      { property: "og:description", content: "From consultation to delivery — discover how ethima crafts your piece, your way." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/process" }],
  }),
  component: Process,
});

const STEPS = [
  ["01", "Choose", "Start with a design from our collection or share a reference that speaks to you."],
  ["02", "Personalise", "Select your preferred metal, diamond details, sizing, or personal touches. If you'd like guidance before deciding, you can also book a consultation with us."],
  ["03", "Design Preview", "For personalised or custom pieces, a CAD/design preview may be shared before production begins for confirmation."],
  ["04", "Craft", "Once approved, your piece is carefully crafted using lab-grown diamonds and thoughtfully selected materials."],
  ["05", "Deliver", "After final quality checks, your jewellery is packaged and delivered with care."],
];

function Process() {
  return (
    <PageShell eyebrow="Our Process" title="Your piece, your way." intro="A personal, guided process — from first idea to final delivery.">
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
