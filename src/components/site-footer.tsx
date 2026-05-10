import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[oklch(0.14_0.022_200/0.6)]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-serif text-4xl italic text-ivory">ethima</span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/70 font-light">
              Personalised fine jewellery crafted with lab-grown diamonds.
            </p>
            <div className="mt-6 flex items-center gap-4 text-champagne/80">
              <a href="#" aria-label="Instagram" className="hover:text-champagne"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="WhatsApp" className="hover:text-champagne"><MessageCircle className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="hover:text-champagne"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Email" className="hover:text-champagne"><Mail className="h-4 w-4" /></a>
            </div>
          </div>

          <FooterCol title="Shop" links={[
            ["Rings", "/collections"],
            ["Pendants", "/collections"],
            ["Earrings", "/collections"],
            ["Bracelets", "/collections"],
          ]} />
          <FooterCol title="Information" links={[
            ["Our Process", "/process"],
            ["FAQs", "/education"],
            ["Warranty", "/education"],
            ["Care Guide", "/education"],
          ]} />
          <FooterCol title="About" links={[
            ["Our Story", "/about"],
            ["Journal", "/education"],
            ["Sustainability", "/education"],
            ["Contact Us", "/contact"],
          ]} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-ivory/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ethima. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-champagne">Privacy Policy</a>
            <a href="#" className="hover:text-champagne">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-[0.7rem] tracking-[0.28em] uppercase text-champagne">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm text-ivory/75">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="hover:text-champagne">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
