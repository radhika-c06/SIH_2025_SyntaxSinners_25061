"use client"

import React from "react"
import Link from "next/link"

interface Accommodation {
  id: number
  name: string
  distance: string
  priceRange: string
  amenities: string[]
  availability: "Available" | "Limited" | "Full"
  rating: number
}

const accommodations: Accommodation[] = [
  {
    id: 1,
    name: "Yuksom Residency",
    distance: "18 km from Tashiding",
    priceRange: "₹1,200 - ₹2,500",
    amenities: ["WiFi", "Parking", "Hot Water", "Restaurant", "Garden View"],
    availability: "Available",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Tashiding Guest House",
    distance: "0.5 km from Tashiding",
    priceRange: "₹800 - ₹1,500",
    amenities: ["Hot Water", "Local Cuisine", "Mountain View", "Prayer Room"],
    availability: "Limited",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Demazong Homestay",
    distance: "12 km from Tashiding",
    priceRange: "₹1,000 - ₹2,000",
    amenities: ["WiFi", "Home Cooked Meals", "Hot Water", "Cultural Experience"],
    availability: "Available",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Norling Homestay Yuksom",
    distance: "20 km from Tashiding",
    priceRange: "₹1,500 - ₹2,800",
    amenities: ["WiFi", "Parking", "Hot Water", "Organic Food", "Trekking Guide"],
    availability: "Available",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Potala Guest House",
    distance: "15 km from Tashiding",
    priceRange: "₹900 - ₹1,800",
    amenities: ["Hot Water", "Basic WiFi", "Local Food", "Peaceful Setting"],
    availability: "Full",
    rating: 4.0,
  },
  {
    id: 6,
    name: "Tashi Gang Resort",
    distance: "22 km from Tashiding (Near Yuksom)",
    priceRange: "₹2,000 - ₹4,000",
    amenities: ["WiFi", "Parking", "Hot Water", "Restaurant", "Spa", "Conference Room"],
    availability: "Available",
    rating: 4.8,
  },
]

const getAvailabilityColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-green-500/20 text-green-300"
    case "Limited":
      return "bg-yellow-500/20 text-yellow-300"
    case "Full":
      return "bg-red-500/20 text-red-300"
    default:
      return "bg-gray-500/20 text-gray-300"
  }
}

export default function AccommodationsPage() {
  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-[#2b0d0d] via-[#5a1f1f] to-[#3b1212] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/experiences"
              className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-2 font-poppins"
            >
              ← Back to Experiences
            </Link>
          </div>
          <h1 className="font-cinzel-decorative text-5xl md:text-6xl leading-tight text-amber-100 mb-2">
            ACCOMMODATIONS
          </h1>
          <p className="text-white/80 text-lg font-merriweather">
            Near Tashiding Monastery, Sikkim
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-300/10 border-2 border-amber-300/30 rounded-3xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0">🏔️</span>
            <div>
              <h3 className="font-cinzel text-amber-100 text-xl mb-2">Stay Near Sacred Grounds</h3>
              <p className="text-white/90 font-merriweather leading-relaxed">
                Experience spiritual tranquility with comfortable stays ranging from traditional homestays to modern guesthouses. All accommodations offer stunning mountain views and easy access to Tashiding Monastery.
              </p>
            </div>
          </div>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {accommodations.map((stay) => (
            <div
              key={stay.id}
              className="bg-[#4a1414] rounded-3xl p-6 pop-card shine-border hover:shadow-2xl hover:shadow-amber-300/20 transition-all duration-300 flex flex-col"
            >
              {/* Icon Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-amber-300 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-black"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 21h18" strokeLinecap="round" />
                    <path d="M3 10h18" strokeLinecap="round" />
                    <path d="M5 21V10l7-7 7 7v11" strokeLinejoin="round" />
                    <path d="M9 14h6v7H9z" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Availability Badge */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(
                    stay.availability
                  )}`}
                >
                  ● {stay.availability}
                </span>
              </div>

              {/* Title & Details */}
              <h3 className="text-2xl font-cinzel font-bold text-amber-50 mb-2">{stay.name}</h3>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-300">⭐</span>
                <span className="text-white/90 font-merriweather text-sm">{stay.rating} / 5.0</span>
              </div>

              <p className="text-sm text-white/70 font-merriweather mb-2">
                <span className="text-amber-300">📍</span> {stay.distance}
              </p>

              <p className="text-lg text-amber-100 font-cinzel font-bold mb-4">{stay.priceRange}/night</p>

              {/* Amenities */}
              <div className="flex-grow mb-4">
                <h4 className="text-sm text-amber-200 font-poppins mb-2 uppercase tracking-wide">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {stay.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 border border-amber-300/20 rounded-full text-xs text-white/80 font-merriweather"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                disabled={stay.availability === "Full"}
                className={`w-full py-3 rounded-xl font-cinzel font-bold transition-all ${
                  stay.availability === "Full"
                    ? "bg-gray-500 text-gray-700 cursor-not-allowed opacity-50"
                    : "bg-amber-400 hover:bg-amber-500 text-black shadow-lg hover:shadow-amber-300/50"
                }`}
              >
                {stay.availability === "Full" ? "Fully Booked" : "Book Now"}
              </button>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-yellow-400/15 border-2 border-yellow-400/40 rounded-3xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <span className="text-4xl flex-shrink-0">💡</span>
            <div>
              <h3 className="font-cinzel text-amber-100 text-xl mb-2">Booking Tips</h3>
              <ul className="space-y-2 text-white/90 font-merriweather leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-1">→</span>
                  <span>Book in advance during festival seasons (October - November)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-1">→</span>
                  <span>Most homestays offer authentic Sikkimese cuisine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-1">→</span>
                  <span>Ask about monastery visit arrangements and local guide services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-1">→</span>
                  <span>Carry sufficient cash as card facilities may be limited</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center">
          <Link
            href="/experiences"
            className="inline-block px-8 py-3 bg-amber-400 hover:bg-amber-500 text-black font-cinzel font-bold rounded-lg transition-all shadow-lg hover:shadow-amber-300/50"
          >
            Explore More Experiences
          </Link>
        </div>
      </div>
    </div>
  )
}
