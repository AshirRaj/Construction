// src/components/home/Process.jsx
import React from 'react';
import { workProcessSteps } from '../../data/mockData';
import { FadeIn } from '../common/ScrollReveal';

export const Process = () => {
  return (
    <section className="py-24 bg-black/55 backdrop-blur-[2px] text-white relative overflow-hidden border-t border-slate-800/60">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">

          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
              TURNKEY CONSTRUCTION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                EXECUTION PROCESS.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-slate-300 text-base sm:text-lg font-normal">
              A disciplined 6-stage engineering roadmap designed to eliminate site delays, guarantee structural safety, and deliver within budget.
            </p>
          </FadeIn>
        </div>

        {/* Stepper Timeline Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {workProcessSteps.map((stepItem, idx) => (
            <FadeIn key={stepItem.step} delay={0.1 * idx}>
              <div className="relative p-8 rounded-2xl bg-[#14171e]/90 border border-slate-800/90 shadow-xl space-y-4 hover:border-amber-500/50 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-amber-400 font-mono tracking-widest group-hover:scale-110 transition-transform inline-block">
                    {stepItem.step}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#0c0e12] text-slate-400 border border-slate-800 font-mono">
                    Stage {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white uppercase font-mono tracking-wider pt-2 group-hover:text-amber-400 transition-colors">
                  {stepItem.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
