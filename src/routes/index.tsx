import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Gem, MessageSquare, Pencil, Package, ArrowRight, User, Heart, ChevronRight } from "lucide-react";
import heroRing from "@/assets/hero-ring.jpg";
import handImg from "@/assets/process-hand.jpg";
import sketchImg from "@/assets/journey-sketch.jpg";
import { PRODUCTS, formatPrice } from "@/data/products";
import { SITE_URL_CONST } from "@/components/seo";

export const Route = createFileRoute("/")({
  head: () => ({
  meta: [
    { title: "ethima — Lab-Grown Diamond Jewellery | Personalised Fine Jewellery India" },
    { name: "description", content: "Shop personalised lab-grown diamond jewellery at ethima. Rings, pendants, earrings and bracelets crafted to order. Elegance within reach." },
    { name: "keywords", content: "lab grown diamond jewellery india, personalised jewellery, custom diamond rings, ethima, fine jewellery india, lab diamond pendants, diamond earrings india" },
    { property: "og:title", content: "ethima — Lab-Grown Diamond Jewellery India" },
    { property: "og:description", content: "Personalised fine jewellery crafted with lab-grown diamonds. Designed around you, not a catalogue." },
    { property: "og:image", content: `${SITE_URL_CONST}/og-image.jpg` },
    { property: "og:url", content: "https://ethima.in" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "ethima — Lab-Grown Diamond Jewellery India" },
    { name: "twitter:description", content: "Personalised fine jewellery crafted with lab-grown diamonds." },
    { name: "robots", content: "index, follow" },
  ],
  links: [{ rel: "canonical", href: "https://ethima.in" }],
}),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ProductsCarousel />
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
          <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.02] text-ivory md:text-6xl lg:text-[5rem] animate-fade-up delay-150">
            <span className="italic font-light">Designed</span> around you,<br />
            <span className="italic font-light">not</span> a catalogue.
          </h1>
          <div className="mt-9 h-px w-16 bg-champagne/60 animate-fade-up delay-300" />
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/80 font-light animate-fade-up delay-300">
            Fine jewellery and meaningful custom pieces, crafted in lab-grown diamonds.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up delay-500">
            <Link
              to="/collections"
              className="group btn-glow inline-flex items-center gap-3 bg-champagne px-8 py-4 text-[0.7rem] tracking-[0.32em] uppercase text-primary-foreground transition-all hover:bg-ivory"
            >
              Explore the Collection
            </Link>
            <Link
              to="/customise"
              className="inline-flex items-center gap-3 border border-champagne/60 px-8 py-4 text-[0.7rem] tracking-[0.32em] uppercase text-ivory transition-all hover:bg-champagne hover:text-primary-foreground"
            >
              Create Your Piece
            </Link>
          </div>
        </div>
      </div>
      </section>
  );
}

const VALUES = [
  { title: "Designed Around You", text: "Every ethima piece is crafted to order with personalised details, metal choices, and lab-grown diamond customisation options." },
  { title: "Lab-Grown Diamonds", text: "Selected for brilliance, quality, and conscious craftsmanship." },
  { title: "Made-To-Order", text: "Each piece is produced after confirmation to focus on intentional craftsmanship over mass production." },
  { title: "Consultation-Led Experience", text: "Book a personalised consultation to design your piece with us." },
];

