import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Shield, CheckCircle, ArrowUpRight } from "lucide-react";

const perks = [
  { icon: Clock,        title: "30-Minute Session",      desc: "A focused, no-fluff conversation about your use case and objectives." },
  { icon: Shield,       title: "No Commitment Required", desc: "Completely complimentary. Just a substantive conversation to explore what's genuinely possible." },
  { icon: CheckCircle,  title: "Expert Advisory",        desc: "You'll speak directly with a senior TrustLedgerLabs specialist — not a sales representative." },
  { icon: Calendar,     title: "Flexible Scheduling",    desc: "Choose a time that works for you across multiple time zones." },
];

export default function Schedule() {
  useEffect(() => {
    // Load Calendly widget script
    const existing = document.getElementById("calendly-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      // cleanup inline widget CSS if needed
    };
  }, []);

  return (
    <div style={{ background: "var(--bg)", color: "var(--tx)" }}>

      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--bg2)",
          borderBottom: "1px solid var(--border)",
          padding: "7rem 2rem 5rem",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div className="tex-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="badge" style={{ marginBottom: "1.75rem", color: "var(--gold)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
              Complimentary &nbsp;·&nbsp; 30 Minutes &nbsp;·&nbsp; No Obligation
            </div>
            <h1 className="t-h1" style={{ marginBottom: "1.25rem" }}>
              Schedule a{" "}
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Discovery Call</em>
            </h1>
            <p className="t-body-lg" style={{ maxWidth: 560, margin: "0 auto" }}>
              Book a complimentary 30-minute session with a TrustLedgerLabs senior specialist. We'll explore your objectives, evaluate fit, and outline what's genuinely achievable for your organisation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap" style={{ padding: "4rem 2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "1.75rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: "var(--gold-bg)",
                    border: "1px solid var(--gold-bd)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p.icon size={20} style={{ color: "var(--gold)" }} />
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: 600, color: "var(--tx)" }}>
                  {p.title}
                </div>
                <div className="t-small" style={{ lineHeight: 1.6 }}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALENDLY EMBED ── */}
      <section style={{ background: "var(--bg)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="t-eyebrow" style={{ marginBottom: "0.75rem" }}>Select a Time</div>
              <h2 className="t-h2">Choose What Works for You</h2>
            </div>

            {/* Calendly inline widget */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow2)",
                background: "var(--bg2)",
              }}
            >
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/ledgerlink928/30min?hide_gdpr_banner=1&primary_color=b5894a"
                style={{ minWidth: 320, height: 700 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="t-eyebrow" style={{ marginBottom: "1rem" }}>Prefer to Write First?</div>
          <h2 className="t-h2" style={{ marginBottom: "1.25rem" }}>Send Us a Message</h2>
          <p className="t-body-lg" style={{ maxWidth: 460, margin: "0 auto 2.25rem" }}>
            If you'd rather outline your requirements in writing before speaking, our team will respond within one business day.
          </p>
          <a href="/contact" className="btn btn-gold">
            Contact TrustLedgerLabs <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </section>

    </div>
  );
}
