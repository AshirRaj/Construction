// src/components/home/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, HardHat } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0e12]/95 backdrop-blur-md py-3 shadow-2xl border-b border-slate-800/80'
          : 'bg-gradient-to-b from-[#0c0e12]/95 via-[#0c0e12]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Company Brand Logo */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <HardHat className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-white uppercase font-mono">
                BUILDCORE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-amber-400 uppercase font-semibold -mt-1 font-mono">
                CONSTRUCTION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500 after:transition-transform after:origin-left duration-300 ${
                    isActive
                      ? 'text-amber-400 after:scale-x-100'
                      : 'text-slate-200 hover:text-amber-400 after:scale-x-0 hover:after:scale-x-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-102 group"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/admin/login"
              className="hidden lg:inline-flex text-xs font-bold text-slate-400 hover:text-slate-200 border border-slate-700/80 px-3.5 py-2 rounded-xl transition-colors font-mono"
            >
              Admin Portal
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 px-4 bg-[#14171e] border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col gap-3 animate-fade-in">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                      : 'text-slate-200 hover:text-amber-400 hover:bg-slate-800/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuoteModal) onOpenQuoteModal();
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-center shadow-lg uppercase text-xs tracking-wider"
              >
                Get a Quote
              </button>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white border border-slate-700 rounded-xl font-mono"
              >
                Admin Portal Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
