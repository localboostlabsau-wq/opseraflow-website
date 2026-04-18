"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarCheck, User, Building2, Mail, Phone, MessageSquare, Stethoscope, CheckCircle, ChevronDown } from "lucide-react";

interface FormState {
  // Personal
  fullName: string;
  role: string;
  email: string;
  phone: string;
  // Clinic
  clinicName: string;
  location: string;
  numDentists: string;
  currentSoftware: string;
  mainChallenge: string;
  message: string;
}

const INITIAL: FormState = {
  fullName: "", role: "", email: "", phone: "",
  clinicName: "", location: "", numDentists: "", currentSoftware: "", mainChallenge: "", message: "",
};

const SOFTWARE_OPTIONS = [
  "Dental4Windows", "Exact (SOE)", "Pracsoft", "Carestream Dental",
  "Dentrix Ascend", "Genie Solutions", "Zedmed", "Curve Dental",
  "Orthotrac", "Best Practice", "Salud", "Other",
];

const CHALLENGE_OPTIONS = [
  "Too many no-shows", "Admin taking too much time", "Manual patient recalls",
  "Billing and revenue leakage", "Disconnected software", "Compliance and reporting",
  "Staff efficiency", "Multi-location management", "Other",
];

const DENTIST_OPTIONS = ["1", "2 to 3", "4 to 6", "7 to 10", "10+"];

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "12px 16px",
  color: "#f0f4ff",
  fontSize: 14,
  fontFamily: "var(--font-outfit), system-ui",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

function Input({ id, label, type = "text", value, onChange, required, icon: Icon }: {
  id: keyof FormState; label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean; icon?: React.ComponentType<{ size?: number }>;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(240,244,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: "#00d4ff", marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(0,212,255,0.5)", pointerEvents: "none" }}>
            <Icon size={14} />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            paddingLeft: Icon ? 38 : 16,
            borderColor: focused ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)",
            boxShadow: focused ? "0 0 0 3px rgba(0,212,255,0.08)" : "none",
          }}
          placeholder=""
        />
      </div>
    </div>
  );
}

function Select({ id, label, value, onChange, options, required, icon: Icon }: {
  id: keyof FormState; label: string; value: string;
  onChange: (v: string) => void; options: string[]; required?: boolean;
  icon?: React.ComponentType<{ size?: number }>;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(240,244,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: "#00d4ff", marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(0,212,255,0.5)", pointerEvents: "none", zIndex: 1 }}>
            <Icon size={14} />
          </div>
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            paddingLeft: Icon ? 38 : 16,
            paddingRight: 36,
            appearance: "none",
            WebkitAppearance: "none",
            cursor: "pointer",
            borderColor: focused ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)",
            boxShadow: focused ? "0 0 0 3px rgba(0,212,255,0.08)" : "none",
          }}
        >
          <option value="" disabled style={{ background: "#111" }}>Select...</option>
          {options.map((o) => <option key={o} value={o} style={{ background: "#111" }}>{o}</option>)}
        </select>
        <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(240,244,255,0.35)", pointerEvents: "none" }}>
          <ChevronDown size={14} />
        </div>
      </div>
    </div>
  );
}

