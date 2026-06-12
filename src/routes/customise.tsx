import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, type ReactNode } from "react";
import { PageShell } from "@/components/page-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Upload, X, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/customise")({
  head: () => ({
    meta: [
      { title: "Customise Your Jewellery — ethima | Lab-Grown Diamond Design" },
      { name: "description", content: "Customise your fine jewellery at ethima. Choose metal, diamond shape, size, engraving, and more. Create a piece that's unmistakably yours." },
      { name: "keywords", content: "custom jewellery india, personalised diamond jewellery, bespoke jewellery design, customise ring online, ethima custom order" },
      { property: "og:title", content: "Customise Your Piece — ethima" },
      { property: "og:description", content: "Choose metal, diamond shape, size, engraving — create a piece that's truly yours." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/customise" }],
  }),
  component: Customise,
});

const PIECES = ["Ring", "Pendant", "Necklace", "Earrings",];
const METALS = ["925 Sterling Silver", "10KT Yellow Gold", "10KT White Gold", "10KT Rose Gold"];
const SHAPES = ["Round", "Oval", "Pear", "Emerald", "Cushion", "Marquise"];

function Customise() {
  const { user } = useAuth();
  const [piece, setPiece] = useState("");
  const [metal, setMetal] = useState(METALS[1]);
  const [shape, setShape] = useState(SHAPES[0]);
  const [size, setSize] = useState("US 6");
  const [engraving, setEngraving] = useState("");
  const [notes, setNotes] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return null;
    const folder = user?.id ?? "guest";
    const ext = imageFile.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("reference-images")
      .upload(path, imageFile, { upsert: false });
    if (error) { toast.error("Image upload failed: " + error.message); return null; }
    return path;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!piece) { toast.error("Please select a piece type"); return; }
    setBusy(true);

    const imageUrl = await uploadImage();

    const { error } = await supabase.from("customisation_requests").insert({
      user_id: user?.id ?? null,
      full_name: (user?.user_metadata?.display_name as string | undefined) ?? null,
      email: user?.email ?? null,
      piece_type: piece,
      metal,
      diamond_shape: shape,
      size,
      engraving: engraving || null,
      notes: notes || null,
      reference_image_url: imageUrl,
    });

    setBusy(false);
    if (error) toast.error(error.message);
    else { setSent(true); toast.success("Request sent — we'll be in touch."); }
  }

  return (
    <PageShell
      eyebrow="Personalise Your Piece"
      title="Designed around you."
      intro="Every ethima piece begins with you. Choose your metal, your stone, and the small details that make it yours."
    >
      <form className="grid gap-12 lg:grid-cols-2" onSubmit={submit}>
        <div className="space-y-10">

          {/* Piece Type */}
          <Field label="What would you like to customise?">
            <div className="grid grid-cols-3 gap-3">
              {PIECES.map((p) => (
                <Option key={p} active={piece === p} onClick={() => setPiece(p)}>
                  {p}
                </Option>
              ))}
            </div>
          </Field>

          {/* Metal */}
          <Field label="Metal">
            <div className="flex flex-wrap gap-3">
              {METALS.map((m) => (
                <Option key={m} active={metal === m} onClick={() => setMetal(m)}>{m}</Option>
              ))}
            </div>
          </Field>

          {/* Diamond Shape */}
          <Field label="Diamond Shape">
            <div className="grid grid-cols-3 gap-3">
              {SHAPES.map((s) => (
                <Option key={s} active={shape === s} onClick={() => setShape(s)}>{s}</Option>
              ))}
            </div>
          </Field>

          {/* Size */}
          <Field label="Size">
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory focus:border-champagne outline-none"
            >
              {["US 4", "US 5", "US 6", "US 7", "US 8", "US 9", "US 10"].map((s) => (
                <option key={s} className="bg-background">{s}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="space-y-10">

          {/* Reference Image Upload */}
          <Field label="Reference Image (optional)">
            <div
              className={`relative border border-dashed transition-colors ${
                imagePreview ? "border-champagne/40" : "border-border hover:border-champagne/40"
              } bg-[oklch(0.16_0.025_200/0.4)]`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Reference"
                    className="h-48 w-full object-cover opacity-80"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-ivory hover:text-champagne transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/80 to-transparent p-3">
                    <p className="text-xs text-ivory/60 truncate">{imageFile?.name}</p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center gap-3 px-6 py-10 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/30 text-champagne">
                    <Upload className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase text-ivory/70">
                      Upload a reference image
                    </p>
                    <p className="mt-1 text-[0.65rem] text-ivory/40">
                      JPG, PNG or WEBP · Max 5MB
                    </p>
                  </div>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
            {!imagePreview && (
              <p className="mt-2 text-xs text-ivory/40">
                Share a photo of a piece you love — we'll use it as inspiration.
              </p>
            )}
          </Field>

          {/* Engraving */}
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

          {/* Notes */}
          <Field label="Personal Notes">
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about the piece you envision."
              className="w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none resize-none"
            />
          </Field>

          {/* Summary */}
          <div className="border border-border p-6 bg-[oklch(0.16_0.025_200/0.6)]">
            <p className="eyebrow">Your selection</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              {piece && <li><span className="text-ivory/50">Piece —</span> {piece}</li>}
              <li><span className="text-ivory/50">Metal —</span> {metal}</li>
              <li><span className="text-ivory/50">Shape —</span> {shape}</li>
              <li><span className="text-ivory/50">Size —</span> {size}</li>
              {engraving && <li><span className="text-ivory/50">Engraving —</span> "{engraving}"</li>}
              {imageFile && (
                <li className="flex items-center gap-2">
                  <span className="text-ivory/50">Reference —</span>
                  <ImageIcon className="h-3 w-3 text-champagne" />
                  <span className="text-xs truncate max-w-[160px]">{imageFile.name}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={busy || sent}
              className="inline-flex items-center bg-champagne px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all disabled:opacity-60"
            >
              {sent ? "Request Sent" : busy ? "Sending..." : "Submit Request"}
            </button>
            <Link
              to="/consultation"
              className="inline-flex items-center border border-champagne/60 px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-ivory hover:bg-champagne hover:text-primary-foreground transition-all"
            >
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
        active
          ? "border-champagne bg-champagne/10 text-champagne"
          : "border-border text-ivory/75 hover:border-champagne/50"
      }`}
    >
      {children}
    </button>
  );
}
