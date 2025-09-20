"use client";
import { useEffect, useState } from "react";

export default function ExploreRevealOverlay({ trigger }: { trigger: boolean }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      setTimeout(() => setActive(false), 1200);
    }
  }, [trigger]);

  return (
    <div
      className={`absolute left-0 bottom-0 w-full z-40 pointer-events-none transition-all duration-1000 ${active ? 'h-full' : 'h-0'}`}
      style={{
        background: 'linear-gradient(120deg, #171717 0%, #3a3a3a 100%)',
        borderRadius: '1.5rem 1.5rem 0 0',
      }}
    />
  );
}
