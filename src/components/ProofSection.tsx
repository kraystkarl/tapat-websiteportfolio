import React, { useState } from 'react';
import {
  CheckCircle2,
  ZoomIn,
  Layers,
  ShieldCheck,
  Maximize2,
  FileText,
  Check,
  ChevronRight,
  Calculator,
  Table,
  FileQuestion,
  Link2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ProofStepItem } from '../types';
import { PdfCanvasViewer } from './PdfCanvasViewer';

interface ProofSectionProps {
  onInspectDocument: (item: {
    src: string;
    title: string;
    category?: string;
    description?: string;
    isPdf?: boolean;
    pages?: number;
  }) => void;
  onNavigateSection?: (index: number) => void;
}

export const ProofSection: React.FC<ProofSectionProps> = ({
  onInspectDocument,
  onNavigateSection,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeTakeoffSubIndex, setActiveTakeoffSubIndex] = useState(0);

  /* ---- Project index gateway (prepended; existing showcase below is untouched) ---- */
  type ServiceFilter = 'all' | 'estimating' | 'coordination';
  const [projectFilter, setProjectFilter] = useState<ServiceFilter>('all');

  const caseFiles = [
    {
      id: 'au-timber-frame',
      name: 'AU Timber Frame',
      type: 'Architectural Estimating',
      service: 'estimating' as const,
      serviceLabel: 'Construction Estimating',
      media: '/assets/proof/plan-calibration.jpg',
      blurb: 'Timber-frame residence · full take-off → BOQ → QC trail',
    },
  ];

  const visibleFiles = caseFiles.filter(
    (file) => projectFilter === 'all' || file.service === projectFilter,
  );

  /* Interface-only landing: the existing showcase renders after a selection. */
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const scrollProofTop = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById('proof')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const openShowcase = (id: string) => {
    setSelectedId(id);
    scrollProofTop();
  };

  const goBackToIndex = () => {
    setSelectedId(null);
    scrollProofTop();
  };

  // Authenticated Proof Steps - 100% Preserved from Original Evidence
  const proofSteps: ProofStepItem[] = [
    {
      id: 'step-01',
      stepNumber: '01',
      name: 'TAKE-OFF',
      tool: 'Bluebeam Revu',
      title: 'Plan Calibration & Digital Quantity Take-Offs',
      description: 'Scale verification across architectural sheets and digital polygon take-offs for landscape areas, floor/ceiling finishes, door/window counts, roofing pitch, and linear perimeters.',
      storyContext: {
        unclearOrGoal: 'Calibrate drawing scale accurately and measure all architectural components directly from vectorized PDF sheets.',
        actionTaken: 'Set calibrated dimensions on plan views; generated dedicated subject layers for landscape areas, door/window counts, ceiling/floor finishes, roof geometry, and cornice perimeters.',
        outcome: 'Precision quantities captured in Bluebeam Markups List ready for export with exact measurement types and visual redline boundaries.',
      },
      images: [
        {
          src: '/assets/proof/plan-calibration.jpg',
          title: 'Plan Calibration Verification',
          category: 'Bluebeam Revu · Scale Setting',
          description: 'Verifying known dimension scale before measuring to guarantee 100% geometric accuracy.',
        },
        {
          src: '/assets/proof/area-takeoff-landscape.jpg',
          title: 'Landscape & External Area Take-Off',
          category: 'Bluebeam Revu · Area Polygon',
          description: 'Color-coded area markups for softscape, hardscape, pavements, and garden boundaries.',
        },
        {
          src: '/assets/proof/area-takeoff-ceiling-floor.jpg',
          title: 'Ceiling & Floor Finishes Area Take-Off',
          category: 'Bluebeam Revu · Area Measurements',
          description: 'Room-by-room area take-offs for ceramic tile, timber flooring, and plasterboard ceiling linings.',
        },
        {
          src: '/assets/proof/count-takeoff-doors-windows.jpg',
          title: 'Door & Window Count Take-Off',
          category: 'Bluebeam Revu · Count Markups',
          description: 'Exact itemized schedule counting for internal/external doors, aluminium windows, and glazing.',
        },
        {
          src: '/assets/proof/roofing-take-off.jpg',
          title: 'Roofing Geometry & Pitch Take-Off',
          category: 'Bluebeam Revu · Rafter & Sheeting',
          description: 'Calculating plan roof areas and applying slope pitch multipliers for roof sheeting and insulation.',
        },
      ],
    },
    {
      id: 'step-02',
      stepNumber: '02',
      name: 'CALCULATION',
      tool: 'Microsoft Excel',
      title: 'Quantity Derivation & Formula Calculations',
      description: 'Translating raw measured values into true purchase and installation quantities by applying slope multipliers, pitch factors, and standard material waste percentages.',
      storyContext: {
        unclearOrGoal: 'Plan measurements represent flat nominal dimensions; actual material procurement requires slope adjustments and waste factors.',
        actionTaken: 'Built dynamic Excel formulas converting measured Bluebeam markup areas into derived quantities (e.g. Roof Area × Pitch Factor 1.05 + 8% Waste).',
        outcome: 'Transparent, formula-linked lineage from raw drawing measurement to calculated trade quantity.',
      },
      images: [
        {
          src: '/pdfs/06_CSV_Traceability.pdf',
          title: 'Formula Derivation & Quantity Calculations',
          category: 'Excel Pack · Calculation Lineage',
          description: 'Direct CSV takeoff support and formula derivation tracing raw Bluebeam export rows (lengths, areas, counts) into intermediate computation roles and final BOQ quantities with zero variance.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
    {
      id: 'step-03',
      stepNumber: '03',
      name: 'BOQ',
      tool: 'Microsoft Excel',
      title: 'Bill of Quantities (BOQ – Reviewed)',
      description: 'Structured, trade-by-trade BOQ organizing quantities into standardized line items, clear work descriptions, measurement units, unit rates, and total amounts.',
      storyContext: {
        unclearOrGoal: 'Transform derived quantities into an industry-standard format ready for pricing, contractor bidding, and client review.',
        actionTaken: 'Formatted quantities into itemized trade divisions (Demolition, Concrete, Carpentry, Finishes, Doors/Windows) with standardized descriptions and units.',
        outcome: 'A comprehensive, reviewed Bill of Quantities providing full transparency for tenders and budget approvals.',
      },
      images: [
        {
          src: '/pdfs/01_BOQ_Reviewed.pdf',
          title: 'BOQ Reviewed · Main Bill of Quantities',
          category: 'Excel Pack · Trade BOQ',
          description: 'Complete 3-page audited Bill of Quantities covering 11 architectural trade divisions with source lineage formulas and verification audit statuses.',
          isPdf: true,
          pages: 3,
        },
      ],
    },
    {
      id: 'step-04',
      stepNumber: '04',
      name: 'RFI',
      tool: 'Microsoft Excel',
      title: 'Request for Information (RFI – Demonstration)',
      description: 'Documenting plan queries and schedule discrepancies (e.g. door schedule contradictions between architectural floor plan and door schedule notes) to eliminate estimating ambiguity.',
      storyContext: {
        unclearOrGoal: 'Floor plan callouts indicated 900mm wide doors, while the door schedule specified 800mm leaf dimensions.',
        actionTaken: 'Logged an itemized RFI referencing drawing sheet numbers, pinpointing the contradiction, and proposing a documented basis of estimate pending clarification.',
        outcome: 'Preconstruction risk mitigated by eliminating guesswork before tender finalization.',
      },
      images: [
        {
          src: '/pdfs/03_RFI_Demonstration.pdf',
          title: 'RFI Demonstration · Door Schedule Discrepancy',
          category: 'Excel Pack · Preconstruction RFI',
          description: 'Itemized formal Request for Information highlighting conflicting architectural plan callouts vs door schedule dimensions.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
    {
      id: 'step-05',
      stepNumber: '05',
      name: 'QC',
      tool: 'Microsoft Excel',
      title: 'Quality Control Reconciliation Matrix',
      description: 'Side-by-side reconciliation table verifying that all raw take-off quantities match the final BOQ totals with zero variance.',
      storyContext: {
        unclearOrGoal: 'Ensure no quantity was omitted, doubled, or miscalculated during the transfer from digital markup to pricing spreadsheet.',
        actionTaken: 'Created a cross-checking reconciliation matrix comparing raw Bluebeam layer totals against final BOQ line quantities with automated variance flags.',
        outcome: 'Zero-variance confirmation and verified audit trail before tender submission.',
      },
      images: [
        {
          src: '/pdfs/02_QC_Reviewed.pdf',
          title: 'QC Reconciliation Matrix · Zero Variance Audit',
          category: 'Excel Pack · Quality Assurance',
          description: 'Side-by-side audit matrix reconciling raw takeoff sums against final BOQ line item quantities.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
    {
      id: 'step-06',
      stepNumber: '06',
      name: 'TRACEABILITY',
      tool: 'Microsoft Excel / CSV',
      title: 'CSV Takeoff Support & Audit Lineage',
      description: 'Direct mapping showing how every single Bluebeam markup row maps to its corresponding row in the pricing sheet.',
      storyContext: {
        unclearOrGoal: 'Provide an unbreakable audit trail so any client or commercial director can trace every penny back to a specific vector polygon.',
        actionTaken: 'Exported structured CSV markups data, maintaining unique Bluebeam Markup IDs and linking them directly into the Excel workbook columns.',
        outcome: 'Complete mathematical transparency and instant auditability for every single line item in the tender.',
      },
      images: [
        {
          src: '/pdfs/06_CSV_Traceability.pdf',
          title: 'CSV Takeoff Support · Full Traceability Audit',
          category: 'Excel Pack · Audit Trail',
          description: 'Direct CSV takeoff support mapping individual Bluebeam markup IDs directly into pricing workbook columns.',
          isPdf: true,
          pages: 1,
        },
      ],
    },
  ];

  const currentStep = proofSteps[activeStepIndex];
  const isTakeoffStep = activeStepIndex === 0;

  const stepIcons = [
    Layers,
    Calculator,
    Table,
    FileQuestion,
    ShieldCheck,
    Link2,
  ];

  return (
    <section
      id="proof"
      className="relative w-full flex flex-col justify-center py-8 sm:py-12 lg:py-16"
    >
      {/* Background Architectural CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-50" />
      <div className="absolute top-1/3 left-1/3 w-[700px] h-[450px] bg-radial from-[#FF5600]/[0.03] dark:from-[#FF5600]/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* =========================================================================
            PROJECT INDEX GATEWAY (initial view): hero + service filter + featured
            case file. Selecting a project reveals the existing showcase below.
            ========================================================================= */}
        {selectedId === null ? (
        <>
        <style>{`
          .gateway-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; box-shadow: 0 4px 20px -2px rgba(0,0,0,0.03); background: var(--card); border: 1px solid var(--card-border); }
          .gateway-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px -4px rgba(0,0,0,0.08); border-color: #CBD5E1; }
          .gateway-media img { transition: transform 0.4s ease; }
          .gateway-card:hover .gateway-media img { transform: scale(1.04); }
          .hero-cta-proof:hover { transform: scale(1.03); }
          .hero-cta-proof:active { transform: scale(0.97); }
          .dark .hero-cta-proof, [data-theme="dark"] .hero-cta-proof { border: 1px solid rgba(255,255,255,0.18); }
          @media (max-width: 1023px) { .gateway-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 639px) {
            .gateway-grid { grid-template-columns: 1fr !important; }
            .gateway-featured { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <div className="flex flex-col gap-4 mb-6 sm:mb-8">
          {/* Hero row: headline left, live count card right */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: '1 1 auto', minWidth: '260px' }}>
              <h2
                style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(36px, 4.5vw, 48px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.01em', color: 'var(--ink)', margin: 0 }}
              >
                Precision That Wins Bids. <span style={{ color: '#FF5600' }}>Portfolios That Prove It.</span>
              </h2>

              <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px', margin: 0, lineHeight: 1.6 }}>
                Dive into my complete estimating case files. See exactly how I price, audit, and
                coordinate projects for builders across the US and AU.
              </p>
            </div>

            <div
              className="gateway-card"
              style={{ borderRadius: '16px', padding: '14px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flexShrink: 0 }}
            >
              <span style={{ fontSize: '30px', fontWeight: 700, color: '#FF5600', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {String(visibleFiles.length).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>
                case file{visibleFiles.length === 1 ? '' : 's'}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--faint)' }}>Select below to open</span>
            </div>
          </div>

          {/* Service filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} role="tablist" aria-label="Filter case files by service">
            {[
              { id: 'all' as ServiceFilter, label: 'All Projects' },
              { id: 'estimating' as ServiceFilter, label: 'Construction Estimating' },
              { id: 'coordination' as ServiceFilter, label: 'Project Coordination' },
            ].map((tab) => {
              const isActive = projectFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setProjectFilter(tab.id)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: isActive ? 'none' : '1px solid var(--card-border)',
                    background: isActive ? '#FF5600' : 'var(--card)',
                    color: isActive ? '#FFFFFF' : 'var(--body)',
                    boxShadow: isActive ? '0 4px 14px rgba(255,86,0,0.35)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Featured case file + future slots */}
          {visibleFiles.length === 0 ? (
            <div
              style={{
                borderRadius: '20px', border: '1px dashed var(--card-border)',
                background: 'var(--card)', padding: '32px 24px', textAlign: 'center',
                display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>
                Coordination case files — posting soon
              </div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
                New coordination showcases will appear here as they are published.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Featured: first live case file */}
              {visibleFiles.slice(0, 1).map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => openShowcase(file.id)}
                  className="gateway-card gateway-featured"
                  style={{
                    borderRadius: '20px', padding: 0, overflow: 'hidden',
                    cursor: 'pointer', textAlign: 'left', width: '100%',
                    display: 'grid', gridTemplateColumns: '1.1fr 1fr',
                  }}
                  aria-label={`Open ${file.name} case file`}
                >
                  <span className="gateway-media gateway-featured-media" style={{ display: 'block', overflow: 'hidden', position: 'relative', background: '#0F172A', minHeight: '240px' }}>
                    <img
                      src={file.media}
                      alt={`${file.name} — ${file.type} highlight`}
                      loading="lazy"
                      draggable={false}
                      style={{ width: '100%', height: '100%', minHeight: '240px', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute', top: '12px', left: '12px',
                        fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                        color: '#FFFFFF', background: '#FF5600', padding: '4px 10px', borderRadius: '9999px',
                      }}
                    >
                      LIVE CASE FILE
                    </span>
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FF5600' }}>
                      {file.serviceLabel}
                    </span>
                    <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
                      {file.name}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--body)' }}>
                      {file.type}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
                      {file.blurb}
                    </span>
                    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
                      {['6-step audit trail', '5 take-off plates', '5 audit PDFs', 'Zero variance'].map((meta) => (
                        <span
                          key={meta}
                          style={{
                            fontSize: '11px', fontWeight: 600, color: 'var(--body)',
                            background: 'var(--pill)', border: '1px solid var(--card-border)',
                            padding: '4px 10px', borderRadius: '9999px', whiteSpace: 'nowrap',
                          }}
                        >
                          {meta}
                        </span>
                      ))}
                    </span>
                    <span style={{ marginTop: '6px' }}>
                      <span
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          background: 'var(--ink)', color: 'var(--canvas)', borderRadius: '9999px',
                          padding: '10px 20px', fontSize: '14px', fontWeight: 700,
                        }}
                      >
                        <span>Open case file</span>
                        <ArrowRight size={15} />
                      </span>
                    </span>
                  </span>
                </button>
              ))}

              {/* Future project slots (text only — no invented media) */}
              <div className="gateway-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {['Slot 02', 'Slot 03'].map((slot) => (
                  <div
                    key={slot}
                    style={{
                      borderRadius: '20px', border: '1px dashed var(--card-border)',
                      background: 'var(--card)', padding: '20px 22px',
                      display: 'flex', flexDirection: 'column', gap: '4px',
                    }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)' }}>
                      {slot} · Upcoming
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>
                      To be posted
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.55 }}>
                      The next case file will unlock here automatically.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        </>
        ) : (
        <>
          {/* Back bar: return to the project index (existing showcase follows, untouched) */}
          <div
            className="gateway-card"
            style={{ borderRadius: '16px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}
          >
            <button
              type="button"
              onClick={goBackToIndex}
              className="hero-cta-proof"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--ink)', color: 'var(--canvas)', borderRadius: '9999px',
                padding: '9px 18px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
            >
              <ArrowRight size={15} style={{ transform: 'rotate(180deg)' }} />
              <span>All projects</span>
            </button>
            <span style={{ width: '1px', alignSelf: 'stretch', background: 'var(--card-border)' }} aria-hidden />
            <span style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>AU Timber Frame</span>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Architectural Estimating · full case file below</span>
            </span>
          </div>

        {/* =========================================================================
            SECTION HEADER: Clear Information Architecture & Dossier Framing
            ========================================================================= */}
        <div className="flex flex-col gap-3 mb-6 sm:mb-8 border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="section-kicker">
                <span className="kicker-badge">04</span>
                <span>PROTECTED WORKFLOW · ESTIMATING AUDIT PACK</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-space text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>100% FORMULA TRACEABLE</span>
              </span>
              <span className="text-[10px] font-space text-[#7A7A85] dark:text-[#9A9AA6] hidden sm:inline-block">
                6 Sequential Steps
              </span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-anton text-[#1A1A1A] dark:text-[#F4F4F1] leading-[1.02] tracking-tight uppercase mt-1">
            PROOF OF QA & <span className="text-[#FF5600]">CASE-FILE AUDIT</span> RECORD.
          </h2>

          <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#9E9E9E] leading-relaxed max-w-3xl font-manrope">
            A complete preconstruction estimating record: from calibrated Bluebeam drawings to formula-linked Excel derivations, reviewed trade BOQ schedules, RFI issue logs, zero-variance QC matrices, and CSV markup lineage.
          </p>
        </div>

        {/* =========================================================================
            STAGE SELECTOR: 6 Modular Workflow Steps (Predictable Stepper)
            ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {proofSteps.map((step, idx) => {
            const Icon = stepIcons[idx];
            const isCurrent = activeStepIndex === idx;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setActiveStepIndex(idx);
                  if (idx === 0) setActiveTakeoffSubIndex(0);
                }}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between gap-2 border relative group ${
                  isCurrent
                    ? 'bg-[#111115] text-white dark:bg-white dark:text-[#0B0B0E] border-transparent shadow-md'
                    : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.08] dark:border-white/[0.08] text-[#4A4A4A] dark:text-[#A0A0AD] hover:border-[#FF5600]/40 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isCurrent
                        ? 'bg-[#FF5600] text-white'
                        : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#7A7A85] dark:text-[#9A9AA6] group-hover:text-[#FF5600]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`text-[10px] font-space font-bold ${
                      isCurrent
                        ? 'text-[#FF5600]'
                        : 'text-[#8A8A95] dark:text-[#6E6E7A]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold font-manrope truncate leading-tight">
                    {step.name}
                  </span>
                  <span
                    className={`text-[10px] font-space truncate ${
                      isCurrent
                        ? 'text-white/75 dark:text-black/70'
                        : 'text-[#8A8A95] dark:text-[#6E6E7A]'
                    }`}
                  >
                    {step.tool}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            THE CASE-FILE RECORD: Structured Technical Audit Breakdown + Evidence
            ========================================================================= */}
        <div id="proof-showcase" className="rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.03] p-5 sm:p-7 shadow-sm">
          
          {/* Record Dossier Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-space text-[#FF5600] uppercase font-bold tracking-wider">
                  CASE-FILE RECORD {currentStep.stepNumber} OF 06
                </span>
                <span className="text-[10px] font-space px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#666672] dark:text-[#9999A8]">
                  {currentStep.tool}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#111114] dark:text-[#F0F0F4] font-manrope mt-0.5">
                {currentStep.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const itemToInspect = isTakeoffStep
                    ? currentStep.images[activeTakeoffSubIndex]
                    : currentStep.images[0];
                  onInspectDocument(itemToInspect);
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF5600] text-white text-xs font-manrope font-bold hover:bg-[#E04D00] active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect Full Screen</span>
              </button>
            </div>
          </div>

          {/* Record Content: 2-Column Split (Audit Breakdown & Visual Evidence) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-6">
            
            {/* LEFT COLUMN: The Technical Audit Narrative (Goal -> Action -> Outcome) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              <p className="text-xs sm:text-sm text-[#4A4A4A] dark:text-[#9E9E9E] font-manrope leading-relaxed">
                {currentStep.description}
              </p>

              {/* The 3-Part Technical Audit Breakdown */}
              <div className="flex flex-col gap-2.5">
                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-space text-[#FF5600] font-bold uppercase tracking-wider">
                      01. What Was Reviewed (Goal)
                    </span>
                  </div>
                  <p className="text-xs text-[#2A2A32] dark:text-[#D0D0D8] font-manrope leading-relaxed">
                    {currentStep.storyContext.unclearOrGoal}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-space text-[#FF5600] font-bold uppercase tracking-wider">
                      02. What Was Checked (Action Taken)
                    </span>
                  </div>
                  <p className="text-xs text-[#2A2A32] dark:text-[#D0D0D8] font-manrope leading-relaxed">
                    {currentStep.storyContext.actionTaken}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-space text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>03. What Was Produced (Outcome)</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#2A2A32] dark:text-[#D0D0D8] font-manrope leading-relaxed">
                    {currentStep.storyContext.outcome}
                  </p>
                </div>
              </div>

              {/* Record Metadata Specs */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] text-[11px] font-space text-[#666672] dark:text-[#9999A8]">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider opacity-70">Software</span>
                  <span className="font-bold text-[#111114] dark:text-[#F0F0F4]">{currentStep.tool}</span>
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-wider opacity-70">Audit Result</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Zero Variance</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: The Protected Evidence Viewport */}
            <div className="lg:col-span-7 w-full flex flex-col gap-3">
              
              {isTakeoffStep ? (
                /* Step 01: Bluebeam 5 Architectural Plates with Selector */
                <div className="flex flex-col gap-3">
                  
                  {/* Plate Selector Sub-Tabs */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[10px] font-space">
                      <span className="text-[#FF5600] font-bold uppercase tracking-wider">
                        Architectural Take-off Plates
                      </span>
                      <span className="text-[#7A7A85] dark:text-[#9A9AA6]">
                        {activeTakeoffSubIndex + 1} of {currentStep.images.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08]">
                      {[
                        'Plan Calibration',
                        'Landscape Area',
                        'Floor & Ceilings',
                        'Doors & Windows',
                        'Roof Geometry',
                      ].map((plateLabel, subIdx) => (
                        <button
                          key={plateLabel}
                          type="button"
                          onClick={() => setActiveTakeoffSubIndex(subIdx)}
                          className={`py-2 px-2 rounded-xl text-[10px] font-manrope font-bold transition-all cursor-pointer text-center flex items-center justify-center min-h-[38px] leading-tight ${
                            activeTakeoffSubIndex === subIdx
                              ? 'bg-[#FF5600] text-white shadow-xs'
                              : 'text-[#4A4A55] dark:text-[#A0A0AD] hover:text-black dark:hover:text-white'
                          }`}
                        >
                          <span>{plateLabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Plate Image Container */}
                  {(() => {
                    const activePlate = currentStep.images[activeTakeoffSubIndex];
                    return (
                      <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-[#0E0E12] shadow-xl flex flex-col">
                        <div className="px-4 py-2.5 bg-[#14141A] border-b border-white/10 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white font-manrope">
                              {activePlate.title}
                            </div>
                            <div className="text-[10px] font-space text-[#FF5600]">
                              {activePlate.category}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => onInspectDocument(activePlate)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-manrope font-medium transition-colors cursor-pointer"
                          >
                            <ZoomIn className="w-3 h-3 text-[#FF5600]" />
                            <span>Zoom Plate</span>
                          </button>
                        </div>

                        <div
                          className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black/90 flex items-center justify-center p-1 cursor-pointer group"
                          onClick={() => onInspectDocument(activePlate)}
                        >
                          <img
                            src={activePlate.src}
                            alt={activePlate.title}
                            className="max-h-full max-w-full object-contain filter contrast-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-manrope text-xs font-bold backdrop-blur-2xs">
                            <ZoomIn className="w-4 h-4 text-[#FF5600]" />
                            <span>Click to Inspect Full-Scale Drawing</span>
                          </div>
                        </div>

                        <div className="p-3 bg-[#121216] border-t border-white/10 text-xs text-white/70 font-manrope">
                          {activePlate.description}
                        </div>
                      </div>
                    );
                  })()}

                </div>
              ) : (
                /* Steps 02 to 06: Vector HTML5 Canvas PDF Viewer */
                <div className="flex flex-col gap-3">
                  {currentStep.images.map((docItem) => (
                    <div
                      key={docItem.title}
                      className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-[#0E0E12] shadow-xl flex flex-col"
                    >
                      <div className="px-4 py-2.5 bg-[#14141A] border-b border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white font-manrope">
                            {docItem.title}
                          </div>
                          <div className="text-[10px] font-space text-[#FF5600]">
                            {docItem.category}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onInspectDocument(docItem)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-manrope font-medium transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3 h-3 text-[#FF5600]" />
                          <span>Expand Document</span>
                        </button>
                      </div>

                      {/* Embedded Vector Canvas PDF Viewer */}
                      <div className="p-2 bg-[#0A0A0D]">
                        <PdfCanvasViewer
                          url={docItem.src}
                          title={docItem.title}
                          maxContainerHeight="400px"
                          onExpand={() => onInspectDocument(docItem)}
                        />
                      </div>

                      <div className="p-3 bg-[#121216] border-t border-white/10 text-xs text-white/70 font-manrope">
                        {docItem.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>
        </>
        )}
      </div>
    </section>
  );
};
