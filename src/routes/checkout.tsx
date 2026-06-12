import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ShoppingBag, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — ethima" },
      { name: "description", content: "Submit your order request." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://ethima.in/checkout" }],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, loading } = useAuth();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) window.location.href = "/auth";
  }, [user, loading]);

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-[700px] px-6 lg:px-10 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-champagne/40" strokeWidth={1} />
          <h1 className="mt-6 font-serif text-3xl text-ivory">Your cart is empty</h1>
          <p className="mt-3 text-sm text-ivory/60">Add some pieces before submitting a request.</p>
          <Link to="/collections" className="mt-8 inline-flex items-center gap-2 text-sm text-champagne hover:text-ivory transition-colors">
            <ArrowLeft className="h-4 w-4" /> Browse collections
          </Link>
        </div>
      </div>
    );
  }

  const inputCls = "w-full border border-input bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-champagne outline-none";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    if (!name || !email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }
    setBusy(true);

    const orderItems = items.map((i) => ({
      sku: i.variantSku,
      product: i.productName,
      metal: i.metal,
      quantity: i.quantity,
      price: i.price,
    }));

    const { error } = await supabase.from("orders").insert({
      user_id: user?.id,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      items: orderItems,
      total: totalPrice,
      status: "pending",
    });

    setBusy(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    clearCart();
    window.location.href = "/thank-you";
  }

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[700px] px-6 lg:px-10">
        <Link to="/cart" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-champagne hover:text-ivory transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to cart
        </Link>

        <h1 className="mt-6 font-serif text-4xl text-ivory">Submit your request</h1>
        <p className="mt-2 text-sm text-ivory/60">We'll reach out on WhatsApp within 24 hours to confirm your design details, pricing and timeline.</p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.2em] uppercase text-champagne/70">Your details</p>
            <input ref={nameRef} required className={inputCls} placeholder="Full name" defaultValue="" />
            <input ref={emailRef} required type="email" className={inputCls} placeholder="Email" defaultValue="" />
            <input ref={phoneRef} required type="tel" className={inputCls} placeholder="Phone number" defaultValue="" />
          </div>

          <div className="space-y-3">
            <p className="text-xs tracking-[0.2em] uppercase text-champagne/70">Order summary</p>
            <div className="divide-y divide-border border border-border">
              {items.map((item) => (
                <div key={item.variantSku} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <div>
                    <p className="text-ivory">{item.productName}</p>
                    <p className="text-xs text-champagne/60">{item.metal} × {item.quantity}</p>
                  </div>
                  <p className="text-ivory shrink-0">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-4 py-3 border border-t-0 border-border">
              <p className="text-sm uppercase tracking-widest text-ivory/70">Total</p>
              <p className="text-lg font-serif text-ivory">{formatPrice(totalPrice)}</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-champagne px-8 py-4 text-[0.7rem] tracking-[0.32em] uppercase text-primary-foreground transition-all hover:bg-ivory disabled:opacity-60"
          >
            {busy ? <span className="inline-flex items-center gap-2"><LoaderCircle className="h-4 w-4 animate-spin" /> Submitting...</span> : "Submit Request"}
          </button>

          <p className="text-center text-xs text-ivory/40">
            Made to order. Our team will contact you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
