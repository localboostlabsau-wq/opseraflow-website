'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useAnimTime } from '@/hooks/useAnimTime';
import { clamp, Easing } from '@/lib/anim';

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const, delay: 0.1 },
  },
};

const pillContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

// ---------------------------------------------------------------------------
// Feature pills data
// ---------------------------------------------------------------------------

const PILLS = [
  { label: 'Real-Time Decision Engine',             accent: '#00d4ff' },
  { label: 'Autonomous Workflow Orchestration',      accent: '#7c3aed' },
  { label: 'Adaptive Learning & Optimisation',       accent: '#10b981' },
];

// ---------------------------------------------------------------------------
// Orbital node definitions (Scene 4 style)
// ---------------------------------------------------------------------------

const ORBITAL_NODES = [
  { label: 'Patient Data' },
  { label: 'Recall Engine' },
  { label: 'Billing' },
  { label: 'Comms Hub' },
  { label: 'Analytics' },
  { label: 'Integrations' },
  { label: 'Compliance' },
] as const;

// ---------------------------------------------------------------------------
// CosmicOrbital — Scene 4 hub+satellite system converted to TypeScript SVG
// ---------------------------------------------------------------------------

const W = 560;
const H = 480;
const HUB_CX = W * 0.52;
const HUB_CY = H * 0.5;
const HUB_R = 44;
const ORBIT_R = 188;

const CYAN = '#00d4ff';
const VIOLET = '#7c3aed';

