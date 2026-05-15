import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ethima — Personalised Fine Jewellery" },
      { name: "description", content: "Lab-grown diamond jewellery, made around you." },
      { property: "og:title", content: "ethima — Personalised Fine Jewellery" },
      { property: "og:description", content: "Lab-grown diamond jewellery, made around you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ethima — Personalised Fine Jewellery" },
      { name: "twitter:description", content: "Lab-grown diamond jewellery, made around you." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aeae7b24-0b6e-4870-b62d-a6513d1a3c35/id-preview-86a9c57c--2180bb17-54c4-42d2-8948-004e96ade63a.lovable.app-1778411892962.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aeae7b24-0b6e-4870-b62d-a6513d1a3c35/id-preview-86a9c57c--2180bb17-54c4-42d2-8948-004e96ade63a.lovable.app-1778411892962.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "sonner";

function WhatsAppButton() {
  const phone = "918347867232";
  const message = encodeURIComponent(
    "Hi! I found you on your website and would love to know more about your jewellery."
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "3.25rem",
        width: "3.25rem",
        borderRadius: "9999px",
        backgroundColor: "#25D366",
        color: "#ffffff",
        boxShadow: "0 0 0 1px rgba(37,211,102,0.2), 0 8px 32px -8px rgba(37,211,102,0.55)",
        transition: "transform 0.3s cubic-bezier(0.2,0.7,0.2,1), box-shadow 0.3s cubic-bezier(0.2,0.7,0.2,1)",
        textDecoration: "none",
      }}
      className="whatsapp-fab group"
    >
      {/* WhatsApp icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        style={{ height: "1.5rem", width: "1.5rem" }}
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.825.738 5.476 2.027 7.776L0 32l8.456-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.77-1.851l-.485-.288-5.02 1.194 1.215-4.887-.317-.502A13.267 13.267 0 0 1 2.667 16C2.667 8.637 8.637 2.667 16 2.667S29.333 8.637 29.333 16 23.363 29.333 16 29.333zm7.27-9.762c-.398-.199-2.354-1.162-2.72-1.295-.365-.133-.631-.199-.897.2-.266.398-1.029 1.295-1.261 1.561-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.203-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.399-.025-.614.175-.812.18-.18.398-.465.597-.698.2-.232.266-.398.399-.664.133-.266.066-.499-.033-.698-.1-.199-.897-2.162-1.229-2.96-.324-.776-.652-.671-.897-.683l-.764-.013c-.266 0-.698.1-1.063.499-.365.398-1.395 1.362-1.395 3.324s1.428 3.855 1.627 4.121c.2.266 2.81 4.291 6.808 6.018.952.411 1.694.657 2.272.841.955.304 1.824.261 2.511.158.766-.114 2.354-.963 2.687-1.893.333-.93.333-1.727.233-1.893-.1-.166-.365-.266-.763-.465z" />
      </svg>

      {/* Tooltip */}
      <span
        style={{
          position: "absolute",
          right: "calc(100% + 0.75rem)",
          whiteSpace: "nowrap",
          background: "oklch(0.20 0.030 200)",
          color: "oklch(0.93 0.012 92)",
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          padding: "0.45rem 0.85rem",
          border: "1px solid oklch(0.93 0.012 92 / 15%)",
          pointerEvents: "none",
        }}
        className="whatsapp-tooltip"
      >
        Chat with us
      </span>
    </a>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SiteHeader />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster theme="dark" position="top-center" />
        <WhatsAppButton />
      </AuthProvider>
    </QueryClientProvider>
  );
}
