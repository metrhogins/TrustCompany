import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Blocks, ShieldCheck, Server, Globe2, Brain, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const fv={hidden:{opacity:0,y:26},visible:(i=0)=>({opacity:1,y:0,transition:{duration:.6,delay:i*.1,ease:[.22,1,.36,1]}})};
function R({children,i=0,style={}}){const ref=useRef(null);const v=useInView(ref,{once:true,margin:"-60px"});return<motion.div ref={ref} variants={fv} custom={i} initial="hidden" animate={v?"visible":"hidden"} style={style}>{children}</motion.div>;}

const mvv=[
  {n:"01",title:"Mission",text:"To empower organisations with the infrastructure required to operate intelligently, transparently, and at global scale — by unifying the most rigorous advances in artificial intelligence and distributed ledger technology."},
  {n:"02",title:"Vision", text:"A world in which every consequential institutional process — financial settlement, supply chain provenance, regulatory compliance, AI-driven governance — runs on infrastructure that is simultaneously autonomous, verifiable, and incorruptible."},
  {n:"03",title:"Values", text:"Radical transparency in every engagement. Technical excellence without compromise. Intellectual curiosity that drives us to the frontier. And an unwavering commitment to building systems that earn — and retain — institutional trust."},
];
const techAreas=[
  {icon:Cpu,   title:"AI-Driven Automation",         desc:"We deploy large language models, reinforcement learning agents, and computer vision systems directly into enterprise workflows — replacing brittle rule-based processes with adaptive, self-improving pipelines that learn from every cycle."},
  {icon:Blocks,title:"Smart Contract Infrastructure", desc:"From ERC-20 token standards to complex multi-party settlement protocols, our smart contract practice spans Ethereum, Solana, and custom EVM chains — each rigorously audited and formally verified before any mainnet deployment."},
  {icon:ShieldCheck,title:"Zero-Trust Security Architecture",desc:"Security is a foundational design constraint, not a bolt-on feature. Every system we build assumes a hostile environment and implements layered cryptographic access controls, continuous threat monitoring, and automated incident response."},
  {icon:Server,title:"Scalable Data Pipelines",       desc:"High-throughput data infrastructure capable of ingesting, normalising, and routing millions of on-chain and off-chain events per second into real-time AI analytics, decision engines, and compliance dashboards."},
  {icon:Globe2,title:"Decentralised Applications",    desc:"Full-stack dApp development — Solidity backend logic, React frontends, IPFS-hosted assets — delivering Web3 experiences that meet the usability standard of Web2 without sacrificing the sovereignty of Web3."},
  {icon:Brain, title:"Machine Learning at Scale",     desc:"End-to-end MLOps: model design and fine-tuning, feature store architecture, deployment pipelines with A/B testing, continuous monitoring, and automated retraining. From proof-of-concept to production in weeks."},
];
const stats=[
  {value:"2024",   label:"Year Incorporated",   sub:"Singapore HQ"},
  {value:"70+",    label:"Expert Specialists",  sub:"Engineers, researchers & strategists"},
  {value:"500+",   label:"Clients Served",      sub:"Across 12+ global verticals"},
  {value:"99.99%", label:"Platform SLA",        sub:"Enterprise-grade uptime"},
];
const tl=[
  {y:"2024 Q1",t:"Incorporation",d:"TrustLedgerLabs Pte. Ltd. incorporated in Singapore. The founding team — drawn from enterprise fintech, academic cryptography, and applied ML — set out to build the definitive AI-blockchain infrastructure firm for the Asia-Pacific and global enterprise market."},
  {y:"2024 Q3",t:"Platform MVP",d:"Core TrustLedger Platform v0.1 completed internally. Architecture peer-reviews conducted with external blockchain security specialists. First design partners onboarded for structured feedback and technical validation."},
  {y:"2025 Q1",t:"First Enterprise Client",d:"Signed and delivered our inaugural enterprise engagement: a production-grade AI automation and on-chain audit trail system for a regional financial services group. System processed over 2 million transactions in its first 90 days with zero critical incidents."},
  {y:"2026",t:"Global Scale",d:"Scaled headcount to 70+ specialists across Singapore, London and Dubai. Launched TrustLedger AI as a managed SaaS product. Onboarded enterprise clients across financial services, healthcare infrastructure and government procurement."},
];

