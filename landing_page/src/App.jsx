import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const NAV_LINKS = ["Features", "Fyn AI", "How It Works", "Pricing"];

const FEATURES = [
  {
    icon: "◈",
    title: "Unified Command Center",
    desc: "Every transaction across every account — banks, wallets, cards — lands in one living view. Income, expenses, and profit updated the moment they happen.",
    color: "#00d4ff",
    tag: "Core",
  },
  {
    icon: "⬡",
    title: "Trade Intelligence",
    desc: "Connect your brokerage. Get real-time P&L across all positions, unrealised gains, allocation heatmaps, and win-rate trends updated live.",
    color: "#4facfe",
    tag: "Trading",
  },
  {
    icon: "▸",
    title: "Expense Autopilot",
    desc: "Rules-based engine that learns your spending patterns. Forgotten subscriptions, bill creep, and impulse categories flagged before they compound.",
    color: "#00f5c4",
    tag: "Savings",
  },
  {
    icon: "◉",
    title: "Cash Flow Forecast",
    desc: "Monte-Carlo projections on your runway. Know your financial position six months out with confidence intervals grounded in your actual history.",
    color: "#7b9ff9",
    tag: "Analytics",
  },
  {
    icon: "⬢",
    title: "Multi-Entity Books",
    desc: "Personal, freelance, and business ledgers — isolated but instantly consolidated when you need the full picture across all entities.",
    color: "#4facfe",
    tag: "Business",
  },
  {
    icon: "◐",
    title: "Vault-Level Security",
    desc: "AES-256 at rest, TLS 1.3 in transit, read-only OAuth bank links. Your credentials never touch Fynovo servers — ever.",
    color: "#00d4ff",
    tag: "Security",
  },
];

const AI_CAPABILITIES = [
  {
    icon: "📈",
    color: "#4facfe",
    title: "Trading P&L Analysis",
    desc: "Fyn AI reads your brokerage data and breaks down profit and loss by position, sector, time horizon, and strategy. It surfaces your win rate, average drawdown, and best-performing instruments — then flags what's quietly dragging returns.",
    points: [
      "Position-level P&L breakdown",
      "Win rate & drawdown tracking",
      "Sector exposure heatmap",
      "Underperformer alerts",
    ],
  },
  {
    icon: "✂️",
    color: "#00f5c4",
    title: "Expense Savings Engine",
    desc: "Fyn AI scans your transaction history to find subscriptions you forgot about, recurring charges that crept up, and spending categories where small changes produce big annual savings — with exact rupee impact.",
    points: [
      "Forgotten subscription detector",
      "Category overspend alerts",
      "Year-on-year spend comparison",
      "Personalised saving targets",
    ],
  },
  {
    icon: "💡",
    color: "#00d4ff",
    title: "Profit & Loss Clarity",
    desc: "Whether you're a freelancer, trader, or business owner — Fyn AI calculates your true net position across all income sources and costs. It separates one-off events from trends so you always know your real financial health.",
    points: [
      "Net profit across all entities",
      "Income source breakdown",
      "Trend vs. one-off detection",
      "Month-on-month health score",
    ],
  },
];

const STEPS = [
  {
    num: "01",
    emoji: "🔗",
    title: "Connect in 90 seconds",
    desc: "Link banks, cards, brokerages, and wallets via read-only OAuth. No credentials stored, ever. Works with 10,000+ institutions.",
  },
  {
    num: "02",
    emoji: "⚡",
    title: "Fyn learns your patterns",
    desc: "The AI maps your financial DNA — spending rhythms, income cycles, recurring obligations, and saving habits — automatically.",
  },
  {
    num: "03",
    emoji: "🎯",
    title: "Act on real clarity",
    desc: "Your dashboard updates in real time. Fyn AI surfaces insights, flags anomalies, and answers questions using only your own data.",
  },
];

const PLANS = [
  {
    name: "Solo",
    price: 9,
    desc: "For individuals managing personal finances.",
    features: ["1 seat", "3 linked accounts", "90-day history", "Fyn AI insights", "Basic reports", "Email support"],
    cta: "Start free — no card",
    hi: false,
  },
  {
    name: "Pro",
    price: 29,
    desc: "For serious investors and freelancers.",
    features: ["5 seats", "Unlimited accounts", "Full history + exports", "Fyn AI full access", "Trade P&L dashboard", "Forecast engine", "Priority support"],
    cta: "Start free — no card",
    hi: true,
  },
  {
    name: "Studio",
    price: 79,
    desc: "For teams and multi-entity businesses.",
    features: ["Unlimited seats", "Multi-entity ledgers", "API + webhooks", "White-label reports", "Custom dashboards", "Dedicated CSM", "SOC 2 & SSO"],
    cta: "Talk to sales",
    hi: false,
  },
];

