"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

/* (3D Camera Aperture removed to make cinematic camera picture fully visible) */

/* ════════════════════════════════════════════
   FILM FRAME CORNERS — Editorial Viewfinder
════════════════════════════════════════════ */
function FilmCorners({ opacity }: { opacity: MotionValue<number> }) {
  const L = 28;
  const c = "rgba(201,168,76,0.32)";
  const t = "1.5px solid";
  const off = "clamp(1rem, 2.5vw, 2rem)";

  return (
    <motion.div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none", opacity }}
    >
      <div style={{ position: "absolute", top: off, left: off, width: L, height: L, borderTop: `${t} ${c}`, borderLeft: `${t} ${c}` }} />
      <div style={{ position: "absolute", top: off, right: off, width: L, height: L, borderTop: `${t} ${c}`, borderRight: `${t} ${c}` }} />
      <div style={{ position: "absolute", bottom: off, left: off, width: L, height: L, borderBottom: `${t} ${c}`, borderLeft: `${t} ${c}` }} />
      <div style={{ position: "absolute", bottom: off, right: off, width: L, height: L, borderBottom: `${t} ${c}`, borderRight: `${t} ${c}` }} />
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   SCENE LABEL — "Scene 01" with REC blink
   Appears briefly then fades — film aesthetic
════════════════════════════════════════════ */
function SceneLabel() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.55, 0.55, 0] }}
      transition={{ times: [0, 0.12, 0.78, 1], duration: 5, delay: 1.2 }}
      style={{
        position: "absolute",
        top: "calc(var(--nav-height) + 1.5rem)",
        right: "clamp(1.25rem, 5vw, 3rem)",
        zIndex: 6,
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        pointerEvents: "none",
      }}
    >
      {/* Blinking REC indicator */}
      <motion.div
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.75, repeat: 6, repeatType: "loop" }}
        style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-gold)" }}
      />
      <span style={{
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "0.5rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "rgba(201,168,76,0.65)",
      }}>
        Scene 01
      </span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   SCAN LINE — viewfinder sweep (atmospheric)
════════════════════════════════════════════ */
function ScanLine() {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        /* x has 4 keyframes — MUST match length of times array */
        x: ["-10%", "-10%", "110%", "110%"],
        opacity: [0, 0.45, 0.45, 0],
      }}
      transition={{
        duration: 1.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.08, 0.92, 1],
        repeat: Infinity,
        repeatDelay: 11,
        delay: 4,
      }}
      style={{
        position: "absolute",
        top: "49.5%",
        left: 0,
        width: "120px",
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(201,168,76,0.55), transparent)",
        zIndex: 4,
        pointerEvents: "none",
      }}
    />
  );
}


