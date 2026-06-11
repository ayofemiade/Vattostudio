"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const TARGETS = [
  {
    label: "01",
    title: "Founders & Owners",
    body:  "For brand owners and founders who know their brand is more than a logo. We extract your origin story and build an undeniable world around it.",
  },
  {
    label: "02",
    title: "Marketing Teams",
    body:  "For marketing teams and managers ready to stop selling features and start telling their truth through cinematic, high-impact video content.",
  },
  {
    label: "03",
    title: "Growing SMEs",
    body:  "For small and medium enterprises ready to build authority, scale their presence, and build a community that actually listens.",
  },
  {
    label: "04",
    title: "The Bold & Ambitious",
    body:  "For the rebels and visionaries who refuse to blend into the industry background, ready to assert who they are and be remembered.",
  },
];

/* ─── Single animated word — hooks must live at component level ─── */
function ScrollWord({
  word,
  scrollYProgress,
  start,
  end,
}: {
  word: string;
  scrollYProgress: import("framer-motion").MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity, willChange: "opacity" }}>
      {word}
    </motion.span>
  );
}

/* ─── Scroll-Driven Word-Scrubbing Paragraph Reveal ─── */
function ScrollTextReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 88%", "end 58%"],
  });

  const words = text.split(" ");

  return (
    <span
      ref={containerRef}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        rowGap: "0.15em",
        columnGap: "0.26em",
        ...style,
      }}
    >
      {words.map((word, i) => (
        <ScrollWord
          key={i}
          word={word}
          scrollYProgress={scrollYProgress}
          start={i / words.length}
          end={(i + 1) / words.length}
        />
      ))}
    </span>
  );
}

/* ─── Manifesto Ticker with liquid scroll-velocity skewing ─── */
function ManifestoTicker() {
  const words = [
    "We Reveal",
    "·",
    "Not Invent",
    "·",
    "Visual Truth",
    "·",
    "Cinematic Craft",
    "·",
    "Lagos Made",
    "·",
    "Felt Worldwide",
    "·",
  ];
  const text = words.join("  ");
  const repeated = `${text}  ${text}  `;

  /* Scroll velocity tracking */
  const { scrollY }    = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  /* Map scroll velocity to horizontal text skewing (-8deg to 8deg) */
  const skewX          = useTransform(scrollVelocity, [-2000, 2000], [-8, 8]);
  const skewXSpring    = useSpring(skewX, { stiffness: 90, damping: 25 });

  return (
    <div
      style={{
        overflow:     "hidden",
        borderTop:    "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding:      "1.125rem 0",
        margin:       "clamp(3.5rem, 7vh, 6rem) 0",
        position:     "relative",
      }}
      aria-hidden="true"
    >
      {/* Left + right fade overlays */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to right, var(--color-bg-surface) 0%, transparent 8%, transparent 92%, var(--color-bg-surface) 100%)",
          zIndex:     1,
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        style={{
          display:    "flex",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-bebas)",
          fontSize:   "clamp(1.25rem, 2.5vw, 2.25rem)",
          letterSpacing: "0.05em",
          color:      "transparent",
          WebkitTextStroke: "1px var(--color-ticker-stroke)",
          opacity:    0.5,
          gap:        "0",
          skewX:      skewXSpring,
        }}
      >
        {repeated}
        <span style={{ color: "var(--color-gold)", WebkitTextStroke: "none", opacity: 0.8 }}>
          &nbsp;·&nbsp;
        </span>
        {repeated}
      </motion.div>
    </div>
  );
}

