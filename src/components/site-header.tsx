import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const NAV = [
  { to: "/collections", label: "Collections" },
  { to: "/customise", label: "Customise" },
  { to: "/process", label: "Our Process" },
  { to: "/about", label: "About" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[oklch(0.14_0.022_200/0.75)] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-serif text-3xl tracking-tight text-ivory">ethima</span>
          <span className="mt-1 text-[0.55rem] tracking-[0.32em] text-champagne uppercase">
            Personalised Fine Jewellery
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory/85 transition-colors hover:text-champagne"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/consultation"
            className="hidden md:inline-flex items-center border border-champagne/60 px-5 py-3 text-[0.65rem] tracking-[0.28em] uppercase text-ivory transition-all hover:bg-champagne hover:text-primary-foreground"
          >
            Book Consultation
          </Link>
          <a
            href="#"
            aria-label="WhatsApp"
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 text-champagne transition-colors hover:bg-champagne hover:text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden text-ivory"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-[oklch(0.14_0.022_200/0.96)] backdrop-blur-md">
          <nav className="flex flex-col px-6 py-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-[0.24em] uppercase text-ivory/90 hover:text-champagne"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/consultation"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center border border-champagne/60 px-5 py-3 text-[0.65rem] tracking-[0.28em] uppercase text-ivory"
            >
              Book Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
