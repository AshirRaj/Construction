// src/components/home/About.jsx
import React from 'react';
import { CheckCircle2, ArrowRight, Building2 } from 'lucide-react';
import { FadeIn, ImageReveal, ScaleIn } from '../common/ScrollReveal';
import { Counter } from '../common/Counter';

export const About = () => {
  const features = [
    "Uncompromising Site Safety Protocols (OSHA Compliant)",
    "BIM 3D Precision Structural Engineering",
    "On-Time Delivery & Within Budget Guarantee",
    "Sustainable High-Performance Green Concrete"
  ];

  return (
    <section id="about" className="py-24 bg-[#0c0e12]/40 backdrop-blur-[2px] text-slate-100 relative overflow-hidden border-t border-slate-800/60">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image Stack with Floating Experience Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950/80">
              <ImageReveal
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Architects and Civil Engineers Inspecting Site Blueprint"
                className="h-[450px] sm:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/80 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Card */}
            <ScaleIn delay={0.2} className="absolute -bottom-6 -right-2 sm:right-6">
              <div className="p-6 rounded-2xl bg-[#14171e]/95 border border-slate-700 shadow-2xl backdrop-blur-xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-mono">
                      <Counter target={100} suffix="%" /> On-Time
                    </div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Project Handover Rate
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>

          {/* Right Column: About Copy */}
          <div className="lg:col-span-6 space-y-6">

            <FadeIn delay={0.2}>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                WE DON'T JUST BUILD STRUCTURES. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  WE BUILD LEGACIES.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Founded on principles of structural integrity, engineering innovation, and absolute accountability, BuildCore Construction has evolved into one of the region's premier turnkey builders for commercial high-rises, residential townships, and industrial complexes.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                We leverage state-of-the-art pre-engineered steel technology, high-density concrete formulations, and 3D BIM coordination to ensure every foundation we pour stands strong for generations.
              </p>
            </FadeIn>

            {/* Key Pillars Checklist */}
            <FadeIn delay={0.5}>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-200 text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Quick Metrics Grid */}
            <FadeIn delay={0.6}>
              <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-[#14171e]/90 border border-slate-800 backdrop-blur-md shadow-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    <Counter target={15} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400 font-semibold uppercase font-mono">Years Exp</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    <Counter target={250} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400 font-semibold uppercase font-mono">Projects</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    <Counter target={40} suffix="+" />
                  </div>
                  <div className="text-xs text-slate-400 font-semibold uppercase font-mono">Engineers</div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.7}>
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-extrabold uppercase tracking-wider text-sm group pt-2"
              >
                <span>Learn More About Our Capabilities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </FadeIn>

          </div>

        </div>
      </div>
    </section>
  );
};
