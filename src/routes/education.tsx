import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Gem, Leaf, ShieldCheck, Sparkles, BookOpen, Ruler, Award } from "lucide-react";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — Lab-Grown Diamonds & Customisation | ethima" },
      { name: "description", content: "Learn about lab-grown diamonds, the 4Cs, certification, ring sizing, and how ethima crafts personalised fine jewellery." },
      { property: "og:title", content: "ethima Education — Lab-Grown Diamonds & Customisation" },
      { property: "og:description", content: "Everything you need to know about lab-grown diamonds and personalising your piece." },
    ],
  }),
  component: Education,
});

function Education() {
  return (
    <PageShell
      eyebrow="Know More"
      title="Education."
      intro="Diamonds are no longer a privilege of the few. Learn how lab-grown stones, ethical craftsmanship, and personalisation are redefining fine jewellery."
    >
      {/* Lab-grown intro */}
      <section className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">Lab-Grown Diamonds</p>
          <h2 className="mt-4 font-serif text-3xl text-ivory md:text-4xl">Anybody can buy a diamond.</h2>
          <p className="mt-6 text-base leading-relaxed text-ivory/80">
            Lab-grown diamonds are real diamonds — born in a controlled environment that mirrors the conditions deep within the Earth. They are chemically, physically and optically identical to mined diamonds, certified by the same global laboratories.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ivory/70">
            What makes them remarkable is not just their brilliance, but the kindness behind them — no mining, no displacement, and a fraction of the environmental footprint.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Gem, t: "Identical Beauty", d: "Same crystal structure, same fire, same sparkle." },
            { icon: Leaf, t: "Ethically Grown", d: "No mining, no human cost, traceable origins." },
            { icon: ShieldCheck, t: "Certified", d: "IGI / GIA grading on every loose diamond." },
            { icon: Sparkles, t: "Better Value", d: "Larger, finer stones at a more accessible price." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="border border-border p-6 bg-[oklch(0.16_0.025_200/0.5)]">
              <Icon className="h-6 w-6 text-champagne" strokeWidth={1.2} />
              <h3 className="mt-4 text-[0.7rem] tracking-[0.28em] uppercase text-ivory">{t}</h3>
              <p className="mt-2 text-sm text-ivory/65">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 4Cs */}
      <section className="mt-24 border-t border-border pt-16">
        <p className="eyebrow">Diamond Education</p>
        <h2 className="mt-4 font-serif text-3xl text-ivory md:text-4xl">The Four Cs.</h2>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-4">
          {[
            ["Cut", "The most important C. Cut determines how a diamond catches light — its fire, brilliance, and life."],
            ["Colour", "Graded D (colourless) to Z. We recommend D–G for an icy, white appearance."],
            ["Clarity", "From FL (flawless) to I (included). VS1–VS2 offers eye-clean beauty without compromise."],
            ["Carat", "Carat is weight, not size. Pair carat with proportion for maximum visual impact."],
          ].map(([t, d]) => (
            <div key={t} className="bg-background p-8">
              <h3 className="font-serif text-2xl text-champagne">{t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customisation */}
      <section className="mt-24 border-t border-border pt-16">
        <p className="eyebrow">Customisation</p>
        <h2 className="mt-4 font-serif text-3xl text-ivory md:text-4xl">Designed around you.</h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/80">
          Every ethima piece is made to order. From the first sketch to the final polish, you remain part of the process.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            ["Choose Your Metal", "925 sterling silver, 10KT yellow, white, or rose gold — each finished by hand."],
            ["Choose Your Stone", "Round, oval, pear, emerald, cushion, or marquise — paired to your design."],
            ["Make It Personal", "Engravings, hidden details, custom sizes — the small touches that make it yours."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="font-serif text-2xl text-ivory">{t}</h3>
              <div className="mt-3 h-px w-10 bg-champagne/60" />
              <p className="mt-4 text-sm leading-relaxed text-ivory/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resource cards */}
      <section className="mt-24 border-t border-border pt-16">
        <p className="eyebrow">Resources</p>
        <h2 className="mt-4 font-serif text-3xl text-ivory md:text-4xl">Helpful guides.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: Award, t: "Certification", d: "Every loose diamond is independently graded by IGI or GIA." },
            { icon: Ruler, t: "Ring Size Guide", d: "Measure an existing ring or your finger circumference at home." },
            { icon: BookOpen, t: "Care & Warranty", d: "Lifetime support, complimentary cleaning and resizing." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="group border border-border p-8 hover:border-champagne/60 transition-colors bg-[oklch(0.16_0.025_200/0.5)]">
              <Icon className="h-7 w-7 text-champagne" strokeWidth={1.2} />
              <h3 className="mt-5 font-serif text-2xl text-ivory">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20 flex flex-wrap gap-4">
        <Link to="/customise" className="inline-flex items-center bg-champagne px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-primary-foreground hover:bg-ivory transition-all">
          Start Your Piece
        </Link>
        <Link to="/consultation" className="inline-flex items-center border border-champagne/60 px-7 py-4 text-[0.7rem] tracking-[0.28em] uppercase text-ivory hover:bg-champagne hover:text-primary-foreground transition-all">
          Book Consultation
        </Link>
      </div>
    </PageShell>
  );
}
