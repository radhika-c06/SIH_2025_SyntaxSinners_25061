
import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Lora, Cinzel, Merriweather, Cinzel_Decorative } from "next/font/google";
import BodhiChatbot from "../components/BodhiChatbot";
import GlitterCursorTrail from "../components/GlitterCursorTrail";
import Footer from "../components/Footer";
import BackgroundAudio from "../components/BackgroundAudio";

const poppins = Poppins({ subsets: ["latin"], weight: "800", variable: "--font-poppins" });
const lora = Lora({ subsets: ["latin"], style: "italic", variable: "--font-lora" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "900", variable: "--font-cinzel" });
const cinzelDec = Cinzel_Decorative({ subsets: ["latin"], weight: ["700","900"], variable: "--font-cinzel-deco" });
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-merriweather" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable} ${cinzel.variable} ${cinzelDec.variable} ${merriweather.variable}`}>
      <body className="bg-white text-black antialiased">
        {/* Background music for entire website (volume controlled in client component) */}
        <BackgroundAudio />
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


