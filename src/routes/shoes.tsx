import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductBrowser } from "@/components/ProductBrowser";

export const Route = createFileRoute("/shoes")({
  head: () => ({
    meta: [
      { title: "Shoes & Boots — Swastic Police Store, Rajkot" },
      { name: "description", content: "Tactical duty boots, parade shoes and DMS jungle boots for police, NCC and security personnel." },
      { property: "og:title", content: "Shoes & Boots — Swastic Police Store" },
      { property: "og:description", content: "Tactical duty boots and parade footwear." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ProductBrowser
        title="Shoes & Boots"
        subtitle="Duty boots, parade shoes and tactical footwear for every rank."
        fixedCategorySlug="shoes-boots"
      />
    </SiteLayout>
  ),
});
