import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode, type ComponentType } from "react";
import { PageShell } from "@/components/page-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/customise")({
  head: () => ({
    meta: [
      { title: "Personalise Your Piece — ethima" },
      { name: "description", content: "Customise your fine jewellery — choose metal, diamond shape, size, engraving, and personal notes." },
    ],
  }),
  component: Customise,
});

const METALS = ["925 Sterling Silver", "10KT Yellow Gold", "10KT White Gold", "10KT Rose Gold"];
const SHAPES = ["Round", "Oval", "Pear", "Emerald", "Cushion", "Marquise"];

function Customise() {
  const { user } = useAuth();
  const [metal, setMetal] = useState(METALS[1]);
  const [shape, setShape] = useState(SHAPES[0]);
  const [size, setSize] = useState("US 6");
  const [engraving, setEngraving] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("customisation_requests").insert({
      user_id: user?.id ?? null,
      full_name: (user?.user_metadata?.display_name as string | undefined) ?? null,
      email: user?.email ?? null,
      metal, diamond_shape: shape, size,
      engraving: engraving || null,
      notes: notes || null,
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else { setSent(true); toast.success("Request sent — we'll be in touch."); }
  }

  return (
    <PageShell eyebrow="Personalise Your Piece" title="Designed around you." intro="Every ethima piece begins with you. Choose your metal, your stone, and the small details that make it yours.">
      <form className="grid gap-12 lg:grid-cols-2" onSubmit={submit}>
        <div className="space-y-10">
          <Field label="Metal">
            <div className="grid grid-cols-2 gap-3">
              {METALS.map((m) => (
                <Option key={m} active={metal === m} onClick={() => setMetal(m)}>{m}</Option>
              ))}
            </div>
          </Field>

          <Field label="Diamond Shape">
            <div className="grid grid-cols-3 gap-3">
              {SHAPES.map((s) => (
                <Option key={s} active={shape === s} onClick={() => setShape(s)}>{s}</Option>
              ))}
            </div>
          </Field>

          <Field label="Size">
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory focus:border-champagne outline-none"
            >
              {["US 4","US 5","US 6","US 7","US 8","US 9","US 10"].map(s => <option key={s} className="bg-background">{s}</option>)}
            </select>
          </Field>
        </div>

        <div className="space-y-10">
          <Field label="Engraving (optional)">
            <input
              maxLength={20}
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
              placeholder="A name, date, or symbol"
              className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none"
            />
            <p className="mt-2 text-xs text-ivory/50">{engraving.length}/20 characters</p>
          </Field>

          <Field label="Personal Notes">
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about the piece you envision."
              className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none resize-none"
            />
          </Field>

          <div className="border border-border p-6 bg-[oklch(0.16_0.025_200/0.6)]">
            <p className="eyebrow">Your selection</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              <li><span className="text-ivory/50">Metal —</span> {metal}</li>
              <li><span className="text-ivory/50">Shape —</span> {shape}</li>
              <li><span className="text-ivory/50">Size —</span> {size}</li>
              {engraving && <li><span className="text-ivory/50">Engraving —</span> "{engraving}"</li>}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <button type="submit" disabled={busy || sent} className="inline-flex items-center bg-champagne px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all disabled:opacity-60">
              {sent ? "Request Sent" : busy ? "Sending..." : "Submit Request"}
            </button>
            <Link to="/consultation" className="inline-flex items-center border border-champagne/60 px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-ivory hover:bg-champagne hover:text-primary-foreground transition-all">
              Book Consultation
            </Link>
          </div>
        </div>
      </form>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-4">{label}</p>
      {children}
    </div>
  );
}

function Option({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-3 text-xs tracking-[0.16em] uppercase transition-all ${
        active ? "border-champagne bg-champagne/10 text-champagne" : "border-border text-ivory/75 hover:border-champagne/50"
      }`}
    >
      {children}
    </button>
  );
}
