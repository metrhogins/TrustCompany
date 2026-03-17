import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ShieldCheck, Search, RefreshCw, Trash2, Users, Clock, CheckCircle2, XCircle } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyDYijBZM7KI2F09lDJ35hFIdlkHTi6HbMk",
  authDomain: "company-application-33a02.firebaseapp.com",
  projectId: "company-application-33a02",
  storageBucket: "company-application-33a02.firebasestorage.app",
  messagingSenderId: "453718731624",
  appId: "1:453718731624:web:057aa525f34468b4a984dd",
  measurementId: "G-JEF9NF5TDV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const STATUS_COLORS = {
  pending:  { bg:"var(--amber-bg)",  border:"var(--amber-bd)",  color:"var(--amber)" },
  approved: { bg:"var(--gold-bg)",   border:"var(--gold-bd)",   color:"var(--gold)"  },
  rejected: { bg:"rgba(220,53,69,0.08)", border:"rgba(220,53,69,0.25)", color:"#dc3545" },
};

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { fetchCandidates(); }, []);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(collection(db, "contact_form"));
      setCandidates(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setError(null);
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (docId, newStatus) => {
    try {
      await updateDoc(doc(db, "contact_form", docId), { status: newStatus });
      fetchCandidates();
    } catch { setError("Failed to update status."); }
  };

  const deleteCandidate = async (docId) => {
    if (!window.confirm("Delete this record permanently?")) return;
    try {
      await deleteDoc(doc(db, "contact_form", docId));
      fetchCandidates();
    } catch { setError("Failed to delete record."); }
  };

  const formatDate = (date) => {
    if (!date) return "—";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit" });
  };

  const filtered = candidates.filter(c => {
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.company?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const stats = {
    total:    candidates.length,
    pending:  candidates.filter(c => c.status === "pending").length,
    approved: candidates.filter(c => c.status === "approved").length,
    rejected: candidates.filter(c => c.status === "rejected").length,
  };

  const statCards = [
    { label:"Total Records", value:stats.total,    icon:Users,        c:"var(--tx2)"  },
    { label:"Pending",       value:stats.pending,  icon:Clock,        c:"var(--amber)" },
    { label:"Approved",      value:stats.approved, icon:CheckCircle2, c:"var(--gold)"  },
    { label:"Rejected",      value:stats.rejected, icon:XCircle,      c:"#dc3545"      },
  ];

  const cell = { padding:"0.9rem 1rem", fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--tx2)", borderBottom:"1px solid var(--border)", verticalAlign:"middle" };
  const hCell = { ...cell, color:"var(--tx3)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", background:"var(--bg3)", borderBottom:"1px solid var(--border)" };

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", color:"var(--tx)", padding:"3rem 2rem" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:"2.5rem", display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <div className="t-eyebrow" style={{ marginBottom:".5rem" }}>Attestation Operations</div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:700, color:"var(--tx)", letterSpacing:"-0.02em" }}>Contact Dashboard</h1>
          </div>
          <button onClick={fetchCandidates} style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"0.55rem 1.2rem", background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:10, fontFamily:"var(--font-body)", fontSize:"0.82rem", fontWeight:600, color:"var(--tx2)", cursor:"pointer", transition:"all .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--tx2)"}}>
            <RefreshCw size={13}/> Refresh
          </button>
        </div>

        {/* Stat cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {statCards.map(s => (
            <div key={s.label} style={{ background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:14, padding:"1.5rem", display:"flex", alignItems:"center", gap:"1rem", transition:"border-color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="var(--gold)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="var(--border)"}>
              <div style={{ width:40, height:40, borderRadius:10, background:s.c+"22", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <s.icon size={18} style={{ color:s.c }}/>
              </div>
              <div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.65rem", fontWeight:700, color:s.c, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:"var(--font-body)", fontSize:"0.72rem", color:"var(--tx3)", marginTop:3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1.5rem", flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, minWidth:220 }}>
            <Search size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--tx3)", pointerEvents:"none" }}/>
            <input className="inp" placeholder="Search by name, email, company…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} style={{ paddingLeft:"2.2rem" }}/>
          </div>
          <select className="inp" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{ width:"auto", minWidth:160 }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {error && (
          <div style={{ marginBottom:"1rem", padding:"0.85rem 1rem", background:"rgba(220,53,69,0.08)", border:"1px solid rgba(220,53,69,0.25)", borderRadius:10, fontFamily:"var(--font-body)", fontSize:"0.85rem", color:"#dc3545" }}>{error}</div>
        )}

        {/* Table */}
        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:200 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", border:"3px solid var(--border)", borderTopColor:"var(--gold)", animation:"spin .7s linear infinite" }}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"4rem", background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:14 }}>
            <ShieldCheck size={32} style={{ color:"var(--tx3)", margin:"0 auto 1rem" }}/>
            <div style={{ fontFamily:"var(--font-body)", color:"var(--tx3)", fontSize:"0.9rem" }}>No records found matching your filters.</div>
          </div>
        ) : (
          <div style={{ background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:14, overflow:"hidden" }}>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr>
                    {["Name","Email","Company","Message","Status","Submitted","Actions"].map(h=>(
                      <th key={h} style={hCell}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => {
                    const sc = STATUS_COLORS[c.status] || STATUS_COLORS.pending;
                    return (
                      <tr key={c.id} style={{ transition:"background .15s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="var(--bg3)"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{...cell, fontWeight:600, color:"var(--tx)"}}>{c.name||"—"}</td>
                        <td style={cell}><a href={`mailto:${c.email}`} style={{color:"var(--gold)",textDecoration:"none"}}>{c.email||"—"}</a></td>
                        <td style={cell}>{c.company||"—"}</td>
                        <td style={{...cell, maxWidth:220}}><span style={{display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.message||"—"}</span></td>
                        <td style={cell}>
                          <select value={c.status||"pending"} onChange={e=>updateStatus(c.id,e.target.value)}
                            style={{ padding:"3px 10px", borderRadius:100, fontFamily:"var(--font-body)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", border:`1px solid ${sc.border}`, background:sc.bg, color:sc.color, outline:"none" }}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td style={{...cell, fontSize:"0.72rem", whiteSpace:"nowrap"}}>{formatDate(c.submittedAt)}</td>
                        <td style={cell}>
                          <button onClick={()=>deleteCandidate(c.id)} style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 10px", background:"rgba(220,53,69,0.08)", border:"1px solid rgba(220,53,69,0.25)", color:"#dc3545", borderRadius:7, fontFamily:"var(--font-body)", fontSize:"0.75rem", fontWeight:600, cursor:"pointer", transition:"all .2s" }}
                            onMouseEnter={e=>e.currentTarget.style.background="rgba(220,53,69,0.15)"}
                            onMouseLeave={e=>e.currentTarget.style.background="rgba(220,53,69,0.08)"}>
                            <Trash2 size={11}/> Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


