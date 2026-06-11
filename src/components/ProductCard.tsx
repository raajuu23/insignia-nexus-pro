import { Link } from "@tanstack/react-router";
import { ProductImage } from "@/components/ProductImage";
import { formatINR, stockStatus, type Product, type Category } from "@/lib/store";
import { cn } from "@/lib/utils";

const toneClass: Record<string, string> = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
};

export function ProductCard({
  product,
  category,
}: {
  product: Product;
  category?: Category;
}) {
  const status = stockStatus(product);
  const hasDiscount = product.discountPrice != null && product.discountPrice < product.price;

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-gold"
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductImage
          image={product.image}
          alt={product.name}
          icon={category?.icon ?? "Package"}
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">
            Featured
          </span>
        )}
        <span
          className={cn(
            "absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold",
            toneClass[status.tone],
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {category && (
          <span className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
            {category.name}
          </span>
        )}
        <h3 className="font-display text-base font-semibold leading-snug text-foreground line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold text-gold">
              {formatINR(hasDiscount ? product.discountPrice! : product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(product.price)}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-gold transition-transform group-hover:translate-x-1">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