function Textarea({ id, label, value, onChange, required }: {
  id: keyof FormState; label: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(240,244,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: "#00d4ff", marginLeft: 3 }}>*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        style={{
          ...inputStyle,
          resize: "none",
          borderColor: focused ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(0,212,255,0.08)" : "none",
        }}
        placeholder="Anything else we should know about your clinic or goals..."
      />
    </div>
  );
}

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = (key: keyof FormState) => (val: string) => setForm((p) => ({ ...p, [key]: val }));

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.clinicName.trim()) e.clinicName = "Required";
    if (!form.location.trim()) e.location = "Required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="book"
      ref={ref}
      style={{
        position: "relative",
        background: "radial-gradient(ellipse 130% 80% at 50% 0%, rgba(0,212,255,0.05) 0%, #000 55%)",
        padding: "100px 0 120px",
        overflow: "hidden",
      }}
    >
      {/* Top glow line */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)",
      }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            borderRadius: 100, background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.18)",
            marginBottom: 24,
          }}>
            <CalendarCheck size={13} style={{ color: "#00d4ff" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#00d4ff", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Discovery Call
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-sora), system-ui",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: 16,
          }}>
            Book a{" "}
            <span style={{
              background: "linear-gradient(135deg, #00d4ff, #67e8f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Free Call
            </span>
          </h2>
          <p style={{ color: "rgba(240,244,255,0.5)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Tell us about your clinic. We will reach out within one business day to schedule your personalised demonstration.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: "rgba(0,212,255,0.04)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: 20,
              padding: "60px 40px",
              textAlign: "center",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
            }}
          >
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(0,212,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle size={28} style={{ color: "#00d4ff" }} />
            </div>
            <h3 style={{ fontFamily: "var(--font-sora)", fontSize: 24, fontWeight: 700, color: "#fff" }}>Request Received</h3>
            <p style={{ color: "rgba(240,244,255,0.5)", maxWidth: 400, lineHeight: 1.7 }}>
              Thank you, {form.fullName.split(" ")[0]}. Our team will be in touch with you at <strong style={{ color: "#00d4ff" }}>{form.email}</strong> within one business day.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "clamp(28px, 5vw, 52px)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* ── Personal Details ── */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(0,212,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={13} style={{ color: "#00d4ff" }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#00d4ff", letterSpacing: "0.06em", textTransform: "uppercase" }}>Your Details</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <Input id="fullName" label="Full Name" value={form.fullName} onChange={set("fullName")} required icon={User} />
                <Input id="role" label="Your Role" value={form.role} onChange={set("role")} icon={Stethoscope} />
                <Input id="email" label="Email Address" type="email" value={form.email} onChange={set("email")} required icon={Mail} />
                <Input id="phone" label="Phone Number" type="tel" value={form.phone} onChange={set("phone")} icon={Phone} />
              </div>
              {errors.fullName && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors.fullName}</p>}
              {errors.email && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors.email}</p>}
            </div>

            {/* ── Clinic Details ── */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(124,58,237,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Building2 size={13} style={{ color: "#a78bfa" }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", letterSpacing: "0.06em", textTransform: "uppercase" }}>Clinic Details</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <Input id="clinicName" label="Clinic Name" value={form.clinicName} onChange={set("clinicName")} required icon={Building2} />
                <Input id="location" label="City / Suburb" value={form.location} onChange={set("location")} required />
                <Select id="numDentists" label="Number of Dentists" value={form.numDentists} onChange={set("numDentists")} options={DENTIST_OPTIONS} icon={Stethoscope} />
                <Select id="currentSoftware" label="Current Software" value={form.currentSoftware} onChange={set("currentSoftware")} options={SOFTWARE_OPTIONS} />
              </div>
              {errors.clinicName && <p style={{ color: "#f87171", fontSize: 12, marginTop: 6 }}>{errors.clinicName}</p>}
            </div>

            {/* ── Main Challenge ── */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MessageSquare size={13} style={{ color: "#34d399" }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#34d399", letterSpacing: "0.06em", textTransform: "uppercase" }}>What to Solve</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>

              <div style={{ display: "grid", gap: 16 }}>
                <Select id="mainChallenge" label="Biggest Challenge" value={form.mainChallenge} onChange={set("mainChallenge")} options={CHALLENGE_OPTIONS} />
                <Textarea id="message" label="Additional Context" value={form.message} onChange={set("message")} />
              </div>
            </div>

            {/* Submit */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,212,255,0.45)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 48px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #00d4ff 0%, #0099c4 100%)",
                  color: "#000", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
                  boxShadow: "0 0 24px rgba(0,212,255,0.3)",
                  fontFamily: "var(--font-outfit), system-ui",
                  letterSpacing: "0.02em",
                }}
              >
                <CalendarCheck size={16} />
                Book My Discovery Call
              </motion.button>

              <p style={{ color: "rgba(240,244,255,0.3)", fontSize: 12, textAlign: "center" }}>
                No spam. Your details are protected under our{" "}
                <a href="/privacy" style={{ color: "rgba(0,212,255,0.6)", textDecoration: "none" }}>Privacy Policy</a>.
                We respond within one business day.
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