/* ─── Map Pulsing Dot Component ─── */
function MapPulseNode({ top, left, name }: { top: string; left: string; name: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        transform: "translate(-50%, -50%)",
        zIndex: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Pulse circle */}
      <div style={{ position: "relative", width: 8, height: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-gold)", position: "absolute", top: 0, left: 0 }} />
        {!prefersReducedMotion && (
          <motion.div
            animate={{ scale: [1, 3], opacity: [0.6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "1.5px solid var(--color-gold)",
              top: 0,
              left: 0,
              transformOrigin: "center",
            }}
          />
        )}
      </div>
      {/* Name badge */}
      <span style={{
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "0.45rem",
        color: "var(--color-white)",
        letterSpacing: "0.1em",
        marginTop: "0.35rem",
        textTransform: "uppercase",
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "0.12rem 0.35rem",
        borderRadius: "2px",
        border: "1px solid var(--color-border)",
        whiteSpace: "nowrap",
        opacity: 0.85,
      }}>
        {name}
      </span>
    </div>
  );
}

/* ─── Horizontal Target Accordion ─── */
function TargetAccordion({ targets }: { targets: typeof TARGETS }) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const images = [
    "/founders_owners_about.png",
    "/marketing_teams_about.png",
    "/growing_smes_about.png",
    "/bold_ambitious_about.png",
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 min-h-[520px] lg:h-[480px] mt-10">
      {targets.map((target, idx) => {
        const isActive = activeIdx === idx;
        return (
          <motion.div
            key={target.label}
            layout={!prefersReducedMotion ? "position" : false}
            onMouseEnter={() => setActiveIdx(idx)}
            className="relative overflow-hidden rounded-lg border border-[var(--color-border)] cursor-pointer flex-1 transition-[flex-grow] duration-500 ease-out"
            style={{
              flexGrow: isActive ? 2.6 : 1,
              background: "var(--color-bg-surface)",
            }}
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src={images[idx]}
                alt=""
                fill
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 25vw"
                style={{
                  objectFit: "cover",
                  filter: isActive 
                    ? "grayscale(20%) contrast(1.15) brightness(0.55)"
                    : "grayscale(100%) contrast(0.9) brightness(0.2)",
                  transition: "filter 0.5s ease-out, transform 0.6s ease-out",
                }}
                className={isActive ? "scale-105" : "scale-100"}
              />
              {/* Gradients */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(8,8,8,0.96) 12%, rgba(8,8,8,0.4) 60%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.6s ease-out",
                }}
              />
            </div>

            {/* Visual Viewfinder Marks in Card Corners (when active) */}
            {isActive && !prefersReducedMotion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-4 z-10 pointer-events-none"
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--color-gold)]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--color-gold)]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--color-gold)]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--color-gold)]" />
              </motion.div>
            )}

            {/* Card Content Overlay */}
            <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] tracking-widest text-[var(--color-gold)] font-medium">
                  {target.label}
                </span>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 0.95, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 rounded bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.22)] text-[var(--color-gold)]"
                  >
                    Partner Profile
                  </motion.span>
                )}
              </div>

              {/* Card Footer Title/Description */}
              <div>
                <h3 className="font-display text-2xl md:text-3xl tracking-wide text-white mb-2">
                  {target.title}
                </h3>
                <div className="overflow-hidden">
                  <motion.p
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : "0px",
                      opacity: isActive ? 0.85 : 0,
                      marginTop: isActive ? 8 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-body text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[40ch]"
                  >
                    {target.body}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ABOUT COMPONENT (THE STUDIO)
   ═══════════════════════════════════════════ */
