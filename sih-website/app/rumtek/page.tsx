'use client';

import React, { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function RumtekMonastery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'digital-archive', label: 'Digital Archive' },
    { id: 'audio-tour', label: 'Audio Tour' },
    { id: 'virtual-tour', label: 'Virtual Tour' },
    { id: 'cultural-calendar', label: 'Cultural Calendar' },
  ];

  const images = [
    { src: '/rumtek/rumtek 1.avif', alt: 'Rumtek 1' },
    { src: '/rumtek/rumtek 2.jpg', alt: 'Rumtek 2' },
    { src: '/rumtek/rumtek 3.jpg', alt: 'Rumtek 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (i: number) => setActiveIndex(i);

  return (
    <main className="overflow-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section
        className="relative w-full pt-10 pb-6"
        style={{
          backgroundImage: 'url(/bg1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          minHeight: '80vh',
        }}
      >
        {/* Carousel */}
        <div className="flex justify-center gap-3 mt-4 mb-4 px-4">
          {[0, 1, 2].map((i) => (
            <Reveal delay={0.1 * (i + 1)} key={i}>
              <div
                className={`${
                  i === 1 ? 'w-[500px]' : 'w-72'
                } h-56 rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all`}
                onClick={() => goToSlide(i)}
                style={{
                  opacity: activeIndex === i ? 1 : 0.6,
                  transform: activeIndex === i ? 'scale(1)' : 'scale(0.9)',
                }}
              >
                <img src={images[i].src} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-1 mb-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full ${
                activeIndex === i ? 'bg-amber-100 w-5' : 'bg-amber-100/40 w-2'
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <div className="max-w-5xl mx-auto px-6 text-center mt-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-100 leading-tight">
            Rumtek Monastery:<br />Where the Himalayas Meet Living Tradition
          </h1>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="relative w-full bg-gradient-to-b from-red-900 via-red-800 to-amber-900 py-16">
        <div className="flex">

          {/* Sidebar */}
          <aside
            className="absolute left-0 top-12 z-40 rounded-r-3xl shadow-xl p-4 w-60 max-h-[60vh] text-sm"
            style={{ backgroundColor: '#E0C76C' }}
          >
            <h3 className="font-semibold text-amber-900 mb-3">Rumtek Monastery</h3>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarItem(item.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg font-medium ${
                    activeSidebarItem === item.id
                      ? 'bg-white/50 text-amber-900'
                      : 'hover:bg-white/30 text-amber-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-10 lg:pl-72">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">

              {/* LEFT SIDE TEXT */}
              <div>
                <Reveal>
                  <h2 className="text-3xl md:text-4xl font-bold text-amber-100 mb-6">
                    Rumtek Monastery: Where the Himalayas Meet Living Tradition
                  </h2>
                </Reveal>

                {[
                  "Perched on a ridge overlooking Gangtok, Rumtek Monastery—also known as the Dharma Chakra Centre—feels alive with the spirit of the Himalayas.",
                  "A replica of Tibet’s original Tsurphu Monastery, Rumtek stands as a living link to the Karmapa lineage.",
                  "The rhythmic chanting of monks, the beating of drums, and butter lamps create an atmosphere both serene and powerful.",
                  "Rumtek’s tranquil gardens and sweeping views offer moments of peaceful reflection.",
                  "The monastery stands as a testament to Tibetan culture, architecture, and unwavering spiritual devotion."
                ].map((text, i) => (
                  <Reveal delay={0.2 + i * 0.15} key={i}>
                    <p className="text-base text-amber-50 leading-relaxed mb-5">
                      {text}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* RIGHT PANEL */}
              <aside className="space-y-6">

                {/* MAP CARD */}
                <div className="rounded-2xl bg-[#1a1209] border border-amber-500/40 p-4 shadow-lg text-sm">
                  <h3 className="text-base font-semibold text-amber-100 mb-2">📍 Location Map</h3>
                  <p className="text-xs text-amber-300 mb-2">27.288710, 88.561470</p>

                  <div className="rounded-xl overflow-hidden mb-3">
                    <iframe
                      src="https://www.google.com/maps?q=Rumtek+Dharma+Chakra+Centre&output=embed"
                      className="w-full h-48"
                    />
                  </div>

                  <div className="flex gap-2">
                    <a className="flex-1 px-3 py-2 rounded-full bg-amber-400 text-amber-950 font-semibold text-xs text-center">
                      Get Directions
                    </a>
                    <a className="flex-1 px-3 py-2 rounded-full border border-amber-500 text-amber-100 font-semibold text-xs text-center">
                      View on Google Maps
                    </a>
                  </div>
                </div>

                {/* VISIT INFO */}
                <div className="rounded-2xl bg-[#1a1209] border border-amber-500/40 p-4 shadow-lg text-sm">
                  <h3 className="text-base font-semibold text-amber-100 mb-3">Visit Information</h3>

                  <div className="space-y-3 text-xs text-amber-50">
                    <div>
                      <p className="font-semibold text-amber-100">Visiting Hours</p>
                      <p>9:00 AM – 6:00 PM</p>
                    </div>

                    <div className="border-t border-amber-500/30 pt-2">
                      <p className="font-semibold text-amber-100">Entry Fee</p>
                      <p>Free for all visitors</p>
                    </div>

                    <div className="border-t border-amber-500/30 pt-2">
                      <p className="font-semibold text-amber-100">Best Visit Times</p>
                      <p>Festivals: Tse-Chu, Saga Dawa, Losar</p>
                      <p>Weather: Mar–May & Sep–Nov</p>
                    </div>
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
