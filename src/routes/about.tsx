import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Target, Users, Award } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Swastic Police Store, Rajkot" },
      { name: "description", content: "Swastic Police Store is Rajkot's trusted supplier of police uniforms, NCC products, footwear and accessories for over 10 years." },
      { property: "og:title", content: "About Swastic Police Store" },
      { property: "og:description", content: "Rajkot's trusted police & NCC uniform supplier for 10+ years." },
    ],
  }),
  component: About,
});

function About() {
  const { settings } = useStore();
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Who We Are</span>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-foreground">
            Rajkot's Most Trusted Police & NCC Supply Store
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {settings.storeName} is Gujarat's premier destination for official police uniforms, NCC products, tactical footwear and security accessories — trusted by thousands of police personnel, NCC cadets and security agencies across the region.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { Icon: ShieldCheck, title: "Regulation Grade", desc: "Every item meets official specifications and durability standards." },
            { Icon: Target, title: "Precision Tailoring", desc: "Accurate fits for all ranks, sizes and unit requirements." },
            { Icon: Users, title: "Trusted Supplier", desc: "Serving departments, NCC wings and agencies across Gujarat." },
            { Icon: Award, title: "10+ Years", desc: "A decade of reliable service and a 4.4★ rating." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <Icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 rounded-2xl border border-border bg-card p-8 md:grid-cols-3">
          {[
            ["300+", "Happy Customers"],
            ["4.4★", "Google Rating"],
            ["10+", "Years of Service"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-4xl font-bold text-gold">{n}</div>
              <div className="mt-1 text-sm uppercase tracking-wider text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex rounded-lg bg-gradient-gold px-7 py-3.5 font-display font-semibold uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5">
            Get in Touch
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
