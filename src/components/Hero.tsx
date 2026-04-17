'use client';

import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  Suspense,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { motion, useAnimation, Variants } from 'framer-motion';
import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NodeData {
  position: THREE.Vector3;
}

interface EdgeData {
  start: THREE.Vector3;
  end: THREE.Vector3;
}

interface MouseRef {
  x: number;
  y: number;
}

// ---------------------------------------------------------------------------
// Fibonacci sphere – distributes N points evenly over a unit sphere
// ---------------------------------------------------------------------------

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // range [-1, 1]
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

// ---------------------------------------------------------------------------
// Build edge list: connect each node to neighbours within a distance threshold
// ---------------------------------------------------------------------------

function buildEdges(
  nodes: NodeData[],
  distanceThreshold: number,
  maxEdges: number,
): EdgeData[] {
  const edges: EdgeData[] = [];

  for (let i = 0; i < nodes.length && edges.length < maxEdges; i++) {
    for (let j = i + 1; j < nodes.length && edges.length < maxEdges; j++) {
      const d = nodes[i].position.distanceTo(nodes[j].position);
      if (d < distanceThreshold) {
        edges.push({ start: nodes[i].position, end: nodes[j].position });
      }
    }
  }

  return edges;
}

// ---------------------------------------------------------------------------
// Neural sphere scene
// ---------------------------------------------------------------------------

const NODE_COUNT = 80;
const EDGE_MAX = 120;
const SPHERE_RADIUS = 2.2;
const DIST_THRESHOLD = 1.2;

interface NeuralSphereProps {
  mouseRef: React.MutableRefObject<MouseRef>;
}

function NeuralSphere({ mouseRef }: NeuralSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();

  // Pre-compute node positions
  const nodes = useMemo<NodeData[]>(() => {
    const positions = fibonacciSphere(NODE_COUNT, SPHERE_RADIUS);
    return positions.map((position) => ({ position }));
  }, []);

  // Pre-compute edges
  const edges = useMemo<EdgeData[]>(
    () => buildEdges(nodes, DIST_THRESHOLD, EDGE_MAX),
    [nodes],
  );

  // Edge point arrays for <Line>
  const edgePoints = useMemo(
    () =>
      edges.map((e) => [
        [e.start.x, e.start.y, e.start.z] as [number, number, number],
        [e.end.x, e.end.y, e.end.z] as [number, number, number],
      ]),
    [edges],
  );

  // Dummy object for instanced mesh transforms
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set initial instance transforms
  React.useEffect(() => {
    if (!meshRef.current) return;
    nodes.forEach((node, i) => {
      dummy.position.copy(node.position);
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [nodes, dummy]);

  // Camera lerp target
  const camTarget = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Slow auto-rotation of the group
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.15;
    }

    // Pulsing emissive intensity on nodes
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 1.8) * 0.4;
    }

    // Mouse parallax – gently tilt the camera
    camTarget.current.x +=
      (mouseRef.current.x * 0.8 - camTarget.current.x) * 0.05;
    camTarget.current.y +=
      (mouseRef.current.y * 0.8 - camTarget.current.y) * 0.05;

    camera.position.x = camTarget.current.x;
    camera.position.y = camTarget.current.y;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.6}
        />
      </instancedMesh>

      {/* Edges */}
      {edgePoints.map((pts, i) => (
        <Line
          key={i}
          points={pts as [number, number, number][]}
          color="#00d4ff"
          lineWidth={0.4}
          transparent
          opacity={0.18}
        />
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Loader fallback shown inside <Suspense>
// ---------------------------------------------------------------------------

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        style={{
          width: 48,
          height: 48,
          border: '2px solid rgba(0,212,255,0.3)',
          borderTopColor: '#00d4ff',
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite',
        }}
      />
    </div>
  );
}

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

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setTranslate({ x: dx * 0.22, y: dy * 0.22 });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTranslate({ x: 0, y: 0 });
  }, []);

  const baseStyle: React.CSSProperties = {
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
    transition: 'box-shadow 0.25s ease, transform 0.12s ease',
    transform: `translate(${translate.x}px, ${translate.y}px)`,
    willChange: 'transform',
    userSelect: 'none',
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
    color: '#fff',
    boxShadow: '0 0 24px rgba(0,212,255,0.35)',
  };

  const ghostStyle: React.CSSProperties = {
    ...baseStyle,
    background: 'transparent',
    color: '#00d4ff',
    border: '1px solid rgba(0,212,255,0.5)',
    boxShadow: 'none',
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      style={primary ? primaryStyle : ghostStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={
        primary
          ? { boxShadow: '0 0 44px rgba(0,212,255,0.6)' }
          : { borderColor: 'rgba(0,212,255,0.9)', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }
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
      transition={{ delay: 1.6, duration: 0.6 }}
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
// Main Hero component
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function Hero() {
  // Shared mouse ref that gets passed into the WebGL scene
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Normalise to [-1, 1]
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    },
    [],
  );

  return (
    <section
      onPointerMove={handlePointerMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0a0a0f',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Grid overlay ──────────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Radial glow behind sphere (right half) ────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          right: '-5%',
          transform: 'translateY(-50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: 720,
          maxHeight: 720,
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, rgba(124,58,237,0.06) 45%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── WebGL Canvas (full section, behind text) ─────────────────────── */}
      <div
        aria-hidden
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 55 }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#00d4ff" />
            <pointLight position={[-5, -5, 3]} intensity={0.3} color="#7c3aed" />
            <NeuralSphere mouseRef={mouseRef} />
          </Canvas>
        </Suspense>
      </div>

      {/* ── Content layout ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
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
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 100,
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)',
                fontSize: 13,
                fontWeight: 500,
                color: '#00d4ff',
                letterSpacing: '0.04em',
              }}
            >
              {/* Pulsing dot */}
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span
                  style={{
                    display: 'block',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#00d4ff',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'rgba(0,212,255,0.4)',
                    animation: 'ping 2s ease-in-out infinite',
                  }}
                />
              </span>
              AI Automation Platform
            </span>
          </motion.div>

          {/* H1 headline with word reveal */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            <span style={{ display: 'block', color: '#f0f4ff' }}>
              The Future of
            </span>
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
            <span style={{ display: 'block', color: '#f0f4ff' }}>
              Intelligence
            </span>
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
            Automate operations. Enhance patient experience. Grow with
            confidence. Built exclusively for Australian dental clinics.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              marginTop: 4,
            }}
          >
            <MagneticButton primary href="#get-started">
              Get Started
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
            <MagneticButton href="#how-it-works">
              See How It Works
            </MagneticButton>
          </motion.div>

          {/* Social proof / trust signals */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              paddingTop: 8,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              { value: '500+', label: 'Clinics' },
              { value: '2.4M', label: 'Appointments' },
              { value: '98%', label: 'Satisfaction' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: 700,
                    color: '#00d4ff',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: 12,
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

        {/* Right column – intentionally empty (sphere fills this via canvas) */}
        <div aria-hidden />
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <ScrollIndicator />

      {/* ── Keyframe animations injected via <style> ─────────────────────── */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(0.85); }
        }
        @keyframes ping {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Mobile: full-width, centred text, sphere sits behind */
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
