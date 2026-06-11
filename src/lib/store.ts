import { useSyncExternalStore } from "react";

/* ============================================================
   Types
   ============================================================ */
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide icon name (string key handled in UI)
  description: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  lowStockThreshold: number;
  description: string;
  sku: string;
  image: string | null; // data URL or remote URL
  featured: boolean;
  status: "active" | "draft";
  createdAt: number;
}

export interface OrderItem {
  id: string;
  customer: string;
  phone: string;
  product: string;
  qty: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface Settings {
  storeName: string;
  tagline: string;
  logo: string | null;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  banner: string | null;
}

export interface StoreData {
  categories: Category[];
  products: Product[];
  orders: OrderItem[];
  gallery: GalleryImage[];
  settings: Settings;
}

/* ============================================================
   Seed data
   ============================================================ */
const uid = () => Math.random().toString(36).slice(2, 10);

const seedCategories: Category[] = [
  { id: "police-uniforms", name: "Police Uniforms", slug: "police-uniforms", icon: "Shirt", description: "Regulation-grade Gujarat Police & service uniforms." },
  { id: "ncc-uniforms", name: "NCC Uniforms", slug: "ncc-uniforms", icon: "Award", description: "Official NCC cadet & officer uniform kits." },
  { id: "security-uniforms", name: "Security Uniforms", slug: "security-uniforms", icon: "ShieldCheck", description: "Security guard & agency uniforms." },
  { id: "shoes-boots", name: "Shoes & Boots", slug: "shoes-boots", icon: "Footprints", description: "Duty boots, parade shoes & tactical footwear." },
  { id: "belts", name: "Belts", slug: "belts", icon: "Minus", description: "Duty belts, web belts & accessories." },
  { id: "caps", name: "Caps", slug: "caps", icon: "HardHat", description: "Peak caps, berets & headgear." },
  { id: "badges", name: "Badges", slug: "badges", icon: "BadgeCheck", description: "Rank badges, insignia & shoulder titles." },
  { id: "name-plates", name: "Name Plates", slug: "name-plates", icon: "Tag", description: "Engraved name plates & ID tags." },
  { id: "lanyards", name: "Lanyards", slug: "lanyards", icon: "Cable", description: "Whistle lanyards & webbing." },
  { id: "accessories", name: "Accessories", slug: "accessories", icon: "Package", description: "Whistles, gloves, ranks & general kit." },
];

const p = (
  name: string,
  categoryId: string,
  price: number,
  discountPrice: number | null,
  stock: number,
  description: string,
  featured = false,
): Product => ({
  id: uid(),
  name,
  categoryId,
  price,
  discountPrice,
  stock,
  lowStockThreshold: 10,
  description,
  sku: "SW-" + uid().toUpperCase().slice(0, 6),
  image: null,
  featured,
  status: "active",
  createdAt: Date.now() - Math.floor(Math.random() * 1e9),
});

const seedProducts: Product[] = [
  p("Gujarat Police Khaki Uniform Set", "police-uniforms", 2499, 1999, 42, "Complete regulation khaki shirt & trouser set with precision tailoring.", true),
  p("Police Winter Combat Jacket", "police-uniforms", 3200, 2799, 18, "Heavy-duty winter combat jacket, water-resistant fabric.", true),
  p("Police Service Shirt (Half Sleeve)", "police-uniforms", 899, null, 60, "Breathable cotton blend service shirt for daily duty."),
  p("NCC Cadet Uniform Kit", "ncc-uniforms", 1899, 1599, 35, "Full NCC cadet kit — shirt, trouser, belt & cap.", true),
  p("NCC Officer Uniform Set", "ncc-uniforms", 2899, null, 8, "Premium officer-grade NCC uniform with insignia."),
  p("Security Guard Uniform Set", "security-uniforms", 1499, 1199, 50, "Durable security uniform set for agencies & private guards.", true),
  p("Security Bomber Jacket", "security-uniforms", 1799, null, 6, "All-weather security bomber jacket with reflective strips."),
  p("Tactical Duty Boots", "shoes-boots", 2299, 1899, 28, "High-ankle tactical duty boots, anti-slip sole.", true),
  p("Parade Shoes (Black)", "shoes-boots", 1199, null, 40, "Polished leather parade shoes for ceremonies."),
  p("DMS Jungle Boots", "shoes-boots", 1599, 1399, 5, "Direct moulded sole jungle boots, rugged grip."),
  p("Web Duty Belt", "belts", 349, null, 120, "Heavy-duty web belt with metal buckle."),
  p("Leather Duty Belt", "belts", 599, 499, 70, "Genuine leather duty belt, polished finish.", true),
  p("Police Peak Cap", "caps", 699, null, 45, "Regulation peak cap with embroidered badge."),
  p("NCC Beret", "caps", 299, null, 9, "Official NCC maroon beret, wool blend."),
  p("Rank Badge Set (Pair)", "badges", 249, null, 200, "Metal rank badges, pair, polished brass.", true),
  p("Shoulder Title Insignia", "badges", 199, 149, 150, "Embroidered shoulder title insignia."),
  p("Engraved Name Plate", "name-plates", 149, null, 300, "Custom engraved acrylic name plate."),
  p("Whistle Lanyard", "lanyards", 99, null, 250, "Braided whistle lanyard with hook."),
  p("Officer Aiguillette", "lanyards", 449, 379, 4, "Ceremonial gold aiguillette for officers."),
  p("Tactical Gloves", "accessories", 399, null, 80, "Anti-slip tactical duty gloves."),
  p("Metal Whistle", "accessories", 79, null, 400, "Loud brass duty whistle."),
];

const seedSettings: Settings = {
  storeName: "Swastic Police Store",
  tagline: "Rajkot's No. 1 Police Supply Store",
  logo: null,
  phone: "+91 93139 59019",
  whatsapp: "919313959019",
  email: "info@swasticpolicestore.com",
  address: "Rajkot, Gujarat, India",
  facebook: "",
  instagram: "",
  youtube: "",
  banner: null,
};

const seedData = (): StoreData => ({
  categories: seedCategories,
  products: seedProducts,
  orders: [
    { id: uid(), customer: "Rakesh Patel", phone: "+91 98250 11111", product: "Tactical Duty Boots", qty: 2, total: 3798, status: "completed", createdAt: Date.now() - 86400000 },
    { id: uid(), customer: "Anjali Mehta", phone: "+91 99099 22222", product: "NCC Cadet Uniform Kit", qty: 5, total: 7995, status: "pending", createdAt: Date.now() - 43200000 },
    { id: uid(), customer: "Gujarat Police Dept.", phone: "+91 90000 33333", product: "Gujarat Police Khaki Uniform Set", qty: 12, total: 23988, status: "pending", createdAt: Date.now() - 3600000 },
  ],
  gallery: [],
  settings: seedSettings,
});

/* ============================================================
   Store (localStorage + pub/sub)
   ============================================================ */
const KEY = "swastic_store_v1";
let state: StoreData = load();
const listeners = new Set<() => void>();

function load(): StoreData {
  if (typeof window === "undefined") return seedData();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const s = seedData();
      localStorage.setItem(KEY, JSON.stringify(s));
      return s;
    }
    const parsed = JSON.parse(raw) as StoreData;
    // merge defaults for forward-compat
    return { ...seedData(), ...parsed };
  } catch {
    return seedData();
  }
}

