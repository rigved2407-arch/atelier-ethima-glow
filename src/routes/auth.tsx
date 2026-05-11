import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { PageShell } from "@/components/page-shell";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ethima" },
      { name: "description", content: "Sign in or create an ethima account to track your bespoke pieces and consultations." },
    ],
  }),
  component: Auth,
});

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(72),
  name: z.string().trim().max(80).optional(),
});

function Auth() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) nav({ to: "/account" }); }, [user, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, name });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/account`, data: { display_name: name } },
        });
        if (error) throw error;
        toast.success("Welcome to ethima.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      nav({ to: "/account" });
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally { setBusy(false); }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/account` });
    if (r.error) toast.error("Google sign-in failed");
  }

  const input = "w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none";

  return (
    <PageShell eyebrow="Your account" title={mode === "signin" ? "Welcome back." : "Create an account."} intro="Track your consultations, bespoke requests, and the pieces you've imagined.">
      <div className="max-w-md space-y-6">
        <button onClick={google} className="w-full border border-champagne/60 px-6 py-3 text-[0.7rem] tracking-[0.28em] uppercase text-ivory hover:bg-champagne hover:text-primary-foreground transition-all">
          Continue with Google
        </button>
        <div className="flex items-center gap-3 text-[0.65rem] tracking-[0.28em] uppercase text-ivory/40">
          <span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && <input className={input} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />}
          <input type="email" required className={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required minLength={8} className={input} placeholder="Password (min 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={busy} className="w-full bg-champagne px-6 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all disabled:opacity-50">
            {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="text-sm text-ivory/60">
          {mode === "signin" ? "New to ethima?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-champagne hover:underline">
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <p className="text-sm text-ivory/60"><Link to="/" className="hover:text-champagne">← Back home</Link></p>
      </div>
    </PageShell>
  );
}
