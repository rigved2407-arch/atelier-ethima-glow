import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { JsonLd, faqJsonLd } from "@/components/seo";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Lab-Grown Diamond Jewellery Care & Orders | ethima" },
      { name: "description", content: "Find answers about ethima's delivery timeline, customisation, metals, diamond certification, repairs, returns, and jewellery care." },
      { name: "keywords", content: "jewellery faqs, lab grown diamond care, ethima returns, jewellery customisation india, diamond certification" },
      { property: "og:title", content: "FAQs — ethima" },
      { property: "og:description", content: "Everything you need to know about ordering, caring for, and customising your ethima jewellery." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/faqs" }],
  }),
  component: FAQs,
});

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "All ethima pieces, whether from our ready collection or made to your reference, are delivered within 14 to 20 days. Fine jewellery takes time to get right, and we'd rather do it properly than rush it to you.",
  },
  {
    q: "Can I customise a piece?",
    a: "Yes, absolutely. You can either shop directly from our website and choose a ready design, or bring us a reference and we'll create something built around it. Either way, every piece goes through the same level of care and craftsmanship.",
  },
  {
    q: "What metals do you use?",
    a: "ethima pieces are crafted in 10KT gold and 925 sterling silver. Each product page specifies the metal used, so you always know exactly what you're getting.",
  },
  {
    q: "Are your diamonds certified?",
    a: "We provide SGL/IGI certification of your piece upon request. Just reach out to us before placing your order.",
  },
  {
    q: "Do you offer repairs or resizing?",
    a: "We offer repair support for manufacturing concerns, loose stones, clasp issues, and general restoration. Resizing is not currently available, so we'd encourage you to double check your size before ordering. If you're unsure, feel free to contact us and we'll help you figure it out.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns only in cases where a piece arrives damaged, the wrong item was delivered, or there's a manufacturing defect identified at the time of delivery. Return requests need to be raised within 48 hours of receiving your order, with clear photos or a video of the issue. Made-to-order pieces, earrings, and items showing signs of wear are not eligible for return.",
  },
  {
    q: "How do I care for my ethima jewellery?",
    a: "Keep your pieces away from water, perfume, and harsh chemicals. Store them separately to avoid scratching, and wipe them down with a soft, dry cloth after wearing. A little consistency in how you care for them goes a long way in keeping them looking the way they did on day one.",
  },
];

function FAQs() {
  return (
    <PageShell eyebrow="FAQs" title="Frequently asked questions.">
      <JsonLd data={faqJsonLd(FAQS.map((f) => ({ question: f.q, answer: f.a })))} />
      <div className="space-y-px">
        {FAQS.map(({ q, a }) => (
          <div key={q} className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
            <h3 className="font-serif text-xl text-ivory">{q}</h3>
            <p className="text-sm leading-relaxed text-ivory/70">{a}</p>
          </div>
        ))}
      </div>
      <div className="mt-16">
        <a href="/contact" className="inline-flex items-center border border-champagne/60 px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-champagne hover:bg-champagne hover:text-primary-foreground transition-all">
          Still have questions? Contact us
        </a>
      </div>
    </PageShell>
  );
}
