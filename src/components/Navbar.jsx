import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import { Moon, Sun, ChevronDown, Menu, X, Blocks, Brain, Lightbulb, ArrowUpRight } from "lucide-react";
import logo from "/favicon.png";

const products = [
  { to:"/products/blockchain", icon:Blocks,    label:"Blockchain Solutions", desc:"Smart contracts, DeFi & protocol infrastructure" },
  { to:"/products/ai",         icon:Brain,     label:"AI Platform",          desc:"Autonomous agents, NLP & ML at scale" },
  { to:"/products/consulting", icon:Lightbulb, label:"Consulting",           desc:"Strategy, advisory & digital transformation" },
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
    fontSize: "0.875rem",
    fontWeight: 500,
    color: active ? "var(--tx)" : "var(--tx2)",
    background: active ? "var(--bg3)" : "transparent",
    padding: "0.45rem 1rem",
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
        <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 2rem", height:70, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1.5rem" }}>

          {/* Logo */}
          <Link to="/" style={{ display:"flex", alignItems:"center", gap:"0.55rem", textDecoration:"none", flexShrink:0 }}>
            <img src={logo} alt="TrustLedgerLabs" style={{ height:44, width:44, objectFit:"contain" }} />
            <span style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:700, color:"var(--tx)", letterSpacing:"-0.02em", whiteSpace:"nowrap", lineHeight:1 }}>
              TrustLedger<span style={{ color:"var(--gold)" }}>Labs</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display:"flex", alignItems:"center", gap:2 }} className="nb-desk">
            {[{to:"/about",l:"About"},{to:"/blog",l:"Insights"},{to:"/jobs",l:"Careers"}].map(({to,l}) => (
              <NavLink key={to} to={to}
                style={({isActive}) => linkStyle(isActive)}
                onMouseEnter={e => { if(e.currentTarget.style.background==="transparent"){e.currentTarget.style.color="var(--tx)";e.currentTarget.style.background="var(--bg3)";} }}
                onMouseLeave={e => { if(!e.currentTarget.dataset.active){e.currentTarget.style.color="var(--tx2)";e.currentTarget.style.background="transparent";} }}
              >{l}</NavLink>
            ))}

            {/* Products dropdown */}
            <div ref={ref} style={{ position:"relative" }}>
              <button onClick={() => setDrop(o => !o)} style={{
                ...linkStyle(drop), display:"flex", alignItems:"center", gap:4,
                border:"none", cursor:"pointer", fontFamily:"var(--font-body)",
              }}>
                Products
                <ChevronDown size={13} style={{ transition:"transform .2s", transform: drop?"rotate(180deg)":"none" }} />
              </button>
              {drop && (
                <div style={{
                  position:"absolute", top:"calc(100% + 10px)", left:"50%", transform:"translateX(-50%)",
                  width:370, background:"var(--bg2)", border:"1px solid var(--border)",
                  borderRadius:18, boxShadow:"0 24px 64px rgba(0,0,0,.13)", padding:"0.55rem", zIndex:200,
                }}>
                  {products.map(p => (
                    <Link key={p.to} to={p.to} onClick={() => setDrop(false)} style={{ display:"flex", alignItems:"center", gap:"0.85rem", padding:"0.8rem 1rem", borderRadius:12, textDecoration:"none", transition:"background .15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div style={{ width:36, height:36, borderRadius:10, background:"var(--gold-bg)", color:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <p.icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontFamily:"var(--font-body)", fontSize:"0.86rem", fontWeight:600, color:"var(--tx)", marginBottom:2 }}>{p.label}</div>
                        <div style={{ fontFamily:"var(--font-body)", fontSize:"0.74rem", color:"var(--tx2)", fontWeight:300 }}>{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", flexShrink:0 }}>
            <button onClick={toggle} style={{ width:36, height:36, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg3)", border:"1px solid var(--border)", color:"var(--tx2)", cursor:"pointer" }}>
              {theme === "dark" ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
            <Link to="/contact" className="nb-desk" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"0.52rem 1.3rem", background:"var(--tx)", color:"var(--bg)", borderRadius:10, fontFamily:"var(--font-body)", fontSize:"0.84rem", fontWeight:600, textDecoration:"none", transition:"opacity .18s, transform .18s", whiteSpace:"nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.opacity=".82"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
              Contact <ArrowUpRight size={13}/>
            </Link>
            <button onClick={() => setMob(o => !o)} className="nb-mob" style={{ width:36, height:36, borderRadius:9, display:"none", alignItems:"center", justifyContent:"center", background:"var(--bg3)", border:"1px solid var(--border)", color:"var(--tx2)", cursor:"pointer" }}>
              {mob ? <X size={17}/> : <Menu size={17}/>}
            </button>
          </div>
        </div>
        <style>{`
          @media(max-width:768px){ .nb-desk{display:none!important} .nb-mob{display:flex!important} }
        `}</style>
      </header>

      {/* Mobile drawer */}
      <div style={{
        position:"fixed", inset:0, zIndex:99,
        background:"var(--bg2)",
        transform: mob ? "translateX(0)" : "translateX(100%)",
        transition:"transform .3s cubic-bezier(.22,1,.36,1)",
        padding:"0 2rem 2rem", display:"flex", flexDirection:"column",
        fontFamily:"var(--font-body)",
      }}>
        <div style={{ height:70, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--border)", marginBottom:"1.5rem" }}>
          <Link to="/" onClick={() => setMob(false)} style={{ textDecoration:"none" }}>
            <span style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:700, color:"var(--tx)" }}>TrustLedger<span style={{ color:"var(--gold)" }}>Labs</span></span>
          </Link>
          <button onClick={() => setMob(false)} style={{ width:36, height:36, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg3)", border:"1px solid var(--border)", color:"var(--tx2)", cursor:"pointer" }}><X size={17}/></button>
        </div>
        {[{to:"/about",l:"About"},{to:"/blog",l:"Insights"},{to:"/jobs",l:"Careers"}].map(({to,l}) => (
          <Link key={to} to={to} onClick={() => setMob(false)} style={{ padding:"0.95rem 0", fontSize:"1.05rem", fontWeight:500, color:"var(--tx)", textDecoration:"none", borderBottom:"1px solid var(--border)" }}>{l}</Link>
        ))}
        <div style={{ padding:"0.95rem 0", borderBottom:"1px solid var(--border)" }}>
          <div style={{ fontSize:"0.66rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--tx3)", marginBottom:"0.75rem" }}>Products</div>
          {products.map(p => (
            <Link key={p.to} to={p.to} onClick={() => setMob(false)} style={{ display:"flex", alignItems:"center", gap:8, padding:"0.45rem 0", fontSize:"0.92rem", color:"var(--tx2)", textDecoration:"none" }}>
              <p.icon size={14} style={{ color:"var(--gold)" }}/> {p.label}
            </Link>
          ))}
        </div>
        <Link to="/contact" onClick={() => setMob(false)} style={{ marginTop:"1.5rem", display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:"1rem", background:"var(--tx)", color:"var(--bg)", borderRadius:12, fontWeight:600, fontSize:"0.95rem", textDecoration:"none" }}>
          Contact Us <ArrowUpRight size={14}/>
        </Link>
      </div>
    </>
  );
}
