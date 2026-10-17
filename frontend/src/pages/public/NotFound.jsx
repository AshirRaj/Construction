// src/pages/public/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
        <HardHat className="w-10 h-10" />
      </div>
      <h1 className="text-6xl font-black font-mono text-white tracking-widest mb-2">404</h1>
      <h2 className="text-xl font-bold uppercase font-mono text-amber-400 mb-4">SITE LOCATION NOT FOUND</h2>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        The architectural page you are looking for has been moved, relocated, or does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};
