'use client';

import React, { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function RumtekMonastery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <main className="overflow-hidden">
      <Nav />

      {/* HERO SECTION */}
      <section
        className="relative w-full overflow-hidden pt-8 pb-4"
        style={{
          backgroundImage: 'url(/bg1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Top Carousel */}
        <div className="flex justify-center gap-4 mt-6 mb-4 px-4">
          {[0, 1, 2].map((i) => (
            <Reveal delay={0.1 * (i + 1)} key={i}>
              <div
                className={`${
                  i === 1 ? 'w-[700px]' : 'w-96'
                } h-72 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer`}
                onClick={() => goToSlide(i)}
                style={{
                  opacity: activeIndex === i ? 1 : 0.6,
                  transform: activeIndex === i ? 'scale(1)' : 'scale(0.9)',
                }}
              >
                <img
                  src={images[i].src}
                  alt={images[i].alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mb-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? 'bg-amber-100 w-6'
                  : 'bg-amber-100/40 w-2'
              }`}
            />
          ))}
        </div>

        {/* Title + Info */}
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
          <Reveal delay={0.4}>
            <div className="flex-1">
              
                <h1 className="text-6xl md:text-7xl font-bold text-amber-100 drop-shadow-lg leading-tight font-cinzel-decorative" style={{ fontWeight: '900', letterSpacing: '3px' }}>
                  RUMTEK
                </h1>
                <h2 className="text-5xl font-bold text-amber-100 tracking-wide font-cinzel-decorative" style={{ fontWeight: '900', letterSpacing: '3px' }}>
                  MONASTERY
                </h2>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex-1 flex flex-col gap-6 text-amber-100 pl-12">
              <div className="flex items-start gap-4">
                <svg
                  className="w-8 h-8 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <div>
                  <div className="text-xl font-semibold">Rumtek, East Sikkim</div>
                  <div className="text-lg">Gangtok (737135), India</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg
                  className="w-8 h-8 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-xl font-semibold">Built in</div>
                  <div className="text-lg">1966 CE</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero Buttons */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap px-8">
          {['Overview', 'Digital Archive', 'Audio Tour', 'Virtual Tour', 'Cultural Calendar'].map((btn, i) => (
            <button
              key={i}
              className="px-8 py-3 bg-amber-200 text-amber-900 rounded-full font-semibold hover:bg-amber-100 transition"
            >
              {btn}
            </button>
          ))}
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="relative w-full py-20" style={{ backgroundColor: '#410704' }}>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className="absolute left-0 top-10 z-40 rounded-r-3xl shadow-2xl p-4 w-64 max-h-[60vh] overflow-y-auto"
            style={{ backgroundColor: '#E0C76C' }}
          >
            <div className="text-amber-900 mb-4">
              <h3 className="text-base font-bold mb-3 flex items-center justify-between">
                Rumtek Monastery
                <span className="text-xs">›</span>
              </h3>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarItem(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-semibold ${
                    activeSidebarItem === item.id
                      ? 'bg-white/40 text-amber-900'
                      : 'hover:bg-white/20 text-amber-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="w-full max-w-7xl xl:max-w-[95rem] mx-auto px-6 lg:px-14 lg:pl-80">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)] gap-10 xl:gap-12 items-start">
              {/* LEFT: TEXT */}
              <div>
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-10 leading-tight">
                    Rumtek Monastery: Where the Himalayas Meet Living Tradition
                  </h2>
                </Reveal>

                {[
                  'Perched on a ridge overlooking Gangtok, Rumtek Monastery—also known as the Dharma Chakra Centre—feels alive with the spirit of the Himalayas. As the mountain wind whipped vibrant prayer flags into motion, the monastery revealed itself as a powerful symbol of Tibetan Buddhism and cultural resilience.',
                  'A replica of Tibet’s original Tsurphu Monastery, Rumtek stands as a living link to the Karmapa lineage. Its vivid reds, golds, and blues contrast beautifully with the muted Himalayan landscape, while intricate murals of deities, mandalas, and mythic scenes breathe life into its walls. Inside, the golden stupa—adorned with precious stones and surrounded by relics of past Karmapas—radiates a profound sense of sacredness.',
                  'The rhythmic chanting of monks, the steady beat of drums, and the glow of butter lamps create an atmosphere that is both serene and powerful. Watching the monks at their rituals offers a glimpse into a world shaped by devotion, discipline, and centuries-old tradition.',
                  'Beyond the temple halls, Rumtek’s tranquil gardens and sweeping views of Sikkim’s rolling hills offer moments of peaceful reflection. Here, nature and spirituality blend seamlessly, making Rumtek not just a monastery but a sanctuary of heritage, faith, and quiet strength.',
                  'The monastery stands not just as a testament to Tibetan architecture and artistry, but as a living embodiment of faith, a beacon of hope amidst the towering peaks of the Himalayas.',
                ].map((text, i) => (
                  <Reveal delay={0.2 + i * 0.15} key={i}>
                    <p className="text-base text-amber-50 leading-relaxed mb-6">
                      {text}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* RIGHT: INFO BOXES */}
              <aside className="space-y-8">
                {/* Location card */}
                <div className="ml-auto w-[340px] max-w-full rounded-3xl bg-[#1a1209] border border-amber-500/40 p-5 shadow-xl">
                  <h3 className="text-lg font-semibold text-amber-100 mb-2 flex items-center gap-2">
                    
                    Location Map
                  </h3>

                  <p className="text-xs text-amber-300 mb-3">27.288710, 88.561470</p>

                  <div className="overflow-hidden rounded-2xl mb-4">
                    <iframe
                      title="Rumtek map"
                      src="https://www.google.com/maps?q=Rumtek+Dharma+Chakra+Centre&output=embed"
                      className="w-full h-56"
                    />
                  </div>

                  <div className="flex gap-2">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Rumtek+Dharma+Chakra+Centre"
                      className="flex-1 px-4 py-2 rounded-full bg-amber-400 text-amber-950 font-semibold flex items-center justify-center"

                    >
                      Get Directions
                    </a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Rumtek+Dharma+Chakra+Centre"
                      className="flex-1 px-3 py-2 rounded-full border border-amber-500 text-amber-100 text-center font-semibold text-xs"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>

                {/* Visit info card */}
                <div className="ml-auto w-[340px] max-w-full rounded-3xl bg-[#1a1209] border border-amber-500/40 p-5 shadow-xl">
                  <h3 className="text-lg font-semibold text-amber-100 mb-3">
                    Visit Information
                  </h3>

                  <div className="space-y-3 text-xs text-amber-50">
                    <div>
                      <p className="font-semibold text-amber-100">Visiting Hours</p>
                      <p>9:00 AM – 6:00 PM, daily.</p>
                    </div>

                    <div className="border-t border-amber-500/30 pt-2">
                      <p className="font-semibold text-amber-100">Entry Fee</p>
                      <p>Free for all visitors.</p>
                    </div>

                    <div className="border-t border-amber-500/30 pt-2">
                      <p className="font-semibold text-amber-100">Best Visit Times</p>
                      <p>
                        During major Buddhist festivals like Tse-Chu (late May/early June), Saga Dawa (May/June), Losar (February/March), or Lhabab Duchen (October/November) for vibrant cultural and religious experiences. Alternatively, March to May and September to November offer pleasant weather (15-25°C) ideal for exploring. Early morning visits are recommended for a peaceful experience and to witness morning prayers.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      

      {/* DIGITAL ARCHIVE SECTION */}
<section
  id="digital-archive"
  className="w-screen min-h-[80vh] py-0"
  style={{ backgroundColor: '#410704' }}
>

  {/* FULL WIDTH TOP BAR WITH CENTERED ICON + TEXT */}
  <div
    className="w-screen flex items-center justify-center py-4"
    style={{
      backgroundColor: '#5b0505',
      borderBottom: '1px solid #300000'
    }}
  >
    <div className="flex items-center gap-3 justify-center">
      {/* ICON */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-amber-100">
        <span className="text-amber-100 text-xl">⏱</span>
      </div>

      {/* TITLE */}
      <h3 className="text-amber-100 text-2xl font-semibold tracking-[0.25em] uppercase">
        DIGITAL ARCHIVE
      </h3>
    </div>
  </div>

  {/* FULL WIDTH CONTENT AREA */}
  <div
    className="w-screen min-h-[70vh]"
    style={{
      backgroundColor: '#a66437'
    }}
  >
    {/* Your archive content goes here */}
  </div>

</section>




      <Footer />
    </main>
  );
}
