"use client";
import { useEffect, useRef, useState } from "react";

export default function GlitterCursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    function createGlitter(x: number, y: number) {
      const glitter = document.createElement("div");
      glitter.style.position = "fixed";
      glitter.style.left = `${x}px`;
      glitter.style.top = `${y}px`;
      glitter.style.pointerEvents = "none";
      glitter.style.width = "8px";
      glitter.style.height = "8px";
      glitter.style.borderRadius = "50%";
      glitter.style.background =
        "radial-gradient(circle, gold 60%, #fff 100%)";
      glitter.style.boxShadow = "0 0 8px 2px gold, 0 0 2px 1px #fff";
      glitter.style.opacity = "0.8";
      glitter.style.zIndex = "9999";
      glitter.style.transition = "opacity 0.7s, transform 0.7s";
      glitter.style.transform = "scale(1)";
      document.body.appendChild(glitter);
      setTimeout(() => {
        glitter.style.opacity = "0";
        glitter.style.transform = "scale(2)";
      }, 10);
      setTimeout(() => {
        glitter.remove();
      }, 700);
    }
    function onMove(e: MouseEvent) {
      createGlitter(e.clientX, e.clientY);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMounted]);

  return isMounted ? <div ref={trailRef} /> : null;
}
