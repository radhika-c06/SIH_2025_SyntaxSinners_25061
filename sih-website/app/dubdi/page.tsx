'use client';

import React, { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
// Removed MonasterySlideshow and ExploreCarouselMount per page requirements
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function DubdiMonastery() {
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
    { src: '/dubdi/dubdim1.jpg', alt: 'Dubdi 1' },
    { src: '/dubdi/dubdim3.jpg', alt: 'Dubdi 2' },
    { src: '/dubdi/dubdim2.jpg', alt: 'Dubdi 3' },
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
                DUBDI
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
                  <div className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'serif' }}>Dubdi, West Sikkim</div>
                  <div className="text-lg" style={{ fontFamily: 'serif' }}>Yuksom, West Sikkim</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <div className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'serif' }}>Built in</div>
                  <div className="text-lg" style={{ fontFamily: 'serif' }}>1701</div>
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
              className="px-8 py-3 bg-amber-200 text-amber-900 rounded-full font-semibold hover:bg-amber-100 transition"
              style={{ fontFamily: 'serif' }}
            >
              {btn}
            </button>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-red-900 via-red-800 to-amber-900 py-16">
        <div className="flex">
          {/* Sidebar */}
          <aside className="absolute left-0 top-8 z-40 rounded-r-3xl shadow-2xl p-4 w-64 h-auto max-h-[60vh] overflow-y-auto" style={{ backgroundColor: '#E0C76C' }}>
            <div className="text-amber-900 mb-4">
              <h3 className="text-base font-bold mb-3 flex items-center justify-between">
                Dubdi Monastery Yuksom
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

          {/* Content */}
          <div className="max-w-6xl mx-auto px-8 pl-80">
              <Reveal delay={0.2}>
                <h2 className="text-5xl font-bold text-amber-100 mb-8">Overview</h2>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-lg text-amber-50 leading-relaxed mb-6">
                  Perched on a forested hill above Yuksom, Dubdi Monastery—often called the Hermit’s Cell—stands quietly as the oldest monastery in Sikkim. Built in 1701 by the Three Founding Lamas, it marks the birthplace of Sikkim’s Buddhist heritage. As the early morning mist drifts through the dense woodland, the monastery reveals its humble yet powerful presence, radiating the calm spirit of the Himalayas.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="text-lg text-amber-50 leading-relaxed mb-6">
                  Simple yet meaningful in its architecture, Dubdi’s whitewashed walls, tapering tower-like form, and muted greens echo ancient Tibetan design. Inside, old manuscripts, statues of the Three Lamas, and sacred relics preserve stories of the kingdom’s early spiritual roots. The richly painted interiors—though modest—carry symbols of deities, protective guardians, and timeless Buddhist teachings.
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <p className="text-lg text-amber-50 leading-relaxed mb-6">
                  The quiet surroundings of Dubdi heighten its spiritual aura. Unlike larger monasteries filled with ritual sounds, here the atmosphere is shaped by silence—the rustle of leaves, distant bird calls, and the gentle hum of mountain wind. This tranquility creates a space that is both grounding and deeply reflective, offering visitors a glimpse into monastic life as it might have existed centuries ago.
                </p>
              </Reveal>
              <Reveal delay={0.7}>
                <p className="text-lg text-amber-50 leading-relaxed mb-6">
                  The short forest trek leading to Dubdi adds to its charm. As sunlight filters through the trees and prayer flags flutter softly, the walk becomes a serene prelude to the monastery itself. Nature and spirituality blend seamlessly here, making Dubdi not just a historic site but a retreat for peace, introspection, and quiet strength.
                </p>
              </Reveal>
              <Reveal delay={0.8}>
                <p className="text-lg text-amber-50 leading-relaxed">
                  Dubdi Monastery endures as more than the first monastery of Sikkim—it stands as a testament to the beginnings of faith in the region, a symbol of resilience, devotion, and the gentle harmony of the Himalayan landscape.
                </p>
              </Reveal>
        </div>
        </div>
      </section>

      {/* Monastery slideshow and Explore section removed */}

      <Footer />
    </main>
  );
}
