import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ethima" },
      { name: "description", content: "ethima's privacy policy — how we collect, use, and protect your personal information when you shop fine jewellery with us." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/privacy" }],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    title: "Information We Collect",
    items: ["Name", "Email address", "Phone number", "Shipping and billing address", "Payment-related information", "Order details and communication history"],
  },
  {
    title: "How We Use Your Information",
    items: ["Process and fulfil orders", "Communicate order updates", "Respond to enquiries or support requests", "Improve our website and customer experience", "Share relevant updates or announcements, if you choose to receive them"],
  },
];

function Privacy() {
  return (
    <PageShell eyebrow="Legal" title="Privacy Policy."
      intro="At ethima, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard the information you share with us.">
      <div className="space-y-px">

        {SECTIONS.map(({ title, items }) => (
          <div key={title} className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
            <h2 className="font-serif text-2xl text-ivory">{title}</h2>
            <ul className="space-y-1 list-disc list-inside text-sm leading-relaxed text-ivory/70">
              {items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}

        {[
          ["Payment Information", "Payments made through our website are processed through secure third-party payment providers. ethima does not store your complete card or banking information."],
          ["Cookies & Website Data", "Our website may use cookies and basic analytics tools to improve browsing experience and understand how visitors interact with the site."],
          ["Data Protection", "We take reasonable steps to protect your personal information and maintain secure systems for customer data."],
          ["Third-Party Services", "Certain services on our website may be handled by trusted third-party providers, including payment gateways, shipping partners, and analytics platforms."],
          ["Policy Updates", "ethima may update this Privacy Policy from time to time to reflect operational, legal, or website changes."],
        ].map(([title, text]) => (
          <div key={title} className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
            <h2 className="font-serif text-2xl text-ivory">{title}</h2>
            <p className="text-sm leading-relaxed text-ivory/70">{text}</p>
          </div>
        ))}

        <div className="grid gap-6 border-t border-border py-10 md:grid-cols-[2fr_3fr]">
          <h2 className="font-serif text-2xl text-ivory">Your Rights</h2>
          <div className="space-y-3 text-sm leading-relaxed text-ivory/70">
            <p>You may contact us at any time to:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Request access to your information</li>
              <li>Correct inaccurate details</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communication</li>
            </ul>
          </div>
        </div>

      </div>
    </PageShell>
  );
}
