import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, Sparkles, Leaf, ShieldCheck, MessageSquare, Pencil, Search, Package, ArrowRight, User, Heart } from "lucide-react";
import heroRing from "@/assets/hero-ring.jpg";
import catRings from "@/assets/cat-rings.jpg";
import catPendants from "@/assets/cat-pendants.jpg";
import catEarrings from "@/assets/cat-earrings.jpg";
import catBracelets from "@/assets/cat-bracelets.jpg";
import handImg from "@/assets/process-hand.jpg";
import sketchImg from "@/assets/journey-sketch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ethima — Lab-Grown Diamond Jewellery, Made Around You" },
      { name: "description", content: "Personalised fine jewellery crafted with lab-grown diamonds. Designed around you, not a catalogue." },
      { property: "og:title", content: "ethima — Personalised Fine Jewellery" },
      { property: "og:description", content: "Lab-grown diamond jewellery designed around you." },
      { property: "og:image", content: heroRing },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Values />
      <Edit />
      <Process />
      <Journey />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroRing}
          alt="Lab-grown diamond solitaire ring on dark stone"
          className="h-full w-full object-cover opacity-90"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.022_200/0.92)] via-[oklch(0.16_0.025_200/0.6)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.022_200)] via-transparent to-[oklch(0.14_0.022_200/0.4)]" />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-[1400px] items-center px-6 pt-32 pb-24 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow animate-fade-up">Personalised. Intentional. Yours.</p>
          <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.02] text-ivory md:text-6xl lg:text-[5rem] animate-fade-up delay-150">
            <span className="italic font-light">Designed</span> around you,<br />
            <span className="italic font-light">not</span> a catalogue.
          </h1>
          <div className="mt-9 h-px w-16 bg-champagne/60 animate-fade-up delay-300" />
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/80 font-light animate-fade-up delay-300">
            Modern, minimal and meaningful jewellery crafted with lab-grown diamonds.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up delay-500">
            <Link
              to="/customise"
              className="group btn-glow inline-flex items-center gap-3 bg-champagne px-8 py-4 text-[0.7rem] tracking-[0.32em] uppercase text-primary-foreground transition-all hover:bg-ivory"
            >
              Start Your Piece
            </Link>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-3 border border-champagne/60 px-8 py-4 text-[0.7rem] tracking-[0.32em] uppercase text-ivory transition-all hover:bg-champagne hover:text-primary-foreground"
            >
              Book Your Consultation
            </Link>
          </div>

          <Link to="/collections" className="link-underline mt-12 inline-flex items-center gap-3 text-[0.7rem] tracking-[0.32em] uppercase text-champagne animate-fade-up delay-500">
            Explore the ethima Edit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-champagne/40 text-[0.55rem] tracking-[0.28em] uppercase text-champagne">
          <span className="absolute">Lab • Grown<br />Diamonds</span>
        </div>
      </div>
    </section>
  );
}

const VALUES = [
  { icon: Gem, title: "Lab-Grown Diamonds", text: "Ethical. Sustainable. Beautiful." },
  { icon: Sparkles, title: "Made For You", text: "Personalised to reflect your story." },
  { icon: Leaf, title: "Thoughtful Luxury", text: "Quiet luxury. Timeless everyday pieces." },
  { icon: ShieldCheck, title: "Trust & Care", text: "Honest process. Lifetime support." },
];

