// Client entry for the SPA build (Vercel). Not used by the SSR/Worker build.
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

window.addEventListener("error", (e) => {
  document.title = "ERR: " + (e.error?.message || e.message || "?");
  console.error("GLOBAL ERROR:", e.error || e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  document.title = "REJ: " + (e.reason?.message || "?");
  console.error("UNHANDLED REJECTION:", e.reason);
});

const router = getRouter();

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
