"use client";
import { useEffect, useState } from "react";

export default function SectionTransitionOverlay({ trigger }: { trigger: boolean }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      setTimeout(() => setActive(false), 1200); // Duration of animation
    }
  }, [trigger]);

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-all duration-1000 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
      style={{
        background: 'linear-gradient(120deg, #171717 0%, #3a3a3a 100%)',
        mixBlendMode: 'multiply',
      }}
    >
      {/* Optional: Add logo/text/graphics here for more effect */}
    </div>
  );
}
