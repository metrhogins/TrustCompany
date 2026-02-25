import React, { useState } from "react";
import {
  Blocks, Users, BarChart3, Network, PenTool, Code,
  Database, FileCode2, ArrowUpRight, Briefcase, MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JOBS = [
  { id: 1, title: "Blockchain Developer",    icon: Blocks,    dept: "Engineering", type: "Remote", intro: "Build, maintain, and optimize blockchain infrastructure and decentralized applications.", requirements: ["Blockchain architecture", "Solidity or similar", "Strong problem-solving"], responsibilities: ["Develop smart contracts", "Build blockchain integrations", "Improve system efficiency"], benefits: ["Remote-first", "Learning budget", "Growth opportunities"] },
  { id: 2, title: "Web3 Developer",          icon: Network,   dept: "Engineering", type: "Remote", intro: "Develop decentralized applications and integrate blockchain protocols.",              requirements: ["Web3.js or Ethers.js", "Blockchain networks", "Collaboration skills"],    responsibilities: ["Integrate blockchain features", "Work with backend team", "Improve dApp performance"], benefits: ["Flexible hours", "Remote-friendly", "Annual offsite"] },
  { id: 3, title: "Marketing Assistant",     icon: BarChart3, dept: "Marketing",   type: "Hybrid", intro: "Support marketing campaigns through research, planning, and content preparation.",   requirements: ["Marketing basics", "Social media familiarity", "Writing skills"],           responsibilities: ["Content creation", "Campaign planning", "Analytics reporting"],          benefits: ["Learning support", "Wellness stipend", "Career growth"] },
  { id: 4, title: "Business Development",    icon: Users,     dept: "Growth",      type: "Remote", intro: "Help support partnerships, outreach, and new business growth initiatives.",          requirements: ["Business strategy", "Communication skills", "Proactive mindset"],          responsibilities: ["Partnership outreach", "Market research", "Prepare proposals"],         benefits: ["Networking events", "Career growth", "Remote allowance"] },
  { id: 5, title: "UI/UX Engineer",          icon: PenTool,   dept: "Design",      type: "Remote", intro: "Build user-focused interfaces and improve digital product experiences.",             requirements: ["Design tools", "UX understanding", "User research interest"],               responsibilities: ["Design components", "Prototype user journeys", "Maintain design systems"], benefits: ["Mentorship", "Creative growth", "Remote-friendly"] },
  { id: 6, title: "Frontend Engineer",       icon: Code,      dept: "Engineering", type: "Remote", intro: "Develop modern, high-performance interfaces for AI and Web3 applications.",          requirements: ["React/Next.js", "Responsive UI", "Web3.js is a plus"],                     responsibilities: ["Build frontend interfaces", "Collaborate with teams", "Optimize performance"], benefits: ["Remote-first", "Modern dev tools", "Leadership opportunities"] },
  { id: 7, title: "Backend Engineer",        icon: Database,  dept: "Engineering", type: "Remote", intro: "Build and maintain scalable backend systems powering decentralized and AI platforms.", requirements: ["Node.js / NestJS", "Database skills", "API design"],                       responsibilities: ["Develop backend services", "Ensure scalability", "Integrate blockchain data"], benefits: ["Remote-friendly", "Cloud experience", "Growth opportunities"] },
  { id: 8, title: "Smart Contract Engineer", icon: FileCode2, dept: "Engineering", type: "Remote", intro: "Design, develop, and audit secure smart contracts for decentralized ecosystems.",    requirements: ["Solidity", "Security practices", "Hardhat or Foundry"],                    responsibilities: ["Write smart contracts", "Perform testing & audits", "Collaborate with engineers"], benefits: ["Competitive pay", "R&D opportunities", "Open-source contributions"] },
  { id: 9, title: "Unity Engineer",          icon: Code,      dept: "Engineering", type: "Remote", intro: "Create immersive 3D WebGL and metaverse experiences using Unity.",                  requirements: ["Unity/C#", "WebGL", "3D graphics & shaders"],                              responsibilities: ["Develop 3D environments", "Optimize WebGL performance", "Integrate Web3 systems"], benefits: ["Remote", "Competitive pay", "Cutting-edge 3D projects"] },
];

const DEPT_COLORS = {
  Engineering: { bg: "rgba(99,102,241,0.1)",  text: "#6366f1",      border: "rgba(99,102,241,0.25)" },
  Marketing:   { bg: "var(--gold-bg)",         text: "var(--gold)",  border: "var(--gold-bd)" },
  Growth:      { bg: "rgba(0,212,170,0.1)",    text: "#00d4aa",      border: "rgba(0,212,170,0.25)" },
  Design:      { bg: "rgba(168,85,247,0.1)",   text: "#a855f7",      border: "rgba(168,85,247,0.25)" },
};

const fv = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Jobs() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const depts    = ["All", ...Array.from(new Set(JOBS.map(j => j.dept)))];
  const filtered = filter === "All" ? JOBS : JOBS.filter(j => j.dept === filter);

  return (
    <div style={{ background: "var(--bg)", color: "var(--tx)", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div className="tex-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, paddingTop: "5rem", paddingBottom: "4rem" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="t-eyebrow" style={{ marginBottom: "0.75rem" }}>We're Hiring</div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
              <div>
                <h1 className="t-h1" style={{ marginBottom: "1rem", maxWidth: 560 }}>
                  Open <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Positions</em>
                </h1>
                <p className="t-body-lg" style={{ maxWidth: 500 }}>
                  Join us in building the future of AI and blockchain infrastructure. Remote-first, mission-driven, and growing fast.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(4rem, 7vw, 7rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  userSelect: "none",
                  WebkitTextStroke: "2px var(--gold-bd)",
                  color: "transparent",
                }}
              >
                {JOBS.length}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <div className="wrap" style={{ paddingTop: "2.5rem", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              style={{
                padding: "6px 18px",
                borderRadius: "100px",
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                border: "1px solid var(--border)",
                background: filter === d ? "var(--tx)" : "var(--bg2)",
                color: filter === d ? "var(--bg)" : "var(--tx2)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { if (filter !== d) { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--tx)"; } }}
              onMouseLeave={e => { if (filter !== d) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--tx2)"; } }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* ── JOB GRID ── */}
      <div className="wrap" style={{ paddingTop: "2rem", paddingBottom: "6rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 520px), 1fr))",
          gap: "1.25rem",
        }}>
          {filtered.map((job, i) => {
            const Icon  = job.icon;
            const color = DEPT_COLORS[job.dept] || DEPT_COLORS.Marketing;
            return (
              <motion.div
                key={job.id}
                variants={fv}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: "18px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  transition: "border-color 0.2s, transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: "12px", flexShrink: 0,
                    background: color.bg, border: `1px solid ${color.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={20} style={{ color: color.text }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: "var(--font-body)", fontSize: "1.05rem", fontWeight: 600,
                      color: "var(--tx)", marginBottom: "0.4rem",
                    }}>
                      {job.title}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", padding: "3px 9px", borderRadius: "4px",
                        background: color.bg, color: color.text, border: `1px solid ${color.border}`,
                        fontFamily: "var(--font-body)",
                      }}>{job.dept}</span>
                      <span style={{
                        fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.05em",
                        textTransform: "uppercase", padding: "3px 9px", borderRadius: "4px",
                        background: "var(--bg3)", color: "var(--tx2)", border: "1px solid var(--border)",
                        fontFamily: "var(--font-body)", display: "inline-flex", alignItems: "center", gap: "4px",
                      }}>
                        <MapPin size={9} />{job.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Intro */}
                <p className="t-body" style={{ margin: 0 }}>{job.intro}</p>

                {/* Detail columns */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                  {[
                    { label: "Requirements",     items: job.requirements },
                    { label: "Responsibilities", items: job.responsibilities },
                    { label: "Benefits",         items: job.benefits },
                  ].map(col => (
                    <div key={col.label}>
                      <div style={{
                        fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.15em",
                        textTransform: "uppercase", color: "var(--tx3)",
                        fontFamily: "var(--font-body)", marginBottom: "0.5rem",
                      }}>{col.label}</div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        {col.items.map((x, j) => (
                          <li key={j} style={{
                            fontSize: "0.8rem", color: "var(--tx2)", fontWeight: 300,
                            fontFamily: "var(--font-body)", paddingLeft: "0.9rem", position: "relative",
                          }}>
                            <span style={{ position: "absolute", left: 0, color: "var(--gold)", fontWeight: 700 }}>—</span>
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  paddingTop: "1.25rem", borderTop: "1px solid var(--border)",
                }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: "0.78rem", color: "var(--tx2)", fontFamily: "var(--font-body)", fontWeight: 400,
                  }}>
                    <Briefcase size={12} style={{ opacity: 0.5 }} />{job.type}
                  </span>
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn btn-dark"
                    style={{ padding: "0.45rem 1.1rem", fontSize: "0.82rem", borderRadius: "9px" }}
                  >
                    Apply Now <ArrowUpRight size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
