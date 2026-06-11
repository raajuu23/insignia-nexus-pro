import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { PageTitle, fileToDataUrl } from "@/components/AdminShell";
import { useStore, store, type Settings } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({ component: SettingsAdmin });

const cls = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none";

function SettingsAdmin() {
  const data = useStore();
  const [form, setForm] = useState<Settings>(data.settings);

  const upd = (k: keyof Settings, v: string | null) => setForm((f) => ({ ...f, [k]: v }));

  const onUpload = async (k: "logo" | "banner", file?: File) => {
    if (file) { const url = await fileToDataUrl(file); upd(k, url); }
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateSettings(form);
    toast.success("Settings saved");
  };

  const reset = () => {
    if (confirm("Reset ALL store data (products, categories, settings) to defaults?")) {
      store.reset();
      setForm(store.get().settings);
      toast.success("Store reset to defaults");
    }
  };

  return (
    <>
      <PageTitle title="Settings" subtitle="Store details shown across the website" action={
        <button onClick={reset} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-danger"><RotateCcw className="h-4 w-4" /> Reset Data</button>
      } />
      <form onSubmit={save} className="grid gap-6 lg:grid-cols-2">
        <Section title="Store Identity">
          <Field label="Store Name"><input value={form.storeName} onChange={(e) => upd("storeName", e.target.value)} className={cls} /></Field>
          <Field label="Tagline"><input value={form.tagline} onChange={(e) => upd("tagline", e.target.value)} className={cls} /></Field>
          <Field label="Logo">
            <input type="file" accept="image/*" onChange={(e) => onUpload("logo", e.target.files?.[0])} className="text-sm text-muted-foreground" />
            {form.logo && <img src={form.logo} alt="logo" className="mt-2 h-16 w-16 rounded-md object-cover" />}
          </Field>
          <Field label="Homepage Banner">
            <input type="file" accept="image/*" onChange={(e) => onUpload("banner", e.target.files?.[0])} className="text-sm text-muted-foreground" />
            {form.banner && <img src={form.banner} alt="banner" className="mt-2 h-20 w-full rounded-md object-cover" />}
          </Field>
        </Section>

        <Section title="Contact">
          <Field label="Phone"><input value={form.phone} onChange={(e) => upd("phone", e.target.value)} className={cls} /></Field>
          <Field label="WhatsApp (digits only, e.g. 919313959019)"><input value={form.whatsapp} onChange={(e) => upd("whatsapp", e.target.value)} className={cls} /></Field>
          <Field label="Email"><input value={form.email} onChange={(e) => upd("email", e.target.value)} className={cls} /></Field>
          <Field label="Address"><textarea rows={2} value={form.address} onChange={(e) => upd("address", e.target.value)} className={cls} /></Field>
        </Section>

        <Section title="Social Links">
          <Field label="Facebook URL"><input value={form.facebook} onChange={(e) => upd("facebook", e.target.value)} className={cls} /></Field>
          <Field label="Instagram URL"><input value={form.instagram} onChange={(e) => upd("instagram", e.target.value)} className={cls} /></Field>
          <Field label="YouTube URL"><input value={form.youtube} onChange={(e) => upd("youtube", e.target.value)} className={cls} /></Field>
        </Section>

        <div className="lg:col-span-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-7 py-3.5 font-display font-semibold uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5"><Save className="h-4 w-4" /> Save Settings</button>
        </div>
      </form>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}
