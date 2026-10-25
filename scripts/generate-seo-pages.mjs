import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://ethima.in";
const root = process.cwd();
const distDir = path.join(root, "dist");
const sourceIndex = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
const productSource = fs.readFileSync(path.join(root, "src/data/products.ts"), "utf8");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeJsonForHtml = (value) => JSON.stringify(value).replaceAll("</", "<\\/");

function parseProducts() {
  return [...productSource.matchAll(/\{\n\s+id:\s+"([^"]+)"[\s\S]*?\n\s+\},(?=\n\s+\{)/g)]
    .map((match) => {
      const block = match[0];
      const field = (name) => block.match(new RegExp(`${name}:\\s*"([^"]*)"`))?.[1] || "";
      const price = [...block.matchAll(/price:\s*(\d+)/g)].map((item) => Number(item[1]));
      return {
        id: match[1],
        slug: field("slug"),
        name: field("name"),
        category: field("category"),
        description: field("description"),
        shortDescription: field("shortDescription"),
        image: block.match(/images:\s*\{[\s\S]*?\["([^"]+)"/)?.[1] || "/og-image.jpg",
        price: price.length ? Math.min(...price) : undefined,
      };
    })
    .filter((product) => product.slug && product.name);
}

const products = parseProducts();

const pageDefinitions = [
  {
    path: "/",
    title: "Personalised Lab-Grown Diamond Jewellery in India | ethima",
    description:
      "Shop personalised lab-grown diamond jewellery in India. Discover made-to-order rings, pendants, earrings and bracelets designed around your story by ethima.",
    heading: "Personalised lab-grown diamond jewellery, designed around you.",
    body: "Discover made-to-order rings, pendants, earrings and bracelets crafted with lab-grown diamonds. ethima creates meaningful fine jewellery for everyday milestones and unforgettable moments.",
    links: ["/collections", "/customise", "/consultation", "/education"],
  },
  {
    path: "/collections",
    title: "Shop Lab-Grown Diamond Jewellery | ethima Collections",
    description:
      "Explore ethima's collection of made-to-order lab-grown diamond rings, earrings and pendants in India, with personalised designs for every story.",
    heading: "Shop lab-grown diamond jewellery",
    body: "Browse ethima's made-to-order collection of lab-grown diamond rings, earrings and pendants. Choose a signature design, then personalise the metal, stone and details with our team.",
    links: ["/customise", "/consultation"],
  },
  {
    path: "/customise",
    title: "Custom Diamond Jewellery Design in India | ethima",
    description:
      "Design a custom lab-grown diamond ring, pendant or personalised jewellery piece with ethima. Start with your story and create a one-of-one design.",
    heading: "Create a custom jewellery piece",
    body: "From an initial pendant to a custom diamond ring, ethima turns your idea into a made-to-order piece through consultation, design approval and careful craftsmanship.",
    links: ["/consultation", "/process", "/collections"],
  },
  {
    path: "/consultation",
    title: "Book a Personalised Jewellery Consultation | ethima",
    description:
      "Book a jewellery consultation with ethima to discuss a custom lab-grown diamond ring, pendant, earrings or a meaningful gift in India.",
    heading: "Book a jewellery design consultation",
    body: "Tell us what you want to create. Our consultation-led process helps you choose the right design, metal, diamond and finish for a piece made around your story.",
    links: ["/customise", "/process", "/contact"],
  },
  {
    path: "/process",
    title: "How Custom Jewellery Is Made | ethima",
    description:
      "Learn how ethima creates custom lab-grown diamond jewellery in India, from consultation and CAD design approval to final handcrafted delivery.",
    heading: "How your custom jewellery is made",
    body: "ethima's process is personal from the first conversation to the final polish: consultation, design and approval, expert craft, and delivery of your made-to-order piece.",
    links: ["/consultation", "/customise", "/education"],
  },
  {
    path: "/education",
    title: "Lab-Grown Diamonds Guide | ethima Jewellery Education",
    description:
      "Understand lab-grown diamonds, jewellery metals, customisation and care with ethima's practical guide to buying fine jewellery in India.",
    heading: "A guide to lab-grown diamond jewellery",
    body: "Learn about lab-grown diamonds, metal options, design choices and jewellery care before you choose your next meaningful piece from ethima.",
    links: ["/collections", "/customise", "/faqs"],
  },
  {
    path: "/about",
    title: "About ethima | Personalised Fine Jewellery in India",
    description:
      "Meet ethima, a personalised fine jewellery studio creating made-to-order lab-grown diamond pieces in India around the stories that matter to you.",
    heading: "Jewellery with a personal point of view",
    body: "ethima creates refined, meaningful jewellery for people who want more than a catalogue piece. Every design begins with your story and is crafted to order.",
    links: ["/collections", "/process", "/consultation"],
  },
  {
    path: "/contact",
    title: "Contact ethima Jewellery Studio | India",
    description:
      "Contact ethima for product questions, custom jewellery consultations, lab-grown diamond designs and made-to-order jewellery support in India.",
    heading: "Contact ethima",
    body: "Have a question about a product or a custom jewellery idea? Contact ethima for personalised guidance on lab-grown diamonds, metals, sizing and made-to-order pieces.",
    links: ["/consultation", "/faqs", "/collections"],
  },
  {
    path: "/faqs",
    title: "Jewellery FAQs | Lab-Grown Diamonds, Custom Orders & Care | ethima",
    description:
      "Find answers about ethima's lab-grown diamonds, custom jewellery process, metals, sizing, made-to-order timelines, shipping and care.",
    heading: "Frequently asked questions",
    body: "Get clear answers about lab-grown diamonds, custom orders, metal options, sizing, delivery, returns and caring for your ethima jewellery.",
    links: ["/education", "/process", "/contact"],
  },
  {
    path: "/returns",
    title: "Returns & Jewellery Policies | ethima",
    description:
      "Read ethima's returns, exchanges and made-to-order jewellery policies before placing your order.",
    heading: "Returns and jewellery policies",
    body: "Review the policies that apply to ethima jewellery orders, including made-to-order pieces, returns, exchanges and customer support.",
    links: ["/contact", "/faqs", "/collections"],
  },
  {
    path: "/privacy",
    title: "Privacy Policy | ethima",
    description:
      "Read ethima's privacy policy and learn how we handle information when you visit our jewellery website.",
    heading: "Privacy policy",
    body: "This page explains how ethima handles information submitted through the website and how we protect customer privacy.",
    links: ["/contact", "/terms"],
  },
  {
    path: "/terms",
    title: "Terms of Service | ethima",
    description:
      "Read the terms that apply to using the ethima jewellery website and placing made-to-order jewellery orders.",
    heading: "Terms of service",
    body: "Review the terms that govern use of the ethima website, product information, consultations and jewellery orders.",
    links: ["/contact", "/privacy"],
  },
];

function productPage(product) {
  const priceText = product.price
    ? ` Starting from ₹${product.price.toLocaleString("en-IN")}.`
    : "";
  return {
    path: `/products/${product.slug}`,
    title: `${product.name} | Lab-Grown Diamond Jewellery | ethima`,
    description: `${product.shortDescription || product.description}${priceText} Made to order by ethima in India.`,
    heading: product.name,
    body: `${product.description || product.shortDescription} Explore metal options, sizing and customisation details for this made-to-order ${product.category || "jewellery"} design from ethima.`,
    links: ["/collections", "/consultation", "/customise"],
    product,
  };
}

function jsonLdFor(page) {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "JewelryStore"],
    name: "ethima",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    description: "Personalised fine jewellery crafted with lab-grown diamonds in India.",
    telephone: "+91-8347867232",
    email: "hello@ethima.in",
    areaServed: { "@type": "Country", name: "India" },
    sameAs: ["https://www.instagram.com/ethima.in", "https://wa.me/918347867232"],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ethima",
    url: SITE_URL,
    inLanguage: "en-IN",
  };
  const graph = [organization, website];
  if (page.product) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: page.product.name,
      description: page.product.description || page.product.shortDescription,
      image: [`${SITE_URL}${page.product.image}`],
      sku: page.product.id,
      category: page.product.category,
      brand: { "@type": "Brand", name: "ethima" },
      url: `${SITE_URL}${page.path}`,
      ...(page.product.price
        ? {
            offers: {
              "@type": "Offer",
              url: `${SITE_URL}${page.path}`,
              price: page.product.price.toFixed(2),
              priceCurrency: "INR",
              availability: "https://schema.org/MadeToOrder",
              itemCondition: "https://schema.org/NewCondition",
            },
          }
        : {}),
    });
  }
  return graph;
}