export default function About(){
  return(
    <div style={{background:"var(--bg)",color:"var(--tx)"}}>

      {/* Hero */}
      <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)",padding:"7rem 2rem 5rem",position:"relative",overflow:"hidden",textAlign:"center"}}>
        <div className="tex-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
        <div style={{maxWidth:820,margin:"0 auto",position:"relative",zIndex:1}}>
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <div className="badge" style={{marginBottom:"2rem"}}>Est. 2024 · Singapore</div>
            <h1 className="t-h1" style={{marginBottom:"1.5rem"}}>The Company Architecting <em style={{fontStyle:"italic",color:"var(--gold)"}}>Decentralised Trust</em></h1>
            <p className="t-body-lg" style={{maxWidth:660,margin:"0 auto 2.5rem"}}>
              TrustLedgerLabs is a specialist technology firm building the enterprise infrastructure layer where Artificial Intelligence and Blockchain converge — delivering systems that are intelligent, transparent, and cryptographically accountable at every layer of the stack.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
              {["AI Infrastructure","Blockchain Protocol","Smart Contracts","Zero-Trust Security","DeFi Engineering","ML at Scale"].map(t=>(
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MVV */}
      <section style={{background:"var(--bg)"}}>
        <div className="wrap sect">
          <R style={{marginBottom:"3rem"}}><div className="t-eyebrow" style={{marginBottom:".75rem"}}>Our Foundation</div><h2 className="t-h2">Mission, Vision &amp; Values</h2></R>
          <div className="grid-divider" style={{gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))"}}>
            {mvv.map((item,i)=>(
              <motion.div key={item.title} variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true}}
                style={{background:"var(--bg2)",padding:"2.5rem",cursor:"default",transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="var(--bg3)"}
                onMouseLeave={e=>e.currentTarget.style.background="var(--bg2)"}>
                <div style={{fontFamily:"var(--font-display)",fontSize:"3.5rem",fontWeight:700,color:"rgba(181,137,74,.18)",lineHeight:1,marginBottom:".75rem"}}>{item.n}</div>
                <div style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,color:"var(--tx)",marginBottom:".75rem"}}>{item.title}</div>
                <div className="t-small">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{background:"var(--bg3)"}}>
        <div className="wrap sect">
          <R style={{textAlign:"center",marginBottom:"3.5rem"}}><div className="t-eyebrow" style={{marginBottom:".75rem"}}>Company Metrics</div><h2 className="t-h2">TrustLedgerLabs at a Glance</h2></R>
          <div className="grid-divider" style={{gridTemplateColumns:"repeat(4,1fr)"}} className2="stats4">
            <style>{`@media(max-width:640px){.stats4{grid-template-columns:repeat(2,1fr)!important}}`}</style>
            {stats.map((s,i)=>(
              <motion.div key={s.label} variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true}}
                style={{background:"var(--bg2)",padding:"2.5rem 1.75rem",textAlign:"center"}}>
                <div className="stat-num" style={{marginBottom:".4rem"}}>{s.value}</div>
                <div style={{fontFamily:"var(--font-body)",fontSize:".9rem",fontWeight:600,color:"var(--tx)",marginBottom:".25rem"}}>{s.label}</div>
                <div className="t-small">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech capabilities */}
      <section style={{background:"var(--bg)"}}>
        <div className="wrap sect">
          <R style={{marginBottom:"3rem"}}><div className="t-eyebrow" style={{marginBottom:".75rem"}}>Technical Capabilities</div><h2 className="t-h2">What We Build</h2></R>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"1.5rem"}}>
            {techAreas.map((item,i)=>(
              <motion.div key={item.title} className="card-hover" variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-40px"}} style={{padding:"2rem"}}>
                <div style={{width:46,height:46,background:"var(--gold-bg)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem",color:"var(--gold)"}}>
                  <item.icon size={22}/>
                </div>
                <div style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,color:"var(--tx)",marginBottom:".6rem"}}>{item.title}</div>
                <div className="t-small">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{background:"var(--bg2)"}}>
        <div className="wrap sect">
          <R style={{marginBottom:"3rem"}}><div className="t-eyebrow" style={{marginBottom:".75rem"}}>Corporate Timeline</div><h2 className="t-h2">Milestones &amp; Momentum</h2></R>
          {tl.map((item,i)=>(
            <motion.div key={i} variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-60px"}}
              style={{display:"grid",gridTemplateColumns:"130px 1fr",gap:"2.5rem",padding:"2.5rem 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"1.05rem",fontWeight:700,color:"var(--gold)",lineHeight:1.3,paddingTop:4}}>{item.y}</div>
              <div>
                <div style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,color:"var(--tx)",marginBottom:".5rem"}}>{item.t}</div>
                <div className="t-body">{item.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{background:"var(--bg3)",borderTop:"1px solid var(--border)",padding:"5.5rem 2rem",textAlign:"center"}}>
        <R><div className="t-eyebrow" style={{marginBottom:"1rem"}}>Work With Us</div><h2 className="t-h2" style={{marginBottom:"1.25rem"}}>Partner With TrustLedgerLabs</h2>
        <p className="t-body-lg" style={{maxWidth:500,margin:"0 auto 2.5rem"}}>Whether you need a bespoke blockchain protocol, an AI automation layer, or executive advisory on digital transformation — we are ready to engage.</p>
        <Link to="/contact" className="btn btn-dark" style={{fontSize:".9rem",padding:".85rem 2.2rem"}}>Begin the Conversation <ArrowUpRight size={14}/></Link>
        </R>
      </section>
    </div>
  );
}
