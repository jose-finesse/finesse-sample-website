"use client";

import Image from "next/image";
import Link from "next/link";
import { usePriceToggle } from "./PriceToggle";

export default function Header() {
  const { showPrices, toggle } = usePriceToggle();

  return (
    <header className="sticky top-0 z-50 flex h-[70px] items-center bg-[#e6e8ec] px-6">
      <div className="flex flex-1 items-center">
        <button
          onClick={toggle}
          className="rounded-full border border-black/20 px-3 py-1 text-[11px] uppercase tracking-wider text-black/60 transition-colors hover:border-black hover:text-black"
        >
          {showPrices ? "Hide $" : "Show $"}
        </button>
      </div>
      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/finesse-logo.png"
          alt="FINESSE"
          width={100}
          height={22}
          priority
        />
      </Link>
      <div className="flex flex-1 items-center justify-end gap-4">
        <button aria-label="Search" className="text-black hover:opacity-60">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
        <button aria-label="Cart" className="text-black hover:opacity-60">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </button>
      </div>
    </header>
  );
}
