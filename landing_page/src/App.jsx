import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Features", "Fyn AI", "How It Works", "Pricing"];

const FEATURES = [
  {
    icon: "◈",
    title: "Unified Command Center",
    desc: "Every transaction across every account — banks, wallets, cards — lands in one living view. Income, expenses, and profit updated the moment they happen.",
    color: "#1fd882",
    tag: "Core",
  },
  {
    icon: "⬡",
    title: "Trade Intelligence",
    desc: "Connect your brokerage. Get real-time P&L across all positions, unrealised gains, allocation heatmaps, and win-rate trends in one screen.",
    color: "#4f9eff",
    tag: "Trading",
  },
  {
    icon: "▸",
    title: "Expense Autopilot",
    desc: "Rules-based engine that learns your spending patterns. Forgotten subscriptions, bill creep, and impulse categories are flagged before they compound.",
    color: "#ff9f43",
    tag: "Savings",
  },
  {
    icon: "◉",
    title: "Cash Flow Forecast",
    desc: "Monte-Carlo projections on your runway. Know your financial position six months out with confidence intervals grounded in your actual history.",
    color: "#ff6b9d",
    tag: "Analytics",
  },
  {
    icon: "⬢",
    title: "Multi-Entity Books",
    desc: "Personal, freelance, and business ledgers — isolated but instantly consolidated when you need the full picture across all entities.",
    color: "#a78bfa",
    tag: "Business",
  },
  {
    icon: "◐",
    title: "Vault-Level Security",
    desc: "AES-256 at rest, TLS 1.3 in transit, read-only OAuth bank links. Your credentials never touch Fynovo servers.",
    color: "#1fd882",
    tag: "Security",
  },
];

const AI_CAPABILITIES = [
  {
    icon: "📈",
    color: "#4f9eff",
    title: "Trading P&L Analysis",
    desc: "Fyn AI reads your brokerage data and breaks down your profit and loss by position, sector, time horizon, and strategy. It surfaces your win rate, average drawdown, and best-performing instruments — then flags what's quietly dragging your returns.",
    points: [
      "Position-level P&L breakdown",
      "Win rate & drawdown tracking",
      "Sector exposure heatmap",
      "Underperformer alerts",
    ],
  },
  {
    icon: "✂️",
    color: "#ff9f43",
    title: "Expense Savings Engine",
    desc: "Fyn AI scans your transaction history to find subscriptions you forgot about, recurring charges that crept up, and spending categories where small changes produce big annual savings. It shows the exact rupee impact — not vague advice.",
    points: [
      "Forgotten subscription detector",
      "Category overspend alerts",
      "Year-on-year spend comparison",
      "Personalised saving targets",
    ],
  },
  {
    icon: "💡",
    color: "#1fd882",
    title: "Profit & Loss Clarity",
    desc: "Whether you're a freelancer, trader, or business owner, Fyn AI calculates your true net position across all income sources and costs. It separates one-off events from trends, so you always know your real financial health — not just your bank balance.",
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
    desc: "The AI maps your financial DNA — spending rhythms, income cycles, recurring obligations, and saving habits — automatically, in the background.",
  },
  {
    num: "03",
    emoji: "🎯",
    title: "Act on real clarity",
    desc: "Your dashboard updates in real time. Fyn AI surfaces insights, flags anomalies, and answers your questions using only your own data.",
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
    q: "I stopped bleeding ₹6,000/month in forgotten subscriptions within the first week. Fyn AI found what I never would have caught.",
    name: "Arjun S.",
    role: "Full-stack freelancer, Mumbai",
    avatar: "AS",
    c: "#1fd882",
  },
  {
    q: "The trade P&L breakdown alone replaced three different tools I was stitching together. The win-rate tracking is genuinely impressive.",
    name: "Rachel M.",
    role: "Retail investor, 6 years",
    avatar: "RM",
    c: "#4f9eff",
  },
  {
    q: "Fyn AI caught that our SaaS tooling costs had ballooned 40% YoY. That one insight paid for years of subscription.",
    name: "Deepa N.",
    role: "COO, Vortex Labs",
    avatar: "DN",
    c: "#ff9f43",
  },
];

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
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

