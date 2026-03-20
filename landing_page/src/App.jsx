import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";

/* ============================================================
   FYNOVO — Teal #005F7A · Animations · Bold Typography
   Fonts: Plus Jakarta Sans 800 (headings) · Outfit 400 (body) · DM Mono (labels)
   ============================================================ */

function useReveal(t = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold: t }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return [ref, on];
}
function R({ c = "r", d = "", children, style = {} }) {
  const [ref, on] = useReveal();
  return <div ref={ref} className={`${c} ${d} ${on ? "on" : ""}`} style={style}>{children}</div>;
}

/* ---- SVG icons for placeholders ---- */
const IconDashboard = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="2" y="2" width="32" height="32" rx="4" stroke="white" strokeOpacity=".4" strokeWidth="1.2"/>
    <rect x="6" y="8" width="10" height="6" rx="2" fill="white" fillOpacity=".3"/>
    <rect x="20" y="8" width="10" height="6" rx="2" fill="white" fillOpacity=".3"/>
    <rect x="6" y="20" width="6" height="10" rx="2" fill="white" fillOpacity=".45"/>
    <rect x="15" y="16" width="6" height="14" rx="2" fill="white" fillOpacity=".45"/>
    <rect x="24" y="12" width="6" height="18" rx="2" fill="white" fillOpacity=".55"/>
  </svg>
);
const IconChart = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <polyline points="4,28 10,18 16,22 22,10 28,14 34,6" stroke="white" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="10" cy="18" r="2.5" fill="white" fillOpacity=".6"/>
    <circle cx="22" cy="10" r="2.5" fill="white" fillOpacity=".6"/>
    <circle cx="34" cy="6"  r="2.5" fill="white" fillOpacity=".6"/>
  </svg>
);
const IconDoc = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="2" width="22" height="28" rx="3" stroke="white" strokeOpacity=".4" strokeWidth="1.2"/>
    <rect x="10" y="8"  width="14" height="2" rx="1" fill="white" fillOpacity=".4"/>
    <rect x="10" y="13" width="10" height="2" rx="1" fill="white" fillOpacity=".3"/>
    <rect x="10" y="18" width="12" height="2" rx="1" fill="white" fillOpacity=".3"/>
    <circle cx="27" cy="28" r="5" fill="white" fillOpacity=".2" stroke="white" strokeOpacity=".4" strokeWidth="1.2"/>
    <path d="M25 28l1.5 1.5L29 26.5" stroke="white" strokeOpacity=".7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAI = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="10" stroke="white" strokeOpacity=".4" strokeWidth="1.2"/>
    <circle cx="18" cy="18" r="4"  fill="white" fillOpacity=".35"/>
    <line x1="18" y1="4"  x2="18" y2="8"  stroke="white" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="18" y1="28" x2="18" y2="32" stroke="white" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="4"  y1="18" x2="8"  y2="18" stroke="white" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="28" y1="18" x2="32" y2="18" stroke="white" strokeOpacity=".5" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18" cy="18" r="1.5" fill="white"/>
  </svg>
);
const IconPortfolio = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="14" stroke="white" strokeOpacity=".3" strokeWidth="1.2"/>
    <path d="M18 4 A14 14 0 0 1 32 18" stroke="white" strokeOpacity=".7" strokeWidth="3" strokeLinecap="round"/>
    <path d="M18 4 A14 14 0 0 0 5 25" stroke="white" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="18" cy="18" r="3" fill="white" fillOpacity=".5"/>
  </svg>
);
const IconPhone = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="10" y="2" width="16" height="28" rx="4" stroke="white" strokeOpacity=".4" strokeWidth="1.2"/>
    <rect x="13" y="6" width="10" height="14" rx="2" fill="white" fillOpacity=".15"/>
    <circle cx="18" cy="26" r="1.5" fill="white" fillOpacity=".4"/>
    <rect x="14" y="8"  width="8" height="1.5" rx=".75" fill="white" fillOpacity=".3"/>
    <rect x="14" y="12" width="6" height="1.5" rx=".75" fill="white" fillOpacity=".2"/>
  </svg>
);
const IconGrid = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="3"  y="3"  width="13" height="13" rx="3" fill="white" fillOpacity=".3"/>
    <rect x="20" y="3"  width="13" height="13" rx="3" fill="white" fillOpacity=".2"/>
    <rect x="3"  y="20" width="13" height="13" rx="3" fill="white" fillOpacity=".2"/>
    <rect x="20" y="20" width="13" height="13" rx="3" fill="white" fillOpacity=".3"/>
  </svg>
);
const PH_ICON = { dashboard: IconDashboard, chart: IconChart, doc: IconDoc, ai: IconAI, portfolio: IconPortfolio, phone: IconPhone, grid: IconGrid };