export function AboutSection() {
  const headingRef           = useRef<HTMLDivElement>(null);
  const valuesRef            = useRef<HTMLDivElement>(null);
  const isHeadingInView      = useInView(headingRef, { once: true, margin: "-12%" });
  const isValuesInView       = useInView(valuesRef,  { once: true, margin: "-8%"  });
  const prefersReducedMotion = useReducedMotion();

  /* Spotlight mouse tracking */
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  /* Scroll tracking for left column reveal */
  const { scrollYProgress: sectionScrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  /* Scroll tracking for sticky pinning map overlays staggered reveal */
  const { scrollYProgress: pinScrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Left column scroll reveal animations */
  const leftColY = useTransform(sectionScrollY, [0.1, 0.85], [prefersReducedMotion ? 0 : 80, 0]);
  const leftColOpacity = useTransform(sectionScrollY, [0.1, 0.8], [0, 1]);

  /* Staggered entrance for map overlays after Left Column becomes sticky */
  const hudOpacity = useTransform(pinScrollY, [0.0, 0.12], [0, 1]);
  const radarOpacity = useTransform(pinScrollY, [0.08, 0.28], [0, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="About Vattostudio"
      style={{
        padding:    "clamp(6rem, 11vh, 10rem) 0",
        background: "var(--color-bg-surface)",
        position:   "relative",
        overflow:   "clip",
      }}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(201, 168, 76, 0.045) 0%, transparent 80%)`,
          transition: "background 0.15s ease-out",
        }}
      />

      {/* Top-right ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "-5%",
          right:         "-5%",
          width:         "45vw",
          height:        "45vh",
          background:    "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin:   "0 auto",
          padding:  "0 clamp(1.25rem, 5vw, 3rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* 2-Column layout grid: Pinned content on the left, scrolling text on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[6vw] items-start">
          {/* Left Column — Sticky Headline & Map */}
          <motion.div
            className="lg:sticky lg:top-[140px] flex flex-col gap-8 self-start w-full"
            style={{
              y: leftColY,
              opacity: leftColOpacity,
            }}
          >
            {/* Headline block inside sticky parent */}
            <div ref={headingRef}>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isHeadingInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)", transformOrigin: "left" }}
                />
                <span className="label-gold">DESIGNING VISUAL TRUTH</span>
              </motion.div>

              <div style={{ overflow: "hidden" }}>
                <motion.h2
                  initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
                  animate={isHeadingInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  style={{
                    fontFamily:    "var(--font-bebas)",
                    fontSize:      "clamp(3.5rem, 7vw, 7rem)",
                    letterSpacing: "0.01em",
                    lineHeight:    0.92,
                    color:         "var(--color-text-primary)",
                  }}
                >
                  Here&apos;s How
                  <br />
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    verticalAlign: "middle",
                    margin: "0 0.65rem 0 0",
                    position: "relative",
                    width: "clamp(4.5rem, 8vw, 8rem)",
                    height: "clamp(2.1rem, 3.8vw, 3.8rem)",
                    borderRadius: "100px",
                    overflow: "hidden",
                    border: "1px solid var(--color-gold)",
                    background: "var(--color-bg)",
                    transform: "translateY(-0.06em)"
                  }}>
                    <Image
                      src="/vatto_branding.png"
                      alt=""
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover", filter: "grayscale(100%) contrast(1.25) brightness(0.85)" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(201,168,76,0.12)", mixBlendMode: "overlay" }} />
                  </span>
                  <span style={{ color: "var(--color-gold)" }}>
                    We Work.
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Lagos to Worldwide interactive visual graphic with HUD / Viewfinder overlays */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 35 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                width: "100%",
                maxWidth: "520px",
                aspectRatio: "16/10",
                borderRadius: "6px",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
                position: "relative",
              }}
              className="group cursor-default"
            >
              <Image
                src="/lagos_worldwide.png"
                alt="Lagos Worldwide Creative Network"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  filter: "grayscale(10%) brightness(0.85) contrast(1.08)",
                  transition: "transform 0.8s var(--ease-cinematic)",
                }}
                className="group-hover:scale-[1.03]"
              />

              {/* Viewfinder Camera UI Hud overlay */}
              <motion.div
                style={{ opacity: hudOpacity }}
                className="absolute inset-0 z-10 pointer-events-none p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[8px] text-[rgba(255,255,255,0.4)] tracking-widest">
                    HUD v1.08 // NET
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
                    <span className="font-mono text-[8px] text-[var(--color-gold)] tracking-widest">
                      LIVE NODES
                    </span>
                  </div>
                </div>

                {/* Viewfinder corner lines */}
                <div className="absolute inset-3 z-10 pointer-events-none opacity-40">
                  <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white" />
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white" />
                  <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white" />
                </div>

                <div className="flex justify-between items-end">
                  <span className="font-mono text-[8px] text-[rgba(255,255,255,0.4)] tracking-widest">
                    LAT: 6.5244° N, LON: 3.3792° E
                  </span>
                  <span className="font-mono text-[8px] text-[rgba(255,255,255,0.4)] tracking-widest">
                    LAGOS HQ
                  </span>
                </div>
              </motion.div>

              {/* Active pulsing geographic radar dots */}
              <motion.div
                style={{ opacity: radarOpacity }}
                className="absolute inset-0 z-10 pointer-events-none"
              >
                <MapPulseNode top="84%" left="50.2%" name="Lagos" />
                <MapPulseNode top="51%" left="49.5%" name="London" />
                <MapPulseNode top="58%" left="20.5%" name="New York" />
                <MapPulseNode top="69%" left="67.5%" name="Dubai" />
                <MapPulseNode top="60%" left="89%" name="Tokyo" />
              </motion.div>

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
                  opacity: 0,
                  transition: "opacity 0.6s",
                  pointerEvents: "none",
                }}
                className="group-hover:opacity-100"
              />
            </motion.div>
          </motion.div>

          {/* Right Column — Body copy with scroll reveals + studio metadata */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Invisible Alignment Spacer for Desktop Layouts (matches Headline height precisely) */}
            <div className="hidden lg:block invisible pointer-events-none select-none" aria-hidden="true">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                <span style={{ display: "block", width: "28px", height: "1px" }} />
                <span className="label-gold">DESIGNING VISUAL TRUTH</span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <h2 style={{
                  fontFamily:    "var(--font-bebas)",
                  fontSize:      "clamp(3.5rem, 7vw, 7rem)",
                  letterSpacing: "0.01em",
                  lineHeight:    0.92,
                }}>
                  Here&apos;s How
                  <br />
                  <span style={{
                    display: "inline-flex",
                    width: "clamp(4.5rem, 8vw, 8rem)",
                    height: "clamp(2.1rem, 3.8vw, 3.8rem)",
                  }} />
                  We Work.
                </h2>
              </div>
            </div>
            <ScrollTextReveal
              text="Vattostudio started with a simple belief: every brand has a story worth telling. Not a mission statement. Not a tagline. A real story — the one about how you started, why you matter, what problem you solved, and what you actually stand for."
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(1.05rem, 1.4vw, 1.25rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-primary)",
              }}
            />
            
            <ScrollTextReveal
              text="We noticed something. Brands spend money on ads, but nobody's really listening. You know why? Because they're selling features instead of telling their truth. Your customers don't buy what you do — they buy who you are."
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-secondary)",
              }}
            />

            <ScrollTextReveal
              text="We help you figure out what that is. Then we turn it into videos that actually stick with people."
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-secondary)",
              }}
            />

            <ScrollTextReveal
              text="Whether you already know your origin story or you're still figuring it out, we work with you to uncover it, shape it, and produce it in a way that makes sense. Motion graphics, documentary-style storytelling, whatever it takes — we build the content that proves who you are."
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-secondary)",
              }}
            />

            {/* Studio Meta Table */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "1.5rem 1.25rem",
                marginTop:           "0.5rem",
                paddingTop:          "1.75rem",
                borderTop:           "1px solid var(--color-border)",
              }}
            >
              {[
                { label: "Founded",   value: "2021" },
                { label: "Location",  value: "Lagos, NG" },
                { label: "Team size", value: "Tight. Intentional." },
                { label: "Approach",  value: "Quality over volume" },
              ].map((item) => (
                <div key={item.label}>
                  <span
                    style={{
                      fontFamily:    "var(--font-ibm-plex-mono)",
                      fontSize:      "0.5rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color:         "var(--color-text-tertiary)",
                      display:       "block",
                      marginBottom:  "0.35rem",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-satoshi)",
                      fontSize:   "0.9375rem",
                      color:      "var(--color-text-primary)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Dynamic velocity-skewed ticker */}
        <ManifestoTicker />

        {/* Values Section Header */}
        <motion.div
          ref={valuesRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
        >
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)" }} />
          <span className="label-gold">WHO WE WORK WITH</span>
        </motion.div>

        {/* Asymmetric target partner accordion system */}
        <TargetAccordion targets={TARGETS} />
      </div>
    </section>
  );
}
