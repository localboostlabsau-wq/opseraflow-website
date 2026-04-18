'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlogPost {
  title: string;
  date: string;
  category: string;
  categoryColor: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const posts: BlogPost[] = [
  {
    title: 'The Hidden Cost of Manual Admin in Australian Dental Practices',
    date: 'Apr 2025',
    category: 'Operations',
    categoryColor: 'rgba(0,212,255,0.15)',
  },
  {
    title:
      'AI Automation and the Australian Privacy Act: What Clinic Owners Need to Know',
    date: 'Apr 2025',
    category: 'Compliance',
    categoryColor: 'rgba(124,58,237,0.2)',
  },
  {
    title:
      'How Forward-Thinking Dental Clinics Are Reducing No-Shows by 40%',
    date: 'Mar 2025',
    category: 'Growth',
    categoryColor: 'rgba(0,212,255,0.15)',
  },
];

// ---------------------------------------------------------------------------
// BlogCard
// ---------------------------------------------------------------------------

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      delay: i * 0.12,
    },
  }),
};

function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 18,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '28px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      whileHover={{
        borderColor: 'rgba(0,212,255,0.3)',
        boxShadow: '0 0 32px rgba(0,212,255,0.08)',
      }}
    >
      {/* Coming Soon ribbon */}
      <div
        aria-label="Coming soon"
        style={{
          position: 'absolute',
          top: 18,
          right: -28,
          background: 'rgba(0,212,255,0.12)',
          border: '1px solid rgba(0,212,255,0.22)',
          color: '#00d4ff',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '4px 36px',
          transform: 'rotate(38deg)',
          transformOrigin: 'center',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        Coming Soon
      </div>

      {/* Category badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 10px',
            borderRadius: 100,
            background: post.categoryColor,
            border: '1px solid rgba(0,212,255,0.2)',
            fontSize: 11,
            fontWeight: 600,
            color: '#00d4ff',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {post.category}
        </span>
        <span
          style={{
            fontSize: 12,
            color: 'rgba(240,244,255,0.4)',
            letterSpacing: '0.04em',
          }}
        >
          {post.date}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          fontWeight: 700,
          lineHeight: 1.45,
          color: '#f0f4ff',
          margin: 0,
          flexGrow: 1,
        }}
      >
        {post.title}
      </h3>

      {/* Read More link */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(0,212,255,0.5)',
          cursor: 'not-allowed',
          userSelect: 'none',
          marginTop: 4,
        }}
        title="Article coming soon"
      >
        Read More
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
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Blog section
// ---------------------------------------------------------------------------

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');

  return (
    <section
      id="blog"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'radial-gradient(ellipse 100% 60% at 50% 100%, rgba(0,212,255,0.04) 0%, #000 60%)',
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '40vw',
          maxWidth: 900,
          background:
            'radial-gradient(ellipse at top center, rgba(124,58,237,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Heading block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}
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
            Blog
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 14px',
              color: '#f0f4ff',
            }}
          >
            Insights &amp; Resources
          </h2>
          <p
            style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              lineHeight: 1.7,
              color: 'rgba(240,244,255,0.5)',
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            Expert thinking on dental operations, compliance, and growth —
            written for Australian clinic owners.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} index={index} />
          ))}
        </motion.div>

        {/* Subscribe CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: "easeOut" as const, delay: 0.4 }}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <p
            style={{
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              color: 'rgba(240,244,255,0.55)',
              margin: 0,
            }}
          >
            More articles coming soon. Subscribe to stay updated.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 480,
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: '1 1 220px',
                padding: '12px 18px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f0f4ff',
                fontSize: 14,
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) =>
                ((e.target as HTMLInputElement).style.borderColor =
                  'rgba(0,212,255,0.5)')
              }
              onBlur={(e) =>
                ((e.target as HTMLInputElement).style.borderColor =
                  'rgba(255,255,255,0.12)')
              }
            />
            <motion.button
              type="submit"
              whileHover={{
                boxShadow: '0 0 28px rgba(0,212,255,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '12px 28px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                border: 'none',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                transition: 'box-shadow 0.25s ease',
              }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
