import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  Award,
  FolderCheck,
  Dribbble,
  Target,
  Crown,
  Swords,
  Camera,
  Clapperboard,
  Scissors,
  Gamepad2,
  Plane,
  UtensilsCrossed,
  Wifi,
  MonitorCheck,
  ChevronDown,
  Check,
  Ruler,
  FileText,
  ClipboardList,
  Gauge,
} from 'lucide-react';

interface AboutSectionProps {
  onNavigateSection?: (index: number) => void;
}

/* ---------- Rolling odometer digit ---------- */
const Digit: React.FC<{ digit: string }> = ({ digit }) => {
  if (digit < '0' || digit > '9') {
    return <span>{digit}</span>;
  }
  return (
    <span
      aria-hidden
      style={{ display: 'inline-block', height: '1em', overflow: 'hidden', verticalAlign: 'top' }}
    >
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(-${Number(digit)}em)`,
          transition: 'transform 0.12s linear',
          lineHeight: 1,
        }}
      >
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
          <span key={n} style={{ height: '1em', lineHeight: 1 }}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
};

/* ---------- Animated counter (rolling odometer, counts up when in view) ---------- */
const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }} aria-label={`${value}${suffix}`}>
      {String(display)
        .split('')
        .map((ch, i) => (
          <Digit key={i} digit={ch} />
        ))}
      {suffix}
    </span>
  );
};

const glanceStats = [
  { value: 3, suffix: '', label: 'Years Experience', icon: Briefcase },
  { value: 2, suffix: '', label: 'PRC Licenses', icon: Award },
  { value: 60, suffix: '+', label: 'Projects Delivered', icon: FolderCheck },
];

const roles = [
  { title: 'Quantity Take-Offs', desc: 'Calibrated digital measurements', icon: Ruler },
  { title: 'Trade BOQs', desc: 'Itemized, review-ready bills', icon: FileText },
  { title: 'Precon Documentation', desc: 'RFIs, QC logs & handoffs', icon: FolderCheck },
  { title: 'Project Coordination', desc: 'Tracking & trade alignment', icon: ClipboardList },
];

const hobbies: { label: string; icon: React.ComponentType<{ className?: string; size?: number | string }> }[] = [
  { label: 'Basketball', icon: Dribbble },
  { label: 'Pickleball', icon: Target },
  { label: 'Chess', icon: Crown },
  { label: 'Game of the Generals', icon: Swords },
  { label: 'Photography', icon: Camera },
  { label: 'Videography', icon: Clapperboard },
  { label: 'Photo & Video Editing', icon: Scissors },
  { label: 'Dota 2', icon: Gamepad2 },
  { label: 'NBA 2K', icon: Gamepad2 },
  { label: 'Travel', icon: Plane },
  { label: 'Food Trips', icon: UtensilsCrossed },
];

const faqs = [
  {
    q: 'How do you price a project?',
    a: 'Every project is scoped from the actual drawing set — I review the sheets, confirm the trades involved, and give a fixed quote before any measuring starts. No hourly surprises, no hidden fees.',
  },
  {
    q: 'What are your working hours?',
    a: 'I work from the Philippines (GMT+8) with daily overlap for US and Australian teams. Milestone check-ins are scheduled inside your working hours, not mine.',
  },
  {
    q: 'How fast will I hear back?',
    a: 'Within 24 hours for plan reviews and inquiries. Urgent tender deadlines get priority scheduling — just flag the bid date in your first message.',
  },
  {
    q: 'What tools do you work in?',
    a: 'PlanSwift and Bluebeam Revu for take-offs and markups, Excel for BOQs and formula lineage, plus AutoCAD, Google Workspace and Drive for coordination and handoffs.',
  },
  {
    q: 'What exactly do I receive?',
    a: 'Calibrated take-off markups, a trade-by-trade BOQ, an RFI log for drawing conflicts, a zero-variance QC reconciliation matrix, and CSV traceability back to every measurement.',
  },
  {
    q: 'Is your setup reliable for remote contracts?',
    a: 'Yes. My workstation runs the full stack daily — PlanSwift, Bluebeam, AutoCAD and Excel — files sync in real time through Drive, and my live availability is shown on this site. Progress is shared against milestones, never into the void.',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateSection }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ping, setPing] = useState('—');
  /* Site ping — same-origin round trip, measured live. */
  useEffect(() => {
    let cancelled = false;
    const measurePing = async () => {
      try {
        const start = performance.now();
        await fetch(`${window.location.origin}/?ping=${Date.now()}`, { cache: 'no-store' });
        if (!cancelled) setPing(`${Math.round(performance.now() - start)} ms`);
      } catch {
        /* offline or blocked */
      }
    };
    measurePing();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-full w-full flex flex-col justify-center py-6 sm:py-10 lg:py-12"
    >
      <style>{`
        .abt-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; box-shadow: 0 4px 20px -2px rgba(0,0,0,0.03); background: var(--card); border: 1px solid var(--card-border); }
        .abt-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px -4px rgba(0,0,0,0.08); border-color: #CBD5E1; }
        .abt-hobby-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .abt-hobby-grid > div { flex: 1 1 150px; max-width: 210px; }
        .abt-split { display: grid; grid-template-columns: 5fr 7fr; gap: 32px; align-items: start; }
        .abt-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .abt-trio { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 1023px) { .abt-split { grid-template-columns: 1fr; } }
        @media (max-width: 639px) { .abt-duo { grid-template-columns: 1fr; } .abt-trio { grid-template-columns: 1fr; } }
      `}</style>

      {/* Background Architectural Subtle CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-50" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-radial from-[#FF5600]/[0.03] dark:from-[#FF5600]/[0.05] to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex flex-col">

        {/* ============ 1. HERO TEXT ============ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
            ABOUT
          </span>
          <h1
            style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.01em', color: 'var(--ink)', margin: 0 }}
          >
            Hi, I Am <span style={{ color: '#FF5600' }}>Carl!</span>
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--muted)', margin: 0, lineHeight: 1.6, maxWidth: '640px' }}>
            I price to win bids and manage your construction business to save time.
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
            gap: '40px',
            boxShadow: '0 8px 30px -12px rgba(0,0,0,0.08)',
          }}
        >

          {/* ---- 1. About me ---- */}
          <div className="abt-split">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                <div
                  className="abt-card"
                  style={{ borderRadius: '20px', overflow: 'hidden', padding: 0, border: 'none', background: '#0F172A' }}
                >
                  <img
                    src="/assets/profile/IMG_2068-web.jpg"
                    alt="Engr. Christ Carl Tapat - Professional Profile"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: 'center 12%', display: 'block' }}
                    onContextMenu={(e) => e.preventDefault()}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
                ABOUT ME
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--body)', lineHeight: 1.7 }}>
                <p style={{ margin: 0 }}>
                  As a Construction Estimator with registered Civil Engineer and Master Plumber
                  credentials, I bridge architectural drawings with mathematical precision. My focus
                  is delivering structured quantity take-offs, trade-by-trade BOQs, and proactive
                  preconstruction documentation that estimators and project leads can immediately
                  review and trust.
                </p>
                <p style={{ margin: 0 }}>
                  Operating remotely from the Philippines (GMT+8), I support US and Australian
                  construction teams during tender and preconstruction phases. Whether reviewing
                  complex multi-trade drawing sets in PlanSwift or Bluebeam Revu, every measurement
                  is calibrated, cross-checked, and traceably linked to clear line items.
                </p>
              </div>
            </div>
          </div>

          {/* ---- 2. At a glance (animated) ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
              AT A GLANCE
            </span>
            <div className="abt-trio">
              {glanceStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="abt-card"
                    style={{ borderRadius: '20px', padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}
                  >
                    <span
                      style={{
                        width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,86,0,0.08)', border: '1px solid rgba(255,86,0,0.25)',
                      }}
                    >
                      <Icon size={22} color="#FF5600" />
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '32px', fontWeight: 700, color: '#FF5600', lineHeight: 1 }}>
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--body)', marginTop: '4px' }}>
                        {stat.label}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---- 3. What I do (brief — detail lives in Services) ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
                WHAT I DO
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateSection) onNavigateSection(3);
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', padding: 0, fontSize: '13px', fontWeight: 700, color: '#FF5600', cursor: 'pointer' }}
              >
                <span>Full services breakdown</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.title}
                    type="button"
                    onClick={() => {
                      if (onNavigateSection) onNavigateSection(3);
                    }}
                    className="abt-card"
                    style={{ borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: '36px', height: '36px', borderRadius: '11px', flexShrink: 0,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,86,0,0.08)',
                      }}
                    >
                      <Icon size={18} color="#FF5600" />
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>{role.title}</span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{role.desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---- 4. Hobbies ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
              OFF THE DRAWINGS · MY HOBBIES
            </span>
            <div className="abt-hobby-grid">
              {hobbies.map((hobby) => {
                const Icon = hobby.icon;
                return (
                  <div
                    key={hobby.label}
                    className="abt-card"
                    style={{ borderRadius: '14px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}
                  >
                    <span
                      style={{
                        width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,86,0,0.08)',
                      }}
                    >
                      <Icon size={17} color="#FF5600" />
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35 }}>
                      {hobby.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---- 5 & 6. Setup: connection + workstation ---- */}
          <div className="abt-duo">
            <div
              className="abt-card"
              style={{ borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,86,0,0.08)', border: '1px solid rgba(255,86,0,0.25)',
                  }}
                >
                  <Wifi size={19} color="#FF5600" />
                </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>My Internet Speed</span>
                <span style={{ fontSize: '11px', color: 'var(--faint)' }}>PLDT Home Fiber · Tested September 2026</span>
              </div>
            </div>
            <div
              style={{ background: 'var(--pill)', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}
            >
              <Gauge size={26} color="#FF5600" style={{ flexShrink: 0 }} />
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  202.5 Mbps
                </span>
                <span style={{ fontSize: '11px', color: 'var(--faint)', marginTop: '4px' }}>
                  Download · 201.4 Mbps upload · 5 ms ping · Cagayan de Oro server
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <a
                href="https://www.speedtest.net/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'var(--ink)', color: 'var(--canvas)', borderRadius: '9999px',
                  padding: '9px 18px', fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                }}
              >
                <span>Verify on Speedtest by Ookla</span>
                <ArrowUpRight size={14} style={{ opacity: 0.7 }} />
              </a>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
                This visit: site ping {ping}
              </span>
            </div>
            </div>

            <div
              className="abt-card"
              style={{ borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,86,0,0.08)', border: '1px solid rgba(255,86,0,0.25)',
                  }}
                >
                  <MonitorCheck size={19} color="#FF5600" />
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink)' }}>My Workstation</span>
                  <span style={{ fontSize: '11px', color: 'var(--faint)' }}>Actual machine behind every take-off</span>
                </div>
              </div>
              {/* Real system specs */}
              <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--pill)', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '6px 14px' }}>
                {[
                  { label: 'System', value: 'Windows 11 Pro · 64-bit' },
                  { label: 'Processor', value: 'Intel Core i5-10400 · 6C / 12T @ 2.90 GHz' },
                  { label: 'Memory', value: '32 GB RAM' },
                  { label: 'Graphics', value: 'NVIDIA GeForce GTX 1660 SUPER' },
                ].map((spec, i, arr) => (
                  <div
                    key={spec.label}
                    style={{
                      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px',
                      padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--card-border)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--faint)', fontWeight: 700, flexShrink: 0 }}>
                      {spec.label}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)', textAlign: 'right' }}>
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'PlanSwift & Bluebeam run multi-sheet sets smoothly',
                  'AutoCAD drafting + heavy Excel workbooks, lag-free',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--body)', lineHeight: 1.5 }}>
                    <Check size={15} color="#FF5600" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- 7. FAQ ---- */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--faint)', fontWeight: 700 }}>
              QUESTIONS EMPLOYERS ASK
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="abt-card"
                    style={{ borderRadius: '16px', overflow: 'hidden' }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                        background: 'none', border: 'none', padding: '15px 18px', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={17}
                        color="#FF5600"
                        style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
                      />
                    </button>
                    {isOpen && (
                      <p style={{ fontSize: '13px', color: 'var(--body)', margin: 0, lineHeight: 1.65, padding: '0 18px 16px' }}>
                        {faq.a}
                      </p>
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
