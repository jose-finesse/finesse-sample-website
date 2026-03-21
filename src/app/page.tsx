import { getProductsByColorGroup } from "@/lib/products";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import PriceToggle from "@/components/PriceToggle";

export default function Home() {
  const colorGroups = getProductsByColorGroup();

  return (
    <div className="min-h-screen bg-white">
      <PriceToggle>
        <Header />
        <main>
          <ProductGrid colorGroups={colorGroups} />
        </main>
      </PriceToggle>
    </div>
  );
}
