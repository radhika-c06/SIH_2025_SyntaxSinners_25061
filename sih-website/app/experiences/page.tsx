"use client"

import React, { useState } from "react"

const monasteries = [
  { id: "tashiding", name: "Tashiding" },
  { id: "rumtek", name: "Rumtek" },
  { id: "dubdi", name: "Dubdi" },
  { id: "tsuk", name: "Tsuk La Khang" },
]

const options = [
  {
    id: "tour",
    title: "TOUR GUIDE BOOKING",
    desc: "Book certified monastery tour guides who share deep knowledge of traditions, architecture, and local history.",
    icon: "/Icons/ICONS/HEADPHONE.png",
  },
  { id: "meditate", title: "MEDITATION WITH MONKS", desc: "Sit in guided meditation sessions with resident monks.", icon: "/Icons/ICONS/HEADPHONE.png" },
  { id: "cabs", title: "CABS & BUSES", desc: "Arrange reliable transport to and from the monastery.", icon: "/Icons/ICONS/HEADPHONE.png" },
  { id: "stay", title: "ACCOMMODATIONS", desc: "Find nearby guesthouses and monastery stay options.", icon: "/Icons/ICONS/HEADPHONE.png" },
]

export default function ExperiencesPage() {
  const [selected, setSelected] = useState(monasteries[0].id)

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-[#2b0d0d] via-[#5a1f1f] to-[#3b1212] text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-cinzel-decorative text-6xl md:text-[6rem] leading-none text-amber-100">EXPERIENCES</h1>
        <p className="mt-2 text-center text-white/80 underline text-lg font-lora">IMMERSE YOURSELF IN SPIRITUAL AND CULTURAL EXPERIENCES</p>

        <div className="mt-12 flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <div className="bg-transparent p-4 rounded-lg">
              <h3 className="text-sm text-amber-200 mb-4 font-poppins">Select Monastery</h3>
              <div className="flex flex-col gap-3">
                {monasteries.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`text-left rounded-xl px-4 py-3 transition-all duration-150 pop-card ${
                      selected === m.id
                        ? "bg-amber-50/8 ring-2 ring-amber-300 text-amber-50"
                        : "bg-white/5 hover:bg-white/10 text-white/90"
                    }`}
                  >
                    <div className="font-medium">{m.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="md:w-3/4">
            <div className="mb-6">
              <h2 className="text-3xl font-cinzel text-amber-50">
                {monasteries.find((m) => m.id === selected)?.name}
              </h2>
              <p className="text-sm text-white/70 mt-1 font-merriweather">Choose an experience below to learn more or book.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {options.map((opt) => (
                <div key={opt.id} className="flex gap-4 items-start bg-[#4a1414] rounded-3xl p-6 pop-card shine-border">
                  <div className="w-14 h-14 rounded-lg bg-amber-300 flex items-center justify-center text-2xl">
                    <img src={opt.icon} alt="" className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl text-amber-50 font-cinzel-decorative">{opt.title}</h3>
                    <p className="mt-2 text-sm text-white/80 max-w-md font-poppins">{opt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
