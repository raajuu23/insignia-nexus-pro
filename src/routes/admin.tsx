import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Swastic Police Store" }, { name: "robots", content: "noindex" }] }),
  component: AdminShell,
});
