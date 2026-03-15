import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, LineChart, Database, Eye, Bot, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
const fv={hidden:{opacity:0,y:22},visible:(i=0)=>({opacity:1,y:0,transition:{duration:.52,delay:i*.09,ease:[.22,1,.36,1]}})};
const features=[
  {icon:Bot,c:"#b5894a",t:"Autonomous AI Agent Deployment",d:"Design and deployment of production AI agents that orchestrate multi-step enterprise workflows — from document processing and compliance screening to supply chain exception handling and financial reconciliation — with full on-chain audit logging."},
  {icon:Brain,c:"#6366f1",t:"Cognitive Intelligence Systems",d:"Custom NLP pipelines, retrieval-augmented generation architectures, and computer vision systems fine-tuned on proprietary enterprise data. Built to the accuracy and reliability thresholds that regulated industries demand in production environments."},
  {icon:LineChart,c:"#b5894a",t:"Predictive Analytics & Forecasting",d:"Time-series forecasting, anomaly detection, and decision intelligence systems that transform raw operational data into forward-looking signals — enabling faster, higher-confidence decisions at every layer of the enterprise."},
  {icon:Database,c:"#6366f1",t:"ML Infrastructure & MLOps",d:"End-to-end machine learning infrastructure: feature stores, model registries, CI/CD pipelines for model releases, A/B testing frameworks, and automated retraining triggers. From proof-of-concept to production in weeks."},
  {icon:Eye,c:"#b5894a",t:"AI Observability & Governance",d:"Real-time monitoring for model drift, data quality degradation, output fairness metrics and latency SLAs. Governance dashboards give compliance and risk teams the visibility they need without slowing engineering velocity."},
  {icon:Cpu,c:"#6366f1",t:"On-Chain AI & Verifiable Inference",d:"A uniquely TrustLedgerLabs capability: AI inference pipelines anchored to blockchain attestation systems, enabling verifiable, tamper-proof records of every model decision — meeting the emerging regulatory standard for explainable AI in regulated sectors."},
];
const useCases=["Automated Compliance Screening","Fraud Detection & Prevention","Document Intelligence","Predictive Maintenance","Customer Intent Classification","On-Chain Risk Scoring"];
export default function AI(){return(
  <div style={{background:"var(--bg)",color:"var(--tx)"}}>
    <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)",padding:"7rem 2rem 5rem",position:"relative",overflow:"hidden",textAlign:"center"}}>
      <div className="tex-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
      <div style={{maxWidth:780,margin:"0 auto",position:"relative",zIndex:1}}>
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="badge" style={{marginBottom:"1.75rem"}}><Brain size={11}/>AI Platform</div>
          <h1 className="t-h1" style={{marginBottom:"1.25rem"}}>Enterprise <em style={{fontStyle:"italic",color:"var(--gold)"}}>Artificial Intelligence</em> at Production Scale</h1>
          <p className="t-body-lg" style={{maxWidth:620,margin:"0 auto 2.5rem"}}>We build the AI systems that enterprises trust for mission-critical decisions — combining rigorous ML engineering, verifiable inference architectures, and on-chain accountability to deliver automation that institutions can confidently deploy.</p>
          <Link to="/contact" className="btn btn-dark">Explore AI Solutions <ArrowUpRight size={14}/></Link>
        </motion.div>
      </div>
    </section>
    <section style={{background:"var(--bg)"}}>
      <div className="wrap sect">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} style={{marginBottom:"3.5rem"}}>
          <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Platform Capabilities</div>
          <h2 className="t-h2">What Our AI Platform Delivers</h2>
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
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center"}} className="uc-g2">
          <style>{`@media(max-width:768px){.uc-g2{grid-template-columns:1fr!important}}`}</style>
          <motion.div initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.6}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Applied AI</div>
            <h2 className="t-h2" style={{marginBottom:"1.25rem"}}>Use Cases We've Shipped</h2>
            <p className="t-body">Our AI engagements span regulated sectors where accuracy, explainability, and compliance are as important as performance benchmarks.</p>
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
        <div className="t-eyebrow" style={{marginBottom:"1rem"}}>Deploy With Confidence</div>
        <h2 className="t-h2" style={{marginBottom:"1.25rem"}}>Ready to Deploy AI at Enterprise Scale?</h2>
        <p className="t-body-lg" style={{maxWidth:480,margin:"0 auto 2.5rem"}}>Let's define your AI roadmap — from architecture design and model selection to MLOps infrastructure and governance framework.</p>
        <Link to="/schedule" className="btn btn-dark" style={{padding:".85rem 2.2rem"}}>Schedule a Technical Discovery <ArrowUpRight size={14}/></Link>
      </motion.div>
    </section>
  </div>
);}
