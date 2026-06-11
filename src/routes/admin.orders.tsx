import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { PageTitle } from "@/components/AdminShell";
import { useStore, store, formatINR, type OrderItem } from "@/lib/store";

export const Route = createFileRoute("/admin/orders")({ component: OrdersAdmin });

const tone: Record<OrderItem["status"], string> = {
  pending: "bg-warning/15 text-warning",
  completed: "bg-success/15 text-success",
  cancelled: "bg-danger/15 text-danger",
};

function OrdersAdmin() {
  const data = useStore();
  return (
    <>
      <PageTitle title="Orders" subtitle={`${data.orders.length} orders`} />
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-muted-foreground">
            <tr><th className="p-3">Customer</th><th className="p-3">Product</th><th className="p-3">Qty</th><th className="p-3">Total</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr>
          </thead>
          <tbody>
            {data.orders.map((o) => (
              <tr key={o.id} className="border-b border-border/60">
                <td className="p-3"><div className="font-medium text-foreground">{o.customer}</div><div className="text-xs text-muted-foreground">{o.phone}</div></td>
                <td className="p-3 text-muted-foreground">{o.product}</td>
                <td className="p-3">{o.qty}</td>
                <td className="p-3 text-gold">{formatINR(o.total)}</td>
                <td className="p-3">
                  <select value={o.status} onChange={(e) => store.updateOrder(o.id, e.target.value as OrderItem["status"])} className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[o.status]} border-0 focus:outline-none`}>
                    <option value="pending">Pending</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 text-right"><button onClick={() => store.deleteOrder(o.id)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-danger"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
