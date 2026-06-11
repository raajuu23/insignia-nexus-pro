import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, BadgeCheck, Headset, ArrowRight, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swastic Police Store — Rajkot's Trusted Police Uniform & Accessories Supplier" },
      { name: "description", content: "Buy police uniforms, NCC products, tactical boots, badges & security accessories in Rajkot. Regulation-grade supplies trusted by Gujarat Police & NCC cadets." },
      { property: "og:title", content: "Swastic Police Store — Rajkot's No.1 Police Supply Store" },
      { property: "og:description", content: "Police uniforms, NCC kits, tactical footwear & accessories. Trusted across Gujarat." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: ShieldCheck, title: "Regulation Grade", desc: "Official spec uniforms & gear." },
  { icon: BadgeCheck, title: "Genuine Quality", desc: "Durable, tested materials." },
  { icon: Truck, title: "Fast Supply", desc: "Bulk & retail orders delivered." },
  { icon: Headset, title: "Expert Support", desc: "10+ years serving Gujarat." },
];

function Home() {
  const data = useStore();
  const featured = data.products.filter((p) => p.featured && p.status === "active").slice(0, 8);
  const categoryById = Object.fromEntries(data.categories.map((c) => [c.id, c]));

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-navy">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
              <span className="h-2 w-2 rounded-full bg-gold" /> {data.settings.tagline}
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-foreground md:text-6xl">
              Uniform. Gear.
              <br />
              <span className="text-gradient-gold italic">Authority.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Gujarat's trusted source for police uniforms, NCC products, tactical footwear and official accessories — serving personnel, cadets & security agencies.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/shop" search={{ q: undefined, cat: undefined }} className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-7 py-3.5 font-display font-semibold uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5 hover:shadow-gold">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg border-2 border-border px-7 py-3.5 font-display font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-gold hover:text-gold">
                Get Enquiry
              </Link>
            </div>
            <div className="mt-10 flex gap-10">
              {[
                ["300+", "Happy Customers"],
                ["4.4★", "Google Rating"],
                ["10+", "Years Serving"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-gold">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-gold/20 shadow-card">
              <img src={heroImg} alt="Police uniform, boots, cap and badges" width={1600} height={1024} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                <t.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display font-semibold text-foreground">{t.title}</div>
                <div className="text-sm text-muted-foreground">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Shop by Category</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Everything On Duty</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {data.categories.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ cat: c.slug, q: undefined }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-gold"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gradient-gold group-hover:text-navy">
                <CategoryIcon name={c.icon} className="h-6 w-6" />
              </span>
              <span className="font-display text-sm font-semibold text-foreground">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Best Sellers</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Featured Products</h2>
            </div>
            <Link to="/shop" search={{ q: undefined, cat: undefined }} className="hidden items-center gap-2 font-semibold text-gold hover:underline sm:flex">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} category={categoryById[p.categoryId]} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center">
          <Star className="h-8 w-8 text-gold" />
          <h2 className="max-w-2xl font-display text-3xl font-bold text-foreground md:text-4xl">
            Need bulk uniforms for your unit or agency?
          </h2>
          <p className="max-w-xl text-muted-foreground">
            We supply police departments, NCC wings and security agencies across Gujarat. Get a custom quote today.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-7 py-3.5 font-display font-semibold uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5 hover:shadow-gold">
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
