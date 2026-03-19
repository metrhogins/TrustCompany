import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import { Moon, Sun, ChevronDown, Menu, X, Blocks, Brain, Lightbulb, ArrowUpRight, ShieldCheck } from "lucide-react";
import logo from "/favicon.png";

const products = [
  { to:"/products/blockchain", icon:Blocks,      label:"Blockchain Solutions",   desc:"Smart contracts, DeFi & protocol infrastructure" },
  { to:"/products/ai",         icon:Brain,        label:"AI Platform",            desc:"Autonomous agents, NLP & ML at scale" },
  { to:"/products/consulting", icon:Lightbulb,    label:"Consulting",             desc:"Strategy, advisory & digital transformation" },
  { to:"/attestation",         icon:ShieldCheck,  label:"Attestation Console",    desc:"Live ZK-proof verified inference dashboard" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [drop, setDrop] = useState(false);
  const [mob, setMob]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);
  const loc = useLocation();

  useEffect(() => { setMob(false); setDrop(false); }, [loc]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setDrop(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const linkStyle = (active) => ({
    fontFamily: "var(--font-body)",
    fontSize: "0.82rem",
    fontWeight: 500,
    color: active ? "var(--tx)" : "var(--tx2)",
    background: active ? "var(--bg3)" : "transparent",
    padding: "0.4rem 0.75rem",
    borderRadius: 9,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "color .15s, background .15s",
    display: "inline-block",
  });

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "var(--bg2)",
        borderBottom: "1px solid var(--border)",
        boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow .3s",
      }}>
        <div style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 1.25rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          minWidth: 0,
        }}>

          {/* Logo */}
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:"0.45rem", textDecoration:"none", flexShrink:0 }}>
            <img src={logo} alt="TrustLedgerLabs" style={{ height:36, width:36, objectFit:"contain" }} />
            <span style={{ fontFamily:"var(--font-display)", fontSize:"1.35rem", fontWeight:700, color:"var(--tx)", letterSpacing:"-0.02em", whiteSpace:"nowrap", lineHeight:1 }}>
              TrustLedger<span style={{ color:"var(--gold)" }}>Labs</span>
            </span>
          </Link>

          {/* Desktop nav — center */}
          <nav style={{ display:"flex", alignItems:"center", gap:2, flexShrink:1, minWidth:0 }} className="nb-desk">
            {[{to:"/about",l:"About"},{to:"/blog",l:"Insights"},{to:"/audit-log",l:"Audit Log"},{to:"/jobs",l:"Open Roles"}].map(({to,l}) => (
              <NavLink key={to} to={to}
                style={({isActive}) => linkStyle(isActive)}
                onMouseEnter={e => { e.currentTarget.style.color="var(--tx)"; e.currentTarget.style.background="var(--bg3)"; }}
                onMouseLeave={e => { if(!e.currentTarget.classList.contains("active")){ e.currentTarget.style.color="var(--tx2)"; e.currentTarget.style.background="transparent"; } }}
              >{l}</NavLink>
            ))}

            {/* Products dropdown */}
            <div ref={ref} style={{ position:"relative" }}>
              <button onClick={() => setDrop(o => !o)} style={{
                ...linkStyle(drop), display:"flex", alignItems:"center", gap:3,
                border:"none", cursor:"pointer",
              }}>
                Products
                <ChevronDown size={12} style={{ transition:"transform .2s", transform: drop?"rotate(180deg)":"none" }} />
              </button>
              {drop && (
                <div style={{
                  position:"absolute", top:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)",
                  width:360, background:"var(--bg2)", border:"1px solid var(--border)",
                  borderRadius:18, boxShadow:"0 24px 64px rgba(0,0,0,.13)", padding:"0.5rem", zIndex:200,
                }}>
                  {products.map(p => (
                    <Link key={p.to} to={p.to} onClick={() => setDrop(false)} style={{ display:"flex", alignItems:"center", gap:"0.8rem", padding:"0.75rem 0.9rem", borderRadius:12, textDecoration:"none", transition:"background .15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div style={{ width:34, height:34, borderRadius:10, background:"var(--gold-bg)", color:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <p.icon size={15} />
                      </div>
                      <div>
                        <div style={{ fontFamily:"var(--font-body)", fontSize:"0.84rem", fontWeight:600, color:"var(--tx)", marginBottom:2 }}>{p.label}</div>
                        <div style={{ fontFamily:"var(--font-body)", fontSize:"0.72rem", color:"var(--tx2)", fontWeight:300 }}>{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side actions */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexShrink:0 }}>

            {/* Docs + Demo grouped — desktop only */}
            <div className="nb-desk" style={{ display:"flex", alignItems:"center", background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:10, overflow:"hidden" }}>
              <a href="https://document.trustledgerlabs.com" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"0.42rem 0.85rem", color:"var(--tx2)", fontFamily:"var(--font-body)", fontSize:"0.78rem", fontWeight:500, textDecoration:"none", borderRight:"1px solid var(--border)", transition:"color .15s, background .15s", whiteSpace:"nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.color="var(--tx)"; e.currentTarget.style.background="var(--bg2)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="var(--tx2)"; e.currentTarget.style.background="transparent"; }}>
                Docs <ArrowUpRight size={9}/>
              </a>
              <a href="https://demo.trustledgerlabs.com" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:3, padding:"0.42rem 0.85rem", color:"var(--gold)", fontFamily:"var(--font-body)", fontSize:"0.78rem", fontWeight:600, textDecoration:"none", transition:"color .15s, background .15s", whiteSpace:"nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.background="var(--gold-bg)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; }}>
                Demo <ArrowUpRight size={9}/>
              </a>
            </div>

            {/* Theme toggle */}
            <button onClick={toggle} style={{ width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg3)", border:"1px solid var(--border)", color:"var(--tx2)", cursor:"pointer", flexShrink:0 }}>
              {theme === "dark" ? <Sun size={13}/> : <Moon size={13}/>}
            </button>

            {/* Primary CTA — desktop only */}
            <Link to="/schedule" className="nb-desk" style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"0.44rem 1.1rem", background:"var(--gold)", color:"#fff", borderRadius:9, fontFamily:"var(--font-body)", fontSize:"0.8rem", fontWeight:600, textDecoration:"none", transition:"opacity .18s, transform .18s", whiteSpace:"nowrap", flexShrink:0 }}
              onMouseEnter={e => { e.currentTarget.style.opacity=".88"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
              Schedule a Call
            </Link>

            {/* Hamburger — mobile only */}
            <button onClick={() => setMob(o => !o)} className="nb-mob" style={{ width:32, height:32, borderRadius:8, display:"none", alignItems:"center", justifyContent:"center", background:"var(--bg3)", border:"1px solid var(--border)", color:"var(--tx2)", cursor:"pointer" }}>
              {mob ? <X size={16}/> : <Menu size={16}/>}
            </button>
          </div>
        </div>

        <style>{`
          @media(max-width:1024px){
            .nb-desk { display:none!important; }
            .nb-mob  { display:flex!important; }
          }
          @media(min-width:1025px){
            .nb-mob { display:none!important; }
          }
        `}</style>
      </header>

      {/* Mobile drawer */}
      <div style={{
        position:"fixed", inset:0, zIndex:99,
        background:"var(--bg2)",
        transform: mob ? "translateX(0)" : "translateX(100%)",
        transition:"transform .3s cubic-bezier(.22,1,.36,1)",
        padding:"0 1.5rem 2rem",
        display:"flex", flexDirection:"column",
        fontFamily:"var(--font-body)",
        overflowY:"auto",
      }}>
        <div style={{ height:64, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--border)", marginBottom:"1.25rem", flexShrink:0 }}>
          <Link to="/" onClick={() => setMob(false)} style={{ textDecoration:"none" }}>
            <span style={{ fontFamily:"var(--font-display)", fontSize:"1.4rem", fontWeight:700, color:"var(--tx)" }}>TrustLedger<span style={{ color:"var(--gold)" }}>Labs</span></span>
          </Link>
          <button onClick={() => setMob(false)} style={{ width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg3)", border:"1px solid var(--border)", color:"var(--tx2)", cursor:"pointer" }}><X size={16}/></button>
        </div>

        {[{to:"/about",l:"About"},{to:"/blog",l:"Insights"},{to:"/audit-log",l:"Audit Log"},{to:"/jobs",l:"Open Roles"}].map(({to,l}) => (
          <Link key={to} to={to} onClick={() => setMob(false)} style={{ padding:"0.9rem 0", fontSize:"1rem", fontWeight:500, color:"var(--tx)", textDecoration:"none", borderBottom:"1px solid var(--border)" }}>{l}</Link>
        ))}

        <div style={{ padding:"0.9rem 0", borderBottom:"1px solid var(--border)" }}>
          <div style={{ fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--tx3)", marginBottom:"0.65rem" }}>Products</div>
          {products.map(p => (
            <Link key={p.to} to={p.to} onClick={() => setMob(false)} style={{ display:"flex", alignItems:"center", gap:8, padding:"0.4rem 0", fontSize:"0.9rem", color:"var(--tx2)", textDecoration:"none" }}>
              <p.icon size={13} style={{ color:"var(--gold)" }}/> {p.label}
            </Link>
          ))}
        </div>

        <a href="https://document.trustledgerlabs.com" target="_blank" rel="noopener noreferrer" onClick={() => setMob(false)} style={{ marginTop:"1.25rem", display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"0.9rem", background:"var(--bg3)", border:"1px solid var(--gold-bd)", color:"var(--gold)", borderRadius:12, fontWeight:600, fontSize:"0.9rem", textDecoration:"none" }}>
          Documentation <ArrowUpRight size={13}/>
        </a>
        <Link to="/schedule" onClick={() => setMob(false)} style={{ marginTop:"0.65rem", display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"0.9rem", background:"var(--gold)", color:"#fff", borderRadius:12, fontWeight:600, fontSize:"0.9rem", textDecoration:"none" }}>
          Schedule a Call <ArrowUpRight size={13}/>
        </Link>
        <Link to="/contact" onClick={() => setMob(false)} style={{ marginTop:"0.65rem", display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"0.9rem", background:"var(--tx)", color:"var(--bg)", borderRadius:12, fontWeight:600, fontSize:"0.9rem", textDecoration:"none" }}>
          Contact Us <ArrowUpRight size={13}/>
        </Link>
      </div>
    </>
  );
}