import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductBrowser } from "@/components/ProductBrowser";

export const Route = createFileRoute("/uniforms")({
  head: () => ({
    meta: [
      { title: "Police Uniforms — Swastic Police Store, Rajkot" },
      { name: "description", content: "Regulation-grade Gujarat Police khaki uniforms, service shirts and combat jackets. Precision tailoring, trusted quality." },
      { property: "og:title", content: "Police Uniforms — Swastic Police Store" },
      { property: "og:description", content: "Regulation-grade police uniforms and service wear." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ProductBrowser
        title="Police Uniforms"
        subtitle="Regulation-grade Gujarat Police uniforms with precision tailoring."
        fixedCategorySlug="police-uniforms"
      />
    </SiteLayout>
  ),
});
