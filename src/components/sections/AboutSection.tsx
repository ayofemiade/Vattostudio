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
          WebkitTextStroke: "1px var(--color-border-mid)",
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

/* ─── Premium Target Audience Card ─── */
function AudienceCard({ target, index, isInView }: {
  target: typeof TARGETS[0];
  index: number;
  isInView: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding:    "clamp(1.75rem, 3vw, 2.5rem)",
        borderTop:  "1px solid var(--color-border)",
        position:   "relative",
        overflow:   "hidden",
        background: hovered ? "var(--color-gold-dim)" : "transparent",
        transition: "background 0.45s var(--ease-cinematic)",
      }}
    >
      {/* Top accent line sliding horizontal reveal */}
      <motion.div
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position:   "absolute",
          top:        0,
          left:       0,
          height:     "1px",
          background: "var(--color-gold)",
        }}
      />

      {/* Index Number + Title with micro translations */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.875rem",
          marginBottom: "1.25rem",
          transform: hovered ? "translateY(-2px)" : "translateY(0px)",
          transition: "transform 0.4s var(--ease-cinematic)",
        }}
      >
        <span
          style={{
            fontFamily:    "var(--font-ibm-plex-mono)",
            fontSize:      "0.5625rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         hovered ? "var(--color-gold)" : "var(--color-text-tertiary)",
            transform:     hovered ? "translateX(4px)" : "translateX(0px)",
            transition:    "all 0.4s var(--ease-cinematic)",
            display:       "inline-block",
          }}
        >
          {target.label}
        </span>
        <h3
          style={{
            fontFamily:    "var(--font-bebas)",
            fontSize:      "clamp(1.5rem, 3vw, 2.25rem)",
            letterSpacing: "0.04em",
            color:         "var(--color-text-primary)",
            lineHeight:    1,
          }}
        >
          {target.title}
        </h3>
      </div>

      <p
        style={{
          fontFamily: "var(--font-satoshi)",
          fontSize:   "clamp(0.9rem, 1.2vw, 1rem)",
          lineHeight: 1.7,
          color:      hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
          transform:  hovered ? "translateY(-1px)" : "translateY(0px)",
          transition: "all 0.4s var(--ease-cinematic)",
        }}
      >
        {target.body}
      </p>
    </motion.div>
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

  return (
    <section
      id="about"
      aria-label="About Vattostudio"
      style={{
        padding:    "clamp(6rem, 11vh, 10rem) 0",
        background: "var(--color-bg-surface)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
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
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin:   "0 auto",
          padding:  "0 clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        {/* Top grid: Headline + body copy */}
        <div
          ref={headingRef}
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr",
            gap:                 "clamp(3rem, 6vw, 6rem)",
          }}
          className="md:grid-cols-2"
        >
          {/* Left Column — Headline & Lagos Worldwide Graphic */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
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
                <span className="label-gold">The Studio</span>
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
                  <span style={{ color: "transparent", WebkitTextStroke: "1px var(--color-border-mid)" }}>
                    We Work.
                  </span>
                </motion.h2>
              </div>
            </div>

            {/* Lagos to Worldwide interactive visual graphic */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 35 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                marginTop: "2.5rem",
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: "4px",
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
                  filter: "grayscale(10%) brightness(0.9) contrast(1.05)",
                  transition: "transform 0.8s var(--ease-cinematic)",
                }}
                className="group-hover:scale-105"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
                  opacity: 0,
                  transition: "opacity 0.6s",
                  pointerEvents: "none",
                }}
                className="group-hover:opacity-100"
              />
            </motion.div>
          </div>

          {/* Right Column — Body copy + studio meta grid */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "1.75rem" }}
          >
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(1.05rem, 1.4vw, 1.25rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-primary)",
              }}
            >
              Vattostudio started with a simple belief: every brand has a story worth telling.
              Not a mission statement. Not a tagline. A real story — the one about how you started, why you matter, what problem you solved, and what you actually stand for.
            </p>
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-secondary)",
              }}
            >
              We noticed something. Brands spend money on ads, but nobody&apos;s really listening. You know why? Because they&apos;re selling features instead of telling their truth. Your customers don&apos;t buy what you do — they buy who you are.
            </p>
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-secondary)",
              }}
            >
              We help you figure out what that is. Then we turn it into videos that actually stick with people.
            </p>
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.75,
                color:      "var(--color-text-secondary)",
              }}
            >
              Whether you already know your origin story or you&apos;re still figuring it out, we work with you to uncover it, shape it, and produce it in a way that makes sense. Motion graphics, documentary-style storytelling, whatever it takes — we build the content that proves who you are.
            </p>

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
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}
        >
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)" }} />
          <span className="label-gold">Who We Work With</span>
        </motion.div>

        {/* Asymmetric value bento grid */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            marginTop:           "0",
          }}
        >
          {TARGETS.map((target, i) => (
            <AudienceCard
              key={target.label}
              target={target}
              index={i}
              isInView={isValuesInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