function contentFor(page) {
  const links = page.links
    .map(
      (link) =>
        `<a href="${link}">${escapeHtml(link === "/collections" ? "Shop the collection" : link === "/consultation" ? "Book a consultation" : link === "/customise" ? "Create a custom piece" : link.slice(1))}</a>`,
    )
    .join(" · ");
  const productList =
    page.path === "/collections"
      ? `<section><h2>Featured jewellery</h2><ul>${products.map((product) => `<li><a href="/products/${escapeHtml(product.slug)}">${escapeHtml(product.name)}</a> — ${escapeHtml(product.shortDescription || product.category)}</li>`).join("")}</ul></section>`
      : "";
  return `<main><p class="eyebrow">ethima fine jewellery · India</p><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.body)}</p>${productList}<nav aria-label="Related pages">${links}</nav></main>`;
}

function renderPage(page) {
  const canonical = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const meta = `\n    <meta name="description" content="${escapeHtml(page.description)}" />\n    <meta name="robots" content="index, follow" />\n    <meta property="og:title" content="${escapeHtml(page.title)}" />\n    <meta property="og:description" content="${escapeHtml(page.description)}" />\n    <meta property="og:type" content="${page.product ? "product" : "website"}" />\n    <meta property="og:url" content="${canonical}" />\n    <meta property="og:image" content="${SITE_URL}${page.product?.image || "/og-image.jpg"}" />\n    <meta property="og:image:alt" content="${escapeHtml(page.heading)}" />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${escapeHtml(page.title)}" />\n    <meta name="twitter:description" content="${escapeHtml(page.description)}" />\n    <meta name="twitter:image" content="${SITE_URL}${page.product?.image || "/og-image.jpg"}" />\n    <link rel="canonical" href="${canonical}" />\n    <script type="application/ld+json">${escapeJsonForHtml({ "@context": "https://schema.org", "@graph": jsonLdFor(page) })}</script>`;
  return sourceIndex
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace("</head>", `${meta}\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${contentFor(page)}</div>`);
}

const pages = [...pageDefinitions, ...products.map(productPage)];
for (const page of pages) {
  const outputPath =
    page.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, page.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderPage(page));
}

const sitemapUrls = pages
  .filter((page) => page.path !== "/privacy" && page.path !== "/terms")
  .map((page) => `  <url><loc>${SITE_URL}${page.path === "/" ? "/" : page.path}</loc></url>`)
  .join("\n");
fs.writeFileSync(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
);
fs.writeFileSync(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /auth\nDisallow: /account\nDisallow: /cart\nDisallow: /checkout\nDisallow: /thank-you\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
fs.writeFileSync(
  path.join(distDir, "manus-routes.json"),
  JSON.stringify(
    {
      routes: [
        ...new Map(
          pages.map((page) => [
            page.path.startsWith("/products/") ? "/products/:slug" : page.path,
            {
              path: page.path.startsWith("/products/") ? "/products/:slug" : page.path,
              title: page.path.startsWith("/products/") ? "Product detail" : page.title,
            },
          ]),
        ).values(),
      ],
    },
    null,
    2,
  ) + "\n",
);

console.log(
  `Generated ${pages.length} crawlable SEO pages, sitemap, robots and route manifest in ${distDir}`,
);
