import React from 'react';
import { Table, Calculator, FileQuestion, ShieldCheck, Link2, FileSpreadsheet, Check, Download, ArrowUpRight } from 'lucide-react';

interface EvidencePackageSummaryProps {
  onNavigateSection?: (index: number) => void;
}

export const EvidencePackageSummary: React.FC<EvidencePackageSummaryProps> = () => {
  const packageItems = [
    {
      title: '01. Bill of Quantities (BOQ)',
      desc: 'Trade-by-trade structured BOQ with standardized descriptions, clear measurement units (m², m³, linear, count), and itemized pricing structures.',
      icon: Table,
      tag: 'Trade BOQ',
    },
    {
      title: '02. Calculation Lineage',
      desc: 'Transparent formula derivations linking measured plan values, pitch adjustments, and waste allowances directly into pricing quantities.',
      icon: Calculator,
      tag: 'Formula Audit',
    },
    {
      title: '03. RFI Documentation',
      desc: 'Itemized Request for Information logs highlighting schedule discrepancies, missing callouts, and ambiguous trade interfaces before pricing.',
      icon: FileQuestion,
      tag: 'Precon Risk',
    },
    {
      title: '04. QC Reconciliation Matrix',
      desc: 'Side-by-side reconciliation matrix comparing raw take-off summaries to BOQ totals to prevent omission or double-counting.',
      icon: ShieldCheck,
      tag: 'Zero Variance',
    },
    {
      title: '05. CSV Traceability Link',
      desc: 'Full audit link mapping individual Bluebeam markup IDs directly to the corresponding rows in the Excel pricing workbook.',
      icon: Link2,
      tag: 'Audit Trail',
    },
    {
      title: '06. Evidence Index & Review Notes',
      desc: 'Cataloged drawing register tracking revision numbers, scale verifications, documented tender qualifications, and scope boundaries.',
      icon: FileSpreadsheet,
      tag: 'Register & Notes',
    },
  ];

  return (
    <section
      id="evidence"
      className="relative min-h-full w-full flex flex-col justify-center py-6 sm:py-10 lg:py-12"
    >
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-radial from-[#FF5600]/[0.03] dark:from-[#FF5600]/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Section Kicker, Heading, Description & Action */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Christoph Nagel Section Kicker */}
            <div className="flex items-center gap-3">
              <span className="section-kicker">
                <span className="kicker-badge">05</span>
                <span>AUDIT TRAIL · VERIFIED DELIVERABLES</span>
              </span>
            </div>

            {/* Bold Impact Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-anton text-[#1A1A1A] dark:text-[#F4F4F1] leading-[1.02] tracking-tight uppercase">
              CLEAR RECORDS. <span className="text-[#FF5600]">REVIEW-READY</span> OUTPUTS.
            </h2>

            <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-manrope">
              Every estimating package is structured for immediate auditability and effortless handoff to project managers, estimators, and commercial directors.
            </p>

            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-3">
              <div className="text-xs font-bold text-[#1A1A1A] dark:text-[#F4F4F1] font-manrope flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5600]" />
                <span>Zero-Omission Standards</span>
              </div>
              <p className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] font-manrope leading-relaxed">
                By maintaining continuous lineage between drawing markups, calculation derivations, and the final BOQ, discrepancies are identified and resolved before construction commences.
              </p>
              
              <a
                href="/documents/Resume-Construction-Estimator-TAPAT.pdf"
                download
                className="mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FF5600] text-white text-xs font-manrope font-bold hover:bg-[#E04C00] active:scale-95 transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume & Credentials PDF</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: The 6 Structured Audit Deliverables Grid */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {packageItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 transition-all flex flex-col justify-between gap-3 shadow-2xs group"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] text-[#FF5600] group-hover:bg-[#FF5600]/10 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-space text-[#FF5600] bg-[#FF5600]/10 border border-[#FF5600]/25 px-2 py-0.5 rounded-full font-bold">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] dark:text-[#F4F4F1] font-manrope">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] font-manrope leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between text-[10px] font-space text-[#4A4A4A] dark:text-[#9E9E9E]">
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#FF5600]" />
                        <span>Included in Tender Pack</span>
                      </span>
                      <span className="text-[#FF5600] font-bold">VERIFIED</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
