import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck, Users, Globe2, Cpu, Blocks, BarChart2,
  Linkedin, ArrowUpRight, Star, Zap, Lock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const stats = [
  { icon: ShieldCheck, value: "500+",   label: "Users Served",  color: "#00d4aa" },
  { icon: Globe2,      value: "20+",    label: "Deployments",   color: "#6366f1" },
  { icon: Users,       value: "70+",    label: "Specialists",   color: "#00d4aa" },
  { icon: BarChart2,   value: "99.99%", label: "Uptime",        color: "#6366f1" },
];

const timeline = [
  { year: "2024", title: "Founded",                   desc: "TrustLedgerLabs was established with the goal of merging AI and decentralized digital systems." },
  { year: "2025", title: "First Enterprise Deployment", desc: "Launched our first enterprise-grade AI automation model and blockchain analytics pipeline." },
  { year: "2026", title: "Global Expansion",           desc: "Expanded our team and infrastructure to support clients across multiple regions." },
];

const culture = [
  { icon: Zap,   title: "Innovation",    desc: "Pushing boundaries in AI, cryptography, and distributed systems." },
  { icon: Star,  title: "Ethics",        desc: "We prioritize fairness, transparency, and responsible innovation." },
  { icon: Users, title: "Collaboration", desc: "Global teamwork drives solutions that scale and endure." },
  { icon: Lock,  title: "Sustainability",desc: "Building energy-conscious, future-proof decentralized systems." },
];

const techTags = [
  { icon: Cpu,        text: "AI-Driven Automation" },
  { icon: Blocks,     text: "Smart Contracts" },
  { icon: ShieldCheck,text: "Zero-Trust Security" },
  { icon: Globe2,     text: "Decentralized Apps" },
];

