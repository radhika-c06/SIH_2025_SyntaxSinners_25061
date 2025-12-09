"use client"

import React, { useMemo } from "react"
import Link from "next/link"

interface Accommodation {
  id: number
  name: string
  monastery: string
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
    monastery: "tashiding",
    distance: "18 km from Tashiding",
    priceRange: "₹1,200 - ₹2,500",
    amenities: ["WiFi", "Parking", "Hot Water", "Restaurant", "Garden View"],
    availability: "Available",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Tashiding Guest House",
    monastery: "tashiding",
    distance: "0.5 km from Tashiding",
    priceRange: "₹800 - ₹1,500",
    amenities: ["WiFi", "Garden", "Traditional Decor", "Tea Service"],
    availability: "Available",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Sikkim Heritage Hotel",
    monastery: "tashiding",
    distance: "8 km from Tashiding",
    priceRange: "₹2,000 - ₹3,500",
    amenities: ["Restaurant", "Spa", "Conference Room", "Parking", "WiFi"],
    availability: "Limited",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Mountain View Resort",
    monastery: "tashiding",
    distance: "12 km from Tashiding",
    priceRange: "₹1,500 - ₹3,000",
    amenities: ["Bonfire", "Trekking Guide", "WiFi", "Restaurant", "Parking"],
    availability: "Available",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Monastery View Guesthouse",
    monastery: "tashiding",
    distance: "2 km from Tashiding",
    priceRange: "₹1,000 - ₹2,000",
    amenities: ["Meditation Room", "Garden", "WiFi", "Traditional Food"],
    availability: "Full",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Rumtek Heritage Lodge",
    monastery: "rumtek",
    distance: "1 km from Rumtek",
    priceRange: "₹900 - ₹1,800",
    amenities: ["WiFi", "Restaurant", "Parking", "Monastery View"],
    availability: "Available",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Karthala Guesthouse",
    monastery: "rumtek",
    distance: "5 km from Rumtek",
    priceRange: "₹700 - ₹1,400",
    amenities: ["Garden", "Tea House", "WiFi"],
    availability: "Available",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Dubdi Retreat Center",
    monastery: "dubdi",
    distance: "0.2 km from Dubdi",
    priceRange: "₹1,000 - ₹2,200",
    amenities: ["Meditation Hall", "Traditional Meals", "WiFi", "Peaceful Garden"],
    availability: "Limited",
    rating: 4.9,
  },
  {
    id: 9,
    name: "Tsuk La Khang Guest Wing",
    monastery: "tsuk",
    distance: "Adjacent to Tsuk La Khang",
    priceRange: "₹850 - ₹1,600",
    amenities: ["Library Access", "Buddhist Teachings", "WiFi", "Courtyard"],
    availability: "Available",
    rating: 4.8,
  },
]

export default function AccommodationsPage() {
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  const monasteryParam = searchParams.get('monastery') || 'tashiding'
  
  const filteredAccommodations = useMemo(() => {
    return accommodations.filter(acc => acc.monastery === monasteryParam)
  }, [monasteryParam])

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-[#2b0d0d] via-[#5a1f1f] to-[#3b1212] text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-cinzel-decorative text-6xl md:text-[6rem] leading-none text-amber-100 text-center">
          ACCOMMODATIONS
        </h1>
        <p className="mt-2 text-center text-white/80 underline text-lg font-lora">
          FIND NEARBY GUESTHOUSES AND MONASTERY STAY OPTIONS
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccommodations.map((acc) => (
            <div
              key={acc.id}
              className="bg-[#4a1414] rounded-3xl p-6 pop-card shine-border hover:bg-[#5a1a1a] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-cinzel text-amber-50 mb-1">{acc.name}</h3>
                  <p className="text-sm text-white/70 font-merriweather">{acc.distance}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-300/20 px-2 py-1 rounded-lg">
                  <span className="text-amber-300">★</span>
                  <span className="text-sm font-poppins text-amber-100">{acc.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-lg font-cinzel text-amber-200 mb-3">{acc.priceRange}</p>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest text-white/60 font-poppins mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {acc.amenities.map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full font-poppins">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-widest text-white/60 font-poppins">Availability</p>
                  <p
                    className={`text-sm font-poppins mt-1 ${
                      acc.availability === "Available"
                        ? "text-green-400"
                        : acc.availability === "Limited"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {acc.availability}
                  </p>
                </div>
              </div>

              <Link
                href={`/experiences/accommodations/${acc.id}`}
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center px-4 py-2 rounded-md font-poppins transition-colors"
              >
                Book now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

