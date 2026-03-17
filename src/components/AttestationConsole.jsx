import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle2, Clock, ChevronRight, Cpu, Database, Hash, FileCheck, Server } from "lucide-react";

/* ── Fake streaming log entries ── */
const LOG_POOL = [
  { id: "0x3F3E...A9C2", model: "Llama-3-70B", node: "0xB79E...SGX", status: "ATTESTED" },
  { id: "0x7A2D...F4B1", model: "GPT-4o-mini", node: "0xC31A...TDX", status: "ATTESTED" },
  { id: "0xE91C...3D7F", model: "Claude-3-Haiku", node: "0xD88F...SGX", status: "COMPUTING" },
  { id: "0x44AB...9E2C", model: "Mistral-8x7B", node: "0xA02E...TPM", status: "ATTESTED" },
  { id: "0x8C0F...7B3A", model: "Llama-3-70B", node: "0xF5D1...SGX", status: "ATTESTED" },
  { id: "0x1B77...2CF8", model: "Gemma-27B", node: "0x9AC4...TDX", status: "ATTESTED" },
  { id: "0x5E33...A104", model: "Mistral-7B", node: "0xB79E...SGX", status: "COMPUTING" },
  { id: "0xD29B...6F7E", model: "GPT-4o", node: "0xE72C...TEE", status: "ATTESTED" },
];

const NODES = [
  { id: "0xB79E...SGX", name: "SGX-Node-Alpha", reliability: [82,88,90,87,92,95,93,97,96,98], score: "98.4%" },
  { id: "0xC31A...TDX", name: "TDX-Node-Beta",  reliability: [78,82,85,84,88,87,91,90,92,94], score: "94.1%" },
  { id: "0xA02E...TPM", name: "TPM-Node-Gamma", reliability: [88,90,89,93,91,95,94,96,97,99], score: "99.2%" },
  { id: "0xF5D1...SGX", name: "SGX-Node-Delta", reliability: [75,80,83,86,85,89,88,91,90,93], score: "93.0%" },
];

const PROOF_STAGES = [
  { key: "received",    label: "Request Received",     icon: Database },
  { key: "assigned",    label: "Node Assigned",         icon: Server },
  { key: "computed",    label: "Computation Complete",  icon: Cpu },
  { key: "attested",    label: "Attestation Generated", icon: ShieldCheck, highlight: true },
  { key: "delivered",   label: "Result Delivered",      icon: CheckCircle2 },
];

function Sparkline({ data }) {
  const max = Math.max(...data);
  return (
    <div className="sparkline-bar">
      {data.map((v, i) => (
        <span key={i} style={{ height: `${Math.round((v / max) * 100)}%` }} />
      ))}
    </div>
  );
}

function ZKSeal({ size = 80 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "conic-gradient(from 0deg, var(--gold), var(--gold2), #0d9b84, var(--gold))",
      boxShadow: "0 0 0 2px var(--bg2), 0 0 0 4px var(--gold), 0 6px 20px rgba(8,153,129,0.4)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      color: "var(--bg)", textAlign: "center", cursor: "default",
      transition: "transform 0.3s, box-shadow 0.3s",
      userSelect: "none",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07) rotate(6deg)"; e.currentTarget.style.boxShadow = "0 0 0 2px var(--bg2), 0 0 0 4px var(--gold), 0 12px 28px rgba(8,153,129,0.6)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; e.currentTarget.style.boxShadow = "0 0 0 2px var(--bg2), 0 0 0 4px var(--gold), 0 6px 20px rgba(8,153,129,0.4)"; }}>
      <ShieldCheck size={size * 0.28} strokeWidth={2.5} />
      <div style={{ fontSize: size * 0.098, fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1.2, marginTop: 2, fontFamily: "var(--font-body)" }}>
        ZK-PROOF<br/>VERIFIED
      </div>
    </div>
  );
}

