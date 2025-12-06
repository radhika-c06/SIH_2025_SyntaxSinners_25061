'use client';

import React, { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function TsukMonastery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState('overview');
  const [openDialog, setOpenDialog] = useState(false);
  const [activeItem, setActiveItem] = useState<any | null>(null);

  const sidebarItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'digital-archive', label: 'Digital Archive' },
    { id: 'audio-tour', label: 'Audio Tour' },
    { id: 'virtual-tour', label: 'Virtual Tour' },
    { id: 'cultural-calendar', label: 'Cultural Calendar' },
  ];

  const images = [
    { src: '/tsuk/tsuk.avif', alt: 'Tsuk 1' },
    { src: '/tsuk/tsuk2.avif', alt: 'Tsuk 2' },
    { src: '/tsuk/tsuk3.avif', alt: 'Tsuk 3' },
  ];

  const tsukArchiveItems = [
    {
      id: 't1',
      title: 'Royal Chapel Murals',
      monastery: 'Tsuk',
      type: 'mural',
      year: '19th c.',
      img: '/tsuk/tsuk4.jpg',
      tags: ['Color-corrected', 'AI-enhanced'],
      ocrText: 'Placeholder OCR text for Royal Chapel Murals.',
      location: 'Tsuk',
      description:
        'Vibrant murals within the former royal chapel, depicting scenes from the life of Buddha and various deities, showcasing the rich artistic heritage of Sikkim.',
    },
    {
      id: 't2',
      title: 'Ancient Buddhist Scriptures',
      monastery: 'Tsuk',
      type: 'manuscript',
      year: '19th c.',
      img: '/tsuk/tsuk5.avif',
      tags: ['AI-OCR processed', 'High-res'],
      ocrText: 'Placeholder OCR text for ancient scriptures.',
      location: 'Tsuk',
      description: 'A collection of centuries-old Buddhist scriptures and manuscripts, preserved at the monastery, representing a significant repository of spiritual knowledge.',
    },
  ];

  const tsukTimeline = [
      {
      title: 'Establishment of Tsuk La Khang',
      year: '1894 CE',
      description:
        'Tsuk La Khang was constructed during the reign of Chogyal Sidkeong Tulku Namgyal, serving as the royal chapel for the Chogyal dynasty of Sikkim.',
    },
    {
      title: 'Center of Royal Rituals',
      year: 'Late 19th - Mid 20th c.',
      description:
        'The monastery was the primary location for royal ceremonies, rituals, and festivals, playing a central role in the spiritual and political life of the kingdom.',
    },
    {
      title: 'Integration with India',
      year: '1975 CE',
      description:
        'Following Sikkim\'s merger with India, the monastery transitioned from a royal chapel to a public place of worship, while retaining its cultural significance.',
    },
      {
      title: 'Preservation Efforts',
      year: 'c. 2000 CE',
      description:
        'Conservation initiatives were undertaken to preserve the monastery\'s unique murals, artifacts, and architectural integrity for future generations.',
    },
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

  // ArchiveCard component – transparent glass box with smooth hover
  const ArchiveCard = ({ item, onOpen }: { item: any; onOpen: (it: any) => void }) => {
    return (
      <div className="group relative cursor-pointer" onClick={() => onOpen(item)}>
        <div
          className="
            overflow-hidden shadow-lg rounded-2xl border-0
            transition-all duration-300 ease-out
            group-hover:shadow-2xl group-hover:scale-[1.08] group-hover:-translate-y-1
          "
          style={{
            borderRadius: '1rem',
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            maxWidth: '360px',
          }}
        >
          <div
            className="aspect-[4/3] w-full overflow-hidden transition-transform duration-300 ease-out group-hover:scale-110"
            style={{ background: '#2F3A3D' }}
          >
            <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
          </div>

          <div className="p-4">
            <h3 className="text-sm font-semibold text-amber-100 line-clamp-2">{item.title}</h3>
            <div className="mt-1 text-xs text-amber-200">
              {item.monastery} • {item.location}
            </div>
            {item.description && (
              <div className="mt-2 text-xs text-amber-100 leading-relaxed whitespace-pre-line">
                {item.description}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  type TimelineEvent = (typeof tsukTimeline)[number];

  const TimelineCard = ({ event }: { event: TimelineEvent }) => (
    <div className="rounded-3xl bg-[#4B130E] border border-amber-600/40 px-5 py-4 shadow">
      <h3 className="text-sm md:text-base font-semibold text-amber-50 mb-2">{event.title}</h3>
      <p className="text-xs md:text-sm text-amber-100/85 mb-3 leading-snug line-clamp-3">
        {event.description}
      </p>
      <div className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold text-amber-950 bg-amber-400 px-3 py-1 rounded-full">
        <span>{event.year}</span>
      </div>
    </div>
  );

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
                className={`${i === 1 ? 'w-[700px]' : 'w-96'}
                h-72 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer`}
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
              <h1 className="text-6xl font-bold text-amber-100 tracking-wide leading-tight font-cinzel-decorative">
                TSUK
              </h1>
              <h2 className="text-5xl font-bold text-amber-100 tracking-wide font-cinzel-decorative">
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
                  <div className="text-xl font-semibold">Tsuk, East Sikkim</div>
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
                  <div className="text-lg">1894 CE</div>
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
                Tsuk Monastery
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
              {/* LEFT TEXT */}
              <div>
                <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-amber-500/10 p-8">
                  <Reveal>
                    <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-10 leading-tight">
                      Tsuk La Khang Monastery
                    </h2>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <p className="text-base text-amber-50 leading-relaxed mb-6">
                      Tsuk La Khang Monastery, located in the heart of Gangtok, is the former royal chapel of the Chogyal dynasty and one of Sikkim’s most significant centres of Buddhist learning. Set against the Himalayan skyline, its simple white façade opens into a richly adorned prayer hall filled with vibrant murals, intricate thangka paintings, and centuries-old Buddhist scriptures. The monastery remains an active spiritual space where monks chant, meditate, and perform traditional rituals, offering visitors an authentic glimpse into living Buddhist practice rather than a staged cultural display.
                    </p>
                  </Reveal>

                  <Reveal delay={0.35}>
                    <p className="text-base text-amber-50 leading-relaxed">
                      The monastery’s serene courtyard overlooks the city of Gangtok, creating a striking contrast between its calm spiritual atmosphere and the bustling life below. During festivals, the space comes alive with ceremonial chants, musical instruments, and masked dances that reflect Sikkim’s deep-rooted cultural identity.
                    </p>
                  </Reveal>
                  <Reveal delay={0.5}>
                    <p className="text-base text-amber-50 leading-relaxed mt-6">
                      Built in the late 19th century during the reign of Chogyal Sidkeong Tulku Namgyal, Tsuk La Khang emerged at a time when Sikkim was navigating British influence and redefining its cultural identity. Sidkeong Tulku envisioned it as a centre for strengthening the Nyingma school of Tibetan Buddhism and preserving traditional scholarship. Its placement within the royal palace complex underscores its importance as both a religious and royal institution.
                    </p>
                  </Reveal>

                  <Reveal delay={0.65}>
                    <p className="text-base text-amber-50 leading-relaxed">
                      Through the colonial era, Sikkim’s modernization phase, and its eventual integration with India, Tsuk La Khang has remained a cornerstone of spiritual life. Today, it stands as a living archive of Sikkim’s heritage—an enduring symbol of faith, royal patronage, and the timeless Buddhist traditions that continue to shape the region.
                    </p>
                  </Reveal>
                </div>
              </div>

              {/* RIGHT SIDE INFO */}
              <aside className="space-y-8">

                {/* UPDATED LOCATION CARD */}
                <div className="ml-auto w-[340px] max-w-full rounded-3xl bg-[#1a1209] border border-amber-500/40 p-5 shadow-xl">
                  <h3 className="text-lg font-semibold text-amber-100 mb-2 flex items-center gap-2">
                    Location Map
                  </h3>

                  <p className="text-xs text-amber-300 mb-3">
                    27.328550, 88.614650
                  </p>

                  <div className="overflow-hidden rounded-2xl mb-4">
                    <iframe
                      title="Tsuk map"
                      className="w-full h-56"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.7067076783474!2d88.6146503!3d27.3285504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a51639b83b4f%3A0x6e86ba8d097ec58f!2sTsuglagkhang%20Monastery%2C%20Gangtok!5e0!3m2!1sen!2sin!4v1733400000000!5m2!1sen!2sin"
                    />
                  </div>

                  <div className="flex gap-2">
                    <a
                      href="https://maps.app.goo.gl/5ZRM2Z7SbpedhkMe7"
                      className="flex-1 px-4 py-2 rounded-full bg-amber-400 text-amber-950 font-semibold flex items-center justify-center"
                    >
                      Get Directions
                    </a>

                    <a
                      href="https://maps.app.goo.gl/5ZRM2Z7SbpedhkMe7"
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
                      <p>Monastery: 7:00 AM - 5:00 PM, Daily.</p>
                    </div>

                    <div className="border-t border-amber-500/30 pt-2">
                      <p className="font-semibold text-amber-100">Entry Fee</p>
                      <p>₹ Free for all visitors.</p>
                    </div>

                    <div className="border-t border-amber-500/30 pt-2">
                      <p className="font-semibold text-amber-100">Best Visit Times</p>
                      <p>
                        During Pang Lhabsol (August/September), Losar (February/March), and Saga Dawa (May/June) for vibrant Buddhist celebrations, masked dances, and special prayers. October to November and March to May: Pleasant weather (10-20°C) with clear skies, ideal for exploring. Early morning (7-9 AM) is recommended for a peaceful experience and to witness morning prayers.
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
        {/* FULL WIDTH TOP BAR WITH VIDEO BACKGROUND */}
        <div className="relative w-screen h-56 md:h-72 lg:h-80 overflow-hidden flex items-center">
          {/* Background video */}
          <video
            src="/archive.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay for contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.1) 100%)',
            }}
          />

          {/* DIGITAL ARCHIVE text + icon */}
          <div className="relative z-10 w-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-amber-100">
                <span className="text-amber-100 text-2xl">⏱</span>
              </div>

              <h3 className="text-amber-100 text-4xl md:text-5xl font-bold uppercase" style={{ fontFamily: 'Cinzel Decorative', letterSpacing: '0.08em' }}>
                DIGITAL ARCHIVE
              </h3>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
<div
  className="relative w-screen min-h-[70vh] py-12 px-6 md:px-12"
  style={{
    backgroundColor: '#4b1f0f',
  }}
>
  {/* LEFT-HALF WATERMARK */}
  <div
    className="pointer-events-none absolute inset-y-0 left-0 w-1/2 opacity-45"
    style={{
      backgroundImage: "url('/design.png')",
      backgroundRepeat: 'repeat',
      backgroundSize: '500px auto',
    }}
  />
  <div
    className="absolute inset-y-0 right-0 w-[50%]"
    style={{
      backgroundColor: "#87522d", // <-- CHANGE THIS TO ANY COLOR YOU WANT
      opacity: 1,
    }}
  />


  {/* REAL CONTENT (ABOVE THE WATERMARK) */}
  <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE — Archive Cards */}
            <div className="flex flex-col gap-6">
              {tsukArchiveItems.map((it) => (
                <ArchiveCard
                  key={it.id}
                  item={it}
                  onOpen={(i) => {
                    setActiveItem(i);
                    setOpenDialog(true);
                  }}
                />
              ))}
            </div>

            {/* RIGHT SIDE — Info Section */}
            <div className="flex flex-col gap-8">
              <div className="w-full">
                <h2 className="text-amber-100 text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel' }}>
                  <span className="text-amber-400 text-2xl">⏱</span>
                  RESEARCH & DOCUMENTATION
                </h2>

                <div className="flex flex-wrap gap-4 justify-between">
                  {/* 1 */}
                  <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
                    <p className="text-sm font-semibold text-amber-100 leading-tight">
                      Archaeological Survey Date
                    </p>
                    <p className="text-sm text-amber-50 mt-1 leading-snug">19th century establishment</p>
                  </div>

                  {/* 2 */}
                  <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
                    <p className="text-sm font-semibold text-amber-100 leading-tight">
                      Archaeological Survey By
                    </p>
                    <p className="text-sm text-amber-50 mt-1 leading-snug">
                      Sikkim State Archaeology Department, Inheritage Foundation
                    </p>
                  </div>

                  {/* 3 */}
                  <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
                    <p className="text-sm font-semibold text-amber-100 leading-tight">
                      Preservation Status
                    </p>
                    <p className="text-sm text-amber-50 mt-1 leading-snug">
                      Excellent, well-maintained with ongoing conservation efforts
                    </p>
                  </div>

                  {/* 4 */}
                  <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
                    <p className="text-sm font-semibold text-amber-100 leading-tight">
                      Heritage Status
                    </p>
                    <p className="text-sm text-amber-50 mt-1 leading-snug">
                      Royal Chapel of the former Kingdom of Sikkim
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-5 mt-6">
                <h2 className="text-amber-100 text-xl font-bold uppercase mb-2 flex items-center gap-2" style={{ fontFamily: 'Cinzel' }}>
                  <span className="text-amber-400 text-2xl">📜</span>
                  CHRONOLOGY OF TSUK
                </h2>

                {tsukTimeline.map((ev) => (
                  <TimelineCard key={ev.title} event={ev} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURAL CALENDAR SECTION */}
<section
  id="cultural-calendar"
  className="relative w-full"
  style={{ backgroundColor: '#410704' }}
>
  {/* TOP BAR WITH VIDEO */}
  <div className="relative w-screen h-56 md:h-72 lg:h-80 overflow-hidden flex items-center">
    <video
      src="/cultural calendar vid.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Gradient overlay (same as Digital Archive) */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.1) 100%)',
      }}
    />

    {/* Center Title */}
    <div className="relative z-10 w-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <h3
          className="text-amber-100 text-3xl md:text-4xl font-semibold tracking-[0.25em] uppercase font-cinzel-decorative"
        >
          CULTURAL CALENDAR
        </h3>
      </div>
    </div>
  </div>

  {/* ORIGINAL CONTENT BELOW VIDEO */}
  <div className="max-w-7xl mx-auto px-6 lg:px-14 py-20">
          {/* Horizontal Timeline Container */}
          <div className="relative" style={{ paddingTop: '150px', paddingBottom: '0px' }}>
            {/* Main horizontal dashed line (centered between top/bottom boxes) */}
              <div className="absolute left-0 right-0 h-1 transform -translate-y-1/2"
                style={{
                  top: 'calc(50% - 89px)',
                  backgroundImage: 'repeating-linear-gradient(to right, #d97706 0px, #d97706 15px, transparent 15px, transparent 35px)',
                  zIndex: 0,
                }}
              />

            {/* Timeline events - horizontal layout with centered dots/connectors */}
            <div className="grid grid-cols-5 gap-0 relative" style={{ minHeight: '360px' }}>
              {/* Column 1 - Saga Dawa (top) */}
              <div className="relative">
                <Reveal delay={0.1}>
                  {/* Top box */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-200 border-4 border-yellow-400 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% - 160px)', zIndex:2 }}>
                    <p className="text-xs font-semibold text-amber-900 mb-1">May–June</p>
                    <p className="text-xs text-amber-900 mb-2">Full-moon of the 4th Tibetan month</p>
                    <h3 className="text-lg font-bold text-amber-900">Saga Dawa</h3>
                  </div>
                  {/* Connector from box down to center line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: 'calc(50% - 64px)', width: '4px', height: '64px', backgroundColor: '#fcd34d' }} />
                  {/* Dot on center line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#fef08a', border: '4px solid #f59e0b', transformOrigin: 'center', zIndex: -1 }} />
                </Reveal>
              </div>

              {/* Column 2 - Drukpa Teshi (bottom) */}
              <div className="relative">
                <Reveal delay={0.2}>
                  {/* Dot on center line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#f59e0b', border: '4px solid #b45309', zIndex: -1 }} />
                  {/* Connector from center line down to box */}
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: '50%', width: '4px', height: '80px', backgroundColor: '#eab308', zIndex:-2 }} />
                  {/* Bottom box */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-400 border-4 border-yellow-600 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% + 72px)' }}>
                    <p className="text-xs font-semibold text-white mb-1">July–August</p>
                    <p className="text-xs text-white mb-2">4th day of the 6th Tibetan month</p>
                    <h3 className="text-lg font-bold text-white">Drukpa Teshi</h3>
                  </div>
                </Reveal>
              </div>

              {/* Column 3 - Pang Lhabsol (top) */}
              <div className="relative">
                <Reveal delay={0.3}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 border-4 border-orange-600 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% - 160px)', zIndex:2 }}>
                    <p className="text-xs font-semibold text-white mb-1">Late Aug–Early Sep</p>
                    <p className="text-xs text-white mb-2">15th day of the 7th Tibetan month</p>
                    <h3 className="text-lg font-bold text-white">Pang Lhabsol</h3>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: 'calc(50% - 64px)', width: '4px', height: '64px', backgroundColor: '#fb923c' }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#fb923c', border: '4px solid #ea580c', zIndex: -1 }} />
                </Reveal>
              </div>

              {/* Column 4 - Kagyed Dance (bottom) */}
              <div className="relative">
                <Reveal delay={0.4}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#d97706', border: '4px solid #92400e', zIndex: -1 }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: '50%', width: '4px', height: '80px', backgroundColor: '#d97706', zIndex:-2 }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-yellow-600 to-yellow-500 border-4 border-yellow-700 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% + 72px)' }}>
                    <p className="text-xs font-semibold text-white mb-1">Early December</p>
                    <p className="text-xs text-white mb-2">28th–29th day of 10th Tibetan month</p>
                    <h3 className="text-lg font-bold text-white">Kagyed Dance</h3>
                  </div>
                </Reveal>
              </div>

              {/* Column 5 - Losoong (top) */}
              <div className="relative">
                <Reveal delay={0.5}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-500 border-4 border-orange-700 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% - 160px)', zIndex:2 }}>
                    <p className="text-xs font-semibold text-white mb-1">December</p>
                    <p className="text-xs text-white mb-2">Last week of 10th Tibetan month</p>
                    <h3 className="text-lg font-bold text-white">Losoong</h3>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: 'calc(50% - 64px)', width: '4px', height: '64px', backgroundColor: '#ea580c' }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#fb6b13', border: '4px solid #c2410c', zIndex: -1 }} />
                </Reveal>
              </div>
            </div>
          </div>

          {/* Calendar Narrative Section */}
          <Reveal delay={0.6}>
            <div className="mt-2 space-y-8">
              {/* Festival narratives in grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Saga Dawa */}
                <Reveal delay={0.7}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">Saga Dawa</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      Brings a serene, devotional atmosphere. Inside Tsuk La Khang, monks chant scriptures commemorating the Buddha's birth, enlightenment, and parinirvana. Butter lamps glow throughout the day, and devotees circumambulate the monastery with incense and prayer wheels, creating a sense of shared merit.
                    </p>
                  </div>
                </Reveal>

                {/* Drukpa Teshi */}
                <Reveal delay={0.75}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">Drukpa Teshi</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      Introduces a more structured ritual tone. This festival marks the Buddha's first teaching of the Four Noble Truths. Tsuk La Khang conducts special dharma recitations and blessings, and the courtyard becomes a gathering ground for teachings meant to foster clarity and wisdom for the months ahead.
                    </p>
                  </div>
                </Reveal>

                {/* Pang Lhabsol */}
                <Reveal delay={0.8}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-orange-500/20 p-6 hover:border-orange-400/40 transition-colors">
                    <h3 className="text-xl font-bold text-orange-300 mb-3">Pang Lhabsol</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      The most distinctive festival of Sikkim. Tsuk La Khang becomes the center of state ritual life, honoring Mount Khangchendzonga as a guardian deity. Sacred Cham dances, masked monks, the boom of long horns, and rhythmic drumbeats turn the monastery into a dramatic spiritual theatre, symbolizing unity and protection of Sikkim's heritage.
                    </p>
                  </div>
                </Reveal>

                {/* Kagyed */}
                <Reveal delay={0.85}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-yellow-600/20 p-6 hover:border-yellow-500/40 transition-colors">
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">Kagyed</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      Shifts the mood toward purification. Nighttime masked dances take place in the Tsuk La Khang courtyard, representing protective deities driving away negativity. The interplay of shadows, ritual fire, butter lamps, and precise choreography creates one of the year's most striking ritual performances.
                    </p>
                  </div>
                </Reveal>

                {/* Losoong */}
                <Reveal delay={0.9}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-orange-600/20 p-6 hover:border-orange-500/40 transition-colors lg:col-span-2">
                    <h3 className="text-xl font-bold text-orange-300 mb-3">Losoong</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      The Sikkimese New Year. Tsuk La Khang becomes a site of renewal—monks offer year-end prayers, perform auspicious Cham dances, and bless visitors seeking prosperity and a clean beginning for the year ahead.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Closing narrative */}
              <Reveal delay={0.95}>
                <div className="rounded-3xl bg-gradient-to-r from-orange-900/20 to-amber-900/20 backdrop-blur-md border border-amber-500/20 p-8">
                  <p className="text-base text-amber-50 leading-relaxed font-light">
                    Through these festivals, Tsuk La Khang defines the cultural and spiritual calendar of Sikkim. Each celebration is not just an event but a communal experience that reinforces identity, continuity, and the living heritage of the region.
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Detail Modal – OCR + Image (matches Rumtek behavior) */}
      {openDialog && activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setOpenDialog(false)}
        >
          <div
            className="max-w-3xl w-full overflow-hidden rounded-3xl"
            style={{
              background: '#1a1209',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative" style={{ background: '#2F3A3D' }}>
                <img src={activeItem.img} alt={activeItem.title} className="h-full w-full object-cover" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-amber-100">{activeItem.title}</h2>

                {/* OCR / Details */}
                <div className="mt-5">
                  <h3 className="font-medium mb-2 text-amber-100">OCR Snippet</h3>
                  <div
                    className="rounded-xl p-4 text-sm text-amber-50"
                    style={{
                      background: 'rgba(248, 244, 234, 0.1)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    {activeItem.ocrText}
                  </div>
                </div>

                <button onClick={() => setOpenDialog(false)} className="mt-6 text-amber-200 hover:text-amber-100">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