function Values() {
  return (
    <section className="border-y border-border bg-[oklch(0.14_0.022_200/0.6)]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-2 md:divide-x md:divide-border lg:grid-cols-4 lg:px-10">
        {VALUES.map(({ title, text }) => (
          <div key={title} className="px-6 text-center">
            <h3 className="text-[0.72rem] tracking-[0.28em] uppercase text-ivory">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ivory/65">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
function Edit() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* The ethima Edit */}
        <div className="group relative border border-champagne/15 bg-gradient-to-b from-[oklch(0.18_0.030_200/0.6)] to-[oklch(0.14_0.020_200/0.7)] p-8 md:p-12 transition-all duration-500 hover:border-champagne/30">
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="relative">
            <p className="eyebrow text-champagne">The ethima Edit</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-ivory md:text-4xl">Design-led everyday fine jewellery.</h2>
            <div className="mt-5 h-px w-14 bg-gradient-to-r from-champagne/60 to-transparent" />
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/80">
              <Link to="/collections" search={{ collection: "ethima-edit", category: "rings" }} className="relative tracking-wide hover:text-champagne transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-champagne/60 after:transition-all after:duration-300 hover:after:w-full">Rings</Link>
              <Link to="/collections" search={{ collection: "ethima-edit", category: "earrings" }} className="relative tracking-wide hover:text-champagne transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-champagne/60 after:transition-all after:duration-300 hover:after:w-full">Earrings</Link>
              <Link to="/collections" search={{ collection: "ethima-edit", category: "pendants" }} className="relative tracking-wide hover:text-champagne transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-champagne/60 after:transition-all after:duration-300 hover:after:w-full">Pendants</Link>
            </div>
            <Link
              to="/collections"
              search={{ collection: "ethima-edit" }}
              className="mt-10 inline-flex items-center gap-3 border border-champagne/50 px-7 py-3.5 text-[0.65rem] tracking-[0.28em] uppercase text-champagne transition-all duration-300 hover:bg-champagne hover:text-primary-foreground hover:border-champagne hover:shadow-lg hover:shadow-champagne/10"
            >
              Explore the <span className="lowercase-ethima">ethima</span> Edit <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* The Personal Edit */}
        <div className="group relative border border-champagne/15 bg-gradient-to-b from-[oklch(0.18_0.030_200/0.6)] to-[oklch(0.14_0.020_200/0.7)] p-8 md:p-12 transition-all duration-500 hover:border-champagne/30">
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="relative">
            <p className="eyebrow text-champagne">The Personal Edit</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-ivory md:text-4xl">Meaning-led jewellery designed around your story.</h2>
            <div className="mt-5 h-px w-14 bg-gradient-to-r from-champagne/60 to-transparent" />
            <ul className="mt-7 space-y-4 text-sm text-ivory/80">
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-champagne/60" />
                <Link to="/products/$slug" params={{ slug: "initial-pendant" }} className="tracking-wide hover:text-champagne transition-colors duration-300">Initials</Link>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-champagne/50">· Initial Pendant</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-champagne/60" />
                <Link to="/products/$slug" params={{ slug: "zodiac-pendant" }} className="tracking-wide hover:text-champagne transition-colors duration-300">Zodiac</Link>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-champagne/50">· Zodiac Pendant</span>
              </li>
              <li className="pt-3 text-[0.6rem] tracking-[0.22em] uppercase text-champagne/40">
                More personalised collections arriving soon
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/collections"
                search={{ collection: "personal-edit" }}
                className="inline-flex items-center gap-3 border border-champagne/50 px-7 py-3.5 text-[0.65rem] tracking-[0.28em] uppercase text-champagne transition-all duration-300 hover:bg-champagne hover:text-primary-foreground hover:border-champagne hover:shadow-lg hover:shadow-champagne/10"
              >
                Explore the Personal Edit <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/customise"
        className="group mt-14 flex items-center justify-between gap-4 border border-champagne/15 bg-gradient-to-r from-[oklch(0.18_0.028_200/0.4)] to-[oklch(0.14_0.020_200/0.5)] px-7 py-5 text-sm text-ivory/80 hover:border-champagne/40 transition-all duration-300"
      >
        <span>Can't find what you're looking for? <span className="text-champagne underline underline-offset-4 decoration-champagne/40 transition-all duration-300 group-hover:decoration-champagne">Design a bespoke piece with us</span></span>
        <ArrowRight className="h-5 w-5 shrink-0 text-champagne transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </section>
  );
}

const STEPS = [
  { icon: MessageSquare, n: "01", title: "Consult", text: "Share your vision, inspiration, and ideas with us." },
  { icon: Pencil, n: "02", title: "Design & Approval", text: "We create a CAD render and refine every detail until you love it." },
  { icon: Gem, n: "03", title: "Craft", text: "Your approved design is expertly handcrafted just for you." },
  { icon: Package, n: "04", title: "Deliver", text: "Your piece, packaged beautifully and delivered with care." },
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

          <div className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-4">
            {STEPS.map(({ icon: Icon, n, title, text }, i) => (
              <div key={n} className="relative flex flex-col items-center text-center px-2">
                {i > 0 && (
                  <div className="absolute left-0 top-7 hidden h-px w-1/2 -translate-x-1/2 border-t border-dashed border-champagne/30 sm:block" />
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

function ProductsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const ptr = useRef({ down: false, startX: 0, startPos: 0, dragX: 0, moved: false });

  const items = PRODUCTS.map((p) => {
    const img = p.images.silver?.[0] || p.images.gold?.[0] || "";
    const minPrice = Math.min(...p.variants.map((v) => v.price));
    return { slug: p.slug, name: p.name, img, minPrice };
  });

  const CARD_W = 280;
  const GAP = 16;
  const doubled = [...items, ...items, ...items];
  const trackW = items.length * (CARD_W + GAP);

  const updatePos = (x: number) => {
    posRef.current = x;
    if (trackRef.current) trackRef.current.style.transform = `translateX(${x}px)`;
  };

  const startScroll = () => {
    const step = () => {
      const next = posRef.current - 1.5;
      if (next <= -trackW * 2) {
        posRef.current = 0;
      } else {
        posRef.current = next;
      }
      if (trackRef.current) trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  const stopScroll = () => {
    if (animRef.current !== null) { cancelAnimationFrame(animRef.current); animRef.current = null; }
  };

  useEffect(() => { startScroll(); return () => stopScroll(); }, []);

  const onDown = (e: React.PointerEvent) => {
    stopScroll();
    ptr.current = { down: true, startX: e.clientX, startPos: posRef.current, dragX: 0, moved: false };
  };

  const onMove = (e: React.PointerEvent) => {
    if (!ptr.current.down || !trackRef.current) return;
    const dx = e.clientX - ptr.current.startX;
    if (Math.abs(dx) > 6) ptr.current.moved = true;
    ptr.current.dragX = dx;
    trackRef.current.style.transform = `translateX(${ptr.current.startPos + dx}px)`;
    trackRef.current.style.transition = "none";
  };

  const onUp = () => {
    if (!ptr.current.moved) {
      ptr.current.down = false;
      startScroll();
      return;
    }
    if (Math.abs(ptr.current.dragX) > 40 && trackRef.current) {
      const dir = ptr.current.dragX > 0 ? 1 : -1;
      const snap = dir * (CARD_W + GAP);
      const target = ptr.current.startPos + snap;
      trackRef.current.style.transition = "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      trackRef.current.style.transform = `translateX(${target}px)`;
      posRef.current = target;
      setTimeout(() => startScroll(), 350);
    } else {
      if (trackRef.current) {
        trackRef.current.style.transition = "transform 0.25s ease";
        trackRef.current.style.transform = `translateX(${ptr.current.startPos}px)`;
        posRef.current = ptr.current.startPos;
      }
      setTimeout(() => startScroll(), 250);
    }
    ptr.current.down = false;
  };

  return (
    <section className="overflow-hidden border-b border-border bg-[oklch(0.13_0.02_200)] py-16">
      <div className="mx-auto mb-10 flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <div>
          <p className="eyebrow">The Collection</p>
          <h2 className="mt-2 font-serif text-3xl text-ivory md:text-4xl">Discover our pieces</h2>
        </div>
        <Link to="/collections" className="hidden items-center gap-2 text-[0.65rem] tracking-[0.28em] uppercase text-champagne hover:text-ivory transition-colors sm:inline-flex">
          View all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div
        className="select-none"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: `${GAP}px`,
            width: `${doubled.length * (CARD_W + GAP)}px`,
            willChange: "transform",
          }}
        >
          {doubled.map((item, i) => (
            <Link
              key={`${item.slug}-${i}`}
              to="/products/$slug"
              params={{ slug: item.slug }}
              className="block shrink-0"
              style={{ width: `${CARD_W}px` }}
              onClick={(e) => { if (ptr.current.moved) e.preventDefault(); }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-[oklch(0.16_0.025_200)]">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-4 px-1">
                <p className="text-sm text-ivory/90 truncate">{item.name}</p>
                <p className="mt-1 text-xs text-champagne/80">from {formatPrice(item.minPrice)}</p>
              </div>
            </Link>
          ))}
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
