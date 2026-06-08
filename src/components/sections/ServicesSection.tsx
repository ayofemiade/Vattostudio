"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  {
    index:       "01",
    title:       "Story Discovery",
    description: "You might know your story. You might not. Either way, we sit down and figure out what makes your brand tick — your journey, your values, the problem you solved, the 'why' behind everything you do. Then we shape it into something that resonates.",
    tagline:     "This is for brands who need clarity before content.",
    tags:        ["Clarity", "Strategy", "Narrative"],
    image:       "/brand_identity.png",
  },
  {
    index:       "02",
    title:       "Video Production",
    description: "Once we've got your story locked, we produce it. Motion graphics, interviews, cinematic storytelling — whatever format brings your origin to life. Clean. Professional. Real.",
    tagline:     "This is for brands who already know their story and need it brought to life.",
    tags:        ["Cinematic", "Production", "Motion"],
    image:       "/campaign_production.png",
  },
  {
    index:       "03",
    title:       "Full Package",
    description: "Don't know where to start? We handle it all — from discovery to final edit. You tell us your brand exists. We do the rest. One hero origin video plus four supporting story videos, delivered in three to four weeks.",
    tagline:     "This is our most complete offer. Everything in one place.",
    tags:        ["Discovery + Video", "Turnkey", "3-4 Weeks"],
    image:       "/motion_film.png",
  },
];

