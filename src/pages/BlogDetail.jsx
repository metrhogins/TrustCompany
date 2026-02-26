import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts } from "@/data/posts";
import { ArrowLeft, ExternalLink, BookOpen } from "lucide-react";

export default function BlogDetail(){
  const {slug}=useParams();
  const post=posts.find(p=>p.slug===slug);
  const related=posts.filter(p=>p.slug!==slug).slice(0,2);
  if(!post) return(
    <div style={{maxWidth:800,margin:"0 auto",padding:"5rem 2rem",color:"var(--tx)"}}>
      <p className="t-body">Post not found.</p>
      <Link to="/blog" style={{display:"inline-flex",alignItems:"center",gap:6,color:"var(--gold)",textDecoration:"none",fontWeight:600,marginTop:"1rem"}}><ArrowLeft size={15}/>Back to Insights</Link>
    </div>
  );
  return(
    <div style={{background:"var(--bg)",color:"var(--tx)"}}>
      <motion.img src={post.cover} alt={post.title} style={{width:"100%",height:420,objectFit:"cover",display:"block",filter:"brightness(.9)"}} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6}}/>
      <div style={{maxWidth:760,margin:"0 auto",padding:"3rem 2rem 6rem"}}>
        <Link to="/blog" style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"var(--font-body)",fontSize:".72rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"var(--gold)",textDecoration:"none",marginBottom:"2.5rem"}}>
          <ArrowLeft size={13}/>Back to Insights
        </Link>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:"1.25rem"}}>
          {(post.tags||[]).map(t=><span key={t} className="tag-gold" style={{fontSize:".62rem",letterSpacing:".1em",textTransform:"uppercase",fontWeight:700}}>{t}</span>)}
        </div>
        <motion.h1 className="t-h2" style={{marginBottom:"1.5rem"}} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}>{post.title}</motion.h1>
        <div style={{display:"flex",alignItems:"center",gap:12,paddingBottom:"2rem",borderBottom:"1px solid var(--border)",marginBottom:"2.5rem"}}>
          <div style={{width:42,height:42,borderRadius:10,background:"var(--gold-bg)",border:"1px solid var(--gold-bd)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <BookOpen size={18} style={{color:"var(--gold)"}}/>
          </div>
          <div>
            <div style={{fontFamily:"var(--font-body)",fontSize:".88rem",fontWeight:600,color:"var(--tx)"}}>{post.author}</div>
            <div className="t-small">{new Date(post.date).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
          </div>
        </div>
        <div className="prose">{post.content.map((para,i)=><p key={i}>{para}</p>)}</div>
        {post.images?.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1rem",marginTop:"2.5rem"}}>{post.images.map((src,i)=><img key={i} src={src} alt="" style={{borderRadius:12,width:"100%",height:220,objectFit:"cover",border:"1px solid var(--border)"}}/>)}</div>}
        {post.externalLinks?.length>0&&(
          <div style={{marginTop:"2.5rem",paddingTop:"2rem",borderTop:"1px solid var(--border)"}}>
            <div className="t-eyebrow" style={{marginBottom:"1rem"}}>References &amp; Further Reading</div>
            {post.externalLinks.map((l,i)=>(
              <a key={i} href={l.url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:6,fontFamily:"var(--font-body)",fontSize:".86rem",color:"var(--gold)",textDecoration:"none",fontWeight:500,marginBottom:".5rem"}}>
                <ExternalLink size={12}/>{l.label}
              </a>
            ))}
          </div>
        )}
      </div>
      {related.length>0&&(
        <div style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",padding:"4rem 2rem"}}>
          <div style={{maxWidth:1240,margin:"0 auto"}}>
            <div className="t-eyebrow" style={{marginBottom:".75rem"}}>Continue Reading</div>
            <h3 className="t-h3" style={{marginBottom:"2rem"}}>Related Articles</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
              {related.map(p=>(
                <Link key={p.id} to={`/blog/${p.slug}`} className="card-hover" style={{textDecoration:"none",overflow:"hidden"}}>
                  <img src={p.thumb||p.cover} style={{height:160,width:"100%",objectFit:"cover",display:"block"}} alt={p.title}/>
                  <div style={{padding:"1.25rem"}}>
                    <div style={{fontFamily:"var(--font-display)",fontSize:"1.1rem",fontWeight:700,color:"var(--tx)",lineHeight:1.25,marginBottom:".4rem"}}>{p.title}</div>
                    <div className="t-small" style={{display:"flex",alignItems:"center",gap:5}}><BookOpen size={11} style={{color:"var(--gold)"}}/>{p.author} · {new Date(p.date).toLocaleDateString("en-US",{month:"short",year:"numeric"})}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
