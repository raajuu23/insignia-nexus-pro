import { createFileRoute } from "@tanstack/react-router";
import { Plus, Minus } from "lucide-react";
import { PageTitle } from "@/components/AdminShell";
import { useStore, store } from "@/lib/store";

export const Route = createFileRoute("/admin/stock")({ component: StockAdmin });

function StockAdmin() {
  const data = useStore();
  const sorted = [...data.products].sort((a, b) => a.stock - b.stock);

  return (
    <>
      <PageTitle title="Stock Management" subtitle="Stock in / out with auto low-stock alerts" />
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-muted-foreground">
            <tr><th className="p-3">Product</th><th className="p-3">Current</th><th className="p-3">Status</th><th className="p-3 text-right">Adjust</th></tr>
          </thead>
          <tbody>
            {sorted.map((p) => {
              const tone = p.stock <= 0 ? "text-danger" : p.stock <= p.lowStockThreshold ? "text-warning" : "text-success";
              const label = p.stock <= 0 ? "Out of Stock" : p.stock <= p.lowStockThreshold ? "Low Stock" : "In Stock";
              return (
                <tr key={p.id} className="border-b border-border/60">
                  <td className="p-3 font-medium text-foreground">{p.name}</td>
                  <td className={`p-3 font-display text-lg font-bold ${tone}`}>{p.stock}</td>
                  <td className={`p-3 ${tone}`}>{label}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => store.adjustStock(p.id, -1)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-danger"><Minus className="h-4 w-4" /></button>
                      <button onClick={() => store.adjustStock(p.id, 1)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-success"><Plus className="h-4 w-4" /></button>
                      <button onClick={() => store.adjustStock(p.id, 10)} className="rounded-md border border-border px-2.5 py-2 text-xs font-semibold text-gold">+10</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
