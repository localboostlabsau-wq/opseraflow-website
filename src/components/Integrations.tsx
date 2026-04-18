"use client";

import React, { useRef } from "react";
import { motion, useInView , type Variants} from "framer-motion";
import {
  Brain,
  Database,
  Link2,
  Server,
  Layers,
  Cloud,
  Activity,
  Shield,
  Cpu,
  Globe,
  Workflow,
  HardDrive,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface IntegrationCard {
  name: string;
  category: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const INTEGRATIONS: IntegrationCard[] = [
  { name: "Dental4Windows", category: "Practice Management", Icon: Brain },
  { name: "Exact (SOE)", category: "Practice Management", Icon: Database },
  { name: "Pracsoft / Medical Director", category: "Clinical & Billing", Icon: Activity },
  { name: "Carestream Dental", category: "Imaging & Envista", Icon: Layers },
  { name: "Orthotrac", category: "Orthodontic Software", Icon: Workflow },
  { name: "Dentrix Ascend", category: "Cloud Practice Mgmt", Icon: Cloud },
  { name: "Curve Dental", category: "Cloud-Native PMS", Icon: Globe },
  { name: "Salud", category: "Practice Management", Icon: Shield },
  { name: "Genie Solutions", category: "Practice Management", Icon: Cpu },
  { name: "Zedmed", category: "Clinical & Practice", Icon: Server },
  { name: "Best Practice", category: "General Practice", Icon: HardDrive },
  { name: "D4W Enterprise", category: "Enterprise PMS", Icon: Link2 },
];

// ---------------------------------------------------------------------------
// Single card
// ---------------------------------------------------------------------------

interface CardProps {
  card: IntegrationCard;
}

function IntegCard({ card }: CardProps) {
  const { name, category, Icon } = card;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 22px",
        minWidth: 240,
        borderRadius: 14,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(0,212,255,0.14)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(0,212,255,0.1)",
          border: "1px solid rgba(0,212,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#00d4ff",
        }}
      >
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: "#f0f4ff",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "#00d4ff",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginTop: 2,
            whiteSpace: "nowrap",
          }}
        >
          {category}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Marquee row
// ---------------------------------------------------------------------------

interface MarqueeRowProps {
  items: IntegrationCard[];
  direction: "left" | "right";
  speed?: number;
}

function MarqueeRow({ items, direction, speed = 35 }: MarqueeRowProps) {
  // Duplicate list so the seamless loop works
  const doubled = [...items, ...items];
  const translateStart = direction === "left" ? "0%" : "-50%";
  const translateEnd = direction === "left" ? "-50%" : "0%";

  return (
    <div
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
        }}
        animate={{ x: [translateStart, translateEnd] }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {doubled.map((card, i) => (
          <IntegCard key={`${card.name}-${i}`} card={card} />
        ))}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 36, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Integrations() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

  const firstRow = INTEGRATIONS.slice(0, 6);
  const secondRow = INTEGRATIONS.slice(6, 12);

  return (
    <section
      id="integrations"
      style={{
        position: "relative",
        background: "#0a0a0f",
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Radial glow centre */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          background:
            "radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Heading block */}
      <motion.div
        ref={headingRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
          textAlign: "center",
          marginBottom: 64,
        }}
      >
        <motion.div variants={itemVariants}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              borderRadius: 100,
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              fontSize: 12,
              fontWeight: 500,
              color: "#00d4ff",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <Link2 size={13} strokeWidth={2} />
            Integrations
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#f0f4ff",
            margin: "0 0 20px",
          }}
        >
          Works With Your{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Existing Software
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: "clamp(15px, 1.6vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(240,244,255,0.55)",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          Opsera Flow plugs straight into the platform your team already knows.
          No data migration headaches, no workflow disruption just seamless
          AI on top of your existing stack.
        </motion.p>
      </motion.div>

      {/* Marquee rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <MarqueeRow items={firstRow} direction="left" speed={38} />
        <MarqueeRow items={secondRow} direction="right" speed={42} />
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" as const }}
        style={{
          textAlign: "center",
          marginTop: 56,
          padding: "0 clamp(24px, 5vw, 80px)",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "rgba(240,244,255,0.45)",
            margin: 0,
          }}
        >
          Don&apos;t see your software?{" "}
          <a
            href="mailto:info@opseraflow.com.au"
            style={{
              color: "#00d4ff",
              textDecoration: "none",
              borderBottom: "1px solid rgba(0,212,255,0.4)",
              paddingBottom: 1,
              transition: "border-color 0.2s",
            }}
          >
            We integrate with virtually any dental platform via API.
          </a>
        </p>
      </motion.div>
    </section>
  );
}
