import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Terminal, ShieldCheck, Cpu, Blocks, ArrowUpRight,
  Lock, Globe, CheckCircle, Copy, Check, ChevronRight,
  BarChart2, Zap, FileText, Bot, Database, Server, Hash, FileCheck
} from "lucide-react";
import AttestationConsole from "@/components/AttestationConsole";

const fv = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
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
    command: `curl 'https://trustledgerlabs.com/api/mac' | sh`,
    hint: "Requires macOS 10.15 or later. Run in Terminal.app or iTerm2.",
  },
  {
    key: "linux",
    label: "Linux",
    icon: "🐧",
    command: `wget -qO- 'https://trustledgerlabs.com/api/linux' | sh`,
    hint: "Compatible with Ubuntu 20.04+, Debian 11+, and major distros.",
  },
  {
    key: "windows",
    label: "Windows",
    icon: "⊞",
    command: `curl https://trustledgerlabs.com/api/windows | cmd`,
    hint: "Run in Command Prompt (cmd.exe) as Administrator.",
  },
];

const STEPS = [
  {
    n: "01",
    icon: Terminal,
    title: "Run the Access Command",
    desc: "Open your terminal and execute the one-line command for your operating system. This securely registers your machine and provisions access credentials to the TrustLedger demo environment.",
  },
  {
    n: "02",
    icon: Globe,
    title: "Launch the Demo Environment",
    desc: "Once provisioned, navigate to the secure demo URL. Your credentials are cryptographically tied to your session — no account creation required.",
  },
  {
    n: "03",
    icon: Cpu,
    title: "Explore the Platform",
    desc: "Interact with live AI automation pipelines, audit trail systems, and on-chain analytics — all operating on sandboxed infrastructure with no real assets involved.",
  },
];

