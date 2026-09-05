import React from 'react';
import { Briefcase, Sliders, CheckCircle2, MessageSquare, ArrowRight, Mail, Calendar, MapPin, Clock } from 'lucide-react';

interface HeroSectionProps {
  onContactClick?: () => void;
  onOpenBooking?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick, onOpenBooking }) => {
  const routeCards = [
    {
      id: '01',
      label: 'Professional Experience',
      desc: '3 years at DeepBluee · 60+ projects exposure',
      icon: Briefcase,
      href: '#experience',
    },
    {
      id: '02',
      label: 'Estimating Methodology',
      desc: '8-stage structured workflow & tool set',
      icon: Sliders,
      href: '#methodology',
    },
    {
      id: '03',
      label: 'Proof & Deliverables',
      desc: 'Take-off, calculation, BOQ, RFI, QC & CSV trail',
      icon: CheckCircle2,
      href: '#proof',
    },
    {
      id: '04',
      label: 'Start a Conversation',
      desc: 'Direct email or 30-min Cal.com call',
      icon: MessageSquare,
      href: '#contact',
    },
  ];

  return (
    <section className="relative min-h-[85vh] pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Subtle Ambient Neutral Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Technical Statement & Route Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Technical Greeting / Position Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill border border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold text-[#CC8400] shadow-xs font-apple-text">
                <span className="w-2 h-2 rounded-full bg-[#CC8400] shadow-[0_0_8px_rgba(204,132,0,0.6)] animate-pulse" />
                <span>Construction Estimator</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill border border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold text-[#CC8400] shadow-xs font-apple-text">
                <span className="w-2 h-2 rounded-full bg-[#CC8400] shadow-[0_0_8px_rgba(204,132,0,0.6)] animate-pulse" />
                <span>Project Coordinator</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill border border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold text-[#CC8400] shadow-xs font-apple-text">
                <span className="w-2 h-2 rounded-full bg-[#CC8400] shadow-[0_0_8px_rgba(204,132,0,0.6)] animate-pulse" />
                <span>Construction Admin</span>
              </span>
            </div>

            {/* Clear, Dominant Apple Display Heading (SF Pro Display) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.08] tracking-tight font-apple-display">
              Clear quantities. <br />
              <span className="text-[#FF5600]">Reliable</span> estimating support.
            </h1>

            {/* Concise Supporting Copy (SF Pro Text) */}
            <p className="text-base sm:text-lg text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed max-w-xl font-apple-text">
              Christ Carl U. Tapat is a Construction Estimator, Civil Engineer, and Master Plumber providing remote quantity take-offs, trade BOQs, and preconstruction documentation for US and Australian construction teams.
            </p>

            {/* 4 Apple-styled Minimalist Route Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {routeCards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.label}
                    href={card.href}
                    className="group relative flex items-start justify-between p-4 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 dark:hover:border-[#FF5600]/40 active:scale-[0.98] transition-all duration-200"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.08] text-[#1A1A1A] dark:text-[#E0E0E0] group-hover:text-[#FF5600] group-hover:border-[#FF5600]/30 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-apple-mono text-[#CC8400] font-bold">
                            /{card.id}
                          </span>
                          <span className="text-xs sm:text-[13px] font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] group-hover:text-[#FF5600] transition-colors font-apple-display">
                            {card.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#4A4A4A] dark:text-[#9E9E9E] font-apple-text leading-tight mt-0.5">
                          {card.desc}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6B7280] dark:text-[#737373] group-hover:text-[#FF5600] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </a>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: Portrait + Status Card */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-6 relative">
            
            {/* Portrait Card Container */}
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-1 rounded-3xl bg-black/[0.03] dark:bg-white/[0.03] opacity-80 blur-xl pointer-events-none" />
              
              <div className="relative rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] liquid-card shadow-xl select-none" onContextMenu={(e) => e.preventDefault()}>
                
                {/* Top Pill Badge */}
                <div className="px-4 py-2.5 bg-[#F7F7F8]/80 dark:bg-[#121215]/80 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-apple-mono uppercase tracking-wider text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
                    Professional Profile
                  </span>
                  <span className="text-[10px] font-apple-mono text-[#CC8400] bg-[#CC8400]/10 border border-[#CC8400]/25 px-2.5 py-0.5 rounded-full font-medium">
                    Verified Engineer
                  </span>
                </div>

                <img
                  src="/assets/profile/IMG_2080-web.jpg"
                  width="800"
                  height="960"
                  alt="Christ Carl U. Tapat - Construction Estimator"
                  className="w-full h-80 sm:h-96 object-cover object-top filter contrast-105 select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end justify-between pointer-events-none backdrop-blur-[1px]">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white font-apple-display">
                      Christ Carl U. Tapat
                    </span>
                    <span className="text-[11px] font-apple-mono text-[#E0E0E0]">
                      Civil Engineer · Master Plumber
                    </span>
                  </div>
                  
                  <span className="text-[10px] font-apple-mono text-[#FAFAFA] uppercase px-2 py-0.5 rounded-md bg-white/[0.15] border border-white/20">
                    EST_VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Availability Status Card */}
            <div className="w-full max-w-sm rounded-2xl liquid-card border border-black/[0.07] dark:border-white/[0.09] p-4 sm:p-4.5 flex flex-col gap-3 shadow-md">
              <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CC8400] shadow-[0_0_8px_rgba(204,132,0,0.6)] animate-pulse" />
                  <span className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-text">
                    Open for Remote Roles
                  </span>
                </div>
                <span className="text-[10px] font-medium text-[#CC8400] bg-[#CC8400]/10 px-2.5 py-0.5 rounded-full border border-[#CC8400]/25 font-apple-text">
                  Available
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CC8400]" />
                  <span>Philippines</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#CC8400]" />
                  <span>GMT+8 Timezone</span>
                </div>
              </div>

              <p className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
                Supporting US & Australian preconstruction teams with timely, traceable take-offs and BOQs.
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-black/[0.05] dark:border-white/[0.06]">
                <a
                  href="mailto:engr.christcarl@gmail.com"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/40 hover:text-[#FF5600] active:scale-95 transition-all font-apple-text shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
                {onOpenBooking ? (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FF5600] text-white text-xs font-medium hover:bg-[#E04C00] active:scale-95 transition-all cursor-pointer font-apple-text shadow-[0_2px_10px_rgba(255,86,0,0.3)]"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Get in Touch</span>
                  </button>
                ) : (
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FF5600] text-white text-xs font-medium hover:bg-[#E04C00] active:scale-95 transition-all font-apple-text shadow-[0_2px_10px_rgba(255,86,0,0.3)]"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Get in Touch</span>
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

