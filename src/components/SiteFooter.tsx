import { Link } from "@tanstack/react-router";
import { Shield, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { useStore } from "@/lib/store";

export function SiteFooter() {
  const { settings, categories } = useStore();
  return (
    <footer className="border-t border-border bg-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-gold text-navy">
              <Shield className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold text-foreground">{settings.storeName}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {settings.tagline}. Trusted supplier of police uniforms, NCC products, footwear & accessories across Gujarat.
          </p>
          <div className="mt-4 flex gap-3">
            {settings.facebook && (
              <a href={settings.facebook} className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-gold">
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-gold">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {settings.youtube && (
              <a href={settings.youtube} className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-gold">
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to="/shop" search={{ cat: c.slug, q: undefined }} className="hover:text-gold">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-gold">Admin Panel</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> {settings.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {settings.email}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> {settings.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
      </div>
    </footer>
  );
}
