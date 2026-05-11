import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ethima" },
      { name: "description", content: "Get in touch with the ethima atelier. We're here to help you create your perfect piece." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  full_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(2000),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setBusy(false);
    if (error) toast.error(error.message); else { setSent(true); toast.success("Message sent."); }
  }

  return (
    <PageShell eyebrow="Get in touch" title="We're here for you." intro="Whether it's a question, a custom request, or a quiet hello — we'd love to hear from you.">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <ul className="space-y-6 text-sm text-ivory/80">
          <li className="flex items-start gap-4"><Mail className="mt-0.5 h-4 w-4 text-champagne" /> hello@ethima.co</li>
          <li className="flex items-start gap-4"><Phone className="mt-0.5 h-4 w-4 text-champagne" /> +91 00000 00000</li>
          <li className="flex items-start gap-4"><MessageCircle className="mt-0.5 h-4 w-4 text-champagne" /> Chat on WhatsApp</li>
          <li className="flex items-start gap-4"><MapPin className="mt-0.5 h-4 w-4 text-champagne" /> By appointment only — Mumbai, India</li>
        </ul>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <p className="eyebrow mb-3">Name</p>
            <input name="full_name" required className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory focus:border-champagne outline-none" />
          </div>
          <div>
            <p className="eyebrow mb-3">Email</p>
            <input name="email" type="email" required className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory focus:border-champagne outline-none" />
          </div>
          <div>
            <p className="eyebrow mb-3">Message</p>
            <textarea name="message" required rows={5} className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory focus:border-champagne outline-none resize-none" />
          </div>
          <button type="submit" disabled={busy || sent} className="inline-flex items-center bg-champagne px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all disabled:opacity-60">
            {sent ? "Thank you — we'll be in touch" : busy ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </PageShell>
  );
}
