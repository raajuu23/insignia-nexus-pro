import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductBrowser } from "@/components/ProductBrowser";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Belts, Caps, Badges & More | Swastic Police Store" },
      { name: "description", content: "Police duty belts, caps, rank badges, name plates, lanyards, whistles, gloves and general accessories in Rajkot." },
      { property: "og:title", content: "Accessories — Swastic Police Store" },
      { property: "og:description", content: "Belts, caps, badges, name plates, lanyards & accessories." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ProductBrowser
        title="Accessories"
        subtitle="Belts, caps, badges, name plates, lanyards and essential duty kit."
        categorySlugs={["belts", "caps", "badges", "name-plates", "lanyards", "accessories"]}
      />
    </SiteLayout>
  ),
});
