import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  FileText,
  Sun,
  Moon,
  ChevronRight,
  Calendar,
  Briefcase,
  Sliders,
  CheckCircle2,
  User,
  Mail
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', icon: User },
    { label: 'Experience', href: '#experience', icon: Briefcase },
    { label: 'Methodology & Process', href: '#methodology', icon: Sliders },
    { label: 'Proof', href: '#proof', icon: CheckCircle2 },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header className="sticky top-2 sm:top-3.5 z-40 px-3 sm:px-6 select-none transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div
          className={`transition-all duration-300 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between gap-3 ${
            scrolled
              ? 'liquid-glass shadow-[0_10px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.55)] border border-black/[0.08] dark:border-white/[0.12]'
              : 'liquid-glass-pill shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.35)] border border-black/[0.07] dark:border-white/[0.09]'
          }`}
        >
          {/* Left: Brand Monogram & Title in Industrial Apple Style */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            {/* Industrial Squircle Monogram Badge */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#1A1A1A] dark:bg-[#E0E0E0] border border-black/10 dark:border-white/20 flex items-center justify-center font-apple-mono text-[11px] sm:text-xs font-bold text-[#FAFAFA] dark:text-[#020001] shadow-sm transition-transform group-hover:scale-105 active:scale-95 flex-shrink-0">
              CT
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display group-hover:text-[#FF5600] transition-colors">
                  Christ Carl Tapat
                </span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#CC8400] shadow-[0_0_6px_rgba(204,132,0,0.6)] animate-pulse" title="Available for Remote Estimating" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] hidden sm:block">
                Civil Engineer · Estimator
              </span>
            </div>
          </a>

          {/* Center: Industrial Capsule Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.06]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] hover:bg-white/90 dark:hover:bg-white/[0.14] hover:shadow-xs active:scale-95 transition-all duration-150 whitespace-nowrap font-apple-text"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Theme Switcher & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Industrial Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="relative p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.1] text-[#1A1A1A] dark:text-[#E0E0E0] hover:bg-white dark:hover:bg-white/[0.15] active:scale-90 transition-all cursor-pointer shadow-xs"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#CC8400] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1A1A1A] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Quick Cal.com Call Trigger */}
            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.1] text-xs font-medium text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/60 hover:text-[#FF5600] hover:bg-white dark:hover:bg-white/[0.15] active:scale-95 transition-all cursor-pointer shadow-xs font-apple-text"
              >
                <Calendar className="w-3.5 h-3.5 text-[#CC8400]" />
                <span>Get in Touch</span>
              </button>
            )}

            {/* High-Signal Safety Orange Primary Action */}
            <a
              href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
              download
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FF5600] text-white text-xs font-medium hover:bg-[#E04C00] active:scale-95 transition-all shadow-[0_2px_10px_rgba(255,86,0,0.3)] font-apple-text"
              title="Download Construction Estimator Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.1] text-[#1A1A1A] dark:text-[#E0E0E0] active:scale-90 transition-transform cursor-pointer shadow-xs"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Sheet Menu with Liquid Glass */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2.5 p-3 rounded-3xl liquid-glass border border-black/[0.08] dark:border-white/[0.1] shadow-2xl transition-all duration-200 animate-subtle-fade-in">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/[0.12] border border-black/[0.04] dark:border-white/[0.06] active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#CC8400]/10 text-[#CC8400]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#6B7280] dark:text-[#737373]" />
                  </a>
                );
              })}

              {/* Appearance Switch Row in Mobile Menu */}
              <div className="mt-1 pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.06]">
                <div className="flex items-center gap-2.5 text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E]">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-[#CC8400]" /> : <Sun className="w-4 h-4 text-[#1A1A1A]" />}
                  <span>Appearance: <strong className="text-[#1A1A1A] dark:text-[#E0E0E0] capitalize">{theme} Mode</strong></span>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-3 py-1 rounded-full text-xs font-apple-text font-medium bg-[#1A1A1A] dark:bg-[#E0E0E0] text-white dark:text-[#020001] active:scale-95 transition-transform"
                >
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </div>

              {/* Cal.com Direct Call in Mobile Menu */}
              {onOpenBooking && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="mt-1 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-[#FF5600] text-white text-xs font-medium hover:bg-[#E04C00] transition-colors font-apple-text shadow-[0_2px_10px_rgba(255,86,0,0.3)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Get in Touch · Schedule a Call</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
