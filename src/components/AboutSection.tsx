import React from 'react';
import { Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-transparent border-t border-b border-black/[0.06] dark:border-white/[0.08] scroll-mt-20">
      {/* Background Subtle Ambient Light */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-bl from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Professional Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[350px]">
              <div className="absolute -inset-1 rounded-3xl bg-black/[0.03] dark:bg-white/[0.03] opacity-80 blur-lg pointer-events-none" />
              
              <div className="relative rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] liquid-card shadow-xl">
                {/* 9:16 Portrait Ratio Container */}
                <div
                  className="w-full aspect-[9/16] overflow-hidden bg-black relative select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src="/assets/profile/IMG_2068-web.jpg"
                    alt="Engr. Christ Carl Tapat - Professional Profile"
                    className="w-full h-full object-cover object-[center_12%] filter contrast-105 select-none pointer-events-none"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Technical text, credentials, metadata & direct actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Section Number Label */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-apple-mono text-[#CC8400] uppercase tracking-widest font-semibold">
                01 / About
              </span>
              <span className="text-xs font-apple-mono text-[#AAAAAA] dark:text-[#555555]">·</span>
              <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] uppercase tracking-widest">
                Construction Estimator
              </span>
            </div>

            {/* Apple Display Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-[1.12] tracking-tight font-apple-display">
              Turning construction drawings into <span className="text-[#FF5600]">clear, dependable</span> estimating support.
            </h2>

            {/* Concise, Direct Paragraphs (SF Pro Text) */}
            <div className="flex flex-col gap-4 text-sm sm:text-base text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
              <p>
                As a Construction Estimator with registered Civil Engineer and Master Plumber credentials, I bridge architectural drawings with mathematical precision. My focus is delivering structured quantity take-offs, trade-by-trade BOQs, and proactive preconstruction documentation that estimators and project leads can immediately review and trust.
              </p>
              <p>
                Operating remotely from the Philippines (GMT+8), I support US and Australian construction teams during tender and preconstruction phases. Whether reviewing complex multi-trade drawing sets in PlanSwift or Bluebeam Revu, every measurement is calibrated, cross-checked, and traceably linked to clear line items.
              </p>
            </div>

            {/* Metadata Badges in Industrial Chip Style */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                'Construction Estimator',
                'Quantity Take-Offs',
                'BOQ Preparation',
                'Civil Engineer',
                'Master Plumber',
                'Philippines (GMT+8)',
                'Remote US / AU Support',
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1.5 rounded-full liquid-glass-pill border border-black/[0.06] dark:border-white/[0.08] text-xs font-apple-text font-medium text-[#1A1A1A] dark:text-[#E0E0E0] shadow-2xs"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.06]">
              <a
                href="https://www.linkedin.com/in/christ-carl-tapat-23a53241b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-white/[0.06] border border-black/[0.07] dark:border-white/[0.09] text-xs font-apple-text font-medium text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/40 hover:text-[#FF5600] active:scale-95 transition-all shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#CC8400]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="mailto:engr.christcarl@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-white/[0.06] border border-black/[0.07] dark:border-white/[0.09] text-xs font-apple-text font-medium text-[#1A1A1A] dark:text-[#E0E0E0] hover:border-[#FF5600]/40 hover:text-[#FF5600] active:scale-95 transition-all shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#CC8400]" />
                <span>Email</span>
              </a>

              <a
                href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5600] text-white text-xs font-apple-text hover:bg-[#E04C00] active:scale-95 transition-all shadow-[0_2px_10px_rgba(255,86,0,0.3)] font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

