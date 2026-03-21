"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { usePriceVisible } from "./PriceToggle";

const TYPE_PRICES: Record<string, number> = {
  Tops: 25,
  Bottoms: 35,
  Dresses: 45,
  Sets: 55,
  Outerwear: 65,
  "Jumpsuits & Rompers": 40,
  Swimsuits: 30,
  Accessories: 20,
  Shoes: 45,
  Handbags: 50,
  Jewelry: 15,
};

function getPrice(productType: string): number {
  return TYPE_PRICES[productType] ?? 30;
}

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const showPrices = usePriceVisible();
  const price = getPrice(product.productType);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group relative block overflow-hidden bg-white"
    >
      <div className="relative aspect-[157/196] w-full">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 33vw, 157px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
        {showPrices && (
          <div className="absolute inset-x-0 -bottom-1 flex justify-center">
            <span className="text-[12px] font-medium text-black">${price}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