export default function AttestationConsole() {
  const [logs, setLogs] = useState(LOG_POOL.slice(0, 5));
  const [proofStage, setProofStage] = useState(2);
  const [selectedJob] = useState({
    id: "#AI-8824",
    model: "Llama-3-70B (Attested)",
    node: "0xB79E...SGX Enclave",
    inputHash: "0xE3F2A9...D1C7",
    outputHash: "0xA1C4F8...B2E9",
    proofType: "Groth16 ZK-SNARK",
    blockHeight: "21,847,391",
    latency: "1.24s",
  });

  /* Cycle through proof stages */
  useEffect(() => {
    const t = setInterval(() => {
      setProofStage(s => (s + 1) % 5);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  /* Stream new log entries */
  useEffect(() => {
    const t = setInterval(() => {
      const next = { ...LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)], _key: Date.now() };
      setLogs(prev => [next, ...prev.slice(0, 6)]);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const panelStyle = {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const panelHeader = (title, sub) => (
    <div style={{
      padding: "0.75rem 1.1rem",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg3)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>{title}</div>
        {sub && <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--tx3)" }}>{sub}</div>}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><span key={c} style={{width:8,height:8,borderRadius:"50%",background:c,display:"block"}}/>)}
      </div>
    </div>
  );

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1.6fr 1fr",
      gap: "10px",
      fontFamily: "var(--font-body)",
    }}
      className="attest-console">
      <style>{`
        .attest-console { @media(max-width:900px){grid-template-columns:1fr!important} }
        .attest-console > div:not(:nth-child(2)) { @media(max-width:900px){display:none!important} }
      `}</style>

      {/* ── LEFT: Audit Log ── */}
      <div style={{...panelStyle}}>
        {panelHeader("Live Audit Ledger", "Cryptographic event stream")}
        <div className="merkle-bg" style={{ flex: 1, overflowY: "hidden" }}>
          <AnimatePresence initial={false}>
            {logs.map((log, i) => (
              <motion.div
                key={log._key || log.id + i}
                initial={{ opacity: 0, y: -18, backgroundColor: "rgba(8,153,129,0.08)" }}
                animate={{ opacity: 1, y: 0, backgroundColor: "transparent" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  padding: "0.6rem 0.85rem",
                  borderBottom: "1px solid var(--border)",
                  cursor: "default",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <code style={{ fontSize: "0.65rem", color: "var(--gold)", fontFamily: "monospace" }}>{log.id}</code>
                  {log.status === "ATTESTED"
                    ? <span className="status-attested"><span className="attested-dot" style={{width:5,height:5}}/>{log.status}</span>
                    : <span className="status-pending">{log.status}</span>}
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--tx3)" }}>{log.model} · {log.node}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── CENTER: Attestation Console ── */}
      <div style={{...panelStyle}}>
        {panelHeader("Attestation Console", `Verifiable Inference Result · Job ${selectedJob.id}`)}

        {/* Proof-of-integrity breadcrumb */}
        <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)", overflowX: "auto" }}>
          <div className="proof-trail" style={{ flexWrap: "nowrap" }}>
            {PROOF_STAGES.map((stage, i) => {
              const done = i < proofStage;
              const active = i === proofStage;
              return (
                <React.Fragment key={stage.key}>
                  {i > 0 && <div className="trail-arrow" style={{ borderLeftColor: done ? "var(--gold-bd)" : "var(--border)" }} />}
                  <div className={`trail-step ${done ? "done" : active ? "active" : ""}`}
                    style={{ borderRadius: i === 0 ? "8px 0 0 8px" : i === PROOF_STAGES.length - 1 ? "0 8px 8px 0" : 0 }}>
                    {done && <stage.icon size={9} />}
                    {stage.label}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Job details */}
        <div style={{ padding: "1rem", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--tx)", marginBottom: 3 }}>
                Verifiable Inference Result
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--tx3)" }}>Job {selectedJob.id} · {selectedJob.proofType}</div>
            </div>
            <ZKSeal size={68} />
          </div>

          <div>
            {[
              { label: "Model Used", value: selectedJob.model },
              { label: "Compute Node", value: <code style={{fontFamily:"monospace",fontSize:"0.75rem"}}>{selectedJob.node}</code> },
              { label: "Input Hash", value: <span className="hash-code">{selectedJob.inputHash}</span> },
              { label: "Output Hash", value: <span className="hash-code">{selectedJob.outputHash}</span> },
              { label: "Block Height", value: selectedJob.blockHeight },
              { label: "Inference Latency", value: <span style={{color:"var(--gold)",fontWeight:600}}>{selectedJob.latency}</span> },
            ].map(f => (
              <div className="data-field" key={f.label}>
                <span className="df-label">{f.label}</span>
                <span className="df-value">{f.value}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: "0.85rem",
            padding: "0.6rem 0.85rem",
            background: "var(--gold-bg)",
            border: "1px solid var(--gold-bd)",
            borderRadius: 8,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <FileCheck size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 600 }}>
              Cryptographic proof verified on-chain at block #{selectedJob.blockHeight}
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Active Nodes ── */}
      <div style={{...panelStyle}}>
        {panelHeader("Active Attestation Nodes", "Reliability scores")}
        <div style={{ flex: 1 }}>
          {NODES.map((node, i) => (
            <div key={node.id} style={{
              padding: "0.75rem 0.85rem",
              borderBottom: "1px solid var(--border)",
              cursor: "default", transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "0.82rem", fontWeight: 600, color: "var(--tx)" }}>{node.name}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, color: "var(--gold)" }}>{node.score}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <code style={{ fontSize: "0.6rem", color: "var(--tx3)", fontFamily: "monospace" }}>{node.id}</code>
                <Sparkline data={node.reliability} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
