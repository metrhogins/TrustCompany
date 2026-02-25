import React from "react";
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", fontFamily: "'DM Sans','Helvetica Neue',sans-serif" }}>
      <style>{`
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}
        .ft-inner{max-width:1280px;margin:0 auto;padding:4rem 2rem 2rem;display:grid;grid-template-columns:2fr 1fr 1fr 1.6fr;gap:3rem}
        @media(max-width:900px){.ft-inner{grid-template-columns:1fr 1fr;gap:2.5rem}}
        @media(max-width:540px){.ft-inner{grid-template-columns:1fr;gap:2rem}}
        .ft-brand-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;font-weight:700;color:var(--tx);margin-bottom:.5rem}
        .ft-brand-name span{color:var(--gold)}
        .ft-brand-desc{font-size:.88rem;color:var(--tx2);font-weight:300;line-height:1.7;margin-bottom:1.25rem;max-width:260px}
        .ft-socials{display:flex;gap:.6rem}
        .ft-social{width:36px;height:36px;border-radius:9px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--tx2);text-decoration:none;transition:border-color .2s,color .2s}
        .ft-social:hover{border-color:var(--gold);color:var(--gold)}
        .ft-col-title{font-size:.7rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--tx2);margin-bottom:1.1rem}
        .ft-links{display:flex;flex-direction:column;gap:.6rem}
        .ft-link{font-size:.9rem;color:var(--tx2);text-decoration:none;font-weight:300;transition:color .15s;width:fit-content}
        .ft-link:hover{color:var(--gold)}
        .ft-newsletter-desc{font-size:.85rem;color:var(--tx2);font-weight:300;line-height:1.65;margin-bottom:1rem}
        .ft-nl-form{display:flex;border:1px solid var(--border);border-radius:10px;overflow:hidden;background:var(--bg3)}
        .ft-nl-input{flex:1;padding:.65rem 1rem;background:transparent;border:none;outline:none;font-size:.88rem;color:var(--tx);font-family:inherit}
        .ft-nl-input::placeholder{color:var(--tx2)}
        .ft-nl-btn{padding:.65rem .9rem;background:var(--tx);color:var(--bg);border:none;cursor:pointer;transition:opacity .2s;display:flex;align-items:center}
        .ft-nl-btn:hover{opacity:.82}
        .ft-bottom{max-width:1280px;margin:0 auto;padding:1.5rem 2rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
        .ft-copy{font-size:.8rem;color:var(--tx2);font-weight:300}
        .ft-bottom-links{display:flex;gap:1.5rem}
        .ft-bottom-link{font-size:.8rem;color:var(--tx2);text-decoration:none;font-weight:300;transition:color .15s}
        .ft-bottom-link:hover{color:var(--gold)}
      `}</style>

      <div className="ft-inner">
        {/* Brand */}
        <div>
          <div className="ft-brand-name">TrustLedgerLabs<span>.</span></div>
          <p className="ft-brand-desc">Enterprise-grade AI and blockchain infrastructure — delivering trust, intelligence, and scalability worldwide.</p>
          <p style={{ fontSize: ".78rem", color: "var(--tx2)", fontWeight: 300, marginBottom: "1rem", letterSpacing: ".04em" }}>HQ: Singapore</p>
          <div className="ft-socials">
            <a href="https://www.linkedin.com/company/trustledgerlabs" target="_blank" rel="noopener noreferrer" className="ft-social"><Linkedin size={16} /></a>
            <a href="https://github.com/orgs/TrustLedgerLabs/" target="_blank" rel="noopener noreferrer" className="ft-social"><Github size={16} /></a>
          </div>
        </div>

        {/* Company */}
        <div>
          <div className="ft-col-title">Company</div>
          <div className="ft-links">
            <Link to="/about" className="ft-link">About</Link>
            <Link to="/jobs" className="ft-link">Careers</Link>
            <Link to="/blog" className="ft-link">Blog</Link>
            <Link to="/contact" className="ft-link">Contact</Link>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="ft-col-title">Products</div>
          <div className="ft-links">
            <Link to="/products/blockchain" className="ft-link">Blockchain</Link>
            <Link to="/products/ai" className="ft-link">AI Platform</Link>
            <Link to="/products/consulting" className="ft-link">Consulting</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <div className="ft-col-title">Stay Updated</div>
          <p className="ft-newsletter-desc">Subscribe for insights on AI, blockchain, and decentralized intelligence.</p>
          <div className="ft-nl-form">
            <input type="email" placeholder="your@email.com" className="ft-nl-input" />
            <button type="button" className="ft-nl-btn"><Mail size={15} /></button>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <span className="ft-copy">© {new Date().getFullYear()} TrustLedgerLabs. All rights reserved.</span>
        <div className="ft-bottom-links">
          <a href="#" className="ft-bottom-link">Privacy Policy</a>
          <a href="#" className="ft-bottom-link">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
