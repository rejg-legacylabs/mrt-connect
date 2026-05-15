import { useState } from "react";
import { Link } from "react-router-dom";

const C = {
  dark: "#0c1420", darkMid: "#111c2d", darkLight: "#17243a",
  orange: "#ea580c", orangeLight: "#f97316", orangePale: "#fff7ed",
  amber: "#d97706", amberLight: "#f59e0b",
  white: "#ffffff", offWhite: "#f8fafc",
  text: "#0f172a", muted: "#64748b",
  border: "rgba(234,88,12,0.18)",
};

const glass = (extra = {}) => ({
  background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)", border: `1px solid rgba(234,88,12,0.2)`,
  borderRadius: 18, boxShadow: "0 8px 32px rgba(12,20,32,0.5)",
  transition: "all 0.25s ease", ...extra,
});

const lightGlass = (extra = {}) => ({
  background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)", border: `1px solid rgba(234,88,12,0.15)`,
  borderRadius: 18, boxShadow: "0 8px 36px rgba(12,20,32,0.09)",
  transition: "all 0.25s ease", ...extra,
});

const SERVICES = [
  { icon: "⚖️", title: "Court Transportation", desc: "Reliable rides to hearings, arraignments, pretrial appointments, and magistrate offices across Travis County.", color: C.orange },
  { icon: "🏥", title: "Treatment Transport", desc: "Safe, on-time transportation to detox, inpatient rehab, IOP, outpatient programs, and therapy sessions.", color: C.amber },
  { icon: "🔄", title: "Recovery Rides", desc: "Transportation to AA/NA meetings, sponsor visits, sober living check-ins, and recovery support events.", color: C.orange },
  { icon: "🩺", title: "Medical Transport", desc: "Non-emergency medical appointments, psychiatric visits, physical therapy, and specialist consultations.", color: C.amber },
  { icon: "💼", title: "Employment Transport", desc: "Job interviews, first days of work, job training programs, and workforce development appointments.", color: C.orange },
  { icon: "🏠", title: "Program Transport", desc: "HOH Foundation programs, nonprofit services, housing placement, and partner agency programs.", color: C.amber },
];

const PARTNERS = [
  { name: "Travis County Pretrial Services", type: "Court System" },
  { name: "Integral Care", type: "Mental Health Authority" },
  { name: "Austin Recovery Network", type: "Recovery Services" },
  { name: "CommUnity Care", type: "Community Health" },
  { name: "VA HUD-VASH", type: "Veteran Services" },
  { name: "TDCJ Parole & Probation", type: "Supervision" },
  { name: "HOH Foundation", type: "Nonprofit Partner" },
  { name: "SAFE Alliance", type: "Safety & Housing" },
];

