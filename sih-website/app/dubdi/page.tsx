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

  // Icon helpers (kept in case you use them later)
  const Icon = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <span className={className} aria-hidden>
      {children}
    </span>
  );
  const MapPin = (props: any) => <Icon {...props}>📍</Icon>;
  const Calendar = (props: any) => <Icon {...props}>📅</Icon>;
  const Eye = (props: any) => <Icon {...props}>👁️</Icon>;
  const Download = (props: any) => <Icon {...props}>⬇️</Icon>;

  // Sample archive items for Dubdi
  const dubdiArchiveItems = [
    {
      id: 'd1',
      title: 'Tibetan Buddhist Chorten',
      monastery: 'Dubdi',
      type: 'statue',
      year: '18th c.',
      img: '/dubdi/buddha statue.jpg',
      tags: ['Color-corrected', 'AI-enhanced'],
      ocrText: 'ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ...',
      location: 'Yuksom',
      description:
        'A serene Tibetan Buddhist chorten stands along the quiet forested trail leading up to Dubdi Monastery, its white silhouette glowing softly against the emerald hills. This sacred stupa marks the beginning of a spiritual ascent, guiding pilgrims and travelers toward one of Sikkim\'s most treasured heritage sites.',
    },
    {
      id: 'd2',
      title: 'Sacred Reliquaries and Offerings',
      monastery: 'Dubdi',
      type: 'artifact',
      year: '17th c.',
      img: '/dubdi/torma.webp',
      tags: ['AI-OCR processed', 'High-res'],
      ocrText: '༄༅། །རྒྱལ་བའི་མཆོད་རྟེན་...',
      location: 'Yuksom',
      description: 'Precious reliquaries and ceremonial offering vessels preserved within Dubdi Monastery, reflecting the sacred traditions of Tibetan Buddhism.',
    },
    {
      id: 'd3',
      title: 'Monastery Interior and Prayer Halls',
      monastery: 'Dubdi',
      type: 'architecture',
      year: '17th c.',
      img: '/dubdi/interior.jpg',
      tags: ['AI-enhanced', 'Metadata complete'],
      ocrText: 'ཀརྨ་པ་རིན་པོ་ཆེ་...',
      location: 'Yuksom',
      description:
        'The interior prayer hall of Dubdi Monastery showcases traditional Tibetan Buddhist architecture with intricate murals and spiritual iconography.',
    },
    {
      id: 'd4',
      title: 'Exterior Monastery Complex',
      monastery: 'Dubdi',
      type: 'architecture',
      year: '17th c.',
      img: '/dubdi/exterior.jpg',
      tags: ['AI-OCR processed', 'Gigapixel'],
      ocrText: 'འཁོར་བའི་འཁོར་ལོ...',
      location: 'Yuksom',
      description:
        'The whitewashed exterior and architectural structure of Dubdi Monastery, built by the Three Founding Lamas in 1701. The humble yet powerful form reflects the monastery\'s spiritual significance as Sikkim\'s oldest and first monastery.',
    },
  ];

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

  const ResearchRow = () => {
    return (
      <div className="w-full">
        <h2 className="text-amber-100 text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ fontFamily: 'Cinzel' }}>
          <span className="text-amber-400 text-2xl">⏱</span>
          RESEARCH &amp; DOCUMENTATION
        </h2>

        <div className="flex flex-wrap gap-4 justify-between">
          {/* 1 */}
          <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
            <p className="text-sm font-semibold text-amber-100 leading-tight">
              Archaeological Survey Date
            </p>
            <p className="text-sm text-amber-50 mt-1 leading-snug">17th-18th Century</p>
          </div>

          {/* 2 */}
          <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
            <p className="text-sm font-semibold text-amber-100 leading-tight">
              Archaeological Survey By
            </p>
            <p className="text-sm text-amber-50 mt-1 leading-snug">
              Archaeological Survey of India (ASI), Sikkim State Archaeology Department
            </p>
          </div>

          {/* 3 */}
          <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
            <p className="text-sm font-semibold text-amber-100 leading-tight">
              Preservation Status
            </p>
            <p className="text-sm text-amber-50 mt-1 leading-snug">
              Well-maintained with ongoing restoration efforts
            </p>
          </div>

          {/* 4 */}
          <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
            <p className="text-sm font-semibold text-amber-100 leading-tight">
              Heritage Status
            </p>
            <p className="text-sm text-amber-50 mt-1 leading-snug">
              Historic Religious Site
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ---------- TIMELINE BELOW RESEARCH ROW (RIGHT COLUMN) ----------
  const dubdiTimeline = [
    {
      title: 'Founding of Dubdi Monastery',
      year: '1701 CE',
      description:
        'Dubdi Monastery was built by the Three Founding Lamas (Lhatsun Chenpo, Thegtsog Menji, and Sempa Chenpo) as the first monastery in Sikkim, marking the spiritual beginning of the kingdom.',
    },
    {
      title: 'Establishment of Sikkim Kingdom',
      year: '1642 CE',
      description:
        'The foundation of Sikkim as a Buddhist kingdom, setting the spiritual and cultural context for the later establishment of Dubdi.',
    },
    {
      title: 'Sacred Relic Enshrinement',
      year: '18th Century CE',
      description:
        'Important relics and sacred texts were preserved and housed within Dubdi Monastery, making it a center of spiritual authority.',
    },
    {
      title: 'Monastic Community Development',
      year: '18th-19th Centuries CE',
      description:
        'Dubdi Monastery grew as a center of Buddhist learning and monastic practice, influencing religious life throughout Sikkim.',
    },
    {
      title: 'Regional Pilgrimage Site',
      year: '19th-20th Centuries CE',
      description:
        'Dubdi Monastery became recognized as an important pilgrimage destination for devotees across the Himalayan regions.',
    },
    {
      title: 'Preservation Initiatives',
      year: '20th Century CE',
      description:
        'Conservation efforts were undertaken to preserve the monastery\'s structure, murals, and artifacts against the effects of time and weather.',
    },
    {
      title: 'Cultural Heritage Recognition',
      year: '21st Century CE',
      description:
        'Dubdi Monastery received increased recognition as a significant site of Sikkimese and Tibetan Buddhist cultural heritage.',
    },
    {
      title: 'Active Monastic Center',
      year: '2024 CE',
      description:
        'Dubdi continues as an active monastic center and important pilgrimage site, welcoming visitors and maintaining spiritual traditions.',
    },
    {
      title: 'Digital Heritage Documentation',
      year: '2025 CE',
      description:
        'Dubdi Monastery\'s rich history and cultural significance are documented by the Inheritage Foundation for long-term digital stewardship and preservation.',
    },
  ];

  type TimelineEvent = (typeof dubdiTimeline)[number];

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

  const TimelineColumn = () => (
    <div className="w-full space-y-5 mt-6">
      <h2 className="text-amber-100 text-xl font-bold uppercase mb-2 flex items-center gap-2" style={{ fontFamily: 'Cinzel' }}>
        <span className="text-amber-400 text-2xl">📜</span>
        CHRONOLOGY OF DUBDI
      </h2>

      {dubdiTimeline.map((ev) => (
        <TimelineCard key={ev.title} event={ev} />
      ))}
    </div>
  );

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
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
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
            <div className="flex-1 flex flex-col gap-6 text-amber-100 pl-12">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <div>
                  <div className="text-xl font-bold tracking-wide uppercase" style={{ fontFamily: 'Cormorant SC' }}>Dubdi, West Sikkim</div>
                  <div className="text-lg uppercase" style={{ fontFamily: 'Cormorant SC' }}>Yuksom (737139), India</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="text-xl font-bold tracking-wide uppercase" style={{ fontFamily: 'Cormorant SC' }}>Built in</div>
                  <div className="text-lg uppercase" style={{ fontFamily: 'Cormorant SC' }}>1701 CE</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero Buttons */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap px-8">
          {['Overview', 'Digital Archive', 'Audio Tour', 'Virtual Tour', 'Cultural Calendar'].map(
            (btn, i) => (
              <button
                key={i}
                className="px-8 py-3 bg-amber-200 text-amber-900 rounded-full font-bold uppercase hover:bg-amber-100 transition"
                style={{ fontFamily: 'Cinzel' }}
              >
                {btn}
              </button>
            ),
          )}
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="relative w-full py-20" style={{ backgroundColor: '#410704' }}>
        <div className="w-full max-w-7xl xl:max-w-[95rem] mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,0.9fr)] gap-10 xl:gap-12 items-start">
            {/* LEFT: TEXT */}
            <div>
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-10 leading-tight uppercase" style={{ fontFamily: 'Cinzel' }}>
                  Dubdi Monastery: The Hermit's Cell of Sikkim
                </h2>
              </Reveal>

              {/* Transparent Aesthetic Box */}
              <div className="rounded-3xl p-8 md:p-10 backdrop-blur-sm bg-amber-100/5 border border-amber-200/20 shadow-2xl">
                    {[
                    'Perched on a forested hill above Yuksom, Dubdi Monastery—often called the Hermit’s Cell—stands quietly as the oldest monastery in Sikkim. Built in 1701 by the Three Founding Lamas, it marks the birthplace of Sikkim’s Buddhist heritage. As the early morning mist drifts through the dense woodland, the monastery reveals its humble yet powerful presence, radiating the calm spirit of the Himalayas.',
                    'Simple yet meaningful in its architecture, Dubdi’s whitewashed walls, tapering tower-like form, and muted greens echo ancient Tibetan design. Inside, old manuscripts, statues of the Three Lamas, and sacred relics preserve stories of the kingdom’s early spiritual roots. The richly painted interiors—though modest—carry symbols of deities, protective guardians, and timeless Buddhist teachings.',
                    'The quiet surroundings of Dubdi heighten its spiritual aura. Unlike larger monasteries filled with ritual sounds, here the atmosphere is shaped by silence—the rustle of leaves, distant bird calls, and the gentle hum of mountain wind. This tranquility creates a space that is both grounding and deeply reflective, offering visitors a glimpse into monastic life as it might have existed centuries ago.',
                    'The short forest trek leading to Dubdi adds to its charm. As sunlight filters through the trees and prayer flags flutter softly, the walk becomes a serene prelude to the monastery itself. Nature and spirituality blend seamlessly here, making Dubdi not just a historic site but a retreat for peace, introspection, and quiet strength.',
                    'Dubdi Monastery endures as more than the first monastery of Sikkim—it stands as a testament to the beginnings of faith in the region, a symbol of resilience, devotion, and the gentle harmony of the Himalayan landscape.'
                ].map((text, i) => (
                  <Reveal delay={0.2 + i * 0.15} key={i}>
                    <p className="text-base text-amber-50 leading-relaxed mb-6">{text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            {/* RIGHT: INFO BOXES */}
            <aside className="space-y-8">
              {/* Location card */}
              <div className="ml-auto w-[340px] max-w-full rounded-3xl bg-[#1a1209] border border-amber-500/40 p-5 shadow-xl">
                <h3 className="text-lg font-semibold text-amber-100 mb-2 flex items-center gap-2">
                  Location Map
                </h3>

                <p className="text-xs text-amber-300 mb-3">27.067°N, 88.467°E</p>

                <div className="overflow-hidden rounded-2xl mb-4">
                  <iframe
                    title="Dubdi map"
                    src="https://www.google.com/maps?q=Dubdi+Monastery&output=embed"
                    className="w-full h-56"
                  />
                </div>

                <div className="flex gap-2">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Dubdi+Monastery"
                    className="flex-1 px-4 py-2 rounded-full bg-amber-400 text-amber-950 font-semibold flex items-center justify-center"
                  >
                    Get Directions
                  </a>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Dubdi+Monastery"
                    className="flex-1 px-3 py-2 rounded-full border border-amber-500 text-amber-100 text-center font-semibold text-xs"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
              {/* Visit info card */}
              <div className="ml-auto w-[340px] max-w-full rounded-3xl bg-[#1a1209] border border-amber-500/40 p-5 shadow-xl">
                <h3 className="text-lg font-semibold text-amber-100 mb-3">Visit Information</h3>

                <div className="space-y-3 text-xs text-amber-50">
                  <div>
                    <p className="font-semibold text-amber-100">Visiting Hours</p>
                    <p>8:00 AM – 5:00 PM, daily.</p>
                  </div>

                  <div className="border-t border-amber-500/30 pt-2">
                    <p className="font-semibold text-amber-100">Entry Fee</p>
                    <p>Free for all visitors.</p>
                  </div>

                  <div className="border-t border-amber-500/30 pt-2">
                    <p className="font-semibold text-amber-100">Best Visit Times</p>
                    <p>
                      March to May and September to November offer pleasant weather (15-25°C) ideal for exploring. Early morning visits are recommended for a peaceful experience and to witness morning prayers. The annual Saga Dawa festival is a highlight.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
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
          {/* Background video – same pattern as your old page */}
          <video
            src="/archive.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            // you can add controls temporarily for debugging:
            // controls
          />

          {/* Gradient overlay for contrast (optional) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.1) 100%)',
            }}
          />

          {/* DIGITAL ARCHIVE text + icon */}
          <div className="relative z-10 w-full flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-amber-100">
                <span className="text-amber-100 text-2xl">⏱</span>
              </div>

              <h3 className="text-amber-100 text-4xl md:text-5xl font-bold uppercase" style={{ fontFamily: 'Cinzel Decorative', letterSpacing: '0.08em' }}>
                DIGITAL ARCHIVE
              </h3>
            </div>
          </div>
        </div>

        {/* FULL WIDTH CONTENT AREA */}
        <div
          className="w-screen min-h-[70vh] py-12 px-6 md:px-12 relative"
          style={{
            backgroundColor: '#a66437',
          }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* LEFT SIDE — Archive Cards */}
            <div className="flex flex-col gap-6">
              {dubdiArchiveItems.map((it) => (
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

            {/* RIGHT SIDE — Research Row + Timeline below it */}
            <div className="flex flex-col items-stretch gap-8">
              <ResearchRow />
              <TimelineColumn />
            </div>
          </div>

          {/* Detail Modal – ONLY OCR snippet */}
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
                    <img
                      src={activeItem.img}
                      alt={activeItem.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-amber-100">{activeItem.title}</h2>

                    {/* OCR ONLY */}
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

                    <button
                      onClick={() => setOpenDialog(false)}
                      className="mt-6 text-amber-200 hover:text-amber-100"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CULTURAL CALENDAR SECTION */}
      <section className="relative w-full py-20" style={{ backgroundColor: '#410704' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <Reveal>
              <h2 className="font-cinzel-decorative font-medium text-6xl md:text-7xl text-amber-100 mb-16 text-center">
              Cultural Calendar
            </h2>
          </Reveal>

          <div className="relative" style={{ paddingTop: '150px', paddingBottom: '0px' }}>
            <div className="absolute left-0 right-0 h-1 transform -translate-y-1/2"
              style={{
                top: 'calc(50% - 89px)',
                backgroundImage: 'repeating-linear-gradient(to right, #d97706 0px, #d97706 15px, transparent 15px, transparent 35px)',
                zIndex: 0,
              }}
            />

            <div className="grid grid-cols-4 gap-0 relative" style={{ minHeight: '360px' }}>
              <div className="relative">
                <Reveal delay={0.1}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-200 border-4 border-yellow-400 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% - 160px)', zIndex:2 }}>
                    <p className="text-xs font-semibold text-amber-900 mb-1">February – March</p>
                    <p className="text-xs text-amber-900 mb-2">1st Tibetan Month</p>
                    <h3 className="text-lg font-bold text-amber-900">Losar</h3>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: 'calc(50% - 64px)', width: '4px', height: '64px', backgroundColor: '#fcd34d' }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#fef08a', border: '4px solid #f59e0b', transformOrigin: 'center', zIndex: -1 }} />
                </Reveal>
              </div>

              <div className="relative">
                <Reveal delay={0.2}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#f59e0b', border: '4px solid #b45309', zIndex: -1 }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: '50%', width: '4px', height: '80px', backgroundColor: '#eab308', zIndex:-2 }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-400 border-4 border-yellow-600 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% + 72px)' }}>
                    <p className="text-xs font-semibold text-white mb-1">February (varies)</p>
                    <p className="text-xs text-white mb-2">1st Tibetan Month — 14th–15th day</p>
                    <h3 className="text-lg font-bold text-white">Bhumchu</h3>
                  </div>
                </Reveal>
              </div>

              <div className="relative">
                <Reveal delay={0.3}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 border-4 border-orange-600 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% - 160px)', zIndex:2 }}>
                    <p className="text-xs font-semibold text-white mb-1">May – June</p>
                    <p className="text-xs text-white mb-2">4th Tibetan Month</p>
                    <h3 className="text-lg font-bold text-white">Saga Dawa</h3>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: 'calc(50% - 64px)', width: '4px', height: '64px', backgroundColor: '#fb923c' }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#fb923c', border: '4px solid #ea580c', zIndex: -1 }} />
                </Reveal>
              </div>

              <div className="relative">
                <Reveal delay={0.4}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-md"
                    style={{ top: '50%', width: '32px', height: '32px', backgroundColor: '#f59e0b', border: '4px solid #b45309', zIndex: -1 }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: '50%', width: '4px', height: '80px', backgroundColor: '#eab308', zIndex:-2 }} />
                  <div className="absolute left-1/2 transform -translate-x-1/2 rounded-2xl bg-gradient-to-br from-yellow-600 to-yellow-500 border-4 border-yellow-700 p-4 w-44 shadow-lg"
                    style={{ top: 'calc(50% + 72px)' }}>
                    <p className="text-xs font-semibold text-white mb-1">July – August</p>
                    <p className="text-xs text-white mb-2">5th Tibetan Month — 10th day</p>
                    <h3 className="text-lg font-bold text-white">Thrunkar Tshechu</h3>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <Reveal delay={0.6}>
            <div className="mt-32 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Reveal delay={0.7}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
                    <h3 className="font-cinzel uppercase text-xl font-bold text-yellow-300 mb-3">Losar (Tibetan New Year)</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      Tibetan New Year celebrations at Dubdi mark new beginnings with special prayers, offerings, purification rituals, and community gatherings. Monks perform sacred ceremonies while devotees seek blessings for the year ahead.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.75}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
                    <h3 className="font-cinzel uppercase text-xl font-bold text-yellow-300 mb-3">Bhumchu</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      Major ritual ceremony at Norbugang in Yuksom featuring the opening of the divine vase containing holy water. Pilgrims visit the sacred Yuksom–Dubdi circuit including Norbugang, Kuthok Lake, and Dubdi Monastery during this auspicious time.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.8}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-orange-500/20 p-6 hover:border-orange-400/40 transition-colors">
                    <h3 className="font-cinzel uppercase text-xl font-bold text-orange-300 mb-3">Saga Dawa</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      The holiest day celebrating Buddha's birth, enlightenment, and parinirvana. Pilgrims visit Dubdi to perform circumambulation, light butter lamps, and engage in merit-making activities on this most auspicious occasion.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.85}>
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-orange-600/20 p-6 hover:border-orange-500/40 transition-colors">
                    <h3 className="font-cinzel uppercase text-xl font-bold text-orange-300 mb-3">Thrunkar Tshechu</h3>
                    <p className="text-sm text-amber-50 leading-relaxed">
                      Birth anniversary of Guru Padmasambhava celebrated with special prayers, processions, and Cham (masked ritual dances) depicting episodes from Guru Rinpoche's life. Monasteries in Yuksom area including Dubdi hold sacred rituals throughout the day.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.95}>
                <div className="rounded-3xl bg-gradient-to-r from-orange-900/20 to-amber-900/20 backdrop-blur-md border border-amber-500/20 p-8">
                  <p className="text-base text-amber-50 leading-relaxed font-light">
                    As Sikkim's first monastery, Dubdi holds a special place in the cultural and spiritual calendar of the region. These festivals at Dubdi represent the living heritage of Tibetan Buddhism, connecting past and present through sacred traditions that have endured for over three centuries.
                  </p>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
