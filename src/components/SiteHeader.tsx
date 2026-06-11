import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, Phone, Search, Shield } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Uniforms", to: "/uniforms" as const },
  { label: "Shoes", to: "/shoes" as const },
  { label: "NCC", to: "/ncc" as const },
  { label: "Security", to: "/security-uniforms" as const },
  { label: "Accessories", to: "/accessories" as const },
  { label: "Gallery", to: "/gallery" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const { settings } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q || undefined, cat: undefined } });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-gradient-navy/95 backdrop-blur">
      <div className="bg-navy/80 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <span className="hidden sm:inline">★ Rated 4.4/5 — 300+ Reviews · Mon–Sat 10AM–9PM</span>
          <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 font-medium text-gold">
            <Phone className="h-3 w-3" /> {settings.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-gold text-navy shadow-gold">
            {settings.logo ? (
              <img src={settings.logo} alt="logo" className="h-full w-full rounded-lg object-cover" />
            ) : (
              <Shield className="h-6 w-6" />
            )}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-wide text-foreground">
              {settings.storeName.split(" ")[0].toUpperCase()}
            </span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-gold">Police Store</span>
          </span>
        </Link>

        <form onSubmit={submitSearch} className="hidden flex-1 max-w-md items-center lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search uniforms, boots, badges…"
              className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            />
          </div>
        </form>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="hidden rounded-md border border-gold/40 px-3 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy sm:inline-block"
          >
            Admin
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground xl:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-navy xl:hidden">
          <form onSubmit={submitSearch} className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground focus:border-gold focus:outline-none"
              />
            </div>
          </form>
          <nav className="flex flex-col px-2 pb-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-card hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className={cn("mt-2 rounded-md bg-gradient-gold px-4 py-3 text-center text-sm font-semibold text-navy")}
            >
              Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
