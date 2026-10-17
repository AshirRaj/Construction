// src/components/home/Testimonials.jsx
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { FadeIn } from '../common/ScrollReveal';

export const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-slate-950/45 backdrop-blur-[2px] text-slate-100 relative overflow-hidden border-t border-slate-800/60">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
              TRUSTED BY INDUSTRY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                LEADERS & DEVELOPERS.
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <FadeIn delay={0.3}>
            <div className="p-8 sm:p-12 rounded-3xl bg-[#14171e]/90 border border-slate-800/90 shadow-2xl space-y-8 relative overflow-hidden backdrop-blur-md">
              <Quote className="w-20 h-20 text-slate-800/40 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-6 relative z-10 animate-fade-in" key={currentIndex}>
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Body */}
                <blockquote className="text-lg sm:text-2xl text-slate-200 font-medium leading-relaxed italic">
                  "{current.quote}"
                </blockquote>

                {/* Client Profile Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-base font-mono shadow-md">
                      {current.avatar || 'BC'}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white font-mono">{current.name}</div>
                      <div className="text-xs text-amber-400 font-bold uppercase font-mono">{current.position} — <span className="text-slate-400">{current.company}</span></div>
                    </div>
                  </div>

                  {/* Navigation Index Counter & Controls */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-slate-500 hidden sm:inline">
                      0{currentIndex + 1} / 0{testimonials.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="p-3 rounded-xl bg-[#0c0e12] hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors border border-slate-800 shadow-sm"
                        aria-label="Previous Testimonial"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-3 rounded-xl bg-[#0c0e12] hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition-colors border border-slate-800 shadow-sm"
                        aria-label="Next Testimonial"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};
