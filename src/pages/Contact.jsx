import React, { useState } from "react";
import { useToast } from "@/components/Toast";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, ArrowUpRight } from "lucide-react";

const RECAPTCHA_SITE_KEY = "6LdMrSwsAAAAAPUaa1jOTncg87eyi_ZVOOna6AbS";

export default function Contact() {
  const { push } = useToast();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      push("Your message has been submitted successfully!");
      setFormData({ name: "", email: "", company: "", message: "" });
      setToken(null);
    } catch {
      push("Failed to submit message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "var(--bg)", color: "var(--tx)", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600;700&display=swap');
        :root{--bg:#f8f7f4;--bg2:#ffffff;--bg3:#f0ede8;--tx:#1a1714;--tx2:#5a5550;--gold:#c8a96e;--border:rgba(26,23,20,0.10)}
        .dark{--bg:#0e0c0b;--bg2:#161311;--bg3:#1e1a17;--tx:#f0ede8;--tx2:#9e9690;--border:rgba(240,237,232,0.08)}
        .ct-wrap{max-width:1100px;margin:0 auto;padding:5rem 2rem;display:grid;grid-template-columns:1fr 1.3fr;gap:5rem;align-items:start}
        @media(max-width:768px){.ct-wrap{grid-template-columns:1fr;gap:3rem}}
        .ct-lbl{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem}
        .ct-h1{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,4vw,4rem);font-weight:700;color:var(--tx);line-height:1.1;margin-bottom:1.25rem}
        .ct-sub{font-size:1rem;color:var(--tx2);font-weight:300;line-height:1.8;margin-bottom:3rem}
        .ct-info{display:flex;flex-direction:column;gap:1.5rem}
        .ct-info-item{display:flex;align-items:flex-start;gap:14px}
        .ct-info-icon{width:40px;height:40px;background:rgba(200,169,110,.1);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--gold);flex-shrink:0}
        .ct-info-label{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--tx2);margin-bottom:3px}
        .ct-info-val{font-size:.95rem;color:var(--tx);font-weight:500}
        .ct-socials{display:flex;gap:10px;margin-top:2rem}
        .ct-social{width:40px;height:40px;border:1px solid var(--border);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--tx2);transition:all .2s;text-decoration:none}
        .ct-social:hover{border-color:var(--gold);color:var(--gold)}
        .ct-form{background:var(--bg2);border:1px solid var(--border);border-radius:20px;padding:2.5rem}
        .ct-form-title{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.6rem;font-weight:700;color:var(--tx);margin-bottom:.5rem}
        .ct-form-sub{font-size:.88rem;color:var(--tx2);font-weight:300;margin-bottom:2rem}
        .field-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        @media(max-width:500px){.field-row{grid-template-columns:1fr}}
        .field{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
        .field label{font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--tx2)}
        .field input,.field textarea{background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:.75rem 1rem;font-size:.95rem;color:var(--tx);font-family:inherit;outline:none;transition:border-color .2s;width:100%;box-sizing:border-box}
        .field input:focus,.field textarea:focus{border-color:var(--gold)}
        .field textarea{resize:vertical;min-height:130px}
        .submit-btn{width:100%;padding:14px;background:var(--tx);color:var(--bg);border:none;border-radius:12px;font-size:1rem;font-weight:600;cursor:pointer;transition:opacity .2s,transform .2s;font-family:inherit;margin-top:1rem;display:flex;align-items:center;justify-content:center;gap:8px}
        .submit-btn:hover:not(:disabled){opacity:.85;transform:translateY(-1px)}
        .submit-btn:disabled{opacity:.4;cursor:not-allowed}
      `}</style>

      <div className="ct-wrap">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7 }}>
          <p className="ct-lbl">Get In Touch</p>
          <h1 className="ct-h1">Let's Build Something Together</h1>
          <p className="ct-sub">Have a project in mind or want to learn more about our AI and blockchain solutions? We'd love to hear from you.</p>
          <div className="ct-info">
            <div className="ct-info-item">
              <div className="ct-info-icon"><MapPin size={18} /></div>
              <div><div className="ct-info-label">Headquarters</div><div className="ct-info-val">Singapore</div></div>
            </div>
            <div className="ct-info-item">
              <div className="ct-info-icon"><Mail size={18} /></div>
              <div><div className="ct-info-label">Email</div><div className="ct-info-val">hello@trustledgerlabs.com</div></div>
            </div>
          </div>
          <div className="ct-socials">
            <a href="https://www.linkedin.com/company/trustledgerlabs" target="_blank" rel="noopener noreferrer" className="ct-social"><Linkedin size={18} /></a>
            <a href="https://github.com/orgs/TrustLedgerLabs/" target="_blank" rel="noopener noreferrer" className="ct-social"><Github size={18} /></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .1 }}>
          <div className="ct-form">
            <div className="ct-form-title">Send Us a Message</div>
            <div className="ct-form-sub">We respond to all inquiries within 24 hours.</div>
            <form onSubmit={onSubmit}>
              <div className="field-row">
                <div className="field"><label>Full Name *</label><input name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" /></div>
                <div className="field"><label>Email *</label><input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" /></div>
              </div>
              <div className="field"><label>Company</label><input name="company" value={formData.company} onChange={handleChange} placeholder="Your company name" /></div>
              <div className="field"><label>Message *</label><textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project or inquiry..." /></div>
              <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={(value) => setToken(value)} />
              <button type="submit" disabled={!token || loading} className="submit-btn">
                {loading ? "Sending..." : <><span>Send Message</span><ArrowUpRight size={16} /></>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
