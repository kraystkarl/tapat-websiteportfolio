import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Check, 
  Calculator, 
  FolderKanban, 
  PenTool, 
  MessageSquare, 
  FileText, 
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Grid,
  SlidersHorizontal
} from 'lucide-react';
import { MethodologyStep } from '../types';

interface SoftwareItem {
  name: string;
  role: string;
  badge?: string;
  logo: string;
}

interface SoftwareCategory {
  id: string;
  code: string;
  title: string;
  shortName: string;
  scopeSummary: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: SoftwareItem[];
}

export const ToolsAndMethodologySection: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [activeDisciplineIndex, setActiveDisciplineIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'deck' | 'matrix'>('deck');

  const softwareCategories: SoftwareCategory[] = [
    {
      id: 'estimating',
      code: '01',
      title: 'Estimating & Quantity Take-off',
      shortName: 'Estimating',
      scopeSummary: 'Plan calibration, digital take-offs, BOQ derivations & formula lineage',
      icon: Calculator,
      tools: [
        {
          name: 'PlanSwift',
          role: 'Commercial Take-offs (3 Yrs)',
          badge: 'DeepBluee (60+ Projects)',
          logo: '/assets/software/planswift-logo.svg',
        },
        {
          name: 'Bluebeam Revu',
          role: 'Digital Take-offs & Markups',
          badge: 'Proof Pack Calibration',
          logo: '/assets/software/bluebeam-logo.svg',
        },
        {
          name: 'Microsoft Excel',
          role: 'BOQ & Calculation Lineage',
          badge: 'Dynamic Formula Arrays',
          logo: '/assets/software/excel-logo.svg',
        },
      ],
    },
    {
      id: 'coordination',
      code: '02',
      title: 'Project Coordination',
      shortName: 'Coordination',
      scopeSummary: 'Cross-functional alignment, subcontractor tracking & milestone schedules',
      icon: FolderKanban,
      tools: [
        {
          name: 'Google Workspace',
          role: 'Cloud Sheets & Team Collab',
          badge: 'Real-Time Sharing',
          logo: '/assets/software/google-workspace-logo.svg',
        },
        {
          name: 'Microsoft Excel',
          role: 'Project Tracking & Schedules',
          badge: 'Milestone Matrices',
          logo: '/assets/software/excel-logo.svg',
        },
      ],
    },
    {
      id: 'design',
      code: '03',
      title: 'Design & Rendering',
      shortName: 'Design & 3D',
      scopeSummary: '2D blueprint drafting, 3D structural modeling & architectural renders',
      icon: PenTool,
      tools: [
        {
          name: 'AutoCAD',
          role: '2D Construction Drawings',
          badge: 'Plans & Section Cuts',
          logo: '/assets/software/autocad-logo.svg',
        },
        {
          name: 'SketchUp',
          role: '3D Spatial Modeling',
          badge: 'Volumetric Layouts',
          logo: '/assets/software/sketchup-logo.svg',
        },
        {
          name: 'Lumion',
          role: 'Architectural Rendering',
          badge: 'Photorealistic Visuals',
          logo: '/assets/software/lumion-logo.svg',
        },
      ],
    },
    {
      id: 'communication',
      code: '04',
      title: 'Communication & Collaboration',
      shortName: 'Communication',
      scopeSummary: 'Contractor coordination, video conferencing & formal RFI records',
      icon: MessageSquare,
      tools: [
        {
          name: 'Zoom',
          role: 'Video Conferences & Briefs',
          badge: 'Screen Shares',
          logo: '/assets/software/zoom-logo.svg',
        },
        {
          name: 'Google Meet',
          role: 'Client & Virtual Meetings',
          badge: 'Team Syncs',
          logo: '/assets/software/meet-logo.svg',
        },
        {
          name: 'Microsoft Teams',
          role: 'Contractor & Team Hub',
          badge: 'Enterprise Collab',
          logo: '/assets/software/teams-logo.svg',
        },
        {
          name: 'WhatsApp',
          role: 'Direct Messaging & Site Comms',
          badge: 'Field Comms',
          logo: '/assets/software/whatsapp-logo.svg',
        },
        {
          name: 'Gmail',
          role: 'Official Correspondence & RFIs',
          badge: 'Tender Submissions',
          logo: '/assets/software/gmail-logo.svg',
        },
      ],
    },
    {
      id: 'productivity',
      code: '05',
      title: 'Documentation & Productivity',
      shortName: 'Productivity',
      scopeSummary: 'Technical specifications, presentation decks, cloud archives & schedules',
      icon: FileText,
      tools: [
        {
          name: 'Microsoft Word',
          role: 'Technical Specs & Contracts',
          badge: 'Specification Docs',
          logo: '/assets/software/word-logo.svg',
        },
        {
          name: 'PowerPoint',
          role: 'Tender & Client Presentations',
          badge: 'Executive Decks',
          logo: '/assets/software/powerpoint-logo.svg',
        },
        {
          name: 'Google Drive',
          role: 'Cloud Archive & File Vault',
          badge: 'Permission Control',
          logo: '/assets/software/drive-logo.svg',
        },
        {
          name: 'Google Calendar',
          role: 'Tender Deadlines & Milestones',
          badge: 'Bid Milestones',
          logo: '/assets/software/calendar-logo.svg',
        },
        {
          name: 'Canva',
          role: 'Visual Reports & Collateral',
          badge: 'Graphic Layouts',
          logo: '/assets/software/canva-logo.svg',
        },
      ],
    },
    {
      id: 'hobbies',
      code: '06',
      title: 'Hobbies & Creative Media',
      shortName: 'Hobbies & Media',
      scopeSummary: 'Video editing, multi-track color grading, visual branding & AI agents',
      icon: Sparkles,
      tools: [
        {
          name: 'Adobe Premiere Pro',
          role: 'Video Editing & Timelines',
          badge: 'Post-Production',
          logo: '/assets/software/premiere-logo.svg',
        },
        {
          name: 'DaVinci Resolve',
          role: 'Color Grading & Post-Production',
          badge: 'Color Science',
          logo: '/assets/software/davinci-logo.svg',
        },
        {
          name: 'Canva',
          role: 'Graphic Layouts & Creative Design',
          badge: 'Visual Identity',
          logo: '/assets/software/canva-logo.svg',
        },
        {
          name: 'AI Tools & Agents',
          role: 'Prompting & Workflow Automation',
          badge: 'Efficiency Multipliers',
          logo: '/assets/software/ai-tools-logo.svg',
        },
      ],
    },
  ];

  const methodologySteps: MethodologyStep[] = [
    {
      number: '01',
      title: 'Review & Verify Documents',
      shortDesc: 'Verify drawing registers, sheet revisions, scale bars, and scope completeness before measuring.',
      details: [
        'Check sheet revisions, addenda, and drawing issue registers.',
        'Verify drawing scale bars and dimension consistency across plan views.',
        'Review general notes, discipline legends, and trade boundary demarcations.',
      ],
    },
    {
      number: '02',
      title: 'Read & Interpret Plans, Specifications & Scope',
      shortDesc: 'Dissect architectural and structural drawings, trade schedules, and technical specifications.',
      details: [
        'Cross-reference plan views against sectional cuts, elevations, and detail drawings.',
        'Examine door, window, finish, and fixture schedule tables.',
        'Extract project-specific specification clauses and mandatory material requirements.',
      ],
    },
    {
      number: '03',
      title: 'Identify Gaps, Conflicts & Clarifications',
      shortDesc: 'Log discrepancies, missing details, or schedule contradictions into an itemized RFI tracker.',
      details: [
        'Identify schedule contradictions (e.g. plan callouts vs schedule note sizes).',
        'Flag unannotated assemblies or ambiguous trade interfaces.',
        'Document clear, actionable Requests for Information (RFIs) with sheet references.',
      ],
    },
    {
      number: '04',
      title: 'Establish Bid Basis & Take-Off Plan',
      shortDesc: 'Define scale calibrations, naming conventions, waste factors, and measurement layer structures.',
      details: [
        'Calibrate digital measuring tools against verified sheet dimensions.',
        'Set up standardized trade layers, color codes, and subject markups.',
        'Determine standard waste factors and pitch multipliers for complex geometries.',
      ],
    },
    {
      number: '05',
      title: 'Perform Quantity Take-Offs',
      shortDesc: 'Execute systematic count, area, linear, and perimeter measurements using calibrated tools.',
      details: [
        'Measure floor, wall, ceiling, landscape, and roofing areas.',
        'Execute itemized counts for fixtures, doors, windows, and assemblies.',
        'Capture linear cornices, skirtings, kerbs, and perimeter wall lengths.',
      ],
    },
    {
      number: '06',
      title: 'Build BOQ & Estimating Structure',
      shortDesc: 'Structure measurements into trade-by-trade Bill of Quantities with standardized descriptions and units.',
      details: [
        'Organize line items by CSI or standard trade breakdown codes.',
        'Assign precise units (m², m³, linear meters, counts, items).',
        'Incorporate unit pricing, material rates, and labor allowances where applicable.',
      ],
    },
    {
      number: '07',
      title: 'Develop, Check & Reconcile the Estimate',
      shortDesc: 'Perform mathematical checks, cross-reconcile take-off totals to BOQ, and verify formula integrity.',
      details: [
        'Audit spreadsheet formula lineage from source measurement to total amount.',
        'Reconcile raw take-off summaries against BOQ line item totals.',
        'Conduct cross-check reviews to catch transposition or omission errors.',
      ],
    },
    {
      number: '08',
      title: 'Tender / Bid Preparation & Final Review',
      shortDesc: 'Compile a clear, review-ready package including BOQ, RFI summary, QC matrix, and audit trails.',
      details: [
        'Assemble presentation-ready PDF deliverables and review-ready workbooks.',
        'Include qualification notes, documented assumptions, and RFI summaries.',
        'Ensure direct CSV traceability from plan markup to pricing lines.',
      ],
    },
  ];

  return (
    <section id="methodology" className="py-20 sm:py-28 bg-transparent border-t border-b border-black/[0.06] dark:border-white/[0.08] relative scroll-mt-20">
      {/* Fallback Anchors for Direct Navigation */}
      <div id="tools" className="absolute -top-24 pointer-events-none" />
      <div id="process" className="absolute -top-24 pointer-events-none" />
      <div id="methodology-process" className="absolute -top-24 pointer-events-none" />
      <div id="estimating-methodology" className="absolute -top-24 pointer-events-none" />
      
      {/* Background Ambient Neutral Light */}
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-black/[0.02] dark:from-white/[0.02] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="text-xs font-apple-mono text-[#CC8400] uppercase tracking-widest font-semibold">
              03 / Methodology & Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] leading-tight font-apple-display">
            Working tools used with purpose & a disciplined approach.
          </h2>
          <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
            Distinguishing commercial software experience from demonstration workflows, alongside an 8-stage estimating methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* LEFT: Established Working Tools & Software Stack */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Architectural Workstation Header & View Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CC8400] animate-pulse" />
                  <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display tracking-tight">
                    Software Stack
                  </h3>
                </div>
                <span className="text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E]">
                  6 Specialized Disciplines · 20 Software Tools
                </span>
              </div>

              {/* View Toggle: Deck vs Matrix */}
              <div className="inline-flex p-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07]">
                <button
                  type="button"
                  onClick={() => setViewMode('deck')}
                  title="Interactive Discipline Deck (Zero Scroll)"
                  className={`px-2.5 py-1 rounded-lg text-xs font-apple-text font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'deck'
                      ? 'bg-[#CC8400] text-white shadow-xs'
                      : 'text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-white'
                  }`}
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span className="hidden sm:inline">Discipline Deck</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('matrix')}
                  title="Master Matrix (All 6 at once)"
                  className={`px-2.5 py-1 rounded-lg text-xs font-apple-text font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'matrix'
                      ? 'bg-[#CC8400] text-white shadow-xs'
                      : 'text-[#4A4A4A] dark:text-[#9E9E9E] hover:text-[#1A1A1A] dark:hover:text-white'
                  }`}
                >
                  <Grid className="w-3 h-3" />
                  <span className="hidden sm:inline">Master Matrix</span>
                </button>
              </div>
            </div>

            {viewMode === 'deck' ? (
              <div className="flex flex-col gap-4">
                
                {/* 6-Discipline Architectural Selector Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {softwareCategories.map((cat, idx) => {
                    const isSelected = activeDisciplineIndex === idx;
                    const IconComp = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveDisciplineIndex(idx)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 relative ${
                          isSelected
                            ? 'bg-[#CC8400]/10 border-[#CC8400] dark:border-[#CC8400] shadow-xs'
                            : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.05] dark:border-white/[0.07] hover:border-[#CC8400]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-[10px] font-apple-mono font-bold ${
                            isSelected ? 'text-[#CC8400]' : 'text-[#4A4A4A] dark:text-[#9E9E9E]'
                          }`}>
                            {cat.code}
                          </span>
                          <span className="text-[10px] font-apple-mono px-1.5 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] text-[#4A4A4A] dark:text-[#9E9E9E]">
                            {cat.tools.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected 
                              ? 'bg-[#CC8400] text-white' 
                              : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#4A4A4A] dark:text-[#9E9E9E]'
                          }`}>
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-xs font-apple-display font-semibold truncate ${
                            isSelected ? 'text-[#1A1A1A] dark:text-white' : 'text-[#4A4A4A] dark:text-[#9E9E9E]'
                          }`}>
                            {cat.shortName}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#CC8400] rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Showcase Card */}
                {(() => {
                  const activeCat = softwareCategories[activeDisciplineIndex];
                  const ActiveIcon = activeCat.icon;
                  return (
                    <div className="p-5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] shadow-sm flex flex-col gap-4">
                      
                      {/* Active Discipline Header */}
                      <div className="flex flex-col gap-1 pb-3 border-b border-black/[0.05] dark:border-white/[0.06]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-apple-mono text-[#CC8400] font-bold px-2 py-0.5 rounded-full bg-[#CC8400]/10 border border-[#CC8400]/25">
                              Discipline {activeCat.code}
                            </span>
                            <span className="text-xs font-apple-mono text-[#4A4A4A] dark:text-[#9E9E9E]">
                              {activeCat.tools.length} Tools Included
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-xl bg-black/[0.03] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-center text-[#CC8400]">
                            <ActiveIcon className="w-4 h-4" />
                          </div>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display mt-1">
                          {activeCat.title}
                        </h4>
                        <p className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] font-apple-text">
                          {activeCat.scopeSummary}
                        </p>
                      </div>

                      {/* Active Tools Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeCat.tools.map((tool) => (
                          <div
                            key={tool.name}
                            className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] hover:border-[#FF5600]/30 transition-all flex items-start gap-3 group"
                          >
                            <img
                              src={tool.logo}
                              alt={tool.name}
                              className="w-8 h-8 object-contain rounded-lg bg-white dark:bg-black/40 p-1 border border-black/[0.05] dark:border-white/[0.08] shadow-2xs shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-text truncate">
                                {tool.name}
                              </span>
                              <span className="text-[11px] text-[#4A4A4A] dark:text-[#9E9E9E] font-apple-text line-clamp-1">
                                {tool.role}
                              </span>
                              {tool.badge && (
                                <span className="mt-1 inline-flex items-center text-[9px] font-apple-mono px-1.5 py-0.5 rounded bg-black/[0.03] dark:bg-white/[0.05] text-[#CC8400] w-fit border border-black/[0.03] dark:border-white/[0.05]">
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Stepper Navigation Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] dark:border-white/[0.05] text-xs font-apple-text text-[#4A4A4A] dark:text-[#9E9E9E]">
                        <button
                          type="button"
                          onClick={() => setActiveDisciplineIndex((prev) => (prev === 0 ? softwareCategories.length - 1 : prev - 1))}
                          className="flex items-center gap-1 hover:text-[#CC8400] transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.04]"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Prev</span>
                        </button>
                        
                        <span className="font-apple-mono text-[11px]">
                          {activeDisciplineIndex + 1} of {softwareCategories.length} Disciplines
                        </span>

                        <button
                          type="button"
                          onClick={() => setActiveDisciplineIndex((prev) => (prev === softwareCategories.length - 1 ? 0 : prev + 1))}
                          className="flex items-center gap-1 hover:text-[#CC8400] transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.04]"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })()}

              </div>
            ) : (
              /* Master Matrix (Compact 6-discipline overview) */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {softwareCategories.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <div
                      key={cat.id}
                      className="p-3.5 rounded-2xl liquid-card border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-2.5 shadow-2xs hover:border-[#CC8400]/40 transition-all cursor-pointer"
                      onClick={() => {
                        setActiveDisciplineIndex(softwareCategories.findIndex(c => c.id === cat.id));
                        setViewMode('deck');
                      }}
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.04] dark:border-white/[0.05]">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-black/[0.03] dark:bg-white/[0.05] flex items-center justify-center text-[#CC8400]">
                            <IconComp className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
                            {cat.shortName}
                          </span>
                        </div>
                        <span className="text-[10px] font-apple-mono text-[#CC8400] font-semibold">
                          {cat.tools.length} Tools
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        {cat.tools.map((t) => (
                          <div key={t.name} className="flex items-center gap-2 text-xs font-apple-text text-[#1A1A1A] dark:text-[#E0E0E0]">
                            <img src={t.logo} alt={t.name} className="w-4 h-4 object-contain" />
                            <span className="font-medium truncate">{t.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* RIGHT: How I Approach an Estimating Assignment */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-[#E0E0E0] font-apple-display">
                How I approach an estimating assignment
              </h3>
              <span className="text-xs font-apple-mono text-[#CC8400] font-semibold">
                8-Stage Methodology
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {methodologySteps.map((step, idx) => {
                const isOpen = activeAccordion === idx;
                return (
                  <div
                    key={step.number}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'liquid-card border-[#FF5600]/50 dark:border-[#FF5600]/50 shadow-md ring-1 ring-[#FF5600]/20'
                        : 'liquid-card border-black/[0.06] dark:border-white/[0.08] hover:border-[#CC8400]/40'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveAccordion(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className={`text-xs font-apple-mono px-2.5 py-0.5 rounded-full shadow-xs ${
                          isOpen ? 'bg-[#FF5600] text-white font-bold' : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#4A4A4A] dark:text-[#9E9E9E] font-bold'
                        }`}>
                          {step.number}
                        </span>
                        <div className="flex flex-col">
                          <span className={`text-sm sm:text-base font-semibold font-apple-display ${
                            isOpen ? 'text-[#1A1A1A] dark:text-[#E0E0E0]' : 'text-[#1A1A1A]/90 dark:text-[#E0E0E0]/90'
                          }`}>
                            {step.title}
                          </span>
                          <span className="text-xs text-[#4A4A4A] dark:text-[#9E9E9E] mt-0.5 leading-relaxed font-apple-text">
                            {step.shortDesc}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`p-1.5 rounded-xl flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-[#FF5600]/15 text-[#FF5600]' : 'text-[#6B7280] dark:text-[#737373]'
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-black/[0.05] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.02]">
                        <ul className="flex flex-col gap-2.5 pt-3">
                          {step.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5 text-xs text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed font-apple-text">
                              <Check className="w-3.5 h-3.5 text-[#CC8400] flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

