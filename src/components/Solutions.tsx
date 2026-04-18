'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import {
  CalendarX2,
  BotMessageSquare,
  Puzzle,
  MessageCircleMore,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SolutionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SOLUTIONS: SolutionCard[] = [
  {
    icon: <CalendarX2 size={28} strokeWidth={1.5} />,
    title: 'Patient No-Shows',
    description:
      'Intelligent recall and appointment reminders that dramatically reduce gaps in your schedule.',
  },
  {
    icon: <BotMessageSquare size={28} strokeWidth={1.5} />,
    title: 'Manual Admin Overload',
    description:
      'Eliminate repetitive front-desk tasks with AI-driven workflows that run autonomously, 24/7.',
  },
  {
    icon: <Puzzle size={28} strokeWidth={1.5} />,
    title: 'Disconnected Software',
    description:
      'Seamlessly bridge your existing dental software into one unified, intelligent ecosystem.',
  },
  {
    icon: <MessageCircleMore size={28} strokeWidth={1.5} />,
    title: 'Patient Communication Gaps',
    description:
      'Automated, personalised communication across SMS, email and more without lifting a finger.',
  },
  {
    icon: <TrendingUp size={28} strokeWidth={1.5} />,
    title: 'Revenue Leakage',
    description:
      'Identify and recover overlooked billing opportunities with precision analytics and automated follow-up.',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: 'Compliance & Reporting',
    description:
      'Stay fully compliant with Australian healthcare regulations automated, accurate, and audit-ready.',
  },
];

// ---------------------------------------------------------------------------
// Framer Motion variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Pipeline SVG a flowing dotted line that spans the section
// ---------------------------------------------------------------------------

function PipelineSVG() {
  return (
    <div
      aria-hidden
      style={{
        width: '100%',
        overflow: 'hidden',
        margin: '48px 0 0',
        opacity: 0.55,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1200 36"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 36 }}
      >
        {/* Static dotted guide */}
        <path
          d="M0 18 Q300 4 600 18 Q900 32 1200 18"
          stroke="rgba(0,212,255,0.18)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          fill="none"
        />
        {/* Animated glowing flow line */}
        <path
          d="M0 18 Q300 4 600 18 Q900 32 1200 18"
          stroke="rgba(0,212,255,0.7)"
          strokeWidth="2"
          strokeDasharray="80 1120"
          fill="none"
          style={{ animation: 'pipeline-flow 3.2s linear infinite' }}
        />
        {/* Second offset for continuous feel */}
        <path
          d="M0 18 Q300 4 600 18 Q900 32 1200 18"
          stroke="rgba(124,58,237,0.6)"
          strokeWidth="2"
          strokeDasharray="60 1140"
          fill="none"
          style={{ animation: 'pipeline-flow 3.2s linear infinite 1.6s' }}
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Individual solution card
// ---------------------------------------------------------------------------

interface CardProps {
  card: SolutionCard;
}

function SolutionCard({ card }: CardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 16,
        padding: '28px 26px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: hovered
          ? '1px solid rgba(0,212,255,0.45)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered
          ? '0 0 28px rgba(0,212,255,0.18), 0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition:
          'border 0.25s ease, box-shadow 0.25s ease, transform 0.22s ease',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Subtle top-left glow on hover */}
      {hovered && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 120,
            height: 120,
            borderRadius: '0 0 100% 0',
            background:
              'radial-gradient(ellipse at top left, rgba(0,212,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 52,
          height: 52,
          borderRadius: 12,
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.18)',
          color: '#00d4ff',
          flexShrink: 0,
          transition: 'background 0.25s ease, border 0.25s ease',
          ...(hovered && {
            background: 'rgba(0,212,255,0.14)',
            border: '1px solid rgba(0,212,255,0.35)',
          }),
        }}
      >
        {card.icon}
      </div>

      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 700,
            color: '#f0f4ff',
            letterSpacing: '-0.01em',
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            lineHeight: 1.65,
            color: 'rgba(240,244,255,0.55)',
          }}
        >
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Solutions section
// ---------------------------------------------------------------------------

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="solutions"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0f0f1a',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 128px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '50vw',
          maxWidth: 900,
          maxHeight: 600,
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headingVariants}
          style={{
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              borderRadius: 100,
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.15)',
              fontSize: 12,
              fontWeight: 600,
              color: '#00d4ff',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Problems We Solve
          </span>

          {/* Heading */}
          <h2
            style={{
              margin: '0 auto 20px',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#f0f4ff',
              maxWidth: 700,
            }}
          >
            What We Solve for{' '}
            <span
              style={{
                display: 'inline-block',
                position: 'relative',
                color: '#00d4ff',
              }}
            >
              Your Clinic
              {/* Cyan accent underline */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: -6,
                  left: 0,
                  right: 0,
                  height: 3,
                  borderRadius: 2,
                  background:
                    'linear-gradient(90deg, #00d4ff 0%, rgba(0,212,255,0.3) 100%)',
                }}
              />
            </span>
          </h2>

          {/* Subheading */}
          <p
            style={{
              margin: '0 auto',
              maxWidth: 620,
              fontSize: 'clamp(15px, 1.7vw, 17px)',
              lineHeight: 1.7,
              color: 'rgba(240,244,255,0.55)',
            }}
          >
            OpseraFlow eliminates the operational friction that holds dental
            practices back so you can focus entirely on patient care.
          </p>
        </motion.div>

        {/* Pipeline SVG */}
        <PipelineSVG />

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 20,
            marginTop: 48,
          }}
        >
          {SOLUTIONS.map((card) => (
            <SolutionCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes pipeline-flow {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1200; }
        }
      `}</style>
    </section>
  );
}
