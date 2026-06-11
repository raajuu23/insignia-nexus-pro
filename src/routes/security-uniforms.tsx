import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductBrowser } from "@/components/ProductBrowser";

export const Route = createFileRoute("/security-uniforms")({
  head: () => ({
    meta: [
      { title: "Security Uniforms — Swastic Police Store, Rajkot" },
      { name: "description", content: "Durable security guard and agency uniforms, bomber jackets and reflective wear for private security." },
      { property: "og:title", content: "Security Uniforms — Swastic Police Store" },
      { property: "og:description", content: "Security guard & agency uniforms." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <ProductBrowser
        title="Security Uniforms"
        subtitle="Durable uniforms for security guards and private agencies."
        fixedCategorySlug="security-uniforms"
      />
    </SiteLayout>
  ),
});
