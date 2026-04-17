'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// StarRating – greyed out placeholder
// ---------------------------------------------------------------------------

function StarRating() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
      }}
    >
      <div style={{ display: 'flex', gap: 6 }}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden
          >
            <path
              d="M11 2l2.39 5.26L19 8.27l-4 3.9.94 5.5L11 15.27l-4.94 2.4.94-5.5-4-3.9 5.61-.81L11 2z"
              fill="rgba(255,255,255,0.12)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
      <span
        style={{
          fontSize: 12,
          color: 'rgba(240,244,255,0.3)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        Reviews coming soon
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SkeletonCard – shimmer placeholder
// ---------------------------------------------------------------------------

interface SkeletonCardProps {
  index: number;
}

const skeletonVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
      delay: 0.3 + i * 0.1,
    },
  }),
};

function SkeletonCard({ index }: SkeletonCardProps) {
  return (
    <motion.div
      custom={index}
      variants={skeletonVariants}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Shimmer overlay */}
      <motion.div
        aria-hidden
        animate={{ x: ['-100%', '200%'] }}
        transition={{
          duration: 1.8,
          ease: 'linear',
          repeat: Infinity,
          delay: index * 0.4,
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Stars row */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>

      {/* Text lines */}
      {[80, 65, 90, 55].map((w, i) => (
        <div
          key={i}
          style={{
            height: 10,
            borderRadius: 6,
            background: 'rgba(255,255,255,0.07)',
            width: `${w}%`,
          }}
        />
      ))}

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div
            style={{
              width: 90,
              height: 9,
              borderRadius: 5,
              background: 'rgba(255,255,255,0.08)',
            }}
          />
          <div
            style={{
              width: 60,
              height: 8,
              borderRadius: 5,
              background: 'rgba(255,255,255,0.05)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Reviews section
// ---------------------------------------------------------------------------

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="reviews"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0b0b12',
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle dark grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: '50vw',
          maxWidth: 800,
          background:
            'radial-gradient(ellipse at bottom center, rgba(0,212,255,0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}
        >
          <span
            style={{
              display: 'inline-block',
              marginBottom: 16,
              padding: '5px 14px',
              borderRadius: 100,
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.2)',
              fontSize: 12,
              fontWeight: 500,
              color: '#00d4ff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Reviews
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: 0,
              color: '#f0f4ff',
            }}
          >
            What Clinic Owners Are Saying
          </h2>
        </motion.div>

        {/* Empty state */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: "easeOut" as const, delay: 0.15 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            marginBottom: 'clamp(40px, 5vw, 60px)',
            textAlign: 'center',
          }}
        >
          {/* Large quote icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 4,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 20c0-5.523 4-10 9-11.5V6C7.5 7.5 2 13.5 2 20v6h10v-6H5zm16 0c0-5.523 4-10 9-11.5V6c-6.5 1.5-12 7.5-12 14v6h10v-6h-7z"
                fill="#00d4ff"
                opacity="0.7"
              />
            </svg>
          </div>

          <p
            style={{
              fontSize: 'clamp(15px, 1.7vw, 18px)',
              lineHeight: 1.75,
              color: 'rgba(240,244,255,0.6)',
              maxWidth: 560,
              margin: 0,
            }}
          >
            We&apos;re collecting verified reviews from our early adopters. Check
            back soon — or be one of the first to share your experience.
          </p>

          <StarRating />

          <motion.a
            href="mailto:info@opseraflow.com.au"
            whileHover={{
              boxShadow: '0 0 28px rgba(0,212,255,0.35)',
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 26px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'box-shadow 0.25s ease',
            }}
          >
            Submit Your Review
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 7h8M7.5 4l3.5 3-3.5 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </motion.div>

        {/* Skeleton cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
