import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ethima" },
      { name: "description", content: "Get in touch with the ethima atelier. We're here to help you create your perfect piece." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell eyebrow="Get in touch" title="We're here for you." intro="Whether it's a question, a custom request, or a quiet hello — we'd love to hear from you.">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-6 text-sm text-ivory/80">
          <li className="flex items-start gap-4"><Mail className="mt-0.5 h-4 w-4 text-champagne" /> hello@ethima.co</li>
          <li className="flex items-start gap-4"><Phone className="mt-0.5 h-4 w-4 text-champagne" /> +91 00000 00000</li>
          <li className="flex items-start gap-4"><MessageCircle className="mt-0.5 h-4 w-4 text-champagne" /> Chat on WhatsApp</li>
          <li className="flex items-start gap-4"><MapPin className="mt-0.5 h-4 w-4 text-champagne" /> By appointment only — Mumbai, India</li>
        </ul>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-5"
        >
          <Input label="Name" />
          <Input label="Email" type="email" />
          <div>
            <p className="eyebrow mb-3">Message</p>
            <textarea rows={5} className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory focus:border-champagne outline-none resize-none" />
          </div>
          <button type="submit" className="inline-flex items-center bg-champagne px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all">
            {sent ? "Thank you — we'll be in touch" : "Send Message"}
          </button>
        </form>
      </div>
    </PageShell>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      <input type={type} className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory focus:border-champagne outline-none" />
    </div>
  );
}
