import { useState, useEffect } from "react";

// ─── REPLACE THESE BEFORE GOING LIVE ────────────────────────────────────────
const FORMSPREE_ID   = "xzdjvpvj";             // formspree.io/f/xzdjvpvj
const WHATSAPP_NUM   = "250722317971";          // +250 722 317 971
const SITE_URL       = "https://medconsult.rw"; // your live domain
const GA_MEASUREMENT = "G-LEJ4B3J7SQ";         // Google Analytics measurement ID
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = {
  forest: "#0D3B2E", emerald: "#00A878", mint: "#6DBF9A",
  sand: "#F7F3EC", charcoal: "#1C1C1C", slate: "#4A5568",
};

// ── SEO HEAD MANAGER ─────────────────────────────────────────────────────────
// In a real Next.js/Remix app this would go in <Head>. For this preview we
// inject a <meta> summary panel so you can see exactly what each page emits.

const SEO_META = {
  Home: {
    title: "MedConsult Rwanda | Regulatory & Quality Consultancy – Kigali",
    description: "MedConsult Rwanda provides expert regulatory affairs, quality assurance and supply chain consultancy for pharmaceuticals, food, cosmetics and medical devices in Rwanda.",
    og_title: "MedConsult Rwanda – Trusted Regulatory Consultancy",
    og_description: "Navigate Rwanda's regulatory landscape with confidence. Expert support for product registration, GMP compliance and supply chain advisory.",
    og_image: `${SITE_URL}/og-home.jpg`,
    canonical: SITE_URL,
  },
  About: {
    title: "About Us | MedConsult Rwanda",
    description: "Learn about MedConsult Rwanda's mission, vision and values. We are Rwanda's dedicated regulatory affairs and quality assurance consultancy, based in Kigali.",
    og_title: "About MedConsult Rwanda",
    og_description: "A health and regulatory affairs consultancy dedicated to compliant, safe and efficient health-related operations across Rwanda.",
    og_image: `${SITE_URL}/og-about.jpg`,
    canonical: `${SITE_URL}/about`,
  },
  Services: {
    title: "Our Services | Regulatory Affairs & QA – MedConsult Rwanda",
    description: "MedConsult Rwanda offers regulatory affairs, quality assurance, GMP/GDP compliance advisory and supply chain consultancy for health sector businesses in Rwanda.",
    og_title: "Regulatory & Quality Services – MedConsult Rwanda",
    og_description: "End-to-end regulatory support: product registration, dossier prep, QMS guidance, inspection readiness and supply chain compliance in Rwanda.",
    og_image: `${SITE_URL}/og-services.jpg`,
    canonical: `${SITE_URL}/services`,
  },
  Sectors: {
    title: "Sectors We Serve | MedConsult Rwanda",
    description: "We support pharmaceutical manufacturers, cosmetic companies, food producers, medical device firms, importers and NGOs with regulatory compliance in Rwanda.",
    og_title: "Health Sectors We Support – MedConsult Rwanda",
    og_description: "From pharmaceuticals to medical devices, food to cosmetics – MedConsult Rwanda serves a wide range of health sector stakeholders.",
    og_image: `${SITE_URL}/og-sectors.jpg`,
    canonical: `${SITE_URL}/sectors`,
  },
  Quality: {
    title: "Quality & Compliance | MedConsult Rwanda",
    description: "Compliance gap analysis, QMS support, GMP advisory and regulatory risk management. MedConsult Rwanda helps businesses build robust quality systems.",
    og_title: "Quality & Compliance Consultancy – MedConsult Rwanda",
    og_description: "Strengthen your quality systems, reduce regulatory risk and prepare for inspections with MedConsult Rwanda's compliance advisory services.",
    og_image: `${SITE_URL}/og-quality.jpg`,
    canonical: `${SITE_URL}/quality`,
  },
  Resources: {
    title: "Resources & Regulatory Guides | MedConsult Rwanda",
    description: "Regulatory updates, registration process guides, compliance best practices and FAQs for Rwanda's health sector. Coming soon from MedConsult Rwanda.",
    og_title: "Regulatory Resources & Guides – MedConsult Rwanda",
    og_description: "Stay informed with practical insights and regulatory guidance for pharmaceuticals, food and medical devices in Rwanda.",
    og_image: `${SITE_URL}/og-resources.jpg`,
    canonical: `${SITE_URL}/resources`,
  },
  Contact: {
    title: "Contact Us | MedConsult Rwanda – Kigali",
    description: "Get in touch with MedConsult Rwanda for regulatory affairs and quality assurance support. Based in Kigali, Rwanda. Email: info@medconsult.rw",
    og_title: "Contact MedConsult Rwanda",
    og_description: "Request a consultation or speak to a regulatory expert. MedConsult Rwanda is based in Kigali and responds within 1 business day.",
    og_image: `${SITE_URL}/og-contact.jpg`,
    canonical: `${SITE_URL}/contact`,
  },
};

