import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/Toast";
import ReCAPTCHA from "react-google-recaptcha";
import { Mail, MapPin, Linkedin, Github, ArrowUpRight, Clock } from "lucide-react";

const RECAPTCHA_SITE_KEY="6LcZH3csAAAAAF6AuZyr80tp14pdazg_O-AsUZHH";
const LBL=({children})=><label className="field-label">{children}</label>;

export default function Contact(){
  const {push}=useToast();
  const [token,setToken]=useState(null);
  const [loading,setLoading]=useState(false);
  const [form,setForm]=useState({name:"",email:"",company:"",role:"",message:""});
  const hc=e=>setForm(p=>({...p,[e.target.name]:e.target.value}));
  const sub=async e=>{
    e.preventDefault(); if(!token) return; setLoading(true);
    try{push("Enquiry submitted. We'll respond within one business day.");setForm({name:"",email:"",company:"",role:"",message:""});setToken(null);}
    catch{push("Submission failed. Please try again.");}
    finally{setLoading(false);}
  };
  return(
    <div style={{background:"var(--bg)",color:"var(--tx)",minHeight:"100vh"}}>
      {/* Hero strip */}
      <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)",padding:"5rem 2rem 4rem",position:"relative",overflow:"hidden"}}>
        <div className="tex-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
        <div className="wrap" style={{position:"relative",zIndex:1}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Get In Touch</div>
            <h1 className="t-h1" style={{marginBottom:"1.25rem",maxWidth:660}}>Let's Build Something <em style={{fontStyle:"italic",color:"var(--gold)"}}>Extraordinary</em> Together</h1>
            <p className="t-body-lg" style={{maxWidth:560}}>Whether you're exploring a new blockchain protocol, deploying AI automation at scale, or navigating a complex digital transformation — share your challenge and we will respond with substance.</p>
          </motion.div>
        </div>
      </section>

      <div className="wrap" style={{padding:"5rem 2rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:"5rem",alignItems:"start"}} className="ct-g">
          <style>{`@media(max-width:800px){.ct-g{grid-template-columns:1fr!important;gap:3rem!important}}`}</style>

          {/* Left */}
          <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.6}}>
            <div className="accent-bar"/>
            <div style={{display:"flex",flexDirection:"column",gap:"1.75rem",marginBottom:"3rem"}}>
              {[{icon:MapPin,l:"Headquarters",v:"Singapore"},{icon:Mail,l:"General Enquiries",v:"hello@trustledgerlabs.com"},{icon:Clock,l:"Response Time",v:"Within one business day"}].map(({icon:Icon,l,v})=>(
                <div key={l} style={{display:"flex",alignItems:"flex-start",gap:"1rem"}}>
                  <div style={{width:42,height:42,borderRadius:11,background:"var(--gold-bg)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gold)",flexShrink:0}}><Icon size={18}/></div>
                  <div><div className="field-label" style={{marginBottom:3}}>{l}</div><div style={{fontFamily:"var(--font-body)",fontSize:".93rem",color:"var(--tx)",fontWeight:500}}>{v}</div></div>
                </div>
              ))}
            </div>
            <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:16,padding:"2rem"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"1.1rem",fontWeight:700,color:"var(--tx)",marginBottom:".75rem"}}>Follow Our Work</div>
              <p className="t-small" style={{marginBottom:"1.25rem"}}>Research updates, product announcements, and thought leadership on AI infrastructure and blockchain protocol design.</p>
              <div style={{display:"flex",gap:"0.5rem"}}>
                {[{href:"https://www.linkedin.com/company/trustledgerlabs",I:Linkedin,l:"LinkedIn"},{href:"https://github.com/orgs/TrustLedgerLabs/",I:Github,l:"GitHub"}].map(({href,I,l})=>(
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid var(--border)",borderRadius:9,fontFamily:"var(--font-body)",fontSize:".78rem",color:"var(--tx2)",textDecoration:"none",fontWeight:500,transition:"all .2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--tx2)"}}>
                    <I size={14}/>{l}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:.6,delay:.1}}>
            <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:22,padding:"2.75rem",boxShadow:"var(--shadow)"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"1.5rem",fontWeight:700,color:"var(--tx)",marginBottom:".4rem"}}>Send Us a Message</div>
              <p className="t-small" style={{marginBottom:"2rem"}}>All enquiries are reviewed by our advisory team. We respond within one business day.</p>
              <form onSubmit={sub}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
                  <div><LBL>Full Name *</LBL><input name="name" value={form.name} onChange={hc} required placeholder="Jane Smith" className="inp"/></div>
                  <div><LBL>Email Address *</LBL><input name="email" type="email" value={form.email} onChange={hc} required placeholder="jane@company.com" className="inp"/></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
                  <div><LBL>Organisation</LBL><input name="company" value={form.company} onChange={hc} placeholder="Company name" className="inp"/></div>
                  <div><LBL>Your Role</LBL><input name="role" value={form.role} onChange={hc} placeholder="e.g. CTO, Head of Engineering" className="inp"/></div>
                </div>
                <div style={{marginBottom:"1.5rem"}}><LBL>How Can We Help? *</LBL><textarea name="message" value={form.message} onChange={hc} required rows={5} placeholder="Describe your project, challenge, or enquiry. The more context you provide, the more substantive our response." className="inp" style={{resize:"vertical",minHeight:130}}/></div>
                <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={v=>setToken(v)}/>
                <button type="submit" disabled={!token||loading} className="btn btn-dark" style={{width:"100%",justifyContent:"center",marginTop:"1.25rem",padding:".9rem",fontSize:".9rem",opacity:(!token||loading)?.4:1,cursor:(!token||loading)?"not-allowed":"pointer"}}>
                  {loading?"Sending…":<><span>Submit Enquiry</span><ArrowUpRight size={14}/></>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