function useInView(ref, threshold = 0.25) {
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

/* ─────────────────────────────────────────────────────────────
   STAT CARD  (animated counter on scroll)
───────────────────────────────────────────────────────────── */
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
        <div
          className="sc-fill"
          style={{ width: started ? "100%" : "0%", transitionDelay: `${i * 0.16}s` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   APP  (main landing page)
───────────────────────────────────────────────────────────── */
export default function App() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [statsOn,     setStatsOn]     = useState(false);
  const [billing,     setBilling]     = useState("monthly");
  const [activeFeat,  setActiveFeat]  = useState(0);
  const [activeAI,    setActiveAI]    = useState(0);
  const [hovBar,      setHovBar]      = useState(null);
  const [chartIn,     setChartIn]     = useState(false);
  const [cursor,      setCursor]      = useState({ x: -300, y: -300 });

  const statsRef    = useRef(null);
  const chartRef    = useRef(null);
  const statsInView = useInView(statsRef, 0.3);
  const chartInView = useInView(chartRef, 0.3);

  /* trigger counters + chart when in viewport */
  useEffect(() => { if (statsInView) setStatsOn(true);  }, [statsInView]);
  useEffect(() => { if (chartInView) setChartIn(true);  }, [chartInView]);

  /* nav background on scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* scroll-reveal observer */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* cursor glow tracking */
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

  /* ── JSX ───────────────────────────────────────────────────── */
  return (
    <>
      {/* ── ALL STYLES ───────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Mono:wght@300;400;500&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --blk:#05060a; --dark:#0b0d12; --panel:#111419; --card:#171b22;
          --bdr:rgba(255,255,255,.07); --bdr2:rgba(255,255,255,.13);
          --txt:#e6e9ef; --muted:rgba(230,233,239,.48); --muted2:rgba(230,233,239,.26);
          --g:#1fd882; --g2:#0fb860; --gg:rgba(31,216,130,.16);
          --blue:#4f9eff; --orange:#ff9f43; --pink:#ff6b9d; --purple:#a78bfa;
          --r:14px; --rl:22px; --rx:30px;
          --s1:0 2px 16px rgba(0,0,0,.35);
          --s2:0 8px 40px rgba(0,0,0,.45);
          --s3:0 24px 80px rgba(0,0,0,.55);
        }
        html{scroll-behavior:smooth}
        body{
          font-family:'Bricolage Grotesque',sans-serif;
          background:var(--blk);color:var(--txt);
          overflow-x:hidden;-webkit-font-smoothing:antialiased;
        }
        ::selection{background:var(--gg);color:var(--g)}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--dark)}
        ::-webkit-scrollbar-thumb{background:var(--g2);border-radius:2px}

        /* ── CURSOR GLOW ── */
        .cg{
          position:fixed;pointer-events:none;z-index:0;
          width:480px;height:480px;border-radius:50%;
          background:radial-gradient(circle,rgba(31,216,130,.035) 0%,transparent 70%);
          transform:translate(-50%,-50%);
          transition:left .08s linear,top .08s linear;
        }

        /* ── NAV ── */
        nav{
          position:fixed;top:0;left:0;right:0;z-index:100;
          height:68px;padding:0 48px;
          display:flex;align-items:center;justify-content:space-between;
          transition:all .4s;border-bottom:1px solid transparent;
        }
        nav.up{
          background:rgba(5,6,10,.88);
          backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
          border-color:var(--bdr);
        }
        .logo{
          font-size:20px;font-weight:800;color:var(--txt);
          text-decoration:none;display:flex;align-items:center;gap:10px;letter-spacing:-.04em;
        }
        .logo-mark{
          width:34px;height:34px;border-radius:10px;background:var(--g);
          display:grid;place-items:center;flex-shrink:0;position:relative;transition:background .3s;
        }
        .logo:hover .logo-mark{background:var(--g2)}
        .logo-mark::before{
          content:'';position:absolute;width:13px;height:13px;
          border:2.5px solid var(--blk);border-radius:4px;
        }
        .logo-mark::after{
          content:'';position:absolute;width:5px;height:5px;
          background:var(--blk);border-radius:50%;top:8px;right:8px;
        }
        .nav-links{display:flex;gap:32px;list-style:none}
        .nav-links a{
          font-size:14px;font-weight:500;color:var(--muted);
          text-decoration:none;transition:color .2s;position:relative;
        }
        .nav-links a::after{
          content:'';position:absolute;bottom:-2px;left:0;right:0;
          height:1.5px;background:var(--g);
          transform:scaleX(0);transform-origin:left;transition:transform .25s;
        }
        .nav-links a:hover{color:var(--txt)}
        .nav-links a:hover::after{transform:scaleX(1)}
        .nav-r{display:flex;gap:10px;align-items:center}
        .btn-ghost{
          font-family:'Bricolage Grotesque',sans-serif;font-size:14px;font-weight:500;
          color:var(--muted);background:transparent;border:1px solid var(--bdr2);
          padding:8px 20px;border-radius:100px;cursor:pointer;
          transition:all .2s;text-decoration:none;
        }
        .btn-ghost:hover{color:var(--txt);border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.03)}
        .btn-solid{
          font-family:'Bricolage Grotesque',sans-serif;font-size:14px;font-weight:700;
          color:var(--blk);background:var(--g);border:none;
          padding:9px 22px;border-radius:100px;cursor:pointer;
          transition:all .25s;text-decoration:none;display:inline-block;
        }
        .btn-solid:hover{background:#2aff98;transform:translateY(-1px);box-shadow:0 8px 28px var(--gg)}
        .btn-xl{font-size:16px;padding:14px 38px}
        .mob-btn{display:none;background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:5px}
        .mob-btn span{display:block;width:22px;height:2px;background:var(--txt);border-radius:2px}
        .mob-nav{
          position:fixed;top:68px;left:0;right:0;
          background:rgba(5,6,10,.97);backdrop-filter:blur(24px);
          padding:28px 24px;display:flex;flex-direction:column;gap:20px;
          z-index:99;border-top:1px solid var(--bdr);
        }
        .mob-nav a{font-size:20px;font-weight:700;color:var(--txt);text-decoration:none}

        /* ── HERO ── */
        .hero{
          min-height:100vh;display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          text-align:center;padding:130px 24px 80px;
          position:relative;overflow:hidden;
        }
        .hero-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden}
        .hero-noise{
          position:absolute;inset:0;opacity:.04;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px;
        }
        .hero-grid{
          position:absolute;inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);
          background-size:64px 64px;
          mask-image:radial-gradient(ellipse 75% 75% at 50% 42%,#000 15%,transparent 100%);
        }
        .blob{position:absolute;border-radius:50%;filter:blur(100px)}
        .b1{
          width:650px;height:650px;
          background:radial-gradient(circle,rgba(31,216,130,.11) 0,transparent 70%);
          top:-120px;left:-170px;animation:drift 18s ease-in-out infinite;
        }
        .b2{
          width:550px;height:550px;
          background:radial-gradient(circle,rgba(79,158,255,.07) 0,transparent 70%);
          bottom:-60px;right:-110px;animation:drift 22s ease-in-out infinite reverse;
        }
        .b3{
          width:380px;height:380px;
          background:radial-gradient(circle,rgba(167,139,250,.055) 0,transparent 70%);
          top:45%;left:58%;animation:drift 15s ease-in-out infinite 4s;
        }
        @keyframes drift{
          0%,100%{transform:translate(0,0)}
          33%{transform:translate(28px,-38px)}
          66%{transform:translate(-18px,24px)}
        }
        .badge{
          display:inline-flex;align-items:center;gap:8px;
          background:rgba(31,216,130,.07);border:1px solid rgba(31,216,130,.18);
          padding:6px 16px;border-radius:100px;font-size:13px;font-weight:500;
          color:var(--g);margin-bottom:32px;animation:fadeUp .8s ease both;
        }
        .live-dot{
          width:7px;height:7px;border-radius:50%;
          background:var(--g);flex-shrink:0;animation:pulse 2s infinite;
        }
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}
        h1.hero-h{
          font-size:clamp(50px,8vw,96px);font-weight:800;
          line-height:.94;letter-spacing:-.045em;
          max-width:900px;margin-bottom:26px;animation:fadeUp .9s ease .1s both;
        }
        .grad{
          background:linear-gradient(130deg,var(--g) 0%,#6effbf 38%,var(--blue) 100%);
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;display:block;
        }
        .hero-sub{
          font-size:clamp(15px,2vw,19px);font-weight:300;color:var(--muted);
          max-width:500px;line-height:1.72;margin-bottom:48px;
          animation:fadeUp 1s ease .2s both;
        }
        .hero-ctas{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;animation:fadeUp 1s ease .3s both}
        .hero-note{
          margin-top:18px;font-size:12px;color:var(--muted2);
          animation:fadeUp 1s ease .4s both;
          font-family:'DM Mono',monospace;letter-spacing:.03em;
        }
        @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

        /* ── DASHBOARD MOCK ── */
        .dash-wrap{
          margin-top:72px;width:100%;max-width:1040px;
          animation:fadeUp 1.2s ease .55s both;position:relative;
        }
        .dash-wrap::before{
          content:'';position:absolute;top:-28px;left:50%;transform:translateX(-50%);
          width:65%;height:56px;
          background:radial-gradient(ellipse,var(--gg) 0%,transparent 70%);
          filter:blur(18px);pointer-events:none;
        }
        .dash-frame{
          background:rgba(17,20,25,.92);border:1px solid var(--bdr2);
          border-radius:var(--rx);overflow:hidden;
          box-shadow:var(--s3),0 0 0 1px rgba(31,216,130,.055) inset;
        }
        .dtop{
          background:var(--panel);border-bottom:1px solid var(--bdr);
          padding:14px 24px;display:flex;align-items:center;gap:12px;
        }
        .wdots{display:flex;gap:6px}
        .wd{width:12px;height:12px;border-radius:50%}
        .wd:nth-child(1){background:#ff5f57}
        .wd:nth-child(2){background:#ffbd2e}
        .wd:nth-child(3){background:#28ca42}
        .dtitle{font-family:'DM Mono',monospace;font-size:12px;color:var(--muted2);margin-left:8px}
        .live-tag{
          margin-left:auto;display:flex;align-items:center;gap:6px;
          font-size:11px;font-weight:600;color:var(--g);font-family:'DM Mono',monospace;
        }
        .ldt{width:6px;height:6px;background:var(--g);border-radius:50%;animation:pulse 1.5s infinite}
        .dbody{padding:22px;display:flex;flex-direction:column;gap:14px}
        .krow{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .kpi{
          background:var(--card);border:1px solid var(--bdr);border-radius:var(--rl);
          padding:18px 20px;cursor:default;transition:border-color .25s;
        }
        .kpi:hover{border-color:var(--bdr2)}
        .ktop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
        .klbl{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--muted2);font-family:'DM Mono',monospace}
        .kb{font-size:10px;font-weight:600;padding:3px 8px;border-radius:100px;font-family:'DM Mono',monospace}
        .ku{background:rgba(31,216,130,.12);color:var(--g)}
        .kd{background:rgba(255,107,157,.12);color:var(--pink)}
        .kv{font-size:26px;font-weight:800;letter-spacing:-.04em;margin-bottom:12px}
        .kv.g{color:var(--g)}.kv.r{color:var(--pink)}
        .spark{display:flex;align-items:flex-end;gap:3px;height:26px}
        .sp{flex:1;border-radius:3px 3px 0 0}
        .crows{display:grid;grid-template-columns:2fr 1fr;gap:12px}
        .ccard{background:var(--card);border:1px solid var(--bdr);border-radius:var(--rl);padding:20px}
        .chd{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .cttl{font-size:14px;font-weight:700}
        .csub{font-size:11px;color:var(--muted2);font-family:'DM Mono',monospace}
        .yoy{font-size:11px;color:var(--g);font-weight:600;background:rgba(31,216,130,.1);padding:3px 10px;border-radius:100px;font-family:'DM Mono',monospace}
        .bchart{display:flex;align-items:flex-end;gap:5px;height:88px}
        .bw{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px}
        .bar{width:100%;border-radius:4px 4px 0 0;cursor:pointer;min-height:3px}
        .bmo{font-size:9px;color:var(--muted2);font-family:'DM Mono',monospace}
        .dcc{display:flex;flex-direction:column;align-items:center;gap:10px}
        .dsvg{filter:drop-shadow(0 4px 16px rgba(31,216,130,.12))}
        .dleg{width:100%;display:flex;flex-direction:column;gap:6px}
        .dl{display:flex;align-items:center;gap:7px;font-size:11px}
        .dld{width:7px;height:7px;border-radius:50%;flex-shrink:0}
        .dln{color:var(--muted);flex:1}.dlp{font-weight:600;font-family:'DM Mono',monospace}

        /* ── REVEAL ANIMATION ── */
        .rv{opacity:0;transform:translateY(30px);transition:opacity .72s cubic-bezier(.16,1,.3,1),transform .72s cubic-bezier(.16,1,.3,1)}
        .rv.in{opacity:1;transform:translateY(0)}
        .rv-1{transition-delay:.06s}.rv-2{transition-delay:.12s}
        .rv-3{transition-delay:.18s}.rv-4{transition-delay:.24s}.rv-5{transition-delay:.3s}

        /* ── STATS STRIP ── */
        .stats-section{padding:0;position:relative}
        .stats-section::before,.stats-section::after{
          content:'';position:absolute;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,var(--bdr2) 30%,var(--bdr2) 70%,transparent);
        }
        .stats-section::before{top:0}.stats-section::after{bottom:0}
        .stats-grid{
          max-width:1100px;margin:0 auto;
          display:grid;grid-template-columns:repeat(4,1fr);
          gap:1px;background:var(--bdr);
          border-left:1px solid var(--bdr);border-right:1px solid var(--bdr);
        }
        .sc{background:var(--blk);padding:44px 28px;text-align:center;transition:background .3s;cursor:default;position:relative;overflow:hidden}
        .sc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--g),transparent);opacity:0;transition:opacity .3s}
        .sc:hover{background:rgba(31,216,130,.03)}.sc:hover::before{opacity:1}
        .sc-ico{font-size:28px;display:block;margin-bottom:14px}
        .sc-num{
          font-size:50px;font-weight:800;letter-spacing:-.055em;
          background:linear-gradient(135deg,var(--txt) 35%,var(--g) 100%);
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;display:block;min-height:62px;line-height:1;
        }
        .sc-lbl{font-size:12px;color:var(--muted2);text-transform:uppercase;letter-spacing:.06em;font-weight:500;margin-bottom:22px;font-family:'DM Mono',monospace}
        .sc-bar{height:1.5px;background:rgba(255,255,255,.06);overflow:hidden}
        .sc-fill{height:100%;background:linear-gradient(90deg,var(--g2),var(--g));width:0%;transition:width 2.1s cubic-bezier(.16,1,.3,1)}

        /* ── SECTION BASE ── */
        .sec{padding:120px 40px;max-width:1100px;margin:0 auto}
        .tag-ln{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--g);margin-bottom:18px;font-family:'DM Mono',monospace}
        .tag-ln::before{content:'';width:18px;height:1.5px;background:var(--g)}
        .sec-h{font-size:clamp(30px,4.5vw,54px);font-weight:800;letter-spacing:-.04em;line-height:1.08;margin-bottom:20px}
        .sec-p{font-size:17px;font-weight:300;color:var(--muted);max-width:500px;line-height:1.72}

        /* ── FEATURES ── */
        .feat-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:48px;align-items:start;margin-top:56px}
        .feat-list{display:flex;flex-direction:column;gap:2px}
        .fi{padding:18px 22px;border-radius:var(--r);cursor:pointer;transition:all .25s;border:1px solid transparent}
        .fi.on{background:var(--panel);border-color:var(--bdr)}
        .fi:not(.on):hover{background:rgba(255,255,255,.025)}
        .fi-row{display:flex;align-items:center;gap:12px}
        .fi-ico{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-size:15px;flex-shrink:0}
        .fi-meta{display:flex;align-items:center;gap:8px}
        .fi-tag{font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;padding:2px 7px;border-radius:100px;font-family:'DM Mono',monospace}
        .fi h3{font-size:15px;font-weight:700}
        .fi p{font-size:13px;color:var(--muted);line-height:1.65;font-weight:300;margin-top:8px;max-height:0;overflow:hidden;transition:max-height .42s ease,opacity .3s;opacity:0}
        .fi.on p{max-height:80px;opacity:1}
        .feat-preview{
          position:sticky;top:100px;background:var(--panel);border:1px solid var(--bdr);
          border-radius:var(--rx);padding:48px 40px;min-height:370px;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;overflow:hidden;transition:border-color .4s;
        }
        .fp-ico{font-size:76px;margin-bottom:20px}
        .fp-tag{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:100px;margin-bottom:16px;display:inline-block;font-family:'DM Mono',monospace}
        .feat-preview h4{font-size:22px;font-weight:800;margin-bottom:12px}
        .feat-preview p{font-size:14px;color:var(--muted);line-height:1.68;font-weight:300;max-width:280px}

        /* ── FYN AI SHOWCASE ── */
        .ai-section{background:var(--dark);border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);padding:120px 0}
        .ai-inner{max-width:1100px;margin:0 auto;padding:0 40px}
        .ai-tabs{
          display:flex;gap:0;margin-top:56px;
          border:1px solid var(--bdr);border-radius:var(--rx);
          overflow:hidden;background:var(--panel);
        }
        .ai-tab{
          flex:1;padding:20px 24px;cursor:pointer;
          transition:all .25s;border-right:1px solid var(--bdr);position:relative;
        }
        .ai-tab:last-child{border-right:none}
        .ai-tab.on{background:var(--card)}
        .ai-tab:not(.on):hover{background:rgba(255,255,255,.025)}
        .ai-tab::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;transform:scaleX(0);transform-origin:left;transition:transform .35s}
        .ai-tab.on::after{transform:scaleX(1)}
        .ai-tab-ico{font-size:22px;margin-bottom:10px;display:block}
        .ai-tab-ttl{font-size:14px;font-weight:700;margin-bottom:4px}
        .ai-tab-sub{font-size:12px;color:var(--muted2);font-weight:300;line-height:1.5}
        .ai-body{
          display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;
          padding:48px;background:var(--card);
          border:1px solid var(--bdr);border-top:none;border-radius:0 0 var(--rx) var(--rx);
        }
        .ai-body-text h3{font-size:28px;font-weight:800;letter-spacing:-.035em;margin-bottom:16px;line-height:1.12}
        .ai-body-text p{font-size:16px;color:var(--muted);font-weight:300;line-height:1.72;margin-bottom:28px}
        .ai-points{display:flex;flex-direction:column;gap:10px}
        .ai-point{display:flex;align-items:center;gap:12px;font-size:14px;color:var(--muted);font-weight:300}
        .ai-point::before{content:'';width:6px;height:6px;border-radius:50%;flex-shrink:0}
        .ai-visual{background:var(--panel);border:1px solid var(--bdr);border-radius:var(--rl);padding:28px;position:relative;overflow:hidden}
        .ai-visual::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;border-radius:50%;filter:blur(60px);opacity:.4;pointer-events:none}
        .ai-vis-header{display:flex;align-items:center;gap:10px;margin-bottom:24px}
        .ai-vis-ico{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;font-size:14px;flex-shrink:0}
        .ai-vis-ttl{font-size:13px;font-weight:700}
        .ai-vis-tag{font-size:10px;font-family:'DM Mono',monospace;font-weight:600;padding:2px 8px;border-radius:100px;margin-left:auto}
        .ai-bar-chart{display:flex;align-items:flex-end;gap:5px;height:80px;margin-bottom:16px}
        .ai-bar{flex:1;border-radius:4px 4px 0 0;min-height:3px;transition:opacity .2s}
        .ai-bar:hover{opacity:.75;cursor:pointer}
        .ai-insight-box{background:rgba(31,216,130,.06);border:1px solid rgba(31,216,130,.14);border-radius:10px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start;margin-top:4px}
        .ai-ins-ico{font-size:14px;flex-shrink:0;margin-top:1px}
        .ai-ins-txt{font-size:12px;color:var(--g);font-weight:400;line-height:1.6}
        .ai-metrics{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:12px}
        .ai-metric{background:var(--panel);border:1px solid var(--bdr);border-radius:10px;padding:12px 14px}
        .ai-metric-val{font-size:20px;font-weight:800;letter-spacing:-.04em;margin-bottom:2px;font-family:'DM Mono',monospace}
        .ai-metric-lbl{font-size:10px;color:var(--muted2);text-transform:uppercase;letter-spacing:.06em;font-family:'DM Mono',monospace}

        /* ── HOW IT WORKS ── */
        .how-section{padding:120px 0}
        .how-inner{max-width:1100px;margin:0 auto;padding:0 40px}
        .steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px}
        .step-card{
          background:var(--panel);border:1px solid var(--bdr);border-radius:var(--rx);
          padding:38px 30px;position:relative;overflow:hidden;
          transition:transform .3s,border-color .3s,box-shadow .3s;
        }
        .step-card:hover{transform:translateY(-6px);border-color:rgba(31,216,130,.2);box-shadow:0 24px 60px rgba(0,0,0,.4),0 0 0 1px rgba(31,216,130,.04) inset}
        .step-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--g2),var(--g),var(--blue));transform:scaleX(0);transform-origin:left;transition:transform .38s}
        .step-card:hover::after{transform:scaleX(1)}
        .snbg{position:absolute;top:-14px;right:-8px;font-size:108px;font-weight:800;color:rgba(255,255,255,.022);line-height:1;pointer-events:none;font-family:'DM Mono',monospace;letter-spacing:-.06em;user-select:none}
        .step-emoji{font-size:38px;margin-bottom:18px;display:block}
        .step-card h3{font-size:20px;font-weight:700;margin-bottom:10px}
        .step-card p{font-size:14px;color:var(--muted);line-height:1.68;font-weight:300}

        /* ── PRICING ── */
        .ptog{display:inline-flex;background:var(--panel);border:1px solid var(--bdr);border-radius:100px;padding:4px;margin-top:22px}
        .ptb{padding:8px 22px;border-radius:100px;border:none;font-family:'Bricolage Grotesque',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .22s;background:transparent;color:var(--muted)}
        .ptb.on{background:var(--card);color:var(--txt);box-shadow:var(--s1)}
        .save-chip{margin-left:8px;font-size:11px;font-weight:700;color:var(--g);background:rgba(31,216,130,.12);padding:2px 8px;border-radius:100px;font-family:'DM Mono',monospace}
        .pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px;align-items:start}
        .pc{background:var(--panel);border:1px solid var(--bdr);border-radius:var(--rx);padding:36px 32px;transition:transform .28s,border-color .28s,box-shadow .28s;position:relative;overflow:hidden}
        .pc:hover{transform:translateY(-4px);border-color:var(--bdr2);box-shadow:var(--s3)}
        .pc.hi{background:var(--g);border-color:var(--g);transform:scale(1.032);box-shadow:0 24px 80px rgba(31,216,130,.22)}
        .pc.hi:hover{transform:scale(1.032) translateY(-4px)}
        .pop-tag{position:absolute;top:18px;right:18px;background:rgba(0,0,0,.22);color:var(--blk);font-size:10px;font-weight:800;padding:4px 12px;border-radius:100px;text-transform:uppercase;letter-spacing:.06em;font-family:'DM Mono',monospace}
        .pname{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--muted2);margin-bottom:20px;font-family:'DM Mono',monospace}
        .pc.hi .pname{color:rgba(0,0,0,.45)}
        .pprice{display:flex;align-items:baseline;gap:3px;margin-bottom:6px}
        .pcur{font-size:22px;font-weight:600;color:var(--muted);margin-top:6px}
        .pc.hi .pcur{color:rgba(0,0,0,.4)}
        .pamt{font-size:54px;font-weight:800;color:var(--txt);letter-spacing:-.05em}
        .pc.hi .pamt{color:var(--blk)}
        .pper{font-size:14px;color:var(--muted);font-weight:300}
        .pc.hi .pper{color:rgba(0,0,0,.38)}
        .pdesc{font-size:13px;color:var(--muted2);margin-bottom:22px;font-weight:300}
        .pc.hi .pdesc{color:rgba(0,0,0,.38)}
        .pdiv{height:1px;background:var(--bdr);margin:20px 0}
        .pc.hi .pdiv{background:rgba(0,0,0,.1)}
        .pfeats{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
        .pfeats li{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:9px;font-weight:300}
        .pc.hi .pfeats li{color:rgba(0,0,0,.62)}
        .pchk{width:17px;height:17px;border-radius:50%;background:rgba(31,216,130,.12);display:grid;place-items:center;flex-shrink:0;font-size:9px;color:var(--g)}
        .pc.hi .pchk{background:rgba(0,0,0,.1);color:var(--blk)}
        .pbtn{width:100%;padding:13px;border-radius:100px;font-family:'Bricolage Grotesque',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .25s;border:1px solid var(--bdr2);background:transparent;color:var(--txt)}
        .pbtn:hover{background:var(--g);border-color:var(--g);color:var(--blk);transform:translateY(-1px)}
        .pc.hi .pbtn{background:rgba(0,0,0,.14);border-color:rgba(0,0,0,.14);color:var(--blk)}
        .pc.hi .pbtn:hover{background:rgba(0,0,0,.22)}

        /* ── TESTIMONIALS ── */
        .testi-section{background:var(--dark);border-top:1px solid var(--bdr);padding:120px 0}
        .testi-inner{max-width:1100px;margin:0 auto;padding:0 40px}
        .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px}
        .tc{background:var(--panel);border:1px solid var(--bdr);border-radius:var(--rx);padding:34px;transition:transform .28s,border-color .28s}
        .tc:hover{transform:translateY(-5px);border-color:var(--bdr2)}
        .stars{display:flex;gap:3px;margin-bottom:16px}
        .star{font-size:13px;color:#ffbd2e}
        .tq{font-size:15px;line-height:1.72;color:var(--muted);font-weight:300;margin-bottom:22px;font-style:italic}
        .tq::before{content:'"';font-size:36px;color:var(--g);line-height:0;vertical-align:-14px;margin-right:3px;opacity:.35}
        .tf{display:flex;align-items:center;gap:12px}
        .tav{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:800;color:var(--blk);flex-shrink:0}
        .tname{font-weight:700;font-size:14px}.trole{font-size:11px;color:var(--muted2);font-family:'DM Mono',monospace}

        /* ── CTA BANNER ── */
        .cta-wrap{padding:80px 40px}
        .cta-box{
          max-width:1100px;margin:0 auto;background:var(--panel);
          border:1px solid var(--bdr);border-radius:40px;
          padding:88px 60px;text-align:center;position:relative;overflow:hidden;
        }
        .cta-box::before{content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:560px;height:360px;background:radial-gradient(ellipse,rgba(31,216,130,.07) 0%,transparent 70%);pointer-events:none}
        .cta-box h2{font-size:clamp(32px,5vw,58px);font-weight:800;letter-spacing:-.045em;margin-bottom:18px;position:relative}
        .cta-box p{font-size:18px;color:var(--muted);font-weight:300;margin-bottom:44px;max-width:440px;margin-left:auto;margin-right:auto;line-height:1.68;position:relative}
        .cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative}
        .cbtn{background:var(--g);color:var(--blk);border:none;padding:17px 44px;border-radius:100px;font-family:'Bricolage Grotesque',sans-serif;font-size:16px;font-weight:700;cursor:pointer;transition:all .28s}
        .cbtn:hover{background:#2aff98;transform:translateY(-3px);box-shadow:0 16px 40px rgba(31,216,130,.3)}
        .cbtng{background:transparent;color:var(--muted);border:1px solid var(--bdr2);padding:17px 44px;border-radius:100px;font-family:'Bricolage Grotesque',sans-serif;font-size:16px;font-weight:500;cursor:pointer;transition:all .25s}
        .cbtng:hover{border-color:rgba(255,255,255,.22);color:var(--txt);background:rgba(255,255,255,.04)}

        /* ── FOOTER ── */
        footer{border-top:1px solid var(--bdr);padding:64px 48px 40px}
        .ftop{max-width:1100px;margin:0 auto 40px;display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr;gap:48px}
        .fbrand{font-size:20px;font-weight:800;letter-spacing:-.045em;margin-bottom:12px}
        .ftagline{font-size:14px;color:var(--muted2);font-weight:300;line-height:1.65;max-width:230px;margin-bottom:20px}
        .fsoc{display:flex;gap:10px}
        .fsb{width:34px;height:34px;border-radius:9px;border:1px solid var(--bdr2);display:grid;place-items:center;font-size:13px;text-decoration:none;color:var(--muted);transition:all .2s}
        .fsb:hover{border-color:rgba(31,216,130,.3);color:var(--g);background:rgba(31,216,130,.06);transform:translateY(-2px)}
        .fct{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted2);margin-bottom:16px;font-family:'DM Mono',monospace}
        .flinks{list-style:none;display:flex;flex-direction:column;gap:10px}
        .flinks a{font-size:14px;color:var(--muted);text-decoration:none;transition:color .2s;font-weight:300}
        .flinks a:hover{color:var(--g)}
        .fbot{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding-top:24px;border-top:1px solid var(--bdr);flex-wrap:wrap;gap:14px}
        .fcopy{font-size:12px;color:var(--muted2);font-family:'DM Mono',monospace}
        .fstatus{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--g);font-family:'DM Mono',monospace}

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
          .krow{grid-template-columns:1fr} .crows{grid-template-columns:1fr}
          .pc.hi{transform:none} .pc.hi:hover{transform:translateY(-4px)}
          .sec{padding:80px 24px}
          .how-inner,.testi-inner,.ai-inner{padding:0 24px}
          .cta-wrap{padding:40px 20px}
          .cta-box{padding:56px 28px;border-radius:28px}
          footer{padding:48px 24px 32px}
          .ftop{grid-template-columns:1fr 1fr}
          .fbot{flex-direction:column;align-items:flex-start}
        }
      `}</style>

      {/* ── CURSOR GLOW ─────────────────────────────────────────── */}
      <div className="cg" style={{ left: cursor.x, top: cursor.y }} />

      {/* ── NAV ─────────────────────────────────────────────────── */}
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
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMobileOpen(false)}
            >
              {l}
            </a>
          ))}
          <a href="#" className="btn-solid" style={{ textAlign: "center" }}>
            Get started free →
          </a>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="hero">
        <div className="hero-bg">
          <div className="hero-noise" />
          <div className="hero-grid" />
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>

        <div className="badge">
          <span className="live-dot" />
          Public beta — 30 days free, no card needed
        </div>

        <h1 className="hero-h">
          Your money,<br />
          <span className="grad">fully understood.</span>
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

        {/* DASHBOARD MOCK */}
        <div className="dash-wrap rv">
          <div className="dash-frame">
            <div className="dtop">
              <div className="wdots">
                <span className="wd" /><span className="wd" /><span className="wd" />
              </div>
              <span className="dtitle">fynovo.app — command center</span>
              <div className="live-tag"><span className="ldt" />live</div>
            </div>
            <div className="dbody">
              {/* KPI row */}
              <div className="krow">
                {[
                  { l: "Total Income",   v: "₹48,290", b: "↑ 12.4%", u: true,  s: [40,55,45,70,60,80,65,90], c: "#1fd882" },
                  { l: "Total Expenses", v: "₹29,114", b: "↓ 3.1%",  u: false, s: [80,70,75,65,70,60,65,55], c: "#ff6b9d" },
                  { l: "Net Profit",     v: "₹19,176", b: "↑ 8.7%",  u: true,  s: [30,40,35,55,48,65,60,78], c: "#4f9eff" },
                ].map((k) => (
                  <div className="kpi" key={k.l}>
                    <div className="ktop">
                      <span className="klbl">{k.l}</span>
                      <span className={k.u ? "kb ku" : "kb kd"}>{k.b}</span>
                    </div>
                    <div className={`kv ${k.u && k.c === "#1fd882" ? "g" : !k.u ? "r" : ""}`}>
                      {k.v}
                    </div>
                    <div className="spark">
                      {k.s.map((h, i) => (
                        <div
                          key={i}
                          className="sp"
                          style={{ height: `${h}%`, background: k.c, opacity: i === k.s.length - 1 ? 1 : 0.2 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
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
                        <div
                          className="bar"
                          style={{
                            height: chartIn ? `${h}%` : "3%",
                            background: hovBar === i ? "#2aff98" : i === 11 ? "var(--g)" : "rgba(255,255,255,.07)",
                            transitionDelay: `${i * 0.045}s`,
                            transition: "height .9s cubic-bezier(.16,1,.3,1), background .2s",
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
                    <svg className="dsvg" width="92" height="92" viewBox="0 0 92 92">
                      {[
                        { p: 40, c: "#1fd882", o: 0  },
                        { p: 30, c: "#4f9eff", o: 40 },
                        { p: 20, c: "#ff9f43", o: 70 },
                        { p: 10, c: "#a78bfa", o: 90 },
                      ].map((s, i) => {
                        const r = 33, cx = 46, ci = 2 * Math.PI * r;
                        const d = (s.p / 100) * ci, g = ci - d;
                        const rot = (s.o / 100) * 360 - 90;
                        return (
                          <circle
                            key={i} cx={cx} cy={cx} r={r} fill="none"
                            stroke={s.c} strokeWidth="11"
                            strokeDasharray={`${d} ${g}`}
                            transform={`rotate(${rot} ${cx} ${cx})`}
                            strokeLinecap="round"
                          />
                        );
                      })}
                      <circle cx="46" cy="46" r="20" fill="var(--card)" />
                    </svg>
                    <div className="dleg">
                      {[["#1fd882","Operations","40%"],["#4f9eff","Marketing","30%"],["#ff9f43","Payroll","20%"],["#a78bfa","Other","10%"]].map(([c, n, p]) => (
                        <div className="dl" key={n}>
                          <div className="dld" style={{ background: c }} />
                          <span className="dln">{n}</span>
                          <span className="dlp">{p}</span>
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

      {/* ── STATS STRIP ─────────────────────────────────────────── */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} started={statsOn} i={i} />
          ))}
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section className="sec" id="features">
        <div className="rv">
          <span className="tag-ln">Features</span>
          <h2 className="sec-h">Built for people who take<br />money seriously.</h2>
          <p className="sec-p">
            Every tool you actually need — nothing you don't. Designed by ex-traders
            and financial analysts who got tired of stitching spreadsheets together.
          </p>
        </div>

        <div className="feat-layout">
          <div className="feat-list">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`fi rv rv-${i % 3 + 1} ${activeFeat === i ? "on" : ""}`}
                onClick={() => setActiveFeat(i)}
              >
                <div className="fi-row">
                  <div className="fi-ico" style={{ background: `${f.color}14`, color: f.color }}>
                    {f.icon}
                  </div>
                  <div>
                    <div className="fi-meta">
                      <h3>{f.title}</h3>
                      <span className="fi-tag" style={{ background: `${f.color}12`, color: f.color }}>
                        {f.tag}
                      </span>
                    </div>
                  </div>
                </div>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div
            className="feat-preview rv rv-2"
            style={{ borderColor: `${FEATURES[activeFeat].color}1e` }}
          >
            <div className="fp-ico">{FEATURES[activeFeat].icon}</div>
            <span
              className="fp-tag"
              style={{ background: `${FEATURES[activeFeat].color}12`, color: FEATURES[activeFeat].color }}
            >
              {FEATURES[activeFeat].tag}
            </span>
            <h4>{FEATURES[activeFeat].title}</h4>
            <p>{FEATURES[activeFeat].desc}</p>
          </div>
        </div>
      </section>

      {/* ── FYN AI SHOWCASE ─────────────────────────────────────── */}
      <div className="ai-section" id="fyn-ai">
        <div className="ai-inner">
          <div className="rv">
            <span className="tag-ln">Fyn AI</span>
            <h2 className="sec-h">An AI that works only<br />on your own data.</h2>
            <p className="sec-p">
              Fyn is not a generic chatbot. It's a financial intelligence engine built
              into your Fynovo account — reading only your transactions, trades, and
              accounts to surface insights specific to you.
            </p>
          </div>

          {/* Tabs */}
          <div className="ai-tabs rv">
            {AI_CAPABILITIES.map((cap, i) => (
              <div
                key={cap.title}
                className={`ai-tab ${activeAI === i ? "on" : ""}`}
                onClick={() => setActiveAI(i)}
              >
                <style>{`.ai-tab:nth-child(${i + 1}).on::after { background: ${cap.color}; }`}</style>
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
                    <style>{`.ai-point::before { background: ${cur.color}; }`}</style>
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual panel */}
            <div className="ai-visual">
              <style>{`.ai-visual::before { background: radial-gradient(circle, ${cur.color}44 0%, transparent 70%); }`}</style>

              <div className="ai-vis-header">
                <div className="ai-vis-ico" style={{ background: `${cur.color}18`, color: cur.color }}>
                  {cur.icon}
                </div>
                <span className="ai-vis-ttl">Fyn AI · {cur.title}</span>
                <span className="ai-vis-tag" style={{ background: `${cur.color}14`, color: cur.color }}>
                  Live Analysis
                </span>
              </div>

              {/* Tab 0 — Trading P&L */}
              {activeAI === 0 && (
                <>
                  <div className="ai-bar-chart">
                    {[55, 42, 70, 38, 85, 60, 78, 45, 92, 67, 80, 100].map((h, i) => (
                      <div
                        key={i} className="ai-bar"
                        style={{
                          height: `${h}%`,
                          background: h > 70 ? "var(--g)" : h > 50 ? "rgba(31,216,130,.45)" : "rgba(255,107,157,.4)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="ai-insight-box">
                    <span className="ai-ins-ico">💡</span>
                    <span className="ai-ins-txt">
                      Your win rate is 68% this month — 9 pts above your 6-month average.
                      INFY and TCS are your strongest performers.
                    </span>
                  </div>
                  <div className="ai-metrics">
                    {[
                      { v: "+₹14,320", l: "Net P&L"       },
                      { v: "68%",      l: "Win Rate"       },
                      { v: "−4.2%",    l: "Max Drawdown"   },
                      { v: "1.84",     l: "Sharpe Ratio"   },
                    ].map((m) => (
                      <div className="ai-metric" key={m.l}>
                        <div className="ai-metric-val" style={{ color: m.v.startsWith("+") ? "var(--g)" : m.v.startsWith("−") ? "var(--pink)" : "var(--txt)" }}>
                          {m.v}
                        </div>
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
                      { h: 80,  lbl: "Adobe"     },
                      { h: 100, lbl: "LinkedIn"  },
                      { h: 38,  lbl: "Hotstar"   },
                      { h: 25,  lbl: "Audible"   },
                      { h: 60,  lbl: "Notion"    },
                      { h: 45,  lbl: "Figma"     },
                      { h: 30,  lbl: "Grammarly" },
                    ].map((b, i) => (
                      <div key={i} className="bw">
                        <div className="ai-bar" style={{ height: `${b.h}%`, background: i < 4 ? "var(--orange)" : "rgba(255,159,67,.35)" }} />
                        <span className="bmo" style={{ fontSize: 8 }}>{b.lbl.slice(0, 4)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ai-insight-box">
                    <span className="ai-ins-ico">✂️</span>
                    <span className="ai-ins-txt">
                      4 subscriptions unused 60+ days: Adobe CC, LinkedIn Premium, Hotstar, Audible.
                      Cancelling saves ₹1,896/month — ₹22,752/year.
                    </span>
                  </div>
                  <div className="ai-metrics">
                    {[
                      { v: "₹1,896",   l: "Monthly Waste"  },
                      { v: "₹22,752",  l: "Yearly Savings" },
                      { v: "4",        l: "Dead Subs"       },
                      { v: "31%",      l: "Above Avg Spend" },
                    ].map((m) => (
                      <div className="ai-metric" key={m.l}>
                        <div className="ai-metric-val" style={{ color: "var(--orange)" }}>{m.v}</div>
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
                    {[42, 48, 44, 55, 52, 62, 58, 68, 65, 72, 70, 80].map((h, i) => (
                      <div
                        key={i} className="ai-bar"
                        style={{ height: `${h}%`, background: `rgba(31,216,130,${0.28 + (i / 11) * 0.72})` }}
                      />
                    ))}
                  </div>
                  <div className="ai-insight-box">
                    <span className="ai-ins-ico">📊</span>
                    <span className="ai-ins-txt">
                      Net position grew 14.8% over 12 months. Income sources are well-diversified.
                      One-off expenses in Q3 have been isolated from your trend line.
                    </span>
                  </div>
                  <div className="ai-metrics">
                    {[
                      { v: "₹19,176", l: "Net Profit"     },
                      { v: "82/100",  l: "Health Score"   },
                      { v: "+14.8%",  l: "YoY Growth"     },
                      { v: "6.2x",    l: "Emergency Cover"},
                    ].map((m) => (
                      <div className="ai-metric" key={m.l}>
                        <div className="ai-metric-val" style={{ color: "var(--g)" }}>{m.v}</div>
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

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <div className="how-section" id="how-it-works">
        <div className="how-inner">
          <div className="rv">
            <span className="tag-ln">How It Works</span>
            <h2 className="sec-h">Zero friction.<br />Immediate clarity.</h2>
            <p className="sec-p">
              No manual imports. No accountant. Fynovo and Fyn AI handle the
              tedious parts — you focus on the decisions that matter.
            </p>
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

      {/* ── PRICING ─────────────────────────────────────────────── */}
      <section className="sec" id="pricing">
        <div className="rv">
          <span className="tag-ln">Pricing</span>
          <h2 className="sec-h">Pay for what you use.<br />Nothing more.</h2>
          <p className="sec-p">
            Every plan includes a 30-day free trial. No credit card, no commitment.
            Fyn AI is included in all plans.
          </p>
          <div className="ptog">
            <button className={`ptb ${billing === "monthly" ? "on" : ""}`} onClick={() => setBilling("monthly")}>
              Monthly
            </button>
            <button className={`ptb ${billing === "annual" ? "on" : ""}`} onClick={() => setBilling("annual")}>
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
                <div className="pdesc">
                  {billing === "annual" ? `Billed $${price * 12}/yr` : p.desc}
                </div>
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

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
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
                  <div className="tav" style={{ background: t.c }}>{t.avatar}</div>
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

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <div className="cta-wrap">
        <div className="cta-box rv">
          <h2>Stop guessing.<br />Start knowing.</h2>
          <p>
            Join 40,000+ users who made the switch to financial clarity.
            Set up in 90 seconds, Fyn AI included.
          </p>
          <div className="cta-btns">
            <button className="cbtn">Start free — no card needed</button>
            <button className="cbtng">Schedule a demo</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer>
        <div className="ftop">
          <div>
            <div className="fbrand">Fynovo</div>
            <p className="ftagline">
              Smart financial management for individuals and teams who think in numbers.
            </p>
            <div className="fsoc">
              {["𝕏", "in", "▶", "◎"].map((s, i) => (
                <a key={i} href="#" className="fsb">{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "Fyn AI", "Pricing", "Changelog", "Roadmap"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            { title: "Legal",   links: ["Privacy", "Terms", "Security", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="fct">{col.title}</div>
              <ul className="flinks">
                {col.links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="fbot">
          <div className="fcopy">© 2025 Fynovo, Inc. All rights reserved.</div>
          <div className="fstatus">
            <span className="live-dot" />All systems operational
          </div>
        </div>
      </footer>
    </>
  );
}
