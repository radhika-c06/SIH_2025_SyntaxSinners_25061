"use client"

import React, { useState } from "react"

const travelOptions = [
  {
    id: "bus",
    title: "Bus",
    icon: "🚌",
    color: "bg-green-500",
    routes: [
      { from: "Gangtok", to: "Rumtek", times: ["7:00 AM", "11:00 AM", "3:00 PM"] },
      { from: "Pelling", to: "Rumtek", times: ["8:30 AM", "2:00 PM"] },
      { from: "Namchi", to: "Rumtek", times: ["9:00 AM", "4:00 PM"] },
    ],
  },
  {
    id: "cab",
    title: "Cab",
    icon: "🚕",
    color: "bg-orange-500",
    options: [
      { name: "Uber", status: "Not Available", available: false },
      { name: "Ola", status: "Not Available", available: false },
      { name: "Local Taxis", status: "Available", available: true },
    ],
  },
]

export default function TravelOptionsPage() {
  const [selectedTab, setSelectedTab] = useState("bus")

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-[#2b0d0d] via-[#5a1f1f] to-[#3b1212] text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cinzel-decorative text-6xl md:text-[6rem] leading-none text-amber-100 text-center mb-4">
          TRAVEL OPTIONS
        </h1>
        <p className="mt-2 text-center text-white/80 underline text-lg font-lora mb-12">
          CONVENIENT TRANSPORTATION TO REACH YOUR DESTINATION
        </p>

        {/* Tab buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          {travelOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedTab(option.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-poppins font-medium transition-all duration-200 ${
                selectedTab === option.id
                  ? `${option.color} text-white shadow-lg`
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <span className="text-2xl">{option.icon}</span>
              {option.title}
            </button>
          ))}
        </div>

        {/* Bus content */}
        {selectedTab === "bus" && (
          <div className="space-y-4">
            <h2 className="font-cinzel text-3xl text-amber-50 mb-6">Bus Routes</h2>
            {travelOptions[0].routes.map((route, idx) => (
              <div
                key={idx}
                className="bg-green-50/10 border-l-4 border-green-500 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-2xl mt-1">⏱</div>
                  <div className="flex-1">
                    <h3 className="font-cinzel text-lg text-amber-50">
                      {route.from} - {route.to}
                    </h3>
                    <p className="text-sm text-white/70 font-merriweather mt-1">
                      {route.times.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cab content */}
        {selectedTab === "cab" && (
          <div className="space-y-4">
            <h2 className="font-cinzel text-3xl text-amber-50 mb-6">Cab Services</h2>
            {travelOptions[1].options.map((cabOption, idx) => (
              <div
                key={idx}
                className="bg-orange-50/10 border-l-4 border-orange-500 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel text-lg text-amber-50">{cabOption.name}</h3>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-poppins ${
                      cabOption.available
                        ? "bg-green-50/20 text-green-300"
                        : "bg-red-50/20 text-red-300"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cabOption.available ? "bg-green-400" : "bg-red-400"}`}></span>
                    {cabOption.status}
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-white/50 font-merriweather mt-6 italic">
              Local taxis available at main towns near hotel pickups.
            </p>
          </div>
        )}

        {/* Info section */}
        <div className="mt-12 bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="font-cinzel text-xl text-amber-50 mb-3">Travel Tips</h3>
          <ul className="space-y-2 text-sm text-white/70 font-merriweather">
            <li>• Book your transport in advance during peak season</li>
            <li>• Local taxis offer personalized service and knowledge of local routes</li>
            <li>• Bus schedules may vary; confirm before departure</li>
            <li>• Allow extra time for mountain terrain travel</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
