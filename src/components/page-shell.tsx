import { type ReactNode } from "react";

export function PageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 font-serif text-5xl leading-[1.05] text-ivory md:text-6xl">{title}</h1>
        <div className="mt-6 h-px w-16 bg-champagne/60" />
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/75">{intro}</p>}
        <div className="mt-14">{children}</div>
      </div>
    </div>
  );
}
