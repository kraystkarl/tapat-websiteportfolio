import React, { useState, useEffect } from 'react';
import {
  Eye,
  Star,
  X,
  ArrowUpRight,
  Award,
  Mail,
  Linkedin,
  CalendarCheck,
  Send,
  BadgeCheck,
  GraduationCap,
} from 'lucide-react';

interface HeroSectionProps {
  onContactClick?: () => void;
  onOpenBooking?: () => void;
  onNavigateSection?: (index: number) => void;
}

const ACCENT = '#FF5600';
const CONTACT_EMAIL = 'engr.christcarl@gmail.com';

/* Section indices in App flow: 0 intro · 1 about · 2 experience · 3 methodology · 4 proof · 5 contact */
const NAV = { portfolio: 4, services: 3, about: 1, resume: 2, contacts: 5 };

/* Tool stack grouped by usage — same order & classification as the Methodology section. Nothing added or removed. */
const toolGroups: { category: string; tools: { name: string; logo: string }[] }[] = [
  {
    category: 'Estimating',
    tools: [
      { name: 'PlanSwift', logo: '/assets/software/planswift-logo.png' },
      { name: 'Bluebeam Revu', logo: '/assets/software/bluebeam-logo.png' },
      { name: 'Microsoft Excel', logo: '/assets/software/excel-logo.svg' },
    ],
  },
  {
    category: 'Coordination',
    tools: [
      { name: 'Google Workspace', logo: '/assets/software/google-workspace-logo.svg' },
      { name: 'Microsoft Excel', logo: '/assets/software/excel-logo.svg' },
    ],
  },
  {
    category: 'Design & 3D',
    tools: [
      { name: 'AutoCAD', logo: '/assets/software/autocad-logo.svg' },
      { name: 'SketchUp', logo: '/assets/software/sketchup-logo.svg' },
      { name: 'Lumion', logo: '/assets/software/lumion-logo.svg' },
    ],
  },
  {
    category: 'Communication',
    tools: [
      { name: 'Zoom', logo: '/assets/software/zoom-logo.svg' },
      { name: 'Google Meet', logo: '/assets/software/meet-logo.svg' },
      { name: 'Microsoft Teams', logo: '/assets/software/teams-logo.svg' },
      { name: 'WhatsApp', logo: '/assets/software/whatsapp-logo.svg' },
      { name: 'Gmail', logo: '/assets/software/gmail-logo.svg' },
    ],
  },
  {
    category: 'Productivity',
    tools: [
      { name: 'Microsoft Word', logo: '/assets/software/word-logo.svg' },
      { name: 'PowerPoint', logo: '/assets/software/powerpoint-logo.svg' },
      { name: 'Google Drive', logo: '/assets/software/drive-logo.svg' },
      { name: 'Google Calendar', logo: '/assets/software/calendar-logo.svg' },
      { name: 'Canva', logo: '/assets/software/canva-logo.svg' },
    ],
  },
  {
    category: 'Creative Media',
    tools: [
      { name: 'Adobe Premiere Pro', logo: '/assets/software/premiere-logo.svg' },
      { name: 'DaVinci Resolve', logo: '/assets/software/davinci-logo.svg' },
      { name: 'Canva', logo: '/assets/software/canva-logo.svg' },
      { name: 'AI Tools & Agents', logo: '/assets/software/ai-tools-logo.svg' },
    ],
  },
];

/* Portfolio glance — one live project, room for future postings (no invented media). */
const showcaseProjects = [
  {
    id: 'au-timber-frame',
    name: 'AU Timber Frame',
    focus: 'Architectural Estimating',
    tag: 'Australian Project · Live',
    live: true,
  },
  { id: 'soon-2', name: 'Next project', focus: 'To be posted soon', tag: 'Upcoming', live: false },
  { id: 'soon-3', name: 'Next project', focus: 'To be posted soon', tag: 'Upcoming', live: false },
];

/* Roles open for — as specified. */
const openRoles = [
  'Construction Estimator',
  'Take-off Specialist',
  'Project Coordinator',
  'Construction Virtual Assistant',
];

/* Core toolset — flagship tools from the site's own stack. */
const coreTools = [
  { name: 'PlanSwift', logo: '/assets/software/planswift-logo.png' },
  { name: 'Bluebeam Revu', logo: '/assets/software/bluebeam-logo.png' },
  { name: 'Excel', logo: '/assets/software/excel-logo.svg' },
  { name: 'AutoCAD', logo: '/assets/software/autocad-logo.svg' },
];

