"use client";
import { useEffect, useState } from "react";

type IntroProps = {
  mp4?: string;
  webm?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  autoCloseMs?: number | null; // set to a number (e.g., 1500) if you want auto-dismiss
};

export default function Intro({
  mp4 = "/hero.mp4",
  webm = "/hero.webm",       // optional, can be missing
  poster = "/hero.jpg",      // optional
  title = "Sangha",
  subtitle = "A digital window into Sikkim’s monasteries",
  buttonLabel = "Enter",
  autoCloseMs = null,        // e.g., 1200 to auto-close after 1.2s
}: IntroProps) {
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const seen = typeof window !== "undefined" && sessionStorage.getItem("introDone") === "1";
    if (!seen) {
      setShow(true);
      if (autoCloseMs && autoCloseMs > 0) {
        const id = setTimeout(() => startExit(), autoCloseMs);
        return () => clearTimeout(id);
      }
    }
  }, [autoCloseMs]);

  const startExit = () => {
    setFade(true);
    setTimeout(() => {
      sessionStorage.setItem("introDone", "1");
      setShow(false);
      setFade(false);
    }, 650); // match transition duration
  };

  if (!show) return null;

  return (
    <div
      onClick={startExit} // click anywhere to enter
      data-cursor="link"     
      className={`fixed inset-0 z-[70] select-none
                  transition-opacity duration-700
                  ${fade ? "opacity-0" : "opacity-100"}`}
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
        {/* subtle dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight drop-shadow">
            {title}
          </h1>
          <p className="mt-3 opacity-90 max-w-2xl mx-auto md:text-lg">
            {subtitle}
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); startExit(); }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/60
                       px-5 py-2 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition"
          >
            {buttonLabel}
          </button>

          <div className="mt-6 flex items-center justify-center gap-5 text-sm">
            <a href="#explore" onClick={(e)=>{e.stopPropagation(); startExit();}} className="underline underline-offset-4">
              Explore
            </a>
            {/* <a href="#archive" onClick={(e)=>{e.stopPropagation(); startExit();}} className="underline underline-offset-4">
              Archive
            </a>
            <a href="#contact" onClick={(e)=>{e.stopPropagation(); startExit();}} className="underline underline-offset-4">
              Contact
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
