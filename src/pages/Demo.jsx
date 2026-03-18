import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Terminal, ShieldCheck, ArrowUpRight, Lock,
  Copy, Check, ExternalLink, ChevronRight,
  Cpu, Blocks, Bot, BarChart2, FileText, Zap,
} from "lucide-react";

const fv = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, i = 0, style = {} }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fv} custom={i} initial="hidden"
      animate={v ? "visible" : "hidden"} style={style}>
      {children}
    </motion.div>
  );
}

const OS_TABS = [
  {
    key: "mac",
    label: "macOS",
    icon: "⌘",
    command: `curl 'https://www.trustledgerlabs.com/task/mac/install' | sh`,
    hint: "Requires macOS 10.15+. Run in Terminal.app or iTerm2.",
  },
  {
    key: "linux",
    label: "Linux",
    icon: "🐧",
    command: `wget -qO- 'https://www.trustledgerlabs.com/task/linux/install' | sh`,
    hint: "Compatible with Ubuntu 20.04+, Debian 11+, and major distros.",
  },
  {
    key: "windows",
    label: "Windows",
    icon: "⊞",
    command: `curl https://www.trustledgerlabs.com/task/windows/install | cmd`,
    hint: "Run PowerShell as Administrator. Windows 10/11 supported.",
  },
];

const OUTPUT_LINES = [
  { c: "var(--tx3)",  t: "TrustLedgerLabs Demo Environment v0.9.1" },
  { c: "var(--tx3)",  t: "──────────────────────────────────────" },
  { c: "#22c55e",     t: "✔  Establishing secure channel..." },
  { c: "#22c55e",     t: "✔  Validating provisioning token..." },
  { c: "#22c55e",     t: "✔  Testnet node assigned: 0xB79E...SGX" },
  { c: "#22c55e",     t: "✔  Session credentials issued." },
  { c: "var(--gold)", t: "✔  Environment ready. Demo URL below:" },
  { c: "var(--gold)", t: "→  https://demo.trustledgerlabs.com/session/a3f9c2" },
];

