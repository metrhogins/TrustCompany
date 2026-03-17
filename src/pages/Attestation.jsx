import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Database, Server, Cpu, CheckCircle2, FileCheck,
  ArrowUpRight, Search, RefreshCw, Hash, Lock, Activity, Globe2
} from "lucide-react";
import { Link } from "react-router-dom";
import AttestationConsole from "@/components/AttestationConsole";

const fv = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22,1,0.36,1] } }),
};

const FULL_LOG = [
  { id:"0x3F3E...A9C2", model:"Llama-3-70B",    node:"0xB79E...SGX", status:"ATTESTED",  ts:"2026-03-18 14:32:11", block:"21,847,391" },
  { id:"0x7A2D...F4B1", model:"GPT-4o-mini",    node:"0xC31A...TDX", status:"ATTESTED",  ts:"2026-03-18 14:31:58", block:"21,847,389" },
  { id:"0xE91C...3D7F", model:"Claude-3-Haiku", node:"0xD88F...SGX", status:"COMPUTING", ts:"2026-03-18 14:31:44", block:"—" },
  { id:"0x44AB...9E2C", model:"Mistral-8x7B",   node:"0xA02E...TPM", status:"ATTESTED",  ts:"2026-03-18 14:31:30", block:"21,847,382" },
  { id:"0x8C0F...7B3A", model:"Llama-3-70B",    node:"0xF5D1...SGX", status:"ATTESTED",  ts:"2026-03-18 14:31:17", block:"21,847,380" },
  { id:"0x1B77...2CF8", model:"Gemma-27B",       node:"0x9AC4...TDX", status:"ATTESTED",  ts:"2026-03-18 14:31:03", block:"21,847,375" },
  { id:"0xD29B...6F7E", model:"GPT-4o",          node:"0xE72C...TEE", status:"ATTESTED",  ts:"2026-03-18 14:30:50", block:"21,847,371" },
  { id:"0x5E33...A104", model:"Mistral-7B",      node:"0xB79E...SGX", status:"ATTESTED",  ts:"2026-03-18 14:30:36", block:"21,847,368" },
  { id:"0xA88C...D3F2", model:"Llama-3-8B",      node:"0xA02E...TPM", status:"ATTESTED",  ts:"2026-03-18 14:30:21", block:"21,847,362" },
  { id:"0xC14E...9A01", model:"GPT-4o-mini",    node:"0xC31A...TDX", status:"ATTESTED",  ts:"2026-03-18 14:30:08", block:"21,847,359" },
];

const METRICS = [
  { icon:CheckCircle2, label:"Attestations Today",  value:"2,847",  delta:"+12.4%", c:"var(--gold)" },
  { icon:Activity,     label:"Avg. Proof Latency",  value:"1.18s",  delta:"−8ms",   c:"var(--gold)" },
  { icon:Globe2,       label:"Active Nodes",         value:"4 / 4",  delta:"100%",   c:"var(--amber)" },
  { icon:Lock,         label:"ZK Proofs Verified",   value:"99.97%", delta:"+0.02%", c:"var(--amber)" },
];

