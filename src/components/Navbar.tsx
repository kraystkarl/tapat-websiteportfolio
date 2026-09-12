import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  FileText,
  Sun,
  Moon,
  ChevronRight,
  Calendar,
  Layers,
  ScrollText,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSectionIndex: number;
  onSelectSection: (index: number) => void;
  viewMode: 'panel' | 'scroll';
  onToggleViewMode: () => void;
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSectionIndex,
  onSelectSection,
  viewMode,
  onToggleViewMode,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'Intro', index: 0, kicker: '00' },
    { label: 'About', index: 1, kicker: '01' },
    { label: 'Experience', index: 2, kicker: '02' },
    { label: 'Methodology', index: 3, kicker: '03' },
    { label: 'Proof', index: 4, kicker: '04' },
    { label: 'Evidence', index: 5, kicker: '05' },
    { label: 'Contact', index: 6, kicker: '06' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#F7F7F8]/95 dark:bg-[#070709]/95 backdrop-blur-xl border-b border-black/[0.07] dark:border-white/[0.08] shadow-[0_2px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-colors duration-300 select-none">
      <div className="max-w-7xl mx-auto h-16 sm:h-18 px-3 sm:px-6 flex items-center justify-between">
        
        {/* Left: Christoph Nagel Style Circular Monogram Home Mark */}
        <button
          type="button"
          onClick={() => onSelectSection(0)}
          className="group relative flex items-center gap-2.5 p-1 rounded-full cursor-pointer focus:outline-none"
          title="Christ Carl Tapat · Home / Intro"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0E0E12] dark:bg-[#15151B] border border-black/15 dark:border-white/20 flex items-center justify-center font-space text-xs font-bold text-white shadow-md group-hover:border-[#FF5600] group-hover:scale-105 transition-all duration-200">
            <span className="text-[#FF5600]">C</span>
            <span className="text-white">T</span>
          </div>

          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-manrope group-hover:text-[#FF5600] transition-colors leading-tight">
              Christ Carl Tapat
            </span>
            <span className="text-[10px] font-space text-[#CC8400] dark:text-[#FF5600]">
              Civil Engineer · Estimator
            </span>
          </div>
        </button>

        {/* Center: Christoph Nagel Floating Liquid Glass Capsule Nav */}
        <nav
          className="hidden lg:flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full cn-nav-pill"
          aria-label="Portfolio Sections Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSectionIndex === item.index;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelectSection(item.index)}
                className={`cn-nav-btn px-2.5 sm:px-3 py-1 text-xs font-manrope font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'is-active text-white'
                    : 'text-[#4A4A4A] dark:text-white/60 hover:text-black dark:hover:text-white'
                }`}
              >
                <span className="text-[9px] font-space text-[#FF5600] mr-1 opacity-80">
                  {item.kicker}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Clean Minimalist Controls (Slide Mode, Dark Mode, Call, Resume) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Presentation Mode Toggle (Slide Deck vs Continuous Scroll) */}
          <button
            type="button"
            onClick={onToggleViewMode}
            className="p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/12 text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/60 hover:text-[#FF5600] active:scale-90 transition-all cursor-pointer backdrop-blur-md"
            title={`Current: ${viewMode === 'panel' ? 'Slide Mode' : 'Scroll Mode'}. Click to switch.`}
            aria-label="Toggle presentation mode"
          >
            {viewMode === 'panel' ? (
              <Layers className="w-4 h-4 text-[#FF5600]" />
            ) : (
              <ScrollText className="w-4 h-4 text-[#FF5600]" />
            )}
          </button>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/12 text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/60 hover:text-[#FF5600] active:scale-90 transition-all cursor-pointer backdrop-blur-md"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FF5600] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#1A1A1A] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Quick Booking Call Trigger */}
          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              className="p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/12 text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/60 hover:text-[#FF5600] active:scale-90 transition-all cursor-pointer backdrop-blur-md"
              title="Book a Consultation Call"
              aria-label="Book Call"
            >
              <Calendar className="w-4 h-4 text-[#FF5600]" />
            </button>
          )}

          {/* Primary Action Button: Resume PDF */}
          <a
            href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
            download
            className="p-2 rounded-full bg-[#FF5600] hover:bg-[#E04C00] text-white active:scale-90 transition-all shadow-[0_2px_12px_rgba(255,86,0,0.3)] cursor-pointer flex items-center justify-center"
            title="Download Construction Estimator Resume PDF"
            aria-label="Download Resume"
          >
            <FileText className="w-4 h-4" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.08] border border-black/10 dark:border-white/12 text-[#1A1A1A] dark:text-[#E0E0E0] active:scale-90 transition-transform cursor-pointer backdrop-blur-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Slide-Down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-3.5 rounded-3xl bg-[#0E0E12]/95 dark:bg-[#0E0E12]/95 backdrop-blur-2xl border border-white/15 shadow-2xl text-white pointer-events-auto animate-subtle-fade-in max-w-sm mx-auto">
          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 text-[10px] font-space text-[#FF5600] uppercase tracking-wider font-bold">
              Portfolio Navigation
            </div>
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onSelectSection(item.index);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                  activeSectionIndex === item.index
                    ? 'bg-[#FF5600]/20 text-[#FF5600] border border-[#FF5600]/40 font-bold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-space text-xs text-[#FF5600]">
                    {item.kicker}
                  </span>
                  <span className="font-manrope text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between px-2">
              <button
                type="button"
                onClick={() => {
                  onToggleViewMode();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs font-manrope text-white/70 hover:text-white"
              >
                <Layers className="w-3.5 h-3.5 text-[#FF5600]" />
                <span>Mode: <strong>{viewMode === 'panel' ? 'Slide Deck' : 'Scroll Page'}</strong></span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="text-xs font-manrope px-2.5 py-1 rounded-full bg-white/10 text-white"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>

            {onOpenBooking && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#FF5600] text-white text-xs font-bold hover:bg-[#E04C00] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Call</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
