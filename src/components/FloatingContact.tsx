import { Phone, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export function FloatingContact() {
  const { settings } = useStore();
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${settings.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="grid h-13 w-13 place-items-center rounded-full bg-success p-3.5 text-white shadow-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${settings.phone}`}
        aria-label="Call"
        className="grid h-13 w-13 place-items-center rounded-full bg-gradient-gold p-3.5 text-navy shadow-gold transition-transform hover:scale-110"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
