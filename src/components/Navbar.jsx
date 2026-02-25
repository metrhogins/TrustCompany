import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import { Moon, Sun, ChevronDown, Menu, X, Blocks, Brain, Lightbulb } from "lucide-react";
import logo from "/favicon.png";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProductsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const products = [
    { to: "/products/blockchain", icon: Blocks, label: "Blockchain Solutions", desc: "Smart contracts & DeFi infrastructure" },
    { to: "/products/ai",         icon: Brain,  label: "AI Platform",          desc: "Automation & cognitive intelligence" },
    { to: "/products/consulting", icon: Lightbulb, label: "Consulting",        desc: "Strategy & digital transformation" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}

        .nb-root{
          position:sticky;top:0;z-index:100;
          font-family:'DM Sans','Helvetica Neue',sans-serif;
          background:var(--bg2);
          border-bottom:1px solid var(--border);
          transition:box-shadow .3s,background .3s;
        }
        .nb-root.scrolled{ box-shadow:0 4px 32px rgba(0,0,0,.08); }
        .nb-inner{
          max-width:1280px;margin:0 auto;
          padding:0 2rem;
          height:68px;
          display:flex;align-items:center;justify-content:space-between;gap:2rem;
        }

        /* LOGO */
        .nb-logo{
          display:flex;align-items:center;gap:.6rem;
          text-decoration:none;flex-shrink:0;
        }
        .nb-logo img{ height:36px;width:36px;object-fit:contain; }
        .nb-logo-name{
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1.3rem;font-weight:700;
          color:var(--tx);letter-spacing:-.01em;
          white-space:nowrap;
        }
        .nb-logo-dot{ color:var(--gold); }

        /* NAV LINKS */
        .nb-nav{ display:flex;align-items:center;gap:.25rem; }
        .nb-link{
          padding:.45rem .9rem;border-radius:8px;
          font-size:.88rem;font-weight:500;
          color:var(--tx2);
          text-decoration:none;
          transition:color .15s,background .15s;
          white-space:nowrap;
        }
        .nb-link:hover{ color:var(--tx);background:var(--bg3); }
        .nb-link.active{
          color:var(--tx);font-weight:600;
          background:var(--bg3);
        }

        /* PRODUCTS DROPDOWN TRIGGER */
        .nb-prod-btn{
          display:flex;align-items:center;gap:4px;
          padding:.45rem .9rem;border-radius:8px;
          font-size:.88rem;font-weight:500;
          color:var(--tx2);background:transparent;border:none;cursor:pointer;
          font-family:inherit;transition:color .15s,background .15s;
          white-space:nowrap;
        }
        .nb-prod-btn:hover,.nb-prod-btn.open{ color:var(--tx);background:var(--bg3); }
        .nb-chevron{ transition:transform .2s; }
        .nb-chevron.open{ transform:rotate(180deg); }

        /* DROPDOWN PANEL */
        .nb-dropdown{
          position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);
          width:380px;
          background:var(--bg2);
          border:1px solid var(--border);
          border-radius:16px;
          box-shadow:0 20px 60px rgba(0,0,0,.12);
          padding:.75rem;
          z-index:200;
        }
        .nb-drop-item{
          display:flex;align-items:center;gap:.85rem;
          padding:.85rem 1rem;border-radius:10px;
          text-decoration:none;
          transition:background .15s;
        }
        .nb-drop-item:hover{ background:var(--bg3); }
        .nb-drop-icon{
          width:36px;height:36px;border-radius:9px;
          display:flex;align-items:center;justify-content:center;
          background:rgba(200,169,110,.12);color:var(--gold);flex-shrink:0;
        }
        .nb-drop-label{ font-size:.9rem;font-weight:600;color:var(--tx);margin-bottom:2px; }
        .nb-drop-desc{ font-size:.76rem;color:var(--tx2);font-weight:300; }
        .nb-drop-divider{ height:1px;background:var(--border);margin:.25rem 0; }

        /* RIGHT SIDE */
        .nb-right{ display:flex;align-items:center;gap:.75rem;flex-shrink:0; }
        .nb-theme-btn{
          width:36px;height:36px;border-radius:9px;
          display:flex;align-items:center;justify-content:center;
          background:var(--bg3);border:1px solid var(--border);
          color:var(--tx2);cursor:pointer;transition:all .15s;
        }
        .nb-theme-btn:hover{ color:var(--tx);border-color:var(--tx2); }
        .nb-contact{
          padding:.5rem 1.25rem;border-radius:9px;
          font-size:.88rem;font-weight:600;
          background:var(--tx);color:var(--bg);
          text-decoration:none;
          transition:opacity .15s,transform .15s;
          white-space:nowrap;
        }
        .nb-contact:hover{ opacity:.82;transform:translateY(-1px); }

        /* MOBILE TOGGLE */
        .nb-mobile-btn{
          display:none;width:36px;height:36px;border-radius:9px;
          align-items:center;justify-content:center;
          background:var(--bg3);border:1px solid var(--border);
          color:var(--tx2);cursor:pointer;
        }
        @media(max-width:768px){
          .nb-nav{ display:none; }
          .nb-contact{ display:none; }
          .nb-mobile-btn{ display:flex; }
        }

        /* MOBILE DRAWER */
        .nb-mobile-drawer{
          position:fixed;inset:0;z-index:99;
          background:var(--bg2);
          display:flex;flex-direction:column;
          padding:1.5rem;
          transform:translateX(100%);
          transition:transform .3s cubic-bezier(.22,1,.36,1);
        }
        .nb-mobile-drawer.open{ transform:translateX(0); }
        .nb-mobile-header{
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:2.5rem;
        }
        .nb-mobile-link{
          display:flex;align-items:center;padding:1rem 0;
          font-size:1.1rem;font-weight:500;color:var(--tx);
          text-decoration:none;border-bottom:1px solid var(--border);
          font-family:'DM Sans',sans-serif;
        }
        .nb-mobile-link:last-child{ border-bottom:none; }
        .nb-mobile-contact{
          margin-top:2rem;padding:1rem;border-radius:12px;
          background:var(--tx);color:var(--bg);
          text-align:center;font-size:1rem;font-weight:600;
          text-decoration:none;display:block;
        }
        .nb-mobile-sub{
          padding:.6rem 0 .6rem 1.25rem;
          display:flex;align-items:center;gap:.6rem;
          font-size:.92rem;color:var(--tx2);text-decoration:none;
          font-family:'DM Sans',sans-serif;
        }
      `}</style>

      <header className={`nb-root${scrolled ? " scrolled" : ""}`}>
        <div className="nb-inner">

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <img src={logo} alt="TrustLedgerLabs" />
            <span className="nb-logo-name">TrustLedgerLabs<span className="nb-logo-dot">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="nb-nav">
            <NavLink to="/about" className={({ isActive }) => `nb-link${isActive ? " active" : ""}`}>About</NavLink>

            {/* Products Dropdown */}
            <div style={{ position: "relative" }} ref={dropdownRef}>
              <button
                className={`nb-prod-btn${productsOpen ? " open" : ""}`}
                onClick={() => setProductsOpen(o => !o)}
              >
                Products
                <ChevronDown size={14} className={`nb-chevron${productsOpen ? " open" : ""}`} />
              </button>
              {productsOpen && (
                <div className="nb-dropdown">
                  {products.map((p, i) => (
                    <React.Fragment key={p.to}>
                      {i > 0 && <div className="nb-drop-divider" />}
                      <Link to={p.to} className="nb-drop-item" onClick={() => setProductsOpen(false)}>
                        <div className="nb-drop-icon"><p.icon size={17} /></div>
                        <div>
                          <div className="nb-drop-label">{p.label}</div>
                          <div className="nb-drop-desc">{p.desc}</div>
                        </div>
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/blog" className={({ isActive }) => `nb-link${isActive ? " active" : ""}`}>Blog</NavLink>
            <NavLink to="/jobs" className={({ isActive }) => `nb-link${isActive ? " active" : ""}`}>Careers</NavLink>
          </nav>

          {/* Right */}
          <div className="nb-right">
            <button className="nb-theme-btn" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link to="/contact" className="nb-contact">Contact Us</Link>
            <button className="nb-mobile-btn" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`nb-mobile-drawer${mobileOpen ? " open" : ""}`}>
        <div className="nb-mobile-header">
          <Link to="/" className="nb-logo" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="TrustLedgerLabs" />
            <span className="nb-logo-name">TrustLedgerLabs<span className="nb-logo-dot">.</span></span>
          </Link>
          <button className="nb-mobile-btn" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <Link to="/about" className="nb-mobile-link" onClick={() => setMobileOpen(false)}>About</Link>
        <div className="nb-mobile-link" style={{ flexDirection: "column", alignItems: "flex-start", gap: ".25rem" }}>
          <span style={{ fontWeight: 600, color: "var(--tx2)", fontSize: ".72rem", letterSpacing: ".15em", textTransform: "uppercase" }}>Products</span>
          {products.map(p => (
            <Link key={p.to} to={p.to} className="nb-mobile-sub" onClick={() => setMobileOpen(false)}>
              <p.icon size={15} style={{ color: "var(--gold)" }} />{p.label}
            </Link>
          ))}
        </div>
        <Link to="/blog" className="nb-mobile-link" onClick={() => setMobileOpen(false)}>Blog</Link>
        <Link to="/jobs" className="nb-mobile-link" onClick={() => setMobileOpen(false)}>Careers</Link>

        <Link to="/contact" className="nb-mobile-contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>

        <button className="nb-theme-btn" style={{ marginTop: "1.5rem" }} onClick={toggle}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />} &nbsp; {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </>
  );
}
