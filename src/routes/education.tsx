import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — Lab-Grown Diamonds & Customisation | ethima" },
      { name: "description", content: "Learn about lab-grown diamonds, IGI/GIA/SGL certification, metal choices, diamond shapes and jewellery care. Your complete guide from ethima." },
      { name: "keywords", content: "lab grown diamonds explained, IGI certified diamonds india, diamond shapes guide, jewellery care tips, 10kt gold vs silver" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "ethima Education — Lab-Grown Diamonds & Customisation" },
      { property: "og:description", content: "Everything you need to know about lab-grown diamonds and personalising your piece." },
      { property: "og:url", content: "https://ethima.in/education" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/education" }],
  }),
  component: Education,
});

const FAQS = [
  {
    q: "What are lab-grown diamonds?",
    a: [
      "A lab-grown diamond is a real diamond. Same chemical composition, same physical structure, same optical properties as a mined diamond. The only difference is where it was formed.",
      "Instead of taking billions of years beneath the earth, it's grown in a controlled environment that replicates those exact conditions.",
      "Not a simulant. Not a substitute. The same thing, grown differently.",
    ],
  },
  {
    q: "10KT gold vs 925 silver: what's the difference?",
    a: [
      "10KT gold contains 41.7% pure gold mixed with other metals for strength. It holds up well to daily wear and keeps its colour over time. A practical choice if you want the warmth of gold without compromising on durability.",
      "925 sterling silver is 92.5% pure silver, alloyed with copper for strength. It has a bright, cool tone that suits a wide range of styles and with regular care, stays beautiful for years.",
      "Both are genuine, durable metals. It simply comes down to what feels more like you.",
    ],
  },
  {
    q: "Why made-to-order?",
    a: [
      "Because we'd rather make something right than make it fast.",
      "When you order from ethima, your piece is crafted specifically for you, not mass-produced.",
      "Fourteen to twenty days isn't a delay, it's the process.",
    ],
  },
  {
    q: "Jewellery care guide",
    a: [
      "Your jewellery is designed for everyday wear, but a little care goes a long way.",
      "Remove pieces before swimming, showering, or applying perfumes and lotions. Store them separately in a soft pouch or box to minimise scratching.",
      "A gentle wipe with a soft cloth every now and then is enough to keep them looking their best.",
    ],
  },
  {
    q: "Diamond shapes guide",
    a: [
      "Round Brilliant — maximum brilliance, timeless.",
      "Oval — elongated silhouette with soft sparkle.",
      "Emerald — architectural facets with broad flashes of light.",
      "Princess — square, sharp-cornered, modern.",
      "Pear — teardrop-shaped, elegant with a little drama.",
      "Cushion — soft corners, vintage warmth.",
      "Marquise — elongated with pointed ends, bold and unconventional.",
      "No shape is better than another. It comes down to what speaks to you.",
    ],
  },
  {
    q: "Diamond certification: what it means and why it matters",
    a: [
      "A diamond certificate is an independent assessment of a stone's cut, colour, clarity, and carat weight. It confirms that what you're buying is exactly what it's described to be.",
      "Select ethima diamonds can be certified upon request.",
      "We currently offer certification options including: SGL (Solitaire Gemmological Laboratories), IGI (International Gemological Institute), and GIA (Gemological Institute of America).",
      "If you have a certification preference, let us know before placing your order.",
    ],
  },
];

function Education() {
  return (
    <PageShell
      eyebrow="Education"
      title="Know before you buy."
      intro="Honest answers to the questions that matter — about diamonds, metals, and what to expect when you order with us."
    >
      <div className="space-y-px">
        {FAQS.map(({ q, a }) => (
          <div key={q} className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
            <h3 className="font-serif text-xl text-ivory md:text-2xl">{q}</h3>
            <div className="space-y-3">
              {a.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-ivory/70">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-wrap gap-4">
        <Link to="/customise" className="inline-flex items-center bg-champagne px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all">
          Start Your Piece
        </Link>
        <Link to="/consultation" className="inline-flex items-center border border-champagne/60 px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-ivory hover:bg-champagne hover:text-primary-foreground transition-all">
          Book Consultation
        </Link>
      </div>
    </PageShell>
  );
}
