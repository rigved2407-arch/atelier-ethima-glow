import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/data/products";
import { ShoppingCart, Trash2, ArrowLeft, Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — ethima" },
      { name: "description", content: "View your ethima cart." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-[700px] px-6 lg:px-10 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-champagne/40" strokeWidth={1} />
          <h1 className="mt-6 font-serif text-3xl text-ivory">Your cart is empty</h1>
          <p className="mt-3 text-sm text-ivory/60">Looks like you haven't added anything yet.</p>
          <Link to="/collections" className="mt-8 inline-flex items-center gap-2 text-sm text-champagne hover:text-ivory transition-colors">
            <ArrowLeft className="h-4 w-4" /> Browse collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[700px] px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl text-ivory">Cart ({totalItems})</h1>
          <Link to="/collections" className="text-xs tracking-widest uppercase text-champagne hover:text-ivory transition-colors">
            Continue shopping
          </Link>
        </div>

        <div className="mt-10 divide-y divide-border">
          {items.map((item) => (
            <div key={item.variantSku} className="flex gap-5 py-6">
              <div className="relative h-20 w-20 md:h-28 md:w-28 shrink-0 overflow-hidden bg-secondary">
                {item.image ? (
                  <img src={item.image} alt={item.productName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-champagne/20 text-[0.5rem] tracking-widest uppercase">Img</div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link to="/products/$slug" params={{ slug: item.productSlug }} className="text-sm tracking-wider uppercase text-ivory hover:text-champagne transition-colors">
                    {item.productName}
                  </Link>
                  <p className="mt-0.5 text-xs text-champagne/60">{item.metal}</p>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) removeItem(item.variantSku);
                        else updateQuantity(item.variantSku, item.quantity - 1);
                      }}
                      className="flex h-7 w-7 items-center justify-center border border-champagne/30 text-ivory/70 hover:text-ivory transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm text-ivory w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantSku, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center border border-champagne/30 text-ivory/70 hover:text-ivory transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-ivory font-medium">{formatPrice(item.price * item.quantity)}</p>
                    <button onClick={() => removeItem(item.variantSku)} className="text-champagne/50 hover:text-red-400 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-widest text-ivory/70">Subtotal</p>
            <p className="text-2xl font-serif text-ivory">{formatPrice(totalPrice)}</p>
          </div>
          <p className="mt-1 text-xs text-ivory/50 text-right">Inclusive of all taxes. Shipping calculated at checkout.</p>

          <Link to="/checkout" className="mt-6 block w-full bg-champagne px-8 py-4 text-center text-[0.7rem] tracking-[0.32em] uppercase text-primary-foreground transition-all hover:bg-ivory">
            Submit Request
          </Link>

          <p className="mt-3 text-center text-xs text-ivory/40">
            Made to order. Delivery within 14–20 days.
          </p>
        </div>
      </div>
    </div>
  );
}
