import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductImage } from "@/components/ProductImage";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Swastic Police Store, Rajkot" },
      { name: "description", content: "Photo gallery of our police uniforms, NCC kits, footwear and accessories supplied across Gujarat." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const data = useStore();
  const items = data.gallery.length
    ? data.gallery.map((g) => ({ url: g.url, caption: g.caption, image: g.url, icon: "Package" }))
    : data.products.slice(0, 12).map((p) => {
        const cat = data.categories.find((c) => c.id === p.categoryId);
        return { url: p.image, caption: p.name, image: p.image, icon: cat?.icon ?? "Package" };
      });

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our Work</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">Gallery</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">A look at the uniforms, gear and supplies we deliver.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((it, i) => (
            <figure key={i} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <div className="aspect-square overflow-hidden">
                <ProductImage image={it.image ?? null} alt={it.caption} icon={it.icon} className="transition-transform duration-500 group-hover:scale-110" />
              </div>
              <figcaption className="px-3 py-3 text-sm text-muted-foreground">{it.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
