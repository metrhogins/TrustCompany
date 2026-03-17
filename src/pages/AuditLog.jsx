import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Search, Download, RefreshCw, Filter,
  CheckCircle2, Clock, Cpu, Database, Server, FileCheck,
  Hash, ChevronDown, ChevronRight, ExternalLink
} from "lucide-react";

const fv = { hidden:{opacity:0,y:18}, visible:(i=0)=>({opacity:1,y:0,transition:{duration:.45,delay:i*.06,ease:[.22,1,.36,1]}}) };
function Reveal({children,i=0,style={}}){
  const ref=useRef(null); const v=useInView(ref,{once:true,margin:"-40px"});
  return <motion.div ref={ref} variants={fv} custom={i} initial="hidden" animate={v?"visible":"hidden"} style={style}>{children}</motion.div>;
}

const MODELS = ["All Models","Llama-3-70B","GPT-4o","Claude-3-Haiku","Mistral-8x7B","Gemma-27B","GPT-4o-mini"];
const STATUSES = ["All Status","ATTESTED","COMPUTING","FAILED"];

function generateLogs(n=80){
  const models  = ["Llama-3-70B","GPT-4o","Claude-3-Haiku","Mistral-8x7B","Gemma-27B","GPT-4o-mini"];
  const nodes   = ["0xB79E...SGX","0xC31A...TDX","0xA02E...TPM","0xF5D1...SGX","0xD88F...SGX","0xE72C...TEE"];
  const statuses= ["ATTESTED","ATTESTED","ATTESTED","ATTESTED","COMPUTING","FAILED"];
  const proofs  = ["Groth16 ZK-SNARK","PLONK","Halo2","STARKs","Groth16 ZK-SNARK"];
  const now = Date.now();
  return Array.from({length:n},(_,i)=>{
    const ms = now - i*47_000 - Math.floor(Math.random()*30_000);
    const status = statuses[Math.floor(Math.random()*statuses.length)];
    return {
      id:       `0x${Math.random().toString(16).slice(2,6).toUpperCase()}...${Math.random().toString(16).slice(2,6).toUpperCase()}`,
      jobRef:   `#AI-${8800+i}`,
      model:    models[Math.floor(Math.random()*models.length)],
      node:     nodes[Math.floor(Math.random()*nodes.length)],
      status,
      proof:    status==="ATTESTED"?proofs[Math.floor(Math.random()*proofs.length)]:"—",
      latency:  status==="FAILED"?"—":`${(0.8+Math.random()*2.4).toFixed(2)}s`,
      block:    `${(21_800_000+i*391+Math.floor(Math.random()*100)).toLocaleString()}`,
      inHash:   `0x${Math.random().toString(16).slice(2,10).toUpperCase()}`,
      outHash:  status==="FAILED"?"—":`0x${Math.random().toString(16).slice(2,10).toUpperCase()}`,
      ts:       ms,
    };
  });
}

const ALL_LOGS = generateLogs(80);

function formatTs(ms){
  const d=new Date(ms);
  return d.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"});
}

function StatusBadge({status}){
  if(status==="ATTESTED") return(
    <span className="status-attested" style={{fontSize:"0.6rem"}}>
      <span className="attested-dot" style={{width:5,height:5}}/>ATTESTED
    </span>
  );
  if(status==="COMPUTING") return(
    <span className="status-pending" style={{fontSize:"0.6rem"}}>
      <Clock size={9}/>COMPUTING
    </span>
  );
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 8px",background:"rgba(220,53,69,0.08)",border:"1px solid rgba(220,53,69,0.25)",borderRadius:100,fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#dc3545",fontFamily:"var(--font-body)"}}>
      FAILED
    </span>
  );
}

