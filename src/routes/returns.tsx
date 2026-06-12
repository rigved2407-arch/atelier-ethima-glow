import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns, Repairs & Warranty — ethima" },
      { name: "description", content: "ethima's returns, repairs, warranty and upgrade program for lab-grown diamond jewellery. 6-month craftsmanship warranty included with every piece." },
      { name: "keywords", content: "jewellery returns india, jewellery warranty, jewellery repair, ethima returns policy, diamond jewellery care" },
      { property: "og:title", content: "Returns, Repairs & Warranty — ethima" },
      { property: "og:description", content: "Learn about ethima's return policy, 6-month craftsmanship warranty, repair services and upgrade program." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/returns" }],
  }),
  component: Returns,
});

function Returns() {
  return (
    <PageShell eyebrow="Policy" title="Returns, Repairs & Warranty."
      intro="At ethima, every piece is thoughtfully created with care and often made-to-order. Due to the personalised nature of fine jewellery, returns are accepted only in limited circumstances.">

      <section className="space-y-px">

        <div className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
          <h2 className="font-serif text-2xl text-ivory">Returns & Exchanges</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ivory/70">
            <div>
              <p className="text-ivory/90 font-light mb-2">Eligible Returns</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Item received damaged</li>
                <li>Incorrect item delivered</li>
                <li>Manufacturing defect identified upon delivery</li>
              </ul>
            </div>
            <div>
              <p className="text-ivory/90 font-light mb-2">Return Request Window</p>
              <p>Return requests must be submitted within 48 hours of delivery, along with clear photos or videos for review.</p>
            </div>
            <div>
              <p className="text-ivory/90 font-light mb-2">Non-Returnable Items</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Made-to-order or personalised jewellery</li>
                <li>Earrings (for hygiene reasons)</li>
                <li>Custom sizing requests</li>
                <li>Items showing signs of wear or misuse</li>
                <li>Preference-based returns or cancellations after production begins</li>
              </ul>
            </div>
            <p>Approved requests may qualify for a repair, replacement, or store credit depending on the situation.</p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
          <h2 className="font-serif text-2xl text-ivory">Repairs & Care</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ivory/70">
            <p>We want your ethima jewellery to be worn and loved for years. If your piece requires repair or servicing, our team will be happy to assist.</p>
            <div>
              <p className="text-ivory/90 font-light mb-2">Repair Support Includes</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Loose stones</li>
                <li>Clasp or chain issues</li>
                <li>Structural repair support</li>
                <li>Professional polishing guidance</li>
              </ul>
            </div>
            <div>
              <p className="text-ivory/90 font-light mb-2">Repair Process</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Contact us via email or WhatsApp</li>
                <li>Share photos or videos of the concern</li>
                <li>Our team will review the request</li>
                <li>If approved, we will guide you through the next steps</li>
                <li>Your repaired piece will be returned after servicing</li>
              </ol>
            </div>
            <p>Repair timelines may vary depending on the nature of the repair.</p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
          <h2 className="font-serif text-2xl text-ivory">Warranty Policy</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ivory/70">
            <p>Every ethima piece includes a 6-Month Craftsmanship Warranty.</p>
            <div>
              <p className="text-ivory/90 font-light mb-2">Warranty Coverage Includes</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Manufacturing defects</li>
                <li>Structural faults</li>
                <li>Loose stones caused by craftsmanship issues</li>
                <li>Faulty clasps or chain connections</li>
              </ul>
            </div>
            <div>
              <p className="text-ivory/90 font-light mb-2">Warranty Does Not Cover</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Normal wear and tear</li>
                <li>Scratches or dents</li>
                <li>Tarnishing caused by improper care</li>
                <li>Accidental damage</li>
                <li>Lost jewellery or stones caused by impact</li>
                <li>Water, perfume, or chemical damage</li>
              </ul>
            </div>
            <p>ethima reserves the right to assess whether a repair falls within warranty coverage.</p>
          </div>
        </div>

        <div className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
          <h2 className="font-serif text-2xl text-ivory">Upgrade Program</h2>
          <div className="space-y-4 text-sm leading-relaxed text-ivory/70">
            <p>We believe fine jewellery should evolve with you. ethima offers an upgrade program for select pieces.</p>
            <div>
              <p className="text-ivory/90 font-light mb-2">Upgrade Eligibility</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Available on select jewellery categories</li>
                <li>Jewellery must be in wearable condition</li>
                <li>Upgrade requests must be made within 12 months of purchase</li>
              </ul>
            </div>
            <div>
              <p className="text-ivory/90 font-light mb-2">How It Works</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Eligible customers may receive store credit toward a new ethima purchase</li>
                <li>Credit value depends on product condition and original purchase value</li>
                <li>Upgrade credit may only be redeemed against another ethima piece</li>
              </ul>
            </div>
          </div>
        </div>

      </section>
    </PageShell>
  );
}