/* Contact channels — taken from the Contacts section. */
const contactRows = [
  { title: 'Direct Email', detail: CONTACT_EMAIL, icon: Mail },
  { title: 'Schedule a Call', detail: '30-min precon consultation', icon: CalendarCheck },
  { title: 'LinkedIn Profile', detail: 'Connect professionally', icon: Linkedin },
  { title: 'WhatsApp / Telegram', detail: '+63 962 540 6989', icon: Send },
];

interface Testimonial {
  name: string;
  comment: string;
  stars: number;
  date: string;
}

function readTestimonials(key: string): Testimonial[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onNavigateSection,
}) => {
  const [visits, setVisits] = useState(0);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [fbName, setFbName] = useState('');
  const [fbComment, setFbComment] = useState('');
  const [fbStars, setFbStars] = useState(5);
  const [fbHover, setFbHover] = useState(0);
  const [fbSent, setFbSent] = useState(false);
  const [fbSending, setFbSending] = useState(false);
  const [fbError, setFbError] = useState('');
  const [approved, setApproved] = useState<Testimonial[]>([]);

  /* Merge the public store with this browser's local approvals (deduped). */
  const mergeApproved = (a: Testimonial[], b: Testimonial[]) => {
    const seen = new Set<string>();
    return [...a, ...b].filter((t) => {
      const key = `${t.name}|${t.comment}|${t.stars}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const loadApproved = async () => {
    const local = readTestimonials('approvedTestimonials');
    try {
      const res = await fetch('/testimonials.json', { cache: 'no-store' });
      if (res.ok) {
        const remote = await res.json();
        if (Array.isArray(remote)) {
          setApproved(mergeApproved(remote, local));
          return;
        }
      }
    } catch {
      /* offline or missing file — fall back to local */
    }
    setApproved(local);
  };

  /* Visitor counter (local preview counter) + load published testimonials */
  useEffect(() => {
    try {
      const current = parseInt(localStorage.getItem('siteVisitCount') || '0', 10) || 0;
      const next = current + 1;
      localStorage.setItem('siteVisitCount', String(next));
      setVisits(next);
    } catch {
      setVisits(1);
    }
    loadApproved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Refresh published reviews when the owner approves them in the inbox. */
  useEffect(() => {
    const reload = () => {
      loadApproved();
    };
    window.addEventListener('testimonials-updated', reload);
    return () => window.removeEventListener('testimonials-updated', reload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (index: number) => {
    if (onNavigateSection) onNavigateSection(index);
  };

  const handlePrimaryAction = () => {
    if (onOpenBooking) onOpenBooking();
    else go(NAV.contacts);
  };

  /* Visitor review → emailed to the owner for approval (no backend needed).
     A local copy is kept so the sender sees it as awaiting review. */
  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setFbSending(true);
    setFbError('');
    const entry = {
      name: fbName || 'Anonymous',
      comment: fbComment,
      stars: fbStars,
      date: new Date().toISOString(),
    };
    try {
      const pending = readTestimonials('pendingTestimonials');
      pending.push(entry);
      localStorage.setItem('pendingTestimonials', JSON.stringify(pending));
    } catch {
      /* storage unavailable */
    }
    try {
      const res = await fetch('https://formsubmit.co/ajax/engr.christcarl@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: entry.name,
          _subject: `New portfolio review from ${entry.name} (${entry.stars}/5)`,
          _template: 'table',
          rating: `${entry.stars} / 5`,
          comment: entry.comment,
          date: entry.date,
        }),
      });
      if (!res.ok) throw new Error('delivery failed');
    } catch {
      setFbError('Could not reach the owner inbox — your review was saved on this device only.');
    }
    window.dispatchEvent(new Event('testimonials-updated'));
    setFbSending(false);
    setFbSent(true);
  };

  const closeFeedback = () => {
    setFeedbackOpen(false);
    setFbSent(false);
    setFbError('');
  };

  return (
    <section id="intro" className="relative min-h-full w-full flex flex-col py-6 sm:py-10 lg:py-12">
      <style>{`
        .hero-cta { transition: transform 0.2s ease; }
        .hero-cta:hover { transform: scale(1.03); }
        .hero-cta:active { transform: scale(0.97); }
        .dark .hero-cta, [data-theme="dark"] .hero-cta { border: 1px solid rgba(255,255,255,0.18); }
        .visit-pill { transition: transform 0.2s ease, border-color 0.2s ease; }
        .visit-pill:hover { transform: scale(1.03); border-color: rgba(255,86,0,0.5); }
        .visit-pill:active { transform: scale(0.97); }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 25s linear infinite; }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        .bento-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; box-shadow: 0 4px 20px -2px rgba(0,0,0,0.03); background: #FFFFFF; border: 1px solid var(--card-border); }
        .bento-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px -4px rgba(0,0,0,0.08); border-color: #CBD5E1; }
        .dark .bento-card, [data-theme="dark"] .bento-card { background: var(--card); border-color: var(--card-border); }
        .dark .bento-card:hover, [data-theme="dark"] .bento-card:hover { border-color: #3A3A42; }
        .bento-pill { background: #FFFFFF; border: 1px solid var(--card-border); }
        .dark .bento-pill, [data-theme="dark"] .bento-pill { background: var(--card); border-color: var(--card-border); }
        .bento-media img { transition: transform 0.4s ease; }
        .bento-media:hover img { transform: scale(1.04); }
        .bento-fan img { transition: transform 0.3s ease; }
        .bento-card:hover .bento-fan img:nth-child(1) { transform: rotate(0deg) translateY(0); }
        .bento-card:hover .bento-fan img:nth-child(2) { transform: rotate(0deg) translateY(0); }
        .bento-card:hover .bento-fan img:nth-child(3) { transform: rotate(0deg) translateY(0); }
        .bento-pill { transition: background 0.2s ease; }
        .bento-pill:hover { background: var(--pill); }
        .contact-row { transition: background 0.2s ease; }
        .marquee-label { width: 20%; min-width: 150px; display: flex; align-items: center; flex-shrink: 0; }
        .contact-row:hover { background: var(--pill); }
        .bento-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .bento-span-2 { grid-column: span 2; }
        .bento-testimonials { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .bento-feature-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border); }
        @media (max-width: 1023px) { .bento-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 639px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-span-2 { grid-column: span 1; }
          .bento-testimonials { grid-template-columns: 1fr; }
          .bento-feature-inner { grid-template-columns: 1fr; }
          .marquee-label { min-width: 118px; }
        }
      `}</style>

      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-50" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col gap-5">

        {/* ================= HERO HEADER & ACTION BAR ================= */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '260px', flex: '1 1 auto' }}>
            <h1
              style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(36px, 4.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '0.01em', color: 'var(--ink)', margin: 0 }}
            >
              Let&apos;s <span style={{ color: ACCENT }}>win the bid</span> and maximize
              profit together.
              <span style={{ display: 'block', marginTop: '10px', fontSize: '0.62em', lineHeight: 1.3, fontWeight: 600, color: 'var(--body)', fontFamily: 'Manrope, ui-sans-serif, sans-serif' }}>
                Let me price and manage your next endeavor.
              </span>
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px', margin: 0, lineHeight: 1.6 }}>
              From accurate quantity take-offs to comprehensive project coordination. Remote,
              reliable, and calibrated for the US and Australian markets.
            </p>
            {/* Visitor pill: live count + opens the feedback form */}
            <div>
              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                className="visit-pill"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: '9999px',
                  padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)',
                  cursor: 'pointer', boxShadow: '0 2px 8px -2px rgba(0,0,0,0.06)',
                }}
                title="See visits & leave a review"
              >
                <Eye size={15} color={ACCENT} />
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{visits.toLocaleString()} visits</span>
                <span style={{ width: '1px', height: '14px', background: 'var(--card-border)' }} aria-hidden />
                <Star size={14} color={ACCENT} />
                <span>Rate your visit</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrimaryAction}
            className="hero-cta"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#0F172A', color: '#FFFFFF', borderRadius: '9999px',
              padding: '10px 20px', fontSize: '14px', fontWeight: 600,
              border: 'none', cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 6px 20px -6px rgba(15,23,42,0.5)',
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* ================= SCROLLING MARQUEE UTILITY STRIP ================= */}
        <div
          className="marquee"
          style={{
            display: 'flex', alignItems: 'stretch', width: '100%',
            height: '64px', borderRadius: '16px',
            border: '1px solid var(--card-border)', background: 'var(--card)',
            overflow: 'hidden',
          }}
        >
          {/* Left label block (~20%) */}
          <div className="marquee-label">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '16px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', fontWeight: 600 }}>
                Toolbox
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                Core Competencies
              </span>
            </div>
            <div style={{ width: '1px', alignSelf: 'stretch', background: 'var(--card-border)', marginLeft: '16px', marginTop: '12px', marginBottom: '12px' }} aria-hidden />
          </div>
          {/* Right ticker viewport */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            <div className="marquee-track" style={{ gap: '0' }}>
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingRight: '24px' }}
                >
                  {toolGroups.map((group) => (
                    <span key={`${copy}-${group.category}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT, whiteSpace: 'nowrap' }}>
                        {group.category}
                      </span>
                      {group.tools.map((tool) => (
                        <img
                          key={`${copy}-${group.category}-${tool.name}`}
                          src={tool.logo}
                          alt={tool.name}
                          title={`${tool.name} · ${group.category}`}
                          loading="lazy"
                          draggable={false}
                          style={{ height: '30px', width: 'auto', maxWidth: '90px', objectFit: 'contain', flexShrink: 0 }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ))}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= BENTO GRID ================= */}
        <div className="bento-grid">
          {/* ---- TOP ROW ---- */}
          {/* Featured Showcase Card (span 2): Portfolio glance */}
          <div
            className="bento-card bento-span-2"
            style={{ borderRadius: '20px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', fontWeight: 600 }}>
              Featured · Portfolio
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2 }}>
              Selected estimating work
            </div>
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.55 }}>
              A quick glance at live take-off work — open the Portfolio for the full case files.
            </p>
            <div
              className="bento-feature-inner"
            >
              {/* Column 1: project names */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {showcaseProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => project.live && go(NAV.portfolio)}
                    className={project.live ? 'contact-row' : undefined}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px',
                      padding: '12px 14px', background: project.live ? 'var(--pill)' : 'transparent',
                      border: 'none', borderBottom: '1px solid var(--card-border)',
                      cursor: project.live ? 'pointer' : 'default', textAlign: 'left', width: '100%',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
                      {project.name}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: project.live ? ACCENT : 'var(--faint)' }}>
                      {project.focus}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--faint)' }}>{project.tag}</span>
                  </button>
                ))}
              </div>
              {/* Column 2: media showcase (acts as a button → Portfolio) */}
              <button
                type="button"
                onClick={() => go(NAV.portfolio)}
                className="bento-media"
                style={{ padding: 0, border: 'none', background: '#0F172A', cursor: 'pointer', overflow: 'hidden', position: 'relative', minHeight: '190px' }}
                aria-label="Open Portfolio showcase"
              >
                <img
                  src="/assets/proof/area-takeoff-landscape.jpg"
                  alt="Australian timber frame project — area take-off showcase"
                  loading="lazy"
                  draggable={false}
                  style={{ width: '100%', height: '100%', minHeight: '190px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span
                  style={{
                    position: 'absolute', left: '10px', bottom: '10px',
                    fontSize: '11px', fontWeight: 700, color: '#FFFFFF',
                    background: 'rgba(15,23,42,0.75)', padding: '4px 10px', borderRadius: '9999px',
                  }}
                >
                  View showcase
                </span>
              </button>
            </div>
          </div>

          {/* Secondary Feature Card (span 1): About numbers */}
          <div
            className="bento-card"
            style={{ gridColumn: 'span 1', borderRadius: '20px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'hidden' }}
          >
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', fontWeight: 600 }}>
              About
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25 }}>
              Career at a glance
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { value: '3', unit: 'yrs', label: 'Experience' },
                { value: '2', unit: '', label: 'PRC Licenses' },
                { value: '60+', unit: '', label: 'Projects Delivered' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{ display: 'flex', alignItems: 'baseline', gap: '8px', padding: '7px 0', borderBottom: '1px solid var(--card-border)' }}
                >
                  <span style={{ fontSize: '28px', fontWeight: 700, color: ACCENT, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {stat.value}
                    {stat.unit && <span style={{ fontSize: '14px', fontWeight: 600 }}> {stat.unit}</span>}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--body)' }}>{stat.label}</span>
                </div>
              ))}
            </div>
            {/* Companies worked with */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px' }}>
              {[
                { name: 'Deepbluee Swimming Pool Builders', role: 'Estimator & Site Engineer · 3 yrs' },
                { name: 'Coquilla Engineering Consultancy', role: 'Civil Engineer & Estimator' },
              ].map((company) => (
                <button
                  key={company.name}
                  type="button"
                  onClick={() => go(NAV.about)}
                  className="bento-pill"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left',
                    borderRadius: '12px',
                    padding: '9px 12px', cursor: 'pointer', width: '100%',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(255,86,0,0.08)', color: ACCENT,
                      fontSize: '14px', fontWeight: 700,
                    }}
                  >
                    {company.name.charAt(0)}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3 }}>
                      {company.name}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{company.role}</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(NAV.about)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', padding: 0, fontSize: '13px', fontWeight: 700, color: ACCENT, cursor: 'pointer', marginTop: '4px' }}
            >
              <span>Open About</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* List Showcase Card (span 1): Services roles */}
          <div
            className="bento-card"
            style={{ gridColumn: 'span 1', borderRadius: '20px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', fontWeight: 600 }}>
              Services
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25 }}>
              Open for roles
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {openRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => go(NAV.services)}
                  className="bento-pill"
                  style={{
                    fontSize: '13px', fontWeight: 600, color: 'var(--ink)', textAlign: 'left',
                    borderRadius: '9999px',
                    padding: '7px 12px', cursor: 'pointer',
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
            {/* Core toolset */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px', paddingTop: '10px', borderTop: '1px solid var(--card-border)' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', fontWeight: 600 }}>
                Core toolset
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {coreTools.map((tool) => (
                  <img
                    key={tool.name}
                    src={tool.logo}
                    alt={tool.name}
                    title={tool.name}
                    loading="lazy"
                    draggable={false}
                    style={{ height: '26px', width: 'auto', maxWidth: '64px', objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => go(NAV.services)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', padding: 0, fontSize: '13px', fontWeight: 700, color: ACCENT, cursor: 'pointer', marginTop: 'auto' }}
            >
              <span>Open Services</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* ---- BOTTOM ROW ---- */}
          {/* Credential Card (span 1): Resume */}
          <div
            className="bento-card"
            style={{ gridColumn: 'span 1', borderRadius: '20px', padding: '20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}
          >
            <div style={{ position: 'relative', marginTop: '4px' }}>
              <span
                style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,86,0,0.08)', border: '1px solid rgba(255,86,0,0.3)',
                }}
              >
                <Award size={30} color={ACCENT} />
              </span>
              <span
                style={{
                  position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)',
                  fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  color: '#FFFFFF', background: ACCENT, padding: '2px 8px', borderRadius: '9999px',
                }}
              >
                PRC LICENSED
              </span>
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', marginTop: '8px' }}>
              Licensed Professional
            </div>
            {/* Both PRC licenses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
              {['Civil Engineer License', 'Master Plumber License'].map((license) => (
                <div
                  key={license}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'var(--pill)', border: '1px solid var(--card-border)', borderRadius: '10px',
                    padding: '8px 10px',
                  }}
                >
                  <BadgeCheck size={16} color={ACCENT} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
                    {license}
                  </span>
                </div>
              ))}
              <div style={{ fontSize: '11px', color: 'var(--faint)' }}>Professional Regulation Commission (PRC), Philippines</div>
            </div>
            {/* Education */}
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left',
                paddingTop: '10px', borderTop: '1px solid var(--card-border)',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,86,0,0.08)',
                }}
              >
                <GraduationCap size={18} color={ACCENT} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35 }}>
                  St. Mary&apos;s College of Tagum
                </span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Bachelor of Science in Civil Engineering</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => go(NAV.resume)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', padding: 0, fontSize: '13px', fontWeight: 700, color: ACCENT, cursor: 'pointer', marginTop: 'auto' }}
            >
              <span>Open Resume</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Contacts Index Card (span 1) */}
          <div
            className="bento-card"
            style={{ gridColumn: 'span 1', borderRadius: '20px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}
          >
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', fontWeight: 600 }}>
              Contacts
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25 }}>
              Get in touch
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
              {contactRows.map((row) => {
                const Icon = row.icon;
                return (
                  <button
                    key={row.title}
                    type="button"
                    onClick={() => go(NAV.contacts)}
                    className="contact-row"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '9px 10px', borderRadius: '10px',
                      background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                    }}
                  >
                    <Icon size={16} color={ACCENT} />
                    <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.title}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {row.detail}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Testimonials & Client Card (span 2): approved visitor reviews */}
          <div
            className="bento-card bento-span-2"
            style={{ borderRadius: '20px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', fontWeight: 600 }}>
                  Testimonials
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.2, marginTop: '2px' }}>
                  What visitors say
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                className="hero-cta"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#0F172A', color: '#FFFFFF', borderRadius: '9999px',
                  padding: '8px 16px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', flexShrink: 0,
                }}
              >
                <Star size={14} />
                <span>Leave a review</span>
              </button>
            </div>
            {approved.length === 0 ? (
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, lineHeight: 1.6, background: 'var(--pill)', borderRadius: '10px', padding: '12px' }}>
                No published reviews yet — be the first to share your experience. Reviews appear here after approval.
              </p>
            ) : (
              <div className="bento-testimonials">
                {approved.slice(0, 4).map((t, i) => (
                  <figure key={`${t.name}-${i}`} style={{ margin: 0, background: 'var(--pill)', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <blockquote style={{ margin: 0, fontSize: '13px', color: 'var(--ink)', lineHeight: 1.55 }}>
                      “{t.comment}”
                    </blockquote>
                    <figcaption style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', gap: '2px' }} aria-label={`${t.stars} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} color={s <= t.stars ? ACCENT : '#CBD5E1'} fill={s <= t.stars ? ACCENT : 'none'} />
                        ))}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>{t.name}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= FEEDBACK MODAL (visitor form → email) ================= */}
      {feedbackOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(15,23,42,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={closeFeedback}
        >
          <div
            style={{ width: '100%', maxWidth: '440px', background: 'var(--card)', borderRadius: '20px', border: '1px solid var(--card-border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>Rate your visit</div>
              <button
                type="button"
                onClick={closeFeedback}
                aria-label="Close"
                style={{ padding: '6px', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'var(--pill)', cursor: 'pointer', display: 'inline-flex', color: 'var(--body)' }}
              >
                <X size={16} />
              </button>
            </div>
            {fbSent ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
                <p style={{ fontSize: '14px', color: 'var(--ink)', margin: 0, lineHeight: 1.6 }}>
                  Thanks{fbName ? `, ${fbName}` : ''}! Your review was sent to the owner.
                </p>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                  It will appear in Testimonials here — publicly, for every visitor — once published.
                </p>
                {fbError && (
                  <p style={{ fontSize: '13px', color: '#DC2626', margin: 0, lineHeight: 1.6 }}>
                    {fbError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={closeFeedback}
                  className="hero-cta"
                  style={{ background: 'var(--ink)', color: 'var(--canvas)', borderRadius: '9999px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                  Your name
                  <input
                    type="text"
                    value={fbName}
                    onChange={(e) => setFbName(e.target.value)}
                    placeholder="Jane Dela Cruz"
                    style={{ fontSize: '14px', fontWeight: 400, padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)', outline: 'none', color: 'var(--ink)' }}
                  />
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                  Rating
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFbStars(s)}
                        onMouseEnter={() => setFbHover(s)}
                        onMouseLeave={() => setFbHover(0)}
                        aria-label={`${s} star${s > 1 ? 's' : ''}`}
                        style={{ padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <Star
                          size={24}
                          color={(fbHover || fbStars) >= s ? ACCENT : '#CBD5E1'}
                          fill={(fbHover || fbStars) >= s ? ACCENT : 'none'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                  Comment
                  <textarea
                    value={fbComment}
                    onChange={(e) => setFbComment(e.target.value)}
                    placeholder="What stood out in the portfolio?"
                    required
                    rows={4}
                    style={{ fontSize: '14px', fontWeight: 400, padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--card-border)', outline: 'none', resize: 'vertical', color: 'var(--ink)', fontFamily: 'inherit' }}
                  />
                </label>
                <button
                  type="submit"
                  disabled={fbSending}
                  className="hero-cta"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--ink)', color: 'var(--canvas)', borderRadius: '9999px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, border: 'none', cursor: fbSending ? 'wait' : 'pointer', opacity: fbSending ? 0.7 : 1 }}
                >
                  <Send size={15} />
                  <span>{fbSending ? 'Sending…' : 'Submit for review'}</span>
                </button>
                <p style={{ fontSize: '12px', color: 'var(--faint)', margin: 0, lineHeight: 1.55 }}>
                  Goes straight to the owner's email inbox. Published publicly only after approval.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
