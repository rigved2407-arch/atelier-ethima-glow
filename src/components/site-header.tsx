import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X, MessageCircle, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import ethimaLogo from "@/assets/Ethima-logo.jpg";

const COLLECTION_CATEGORIES = [
  { to: "/collections?category=rings", label: "Rings" },
  { to: "/collections?category=pendants", label: "Pendants" },
  { to: "/collections?category=earrings", label: "Earrings" },
  { to: "/collections?category=bracelets", label: "Bracelets" },
];

const NAV = [
  { to: "/customise", label: "Customise" },
  { to: "/process", label: "Our Process" },
  { to: "/about", label: "About" },
  { to: "/education", label: "Education" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCollectionsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setCollectionsOpen(false), 150);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[oklch(0.14_0.022_200/0.75)] border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">

        {/* Logo */}
        <Link to="/" className="group flex flex-col leading-none">
          <img
            src={ethimaLogo}
            alt="ethima"
            className="h-10 w-auto object-contain"
          />
          <span className="mt-1.5 text-[0.55rem] tracking-[0.34em] text-champagne uppercase font-light">
            Elegance within reach
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {/* Collections with dropdown */}
          <div
            ref={collectionsRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/collections"
              className="flex items-center gap-1 text-[0.7rem] tracking-[0.28em] uppercase text-ivory/85 transition-colors hover:text-champagne"
            >
              Collections
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-300 ${collectionsOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {/* Dropdown */}
            <div
              className={`absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-all duration-300 ${
                collectionsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="relative border border-border bg-[oklch(0.14_0.022_200/0.96)] backdrop-blur-md py-3 min-w-[160px]">
                {/* top accent line */}
                <div className="absolute top-0 left-4 right-4 h-px bg-champagne/30" />
                {COLLECTION_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.to}
                    to={cat.to}
                    className="block px-6 py-2.5 text-[0.65rem] tracking-[0.28em] uppercase text-ivory/80 transition-colors hover:text-champagne hover:bg-champagne/5"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Rest of nav */}
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
          <AccountIcon />
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

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-[oklch(0.14_0.022_200/0.96)] backdrop-blur-md">
          <nav className="flex flex-col px-6 py-6">
            {/* Collections with sub-items on mobile */}
            <p className="py-3 text-sm tracking-[0.24em] uppercase text-ivory/90">Collections</p>
            <div className="pl-4 flex flex-col border-l border-champagne/20 mb-2">
              {COLLECTION_CATEGORIES.map((cat) => (
                <Link
                  key={cat.to}
                  to={cat.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-xs tracking-[0.24em] uppercase text-ivory/70 hover:text-champagne"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

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

function AccountIcon() {
  const { user } = useAuth();
  return (
    <Link
      to={user ? "/account" : "/auth"}
      aria-label="Account"
      className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/40 text-champagne transition-colors hover:bg-champagne hover:text-primary-foreground"
    >
      <User className="h-4 w-4" />
    </Link>
  );
}
