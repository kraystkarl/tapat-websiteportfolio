import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [deepblueeOpen, setDeepblueeOpen] = useState(true);
  const [coquillaOpen, setCoquillaOpen] = useState(true);

  // DeepBluee Data
  const deepblueeCategories = [
    { name: 'Residential Swimming Pools', count: 'Core Focus' },
    { name: 'Commercial Swimming Pools', count: 'Resort & Club Facilities' },
    { name: 'Residential Houses', count: 'Civil / Structural' },
    { name: 'Warehouses', count: 'Commercial Shell & MEP' },
  ];

  const deepblueeScopes = [
    {
      category: 'Estimating & Quantities',
      items: [
        'Cost estimation & budget breakdown',
        'Bill of Quantities (BOQ) preparation',
        'Quantity take-offs using PlanSwift, Bluebeam & Microsoft Excel',
        'Material cutting lists & procurement schedules',
        'Concrete pouring request reconciliations',
      ],
    },
    {
      category: 'Drawing & Technical Review',
      items: [
        'Architectural & structural drawing preparation',
        'Plumbing & electrical layout coordination',
        'Construction drawing drafting & redlines',
        'Permit processing technical packages',
      ],
    },
    {
      category: 'Site & Preconstruction Support',
      items: [
        'Site engineering & progress measurement',
        'Request for Information (RFI) documentation',
        'Risk assessment (RA) & safety documentation',
        'Project planning & milestone tracking',
      ],
    },
  ];

  // Coquilla Engineering Consultancy Data
  const coquillaCategories = [
    { name: 'Civil Works', count: 'Structural & Site Infrastructure' },
    { name: 'Government Biddings', count: 'Public Tenders & Cost Packages' },
    { name: 'Permit Processing', count: 'ECC & Building Permits' },
    { name: 'Engineering Consultancy', count: 'Feasibility & Project Costing' },
  ];

  const coquillaScopes = [
    {
      category: 'Cost Estimation & Feasibility',
      items: [
        'Prepared construction cost estimates, material take-offs, and feasibility studies for commercial, residential, and warehouse projects.',
        'Conducted baseline quantity surveys and budget breakdowns for private and public sector developments.',
        'Formulated comparative cost models to assist clients in material selection and value engineering.',
      ],
    },
    {
      category: 'Tenders & Cost Databases',
      items: [
        'Assisted in tender preparation, cost forecasting, and maintaining cost databases for future project benchmarking.',
        'Compiled government bidding documents, technical specifications, and contractor bid evaluation matrices.',
        'Structured milestone cash-flow projections and unit-rate analyses for competitive bidding.',
      ],
    },
    {
      category: 'Permits, Compliance & Site Supervision',
      items: [
        'Coordinated permit processing, regulatory compliance, and site supervision to ensure projects followed approved plans, quality standards, and schedules.',
        'Facilitated Environmental Compliance Certificates (ECC) and Local Government Building Permit applications.',
        'Conducted on-site engineering inspections to verify structural alignment, trade coordination, and quality standards.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 bg-transparent relative scroll-mt-20">
      {/* Background Subtle Neutral Ambient */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="text-xs font-apple-mono text-[#CC8400] uppercase tracking-widest font-semibold">
              02 / Professional Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight font-apple-display">
            Industry experience across construction trades.
          </h2>
          <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
            Hands-on preconstruction, commercial estimating, and engineering consultancy across active construction and consulting firms.
          </p>
        </div>

        <div className="flex flex-col gap-10">

          {/* TIMELINE CARD 1: DeepBluee Swimming Pool Builders */}
          <div className="rounded-3xl overflow-hidden liquid-card border border-black/[0.07] dark:border-white/[0.09] shadow-xl flex flex-col">
            
            {/* Card Section Header */}
            <div className="px-5 py-3.5 bg-[#F7F7F8]/80 dark:bg-[#121215]/80 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-apple-mono uppercase tracking-wider text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
                Career Timeline
              </span>
              <span className="text-[11px] font-apple-mono text-[#CC8400] font-medium">
                Commercial Estimating
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
              
              {/* Card Top Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-black/[0.05] dark:border-white/[0.06] pb-6">
                <div className="flex flex-col gap-2.5">
                  {/* Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#CC8400]/10 border border-[#CC8400]/30 text-xs font-apple-text text-[#CC8400] font-semibold">
                      Construction Estimator
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-xs font-apple-text text-[#1A1A1A] dark:text-[#E0E0E0] flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CC8400] animate-pulse" />
                      3 Years (2022 – 2025)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#CC8400]" />
                      Tagum City, Philippines
                    </span>
                  </div>
                  
                  {/* Company Name */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display tracking-tight">
                    DeepBluee Swimming Pool Builders
                  </h3>
                  
                  {/* Role & Scope Description */}
                  <p className="text-xs sm:text-sm font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E]">
                    Civil Engineering Preconstruction, Cost Estimating & BOQ Derivations
                  </p>
                </div>

                {/* Right Meta Highlight Box */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 p-3 sm:p-3.5 rounded-2xl liquid-glass border border-black/[0.06] dark:border-white/[0.08] shrink-0 self-start lg:self-center">
                  <div className="flex items-center gap-1.5 text-xs font-apple-mono text-[#1A1A1A] dark:text-[#E0E0E0]">
                    <Calendar className="w-3.5 h-3.5 text-[#CC8400]" />
                    <span className="font-semibold">Nov 2022 – Dec 2025</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FF5600]/10 border border-[#FF5600]/25 text-[11px] font-apple-mono font-semibold text-[#FF5600]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5600]" />
                    60+ Projects Handled
                  </span>
                </div>
              </div>

              {/* PlanSwift, Bluebeam & Microsoft Excel Callout Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl liquid-glass border border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center -space-x-2 shrink-0">
                    <img
                      src="/assets/software/planswift-logo.png"
                      alt="PlanSwift"
                      className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-[#121214] p-1.5 border border-black/[0.08] dark:border-white/[0.1] shadow-xs relative z-30"
                    />
                    <img
                      src="/assets/software/bluebeam-logo.png"
                      alt="Bluebeam"
                      className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-[#121214] p-1.5 border border-black/[0.08] dark:border-white/[0.1] shadow-xs relative z-20"
                    />
                    <img
                      src="/assets/software/excel-logo.svg"
                      alt="Microsoft Excel"
                      className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-[#121214] p-1.5 border border-black/[0.08] dark:border-white/[0.1] shadow-xs relative z-10"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-text">
                      PlanSwift, Bluebeam & Microsoft Excel
                    </span>
                    <span className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] font-apple-text">
                      Used across 3 years of commercial estimating to perform digital quantity take-offs, BOQ derivations, and cost estimates for swimming pools, houses, and warehouses.
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Exposure Categories */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
                  Project Exposure Categories
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {deepblueeCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] hover:border-[#FF5600]/40 transition-all flex flex-col gap-1 shadow-2xs"
                    >
                      <span className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
                        {cat.name}
                      </span>
                      <span className="text-[11px] font-apple-mono text-[#CC8400] font-medium">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope Breakdown Toggle Button */}
              <div className="border-t border-black/[0.05] dark:border-white/[0.06] pt-4">
                <button
                  type="button"
                  onClick={() => setDeepblueeOpen(!deepblueeOpen)}
                  className="flex items-center justify-between w-full text-left py-2 text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors cursor-pointer font-medium"
                >
                  <span>Detailed Professional Responsibilities & Scope Handled</span>
                  <div className="flex items-center gap-1.5 text-[#CC8400] font-semibold">
                    <span>{deepblueeOpen ? 'Hide' : 'Expand'}</span>
                    {deepblueeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Detailed Grid */}
                {deepblueeOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 animate-in fade-in duration-200">
                    {deepblueeScopes.map((scope) => (
                      <div
                        key={scope.category}
                        className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] flex flex-col gap-3.5 shadow-2xs"
                      >
                        <span className="text-xs font-semibold text-[#CC8400] font-apple-text">
                          {scope.category}
                        </span>
                        <ul className="flex flex-col gap-2.5">
                          {scope.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#CC8400] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* TIMELINE CARD 2: Coquilla Engineering Consultancy and Allied Services */}
          <div className="rounded-3xl overflow-hidden liquid-card border border-black/[0.07] dark:border-white/[0.09] shadow-xl flex flex-col">
            
            {/* Card Section Header */}
            <div className="px-5 py-3.5 bg-[#F7F7F8]/80 dark:bg-[#121215]/80 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-apple-mono uppercase tracking-wider text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
                Career Timeline
              </span>
              <span className="text-[11px] font-apple-mono text-[#CC8400] font-medium">
                Engineering Consultancy
              </span>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
              
              {/* Card Top Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-black/[0.05] dark:border-white/[0.06] pb-6">
                <div className="flex flex-col gap-2.5">
                  {/* Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#CC8400]/10 border border-[#CC8400]/30 text-xs font-apple-text text-[#CC8400] font-semibold">
                      Consulting Engineer
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-xs font-apple-text text-[#1A1A1A] dark:text-[#E0E0E0] flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CC8400]" />
                      1 Year (2021 – 2022)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#CC8400]" />
                      Tagum City, Philippines
                    </span>
                  </div>
                  
                  {/* Company Name */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display tracking-tight">
                    Coquilla Engineering Consultancy and Allied Services
                  </h3>
                  
                  {/* Role & Scope Description */}
                  <p className="text-xs sm:text-sm font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E]">
                    Civil Works, Feasibility Studies, Regulatory Permitting & Site Supervision
                  </p>
                </div>

                {/* Right Meta Highlight Box */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 p-3 sm:p-3.5 rounded-2xl liquid-glass border border-black/[0.06] dark:border-white/[0.08] shrink-0 self-start lg:self-center">
                  <div className="flex items-center gap-1.5 text-xs font-apple-mono text-[#1A1A1A] dark:text-[#E0E0E0]">
                    <Calendar className="w-3.5 h-3.5 text-[#CC8400]" />
                    <span className="font-semibold">Oct 2021 – Sep 2022</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FF5600]/10 border border-[#FF5600]/25 text-[11px] font-apple-mono font-semibold text-[#FF5600]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5600]" />
                    Civil & Public Biddings
                  </span>
                </div>
              </div>

              {/* AutoCAD, EPANET & SketchUp Callout Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl liquid-glass border border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center -space-x-2 shrink-0">
                    <img
                      src="/assets/software/autocad-logo.svg"
                      alt="AutoCAD"
                      className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-[#121214] p-1.5 border border-black/[0.08] dark:border-white/[0.1] shadow-xs relative z-30"
                    />
                    <img
                      src="/assets/software/epanet-logo.svg"
                      alt="EPANET"
                      className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-[#121214] p-1 border border-black/[0.08] dark:border-white/[0.1] shadow-xs relative z-20"
                    />
                    <img
                      src="/assets/software/sketchup-logo.svg"
                      alt="SketchUp"
                      className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-[#121214] p-1.5 border border-black/[0.08] dark:border-white/[0.1] shadow-xs relative z-10"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-text">
                      AutoCAD, EPANET & SketchUp
                    </span>
                    <span className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] font-apple-text">
                      Utilized for drafting 2D construction drawings, pipeline hydraulic modeling, and architectural 3D rendering alongside permit documentation packages.
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Exposure Categories */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E] font-semibold">
                  Project Exposure Categories
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {coquillaCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] hover:border-[#FF5600]/40 transition-all flex flex-col gap-1 shadow-2xs"
                    >
                      <span className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
                        {cat.name}
                      </span>
                      <span className="text-[11px] font-apple-mono text-[#CC8400] font-medium">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope Breakdown Toggle Button */}
              <div className="border-t border-black/[0.05] dark:border-white/[0.06] pt-4">
                <button
                  type="button"
                  onClick={() => setCoquillaOpen(!coquillaOpen)}
                  className="flex items-center justify-between w-full text-left py-2 text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-[#E0E0E0] transition-colors cursor-pointer font-medium"
                >
                  <span>Detailed Professional Responsibilities & Scope Handled</span>
                  <div className="flex items-center gap-1.5 text-[#CC8400] font-semibold">
                    <span>{coquillaOpen ? 'Hide' : 'Expand'}</span>
                    {coquillaOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Detailed Grid */}
                {coquillaOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 animate-in fade-in duration-200">
                    {coquillaScopes.map((scope) => (
                      <div
                        key={scope.category}
                        className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07] flex flex-col gap-3.5 shadow-2xs"
                      >
                        <span className="text-xs font-semibold text-[#CC8400] font-apple-text">
                          {scope.category}
                        </span>
                        <ul className="flex flex-col gap-2.5">
                          {scope.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#CC8400] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

