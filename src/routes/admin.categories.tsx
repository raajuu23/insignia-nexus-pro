import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { PageTitle } from "@/components/AdminShell";
import { CategoryIcon, iconOptions } from "@/components/CategoryIcon";
import { useStore, store, type Category } from "@/lib/store";

export const Route = createFileRoute("/admin/categories")({ component: CategoriesAdmin });

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function CategoriesAdmin() {
  const data = useStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", icon: "Package", description: "" });

  const startAdd = () => { setEditId(null); setForm({ name: "", slug: "", icon: "Package", description: "" }); setOpen(true); };
  const startEdit = (c: Category) => { setEditId(c.id); setForm({ name: c.name, slug: c.slug, icon: c.icon, description: c.description }); setOpen(true); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || slugify(form.name);
    if (editId) store.updateCategory(editId, { ...form, slug });
    else store.addCategory({ ...form, slug });
    setOpen(false);
  };

  const cls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none";

  return (
    <>
      <PageTitle title="Categories" subtitle={`${data.categories.length} categories`} action={
        <button onClick={startAdd} className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-navy"><Plus className="h-4 w-4" /> Add Category</button>
      } />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.categories.map((c) => {
          const count = data.products.filter((p) => p.categoryId === c.id).length;
          return (
            <div key={c.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold/10 text-gold"><CategoryIcon name={c.icon} className="h-5 w-5" /></span>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(c)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-gold"><Pencil className="h-3.5 w-3.5" /></button>
                  <button onClick={() => confirm("Delete category?") && store.deleteCategory(c.id)} className="rounded-md border border-border p-2 text-muted-foreground hover:text-danger"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <h3 className="mt-3 font-display font-semibold text-foreground">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <span className="mt-3 inline-block text-xs text-gold">{count} products</span>
            </div>
          );
        })}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-lg font-bold text-foreground">{editId ? "Edit" : "Add"} Category</h2><button type="button" onClick={() => setOpen(false)}><X className="h-5 w-5 text-muted-foreground" /></button></div>
            <div className="space-y-4">
              <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls} />
              <input placeholder="Slug (auto)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={cls} />
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={cls}>{iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}</select>
              <textarea placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={cls} />
              <button type="submit" className="w-full rounded-lg bg-gradient-gold px-6 py-3 font-semibold text-navy">{editId ? "Save" : "Add"}</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
