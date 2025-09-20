"use client";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      // Show footer if scrolled to bottom (within 50px)
      setShow(scrollY + windowHeight >= docHeight - 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-700 ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ background: "#0c3b44", color: "#fff", boxShadow: "0 -2px 16px #0006" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="font-cinzel text-lg">Treasures of Sikkim</span>
        <span className="font-lora text-sm opacity-80">© 2025 All rights reserved</span>
      </div>
    </footer>
  );
}
