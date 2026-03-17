import { useState, useEffect, useRef } from "react";

/* ============================================================
   FYNOVO V3 — DARK LUXURY EDITORIAL
   Direction: Late-night trading terminal × high-fashion editorial
   Fonts: Playfair Display (editorial serif) × DM Mono (data)
   Colors: Cream #F0EBE0 · Ink #0D0D0F · Acid #C8F23A · Rust #C94A2A
   Layout: Asymmetric grid-breaking · NO cards everywhere · 
           Real editorial proportions · Human-made feel
   ============================================================ */

const G = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Sans:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0D0D0F; --ink2:#1A1A1E; --ink3:#252528;
  --cream:#F0EBE0; --cream2:#D8D2C6; --cream3:#9A9488;
  --acid:#C8F23A; --rust:#C94A2A; --gold:#D4A843;
  --b:rgba(240,235,224,.07); --b2:rgba(240,235,224,.13);
}
html{scroll-behavior:smooth;overflow-x:hidden}
body{font-family:'Instrument Sans',sans-serif;background:var(--ink);color:var(--cream);overflow-x:hidden;cursor:none;line-height:1.65}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--ink)}
::-webkit-scrollbar-thumb{background:var(--acid)}

/* CURSOR */
#c{position:fixed;top:0;left:0;width:8px;height:8px;background:var(--acid);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s,background .2s,border-radius .2s}
#cr{position:fixed;top:0;left:0;width:34px;height:34px;border:1px solid rgba(200,242,58,.35);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%)}
#c.big{width:18px;height:18px;background:var(--rust)}
#cr.big{width:52px;height:52px;border-color:rgba(201,74,42,.4)}

