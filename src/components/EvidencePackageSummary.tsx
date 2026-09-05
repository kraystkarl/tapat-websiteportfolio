import React from 'react';
import { Table, Calculator, FileQuestion, ShieldCheck, Link2, FileSpreadsheet, Check } from 'lucide-react';

export const EvidencePackageSummary: React.FC = () => {
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
    <section className="py-16 sm:py-24 bg-transparent border-b border-black/[0.06] dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-2xl mb-12">
          <span className="text-xs font-apple-mono text-[#CC8400] uppercase tracking-widest font-semibold">
            Audit-Ready Deliverables
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
            Clear records, review-ready outputs.
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
            Every estimating package is structured for immediate auditability and effortless handoff to project managers and commercial leads.
          </p>
        </div>

        {/* 6 Structured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packageItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] hover:border-[#FF5600]/40 transition-all flex flex-col justify-between gap-4 shadow-2xs group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-[#FF5600] group-hover:bg-[#FF5600]/10 transition-colors shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-apple-mono text-[#CC8400] bg-[#CC8400]/10 border border-[#CC8400]/25 px-2.5 py-0.5 rounded-full font-semibold">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-apple-mono text-[#CC8400] pt-2 border-t border-black/[0.05] dark:border-white/[0.06] font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Standard Deliverable Component</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

