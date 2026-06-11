import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { PageTitle, fileToDataUrl } from "@/components/AdminShell";
import { ProductImage } from "@/components/ProductImage";
import { useStore, store, formatINR, type Product } from "@/lib/store";

export const Route = createFileRoute("/admin/products")({
  component: ProductsAdmin,
});

const empty = (categoryId: string): Omit<Product, "id" | "createdAt"> => ({
  name: "", categoryId, price: 0, discountPrice: null, stock: 0, lowStockThreshold: 10,
  description: "", sku: "SW-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
  image: null, featured: false, status: "active",
});

function ProductsAdmin() {
  const data = useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(() => empty(data.categories[0]?.id ?? ""));

  const startAdd = () => { setEditId(null); setForm(empty(data.categories[0]?.id ?? "")); setOpen(true); };
  const startEdit = (p: Product) => { setEditId(p.id); const { id, createdAt, ...rest } = p; setForm(rest); setOpen(true); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) store.updateProduct(editId, form);
    else store.addProduct(form);
    setOpen(false);
  };

  const onImage = async (file?: File) => {
    if (file) { const url = await fileToDataUrl(file); setForm((f) => ({ ...f, image: url })); }
  };

  return (
    <>
      <PageTitle title="Products" subtitle={`${data.products.length} products`} action={
        <button onClick={startAdd} className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-navy">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      } />

      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-muted-foreground">
            <tr>
              <th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th>
              <th className="p-3">Stock</th><th className="p-3">Status</th><th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((p) => {
              const cat = data.categories.find((c) => c.id === p.categoryId);
              return (
                <tr key={p.id} className="border-b border-border/60">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-md"><ProductImage image={p.image} alt={p.name} icon={cat?.icon ?? "Package"} /></div>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{cat?.name ?? "—"}</td>
                  <td className="p-3 text-gold">{formatINR(p.discountPrice ?? p.price)}</td>
                  <td className="p-3"><span className={p.stock <= 0 ? "text-danger" : p.stock <= p.lowStockThreshold ? "text-warning" : "text-success"}>{p.stock}</span></td>
                  <td className="p-3 capitalize text-muted-foreground">{p.status}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(p)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-gold"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => confirm("Delete this product?") && store.deleteProduct(p.id)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-danger"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="my-8 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-foreground">{editId ? "Edit" : "Add"} Product</h2>
              <button type="button" onClick={() => setOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name" className="col-span-2"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></Field>
              <Field label="Category"><select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className={inputCls}>{data.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
              <Field label="SKU"><input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className={inputCls} /></Field>
              <Field label="Price (₹)"><input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} className={inputCls} /></Field>
              <Field label="Discount Price (₹)"><input type="number" value={form.discountPrice ?? ""} onChange={(e) => setForm({ ...form, discountPrice: e.target.value ? +e.target.value : null })} className={inputCls} /></Field>
              <Field label="Stock Qty"><input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} className={inputCls} /></Field>
              <Field label="Low Stock Alert"><input type="number" value={form.lowStockThreshold} onChange={(e) => setForm({ ...form, lowStockThreshold: +e.target.value })} className={inputCls} /></Field>
              <Field label="Description" className="col-span-2"><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} /></Field>
              <Field label="Product Image" className="col-span-2">
                <input type="file" accept="image/*" onChange={(e) => onImage(e.target.files?.[0])} className="text-sm text-muted-foreground" />
                {form.image && <img src={form.image} alt="preview" className="mt-2 h-20 w-20 rounded-md object-cover" />}
              </Field>
              <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
              <Field label="Status"><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Product["status"] })} className={inputCls}><option value="active">Active</option><option value="draft">Draft</option></select></Field>
            </div>
            <button type="submit" className="mt-6 w-full rounded-lg bg-gradient-gold px-6 py-3 font-semibold text-navy">{editId ? "Save Changes" : "Add Product"}</button>
          </form>
        </div>
      )}
    </>
  );
}

const inputCls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none";
function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className ?? ""}`}><span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}