function Values() {
  return (
    <section className="border-y border-border bg-[oklch(0.14_0.022_200/0.6)]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-2 md:divide-x md:divide-border lg:grid-cols-4 lg:px-10">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="px-6 text-center">
            <Icon className="mx-auto h-8 w-8 text-champagne" strokeWidth={1.2} />
            <h3 className="mt-5 text-[0.72rem] tracking-[0.28em] uppercase text-ivory">{title}</h3>
            <p className="mt-3 text-sm text-ivory/65">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const CATS = [
  { label: "Rings", img: catRings },
  { label: "Pendants", img: catPendants },
  { label: "Earrings", img: catEarrings },
  { label: "Bracelets", img: catBracelets },
];

function Edit() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
        <div className="lg:pt-8">
          <p className="eyebrow">The ethima Edit</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-5xl">
            Minimal pieces.<br />Meaningful stories.
          </h2>
          <div className="mt-6 h-px w-16 bg-champagne/60" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
            A curated collection of everyday jewellery that blends simplicity with intention.
          </p>
          <Link to="/collections" className="mt-8 inline-flex items-center gap-3 text-[0.7rem] tracking-[0.28em] uppercase text-champagne hover:text-ivory">
            Explore / Shop the ethima edit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATS.map((c) => (
            <Link
              to="/collections"
              key={c.label}
              className="group relative block aspect-[3/4] overflow-hidden bg-secondary"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_200/0.9)] via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory">{c.label}</p>
                <span className="mt-1 inline-flex items-center gap-2 text-xs text-champagne">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: MessageSquare, n: "01", title: "Consult", text: "Share your ideas and inspiration with us." },
  { icon: Pencil, n: "02", title: "Design", text: "We create a CAD and refine it together." },
  { icon: Gem, n: "03", title: "Craft", text: "Expertly handcrafted just for you." },
  { icon: Search, n: "04", title: "Review", text: "You review, we perfect every detail." },
  { icon: Package, n: "05", title: "Deliver", text: "Your piece, delivered with care." },
];

function Process() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-[oklch(0.14_0.022_200/0.7)]">
      <div className="grid lg:grid-cols-[2fr_1fr]">
        <div className="px-6 py-20 lg:px-10">
          <div className="text-center">
            <p className="eyebrow">The ethima Experience</p>
            <h2 className="mt-4 font-serif text-4xl text-ivory md:text-5xl">Your piece, your way.</h2>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
            {STEPS.map(({ icon: Icon, n, title, text }, i) => (
              <div key={n} className="relative flex flex-col items-center text-center px-2">
                {i > 0 && (
                  <div className="absolute left-0 top-7 hidden h-px w-1/2 -translate-x-1/2 border-t border-dashed border-champagne/30 md:block" />
                )}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-champagne/50 bg-background">
                  <Icon className="h-5 w-5 text-champagne" strokeWidth={1.2} />
                </div>
                <p className="mt-4 text-xs tracking-[0.2em] text-champagne">{n}</p>
                <h3 className="mt-1 font-serif text-xl text-ivory">{title}</h3>
                <p className="mt-2 max-w-[12rem] text-xs leading-relaxed text-ivory/60">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/process" className="inline-flex items-center gap-3 border border-champagne/60 px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-champagne hover:bg-champagne hover:text-primary-foreground transition-all">
              Learn more about our process
            </Link>
          </div>
        </div>

        <div className="relative hidden min-h-[400px] lg:block">
          <img src={handImg} alt="Hand wearing ethima ring" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[oklch(0.14_0.022_200/0.9)]" />
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
      <div className="overflow-hidden border border-border bg-[oklch(0.16_0.025_200/0.7)]">
        <div className="grid md:grid-cols-[1fr_1.4fr]">
          <div className="relative aspect-[4/3] md:aspect-auto">
            <img src={sketchImg} alt="Jewellery sketch" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
            <div>
              <p className="eyebrow">Let's create something meaningful</p>
              <h2 className="mt-4 font-serif text-4xl text-ivory">Begin your journey.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70">
                Book a one-on-one consultation and let us design a piece that's truly yours.
              </p>
              <Link to="/consultation" className="mt-6 inline-flex items-center gap-3 border border-champagne/60 px-6 py-3 text-[0.65rem] tracking-[0.28em] uppercase text-champagne hover:bg-champagne hover:text-primary-foreground transition-all">
                Book Your Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-4 text-sm text-ivory/80">
              <li className="flex items-center gap-3"><User className="h-4 w-4 text-champagne" /> Personal consultation</li>
              <li className="flex items-center gap-3"><Gem className="h-4 w-4 text-champagne" /> Bespoke design support</li>
              <li className="flex items-center gap-3"><Heart className="h-4 w-4 text-champagne" /> No obligation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
