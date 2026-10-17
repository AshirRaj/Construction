// src/components/home/Services.jsx

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { IconHelper } from '../common/IconHelper';
import { Modal } from '../common/Modal';
import { FadeIn } from '../common/ScrollReveal';

export const Services = ({ services = [] }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);

  // Show first 3 initially, then all services when button is clicked
  const displayedServices = showAllServices
    ? (services || [])
    : (services || []).slice(0, 3);

  return (
    <section
      id="services"
      className="py-24 bg-black/50 backdrop-blur-[2px] text-slate-100 relative border-t border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

          <FadeIn delay={0.2}>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-tight">
              CONSTRUCTION SOLUTIONS <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                BUILT AROUND YOU.
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-slate-300 text-base sm:text-lg font-normal">
              Full-lifecycle structural engineering, procurement, and heavy
              construction execution tailored for modern development scale.
            </p>
          </FadeIn>

        </div>


        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {displayedServices.map((service, idx) => (

            <FadeIn key={service.id} delay={0.1 * (idx % 3)}>

              <div
                onClick={() => setSelectedService(service)}
                className="group relative p-8 rounded-2xl bg-[#14171e]/90 border border-slate-800/90 shadow-xl hover:border-amber-500/60 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden"
              >

                {/* Top Numbering & Icon */}
                <div className="flex items-center justify-between mb-6">

                  <span className="text-3xl font-black font-mono text-slate-600 group-hover:text-amber-400 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-[#0c0e12] border border-slate-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-inner">

                    <IconHelper
                      name={service.iconName}
                      className="w-6 h-6 stroke-[2]"
                    />

                  </div>

                </div>


                {/* Service Content */}
                <div className="space-y-3">

                  <h3 className="text-xl font-bold text-white uppercase font-mono group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>

                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                    {service.subtitle}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>


                  {/* Features */}
                  <div className="pt-2 flex flex-wrap gap-2">

                    {(service.features || []).slice(0, 2).map((feat, i) => (

                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded bg-[#0c0e12]/80 text-slate-300 font-semibold border border-slate-800"
                      >
                        {feat}
                      </span>

                    ))}

                  </div>

                </div>


                {/* Explore Solution */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider group-hover:text-amber-300">

                  <span>
                    Explore Solution
                  </span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />

                </div>

              </div>

            </FadeIn>

          ))}

        </div>


        {/* View All / Show Less Button */}
        {services.length > 3 && (

          <FadeIn delay={0.4}>

            <div className="flex justify-center mt-12">

              <button
                type="button"
                onClick={() => setShowAllServices(!showAllServices)}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
              >

                <span>
                  {showAllServices ? 'Show Less' : 'View All Services'}
                </span>

                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${showAllServices ? 'rotate-180' : ''
                    }`}
                />

              </button>

            </div>

          </FadeIn>

        )}

      </div>


      {/* Service Detail Modal */}
      {selectedService && (

        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
        >

          <div className="space-y-6 text-slate-100">

            {/* Service Icon & Title */}
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">

                <IconHelper
                  name={selectedService.iconName}
                  className="w-6 h-6"
                />

              </div>

              <div>

                <h4 className="text-xl font-bold text-white font-mono uppercase">
                  {selectedService.title}
                </h4>

                <p className="text-xs text-amber-400 font-medium uppercase tracking-wider">
                  {selectedService.subtitle}
                </p>

              </div>

            </div>


            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedService.description}
            </p>


            {/* Core Engineering Capabilities */}
            <div className="space-y-3 pt-2">

              <h5 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2 font-mono">
                Core Engineering Capabilities
              </h5>

              <div className="grid sm:grid-cols-2 gap-3">

                {(selectedService.features || []).map((feat, idx) => (

                  <div
                    key={idx}
                    className="flex items-center gap-2 text-slate-200 text-sm"
                  >

                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />

                    <span>
                      {feat}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* Inquire Button */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">

              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-colors"
              >
                Inquire For Your Project
              </a>

            </div>

          </div>

        </Modal>

      )}

    </section>
  );
};