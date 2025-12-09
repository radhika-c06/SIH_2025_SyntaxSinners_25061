"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link"; 
import { useTranslation } from "react-i18next";

type Monastery = {
  key: "tashiding" | "tsuk" | "dubdi" | "rumtek";
  location: string;
  altitude: string;
  founded: string;
  image: string;
  href: string;   // 👈 important
};



const MONASTERIES: Monastery[] = [
  {
    key: "tashiding",
    location: "West Sikkim",
    altitude: "1,465m",
    founded: "1700 CE",
    image: "/monasteries/tashiding.png",
    href: "/tashiding",          // 👈 route: app/tashiding/page.tsx
  },
  {
    key: "tsuk",
    location: "Gangtok, East Sikkim",
    altitude: "1,437m",
    founded: "1894 CE",
    image: "/tsuk/tsuk.avif",
    href: "/tsuk",               // 👈 route: app/tsuk/page.tsx
  },
  {
    key: "dubdi",
    location: "Yuksom, West Sikkim",
    altitude: "2,100m",
    founded: "1701 CE",
    image: "/monasteries/dubdi.png",
    href: "/dubdi",              // 👈 route: app/dubdi/page.tsx
  },
  {
    key: "rumtek",
    location: "East Sikkim",
    altitude: "1,500m",
    founded: "18th century",
    image: "/monasteries/rumtek.jpg",
    href: "/rumtek",             // 👈 route: app/rumtek/page.tsx
  },
];


export default function MonasterySlideshow() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const { t } = useTranslation();
  const next = () => setIndex((i) => (i + 1) % MONASTERIES.length);
  const prev = () => setIndex((i) => (i - 1 + MONASTERIES.length) % MONASTERIES.length);
  const m = MONASTERIES[index];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % MONASTERIES.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`w-full flex flex-col items-center mt-50 fade-in-section${visible ? ' is-visible' : ''}`}> 
      {/* Title and Subtitle */}
      <h2 className="text-4xl md:text-5xl font-cinzel text-white mb-2 tracking-wide text-center">
        {t("slideshow.heading")}
      </h2>
      <p className="text-lg md:text-xl text-white/90 font-lora mb-8 text-center max-w-2xl">
        {t("slideshow.subtitle")}
      </p>
  <div className="relative flex flex-row items-stretch w-full max-w-none bg-transparent" style={{ minHeight: '400px', height: '400px', margin: '32px 0' }}>
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-2xl"
          aria-label="Previous"
        >&#8249;</button>
        {/* Main Card Slide */}
        <div
          className={`flex flex-row w-full rounded-2xl overflow-hidden shadow-xl relative transition-all duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
          style={{ minHeight: '400px', height: '400px', background: 'linear-gradient(to right, #e5e5e5 65%, #bdbdbd 35%)' }}
        >
          {/* Image */}
          <img src={m.image} alt={m.name} className="w-[420px] h-full object-cover rounded-l-2xl" />
          {/* Info Card */}
          <div className="flex-1 flex flex-col justify-between p-0 min-w-[320px]">
            {/* Yellow Header */}
            <div className="bg-amber-400 px-12 py-4 rounded-tr-2xl rounded-bl-2xl flex items-center">
              <span className="text-3xl font-cinzel tracking-wide text-black">
                {t(`slideshow.monasteries.${m.key}.name`)}
              </span>
            </div>
            {/* Description and Details */}
            <div className="flex flex-row w-full gap-0 h-full">
              {/* Description in lighter grey box */}
              <div className="px-12 py-8 flex-1 flex flex-col justify-center h-full bg-[#e5e5e5]" style={{ minHeight: '100%' }}>
                <div className="flex flex-col justify-center h-full">
                  <p className="text-xl font-merriweather text-black mb-8 leading-relaxed">
                    {t(`slideshow.monasteries.${m.key}.description`)}
                  </p>
                  <Link
  href={m.href}
  className="inline-block bg-amber-400 text-black font-cinzel px-8 py-3 rounded-full text-lg self-start hover:bg-amber-500 transition-colors"
>
  {t("slideshow.cta")}
</Link>
                </div>
              </div>
              {/* Details Box */}
              <div className="flex flex-col justify-center items-start bg-[#bdbdbd] rounded-r-2xl px-8 py-8 min-w-[260px] gap-8 h-full" style={{ minHeight: '100%' }}>
                <div className="flex flex-col gap-8 justify-center h-full w-full">
                  <div className="flex items-center gap-3">
                    {/* Location Pin Icon */}
                    <span className="inline-block w-8 h-8">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                        <ellipse cx="24" cy="16" rx="4" ry="4" fill="#222"/>
                        <path d="M24 6C15.163 6 8 13.163 8 22c0 8.837 16 20 16 20s16-11.163 16-20c0-8.837-7.163-16-16-16zm0 26a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" fill="#222"/>
                      </svg>
                    </span>
                    <span className="font-merriweather text-black text-lg">
                      {t(`slideshow.monasteries.${m.key}.location`, { defaultValue: m.location })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Mountain Icon */}
                    <span className="inline-block w-8 h-8">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                        <path d="M4 44L18 20l8 12 6-10 12 22H4z" fill="#222"/>
                        <path d="M18 20l8 12 6-10 12 22H4z" fill="#444" fillOpacity=".7"/>
                      </svg>
                    </span>
                    <span className="font-merriweather text-black text-lg">{m.altitude}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Clock Icon */}
                    <span className="inline-block w-8 h-8">
                      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                        <circle cx="24" cy="24" r="18" stroke="#222" strokeWidth="3" fill="none"/>
                        <path d="M24 14v10l8 8" stroke="#222" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <span className="font-merriweather text-black text-lg">
                      {t("slideshow.founded", { year: m.founded })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-2xl"
          aria-label="Next"
        >&#8250;</button>
      </div>
      {/* Thumbnails below */}
      <div className="flex gap-4 mt-6">
        {MONASTERIES.map((mon, i) => (
          <img
            key={i}
            src={mon.image}
            alt={mon.name}
            className={`w-32 h-20 object-cover rounded-2xl border-2 ${i === index ? 'border-amber-400' : 'border-transparent'} cursor-pointer transition-all duration-200`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
