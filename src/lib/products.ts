import productsData from "@/data/products.json";

export interface Product {
  id: number;
  title: string;
  handle: string;
  productType: string;
  imageUrl: string;
  color: string | null;
  colorOrder: number;
}

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductByHandle(handle: string): Product | null {
  return products.find((p) => p.handle === handle) ?? null;
}

export function getProductsByType(type: string): Product[] {
  return products.filter((p) => p.productType === type);
}

export function getProductTypes(): string[] {
  const types = new Set(products.map((p) => p.productType));
  return Array.from(types).sort();
}

// Color group labels for the color wheel sections
const COLOR_GROUP_LABELS: Record<number, string> = {
  0: "Red",
  1: "Burgundy",
  2: "Coral",
  3: "Orange",
  4: "Peach",
  5: "Yellow & Gold",
  6: "Lime",
  7: "Green",
  8: "Mint",
  9: "Teal & Aqua",
  10: "Blue",
  11: "Navy",
  12: "Purple",
  13: "Lilac & Lavender",
  14: "Magenta & Fuchsia",
  15: "Pink",
  16: "Nude",
  17: "Brown",
  18: "Tan & Camel",
  19: "Beige, Cream & Ivory",
  20: "Silver & Metallic",
  21: "Grey",
  22: "Black",
  23: "White",
  24: "Clear",
  25: "Print & Multi",
  999: "Other",
};

export interface ColorGroup {
  label: string;
  colorOrder: number;
  products: Product[];
}

export function getProductsByColorGroup(): ColorGroup[] {
  const groups = new Map<number, Product[]>();

  for (const p of products) {
    const order = p.colorOrder;
    if (!groups.has(order)) groups.set(order, []);
    groups.get(order)!.push(p);
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a - b)
    .map(([order, prods]) => ({
      label: COLOR_GROUP_LABELS[order] ?? "Other",
      colorOrder: order,
      products: prods,
    }));
}
