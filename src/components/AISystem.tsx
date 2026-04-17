'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NodeDef {
  id: string;
  label: string;
  x: number;
  y: number;
  isHub?: boolean;
}

interface EdgeDef {
  from: string;
  to: string;
}

// ---------------------------------------------------------------------------
// Graph data — hub-spoke layout centred on "Scheduler"
// ViewBox: 600 × 400
// ---------------------------------------------------------------------------

const NODES: NodeDef[] = [
  { id: 'scheduler',    label: 'Scheduler',     x: 300, y: 200, isHub: true },
  { id: 'patient-data', label: 'Patient Data',  x: 100, y: 80  },
  { id: 'recall',       label: 'Recall Engine', x: 300, y: 55  },
  { id: 'billing',      label: 'Billing AI',    x: 500, y: 80  },
  { id: 'comms',        label: 'Comms Hub',     x: 530, y: 220 },
  { id: 'analytics',    label: 'Analytics',     x: 460, y: 340 },
  { id: 'integrations', label: 'Integrations',  x: 140, y: 340 },
  { id: 'compliance',   label: 'Compliance',    x: 70,  y: 220 },
];

// All spokes connect to the hub; add a few cross-edges for richness
const EDGES: EdgeDef[] = [
  { from: 'scheduler',    to: 'patient-data' },
  { from: 'scheduler',    to: 'recall'       },
  { from: 'scheduler',    to: 'billing'      },
  { from: 'scheduler',    to: 'comms'        },
  { from: 'scheduler',    to: 'analytics'    },
  { from: 'scheduler',    to: 'integrations' },
  { from: 'scheduler',    to: 'compliance'   },
  // Cross-edges
  { from: 'patient-data', to: 'recall'       },
  { from: 'billing',      to: 'analytics'    },
  { from: 'comms',        to: 'compliance'   },
  { from: 'integrations', to: 'patient-data' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getNode(id: string): NodeDef {
  return NODES.find((n) => n.id === id)!;
}

// Lerp a point along an edge at t ∈ [0,1]
function lerpEdge(edge: EdgeDef, t: number): { x: number; y: number } {
  const a = getNode(edge.from);
  const b = getNode(edge.to);
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.1 },
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
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Feature pills data
// ---------------------------------------------------------------------------

const PILLS = [
  { label: 'Real-Time Decision Engine', accent: '#00d4ff' },
  { label: 'Autonomous Workflow Orchestration', accent: '#7c3aed' },
  { label: 'Adaptive Learning & Optimisation', accent: '#10b981' },
];

// ---------------------------------------------------------------------------
// AnimatedGraph — pure SVG + CSS animations, no external chart lib
// ---------------------------------------------------------------------------

interface AnimatedGraphProps {
  play: boolean;
}

function AnimatedGraph({ play }: AnimatedGraphProps) {
  // We'll track a tick counter to drive pulse positions
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!play) return;

    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      setTick(elapsed / 1000); // seconds
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [play]);

  // Each pulse travels its edge in 2.4 s with a per-edge phase offset
  const PULSE_DURATION = 2.4;

  return (
    <svg
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        maxWidth: 640,
        height: 'auto',
        overflow: 'visible',
        filter: 'drop-shadow(0 0 32px rgba(0,212,255,0.08))',
      }}
    >
      <defs>
        {/* Glow filter for nodes */}
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Hub node glow — more intense */}
        <filter id="hub-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Cyan gradient for edges */}
        <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
        </linearGradient>

        {/* Radial gradient for node fills */}
        <radialGradient id="node-fill" cx="30%" cy="30%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.18)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0.04)" />
        </radialGradient>
        <radialGradient id="hub-fill" cx="30%" cy="30%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.28)" />
          <stop offset="100%" stopColor="rgba(124,58,237,0.1)" />
        </radialGradient>
      </defs>

      {/* ── Edges ──────────────────────────────────────────────────────────── */}
      {EDGES.map((edge, i) => {
        const a = getNode(edge.from);
        const b = getNode(edge.to);
        const dashLen = 200;
        const totalLen = Math.hypot(b.x - a.x, b.y - a.y);
        // Staggered draw-in delay via CSS animation
        const delay = play ? `${i * 0.18}s` : '99999s';

        return (
          <line
            key={`edge-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#edge-grad)"
            strokeWidth={1.2}
            strokeDasharray={`${dashLen} ${totalLen}`}
            strokeDashoffset={play ? 0 : totalLen}
            style={{
              transition: `stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}`,
            }}
          />
        );
      })}

      {/* ── Static flow dashes on each edge ────────────────────────────────── */}
      {play &&
        EDGES.map((edge, i) => {
          const a = getNode(edge.from);
          const b = getNode(edge.to);
          const totalLen = Math.hypot(b.x - a.x, b.y - a.y);
          const animDelay = `${i * 0.3}s`;

          return (
            <line
              key={`flow-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(0,212,255,0.28)"
              strokeWidth={0.8}
              strokeDasharray="4 12"
              style={{
                animation: `flow-dash 1.8s linear ${animDelay} infinite`,
                strokeDashoffset: 0,
                // Safari needs this on the element itself
              }}
            />
          );
        })}

      {/* ── Pulse traversal circles ─────────────────────────────────────────── */}
      {play &&
        EDGES.map((edge, i) => {
          // Compute t for this edge, offset by phase
          const phase = (i / EDGES.length) * PULSE_DURATION;
          const t = ((tick + phase) % PULSE_DURATION) / PULSE_DURATION;
          const pos = lerpEdge(edge, t);
          // Fade in/out at edges of traverse
          const alpha =
            t < 0.12
              ? t / 0.12
              : t > 0.88
              ? (1 - t) / 0.12
              : 1;

          return (
            <circle
              key={`pulse-${i}`}
              cx={pos.x}
              cy={pos.y}
              r={3.5}
              fill="#00d4ff"
              opacity={alpha * 0.9}
              style={{
                filter: 'drop-shadow(0 0 4px #00d4ff)',
              }}
            />
          );
        })}

      {/* ── Nodes ──────────────────────────────────────────────────────────── */}
      {NODES.map((node, i) => {
        const isHub = node.isHub;
        const rw = isHub ? 52 : 42;
        const rh = isHub ? 28 : 22;
        const delay = play ? `${0.6 + i * 0.09}s` : '99999s';

        return (
          <g key={node.id} style={{ opacity: 0, animation: play ? `node-fade-in 0.5s ease ${delay} forwards` : 'none' }}>
            {/* Outer pulse ring for hub only */}
            {isHub && play && (
              <ellipse
                cx={node.x}
                cy={node.y}
                rx={rw + 16}
                ry={rh + 14}
                fill="none"
                stroke="rgba(0,212,255,0.12)"
                strokeWidth={1}
                style={{ animation: 'hub-ring-pulse 2.8s ease-in-out infinite' }}
              />
            )}

            {/* Node background rect */}
            <rect
              x={node.x - rw}
              y={node.y - rh}
              width={rw * 2}
              height={rh * 2}
              rx={isHub ? 12 : 10}
              fill={isHub ? 'url(#hub-fill)' : 'url(#node-fill)'}
              stroke={isHub ? 'rgba(0,212,255,0.65)' : 'rgba(0,212,255,0.3)'}
              strokeWidth={isHub ? 1.5 : 1}
              filter={isHub ? 'url(#hub-glow)' : 'url(#node-glow)'}
              style={{
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={isHub ? 11 : 9.5}
              fontWeight={isHub ? 700 : 500}
              fill={isHub ? '#00d4ff' : 'rgba(240,244,255,0.85)'}
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.02em"
              style={{ userSelect: 'none' }}
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {/* ── CSS keyframes injected inline ──────────────────────────────────── */}
      <style>{`
        @keyframes flow-dash {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -32; }
        }
        @keyframes node-fade-in {
          from { opacity: 0; transform: scale(0.82); transform-origin: center; }
          to   { opacity: 1; transform: scale(1);    transform-origin: center; }
        }
        @keyframes hub-ring-pulse {
          0%, 100% { opacity: 0.2; r: 0; }
          50%       { opacity: 0.6; }
        }
      `}</style>
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
        {/* Two-column layout: text left, graph right on larger screens */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* ── Left: heading + subheading + pills ─────────────────────────── */}
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

            {/* Heading with gradient text */}
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
                    boxShadow: `0 2px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    color: '#f0f4ff',
                    fontSize: 13.5,
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                  }}
                >
                  {/* Accent dot */}
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

          {/* ── Right: animated SVG graph ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.9, ease: "easeOut" as const, delay: 0.15 }}
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
                  border: '1.5px solid rgba(0,212,255,0.45)',
                  ...s,
                  borderWidth: '1.5px',
                  // Only show the two relevant border sides
                  borderTop: s.top !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  borderBottom: s.bottom !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  borderLeft: s.left !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  borderRight: s.right !== undefined ? '1.5px solid rgba(0,212,255,0.45)' : 'none',
                  ...s,
                  pointerEvents: 'none',
                }}
              />
            ))}

            <AnimatedGraph play={isInView} />
          </motion.div>
        </div>
      </div>

      {/* Global keyframes */}
      <style>{`
        @keyframes pill-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
