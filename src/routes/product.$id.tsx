import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Phone, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { useStore, formatINR, stockStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [{ title: "Product Details — Swastic Police Store" }],
  }),
  component: ProductDetails,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-6 rounded-lg bg-gradient-gold px-6 py-3 font-semibold text-navy"
          >
            Try again
          </button>
        </div>
      </SiteLayout>
    );
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Product not found</h1>
        <Link to="/shop" search={{ q: undefined, cat: undefined }} className="mt-6 inline-block rounded-lg bg-gradient-gold px-6 py-3 font-semibold text-navy">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
});

const toneClass: Record<string, string> = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
};

function ProductDetails() {
  const { id } = Route.useParams();
  const data = useStore();
  const product = data.products.find((p) => p.id === id);

  if (!product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Product not found</h1>
          <p className="mt-2 text-muted-foreground">It may have been removed.</p>
          <Link to="/shop" search={{ q: undefined, cat: undefined }} className="mt-6 inline-block rounded-lg bg-gradient-gold px-6 py-3 font-semibold text-navy">
            Back to shop
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const category = data.categories.find((c) => c.id === product.categoryId);
  const status = stockStatus(product);
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;
  const finalPrice = hasDiscount ? product.discountPrice! : product.price;

  const related = data.products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id && p.status === "active")
    .slice(0, 4);

  const waText = encodeURIComponent(
    `Hi ${data.settings.storeName}, I'm interested in "${product.name}" (SKU: ${product.sku}) priced at ${formatINR(finalPrice)}. Please share details.`,
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Link to="/shop" search={{ q: undefined, cat: undefined }} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="aspect-square">
              <ProductImage image={product.image} alt={product.name} icon={category?.icon ?? "Package"} />
            </div>
          </div>

          <div>
            {category && (
              <Link to="/shop" search={{ cat: category.slug, q: undefined }} className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {category.name}
              </Link>
            )}
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-gold">{formatINR(finalPrice)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatINR(product.price)}</span>
                  <span className="rounded-full bg-danger/15 px-2.5 py-1 text-xs font-semibold text-danger">
                    {Math.round((1 - finalPrice / product.price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className={cn("rounded-full px-3 py-1 text-sm font-semibold", toneClass[status.tone])}>
                {status.label}
              </span>
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${data.settings.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-success px-6 py-3.5 font-display font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp Inquiry
              </a>
              <a
                href={`tel:${data.settings.phone}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold px-6 py-3.5 font-display font-semibold uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" /> Call to Order
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { Icon: ShieldCheck, label: "Regulation grade" },
                { Icon: Truck, label: "Fast supply" },
                { Icon: RotateCcw, label: "Easy exchange" },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-3 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-gold" /> {label}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground">
                <Check className="h-4 w-4 text-success" /> Bulk orders welcome for departments, NCC units & agencies.
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Related Products</h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} category={category} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
