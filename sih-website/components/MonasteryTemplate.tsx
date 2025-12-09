'use client';

import React, { useState, useEffect, useRef } from 'react';
import Reveal from '@/components/Reveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function MonasteryTemplate() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeItem, setActiveItem] = useState<any | null>(null);

  // AUDIO PLAYER STATE
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'panoramic'>('3d');
  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollToSection = (id: string) => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // EMPTY: Replace with actual monastery images
  const images = [
    { src: '', alt: 'Monastery image 1' },
    { src: '', alt: 'Monastery image 2' },
    { src: '', alt: 'Monastery image 3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const interval = setInterval(() => {
      if (audio && !audio.paused) {
        updateProgress();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const Icon = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <span className={className} aria-hidden>
      {children}
    </span>
  );
  const MapPin = (props: any) => <Icon {...props}>📍</Icon>;
  const Calendar = (props: any) => <Icon {...props}>📅</Icon>;
  const Eye = (props: any) => <Icon {...props}>👁️</Icon>;
  const Download = (props: any) => <Icon {...props}>⬇️</Icon>;

  // EMPTY: Add archive items here
  const monasteryArchiveItems: any[] = [
    // {
    //   id: 'm1',
    //   title: '',
    //   monastery: '',
    //   type: '',
    //   year: '',
    //   img: '',
    //   tags: [],
    //   ocrText: '',
    //   location: '',
    //   description: '',
    // },
  ];

  return (
    <div className="min-h-screen text-amber-100">
      <Nav />

      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-between pb-20"
        style={{
          backgroundImage: images[activeIndex]?.src ? `url('${images[activeIndex].src}')` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Carousel indicators */}
        <div className="relative z-10 mt-8 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index ? 'bg-amber-100 w-6' : 'bg-amber-100/40 w-2'
              }`}
            />
          ))}
        </div>

        {/* Title + Info */}
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center relative z-10">
          <Reveal delay={0.4}>
            <div className="flex-1">
              <h1
                className="text-6xl md:text-7xl font-bold text-amber-100 drop-shadow-lg leading-tight font-cinzel-decorative"
                style={{ fontWeight: '900', letterSpacing: '3px' }}
              >
                {/* EMPTY: Monastery name */}
              </h1>
              <h2
                className="text-5xl md:text-6xl font-bold text-amber-100 drop-shadow-lg font-cinzel-decorative"
                style={{ fontWeight: '900', letterSpacing: '3px' }}
              >
                MONASTERY
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex-1 flex flex-col gap-6 text-amber-100 pl-12 mt-6">
              {/* EMPTY: Location */}
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
                  <div
                    className="text-xl font-bold tracking-wide uppercase"
                    style={{ fontFamily: 'Cormorant SC' }}
                  >
                    {/* Location name */}
                  </div>
                  <div className="text-lg uppercase" style={{ fontFamily: 'Cormorant SC' }}>
                    {/* Address */}
                  </div>
                </div>
              </div>

              {/* EMPTY: Founded year */}
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
                  <div
                    className="text-xl font-bold tracking-wide uppercase"
                    style={{ fontFamily: 'Cormorant SC' }}
                  >
                    Founded
                  </div>
                  <div className="text-lg uppercase" style={{ fontFamily: 'Cormorant SC' }}>
                    {/* Year */}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero Buttons */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap px-8 relative z-10">
          {[
            { label: 'Overview', target: 'overview' },
            { label: 'Digital Archive', target: 'digital-archive' },
            { label: 'Cultural Calendar', target: 'cultural-calendar' },
            { label: 'Audio Tour', target: 'audio-tour' },
            { label: 'Virtual Tour', target: 'virtual-tour' },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => scrollToSection(btn.target)}
              className="px-8 py-3 bg-amber-200 text-amber-900 rounded-full font-bold uppercase hover:bg-amber-100 transition"
              style={{ fontFamily: 'Cinzel' }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section id="overview" className="py-24 px-8 bg-gradient-to-b from-amber-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold text-amber-100 mb-12 font-cinzel-decorative">Overview</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* EMPTY: History content */}
            <Reveal delay={0.2}>
              <div>
                <h3 className="text-2xl font-bold text-amber-200 mb-4">History</h3>
                <p className="text-amber-50/80 leading-relaxed text-lg">
                  {/* Add history content here */}
                </p>
              </div>
            </Reveal>

            {/* EMPTY: Architecture content */}
            <Reveal delay={0.3}>
              <div>
                <h3 className="text-2xl font-bold text-amber-200 mb-4">Architecture</h3>
                <p className="text-amber-50/80 leading-relaxed text-lg">
                  {/* Add architecture content here */}
                </p>
              </div>
            </Reveal>
          </div>

          {/* EMPTY: Additional info */}
          <Reveal delay={0.4}>
            <div className="mt-12 p-8 bg-amber-900/30 rounded-lg border border-amber-600/50">
              <h3 className="text-2xl font-bold text-amber-200 mb-4">Religious Significance</h3>
              <p className="text-amber-50/80 leading-relaxed text-lg">
                {/* Add significance content here */}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIGITAL ARCHIVE SECTION */}
      <section id="digital-archive" className="py-24 px-8 bg-amber-900/20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold text-amber-100 mb-4 font-cinzel-decorative">Digital Archive</h2>
            <p className="text-amber-50/70 text-lg mb-12">
              {/* Add description */}
            </p>
          </Reveal>

          {/* Archive grid - EMPTY: Add items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monasteryArchiveItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-amber-50/50">No archive items yet. Check back soon!</p>
              </div>
            ) : (
              monasteryArchiveItems.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.1}>
                  <div
                    className="group cursor-pointer rounded-lg overflow-hidden bg-amber-900/50 hover:bg-amber-900/70 transition"
                    onClick={() => {
                      setActiveItem(item);
                      setOpenDialog(true);
                    }}
                  >
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-amber-100">{item.title}</h3>
                      <p className="text-amber-50/60 text-sm">{item.year}</p>
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map((tag: string) => (
                            <span key={tag} className="text-xs bg-amber-700/50 px-2 py-1 rounded text-amber-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CULTURAL CALENDAR SECTION */}
      <section id="cultural-calendar" className="py-24 px-8 bg-gradient-to-b from-amber-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold text-amber-100 mb-12 font-cinzel-decorative">
              Cultural Calendar
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EMPTY: Add festival/event cards here */}
            <Reveal delay={0.2}>
              <div className="p-6 bg-amber-900/40 rounded-lg border border-amber-600/50">
                <h3 className="text-2xl font-bold text-amber-200 mb-2">Festival Name</h3>
                <p className="text-amber-50/70">Festival description and timing...</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AUDIO TOUR SECTION */}
      <section id="audio-tour" className="py-24 px-8 bg-amber-900/20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold text-amber-100 mb-12 font-cinzel-decorative">Audio Tour</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="p-8 bg-amber-900/40 rounded-lg border border-amber-600/50 text-center">
              <p className="text-amber-50/70">Audio tour content coming soon...</p>
              {/* EMPTY: Add audio player here */}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VIRTUAL TOUR SECTION */}
      <section id="virtual-tour" className="py-24 px-8 bg-gradient-to-b from-amber-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-5xl font-bold text-amber-100 mb-12 font-cinzel-decorative">Virtual Tour</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="p-8 bg-amber-900/40 rounded-lg border border-amber-600/50 text-center">
              <p className="text-amber-50/70">Virtual 3D panoramic tour coming soon...</p>
              {/* EMPTY: Add 3D viewer here */}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