function persist() {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  listeners.forEach((l) => l());
}

function set(updater: (s: StoreData) => StoreData) {
  state = updater(state);
  persist();
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY && e.newValue) {
      state = JSON.parse(e.newValue);
      listeners.forEach((l) => l());
    }
  });
}

/* ============================================================
   Public API
   ============================================================ */
export const store = {
  get: () => state,
  reset: () => {
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
    state = load();
    persist();
  },

  // Products
  addProduct(data: Omit<Product, "id" | "createdAt">) {
    set((s) => ({ ...s, products: [{ ...data, id: uid(), createdAt: Date.now() }, ...s.products] }));
  },
  updateProduct(id: string, data: Partial<Product>) {
    set((s) => ({ ...s, products: s.products.map((pr) => (pr.id === id ? { ...pr, ...data } : pr)) }));
  },
  deleteProduct(id: string) {
    set((s) => ({ ...s, products: s.products.filter((pr) => pr.id !== id) }));
  },
  adjustStock(id: string, delta: number) {
    set((s) => ({
      ...s,
      products: s.products.map((pr) => (pr.id === id ? { ...pr, stock: Math.max(0, pr.stock + delta) } : pr)),
    }));
  },

  // Categories
  addCategory(data: Omit<Category, "id">) {
    set((s) => ({ ...s, categories: [...s.categories, { ...data, id: data.slug || uid() }] }));
  },
  updateCategory(id: string, data: Partial<Category>) {
    set((s) => ({ ...s, categories: s.categories.map((c) => (c.id === id ? { ...c, ...data } : c)) }));
  },
  deleteCategory(id: string) {
    set((s) => ({ ...s, categories: s.categories.filter((c) => c.id !== id) }));
  },

  // Gallery
  addGallery(url: string, caption: string) {
    set((s) => ({ ...s, gallery: [{ id: uid(), url, caption }, ...s.gallery] }));
  },
  updateGallery(id: string, data: Partial<GalleryImage>) {
    set((s) => ({ ...s, gallery: s.gallery.map((g) => (g.id === id ? { ...g, ...data } : g)) }));
  },
  deleteGallery(id: string) {
    set((s) => ({ ...s, gallery: s.gallery.filter((g) => g.id !== id) }));
  },

  // Orders
  updateOrder(id: string, status: OrderItem["status"]) {
    set((s) => ({ ...s, orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) }));
  },
  deleteOrder(id: string) {
    set((s) => ({ ...s, orders: s.orders.filter((o) => o.id !== id) }));
  },

  // Settings
  updateSettings(data: Partial<Settings>) {
    set((s) => ({ ...s, settings: { ...s.settings, ...data } }));
  },

  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};

/* ============================================================
   React hook
   ============================================================ */
export function useStore(): StoreData {
  return useSyncExternalStore(
    store.subscribe,
    () => state,
    () => state,
  );
}

/* ============================================================
   Helpers
   ============================================================ */
export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

export const stockStatus = (pr: Product) => {
  if (pr.stock <= 0) return { label: "Out of Stock", tone: "danger" as const };
  if (pr.stock <= pr.lowStockThreshold) return { label: "Low Stock", tone: "warning" as const };
  return { label: "In Stock", tone: "success" as const };
};

export const categoryName = (data: StoreData, id: string) =>
  data.categories.find((c) => c.id === id)?.name ?? "Uncategorized";