function ServiceCard({ icon, title, desc, color }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...glass(), padding: 28, transform: h ? "translateY(-6px)" : "none",
        borderColor: h ? color : "rgba(234,88,12,0.2)",
        boxShadow: h ? `0 20px 48px rgba(12,20,32,0.6), 0 0 0 1px ${color}` : "0 8px 32px rgba(12,20,32,0.5)" }}>
      <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({ name: "", phone: "", pickup: "", destination: "", date: "", purpose: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: C.dark, fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "94vh", display: "flex", alignItems: "center", overflow: "hidden", background: `linear-gradient(160deg, ${C.dark} 0%, #0f1a2e 60%, #130e08 100%)` }}>
        {/* Orbs */}
        <div style={{ position: "absolute", top: "5%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.1) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)", animation: "float 10s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", top: "45%", right: "30%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 70%)" }} />

        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(234,88,12,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "80px 28px", width: "100%", animation: "fadeUp 1s ease" }}>
          <div style={{ maxWidth: 720 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(234,88,12,0.12)", border: "1px solid rgba(234,88,12,0.3)", borderRadius: 30, padding: "8px 20px", marginBottom: 28 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.orangeLight, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: C.orangeLight, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                Mission First Transport — A RE Jones Global LLC Company
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(44px, 6.5vw, 82px)", fontWeight: 900, lineHeight: 1.04, margin: "0 0 24px 0", letterSpacing: "-0.02em" }}>
              On Time.<br />
              <span style={{ background: `linear-gradient(135deg, ${C.orange}, ${C.amberLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Every Time.
              </span><br />
              Mission First.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 600, marginBottom: 14 }}>
              Mission First Transport provides <strong style={{ color: "#fff" }}>reliable, professional non-emergency transportation</strong> for court-involved clients, treatment programs, recovery services, and employment appointments across Central Texas.
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 44, maxWidth: 520 }}>
              Travis County · Austin, Texas · Serving courts, treatment centers, nonprofits, and VA services
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
              <a href="tel:7379990256" style={{ textDecoration: "none" }}>
                <button style={{ padding: "15px 32px", background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 800, fontSize: 15, boxShadow: `0 4px 24px rgba(234,88,12,0.45)`, letterSpacing: "0.02em" }}>
                  📞 Call 737-999-0256
                </button>
              </a>
              <Link to="/book-service" style={{ textDecoration: "none" }}>
                <button style={{ padding: "15px 32px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                  Schedule a Ride →
                </button>
              </Link>
              <Link to="/for-business" style={{ textDecoration: "none" }}>
                <button style={{ padding: "15px 32px", background: "transparent", color: C.orangeLight, border: `1px solid ${C.orange}44`, borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                  Partner With Us
                </button>
              </Link>
            </div>

            {/* Live stats */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {[
                { val: "24/7", label: "Available" },
                { val: "Austin", label: "Central Texas" },
                { val: "8+", label: "Service Types" },
                { val: "8", label: "Partner Organizations" },
              ].map(s => (
                <div key={s.val}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: C.orangeLight }}>{s.val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section style={{ background: C.darkMid, padding: "0 28px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: -44, position: "relative", zIndex: 10 }}>
            {[
              { icon: "📞", title: "Call Direct", desc: "Speak to our team immediately. No hold music. No phone trees.", action: () => window.location.href = "tel:7379990256", cta: "Call 737-999-0256" },
              { icon: "📅", title: "Schedule a Ride", desc: "Book transportation for court, treatment, employment, or programs.", link: "/book-service", cta: "Book Now" },
              { icon: "🤝", title: "Become a Partner", desc: "Courts, treatment programs, and nonprofits get priority access.", link: "/for-business", cta: "Partner With MFT" },
            ].map((c, i) => {
              const [h, setH] = useState(false);
              return (
                <div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  onClick={c.action}
                  style={{ ...glass(), padding: 28, cursor: "pointer", transform: h ? "translateY(-6px)" : "none",
                    borderColor: h ? C.orange : "rgba(234,88,12,0.2)",
                    boxShadow: h ? `0 20px 48px rgba(12,20,32,0.7), 0 0 0 1px ${C.orange}` : "0 8px 32px rgba(12,20,32,0.5)" }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 16 }}>{c.desc}</div>
                  {c.link ? (
                    <Link to={c.link} style={{ fontSize: 13, fontWeight: 700, color: C.orangeLight, textDecoration: "none" }}>{c.cta} →</Link>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.orangeLight }}>{c.cta} →</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.orangeLight, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>Our Services</div>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 900, color: "#fff", margin: "0 0 16px 0" }}>
            Where We Take You
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
            From courtrooms to clinics to careers — we provide the ride that makes every other step possible.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          {SERVICES.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: C.darkMid, padding: "80px 28px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.amberLight, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 900, color: "#fff", margin: 0 }}>Simple. Reliable. Done.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { step: "01", title: "Call or Book Online", desc: "Call 737-999-0256 or use our booking form. Tell us pickup, destination, date, and purpose." },
              { step: "02", title: "Confirmation", desc: "We confirm your ride within 2 hours. You receive driver details and ETA before pickup." },
              { step: "03", title: "On-Time Pickup", desc: "Your driver arrives on time, every time. Professional, respectful, and reliable." },
              { step: "04", title: "Safe Arrival", desc: "You arrive on time to court, treatment, employment, or your program. Documentation available on request." },
            ].map(s => {
              const [h, setH] = useState(false);
              return (
                <div key={s.step} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{ ...glass(), padding: 28, transform: h ? "translateY(-4px)" : "none", borderColor: h ? C.orange : "rgba(234,88,12,0.2)" }}>
                  <div style={{ fontSize: 40, fontWeight: 900, color: "rgba(234,88,12,0.3)", lineHeight: 1, marginBottom: 14 }}>{s.step}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.orangeLight, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>Partner Organizations</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#fff", margin: "0 0 16px 0" }}>Who Sends Clients to MFT</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            We work directly with case managers, courts, and agencies to provide seamless transportation for their clients.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 40 }}>
          {PARTNERS.map((p, i) => {
            const [h, setH] = useState(false);
            return (
              <div key={i} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{ ...glass(), padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, borderColor: h ? C.orange : "rgba(234,88,12,0.2)", transform: h ? "translateY(-3px)" : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: h ? C.orange : "rgba(234,88,12,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", fontSize: 14, fontWeight: 800, color: h ? "#fff" : C.orangeLight }}>✓</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{p.type}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="/for-business" style={{ textDecoration: "none" }}>
            <button style={{ padding: "14px 32px", background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 800, fontSize: 14, boxShadow: `0 4px 20px rgba(234,88,12,0.4)` }}>
              Set Up a Partner Account →
            </button>
          </Link>
        </div>
      </section>

      {/* ── QUICK BOOK FORM ── */}
      <section style={{ background: C.darkMid, padding: "80px 28px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.amberLight, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>Quick Request</div>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#fff", margin: "0 0 12px 0" }}>Schedule Your Ride</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Or call us directly: <a href="tel:7379990256" style={{ color: C.orangeLight, fontWeight: 700 }}>737-999-0256</a></p>
          </div>
          {submitted ? (
            <div style={{ ...glass(), padding: 48, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ color: "#fff", margin: "0 0 8px 0" }}>Ride Request Received</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 24px 0" }}>We'll confirm your ride within 2 hours.</p>
              <button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", pickup: "", destination: "", date: "", purpose: "" }); }}
                style={{ padding: "10px 24px", background: C.orange, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ ...glass(), padding: 36, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Your Name *", key: "name", placeholder: "Full name", required: true },
                { label: "Phone Number *", key: "phone", placeholder: "512-555-0100", required: true },
                { label: "Pickup Address *", key: "pickup", placeholder: "Where are we picking you up?", required: true },
                { label: "Destination *", key: "destination", placeholder: "Travis County Courthouse, Integral Care, etc.", required: true },
                { label: "Date & Time Needed *", key: "date", placeholder: "e.g. May 20, 2026 at 9:00 AM", required: true },
                { label: "Purpose of Trip", key: "purpose", placeholder: "Court appearance, treatment, job interview, etc.", required: false },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.label}</label>
                  <input required={f.required} value={formData[f.key]} onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(234,88,12,0.2)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <button type="submit" style={{ padding: 14, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 900, fontSize: 15, boxShadow: `0 4px 20px rgba(234,88,12,0.4)`, marginTop: 4 }}>
                🚗 Submit Ride Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── CONTACT BAR ── */}
      <section style={{ background: C.dark, borderTop: "1px solid rgba(234,88,12,0.12)", padding: "40px 28px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {[
            { icon: "📞", val: "737-999-0256", label: "Call or Text Anytime", href: "tel:7379990256" },
            { icon: "✉️", val: "missionreadytransport1@gmail.com", label: "Email Us", href: "mailto:missionreadytransport1@gmail.com" },
            { icon: "📍", val: "Austin, Texas", label: "Travis County & Central Texas", href: "/contact" },
          ].map(c => (
            <a key={c.val} href={c.href} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(234,88,12,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{c.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{c.label}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}