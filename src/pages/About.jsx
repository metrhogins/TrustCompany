import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Globe2, Cpu, Blocks, ShieldCheck, Server, Linkedin, ArrowUpRight, Star, Zap, Lock, Brain } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};
function Anim({ children, className = "", custom = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} custom={custom} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const techTags = [
  { icon: Cpu, text: "AI-Driven Automation" },
  { icon: Blocks, text: "Smart Contract Infrastructure" },
  { icon: ShieldCheck, text: "Zero-Trust Security" },
  { icon: Server, text: "Scalable Data Pipelines" },
  { icon: Globe2, text: "Decentralized Applications" },
];

const mvv = [
  { title: "Mission", text: "To empower organizations with transparent, automated decision-making through AI-driven blockchain solutions." },
  { title: "Vision", text: "To become a global catalyst where decentralized trust meets artificial intelligence — transforming industries." },
  { title: "Values", text: "Integrity, transparency, technical excellence, and relentless curiosity." },
];

const stats = [
  { value: "2024", label: "Year Founded" },
  { value: "10+", label: "Team Members" },
  { value: "500+", label: "Users Served" },
  { value: "99.99%", label: "System Reliability" },
];

const timeline = [
  { year: "2024", title: "Founded", desc: "TrustLedgerLabs was established with the mission to build secure, intelligent infrastructure powered by AI and blockchain." },
  { year: "2024", title: "MVP Development", desc: "Built the first version of our core platform, validating its architecture with early testers and industry advisors." },
  { year: "2025", title: "Early Adoption", desc: "Onboarded initial users and partnered with small businesses to deploy pilot integrations and refine real-world performance." },
];

export default function About() {
  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "var(--bg)", color: "var(--tx)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}
        .sg{font-family:'Cormorant Garamond',Georgia,serif}
        .s-lbl{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
        .s-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--tx);line-height:1.15;margin-bottom:1.25rem}
        .s-wrap{max-width:1200px;margin:0 auto;padding:5rem 2rem}
        .divider{height:1px;background:var(--border);max-width:1200px;margin:0 auto}
        .hero2{position:relative;overflow:hidden;padding:7rem 2rem 5rem;text-align:center;background:var(--bg2)}
        .hero2-inner{max-width:800px;margin:0 auto;position:relative;z-index:1}
        .h2-eye{display:inline-flex;align-items:center;gap:8px;font-size:.74rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(200,169,110,.3);padding:6px 18px;border-radius:100px;margin-bottom:2rem}
        .h2-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:700;line-height:1.05;color:var(--tx);margin-bottom:1.5rem}
        .h2-title em{font-style:italic;color:var(--gold)}
        .h2-sub{font-size:1.1rem;color:var(--tx2);max-width:620px;margin:0 auto 2.5rem;line-height:1.8;font-weight:300}
        .tags-wrap{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
        .tag-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;font-size:.8rem;color:var(--tx2);font-weight:500}
        .mvv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden}
        .mvv-card{background:var(--bg2);padding:2.5rem;transition:background .2s}
        .mvv-card:hover{background:var(--bg3)}
        .mvv-num{font-family:'Cormorant Garamond',Georgia,serif;font-size:3.5rem;font-weight:700;color:rgba(200,169,110,.2);line-height:1;margin-bottom:.5rem}
        .mvv-ttl{font-size:1.1rem;font-weight:600;color:var(--tx);margin-bottom:.75rem}
        .mvv-txt{font-size:.92rem;color:var(--tx2);line-height:1.75;font-weight:300}
        .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--border);border-radius:16px;overflow:hidden}
        @media(max-width:640px){.stats-row{grid-template-columns:repeat(2,1fr)}}
        .stat-box{background:var(--bg2);padding:2.5rem 1.5rem;text-align:center;border-right:1px solid var(--border);border-bottom:1px solid var(--border)}
        .stat-val{font-family:'Cormorant Garamond',Georgia,serif;font-size:2.8rem;font-weight:700;color:var(--gold);line-height:1;margin-bottom:.5rem}
        .stat-lbl{font-size:.8rem;color:var(--tx2);font-weight:500;letter-spacing:.06em;text-transform:uppercase}
        .tl-item{display:grid;grid-template-columns:90px 1fr;gap:2rem;padding:2.5rem 0;border-bottom:1px solid var(--border)}
        .tl-item:last-child{border-bottom:none}
        .tl-yr{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.8rem;font-weight:700;color:var(--gold);line-height:1;padding-top:4px}
        .tl-ttl{font-size:1.05rem;font-weight:600;color:var(--tx);margin-bottom:.4rem}
        .tl-desc{font-size:.92rem;color:var(--tx2);line-height:1.75;font-weight:300}
        @media(max-width:500px){.tl-item{grid-template-columns:1fr;gap:.5rem}}
      `}</style>

      {/* Hero */}
      <section className="hero2">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(135deg, rgba(200,169,110,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,.04) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div className="hero2-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="h2-eye"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />Est. 2024 · Singapore</div>
            <h1 className="h2-title">The Company Behind <em>Trusted</em> Intelligence</h1>
            <p className="h2-sub">TrustLedgerLabs builds modern infrastructure at the intersection of Artificial Intelligence and Blockchain. Since 2024, delivering trust, intelligence, and scalability to businesses worldwide.</p>
            <div className="tags-wrap">{techTags.map(t => <span key={t.text} className="tag-pill"><t.icon size={13} style={{ color: "var(--gold)" }} />{t.text}</span>)}</div>
          </motion.div>
        </div>
      </section>
      <div className="divider" />

      {/* Mission/Vision/Values */}
      <section style={{ background: "var(--bg)" }}>
        <div className="s-wrap">
          <Anim><p className="s-lbl">Our Foundation</p><h2 className="s-title" style={{ marginBottom: "2.5rem" }}>Mission, Vision &amp; Values</h2></Anim>
          <div className="mvv-grid">
            {mvv.map((item, i) => (
              <motion.div key={item.title} className="mvv-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
                <div className="mvv-num">0{i + 1}</div>
                <div className="mvv-ttl">{item.title}</div>
                <div className="mvv-txt">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* Stats */}
      <section style={{ background: "var(--bg2)" }}>
        <div className="s-wrap">
          <Anim><p className="s-lbl" style={{ textAlign: "center" }}>By The Numbers</p><h2 className="s-title" style={{ textAlign: "center", marginBottom: "3rem" }}>Company at a Glance</h2></Anim>
          <div className="stats-row">
            {stats.map((s, i) => (
              <motion.div key={s.label} className="stat-box" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />

      {/* Timeline */}
      <section style={{ background: "var(--bg3)" }}>
        <div className="s-wrap">
          <Anim><p className="s-lbl">History</p><h2 className="s-title" style={{ marginBottom: "3rem" }}>Our Journey</h2></Anim>
          {timeline.map((item, i) => (
            <motion.div key={i} className="tl-item" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <div className="tl-yr">{item.year}</div>
              <div><div className="tl-ttl">{item.title}</div><div className="tl-desc">{item.desc}</div></div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
