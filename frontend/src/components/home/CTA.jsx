// src/components/home/CTA.jsx
import React from 'react';
import { ArrowRight, PhoneCall, HardHat } from 'lucide-react';
import { FadeIn } from '../common/ScrollReveal';

export const CTA = ({ onOpenQuoteModal }) => {
  const handleScrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 bg-black/60 text-white overflow-hidden border-t border-slate-800/60 backdrop-blur-[2px]">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#14171e]/95 to-[#14171e]/90 border border-amber-500/35 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="space-y-4 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-widest border border-amber-500/40 font-mono">
                <HardHat className="w-3.5 h-3.5 text-amber-400" />
                <span>READY TO BREAK GROUND?</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
                HAVE A PROJECT IN MIND? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  LET'S BUILD IT TOGETHER.
                </span>
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                Tell us about your project specs, built-up area, and timeline. Our senior civil engineering team will deliver a comprehensive BOQ estimate within 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-8 py-4 rounded-xl shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-wider group transform hover:-translate-y-0.5"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>

              <button
                onClick={handleScrollToContact}
                className="w-full sm:w-auto bg-[#0c0e12] hover:bg-[#1a1e27] text-white font-extrabold px-8 py-4 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-lg"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Contact Us</span>
              </button>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};
