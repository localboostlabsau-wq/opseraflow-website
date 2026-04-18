"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, CalendarCheck } from "lucide-react";

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Integrations", href: "#integrations" },
  { label: "AI System", href: "#ai-system" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY;
    if (latest > previous && latest > 80) {
      setIsVisible(false);
      setMobileOpen(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(latest);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "body" || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(0,0,0,0.75)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

            {/* ── Logo ── */}
            <a
              href="#"
              onClick={(e) => handleSmoothScroll(e, "#")}
              style={{ display: "flex", alignItems: "center", gap: 4, textDecoration: "none", userSelect: "none" }}
            >
              <span style={{ fontFamily: "var(--font-sora), system-ui", fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
                OPSERA
              </span>
              <span style={{ fontFamily: "var(--font-sora), system-ui", fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: "#00d4ff" }}>
                FLOW
              </span>
              <span className="relative flex" style={{ width: 7, height: 7, marginLeft: 3 }}>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: "#00d4ff", opacity: 0.7 }} />
                <span className="relative inline-flex rounded-full" style={{ width: 7, height: 7, background: "#00d4ff" }} />
              </span>
            </a>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  style={{ fontSize: 14, fontWeight: 500, color: "rgba(240,244,255,0.6)", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.015em" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,244,255,0.6)")}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* ── Book a Call CTA ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <motion.a
                href="#book"
                onClick={(e) => handleSmoothScroll(e, "#book")}
                whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(0,212,255,0.55)" }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex"
                style={{
                  alignItems: "center",
                  gap: 7,
                  padding: "9px 22px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #00d4ff 0%, #009ec4 100%)",
                  color: "#000",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  boxShadow: "0 0 18px rgba(0,212,255,0.28)",
                  transition: "box-shadow 0.25s",
                  whiteSpace: "nowrap",
                }}
              >
                <CalendarCheck size={14} />
                Book a Call
              </motion.a>

              {/* Hamburger */}
              <button
                className="md:hidden"
                style={{ color: "rgba(240,244,255,0.8)", background: "none", border: "none", cursor: "pointer", padding: 4 }}
                onClick={() => setMobileOpen((p) => !p)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{ overflow: "hidden", background: "rgba(0,0,0,0.95)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    style={{ fontSize: 15, fontWeight: 500, color: "rgba(240,244,255,0.75)", textDecoration: "none" }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#book"
                  onClick={(e) => handleSmoothScroll(e, "#book")}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "13px 20px", borderRadius: 10,
                    background: "linear-gradient(135deg, #00d4ff, #009ec4)",
                    color: "#000", fontSize: 14, fontWeight: 700, textDecoration: "none", marginTop: 4,
                  }}
                >
                  <CalendarCheck size={15} /> Book a Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
