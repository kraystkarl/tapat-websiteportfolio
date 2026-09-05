import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-transparent text-[#4A4A4A] dark:text-[#9E9E9E] border-t border-black/[0.06] dark:border-white/[0.08] pt-12 sm:pt-16 pb-28 sm:pb-32 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-10">
        
        {/* Top Footer Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div className="flex flex-col gap-1">
            <span className="text-base font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
              Christ Carl U. Tapat
            </span>
            <span className="text-xs font-apple-mono text-[#CC8400] font-semibold">
              Construction Estimator · Civil Engineer · Master Plumber
            </span>
            <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
              Philippines · GMT+8 · Remote US / Australian Construction Teams
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-black/[0.06] dark:border-white/[0.08] text-xs font-apple-text text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#FF5600] hover:border-[#FF5600]/40 transition-all cursor-pointer shadow-xs active:scale-95 font-medium"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#FF5600]" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E]">
          <nav className="flex flex-wrap items-center gap-6 text-[#4A4A4A] dark:text-[#9E9E9E]">
            <a href="#about" className="hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors">Experience</a>
            <a href="#methodology" className="hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors">Methodology & Process</a>
            <a href="#proof" className="hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors">Proof</a>
            <a href="#contact" className="hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <span>© 2026 Christ Carl U. Tapat</span>
            <span>·</span>
            <span>Construction Estimating Portfolio</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

