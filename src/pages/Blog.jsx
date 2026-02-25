import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { posts } from '@/data/posts';
import { ArrowUpRight, Calendar, User } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "var(--bg)", color: "var(--tx)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}
        .bl-hero{max-width:1200px;margin:0 auto;padding:5rem 2rem 3rem}
        .bl-lbl{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
        .bl-h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:700;color:var(--tx);line-height:1.1;margin-bottom:.5rem}
        .bl-sub{font-size:1rem;color:var(--tx2);font-weight:300;max-width:480px}
        .feat-card{display:grid;grid-template-columns:1fr 1fr;gap:0;background:var(--bg2);border:1px solid var(--border);border-radius:20px;overflow:hidden;max-width:1200px;margin:0 auto 4rem;transition:box-shadow .3s}
        .feat-card:hover{box-shadow:0 20px 60px rgba(0,0,0,.12)}
        @media(max-width:768px){.feat-card{grid-template-columns:1fr}}
        .feat-img{height:100%;min-height:360px;object-fit:cover;width:100%;display:block}
        .feat-body{padding:3rem;display:flex;flex-direction:column;justify-content:center}
        .feat-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.25);border-radius:100px;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:1.25rem;width:fit-content}
        .feat-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:700;color:var(--tx);line-height:1.2;margin-bottom:1rem}
        .feat-excerpt{font-size:.95rem;color:var(--tx2);line-height:1.8;font-weight:300;margin-bottom:1.75rem;flex:1}
        .feat-meta{display:flex;align-items:center;gap:10px;font-size:.82rem;color:var(--tx2);margin-bottom:1.5rem}
        .feat-meta img{width:28px;height:28px;border-radius:50%;object-fit:cover}
        .read-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:var(--tx);color:var(--bg);border-radius:10px;font-size:.85rem;font-weight:600;text-decoration:none;transition:opacity .2s,transform .2s;width:fit-content}
        .read-btn:hover{opacity:.82;transform:translateY(-1px)}
        .grid-section{max-width:1200px;margin:0 auto;padding:0 2rem 5rem}
        .grid-lbl{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--tx2);margin-bottom:2rem}
        .posts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem}
        .post-card{background:var(--bg2);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:border-color .2s,transform .3s,box-shadow .3s;display:flex;flex-direction:column}
        .post-card:hover{border-color:var(--gold);transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.1)}
        .post-img{height:180px;object-fit:cover;width:100%}
        .post-body{padding:1.5rem;flex:1;display:flex;flex-direction:column}
        .post-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:.75rem}
        .post-tag{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);background:rgba(200,169,110,.1);padding:3px 8px;border-radius:4px}
        .post-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.3rem;font-weight:700;color:var(--tx);line-height:1.3;margin-bottom:.75rem}
        .post-excerpt{font-size:.88rem;color:var(--tx2);line-height:1.7;font-weight:300;flex:1;margin-bottom:1.25rem}
        .post-meta{display:flex;align-items:center;gap:8px;font-size:.78rem;color:var(--tx2);padding-top:1rem;border-top:1px solid var(--border)}
        .post-meta img{width:24px;height:24px;border-radius:50%;object-fit:cover}
        .post-link{display:inline-flex;align-items:center;gap:4px;font-size:.82rem;font-weight:600;color:var(--gold);text-decoration:none;margin-top:.75rem}
        .post-link:hover{opacity:.75}
      `}</style>

      {/* Header */}
      <div className="bl-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <p className="bl-lbl">Knowledge Hub</p>
          <h1 className="bl-h1">Insights &amp; Articles</h1>
          <p className="bl-sub">Perspectives on AI, blockchain, and the future of decentralized intelligence.</p>
        </motion.div>
      </div>

      {/* Featured Post */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .1 }}>
          <Link to={`/blog/${featured.slug}`} style={{ textDecoration: "none" }}>
            <div className="feat-card">
              <img src={featured.cover} className="feat-img" alt={featured.title} />
              <div className="feat-body">
                <div className="feat-badge">✦ Featured</div>
                <div className="feat-title">{featured.title}</div>
                <div className="feat-meta">
                  <img src={featured.avatar} alt={featured.author} />
                  <span>{featured.author}</span>
                  <span style={{ opacity: .4 }}>·</span>
                  <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className="feat-excerpt">{featured.excerpt}</div>
                <div className="read-btn">Read Article <ArrowUpRight size={14} /></div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Rest of posts */}
      <div className="grid-section">
        <p className="grid-lbl">All Articles — {rest.length} posts</p>
        <div className="posts-grid">
          {rest.map((p, i) => (
            <motion.article key={p.id} className="post-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
              <img src={p.thumb || p.cover} className="post-img" alt={p.title} />
              <div className="post-body">
                <div className="post-tags">{(p.tags || []).map(t => <span key={t} className="post-tag">{t}</span>)}</div>
                <div className="post-title">{p.title}</div>
                <div className="post-excerpt">{p.excerpt}</div>
                <Link to={`/blog/${p.slug}`} className="post-link">Read more <ArrowUpRight size={13} /></Link>
                <div className="post-meta">
                  <img src={p.avatar} alt={p.author} />
                  <span>{p.author}</span>
                  <span style={{ opacity: .4 }}>·</span>
                  <span>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
