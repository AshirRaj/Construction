// src/components/home/WhyChooseUs.jsx
import React from 'react';
import { whyChooseUsFeatures } from '../../data/mockData';
import { IconHelper } from '../common/IconHelper';
import { FadeIn, ImageReveal, ScaleIn } from '../common/ScrollReveal';

export const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 bg-slate-950/50 backdrop-blur-[2px] text-slate-100 relative overflow-hidden border-t border-slate-800/60">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
              ENGINEERING INTEGRITY & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                UNCOMPROMISING QUALITY.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-slate-300 text-base sm:text-lg font-normal">
              What sets BuildCore apart from conventional builders is our commitment to precision structural design, material transparency, and safety compliance.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Feature Image */}
          <div className="lg:col-span-5 relative">
            <ScaleIn delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-950/80">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
                  alt="Engineers Supervising Pre-Engineered Steel Facility"
                  className="h-[480px] sm:h-[550px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e12]/80 via-transparent to-transparent" />
              </div>
            </ScaleIn>
          </div>

          {/* Right Column: Feature Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6">
              {whyChooseUsFeatures.map((feature, idx) => (
                <FadeIn key={idx} delay={0.1 * idx}>
                  <div className="p-6 rounded-2xl bg-[#14171e]/90 border border-slate-800/90 shadow-xl hover:border-amber-500/50 backdrop-blur-sm transition-all duration-300 space-y-3 hover:-translate-y-1 group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-inner">
                      <IconHelper name={feature.iconName} className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-white uppercase font-mono group-hover:text-amber-400 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
