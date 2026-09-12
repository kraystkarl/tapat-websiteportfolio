import React, { useState } from 'react';
import {
  Calculator,
  FolderKanban,
  MessageSquare,
  Ruler,
  ClipboardList,
  Headphones,
  FileText,
  Check,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';
import { MethodologyStep } from '../types';

interface ToolsAndMethodologySectionProps {
  onNavigateSection?: (index: number) => void;
}

interface ToolRef {
  name: string;
  logo: string;
}

/* Central logo registry — only software already used on this site. */
const LOGOS: Record<string, string> = {
  planswift: '/assets/software/planswift-logo.png',
  bluebeam: '/assets/software/bluebeam-logo.png',
  excel: '/assets/software/excel-logo.svg',
  workspace: '/assets/software/google-workspace-logo.svg',
  autocad: '/assets/software/autocad-logo.svg',
  sketchup: '/assets/software/sketchup-logo.svg',
  lumion: '/assets/software/lumion-logo.svg',
  zoom: '/assets/software/zoom-logo.svg',
  meet: '/assets/software/meet-logo.svg',
  teams: '/assets/software/teams-logo.svg',
  whatsapp: '/assets/software/whatsapp-logo.svg',
  gmail: '/assets/software/gmail-logo.svg',
  word: '/assets/software/word-logo.svg',
  powerpoint: '/assets/software/powerpoint-logo.svg',
  drive: '/assets/software/drive-logo.svg',
  calendar: '/assets/software/calendar-logo.svg',
  canva: '/assets/software/canva-logo.svg',
  premiere: '/assets/software/premiere-logo.svg',
  davinci: '/assets/software/davinci-logo.svg',
  aitools: '/assets/software/ai-tools-logo.svg',
};

/* Software stack regrouped into 3 cards — same tools, same order as the original tabs. */
const stackCards: {
  numeral: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: ToolRef[];
}[] = [
  {
    numeral: '01',
    title: 'Estimating, Design & 3D',
    desc: 'Take-offs, BOQ math, construction drawings and visual renders.',
    icon: Calculator,
    tools: [
      { name: 'PlanSwift', logo: LOGOS.planswift },
      { name: 'Bluebeam Revu', logo: LOGOS.bluebeam },
      { name: 'Microsoft Excel', logo: LOGOS.excel },
      { name: 'AutoCAD', logo: LOGOS.autocad },
      { name: 'SketchUp', logo: LOGOS.sketchup },
      { name: 'Lumion', logo: LOGOS.lumion },
    ],
  },
  {
    numeral: '02',
    title: 'Coordination & Productivity',
    desc: 'Schedules, tracking, specifications, decks and cloud archives.',
    icon: FolderKanban,
    tools: [
      { name: 'Google Workspace', logo: LOGOS.workspace },
      { name: 'Microsoft Excel', logo: LOGOS.excel },
      { name: 'Microsoft Word', logo: LOGOS.word },
      { name: 'PowerPoint', logo: LOGOS.powerpoint },
      { name: 'Google Drive', logo: LOGOS.drive },
      { name: 'Google Calendar', logo: LOGOS.calendar },
      { name: 'Canva', logo: LOGOS.canva },
    ],
  },
  {
    numeral: '03',
    title: 'Communication & Hobbies',
    desc: 'Meetings, RFI records, video editing and creative media.',
    icon: MessageSquare,
    tools: [
      { name: 'Zoom', logo: LOGOS.zoom },
      { name: 'Google Meet', logo: LOGOS.meet },
      { name: 'Microsoft Teams', logo: LOGOS.teams },
      { name: 'WhatsApp', logo: LOGOS.whatsapp },
      { name: 'Gmail', logo: LOGOS.gmail },
      { name: 'Premiere Pro', logo: LOGOS.premiere },
      { name: 'DaVinci Resolve', logo: LOGOS.davinci },
      { name: 'Canva', logo: LOGOS.canva },
      { name: 'AI Tools & Agents', logo: LOGOS.aitools },
    ],
  },
];

/* Service cards — roles, explanations and tools drawn from this site's own copy. */
const serviceCards: {
  title: string;
  badge: string;
  blurb: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
  tools: ToolRef[];
}[] = [
  {
    title: 'Construction Estimator',
    badge: 'CORE OFFER',
    blurb: 'Full cost estimation and budget breakdowns for residential and commercial builds.',
    points: [
      'Cost estimation & budget breakdown',
      'Bill of Quantities (BOQ) preparation',
      'Tender-ready pricing packages',
    ],
    icon: Calculator,
    tools: [
      { name: 'PlanSwift', logo: LOGOS.planswift },
      { name: 'Bluebeam', logo: LOGOS.bluebeam },
      { name: 'Excel', logo: LOGOS.excel },
    ],
  },
  {
    title: 'Material Take-off Specialist',
    badge: 'ZERO-VARIANCE',
    blurb: 'Calibrated digital take-offs with traceable quantities and procurement lists.',
    points: [
      'Digital quantity take-offs',
      'Material cutting lists',
      'Procurement schedules',
    ],
    icon: Ruler,
    tools: [
      { name: 'PlanSwift', logo: LOGOS.planswift },
      { name: 'Bluebeam', logo: LOGOS.bluebeam },
      { name: 'Excel', logo: LOGOS.excel },
    ],
  },
  {
    title: 'Project Coordinator',
    badge: 'REMOTE-READY',
    blurb: 'Cross-functional alignment, tracking and milestone control across trades.',
    points: [
      'Subcontractor tracking',
      'Milestone schedules',
      'Progress measurement',
    ],
    icon: ClipboardList,
    tools: [
      { name: 'Workspace', logo: LOGOS.workspace },
      { name: 'Excel', logo: LOGOS.excel },
    ],
  },
  {
    title: 'Construction Virtual Assistant',
    badge: 'US/AU HOURS',
    blurb: 'Remote admin backbone keeping drawings, logs and documents under control.',
    points: [
      'Drawing registers & filing',
      'RFI issue log upkeep',
      'Document control support',
    ],
    icon: Headphones,
    tools: [
      { name: 'Workspace', logo: LOGOS.workspace },
      { name: 'Drive', logo: LOGOS.drive },
      { name: 'Excel', logo: LOGOS.excel },
    ],
  },
  {
    title: 'Project Documentation',
    badge: 'AUDIT-READY',
    blurb: 'Specs, decks, correspondence and archives a reviewer can trust.',
    points: [
      'Technical specs & contracts',
      'Tender & client presentations',
      'RFI correspondence & archives',
    ],
    icon: FileText,
    tools: [
      { name: 'Word', logo: LOGOS.word },
      { name: 'PowerPoint', logo: LOGOS.powerpoint },
      { name: 'Gmail', logo: LOGOS.gmail },
      { name: 'Drive', logo: LOGOS.drive },
    ],
  },
];

/* 8-stage flow — verbatim process from the original methodology content. */
const methodologySteps: MethodologyStep[] = [
  {
    number: '01',
    title: 'Drawing Receipt & Scope Verification',
    shortDesc: 'Log all sheets, compare revisions, and flag missing callouts.',
    details: [
      'Establish drawing register and cross-check architectural vs structural revisions.',
      'Catalog tender scope boundaries and identify unmeasured trade interfaces.',
      'Document tender qualifications and client specifications into project record.',
    ],
  },
  {
    number: '02',
    title: 'Scale Verification & Calibration',
    shortDesc: 'Calibrate every sheet against known dimensions before measuring.',
    details: [
      'Verify door openings and grid dimensions in PlanSwift or Bluebeam Revu.',
      'Calibrate individual sheets separately to prevent non-uniform scaling errors.',
      'Document scale confirmation in evidence index before any polygon is drawn.',
    ],
  },
  {
    number: '03',
    title: 'Trade-by-Trade Digital Take-Off',
    shortDesc: 'Color-coded digital polygons with exact measurement types.',
    details: [
      'Partition measurements into distinct subject layers (Landscape, Doors, Finishes, Roof).',
      'Capture net area, gross area, perimeter lengths, and discrete unit counts.',
      'Export structured markups summary with unique IDs for spreadsheet lineage.',
    ],
  },
  {
    number: '04',
    title: 'RFI Log & Precon Clarifications',
    shortDesc: 'Document discrepancies and missing callouts before pricing.',
    details: [
      'Formulate itemized Request for Information (RFI) for contractor review.',
      'Highlight drawing ambiguities, conflicting notes, and schedule mismatches.',
      'Attach plan callout snippets to accelerate client design resolution.',
    ],
  },
  {
    number: '05',
    title: 'Calculation Lineage & Formula Audit',
    shortDesc: 'Every formula traceable to measured plan polygons.',
    details: [
      'Calculate roof pitch multipliers and perimeter allowances with documented formulas.',
      'Apply trade-standard waste factors transparently without hiding constants.',
      'Establish direct formula lineage from digital takeoff values to pricing sheets.',
    ],
  },
  {
    number: '06',
    title: 'Bill of Quantities (BOQ) Assembly',
    shortDesc: 'Structured trade packages formatted to standard CSI/MasterFormat.',
    details: [
      'Compile trade-by-trade BOQ with clear measurement units (m², m³, linear, count).',
      'Incorporate itemized material breakdowns, equipment allowances, and labor rates.',
      'Include summary sheets with subtotal rollups and contingency reserves.',
    ],
  },
  {
    number: '07',
    title: 'Quality Control Reconciliation Matrix',
    shortDesc: 'Zero-variance reconciliation between markups and final BOQ.',
    details: [
      'Reconcile raw markup polygon sums directly against final BOQ line quantities.',
      'Perform perimeter-to-area logic checks to verify geometric consistency.',
      'Document QA approval checklist with sign-off date and verified status.',
    ],
  },
  {
    number: '08',
    title: 'Audit Package & Deliverable Handoff',
    shortDesc: 'Flattened PDFs, editable Excel workbooks, and evidence index.',
    details: [
      'Package marked-up PDFs, editable Excel BOQs, and CSV traceability files.',
      'Provide drawing register, documented qualifications, and RFI response tracking.',
      'Deliver a review-ready handoff package ready for immediate client tender submission.',
    ],
  },
];

export const ToolsAndMethodologySection: React.FC<ToolsAndMethodologySectionProps> = ({ onNavigateSection }) => {
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  return (
    <section
      id="methodology"
      className="relative min-h-full w-full flex flex-col justify-center py-6 sm:py-10 lg:py-12"
    >
      <style>{`
        .svc-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; box-shadow: 0 4px 20px -2px rgba(0,0,0,0.03); background: var(--card); border: 1px solid var(--card-border); }
        .svc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px -4px rgba(0,0,0,0.08); border-color: #CBD5E1; }
        .svc-chip { transition: background 0.2s ease; }
        .svc-chip:hover { background: var(--pill); }
        .svc-watermark { position: absolute; top: 8px; right: 14px; font-size: 64px; font-weight: 700; line-height: 1; color: rgba(15,23,42,0.05); pointer-events: none; font-family: var(--font-headline); }
        .dark .svc-watermark, [data-theme="dark"] .svc-watermark { color: rgba(255,255,255,0.06); }
        .svc-grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .svc-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; position: relative; }
        .svc-connect { position: absolute; top: 60px; left: 32px; right: 32px; height: 1px; background: var(--card-border); }
        @media (max-width: 1279px) { .svc-grid-5 { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 1023px) {
          .svc-grid-3 { grid-template-columns: 1fr; }
          .svc-connect { display: none; }
          .svc-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 639px) { .svc-grid-5 { grid-template-columns: 1fr; } }
      `}</style>

      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-50" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-radial from-[#FF5600]/[0.03] dark:from-[#FF5600]/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col">

        {/* ============ 1. HERO TEXT ============ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
            SERVICES
          </span>
          <h1
            style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.01em', color: 'var(--ink)', margin: 0 }}
          >
            What I Bring <span style={{ color: '#FF5600' }}>to the Table</span>
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--muted)', margin: 0, lineHeight: 1.6, maxWidth: '640px' }}>
            Remote Estimating, Accurate and Precise Take-offs, and Dedicated Project Coordination
          </p>
        </div>

        {/* ============ 2. MAIN CONTAINER BOX ============ */}
        <div
          style={{
            background: 'var(--pill)',
            border: '1px solid var(--card-border)',
            borderRadius: '24px',
            padding: 'clamp(24px, 4vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            boxShadow: '0 8px 30px -12px rgba(0,0,0,0.08)',
          }}
        >

          {/* ============ 3. SOFTWARE STACK ============ */}
          <div className="svc-split" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '32px', alignItems: 'start' }}>
            {/* Left header (25–30%) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
                TOOLBOX
              </span>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '30px', fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)', margin: 0 }}>
                Software Stack
              </h2>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FF5600' }}>
                Estimating, Coordination & Communication
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                Tools I use to effectively perform my role
              </p>
            </div>

            {/* Right: 3 step cards */}
            <div className="svc-grid-3">
              <span className="svc-connect" aria-hidden />
              {stackCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.numeral}
                    className="svc-card"
                    style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    <span className="svc-watermark" aria-hidden>{card.numeral}</span>
                    <span
                      style={{
                        width: '40px', height: '40px', borderRadius: '12px', position: 'relative', zIndex: 1,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,86,0,0.08)', border: '1px solid rgba(255,86,0,0.25)',
                      }}
                    >
                      <Icon className="w-5 h-5" color="#FF5600" />
                    </span>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                      {card.title}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.55 }}>
                      {card.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '4px' }}>
                      {card.tools.map((tool) => (
                        <span
                          key={`${card.numeral}-${tool.name}`}
                          title={tool.name}
                          className="svc-chip"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            fontSize: '11px', fontWeight: 600, color: 'var(--body)',
                            background: 'var(--pill)', border: '1px solid var(--card-border)',
                            padding: '4px 10px 4px 5px', borderRadius: '9999px',
                          }}
                        >
                          <img
                            src={tool.logo}
                            alt=""
                            loading="lazy"
                            draggable={false}
                            style={{ width: '20px', height: '20px', objectFit: 'contain', borderRadius: '6px', background: '#FFFFFF', padding: '2px' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============ 4. WHAT I CAN DO FOR YOU ============ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
                ENGAGEMENTS
              </span>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '30px', fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)', margin: 0 }}>
                What I Can Do <span style={{ color: '#FF5600' }}>for You</span>
              </h2>
            </div>

            <div className="svc-grid-5">
              {serviceCards.map((service, i) => {
                const Icon = service.icon;
                const counter = `${String(i + 1).padStart(2, '0')} / 05`;
                return (
                  <div
                    key={service.title}
                    className="svc-card"
                    style={{ borderRadius: '20px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                  >
                    {/* Header row: icon left, counter right */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          width: '38px', height: '38px', borderRadius: '12px',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(255,86,0,0.08)', border: '1px solid rgba(255,86,0,0.25)',
                        }}
                      >
                        <Icon className="w-5 h-5" color="#FF5600" />
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--faint)', fontVariantNumeric: 'tabular-nums' }}>
                        {counter}
                      </span>
                    </div>

                    {/* Attention badge */}
                    <span
                      style={{
                        alignSelf: 'flex-start', fontSize: '10px', fontWeight: 700,
                        letterSpacing: '0.08em', color: '#FF5600',
                        background: 'rgba(255,86,0,0.08)', border: '1px solid rgba(255,86,0,0.25)',
                        padding: '3px 9px', borderRadius: '9999px', whiteSpace: 'nowrap',
                      }}
                    >
                      {service.badge}
                    </span>

                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                      {service.title}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: 1.55 }}>
                      {service.blurb}
                    </p>

                    {/* Checklist */}
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {service.points.map((point) => (
                        <li key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '12px', color: 'var(--body)', lineHeight: 1.45 }}>
                          <Check size={14} color="#FF5600" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Toolset */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--card-border)' }}>
                      {service.tools.map((tool) => (
                        <img
                          key={`${service.title}-${tool.name}`}
                          src={tool.logo}
                          alt={tool.name}
                          title={tool.name}
                          loading="lazy"
                          draggable={false}
                          style={{ width: '24px', height: '24px', objectFit: 'contain', borderRadius: '6px', background: '#FFFFFF', padding: '2px', border: '1px solid var(--card-border)' }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============ 5. 8-STAGE ESTIMATING FLOW ============ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
                PROCESS
              </span>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '30px', fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)', margin: 0 }}>
                8-Stage <span style={{ color: '#FF5600' }}>Estimating Flow</span>
              </h2>
              {/* Centered tech stack pills */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { name: 'PlanSwift', logo: LOGOS.planswift },
                  { name: 'Bluebeam Revu', logo: LOGOS.bluebeam },
                  { name: 'Microsoft Excel', logo: LOGOS.excel },
                ].map((tool) => (
                  <span
                    key={tool.name}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      fontSize: '12px', fontWeight: 600, color: 'var(--body)',
                      background: 'var(--card)', border: '1px solid var(--card-border)',
                      padding: '5px 12px 5px 6px', borderRadius: '9999px',
                    }}
                  >
                    <img
                      src={tool.logo}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      style={{ width: '20px', height: '20px', objectFit: 'contain', borderRadius: '6px', background: '#FFFFFF', padding: '2px' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>

            {/* OS window mockup */}
            <div
              className="svc-card"
              style={{ width: '100%', maxWidth: '860px', borderRadius: '16px', overflow: 'hidden', padding: 0 }}
            >
              {/* Window chrome */}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 16px', background: 'var(--pill)',
                  borderBottom: '1px solid var(--card-border)',
                }}
              >
                <span style={{ display: 'inline-flex', gap: '6px' }} aria-hidden>
                  <span className="traffic-light-red" style={{ width: '11px', height: '11px', borderRadius: '50%', display: 'inline-block' }} />
                  <span className="traffic-light-yellow" style={{ width: '11px', height: '11px', borderRadius: '50%', display: 'inline-block' }} />
                  <span className="traffic-light-green" style={{ width: '11px', height: '11px', borderRadius: '50%', display: 'inline-block' }} />
                </span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', fontFamily: 'ui-monospace, monospace' }}>
                  estimating-flow — 8 stages
                </span>
              </div>

              {/* Flowchart nodes */}
              <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: 0 }}>
                {methodologySteps.map((step, idx) => {
                  const isOpen = expandedStage === idx;
                  const isLast = idx === methodologySteps.length - 1;
                  return (
                    <div key={step.number} style={{ display: 'flex', gap: '14px' }}>
                      {/* Rail: node dot + connector */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <span
                          style={{
                            width: '30px', height: '30px', borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', fontWeight: 700, fontVariantNumeric: 'tabular-nums',
                            background: isOpen ? '#FF5600' : 'var(--pill)',
                            color: isOpen ? '#FFFFFF' : 'var(--body)',
                            border: isOpen ? 'none' : '1px solid var(--card-border)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {step.number}
                        </span>
                        {!isLast && (
                          <span style={{ width: '2px', flex: 1, minHeight: '14px', background: 'var(--card-border)', borderRadius: '2px' }} aria-hidden />
                        )}
                      </div>

                      {/* Node body */}
                      <div style={{ flex: 1, paddingBottom: isLast ? 0 : '14px', minWidth: 0 }}>
                        <button
                          type="button"
                          onClick={() => setExpandedStage(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                            background: isOpen ? 'var(--pill)' : 'transparent',
                            border: '1px solid var(--card-border)', borderRadius: '12px',
                            padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
                          }}
                        >
                          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
                              {step.title}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                              {step.shortDesc}
                            </span>
                          </span>
                          <ChevronDown
                            size={16}
                            color="#FF5600"
                            style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
                          />
                        </button>
                        {isOpen && (
                          <ul style={{ listStyle: 'none', margin: '8px 0 0', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '7px', background: 'var(--pill)', border: '1px solid var(--card-border)', borderRadius: '12px' }}>
                            {step.details.map((detail) => (
                              <li key={detail} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--body)', lineHeight: 1.55 }}>
                                <Check size={14} color="#FF5600" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigateSection) onNavigateSection(5);
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', padding: 0, fontSize: '13px', fontWeight: 700, color: '#FF5600', cursor: 'pointer' }}
            >
              <span>Discuss a stage in detail</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
