import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Request Submitted — ethima" },
      { name: "description", content: "Thank you for your request." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[600px] px-6 lg:px-10 text-center">
        <CheckCircle className="mx-auto h-14 w-14 text-teal-deep" strokeWidth={1.2} />
        <h1 className="mt-6 font-serif text-4xl text-ivory">Thank you for starting your ethima piece.</h1>
        <div className="mx-auto mt-6 h-px w-16 bg-champagne/60" />
        <p className="mt-6 text-sm leading-relaxed text-ivory/75">
          We've received your request. Our team will reach out on WhatsApp within 24 hours to confirm your design details, pricing and timeline.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ivory/75">
          Your piece will move into production once the advance payment and final details are confirmed.
        </p>
        <Link to="/collections" className="mt-10 inline-flex items-center gap-2 text-sm text-champagne hover:text-ivory transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue browsing
        </Link>
      </div>
    </div>
  );
}
