import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductBrowser({
  title,
  subtitle,
  fixedCategorySlug,
  categorySlugs,
  initialQuery = "",
  initialCategorySlug,
  showCategoryFilter = true,
}: {
  title: string;
  subtitle?: string;
  fixedCategorySlug?: string;
  categorySlugs?: string[];
  initialQuery?: string;
  initialCategorySlug?: string;
  showCategoryFilter?: boolean;
}) {
  const data = useStore();
  const [q, setQ] = useState(initialQuery);
  const [activeCat, setActiveCat] = useState<string>(
    fixedCategorySlug ?? initialCategorySlug ?? "all",
  );
  const [sort, setSort] = useState<"new" | "low" | "high">("new");

  const categoryById = useMemo(
    () => Object.fromEntries(data.categories.map((c) => [c.id, c])),
    [data.categories],
  );

  const visibleCategories = useMemo(
    () =>
      categorySlugs
        ? data.categories.filter((c) => categorySlugs.includes(c.slug))
        : data.categories,
    [data.categories, categorySlugs],
  );

  const filtered = useMemo(() => {
    let list = data.products.filter((p) => p.status === "active");
    if (categorySlugs) {
      const ids = new Set(
        data.categories.filter((c) => categorySlugs.includes(c.slug)).map((c) => c.id),
      );
      list = list.filter((p) => ids.has(p.categoryId));
    }
    const slug = fixedCategorySlug ?? activeCat;
    if (slug && slug !== "all") {
      const cat = data.categories.find((c) => c.slug === slug);
      if (cat) list = list.filter((p) => p.categoryId === cat.id);
    }
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.description.toLowerCase().includes(t) ||
          p.sku.toLowerCase().includes(t),
      );
    }
    const price = (p: (typeof list)[number]) => p.discountPrice ?? p.price;
    if (sort === "low") list = [...list].sort((a, b) => price(a) - price(b));
    else if (sort === "high") list = [...list].sort((a, b) => price(b) - price(a));
    else list = [...list].sort((a, b) => b.createdAt - a.createdAt);
    return list;
  }, [data.products, data.categories, q, activeCat, fixedCategorySlug, categorySlugs, sort]);

  return (
    <>
      <section className="border-b border-border bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Catalogue</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-4 text-sm focus:border-gold focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:border-gold focus:outline-none"
            >
              <option value="new">Newest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {showCategoryFilter && !fixedCategorySlug && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCat("all")}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                activeCat === "all"
                  ? "border-gold bg-gradient-gold text-navy"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold",
              )}
            >
              All
            </button>
            {data.categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.slug)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  activeCat === c.slug
                    ? "border-gold bg-gradient-gold text-navy"
                    : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold",
                )}
              >
                <CategoryIcon name={c.icon} className="h-3.5 w-3.5" />
                {c.name}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
            No products found. Try a different search or category.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} category={categoryById[p.categoryId]} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
