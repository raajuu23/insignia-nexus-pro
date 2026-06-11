import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductBrowser } from "@/components/ProductBrowser";

export const Route = createFileRoute("/ncc")({
  head: () => ({
    meta: [
      { title: "NCC Uniforms & Products — Swastic Police Store, Rajkot" },
      { name: "description", content: "Official NCC cadet and officer uniform kits, berets, badges and insignia for NCC wings across Gujarat." },
      { property: "og:title", content: "NCC Uniforms & Products — Swastic Police Store" },
      { property: "og:description", content: "Official NCC cadet & officer uniform kits and insignia." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ProductBrowser
        title="NCC Uniforms & Products"
        subtitle="Official NCC cadet and officer kits, supplied to wings across Gujarat."
        fixedCategorySlug="ncc-uniforms"
      />
    </SiteLayout>
  ),
});