/* NOISE */
body::before{content:'';position:fixed;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");pointer-events:none;z-index:9999;opacity:.55}

/* TYPE */
.disp{font-family:'Playfair Display',serif;font-weight:900;line-height:.95;letter-spacing:-.025em}
.disp-i{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;line-height:1.1}
.mono{font-family:'DM Mono',monospace;letter-spacing:.1em;text-transform:uppercase}

/* KEYFRAMES */
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeL{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeR{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
@keyframes scIn{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
@keyframes drawLine{to{stroke-dashoffset:0}}
@keyframes areaIn{to{opacity:1}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes gradMove{0%{background-position:0% 0%}50%{background-position:100% 100%}100%{background-position:0% 0%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes scanline{0%{top:-2px}100%{top:100%}}
@keyframes glitch{0%,91%,100%{transform:none}92%{transform:skewX(1.5deg);clip-path:inset(15% 0 65% 0)}94%{transform:skewX(-1deg);clip-path:inset(65% 0 5% 0)}96%{transform:none;clip-path:none}}
@keyframes underline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes acidPulse{0%,100%{box-shadow:0 0 0 0 rgba(200,242,58,0)}50%{box-shadow:0 0 0 10px rgba(200,242,58,0)}}
@keyframes spinSlow{to{transform:rotate(360deg)}}

/* REVEAL */
.r{opacity:0}.r.on{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
.rl{opacity:0}.rl.on{animation:fadeL .7s cubic-bezier(.16,1,.3,1) both}
.rr{opacity:0}.rr.on{animation:fadeR .7s cubic-bezier(.16,1,.3,1) both}
.rs{opacity:0}.rs.on{animation:scIn .65s cubic-bezier(.16,1,.3,1) both}
.d1{animation-delay:.06s!important}.d2{animation-delay:.13s!important}.d3{animation-delay:.22s!important}
.d4{animation-delay:.32s!important}.d5{animation-delay:.44s!important}.d6{animation-delay:.58s!important}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 52px;z-index:1000;transition:background .5s,border .4s}
.nav.s{background:rgba(13,13,15,.86);backdrop-filter:blur(24px);border-bottom:1px solid var(--b)}
.logo{font-family:'Playfair Display',serif;font-weight:900;font-size:22px;color:var(--cream);text-decoration:none;letter-spacing:-.04em}
.logo em{font-style:italic;color:var(--acid)}
.nav-links{display:flex;gap:36px}
.nav-links a{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--cream3);text-decoration:none;transition:color .2s}
.nav-links a:hover{color:var(--cream)}
.cta-btn{background:var(--acid);color:var(--ink);border:none;padding:10px 26px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;cursor:none;transition:all .2s}
.cta-btn:hover{background:var(--cream);transform:translateY(-1px)}

/* IMAGE PLACEHOLDER — editorial film frame style */
.ph{position:relative;overflow:hidden;background:var(--ink2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ph::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--ink2) 0%,#202028 50%,var(--ink2) 100%);background-size:200% 200%;animation:gradMove 5s ease infinite}
.ph-inner{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:8px}
.ph-cross{position:relative;width:32px;height:32px;flex-shrink:0}
.ph-cross::before,.ph-cross::after{content:'';position:absolute;background:rgba(200,242,58,.25)}
.ph-cross::before{width:1px;height:100%;left:50%;top:0}
.ph-cross::after{height:1px;width:100%;top:50%;left:0}
.ph-txt{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,242,58,.4)}
.ph-sub{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.15em;text-transform:uppercase;color:rgba(240,235,224,.15);text-align:center}
/* Corner marks */
.ph::after{content:'';position:absolute;inset:0;background:
  linear-gradient(to right,rgba(200,242,58,.18) 1px,transparent 1px) 0 0/12px 12px,
  linear-gradient(to bottom,rgba(200,242,58,.18) 1px,transparent 1px) 0 0/12px 12px,
  linear-gradient(to left,rgba(200,242,58,.18) 1px,transparent 1px) 100% 100%/12px 12px,
  linear-gradient(to top,rgba(200,242,58,.18) 1px,transparent 1px) 100% 100%/12px 12px;
background-repeat:no-repeat;pointer-events:none;z-index:3}
.ph-num{position:absolute;top:12px;right:14px;font-family:'DM Mono',monospace;font-size:9px;color:rgba(240,235,224,.18);z-index:4;letter-spacing:.1em}
.ph-label{position:absolute;bottom:12px;left:14px;font-family:'DM Mono',monospace;font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:rgba(200,242,58,.4);z-index:4}

/* CHIP */
.chip{display:inline-flex;flex-direction:column;padding:12px 16px;border:1px solid var(--b2);background:var(--ink2);gap:4px}
.chip-v{font-family:'DM Mono',monospace;font-weight:500;font-size:20px;color:var(--cream)}
.chip-l{font-size:10px;color:var(--cream3);letter-spacing:.06em}
.chip-d{font-family:'DM Mono',monospace;font-size:10px;color:var(--acid)}

/* TAG */
.tag{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(200,242,58,.28);padding:5px 12px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:var(--acid)}
.tag::before{content:'';width:4px;height:4px;background:var(--acid);border-radius:50%;animation:acidPulse 2.5s ease-in-out infinite}

/* FEATURE ROW */
.feat-row{display:grid;grid-template-columns:52px 1fr 24px;gap:24px;padding:28px 0;border-bottom:1px solid var(--b);cursor:default;transition:padding-left .25s}
.feat-row:hover{padding-left:8px}
.feat-row:hover .fn{color:var(--acid)}
.feat-row:hover .ft{color:var(--acid)}
.feat-row:hover .fa{opacity:1;transform:translateX(0)}
.fn{font-family:'DM Mono',monospace;font-size:10px;color:rgba(240,235,224,.25);padding-top:4px;transition:color .2s}
.ft{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;margin-bottom:8px;transition:color .25s}
.fb{font-size:13px;color:var(--cream3);line-height:1.65;max-width:460px}
.fa{font-size:16px;color:var(--acid);opacity:0;transform:translateX(-10px);transition:all .28s;padding-top:4px}

/* PRICE TABLE */
.pt{display:grid;grid-template-columns:1fr 1px 1fr 1px 1fr;border:1px solid var(--b2)}
.pc{padding:44px 40px;position:relative;transition:background .3s}
.pc:hover{background:rgba(240,235,224,.025)}
.pc.hot{background:linear-gradient(170deg,rgba(200,242,58,.055) 0%,transparent 55%)}
.pd{background:var(--b2)}
.pn{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--cream3);margin-bottom:22px}
.pamt{font-family:'Playfair Display',serif;font-weight:900;font-size:60px;line-height:1;letter-spacing:-.04em;margin-bottom:6px}
.pamt em{font-size:24px;font-style:normal;color:var(--cream3)}
.pper{font-family:'DM Mono',monospace;font-size:9px;color:var(--cream3);letter-spacing:.1em;margin-bottom:40px}
.pf{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--cream2);padding:10px 0;border-bottom:1px solid rgba(240,235,224,.05)}
.pf::before{content:'—';color:var(--acid);font-family:'DM Mono',monospace;font-size:11px;flex-shrink:0}
.pbtn{margin-top:40px;width:100%;padding:14px;border:1px solid;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;cursor:none;transition:all .25s;background:transparent}
.pbtn.o{border-color:var(--b2);color:var(--cream3)}.pbtn.o:hover{border-color:var(--cream);color:var(--cream)}
.pbtn.a{border-color:var(--acid);color:var(--acid)}.pbtn.a:hover{background:var(--acid);color:var(--ink)}
.pbtn.s{background:var(--cream);border-color:var(--cream);color:var(--ink)}.pbtn.s:hover{background:var(--acid);border-color:var(--acid)}

/* TESTI */
.tc{padding:40px;border:1px solid var(--b);background:var(--ink2);position:relative;transition:transform .3s,border-color .3s;cursor:default}
.tc:hover{transform:translateY(-5px);border-color:var(--b2)}
.tc::before{content:'"';font-family:'Playfair Display',serif;font-size:90px;line-height:1;color:rgba(200,242,58,.08);position:absolute;top:12px;left:28px;pointer-events:none}

/* INTEGRATION ITEM */
.ii{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px 20px;border-right:1px solid var(--b);border-bottom:1px solid var(--b);transition:background .25s;cursor:default}
.ii:hover{background:rgba(200,242,58,.03)}
.ii:hover .in{color:var(--acid)}
.in{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--cream3);text-align:center;transition:color .2s}

/* STAT */
.sn{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(52px,7vw,88px);line-height:1;letter-spacing:-.04em}
.sn em{color:var(--acid);font-style:normal}
`;

/* useReveal hook */
function useReveal(t = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold: t });
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return [ref, on];
}
function R({ c = "r", d = "", children, style = {} }) {
  const [ref, on] = useReveal();
  return <div ref={ref} className={`${c} ${d} ${on ? "on" : ""}`} style={style}>{children}</div>;
}

/* Cursor */
function Cursor() {
  const cRef = useRef(null), rRef = useRef(null);
  const p = useRef({ cx: 0, cy: 0, rx: 0, ry: 0 });
  useEffect(() => {
    const mv = e => { p.current.cx = e.clientX; p.current.cy = e.clientY; };
    document.addEventListener("mousemove", mv);
    let raf;
    const loop = () => {
      p.current.rx += (p.current.cx - p.current.rx) * .09;
      p.current.ry += (p.current.cy - p.current.ry) * .09;
      if (cRef.current) cRef.current.style.transform = `translate(${p.current.cx}px,${p.current.cy}px) translate(-50%,-50%)`;
      if (rRef.current) rRef.current.style.transform = `translate(${p.current.rx}px,${p.current.ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const ov = e => {
      const isHot = e.target.closest("button,.cta-btn,.pbtn,a");
      cRef.current?.classList.toggle("big", !!isHot);
      rRef.current?.classList.toggle("big", !!isHot);
    };
    document.addEventListener("mouseover", ov);
    return () => { document.removeEventListener("mousemove", mv); document.removeEventListener("mouseover", ov); cancelAnimationFrame(raf); };
  }, []);
  return <><div id="c" ref={cRef}/><div id="cr" ref={rRef}/></>;
}

/* Image Placeholder */
function Ph({ label = "PHOTO", num = "00", style = {}, children }) {
  return (
    <div className="ph" style={style}>
      <div className="ph-inner">
        <div className="ph-cross"/>
        <div className="ph-txt">{label}</div>
        {num && <div className="ph-sub">Slot {num}</div>}
      </div>
      <div className="ph-num">{num}</div>
      <div className="ph-label">{label}</div>
      {children}
    </div>
  );
}

/* Scanline */
function Scanline() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 }}>
      <div style={{
        position: "absolute", left: 0, right: 0, height: "2px",
        background: "linear-gradient(transparent, rgba(200,242,58,.04), transparent)",
        animation: "scanline 9s linear infinite"
      }}/>
    </div>
  );
}