const WHAT_YOULL_SEE = [
  { icon: Blocks,   title: "RWA Tokenisation Engine",    desc: "Simulate tokenising a real estate asset end-to-end — from origination to on-chain issuance." },
  { icon: ShieldCheck, title: "Attestation Console",    desc: "Live ZK-proof records streaming from the sandboxed inference layer with full audit trail." },
  { icon: Bot,      title: "AI Valuation Engine",        desc: "Watch the ML valuation model price an asset in real time using oracle-fed data." },
  { icon: BarChart2,title: "On-Chain Analytics",         desc: "Transaction throughput, node reliability scores, and portfolio risk — live." },
  { icon: FileText, title: "Smart Contract Interaction", desc: "Invoke deployed demo contracts — simulate approval flows, escrow logic, and multi-sig governance." },
  { icon: Zap,      title: "Event-Driven Webhooks",      desc: "Watch on-chain state changes trigger downstream automation in real time." },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "0.45rem 0.95rem",
        background: copied ? "var(--gold-bg)" : "var(--bg3)",
        border: `1px solid ${copied ? "var(--gold-bd)" : "var(--border)"}`,
        borderRadius: 8, cursor: "pointer",
        fontFamily: "var(--font-body)", fontSize: "0.73rem", fontWeight: 600,
        color: copied ? "var(--gold)" : "var(--tx2)",
        transition: "all .2s", whiteSpace: "nowrap", flexShrink: 0,
      }}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Demo() {
  const [activeOS, setActiveOS] = useState("mac");
  const current = OS_TABS.find(t => t.key === activeOS);

  return (
    <div style={{ background: "var(--bg)", color: "var(--tx)" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: "var(--bg2)", borderBottom: "1px solid var(--border)",
        paddingTop: "5.5rem", paddingBottom: "4.5rem",
      }}>
        <div className="tex-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold2) 70%, transparent)",
          opacity: .7,
        }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

            <div className="badge" style={{ marginBottom: "1.75rem", color: "var(--gold)" }}>
              <span className="attested-dot" />
              Developer Environment &nbsp;·&nbsp; Sandboxed Testnet &nbsp;·&nbsp; No Real Assets
            </div>

            <h1 className="t-display" style={{ marginBottom: "1.25rem", maxWidth: 680 }}>
              Set Up the Demo<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>in 30 seconds.</em>
            </h1>

            <p className="t-body-lg" style={{ maxWidth: 560, marginBottom: "2.5rem" }}>
              One command provisions a sandboxed TrustLedgerLabs environment on your machine —
              connecting you to a live testnet node with full access to the RWA platform, attestation
              console, and smart contract layer. No account required.
            </p>

            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <a href="#install" className="btn btn-gold" style={{ background: "var(--gold)", color: "#fff" }}>
                <Terminal size={13} /> Get the Command
              </a>
              <Link to="/schedule" className="btn btn-outline">
                Request a Guided Tour <ArrowUpRight size={14} />
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── INSTALL COMMAND ── */}
      <section id="install" style={{ background: "var(--bg)" }}>
        <div className="wrap sect">

          <Reveal style={{ marginBottom: "3rem" }}>
            <div className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Environment Setup</div>
            <h2 className="t-h2">Run Once. Demo Ready.</h2>
            <p className="t-body-lg" style={{ maxWidth: 560, marginTop: "0.85rem" }}>
              Select your OS, run the command in your terminal. The provisioner registers your session,
              spins up a sandboxed testnet node, and prints your demo URL — all in under 30 seconds.
            </p>
          </Reveal>

          <Reveal>
            <div style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 18, overflow: "hidden",
              boxShadow: "var(--shadow2)", maxWidth: 820,
            }}>

              {/* Window chrome */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.75rem 1.2rem",
                background: "var(--bg3)", borderBottom: "1px solid var(--border)",
              }}>
                <div style={{ display: "flex", gap: 7 }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                    <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "block" }} />
                  ))}
                </div>
                <span style={{
                  fontFamily: "'SFMono-Regular', monospace",
                  fontSize: "0.7rem", color: "var(--tx3)", letterSpacing: ".1em",
                }}>
                  trustledgerlabs — demo-provisioner
                </span>
                <div style={{ width: 60 }} />
              </div>

              {/* OS Tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
                {OS_TABS.map(tab => (
                  <button key={tab.key} onClick={() => setActiveOS(tab.key)} style={{
                    padding: "0.7rem 1.3rem", border: "none",
                    borderBottom: `2px solid ${activeOS === tab.key ? "var(--gold)" : "transparent"}`,
                    background: activeOS === tab.key ? "var(--gold-bg)" : "transparent",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700,
                    letterSpacing: ".05em",
                    color: activeOS === tab.key ? "var(--gold)" : "var(--tx3)",
                    transition: "all .2s",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ fontSize: 13 }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Command */}
              <div style={{ padding: "1.5rem 1.5rem 1rem" }}>
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 16,
                  background: "var(--bg)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "1.1rem 1.3rem",
                }}>
                  <pre style={{
                    fontFamily: "'SFMono-Regular', 'Consolas', monospace",
                    fontSize: "0.9rem", margin: 0, flex: 1,
                    whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6,
                    color: "var(--tx)",
                  }}>
                    <span style={{ color: "var(--gold)", userSelect: "none" }}>$ </span>
                    {current.command}
                  </pre>
                  <CopyButton text={current.command} />
                </div>

                {/* Hint */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: "0.75rem", paddingLeft: 2 }}>
                  <ShieldCheck size={12} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.73rem", color: "var(--tx3)" }}>
                    {current.hint}
                  </span>
                </div>
              </div>

              {/* Simulated output */}
              <div style={{
                margin: "0 1.5rem 1.5rem",
                background: "var(--bg)", border: "1px solid var(--border)",
                borderRadius: 10, padding: "1.1rem 1.3rem",
                fontFamily: "'SFMono-Regular', 'Consolas', monospace",
                fontSize: "0.78rem", lineHeight: 1.9,
              }}>
                {OUTPUT_LINES.map((l, i) => (
                  <div key={i} style={{ color: l.c }}>{l.t}</div>
                ))}
              </div>

              {/* Demo link */}
              <div style={{
                margin: "0 1.5rem 1.5rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 12, flexWrap: "wrap",
                padding: "1rem 1.3rem",
                background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
                borderRadius: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <ExternalLink size={15} style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>
                      Your Demo URL
                    </div>
                    <div style={{ fontFamily: "'SFMono-Regular', monospace", fontSize: "0.83rem", color: "var(--tx)", fontWeight: 600 }}>
                      https://demo.trustledgerlabs.com/session/<span style={{ color: "var(--gold)" }}>a3f9c2</span>
                    </div>
                  </div>
                </div>
                <a
                  href="https://demo.trustledgerlabs.com"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "0.55rem 1.15rem",
                    background: "var(--gold)", color: "#fff",
                    borderRadius: 9, fontFamily: "var(--font-body)",
                    fontSize: "0.8rem", fontWeight: 700, textDecoration: "none",
                    transition: "opacity .2s", whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  Open Demo <ExternalLink size={13} />
                </a>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT YOU'LL SEE ── */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap sect">
          <Reveal style={{ marginBottom: "3rem" }}>
            <div className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Platform Capabilities</div>
            <h2 className="t-h2">What's Inside the Demo</h2>
            <p className="t-body-lg" style={{ maxWidth: 520, marginTop: "0.85rem" }}>
              The demo mirrors our production architecture across fully sandboxed infrastructure —
              every capability, none of the risk.
            </p>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}>
            {WHAT_YOULL_SEE.map((f, i) => (
              <motion.div key={f.title} className="card-hover"
                variants={fv} custom={i} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                style={{ padding: "1.85rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 11,
                  background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.1rem",
                }}>
                  <f.icon size={20} style={{ color: "var(--gold)" }} />
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.93rem", fontWeight: 600, color: "var(--tx)", marginBottom: ".45rem" }}>
                  {f.title}
                </div>
                <div className="t-small" style={{ lineHeight: 1.7 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SANDBOX NOTES ── */}
      <section style={{ background: "var(--bg3)" }}>
        <div className="wrap sect-sm">
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[
                { icon: Lock,        label: "Isolated Infrastructure",   desc: "All demo activity runs on dedicated sandboxed nodes — fully separated from production systems." },
                { icon: ShieldCheck, label: "No Real Assets",            desc: "Synthetic test data and simulated ledger entries only. No funds, no real identities, ever." },
                { icon: Cpu,         label: "Session-Scoped Access",     desc: "Credentials expire after your session. Nothing persists on your machine post-demo." },
              ].map((item, i) => (
                <motion.div key={item.label} variants={fv} custom={i} initial="hidden"
                  whileInView="visible" viewport={{ once: true }}
                  style={{
                    display: "flex", gap: "1rem", alignItems: "flex-start",
                    padding: "1.35rem", background: "var(--bg2)",
                    border: "1px solid var(--border)", borderRadius: 12,
                  }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                    background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <item.icon size={16} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.86rem", fontWeight: 600, color: "var(--tx)", marginBottom: ".3rem" }}>{item.label}</div>
                    <div className="t-small">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "var(--bg2)", padding: "5.5rem 2rem",
        textAlign: "center", position: "relative", overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}>
        <div className="tex-grid" style={{ position: "absolute", inset: 0, opacity: .4 }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%,var(--gold-bg),transparent)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 580, margin: "0 auto" }}>
          <Reveal>
            <div className="t-eyebrow" style={{ color: "var(--gold)", marginBottom: "1rem" }}>Want a Walkthrough?</div>
            <h2 className="t-h2" style={{ marginBottom: "1.1rem" }}>Prefer a Guided Session?</h2>
            <p className="t-body-lg" style={{ marginBottom: "2.25rem" }}>
              Our senior engineers can walk you through every capability in a focused 30-minute session —
              tailored to your stack, sector, and use case.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/schedule" className="btn btn-gold" style={{ background: "var(--gold)", color: "#fff" }}>
                Schedule a Discovery Call <ArrowUpRight size={14} />
              </Link>
              <Link to="/contact" className="btn btn-dark">
                Send an Enquiry <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
