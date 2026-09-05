import React, { useState } from 'react';
import { Mail, Calendar, Linkedin, FileText, Check, Copy, ArrowUpRight, MapPin, Clock, Download, Send } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [copied, setCopied] = useState(false);
  const email = 'engr.christcarl@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-transparent relative scroll-mt-20">
      {/* Background Subtle Ambient Neutral */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        <div className="rounded-3xl liquid-card border border-black/[0.07] dark:border-white/[0.09] shadow-xl relative overflow-hidden">
          
          {/* Card Section Top Bar */}
          <div className="px-5 py-3.5 bg-[#F7F7F8]/80 dark:bg-[#121215]/80 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
              Get in Touch
            </span>
            <div className="flex items-center gap-2 text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
              <span className="text-[#1A1A1A] dark:text-[#E0E0E0] font-medium">Christ Carl Tapat</span>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-apple-mono text-[#CC8400] uppercase tracking-widest font-semibold">
                    05 / Contact & Collaboration
                  </span>
                  <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">·</span>
                  <span className="text-xs font-apple-mono text-[#FF5600] flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#FF5600] animate-pulse" />
                    Available for Remote Roles
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight font-apple-display">
                  Let&apos;s make the next estimate easier to review.
                </h2>

                <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed max-w-xl font-apple-text">
                  I am open to remote construction estimating opportunities with US and Australian general contractors, subcontractors, and preconstruction teams. Let&apos;s discuss your upcoming drawing sets and estimating needs.
                </p>

                {/* Location & Timezone pills */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill border border-black/[0.06] dark:border-white/[0.08]">
                    <MapPin className="w-3.5 h-3.5 text-[#CC8400]" />
                    <span>Philippines (Remote)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill border border-black/[0.06] dark:border-white/[0.08]">
                    <Clock className="w-3.5 h-3.5 text-[#CC8400]" />
                    <span>GMT+8 (Flexible US/AU hours)</span>
                  </div>
                </div>

              </div>

              {/* Right Action Cards */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                
                {/* Cal.com In-App Booking Trigger Card */}
                {onOpenBooking ? (
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/50 transition-all flex items-center justify-between group cursor-pointer shadow-xs active:scale-98"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-[#FF5600]/10 text-[#FF5600] border border-[#FF5600]/30 shadow-2xs">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] group-hover:text-[#FF5600] transition-colors font-apple-display">
                          Get in Touch · 30-Min Call
                        </span>
                        <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                          Schedule via Cal.com (Google Meet)
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#4A4A4A] dark:text-[#9E9E9E] group-hover:text-[#FF5600] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </button>
                ) : (
                  <a
                    href="https://cal.com/tapat-christcarl/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 sm:p-5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/50 transition-all flex items-center justify-between group shadow-xs active:scale-98"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-[#FF5600]/10 text-[#FF5600] border border-[#FF5600]/30 shadow-2xs">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] group-hover:text-[#FF5600] transition-colors font-apple-display">
                          Get in Touch · 30-Min Call
                        </span>
                        <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                          Schedule via Cal.com
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#4A4A4A] dark:text-[#9E9E9E] group-hover:text-[#FF5600] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                )}

                {/* Direct Email Card with Compact Graphic Icon Buttons */}
                <div className="p-4 sm:p-5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-[#CC8400] border border-black/[0.05] dark:border-white/[0.07] flex-shrink-0 shadow-2xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="text-xs sm:text-sm font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] hover:text-[#FF5600] transition-colors truncate font-apple-text"
                        title={email}
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  {/* Graphic Icon Action Buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-8 h-8 rounded-xl liquid-glass border border-black/[0.08] dark:border-white/[0.1] flex items-center justify-center text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] hover:border-[#CC8400]/50 transition-all cursor-pointer active:scale-90 shadow-2xs"
                      title={copied ? 'Copied to clipboard' : 'Copy email address'}
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={`mailto:${email}`}
                      className="w-8 h-8 rounded-xl bg-[#FF5600] hover:bg-[#E04D00] text-white transition-all flex items-center justify-center active:scale-90 shadow-[0_2px_8px_rgba(255,86,0,0.3)]"
                      title="Send email"
                      aria-label="Send email"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2-Column Compact Actions: Resume Download & LinkedIn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* PDF Resume Download Card with Graphic Icon */}
                  <a
                    href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
                    download
                    className="p-3.5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 transition-all flex items-center justify-between group shadow-xs active:scale-98"
                    title="Download Resume (PDF)"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-[#FF5600] border border-black/[0.05] dark:border-white/[0.07] flex-shrink-0 shadow-2xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] group-hover:text-[#FF5600] transition-colors truncate font-apple-text">
                          Resume
                        </span>
                        <span className="text-[10px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                          PDF · 128 KB
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-xl liquid-glass border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-[#4A4A4A] dark:text-[#9E9E9E] group-hover:text-[#FF5600] group-hover:border-[#FF5600]/40 transition-colors flex-shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                  </a>

                  {/* LinkedIn Profile Card */}
                  <a
                    href="https://www.linkedin.com/in/christ-carl-tapat-23a53241b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 transition-all flex items-center justify-between group shadow-xs active:scale-98"
                    title="Connect on LinkedIn"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-[#0A66C2] border border-black/[0.05] dark:border-white/[0.07] flex-shrink-0 shadow-2xs">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] group-hover:text-[#FF5600] transition-colors truncate font-apple-text">
                          LinkedIn
                        </span>
                        <span className="text-[10px] font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                          Profile
                        </span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-xl liquid-glass border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-[#4A4A4A] dark:text-[#9E9E9E] group-hover:text-[#FF5600] group-hover:border-[#FF5600]/40 transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

