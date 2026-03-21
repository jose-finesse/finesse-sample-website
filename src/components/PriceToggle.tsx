"use client";

import { createContext, useContext, useState } from "react";

interface PriceContextType {
  showPrices: boolean;
  toggle: () => void;
}

const PriceContext = createContext<PriceContextType>({
  showPrices: false,
  toggle: () => {},
});

export function usePriceVisible() {
  return useContext(PriceContext).showPrices;
}

export function usePriceToggle() {
  return useContext(PriceContext);
}

export default function PriceToggle({ children }: { children: React.ReactNode }) {
  const [showPrices, setShowPrices] = useState(false);

  return (
    <PriceContext value={{ showPrices, toggle: () => setShowPrices(!showPrices) }}>
      {children}
    </PriceContext>
  );
}
