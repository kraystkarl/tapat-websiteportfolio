import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectSection?: (index: number) => void;
  viewMode?: 'panel' | 'scroll';
  onToggleViewMode?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSection,
  viewMode = 'panel',
  onToggleViewMode,
}) => {
  const scrollToTop = () => {
    if (onSelectSection) {
      onSelectSection(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Intro', index: 0 },
    { label: 'About', index: 1 },
    { label: 'Experience', index: 2 },
    { label: 'Methodology', index: 3 },
    { label: 'Proof of Work', index: 4 },
    { label: 'Contact', index: 5 },
  ];

  return (
    <footer className="relative bg-transparent text-[#4A4A4A] dark:text-[#9E9E9E] border-t border-black/[0.06] dark:border-white/[0.08] py-8 sm:py-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-6">
        
        {/* Top Footer Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-bold text-[#1A1A1A] dark:text-[#F4F4F1] font-manrope">
              Christ Carl U. Tapat
            </span>
            <span className="text-xs font-space text-[#FF5600] font-semibold">
              Civil Engineer · Construction Estimator · Master Plumber
            </span>
            <span className="text-[11px] font-space text-[#4A4A4A] dark:text-[#9E9E9E]">
              Philippines · GMT+8 · Remote US / AU Estimating Support
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-xs font-manrope text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#FF5600] hover:border-[#FF5600]/40 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#FF5600]" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-manrope text-[#4A4A4A] dark:text-[#9E9E9E]">
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  if (onSelectSection) onSelectSection(link.index);
                }}
                className="hover:text-[#FF5600] transition-colors cursor-pointer text-xs font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 text-[11px] font-space">
            <span>© 2026 Christ Carl U. Tapat</span>
            <span>·</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
