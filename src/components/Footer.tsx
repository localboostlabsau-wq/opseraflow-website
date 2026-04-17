"use client";

import { motion } from "framer-motion";
import { ExternalLink, MessageCircle } from "lucide-react";

const SOLUTIONS_LINKS = [
  { label: "AI Scheduling", href: "#solutions" },
  { label: "Patient Automation", href: "#solutions" },
  { label: "Practice Analytics", href: "#solutions" },
  { label: "Recall Management", href: "#solutions" },
  { label: "Integrations", href: "#integrations" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: <ExternalLink size={18} />,
  },
  {
    label: "X / Twitter",
    href: "https://x.com",
    icon: <MessageCircle size={18} />,
  },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* Animated gradient line at top */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #00d4ff 30%, #0066ff 60%, #00d4ff 80%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Upper section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 select-none w-fit">
              <span className="text-xl font-extrabold tracking-tight text-white">
                OPSERA
              </span>
              <span
                className="text-xl font-extrabold tracking-tight"
                style={{ color: "#00d4ff" }}
              >
                FLOW
              </span>
              <span className="relative flex h-2 w-2 ml-0.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "#00d4ff" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "#00d4ff" }}
                />
              </span>
            </a>

            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Australia&apos;s most advanced AI automation for dental clinics.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, color: "#00d4ff" }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/40 hover:text-cyan-400 transition-colors duration-200"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Solutions column */}
          <FooterColumn title="Solutions">
            <ul className="flex flex-col gap-2">
              {SOLUTIONS_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Company column */}
          <FooterColumn title="Company">
            <ul className="flex flex-col gap-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Contact column */}
          <FooterColumn title="Contact">
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:info@opseraflow.com.au"
                  className="text-sm text-white/55 hover:text-cyan-400 transition-colors duration-200 break-all"
                >
                  info@opseraflow.com.au
                </a>
              </li>
              <li>
                <span className="text-sm text-white/55">Melbourne, Australia</span>
              </li>
            </ul>
          </FooterColumn>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>
            &copy; 2025 Opsera Flow Pty Ltd. All rights reserved.&nbsp;|&nbsp;ABN:
            [placeholder]&nbsp;|&nbsp;Fully Legally Compliant
          </p>
          <p className="text-white/25 text-xs">
            Built in Melbourne &mdash; Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
}
