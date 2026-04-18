"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ShieldCheck, Lock, Activity, Headphones, FileCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MetricDef {
  prefix: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  decimals?: number;
}

interface FeatureItem {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const METRICS: MetricDef[] = [
  {
    prefix: "",
    value: 70,
    suffix: "%",
    label: "Reduction in No-Show Rates",
    description:
      "AI-driven recall and confirmation sequences keep your chairs filled and revenue on track.",
  },
  {
    prefix: "",
    value: 100,
    suffix: "+",
    label: "Hours Saved Per Clinic Weekly",
    description:
      "Automated scheduling, reminders, and reporting free your entire team for patient-facing work.",
  },
  {
    prefix: "",
    value: 80,
    suffix: "%",
    label: "Reduction in Admin Workload",
    description:
      "Intelligent automation handles repetitive tasks so your team can focus entirely on patient care.",
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    label: "Australian Data Sovereignty",
    description:
      "Your patient data never leaves Australian soil. Fully compliant with the Privacy Act 1988.",
  },
];

const FEATURES: FeatureItem[] = [
  { Icon: ShieldCheck, label: "Enterprise-grade security" },
  { Icon: Lock, label: "Privacy Act compliant" },
  { Icon: Activity, label: "24/7 monitoring" },
  { Icon: Headphones, label: "Support" },
  { Icon: FileCheck, label: "No lock-in contracts" },
];

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(
  targetValue: number,
  decimals: number = 0,
  trigger: boolean,
): MotionValue<string> {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18, mass: 0.8 });
  const display = useTransform(spring, (v) => {
    const rounded = parseFloat(v.toFixed(decimals));
    return decimals > 0 ? rounded.toFixed(decimals) : Math.round(rounded).toString();
  });

  useEffect(() => {
    if (trigger) {
      // Small delay per card is handled by the parent stagger
      motionVal.set(targetValue);
    } else {
      motionVal.set(0);
    }
  }, [trigger, targetValue, motionVal]);

  return display;
}

// ---------------------------------------------------------------------------
// Individual metric card
// ---------------------------------------------------------------------------

interface MetricCardProps {
  metric: MetricDef;
  index: number;
  trigger: boolean;
}

function MetricCard({ metric, index, trigger }: MetricCardProps) {
  const [hovered, setHovered] = React.useState(false);
  const displayValue = useAnimatedCounter(
    metric.value,
    metric.decimals ?? 0,
    trigger,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: "easeOut" as const,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "36px 32px",
        borderRadius: 20,
        background: hovered
          ? "rgba(0,212,255,0.06)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? "0 0 40px rgba(0,212,255,0.1)" : "none",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Glow accent on hover */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 1,
          background: hovered
            ? "linear-gradient(90deg, transparent, #00d4ff, transparent)"
            : "transparent",
          transition: "background 0.3s",
        }}
      />

      {/* Large gradient number */}
      <div
        style={{
          fontSize: "clamp(52px, 6vw, 80px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "flex",
          alignItems: "baseline",
          gap: 1,
          fontFamily: "var(--font-sora), system-ui, sans-serif",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>{metric.prefix}</span>
        <motion.span>{displayValue}</motion.span>
        {/* Styled suffix superscript % or inline + */}
        {metric.suffix === "%" ? (
          <span style={{ fontSize: "0.42em", verticalAlign: "super", fontWeight: 700, letterSpacing: 0, opacity: 0.9 }}>%</span>
        ) : (
          <span style={{ fontSize: "0.55em", verticalAlign: "middle", fontWeight: 800, opacity: 0.85 }}>{metric.suffix}</span>
        )}
      </div>

      {/* Label */}
      <div
        style={{
          marginTop: 12,
          fontSize: 15,
          fontWeight: 600,
          color: "#f0f4ff",
          lineHeight: 1.4,
        }}
      >
        {metric.label}
      </div>

      {/* Description slides in on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{
          overflow: "hidden",
          fontSize: 13,
          color: "rgba(240,244,255,0.5)",
          lineHeight: 1.6,
          marginTop: hovered ? 10 : 0,
        }}
      >
        {metric.description}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Feature pill
// ---------------------------------------------------------------------------

interface FeaturePillProps {
  item: FeatureItem;
  index: number;
  trigger: boolean;
}

function FeaturePill({ item, index, trigger }: FeaturePillProps) {
  const { Icon, label } = item;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: 0.5 + index * 0.08,
        ease: "easeOut" as const,
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 18px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgba(0,212,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#00d4ff",
          flexShrink: 0,
        }}
      >
        <Icon size={15} strokeWidth={1.8} />
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "rgba(240,244,255,0.8)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section variants
// ---------------------------------------------------------------------------

const headingContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headingItemVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: "easeOut" as const },
  },
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Metrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="outcomes"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "radial-gradient(ellipse 140% 70% at 50% 50%, rgba(124,58,237,0.07) 0%, #000 60%)",
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vw",
          maxWidth: 1100,
          maxHeight: 1100,
          background:
            "radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, rgba(0,212,255,0.05) 35%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(0,212,255,0.12) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
          opacity: 0.35,
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
        }}
      >
        {/* Heading */}
        <motion.div
          variants={headingContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <motion.div variants={headingItemVariants}>
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
              <Activity size={13} strokeWidth={2} />
              Outcomes
            </span>
          </motion.div>

          <motion.h2
            variants={headingItemVariants}
            style={{
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              margin: "0 0 20px",
              color: "#f0f4ff",
            }}
          >
            Real Outcomes.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Real Impact.
            </span>
          </motion.h2>

          <motion.p
            variants={headingItemVariants}
            style={{
              fontSize: "clamp(15px, 1.6vw, 17px)",
              lineHeight: 1.7,
              color: "rgba(240,244,255,0.55)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Measurable results from dental clinics already running on Opsera
            Flow. Not projections real numbers from real practices.
          </motion.p>
        </motion.div>

        {/* Metrics grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginBottom: 72,
          }}
        >
          {METRICS.map((metric, i) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={i}
              trigger={isInView}
            />
          ))}
        </div>

        {/* Feature list */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: "center", marginBottom: 32 }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(240,244,255,0.35)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            What&apos;s included
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 12,
          }}
        >
          {FEATURES.map((feature, i) => (
            <FeaturePill
              key={feature.label}
              item={feature}
              index={i}
              trigger={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
