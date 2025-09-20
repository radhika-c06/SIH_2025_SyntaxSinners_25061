"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const HeroCarousel = dynamic(() => import("./HeroCarousel"), { ssr: false });

export default function ExploreCarouselMount() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setShow(true); },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <HeroCarousel /> : null}</div>;
}
