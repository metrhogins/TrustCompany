import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Users, Globe2, Cpu, Blocks, BarChart2, Linkedin, ArrowUpRight, Zap, Star, Lock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const fv = { hidden:{opacity:0,y:26}, visible:(i=0)=>({opacity:1,y:0,transition:{duration:.6,delay:i*.1,ease:[.22,1,.36,1]}}) };
function Reveal({children,i=0,style={}}){
  const ref=useRef(null); const v=useInView(ref,{once:true,margin:"-60px"});
  return <motion.div ref={ref} variants={fv} custom={i} initial="hidden" animate={v?"visible":"hidden"} style={style}>{children}</motion.div>;
}

const stats=[
  {icon:ShieldCheck,value:"500+",  label:"Enterprise Clients Served",   sub:"Across 12+ global verticals",    c:"#b5894a"},
  {icon:Globe2,     value:"20+",   label:"Production Deployments",       sub:"Live in 8 countries",            c:"#6366f1"},
  {icon:Users,      value:"70+",   label:"Expert Specialists",           sub:"Engineers, researchers & strategists", c:"#b5894a"},
  {icon:BarChart2,  value:"99.99%",label:"Platform Uptime SLA",          sub:"Enterprise-grade reliability",   c:"#6366f1"},
];
const techTags=[
  {icon:Cpu,        text:"AI-Driven Automation"},
  {icon:Blocks,     text:"Smart Contract Infrastructure"},
  {icon:ShieldCheck,text:"Zero-Trust Security"},
  {icon:Globe2,     text:"Decentralised Applications"},
  {icon:TrendingUp, text:"Predictive Analytics"},
];
const timeline=[
  {year:"2024",title:"Company Founded",desc:"TrustLedgerLabs Pte. Ltd. incorporated in Singapore — purpose-built to architect decentralised, AI-augmented systems enterprises can trust unconditionally."},
  {year:"2025",title:"First Enterprise Deployment",desc:"Delivered our inaugural production AI automation and blockchain audit trail system for a regional financial services group, processing over 2 million transactions in 90 days."},
  {year:"2026",title:"Global Expansion",desc:"Scaled to 70+ specialists across Singapore, London and Dubai. Launched TrustLedger AI as a managed SaaS product. Onboarded clients across finance, healthcare and government."},
];
const culture=[
  {icon:Zap,  title:"Frontier-First Engineering",desc:"We operate at the technical vanguard — deploying ZK-proof privacy layers, autonomous AI agents, and cross-chain settlement protocols before they become mainstream."},
  {icon:Star, title:"Principled Craftsmanship",  desc:"We treat every system as a long-term commitment. Every smart contract is audited. Every model is monitored. Institutional-grade rigour is our baseline, not our differentiator."},
  {icon:Users,title:"Cross-Disciplinary Rigour", desc:"Cryptographers, ML researchers, domain strategists and product designers working as one cohesive unit — because transformative infrastructure demands all these disciplines simultaneously."},
  {icon:Lock, title:"Long-Term Stewardship",     desc:"Our engagements don't end at delivery. Ongoing SLAs, performance reviews and adaptive roadmaps ensure the systems we build continue earning trust through every market cycle."},
];

