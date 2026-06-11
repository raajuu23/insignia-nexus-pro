import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, FolderTree, Boxes, AlertTriangle, IndianRupee, ShoppingCart } from "lucide-react";
import { PageTitle } from "@/components/AdminShell";
import { useStore, formatINR } from "@/lib/store";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const data = useStore();
  const totalStock = data.products.reduce((s, p) => s + p.stock, 0);
  const lowStock = data.products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold);
  const outStock = data.products.filter((p) => p.stock <= 0);
  const revenue = data.orders.filter((o) => o.status === "completed").reduce((s, o) => s + o.total, 0);

  const cards = [
    { label: "Total Products", value: data.products.length, Icon: Package, tone: "text-gold" },
    { label: "Categories", value: data.categories.length, Icon: FolderTree, tone: "text-info" },
    { label: "Total Stock", value: totalStock, Icon: Boxes, tone: "text-success" },
    { label: "Low / Out Stock", value: lowStock.length + outStock.length, Icon: AlertTriangle, tone: "text-warning" },
    { label: "Revenue", value: formatINR(revenue), Icon: IndianRupee, tone: "text-gold" },
    { label: "Orders", value: data.orders.length, Icon: ShoppingCart, tone: "text-info" },
  ];

  return (
    <>
      <PageTitle title="Dashboard" subtitle="Overview of your store" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {cards.map(({ label, value, Icon, tone }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
              <Icon className={`h-5 w-5 ${tone}`} />
            </div>
            <div className="mt-3 font-display text-3xl font-bold text-foreground">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">Low Stock Alerts</h2>
            <Link to="/admin/stock" className="text-sm text-gold hover:underline">Manage</Link>
          </div>
          {lowStock.length === 0 && outStock.length === 0 ? (
            <p className="text-sm text-muted-foreground">All products are well stocked.</p>
          ) : (
            <ul className="space-y-2">
              {[...outStock, ...lowStock].slice(0, 6).map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-sm">
                  <span className="text-foreground">{p.name}</span>
                  <span className={p.stock <= 0 ? "text-danger" : "text-warning"}>{p.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">Recent Activity</h2>
            <Link to="/admin/orders" className="text-sm text-gold hover:underline">All orders</Link>
          </div>
          <ul className="space-y-2">
            {data.orders.slice(0, 6).map((o) => (
              <li key={o.id} className="flex items-center justify-between rounded-lg bg-background px-3 py-2 text-sm">
                <span className="text-foreground">{o.customer} · {o.product}</span>
                <span className="text-muted-foreground">{formatINR(o.total)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