/* Navbar */
function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const fn = () => setS(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav className={`nav${s ? " s" : ""}`}>
      <a href="#" className="logo">Fy<em>novo</em></a>
      <div className="nav-links">
        {["Platform", "Pricing", "Integrations", "Journal"].map(l => <a key={l} href="#">{l}</a>)}
      </div>
      <button className="cta-btn">Open Account →</button>
    </nav>
  );
}

/* Hero */
function Hero() {
  return (
    <section style={{ minHeight: "100vh", paddingTop: 64, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", background: "var(--ink)" }}>
      <Scanline/>
      {/* Editorial BG number */}
      <div style={{ position: "absolute", right: -30, top: "8%", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(160px,19vw,260px)", lineHeight: 1, color: "rgba(240,235,224,.02)", pointerEvents: "none", userSelect: "none", letterSpacing: "-.05em", zIndex: 0 }}>2025</div>

      {/* Top ticker */}
      <div style={{ borderBottom: "1px solid var(--b)", padding: "11px 0", overflow: "hidden", flexShrink: 0, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", width: "max-content", animation: "marquee 24s linear infinite" }}>
          {[...Array(3)].flatMap((_, pass) =>
            ["GST AUTO-CALC", "SHOPIFY SYNC", "LIVE NSE FEED", "TDS TRACKING", "5-YR FORECAST", "AI ADVISOR", "RAZORPAY LINKED", "AUDIT TRAIL", "GROQ LLAMA 3.3", "MULTI-TENANT"].map((t, i) => (
              <span key={`${pass}-${i}`} style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: ".22em", color: i % 3 === 0 ? "var(--acid)" : "rgba(240,235,224,.25)", padding: "0 32px", borderRight: "1px solid var(--b)" }}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* Main layout: editorial asymmetric */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 500px", flex: 1, position: "relative", zIndex: 2 }}>
        {/* LEFT — big headline */}
        <div style={{ padding: "72px 56px 72px 52px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <R>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
                <div style={{ width: 28, height: 1, background: "var(--acid)" }}/>
                <span className="mono" style={{ fontSize: 10, color: "var(--acid)" }}>Financial Intelligence</span>
              </div>
            </R>
            <R c="r" d="d1">
              <h1 className="disp" style={{ fontSize: "clamp(54px,7.5vw,100px)", color: "var(--cream)", animation: "glitch 10s ease-in-out infinite" }}>
                Automates<br/>Your <em className="disp-i" style={{ color: "var(--acid)" }}>Taxes,</em><br/>Assets &amp;<br/>Cashflow.
              </h1>
            </R>
            <R c="r" d="d2" style={{ marginTop: 36 }}>
              <p style={{ fontSize: 15, color: "var(--cream3)", lineHeight: 1.78, maxWidth: 440 }}>
                Fynovo is the operating layer for your finances. It connects every rupee across platforms, computes your tax position in real time, and sends you AI-driven moves — before your CA does.
              </p>
            </R>
          </div>

          <div>
            <R c="r" d="d3">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
                {[["₹4.2L","Revenue today","↑18.4%"],["₹3.1L","Net profit","↑24.1%"],["84/100","Tax score","Optimised"]].map(([v,l,d]) => (
                  <div className="chip" key={l}>
                    <div className="chip-v">{v}</div>
                    <div className="chip-l">{l}</div>
                    <div className="chip-d">{d}</div>
                  </div>
                ))}
              </div>
            </R>
            <R c="r" d="d4">
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <button className="cta-btn" style={{ padding: "14px 40px", fontSize: 11 }}>Start Free — ₹0</button>
                <button style={{ background: "none", border: "none", cursor: "none", color: "var(--cream3)", fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 10, transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--cream)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--cream3)"}>
                  <span style={{ width: 36, height: 36, border: "1px solid var(--b2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>▷</span>
                  Watch 90s demo
                </button>
              </div>
            </R>
          </div>
        </div>

        <div style={{ background: "var(--b)" }}/>

        {/* RIGHT — photo collage */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <R c="rs" d="d2" style={{ flex: "0 0 58%", position: "relative" }}>
            <Ph label="Dashboard · Hero" num="01" style={{ height: "100%", width: "100%" }}>
              {/* Data overlay */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px", background: "linear-gradient(transparent, rgba(13,13,15,.92))", zIndex: 5, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div className="mono" style={{ fontSize: 8, color: "var(--acid)", marginBottom: 4 }}>Revenue · Q2 2025</div>
                  <div className="disp" style={{ fontSize: 32, color: "var(--cream)" }}>₹42.8L</div>
                </div>
                <svg width="80" height="32" viewBox="0 0 80 32">
                  <polyline points="0,28 14,20 28,23 42,10 56,14 70,4 80,6" fill="none" stroke="var(--acid)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ strokeDasharray: 180, strokeDashoffset: 180, animation: "drawLine 2s ease .6s forwards" }}/>
                </svg>
              </div>
            </Ph>
          </R>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1px 1fr", borderTop: "1px solid var(--b)" }}>
            <R c="rs" d="d3" style={{ height: "100%" }}>
              <Ph label="Tax Engine" num="02" style={{ height: "100%", minHeight: 160 }}>
                <div style={{ position: "absolute", bottom: 14, left: 14, zIndex: 5, fontFamily: "'DM Mono',monospace", fontSize: 8, color: "var(--acid)", lineHeight: 1.7 }}>
                  GST: ₹1.96L<br/>TDS: ₹84K<br/>Score: 84/100
                </div>
              </Ph>
            </R>
            <div style={{ background: "var(--b)" }}/>
            <R c="rs" d="d4" style={{ height: "100%" }}>
              <Ph label="AI Advisor" num="03" style={{ height: "100%", minHeight: 160 }}>
                <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, zIndex: 5, fontFamily: "'DM Mono',monospace", fontSize: 8, color: "var(--acid)", lineHeight: 1.7 }}>
                  &gt; Reallocate ₹18K<br/>&gt; Yield: +₹42K<span style={{ animation: "blink 1s step-end infinite" }}>_</span>
                </div>
              </Ph>
            </R>
          </div>
        </div>
      </div>

      {/* Bottom city strip */}
      <div style={{ borderTop: "1px solid var(--b)", padding: "12px 52px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, position: "relative", zIndex: 2 }}>
        {["Mumbai","Bangalore","Delhi","Chennai","Hyderabad","Pune"].map(c => (
          <span key={c} className="mono" style={{ fontSize: 8, color: "rgba(240,235,224,.25)" }}>{c}</span>
        ))}
        <span className="mono" style={{ fontSize: 8, color: "var(--acid)" }}>● LIVE</span>
      </div>
    </section>
  );
}

/* Stats */
function Stats() {
  const [ref, on] = useReveal(0.3);
  const [vals, setVals] = useState([0, 0, 0, 0]);
  const tgts = [70, 5000, 98, 42];
  useEffect(() => {
    if (!on) return;
    tgts.forEach((t, i) => {
      let c = 0; const step = t / 55;
      const id = setInterval(() => { c = Math.min(c + step, t); setVals(p => { const n = [...p]; n[i] = Math.round(c); return n; }); if (c >= t) clearInterval(id); }, 20);
    });
  }, [on]);
  const data = [
    { pre: "", suf: "%", lbl: "Reduction in\nmanual finance work" },
    { pre: "", suf: "+", lbl: "Businesses trust\nFynovo daily" },
    { pre: "", suf: "%", lbl: "Customer\nsatisfaction rate" },
    { pre: "₹", suf: "Cr", lbl: "Revenue processed\nthis year" },
  ];
  return (
    <div ref={ref} style={{ borderTop: "1px solid var(--b)", borderBottom: "1px solid var(--b)", position: "relative", overflow: "hidden" }}>
      <Scanline/>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {data.map(({ pre, suf, lbl }, i) => (
          <div key={i} style={{ padding: "64px 52px", borderRight: i < 3 ? "1px solid var(--b)" : "none" }}>
            <div className="sn">{pre}<em>{vals[i].toLocaleString()}</em>{suf}</div>
            <div style={{ marginTop: 16, fontFamily: "'DM Mono',monospace", fontSize: 9, color: "var(--cream3)", letterSpacing: ".08em", lineHeight: 1.7, whiteSpace: "pre-line" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Features */
const FEATS = [
  { n:"01", t:"Smart Financial Dashboard", b:"Real-time P&L, balance sheet, and cashflow unified. Multi-source income from Shopify, banks, and manual entries — always current." },
  { n:"02", t:"AI Financial Advisor", b:"Powered by Gemini & Groq LLaMA 3.3. Personalised savings tips, investment suggestions, and spending alerts — like a CFO in your pocket." },
  { n:"03", t:"Automated Tax Engine", b:"GST, TDS, and Income Tax calculated in real-time. Tax Optimization Score surfaces legal savings you'd miss otherwise." },
  { n:"04", t:"Intelligent Asset Management", b:"Gold, silver, equities, crypto tracked live with 5-year AI projections. Know what your assets will be worth in 2030." },
  { n:"05", t:"SmartBorrow Strategy", b:"AI modelling of borrowing costs, loan structures, and repayment strategies. Minimise interest, maximise working capital." },
  { n:"06", t:"Real-Time Notifications", b:"Socket.io-powered alerts for bills, transactions, market swings. The platform watches the numbers so you don't have to." },
];

function Features() {
  return (
    <section style={{ padding: "120px 52px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 88, alignItems: "start" }}>
        <div>
          <R c="r">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: "var(--acid)" }}/>
              <span className="mono" style={{ fontSize: 10, color: "var(--acid)" }}>Platform</span>
            </div>
          </R>
          <R c="r" d="d1">
            <h2 className="disp" style={{ fontSize: "clamp(40px,5vw,68px)", marginBottom: 24 }}>
              Built for the<br/>way money<br/><em className="disp-i" style={{ color: "var(--acid)" }}>actually</em><br/>moves.
            </h2>
          </R>
          <R c="r" d="d2">
            <p style={{ fontSize: 14, color: "var(--cream3)", lineHeight: 1.8, maxWidth: 360, marginBottom: 44 }}>
              Every feature is designed around the real financial pressures on Indian SMEs, freelancers, and digital entrepreneurs.
            </p>
          </R>
          <R c="rs" d="d3">
            <Ph label="Platform Overview" num="04" style={{ height: 320, width: "100%" }}/>
          </R>
          <R c="rs" d="d4" style={{ marginTop: 2 }}>
            <Ph label="Mobile App View" num="05" style={{ height: 180, width: "100%" }}/>
          </R>
        </div>
        <div>
          {FEATS.map(({ n, t, b }, i) => (
            <R key={n} c="r" d={`d${Math.min(i + 1, 6)}`}>
              <div className="feat-row">
                <div className="fn">{n}</div>
                <div><div className="ft">{t}</div><div className="fb">{b}</div></div>
                <div className="fa">→</div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Showcase */
function Showcase() {
  return (
    <section style={{ padding: "120px 0 0" }}>
      <div style={{ padding: "0 52px", maxWidth: 1280, margin: "0 auto 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <R c="r">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 28, height: 1, background: "var(--acid)" }}/>
              <span className="mono" style={{ fontSize: 10, color: "var(--acid)" }}>Product Screens</span>
            </div>
            <h2 className="disp" style={{ fontSize: "clamp(36px,4.5vw,60px)" }}>
              See it in<br/><em className="disp-i" style={{ color: "var(--cream3)" }}>motion.</em>
            </h2>
          </R>
          <R c="r" d="d2"><div className="tag">27 Screens</div></R>
        </div>
      </div>
      {/* Full-bleed grids */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "360px 220px", gap: 2, marginBottom: 2 }}>
        <R c="rs" d="d1" style={{ gridRow: "span 2", height: "100%" }}><Ph label="Full Dashboard · Wide" num="06" style={{ height: "100%", width: "100%" }}/></R>
        <R c="rs" d="d2"><Ph label="Analytics View" num="07" style={{ height: "100%" }}/></R>
        <R c="rs" d="d3"><Ph label="Tax Filing Screen" num="08" style={{ height: "100%" }}/></R>
        <R c="rs" d="d4"><Ph label="Asset Portfolio" num="09" style={{ height: "100%" }}/></R>
        <R c="rs" d="d5"><Ph label="AI Chat" num="10" style={{ height: "100%" }}/></R>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginBottom: 2 }}>
        {[["Invoice View","11"],["Notifications","12"],["Mobile App","13"],["Settings","14"]].map(([l, n]) => (
          <R key={n} c="rs"><Ph label={l} num={n} style={{ height: 180 }}/></R>
        ))}
      </div>
      <R c="rs"><Ph label="Onboarding Flow · Panorama" num="15" style={{ height: 140, width: "100%" }}/></R>
    </section>
  );
}

/* Deep Feature Split */
function DeepFeat({ tag, h1, hItalic, body, checks, imgLabel, imgNum, reverse }) {
  const text = (
    <R c={reverse ? "rr" : "rl"}>
      <div className="tag" style={{ marginBottom: 28 }}>{tag}</div>
      <h2 className="disp" style={{ fontSize: "clamp(32px,3.5vw,50px)", marginBottom: 24, lineHeight: 1.05 }}>
        {h1}<br/><em className="disp-i" style={{ color: "var(--acid)" }}>{hItalic}</em>
      </h2>
      <p style={{ fontSize: 14, color: "var(--cream3)", lineHeight: 1.8, marginBottom: 36 }}>{body}</p>
      <div>
        {checks.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--b)", alignItems: "flex-start" }}>
            <div style={{ width: 18, height: 18, border: "1px solid var(--acid)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <div style={{ width: 6, height: 6, background: "var(--acid)" }}/>
            </div>
            <span style={{ fontSize: 13, color: "var(--cream2)", lineHeight: 1.65 }}>{c}</span>
          </div>
        ))}
      </div>
    </R>
  );
  const img = (
    <R c={reverse ? "rl" : "rr"}>
      <Ph label={imgLabel} num={imgNum} style={{ height: 460, width: "100%", marginBottom: 2 }}>
        <div style={{ position: "absolute", top: 20, left: 20, zIndex: 5 }}>
          <div className="tag">{tag}</div>
        </div>
      </Ph>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <Ph label={`${imgLabel} · Detail`} num={`${imgNum}A`} style={{ height: 140 }}/>
        <Ph label={`${imgLabel} · Mobile`} num={`${imgNum}B`} style={{ height: 140 }}/>
      </div>
    </R>
  );
  return (
    <div style={{ padding: "120px 52px", borderTop: "1px solid var(--b)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        {reverse ? <>{img}{text}</> : <>{text}{img}</>}
      </div>
    </div>
  );
}

/* Pricing */
function Pricing() {
  return (
    <section id="pricing" style={{ padding: "120px 52px", borderTop: "1px solid var(--b)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
          <div>
            <R c="r">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1, background: "var(--acid)" }}/>
                <span className="mono" style={{ fontSize: 10, color: "var(--acid)" }}>Pricing</span>
              </div>
            </R>
            <R c="r" d="d1">
              <h2 className="disp" style={{ fontSize: "clamp(36px,4.5vw,64px)" }}>
                One price.<br/><em className="disp-i" style={{ color: "var(--acid)" }}>No surprises.</em>
              </h2>
            </R>
          </div>
          <R c="r" d="d2">
            <p style={{ fontSize: 13, color: "var(--cream3)", maxWidth: 280, lineHeight: 1.75 }}>
              Start free, scale when ready. Every plan includes the full security stack.
            </p>
          </R>
        </div>

        {/* Pricing visual */}
        <R c="rs" d="d2" style={{ marginBottom: 2 }}>
          <Ph label="Pricing · Feature Comparison" num="18" style={{ height: 100, width: "100%" }}/>
        </R>

        <R c="rs" d="d3">
          <div className="pt">
            <div className="pc">
              <div className="pn">Starter Plan</div>
              <div className="pamt"><em>₹</em>499</div>
              <div className="pper">Per month / billed annually</div>
              {["Single income source","Basic expense tracking","1 GB data storage","Email support"].map(f=><div className="pf" key={f}>{f}</div>)}
              <button className="pbtn o">Get Started</button>
            </div>
            <div className="pd"/>
            <div className="pc hot">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="pn">Professional</div>
                <div className="tag" style={{ fontSize: 8 }}>Popular</div>
              </div>
              <div className="pamt"><em>₹</em>1,499</div>
              <div className="pper">Per month / billed annually</div>
              {["Unlimited income sources","AI Financial Advisor","Full Tax Engine (GST/TDS)","5-year asset projections","SmartBorrow strategy"].map(f=><div className="pf" key={f}>{f}</div>)}
              <button className="pbtn a">Start Free Trial</button>
            </div>
            <div className="pd"/>
            <div className="pc">
              <div className="pn">Enterprise</div>
              <div className="pamt" style={{ fontSize: 40 }}>Custom</div>
              <div className="pper">Contact for quote</div>
              {["Multi-tenant architecture","Custom API integrations","Dedicated account manager","Advanced audit trails","SLA guarantee"].map(f=><div className="pf" key={f}>{f}</div>)}
              <button className="pbtn s">Contact Sales</button>
            </div>
          </div>
        </R>
      </div>
    </section>
  );
}

/* Testimonials */
const TESTIS = [
  { q:"Fynovo made our quarterly close 4× faster. The AI advisor flagged a ₹2L GST saving we'd have completely missed.", name:"Rahul Krishnan", role:"Founder · D2C Brand, Chennai", init:"RK" },
  { q:"I connected Shopify on Monday. By Tuesday every order was categorised, GST computed, and I had a P&L.", name:"Priya Sharma", role:"E-commerce Seller · Bangalore", init:"PS" },
  { q:"The 5-year asset projection is frighteningly accurate. Within 4% of actual.", name:"Arjun Mehta", role:"Angel Investor · Mumbai", init:"AM" },
  { q:"We cut our CA fees by 60% because Fynovo handles everything our CA used to do manually.", name:"Sneha Iyer", role:"CFO · EdTech Startup, Pune", init:"SI" },
  { q:"SmartBorrow restructured our working capital and saved ₹8L in interest. ROI in month one.", name:"Vikram Nair", role:"SME Owner · Delhi", init:"VN" },
  { q:"As a freelancer managing 5 clients, the multi-source income view is the only way I stay sane.", name:"Deepa Rao", role:"Consultant · Hyderabad", init:"DR" },
];

function Testimonials() {
  return (
    <section style={{ padding: "120px 52px", borderTop: "1px solid var(--b)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 88, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 96 }}>
            <R c="r">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1, background: "var(--acid)" }}/>
                <span className="mono" style={{ fontSize: 10, color: "var(--acid)" }}>Customers</span>
              </div>
            </R>
            <R c="r" d="d1">
              <h2 className="disp" style={{ fontSize: "clamp(32px,3vw,52px)", marginBottom: 20 }}>
                What they<br/><em className="disp-i" style={{ color: "var(--acid)" }}>said.</em>
              </h2>
            </R>
            <R c="r" d="d2">
              <p style={{ fontSize: 13, color: "var(--cream3)", lineHeight: 1.75 }}>From solo freelancers to Series A teams.</p>
            </R>
            <R c="rs" d="d3" style={{ marginTop: 36 }}><Ph label="Customer Photo" num="19" style={{ height: 200, width: "100%" }}/></R>
            <R c="rs" d="d4" style={{ marginTop: 2 }}><Ph label="Team Office" num="20" style={{ height: 140, width: "100%" }}/></R>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {TESTIS.map(({ q, name, role, init }, i) => (
              <R key={name} c="r" d={`d${(i % 3) + 1}`}>
                <div className="tc" style={{ height: "100%" }}>
                  <p style={{ fontSize: 14, color: "var(--cream2)", lineHeight: 1.78, marginBottom: 28, fontStyle: "italic", fontFamily: "'Playfair Display',serif", position: "relative", zIndex: 1 }}>"{q}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--b)", paddingTop: 20 }}>
                    <div style={{ width: 34, height: 34, border: "1px solid var(--b2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Mono',monospace", fontSize: 10, color: "var(--acid)" }}>{init}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "var(--cream)" }}>{name}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "var(--cream3)", letterSpacing: ".05em" }}>{role}</div>
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

/* Integrations */
const INTS = [
  ["Shopify","21"],["WooCommerce","22"],["Razorpay","23"],["Stripe","24"],
  ["Google Gemini","25"],["Groq LLaMA","26"],["BSE / NSE","27"],["Google OAuth","28"],
];

function Integrations() {
  return (
    <section id="integrations" style={{ padding: "120px 52px", borderTop: "1px solid var(--b)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 88, alignItems: "start", marginBottom: 60 }}>
          <div>
            <R c="r">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1, background: "var(--acid)" }}/>
                <span className="mono" style={{ fontSize: 10, color: "var(--acid)" }}>Integrations</span>
              </div>
            </R>
            <R c="r" d="d1">
              <h2 className="disp" style={{ fontSize: "clamp(32px,3.5vw,52px)", marginBottom: 20 }}>
                Plugs into<br/><em className="disp-i" style={{ color: "var(--acid)" }}>everything</em><br/>you use.
              </h2>
            </R>
          </div>
          <R c="r" d="d2" style={{ paddingTop: 20 }}>
            <p style={{ fontSize: 14, color: "var(--cream3)", lineHeight: 1.8, marginBottom: 28 }}>
              Connect e-commerce stores, payment gateways, and banking in minutes. Data flows in automatically — you never export a CSV again.
            </p>
            <Ph label="Integration Map" num="29" style={{ height: 180, width: "100%" }}/>
          </R>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", border: "1px solid var(--b)" }}>
          {INTS.map(([name, n], i) => (
            <R key={name} c="r" d={`d${(i % 4) + 1}`}>
              <div className="ii" style={{ borderRight: (i % 4) < 3 ? "1px solid var(--b)" : "none", borderBottom: i < 4 ? "1px solid var(--b)" : "none" }}>
                <Ph label={name} num={n} style={{ width: 64, height: 64 }}/>
                <div className="in">{name}</div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CTA */
function CTA() {
  return (
    <section style={{ padding: "140px 52px", borderTop: "1px solid var(--b)", position: "relative", overflow: "hidden", background: "linear-gradient(170deg, var(--ink2) 0%, var(--ink) 60%)" }}>
      <Scanline/>
      <div style={{ position: "absolute", bottom: -60, left: -40, fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(120px,18vw,240px)", lineHeight: 1, color: "rgba(200,242,58,.025)", pointerEvents: "none", userSelect: "none", letterSpacing: "-.05em" }}>FYNOVO</div>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 88, alignItems: "center" }}>
          <div>
            <R c="r">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
                <div style={{ width: 28, height: 1, background: "var(--acid)" }}/>
                <span className="mono" style={{ fontSize: 10, color: "var(--acid)" }}>Get Started</span>
              </div>
            </R>
            <R c="r" d="d1">
              <h2 className="disp" style={{ fontSize: "clamp(44px,6.5vw,84px)", marginBottom: 32 }}>
                Your finances,<br/><em className="disp-i" style={{ color: "var(--acid)" }}>finally</em><br/>under control.
              </h2>
            </R>
            <R c="r" d="d2">
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <button className="cta-btn" style={{ padding: "15px 44px", fontSize: 11 }}>Open Free Account</button>
                <span className="mono" style={{ fontSize: 9, color: "var(--cream3)" }}>No card required</span>
              </div>
            </R>
          </div>
          <R c="rs" d="d3">
            <Ph label="CTA Visual" num="30" style={{ height: 300, width: "100%" }}>
              <div style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 28 }}>
                <div className="tag" style={{ marginBottom: 14, alignSelf: "flex-start" }}>Live platform</div>
                <div className="mono" style={{ fontSize: 8, color: "var(--cream3)", lineHeight: 1.9 }}>
                  ₹0 setup · Cancel anytime<br/>GST + TDS + Income Tax<br/>Shopify · Banks · WooCommerce
                </div>
              </div>
            </Ph>
          </R>
        </div>
      </div>
    </section>
  );
}

/* Footer */
function Footer() {
  const cols = [
    { h: "Company", links: ["About","Journal","Careers","Press"] },
    { h: "Product", links: ["Features","Pricing","Integrations","Changelog"] },
    { h: "Resources", links: ["Documentation","API Docs","Help Centre","Status"] },
    { h: "Legal", links: ["Privacy Policy","Terms","Cookies","Compliance"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--b)", padding: "52px 52px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, marginBottom: 52, borderBottom: "1px solid var(--b)", paddingBottom: 52 }}>
          {cols.map(({ h, links }, i) => (
            <div key={h} style={{ padding: "0 40px", borderRight: i < 3 ? "1px solid var(--b)" : "none" }}>
              <div className="mono" style={{ fontSize: 9, color: "var(--cream3)", marginBottom: 20 }}>{h}</div>
              {links.map(l => (
                <a key={l} href="#" style={{ display: "block", fontSize: 13, color: "var(--cream3)", textDecoration: "none", marginBottom: 12, transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--cream)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--cream3)"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#" className="logo" style={{ fontSize: 20 }}>Fy<em>novo</em></a>
          <span className="mono" style={{ fontSize: 8, color: "rgba(240,235,224,.25)" }}>© 2025 FYNOVO TECHNOLOGIES PVT. LTD. — ALL RIGHTS RESERVED</span>
          <div className="tag" style={{ fontSize: 8 }}>Made in India</div>
        </div>
      </div>
    </footer>
  );
}

/* Root */
export default function App() {
  useEffect(() => {
    if (!document.getElementById("fy-g")) {
      const s = document.createElement("style");
      s.id = "fy-g"; s.textContent = G;
      document.head.appendChild(s);
    }
  }, []);
  return (
    <>
      <Cursor/>
      <Nav/>
      <Hero/>
      <Stats/>
      <Features/>
      <Showcase/>
      <DeepFeat tag="Tax Automation" h1="Never miss a" hItalic="tax liability." body="The real-time tax engine tracks GST, TDS, and Income Tax across every transaction. Your Tax Optimization Score surfaces legal savings — every month, automatically." checks={["Auto GST across all business transactions","Income tax slab tracking with cess","TDS management for freelancers & SMEs","Personalised Tax Optimization Score"]} imgLabel="Tax Engine Screen" imgNum="16" />
      <DeepFeat reverse tag="Asset Intelligence" h1="5-year projections," hItalic="live markets." body="Gold, silver, equities, crypto — every asset tracked with AI forecasts built on real Indian market data. Know what your portfolio is worth today, and in 2030." checks={["Physical: Gold & Silver via live CME","Equities via BSE/NSE real-time feeds","Crypto portfolio with rebalancing alerts","Confidence-interval 5-year projections"]} imgLabel="Portfolio Screen" imgNum="17" />
      <Pricing/>
      <Testimonials/>
      <Integrations/>
      <CTA/>
      <Footer/>
    </>
  );
}