import { CategoryIcon } from "@/components/CategoryIcon";
import { cn } from "@/lib/utils";

export function ProductImage({
  image,
  alt,
  icon,
  className,
}: {
  image: string | null;
  alt: string;
  icon: string;
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-navy",
        className,
      )}
    >
      <CategoryIcon name={icon} className="h-1/3 w-1/3 text-gold/40" />
    </div>
  );
}
