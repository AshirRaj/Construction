// src/components/common/Toast.jsx
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, type, duration, onClose]);

  if (!message) return null;

  const typeConfig = {
    success: {
      border: 'border-amber-500/50 shadow-amber-500/10',
      icon: <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />,
      tag: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      tagText: 'Success'
    },
    error: {
      border: 'border-red-500/50 shadow-red-500/10',
      icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
      tag: 'bg-red-500/20 text-red-300 border-red-500/40',
      tagText: 'Error'
    },
    info: {
      border: 'border-blue-500/50 shadow-blue-500/10',
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
      tag: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      tagText: 'Info'
    }
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in max-w-md w-[92%] sm:w-auto min-w-[320px]">
      <div className={`flex items-center gap-3.5 p-4 rounded-2xl bg-[#12151c]/95 border ${config.border} backdrop-blur-xl shadow-2xl transition-all`}>
        {config.icon}
        
        <div className="flex-1 pr-2">
          <div className="text-white font-bold text-xs leading-relaxed">
            {message}
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
