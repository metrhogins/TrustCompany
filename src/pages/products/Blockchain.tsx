import React from "react";
import { motion } from "framer-motion";
import { Blocks, ShieldCheck, Network, Lock, Zap, Globe2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
const fv={hidden:{opacity:0,y:22},visible:(i=0)=>({opacity:1,y:0,transition:{duration:.52,delay:i*.09,ease:[.22,1,.36,1]}})};
const features=[
  {icon:Blocks,c:"#b5894a",t:"Smart Contract Development & Audit",d:"End-to-end smart contract engineering across Ethereum, Solana, Polygon and custom EVM chains. Every contract undergoes multi-pass security auditing, formal verification where applicable, and comprehensive test suites before any mainnet deployment."},
  {icon:ShieldCheck,c:"#6366f1",t:"Enterprise Security Architecture",d:"Zero-trust frameworks engineered for decentralised environments — multi-sig governance, timelocks, role-based access control, on-chain fraud detection, and automated incident response built into every deployment."},
  {icon:Network,c:"#b5894a",t:"Cross-Chain Interoperability",d:"Bridge protocols, cross-chain message passing, and Layer-2 integrations that enable seamless asset and data flow across heterogeneous networks without sacrificing security or transaction finality guarantees."},
  {icon:Lock,c:"#6366f1",t:"Identity, KYC & Compliance",d:"Decentralised identity systems compliant with MiCA, FATF Travel Rule, and regional AML frameworks. On-chain attestation registries, verifiable credentials, and permissioned access control for regulated industries."},
  {icon:Zap,c:"#b5894a",t:"High-Performance L2 Architecture",d:"Custom Rollup infrastructure — Optimistic and ZK-based — engineered for enterprise throughput. Latency-optimised sequencer design and fraud-proof systems calibrated precisely to your use case and compliance requirements."},
  {icon:Globe2,c:"#6366f1",t:"DeFi Protocol Engineering",d:"Liquidity pool design, automated market makers, yield optimisation vaults, and tokenisation frameworks for real-world assets. Institutional-grade DeFi built with the rigour financial counterparties demand from production systems."},
];
const useCases=["Financial Settlement & Clearing","Supply Chain Provenance","Digital Asset Custody","Carbon Credit Tokenisation","Trade Finance Automation","Regulatory Reporting Trails"];
export default function Blockchain(){return(
  <div style={{background:"var(--bg)",color:"var(--tx)"}}>
    <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)",padding:"7rem 2rem 5rem",position:"relative",overflow:"hidden",textAlign:"center"}}>
      <div className="tex-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      <div style={{maxWidth:780,margin:"0 auto",position:"relative",zIndex:1}}>
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="badge" style={{marginBottom:"1.75rem"}}><Blocks size={11}/>Blockchain Solutions</div>
          <h1 className="t-h1" style={{marginBottom:"1.25rem"}}>Institutional-Grade <em style={{fontStyle:"italic",color:"var(--gold)"}}>Blockchain</em> Infrastructure</h1>
          <p className="t-body-lg" style={{maxWidth:620,margin:"0 auto 2.5rem"}}>We architect, deploy, and maintain the decentralised infrastructure that financial institutions, regulated enterprises, and protocol teams rely on for mission-critical operations — where security, auditability, and performance are non-negotiable.</p>
          <Link to="/contact" className="btn btn-dark">Engage Our Blockchain Practice <ArrowUpRight size={14}/></Link>
        </motion.div>
      </div>
    </section>
    <section style={{background:"var(--bg)"}}>
      <div className="wrap sect">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginBottom:"3.5rem"}}>
          <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Service Capabilities</div>
          <h2 className="t-h2">What Our Blockchain Practice Delivers</h2>
        </motion.div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"1.5rem"}}>
          {features.map((f,i)=>(
            <motion.div key={f.t} className="card-hover" variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-40px"}} style={{padding:"2rem"}}>
              <div style={{width:48,height:48,borderRadius:12,background:f.c+"18",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem"}}><f.icon size={22} style={{color:f.c}}/></div>
              <div style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,color:"var(--tx)",marginBottom:".6rem"}}>{f.t}</div>
              <div className="t-small">{f.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section style={{background:"var(--bg3)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)"}}>
      <div className="wrap sect-sm">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}} className="uc-g">
          <style>{`@media(max-width:768px){.uc-g{grid-template-columns:1fr!important}}`}</style>
          <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.6}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Industry Applications</div>
            <h2 className="t-h2" style={{marginBottom:"1.25rem"}}>Proven Across Critical Sectors</h2>
            <p className="t-body">Our blockchain engagements span the full spectrum of enterprise verticals — from regulated financial infrastructure to real-world asset tokenisation and government procurement systems.</p>
          </motion.div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
            {useCases.map((u,i)=>(
              <motion.div key={u} variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true}} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"1rem",background:"var(--bg2)",borderRadius:12,border:"1px solid var(--border)"}}>
                <CheckCircle2 size={14} style={{color:"var(--gold)",marginTop:2,flexShrink:0}}/>
                <span className="t-small">{u}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section style={{background:"var(--bg)",padding:"5.5rem 2rem",textAlign:"center"}}>
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
        <div className="t-eyebrow" style={{marginBottom:"1rem"}}>Start the Conversation</div>
        <h2 className="t-h2" style={{marginBottom:"1.25rem"}}>Ready to Build on Blockchain?</h2>
        <p className="t-body-lg" style={{maxWidth:480,margin:"0 auto 2.5rem"}}>Let's scope your use case and design an architecture calibrated for your regulatory environment, performance requirements, and long-term roadmap.</p>
        <Link to="/contact" className="btn btn-dark" style={{padding:".85rem 2.2rem"}}>Schedule a Discovery Call <ArrowUpRight size={14}/></Link>
      </motion.div>
    </section>
  </div>
);}
