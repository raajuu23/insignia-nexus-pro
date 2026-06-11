import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductBrowser } from "@/components/ProductBrowser";

type ShopSearch = { q?: string; cat?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    cat: typeof search.cat === "string" ? search.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Products — Swastic Police Store" },
      { name: "description", content: "Browse all police uniforms, NCC kits, boots, badges and accessories. Search and filter by category." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { q, cat } = Route.useSearch();
  return (
    <SiteLayout>
      <ProductBrowser
        title="All Products"
        subtitle="Search the full catalogue and filter by category."
        initialQuery={q ?? ""}
        initialCategorySlug={cat}
      />
    </SiteLayout>
  );
}