function CosmicOrbital({ play }: { play: boolean }) {
  const t = useAnimTime(60, true, play);

  // Hub intro scale — animates in over first 1s
  const hubInT = clamp(t / 0.9, 0, 1);
  const hubScale = Easing.easeOutBack(Math.min(hubInT, 1));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{
        width: '100%',
        maxWidth: 600,
        height: 'auto',
        overflow: 'visible',
        filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.06))',
      }}
      aria-label="OpseraFlow intelligence layer — hub and satellite diagram"
      role="img"
    >
      <defs>
        {/* Radial for hub fill */}
        <radialGradient id="hub-fill-cg" cx="35%" cy="35%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.22)" />
          <stop offset="100%" stopColor="rgba(124,58,237,0.1)" />
        </radialGradient>
        {/* Radial for node fill */}
        <radialGradient id="node-fill-cg" cx="35%" cy="35%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.12)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0.03)" />
        </radialGradient>
      </defs>

      {/* ── Orbit rings ─────────────────────────────────────────────────── */}
      <circle
        cx={HUB_CX} cy={HUB_CY}
        r={ORBIT_R + 50}
        fill="none"
        stroke={CYAN}
        strokeWidth={0.5}
        opacity={0.07}
      />
      <circle
        cx={HUB_CX} cy={HUB_CY}
        r={ORBIT_R}
        fill="none"
        stroke={CYAN}
        strokeWidth={1}
        strokeDasharray="5 12"
        opacity={0.25}
      />
      <circle
        cx={HUB_CX} cy={HUB_CY}
        r={ORBIT_R - 60}
        fill="none"
        stroke={VIOLET}
        strokeWidth={0.5}
        opacity={0.1}
      />

      {/* ── Spokes + pulse dots + satellite nodes ───────────────────────── */}
      {ORBITAL_NODES.map((node, i) => {
        const t0 = 0.9 + i * 0.18;
        const inT = clamp((t - t0) / 0.7, 0, 1);
        const alpha = Easing.easeOutCubic(inT);
        if (alpha < 0.01) return null;

        const baseAng = -Math.PI / 2 + (i / ORBITAL_NODES.length) * Math.PI * 2;
        const ang = baseAng + t * 0.1;
        const nx = HUB_CX + Math.cos(ang) * ORBIT_R;
        const ny = HUB_CY + Math.sin(ang) * ORBIT_R;
        const nr = 16 + (i % 3) * 5;

        // Spoke: hub edge → node edge
        const dx = nx - HUB_CX;
        const dy = ny - HUB_CY;
        const dist = Math.hypot(dx, dy);
        const ux = dx / dist;
        const uy = dy / dist;
        const sx = HUB_CX + ux * HUB_R;
        const sy = HUB_CY + uy * HUB_R;
        const ex = nx - ux * nr;
        const ey = ny - uy * nr;
        const spokeLen = Math.hypot(ex - sx, ey - sy);

        // Data pulse position
        const pulseT = ((t + i * 0.65) % 2.2) / 2.2;
        const px = sx + ux * spokeLen * pulseT;
        const py = sy + uy * spokeLen * pulseT;
        const pulseAlpha =
          pulseT < 0.08 ? pulseT / 0.08 : pulseT > 0.92 ? (1 - pulseT) / 0.08 : 1;
        const showPulse = pulseT > 0.04 && pulseT < 0.96 && inT > 0.8;

        // Label: push outward past node edge
        const labelX = nx + ux * (nr + 14);
        const labelY = ny + uy * (nr + 14);
        const textAnchor = nx > HUB_CX + 10 ? 'start' : nx < HUB_CX - 10 ? 'end' : 'middle';

        // Accent color alternates
        const accent = i % 3 === 1 ? VIOLET : CYAN;

        return (
          <g key={node.label} opacity={alpha}>
            {/* Spoke */}
            <line
              x1={sx} y1={sy} x2={ex} y2={ey}
              stroke={CYAN}
              strokeWidth={0.8}
              opacity={0.35}
            />
            {/* Data pulse dot */}
            {showPulse && (
              <circle
                cx={px} cy={py}
                r={3.5}
                fill={CYAN}
                opacity={pulseAlpha * 0.95}
                style={{ filter: 'drop-shadow(0 0 5px #00d4ff)' }}
              />
            )}
            {/* Satellite node */}
            <circle
              cx={nx} cy={ny}
              r={nr}
              fill="url(#node-fill-cg)"
              stroke={accent}
              strokeWidth={1}
              opacity={0.9}
            />
            <circle
              cx={nx} cy={ny}
              r={3}
              fill={accent}
              opacity={0.8}
            />
            {/* Label */}
            <text
              x={labelX} y={labelY}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fontSize={10.5}
              fontWeight={500}
              fill="rgba(240,244,255,0.8)"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.03em"
              style={{ userSelect: 'none' }}
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* ── Hub ─────────────────────────────────────────────────────────── */}
      <g
        transform={`translate(${HUB_CX}, ${HUB_CY}) scale(${hubScale}) translate(${-HUB_CX}, ${-HUB_CY})`}
        opacity={hubInT}
      >
        {/* Outer pulse ring */}
        <circle
          cx={HUB_CX} cy={HUB_CY}
          r={HUB_R + 18}
          fill="none"
          stroke={CYAN}
          strokeWidth={1}
          opacity={0.12 + 0.08 * Math.sin(t * 1.8)}
        />
        {/* Hub fill */}
        <circle
          cx={HUB_CX} cy={HUB_CY}
          r={HUB_R}
          fill="url(#hub-fill-cg)"
          stroke={CYAN}
          strokeWidth={1.5}
          style={{ filter: `drop-shadow(0 0 ${18 + 8 * Math.sin(t * 2)}px rgba(0,212,255,0.5))` }}
        />
        {/* Inner ring */}
        <circle
          cx={HUB_CX} cy={HUB_CY}
          r={HUB_R - 12}
          fill="none"
          stroke="rgba(0,212,255,0.2)"
          strokeWidth={1}
        />
        {/* Hub label */}
        <text
          x={HUB_CX} y={HUB_CY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fontWeight={700}
          fill={CYAN}
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.1em"
          style={{ userSelect: 'none', textTransform: 'uppercase' }}
        >
          Core
        </text>
      </g>

      {/* ── Section marker (top-right, monospace) ───────────────────────── */}
      <text
        x={W - 12} y={16}
        textAnchor="end"
        fontSize={9}
        fontWeight={400}
        fill="rgba(0,212,255,0.35)"
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.2em"
        style={{ userSelect: 'none' }}
      >
        § 03 · SYSTEM
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main AISystem section
// ---------------------------------------------------------------------------

export default function AISystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="ai-system"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0a0a0f',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 128px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Violet tint ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(124,58,237,0.07) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Fine grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* ── Left: heading + subheading + pills ─────────────────────── */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={sectionVariants}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {/* Eyebrow */}
            <motion.span
              variants={headingVariants}
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: 8,
                padding: '5px 14px',
                borderRadius: 100,
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.2)',
                fontSize: 12,
                fontWeight: 600,
                color: '#a78bfa',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Under the Hood
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={headingVariants}
              style={{
                margin: 0,
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #f0f4ff 0%, #00d4ff 40%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Intelligence Layer
            </motion.h2>

            {/* Subheading */}
            <motion.p
              variants={headingVariants}
              style={{
                margin: 0,
                fontSize: 'clamp(15px, 1.7vw, 17px)',
                lineHeight: 1.75,
                color: 'rgba(240,244,255,0.55)',
                maxWidth: 480,
              }}
            >
              A dynamic AI system working silently behind your practice —
              orchestrating data, decisions, and actions in real time.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={pillContainerVariants}
              style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}
            >
              {PILLS.map((pill) => (
                <motion.div
                  key={pill.label}
                  variants={pillVariants}
                  style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 18px',
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: `1px solid ${pill.accent}26`,
                    boxShadow: '0 2px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
                    color: '#f0f4ff',
                    fontSize: 13.5,
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: pill.accent,
                      boxShadow: `0 0 8px ${pill.accent}`,
                      flexShrink: 0,
                      animation: 'pill-dot-pulse 2.4s ease-in-out infinite',
                    }}
                  />
                  {pill.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: cosmic orbital diagram ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.9, ease: 'easeOut' as const, delay: 0.15 }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 'clamp(20px, 3vw, 40px)',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(124,58,237,0.14)',
              boxShadow:
                '0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Corner accents */}
            {[
              { top: -1, left: -1, borderRadius: '12px 0 0 0' },
              { top: -1, right: -1, borderRadius: '0 12px 0 0' },
              { bottom: -1, left: -1, borderRadius: '0 0 0 12px' },
              { bottom: -1, right: -1, borderRadius: '0 0 12px 0' },
            ].map((s, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: 'absolute',
                  width: 16,
                  height: 16,
                  borderTop: (s as { top?: number }).top !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  borderBottom: (s as { bottom?: number }).bottom !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  borderLeft: (s as { left?: number }).left !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  borderRight: (s as { right?: number }).right !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  ...s,
                  pointerEvents: 'none',
                }}
              />
            ))}

            <CosmicOrbital play={isInView} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pill-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
