'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import CosmicCanvas from '@/components/CosmicCanvas';

// ---------------------------------------------------------------------------
// Magnetic CTA button
// ---------------------------------------------------------------------------

interface MagneticButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  href?: string;
}

function MagneticButton({ children, primary = false, href = '#' }: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setTranslate({ x: dx * 0.22, y: dy * 0.22 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTranslate({ x: 0, y: 0 });
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 32px',
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: '0.02em',
    textDecoration: 'none',
    cursor: 'pointer',
    transitionProperty: 'box-shadow, border-color',
    transitionDuration: '0.25s',
    transitionTimingFunction: 'ease',
    transform: `translate(${translate.x}px, ${translate.y}px)`,
    willChange: 'transform',
    userSelect: 'none',
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      onClick={handleSmoothScroll}
      style={
        primary
          ? {
              ...base,
              background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
              color: '#fff',
              boxShadow: '0 0 24px rgba(0,212,255,0.35)',
            }
          : {
              ...base,
              background: 'transparent',
              color: '#00d4ff',
              border: '1px solid rgba(0,212,255,0.45)',
            }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={
        primary
          ? { boxShadow: '0 0 44px rgba(0,212,255,0.6)' }
          : { borderColor: 'rgba(0,212,255,0.9)', boxShadow: '0 0 20px rgba(0,212,255,0.18)' }
      }
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// Scroll indicator
// ---------------------------------------------------------------------------

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' as const }}
      style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        color: 'rgba(240,244,255,0.4)',
        fontSize: 12,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <span>Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        style={{
          width: 20,
          height: 34,
          border: '1.5px solid rgba(0,212,255,0.3)',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 5,
        }}
      >
        <div
          style={{
            width: 3,
            height: 8,
            borderRadius: 2,
            background: 'rgba(0,212,255,0.6)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 36, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

// ---------------------------------------------------------------------------
// Main Hero
// ---------------------------------------------------------------------------

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#000000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Cosmic CSS animation background (replaces WebGL sphere) ────────── */}
      <CosmicCanvas />

      {/* ── Radial gradient behind text for legibility ──────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 80% at 0% 50%, rgba(0,0,0,0.85) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 600px) 1fr',
          alignItems: 'center',
          minHeight: '100vh',
          gap: 40,
        }}
      >
        {/* Left column – text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-sora), system-ui, sans-serif',
              fontSize: 'clamp(38px, 5.5vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            <span style={{ display: 'block', color: '#f0f4ff' }}>The Future of</span>
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dental Practice
            </span>
            <span style={{ display: 'block', color: '#f0f4ff' }}>Intelligence</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.7,
              color: 'rgba(240,244,255,0.6)',
              maxWidth: 520,
              margin: 0,
            }}
          >
            Automate operations. Enhance patient experience. Grow with confidence.
            Built exclusively for Australian dental clinics.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 4 }}
          >
            <MagneticButton primary href="#book">
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
            <MagneticButton href="#solutions">See How It Works</MagneticButton>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              paddingTop: 8,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: 'AU', label: 'Data Sovereignty' },
              { value: '100%', label: 'Legally Compliant' },
              { value: '24/7', label: 'Support' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 22px)',
                    fontWeight: 700,
                    color: '#00d4ff',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(240,244,255,0.4)',
                    marginTop: 3,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column – cosmic canvas fills this space */}
        <div aria-hidden />
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────────── */}
      <ScrollIndicator />

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          section > div[style*="grid-template-columns"] > div:first-child {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
