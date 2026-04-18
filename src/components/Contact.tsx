"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "", clinic: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.clinic.trim()) e.clinic = "Clinic name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required.";
    if (!form.message.trim()) e.message = "Please include a message.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setErrors({});
    setSubmitted(true);
  };

  const Field = ({ id, label, type = "text", required = false, textarea = false }: {
    id: keyof typeof form; label: string; type?: string; required?: boolean; textarea?: boolean;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}{required && <span className="text-[#00d4ff] ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={form[id]}
          onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
          rows={4}
          className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus-visible:outline-none focus-visible:border-[#00d4ff] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] transition-[border-color,box-shadow] resize-none ${errors[id] ? "border-red-500/60" : "border-white/10"}`}
          placeholder={`Your ${label.toLowerCase()}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={form[id]}
          onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
          className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus-visible:outline-none focus-visible:border-[#00d4ff] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.1)] transition-[border-color,box-shadow] ${errors[id] ? "border-red-500/60" : "border-white/10"}`}
          placeholder={`Your ${label.toLowerCase()}`}
        />
      )}
      {errors[id] && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <AlertCircle size={12} /> {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" className="py-24 bg-grid" style={{ background: "radial-gradient(ellipse 120% 60% at 20% 60%, rgba(124,58,237,0.06) 0%, #000 55%)" }}>
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#00d4ff] border border-[#00d4ff]/30 bg-[#00d4ff]/5 mb-6">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start the <span className="gradient-text-cyan">Conversation</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Let&apos;s Talk</h3>
              <p className="text-gray-400 leading-relaxed">
                Ready to see what OpseraFlow can do for your practice? Reach out and we&apos;ll be in touch within one business day.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:info@opseraflow.com.au"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-[#00d4ff]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-[border-color,box-shadow] group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#00d4ff]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email us</p>
                  <p className="text-white font-medium group-hover:text-[#00d4ff] transition-colors">
                    info@opseraflow.com.au
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 glass rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#7c3aed]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Location</p>
                  <p className="text-white font-medium">Melbourne, Australia</p>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-xl p-6">
              <p className="text-[#00d4ff] font-semibold text-sm mb-1">Australian owned. Enterprise-grade. Dental-first.</p>
              <p className="text-gray-400 text-sm">
                Every solution we build is designed specifically for Australian dental practices compliant, secure, and built to last.
              </p>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {submitted ? (
              <div className="glass rounded-2xl p-10 text-center flex flex-col items-center gap-4 border border-[#00d4ff]/20">
                <div className="w-16 h-16 rounded-full bg-[#00d4ff]/10 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#00d4ff]" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received</h3>
                <p className="text-gray-400 text-sm max-w-sm">
                  Thank you for reaching out. A member of our team will be in contact within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <Field id="name" label="Full Name" required />
                <Field id="clinic" label="Clinic Name" required />
                <Field id="email" label="Email Address" type="email" required />
                <Field id="phone" label="Phone Number (optional)" type="tel" />
                <Field id="message" label="Message" required textarea />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-semibold text-black bg-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-[box-shadow] flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight size={16} />
                </motion.button>

                <p className="text-center text-gray-600 text-xs">
                  No spam. Ever. Your details are handled under our{" "}
                  <a href="/privacy" className="text-[#00d4ff] hover:underline">Privacy Policy</a>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