function SeoPanel({ page }) {
  const m = SEO_META[page];
  const [vis, setVis] = useState(false);
  return (
    <div style={{ position:"fixed", bottom:90, right:28, zIndex:300, maxWidth:360 }}>
      <button onClick={() => setVis(v=>!v)} style={{ background:"#1C1C1C", color:"#F7F3EC", border:"none", borderRadius:4, padding:"8px 14px", fontSize:11, fontFamily:"monospace", cursor:"pointer", letterSpacing:"0.05em", display:"block", marginLeft:"auto", boxShadow:"0 2px 10px rgba(0,0,0,0.3)" }}>
        {vis ? "✕ Hide SEO" : "🔍 SEO Tags"}
      </button>
      {vis && (
        <div style={{ background:"#1C1C1C", borderRadius:6, padding:16, marginTop:6, fontFamily:"monospace", fontSize:11, color:"#6DBF9A", lineHeight:1.7, boxShadow:"0 4px 24px rgba(0,0,0,0.4)", maxHeight:400, overflowY:"auto" }}>
          <div style={{ color:"#888", marginBottom:8, fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>SEO output — {page}</div>
          {[
            ["title", m.title],
            ["description", m.description],
            ["og:title", m.og_title],
            ["og:description", m.og_description],
            ["og:image", m.og_image],
            ["og:url", m.canonical],
            ["og:type", "website"],
            ["twitter:card", "summary_large_image"],
            ["canonical", m.canonical],
          ].map(([k,v]) => (
            <div key={k} style={{ marginBottom:6 }}>
              <span style={{ color:"#E8C547" }}>{k}:</span>{" "}
              <span style={{ color:"#F7F3EC", wordBreak:"break-all" }}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── GA4 SNIPPET (inject in <head> on live site) ──────────────────────────────
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
// <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
// gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .skip-link { position:absolute;top:-100px;left:16px;z-index:9999;background:#00A878;color:white;padding:10px 18px;border-radius:0 0 4px 4px;font-size:13px;font-weight:600;transition:top 0.2s;text-decoration:none; }
  .skip-link:focus { top:0; }
  *:focus-visible { outline:2px solid #00A878;outline-offset:3px;border-radius:2px; }

  .fade-in { animation: fadeUp 0.6s ease both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  .s1{animation-delay:.1s} .s2{animation-delay:.2s} .s3{animation-delay:.3s}

  .nav-link { font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#F7F3EC;letter-spacing:.04em;padding:6px 0;border-bottom:1px solid transparent;transition:border-color .2s,color .2s;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none; }
  .nav-link:hover,.nav-link.active { border-bottom-color:#00A878;color:#6DBF9A; }

  .mobile-menu { display:none;position:fixed;inset:0;top:64px;background:#0A2E23;z-index:99;padding:32px 24px;flex-direction:column;gap:4px;overflow-y:auto; }
  .mobile-menu.open { display:flex; }
  .mob-link { font-family:'DM Sans',sans-serif;font-size:18px;font-weight:500;color:#F7F3EC;background:none;border:none;cursor:pointer;padding:16px 0;text-align:left;border-bottom:1px solid rgba(255,255,255,.07);transition:color .2s; }
  .mob-link:hover,.mob-link.active { color:#6DBF9A; }
  .hamburger { display:none;background:none;border:none;cursor:pointer;padding:8px;color:#F7F3EC; }
  @media(max-width:860px){ .dn{display:none!important} .hamburger{display:flex;align-items:center;justify-content:center} }

  .btn-p { display:inline-block;background:#00A878;color:white;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:13px 28px;border:none;border-radius:2px;cursor:pointer;transition:background .2s,transform .15s; }
  .btn-p:hover { background:#009468;transform:translateY(-1px); }
  .btn-o { display:inline-block;background:transparent;color:#F7F3EC;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:12px 28px;border:1px solid rgba(247,243,236,.4);border-radius:2px;cursor:pointer;transition:border-color .2s,background .2s; }
  .btn-o:hover { border-color:#6DBF9A;background:rgba(0,168,120,.1); }

  .card { background:white;border:1px solid #EAE6DF;border-radius:4px;padding:32px;transition:box-shadow .2s,transform .2s; }
  .card:hover { box-shadow:0 8px 32px rgba(13,59,46,.1);transform:translateY(-2px); }

  input,textarea,select { width:100%;font-family:'DM Sans',sans-serif;font-size:14px;color:#1C1C1C;background:#FAFAF8;border:1px solid #DDD9D1;border-radius:2px;padding:12px 14px;outline:none;transition:border-color .2s,box-shadow .2s; }
  input:focus,textarea:focus,select:focus { border-color:#00A878;background:white;box-shadow:0 0 0 3px rgba(0,168,120,.12); }
  label { display:block;font-size:12px;font-weight:500;color:#4A5568;letter-spacing:.05em;text-transform:uppercase;margin-bottom:6px; }

  .divider { width:48px;height:2px;background:#00A878;margin:16px 0 24px; }

  .g2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
  .gsplit{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
  .gcontact{display:grid;grid-template-columns:2fr 3fr;gap:64px}
  .gsvc{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
  .fgrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:900px){
    .g2,.gsplit,.gcontact{grid-template-columns:1fr;gap:32px}
    .g3,.g4{grid-template-columns:1fr 1fr}
    .gsvc{grid-template-columns:1fr;gap:24px}
  }
  @media(max-width:560px){
    .g3,.g4,.fgrid{grid-template-columns:1fr!important}
    .hero-btns{flex-direction:column!important;align-items:flex-start!important}
    h1.big{font-size:32px!important}
    .sp{padding:56px 20px!important}
    .hp{padding:100px 20px 80px!important}
    .pp{padding:110px 20px 60px!important}
    .ftgrid{grid-template-columns:1fr!important;gap:28px!important}
    .statbar{flex-wrap:wrap;gap:12px!important;padding:14px 20px!important}
  }

  .wa { position:fixed;bottom:28px;right:28px;z-index:200;width:56px;height:56px;border-radius:50%;background:#25D366;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(37,211,102,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;text-decoration:none;animation:waPop .5s 1.2s cubic-bezier(.34,1.56,.64,1) both; }
  .wa:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(37,211,102,.6)}
  @keyframes waPop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
  .wa-tip{position:absolute;right:68px;top:50%;transform:translateY(-50%);background:#1C1C1C;color:white;font-family:'DM Sans',sans-serif;font-size:12px;white-space:nowrap;padding:7px 12px;border-radius:4px;opacity:0;pointer-events:none;transition:opacity .2s}
  .wa:hover .wa-tip{opacity:1}

  ::-webkit-scrollbar{width:4px}
  ::-webkit-scrollbar-track{background:#F7F3EC}
  ::-webkit-scrollbar-thumb{background:#00A878;border-radius:2px}

  /* Form states */
  .field-err { border-color:#C0392B!important; }
  .err-msg { font-size:12px;color:#C0392B;margin-top:4px; }
  .form-status { display:flex;align-items:center;gap:8px;font-size:13px;padding:10px 14px;border-radius:4px;margin-bottom:16px; }
  .form-status.sending { background:#F0F9F5;color:#00A878;border:1px solid #6DBF9A; }
  .form-status.error   { background:#FEF2F2;color:#C0392B;border:1px solid #F5A5A5; }
`;

function WhatsApp() {
  return (
    <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer"
      className="wa" aria-label="Chat with MedConsult Rwanda on WhatsApp">
      <span className="wa-tip" aria-hidden="true">Chat on WhatsApp</span>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const links = ["Home","About","Services","Sectors","Quality","Resources","Contact"];
  const go = p => { setPage(p); setOpen(false); };
  return (
    <>
      <nav role="navigation" aria-label="Main navigation" style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:COLORS.forest,borderBottom:"1px solid rgba(255,255,255,.06)",padding:"0 32px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
          <button onClick={() => go("Home")} style={{ background:"none",border:"none",cursor:"pointer",textAlign:"left" }} aria-label="MedConsult Rwanda — home">
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:18,color:"#F7F3EC",fontWeight:600,lineHeight:1.1 }}>MedConsult <span style={{ color:COLORS.mint }}>Rwanda</span></div>
            <div style={{ fontSize:9,color:"rgba(247,243,236,.4)",letterSpacing:".18em",textTransform:"uppercase",marginTop:1 }}>Health & Regulatory Affairs</div>
          </button>
          <div className="dn" style={{ display:"flex",gap:28,alignItems:"center" }}>
            {links.map(l => <button key={l} className={`nav-link${page===l?" active":""}`} onClick={() => go(l)} aria-current={page===l?"page":undefined}>{l}</button>)}
            <button className="btn-p" style={{ padding:"9px 20px",fontSize:12 }} onClick={() => go("Contact")}>Get in Touch</button>
          </div>
          <button className="hamburger" onClick={() => setOpen(o=>!o)} aria-expanded={open} aria-label={open?"Close menu":"Open menu"}>
            {open
              ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${open?" open":""}`} role="dialog" aria-modal="true" aria-label="Site navigation">
        {links.map(l => <button key={l} className={`mob-link${page===l?" active":""}`} onClick={() => go(l)} aria-current={page===l?"page":undefined}>{l}</button>)}
        <button className="btn-p" style={{ marginTop:20 }} onClick={() => go("Contact")}>Get in Touch</button>
      </div>
    </>
  );
}

function Footer({ setPage }) {
  return (
    <footer role="contentinfo" style={{ background:COLORS.forest,color:"#F7F3EC",padding:"56px 32px 32px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div className="ftgrid" style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:48,marginBottom:48 }}>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600,marginBottom:12 }}>MedConsult <span style={{ color:COLORS.mint }}>Rwanda</span></div>
            <p style={{ fontSize:13,color:"rgba(247,243,236,.6)",lineHeight:1.8,maxWidth:280 }}>Expert regulatory affairs and quality assurance consultancy for Rwanda's health sector.</p>
            <address style={{ marginTop:20,fontSize:13,color:"rgba(247,243,236,.5)",lineHeight:2.2,fontStyle:"normal" }}>
              <div>📍 Kigali, Rwanda</div>
              <div><a href="mailto:info@medconsult.rw" style={{ color:"inherit",textDecoration:"none" }}>📧 info@medconsult.rw</a></div>
              <div>📞 +250 722 317 971</div>
            </address>
          </div>
          <nav aria-label="Footer navigation">
            <div style={{ fontSize:11,letterSpacing:".15em",textTransform:"uppercase",color:COLORS.mint,marginBottom:16 }}>Navigation</div>
            {["Home","About","Services","Sectors","Contact"].map(l => (
              <div key={l} style={{ marginBottom:8 }}>
                <button onClick={() => setPage(l)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:13,color:"rgba(247,243,236,.6)",padding:0,transition:"color .2s" }}
                  onMouseOver={e=>e.target.style.color="#F7F3EC"} onMouseOut={e=>e.target.style.color="rgba(247,243,236,.6)"}>{l}</button>
              </div>
            ))}
          </nav>
          <div>
            <div style={{ fontSize:11,letterSpacing:".15em",textTransform:"uppercase",color:COLORS.mint,marginBottom:16 }}>Services</div>
            {["Regulatory Affairs","Quality Assurance","Supply Chain","Post-Approval Support"].map(s => (
              <div key={s} style={{ marginBottom:8,fontSize:13,color:"rgba(247,243,236,.6)" }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8 }}>
          <small style={{ fontSize:12,color:"rgba(247,243,236,.35)" }}>© {new Date().getFullYear()} MedConsult Rwanda — Health & Regulatory Affairs Consultancy. All rights reserved.</small>
          <small style={{ fontSize:12,color:"rgba(247,243,236,.35)" }}>Kigali, Rwanda</small>
        </div>
      </div>
    </footer>
  );
}

// ── SHARED SECTION HELPERS ───────────────────────────────────────────────────
const SH = ({ children, bg, cls="sp", id }) => (
  <section className={cls} style={{ background:bg,padding:"80px 32px" }} {...(id?{id}:{})}>
    <div style={{ maxWidth:1100,margin:"0 auto" }}>{children}</div>
  </section>
);
const Hero = ({ label, title, sub }) => (
  <section className="pp" style={{ background:COLORS.forest,padding:"140px 32px 80px" }}>
    <div style={{ maxWidth:1100,margin:"0 auto" }}>
      <p className="fade-in" style={{ fontSize:11,letterSpacing:".15em",textTransform:"uppercase",color:COLORS.mint,marginBottom:14 }}>{label}</p>
      <h1 className="fade-in s1 big" style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,5vw,48px)",fontWeight:600,color:"#F7F3EC",lineHeight:1.2,maxWidth:580 }}>{title}</h1>
      {sub && <p className="fade-in s2" style={{ fontSize:16,color:"rgba(247,243,236,.65)",marginTop:18,maxWidth:520,lineHeight:1.8 }}>{sub}</p>}
    </div>
  </section>
);

// ── HOME ─────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <main id="main-content">
      <section className="hp" style={{ background:COLORS.forest,minHeight:"92vh",display:"flex",alignItems:"center",padding:"120px 32px 80px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,opacity:.04,backgroundImage:"radial-gradient(circle,#6DBF9A 1px,transparent 1px)",backgroundSize:"40px 40px",pointerEvents:"none" }} aria-hidden="true"/>
        <div style={{ position:"absolute",right:-80,top:-80,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,168,120,.12),transparent 70%)",pointerEvents:"none" }} aria-hidden="true"/>
        <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1,width:"100%" }}>
          <div style={{ maxWidth:680 }}>
            <div className="fade-in" style={{ display:"inline-block",background:"rgba(0,168,120,.15)",border:"1px solid rgba(0,168,120,.3)",borderRadius:2,padding:"6px 14px",fontSize:11,letterSpacing:".15em",textTransform:"uppercase",color:COLORS.mint,marginBottom:28 }}>Health & Regulatory Affairs · Kigali, Rwanda</div>
            <h1 className="fade-in s1 big" style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,58px)",fontWeight:600,color:"#F7F3EC",lineHeight:1.15,marginBottom:24 }}>
              Trusted Regulatory &<br/><span style={{ color:COLORS.mint }}>Quality Consultancy</span><br/>in Rwanda
            </h1>
            <p className="fade-in s2" style={{ fontSize:"clamp(15px,2vw,17px)",color:"rgba(247,243,236,.7)",lineHeight:1.8,marginBottom:36,maxWidth:540 }}>MedConsult Rwanda provides comprehensive health consultation services, specialising in regulatory affairs for pharmaceuticals, cosmetics, food products, and medical devices.</p>
            <div className="fade-in s3 hero-btns" style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
              <button className="btn-p" onClick={() => setPage("Contact")}>Request a Consultation</button>
              <button className="btn-o" onClick={() => setPage("Services")}>Our Services</button>
            </div>
          </div>
        </div>
        <div style={{ position:"absolute",bottom:0,left:0,right:0,background:"rgba(0,0,0,.2)",borderTop:"1px solid rgba(255,255,255,.06)" }} aria-hidden="true">
          <div className="statbar" style={{ maxWidth:1100,margin:"0 auto",display:"flex",padding:"20px 32px",gap:48 }}>
            {[["Pharmaceuticals","Regulatory registration"],["Food & Cosmetics","Full compliance support"],["Medical Devices","Diagnostics advisory"],["Rwanda-Based","International standards"]].map(([t,s])=>(
              <div key={t}><div style={{ fontSize:13,fontWeight:500,color:COLORS.mint }}>{t}</div><div style={{ fontSize:11,color:"rgba(247,243,236,.4)",marginTop:2 }}>{s}</div></div>
            ))}
          </div>
        </div>
      </section>

      <SH bg={COLORS.sand}>
        <div className="gsplit">
          <div>
            <p style={{ fontSize:11,letterSpacing:".15em",textTransform:"uppercase",color:COLORS.emerald,marginBottom:12 }}>About Us</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3vw,36px)",fontWeight:600,color:COLORS.forest,lineHeight:1.25,marginBottom:20 }}>Who We Are</h2>
            <div className="divider"/>
            <p style={{ fontSize:15,color:COLORS.slate,lineHeight:1.9,marginBottom:16 }}>MedConsult Rwanda is a professional consultancy firm offering expert guidance in regulatory affairs, quality assurance, and supply chain management.</p>
            <p style={{ fontSize:15,color:COLORS.slate,lineHeight:1.9,marginBottom:32 }}>We help local and international companies navigate Rwanda's regulatory landscape with confidence, efficiency, and integrity.</p>
            <button className="btn-p" onClick={() => setPage("About")}>Learn More About Us</button>
          </div>
          <div className="g2" style={{ gap:16 }}>
            {[["⚖️","Regulatory Affairs","End-to-end registration and compliance support"],["✅","Quality Assurance","GMP/GDP advisory and QMS guidance"],["🚚","Supply Chain","Storage, distribution & cold chain compliance"],["🔄","Post-Approval","Renewals, variations & lifecycle management"]].map(([ic,t,d])=>(
              <div key={t} style={{ background:"white",border:"1px solid #EAE6DF",borderRadius:4,padding:"24px 20px" }}>
                <div style={{ fontSize:28,marginBottom:10 }} aria-hidden="true">{ic}</div>
                <div style={{ fontSize:13,fontWeight:600,color:COLORS.forest,marginBottom:6 }}>{t}</div>
                <div style={{ fontSize:12,color:COLORS.slate,lineHeight:1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </SH>

      <SH bg="white">
        <div style={{ textAlign:"center",maxWidth:520,margin:"0 auto 56px" }}>
          <p style={{ fontSize:11,letterSpacing:".15em",textTransform:"uppercase",color:COLORS.emerald,marginBottom:12 }}>Why MedConsult Rwanda</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,3vw,34px)",fontWeight:600,color:COLORS.forest }}>What Sets Us Apart</h2>
        </div>
        <div className="g3">
          {[["01","Deep Local Knowledge","Strong, current understanding of Rwanda's regulatory framework."],["02","Cross-Sector Expertise","Specialists across pharma, food, cosmetics and medical devices."],["03","Solution-Oriented","Practical, actionable consultancy — not just compliance advice."],["04","Ethical & Confidential","Professional engagement with full confidentiality."],["05","Local Presence","Rwanda-based team with international quality standards."],["06","End-to-End Support","From first registration through post-approval management."]].map(([n,t,d])=>(
            <div key={n} className="card">
              <div style={{ fontSize:11,fontWeight:600,color:COLORS.mint,letterSpacing:".1em",marginBottom:12 }} aria-hidden="true">{n}</div>
              <div style={{ fontSize:15,fontWeight:600,color:COLORS.forest,marginBottom:10 }}>{t}</div>
              <div style={{ fontSize:13,color:COLORS.slate,lineHeight:1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </SH>

      <section className="sp" style={{ background:COLORS.emerald,padding:"72px 32px",textAlign:"center" }}>
        <div style={{ maxWidth:600,margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,3vw,32px)",color:"white",marginBottom:16 }}>Ensure compliance. Maintain quality.<br/>Operate with confidence.</h2>
          <p style={{ fontSize:15,color:"rgba(255,255,255,.8)",marginBottom:32 }}>Let MedConsult Rwanda guide your path through Rwanda's regulatory landscape.</p>
          <button onClick={() => setPage("Contact")} style={{ background:"white",color:COLORS.emerald,fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",padding:"14px 32px",border:"none",borderRadius:2,cursor:"pointer" }}>
            Contact MedConsult Rwanda
          </button>
        </div>
      </section>
    </main>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <main id="main-content">
      <Hero label="About Us" title="Who We Are"/>
      <SH bg={COLORS.sand}>
        <div className="gsplit" style={{ alignItems:"start" }}>
          <div>
            <p style={{ fontSize:17,color:COLORS.slate,lineHeight:1.9,marginBottom:20 }}>MedConsult Rwanda is a health and regulatory affairs consultancy dedicated to supporting compliant, safe, and efficient health-related operations across Rwanda.</p>
            <p style={{ fontSize:15,color:COLORS.slate,lineHeight:1.9 }}>Our approach combines deep regulatory knowledge with practical industry experience to ensure smooth product registration, compliant operations, and a sustainable market presence.</p>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
            {[["Mission","To support businesses in achieving regulatory compliance, quality excellence, and operational efficiency in Rwanda's health sector."],["Vision","To be Rwanda's most trusted regulatory and quality consultancy for pharmaceuticals, food, cosmetics, and medical devices."]].map(([l,t])=>(
              <div key={l} style={{ background:"white",borderLeft:`3px solid ${COLORS.emerald}`,padding:"24px",borderRadius:"0 4px 4px 0" }}>
                <div style={{ fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:COLORS.emerald,marginBottom:10,fontWeight:600 }}>{l}</div>
                <p style={{ fontSize:14,color:COLORS.slate,lineHeight:1.75 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </SH>
      <SH bg="white">
        <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:32,color:COLORS.forest,marginBottom:8 }}>Our Values</h2>
        <div className="divider"/>
        <div className="g4" style={{ marginTop:16 }}>
          {[["🤝","Integrity & Transparency","We operate with honesty and full openness with every client."],["📋","Accuracy & Compliance","Precision in every submission, review, and recommendation."],["🏆","Professional Excellence","High standards in every engagement, without exception."],["🔒","Confidentiality","Client information handled with complete discretion."]].map(([ic,v,d])=>(
            <div key={v} style={{ textAlign:"center",padding:"32px 20px",border:"1px solid #EAE6DF",borderRadius:4 }}>
              <div style={{ fontSize:32,marginBottom:14 }} aria-hidden="true">{ic}</div>
              <div style={{ fontSize:14,fontWeight:600,color:COLORS.forest,marginBottom:10 }}>{v}</div>
              <div style={{ fontSize:13,color:COLORS.slate,lineHeight:1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </SH>
    </main>
  );
}

// ── SERVICES ─────────────────────────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const svcs = [
    { icon:"⚖️", title:"Regulatory Affairs", tag:"End-to-end regulatory support for smooth market entry and compliance.", items:["Pharmaceutical, food, cosmetic & medical device registration","Dossier preparation and regulatory submissions","Liaison with regulatory authorities (RDB, RBC, RURA, etc.)","Product variations, renewals & post-approval compliance","Regulatory strategy & lifecycle management"] },
    { icon:"✅", title:"Quality Assurance & Compliance", tag:"Helping clients build and maintain robust quality systems.", items:["Quality Management System (QMS) guidance","GMP / GDP compliance advisory","Inspection readiness support","Documentation review and improvement","Compliance gap analysis"] },
    { icon:"🚚", title:"Supply Chain, Storage & Distribution", tag:"Supporting compliant and efficient supply chain operations across Rwanda.", items:["Storage and warehousing compliance guidance","Distribution best practices","Cold chain and inventory management","Risk assessment and corrective action planning","Post-market supply chain monitoring"] },
  ];
  return (
    <main id="main-content">
      <Hero label="What We Do" title="Our Services" sub="Comprehensive regulatory and quality consultancy — from first registration to post-market compliance."/>
      <SH bg={COLORS.sand}>
        <div style={{ display:"flex",flexDirection:"column",gap:32 }}>
          {svcs.map(({ icon,title,tag,items })=>(
            <article key={title} style={{ background:"white",border:"1px solid #EAE6DF",borderRadius:4,padding:"clamp(24px,4vw,48px)" }}>
              <div className="gsvc">
                <div>
                  <div style={{ fontSize:40,marginBottom:16 }} aria-hidden="true">{icon}</div>
                  <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:26,color:COLORS.forest,marginBottom:10 }}>{title}</h2>
                  <div className="divider"/>
                  <p style={{ fontSize:15,color:COLORS.slate,lineHeight:1.8 }}>{tag}</p>
                </div>
                <div>
                  <div style={{ fontSize:11,letterSpacing:".12em",textTransform:"uppercase",color:COLORS.emerald,fontWeight:600,marginBottom:16 }}>What's Included</div>
                  <ul style={{ listStyle:"none",padding:0 }}>
                    {items.map(item=>(
                      <li key={item} style={{ display:"flex",gap:12,marginBottom:12,alignItems:"flex-start" }}>
                        <div style={{ width:6,height:6,borderRadius:"50%",background:COLORS.emerald,flexShrink:0,marginTop:7 }} aria-hidden="true"/>
                        <span style={{ fontSize:14,color:COLORS.slate,lineHeight:1.6 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SH>
      <section style={{ background:COLORS.emerald,padding:"64px 32px",textAlign:"center" }}>
        <div style={{ maxWidth:500,margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:28,color:"white",marginBottom:14 }}>Ready to get started?</h2>
          <p style={{ fontSize:14,color:"rgba(255,255,255,.8)",marginBottom:28 }}>Request a service quote or speak to a regulatory expert today.</p>
          <button onClick={() => setPage("Contact")} style={{ background:"white",color:COLORS.emerald,fontFamily:"'DM Sans'",fontSize:13,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase",padding:"13px 28px",border:"none",borderRadius:2,cursor:"pointer" }}>Request a Service Quote</button>
        </div>
      </section>
    </main>
  );
}

// ── SECTORS ──────────────────────────────────────────────────────────────────
function SectorsPage({ setPage }) {
  const s = [["💊","Pharmaceutical Products","Registration, GMP compliance, dossier preparation, and lifecycle management for prescription and OTC medicines manufactured or imported into Rwanda."],["🧴","Cosmetics & Personal Care","Regulatory support for cosmetic and personal care products — from ingredient compliance to product registration with Rwanda's regulatory authorities."],["🥤","Food & Beverages","Food safety compliance, labelling requirements, import/export regulatory guidance, and registration for food producers, importers, and distributors."],["🩺","Medical Devices & Diagnostics","Device classification, technical file preparation, registration, and post-market surveillance support for medical device and diagnostic companies."],["🌍","Importers & Distributors","Navigating import permits, distribution agreements, and compliance requirements for companies bringing health products into the Rwandan market."],["🏥","NGOs & Donor-Funded Programs","Regulatory support for health programs, ensuring donated or procured health commodities meet all local requirements for use in Rwanda."]];
  return (
    <main id="main-content">
      <Hero label="Industries" title="Sectors We Serve" sub="We work with a wide range of stakeholders across Rwanda's health and consumer goods sector."/>
      <SH bg={COLORS.sand}>
        <div className="g2" style={{ marginBottom:40 }}>
          {s.map(([ic,t,d])=>(
            <article key={t} className="card" style={{ display:"flex",gap:24,alignItems:"flex-start" }}>
              <div style={{ fontSize:36,flexShrink:0 }} aria-hidden="true">{ic}</div>
              <div>
                <h2 style={{ fontSize:16,fontWeight:600,color:COLORS.forest,marginBottom:8 }}>{t}</h2>
                <p style={{ fontSize:13,color:COLORS.slate,lineHeight:1.75 }}>{d}</p>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontSize:14,color:COLORS.slate,marginBottom:24 }}>Don't see your sector? We work across Rwanda's broader health and regulatory landscape.</p>
          <button className="btn-p" onClick={() => setPage("Contact")}>Speak to an Expert</button>
        </div>
      </SH>
    </main>
  );
}

// ── QUALITY ──────────────────────────────────────────────────────────────────
function QualityPage({ setPage }) {
  return (
    <main id="main-content">
      <Hero label="Our Commitment" title="Quality & Compliance"/>
      <SH bg={COLORS.sand}>
        <div style={{ maxWidth:680,marginBottom:64 }}>
          <p style={{ fontSize:17,color:COLORS.slate,lineHeight:1.9,marginBottom:16 }}>Quality and compliance are at the core of everything we do. MedConsult Rwanda partners with clients to strengthen systems, reduce regulatory risk, and promote continuous improvement.</p>
          <p style={{ fontSize:15,color:COLORS.slate,lineHeight:1.9 }}>Whether preparing for an inspection, establishing a QMS from scratch, or navigating a compliance gap, our consultants bring practical, regulatory-grounded guidance to every engagement.</p>
        </div>
        <div className="g2" style={{ marginBottom:64 }}>
          {[["🔍","Compliance Gap Analysis","Thorough assessment of your practices against regulatory requirements. We identify gaps, prioritise risks, and provide a clear action plan."],["🏗️","Internal Quality System Support","Guidance on building and maintaining QMS aligned with GMP, GDP, and applicable local standards."],["⚠️","Regulatory Risk Management","Proactive identification and mitigation of regulatory risks before they become compliance issues."],["📅","Ongoing Compliance Advisory","Retainer-based advisory for companies needing continuous regulatory support as their portfolio evolves."]].map(([ic,t,d])=>(
            <div key={t} className="card">
              <div style={{ fontSize:32,marginBottom:14 }} aria-hidden="true">{ic}</div>
              <div style={{ fontSize:15,fontWeight:600,color:COLORS.forest,marginBottom:10 }}>{t}</div>
              <div style={{ fontSize:13,color:COLORS.slate,lineHeight:1.75 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ background:COLORS.forest,borderRadius:4,padding:"clamp(28px,4vw,48px)",color:"#F7F3EC" }}>
          <div className="gsplit">
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:14 }}>Ready to strengthen your compliance?</h2>
              <p style={{ fontSize:14,color:"rgba(247,243,236,.7)",lineHeight:1.8 }}>Let us assess your current systems and build a roadmap to full regulatory confidence.</p>
            </div>
            <div style={{ display:"flex",alignItems:"center" }}>
              <button className="btn-p" onClick={() => setPage("Contact")}>Request a Compliance Review</button>
            </div>
          </div>
        </div>
      </SH>
    </main>
  );
}

// ── RESOURCES ────────────────────────────────────────────────────────────────
function ResourcesPage() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  return (
    <main id="main-content">
      <Hero label="Knowledge Hub" title="Resources" sub="Practical insights, regulatory guidance, and updates for Rwanda's health sector. Coming soon."/>
      <SH bg={COLORS.sand}>
        <div className="g2" style={{ marginBottom:56 }}>
          {[["🔔","Regulatory Updates & Alerts","Stay ahead of changes to Rwanda's pharmaceutical and food regulatory landscape."],["📝","Registration Process Guides","Step-by-step guidance on registering products with Rwanda's regulatory bodies."],["✔️","Compliance Best Practices","Practical articles on GMP, GDP, QMS implementation and inspection readiness."],["❓","Frequently Asked Questions","Answers to common questions about product registration and compliance in Rwanda."]].map(([ic,t,d])=>(
            <div key={t} style={{ background:"white",border:"1px solid #EAE6DF",borderRadius:4,padding:"32px",opacity:.88 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
                <div style={{ fontSize:32 }} aria-hidden="true">{ic}</div>
                <span style={{ fontSize:10,letterSpacing:".1em",textTransform:"uppercase",background:"#F0F9F5",color:COLORS.emerald,border:`1px solid ${COLORS.mint}`,padding:"3px 10px",borderRadius:20 }}>Coming Soon</span>
              </div>
              <div style={{ fontSize:15,fontWeight:600,color:COLORS.forest,marginBottom:8 }}>{t}</div>
              <div style={{ fontSize:13,color:COLORS.slate,lineHeight:1.75 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ background:COLORS.forest,borderRadius:4,padding:"clamp(28px,4vw,48px)",textAlign:"center",color:"#F7F3EC" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:24,marginBottom:12 }}>Get notified when resources go live</h2>
          <p style={{ fontSize:14,color:"rgba(247,243,236,.65)",marginBottom:28 }}>We'll be publishing regulatory guides and updates soon.</p>
          {notified ? (
            <p style={{ color:COLORS.mint,fontWeight:500 }} role="status">✓ You're on the list — we'll be in touch!</p>
          ) : (
            <div style={{ display:"flex",gap:12,maxWidth:420,margin:"0 auto",flexWrap:"wrap",justifyContent:"center" }}>
              <label htmlFor="ne" style={{ position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0,0,0,0)",whiteSpace:"nowrap" }}>Email for notifications</label>
              <input id="ne" type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}
                style={{ flex:1,minWidth:200,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"#F7F3EC",borderRadius:2 }}/>
              <button className="btn-p" style={{ whiteSpace:"nowrap" }} onClick={() => { if(email) setNotified(true); }}>Notify Me</button>
            </div>
          )}
        </div>
      </SH>
    </main>
  );
}

// ── CONTACT — Formspree wired ────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name:"",company:"",email:"",phone:"",sector:"",message:"" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Please include a message";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          company: form.company,
          email:   form.email,
          phone:   form.phone,
          sector:  form.sector,
          message: form.message,
          _subject: `New inquiry from ${form.name} — MedConsult Rwanda`,
        }),
      });
      if (res.ok) { setStatus("success"); }
      else        { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  const F = ({ id, label, req, err, children }) => (
    <div>
      <label htmlFor={id}>{label}{req && <span aria-hidden="true" style={{ color:COLORS.emerald }}> *</span>}</label>
      {children}
      {err && <p className="err-msg" role="alert">{err}</p>}
    </div>
  );

  return (
    <main id="main-content">
      <Hero label="Get in Touch" title="Contact Us" sub="Let us support your regulatory and quality needs in Rwanda. We respond within 1 business day."/>
      <SH bg={COLORS.sand}>
        <div className="gcontact">
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:24,color:COLORS.forest,marginBottom:8 }}>Contact Details</h2>
            <div className="divider"/>
            {[["📍","Location","Kigali, Rwanda",null],["📧","Email","info@medconsult.rw","mailto:info@medconsult.rw"],["📞","Phone / WhatsApp","+250 722 317 971","https://wa.me/250722317971"]].map(([ic,l,v,hr])=>(
              <div key={l} style={{ display:"flex",gap:16,marginBottom:24,alignItems:"flex-start" }}>
                <div style={{ width:40,height:40,borderRadius:"50%",background:"rgba(0,168,120,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }} aria-hidden="true">{ic}</div>
                <div>
                  <div style={{ fontSize:11,letterSpacing:".1em",textTransform:"uppercase",color:COLORS.emerald,marginBottom:4,fontWeight:600 }}>{l}</div>
                  {hr ? <a href={hr} style={{ fontSize:14,color:COLORS.charcoal,textDecoration:"none" }}>{v}</a> : <div style={{ fontSize:14,color:COLORS.charcoal }}>{v}</div>}
                </div>
              </div>
            ))}
            <div style={{ marginTop:32,padding:"20px 24px",background:"white",border:"1px solid #EAE6DF",borderLeft:`3px solid ${COLORS.emerald}`,borderRadius:"0 4px 4px 0" }}>
              <div style={{ fontSize:12,fontWeight:600,color:COLORS.forest,marginBottom:6 }}>Response Time</div>
              <div style={{ fontSize:13,color:COLORS.slate,lineHeight:1.7 }}>We aim to respond within 1 business day. For urgent matters, reach out via WhatsApp.</div>
            </div>
          </div>

          <div style={{ background:"white",border:"1px solid #EAE6DF",borderRadius:4,padding:"clamp(24px,4vw,40px)" }}>
            {status === "success" ? (
              <div style={{ textAlign:"center",padding:"40px 0" }} role="status" aria-live="polite">
                <div style={{ fontSize:48,marginBottom:16 }} aria-hidden="true">✅</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:24,color:COLORS.forest,marginBottom:12 }}>Inquiry Received</h3>
                <p style={{ fontSize:14,color:COLORS.slate,lineHeight:1.8 }}>Thank you for reaching out. A member of the MedConsult Rwanda team will be in touch within 1 business day.</p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:22,color:COLORS.forest,marginBottom:20 }}>Submit an Inquiry</h3>

                {status === "sending" && <div className="form-status sending" role="status">⏳ Sending your message…</div>}
                {status === "error"   && <div className="form-status error"   role="alert">⚠️ Something went wrong. Please try again or email info@medconsult.rw directly.</div>}

                <div className="fgrid" style={{ marginBottom:16 }}>
                  <F id="fn" label="Full Name" req err={errors.name}>
                    <input id="fn" value={form.name} onChange={e=>{setForm({...form,name:e.target.value});setErrors({...errors,name:""});}} placeholder="Your full name" aria-required="true" className={errors.name?"field-err":""}/>
                  </F>
                  <F id="fc" label="Company Name">
                    <input id="fc" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Your organisation"/>
                  </F>
                  <F id="fe" label="Email Address" req err={errors.email}>
                    <input id="fe" type="email" value={form.email} onChange={e=>{setForm({...form,email:e.target.value});setErrors({...errors,email:""});}} placeholder="your@email.com" aria-required="true" className={errors.email?"field-err":""}/>
                  </F>
                  <F id="fp" label="Phone Number">
                    <input id="fp" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+250 …"/>
                  </F>
                </div>
                <div style={{ marginBottom:16 }}>
                  <F id="fs" label="Product / Sector">
                    <select id="fs" value={form.sector} onChange={e=>setForm({...form,sector:e.target.value})}>
                      <option value="">Select a sector</option>
                      {["Pharmaceutical Products","Cosmetics & Personal Care","Food & Beverages","Medical Devices & Diagnostics","Importers / Distributors","NGO / Donor-Funded Program","Other"].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </F>
                </div>
                <div style={{ marginBottom:24 }}>
                  <F id="fm" label="Message" req err={errors.message}>
                    <textarea id="fm" rows={5} value={form.message} onChange={e=>{setForm({...form,message:e.target.value});setErrors({...errors,message:""});}} placeholder="Describe your regulatory or compliance needs…" aria-required="true" style={{ resize:"vertical" }} className={errors.message?"field-err":""}/>
                  </F>
                </div>
                <button className="btn-p" style={{ width:"100%",textAlign:"center",opacity:status==="sending"?.6:1 }} onClick={handleSubmit} disabled={status==="sending"}>
                  {status==="sending" ? "Sending…" : "Submit Inquiry →"}
                </button>
                <p style={{ fontSize:11,color:"#AAA",marginTop:12,textAlign:"center" }}>Your information is kept strictly confidential.</p>
              </div>
            )}
          </div>
        </div>
      </SH>
    </main>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const navigate = p => { setPage(p); setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),0); };

  return (
    <>
      <style>{styles}</style>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div style={{ fontFamily:"'DM Sans',sans-serif",background:COLORS.sand,minHeight:"100vh" }}>
        <Nav page={page} setPage={navigate}/>
        <div style={{ paddingTop:64 }}>
          {page==="Home"      && <HomePage setPage={navigate}/>}
          {page==="About"     && <AboutPage/>}
          {page==="Services"  && <ServicesPage setPage={navigate}/>}
          {page==="Sectors"   && <SectorsPage setPage={navigate}/>}
          {page==="Quality"   && <QualityPage setPage={navigate}/>}
          {page==="Resources" && <ResourcesPage/>}
          {page==="Contact"   && <ContactPage/>}
        </div>
        <Footer setPage={navigate}/>
        <WhatsApp/>
        <SeoPanel page={page}/>
      </div>
    </>
  );
}
 
