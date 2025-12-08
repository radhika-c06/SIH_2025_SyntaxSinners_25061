"use client"

import React, { useState } from "react"
import Link from "next/link"

const monasteries = [
  { id: "tashiding", name: "Tashiding" },
  { id: "rumtek", name: "Rumtek" },
  { id: "dubdi", name: "Dubdi" },
  { id: "tsuk", name: "Tsuk La Khang" },
              {options.map((opt) => {
                const isClickable = opt.id === 'tour'

                const content = (
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-300 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden" aria-hidden>
                        {opt.id === 'stay' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                            <rect x="1.5" y="8" width="21" height="6" rx="1.5" stroke="currentColor" fill="none" />
                            <rect x="1.5" y="5" width="6" height="4" rx="1" stroke="currentColor" fill="none" />
                            <path d="M1.5 14v3M22.5 14v3" stroke="currentColor" />
                          </svg>
                        )}
                        {opt.id === 'tour' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                            <path d="M5 20v-6l4-2v8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            <path d="M9 12l8-3v6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            <circle cx="5" cy="19" r="1" stroke="currentColor" fill="none" />
                            <circle cx="17" cy="18" r="1" stroke="currentColor" fill="none" />
                            <path d="M13 6l4-2v3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        )}
                        {opt.id === 'cabs' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                            <path d="M3 11.5h1.5l1.2-3.2A2 2 0 0 1 7.6 6h8.8a2 2 0 0 1 1.9 2.3L19.5 11.5H21" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="3" y="11.5" width="18" height="3.8" rx="1" stroke="currentColor" fill="none" />
                            <circle cx="7" cy="17.2" r="1" stroke="currentColor" fill="none" />
                            <circle cx="17" cy="17.2" r="1" stroke="currentColor" fill="none" />
                          </svg>
                        )}
                        {opt.id === 'meditate' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                            <circle cx="12" cy="4.5" r="2" stroke="currentColor" fill="none" />
                            <path d="M7 10c1.5-1 4-1.5 5-1.5s3.5.5 5 1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
                            <path d="M5.5 13.5c1-2 3.5-3 6.5-3s5.5 1 6.5 3" stroke="currentColor" fill="none" strokeLinecap="round" />
                            <path d="M8 16.5c0-1.2 1.5-2.2 4-2.2s4 1 4 2.2" stroke="currentColor" fill="none" strokeLinecap="round" />
                            <rect x="9" y="17.7" width="6" height="0.9" rx="0.45" stroke="currentColor" fill="none" />
                          </svg>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl text-amber-50 font-cinzel">{opt.title}</h3>
                        <p className="mt-3 text-sm text-white/80 max-w-md font-merriweather">{opt.desc}</p>
                      </div>
                    </div>

                    {/* Buttons / actions aligned under text column */}
                    {(opt.id === 'stay' || opt.id === 'tour') && (
                      <div className="mt-4 ml-14">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-poppins">Book now</button>
                      </div>
                    )}

                    {opt.id === 'cabs' && (
                      <div className="mt-4 ml-14">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-poppins">Check now</button>
                      </div>
                    )}

                    {opt.id === 'meditate' && (
                      <div className="mt-4 flex flex-wrap gap-3 ml-14">
                        <button
                          aria-label="Morning meditation time"
                          className="px-4 py-1.5 rounded-full bg-white/6 border border-amber-300 text-amber-100 text-sm font-merriweather hover:bg-white/10 transition"
                        >
                          Morning: 6:00 AM
                        </button>

                        <button
                          aria-label="Evening meditation time"
                          className="px-4 py-1.5 rounded-full bg-white/6 border border-amber-300 text-amber-100 text-sm font-merriweather hover:bg-white/10 transition"
                        >
                          Evening: 5:00 PM
                        </button>
                      </div>
                    )}
                  </div>
                )

                return isClickable ? (
                  <Link key={opt.id} href="/experiences/tour-guide-booking" className="bg-[#4a1414] rounded-3xl p-6 pop-card shine-border hover:bg-[#5a1a1a] transition-colors cursor-pointer">
                    {content}
                  </Link>
                ) : (
                  <div key={opt.id} className="bg-[#4a1414] rounded-3xl p-6 pop-card shine-border">
                    {content}
                  </div>
                )
              })}
                const isClickable = opt.id === 'tour'
                const content = (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-300 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden" aria-hidden>
                      {opt.id === 'stay' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                          <rect x="1.5" y="8" width="21" height="6" rx="1.5" stroke="currentColor" fill="none" />
                          <rect x="1.5" y="5" width="6" height="4" rx="1" stroke="currentColor" fill="none" />
                          <path d="M1.5 14v3M22.5 14v3" stroke="currentColor" />
                        </svg>
>>>>>>> c8091fb2b7e0bf7846844b2c1bc77ef404f09ab6
                      )}

                      {opt.id === 'cabs' && (
                        <div className="mt-4 ml-14">
                          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-poppins">Check now</button>
                        </div>
                      )}

                      {opt.id === 'meditate' && (
                        <div className="mt-4 flex flex-wrap gap-3 ml-14">
                          <button
                            aria-label="Morning meditation time"
                            className="px-4 py-1.5 rounded-full bg-white/6 border border-amber-300 text-amber-100 text-sm font-merriweather hover:bg-white/10 transition"
                          >
                            Morning: 6:00 AM
                          </button>

                          <button
                            aria-label="Evening meditation time"
                            className="px-4 py-1.5 rounded-full bg-white/6 border border-amber-300 text-amber-100 text-sm font-merriweather hover:bg-white/10 transition"
                          >
                            Evening: 5:00 PM
                          </button>
                        </div>
                      )}
                  </div>
                )
<<<<<<< HEAD
=======
                
                return isClickable ? (
                  <Link key={opt.id} href="/experiences/tour-guide-booking" className="bg-[#4a1414] rounded-3xl p-6 pop-card shine-border hover:bg-[#5a1a1a] transition-colors cursor-pointer">
                    {content}
                  </Link>
                ) : (
                  <div key={opt.id} className="bg-[#4a1414] rounded-3xl p-6 pop-card shine-border">
                    {content}
                  </div>
                )
>>>>>>> c8091fb2b7e0bf7846844b2c1bc77ef404f09ab6
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
