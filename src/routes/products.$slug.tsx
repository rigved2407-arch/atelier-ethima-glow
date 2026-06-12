import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProductBySlug, formatPrice } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { toast } from "sonner";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/components/seo";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const allImages = Object.values(loaderData.images).flat();
    const heroImage = allImages[0] ? `https://ethima.in${allImages[0]}` : undefined;
    const minPrice = Math.min(...loaderData.variants.map((v) => v.price));
    const keywords = `${loaderData.name}, ${loaderData.category}, lab grown diamond jewellery, ${loaderData.variants.map(v => v.metal).join(", ")}, ethima`;
    const metaTags: Record<string, string>[] = [
      { title: `${loaderData.name} — ${loaderData.shortDescription} | ethima` },
      { name: "description", content: `${loaderData.name} — ${loaderData.shortDescription}. ${loaderData.stoneType}. Available in ${loaderData.variants.map(v => v.metal).join(", ")}. Starting from ₹${minPrice.toLocaleString("en-IN")}. Made to order.` },
      { name: "keywords", content: keywords },
      { property: "og:title", content: `${loaderData.name} — ethima` },
      { property: "og:description", content: `${loaderData.shortDescription} Starting from ₹${minPrice.toLocaleString("en-IN")}.` },
      { property: "og:url", content: `https://ethima.in/products/${loaderData.slug}` },
      { property: "og:type", content: "product" },
      { property: "product:price:amount", content: String(minPrice) },
      { property: "product:price:currency", content: "INR" },
      { name: "robots", content: "index, follow" },
    ];
    if (heroImage) {
      metaTags.push({ property: "og:image", content: heroImage });
      metaTags.push({ name: "twitter:image", content: heroImage });
    }
    return {
      meta: metaTags,
      links: [
        { rel: "canonical", href: `https://ethima.in/products/${loaderData.slug}` },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-4xl text-ivory">Product not found</h1>
        <p className="mt-3 text-ivory/60">This piece doesn't seem to exist.</p>
        <Link to="/collections" className="mt-6 inline-flex items-center gap-2 text-sm text-champagne hover:text-ivory">
          <ArrowLeft className="h-4 w-4" /> Back to collections
        </Link>
      </div>
    </div>
  ),
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const { addItem } = useCart();
  const [selectedMetal, setSelectedMetal] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const variant = product.variants[selectedMetal];
  const allImages = Object.values(product.images).flat();
  const metalKey = variant.metal.includes("Vermeil") ? "vermeil" : variant.metal.includes("Gold") ? "gold" : "silver";
  const metalImages = product.images[metalKey] || product.images["default"] || allImages;
  const currentImages = metalImages.length > 0 ? metalImages : allImages;

  const handleAddToCart = () => {
    addItem({
      variantSku: variant.sku,
      productSlug: product.slug,
      productName: product.name,
      metal: variant.metal,
      price: variant.price,
      quantity: 1,
      image: currentImages[0] || "",
    });
    setAdded(true);
    toast.success(`${product.name} (${variant.metal}) added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  const heroImageUrl = allImages[0] ? `https://ethima.in${allImages[0]}` : "";
  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <div className="pt-32 pb-24">
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Collections", url: "/collections" },
        { name: product.name, url: `/products/${product.slug}` },
      ])} />
      <JsonLd data={productJsonLd({
        name: product.name,
        description: product.shortDescription,
        image: heroImageUrl,
        sku: product.slug,
        price: minPrice,
        category: product.category,
      })} />
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Link to="/collections" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-champagne hover:text-ivory transition-colors mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to collections
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              {currentImages[selectedImage] ? (
                <img src={currentImages[selectedImage]} alt={product.name} className="product-img h-full w-full object-cover transition-all duration-500" />
              ) : (
                <div className="flex h-full items-center justify-center text-champagne/30 text-xs tracking-widest uppercase">Image coming soon</div>
              )}
            </div>
            {currentImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {currentImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square w-20 shrink-0 overflow-hidden bg-secondary cursor-pointer transition-all ${
                      selectedImage === i ? "ring-1 ring-champagne" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="product-img h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow">{product.collection}</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-ivory md:text-5xl">{product.name}</h1>
            <div className="mt-4 h-px w-12 bg-champagne/60" />
            <p className="mt-6 text-base leading-relaxed text-ivory/75">{product.description}</p>

            <div className="mt-8 space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-champagne/70">Metal</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.sku}
                    onClick={() => { setSelectedMetal(i); setSelectedImage(0); setAdded(false); }}
                    className={`px-3 md:px-5 py-3 text-xs tracking-wider uppercase transition-all ${
                      selectedMetal === i
                        ? "bg-champagne text-primary-foreground"
                        : "border border-champagne/30 text-ivory/80 hover:bg-champagne/10"
                    }`}
                  >
                    {v.metal}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-champagne/70">Stone</p>
              <p className="text-sm text-ivory/80">{product.stoneType} — {product.stoneShapeOptions}</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-champagne/70">Available Sizes</p>
              <p className="text-sm text-ivory/80">{product.sizeOptions}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-champagne/70">Metal Weight</p>
                <p className="mt-1 text-ivory/80">{variant.weight}</p>
              </div>
              <div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-champagne/70">Total Carat</p>
                <p className="mt-1 text-ivory/80">{variant.totalCarat} ct</p>
              </div>
              <div>
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-champagne/70">Customisable</p>
                <p className="mt-1 text-ivory/80">{product.customizable ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="mt-4 p-4 border border-champagne/15 bg-[oklch(0.20_0.030_200/0.5)]">
              <p className="text-[0.55rem] tracking-[0.2em] uppercase text-champagne/60">Diamond Details</p>
              <p className="mt-1 text-xs text-ivory/70">{variant.diamondDetails}</p>
            </div>

            <div className="mt-4">
              <p className="text-[0.55rem] tracking-[0.2em] uppercase text-champagne/60">· {product.inventoryModel}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-3xl font-serif text-ivory">{formatPrice(variant.price)}</p>
              <p className="mt-1 text-xs text-ivory/50">Inclusive of all taxes. Made to order.</p>
              <p className="mt-2 text-[0.55rem] tracking-wide text-ivory/40 leading-relaxed">Each ethima piece is made around you. Final pricing may vary depending on customisations, diamond selection, and metal preferences chosen during the design process.</p>

              <button
                onClick={handleAddToCart}
                className={`mt-6 inline-flex w-full items-center justify-center gap-3 px-8 py-4 text-[0.7rem] tracking-[0.32em] uppercase transition-all ${
                  added
                    ? "bg-teal-deep text-ivory"
                    : "bg-champagne text-primary-foreground hover:bg-ivory"
                }`}
              >
                {added ? (
                  <><Check className="h-4 w-4" /> Added to Cart</>
                ) : (
                  <><ShoppingCart className="h-4 w-4" /> Add to Cart</>
                )}
              </button>

              <Link
                to="/consultation"
                className="mt-3 inline-flex w-full items-center justify-center border border-champagne/60 px-8 py-4 text-[0.7rem] tracking-[0.32em] uppercase text-ivory transition-all hover:bg-champagne hover:text-primary-foreground"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
