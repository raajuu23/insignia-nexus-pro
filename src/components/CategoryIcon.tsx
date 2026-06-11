import {
  Shirt,
  Award,
  ShieldCheck,
  Footprints,
  Minus,
  HardHat,
  BadgeCheck,
  Tag,
  Cable,
  Package,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Shirt,
  Award,
  ShieldCheck,
  Footprints,
  Minus,
  HardHat,
  BadgeCheck,
  Tag,
  Cable,
  Package,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? Package;
  return <Icon className={className} />;
}

export const iconOptions = Object.keys(map);