export default function AttestationPage() {
  const [log, setLog] = useState(FULL_LOG);
  const [search, setSearch] = useState("");
  const [ticking, setTicking] = useState(true);
  const [counter, setCounter] = useState(2847);

  useEffect(() => {
    if (!ticking) return;
    const t = setInterval(() => {
      const newEntry = {
        ...FULL_LOG[Math.floor(Math.random() * FULL_LOG.length)],
        id: `0x${Math.random().toString(16).slice(2,6).toUpperCase()}...${Math.random().toString(16).slice(2,6).toUpperCase()}`,
        ts: new Date().toISOString().replace("T"," ").slice(0,19),
        block: (21847391 + Math.floor(Math.random() * 20)).toLocaleString(),
        status: Math.random() > 0.15 ? "ATTESTED" : "COMPUTING",
        _new: true,
      };
      setLog(prev => [newEntry, ...prev.slice(0, 19)]);
      setCounter(c => c + 1);
    }, 2400);
    return () => clearInterval(t);
  }, [ticking]);

  const filtered = log.filter(row =>
    !search ||
    row.id.toLowerCase().includes(search.toLowerCase()) ||
    row.model.toLowerCase().includes(search.toLowerCase()) ||
    row.node.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background:"var(--bg)", color:"var(--tx)", minHeight:"100vh" }}>

      {/* Header band */}
      <section style={{ background:"var(--bg2)", borderBottom:"1px solid var(--border)", padding:"3rem 2rem 2rem", position:"relative", overflow:"hidden" }}>
        <div className="tex-grid" style={{ position:"absolute", inset:0, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,var(--gold) 30%,var(--gold2) 70%,transparent)", opacity:.7 }}/>
        <div className="wrap" style={{ position:"relative", zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
            <div className="badge" style={{ marginBottom:"1.25rem", color:"var(--gold)" }}>
              <span className="attested-dot"/>
              Live Attestation Console &nbsp;·&nbsp; Real-Time Cryptographic Audit
            </div>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
              <div>
                <h1 className="t-h1" style={{ marginBottom:".5rem" }}>
                  Attestation <em className="t-italic" style={{ color:"var(--gold)" }}>Console</em>
                </h1>
                <p className="t-body" style={{ maxWidth:520 }}>
                  Cryptographically verified inference jobs, ZK-proof manifests, and immutable audit records — updated in real time.
                </p>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => setTicking(t => !t)} style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  padding:"0.52rem 1.1rem", borderRadius:10, cursor:"pointer",
                  fontFamily:"var(--font-body)", fontSize:"0.82rem", fontWeight:600,
                  background: ticking ? "var(--gold-bg)" : "var(--bg3)",
                  border: `1px solid ${ticking ? "var(--gold-bd)" : "var(--border)"}`,
                  color: ticking ? "var(--gold)" : "var(--tx2)",
                  transition:"all .2s",
                }}>
                  <RefreshCw size={13} style={{ animation: ticking ? "spin 2s linear infinite" : "none" }}/>
                  {ticking ? "Live" : "Paused"}
                </button>
                <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
                <Link to="/contact" className="btn btn-gold" style={{ padding:"0.52rem 1.1rem", fontSize:"0.82rem" }}>
                  Request Access <ArrowUpRight size={13}/>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics strip */}
      <section style={{ background:"var(--bg3)", borderBottom:"1px solid var(--border)" }}>
        <div className="wrap" style={{ padding:"1.5rem 2rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:"1px", background:"var(--border)", border:"1px solid var(--border)", borderRadius:14, overflow:"hidden" }}>
            {METRICS.map((m, i) => (
              <motion.div key={m.label} variants={fv} custom={i} initial="hidden" animate="visible"
                style={{ background:"var(--bg2)", padding:"1.25rem 1.5rem", cursor:"default", transition:"background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background="var(--bg3)"}
                onMouseLeave={e => e.currentTarget.style.background="var(--bg2)"}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                  <m.icon size={14} style={{ color:m.c }}/>
                  <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.08em", color:m.c, fontFamily:"var(--font-body)" }}>{m.delta}</span>
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:700, color:m.c, lineHeight:1, marginBottom:4 }}>
                  {m.label === "Attestations Today" ? counter.toLocaleString() : m.value}
                </div>
                <div style={{ fontSize:"0.72rem", color:"var(--tx3)", fontFamily:"var(--font-body)", fontWeight:500 }}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main 3-panel console */}
      <section style={{ background:"var(--bg)" }}>
        <div className="wrap" style={{ padding:"2rem" }}>
          <div style={{ marginBottom:"1rem", display:"flex", alignItems:"center", gap:8 }}>
            <ShieldCheck size={13} style={{ color:"var(--gold)" }}/>
            <span style={{ fontFamily:"var(--font-body)", fontSize:".68rem", fontWeight:700, letterSpacing:".16em", textTransform:"uppercase", color:"var(--tx3)" }}>
              Interactive Demo · Sandboxed Environment
            </span>
          </div>
          <div style={{
            border:"1px solid var(--border)", borderRadius:16, overflow:"hidden",
            boxShadow:"var(--shadow2)", background:"var(--bg3)",
          }}>
            <div style={{ padding:"0.6rem 1rem", background:"var(--bg2)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", gap:6 }}>
                {["#ff5f57","#febc2e","#28c840"].map(c=><span key={c} style={{width:10,height:10,borderRadius:"50%",background:c,display:"block"}}/>)}
              </div>
              <div style={{ fontFamily:"'SFMono-Regular',monospace", fontSize:".65rem", color:"var(--tx3)", letterSpacing:".1em" }}>trustledgerlabs.com — attestation-console</div>
              <span className="status-attested"><span className="attested-dot" style={{width:5,height:5}}/>Live</span>
            </div>
            <div style={{ padding:"1rem" }}>
              <AttestationConsole/>
            </div>
          </div>
        </div>
      </section>

      {/* Full Audit Log */}
      <section style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)" }}>
        <div className="wrap" style={{ padding:"3rem 2rem" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", marginBottom:"1.5rem" }}>
            <div>
              <div className="t-eyebrow" style={{ marginBottom:".4rem" }}>Immutable Audit Ledger</div>
              <h2 className="t-h2">All Attestation Events</h2>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ position:"relative" }}>
                <Search size={13} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"var(--tx3)" }}/>
                <input
                  type="text"
                  placeholder="Search job ID, model, node…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    paddingLeft:"2rem", paddingRight:"1rem", paddingTop:"0.52rem", paddingBottom:"0.52rem",
                    background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:10,
                    fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--tx)",
                    outline:"none", width:240, transition:"border-color .2s",
                  }}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e => e.target.style.borderColor="var(--border)"}
                />
              </div>
            </div>
          </div>

          <div style={{
            border:"1px solid var(--border)", borderRadius:14, overflow:"hidden",
            background:"var(--bg)",
          }}>
            {/* Table header */}
            <div style={{
              display:"grid", gridTemplateColumns:"170px 1fr 175px 90px 120px",
              gap:"1rem", padding:"0.65rem 1.25rem",
              background:"var(--bg3)", borderBottom:"1px solid var(--border)",
              fontFamily:"var(--font-body)", fontSize:"0.65rem", fontWeight:700,
              letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--tx3)",
            }} className="audit-hdr">
              <style>{`@media(max-width:700px){.audit-hdr,.audit-row-full{grid-template-columns:1fr 1fr!important}.audit-hdr > div:nth-child(n+3),.audit-row-full > div:nth-child(n+3){display:none!important}}`}</style>
              <div>Job ID</div><div>Model</div><div>Node</div><div>Status</div><div>Block</div>
            </div>

            {/* Rows */}
            <div className="merkle-bg" style={{ maxHeight:480, overflowY:"auto" }}>
              <AnimatePresence initial={false}>
                {filtered.map((row, i) => (
                  <motion.div
                    key={row._new ? row.id + row.ts : row.id + i}
                    initial={{ opacity:0, backgroundColor:"rgba(8,153,129,0.07)" }}
                    animate={{ opacity:1, backgroundColor:"transparent" }}
                    transition={{ duration:.5 }}
                    className="audit-row-full"
                    style={{
                      display:"grid", gridTemplateColumns:"170px 1fr 175px 90px 120px",
                      gap:"1rem", padding:"0.7rem 1.25rem",
                      borderBottom:"1px solid var(--border)",
                      fontFamily:"var(--font-body)", fontSize:"0.8rem",
                      cursor:"default", transition:"background .15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background="var(--bg3)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <div>
                      <code style={{ fontFamily:"monospace", fontSize:"0.72rem", color:"var(--gold)" }}>{row.id}</code>
                      <div style={{ fontSize:"0.64rem", color:"var(--tx3)", marginTop:1 }}>{row.ts}</div>
                    </div>
                    <div style={{ color:"var(--tx)", fontWeight:500, alignSelf:"center" }}>{row.model}</div>
                    <div style={{ alignSelf:"center" }}>
                      <code style={{ fontFamily:"monospace", fontSize:"0.7rem", color:"var(--tx3)" }}>{row.node}</code>
                    </div>
                    <div style={{ alignSelf:"center" }}>
                      {row.status === "ATTESTED"
                        ? <span className="status-attested"><span className="attested-dot" style={{width:5,height:5}}/>{row.status}</span>
                        : <span className="status-pending">{row.status}</span>}
                    </div>
                    <div style={{ alignSelf:"center", fontFamily:"monospace", fontSize:"0.72rem", color:"var(--tx2)" }}>{row.block}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <div style={{ padding:"3rem", textAlign:"center", color:"var(--tx3)", fontFamily:"var(--font-body)", fontSize:"0.88rem" }}>
                  No records match your search.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"var(--bg3)", borderTop:"1px solid var(--border)", padding:"4rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div className="tex-grid" style={{ position:"absolute", inset:0, opacity:.4 }}/>
        <div style={{ position:"relative", zIndex:1, maxWidth:560, margin:"0 auto" }}>
          <div className="t-eyebrow" style={{ marginBottom:".75rem" }}>Deploy This In Production</div>
          <h2 className="t-h2" style={{ marginBottom:"1rem" }}>Ready for Institutional-Grade Attestation?</h2>
          <p className="t-body-lg" style={{ marginBottom:"2rem" }}>
            Every proof you've seen here can run in your infrastructure — with full on-chain anchoring, SGX enclave compute, and regulatory-ready audit exports.
          </p>
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/schedule" className="btn btn-gold">Schedule a Discovery Call <ArrowUpRight size={14}/></Link>
            <Link to="/contact" className="btn btn-outline">Request a Proof of Concept <ArrowUpRight size={14}/></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
