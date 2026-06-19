import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { getProductsByCategory, getProductsByCollection, formatPrice } from "@/data/products";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo";

const COLLECTIONS = [
  { value: "all", label: "All" },
  { value: "ethima-edit", label: "The ethima Edit" },
  { value: "personal-edit", label: "The Personal Edit" },
] as const;

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "rings", label: "Rings" },
  { value: "pendants", label: "Pendants" },
  { value: "earrings", label: "Earrings" },
] as const;

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || "all",
    collection: (search.collection as string) || "all",
  }),
  head: ({ search }) => {
    const collectionLabel = COLLECTIONS.find((c) => c.value === search.collection)?.label;
    const title = collectionLabel && search.collection !== "all"
      ? `${collectionLabel} — ethima`
      : "Collections — Lab-Grown Diamond Rings, Pendants & Earrings | ethima";
    const desc = collectionLabel && search.collection !== "all"
      ? `Browse ${collectionLabel} at ethima. Design-led fine jewellery crafted with lab-grown diamonds.`
      : "Shop ethima's curated collection of lab-grown diamond jewellery. Rings, pendants, earrings and more crafted to order.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: "lab grown diamond jewellery india, fine jewellery, ethima collections" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `https://ethima.in/collections${search.collection !== "all" ? `?collection=${search.collection}` : ""}` },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: "https://ethima.in/collections" }],
    };
  },
  component: Collections,
});

function Collections() {
  const { category, collection } = Route.useSearch();
  const navigate = useNavigate();
  const byCollection = getProductsByCollection(collection);
  const products = category === "all" ? byCollection : byCollection.filter((p) => p.category === category);

  const heading = collection === "ethima-edit"
    ? { eyebrow: "The ethima Edit", title: "Collections", intro: "Design-led everyday fine jewellery crafted with lab-grown diamonds." }
    : collection === "personal-edit"
    ? { eyebrow: "The Personal Edit", title: "Collections", intro: "Meaning-led jewellery designed around your story." }
    : { eyebrow: "The ethima Edit", title: "Collections", intro: "Minimal pieces. Meaningful stories. A curated edit of fine jewellery that blends simplicity with intention." };

  const setCollection = (value: string) => navigate({ to: "/collections", search: { collection: value === "all" ? undefined : value, category: undefined } });
  const setCategory = (value: string) => navigate({ to: "/collections", search: { collection: collection === "all" ? undefined : collection, category: value === "all" ? undefined : value } });

  return (
    <PageShell eyebrow={heading.eyebrow} title={heading.title} intro={heading.intro}>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: collection === "all" ? "All Collections" : heading.eyebrow, url: `/collections${collection !== "all" ? `?collection=${collection}` : ""}` },
      ])} />
      <div className="flex flex-wrap gap-2 mb-6">
        {COLLECTIONS.map((col) => {
          const parts = col.label.split("ethima");
          return (
          <button
            key={col.value}
            onClick={() => setCollection(col.value)}
            className={`px-5 py-2.5 text-[0.65rem] tracking-[0.28em] uppercase transition-all ${
              collection === col.value
                ? "bg-champagne text-primary-foreground"
                : "border border-champagne/30 text-ivory/80 hover:bg-champagne/10"
            }`}
          >
            {parts.length > 1 ? <>{parts[0]}<span className="lowercase-ethima">ethima</span>{parts[1]}</> : col.label}
          </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-5 py-2.5 text-[0.65rem] tracking-[0.28em] uppercase transition-all ${
              category === cat.value
                ? "bg-champagne text-primary-foreground"
                : "border border-champagne/30 text-ivory/80 hover:bg-champagne/10"
            }`}
          >
            {cat.label}
          </button>
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
