'use client';

import React, { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
// Removed MonasterySlideshow and ExploreCarouselMount per page requirements
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function TashidingMonastery() {
  const [activeIndex, setActiveIndex] = useState(1);
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
    { src: '/tashiding/tash-3.png', alt: 'Tashiding 1' },
    { src: '/tashiding/tash-8.png', alt: 'Tashiding 2' },
    { src: '/tashiding/tash-6.png', alt: 'Tashiding 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
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
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-8 pb-4" style={{ backgroundImage: 'url(/bg1.png)', backgroundSize: 'cover', backgroundPosition: 'center 30%', backgroundClip: 'border-box', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Top Carousel - Three Images */}
        <div className="flex justify-center gap-4 mt-6 mb-4 px-4 relative">
          <Reveal delay={0.1}>
            <div className="w-96 h-72 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out cursor-pointer" onClick={() => goToSlide(0)} style={{ opacity: activeIndex === 0 ? 1 : 0.6, transform: activeIndex === 0 ? 'scale(1)' : 'scale(0.9)' }}>
              <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-[700px] h-72 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out cursor-pointer" onClick={() => goToSlide(1)} style={{ opacity: activeIndex === 1 ? 1 : 0.6, transform: activeIndex === 1 ? 'scale(1)' : 'scale(0.9)' }}>
              <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="w-96 h-72 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out cursor-pointer" onClick={() => goToSlide(2)} style={{ opacity: activeIndex === 2 ? 1 : 0.6, transform: activeIndex === 2 ? 'scale(1)' : 'scale(0.9)' }}>
              <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mb-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${activeIndex === index ? 'bg-amber-100 w-6' : 'bg-amber-100/40 w-2'}`}
            />
          ))}
        </div>

        {/* Main Content - Left Title, Right Info */}
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          {/* Left - Monastery Name */}
          <Reveal delay={0.4}>
            <div className="flex-1">
              <h1 className="text-6xl md:text-7xl font-bold text-amber-100 drop-shadow-lg leading-tight font-cinzel-decorative" style={{ fontWeight: '900', letterSpacing: '3px' }}>
                TASHIDING
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold text-amber-100 drop-shadow-lg font-cinzel-decorative" style={{ fontWeight: '900', letterSpacing: '3px' }}>
                MONASTERY
              </h2>
            </div>
          </Reveal>

          {/* Right - Info */}
          <Reveal delay={0.5}>
            <div className="flex-1 flex flex-col gap-6 text-amber-100 pl-10 mt-6">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <div>
                  <div className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'serif' }}>Tashiding, West Sikkim</div>
                  <div className="text-lg" style={{ fontFamily: 'serif' }}>Geyzing (737112), Sikkim, India</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'serif' }}>Built in</div>
                  <div className="text-lg" style={{ fontFamily: 'serif' }}>1717 CE</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Buttons at Bottom */}
        <div className="flex justify-center gap-4 mt-10 z-20 flex-wrap px-8">
          {['Overview', 'Digital Archive', 'Audio Tour', 'Virtual Tour', 'Cultural Calendar'].map((btn, i) => (
            <button
              key={i}
              className="px-8 py-3 bg-amber-200 text-amber-900 rounded-full font-semibold font-poppins hover:bg-amber-100 transition"
            >
              {btn}
            </button>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative w-full py-20" style={{ backgroundColor: '#410704' }}>

        <div className="flex">
          {/* Sidebar */}
          <aside className="absolute left-0 top-10 z-40 rounded-r-3xl shadow-2xl p-4 w-64 max-h-[60vh] overflow-y-auto" style={{ backgroundColor: '#E0C76C' }}>
            <div className="text-amber-900 mb-4">
              <h3 className="text-base font-bold mb-3 flex items-center justify-between">
                Tashiding Monastery
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
                    Tashiding Monastery: Where the Himalayas Embrace Pure Devotion
                  </h2>
                </Reveal>

                {[
                  'Perched on a serene ridge overlooking the confluence of the Rathong and Rangeet rivers, Tashiding Monastery is one of the most sacred and spiritually revered sites in Sikkim. Established in the 17th century by Ngadak Sempa Chempo, a follower of Guru Padmasambhava, it stands as a beacon of divine blessing in the Himalayan landscape. As morning light touches the distant snow peaks, the monastery reveals its peaceful radiance, carrying a sense of purity cherished for centuries.',
                  'Its architecture is simple but deeply symbolic. The whitewashed structures, tapering chortens, and traditional Tibetan motifs speak of ancient craftsmanship. The famed Thong-Wa-Rang-Dol chorten, believed to cleanse all sins with a single glance, embodies the spiritual heart of Tashiding. Inside the monastery, sacred texts, delicate murals, and statues of revered deities preserve the lineage of early Sikkimese Buddhism.',
                  'The environment surrounding Tashiding elevates its sanctity. Wrapped in silence and framed by dense forest, the monastery feels like a living sanctuary of peace. Instead of the rhythm of ritual instruments, it is the gentle sound of mountain breeze, rustling leaves, and distant river flow that shapes the atmosphere. This natural quietness invites deep reflection and a sense of inner stillness.',
                  'The path leading up to Tashiding enhances its sacred charm. Colorful prayer flags sway along the trail, and the fragrance of pine drifts through the cool air. As the ascent unfolds, each step feels like a journey toward spiritual clarity. By the time the monastery appears, visitors are already immersed in a profound calmness.',
                  'Tashiding Monastery stands not only as a historic seat of faith but also as a timeless symbol of purity, devotion, and spiritual renewal. Blending natural beauty with deep religious significance, it continues to inspire all who seek peace and connection amid the Himalayan heights.',
                ].map((text, i) => (
                  <Reveal key={i} delay={0.2 * (i + 1)}>
                    <p className="text-lg text-amber-50 leading-relaxed mb-6">
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

                  <p className="text-xs text-amber-300 mb-3">27.535069, 88.212178</p>

                  <div className="overflow-hidden rounded-2xl mb-4">
                    <iframe
                      title="Tashiding map"
                      src="https://www.google.com/maps?q=Tashiding+Monastery&output=embed"
                      className="w-full h-56"
                    />
                  </div>

                  <div className="flex gap-2">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Tashiding+Monastery"
                      className="flex-1 px-4 py-2 rounded-full bg-amber-400 text-amber-950 font-semibold flex items-center justify-center"

                    >
                      Get Directions
                    </a>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Tashiding+Monastery"
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
                        During major Buddhist festivals like Losar (February/March) and Saga Dawa (May/June) for vibrant cultural experiences. March to May and September to November offer pleasant weather (15-25°C) ideal for exploring. Early morning visits are recommended for a peaceful experience and to witness monks' rituals.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Monastery slideshow and Explore section removed */}

      <Footer />
    </main>
  );
}