export default function About() {
  return (
    <div className="about-page" style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10);--sh:0 4px 32px rgba(26,23,20,0.08)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08);--sh:0 4px 40px rgba(0,0,0,0.45)}
        .about-page{background:var(--bg);color:var(--tx)}
        .sg{font-family:'Cormorant Garamond',Georgia,serif}
        .s-label{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
        .s-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:700;color:var(--tx);line-height:1.15;margin-bottom:1.25rem}
        .s-wrap{max-width:1200px;margin:0 auto;padding:6rem 2rem}
        .divider{height:1px;background:var(--border);max-width:1200px;margin:0 auto}

        /* HERO */
        .hero{position:relative;overflow:hidden;min-height:88vh;display:flex;align-items:center}
        .hero-bg{position:absolute;inset:0;background-image:url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000');background-size:cover;background-position:center 30%;filter:grayscale(15%)}
        .hero-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(14,12,11,.90) 0%,rgba(14,12,11,.65) 60%,rgba(14,12,11,.48) 100%)}
        .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(200,169,110,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,.04) 1px,transparent 1px);background-size:60px 60px}
        .hero-inner{position:relative;max-width:1200px;margin:0 auto;padding:0 2rem;width:100%}
        .hero-eye{display:inline-flex;align-items:center;gap:8px;font-size:.74rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#c8a96e;border:1px solid rgba(200,169,110,.3);padding:6px 16px;border-radius:100px;margin-bottom:2rem}
        .hero-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3rem,6vw,5.5rem);font-weight:700;line-height:1.05;color:#f0ede8;margin-bottom:1.5rem}
        .hero-title em{font-style:italic;color:#c8a96e}
        .hero-sub{font-size:1.1rem;color:rgba(240,237,232,.65);max-width:560px;line-height:1.8;margin-bottom:2.5rem;font-weight:300}
        .hero-tags{display:flex;flex-wrap:wrap;gap:10px}
        .hero-tag{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(200,169,110,.1);border:1px solid rgba(200,169,110,.2);border-radius:6px;font-size:.82rem;color:rgba(240,237,232,.75);font-weight:500}

        /* MISSION */
        .mission-sect{background:var(--bg2)}
        .mq{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.4rem,2.5vw,2rem);font-weight:400;font-style:italic;line-height:1.55;color:var(--tx);border-left:3px solid var(--gold);padding-left:2rem;margin:2rem 0;max-width:820px}
        .mb{font-size:1.05rem;color:var(--tx2);line-height:1.85;max-width:680px;font-weight:300}

        /* STATS */
        .stats-sect{background:var(--bg3)}
        .stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5px;background:var(--border);border:1px solid var(--border);border-radius:16px;overflow:hidden}
        .stat-card{background:var(--bg2);padding:2.5rem 2rem;display:flex;flex-direction:column;align-items:flex-start;gap:12px;transition:background .2s}
        .stat-card:hover{background:var(--bg3)}
        .stat-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center}
        .stat-val{font-family:'Cormorant Garamond',Georgia,serif;font-size:2.8rem;font-weight:700;color:var(--tx);line-height:1}
        .stat-lbl{font-size:.82rem;color:var(--tx2);font-weight:500;letter-spacing:.04em}

        /* CEO */
        .ceo-sect{background:var(--bg)}
        .ceo-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:5rem;align-items:center}
        @media(max-width:768px){.ceo-grid{grid-template-columns:1fr;gap:3rem}}
        .ceo-frame{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:3/4;max-height:520px}
        .ceo-frame img{width:100%;height:100%;object-fit:cover;object-position:top center;filter:grayscale(15%);transition:filter .4s,transform .6s}
        .ceo-frame:hover img{filter:grayscale(0%);transform:scale(1.03)}
        .ceo-badge{position:absolute;bottom:-1px;left:-1px;right:-1px;padding:1.5rem;background:linear-gradient(to top,rgba(14,12,11,.92) 0%,transparent 100%);border-radius:0 0 20px 20px}
        .ceo-name{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.6rem;font-weight:700;color:#f0ede8}
        .ceo-role{font-size:.76rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#c8a96e;margin-top:2px}
        .ceo-accent{position:absolute;top:24px;right:-12px;width:3px;height:80px;background:linear-gradient(to bottom,#c8a96e,transparent);border-radius:4px}
        .ceo-qb{background:var(--bg3);border:1px solid var(--border);border-radius:16px;padding:2rem 2rem 2rem 2.5rem;margin-bottom:2rem;position:relative;overflow:hidden}
        .ceo-qb::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(to bottom,#c8a96e,transparent)}
        .ceo-qt{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.3rem;font-style:italic;line-height:1.6;color:var(--tx);font-weight:600;margin-bottom:1rem}
        .ceo-qa{font-size:.76rem;color:var(--tx2);font-weight:600;letter-spacing:.08em;text-transform:uppercase}
        .ceo-bio{font-size:1rem;color:var(--tx2);line-height:1.85;font-weight:300;margin-bottom:1.5rem}
        .ceo-kws{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:2rem}
        .ceo-kw{padding:5px 14px;background:var(--bg3);border:1px solid var(--border);border-radius:100px;font-size:.76rem;color:var(--tx2);font-weight:500;letter-spacing:.04em;transition:all .2s;cursor:default}
        .ceo-kw:hover{border-color:var(--gold);color:var(--gold);background:rgba(200,169,110,.05)}
        .ceo-li{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;background:var(--tx);color:var(--bg);border-radius:10px;font-size:.85rem;font-weight:600;text-decoration:none;letter-spacing:.04em;transition:opacity .2s,transform .2s}
        .ceo-li:hover{opacity:.82;transform:translateY(-2px)}

        /* TIMELINE */
        .tl-sect{background:var(--bg2)}
        .tl-item{display:grid;grid-template-columns:120px 1fr;gap:2.5rem;padding:2.5rem 0;border-bottom:1px solid var(--border)}
        .tl-item:last-child{border-bottom:none}
        .tl-year{font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-weight:700;color:var(--gold);line-height:1}
        .tl-ttl{font-size:1.05rem;font-weight:600;color:var(--tx);margin-bottom:.5rem}
        .tl-desc{font-size:.95rem;color:var(--tx2);line-height:1.75;font-weight:300}
        @media(max-width:640px){.tl-item{grid-template-columns:1fr;gap:.5rem}}

        /* CULTURE */
        .cul-sect{background:var(--bg)}
        .cul-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;margin-bottom:3.5rem}
        .cul-card{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:2rem;transition:border-color .2s,transform .2s}
        .cul-card:hover{border-color:var(--gold);transform:translateY(-4px)}
        .cul-icon{width:44px;height:44px;background:rgba(200,169,110,.1);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;color:#c8a96e}
        .cul-ttl{font-size:1rem;font-weight:600;color:var(--tx);margin-bottom:.5rem}
        .cul-desc{font-size:.88rem;color:var(--tx2);line-height:1.7;font-weight:300}
        .cul-imgs{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .cul-img{border-radius:14px;height:220px;width:100%;object-fit:cover;border:1px solid var(--border);transition:transform .4s}
        .cul-img:hover{transform:scale(1.02)}
        @media(max-width:640px){.cul-imgs{grid-template-columns:1fr}}
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg"/>
        <div className="hero-ov"/>
        <div className="hero-grid-bg"/>
        <div className="hero-inner">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
            <div className="hero-eye">
              <span style={{width:6,height:6,borderRadius:"50%",background:"#c8a96e",flexShrink:0}}/>
              Est. 2024 · Singapore
            </div>
            <h1 className="hero-title">Building the Future<br/>of <em>Trusted</em> Intelligence</h1>
            <p className="hero-sub">TrustLedgerLabs sits at the convergence of Artificial Intelligence and Blockchain — engineering systems where trust, transparency, and automation work as one.</p>
            <div className="hero-tags">
              {techTags.map(t=>(
                <span key={t.text} className="hero-tag">
                  <t.icon size={13} style={{color:"#c8a96e"}}/>{t.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="mission-sect">
        <AnimatedSection className="s-wrap">
          <p className="s-label">Our Purpose</p>
          <h2 className="s-title">Mission &amp; Vision</h2>
          <blockquote className="mq">"To empower organizations with intelligent automation, secure decentralized systems, and future-ready digital infrastructure."</blockquote>
          <p className="mb">We bring together advanced AI, machine learning, and blockchain technology to deliver solutions that elevate transparency, scalability, and global trust. Every product we build is designed to stand the test of time — resilient, auditable, and performant.</p>
        </AnimatedSection>
      </section>
      <div className="divider"/>

      {/* ── STATS ── */}
      <section className="stats-sect">
        <div className="s-wrap">
          <AnimatedSection>
            <p className="s-label" style={{textAlign:"center"}}>By The Numbers</p>
            <h2 className="s-title" style={{textAlign:"center",marginBottom:"3rem"}}>Proven at Scale</h2>
          </AnimatedSection>
          <div className="stats-grid">
            {stats.map((s,i)=>(
              <motion.div key={s.label} className="stat-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-60px"}}>
                <div className="stat-icon" style={{background:s.color+"18"}}><s.icon size={20} style={{color:s.color}}/></div>
                <div className="stat-val">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CEO ── */}
      <section className="ceo-sect">
        <div className="s-wrap">
          <AnimatedSection>
            <p className="s-label">Leadership</p>
            <h2 className="s-title" style={{marginBottom:"3.5rem"}}>The Visionary Behind the Lab</h2>
          </AnimatedSection>
          <div className="ceo-grid">
            <AnimatedSection custom={0}>
              <div style={{position:"relative"}}>
                <div className="ceo-frame">
                  <img src="CEO.png" alt="Jerald Young, CEO of TrustLedgerLabs"/>
                  <div className="ceo-badge">
                    <div className="ceo-name">Jerald Young</div>
                    <div className="ceo-role">Chief Executive Officer &amp; Co-Founder</div>
                  </div>
                </div>
                <div className="ceo-accent"/>
              </div>
            </AnimatedSection>
            <AnimatedSection custom={1}>
              <div>
                <div className="ceo-qb">
                  <p className="ceo-qt">"We are not just building software. We are constructing the rails for a more transparent, intelligent, and fair digital economy — one smart contract at a time."</p>
                  <p className="ceo-qa">— Jerald Young, CEO</p>
                </div>
                <p className="ceo-bio">Jerald Young is the founding CEO of TrustLedgerLabs, where he leads the company's strategic direction, product vision, and global growth. With a background spanning enterprise software architecture, decentralized finance, and applied machine learning, Jerald brings deep technical fluency alongside executive leadership.</p>
                <p className="ceo-bio">Before founding TrustLedgerLabs, he advised Web3 startups across Southeast Asia and built AI-driven data platforms at scale. His philosophy centers on <strong style={{color:"var(--tx)",fontWeight:600}}>radical transparency</strong> and the belief that decentralized systems, when built responsibly, are the most powerful tool for institutional trust.</p>
                <div className="ceo-kws">
                  {["Visionary","Strategist","Blockchain Expert","AI Advocate","Founder","Tech Leader","Web3 Pioneer","Systems Thinker"].map(kw=>(
                    <span key={kw} className="ceo-kw">{kw}</span>
                  ))}
                </div>
                <a href="https://www.linkedin.com/in/jerald-young-a3a21b3/" target="_blank" rel="noopener noreferrer" className="ceo-li">
                  <Linkedin size={16}/>Connect on LinkedIn<ArrowUpRight size={14} style={{opacity:.6}}/>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      <div className="divider"/>

      {/* ── TIMELINE ── */}
      <section className="tl-sect">
        <div className="s-wrap">
          <AnimatedSection>
            <p className="s-label">History</p>
            <h2 className="s-title" style={{marginBottom:"3rem"}}>Our Journey</h2>
          </AnimatedSection>
          {timeline.map((item,i)=>(
            <motion.div key={item.year} className="tl-item" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-60px"}}>
              <div className="tl-year">{item.year}</div>
              <div><div className="tl-ttl">{item.title}</div><div className="tl-desc">{item.desc}</div></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section className="cul-sect">
        <div className="s-wrap">
          <AnimatedSection>
            <p className="s-label">Culture</p>
            <h2 className="s-title" style={{marginBottom:"2.5rem"}}>Inside Our Culture</h2>
          </AnimatedSection>
          <div className="cul-grid">
            {culture.map((item,i)=>(
              <motion.div key={item.title} className="cul-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{once:true,margin:"-60px"}}>
                <div className="cul-icon"><item.icon size={22}/></div>
                <div className="cul-ttl">{item.title}</div>
                <div className="cul-desc">{item.desc}</div>
              </motion.div>
            ))}
          </div>
          <div className="cul-imgs">
            <img src="AI.png" className="cul-img" alt="AI"/>
            <img src="Blockchain.png" className="cul-img" alt="Blockchain"/>
            <img src="Furturistic.png" className="cul-img" alt="Future"/>
          </div>
        </div>
      </section>
    </div>
  );
}
