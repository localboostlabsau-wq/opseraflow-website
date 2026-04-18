'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FAQItem {
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const faqs: FAQItem[] = [
  {
    question: 'Is OpseraFlow compliant with Australian privacy laws?',
    answer:
      'Yes. OpseraFlow is fully compliant with the Australian Privacy Act 1988, Health Records Act, and relevant state-based legislation. All data is stored on Australian servers and never leaves Australian jurisdiction.',
  },
  {
    question:
      'Which dental practice management software does OpseraFlow integrate with?',
    answer:
      'We integrate with all major Australian dental software including Dental4Windows, Exact, Pracsoft, Dentrix, Carestream, Genie Solutions, Orthotrac, Zedmed, Salud, Curve Dental, and more. Custom integrations are also available via API.',
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'Most clinics are fully onboarded within 2 to 4 weeks. Our dedicated onboarding team handles the entire setup process with zero disruption to your practice operations.',
  },
  {
    question: 'Will OpseraFlow replace my existing staff?',
    answer:
      'Not at all. OpseraFlow is designed to augment your team handling repetitive administrative tasks so your staff can focus on patient care and higher-value work.',
  },
  {
    question: 'Is my patient data safe?',
    answer:
      'Absolutely. We use enterprise-grade encryption (AES-256), role-based access controls, and continuous security monitoring. Your data sovereignty is guaranteed all processing occurs on Australian soil.',
  },
  {
    question: 'Do you offer a free trial or demo?',
    answer:
      'We offer a no-obligation discovery call and personalised demo tailored to your clinic\'s specific workflow. Contact us at info@opseraflow.com.au to get started.',
  },
  {
    question: 'What makes OpseraFlow different from other automation tools?',
    answer:
      'OpseraFlow is purpose-built for Australian dental clinics not a generic tool repurposed for healthcare. We combine deep dental workflow knowledge with cutting-edge AI to deliver measurably better outcomes.',
  },
  {
    question: 'Is there a lock-in contract?',
    answer:
      'No. We believe in earning your business every month. Our agreements are flexible with no long-term lock-in requirements.',
  },
  {
    question: 'Can OpseraFlow handle multi-location practices?',
    answer:
      'Yes. OpseraFlow is built to scale across single and multi-location practices, with centralised dashboards and location-specific automation rules.',
  },
  {
    question: 'What support is available after setup?',
    answer:
      "You'll have access to dedicated support, comprehensive documentation, and proactive monitoring. We're with you every step of the way.",
  },
];

// ---------------------------------------------------------------------------
// ChevronIcon
// ---------------------------------------------------------------------------

interface ChevronIconProps {
  open: boolean;
}

function ChevronIcon({ open }: ChevronIconProps) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
      style={{ flexShrink: 0, color: '#00d4ff' }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// ---------------------------------------------------------------------------
// FAQCard
// ---------------------------------------------------------------------------

interface FAQCardProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
      delay: i * 0.06,
    },
  }),
};

function FAQCard({ item, index, isOpen, onToggle }: FAQCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: isOpen
          ? '1px solid rgba(0,212,255,0.35)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease',
      }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '20px 24px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            fontWeight: 600,
            color: '#f0f4ff',
            lineHeight: 1.45,
          }}
        >
          {item.question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Animated answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 24px 20px',
                fontSize: 'clamp(13px, 1.35vw, 15px)',
                lineHeight: 1.75,
                color: 'rgba(240,244,255,0.65)',
              }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FAQ section
// ---------------------------------------------------------------------------

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#000',
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 5vw, 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: 700,
          maxHeight: 700,
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        {/* Heading */}
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
            FAQ
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
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {faqs.map((item, index) => (
            <FAQCard
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
