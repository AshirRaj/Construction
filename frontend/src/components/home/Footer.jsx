// src/components/home/Footer.jsx
import React from 'react';
import { HardHat, ArrowUp, MapPin, ExternalLink } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Configurable Google Maps location link (User can replace this URL anytime)
  const mapLocationUrl = "https://maps.google.com/?q=Fortune+Towers+Jayadev+Vihar+Bhubaneswar+Odisha";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHashNav = (e, targetId) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  const handlePageNav = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">

          {/* 1. Brand Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <HardHat className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-wider text-white uppercase font-mono">
                  BUILDCORE
                </span>
                <span className="text-[9px] tracking-[0.2em] text-amber-400 uppercase font-semibold -mt-1 font-mono">
                  CONSTRUCTION
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              BuildCore Construction is a premier turnkey EPC and civil engineering contractor specializing in commercial towers, heavy industrial facilities, and luxury residences.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 flex items-center justify-center transition-colors text-slate-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 flex items-center justify-center transition-colors text-slate-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 flex items-center justify-center transition-colors text-slate-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 flex items-center justify-center transition-colors text-slate-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 2. Quick Links Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/#about"
                  onClick={(e) => handleHashNav(e, 'about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  About BuildCore
                </a>
              </li>
              <li>
                <Link
                  to="/projects"
                  onClick={handlePageNav}
                  className="hover:text-amber-400 transition-colors"
                >
                  Featured Projects
                </Link>
              </li>
              <li>
                <a
                  href="/#why-us"
                  onClick={(e) => handleHashNav(e, 'why-us')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  onClick={(e) => handleHashNav(e, 'contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Contact Engineering
                </a>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  onClick={handlePageNav}
                  className="hover:text-amber-400 transition-colors font-mono text-amber-500/80"
                >
                  Admin Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Services Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleHashNav(e, 'services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Residential Construction
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleHashNav(e, 'services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Commercial Towers
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleHashNav(e, 'services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Industrial Warehousing
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleHashNav(e, 'services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Structural Renovation
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => handleHashNav(e, 'services')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Civil Infrastructure
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Mini Map & Location Widget Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Headquarters Location</span>
              </h4>
              <span className="text-[10px] text-amber-400/80 font-mono font-bold">Odisha, IN</span>
            </div>

            {/* Interactive Mini Map Card that redirects to Google Maps */}
            <a
              href={mapLocationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden border border-slate-800 bg-[#14171e] hover:border-amber-500/60 shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Map Blueprint Grid Backdrop */}
              <div className="h-32 w-full bg-[#0c0e12] relative overflow-hidden flex items-center justify-center">
                {/* Blueprint grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                
                {/* Stylized vector roads & zones */}
                <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-20,40 Q100,20 220,70 T400,60" fill="none" stroke="#f59e0b" strokeWidth="3" />
                  <path d="M80,-10 L130,140" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M220,-10 L190,140" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="150" cy="65" r="45" fill="#f59e0b" fillOpacity="0.08" />
                </svg>

                {/* Radar Pulse Beacon */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="absolute -inset-3 rounded-full bg-amber-500 opacity-40 animate-ping" />
                  <div className="w-9 h-9 rounded-full bg-amber-500 border-2 border-slate-950 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/50 group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5 fill-slate-950" />
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded bg-slate-950/90 text-amber-400 font-mono text-[9px] font-extrabold border border-amber-500/40">
                    Fortune Towers
                  </span>
                </div>

                {/* Hover CTA Overlay */}
                <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-1 rounded-md shadow">
                    <span>Open Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Address Details Strip */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="truncate pr-2">
                  <p className="text-slate-200 font-bold text-[11px] truncate font-mono">Jayadev Vihar, Bhubaneswar</p>
                  <p className="text-slate-400 text-[10px] truncate">Odisha 751013, India</p>
                </div>
                <span className="text-amber-400 group-hover:text-amber-300 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shrink-0 font-mono">
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 BuildCore Construction Pvt. Ltd. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