/* Rich SVG dashboard mockup for hero */
const HeroDashboard = () => (
  <svg viewBox="0 0 400 268" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "90%", maxWidth: 400 }}>
    {/* App window */}
    <rect x="0" y="0" width="400" height="268" rx="12" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.18)" strokeWidth="1"/>
    {/* Title bar */}
    <rect x="0" y="0" width="400" height="36" rx="12" fill="rgba(0,0,0,.25)"/>
    <rect x="0" y="24" width="400" height="12" fill="rgba(0,0,0,.25)"/>
    <circle cx="18" cy="18" r="5" fill="rgba(255,100,100,.4)"/>
    <circle cx="32" cy="18" r="5" fill="rgba(255,200,0,.35)"/>
    <circle cx="46" cy="18" r="5" fill="rgba(100,220,100,.35)"/>
    <rect x="62" y="13" width="40" height="10" rx="3" fill="rgba(255,255,255,.2)"/>
    {/* Nav items */}
    <rect x="230" y="13" width="22" height="10" rx="3" fill="rgba(255,255,255,.1)"/>
    <rect x="258" y="13" width="22" height="10" rx="3" fill="rgba(255,255,255,.1)"/>
    <rect x="286" y="13" width="22" height="10" rx="3" fill="rgba(255,255,255,.1)"/>
    <rect x="316" y="11" width="38" height="14" rx="5" fill="rgba(255,255,255,.28)"/>
    {/* Stat cards */}
    <rect x="12" y="48" width="108" height="56" rx="8" fill="rgba(255,255,255,.1)"/>
    <rect x="20" y="57" width="36" height="7" rx="3" fill="rgba(255,255,255,.22)"/>
    <rect x="20" y="68" width="52" height="18" rx="4" fill="rgba(255,255,255,.32)"/>
    <rect x="76" y="74" width="28" height="12" rx="3" fill="rgba(255,255,255,.15)"/>
    <rect x="132" y="48" width="108" height="56" rx="8" fill="rgba(255,255,255,.1)"/>
    <rect x="140" y="57" width="36" height="7" rx="3" fill="rgba(255,255,255,.22)"/>
    <rect x="140" y="68" width="44" height="18" rx="4" fill="rgba(255,255,255,.32)"/>
    <rect x="196" y="74" width="28" height="12" rx="3" fill="rgba(255,255,255,.15)"/>
    <rect x="252" y="48" width="136" height="56" rx="8" fill="rgba(255,255,255,.1)"/>
    <rect x="260" y="57" width="36" height="7" rx="3" fill="rgba(255,255,255,.22)"/>
    <rect x="260" y="68" width="36" height="18" rx="4" fill="rgba(255,255,255,.32)"/>
    <rect x="316" y="74" width="36" height="12" rx="3" fill="rgba(255,255,255,.1)"/>
    {/* Chart area */}
    <rect x="12" y="116" width="236" height="140" rx="8" fill="rgba(255,255,255,.07)"/>
    <rect x="22" y="126" width="64" height="8" rx="3" fill="rgba(255,255,255,.16)"/>
    {/* Bar chart */}
    <rect x="28"  y="202" width="20" height="42" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="56"  y="182" width="20" height="62" rx="3" fill="rgba(255,255,255,.25)"/>
    <rect x="84"  y="190" width="20" height="54" rx="3" fill="rgba(255,255,255,.2)"/>
    <rect x="112" y="170" width="20" height="74" rx="3" fill="rgba(255,255,255,.3)"/>
    <rect x="140" y="178" width="20" height="66" rx="3" fill="rgba(255,255,255,.25)"/>
    <rect x="168" y="158" width="20" height="86" rx="3" fill="rgba(255,255,255,.35)"/>
    <rect x="196" y="165" width="20" height="79" rx="3" fill="rgba(255,255,255,.28)"/>
    {/* Trend line */}
    <polyline points="38,202 66,184 94,192 122,170 150,178 178,158 206,165"
      stroke="rgba(255,255,255,.75)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="38"  cy="202" r="3.5" fill="white" fillOpacity=".75"/>
    <circle cx="178" cy="158" r="3.5" fill="white" fillOpacity=".75"/>
    <circle cx="206" cy="165" r="3.5" fill="white" fillOpacity=".75"/>
    {/* Right panel */}
    <rect x="260" y="116" width="128" height="140" rx="8" fill="rgba(255,255,255,.07)"/>
    <rect x="270" y="128" width="68" height="8" rx="3" fill="rgba(255,255,255,.16)"/>
    <rect x="270" y="142" width="50" height="5" rx="2.5" fill="rgba(255,255,255,.1)"/>
    <rect x="270" y="152" width="58" height="5" rx="2.5" fill="rgba(255,255,255,.1)"/>
    <rect x="270" y="162" width="42" height="5" rx="2.5" fill="rgba(255,255,255,.1)"/>
    {/* Donut */}
    <circle cx="324" cy="202" r="26" stroke="rgba(255,255,255,.18)" strokeWidth="12" fill="none"/>
    <circle cx="324" cy="202" r="26" stroke="rgba(255,255,255,.65)" strokeWidth="12" fill="none" strokeDasharray="60 163" strokeLinecap="round" strokeDashoffset="-8"/>
    <circle cx="324" cy="202" r="26" stroke="rgba(255,255,255,.35)" strokeWidth="12" fill="none" strokeDasharray="38 185" strokeLinecap="round" strokeDashoffset="-68"/>
  </svg>
);

