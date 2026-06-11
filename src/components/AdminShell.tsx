import { Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, Package, FolderTree, Boxes, ShoppingCart, Settings, Shield, ExternalLink } from "lucide-react";

const nav = [
  { to: "/admin" as const, label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { to: "/admin/products" as const, label: "Products", Icon: Package, exact: false },
  { to: "/admin/categories" as const, label: "Categories", Icon: FolderTree, exact: false },
  { to: "/admin/stock" as const, label: "Stock", Icon: Boxes, exact: false },
  { to: "/admin/orders" as const, label: "Orders", Icon: ShoppingCart, exact: false },
  { to: "/admin/settings" as const, label: "Settings", Icon: Settings, exact: false },
];

export function AdminShell() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <Link to="/admin" className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-gold text-navy">
            <Shield className="h-5 w-5" />
          </span>
          <span className="font-display text-sm font-bold leading-tight text-sidebar-foreground">
            SWASTIC<span className="block text-[10px] font-normal uppercase tracking-widest text-gold">Admin Panel</span>
          </span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map(({ to, label, Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: "bg-sidebar-accent text-gold" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-gold"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="flex items-center gap-2 border-t border-sidebar-border px-5 py-4 text-sm text-sidebar-foreground/70 hover:text-gold">
          <ExternalLink className="h-4 w-4" /> View Website
        </Link>
      </aside>

      <div className="flex-1">
        <div className="flex items-center gap-2 overflow-x-auto border-b border-border bg-card px-3 py-2 md:hidden">
          {nav.map(({ to, label, Icon, exact }) => (
            <Link key={to} to={to} activeOptions={{ exact }} activeProps={{ className: "bg-sidebar-accent text-gold" }} className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground/80">
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </div>
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
