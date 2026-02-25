import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { posts } from '@/data/posts';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const related = posts.filter(p => p.slug !== slug).slice(0, 2);

  if (!post) return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 2rem", fontFamily: "'DM Sans',sans-serif", color: "var(--tx)" }}>
      <p style={{ color: "var(--tx2)" }}>Post not found.</p>
      <Link to="/blog" style={{ color: "var(--gold)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginTop: "1rem", fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to Blog
      </Link>
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "var(--bg)", color: "var(--tx)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}
        .bd-cover{width:100%;height:420px;object-fit:cover;display:block;filter:brightness(.92)}
        .bd-inner{max-width:760px;margin:0 auto;padding:3rem 2rem 6rem}
        .bd-back{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;font-weight:600;color:var(--gold);text-decoration:none;margin-bottom:2.5rem;letter-spacing:.04em;text-transform:uppercase;font-size:.72rem}
        .bd-back:hover{opacity:.7}
        .bd-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:1.25rem}
        .bd-tag{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.25);padding:4px 10px;border-radius:4px}
        .bd-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--tx);line-height:1.15;margin-bottom:1.5rem}
        .bd-meta{display:flex;align-items:center;gap:10px;font-size:.85rem;color:var(--tx2);padding-bottom:2rem;border-bottom:1px solid var(--border);margin-bottom:2.5rem}
        .bd-meta img{width:36px;height:36px;border-radius:50%;object-fit:cover}
        .bd-content p{font-size:1.05rem;color:var(--tx2);line-height:1.9;font-weight:300;margin-bottom:1.5rem}
        .bd-imgs{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin:2.5rem 0}
        .bd-imgs img{border-radius:12px;width:100%;height:220px;object-fit:cover;border:1px solid var(--border)}
        .bd-refs{margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border)}
        .bd-refs-title{font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--tx2);margin-bottom:1rem}
        .bd-ref-link{display:inline-flex;align-items:center;gap:6px;font-size:.88rem;color:var(--gold);text-decoration:none;font-weight:500;margin-bottom:.5rem;display:flex}
        .bd-ref-link:hover{opacity:.7}
        .related-sect{background:var(--bg2);border-top:1px solid var(--border);padding:4rem 2rem}
        .related-inner{max-width:1200px;margin:0 auto}
        .related-lbl{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
        .related-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:700;color:var(--tx);margin-bottom:2rem}
        .related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
        .rel-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;text-decoration:none;display:block;transition:border-color .2s,transform .25s}
        .rel-card:hover{border-color:var(--gold);transform:translateY(-3px)}
        .rel-img{height:160px;width:100%;object-fit:cover}
        .rel-body{padding:1.25rem}
        .rel-ttl{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;font-weight:700;color:var(--tx);line-height:1.3;margin-bottom:.4rem}
        .rel-auth{font-size:.78rem;color:var(--tx2);font-weight:400}
      `}</style>

      <motion.img src={post.cover} alt={post.title} className="bd-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }} />

      <div className="bd-inner">
        <Link to="/blog" className="bd-back"><ArrowLeft size={14} /> Back to Blog</Link>
        <div className="bd-tags">{(post.tags || []).map(t => <span key={t} className="bd-tag">{t}</span>)}</div>
        <motion.h1 className="bd-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>{post.title}</motion.h1>
        <div className="bd-meta">
          <img src={post.avatar} alt={post.author} />
          <div>
            <div style={{ fontWeight: 600, color: "var(--tx)", fontSize: ".9rem" }}>{post.author}</div>
            <div style={{ fontSize: ".78rem", marginTop: 1 }}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
          </div>
        </div>
        <div className="bd-content">
          {post.content.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        {post.images?.length > 0 && <div className="bd-imgs">{post.images.map((src, i) => <img key={i} src={src} alt="" />)}</div>}
        {post.externalLinks?.length > 0 && (
          <div className="bd-refs">
            <div className="bd-refs-title">References &amp; Further Reading</div>
            {post.externalLinks.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer" className="bd-ref-link">
                <ExternalLink size={13} />{l.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="related-sect">
          <div className="related-inner">
            <p className="related-lbl">Continue Reading</p>
            <h2 className="related-title">Related Articles</h2>
            <div className="related-grid">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="rel-card">
                  <img src={p.thumb || p.cover} className="rel-img" alt={p.title} />
                  <div className="rel-body">
                    <div className="rel-ttl">{p.title}</div>
                    <div className="rel-auth">{p.author} · {new Date(p.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
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
