export interface ProductVariant {
  sku: string
  metal: string
  weight: string
  diamondDetails: string
  totalCarat: number
  price: number
}

export interface Product {
  id: string
  slug: string
  name: string
  category: "rings" | "pendants" | "earrings" | "bracelets"
  collection: string
  description: string
  shortDescription: string
  designType: string
  stoneType: string
  stoneShapeOptions: string
  sizeOptions: string
  customizable: boolean
  inventoryModel: string
  launchPriority: string
  primaryChannel: string
  notes: string
  images: Record<string, string[]>
  variants: ProductVariant[]
}

export const PRODUCTS: Product[] = [
  {
    id: "ETH-ER-001",
    slug: "ethima-diamond-hoops",
    name: "ethima Diamond Hoops",
    category: "earrings",
    collection: "The Everyday Edit",
    description:
      "A refined everyday hoop, finished with lab-grown diamonds for a soft, elegant sparkle. Designed to feel minimal yet elevated, these hoops move effortlessly from workwear to evening dressing.",
    shortDescription: "Minimal diamond hoops for everyday wear.",
    designType: "Hoops",
    stoneType: "Lab-grown diamonds",
    stoneShapeOptions: "Pavé / small round diamonds",
    sizeOptions: "Small / Medium",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Core launch",
    primaryChannel: "Website + Instagram",
    notes: "Hero everyday earrings; keep render clean and side/front angle",
    images: {
      silver: ["/products/ethima-diamond-hoops/silver-1.png", "/products/ethima-diamond-hoops/silver-2.png", "/products/ethima-diamond-hoops/silver-3.png", "/products/ethima-diamond-hoops/silver-4.png", "/products/ethima-diamond-hoops/silver-5.png"],
      gold: ["/products/ethima-diamond-hoops/gold-1.png", "/products/ethima-diamond-hoops/gold-2.png", "/products/ethima-diamond-hoops/gold-3.png", "/products/ethima-diamond-hoops/gold-4.png", "/products/ethima-diamond-hoops/gold-5.png"],
      vermeil: ["/products/ethima-diamond-hoops/silver-1.png", "/products/ethima-diamond-hoops/silver-2.png", "/products/ethima-diamond-hoops/silver-3.png", "/products/ethima-diamond-hoops/silver-4.png", "/products/ethima-diamond-hoops/silver-5.png"],
    },
    variants: [
      {
        sku: "ETH-ER-001-SIL",
        metal: "925 Silver",
        weight: "3.5 gms",
        diamondDetails: "1.50 mm x 56 pcs",
        totalCarat: 0.71,
        price: 15999,
      },
      {
        sku: "ETH-ER-001-VRM",
        metal: "Gold Vermeil on 925 Silver",
        weight: "3.5 gms",
        diamondDetails: "1.50 mm x 56 pcs",
        totalCarat: 0.71,
        price: 17999,
      },
      {
        sku: "ETH-ER-001-10K",
        metal: "10KT Gold",
        weight: "3.5 gms",
        diamondDetails: "1.50 mm x 56 pcs",
        totalCarat: 0.71,
        price: 42999,
      },
    ],
  },
  {
    id: "ETH-ER-002",
    slug: "nova-earrings",
    name: "Nova Earrings",
    category: "earrings",
    collection: "The Everyday Edit",
    description:
      "The Nova Earrings are designed with a soft curved silhouette and delicate pavé detailing, creating a graceful line of sparkle. Lightweight, refined, and easy to wear, they add a polished touch without feeling heavy or loud.",
    shortDescription: "Minimal curved pavé earrings.",
    designType: "Curved Pavé",
    stoneType: "Lab-grown diamonds",
    stoneShapeOptions: "Pavé round diamonds",
    sizeOptions: "One size",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Core launch",
    primaryChannel: "Website + Instagram",
    notes: "Use as soft minimal office-to-evening piece",
    images: {
      silver: ["/products/nova-earrings/silver-1.png", "/products/nova-earrings/silver-2.png", "/products/nova-earrings/silver-3.png"],
      gold: ["/products/nova-earrings/gold-1.png", "/products/nova-earrings/gold-2.png", "/products/nova-earrings/gold-3.png"],
      vermeil: ["/products/nova-earrings/silver-1.png", "/products/nova-earrings/silver-2.png", "/products/nova-earrings/silver-3.png"],
    },
    variants: [
      {
        sku: "ETH-ER-002-SIL",
        metal: "925 Silver",
        weight: "4.0 gms",
        diamondDetails: "1.30mm–2.00mm x 42 pcs",
        totalCarat: 0.65,
        price: 17499,
      },
      {
        sku: "ETH-ER-002-VRM",
        metal: "Gold Vermeil on 925 Silver",
        weight: "4.0 gms",
        diamondDetails: "1.30mm–2.00mm x 42 pcs",
        totalCarat: 0.65,
        price: 19999,
      },
      {
        sku: "ETH-ER-002-10K",
        metal: "10KT Gold",
        weight: "4.0 gms",
        diamondDetails: "1.30mm–2.00mm x 42 pcs",
        totalCarat: 0.65,
        price: 49999,
      },
    ],
  },
  {
    id: "ETH-ER-003",
    slug: "aster-diamond-stud-earrings",
    name: "Aster Diamond Stud Earrings",
    category: "earrings",
    collection: "The Everyday Edit",
    description:
      "The Aster Diamond Studs are everyday essentials with a refined diamond finish. Simple, versatile, and timeless, they are designed to be the pair you reach for again and again.",
    shortDescription: "Classic diamond studs for daily wear.",
    designType: "Studs",
    stoneType: "Lab-grown diamonds",
    stoneShapeOptions: "Round / Princess / Oval",
    sizeOptions: "Small / Medium",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Core launch",
    primaryChannel: "Website + Instagram",
    notes: "Ideal trust-building basic; include pair view",
    images: {
      silver: ["/products/aster-diamond-stud-earrings/silver-1.png", "/products/aster-diamond-stud-earrings/silver-2.png", "/products/aster-diamond-stud-earrings/silver-3.png"],
      gold: ["/products/aster-diamond-stud-earrings/gold-1.png", "/products/aster-diamond-stud-earrings/gold-2.png", "/products/aster-diamond-stud-earrings/gold-3.png"],
      vermeil: ["/products/aster-diamond-stud-earrings/silver-1.png", "/products/aster-diamond-stud-earrings/silver-2.png", "/products/aster-diamond-stud-earrings/silver-3.png"],
    },
    variants: [
      {
        sku: "ETH-ER-003-SIL",
        metal: "925 Silver",
        weight: "1.0 gms",
        diamondDetails: "3.00 mm x 1 pc",
        totalCarat: 0.1,
        price: 4999,
      },
      {
        sku: "ETH-ER-003-VRM",
        metal: "Gold Vermeil on 925 Silver",
        weight: "1.0 gms",
        diamondDetails: "3.00 mm x 1 pc",
        totalCarat: 0.1,
        price: 6999,
      },
      {
        sku: "ETH-ER-003-10K",
        metal: "10KT Gold",
        weight: "1.0 gms",
        diamondDetails: "3.00 mm x 1 pc",
        totalCarat: 0.1,
        price: 13999,
      },
    ],
  },
  {
    id: "ETH-RG-001",
    slug: "elara-solitaire-ring",
    name: "Elara Solitaire Ring",
    category: "rings",
    collection: "The ethima Signature",
    description:
      "The Elara Solitaire Ring is a timeless expression of elegance. Centred around a lab-grown diamond, this piece is designed to feel classic, personal, and effortlessly wearable — perfect as a self-reward, promise ring, or everyday signature.",
    shortDescription: "Classic solitaire ring designed around the customer.",
    designType: "Solitaire",
    stoneType: "Lab-grown diamond",
    stoneShapeOptions: "Round / Oval / Emerald / Pear / Marquise",
    sizeOptions: "Ring sizes",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Signature piece",
    primaryChannel: "Website + Consultation",
    notes: "Use for customisation messaging; metal, size, stone shape",
    images: {
      silver: ["/products/elara-solitaire-ring/silver-1.png", "/products/elara-solitaire-ring/silver-2.png", "/products/elara-solitaire-ring/silver-3.png", "/products/elara-solitaire-ring/silver-4.png"],
      gold: ["/products/elara-solitaire-ring/gold-1.png", "/products/elara-solitaire-ring/gold-2.png", "/products/elara-solitaire-ring/gold-3.png", "/products/elara-solitaire-ring/gold-4.png"],
      vermeil: ["/products/elara-solitaire-ring/silver-1.png", "/products/elara-solitaire-ring/silver-2.png", "/products/elara-solitaire-ring/silver-3.png", "/products/elara-solitaire-ring/silver-4.png"],
    },
    variants: [
      {
        sku: "ETH-RG-001-SIL",
        metal: "925 Silver",
        weight: "3.5 gms",
        diamondDetails: "7.00 mm x 1 pc",
        totalCarat: 1.28,
        price: 17999,
      },
      {
        sku: "ETH-RG-001-VRM",
        metal: "Gold Vermeil on 925 Silver",
        weight: "3.5 gms",
        diamondDetails: "7.00 mm x 1 pc",
        totalCarat: 1.28,
        price: 19999,
      },
      {
        sku: "ETH-RG-001-10K",
        metal: "10KT Gold",
        weight: "3.5 gms",
        diamondDetails: "7.00 mm x 1 pc",
        totalCarat: 1.28,
        price: 50499,
      },
    ],
  },
  {
    id: "ETH-RG-002",
    slug: "luna-ring",
    name: "Luna Ring",
    category: "rings",
    collection: "The Everyday Edit",
    description:
      "The Luna Ring is a minimal everyday diamond ring with a soft, refined presence. Designed for subtle elegance, it can be worn alone for a clean look or stacked with other pieces for a more personalised style.",
    shortDescription: "Minimal everyday diamond ring.",
    designType: "Minimal Band",
    stoneType: "Lab-grown diamonds",
    stoneShapeOptions: "Small round diamonds",
    sizeOptions: "Ring sizes",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Core launch",
    primaryChannel: "Website + Instagram",
    notes: "Keep simple and accessible; everyday self-reward positioning",
    images: {
      silver: ["/products/luna-ring/silver-1.png", "/products/luna-ring/silver-2.png", "/products/luna-ring/silver-3.png", "/products/luna-ring/silver-4.png"],
      gold: ["/products/luna-ring/gold-1.png", "/products/luna-ring/gold-2.png", "/products/luna-ring/gold-3.png", "/products/luna-ring/gold-4.png"],
      vermeil: ["/products/luna-ring/silver-1.png", "/products/luna-ring/silver-2.png", "/products/luna-ring/silver-3.png", "/products/luna-ring/silver-4.png"],
    },
    variants: [
      {
        sku: "ETH-RG-002-SIL",
        metal: "925 Silver",
        weight: "1.5 gms",
        diamondDetails: "2.00 mm x 5 pcs",
        totalCarat: 0.15,
        price: 6099,
      },
      {
        sku: "ETH-RG-002-VRM",
        metal: "Gold Vermeil on 925 Silver",
        weight: "1.5 gms",
        diamondDetails: "2.00 mm x 5 pcs",
        totalCarat: 0.15,
        price: 8999,
      },
      {
        sku: "ETH-RG-002-10K",
        metal: "10KT Gold",
        weight: "1.5 gms",
        diamondDetails: "2.00 mm x 5 pcs",
        totalCarat: 0.15,
        price: 19599,
      },
    ],
  },
  {
    id: "ETH-PD-002",
    slug: "elan-solitaire-pendant",
    name: "Élan Solitaire Pendant",
    category: "pendants",
    collection: "The Everyday Edit",
    description:
      "The Élan Solitaire Pendant is a classic everyday diamond necklace designed with simplicity and grace. Centred around a lab-grown diamond, it brings effortless polish to any look while remaining timeless and understated.",
    shortDescription: "Elegant solitaire pendant for everyday luxury.",
    designType: "Solitaire Pendant",
    stoneType: "Lab-grown diamond",
    stoneShapeOptions: "Round / Oval / Pear",
    sizeOptions: "Chain length options",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Core launch",
    primaryChannel: "Website + Instagram",
    notes: "Show with chain and close-up render",
    images: {
      silver: ["/products/elan-solitaire-pendant/silver-1.png", "/products/elan-solitaire-pendant/silver-2.png"],
      gold: ["/products/elan-solitaire-pendant/gold-1.png", "/products/elan-solitaire-pendant/gold-2.png"],
      vermeil: ["/products/elan-solitaire-pendant/silver-1.png", "/products/elan-solitaire-pendant/silver-2.png"],
    },
    variants: [
      {
        sku: "ETH-PD-002-SIL",
        metal: "925 Silver",
        weight: "1.2 gms",
        diamondDetails: "8.00 mm x 1 pc",
        totalCarat: 1.92,
        price: 23999,
      },
      {
        sku: "ETH-PD-002-VRM",
        metal: "Gold Vermeil on 925 Silver",
        weight: "1.2 gms",
        diamondDetails: "8.00 mm x 1 pc",
        totalCarat: 1.92,
        price: 25999,
      },
      {
        sku: "ETH-PD-002-10K",
        metal: "10KT Gold",
        weight: "1.2 gms",
        diamondDetails: "8.00 mm x 1 pc",
        totalCarat: 1.92,
        price: 38999,
      },
    ],
  },
  {
    id: "ETH-PD-001",
    slug: "initial-pendant",
    name: "Initial Pendant",
    category: "pendants",
    collection: "The Personal Edit",
    description: "A personal piece designed around your identity. The Initial Pendant brings together minimal design and lab-grown diamond detailing to create a meaningful everyday necklace that feels intimate, elegant, and uniquely yours.",
    shortDescription: "Custom initial pendant with lab-grown diamond detail.",
    designType: "Initial / Alphabet",
    stoneType: "Lab-grown diamonds",
    stoneShapeOptions: "Initial + small round diamonds",
    sizeOptions: "Initial A-Z",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Personalisation hero",
    primaryChannel: "Website + WhatsApp",
    notes: "Strong WhatsApp/social product; ask customer for initial",
    images: {
      silver: ["/products/initial-pendant/silver-1.png", "/products/initial-pendant/silver-2.png", "/products/initial-pendant/silver-3.png", "/products/initial-pendant/silver-4.png", "/products/initial-pendant/silver-5.png", "/products/initial-pendant/silver-6.png", "/products/initial-pendant/silver-7.png"],
      gold: ["/products/initial-pendant/gold-1.png", "/products/initial-pendant/gold-2.png", "/products/initial-pendant/gold-3.png", "/products/initial-pendant/gold-4.png", "/products/initial-pendant/gold-5.png", "/products/initial-pendant/gold-6.png", "/products/initial-pendant/gold-7.png"],
      vermeil: ["/products/initial-pendant/silver-1.png", "/products/initial-pendant/silver-2.png", "/products/initial-pendant/silver-3.png", "/products/initial-pendant/silver-4.png", "/products/initial-pendant/silver-5.png", "/products/initial-pendant/silver-6.png", "/products/initial-pendant/silver-7.png"],
    },
    variants: [
      { sku: "ETH-PD-001-SIL", metal: "925 Silver", weight: "4.0 gms", diamondDetails: "3.00 mm x 10 pcs", totalCarat: 1.01, price: 17999 },
      { sku: "ETH-PD-001-VRM", metal: "Gold Vermeil on 925 Silver", weight: "4.0 gms", diamondDetails: "3.00 mm x 10 pcs", totalCarat: 1.01, price: 21999 },
      { sku: "ETH-PD-001-10K", metal: "10KT Gold", weight: "4.0 gms", diamondDetails: "3.00 mm x 10 pcs", totalCarat: 1.01, price: 50499 },
    ],
  },
  {
    id: "ETH-PD-003",
    slug: "zodiac-pendant",
    name: "Zodiac Pendant",
    category: "pendants",
    collection: "The Personal Edit",
    description:
      "A personal zodiac pendant designed around the wearer. Each piece is crafted with your zodiac sign and accented with lab-grown diamonds, making it a deeply meaningful gift or personal treasure.",
    shortDescription: "Personal zodiac pendant designed around the wearer.",
    designType: "Zodiac",
    stoneType: "Lab-grown diamonds",
    stoneShapeOptions: "Zodiac sign + small round diamonds",
    sizeOptions: "12 zodiac signs",
    customizable: true,
    inventoryModel: "Made-to-order",
    launchPriority: "Personalisation hero",
    primaryChannel: "Website + WhatsApp",
    notes: "Use for gifting angle and personalisation campaign",
    images: {
      silver: ["/products/zodiac-pendant/silver-1.png", "/products/zodiac-pendant/silver-2.png", "/products/zodiac-pendant/silver-3.png", "/products/zodiac-pendant/silver-4.png", "/products/zodiac-pendant/silver-5.png"],
      gold: ["/products/zodiac-pendant/gold-1.png", "/products/zodiac-pendant/gold-2.png", "/products/zodiac-pendant/gold-3.png", "/products/zodiac-pendant/gold-4.png", "/products/zodiac-pendant/gold-5.png"],
      editorial: ["/products/zodiac-pendant/editorial-1.png", "/products/zodiac-pendant/editorial-2.png", "/products/zodiac-pendant/editorial-3.png", "/products/zodiac-pendant/editorial-4.png", "/products/zodiac-pendant/editorial-5.png"],
      vermeil: ["/products/zodiac-pendant/silver-1.png", "/products/zodiac-pendant/silver-2.png", "/products/zodiac-pendant/silver-3.png", "/products/zodiac-pendant/silver-4.png", "/products/zodiac-pendant/silver-5.png"],
    },
    variants: [
      {
        sku: "ETH-PD-003-SIL",
        metal: "925 Silver",
        weight: "1.6 gms",
        diamondDetails: "1.5mm & below x 45 pcs, 2.00mm x 1 pc",
        totalCarat: 0.59,
        price: 31999,
      },
      {
        sku: "ETH-PD-003-VRM",
        metal: "Gold Vermeil on 925 Silver",
        weight: "1.6 gms",
        diamondDetails: "1.5mm & below x 45 pcs, 2.00mm x 1 pc",
        totalCarat: 0.59,
        price: 33999,
      },
      {
        sku: "ETH-PD-003-10K",
        metal: "10KT Gold",
        weight: "1.6 gms",
        diamondDetails: "1.5mm & below x 45 pcs, 2.00mm x 1 pc",
        totalCarat: 0.59,
        price: 44999,
      },
    ],
  },
]

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "all") return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}