/* ════════════════════════════════════════════
   SCROLL INDICATOR
════════════════════════════════════════════ */
function ScrollIndicator({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      style={{
        position: "absolute",
        bottom: "clamp(2rem, 4vh, 3rem)",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        zIndex: 10,
      }}
    >
      <span style={{
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "0.5rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(136,136,128,0.55)",
      }}>
        Scroll
      </span>
      <div style={{ width: "1px", height: "48px", background: "rgba(30,30,30,0.8)", position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            background: "linear-gradient(to bottom, var(--color-gold), transparent)",
          }}
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   AMBIENT ORBS
════════════════════════════════════════════ */
function AmbientOrbs() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
      {/* Primary warm uplift from bottom */}
      <motion.div
        animate={{ opacity: [0.08, 0.14, 0.08], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90vw",
          height: "70vh",
          background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      {/* Right-side aperture ambient — mirrors the aperture glow */}
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, delay: 3 }}
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "40vw",
          height: "60vh",
          background: "radial-gradient(ellipse at 100% 50%, rgba(201,168,76,0.10) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   STAT ITEM
════════════════════════════════════════════ */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <span style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
        color: "var(--color-gold)",
        lineHeight: 1,
        letterSpacing: "0.04em",
      }}>
        {value}
      </span>
      <span style={{
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "0.5625rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--color-dim)",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════
   ANIMATION VARIANTS
════════════════════════════════════════════ */
const maskReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 18 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    transition: {
      delay,
      duration: 1.1,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

/* ════════════════════════════════════════════════════════
   HERO SECTION — The Film Chamber

   Emotional arc:
   ENTER → cinematic atmosphere, aperture breathing →
   CURSOR → reveals imagery through spotlight →
   SCROLL → text parallaxes up, aperture closes (iris cut),
             background zooms in (camera push), dark veil
             rises = seamless "scene change" to next section
════════════════════════════════════════════════════════ */
export function HeroSection() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  /* ── Mouse parallax for background camera visual via Framer spring ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const bgX = useSpring(rawX, { stiffness: 48, damping: 18 });
  const bgY = useSpring(rawY, { stiffness: 48, damping: 18 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 24);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 18);
    },
    [rawX, rawY]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [prefersReducedMotion, onMouseMove]);

  /* ── Scroll-driven cinematic transition ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* 
    Text: slides up + fades as hero exits viewport.
    The subtle scale-up creates the "camera pushing in" sensation. 
  */
  const textY = useTransform(scrollYProgress, [0, 0.7], [0, -130]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.52], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.06]);

  /* Background zooms in subtly — the camera pushes toward subject */
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  /* 
    Veil: darkens with an elliptical radial gradient as the iris closes.
    The edges darken first (like a real iris), then the center follows. 
  */
  const veilOpacity = useTransform(scrollYProgress, [0, 0.72], [0, 0.82]);
  const cornersOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);

  const d = 0.1; /* base animation delay */

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Hero — Your Story Deserves to Be Told"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--color-bg-deep)",
      }}
    >
      {/* ── Background layer: cinematic camera visual with dynamic crossfade ── */}
      <motion.div
        className="hero-bg-wrapper"
        style={{
          position: "absolute",
          inset: "-30px", /* Extend slightly to avoid visual gaps during parallax motion */
          zIndex: 0,
          scale: bgScale,
          x: bgX,
          y: bgY,
        }}
      >
        {/* Dark Mode Backdrop */}
        <motion.div
          initial={false}
          animate={{ opacity: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="/hero-camera.png"
            alt="Cinematic camera backdrop"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "right center",
              filter: "grayscale(8%) contrast(1.1) brightness(1.02)",
            }}
          />
        </motion.div>

        {/* Light Mode Backdrop */}
        <motion.div
          initial={false}
          animate={{ opacity: theme === "light" ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src="/hero-camera-light.png"
            alt="Light studio camera backdrop"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "right center",
              filter: "grayscale(3%) contrast(1.03) brightness(1.0)",
            }}
          />
        </motion.div>

        {/* Soft custom gradient blending the left side into the deep background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, var(--color-bg-deep) 15%, rgba(var(--color-bg-deep-rgb), 0.75) 45%, transparent 85%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {/* Protect navbar text readability by fading top of camera image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, var(--color-bg-deep) 0%, rgba(var(--color-bg-deep-rgb), 0.7) 120px, transparent 280px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </motion.div>

      {/* ── Cinematic iris veil — darkens elliptically on scroll ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 65% 65% at center, transparent 20%, rgba(var(--color-bg-deep-rgb), 0.96) 100%)",
          opacity: veilOpacity,
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient orbs ── */}
      <AmbientOrbs />

      {/* ── Film frame corners (viewfinder aesthetic) ── */}
      <FilmCorners opacity={cornersOpacity} />

      {/* ── Scene 01 label ── */}
      <SceneLabel />

      {/* ── Horizontal scan line (viewfinder sweep) ── */}
      {!prefersReducedMotion && <ScanLine />}

      {/* ════════════════════════════════════════
          MAIN CONTENT — parallaxes out on scroll
         ════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "calc(var(--nav-height) + clamp(1.5rem, 3vh, 3rem)) clamp(1.25rem, 5vw, 3rem) clamp(9rem, 15vh, 14rem)",
          y: textY,
          opacity: textOpacity,
          scale: textScale,
          willChange: "transform, opacity",
        }}
      >
        {/* ── Top label ── */}
        <motion.div
          variants={prefersReducedMotion ? {} : fadeUp}
          custom={d + 0.2}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: d + 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: "block", width: "36px", height: "1px", background: "var(--color-gold)", transformOrigin: "left" }}
          />
          <span className="label-gold">Lagos, Nigeria · Est. 2021</span>
        </motion.div>

        {/* ── Headline: "WE REVEAL," on one line ── */}
        <h1
          aria-label="Your Story Deserves to Be Told."
          style={{
            fontFamily: "var(--font-bebas)",
            letterSpacing: "0.01em",
            color: "var(--color-text-primary)",
            marginBottom: "clamp(1.5rem, 2.5vh, 2.25rem)",
          }}
        >
          {/* 
            Line 1: YOUR STORY — single line.
            "YOUR" white, "STORY" in gold.
            Font-size calibrated so the full string fits on one line
            at all viewport widths ≥ 320px.
          */}
          <span style={{ display: "block", overflow: "hidden", lineHeight: 0.88 }}>
            <motion.span
              style={{
                display: "block",
                fontSize: "clamp(3.5rem, 9.5vw, 9.5rem)",
                whiteSpace: "nowrap",
              }}
              custom={d + 0.4}
              variants={prefersReducedMotion ? {} : maskReveal}
              initial="hidden"
              animate="visible"
            >
              <span style={{ color: "var(--color-text-primary)" }}>YOUR </span>
              <span style={{ color: "var(--color-gold)" }}>STORY</span>
            </motion.span>
          </span>

          {/* 
            Line 2: DESERVES TO BE TOLD. — ghost/outline treatment.
            Indented to create typographic depth.
            Slightly smaller to establish visual hierarchy.
          */}
          <span style={{ display: "block", overflow: "hidden", lineHeight: 0.88, paddingLeft: "clamp(0rem, 5vw, 5.5rem)" }}>
            <motion.span
              style={{
                display: "block",
                fontSize: "clamp(2.5rem, 7vw, 7rem)",
              }}
              custom={d + 0.62}
              variants={prefersReducedMotion ? {} : maskReveal}
              initial="hidden"
              animate="visible"
            >
              <span style={{ color: "transparent", WebkitTextStroke: "1px var(--color-border-mid)" }}>
                DESERVES TO{" "}
              </span>
              <span
                style={{
                  color: "#0A0A0A",
                  background: "var(--color-gold)",
                  WebkitTextStroke: "none",
                  padding: "0.07em clamp(0.25rem, 1.2vw, 0.75rem) 0.01em",
                  display: "inline-block",
                  verticalAlign: "middle",
                  transform: "translateY(-0.05em)",
                  lineHeight: "0.9",
                }}
              >
                BE TOLD.
              </span>
            </motion.span>
          </span>
        </h1>

        {/* ── Subheadline ── */}
        <motion.p
          custom={d + 0.85}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-satoshi)",
            fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
            lineHeight: 1.72,
            color: "var(--color-text-secondary)",
            maxWidth: "52ch",
            marginBottom: "clamp(2rem, 4vh, 3rem)",
          }}
        >
          Most brands talk about what they do. The best ones talk about why they exist.
          <br />
          We help you find that story, then we show the world.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          custom={d + 1.0}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2rem)", flexWrap: "wrap" }}
        >
          {/* Primary — View Our Work */}
          <Magnetic>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                position: "relative",
                overflow: "hidden",
                color: "#0A0A0A",
                background: "var(--color-gold)",
                padding: "1rem 2.25rem",
                border: "1px solid var(--color-gold)",
                transition: "color 0.45s var(--ease-cinematic)",
              }}
              onMouseEnter={(e) => {
                const fill = e.currentTarget.querySelector<HTMLElement>("[data-fill]");
                if (fill) fill.style.transform = "translateX(0)";
                e.currentTarget.style.color = "var(--color-gold)";
              }}
              onMouseLeave={(e) => {
                const fill = e.currentTarget.querySelector<HTMLElement>("[data-fill]");
                if (fill) fill.style.transform = "translateX(-101%)";
                e.currentTarget.style.color = "#0A0A0A";
              }}
            >
              <span
                data-fill
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--color-text-primary)",
                  transform: "translateX(-101%)",
                  transition: "transform 0.5s cubic-bezier(0.76,0,0.24,1)",
                  zIndex: 0,
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>View Our Work</span>
              <ArrowDown size={12} strokeWidth={1.5} style={{ position: "relative", zIndex: 1 }} />
            </a>
          </Magnetic>

          {/* Secondary — Start a Project */}
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              data-cursor
              className="hover-gold-line"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-text-secondary)",
                transition: "color 0.3s var(--ease-cinematic)",
                padding: "0.5rem 0",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)"; }}
            >
              Start a Project
            </a>
          </Magnetic>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          custom={d + 1.2}
          variants={prefersReducedMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 0,
            marginTop: "clamp(4rem, 10vh, 9rem)",
            paddingTop: "2rem",
            borderTop: "1px solid var(--color-border)",
            flexWrap: "wrap",
          }}
        >
          <StatItem value="60+" label="Projects Delivered" />
          <div style={{ width: "1px", height: "40px", background: "var(--color-border)", alignSelf: "center", margin: "0 clamp(1.5rem, 3vw, 2.5rem)", flexShrink: 0 }} />
          <StatItem value="4+" label="Years Active" />
          <div style={{ width: "1px", height: "40px", background: "var(--color-border)", alignSelf: "center", margin: "0 clamp(1.5rem, 3vw, 2.5rem)", flexShrink: 0 }} />
          <StatItem value="3" label="Continents Reached" />

          <div style={{ marginLeft: "auto", alignSelf: "flex-end" }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: d + 1.6, duration: 0.8 }}
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.5rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-text-tertiary)",
                display: "block",
                textAlign: "right",
              }}
            >
              Creative Production Studio
              <br />
              <span style={{ color: "var(--color-gold)", opacity: 0.7 }}>Lagos, Nigeria</span>
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator delay={d + 1.8} />
    </section>
  );
}
