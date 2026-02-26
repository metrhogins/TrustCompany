import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, RotateCcw, ChevronDown } from "lucide-react";

const SUGGESTED = [
  "What services do you offer?",
  "How does your AI platform work?",
  "Can you help with blockchain for finance?",
  "How do I schedule a discovery call?",
];

function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "10px 14px" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "block" }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "0.65rem",
      }}
    >
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
          background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginRight: 8, marginTop: 2,
        }}>
          <Sparkles size={13} style={{ color: "var(--gold)" }} />
        </div>
      )}
      <div style={{
        maxWidth: "80%",
        padding: "10px 13px",
        borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
        background: isUser
          ? "var(--gold)"
          : "var(--bg3)",
        border: isUser ? "none" : "1px solid var(--border)",
        color: isUser ? "#fff" : "var(--tx)",
        fontFamily: "var(--font-body)",
        fontSize: "0.83rem",
        lineHeight: 1.55,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}>
        {msg.content}
      </div>
    </motion.div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unread, setUnread] = useState(1);
  const [greeted, setGreeted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial greeting when first opened
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setUnread(0);
      setMessages([{
        role: "assistant",
        content: "Hi, I'm Ledger — TrustLedgerLabs' AI assistant.\n\nI can tell you about our AI platform, blockchain infrastructure, consulting services, or help you get in touch with the team. What would you like to know?",
      }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (open) setUnread(0);
  }, [open, greeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    setError(null);

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const reset = () => {
    setMessages([]);
    setGreeted(false);
    setError(null);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <>
      {/* ── FLOATING BUTTON ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => setOpen(true)}
            style={{
              position: "fixed", bottom: 28, right: 28, zIndex: 9999,
              width: 56, height: 56, borderRadius: 16,
              background: "var(--gold)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 32px rgba(181,137,74,0.45), 0 2px 8px rgba(0,0,0,0.12)",
            }}
            whileHover={{ scale: 1.08, boxShadow: "0 12px 40px rgba(181,137,74,0.55)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={22} color="#fff" />
            {unread > 0 && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{
                  position: "absolute", top: -4, right: -4,
                  width: 18, height: 18, borderRadius: "50%",
                  background: "#ef4444", border: "2px solid var(--bg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-body)", fontSize: "0.6rem",
                  fontWeight: 700, color: "#fff",
                }}
              >
                {unread}
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── CHAT PANEL ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            style={{
              position: "fixed", bottom: 28, right: 28, zIndex: 9999,
              width: "min(400px, calc(100vw - 40px))",
              height: "min(580px, calc(100vh - 100px))",
              borderRadius: 20,
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >

            {/* Header */}
            <div style={{
              padding: "14px 16px",
              background: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", gap: 10,
              flexShrink: 0,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(181,137,74,0.4)",
              }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: "0.88rem",
                  fontWeight: 700, color: "var(--tx)", lineHeight: 1.2,
                }}>
                  Ledger
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#22c55e", display: "block",
                    boxShadow: "0 0 6px #22c55e",
                  }} />
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: "0.7rem",
                    color: "var(--tx3)",
                  }}>
                    TrustLedgerLabs AI · Online
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={reset}
                  title="Reset conversation"
                  style={{
                    width: 30, height: 30, borderRadius: 8, border: "1px solid var(--border)",
                    background: "transparent", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--tx3)", transition: "all .15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--tx)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--tx3)"; }}
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 30, height: 30, borderRadius: 8, border: "1px solid var(--border)",
                    background: "transparent", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--tx3)", transition: "all .15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--tx)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--tx3)"; }}
                >
                  <ChevronDown size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "16px 14px 8px",
              scrollbarWidth: "thin",
              scrollbarColor: "var(--border) transparent",
            }}>
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.65rem" }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: "var(--gold-bg)", border: "1px solid var(--gold-bd)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Sparkles size={13} style={{ color: "var(--gold)" }} />
                  </div>
                  <div style={{
                    background: "var(--bg3)", border: "1px solid var(--border)",
                    borderRadius: "14px 14px 14px 4px",
                  }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{
                    padding: "8px 12px", background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10,
                    fontFamily: "var(--font-body)", fontSize: "0.78rem",
                    color: "#ef4444", marginBottom: "0.65rem",
                  }}
                >
                  {error}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ padding: "0 12px 10px", flexShrink: 0 }}
                >
                  <div style={{
                    fontFamily: "var(--font-body)", fontSize: "0.67rem",
                    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "var(--tx3)", marginBottom: 6,
                  }}>
                    Suggested
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        style={{
                          textAlign: "left", padding: "7px 11px",
                          background: "var(--bg3)", border: "1px solid var(--border)",
                          borderRadius: 9, cursor: "pointer",
                          fontFamily: "var(--font-body)", fontSize: "0.78rem",
                          color: "var(--tx2)", transition: "all .15s",
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = "var(--gold)";
                          e.currentTarget.style.color = "var(--gold)";
                          e.currentTarget.style.background = "var(--gold-bg)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.color = "var(--tx2)";
                          e.currentTarget.style.background = "var(--bg3)";
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div style={{
              padding: "10px 12px 14px",
              borderTop: "1px solid var(--border)",
              flexShrink: 0,
              background: "var(--bg)",
            }}>
              <div style={{
                display: "flex", alignItems: "flex-end", gap: 8,
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: 12, padding: "8px 8px 8px 12px",
                transition: "border-color .15s",
              }}
                onFocusCapture={e => e.currentTarget.style.borderColor = "var(--gold)"}
                onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about our services…"
                  rows={1}
                  style={{
                    flex: 1, background: "transparent", border: "none",
                    outline: "none", resize: "none",
                    fontFamily: "var(--font-body)", fontSize: "0.84rem",
                    color: "var(--tx)", lineHeight: 1.5,
                    maxHeight: 100, overflowY: "auto",
                    scrollbarWidth: "none",
                  }}
                  onInput={e => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                  }}
                />
                <motion.button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 34, height: 34, borderRadius: 9, border: "none",
                    background: input.trim() && !loading ? "var(--gold)" : "var(--bg3)",
                    cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "background .15s",
                  }}
                >
                  <Send size={14} color={input.trim() && !loading ? "#fff" : "var(--tx3)"} />
                </motion.button>
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "0.65rem",
                color: "var(--tx3)", textAlign: "center", marginTop: 7,
              }}>
                Powered by Claude · TrustLedgerLabs AI
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
