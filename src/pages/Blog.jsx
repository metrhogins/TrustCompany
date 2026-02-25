import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts } from "@/data/posts";
import { ArrowUpRight } from "lucide-react";

const fv={hidden:{opacity:0,y:22},visible:(i=0)=>({opacity:1,y:0,transition:{duration:.5,delay:i*.08,ease:[.22,1,.36,1]}})};
export default function Blog(){
  const [featured,...rest]=posts;
  return(
    <div style={{background:"var(--bg)",color:"var(--tx)",minHeight:"100vh"}}>
      {/* Header */}
      <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)",padding:"5rem 2rem 4rem",position:"relative",overflow:"hidden"}}>
        <div className="tex-grid" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
        <div className="wrap" style={{position:"relative",zIndex:1}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Knowledge Hub</div>
            <h1 className="t-h1" style={{marginBottom:"1rem",maxWidth:640}}>Insights, Research &amp; <em style={{fontStyle:"italic",color:"var(--gold)"}}>Analysis</em></h1>
            <p className="t-body-lg" style={{maxWidth:540}}>Perspectives on AI infrastructure, blockchain protocol design, decentralised finance, and the future of enterprise technology from the TrustLedgerLabs team.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <div className="wrap" style={{paddingTop:"4rem",paddingBottom:"2rem"}}>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.1}}>
          <Link to={`/blog/${featured.slug}`} style={{textDecoration:"none",display:"block"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:22,overflow:"hidden",transition:"border-color .2s,box-shadow .3s"}} className="feat-c"
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.boxShadow="var(--shadow2)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.boxShadow="none"}}>
              <style>{`@media(max-width:768px){.feat-c{grid-template-columns:1fr!important}}`}</style>
              <img src={featured.cover} style={{height:"100%",minHeight:360,objectFit:"cover",width:"100%",display:"block"}} alt={featured.title}/>
              <div style={{padding:"3rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div className="badge" style={{marginBottom:"1.5rem",width:"fit-content"}}>✦ Featured Article</div>
                <div style={{fontFamily:"var(--font-display)",fontSize:"clamp(1.5rem,2.5vw,2.1rem)",fontWeight:700,color:"var(--tx)",lineHeight:1.18,marginBottom:"1rem"}}>{featured.title}</div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem"}}>
                  <img src={featured.avatar} style={{width:28,height:28,borderRadius:"50%",objectFit:"cover"}} alt={featured.author}/>
                  <span className="t-small">{featured.author}</span>
                  <span style={{color:"var(--tx3)"}}>·</span>
                  <span className="t-small">{new Date(featured.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                </div>
                <p className="t-body" style={{marginBottom:"2rem",flex:1}}>{featured.excerpt}</p>
                <div className="btn btn-dark" style={{width:"fit-content"}}>Read Article <ArrowUpRight size={13}/></div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="wrap" style={{paddingBottom:"6rem"}}>
        <div className="t-eyebrow" style={{marginBottom:"2rem"}}>All Articles — {rest.length} more</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.5rem"}}>
          {rest.map((p,i)=>(
            <motion.article key={p.id} className="card-hover" variants={fv} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-40px"}} style={{overflow:"hidden",display:"flex",flexDirection:"column"}}>
              <img src={p.thumb||p.cover} style={{height:190,objectFit:"cover",width:"100%",display:"block"}} alt={p.title}/>
              <div style={{padding:"1.5rem",flex:1,display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:".85rem"}}>
                  {(p.tags||[]).map(t=><span key={t} className="tag-gold" style={{fontSize:".62rem",letterSpacing:".1em",textTransform:"uppercase",fontWeight:700}}>{t}</span>)}
                </div>
                <div style={{fontFamily:"var(--font-display)",fontSize:"1.2rem",fontWeight:700,color:"var(--tx)",lineHeight:1.22,marginBottom:".75rem"}}>{p.title}</div>
                <p className="t-small" style={{flex:1,marginBottom:"1.25rem"}}>{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`} style={{display:"inline-flex",alignItems:"center",gap:5,fontFamily:"var(--font-body)",fontSize:".8rem",fontWeight:600,color:"var(--gold)",textDecoration:"none",transition:"opacity .15s"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity=".7"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  Read Article <ArrowUpRight size={13}/>
                </Link>
                <div style={{display:"flex",alignItems:"center",gap:8,paddingTop:"1rem",marginTop:"1rem",borderTop:"1px solid var(--border)"}}>
                  <img src={p.avatar} style={{width:24,height:24,borderRadius:"50%",objectFit:"cover"}} alt={p.author}/>
                  <span className="t-small">{p.author}</span>
                  <span style={{color:"var(--tx3)"}}>·</span>
                  <span className="t-small">{new Date(p.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
