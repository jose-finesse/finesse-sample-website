import type { ColorGroup } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  colorGroups,
}: {
  colorGroups: ColorGroup[];
}) {
  const allProducts = colorGroups.flatMap((g) => g.products);

  return (
    <div className="grid grid-cols-3 gap-0 md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
      {allProducts.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 12} />
      ))}
    </div>
  );
}
