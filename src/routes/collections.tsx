import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { getProductsByCategory, formatPrice } from "@/data/products";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || "all",
  }),
  head: () => ({
    meta: [
      { title: "Collections — Lab-Grown Diamond Rings, Pendants & Earrings | ethima" },
      { name: "description", content: "Shop ethima's curated collection of lab-grown diamond jewellery. Rings, pendants, earrings and bracelets crafted to order in 10KT gold and 925 silver." },
      { name: "keywords", content: "lab grown diamond rings india, diamond pendants, diamond earrings, fine jewellery india, ethima collections, diamond bracelets" },
      { property: "og:title", content: "Collections — ethima | Lab-Grown Diamond Jewellery" },
      { property: "og:description", content: "Lab-grown diamond rings, pendants, earrings and bracelets. Made to order in 10KT gold and 925 silver." },
      { property: "og:url", content: "https://ethima.in/collections" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/collections" }],
  }),
  component: Collections,
});

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "rings", label: "Rings" },
  { value: "pendants", label: "Pendants" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
] as const;

function Collections() {
  const { category } = Route.useSearch();
  const products = getProductsByCategory(category);

  return (
    <PageShell eyebrow="The ethima Edit" title="Collections" intro="Minimal pieces. Meaningful stories. A curated edit of fine jewellery that blends simplicity with intention.">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: category === "all" ? "All Collections" : `Collections — ${category}`, url: `/collections${category !== "all" ? `?category=${category}` : ""}` },
      ])} />
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            to="/collections"
            search={{ category: cat.value === "all" ? undefined : cat.value }}
            className={`px-5 py-2.5 text-[0.65rem] tracking-[0.28em] uppercase transition-all ${
              category === cat.value
                ? "bg-champagne text-primary-foreground"
                : "border border-champagne/30 text-ivory/80 hover:bg-champagne/10"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const images = product.images;
          const allImages = Object.values(images).flat();
          const heroImage = allImages[0] || "";
          const minPrice = Math.min(...product.variants.map((v) => v.price));

          return (
            <Link
              key={product.id}
              to="/products/$slug"
              params={{ slug: product.slug }}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={product.name}
                    loading="lazy"
                    className="product-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-champagne/40 text-xs tracking-widest uppercase">
                    Image coming soon
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_200/0.85)] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[0.6rem] tracking-[0.28em] uppercase text-champagne/70">
                    {product.collection}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[0.7rem] tracking-[0.28em] uppercase text-ivory">
                  {product.name}
                </p>
                <p className="mt-1.5 text-sm text-ivory/65 line-clamp-2">
                  {product.shortDescription}
                </p>
                <p className="mt-2 text-sm text-champagne font-medium tracking-wide">
                  from {formatPrice(minPrice)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {products.length === 0 && (
        <p className="text-center text-ivory/50 py-20">No products found in this category.</p>
      )}
    </PageShell>
  );
}
