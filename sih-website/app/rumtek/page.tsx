'use client';

import React, { useState, useEffect } from 'react';
import Reveal from '@/components/Reveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function RumtekMonastery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeItem, setActiveItem] = useState<any | null>(null);

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

  // Sample archive items for Rumtek
  const rumtekArchiveItems = [
    {
      id: 'r1',
      title: 'The Golden Stupa of the 16th Karmapa',
      monastery: 'Rumtek',
      type: 'thangka',
      year: '18th c.',
      img: '/rumtek/golden stupa.jpg',
      tags: ['Color-corrected', 'AI-enhanced'],
      ocrText: 'ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ...',
      location: 'Gangtok',
      description:
        '13-foot golden reliquary stupa containing the remains and relics of the 16th Gyalwa Karmapa, Rangjung Rigpe Dorje.\n\nDecorated with jewels (turquoise, coral, etc.).\n\nSurrounded by statues of all sixteen Karmapas.',
    },
    {
      id: 'r2',
      title: 'Buddha Shakyamuni statue',
      monastery: 'Rumtek',
      type: 'mural',
      year: '17th c.',
      img: '/rumtek/buddha.jpg',
      tags: ['AI-OCR processed', 'High-res'],
      ocrText: '༄༅། །རྒྱལ་བའི་མཆོད་རྟེན་...',
      location: 'Gangtok',
      description: 'Large central Buddha Shakyamuni statue with flanking guardians/bodhisattvas.',
    },
    {
      id: 'r3',
      title: 'The Four Guardian Kings',
      monastery: 'Rumtek',
      type: 'thangka',
      year: '19th c.',
      img: '/rumtek/kings.jpg',
      tags: ['AI-enhanced', 'Metadata complete'],
      ocrText: 'ཀརྨ་པ་རིན་པོ་ཆེ་...',
      location: 'Gangtok',
      description:
        'Paintings of the Four Guardian Kings depict powerful deities protecting the cardinal directions in Buddhist and Bon traditions. These and other protective deities paintings are seen at the entrance.',
    },
    {
      id: 'r4',
      title: 'Prayer Wheel',
      monastery: 'Rumtek',
      type: 'mural',
      year: '17th c.',
      img: '/rumtek/wheel.jpg',
      tags: ['AI-OCR processed', 'Gigapixel'],
      ocrText: 'འཁོར་བའི་འཁོར་ལོ...',
      location: 'Gangtok',
      description:
        'Rows of large, colorful prayer wheels are installed around the perimeter of the monastery and are a central feature of the complex. Visitors and monks circumambulate the monastery, spinning the wheels in a clockwise direction, which in the Tibetan Buddhist tradition is believed to have the same meritorious effect as orally reciting the mantras contained within them.',
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
        <h2 className="text-amber-100 text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-amber-400 text-2xl">⏱</span>
          Research &amp; Documentation
        </h2>

        <div className="flex flex-wrap gap-4 justify-between">
          {/* 1 */}
          <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
            <p className="text-sm font-semibold text-amber-100 leading-tight">
              Archaeological Survey Date
            </p>
            <p className="text-sm text-amber-50 mt-1 leading-snug">Unknown</p>
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
              Excellent, well-maintained with ongoing conservation efforts
            </p>
          </div>

          {/* 4 */}
          <div className="flex-1 min-w-[220px] max-w-[260px] rounded-3xl bg-[#7b4a26] border border-amber-600/30 px-5 py-4">
            <p className="text-sm font-semibold text-amber-100 leading-tight">
              Heritage Status
            </p>
            <p className="text-sm text-amber-50 mt-1 leading-snug">
              National Heritage Site
            </p>
          </div>
        </div>
      </div>
    );
  };

  // ---------- TIMELINE BELOW RESEARCH ROW (RIGHT COLUMN) ----------
  const rumtekTimeline = [
    {
      title: 'Original Construction',
      year: '1747 CE',
      description:
        'The original Rumtek / Ralang Monastery was built by the 9th Karmapa Wangchuk Dorje.',
    },
    {
      title: 'Relocation and Re-establishment',
      year: '1956 CE',
      description:
        'The 16th Karmapa, Rangjung Rigpe Dorje, fled Tibet and arrived in Sikkim, choosing Rumtek as his new seat.',
    },
    {
      title: 'Construction of New Monastery',
      year: '1962 CE',
      description:
        'A new monastery complex was constructed at Rumtek, closely mirroring Tsurphu Monastery in Tibet.',
    },
    {
      title: 'Consecration of Rumtek',
      year: '1966 CE',
      description:
        'The new Rumtek Monastery was consecrated and became the main seat of the 16th Karmapa.',
    },
    {
      title: 'Passing of the 16th Karmapa',
      year: '1981 CE',
      description:
        'Rangjung Rigpe Dorje passed away in exile, leading to future succession disputes around the Karmapa lineage.',
    },
    {
      title: 'Succession Controversy',
      year: '1990 CE',
      description:
        'Competing claims to the 17th Karmapa title created tensions over control and access to Rumtek.',
    },
    {
      title: 'Preservation Efforts Begin',
      year: 'c. 2000 CE',
      description:
        'Conservation programmes focused on murals, relics, and structural stability of the monastery complex.',
    },
   
    {
      title: "Ogyen Trinley Dorje's Visit",
      year: '2011 CE',
      description:
        'One claimant to the 17th Karmapa title, Ogyen Trinley Dorje, made a significant visit to Rumtek Monastery.',
    },
    {
      title: 'Active Monastery & Tourist Destination',
      year: '2024 CE',
      description:
        'Rumtek continues as an active monastic centre, pilgrimage site, and major tourist destination in Sikkim.',
    },
    {
      title: 'Inheritage Foundation Archival Capture',
      year: '2025 CE',
      description:
        'Rumtek’s chronology and visual heritage are documented by Inheritage Foundation for long-term digital stewardship.',
    },
  ];

  type TimelineEvent = (typeof rumtekTimeline)[number];

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
      <h2 className="text-amber-100 text-xl font-semibold mb-2 flex items-center gap-2">
        <span className="text-amber-400 text-2xl">📜</span>
        Chronology of Rumtek
      </h2>

      {rumtekTimeline.map((ev) => (
        <TimelineCard key={ev.title} event={ev} />
      ))}
    </div>
  );

  // ----------------------------------------------------------------

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
                <img src={images[i].src} alt={images[i].alt} className="w-full h-full object-cover" />
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
                activeIndex === index ? 'bg-amber-100 w-6' : 'bg-amber-100/40 w-2'
              }`}
            />
          ))}
        </div>

        {/* Title + Info */}
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
          <Reveal delay={0.4}>
            <div className="flex-1">
              <h1 className="text-6xl font-bold text-amber-100 tracking-wide leading-tight">
                RUMTEK
              </h1>
              <h2 className="text-5xl font-bold text-amber-100 tracking-wide">
                MONASTERY
              </h2>
            </div>
          </Reveal>

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
                  <div className="text-xl font-semibold">Rumtek, East Sikkim</div>
                  <div className="text-lg">Gangtok (737135), India</div>
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
                  <div className="text-xl font-semibold">Built in</div>
                  <div className="text-lg">1966 CE</div>
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
                className="px-8 py-3 bg-amber-200 text-amber-900 rounded-full font-semibold hover:bg-amber-100 transition"
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
                <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-10 leading-tight">
                  Rumtek Monastery: Where the Himalayas Meet Living Tradition
                </h2>
              </Reveal>

              {/* Transparent Aesthetic Box */}
              <div className="rounded-3xl p-8 md:p-10 backdrop-blur-sm bg-amber-100/5 border border-amber-200/20 shadow-2xl">
                {[
                  'Perched on a ridge overlooking Gangtok, Rumtek Monastery—also known as the Dharma Chakra Centre—feels alive with the spirit of the Himalayas. As the mountain wind whipped vibrant prayer flags into motion, the monastery revealed itself as a powerful symbol of Tibetan Buddhism and cultural resilience.',
                  "A replica of Tibet's original Tsurphu Monastery, Rumtek stands as a living link to the Karmapa lineage. Its vivid reds, golds, and blues contrast beautifully with the muted Himalayan landscape, while intricate murals of deities, mandalas, and mythic scenes breathe life into its walls. Inside, the golden stupa—adorned with precious stones and surrounded by relics of past Karmapas—radiates a profound sense of sacredness.",
                  'The rhythmic chanting of monks, the steady beat of drums, and the glow of butter lamps create an atmosphere that is both serene and powerful. Watching the monks at their rituals offers a glimpse into a world shaped by devotion, discipline, and centuries-old tradition.',
                  "Beyond the temple halls, Rumtek's tranquil gardens and sweeping views of Sikkim's rolling hills offer moments of peaceful reflection. Here, nature and spirituality blend seamlessly, making Rumtek not just a monastery but a sanctuary of heritage, faith, and quiet strength.",
                  'The monastery stands not just as a testament to Tibetan architecture and artistry, but as a living embodiment of faith, a beacon of hope amidst the towering peaks of the Himalayas.',
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
                <h3 className="text-lg font-semibold text-amber-100 mb-3">Visit Information</h3>

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
                      During major Buddhist festivals like Tse-Chu (late May/early June), Saga Dawa (May/June),
                      Losar (February/March), or Lhabab Duchen (October/November) for vibrant cultural and religious
                      experiences. Alternatively, March to May and September to November offer pleasant weather
                      (15-25°C) ideal for exploring. Early morning visits are recommended for a peaceful experience
                      and to witness morning prayers.
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

        <h3 className="text-amber-100 text-3xl md:text-4xl font-semibold tracking-[0.25em] uppercase">
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
              {rumtekArchiveItems.map((it) => (
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

      <Footer />
    </main>
  );
}
