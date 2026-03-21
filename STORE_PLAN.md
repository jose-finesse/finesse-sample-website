# FINESSE Sample Sale — Store Build Plan

## Overview

Headless Shopify storefront. Products pulled from the existing Finesse Shopify catalog. Inventory quantities driven by the sample identifier program (later phase). UI matches the Finesse aesthetic from Figma — tight product grid, barcode logo header, frosted glass discount badges.

---

## Pages

### `/` — Product Grid
- Full-width grid of all products from Shopify
- Desktop (1728px / 16" MacBook): ~11 columns, each card 157px wide
- Mobile: 3 columns
- Zero gap between cards
- Each card: product image (object-cover), frosted glass `-35%` badge on select items
- Click card → navigates to `/products/[handle]`

### `/products/[handle]` — Product Detail
- Product images (carousel or stack)
- Title, original price + sale price (-35%)
- Size/variant selector
- Add to cart → Shopify checkout
- Back to grid

### `/invite` — RSVP page (existing, untouched)

---

## Components

```
src/
  app/
    page.tsx                    ← server component, fetches all products
    products/
      [handle]/
        page.tsx                ← server component, fetches single product
  components/
    Header.tsx                  ← barcode logo, nav, search, cart
    ProductGrid.tsx             ← CSS grid wrapper
    ProductCard.tsx             ← image + discount badge + link
    DiscountBadge.tsx           ← frosted glass pill "-35%"
    ProductDetail.tsx           ← product page layout
    SizeSelector.tsx            ← variant picker
    AddToCart.tsx               ← client component (cart interaction)
  lib/
    shopify.ts                  ← existing client + new query functions
  types/
    shopify.ts                  ← existing types + extend as needed
```

---

## Data Flow

```
Build time:
  Shopify Storefront API → getAllProducts() → static grid rendered
  generateStaticParams()  → all product pages pre-built

Runtime (ISR):
  revalidate: 60 seconds → grid + product pages refresh automatically
  When item sells out → Shopify inventory → availableForSale: false → shown as Sold Out
```

---

## Shopify Queries

**1. getAllProducts** — for grid
```graphql
query getAllProducts($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    pageInfo { hasNextPage endCursor }
    edges {
      node {
        id title handle availableForSale
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
}
```

**2. getProductByHandle** — for detail page
```graphql
query getProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id title handle description availableForSale
    images(first: 10) { edges { node { url altText width height } } }
    priceRange { minVariantPrice { amount currencyCode } }
    variants(first: 50) {
      edges { node { id title availableForSale price { amount currencyCode } } }
    }
  }
}
```

---

## Design Spec (from Figma)

| Element | Value |
|---------|-------|
| Canvas width | 1728px |
| Header height | 70px |
| Header background | `#e6e8ec` |
| Card width | 157px |
| Card height | 196px |
| Columns (desktop) | 11 |
| Grid gap | 0px |
| Badge background | `rgba(121,121,121,0.2)` |
| Badge size | 44×30px |
| Badge radius | 15px |
| Badge text | Helvetica Neue 14px white `-35%` |
| Badge shadow | `0px 4px 10px rgba(0,0,0,0.1)` |

---

## Performance Strategy (Near-Zero Latency)

1. **Server Components only** for all data — no client-side fetch, no loading spinners on grid
2. **ISR** — `revalidate: 60` on all product fetches. Grid updates automatically as inventory changes
3. **`generateStaticParams`** — all product pages pre-rendered at build. Zero server cold start on navigation
4. **Next.js `<Image>`** — avif/webp already configured, automatic CDN delivery
5. **Priority loading** — first 11 cards (above fold) get `priority` prop, rest are lazy
6. **Pagination at 250** — fetch up to 250 products per request, paginate if catalog exceeds that

---

## Discount Logic

All sample sale items are 35% off retail.

- Show original price (from Shopify `priceRange.minVariantPrice`) with strikethrough
- Calculate and show sale price (original × 0.65)
- Show `-35%` badge on every available card
- Sold out items: no badge, image greyed out or "Sold Out" overlay

---

## Build Order

1. **Shopify queries** — extend `src/lib/shopify.ts` with `getAllProducts` + `getProductByHandle`
2. **Header** — exact Figma match, barcode logo, nav, cart icon
3. **ProductCard** — image, badge, link
4. **ProductGrid** — CSS grid, responsive columns
5. **Home page** (`/`) — server component, wires grid to Shopify
6. **Product detail page** — images, price, variants, add to cart
7. **Cart** — Shopify checkout redirect (simplest implementation)

---

## Environment Variables Needed

Already in project:
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

---

## Later Phase (Post-Identifier)

- Identifier program pushes scanned inventory to Shopify via Admin API
- Quantities in Shopify reflect physical sample stock
- Site automatically shows correct availability via ISR
- No code changes needed on the website side
