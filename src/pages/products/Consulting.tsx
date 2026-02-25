import React from "react";
import { motion } from "framer-motion";
import { Users, Lightbulb, Workflow, ArrowUpRight, Target, BarChart3, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

const features = [
  { icon: Users, title: "Enterprise Advisory", desc: "From ideation to deployment, we guide enterprises through every stage of their AI and blockchain transformation journey.", color: "#c8a96e" },
  { icon: Lightbulb, title: "Innovation Strategy", desc: "Co-create next-generation products and services powered by decentralized intelligence and AI-driven automation.", color: "#6366f1" },
  { icon: Workflow, title: "Integration Support", desc: "Seamlessly integrate AI and blockchain stacks into your existing systems with minimal disruption and maximum impact.", color: "#00d4aa" },
  { icon: Target, title: "Digital Roadmapping", desc: "Define a clear, prioritized path to digital transformation aligned with your business goals and market position.", color: "#c8a96e" },
  { icon: BarChart3, title: "Performance Optimization", desc: "Audit and optimize existing blockchain and AI deployments for cost-efficiency, speed, and reliability.", color: "#6366f1" },
  { icon: BookOpen, title: "Team Training", desc: "Upskill your engineering and leadership teams on emerging Web3, AI, and decentralized system architectures.", color: "#00d4aa" },
];

const process = [
  { step: "01", title: "Discovery", desc: "Deep-dive into your business objectives, existing systems, and market landscape." },
  { step: "02", title: "Strategy", desc: "Define a bespoke roadmap with clear milestones, technology choices, and success metrics." },
  { step: "03", title: "Build", desc: "Execute with our expert engineering teams or alongside your internal developers." },
  { step: "04", title: "Scale", desc: "Optimize, monitor, and evolve your systems as your business grows." },
];

export default function Consulting() {
  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "var(--bg)", color: "var(--tx)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}
        .prod-hero{position:relative;overflow:hidden;padding:7rem 2rem 5rem;text-align:center;background:var(--bg2)}
        .prod-inner{max-width:760px;margin:0 auto;position:relative;z-index:1}
        .prod-eye{display:inline-flex;align-items:center;gap:8px;font-size:.72rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(200,169,110,.3);padding:6px 16px;border-radius:100px;margin-bottom:1.5rem}
        .prod-h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:700;color:var(--tx);line-height:1.1;margin-bottom:1.25rem}
        .prod-h1 em{font-style:italic;color:var(--gold)}
        .prod-sub{font-size:1.05rem;color:var(--tx2);font-weight:300;line-height:1.8;margin-bottom:2.5rem}
        .prod-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;background:var(--tx);color:var(--bg);border-radius:12px;font-size:.9rem;font-weight:600;text-decoration:none;transition:opacity .2s,transform .2s}
        .prod-cta:hover{opacity:.82;transform:translateY(-2px)}
        .feat-section{max-width:1200px;margin:0 auto;padding:5rem 2rem}
        .feat-lbl{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
        .feat-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3vw,2.8rem);font-weight:700;color:var(--tx);margin-bottom:3rem}
        .feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem}
        .feat-card{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:2rem;transition:border-color .2s,transform .25s}
        .feat-card:hover{border-color:var(--gold);transform:translateY(-4px)}
        .feat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem}
        .feat-ttl{font-size:1.05rem;font-weight:600;color:var(--tx);margin-bottom:.6rem}
        .feat-desc{font-size:.9rem;color:var(--tx2);line-height:1.75;font-weight:300}
        .divider{height:1px;background:var(--border);max-width:1200px;margin:0 auto}
        .process-section{background:var(--bg3);padding:5rem 2rem}
        .process-inner{max-width:1200px;margin:0 auto}
        .process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden;margin-top:2.5rem}
        .process-card{background:var(--bg2);padding:2rem;transition:background .2s}
        .process-card:hover{background:var(--bg)}
        .process-step{font-family:'Cormorant Garamond',Georgia,serif;font-size:3rem;font-weight:700;color:rgba(200,169,110,.25);line-height:1;margin-bottom:.75rem}
        .process-ttl{font-size:1rem;font-weight:600;color:var(--tx);margin-bottom:.5rem}
        .process-desc{font-size:.88rem;color:var(--tx2);line-height:1.7;font-weight:300}
        .cta-section{background:var(--bg);border-top:1px solid var(--border);padding:5rem 2rem;text-align:center}
        .cta-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--tx);margin-bottom:1rem}
        .cta-sub{font-size:1rem;color:var(--tx2);font-weight:300;max-width:500px;margin:0 auto 2.5rem}
      `}</style>

      <section className="prod-hero">
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,169,110,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,.04) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div className="prod-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <div className="prod-eye"><Lightbulb size={12} /> Consulting Services</div>
            <h1 className="prod-h1">Strategic Guidance for <em>Digital Transformation</em></h1>
            <p className="prod-sub">Expert consulting for blockchain and AI adoption, tailored to your industry's challenges and calibrated to deliver measurable outcomes.</p>
            <Link to="/contact" className="prod-cta">Book a Session <ArrowUpRight size={16} /></Link>
          </motion.div>
        </div>
      </section>
      <div className="divider" />

      <section className="feat-section">
        <p className="feat-lbl">What We Offer</p>
        <h2 className="feat-title">Consulting Services</h2>
        <div className="feat-grid">
          {features.map((f, i) => (
            <motion.div key={f.title} className="feat-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
              <div className="feat-icon" style={{ background: f.color + "18" }}><f.icon size={22} style={{ color: f.color }} /></div>
              <div className="feat-ttl">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>
      <div className="divider" />

      <section className="process-section">
        <div className="process-inner">
          <p className="feat-lbl">How It Works</p>
          <h2 className="feat-title" style={{ marginBottom: 0 }}>Our Engagement Process</h2>
          <div className="process-grid">
            {process.map((p, i) => (
              <motion.div key={p.step} className="process-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="process-step">{p.step}</div>
                <div className="process-ttl">{p.title}</div>
                <div className="process-desc">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
          <h2 className="cta-title">Ready to Transform Your Business?</h2>
          <p className="cta-sub">Let's schedule a discovery call and explore how TrustLedgerLabs can accelerate your vision.</p>
          <Link to="/contact" className="prod-cta">Book a Consulting Session <ArrowUpRight size={16} /></Link>
        </motion.div>
      </section>
    </div>
  );
}
