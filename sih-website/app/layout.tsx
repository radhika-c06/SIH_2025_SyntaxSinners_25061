
import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Lora, Cinzel, Merriweather } from "next/font/google";
import BodhiChatbot from "../components/BodhiChatbot";
import GlitterCursorTrail from "../components/GlitterCursorTrail";
import Footer from "../components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: "800", variable: "--font-poppins" });
const lora = Lora({ subsets: ["latin"], style: "italic", variable: "--font-lora" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "900", variable: "--font-cinzel" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable} ${cinzel.variable} ${merriweather.variable}`}>
      <body className="bg-white text-black antialiased">
        <GlitterCursorTrail />
        {children}
        <BodhiChatbot />
        <Footer />
      </body>
    </html>
  );
}



export const metadata: Metadata = {
  title: "SIH Monastery360",
  description: "Minimal, immersive gallery",
};