export default function AuditLog(){
  const [logs, setLogs] = useState(ALL_LOGS);
  const [search, setSearch] = useState("");
  const [modelFilter, setModelFilter] = useState("All Models");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [expanded, setExpanded] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = logs.filter(l=>{
    const q = search.toLowerCase();
    const matchSearch = !q || l.id.toLowerCase().includes(q) || l.jobRef.toLowerCase().includes(q) || l.model.toLowerCase().includes(q) || l.node.toLowerCase().includes(q);
    const matchModel = modelFilter==="All Models" || l.model===modelFilter;
    const matchStatus = statusFilter==="All Status" || l.status===statusFilter;
    return matchSearch && matchModel && matchStatus;
  });

  const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const totalPages = Math.ceil(filtered.length/PER_PAGE);

  const stats = {
    total:    logs.length,
    attested: logs.filter(l=>l.status==="ATTESTED").length,
    computing:logs.filter(l=>l.status==="COMPUTING").length,
    failed:   logs.filter(l=>l.status==="FAILED").length,
  };

  const hCell = { padding:"0.65rem 1rem", fontFamily:"var(--font-body)", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--tx3)", background:"var(--bg3)", borderBottom:"1px solid var(--border)", whiteSpace:"nowrap" };
  const cell  = { padding:"0.7rem 1rem",  fontFamily:"var(--font-body)", fontSize:"0.78rem", color:"var(--tx2)", borderBottom:"1px solid var(--border)", verticalAlign:"middle", whiteSpace:"nowrap" };

  return(
    <div style={{background:"var(--bg)",color:"var(--tx)",minHeight:"100vh"}}>

      {/* Header */}
      <section style={{background:"var(--bg2)",borderBottom:"1px solid var(--border)",padding:"4rem 2rem 3rem",position:"relative",overflow:"hidden"}}>
        <div className="merkle-bg" style={{position:"absolute",inset:0,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,var(--gold) 30%,var(--gold2) 70%,transparent)",opacity:.7}}/>
        <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
            <div className="badge" style={{marginBottom:"1.25rem",color:"var(--gold)"}}>
              <span className="attested-dot"/>
              Immutable · Cryptographically Sealed · Read-Only
            </div>
            <h1 style={{fontFamily:"var(--font-display)",fontSize:"clamp(1.8rem,3vw,2.8rem)",fontWeight:700,letterSpacing:"-0.02em",color:"var(--tx)",marginBottom:".75rem"}}>
              Attestation Audit Ledger
            </h1>
            <p className="t-body" style={{maxWidth:560}}>
              A complete, immutable record of every inference job, cryptographic proof generated, and attestation delivered by the TrustLedgerLabs platform. Formatted for institutional audit review.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stat strip */}
      <section style={{background:"var(--bg3)",borderBottom:"1px solid var(--border)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"1rem 2rem",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"1px",background:"var(--border)"}}>
          {[
            {label:"Total Records",  value:stats.total,     c:"var(--tx2)"},
            {label:"Attested",       value:stats.attested,  c:"var(--gold)"},
            {label:"Computing",      value:stats.computing, c:"var(--amber)"},
            {label:"Failed",         value:stats.failed,    c:"#dc3545"},
          ].map(s=>(
            <div key={s.label} style={{background:"var(--bg3)",padding:"1rem 1.5rem"}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:"1.65rem",fontWeight:700,color:s.c,lineHeight:1}}>{s.value.toLocaleString()}</div>
              <div style={{fontFamily:"var(--font-body)",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"var(--tx3)",marginTop:4}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters + Table */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"2rem"}}>

        {/* Filter bar */}
        <Reveal style={{marginBottom:"1.25rem"}}>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap",alignItems:"center"}}>
            <div style={{position:"relative",flex:1,minWidth:220}}>
              <Search size={13} style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"var(--tx3)",pointerEvents:"none"}}/>
              <input className="inp" placeholder="Search Job ID, model, node…" value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} style={{paddingLeft:"2.1rem"}}/>
            </div>
            <select className="inp" value={modelFilter} onChange={e=>{setModelFilter(e.target.value);setPage(1);}} style={{width:"auto",minWidth:160}}>
              {MODELS.map(m=><option key={m}>{m}</option>)}
            </select>
            <select className="inp" value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPage(1);}} style={{width:"auto",minWidth:150}}>
              {STATUSES.map(s=><option key={s}>{s}</option>)}
            </select>
            <button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"0.55rem 1.1rem",background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,fontFamily:"var(--font-body)",fontSize:"0.8rem",fontWeight:600,color:"var(--tx2)",cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--tx2)"}}>
              <Download size={13}/> Export CSV
            </button>
          </div>
        </Reveal>

        {/* Table */}
        <Reveal>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:14,overflow:"hidden",marginBottom:"1.5rem"}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",minWidth:900}}>
                <thead>
                  <tr>
                    <th style={{...hCell,width:28}}></th>
                    <th style={hCell}>Timestamp</th>
                    <th style={hCell}>Job Ref</th>
                    <th style={hCell}>Job ID</th>
                    <th style={hCell}>Model</th>
                    <th style={hCell}>Node</th>
                    <th style={hCell}>Status</th>
                    <th style={hCell}>Proof Type</th>
                    <th style={hCell}>Latency</th>
                    <th style={hCell}>Block</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((log,i)=>(
                    <React.Fragment key={log.id+i}>
                      <tr style={{cursor:"pointer",transition:"background .15s"}}
                        onClick={()=>setExpanded(expanded===i?null:i)}
                        onMouseEnter={e=>e.currentTarget.style.background="var(--bg3)"}
                        onMouseLeave={e=>e.currentTarget.style.background=expanded===i?"var(--gold-bg)":"transparent"}>
                        <td style={{...cell,textAlign:"center",color:"var(--tx3)"}}>
                          {expanded===i?<ChevronDown size={13}/>:<ChevronRight size={13}/>}
                        </td>
                        <td style={{...cell,fontSize:"0.7rem",color:"var(--tx3)",fontVariantNumeric:"tabular-nums"}}>{formatTs(log.ts)}</td>
                        <td style={{...cell,fontFamily:"var(--font-display)",fontWeight:600,color:"var(--tx)"}}>{log.jobRef}</td>
                        <td style={cell}><code style={{fontFamily:"monospace",fontSize:"0.72rem",color:"var(--gold)"}}>{log.id}</code></td>
                        <td style={{...cell,color:"var(--tx)"}}>{log.model}</td>
                        <td style={cell}><code style={{fontFamily:"monospace",fontSize:"0.7rem"}}>{log.node}</code></td>
                        <td style={cell}><StatusBadge status={log.status}/></td>
                        <td style={{...cell,fontSize:"0.72rem"}}>{log.proof}</td>
                        <td style={{...cell,color:log.status==="ATTESTED"?"var(--gold)":"var(--tx2)",fontWeight:log.status==="ATTESTED"?600:400}}>{log.latency}</td>
                        <td style={{...cell,fontSize:"0.7rem",fontVariantNumeric:"tabular-nums"}}>{log.block}</td>
                      </tr>
                      <AnimatePresence>
                        {expanded===i && (
                          <tr>
                            <td colSpan={10} style={{padding:0,background:"var(--gold-bg)",borderBottom:"1px solid var(--gold-bd)"}}>
                              <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} transition={{duration:.25}}>
                                <div style={{padding:"1rem 2rem",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1rem"}}>
                                  {[
                                    {label:"Input Hash",  value:log.inHash,  mono:true},
                                    {label:"Output Hash", value:log.outHash, mono:true},
                                    {label:"Proof Type",  value:log.proof,   mono:false},
                                    {label:"Block Height",value:log.block,   mono:true},
                                  ].map(f=>(
                                    <div key={f.label} className="data-field" style={{borderColor:"var(--gold-bd)"}}>
                                      <span className="df-label">{f.label}</span>
                                      <span className="df-value" style={f.mono?{fontFamily:"monospace",fontSize:"0.75rem",color:"var(--gold)"}:{}}>{f.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Pagination */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
          <div style={{fontFamily:"var(--font-body)",fontSize:"0.78rem",color:"var(--tx3)"}}>
            Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length} records
          </div>
          <div style={{display:"flex",gap:"0.5rem"}}>
            {Array.from({length:Math.min(totalPages,8)},(_,i)=>i+1).map(p=>(
              <button key={p} onClick={()=>setPage(p)} style={{
                width:34,height:34,borderRadius:8,border:`1px solid ${p===page?"var(--gold-bd)":"var(--border)"}`,
                background:p===page?"var(--gold-bg)":"var(--bg2)",
                color:p===page?"var(--gold)":"var(--tx2)",
                fontFamily:"var(--font-body)",fontSize:"0.8rem",fontWeight:600,cursor:"pointer",transition:"all .2s"
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
