import React from "react";
import { motion } from "framer-motion";
import { Users, Lightbulb, Workflow, Target, BarChart3, BookOpen, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
const fv={hidden:{opacity:0,y:22},visible:(i=0)=>({opacity:1,y:0,transition:{duration:.52,delay:i*.09,ease:[.22,1,.36,1]}})};
const services=[
  {icon:Users,c:"#b5894a",t:"Executive Advisory & Board Engagement",d:"Senior-level advisory to C-suite and Board stakeholders navigating AI adoption, blockchain strategy, and digital transformation. We translate deep technical expertise into clear strategic direction and defensible investment cases."},
  {icon:Lightbulb,c:"#6366f1",t:"Innovation Strategy & Technology Roadmapping",d:"Co-design of multi-year digital transformation roadmaps, identifying the highest-leverage intersection of your business model with emerging AI and blockchain capabilities — prioritised by commercial impact and technical feasibility."},
  {icon:Workflow,c:"#b5894a",t:"Systems Integration & Migration Planning",d:"Architecture-level planning for integrating AI inference pipelines and blockchain components into legacy enterprise stacks — including co-existence strategies, phased cut-over plans, and zero-downtime migration approaches."},
  {icon:Target,c:"#6366f1",t:"Use Case Discovery & Feasibility Assessment",d:"Structured discovery engagements to identify, evaluate, and prioritise AI and blockchain use cases — with commercial modelling, technical feasibility scoring, regulatory risk assessment, and a ranked opportunity matrix."},
  {icon:BarChart3,c:"#b5894a",t:"Performance Audit & Optimisation",d:"Independent technical audit of existing blockchain deployments and AI systems — assessing security posture, gas efficiency, model performance, data pipeline integrity, and alignment with current regulatory expectations."},
  {icon:BookOpen,c:"#6366f1",t:"Enterprise Training & Capability Building",d:"Structured programmes for engineering leads, product managers, and executive teams covering blockchain architecture, AI governance, responsible deployment practices, and the commercial frameworks governing emerging technology."},
];
const process=[
  {n:"01",t:"Discovery",d:"A structured 2–4 week discovery engagement to map your organisation's objectives, current technology landscape, regulatory context, and strategic priorities. Output: a current-state assessment and ranked opportunity matrix."},
  {n:"02",t:"Strategy",d:"Bespoke transformation roadmap with phased milestones, technology selections, build-vs-buy recommendations, risk register, and commercial modelling. Peer-reviewed by our technical leadership before delivery."},
  {n:"03",t:"Execution",d:"Hands-on delivery alongside your internal teams — with weekly steering, continuous risk management, and adaptive planning that responds to changing business conditions without losing strategic coherence."},
  {n:"04",t:"Optimisation",d:"Post-deployment review cycles measuring outcomes against objectives, identifying refinement opportunities, and establishing the governance cadence required to sustain performance as your systems mature and scale."},
];
export default function Consulting(){return(
  <div style={{background:"var(--bg)",color:"var(--tx)"}}>
    <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)",padding:"7rem 2rem 5rem",position:"relative",overflow:"hidden",textAlign:"center"}}>
      <div className="tex-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      <div style={{maxWidth:780,margin:"0 auto",position:"relative",zIndex:1}}>
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="badge" style={{marginBottom:"1.75rem"}}><Lightbulb size={11}/>Consulting Services</div>
          <h1 className="t-h1" style={{marginBottom:"1.25rem"}}>Strategic Advisory for <em style={{fontStyle:"italic",color:"var(--gold)"}}>Digital Transformation</em></h1>
          <p className="t-body-lg" style={{maxWidth:620,margin:"0 auto 2.5rem"}}>TrustLedgerLabs Consulting partners with enterprise leadership to navigate the complexity of AI and blockchain adoption — translating technological possibility into commercially rigorous transformation programmes with measurable outcomes.</p>
          <Link to="/schedule" className="btn btn-dark">Book a Discovery Session <ArrowUpRight size={14}/></Link>
        </motion.div>
      </div>
    </section>
    <section style={{background:"var(--bg)"}}>
      <div className="wrap sect">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginBottom:"3.5rem"}}>
          <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Advisory Services</div>
          <h2 className="t-h2">How We Engage</h2>
        </motion.div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"1.5rem"}}>
          {services.map((f,i)=>(
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
      <div className="wrap sect">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginBottom:"3.5rem"}}>
          <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Engagement Model</div>
          <h2 className="t-h2">How a Consulting Engagement Works</h2>
        </motion.div>
        <div className="grid-divider" style={{gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
          {process.map((p,i)=>(
            <motion.div key={p.n} variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true}}
              style={{background:"var(--bg2)",padding:"2.5rem",transition:"background .2s",cursor:"default"}}
              onMouseEnter={e=>e.currentTarget.style.background="var(--bg3)"}
              onMouseLeave={e=>e.currentTarget.style.background="var(--bg2)"}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"3rem",fontWeight:700,color:"rgba(181,137,74,.18)",lineHeight:1,marginBottom:".75rem"}}>{p.n}</div>
              <div style={{fontFamily:"var(--font-body)",fontSize:"1rem",fontWeight:600,color:"var(--tx)",marginBottom:".6rem"}}>{p.t}</div>
              <div className="t-small">{p.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <section style={{background:"var(--bg)",padding:"5.5rem 2rem",textAlign:"center"}}>
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
        <div className="t-eyebrow" style={{marginBottom:"1rem"}}>Begin the Engagement</div>
        <h2 className="t-h2" style={{marginBottom:"1.25rem"}}>Ready to Transform Your Enterprise?</h2>
        <p className="t-body-lg" style={{maxWidth:500,margin:"0 auto 2.5rem"}}>Schedule a complimentary 45-minute discovery call with our advisory team. No commitment — just a substantive conversation about what's genuinely possible for your organisation.</p>
        <Link to="/schedule" className="btn btn-dark" style={{padding:".85rem 2.2rem"}}>Schedule Your Discovery Call <ArrowUpRight size={14}/></Link>
      </motion.div>
    </section>
  </div>
);}
