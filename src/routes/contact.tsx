import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Swastic Police Store, Rajkot" },
      { name: "description", content: "Contact Swastic Police Store in Rajkot for police uniforms, NCC kits and bulk orders. Call or WhatsApp us today." },
      { property: "og:title", content: "Contact — Swastic Police Store" },
      { property: "og:description", content: "Call or WhatsApp us for uniforms, NCC kits & bulk orders." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { settings } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const waSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`Inquiry from ${form.name} (${form.phone}): ${form.message}`);
    window.open(`https://wa.me/${settings.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Get in Touch</span>
          <h1 className="mt-2 font-display text-4xl font-bold text-foreground">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Reach out for product inquiries, bulk orders and custom requirements.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { Icon: Phone, label: "Call Us", value: settings.phone, href: `tel:${settings.phone}` },
            { Icon: MessageCircle, label: "WhatsApp", value: settings.phone, href: `https://wa.me/${settings.whatsapp}` },
            { Icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
            { Icon: MapPin, label: "Address", value: settings.address },
            { Icon: Clock, label: "Hours", value: "Mon–Sat: 10AM – 9PM" },
          ].map(({ Icon, label, value, href }) => (
            <a key={label} href={href ?? "#"} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-gold/60">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-gold/10 text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                <div className="font-display font-semibold text-foreground">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <form onSubmit={waSend} className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-xl font-bold text-foreground">Send an Inquiry</h2>
          <p className="mt-1 text-sm text-muted-foreground">We'll reply on WhatsApp.</p>
          <div className="mt-5 space-y-4">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none" />
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What are you looking for?" rows={4} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none" />
            <button type="submit" className="w-full rounded-lg bg-gradient-gold px-6 py-3.5 font-display font-semibold uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5">
              Send via WhatsApp
            </button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}
