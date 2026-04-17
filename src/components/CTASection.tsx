"use client";

import React, { useRef, useCallback, useState, useMemo } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

// ---------------------------------------------------------------------------
// Deterministic pseudo-random — avoids hydration mismatch
// ---------------------------------------------------------------------------

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3) * 100,
    y: seededRandom(i * 3 + 1) * 100,
    size: 2 + seededRandom(i * 3 + 2) * 3,
    duration: 6 + seededRandom(i * 7) * 10,
    delay: seededRandom(i * 11) * -12,
    driftX: (seededRandom(i * 5) - 0.5) * 80,
    driftY: (seededRandom(i * 5 + 1) - 0.5) * 80,
  }));
}

// ---------------------------------------------------------------------------
// Floating particles background
// ---------------------------------------------------------------------------

function ParticleField() {
  const particles = useMemo(() => generateParticles(36), []);

  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background:
              p.id % 3 === 0
                ? "rgba(0,212,255,0.5)"
                : p.id % 3 === 1
                ? "rgba(124,58,237,0.4)"
                : "rgba(240,244,255,0.25)",
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated gradient background
// ---------------------------------------------------------------------------

function AnimatedGradient() {
  return (
    <>
      {/* Base dark */}
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, background: "#07070d" }}
      />

      {/* Animated cyan blob */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.12) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated violet blob */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          maxWidth: 650,
          maxHeight: 650,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -8,
        }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Magnetic CTA button (self-contained in this file)
// ---------------------------------------------------------------------------

interface MagneticButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  href?: string;
}

function MagneticButton({ children, primary = false, href = "#" }: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setTranslate({
        x: (e.clientX - cx) * 0.2,
        y: (e.clientY - cy) * 0.2,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTranslate({ x: 0, y: 0 });
  }, []);

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 36px",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: "0.01em",
    textDecoration: "none",
    cursor: "pointer",
    transition: "box-shadow 0.25s ease, border-color 0.25s ease",
    transform: `translate(${translate.x}px, ${translate.y}px)`,
    willChange: "transform",
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
    color: "#fff",
    border: "1px solid transparent",
    boxShadow: "0 0 28px rgba(0,212,255,0.4), 0 4px 24px rgba(0,0,0,0.4)",
  };

  const ghostStyle: React.CSSProperties = {
    ...baseStyle,
    background: "transparent",
    color: "rgba(240,244,255,0.8)",
    border: "1px solid rgba(240,244,255,0.2)",
    boxShadow: "none",
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      style={primary ? primaryStyle : ghostStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={
        primary
          ? { boxShadow: "0 0 56px rgba(0,212,255,0.65), 0 4px 32px rgba(0,0,0,0.5)" }
          : {
              borderColor: "rgba(0,212,255,0.5)",
              color: "#00d4ff",
              boxShadow: "0 0 20px rgba(0,212,255,0.15)",
            }
      }
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// Guarantee pill
// ---------------------------------------------------------------------------

function GuaranteePill() {
  return (
    <motion.div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 20px",
        borderRadius: 100,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: 12,
        fontWeight: 500,
        color: "rgba(240,244,255,0.65)",
        letterSpacing: "0.04em",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      whileHover={{
        background: "rgba(0,212,255,0.08)",
        borderColor: "rgba(0,212,255,0.25)",
        color: "rgba(240,244,255,0.9)",
      }}
      transition={{ duration: 0.2 }}
    >
      <ShieldCheck size={14} strokeWidth={2} style={{ color: "#00d4ff", flexShrink: 0 }} />
      Fully Legally Compliant · Australian Owned · Enterprise Security
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { y: 36, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      {/* Layered animated background */}
      <AnimatedGradient />

      {/* Floating particles */}
      <ParticleField />

      {/* Glowing top border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 30%, rgba(124,58,237,0.5) 70%, transparent 100%)",
        }}
      />
      {/* Glowing bottom border */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(0,212,255,0.5) 70%, transparent 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 780,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants}>
          <GuaranteePill />
        </motion.div>

        {/* Main heading */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#f0f4ff",
            margin: 0,
          }}
        >
          Ready to Transform{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Practice?
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: "clamp(15px, 1.8vw, 18px)",
            lineHeight: 1.7,
            color: "rgba(240,244,255,0.6)",
            maxWidth: 560,
            margin: 0,
          }}
        >
          Join the forward-thinking dental clinics across Australia already
          operating at a different level. No pressure, no lock-in — just
          results.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <MagneticButton primary href="#book-call">
            Book a Discovery Call
            <ArrowRight size={18} strokeWidth={2.2} />
          </MagneticButton>

          <MagneticButton href="mailto:info@opseraflow.com.au">
            <Mail size={16} strokeWidth={1.8} />
            info@opseraflow.com.au
          </MagneticButton>
        </motion.div>

        {/* Small reassurance note */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 13,
            color: "rgba(240,244,255,0.35)",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          Free 30-min consultation · No commitment required · Australian-owned &amp; operated
        </motion.p>
      </motion.div>

      {/* Subtle grid overlay on top of everything */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </section>
  );
}
