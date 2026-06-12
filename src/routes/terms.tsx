import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ethima" },
      { name: "description", content: "ethima's terms and conditions for purchasing lab-grown diamond jewellery — pricing, shipping, made-to-order policies, and more." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell eyebrow="Legal" title="Terms & Conditions."
      intro="By accessing or purchasing from ethima, you agree to the following Terms & Conditions.">
      <div className="space-y-px">

        {[
          ["Product Information", "We aim to present all products, descriptions, and images as accurately as possible. As many ethima pieces are handcrafted and made-to-order, slight variations in finish, stone placement, or detailing may naturally occur."],
          ["Made-to-Order Jewellery", "Most ethima jewellery is created after an order is placed. Production timelines generally range between 14–20 business days and may vary depending on customisation requirements."],
          ["Pricing", "All prices displayed on the website are listed in INR unless otherwise stated."],
          ["Customisation", "Customised or personalised orders may require additional confirmation before production begins. Once production has started, customised orders cannot be cancelled or modified."],
          ["Shipping & Delivery", "Estimated delivery timelines are provided for guidance and may occasionally vary due to production or courier delays."],
          ["Returns & Warranty", "Returns, repairs, and warranty support are governed by our Returns, Repairs & Warranty Policy."],
          ["Design Disclaimer", "Certain jewellery designs may draw inspiration from widely recognised design styles, settings, or references shared by customers. Any resemblance to existing designs, brands, or products is purely unintentional and incidental. ethima does not claim affiliation with or endorsement from any third-party brand or designer unless explicitly stated."],
          ["Limitation of Liability", "ethima shall not be held liable for indirect, incidental, or consequential damages arising from the use of our website, products, or services."],
          ["Policy Updates", "ethima reserves the right to update these Terms & Conditions at any time without prior notice."],
        ].map(([title, text]) => (
          <div key={title} className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
            <h2 className="font-serif text-2xl text-ivory">{title}</h2>
            <p className="text-sm leading-relaxed text-ivory/70">{text}</p>
          </div>
        ))}

        <div className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
          <h2 className="font-serif text-2xl text-ivory">Orders & Payments</h2>
          <div className="space-y-3 text-sm leading-relaxed text-ivory/70">
            <p>Orders are confirmed only after successful payment confirmation. ethima reserves the right to cancel or decline orders in situations including:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Pricing errors</li>
              <li>Suspected fraudulent activity</li>
              <li>Product unavailability</li>
              <li>Incomplete customer information</li>
            </ul>
          </div>
        </div>

      </div>
    </PageShell>
  );
}
