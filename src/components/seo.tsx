export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export const SITE_URL = "https://ethima.in";
export const SITE_URL_CONST = SITE_URL;
const ORG_NAME = "ethima";
const SOCIAL_PROFILES = ["https://www.instagram.com/ethima.in", "https://wa.me/918347867232"];

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "JewelryStore"],
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    image: `${SITE_URL}/og-image.jpg`,
    description: "Personalised fine jewellery crafted with lab-grown diamonds in India.",
    priceRange: "₹₹",
    telephone: "+91-8347867232",
    email: "hello@ethima.in",
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8347867232",
      contactType: "customer service",
      email: "hello@ethima.in",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  image: string;
  sku: string;
  slug: string;
  price: number;
  category: string;
  brand?: string;
}) {
  const productUrl = `${SITE_URL}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? [product.image] : undefined,
    sku: product.sku,
    category: product.category,
    brand: { "@type": "Brand", name: product.brand || ORG_NAME },
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: product.price.toFixed(2),
      priceCurrency: "INR",
      availability: "https://schema.org/MadeToOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function itemListJsonLd(
  items: { name: string; url: string; image?: string; position: number }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
      ...(item.image ? { image: `${SITE_URL}${item.image}` } : {}),
    })),
  };
}

export function faqJsonLd(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

const COMMON_TAGS = {
  siteName: ORG_NAME,
  locale: "en_IN",
  twitterSite: "@ethima_in",
};

export function seoMeta({
  title,
  description,
  keywords,
  image,
  url,
  ogType,
  noindex,
}: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  ogType?: string;
  noindex?: boolean;
}) {
  const tags: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType || "website" },
    { property: "og:site_name", content: COMMON_TAGS.siteName },
    { property: "og:locale", content: COMMON_TAGS.locale },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (keywords) tags.push({ name: "keywords", content: keywords });
  if (image) {
    tags.push({ property: "og:image", content: image });
    tags.push({ name: "twitter:image", content: image });
  }
  if (url) tags.push({ property: "og:url", content: url });
  tags.push({
    name: "robots",
    content: noindex ? "noindex, nofollow" : "index, follow",
  });
  return tags;
}

export function canonicalLink(url: string) {
  return { rel: "canonical", href: `${SITE_URL}${url}` };
}
