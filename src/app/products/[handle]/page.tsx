import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getProductByHandle } from "@/lib/products";
import Header from "@/components/Header";

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-block text-[14px] text-black/50 hover:text-black"
        >
          &larr; Back
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 md:sticky md:top-[90px] md:self-start">
            <h1 className="text-[24px] font-normal tracking-wide">
              {product.title}
            </h1>

            <span className="text-[13px] uppercase tracking-wider text-black/40">
              {product.productType}
              {product.color ? ` · ${product.color}` : ""}
            </span>

            <p className="text-[14px] text-black/50">
              Price available at checkout
            </p>

            <button className="mt-2 flex h-12 w-full items-center justify-center bg-black text-[14px] uppercase tracking-widest text-white transition-opacity hover:opacity-80">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
