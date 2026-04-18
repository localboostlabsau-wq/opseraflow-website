'use client';

// CosmicCanvas — full-section background for Hero.
// CSS-div based; adapted from scenes.jsx (Starfield, celestial body, rings).
// No canvas/WebGL dependency. SSR-safe. prefers-reduced-motion aware.

import React, { useMemo } from 'react';
import { useAnimTime } from '@/hooks/useAnimTime';
import { clamp } from '@/lib/anim';

// ── Palette ──────────────────────────────────────────────────────────────────
const CYAN = '#00d4ff';
const VIOLET = '#7c3aed';
const INK = 'rgba(255,255,255,0.85)';

// ── Star seed PRNG ────────────────────────────────────────────────────────────
function lcg(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

interface StarDef {
  xFrac: number;   // 0..1 normalized x
  yFrac: number;   // 0..1 normalized y
  r: number;       // px radius
  depth: number;   // parallax speed factor
  phase: number;   // twinkle phase
  twinkle: number; // twinkle amplitude
  tint: 'white' | 'cyan' | 'violet';
}

function buildStars(count: number, seed: number): StarDef[] {
  const rnd = lcg(seed);
  return Array.from({ length: count }, (_, i) => ({
    xFrac: rnd(),
    yFrac: rnd(),
    r: 0.5 + rnd() * 1.3,
    depth: 0.2 + rnd() * 0.8,
    phase: rnd() * Math.PI * 2,
    twinkle: 0.3 + rnd() * 0.65,
    tint: i % 14 === 0 ? 'cyan' : i % 21 === 0 ? 'violet' : 'white',
  }));
}

// ── Starfield ─────────────────────────────────────────────────────────────────
function Starfield({ t }: { t: number }) {
  const stars = useMemo(() => buildStars(140, 7), []);

  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {stars.map((s, i) => {
        const alpha = s.twinkle * (0.4 + 0.45 * Math.sin(t * 1.1 + s.phase));
        const driftX = ((s.xFrac + t * 0.007 * s.depth) % 1) * 100;
        const color =
          s.tint === 'cyan' ? CYAN : s.tint === 'violet' ? VIOLET : INK;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${driftX}%`,
              top: `${s.yFrac * 100}%`,
              width: s.r * 2,
              height: s.r * 2,
              borderRadius: '50%',
              background: color,
              opacity: alpha,
              transform: 'translate(-50%, -50%)',
              willChange: 'opacity, left',
            }}
          />
        );
      })}
    </div>
  );
}

// ── Radiating rings ────────────────────────────────────────────────────────────
// Four rings expand from center-right, looping on a 3.2 s cycle.
function RadiatingRings({ t }: { t: number }) {
  const RINGS = 4;
  const PERIOD = 3.2;

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: RINGS }, (_, i) => {
        const phase = ((t / PERIOD + i / RINGS) % 1);
        const radius = 32 + phase * 480;   // px: 32 → 512
        const alpha = (1 - phase) * 0.28;
        if (alpha < 0.005) return null;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              // anchor at 62% / 50% of section
              left: '62%',
              top: '50%',
              width: radius * 2,
              height: radius * 2,
              borderRadius: '50%',
              border: `1px solid ${CYAN}`,
              opacity: alpha,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              willChange: 'width, height, opacity',
            }}
          />
        );
      })}
    </div>
  );
}

// ── Central pinprick star ──────────────────────────────────────────────────────
function CentralStar({ t }: { t: number }) {
  const pulse = 0.75 + 0.25 * Math.sin(t * 1.8);
  const glow = 18 + pulse * 28;

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: '62%',
        top: '50%',
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: CYAN,
        boxShadow: `0 0 ${glow}px ${CYAN}, 0 0 ${glow * 2.5}px rgba(0,212,255,0.25)`,
        opacity: 0.92,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        willChange: 'box-shadow',
      }}
    />
  );
}

// ── Celestial body (large translucent circle on right) ────────────────────────
// SVG is used so the orbital maths are clean.
function CelestialBody({ t }: { t: number }) {
  const W = 600;
  const H = 500;
  const cx = W * 0.56;
  const cy = H * 0.5;

  // Slow drift
  const ang = t * 0.03;
  const offX = Math.cos(ang) * 18;
  const offY = Math.sin(ang) * 12;

  const mainR = W * 0.38;
  const innerR = mainR - 52;

  // Three small attending bodies
  const smalls = [
    { r: 13, orbR: mainR + 110, speed: 0.28, phase: 0,   clr: CYAN },
    { r: 8,  orbR: mainR + 155, speed: 0.20, phase: 2.1, clr: VIOLET },
    { r: 19, orbR: mainR + 75,  speed: 0.38, phase: 4.2, clr: CYAN },
  ];

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '55%',
        maxWidth: 700,
        minWidth: 280,
        aspectRatio: `${W}/${H}`,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        aria-hidden
      >
        {/* Orbit guide (very faint outer ring for smalls) */}
        {smalls.map((s, i) => (
          <circle
            key={`orbit-${i}`}
            cx={cx + offX}
            cy={cy + offY}
            r={s.orbR}
            fill="none"
            stroke={s.clr}
            strokeWidth={0.5}
            strokeDasharray="4 14"
            opacity={0.07}
          />
        ))}

        {/* Main body */}
        <circle
          cx={cx + offX}
          cy={cy + offY}
          r={mainR}
          fill="none"
          stroke={CYAN}
          strokeWidth={1}
          opacity={0.22}
        />
        {/* Inner dashed ring */}
        <circle
          cx={cx + offX}
          cy={cy + offY}
          r={innerR}
          fill="none"
          stroke={CYAN}
          strokeWidth={1}
          strokeDasharray="4 14"
          opacity={0.08}
        />
        {/* Centre dot */}
        <circle
          cx={cx + offX}
          cy={cy + offY}
          r={3}
          fill={CYAN}
          opacity={0.4}
        />

        {/* Small orbiters */}
        {smalls.map((s, i) => {
          const a = s.phase + t * s.speed;
          const sx = cx + offX + Math.cos(a) * s.orbR;
          const sy = cy + offY + Math.sin(a) * s.orbR;
          const glow = s.clr === CYAN ? '0 0 12px rgba(0,212,255,0.8)' : '0 0 12px rgba(124,58,237,0.8)';
          return (
            <circle
              key={`small-${i}`}
              cx={sx}
              cy={sy}
              r={s.r}
              fill={s.clr}
              opacity={0.75}
              style={{ filter: `drop-shadow(0 0 ${s.r * 0.8}px ${s.clr})` }}
            />
          );
        })}

        {/* Crosshair ticks around center */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const dist = mainR + 22;
          const tx = cx + offX + Math.cos(rad) * dist;
          const ty = cy + offY + Math.sin(rad) * dist;
          return (
            <line
              key={`tick-${i}`}
              x1={tx}
              y1={ty}
              x2={tx + Math.cos(rad) * 16}
              y2={ty + Math.sin(rad) * 16}
              stroke={CYAN}
              strokeWidth={1}
              opacity={0.18}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ── Grid overlay (masked, fades toward edges) ─────────────────────────────────
function GridOverlay() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage:
          'radial-gradient(ellipse 80% 80% at 62% 50%, black 30%, transparent 80%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 80% at 62% 50%, black 30%, transparent 80%)',
        pointerEvents: 'none',
      }}
    />
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function CosmicCanvas() {
  const t = useAnimTime(60, true, true);

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Starfield t={t} />
      <GridOverlay />
      <CelestialBody t={t} />
      <RadiatingRings t={t} />
      <CentralStar t={t} />
    </div>
  );
}
