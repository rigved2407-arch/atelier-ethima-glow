import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PageShell } from "@/components/page-shell";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ethima" },
      { name: "description", content: "Sign in or create an ethima account to track your bespoke pieces and consultations." },
      { name: "robots", content: "noindex, nofollow" },
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
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const redirectTo = new URLSearchParams(window.location.search).get("redirect") || "/account";

  useEffect(() => {
    if (!loading && user) window.location.href = redirectTo;
  }, [user, loading, redirectTo]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, name: mode === "signup" ? name : undefined });
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: signUpErr } = await supabase.auth.signUp({
          email, password,
          options: { data: { display_name: name } },
        });
        if (signUpErr) throw signUpErr;
      }
      const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signInErr) throw signInErr;
      window.location.href = redirectTo;
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally { setBusy(false); }
  }

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center">
        <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-champagne" />
      </div>
    );
  }

  const input = "w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none pr-10";

  return (
    <PageShell eyebrow="Your account" title={mode === "signin" ? "Welcome back." : "Create an account."} intro="Track your consultations, bespoke requests, and the pieces you've imagined.">
      <div className="max-w-md space-y-6">
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <input autoFocus className={input} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <input
            autoFocus={mode === "signin"}
            type="email" required className={input} placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPw ? "text" : "password"} required minLength={8}
              className={input} placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ivory/50 hover:text-champagne">
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" disabled={busy} className="w-full bg-champagne px-6 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all disabled:opacity-50">
            {busy ? <span className="inline-flex items-center gap-2"><LoaderCircle className="h-4 w-4 animate-spin" /> {mode === "signin" ? "Signing in..." : "Creating..."}</span> : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <p className="text-sm text-ivory/60">
          {mode === "signin" ? "New to ethima?" : "Already have an account?"}{" "}
          <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setShowPw(false); }} className="text-champagne hover:underline">
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <p className="text-sm text-ivory/60"><Link to="/" className="hover:text-champagne">← Back home</Link></p>
      </div>
    </PageShell>
  );
}
