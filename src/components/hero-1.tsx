import type React from "react";

export function Hero1({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4">
      <div className="h-[400px] relative rounded-[10px] overflow-hidden">
        <img src="/img/hero-bg.jpg" className="object-cover w-full h-[400px]" />
        <div className="bg-black/80 absolute w-full top-0 left-0 h-[400px]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    </section>
  );
}