/* Image Placeholder */
function Ph({ label = "Photo", num = "00", style = {}, type = "grid", src = null, mockup = null, children }) {
  if (src) {
    return (
      <div className="ph" style={style}>
        <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {children}
      </div>
    );
  }
  const Icon = PH_ICON[type] || PH_ICON.grid;
  return (
    <div className="ph" style={style}>
      <div className="ph-grid" />
      {mockup
        ? <div style={{ position: "relative", zIndex: 2, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>{mockup}</div>
        : <div className="ph-inner"><div className="ph-icon-wrap"><Icon /></div><div className="ph-label">{label}</div></div>
      }
      <div className="ph-c tl" /><div className="ph-c tr" />
      <div className="ph-c bl" /><div className="ph-c br" />
      <div className="ph-num">{num}</div>
      {children}
    </div>
  );
}

function Eyebrow({ text }) {
  return (
    <div className="eyebrow">
      <div className="eyebrow-line" />
      <span className="label">{text}</span>
    </div>
  );
}

/* ========================================================== NAV - FIXED MOBILE */
function Nav() {
  const [s, setS] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fn = () => setS(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(open => !open), []);

  return (
    <>
      <nav className={`nav${s ? " s" : ""}`}>
        <a href="#hero" className="nav-logo">Fy<em>novo</em></a>
        <ul className={`nav-links${isOpen ? " open" : ""}`}>
          {["Platform", "Pricing", "Integrations", "Journal"].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <a href="https://fynovo.in/" className="btn btn-primary btn-sm d-none-mobile ripple glow-hover">Open Account →</a>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Menu" aria-expanded={isOpen}>
          <span></span><span></span><span></span>
        </button>
      </nav>
      {isOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-head">
              <span className="nav-logo">Fy<em>novo</em></span>
              <button className="hamburger" onClick={toggleMenu} aria-expanded="true">
                <span></span><span></span><span></span>
              </button>
            </div>
            {["Platform", "Pricing", "Integrations", "Journal"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="mobile-link" onClick={toggleMenu}>{l}</a>
            ))}
            <a href="https://fynovo.in/" className="btn btn-primary btn-full ripple glow-hover" style={{ marginTop: 20 }}>Open Account →</a>
          </div>
        </div>
      )}
    </>
  );
}

/* ========================================================== HERO */
function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", paddingTop: 68, background: "var(--bg)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Animated background blobs */}
      <div style={{ position: "absolute", top: -180, right: -160, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, var(--primary-pale) 0%, transparent 68%)", pointerEvents: "none", zIndex: 0, animation: "blobDrift 12s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: 40, left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, var(--primary-bg) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, animation: "blobDrift 16s ease-in-out infinite reverse" }} />

      {/* Ticker */}
      <div className="ticker" style={{ position: "relative", zIndex: 2 }}>
        <div className="ticker-inner">
          {[...Array(3)].flatMap((_, pass) =>
            ["GST AUTO-CALC", "SHOPIFY SYNC", "LIVE NSE FEED", "TDS TRACKING", "5-YR FORECAST", "AI ADVISOR", "RAZORPAY LINKED", "AUDIT TRAIL", "GROQ LLAMA 3.3", "MULTI-TENANT"].map((t, i) => (
              <span key={`${pass}-${i}`} className={`ticker-item${i % 4 === 0 ? " hi" : ""}`}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* Main grid */}
      <div className="hero-grid container" style={{ flex: 1, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <R>
            <div style={{ marginBottom: 28 }}>
              <div className="badge"><span className="badge-dot" />Financial Intelligence Platform</div>
            </div>
          </R>
          <R c="r" d="d1">
            <h1 className="display" style={{ fontSize: "clamp(48px,6vw,82px)", marginBottom: 24 }}>
              Automates Your<br />
              <span className="text-gradient">Taxes, Assets</span><br />
              &amp; Cashflow.
            </h1>
          </R>
          <R c="r" d="d2">
            <p className="body-lg" style={{ maxWidth: 460, marginBottom: 36 }}>
              Fynovo is the operating layer for your finances. It connects every rupee across platforms, computes your tax position in real time, and sends you AI-driven moves — before your CA does.
            </p>
          </R>

          {/* Chips with staggered float */}
          <R c="r" d="d3">
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              {[["₹4.2L", "Revenue today", "↑18.4%"], ["₹3.1L", "Net profit", "↑24.1%"], ["84/100", "Tax score", "Optimised"]].map(([v, l, d], i) => (
                <div className="chip" key={l} style={{ animation: `float ${4 + i * 0.8}s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}>
                  <div className="chip-v">{v}</div>
                  <div className="chip-l">{l}</div>
                  <div className="chip-d">{d}</div>
                </div>
              ))}
            </div>
          </R>

          {/* CTAs */}
          <R c="r" d="d4">
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <a href="https://fynovo.in/" className="btn btn-primary btn-lg">Start Free — ₹0</a>
              <button className="btn btn-ghost">
                <span style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--primary)" }}>▷</span>
                Watch 90s demo
              </button>
            </div>
          </R>
        </div>

        {/* RIGHT — rich dashboard mockup */}
        <R c="rs" d="d2" style={{ height: "100%", minHeight: 500 }}>
          <Ph label="Dashboard · Hero" num="01" type="dashboard" mockup={<HeroDashboard />} style={{ height: "100%", minHeight: 500 }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px", background: "linear-gradient(transparent, rgba(0,74,96,.92))", zIndex: 5, display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderRadius: "0 0 var(--r-lg) var(--r-lg)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "rgba(255,255,255,.55)", marginBottom: 4, letterSpacing: ".16em", textTransform: "uppercase" }}>Revenue · Q2 2025</div>
                <div style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 30, color: "#fff", letterSpacing: "-.03em" }}>₹42.8L</div>
              </div>
              <svg width="90" height="36" viewBox="0 0 90 36">
                <polyline points="0,30 16,22 30,26 46,12 62,16 78,5 90,8"
                  fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: "drawLine 2s ease .8s forwards" }} />
              </svg>
            </div>
          </Ph>
        </R>
      </div>

      {/* City strip */}
      <div className="city-strip" style={{ position: "relative", zIndex: 1 }}>
        {["Mumbai", "Bangalore", "Delhi", "Chennai", "Hyderabad", "Pune"].map(c => (
          <span key={c} className="city-name">{c}</span>
        ))}
        <span className="city-live">Live</span>
      </div>
    </section>
  );
}

/* ========================================================== STATS */
function Stats() {
  const [ref, on] = useReveal(0.3);
  const [vals, setVals] = useState([0, 0, 0, 0]);
  const tgts = [70, 5000, 98, 42];
  useEffect(() => {
    if (!on) return;
    tgts.forEach((t, i) => {
      let c = 0; const step = t / 55;
      const id = setInterval(() => {
        c = Math.min(c + step, t);
        setVals(p => { const n = [...p]; n[i] = Math.round(c); return n; });
        if (c >= t) clearInterval(id);
      }, 20);
    });
  }, [on]);
  const data = [
    { pre: "", suf: "%", lbl: "Reduction in\nmanual finance work" },
    { pre: "", suf: "+", lbl: "Businesses trust\nFynovo daily" },
    { pre: "", suf: "%", lbl: "Customer\nsatisfaction rate" },
    { pre: "₹", suf: "Cr", lbl: "Revenue processed\nthis year" },
  ];
  return (
    <div ref={ref} className="stats-wrap">
      <div className="container">
        <div className="stats-grid">
          {data.map(({ pre, suf, lbl }, i) => (
            <div key={i} className="stat-item" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,.1)" : "none" }}>
              <div className="stats-n">{pre}<em>{vals[i].toLocaleString()}</em>{suf}</div>
              <div className="stats-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================== FEATURES */
const FEATS = [
  { n: "01", t: "Smart Financial Dashboard", b: "Real-time P&L, balance sheet, and cashflow unified. Multi-source income from Shopify, banks, and manual entries — always current." },
  { n: "02", t: "AI Financial Advisor", b: "Powered by Gemini & Groq LLaMA 3.3. Personalised savings tips, investment suggestions, and spending alerts — like a CFO in your pocket." },
  { n: "03", t: "Automated Tax Engine", b: "GST, TDS, and Income Tax calculated in real-time. Tax Optimization Score surfaces legal savings you'd miss otherwise." },
  { n: "04", t: "Intelligent Asset Management", b: "Gold, silver, equities, crypto tracked live with 5-year AI projections. Know what your assets will be worth in 2030." },
  { n: "05", t: "SmartBorrow Strategy", b: "AI modelling of borrowing costs, loan structures, and repayment strategies. Minimise interest, maximise working capital." },
  { n: "06", t: "Real-Time Notifications", b: "Socket.io-powered alerts for bills, transactions, market swings. The platform watches the numbers so you don't have to." },
];

function Features() {
  return (
    <section id="platform" className="section">
      <div className="container">
        <div className="feat-grid">
          <div>
            <R c="r"><Eyebrow text="Platform" /></R>
            <R c="r" d="d1">
              <h2 className="display" style={{ fontSize: "clamp(36px,4.5vw,62px)", marginBottom: 20 }}>
                Built for the way<br />money{" "}
                <span className="text-gradient">actually</span><br />
                moves.
              </h2>
            </R>
            <R c="r" d="d2">
              <p className="body-md" style={{ maxWidth: 360, marginBottom: 40 }}>
                Every feature is designed around the real financial pressures on Indian SMEs, freelancers, and digital entrepreneurs.
              </p>
            </R>
            <R c="rs" d="d3">
              <Ph label="Platform Overview" num="04" type="dashboard" style={{ height: 300, width: "100%", marginBottom: 12 }} />
            </R>
            <R c="rs" d="d4">
              <Ph label="Mobile App View" num="05" type="phone" style={{ height: 180, width: "100%" }} />
            </R>
          </div>
          <div style={{ paddingTop: 8 }}>
            {FEATS.map(({ n, t, b }, i) => (
              <R key={n} c="r" d={`d${Math.min(i + 1, 6)}`}>
                <div className="feat-row">
                  <div className="feat-n">{n}</div>
                  <div><div className="feat-t">{t}</div><div className="feat-b">{b}</div></div>
                  <div className="feat-a">→</div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================== SHOWCASE */
function Showcase() {
  return (
    <section className="section section-alt">
      <div className="container show-head" style={{ marginBottom: 48 }}>
        <div className="show-head-inner">
          <R c="r">
            <Eyebrow text="Product Screens" />
            <h2 className="display" style={{ fontSize: "clamp(32px,4vw,54px)" }}>
              See it in <span className="text-gradient">motion.</span>
            </h2>
          </R>
          <R c="r" d="d2"><div className="badge"><span className="badge-dot" />27 Screens</div></R>
        </div>
      </div>
      <div className="container">
        <div className="show-grid-1">
          <R c="rs" d="d1" className="span-2"><Ph label="Full Dashboard" num="06" type="dashboard" style={{ height: "100%", width: "100%" }} /></R>
          <R c="rs" d="d2"><Ph label="Analytics View" num="07" type="chart" style={{ height: "100%" }} /></R>
          <R c="rs" d="d3"><Ph label="Tax Filing" num="08" type="doc" style={{ height: "100%" }} /></R>
          <R c="rs" d="d4"><Ph label="Asset Portfolio" num="09" type="portfolio" style={{ height: "100%" }} /></R>
          <R c="rs" d="d5"><Ph label="AI Chat" num="10" type="ai" style={{ height: "100%" }} /></R>
        </div>
        <div className="show-grid-2">
          {[["Invoice View","11","doc"],["Notifications","12","grid"],["Mobile App","13","phone"],["Settings","14","grid"]].map(([l,n,t]) => (
            <R key={n} c="rs"><Ph label={l} num={n} type={t} style={{ height: 180 }} /></R>
          ))}
        </div>
        <R c="rs"><Ph label="Onboarding Flow · Panorama" num="15" type="dashboard" style={{ height: 130, width: "100%" }} /></R>
      </div>
    </section>
  );
}

/* ========================================================== DEEP FEATURE */
function DeepFeat({ tag, h1, hBold, body, checks, imgLabel, imgNum, imgType = "chart", reverse }) {
  const text = (
    <R c={reverse ? "rr" : "rl"}>
      <Eyebrow text={tag} />
      <h2 className="display" style={{ fontSize: "clamp(30px,3.2vw,48px)", marginBottom: 20, lineHeight: 1.08 }}>
        {h1}<br /><span className="text-gradient">{hBold}</span>
      </h2>
      <p className="body-md" style={{ marginBottom: 32 }}>{body}</p>
      <div>
        {checks.map((c, i) => (
          <div key={i} className="check-item">
            <div className="check-box">✓</div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-2)", lineHeight: 1.65 }}>{c}</span>
          </div>
        ))}
      </div>
    </R>
  );
  const img = (
    <R c={reverse ? "rl" : "rr"}>
      <Ph label={imgLabel} num={imgNum} type={imgType} style={{ height: 420, width: "100%", marginBottom: 12 }}>
        <div style={{ position: "absolute", top: 20, left: 20, zIndex: 5 }}>
          <div className="badge"><span className="badge-dot" />{tag}</div>
        </div>
      </Ph>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Ph label={`${imgLabel} · Detail`} num={`${imgNum}A`} type={imgType} style={{ height: 130 }} />
        <Ph label={`${imgLabel} · Mobile`} num={`${imgNum}B`} type="phone" style={{ height: 130 }} />
      </div>
    </R>
  );
  return (
    <section className="section" style={{ borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="deep-grid">
          {reverse ? <>{img}{text}</> : <>{text}{img}</>}
        </div>
      </div>
    </section>
  );
}

/* ========================================================== PRICING */
function Pricing() {
  const plans = [
    { name: "Starter", price: "499", per: "per month / billed annually", feats: ["Single income source","Basic expense tracking","1 GB data storage","Email support"], btnClass: "btn-primary", btnText: "Get Started" },
    { name: "Professional", price: "1,499", per: "per month / billed annually", feats: ["Unlimited income sources","AI Financial Advisor","Full Tax Engine (GST/TDS)","5-year asset projections","SmartBorrow strategy"], btnClass: "btn-primary", btnText: "Start Free Trial", featured: true },
    { name: "Enterprise", price: null, per: "Contact for a custom quote", feats: ["Multi-tenant architecture","Custom API integrations","Dedicated account manager","Advanced audit trails","SLA guarantee"], btnClass: "btn-primary", btnText: "Contact Sales" },
  ];
  return (
    <section id="pricing" className="section" style={{ borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="price-head">
          <div>
            <R c="r"><Eyebrow text="Pricing" /></R>
            <R c="r" d="d1">
              <h2 className="display" style={{ fontSize: "clamp(32px,4vw,58px)" }}>
                One price.<br /><span className="text-gradient">No surprises.</span>
              </h2>
            </R>
          </div>
          <R c="r" d="d2">
            <p className="body-md" style={{ maxWidth: 280 }}>Start free, scale when ready. Every plan includes the full security stack.</p>
          </R>
        </div>
        <R c="rs" d="d3">
          <div className="price-grid">
            {plans.map(({ name, price, per, feats, btnClass, btnText, featured }) => (
              <div key={name} className={`price-card${featured ? " featured" : ""}`}>
                {featured && <div className="price-popular">Most Popular</div>}
                <div className="price-name">{name} Plan</div>
                {price ? (
                  <><div className="price-amount"><em>₹</em>{price}</div><div className="price-per">{per}</div></>
                ) : (
                  <><div className="price-amount custom">Custom</div><div className="price-per">{per}</div></>
                )}
                <div style={{ marginBottom: 8 }}>
                  {feats.map(f => (
                    <div key={f} className="price-feat"><div className="price-check">✓</div>{f}</div>
                  ))}
                </div>
                <a href="https://fynovo.in/" className={`btn ${btnClass} btn-full`} style={{ marginTop: 28 }}>{btnText}</a>
              </div>
            ))}
          </div>
        </R>
      </div>
    </section>
  );
}

/* ========================================================== TESTIMONIALS */
const TESTIS = [
  { q: "Fynovo made our quarterly close 4× faster. The AI advisor flagged a ₹2L GST saving we'd have completely missed.", name: "Rahul Krishnan", role: "Founder · D2C Brand, Chennai", init: "RK" },
  { q: "I connected Shopify on Monday. By Tuesday every order was categorised, GST computed, and I had a P&L.", name: "Priya Sharma", role: "E-commerce Seller · Bangalore", init: "PS" },
  { q: "The 5-year asset projection is frighteningly accurate. Within 4% of actual.", name: "Arjun Mehta", role: "Angel Investor · Mumbai", init: "AM" },
  { q: "We cut our CA fees by 60% because Fynovo handles everything our CA used to do manually.", name: "Sneha Iyer", role: "CFO · EdTech Startup, Pune", init: "SI" },
  { q: "SmartBorrow restructured our working capital and saved ₹8L in interest. ROI in month one.", name: "Vikram Nair", role: "SME Owner · Delhi", init: "VN" },
  { q: "As a freelancer managing 5 clients, the multi-source income view is the only way I stay sane.", name: "Deepa Rao", role: "Consultant · Hyderabad", init: "DR" },
];

function Testimonials() {
  return (
    <section id="journal" className="section section-alt" style={{ borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="testi-grid-main">
          <div style={{ position: "sticky", top: 88 }}>
            <R c="r"><Eyebrow text="Customers" /></R>
            <R c="r" d="d1">
              <h2 className="display" style={{ fontSize: "clamp(28px,3vw,48px)", marginBottom: 16 }}>
                What they<br /><span className="text-gradient">said.</span>
              </h2>
            </R>
            <R c="r" d="d2">
              <p className="body-sm" style={{ marginBottom: 28 }}>From solo freelancers to Series A teams.</p>
            </R>
            <R c="rs" d="d3"><Ph label="Customer Photo" num="19" type="grid" style={{ height: 200, width: "100%", marginBottom: 12 }} /></R>
            <R c="rs" d="d4"><Ph label="Team Office" num="20" type="grid" style={{ height: 140, width: "100%" }} /></R>
          </div>
          <div className="testi-grid-sub">
            {TESTIS.map(({ q, name, role, init }, i) => (
              <R key={name} c="r" d={`d${(i % 3) + 1}`}>
                <div className="testi-card">
                  <div className="testi-mark">"</div>
                  <p className="testi-text">"{q}"</p>
                  <div className="testi-divider" />
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="testi-avatar">{init}</div>
                    <div>
                      <div className="testi-name">{name}</div>
                      <div className="testi-role">{role}</div>
                    </div>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================== INTEGRATIONS */
const INTS = [
  ["Shopify","21","grid"],["WooCommerce","22","grid"],["Razorpay","23","grid"],["Stripe","24","grid"],
  ["Google Gemini","25","ai"],["Groq LLaMA","26","ai"],["BSE / NSE","27","chart"],["Google OAuth","28","grid"],
];

function Integrations() {
  return (
    <section id="integrations" className="section" style={{ borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="int-top">
          <div>
            <R c="r"><Eyebrow text="Integrations" /></R>
            <R c="r" d="d1">
              <h2 className="display" style={{ fontSize: "clamp(28px,3.5vw,50px)", marginBottom: 16 }}>
                Plugs into <span className="text-gradient">everything</span><br />you use.
              </h2>
            </R>
          </div>
          <R c="r" d="d2" style={{ paddingTop: 16 }}>
            <p className="body-md" style={{ marginBottom: 24 }}>
              Connect e-commerce stores, payment gateways, and banking in minutes. Data flows in automatically — you never export a CSV again.
            </p>
            <Ph label="Integration Map" num="29" type="grid" style={{ height: 160, width: "100%" }} />
          </R>
        </div>
        <R c="rs">
          <div className="int-grid">
            {INTS.map(([name, n, type]) => (
              <div key={name} className="int-item">
                <Ph label={name} num={n} type={type} style={{ width: 68, height: 68 }} />
                <div className="int-name">{name}</div>
              </div>
            ))}
          </div>
        </R>
      </div>
    </section>
  );
}

/* ========================================================== CTA */
function CTA() {
  return (
    <section className="cta-grad" style={{ padding: "120px 0", borderTop: "1px solid rgba(255,255,255,.1)" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Decorative text */}
        <div style={{ position: "absolute", bottom: -60, left: -20, fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "clamp(100px,16vw,220px)", lineHeight: 1, color: "rgba(255,255,255,.035)", pointerEvents: "none", userSelect: "none", letterSpacing: "-.05em" }}>FYNOVO</div>

        <div className="cta-grid">
          <div>
            <R c="r">
              <div style={{ marginBottom: 28 }}>
                <div className="badge badge-green"><span className="badge-dot" />Get Started Today</div>
              </div>
            </R>
            <R c="r" d="d1">
              <h2 className="display" style={{ fontSize: "clamp(36px,5.5vw,74px)", color: "#fff", marginBottom: 28 }}>
                Your finances,<br />
                <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.6)" }}>finally</em><br />
                under control.
              </h2>
            </R>
            <R c="r" d="d2">
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <a href="https://fynovo.in/" className="btn btn-white btn-lg">Open Free Account</a>
                <button className="btn btn-white-outline btn-lg">See Pricing</button>
              </div>
              <p style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,.38)", letterSpacing: ".12em", textTransform: "uppercase" }}>
                No card required · Cancel anytime
              </p>
            </R>
          </div>
          <R c="rs" d="d3">
            <Ph label="CTA Visual" num="30" type="dashboard" style={{ height: 320, width: "100%", background: "linear-gradient(145deg,rgba(0,74,96,.8),rgba(0,95,122,.4))", border: "1px solid rgba(255,255,255,.15)" }}>
              <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28, borderRadius: "var(--r-lg)" }}>
                <div className="badge badge-green" style={{ marginBottom: 12, alignSelf: "flex-start" }}><span className="badge-dot" />Live platform</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,.45)", lineHeight: 1.9, letterSpacing: ".08em", textTransform: "uppercase" }}>
                  ₹0 setup · Cancel anytime<br />GST + TDS + Income Tax<br />Shopify · Banks · WooCommerce
                </div>
              </div>
            </Ph>
          </R>
        </div>
      </div>
    </section>
  );
}

/* ========================================================== FOOTER */
function Footer() {
  const cols = [
    { h: "Company", links: ["About","Journal","Careers","Press"] },
    { h: "Product",  links: ["Features","Pricing","Integrations","Changelog"] },
    { h: "Resources",links: ["Documentation","API Docs","Help Centre","Status"] },
    { h: "Legal",    links: ["Privacy Policy","Terms","Cookies","Compliance"] },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {cols.map(({ h, links }, i) => (
            <div key={h} style={{ padding: "0 40px", borderRight: i < 3 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
              <div className="footer-head">{h}</div>
              {links.map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ borderBottom: "1px solid rgba(255,255,255,.08)", margin: "0 0 24px 0", paddingBottom: "24px", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="#" className="footer-logo">Fy<em>novo</em></a>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "rgba(255,255,255,.2)", letterSpacing: ".1em", textTransform: "uppercase" }}>
              © 2026 <a href="https://techvaseegrah.com/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.2)", textDecoration: "none" }}>Tech Vaseegrah</a> — All Rights Reserved
            </span>
          </div>
          <div className="badge badge-green" style={{ fontSize: 9 }}><span className="badge-dot" />Made in India</div>
        </div>

        <a href="https://techvaseegrah.com/" target="_blank" rel="noopener noreferrer" className="powered-by-container" style={{ textDecoration: 'none' }}>
          <img src="images/tech_vaseegrah_logo.jpeg" alt="Tech Vaseegrah Logo" className="powered-by-logo" />
          <div className="powered-by-text-wrap">
             <span style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,.4)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 2, lineHeight: 1 }}>
               Powered by
             </span>
             <span style={{ fontFamily: "var(--font-head)", color: "rgba(255,255,255,.9)", letterSpacing: "1px", fontWeight: 700, textTransform: "uppercase", lineHeight: 1 }}>
               Tech Vaseegrah
             </span>
          </div>
        </a>
      </div>
    </footer>
  );
}

/* ========================================================== ROOT */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Showcase />
      <DeepFeat tag="Tax Automation" h1="Never miss a" hBold="tax liability." body="The real-time tax engine tracks GST, TDS, and Income Tax across every transaction. Your Tax Optimization Score surfaces legal savings — every month, automatically." checks={["Auto GST across all business transactions","Income tax slab tracking with cess","TDS management for freelancers & SMEs","Personalised Tax Optimization Score"]} imgLabel="Tax Engine Screen" imgNum="16" imgType="doc" />
      <DeepFeat reverse tag="Asset Intelligence" h1="5-year projections," hBold="live markets." body="Gold, silver, equities, crypto — every asset tracked with AI forecasts built on real Indian market data. Know what your portfolio is worth today, and in 2030." checks={["Physical: Gold & Silver via live CME","Equities via BSE/NSE real-time feeds","Crypto portfolio with rebalancing alerts","Confidence-interval 5-year projections"]} imgLabel="Portfolio Screen" imgNum="17" imgType="portfolio" />
      <Pricing />
      <Testimonials />
      <Integrations />
      <CTA />
      <Footer />
    </>
  );
}