const FEATURES = [
  {
    icon: Bot,
    title: "AI Automation Pipelines",
    desc: "Trigger autonomous agents across multi-step business workflows with full observability and rollback capability.",
  },
  {
    icon: Blocks,
    title: "On-Chain Audit Trails",
    desc: "Every action is cryptographically logged to an immutable ledger — demonstrating enterprise-grade compliance in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Trust Access Controls",
    desc: "Role-based permission layers enforced at both the smart contract level and application layer simultaneously.",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics Dashboard",
    desc: "Live visualisation of transaction throughput, anomaly detection signals, and system health across distributed nodes.",
  },
  {
    icon: FileText,
    title: "Smart Contract Interaction",
    desc: "Directly invoke deployed demo contracts to simulate approval flows, escrow logic, and multi-sig governance.",
  },
  {
    icon: Zap,
    title: "Event-Driven Webhooks",
    desc: "Watch real-time event propagation as on-chain state changes trigger downstream automation — end to end.",
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button onClick={handleCopy} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "0.48rem 1rem",
      background: copied ? "var(--gold-bg)" : "var(--bg3)",
      border: `1px solid ${copied ? "var(--gold-bd)" : "var(--border)"}`,
      borderRadius: 8, cursor: "pointer",
      fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600,
      color: copied ? "var(--gold)" : "var(--tx2)",
      transition: "all .2s", whiteSpace: "nowrap", flexShrink: 0,
    }}>
      {copied ? <Check size={13} /> : <Copy size={13} />}
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
        minHeight: "72vh", display: "flex", alignItems: "center",
        background: "var(--bg2)", borderBottom: "1px solid var(--border)",
      }}>
        <div className="tex-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

        {/* subtle gold accent line top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          opacity: 0.6,
        }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingBottom: "5rem" }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

            <div className="badge" style={{ marginBottom: "2rem", color: "var(--gold)" }}>
              <Lock size={10} style={{ color: "var(--gold)", flexShrink: 0 }} />
              Sandboxed Environment &nbsp;·&nbsp; No Real Assets &nbsp;·&nbsp; Invite-Provisioned Access
            </div>

            <h1 className="t-display" style={{ color: "var(--tx)", marginBottom: "1.5rem", maxWidth: 700 }}>
              Experience TrustLedger<br />
              <em className="t-italic" style={{ color: "var(--gold)" }}>Live.</em>
            </h1>

            <p className="t-body-lg" style={{ maxWidth: 560, marginBottom: "3rem" }}>
              A fully operational instance of TrustLedgerLabs' AI and blockchain infrastructure — running on isolated testnet nodes. Run one command to provision access, then explore the platform end to end.
            </p>

            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <a href="#access" className="btn btn-gold">
                Provision Access <ArrowUpRight size={14} />
              </a>
              <Link to="/schedule" className="btn btn-outline" style={{ color: "var(--tx2)", borderColor: "var(--border)" }}>
                Request a Guided Tour <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE ATTESTATION CONSOLE ── */}
      <section style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap sect">
          <Reveal style={{ marginBottom: "3rem" }}>
            <div className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Live Platform Preview</div>
            <h2 className="t-h2">The Attestation Console, Live</h2>
            <p className="t-body-lg" style={{ maxWidth: 560, marginTop: "1rem" }}>
              This is a sandboxed, real-time preview of TrustLedgerLabs' core attestation infrastructure — streaming cryptographic audit events, ZK-proof job manifests, and node reliability data.
            </p>
          </Reveal>
          <Reveal>
            <div style={{
              border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden",
              boxShadow: "var(--shadow2)", background: "var(--bg2)",
            }}>
              <div style={{
                padding: "0.65rem 1rem", background: "var(--bg3)",
                borderBottom: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57","#febc2e","#28c840"].map(c=><span key={c} style={{width:10,height:10,borderRadius:"50%",background:c,display:"block"}}/>)}
                </div>
                <span style={{ fontFamily: "'SFMono-Regular',monospace", fontSize: ".65rem", color: "var(--tx3)", letterSpacing: ".1em" }}>
                  demo.trustledgerlabs.com — attestation-console
                </span>
                <span className="status-attested"><span className="attested-dot" style={{width:5,height:5}}/>Sandbox Active</span>
              </div>
              <div style={{ padding: "1rem" }}>
                <AttestationConsole />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap sect">
          <Reveal style={{ marginBottom: "3.5rem" }}>
            <div className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Process</div>
            <h2 className="t-h2">Access in Three Steps</h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.n} variants={fv} custom={i} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                style={{
                  background: "var(--bg2)", padding: "2.5rem 2rem",
                  position: "relative", overflow: "hidden",
                }}>
                <div style={{
                  position: "absolute", top: 18, right: 20,
                  fontFamily: "var(--font-display)", fontSize: "4.5rem",
                  fontWeight: 700, color: "var(--gold)", opacity: 0.06, lineHeight: 1,
                  userSelect: "none",
                }}>
                  {step.n}
                </div>

                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.5rem",
                }}>
                  <step.icon size={20} style={{ color: "var(--gold)" }} />
                </div>

                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 600, color: "var(--tx)", marginBottom: ".6rem" }}>
                  {step.title}
                </div>
                <div className="t-small" style={{ lineHeight: 1.7 }}>{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESS COMMAND ── */}
      <section id="access" style={{ background: "var(--bg)" }}>
        <div className="wrap sect">
          <Reveal style={{ marginBottom: "3.5rem" }}>
            <div className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Access Provisioning</div>
            <h2 className="t-h2">Run Once. Access Granted.</h2>
            <p className="t-body-lg" style={{ maxWidth: 560, marginTop: "1rem" }}>
              Select your operating system and execute the command in your terminal. The provisioner registers your session and unlocks the demo environment — takes under 30 seconds.
            </p>
          </Reveal>

          <Reveal>
            <div style={{
              background: "var(--bg2)", border: "1px solid var(--border)",
              borderRadius: 18, overflow: "hidden",
              boxShadow: "var(--shadow2)", maxWidth: 780,
            }}>

              {/* Window chrome */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.85rem 1.25rem",
                background: "var(--bg3)", borderBottom: "1px solid var(--border)",
              }}>
                <div style={{ display: "flex", gap: 7 }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                    <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "block" }} />
                  ))}
                </div>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.72rem",
                  color: "var(--tx3)", letterSpacing: ".1em", fontWeight: 600,
                }}>
                  access-provisioner — terminal
                </span>
                <div style={{ width: 52 }} />
              </div>

              {/* OS Tab switcher */}
              <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
                {OS_TABS.map(tab => (
                  <button key={tab.key} onClick={() => setActiveOS(tab.key)}
                    style={{
                      padding: "0.75rem 1.35rem",
                      border: "none",
                      borderBottom: `2px solid ${activeOS === tab.key ? "var(--gold)" : "transparent"}`,
                      background: activeOS === tab.key ? "var(--gold-bg)" : "transparent",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 700,
                      letterSpacing: ".05em",
                      color: activeOS === tab.key ? "var(--gold)" : "var(--tx3)",
                      transition: "all .2s",
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                    <span style={{ fontSize: 14 }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Command block */}
              <div style={{ padding: "1.75rem 1.5rem" }}>
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", gap: 16,
                  background: "var(--bg)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "1.25rem 1.35rem",
                }}>
                  <pre style={{
                    fontFamily: "'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace",
                    fontSize: "0.88rem", color: "var(--tx)", margin: 0,
                    flex: 1, whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.7,
                  }}>
                    <span style={{ color: "var(--gold)", userSelect: "none" }}>$ </span>
                    <span style={{ color: "var(--tx)" }}>{current.command}</span>
                  </pre>
                  <CopyButton text={current.command} />
                </div>
              </div>

              {/* Hint bar */}
              <div style={{
                padding: ".75rem 1.5rem 1rem",
                borderTop: "1px solid var(--border)",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <ShieldCheck size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--tx3)" }}>
                  {current.hint}
                </span>
              </div>

              {/* Simulated output */}
              <div style={{
                padding: "1.1rem 1.5rem 1.35rem",
                background: "var(--bg3)", borderTop: "1px solid var(--border)",
                fontFamily: "'SFMono-Regular', 'Consolas', monospace", fontSize: "0.78rem", lineHeight: 2,
              }}>
                {[
                  { c: "#22c55e", t: "✔ Establishing secure channel..." },
                  { c: "var(--amber)", t: "✔ Validating provisioning token..." },
                  { c: "#22c55e", t: "✔ Session credentials issued." },
                  { c: "var(--gold)", t: "✔ Access provisioned — demo environment ready." },
                ].map((l, i) => (
                  <div key={i} style={{ color: l.c }}>{l.t}</div>
                ))}
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap sect">
          <Reveal style={{ marginBottom: "3.5rem" }}>
            <div className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Platform Capabilities</div>
            <h2 className="t-h2">What You'll Explore</h2>
            <p className="t-body-lg" style={{ maxWidth: 560, marginTop: "1rem" }}>
              The demo mirrors our production architecture across a fully sandboxed environment — every capability, none of the risk.
            </p>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} className="card-hover" variants={fv} custom={i}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                style={{ padding: "2rem" }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <f.icon size={20} style={{ color: "var(--gold)" }} />
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600, color: "var(--tx)", marginBottom: ".5rem" }}>
                  {f.title}
                </div>
                <div className="t-small" style={{ lineHeight: 1.7 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF OF INTEGRITY TIMELINE ── */}
      <section style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap sect">
          <Reveal style={{ marginBottom: "3rem" }}>
            <div className="t-eyebrow" style={{ marginBottom: ".75rem" }}>Attestation Lifecycle</div>
            <h2 className="t-h2">Proof of Integrity Trail</h2>
            <p className="t-body-lg" style={{ maxWidth: 520, marginTop: "1rem" }}>
              Every job generates an immutable, on-chain breadcrumb trail. From request to delivered result, each step is cryptographically sealed.
            </p>
          </Reveal>
          <Reveal>
            <div style={{
              background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 16,
              overflow: "hidden", boxShadow: "var(--shadow)",
            }}>
              {[
                { icon: Database, step: "01", label: "Request Received", desc: "Inference job submitted with input payload hash. Session token issued.", time: "00:00.000", done: true },
                { icon: Server,   step: "02", label: "Node Assigned",    desc: "SGX enclave node selected via verifiable random function. Node pubkey registered.", time: "00:00.048", done: true },
                { icon: Cpu,      step: "03", label: "Computation Complete", desc: "Model inference executed inside hardware-isolated enclave. Output generated.", time: "00:01.241", done: true },
                { icon: ShieldCheck, step: "04", label: "Attestation Generated", desc: "ZK-SNARK proof computed over input/output hashes. Proof anchored to chain.", time: "00:01.387", highlight: true, done: true },
                { icon: FileCheck, step: "05", label: "Result Delivered", desc: "Attested result and proof manifest returned to client. Audit log entry finalised.", time: "00:01.412", done: true },
              ].map((item, i) => (
                <motion.div key={item.step}
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.12, ease: [0.22,1,0.36,1] } }) }}
                  custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  style={{
                    display: "grid", gridTemplateColumns: "52px 1fr auto",
                    gap: "1.25rem", alignItems: "flex-start",
                    padding: "1.35rem 1.5rem",
                    borderBottom: i < 4 ? "1px solid var(--border)" : "none",
                    background: item.highlight ? "var(--gold-bg)" : "transparent",
                    borderLeft: item.highlight ? "3px solid var(--gold)" : "3px solid transparent",
                    transition: "background 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => { if (!item.highlight) e.currentTarget.style.background = "var(--bg3)"; }}
                  onMouseLeave={e => { if (!item.highlight) e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: item.highlight ? "var(--gold)" : item.done ? "var(--gold-bg)" : "var(--bg3)",
                      border: `1px solid ${item.highlight ? "var(--gold)" : "var(--gold-bd)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <item.icon size={16} style={{ color: item.highlight ? "#fff" : "var(--gold)" }} />
                    </div>
                    <div style={{ fontFamily: "'SFMono-Regular',monospace", fontSize: "0.6rem", color: "var(--tx3)" }}>{item.step}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, color: item.highlight ? "var(--gold)" : "var(--tx)", marginBottom: 4 }}>
                      {item.label}
                      {item.highlight && <span className="status-attested" style={{ marginLeft: 8 }}><span className="attested-dot" style={{width:5,height:5}}/>Sealed</span>}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--tx2)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                  <div style={{ fontFamily: "'SFMono-Regular',monospace", fontSize: "0.68rem", color: "var(--tx3)", whiteSpace: "nowrap", paddingTop: 10 }}>{item.time}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DISCLAIMER / TRUST NOTE ── */}
      <section style={{ background: "var(--bg3)" }}>
        <div className="wrap sect-sm">
          <Reveal>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}>
              {[
                { icon: Lock, label: "Isolated Infrastructure", desc: "All demo activity runs on dedicated sandboxed nodes — fully separated from production systems." },
                { icon: ShieldCheck, label: "No Real Assets", desc: "The environment uses synthetic test data and simulated ledger entries only. No funds are ever at risk." },
                { icon: CheckCircle, label: "Session-Scoped Credentials", desc: "Access tokens expire automatically after your session. Nothing persists on your machine post-demo." },
              ].map((item, i) => (
                <motion.div key={item.label} variants={fv} custom={i} initial="hidden"
                  whileInView="visible" viewport={{ once: true }}
                  style={{
                    display: "flex", gap: "1rem", alignItems: "flex-start",
                    padding: "1.5rem", background: "var(--bg2)",
                    border: "1px solid var(--border)", borderRadius: 12,
                  }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                    background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <item.icon size={17} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--tx)", marginBottom: ".35rem" }}>
                      {item.label}
                    </div>
                    <div className="t-small">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: "var(--bg4)", padding: "6rem 2rem",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div className="tex-grid" style={{ position: "absolute", inset: 0, opacity: .25 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <Reveal>
            <div className="t-eyebrow" style={{ color: "var(--gold2)", marginBottom: "1rem" }}>
              Ready to See It Live?
            </div>
            <h2 className="t-h2" style={{ marginBottom: "1.25rem" }}>
              Prefer a Guided Walkthrough?
            </h2>
            <p className="t-body-lg" style={{ marginBottom: "2.5rem" }}>
              Our senior specialists can walk you through every capability in a focused 30-minute session — tailored to your sector and use case.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/schedule" className="btn btn-gold">
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
