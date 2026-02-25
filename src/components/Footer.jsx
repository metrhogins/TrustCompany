import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const colTitle = { fontSize:"0.66rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--tx3)", marginBottom:"1.2rem", fontFamily:"var(--font-body)" };
  const lnk = { fontSize:"0.86rem", color:"var(--tx2)", textDecoration:"none", fontWeight:300, display:"block", marginBottom:"0.6rem", fontFamily:"var(--font-body)", transition:"color .15s" };
  
  return (
    <footer style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)", fontFamily:"var(--font-body)" }}>
      <div style={{ maxWidth:1240, margin:"0 auto", padding:"5rem 2rem 2.5rem", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.7fr", gap:"3rem" }} className="ftr-grid">
        <style>{`
          @media(max-width:900px){ .ftr-grid{grid-template-columns:1fr 1fr!important} }
          @media(max-width:520px){ .ftr-grid{grid-template-columns:1fr!important} }
        `}</style>

        {/* Brand */}
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:700, color:"var(--tx)", letterSpacing:"-0.02em", marginBottom:"0.75rem", lineHeight:1 }}>
            TrustLedger<span style={{ color:"var(--gold)" }}>Labs</span>
          </div>
          <p style={{ fontSize:"0.86rem", color:"var(--tx2)", fontWeight:300, lineHeight:1.75, maxWidth:265, marginBottom:"0.5rem" }}>
            Engineering the infrastructure layer where Artificial Intelligence and Blockchain converge — for enterprises that require verifiable trust at scale.
          </p>
          <p style={{ fontSize:"0.72rem", color:"var(--tx3)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"1.25rem" }}>Incorporated in Singapore</p>
          <div style={{ display:"flex", gap:"0.5rem" }}>
            {[{href:"https://www.linkedin.com/company/trustledgerlabs",I:Linkedin},{href:"https://github.com/orgs/TrustLedgerLabs/",I:Github}].map(({href,I}) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                style={{ width:36, height:36, borderRadius:9, border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--tx2)", textDecoration:"none", transition:"border-color .2s, color .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--tx2)"}} >
                <I size={15}/>
              </a>
            ))}
          </div>
        </div>

        {/* Products (Moved here from Company) */}
        <div>
          <div style={colTitle}>Products</div>
          {[{to:"/products/blockchain",l:"Blockchain"},{to:"/products/ai",l:"AI Platform"},{to:"/products/consulting",l:"Consulting"}].map(({to,l}) => (
            <Link key={to} to={to} style={lnk}
              onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"}
              onMouseLeave={e=>e.currentTarget.style.color="var(--tx2)"}>{l}</Link>
          ))}
        </div>

        {/* Company (Moved here from Products) */}
        <div>
          <div style={colTitle}>Company</div>
          {[{to:"/about",l:"About Us"},{to:"/blog",l:"Insights"},{to:"/contact",l:"Contact"},{to:"/jobs",l:"Open Roles"}].map(({to,l}) => (
            <Link key={to} to={to} style={lnk}
              onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"}
              onMouseLeave={e=>e.currentTarget.style.color="var(--tx2)"}>{l}</Link>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <div style={colTitle}>Intelligence Briefing</div>
          <p style={{ fontSize:"0.84rem", color:"var(--tx2)", fontWeight:300, lineHeight:1.7, marginBottom:"1rem" }}>
            Monthly research dispatches on AI infrastructure, blockchain protocol design, and decentralised enterprise systems.
          </p>
          <div style={{ display:"flex", border:"1px solid var(--border)", borderRadius:10, overflow:"hidden", background:"var(--bg3)" }}>
            <input type="email" placeholder="your@email.com" className="inp" style={{ border:"none", borderRadius:0, background:"transparent", padding:"0.65rem 1rem", fontSize:"0.85rem" }}/>
            <button type="button"
              style={{ padding:"0 0.9rem", background:"var(--tx)", color:"var(--bg)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", transition:"opacity .18s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".8"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              <Mail size={14}/>
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1240, margin:"0 auto", padding:"1.5rem 2rem", borderTop:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
        <span style={{ fontSize:"0.76rem", color:"var(--tx3)", fontWeight:300 }}>© {new Date().getFullYear()} TrustLedgerLabs Pte. Ltd. All rights reserved.</span>
        <div style={{ display:"flex", gap:"1.5rem" }}>
          {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
            <a key={l} href="#" style={{ fontSize:"0.76rem", color:"var(--tx3)", textDecoration:"none", fontWeight:300, transition:"color .15s" }}
              onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"}
              onMouseLeave={e=>e.currentTarget.style.color="var(--tx3)"}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}