const TESTIMONIALS = [
  {
    q: "I stopped bleeding ₹6,000/month in forgotten subscriptions in the first week. Fyn AI found what I never would have caught.",
    name: "Arjun S.",
    role: "Full-stack freelancer, Mumbai",
    avatar: "AS",
    c: "#00d4ff",
  },
  {
    q: "The trade P&L breakdown replaced three tools I was stitching together. The win-rate tracking is genuinely impressive.",
    name: "Rachel M.",
    role: "Retail investor, 6 years",
    avatar: "RM",
    c: "#4facfe",
  },
  {
    q: "Fyn AI caught that our SaaS tooling costs had ballooned 40% YoY. That one insight paid for years of subscription.",
    name: "Deepa N.",
    role: "COO, Vortex Labs",
    avatar: "DN",
    c: "#00f5c4",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */
function useCounter(target, duration, started, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0 = null;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const e = 1 - Math.pow(2, -10 * p);
      setVal(parseFloat((e * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration, decimals]);
  return val;
}

function useInView(ref, threshold = 0.2) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return v;
}

/* ═══════════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════════ */
function StatCard({ stat, started, i }) {
  const n = useCounter(stat.end, 1900 + i * 200, started, stat.dec);
  const fmt = () => {
    if (stat.fmt === "M+") return `${(n / 1e6).toFixed(1)}M+`;
    if (stat.fmt === "$M") return `$${Math.round(n)}M`;
    if (stat.fmt === "K+") return `${Math.round(n / 1000)}K+`;
    if (stat.fmt === "%")  return `${n.toFixed(1)}%`;
    return n;
  };
  return (
    <div className={`sc rv rv-${i + 1}`}>
      <span className="sc-ico">{stat.icon}</span>
      <strong className="sc-num">{fmt()}</strong>
      <p className="sc-lbl">{stat.label}</p>
      <div className="sc-bar">
        <div className="sc-fill" style={{ width: started ? "100%" : "0%", transitionDelay: `${i * 0.18}s` }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statsOn,    setStatsOn]    = useState(false);
  const [billing,    setBilling]    = useState("monthly");
  const [activeFeat, setActiveFeat] = useState(0);
  const [activeAI,   setActiveAI]   = useState(0);
  const [hovBar,     setHovBar]     = useState(null);
  const [chartIn,    setChartIn]    = useState(false);
  const [cursor,     setCursor]     = useState({ x: -400, y: -400 });

  const statsRef    = useRef(null);
  const chartRef    = useRef(null);
  const statsInView = useInView(statsRef, 0.3);
  const chartInView = useInView(chartRef, 0.3);

  useEffect(() => { if (statsInView) setStatsOn(true); }, [statsInView]);
  useEffect(() => { if (chartInView) setChartIn(true); }, [chartInView]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08, rootMargin: "0px 0px -28px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fn = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const STATS = [
    { icon: "📊", end: 2400000, fmt: "M+", label: "Transactions Tracked", dec: 1 },
    { icon: "💰", end: 890,     fmt: "$M", label: "Revenue Managed",      dec: 0 },
    { icon: "👥", end: 40000,   fmt: "K+", label: "Active Users",         dec: 0 },
    { icon: "🔒", end: 99.9,    fmt: "%",  label: "Uptime SLA",           dec: 1 },
  ];

  const bars = [38, 55, 42, 71, 50, 83, 62, 91, 58, 78, 68, 100];
  const mos  = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const cur  = AI_CAPABILITIES[activeAI];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

        :root {
          /* ── CORE PALETTE — Aqua + Deep Blue ── */
          --navy:     #030d1a;
          --navy2:    #061428;
          --navy3:    #0a1f3d;
          --navy4:    #0d2548;
          --panel:    #071832;
          --card:     #0c2040;
          --card2:    #102850;

          /* borders */
          --bdr:  rgba(0, 180, 255, 0.10);
          --bdr2: rgba(0, 180, 255, 0.22);
          --bdr3: rgba(0, 212, 255, 0.35);

          /* text */
          --txt:    #e8f4ff;
          --muted:  rgba(180, 215, 240, 0.60);
          --muted2: rgba(140, 185, 220, 0.38);

          /* ── BRAND ACCENTS ── */
          --aqua:       #00d4ff;       /* primary — bright aqua */
          --aqua2:      #00b8e6;       /* aqua hover */
          --aqua3:      #00f5c4;       /* secondary — cyan-mint */
          --blue:       #4facfe;       /* mid blue */
          --blue2:      #2090f0;       /* deep bright blue */
          --indigo:     #7b9ff9;       /* soft indigo accent */

          /* glows */
          --glow-aqua:  rgba(0, 212, 255, 0.18);
          --glow-blue:  rgba(79, 172, 254, 0.15);
          --glow-mint:  rgba(0, 245, 196, 0.12);

          /* radii */
          --r:  12px;
          --rl: 18px;
          --rx: 24px;
          --rxx:32px;

          /* shadows */
          --s1: 0 2px 16px rgba(0,0,0,.5);
          --s2: 0 8px 40px  rgba(0,0,0,.6);
          --s3: 0 24px 80px rgba(0,0,0,.65);
        }

        html  { scroll-behavior: smooth; }
        body  {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--navy);
          color: var(--txt);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        ::selection { background: rgba(0,212,255,.2); color: var(--aqua); }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--navy2); }
        ::-webkit-scrollbar-thumb { background: var(--aqua2); border-radius: 2px; }

        /* ── CURSOR AURORA ── */
        .cg {
          position: fixed; pointer-events: none; z-index: 0;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle,
            rgba(0,212,255,.06) 0%,
            rgba(79,172,254,.04) 40%,
            transparent 70%);
          transform: translate(-50%,-50%);
          transition: left .12s linear, top .12s linear;
        }

        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 70px; padding: 0 52px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all .4s;
          border-bottom: 1px solid transparent;
        }
        nav.up {
          background: rgba(3,13,26,.92);
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          border-color: var(--bdr);
          box-shadow: 0 1px 0 rgba(0,212,255,.06);
        }

        .logo {
          font-size: 22px; font-weight: 800;
          color: var(--txt); text-decoration: none;
          display: flex; align-items: center; gap: 11px;
          letter-spacing: -.03em;
        }
        .logo-mark {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, var(--aqua) 0%, var(--blue) 100%);
          display: grid; place-items: center; position: relative;
          flex-shrink: 0; transition: all .3s;
          box-shadow: 0 4px 18px rgba(0,212,255,.35);
        }
        .logo:hover .logo-mark {
          box-shadow: 0 6px 28px rgba(0,212,255,.55);
          transform: translateY(-1px);
        }
        .logo-mark::before {
          content: ''; position: absolute;
          width: 14px; height: 14px;
          border: 2.5px solid var(--navy); border-radius: 4px;
        }
        .logo-mark::after {
          content: ''; position: absolute;
          width: 5px; height: 5px;
          background: var(--navy); border-radius: 50%;
          top: 8px; right: 8px;
        }

        .nav-links { display: flex; gap: 34px; list-style: none; }
        .nav-links a {
          font-size: 14px; font-weight: 500;
          color: var(--muted); text-decoration: none;
          transition: color .2s; position: relative;
        }
        .nav-links a::after {
          content: ''; position: absolute;
          bottom: -3px; left: 0; right: 0;
          height: 1.5px; background: var(--aqua);
          transform: scaleX(0); transform-origin: left;
          transition: transform .25s;
        }
        .nav-links a:hover { color: var(--txt); }
        .nav-links a:hover::after { transform: scaleX(1); }

        .nav-r { display: flex; gap: 10px; align-items: center; }

        .btn-ghost {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: var(--muted); background: transparent;
          border: 1px solid var(--bdr2);
          padding: 9px 22px; border-radius: 100px;
          cursor: pointer; transition: all .25s;
          text-decoration: none;
        }
        .btn-ghost:hover {
          color: var(--aqua); border-color: var(--aqua);
          background: rgba(0,212,255,.06);
        }

        .btn-solid {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700;
          color: var(--navy); background: linear-gradient(135deg, var(--aqua) 0%, var(--blue) 100%);
          border: none; padding: 10px 24px; border-radius: 100px;
          cursor: pointer; transition: all .28s;
          text-decoration: none; display: inline-block;
          box-shadow: 0 4px 18px rgba(0,212,255,.28);
        }
        .btn-solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,212,255,.45);
          background: linear-gradient(135deg, #18dfff 0%, var(--blue) 100%);
        }
        .btn-xl { font-size: 16px; padding: 15px 42px; }

        .mob-btn { display:none; background:none; border:none; cursor:pointer; padding:6px; flex-direction:column; gap:5px; }
        .mob-btn span { display:block; width:22px; height:2px; background:var(--txt); border-radius:2px; }
        .mob-nav {
          position: fixed; top: 70px; left: 0; right: 0;
          background: rgba(3,13,26,.97); backdrop-filter: blur(28px);
          padding: 28px 24px; display: flex; flex-direction: column; gap: 20px;
          z-index: 99; border-top: 1px solid var(--bdr);
        }
        .mob-nav a { font-size: 20px; font-weight: 700; color: var(--txt); text-decoration: none; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 140px 24px 90px;
          position: relative; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }

        /* deep background gradient */
        .hero-base {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0,80,160,.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 80% 80%,   rgba(0,40,100,.35) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 15% 70%,   rgba(0,100,180,.2) 0%, transparent 60%),
            linear-gradient(180deg, #030d1a 0%, #050f20 50%, #030d1a 100%);
        }

        /* grid lines */
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,180,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,255,.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 100%);
        }

        /* horizontal scan line */
        .scan-line {
          position: absolute; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,212,255,.4) 40%, rgba(0,212,255,.4) 60%, transparent 100%);
          animation: scan 8s linear infinite;
        }
        @keyframes scan {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* blobs */
        .blob { position: absolute; border-radius: 50%; filter: blur(80px); }
        .b1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(0,180,255,.13) 0%, transparent 70%);
          top: -150px; left: -200px;
          animation: drift 20s ease-in-out infinite;
        }
        .b2 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,120,220,.10) 0%, transparent 70%);
          bottom: -80px; right: -150px;
          animation: drift 25s ease-in-out infinite reverse;
        }
        .b3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,245,196,.07) 0%, transparent 70%);
          top: 40%; left: 60%;
          animation: drift 16s ease-in-out infinite 5s;
        }
        @keyframes drift {
          0%,100% { transform: translate(0,0); }
          33%     { transform: translate(35px,-45px); }
          66%     { transform: translate(-22px,28px); }
        }

        /* hero content */
        .badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,212,255,.08);
          border: 1px solid rgba(0,212,255,.25);
          padding: 7px 18px; border-radius: 100px;
          font-size: 13px; font-weight: 600; color: var(--aqua);
          margin-bottom: 36px; animation: fadeUp .8s ease both;
          letter-spacing: .01em;
        }
        .pulse-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--aqua); flex-shrink: 0;
          animation: pdot 2s infinite;
          box-shadow: 0 0 8px var(--aqua);
        }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.6)} }

        h1.hero-h {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(48px, 7.5vw, 92px);
          font-weight: 700; line-height: .96;
          letter-spacing: -.045em;
          max-width: 920px; margin-bottom: 28px;
          animation: fadeUp .9s ease .1s both;
        }
        .hero-h .line1 { display: block; color: var(--txt); }
        .hero-h .aqua-grad {
          display: block;
          background: linear-gradient(90deg, var(--aqua) 0%, var(--blue) 50%, var(--aqua3) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }

        .hero-sub {
          font-size: clamp(15px, 1.8vw, 18px); font-weight: 400;
          color: var(--muted); max-width: 520px;
          line-height: 1.78; margin-bottom: 48px;
          animation: fadeUp 1s ease .2s both;
        }

        .hero-ctas {
          display: flex; gap: 14px; flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 1s ease .3s both;
        }

        .hero-note {
          margin-top: 20px; font-size: 12px;
          color: var(--muted2); font-family: 'JetBrains Mono', monospace;
          letter-spacing: .04em; animation: fadeUp 1s ease .45s both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── DASHBOARD MOCK ── */
        .dash-wrap {
          margin-top: 72px; width: 100%; max-width: 1060px;
          animation: fadeUp 1.2s ease .6s both; position: relative;
        }
        .dash-halo {
          position: absolute; top: -40px; left: 50%;
          transform: translateX(-50%);
          width: 80%; height: 80px;
          background: radial-gradient(ellipse, rgba(0,180,255,.2) 0%, transparent 70%);
          filter: blur(24px); pointer-events: none;
        }
        .dash-frame {
          background: rgba(7,24,50,.95);
          border: 1px solid var(--bdr2);
          border-radius: var(--rxx); overflow: hidden;
          box-shadow: var(--s3), 0 0 0 1px rgba(0,212,255,.05) inset,
                      0 0 60px rgba(0,80,160,.3);
        }
        .dtop {
          background: rgba(6,20,40,.9);
          border-bottom: 1px solid var(--bdr);
          padding: 14px 26px; display: flex; align-items: center; gap: 12px;
        }
        .wdots { display: flex; gap: 7px; }
        .wd { width: 12px; height: 12px; border-radius: 50%; }
        .wd:nth-child(1){background:#ff5f57}
        .wd:nth-child(2){background:#ffbd2e}
        .wd:nth-child(3){background:#28ca42}
        .dtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; color: var(--muted2); margin-left: 10px;
        }
        .live-tag {
          margin-left: auto; display: flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 700; color: var(--aqua);
          font-family: 'JetBrains Mono', monospace; letter-spacing: .06em;
        }
        .ldt {
          width: 6px; height: 6px; background: var(--aqua);
          border-radius: 50%; animation: pdot 1.5s infinite;
          box-shadow: 0 0 6px var(--aqua);
        }
        .dbody { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

        .krow { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .kpi {
          background: rgba(10,31,61,.8);
          border: 1px solid var(--bdr);
          border-radius: var(--rl); padding: 20px 22px;
          cursor: default; transition: all .28s;
          position: relative; overflow: hidden;
        }
        .kpi::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--aqua), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .kpi:hover { border-color: var(--bdr2); background: rgba(12,40,80,.9); }
        .kpi:hover::before { opacity: .6; }
        .ktop { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; }
        .klbl { font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.08em; color:var(--muted2); font-family:'JetBrains Mono',monospace; }
        .kb   { font-size:10px; font-weight:700; padding:3px 9px; border-radius:100px; font-family:'JetBrains Mono',monospace; }
        .ku   { background:rgba(0,245,196,.12); color: var(--aqua3); }
        .kd   { background:rgba(255,90,130,.12); color: #ff7aaa; }
        .kv   { font-size:28px; font-weight:800; letter-spacing:-.04em; margin-bottom:14px; font-family:'Space Grotesk',sans-serif; }
        .kv.a { color: var(--aqua); }
        .kv.m { color: var(--blue); }
        .kv.r { color: #ff7aaa; }
        .spark { display:flex; align-items:flex-end; gap:3px; height:28px; }
        .sp { flex:1; border-radius:3px 3px 0 0; }

        .crows { display:grid; grid-template-columns:2fr 1fr; gap:14px; }
        .ccard {
          background: rgba(10,31,61,.8);
          border: 1px solid var(--bdr);
          border-radius: var(--rl); padding: 22px;
        }
        .chd { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
        .cttl { font-size:14px; font-weight:700; }
        .csub { font-size:11px; color:var(--muted2); font-family:'JetBrains Mono',monospace; }
        .yoy  { font-size:11px; color:var(--aqua3); font-weight:700; background:rgba(0,245,196,.1); padding:4px 11px; border-radius:100px; font-family:'JetBrains Mono',monospace; }
        .bchart { display:flex; align-items:flex-end; gap:5px; height:92px; }
        .bw  { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; }
        .bar { width:100%; border-radius:4px 4px 0 0; cursor:pointer; min-height:3px; }
        .bmo { font-size:9px; color:var(--muted2); font-family:'JetBrains Mono',monospace; }
        .dcc { display:flex; flex-direction:column; align-items:center; gap:12px; }
        .dsvg { filter:drop-shadow(0 4px 20px rgba(0,212,255,.2)); }
        .dleg { width:100%; display:flex; flex-direction:column; gap:7px; }
        .dl  { display:flex; align-items:center; gap:8px; font-size:11px; }
        .dld { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .dln { color:var(--muted); flex:1; }
        .dlp { font-weight:700; font-family:'JetBrains Mono',monospace; }

        /* ── REVEAL ── */
        .rv { opacity:0; transform:translateY(32px); transition:opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
        .rv.in { opacity:1; transform:translateY(0); }
        .rv-1{transition-delay:.06s} .rv-2{transition-delay:.13s}
        .rv-3{transition-delay:.20s} .rv-4{transition-delay:.27s} .rv-5{transition-delay:.34s}

        /* ── STATS STRIP ── */
        .stats-wrap {
          position: relative;
          background: rgba(6,20,40,.6);
          border-top: 1px solid var(--bdr);
          border-bottom: 1px solid var(--bdr);
        }
        .stats-wrap::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0,120,220,.04) 30%,
            rgba(0,212,255,.06) 50%,
            rgba(0,120,220,.04) 70%,
            transparent 100%);
        }
        .stats-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4,1fr);
          position: relative;
        }
        .sc {
          padding: 50px 32px; text-align: center;
          cursor: default; position: relative; overflow: hidden;
          transition: background .35s;
          border-right: 1px solid var(--bdr);
        }
        .sc:last-child { border-right: none; }
        .sc::before {
          content: ''; position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--aqua), transparent);
          transition: width .5s;
        }
        .sc:hover { background: rgba(0,120,220,.06); }
        .sc:hover::before { width: 100%; }
        .sc-ico  { font-size: 30px; display: block; margin-bottom: 16px; }
        .sc-num  {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 52px; font-weight: 700;
          letter-spacing: -.055em; display: block; min-height: 64px;
          background: linear-gradient(135deg, #fff 20%, var(--aqua) 100%);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sc-lbl  { font-size: 12px; color: var(--muted2); text-transform: uppercase; letter-spacing: .07em; font-weight: 500; margin-bottom: 24px; font-family:'JetBrains Mono',monospace; }
        .sc-bar  { height: 1.5px; background: rgba(0,180,255,.1); overflow: hidden; }
        .sc-fill { height: 100%; background: linear-gradient(90deg, var(--aqua2), var(--aqua), var(--aqua3)); width: 0%; transition: width 2.2s cubic-bezier(.16,1,.3,1); }

        /* ── SECTION BASE ── */
        .sec { padding: 120px 44px; max-width: 1100px; margin: 0 auto; }
        .tag-ln {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 11px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: var(--aqua);
          margin-bottom: 20px; font-family: 'JetBrains Mono', monospace;
        }
        .tag-ln::before { content:''; width:20px; height:1.5px; background: linear-gradient(90deg, var(--aqua), var(--blue)); }
        .sec-h {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(30px,4.2vw,52px); font-weight: 700;
          letter-spacing: -.04em; line-height: 1.1; margin-bottom: 20px;
        }
        .sec-p { font-size: 17px; font-weight: 400; color: var(--muted); max-width: 520px; line-height: 1.76; }

        /* ── FEATURES ── */
        .feat-layout { display:grid; grid-template-columns:1fr 1.08fr; gap:52px; align-items:start; margin-top:60px; }
        .feat-list   { display:flex; flex-direction:column; gap:3px; }
        .fi {
          padding: 18px 22px; border-radius: var(--r);
          cursor: pointer; transition: all .28s;
          border: 1px solid transparent;
        }
        .fi.on { background: rgba(0,120,200,.12); border-color: var(--bdr2); }
        .fi:not(.on):hover { background: rgba(0,100,180,.07); }
        .fi-row { display:flex; align-items:center; gap:13px; }
        .fi-ico {
          width: 38px; height: 38px; border-radius: 11px;
          display: grid; place-items: center; font-size: 16px; flex-shrink: 0;
        }
        .fi-meta { display:flex; align-items:center; gap:10px; }
        .fi-tag  { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:2px 8px; border-radius:100px; font-family:'JetBrains Mono',monospace; }
        .fi h3   { font-size:15px; font-weight:700; }
        .fi p    { font-size:13px; color:var(--muted); line-height:1.68; font-weight:400; margin-top:9px; max-height:0; overflow:hidden; transition:max-height .45s ease,opacity .3s; opacity:0; }
        .fi.on p { max-height:80px; opacity:1; }

        .feat-preview {
          position: sticky; top: 100px;
          background: rgba(7,24,50,.9);
          border: 1px solid var(--bdr2);
          border-radius: var(--rxx); padding: 52px 44px;
          min-height: 380px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; overflow: hidden;
          transition: border-color .4s;
          box-shadow: var(--s2), 0 0 40px rgba(0,80,160,.25) inset;
        }
        .feat-preview::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--aqua), var(--blue), transparent);
        }
        .fp-ico  { font-size: 80px; margin-bottom: 22px; }
        .fp-tag  { font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:4px 13px; border-radius:100px; margin-bottom:18px; display:inline-block; font-family:'JetBrains Mono',monospace; }
        .feat-preview h4 { font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; margin-bottom:14px; }
        .feat-preview p  { font-size:14px; color:var(--muted); line-height:1.7; font-weight:400; max-width:290px; }

        /* ── FYN AI SHOWCASE ── */
        .ai-section {
          background: radial-gradient(ellipse 100% 80% at 50% 0%, rgba(0,80,180,.2) 0%, transparent 70%),
                      rgba(6,20,40,.8);
          border-top: 1px solid var(--bdr);
          border-bottom: 1px solid var(--bdr);
          padding: 120px 0;
        }
        .ai-inner { max-width:1100px; margin:0 auto; padding:0 44px; }

        .ai-tabs {
          display: flex; margin-top: 60px;
          border: 1px solid var(--bdr2);
          border-radius: var(--rxx); overflow: hidden;
          background: rgba(7,24,50,.9);
        }
        .ai-tab {
          flex: 1; padding: 22px 26px; cursor: pointer;
          transition: all .28s; border-right: 1px solid var(--bdr);
          position: relative;
        }
        .ai-tab:last-child { border-right: none; }
        .ai-tab.on { background: rgba(0,80,160,.2); }
        .ai-tab:not(.on):hover { background: rgba(0,60,120,.12); }
        .ai-tab::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; transform: scaleX(0); transform-origin: left;
          transition: transform .35s;
        }
        .ai-tab.on::after { transform: scaleX(1); }
        .ai-tab-ico  { font-size: 24px; margin-bottom: 11px; display: block; }
        .ai-tab-ttl  { font-size: 14px; font-weight: 700; margin-bottom: 5px; }
        .ai-tab-sub  { font-size: 11px; color: var(--muted2); font-weight: 400; line-height: 1.5; font-family:'JetBrains Mono',monospace; }

        .ai-body {
          display: grid; grid-template-columns: 1fr 1fr; gap: 52px;
          align-items: center; padding: 52px;
          background: rgba(9,28,56,.7);
          border: 1px solid var(--bdr); border-top: none;
          border-radius: 0 0 var(--rxx) var(--rxx);
        }
        .ai-body-text h3 { font-family:'Space Grotesk',sans-serif; font-size:30px; font-weight:700; letter-spacing:-.035em; margin-bottom:18px; line-height:1.1; }
        .ai-body-text p  { font-size:15px; color:var(--muted); font-weight:400; line-height:1.75; margin-bottom:30px; }
        .ai-points { display:flex; flex-direction:column; gap:12px; }
        .ai-point  { display:flex; align-items:center; gap:13px; font-size:14px; color:var(--muted); font-weight:400; }
        .ai-point-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }

        .ai-visual {
          background: rgba(7,24,50,.95);
          border: 1px solid var(--bdr2);
          border-radius: var(--rl); padding: 30px;
          position: relative; overflow: hidden;
          box-shadow: var(--s2), 0 0 30px rgba(0,80,160,.2) inset;
        }
        .ai-visual::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--aqua), transparent);
        }
        .ai-visual-glow {
          position: absolute; top: -60px; right: -60px;
          width: 220px; height: 220px; border-radius: 50%;
          filter: blur(60px); opacity: .35; pointer-events: none;
        }
        .ai-vis-header { display:flex; align-items:center; gap:11px; margin-bottom:24px; position:relative; }
        .ai-vis-ico    { width:34px; height:34px; border-radius:10px; display:grid; place-items:center; font-size:15px; flex-shrink:0; }
        .ai-vis-ttl    { font-size:13px; font-weight:700; }
        .ai-vis-tag    { font-size:10px; font-family:'JetBrains Mono',monospace; font-weight:700; padding:3px 9px; border-radius:100px; margin-left:auto; letter-spacing:.05em; }

        .ai-bar-chart  { display:flex; align-items:flex-end; gap:6px; height:82px; margin-bottom:18px; position:relative; }
        .ai-bar        { flex:1; border-radius:4px 4px 0 0; min-height:3px; transition:opacity .2s; cursor:pointer; }
        .ai-bar:hover  { opacity: .7; }

        .ai-insight-box {
          background: rgba(0,212,255,.05);
          border: 1px solid rgba(0,212,255,.18);
          border-radius: 11px; padding: 13px 15px;
          display: flex; gap: 11px; align-items: flex-start; margin-top: 4px;
        }
        .ai-ins-ico { font-size:15px; flex-shrink:0; margin-top:1px; }
        .ai-ins-txt { font-size:12px; color: var(--aqua); font-weight:400; line-height:1.65; }

        .ai-metrics { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-top:14px; }
        .ai-metric  {
          background: rgba(6,20,40,.9);
          border: 1px solid var(--bdr);
          border-radius: 11px; padding: 13px 15px;
          transition: border-color .25s;
        }
        .ai-metric:hover { border-color: var(--bdr2); }
        .ai-metric-val { font-size:20px; font-weight:800; letter-spacing:-.04em; margin-bottom:3px; font-family:'Space Grotesk',sans-serif; }
        .ai-metric-lbl { font-size:10px; color:var(--muted2); text-transform:uppercase; letter-spacing:.07em; font-family:'JetBrains Mono',monospace; }

        /* ── HOW IT WORKS ── */
        .how-section { padding: 120px 0; position: relative; }
        .how-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,60,140,.15) 0%, transparent 70%);
        }
        .how-inner { max-width:1100px; margin:0 auto; padding:0 44px; position:relative; }
        .steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:60px; }
        .step-card {
          background: rgba(7,24,50,.8);
          border: 1px solid var(--bdr);
          border-radius: var(--rxx); padding: 42px 32px;
          position: relative; overflow: hidden;
          transition: transform .32s, border-color .32s, box-shadow .32s;
        }
        .step-card:hover {
          transform: translateY(-8px);
          border-color: var(--bdr3);
          box-shadow: 0 28px 70px rgba(0,0,0,.5), 0 0 0 1px rgba(0,212,255,.06) inset;
        }
        .step-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--aqua2), var(--aqua), var(--aqua3));
          transform: scaleX(0); transform-origin: left; transition: transform .4s;
        }
        .step-card:hover::after { transform: scaleX(1); }
        .step-card::before {
          content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,.3), transparent);
          opacity: 0; transition: opacity .3s;
        }
        .step-card:hover::before { opacity: 1; }
        .snbg {
          position: absolute; top: -15px; right: -5px;
          font-size: 110px; font-weight: 800;
          color: rgba(0,180,255,.04); line-height: 1;
          pointer-events: none; font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -.06em; user-select: none;
        }
        .step-emoji { font-size: 40px; margin-bottom: 20px; display: block; }
        .step-card h3 { font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:700; margin-bottom:12px; }
        .step-card p  { font-size:14px; color:var(--muted); line-height:1.72; font-weight:400; }

        /* connector line between steps */
        .steps-grid { position: relative; }

        /* ── PRICING ── */
        .ptog {
          display: inline-flex;
          background: rgba(6,20,40,.8);
          border: 1px solid var(--bdr2);
          border-radius: 100px; padding: 4px; margin-top: 24px;
        }
        .ptb {
          padding: 9px 24px; border-radius: 100px; border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all .25s;
          background: transparent; color: var(--muted);
        }
        .ptb.on {
          background: linear-gradient(135deg, var(--aqua) 0%, var(--blue) 100%);
          color: var(--navy);
          box-shadow: 0 4px 16px rgba(0,212,255,.3);
        }
        .save-chip {
          margin-left: 8px; font-size: 11px; font-weight: 700;
          color: var(--aqua3); background: rgba(0,245,196,.12);
          padding: 2px 9px; border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
        }

        .pgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:48px; align-items:start; }
        .pc {
          background: rgba(7,24,50,.85);
          border: 1px solid var(--bdr);
          border-radius: var(--rxx); padding: 38px 34px;
          transition: transform .3s, border-color .3s, box-shadow .3s;
          position: relative; overflow: hidden;
        }
        .pc::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,180,255,.25), transparent);
        }
        .pc:hover { transform:translateY(-5px); border-color:var(--bdr2); box-shadow:var(--s3), 0 0 30px rgba(0,80,160,.2); }
        .pc.hi {
          background: linear-gradient(160deg, rgba(0,80,200,.25) 0%, rgba(0,180,255,.15) 100%);
          border-color: var(--aqua2);
          transform: scale(1.035);
          box-shadow: 0 24px 80px rgba(0,80,160,.4), 0 0 0 1px rgba(0,212,255,.2) inset;
        }
        .pc.hi::before { background: linear-gradient(90deg, transparent, var(--aqua), transparent); opacity: 1; }
        .pc.hi:hover { transform: scale(1.035) translateY(-5px); }
        .pop-tag {
          position: absolute; top: 18px; right: 18px;
          background: linear-gradient(135deg, var(--aqua) 0%, var(--blue) 100%);
          color: var(--navy); font-size: 10px; font-weight: 800;
          padding: 4px 12px; border-radius: 100px;
          text-transform: uppercase; letter-spacing: .06em;
          font-family: 'JetBrains Mono', monospace;
        }
        .pname  { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:var(--muted2); margin-bottom:22px; font-family:'JetBrains Mono',monospace; }
        .pc.hi .pname { color:rgba(180,220,255,.6); }
        .pprice { display:flex; align-items:baseline; gap:3px; margin-bottom:8px; }
        .pcur   { font-size:22px; font-weight:600; color:var(--muted); margin-top:7px; }
        .pamt   { font-family:'Space Grotesk',sans-serif; font-size:56px; font-weight:700; color:var(--txt); letter-spacing:-.05em; }
        .pc.hi .pamt { color: var(--aqua); }
        .pper   { font-size:14px; color:var(--muted); font-weight:400; }
        .pdesc  { font-size:13px; color:var(--muted2); margin-bottom:24px; font-weight:400; }
        .pdiv   { height:1px; background:var(--bdr); margin:22px 0; }
        .pc.hi .pdiv { background: rgba(0,180,255,.15); }
        .pfeats { list-style:none; display:flex; flex-direction:column; gap:11px; margin-bottom:30px; }
        .pfeats li { font-size:13px; color:var(--muted); display:flex; align-items:center; gap:10px; font-weight:400; }
        .pchk   { width:18px; height:18px; border-radius:50%; background:rgba(0,180,255,.1); display:grid; place-items:center; flex-shrink:0; font-size:9px; color:var(--aqua); border: 1px solid rgba(0,180,255,.2); }
        .pc.hi .pchk { background:rgba(0,212,255,.15); color:var(--aqua); border-color:rgba(0,212,255,.3); }
        .pbtn {
          width: 100%; padding: 14px; border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all .28s;
          border: 1px solid var(--bdr2);
          background: transparent; color: var(--txt);
        }
        .pbtn:hover { background: linear-gradient(135deg, var(--aqua), var(--blue)); border-color: var(--aqua); color: var(--navy); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,255,.3); }
        .pc.hi .pbtn { background: linear-gradient(135deg, var(--aqua), var(--blue)); border-color: transparent; color: var(--navy); box-shadow: 0 6px 22px rgba(0,212,255,.35); }
        .pc.hi .pbtn:hover { box-shadow: 0 10px 32px rgba(0,212,255,.5); transform: translateY(-2px); }

        /* ── TESTIMONIALS ── */
        .testi-section {
          padding: 120px 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,60,140,.18) 0%, transparent 60%),
            rgba(5,15,35,.5);
          border-top: 1px solid var(--bdr);
        }
        .testi-inner { max-width:1100px; margin:0 auto; padding:0 44px; }
        .tgrid  { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:60px; }
        .tc {
          background: rgba(7,24,50,.8);
          border: 1px solid var(--bdr);
          border-radius: var(--rxx); padding: 36px;
          transition: transform .3s, border-color .3s, box-shadow .3s;
          position: relative; overflow: hidden;
        }
        .tc::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,180,255,.2), transparent);
        }
        .tc:hover { transform:translateY(-6px); border-color:var(--bdr2); box-shadow:0 24px 60px rgba(0,0,0,.4); }
        .stars  { display:flex; gap:4px; margin-bottom:18px; }
        .star   { font-size:14px; color:#ffc837; text-shadow: 0 0 8px rgba(255,200,55,.5); }
        .tq     { font-size:15px; line-height:1.75; color:var(--muted); font-weight:400; margin-bottom:24px; }
        .tq::before { content:'"'; font-size:40px; color:var(--aqua); line-height:0; vertical-align:-16px; margin-right:4px; opacity:.3; font-family:'Space Grotesk',sans-serif; }
        .tf     { display:flex; align-items:center; gap:14px; }
        .tav    { width:44px; height:44px; border-radius:50%; display:grid; place-items:center; font-size:14px; font-weight:800; color:var(--navy); flex-shrink:0; box-shadow:0 4px 14px rgba(0,0,0,.4); }
        .tname  { font-weight:700; font-size:14px; }
        .trole  { font-size:11px; color:var(--muted2); font-family:'JetBrains Mono',monospace; }

        /* ── CTA BANNER ── */
        .cta-wrap { padding: 80px 44px; }
        .cta-box {
          max-width: 1100px; margin: 0 auto;
          background:
            radial-gradient(ellipse 80% 100% at 50% -20%, rgba(0,100,220,.3) 0%, transparent 70%),
            rgba(7,24,50,.9);
          border: 1px solid var(--bdr2);
          border-radius: 40px; padding: 96px 64px;
          text-align: center; position: relative; overflow: hidden;
          box-shadow: var(--s3), 0 0 0 1px rgba(0,212,255,.04) inset;
        }
        .cta-box::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 10%, var(--aqua) 50%, transparent 90%);
        }
        .cta-box::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 60%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,212,255,.3), transparent);
        }
        .cta-box h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px,5vw,60px); font-weight: 700;
          letter-spacing: -.045em; margin-bottom: 20px; position: relative;
        }
        .cta-box p { font-size:18px; color:var(--muted); font-weight:400; margin-bottom:48px; max-width:460px; margin-left:auto; margin-right:auto; line-height:1.72; position:relative; }
        .cta-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; position:relative; }
        .cbtn  {
          background: linear-gradient(135deg, var(--aqua) 0%, var(--blue) 100%);
          color: var(--navy); border: none;
          padding: 18px 48px; border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 800;
          cursor: pointer; transition: all .3s;
          box-shadow: 0 6px 24px rgba(0,212,255,.35);
          letter-spacing: .01em;
        }
        .cbtn:hover { transform:translateY(-3px); box-shadow:0 14px 44px rgba(0,212,255,.5); background:linear-gradient(135deg,#18dfff 0%,var(--blue) 100%); }
        .cbtng {
          background: transparent; color: var(--muted);
          border: 1px solid var(--bdr2);
          padding: 18px 48px; border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 600;
          cursor: pointer; transition: all .28s;
        }
        .cbtng:hover { border-color:var(--aqua); color:var(--aqua); background:rgba(0,212,255,.06); }

        /* ── FOOTER ── */
        footer {
          border-top: 1px solid var(--bdr);
          padding: 70px 52px 44px;
          background: rgba(3,10,22,.8);
        }
        .ftop { max-width:1100px; margin:0 auto 44px; display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; gap:52px; }
        .fbrand  { font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:700; letter-spacing:-.03em; margin-bottom:14px; }
        .ftagline { font-size:14px; color:var(--muted2); font-weight:400; line-height:1.68; max-width:240px; margin-bottom:24px; }
        .fsoc { display:flex; gap:10px; }
        .fsb  {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid var(--bdr2);
          display: grid; place-items: center;
          font-size: 14px; text-decoration: none;
          color: var(--muted); transition: all .25s;
        }
        .fsb:hover { border-color:var(--aqua); color:var(--aqua); background:rgba(0,212,255,.08); transform:translateY(-2px); box-shadow:0 6px 18px rgba(0,212,255,.15); }
        .fct    { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:var(--muted2); margin-bottom:18px; font-family:'JetBrains Mono',monospace; }
        .flinks { list-style:none; display:flex; flex-direction:column; gap:11px; }
        .flinks a { font-size:14px; color:var(--muted); text-decoration:none; transition:color .22s; font-weight:400; }
        .flinks a:hover { color:var(--aqua); }
        .fbot {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 26px; border-top: 1px solid var(--bdr);
          flex-wrap: wrap; gap: 14px;
        }
        .fcopy   { font-size:12px; color:var(--muted2); font-family:'JetBrains Mono',monospace; }
        .fstatus { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--aqua3); font-family:'JetBrains Mono',monospace; }
        .fstatus .pulse-dot { background:var(--aqua3); box-shadow:0 0 8px var(--aqua3); }

        /* ── RESPONSIVE ── */
        @media(max-width:960px){
          nav{padding:0 20px} .nav-links{display:none} .mob-btn{display:flex}
          .feat-layout{grid-template-columns:1fr} .feat-preview{display:none}
          .ai-tabs{flex-direction:column}
          .ai-tab{border-right:none;border-bottom:1px solid var(--bdr)}
          .ai-tab:last-child{border-bottom:none}
          .ai-body{grid-template-columns:1fr;padding:28px}
          .steps-grid,.pgrid,.tgrid{grid-template-columns:1fr}
          .stats-grid{grid-template-columns:repeat(2,1fr)}
          .sc{border-right:1px solid var(--bdr)}
          .sc:nth-child(even){border-right:none}
          .sc:nth-child(3),.sc:nth-child(4){border-top:1px solid var(--bdr)}
          .krow{grid-template-columns:1fr} .crows{grid-template-columns:1fr}
          .pc.hi{transform:none} .pc.hi:hover{transform:translateY(-5px)}
          .sec{padding:80px 24px}
          .how-inner,.testi-inner,.ai-inner{padding:0 24px}
          .cta-wrap{padding:40px 20px}
          .cta-box{padding:60px 28px;border-radius:28px}
          footer{padding:52px 24px 36px}
          .ftop{grid-template-columns:1fr 1fr}
          .fbot{flex-direction:column;align-items:flex-start}
        }
      `}</style>

      {/* ── CURSOR ─────────────────────────────────────────────── */}
      <div className="cg" style={{ left: cursor.x, top: cursor.y }} />

      {/* ══════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════ */}
      <nav className={scrolled ? "up" : ""}>
        <a href="#" className="logo">
          <div className="logo-mark" />
          Fynovo
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="nav-r">
          <a href="#" className="btn-ghost">Log in</a>
          <a href="#" className="btn-solid">Get started free →</a>
          <button className="mob-btn" onClick={() => setMobileOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mob-nav">
          {NAV_LINKS.map((l) => (
            <a key={l}
               href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
               onClick={() => setMobileOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#" className="btn-solid" style={{ textAlign: "center" }}>
            Get started free →
          </a>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <div className="hero">
        <div className="hero-bg">
          <div className="hero-base" />
          <div className="hero-grid" />
          <div className="scan-line" />
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>

        <div className="badge">
          <span className="pulse-dot" />
          Public beta — 30 days free, no card needed
        </div>

        <h1 className="hero-h">
          <span className="line1">Your money,</span>
          <span className="aqua-grad">fully understood.</span>
        </h1>

        <p className="hero-sub">
          Fynovo tracks every transaction, analyses every trade, and trims every
          waste — with an AI built into your dashboard that works only on your
          own financial data.
        </p>

        <div className="hero-ctas">
          <a href="#" className="btn-solid btn-xl">Start for free</a>
          <a href="#fyn-ai" className="btn-ghost btn-xl">Meet Fyn AI ↓</a>
        </div>
        <p className="hero-note">// no credit card · setup in 90s · cancel anytime</p>

        {/* ── DASHBOARD MOCK ───────────────────────────────────── */}
        <div className="dash-wrap rv">
          <div className="dash-halo" />
          <div className="dash-frame">
            <div className="dtop">
              <div className="wdots">
                <span className="wd" /><span className="wd" /><span className="wd" />
              </div>
              <span className="dtitle">fynovo.app — command center</span>
              <div className="live-tag"><span className="ldt" />LIVE</div>
            </div>
            <div className="dbody">
              {/* KPI Row */}
              <div className="krow">
                {[
                  { l:"Total Income",   v:"₹48,290", b:"↑ 12.4%", u:true,  cls:"a", s:[40,55,45,70,60,80,65,90], c:"#00d4ff" },
                  { l:"Total Expenses", v:"₹29,114", b:"↓ 3.1%",  u:false, cls:"r", s:[80,70,75,65,70,60,65,55], c:"#ff7aaa" },
                  { l:"Net Profit",     v:"₹19,176", b:"↑ 8.7%",  u:true,  cls:"m", s:[30,40,35,55,48,65,60,78], c:"#4facfe" },
                ].map((k) => (
                  <div className="kpi" key={k.l}>
                    <div className="ktop">
                      <span className="klbl">{k.l}</span>
                      <span className={k.u ? "kb ku" : "kb kd"}>{k.b}</span>
                    </div>
                    <div className={`kv ${k.cls}`}>{k.v}</div>
                    <div className="spark">
                      {k.s.map((h, i) => (
                        <div key={i} className="sp"
                          style={{ height:`${h}%`, background: k.c, opacity: i === k.s.length - 1 ? 1 : 0.15 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="crows" ref={chartRef}>
                <div className="ccard">
                  <div className="chd">
                    <div>
                      <div className="cttl">Revenue Overview</div>
                      <div className="csub">Jan – Dec 2024</div>
                    </div>
                    <span className="yoy">+24% YOY</span>
                  </div>
                  <div className="bchart">
                    {bars.map((h, i) => (
                      <div className="bw" key={i}>
                        <div className="bar"
                          style={{
                            height: chartIn ? `${h}%` : "3%",
                            background: hovBar === i
                              ? "#00f5c4"
                              : i === 11
                              ? "var(--aqua)"
                              : `rgba(0,180,255,${0.15 + h/350})`,
                            boxShadow: (hovBar === i || i === 11) ? `0 0 12px rgba(0,212,255,.5)` : "none",
                            transitionDelay: `${i * 0.04}s`,
                            transition: "height .9s cubic-bezier(.16,1,.3,1), background .25s, box-shadow .25s",
                          }}
                          onMouseEnter={() => setHovBar(i)}
                          onMouseLeave={() => setHovBar(null)}
                        />
                        <span className="bmo">{mos[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ccard">
                  <div className="chd">
                    <div>
                      <div className="cttl">Expense Split</div>
                      <div className="csub">This month</div>
                    </div>
                  </div>
                  <div className="dcc">
                    <svg className="dsvg" width="96" height="96" viewBox="0 0 96 96">
                      {[
                        { p:40, c:"#00d4ff", o:0  },
                        { p:30, c:"#4facfe", o:40 },
                        { p:20, c:"#00f5c4", o:70 },
                        { p:10, c:"#7b9ff9", o:90 },
                      ].map((s, i) => {
                        const r = 34, cx = 48, ci = 2 * Math.PI * r;
                        const d = (s.p / 100) * ci, g = ci - d;
                        const rot = (s.o / 100) * 360 - 90;
                        return (
                          <circle key={i} cx={cx} cy={cx} r={r} fill="none"
                            stroke={s.c} strokeWidth="12"
                            strokeDasharray={`${d} ${g}`}
                            transform={`rotate(${rot} ${cx} ${cx})`}
                            strokeLinecap="round"
                          />
                        );
                      })}
                      <circle cx="48" cy="48" r="20" fill="var(--card2)" />
                    </svg>
                    <div className="dleg">
                      {[
                        ["#00d4ff","Operations","40%"],
                        ["#4facfe","Marketing","30%"],
                        ["#00f5c4","Payroll","20%"],
                        ["#7b9ff9","Other","10%"],
                      ].map(([c, n, p]) => (
                        <div className="dl" key={n}>
                          <div className="dld" style={{ background: c }} />
                          <span className="dln">{n}</span>
                          <span className="dlp" style={{ color: c }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════════ */}
      <div className="stats-wrap" ref={statsRef}>
        <div className="stats-grid">
          {STATS.map((s, i) => <StatCard key={s.label} stat={s} started={statsOn} i={i} />)}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════ */}
      <section className="sec" id="features">
        <div className="rv">
          <span className="tag-ln">Features</span>
          <h2 className="sec-h">Built for people who take<br />money seriously.</h2>
          <p className="sec-p">Every tool you actually need — nothing you don't. Designed by ex-traders and financial analysts who got tired of stitching spreadsheets together.</p>
        </div>

        <div className="feat-layout">
          <div className="feat-list">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className={`fi rv rv-${i % 3 + 1} ${activeFeat === i ? "on" : ""}`}
                onClick={() => setActiveFeat(i)}>
                <div className="fi-row">
                  <div className="fi-ico" style={{ background: `${f.color}14`, color: f.color }}>
                    {f.icon}
                  </div>
                  <div>
                    <div className="fi-meta">
                      <h3>{f.title}</h3>
                      <span className="fi-tag" style={{ background: `${f.color}14`, color: f.color }}>
                        {f.tag}
                      </span>
                    </div>
                  </div>
                </div>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="feat-preview rv rv-2"
            style={{ borderColor: `${FEATURES[activeFeat].color}30` }}>
            <div className="fp-ico">{FEATURES[activeFeat].icon}</div>
            <span className="fp-tag"
              style={{ background: `${FEATURES[activeFeat].color}14`, color: FEATURES[activeFeat].color }}>
              {FEATURES[activeFeat].tag}
            </span>
            <h4>{FEATURES[activeFeat].title}</h4>
            <p>{FEATURES[activeFeat].desc}</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FYN AI SHOWCASE
      ══════════════════════════════════════════════════════════ */}
      <div className="ai-section" id="fyn-ai">
        <div className="ai-inner">
          <div className="rv">
            <span className="tag-ln">Fyn AI</span>
            <h2 className="sec-h">An AI that works only<br />on your own data.</h2>
            <p className="sec-p">Fyn is not a generic chatbot. It's a financial intelligence engine built into your Fynovo account — reading only your transactions, trades, and accounts to surface insights specific to you.</p>
          </div>

          {/* Tabs */}
          <div className="ai-tabs rv">
            {AI_CAPABILITIES.map((cap, i) => (
              <div key={cap.title}
                className={`ai-tab ${activeAI === i ? "on" : ""}`}
                onClick={() => setActiveAI(i)}>
                <style>{`.ai-tab:nth-child(${i + 1}).on::after { background: linear-gradient(90deg, ${cap.color}, ${i === 0 ? "#00f5c4" : i === 1 ? "#4facfe" : "#4facfe"}); }`}</style>
                <span className="ai-tab-ico">{cap.icon}</span>
                <div className="ai-tab-ttl">{cap.title}</div>
                <div className="ai-tab-sub">
                  {i === 0 && "P&L · Win rate · Drawdown"}
                  {i === 1 && "Subscriptions · Categories · Waste"}
                  {i === 2 && "Net position · Health score · Trends"}
                </div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="ai-body rv">
            <div className="ai-body-text">
              <h3 style={{ color: cur.color }}>{cur.title}</h3>
              <p>{cur.desc}</p>
              <div className="ai-points">
                {cur.points.map((pt) => (
                  <div className="ai-point" key={pt}>
                    <span className="ai-point-dot" style={{ background: cur.color, boxShadow: `0 0 8px ${cur.color}60` }} />
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="ai-visual">
              <div className="ai-visual-glow" style={{ background: cur.color }} />
              <div className="ai-vis-header">
                <div className="ai-vis-ico" style={{ background: `${cur.color}16`, color: cur.color }}>
                  {cur.icon}
                </div>
                <span className="ai-vis-ttl">Fyn AI · {cur.title}</span>
                <span className="ai-vis-tag"
                  style={{ background: `${cur.color}14`, color: cur.color, border: `1px solid ${cur.color}30` }}>
                  Live
                </span>
              </div>

              {/* Tab 0 — Trading P&L */}
              {activeAI === 0 && (
                <>
                  <div className="ai-bar-chart">
                    {[55,42,70,38,85,60,78,45,92,67,80,100].map((h, i) => (
                      <div key={i} className="ai-bar"
                        style={{
                          height: `${h}%`,
                          background: h > 70
                            ? `linear-gradient(180deg, var(--aqua) 0%, rgba(0,180,255,.5) 100%)`
                            : h > 50
                            ? `rgba(0,180,255,.3)`
                            : `rgba(255,120,160,.35)`,
                          boxShadow: h > 70 ? "0 0 10px rgba(0,212,255,.3)" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <div className="ai-insight-box">
                    <span className="ai-ins-ico">💡</span>
                    <span className="ai-ins-txt">Win rate is 68% this month — 9 pts above your 6-month average. INFY & TCS are top performers.</span>
                  </div>
                  <div className="ai-metrics">
                    {[
                      { v:"+₹14,320", l:"Net P&L",       c:"var(--aqua3)" },
                      { v:"68%",      l:"Win Rate",       c:"var(--aqua)"  },
                      { v:"−4.2%",    l:"Max Drawdown",   c:"#ff7aaa"      },
                      { v:"1.84",     l:"Sharpe Ratio",   c:"var(--blue)"  },
                    ].map((m) => (
                      <div className="ai-metric" key={m.l}>
                        <div className="ai-metric-val" style={{ color: m.c }}>{m.v}</div>
                        <div className="ai-metric-lbl">{m.l}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Tab 1 — Expense Savings */}
              {activeAI === 1 && (
                <>
                  <div className="ai-bar-chart">
                    {[
                      { h:80,  lbl:"Adobe"     },
                      { h:100, lbl:"LinkedIn"  },
                      { h:38,  lbl:"Hotstar"   },
                      { h:25,  lbl:"Audible"   },
                      { h:60,  lbl:"Notion"    },
                      { h:45,  lbl:"Figma"     },
                      { h:30,  lbl:"Grammarly" },
                    ].map((b, i) => (
                      <div key={i} className="bw">
                        <div className="ai-bar"
                          style={{
                            height: `${b.h}%`,
                            background: i < 4
                              ? `linear-gradient(180deg, var(--aqua3) 0%, rgba(0,200,160,.4) 100%)`
                              : `rgba(0,200,160,.2)`,
                            boxShadow: i < 4 ? "0 0 10px rgba(0,245,196,.25)" : "none",
                          }}
                        />
                        <span className="bmo" style={{ fontSize: 8 }}>{b.lbl.slice(0, 4)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ai-insight-box">
                    <span className="ai-ins-ico">✂️</span>
                    <span className="ai-ins-txt" style={{ color: "var(--aqua3)" }}>4 unused subscriptions found. Cancelling Adobe CC, LinkedIn, Hotstar & Audible saves ₹1,896/month.</span>
                  </div>
                  <div className="ai-metrics">
                    {[
                      { v:"₹1,896",  l:"Monthly Waste",   c:"var(--aqua3)" },
                      { v:"₹22,752", l:"Yearly Savings",  c:"var(--aqua3)" },
                      { v:"4",       l:"Dead Subs",        c:"var(--aqua)"  },
                      { v:"31%",     l:"Above Avg Spend",  c:"#ff7aaa"      },
                    ].map((m) => (
                      <div className="ai-metric" key={m.l}>
                        <div className="ai-metric-val" style={{ color: m.c }}>{m.v}</div>
                        <div className="ai-metric-lbl">{m.l}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Tab 2 — P&L Clarity */}
              {activeAI === 2 && (
                <>
                  <div className="ai-bar-chart">
                    {[42,48,44,55,52,62,58,68,65,72,70,80].map((h, i) => (
                      <div key={i} className="ai-bar"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(180deg,
                            rgba(0,212,255,${0.3 + (i/11)*0.7}) 0%,
                            rgba(0,150,220,${0.2 + (i/11)*0.5}) 100%)`,
                          boxShadow: i > 8 ? "0 0 8px rgba(0,212,255,.25)" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <div className="ai-insight-box">
                    <span className="ai-ins-ico">📊</span>
                    <span className="ai-ins-txt">Net position grew 14.8% over 12 months. Income diversified. One-off Q3 expenses isolated from trend.</span>
                  </div>
                  <div className="ai-metrics">
                    {[
                      { v:"₹19,176", l:"Net Profit",      c:"var(--aqua)"  },
                      { v:"82/100",  l:"Health Score",     c:"var(--aqua3)" },
                      { v:"+14.8%",  l:"YoY Growth",       c:"var(--aqua)"  },
                      { v:"6.2x",    l:"Emergency Cover",  c:"var(--blue)"  },
                    ].map((m) => (
                      <div className="ai-metric" key={m.l}>
                        <div className="ai-metric-val" style={{ color: m.c }}>{m.v}</div>
                        <div className="ai-metric-lbl">{m.l}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <div className="how-section" id="how-it-works">
        <div className="how-inner">
          <div className="rv">
            <span className="tag-ln">How It Works</span>
            <h2 className="sec-h">Zero friction.<br />Immediate clarity.</h2>
            <p className="sec-p">No manual imports. No accountant. Fynovo and Fyn AI handle the tedious parts — you focus on decisions that matter.</p>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={s.num} className={`step-card rv rv-${i + 1}`}>
                <div className="snbg">{s.num}</div>
                <span className="step-emoji">{s.emoji}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════ */}
      <section className="sec" id="pricing">
        <div className="rv">
          <span className="tag-ln">Pricing</span>
          <h2 className="sec-h">Pay for what you use.<br />Nothing more.</h2>
          <p className="sec-p">Every plan includes a 30-day free trial. No credit card, no commitment. Fyn AI is included in all plans.</p>
          <div className="ptog">
            <button className={`ptb ${billing === "monthly" ? "on" : ""}`} onClick={() => setBilling("monthly")}>Monthly</button>
            <button className={`ptb ${billing === "annual"  ? "on" : ""}`} onClick={() => setBilling("annual")}>
              Annual<span className="save-chip">−20%</span>
            </button>
          </div>
        </div>

        <div className="pgrid">
          {PLANS.map((p, i) => {
            const price = billing === "annual" ? Math.round(p.price * 0.8) : p.price;
            return (
              <div key={p.name} className={`pc rv rv-${i + 1} ${p.hi ? "hi" : ""}`}>
                {p.hi && <div className="pop-tag">Most popular</div>}
                <div className="pname">{p.name}</div>
                <div className="pprice">
                  <span className="pcur">$</span>
                  <span className="pamt">{price}</span>
                  <span className="pper">/mo</span>
                </div>
                <div className="pdesc">{billing === "annual" ? `Billed $${price * 12}/yr` : p.desc}</div>
                <div className="pdiv" />
                <ul className="pfeats">
                  {p.features.map((f) => (
                    <li key={f}><span className="pchk">✓</span>{f}</li>
                  ))}
                </ul>
                <button className="pbtn">{p.cta}</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <div className="testi-section">
        <div className="testi-inner">
          <div className="rv">
            <span className="tag-ln">Real users</span>
            <h2 className="sec-h">People who switched<br />and never looked back.</h2>
          </div>
          <div className="tgrid">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`tc rv rv-${i + 1}`}>
                <div className="stars">
                  {[...Array(5)].map((_, j) => <span key={j} className="star">★</span>)}
                </div>
                <p className="tq">{t.q}</p>
                <div className="tf">
                  <div className="tav"
                    style={{ background: `linear-gradient(135deg, ${t.c} 0%, ${t.c}99 100%)` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="tname">{t.name}</div>
                    <div className="trole">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════ */}
      <div className="cta-wrap">
        <div className="cta-box rv">
          <h2>Stop guessing.<br />Start knowing.</h2>
          <p>Join 40,000+ users who made the switch to financial clarity. Set up in 90 seconds, Fyn AI included.</p>
          <div className="cta-btns">
            <button className="cbtn">Start free — no card needed</button>
            <button className="cbtng">Schedule a demo</button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer>
        <div className="ftop">
          <div>
            <div className="fbrand">Fynovo</div>
            <p className="ftagline">Smart financial management for individuals and teams who think in numbers.</p>
            <div className="fsoc">
              {["𝕏","in","▶","◎"].map((s, i) => <a key={i} href="#" className="fsb">{s}</a>)}
            </div>
          </div>
          {[
            { title:"Product", links:["Features","Fyn AI","Pricing","Changelog","Roadmap"] },
            { title:"Company", links:["About","Blog","Careers","Press"] },
            { title:"Legal",   links:["Privacy","Terms","Security","Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="fct">{col.title}</div>
              <ul className="flinks">
                {col.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="fbot">
          <div className="fcopy">© 2025 Fynovo, Inc. All rights reserved.</div>
          <div className="fstatus">
            <span className="pulse-dot" />All systems operational
          </div>
        </div>
      </footer>
    </>
  );
}