export default function Home(){
  return(
    <div style={{background:"var(--bg)",color:"var(--tx)"}}>

      {/* HERO */}
      <section style={{position:"relative",overflow:"hidden",minHeight:"88vh",display:"flex",alignItems:"center"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400')",backgroundSize:"cover",backgroundPosition:"center 35%",filter:"grayscale(15%)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(140deg,rgba(13,11,9,.94) 0%,rgba(13,11,9,.72) 55%,rgba(13,11,9,.48) 100%)"}}/>
        <div className="tex-grid" style={{position:"absolute",inset:0}}/>
        <div className="wrap" style={{position:"relative",zIndex:1,paddingTop:"5rem",paddingBottom:"5rem"}}>
          <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
            <div className="badge" style={{marginBottom:"2rem",color:"var(--gold)"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"var(--gold)",flexShrink:0}}/>
              Est. 2024 &nbsp;·&nbsp; Singapore &nbsp;·&nbsp; AI &amp; Blockchain Infrastructure
            </div>
            <h1 className="t-display" style={{color:"#f0ece4",marginBottom:"1.5rem"}}>
              Building the Future<br/>of <em className="t-italic">Trusted</em> Intelligence
            </h1>
            <p className="t-body-lg" style={{color:"rgba(240,236,228,.6)",maxWidth:580,marginBottom:"2.75rem"}}>
              TrustLedgerLabs architects enterprise-grade systems at the convergence of Artificial Intelligence and Blockchain — where verifiable trust, autonomous execution, and institutional-grade security form an inseparable whole.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:"3rem"}}>
              {techTags.map(t=>(
                <span key={t.text} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 13px",background:"rgba(181,137,74,.1)",border:"1px solid rgba(181,137,74,.22)",borderRadius:7,fontFamily:"var(--font-body)",fontSize:".76rem",color:"rgba(240,236,228,.75)",fontWeight:500}}>
                  <t.icon size={12} style={{color:"var(--gold)"}}/>{t.text}
                </span>
              ))}
            </div>
            <div style={{display:"flex",gap:"0.85rem",flexWrap:"wrap"}}>
              <Link to="/contact" className="btn btn-gold">Engage TrustLedgerLabs <ArrowUpRight size={14}/></Link>
              <Link to="/about" className="btn btn-outline" style={{color:"rgba(240,236,228,.75)",borderColor:"rgba(240,236,228,.18)"}}>Our Story</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)"}}>
        <div className="wrap sect-sm">
          <Reveal>
            <div style={{maxWidth:840}}>
              <div className="t-eyebrow" style={{marginBottom:"1rem"}}>Our Purpose</div>
              <blockquote className="bq" style={{marginBottom:"1.5rem"}}>
                "The most consequential infrastructure of the next decade will be simultaneously intelligent, transparent, and cryptographically accountable — and TrustLedgerLabs is building it."
              </blockquote>
              <p className="t-body-lg">
                We integrate advanced AI models with immutable ledger systems to deliver automated workflows that are fully auditable, regulatory-compliant, and resistant to adversarial conditions. Every system we build is designed not just to perform today, but to earn institutional trust over decades.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:"var(--bg3)"}}>
        <div className="wrap sect">
          <Reveal style={{textAlign:"center",marginBottom:"3.5rem"}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Traction &amp; Impact</div>
            <h2 className="t-h2">Proven at Enterprise Scale</h2>
          </Reveal>
          <div className="grid-divider" style={{gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))"}}>
            {stats.map((s,i)=>(
              <motion.div key={s.label} variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true}}
                style={{background:"var(--bg2)",padding:"2.5rem 2rem",cursor:"default",transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="var(--bg3)"}
                onMouseLeave={e=>e.currentTarget.style.background="var(--bg2)"}>
                <div style={{width:42,height:42,borderRadius:11,background:s.c+"18",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem"}}>
                  <s.icon size={20} style={{color:s.c}}/>
                </div>
                <div className="stat-num" style={{marginBottom:".4rem"}}>{s.value}</div>
                <div style={{fontFamily:"var(--font-body)",fontSize:".88rem",fontWeight:600,color:"var(--tx)",marginBottom:".25rem"}}>{s.label}</div>
                <div className="t-small">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO */}
      <section style={{background:"var(--bg)"}}>
        <div className="wrap sect">
          <Reveal style={{marginBottom:"3.5rem"}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Executive Leadership</div>
            <h2 className="t-h2">The Architect Behind the Vision</h2>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.45fr",gap:"5rem",alignItems:"center"}} className="ceo-g">
          <style>{`.ceo-g{@media(max-width:800px){grid-template-columns:1fr!important;gap:2.5rem!important}}`}</style>
            <Reveal i={0}>
              <div style={{position:"relative"}}>
                <div style={{borderRadius:22,overflow:"hidden",aspectRatio:"4/4",maxHeight:520,border:"1px solid var(--border)"}}>
                  <img src="CEO.png" alt="Jerald Young, CEO of TrustLedgerLabs"
                    style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",filter:"grayscale(8%)",display:"block",transition:"transform .5s,filter .4s"}}
                    onMouseEnter={e=>{e.target.style.transform="scale(1.04)";e.target.style.filter="grayscale(0%)"}}
                    onMouseLeave={e=>{e.target.style.transform="scale(1)";e.target.style.filter="grayscale(8%)"}}/>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"1.75rem",background:"linear-gradient(to top,rgba(13,11,9,.95),transparent)",borderRadius:"0 0 22px 22px"}}>
                    <div style={{fontFamily:"var(--font-display)",fontSize:"1.65rem",fontWeight:700,color:"#f0ece4",marginBottom:4}}>Jerald Young</div>
                    <div style={{fontFamily:"var(--font-body)",fontSize:".68rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"var(--gold)"}}>Chief Executive Officer &amp; Co-Founder</div>
                  </div>
                </div>
                <div style={{position:"absolute",top:24,right:-10,width:3,height:70,background:"linear-gradient(to bottom,var(--gold),transparent)",borderRadius:4}}/>
              </div>
            </Reveal>
            <Reveal i={1}>
              <div>
                <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:16,padding:"2rem 2rem 2rem 2.5rem",marginBottom:"2rem",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:"linear-gradient(to bottom,var(--gold),transparent)"}}/>
                  <p style={{fontFamily:"var(--font-display)",fontSize:"1.2rem",fontStyle:"italic",lineHeight:1.6,color:"var(--tx)",fontWeight:600,marginBottom:".85rem"}}>
                    "We are not building software — we are engineering the governance layer for the next generation of institutional intelligence. Every contract we deploy, every model we ship, must be worthy of the trust placed in it."
                  </p>
                  <div style={{fontFamily:"var(--font-body)",fontSize:".68rem",color:"var(--tx2)",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase"}}>— Jerald Young, CEO &amp; Co-Founder</div>
                </div>
                <p className="t-body" style={{marginBottom:"1.25rem"}}>
                  Jerald Young is the founding Chief Executive Officer of TrustLedgerLabs, driving the company's strategic direction, product architecture, and global commercial expansion. With a career spanning enterprise software architecture, decentralised finance, and applied machine learning, he brings rare cross-disciplinary depth to the intersection of technology and institutional trust.
                </p>
                <p className="t-body" style={{marginBottom:"2rem"}}>
                  Before founding TrustLedgerLabs, Jerald served as principal adviser to Web3 ventures across Southeast Asia and architected AI-driven data infrastructure for financial institutions at scale. His leadership philosophy is anchored in <strong style={{color:"var(--tx)",fontWeight:600}}>radical accountability</strong> — the conviction that every system must be explainable, auditable, and designed to earn long-arc institutional trust.
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:"2rem"}}>
                  {["Visionary Executive","Systems Architect","Blockchain Strategist","AI Infrastructure","Web3 Pioneer","DeFi Engineering","Enterprise Leadership","Decentralised Finance"].map(kw=>(
                    <span key={kw} className="tag" style={{cursor:"default",transition:"all .2s"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--tx2)"}}>{kw}</span>
                  ))}
                </div>
                <a href="https://www.linkedin.com/in/jerald-young-a3a21b3/" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                  <Linkedin size={15}/>Connect on LinkedIn<ArrowUpRight size={13} style={{opacity:.6}}/>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{background:"var(--bg2)"}}>
        <div className="wrap sect">
          <Reveal style={{marginBottom:"3rem"}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Corporate History</div>
            <h2 className="t-h2">Our Journey to Date</h2>
          </Reveal>
          {timeline.map((item,i)=>(
            <motion.div key={i} variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-60px"}}
              style={{display:"grid",gridTemplateColumns:"96px 1fr",gap:"2.5rem",padding:"2.5rem 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"1.85rem",fontWeight:700,color:"var(--gold)",lineHeight:1,paddingTop:4}}>{item.year}</div>
              <div>
                <div style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,color:"var(--tx)",marginBottom:".5rem"}}>{item.title}</div>
                <div className="t-body">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CULTURE */}
      <section style={{background:"var(--bg3)"}}>
        <div className="wrap sect">
          <Reveal style={{marginBottom:"2.5rem"}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>How We Operate</div>
            <h2 className="t-h2">Operating Principles</h2>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.5rem",marginBottom:"4rem"}}>
            {culture.map((item,i)=>(
              <motion.div key={item.title} className="card-hover" variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-60px"}} style={{padding:"2rem"}}>
                <div style={{width:46,height:46,background:"var(--gold-bg)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem",color:"var(--gold)"}}>
                  <item.icon size={22}/>
                </div>
                <div style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,color:"var(--tx)",marginBottom:".6rem"}}>{item.title}</div>
                <div className="t-small">{item.desc}</div>
              </motion.div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem"}}>
            {["AI.png","Blockchain.png","Furturistic.png"].map(src=>(
              <img key={src} src={src} alt="" style={{borderRadius:16,height:220,width:"100%",objectFit:"cover",border:"1px solid var(--border)",transition:"transform .4s,box-shadow .4s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow="var(--shadow2)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none"}}/>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{background:"var(--tx)",padding:"6rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div className="tex-grid" style={{position:"absolute",inset:0,opacity:.25}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:640,margin:"0 auto"}}>
          <Reveal>
            <div className="t-eyebrow" style={{color:"var(--gold2)",marginBottom:"1rem"}}>Ready to Begin?</div>
            <h2 className="t-h2" style={{color:"var(--bg)",marginBottom:"1.25rem"}}>Let's Build Something That Endures</h2>
            <p className="t-body-lg" style={{color:"rgba(240,236,228,.6)",marginBottom:"2.5rem"}}>
              Whether you're architecting a blockchain protocol, deploying AI agents at enterprise scale, or navigating a complex digital transformation — we have the expertise and the track record to guide you.
            </p>
            <Link to="/contact" className="btn btn-gold" style={{fontSize:".92rem",padding:".9rem 2.2rem"}}>
              Engage TrustLedgerLabs <ArrowUpRight size={15}/>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
