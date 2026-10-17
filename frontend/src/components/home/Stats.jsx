// src/components/home/Stats.jsx
import React from 'react';
import { companyStats } from '../../data/mockData';
import { Counter } from '../common/Counter';
import { FadeIn } from '../common/ScrollReveal';

export const Stats = () => {
  return (
    <section className="py-20 bg-black/60 text-white border-y border-amber-500/20 backdrop-blur-[2px] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {companyStats.slice(0, 4).map((stat, idx) => (
            <FadeIn key={idx} delay={0.1 * idx}>
              <div className="text-center space-y-2 p-6 rounded-2xl bg-[#14171e]/80 border border-slate-800 shadow-xl backdrop-blur-md hover:border-amber-500/40 transition-colors">
                <div className="text-4xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight inline-block">
                  <Counter target={stat.numericValue || stat.value} suffix={stat.value.replace(/[0-9]/g, '')} />
                </div>
                <div className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-300 font-mono">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
