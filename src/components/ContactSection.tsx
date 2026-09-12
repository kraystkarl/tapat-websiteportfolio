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
    <section
      id="contact"
      className="relative w-full flex flex-col justify-center py-8 sm:py-12 lg:py-16"
    >
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-50" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-radial from-[#FF5600]/[0.03] dark:from-[#FF5600]/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Section Kicker, Heading, Availability & Copy */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Bold Impact Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-anton text-[#1A1A1A] dark:text-[#F4F4F1] leading-[1.02] tracking-tight uppercase">
              LET&apos;S DISCUSS YOUR <span className="text-[#FF5600]">UPCOMING DRAWINGS</span> & ESTIMATES.
            </h2>

            <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-manrope">
              Available for remote estimating contracts, trade quantity take-offs, and preconstruction BOQ preparation for US and Australian builders.
            </p>

            {/* Location & Timezone Details */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-manrope">
                <MapPin className="w-4 h-4 text-[#FF5600]" />
                <span className="text-[#1A1A1A] dark:text-[#E0E0E0]">Philippines (Remote)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-manrope">
                <Clock className="w-4 h-4 text-[#FF5600]" />
                <span className="text-[#1A1A1A] dark:text-[#E0E0E0]">GMT+8 (US/AU Coverage)</span>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-col gap-1.5 text-xs text-[#4A4A4A] dark:text-[#9E9E9E] font-manrope">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FF5600]" />
                <span>24-Hour initial response time for plan reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#FF5600]" />
                <span>Fully calibrated PlanSwift & Bluebeam markups provided</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Cards & Direct Schedule Container */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            
            {/* Schedule Call Card */}
            {onOpenBooking && (
              <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A] dark:text-[#F4F4F1] font-manrope">
                    <Calendar className="w-4 h-4 text-[#FF5600]" />
                    <span>Schedule 30-Min Preconstruction Consultation</span>
                  </div>
                  <p className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] font-manrope mt-1">
                    Book directly on my calendar to review your drawing set and project scope.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FF5600] text-white text-xs font-manrope font-bold hover:bg-[#E04C00] active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Select Time Slot</span>
                </button>
              </div>
            )}

            {/* Email Contact Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2.5">
              <span className="text-[10px] font-space text-[#FF5600] uppercase font-bold tracking-wider">
                Direct Email Inquiries
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-[#FF5600]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] dark:text-[#F4F4F1] font-manrope select-all">
                    {email}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.1] text-xs font-manrope font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/50 active:scale-95 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#4A4A4A] dark:text-[#9E9E9E]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5600] text-white text-xs font-manrope font-bold hover:bg-[#E04C00] active:scale-95 transition-all shadow-xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* LinkedIn & Resume Cards in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="https://www.linkedin.com/in/christ-carl-tapat-23a53241b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 flex items-center justify-between gap-2 group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-[#FF5600] group-hover:bg-[#FF5600]/10 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1A1A] dark:text-[#F4F4F1] font-manrope">
                      LinkedIn Profile
                    </div>
                    <div className="text-[10px] text-[#4A4A4A] dark:text-[#9E9E9E] font-manrope">
                      Connect professionally
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#FF5600] group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
                download
                className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 flex items-center justify-between gap-2 group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-[#FF5600] group-hover:bg-[#FF5600]/10 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1A1A] dark:text-[#F4F4F1] font-manrope">
                      Download Resume
                    </div>
                    <div className="text-[10px] text-[#4A4A4A] dark:text-[#9E9E9E] font-manrope">
                      PDF (Updated 2026)
                    </div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#6B7280] group-hover:text-[#FF5600] group-hover:translate-y-0.5 transition-all" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
