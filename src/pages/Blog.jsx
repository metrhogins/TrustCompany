import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { posts } from "@/data/posts";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";

const fv = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] } })
};

// Reading time estimate
function readTime(post) {
  const words = post.content.join(" ").split(" ").length;
  return Math.max(3, Math.ceil(words / 220));
}

// Tag accent colours cycle
const tagColors = ["#b5894a", "#6366f1", "#0ea5e9", "#10b981"];

export default function Blog() {
  const [featured, ...rest] = posts;
  const [activeTag, setActiveTag] = useState(null);
  const allTags = [...new Set(posts.flatMap(p => p.tags))];
  const filtered = activeTag ? rest.filter(p => p.tags.includes(activeTag)) : rest;

  return (
    <div style={{ background: "var(--bg)", color: "var(--tx)", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <section style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "6rem 2rem 4.5rem", position: "relative", overflow: "hidden" }}>
        <div className="tex-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="badge" style={{ marginBottom: "1.5rem", color: "var(--gold)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
              Insights &amp; Research
            </div>
            <h1 className="t-h1" style={{ marginBottom: "1rem", maxWidth: 660 }}>
              Perspectives on AI, Blockchain &amp;{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Institutional Trust</em>
            </h1>
            <p className="t-body-lg" style={{ maxWidth: 560, color: "var(--tx2)" }}>
              Original analysis from the TrustLedgerLabs team — on the architecture, regulation, and commercial reality of enterprise-grade AI and blockchain infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <div className="wrap" style={{ paddingTop: "4rem", paddingBottom: "2.5rem" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <Link to={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", transition: "border-color .2s, box-shadow .3s" }}
              className="feat-c"
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.boxShadow = "var(--shadow2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <style>{`@media(max-width:768px){.feat-c{grid-template-columns:1fr!important}}`}</style>

              {/* Image with overlay label */}
              <div style={{ position: "relative", minHeight: 380, overflow: "hidden" }}>
                <img
                  src={featured.cover}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s ease" }}
                  alt={featured.title}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,11,9,.55) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: 20, left: 20 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "rgba(181,137,74,.9)", borderRadius: 6, fontFamily: "var(--font-body)", fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff" }}>
                    ✦ Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "3rem 2.75rem", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {featured.tags.map((t, i) => (
                    <span key={t} style={{ padding: "3px 10px", background: tagColors[i % tagColors.length] + "18", border: `1px solid ${tagColors[i % tagColors.length]}40`, borderRadius: 5, fontFamily: "var(--font-body)", fontSize: ".65rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: tagColors[i % tagColors.length] }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.45rem, 2.2vw, 2rem)", fontWeight: 700, color: "var(--tx)", lineHeight: 1.2 }}>
                  {featured.title}
                </div>
                <p className="t-body" style={{ color: "var(--tx2)", lineHeight: 1.7 }}>{featured.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--gold-bg)", border: "1px solid var(--gold-bd)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BookOpen size={16} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: ".83rem", fontWeight: 600, color: "var(--tx)" }}>{featured.author}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: ".73rem", color: "var(--tx3)" }}>
                      <span>{new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>·</span>
                      <Clock size={11} />
                      <span>{readTime(featured)} min read</span>
                    </div>
                  </div>
                  <div className="btn btn-dark" style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>Read Article <ArrowUpRight size={13} /></div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ── TAG FILTER ── */}
      <div className="wrap" style={{ paddingBottom: "1.75rem" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--tx3)", marginRight: 4 }}>Filter:</span>
          <button
            onClick={() => setActiveTag(null)}
            style={{ padding: "5px 14px", borderRadius: 7, border: `1px solid ${!activeTag ? "var(--gold)" : "var(--border)"}`, background: !activeTag ? "var(--gold-bg)" : "transparent", fontFamily: "var(--font-body)", fontSize: ".74rem", fontWeight: 600, color: !activeTag ? "var(--gold)" : "var(--tx2)", cursor: "pointer", transition: "all .15s" }}
          >
            All
          </button>
          {allTags.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
              style={{ padding: "5px 14px", borderRadius: 7, border: `1px solid ${activeTag === t ? tagColors[i % tagColors.length] : "var(--border)"}`, background: activeTag === t ? tagColors[i % tagColors.length] + "15" : "transparent", fontFamily: "var(--font-body)", fontSize: ".74rem", fontWeight: 600, color: activeTag === t ? tagColors[i % tagColors.length] : "var(--tx2)", cursor: "pointer", transition: "all .15s" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="wrap" style={{ paddingBottom: "6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((p, i) => (
            <motion.article
              key={p.id}
              className="card-hover"
              variants={fv}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              {/* Card image with hover zoom */}
              <Link to={`/blog/${p.slug}`} style={{ display: "block", overflow: "hidden", position: "relative", height: 200 }}>
                <img
                  src={p.thumb || p.cover}
                  style={{ height: "100%", objectFit: "cover", width: "100%", display: "block", transition: "transform .45s ease" }}
                  alt={p.title}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
                {/* Reading time pill */}
                <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "rgba(13,11,9,.72)", backdropFilter: "blur(6px)", borderRadius: 6, fontFamily: "var(--font-body)", fontSize: ".68rem", fontWeight: 600, color: "rgba(240,236,228,.85)" }}>
                  <Clock size={10} />
                  {readTime(p)} min
                </div>
              </Link>

              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Tags */}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: "0.85rem" }}>
                  {p.tags.map((t, ti) => (
                    <span key={t} style={{ padding: "2px 9px", background: tagColors[ti % tagColors.length] + "14", border: `1px solid ${tagColors[ti % tagColors.length]}35`, borderRadius: 4, fontFamily: "var(--font-body)", fontSize: ".61rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: tagColors[ti % tagColors.length] }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <Link to={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.18rem", fontWeight: 700, color: "var(--tx)", lineHeight: 1.22, marginBottom: "0.7rem", transition: "color .15s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--tx)"}
                  >
                    {p.title}
                  </div>
                </Link>

                <p className="t-small" style={{ flex: 1, marginBottom: "1.25rem", lineHeight: 1.7, color: "var(--tx2)" }}>{p.excerpt}</p>

                {/* Footer */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: "1rem", marginTop: "auto", borderTop: "1px solid var(--border)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--gold-bg)", border: "1px solid var(--gold-bd)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <BookOpen size={13} style={{ color: "var(--gold)" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: ".78rem", fontWeight: 600, color: "var(--tx)" }}>{p.author}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: ".7rem", color: "var(--tx3)" }}>
                      {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <Link to={`/blog/${p.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-body)", fontSize: ".76rem", fontWeight: 600, color: "var(--gold)", textDecoration: "none", transition: "opacity .15s", flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Read <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--tx3)" }}>
            <p className="t-body">No articles match this filter.</p>
            <button onClick={() => setActiveTag(null)} style={{ marginTop: "1rem", padding: "8px 20px", borderRadius: 8, border: "1px solid var(--border)", background: "transparent", color: "var(--gold)", fontFamily: "var(--font-body)", fontSize: ".84rem", fontWeight: 600, cursor: "pointer" }}>
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "5rem 2rem", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="t-eyebrow" style={{ marginBottom: "1rem" }}>Talk to the Team</div>
          <h2 className="t-h2" style={{ marginBottom: "1.25rem" }}>Ready to Move From Insight to Infrastructure?</h2>
          <p className="t-body-lg" style={{ maxWidth: 460, margin: "0 auto 2.25rem", color: "var(--tx2)" }}>
            The analysis above reflects problems we solve for enterprises every day. Schedule a complimentary discovery call and let's explore what applies to your organisation.
          </p>
          <Link to="/schedule" className="btn btn-gold">
            Schedule a Discovery Call <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
