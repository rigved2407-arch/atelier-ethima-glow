import type { ReactNode } from "react";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = "https://ethima.in";
const ORG_NAME = "ethima";

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    description: "Personalised fine jewellery crafted with lab-grown diamonds in India.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8347867232",
      contactType: "customer service",
      email: "hello@ethima.in",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.instagram.com/ethima.in",
      "https://wa.me/918347867232",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/collections?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
  price: number;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: { "@type": "Brand", name: ORG_NAME },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/products/${product.sku}`,
    },
    category: product.category,
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
  if (noindex) tags.push({ name: "robots", content: "noindex, nofollow" });
  else tags.push({ name: "robots", content: "index, follow" });
  return tags;
}

export function canonicalLink(url: string) {
  return { rel: "canonical", href: `${SITE_URL}${url}` };
}

export const SITE_URL_CONST = SITE_URL;
