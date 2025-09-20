"use client";
import { useState } from "react";

export default function Hero() {
  const [fallback, setFallback] = useState(false);

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden pt-16">
      {/* Background video */}
      <div className="absolute inset-0">
        {!fallback ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero.jpg"
            onError={() => setFallback(true)}
            src="/hero.mp4"
          />
        ) : (
          <img src="/hero.jpg" alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content (no carousel) */}
      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="w-full max-w-3xl text-white">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              <span className="text-amber-400">DIGITALIZING</span><br />SIKKIM
            </h1>
            <p className="mt-4 max-w-md text-white/85">
              Preserving sacred stories forever.
            </p>
          </div>
        </div>

        {/* Scroll hint – make it clickable to jump to Explore */}
        <a
          href="#explore"
          className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 flex items-center gap-3"
        >
          <svg width="22" height="34" viewBox="0 0 24 36">
            <rect x="6" y="1" width="12" height="22" rx="6" ry="6" stroke="currentColor" fill="none" strokeWidth="2"/>
            <circle cx="12" cy="7" r="2" fill="currentColor">
              <animate attributeName="cy" values="7;11;7" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="uppercase tracking-widest text-sm">Scroll To Explore</span>
        </a>
      </div>
    </section>
  );
}