/* ─── Single service row ─── */
function ServiceRow({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);
  const isInView              = useInView(ref, { once: true, margin: "-8%" });
  const prefersReducedMotion  = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay:    index * 0.1,
        duration: 0.85,
        ease:     [0.25, 0.46, 0.45, 0.94],
      }}
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-b border-[var(--color-border)]"
    >
      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT — Card style: image top, text bottom
          Hidden on md+ screens
      ══════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col">
        {/* Mobile image thumbnail — always visible */}
        <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 40%",
              filter: "grayscale(10%) contrast(1.15) brightness(0.75)",
            }}
          />
          {/* Subtle bottom gradient fade into deep section background */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(var(--color-bg-deep-rgb), 0.95) 100%)",
            }}
          />
          {/* Index badge */}
          <span
            className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.16em] uppercase text-white/80"
            style={{
              background: "rgba(10,10,10,0.55)",
              backdropFilter: "blur(8px)",
              padding: "0.3rem 0.65rem",
              borderRadius: "2px",
              letterSpacing: "0.16em",
            }}
          >
            {service.index}
          </span>
        </div>

        {/* Mobile text content — clean dark area */}
        <div className="px-5 pt-4 pb-8">
          <h3
            className="font-display leading-none mb-3"
            style={{
              fontSize: "clamp(2.25rem, 9vw, 3.5rem)",
              letterSpacing: "0.02em",
              color: "var(--color-white)",
            }}
          >
            {service.title}
          </h3>
          <p
            className="font-body text-[14.5px] leading-relaxed mb-4"
            style={{ color: "var(--color-text-secondary)", maxWidth: "42ch" }}
          >
            {service.description}
          </p>
          {service.tagline && (
            <p className="font-body text-[13px] italic mb-5" style={{ color: "var(--color-gold)" }}>
              {service.tagline}
            </p>
          )}
          {/* Tags row */}
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.16em] px-2.5 py-1.5 rounded-[2px]"
                style={{
                  color: "var(--color-text-secondary)",
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT — Full-row hover reveal
          Hidden on mobile (below md)
      ══════════════════════════════════════════════ */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "4rem 1fr auto",
          alignItems:      "center",
          gap:             "clamp(1.5rem, 3vw, 3.5rem)",
          padding:         "clamp(2.5rem, 5vh, 4rem) clamp(1rem, 3vw, 2.5rem)",
          cursor:          "default",
          position:        "relative",
          overflow:        "hidden",
          transition:      "all 0.6s var(--ease-cinematic)",
        }}
      >
        {/* ─── Cinematic Background Image Reveal ─── */}
        <motion.div
          animate={{
            opacity: hovered ? 0.85 : 0,
            scale:   hovered ? 1.05 : 1.0,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position:      "absolute",
            inset:         0,
            zIndex:        0,
            pointerEvents: "none",
          }}
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 40%",
              filter: "grayscale(10%) contrast(1.15) brightness(0.65)",
            }}
          />
        </motion.div>

        {/* Dark overlay — left-to-right gradient to preserve text readability */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position:      "absolute",
            inset:         0,
            background:    "linear-gradient(to right, rgba(var(--color-bg-deep-rgb), 0.96) 0%, rgba(var(--color-bg-deep-rgb), 0.75) 45%, rgba(var(--color-bg-deep-rgb), 0.15) 100%)",
            zIndex:        1,
            pointerEvents: "none",
          }}
        />

        {/* Hover line highlight at bottom */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position:        "absolute",
            left:            0,
            right:           0,
            bottom:          0,
            height:          "1px",
            background:      "linear-gradient(to right, transparent, var(--color-gold), transparent)",
            transformOrigin: "center",
            zIndex:          2,
          }}
        />

        {/* Index */}
        <span
          data-index
          style={{
            fontFamily:    "var(--font-ibm-plex-mono)",
            fontSize:      "0.6875rem",
            letterSpacing: "0.1em",
            color:         hovered ? "var(--color-gold)" : "var(--color-text-tertiary)",
            paddingTop:    "0.5rem",
            transition:    "color 0.35s var(--ease-cinematic)",
            position:      "relative",
            zIndex:        2,
          }}
        >
          {service.index}
        </span>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <h3
            style={{
              fontFamily:    "var(--font-bebas)",
              fontSize:      "clamp(2.25rem, 4.5vw, 4.25rem)",
              letterSpacing: "0.02em",
              color:         "var(--color-text-primary)",
              lineHeight:    1,
              marginBottom:  "0.9rem",
              transform:     hovered ? "translateX(12px)" : "translateX(0px)",
              transition:    "transform 0.5s var(--ease-cinematic), color 0.4s",
            }}
          >
            {service.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize:   "clamp(0.875rem, 1.2vw, 1rem)",
              lineHeight: 1.75,
              color:      hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              maxWidth:   "54ch",
              transform:     hovered ? "translateX(12px)" : "translateX(0px)",
              transition:    "transform 0.5s var(--ease-cinematic), color 0.4s",
            }}
          >
            {service.description}
          </p>
          {service.tagline && (
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.8rem, 1.1vw, 0.9rem)",
                lineHeight: 1.7,
                color:      "var(--color-gold)",
                fontStyle:  "italic",
                marginTop:  "0.65rem",
                transform:  hovered ? "translateX(12px)" : "translateX(0px)",
                transition: "transform 0.5s var(--ease-cinematic)",
              }}
            >
              {service.tagline}
            </p>
          )}
        </div>

        {/* Right side: tags + arrow */}
        <div
          style={{
            display:         "flex",
            flexDirection:   "column",
            gap:             "0.5rem",
            alignItems:      "flex-end",
            paddingTop:      "0.5rem",
            position:        "relative",
            zIndex:          2,
          }}
        >
          {service.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily:    "var(--font-ibm-plex-mono)",
                fontSize:      "0.5rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         hovered ? "var(--color-gold)" : "var(--color-text-secondary)",
                background:    hovered ? "var(--color-gold-dim)" : "var(--color-surface-2)",
                border:        `1px solid ${hovered ? "var(--color-gold)" : "var(--color-border)"}`,
                padding:       "0.25rem 0.5rem",
                borderRadius:  "2px",
                whiteSpace:    "nowrap",
                transition:    "all 0.4s var(--ease-cinematic)",
              }}
            >
              {tag}
            </span>
          ))}

          {/* Arrow indicator */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0.35,
              rotate:  hovered ? 0 : -45,
              scale:   hovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              marginTop:      "0.5rem",
              width:          "38px",
              height:         "38px",
              borderRadius:   "50%",
              border:         "1px solid var(--color-gold)",
              background:     "rgba(201,168,76,0.08)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={14} color="var(--color-gold)" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════ */
export function ServicesSection() {
  const headingRef           = useRef<HTMLDivElement>(null);
  const isHeadingInView      = useInView(headingRef, { once: true, margin: "-12%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      aria-label="Our Offers"
      style={{
        padding:      "clamp(6rem, 11vh, 10rem) 0",
        background:   "var(--color-bg-deep)",
        borderBottom: "1px solid var(--color-border)",
        position:     "relative",
        overflow:     "hidden",
      }}
    >
      {/* Atmospheric ambient */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          bottom:        "-10%",
          left:          "-5%",
          width:         "45vw",
          height:        "45vh",
          background:    "radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.06) 0%, transparent 65%)",
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
        {/* Section header */}
        <div
          ref={headingRef}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-6 md:gap-8"
          style={{ marginBottom: "clamp(3.5rem, 7vh, 6rem)" }}
        >
          <div>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isHeadingInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)", transformOrigin: "left" }}
              />
              <span className="label-gold">What We Offer</span>
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
                animate={isHeadingInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
                transition={{ delay: 0.1, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily:    "var(--font-bebas)",
                  fontSize:      "clamp(3rem, 7vw, 6.5rem)",
                  letterSpacing: "0.01em",
                  lineHeight:    0.92,
                  color:         "var(--color-white)",
                }}
              >
                Every brand
                <br />
                <span style={{ color: "var(--color-gold)" }}>is different.</span>
              </motion.h2>
            </div>
          </div>

          {/* Right-side sub copy — desktop only */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize:   "clamp(0.875rem, 1.1vw, 1rem)",
              lineHeight: 1.75,
              color:      "var(--color-text-secondary)",
              maxWidth:   "28ch",
              textAlign:  "right",
            }}
            className="hidden md:block"
          >
            So we&apos;ve built our offers to meet you where you are.
          </motion.p>
        </div>

        {/* Service list */}
        <div style={{ borderTop: "1px solid var(--color-border)" }}>
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.index} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
