"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ContainerScroll,
  BentoGrid,
  BentoCell,
  ContainerScale,
} from "@/components/ui/hero-gallery-scroll-animation";

/* ════════════════════════════════════════════
   WORKS DATA — The 5 Selected Luxury Showcases
   ════════════════════════════════════════════ */
const WORKS = [
  {
    id:          "01",
    title:       "Achebe Spirits",
    category:    "Brand Identity",
    year:        "2024",
    description: "Complete visual identity for a luxury Nigerian spirits brand. From concept to label — a craft distilled into an icon.",
    image:       "/achebe.png",
  },
  {
    id:          "02",
    title:       "Ìmọ̀lẹ̀ Films",
    category:    "Film & Campaign",
    year:        "2024",
    description: "Campaign production for an independent Nollywood production house. Cinematic stills and motion direction.",
    image:       "/imole.png",
  },
  {
    id:          "03",
    title:       "Orisun Wellness",
    category:    "Digital Experience",
    year:        "2023",
    description: "Web presence and visual identity for a Lagos-based wellness brand. Where calm meets clarity.",
    image:       "/orisun.png",
  },
  {
    id:          "04",
    title:       "Eko Fashion",
    category:    "Editorial Campaign",
    year:        "2024",
    description: "Cinematic visual design and storytelling for a luxury African haute couture label. Elevating history into style.",
    image:       "/eko_fashion.png",
  },
  {
    id:          "05",
    title:       "Vatto Branding",
    category:    "Spatial Design",
    year:        "2023",
    description: "Minimalist luxury architectural brand experience. Raw concrete geometries meets soft golden illumination.",
    image:       "/vatto_branding.png",
  },
];

/* ─── 3D tilt hook ─── */
function useTilt(ref: React.RefObject<HTMLDivElement | null>, strength = 6) {
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [ref, strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, [ref]);

  return { handleMouseMove, handleMouseLeave };
}

/* ════════════════════════════════════════════
   PREMIUM PORTFOLIO CARD (Unified Interface)
   ════════════════════════════════════════════ */
interface PortfolioCardProps {
  work:  typeof WORKS[0];
  index: number;
}

function PortfolioCard({ work, index }: PortfolioCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef               = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseLeave } = useTilt(cardRef, index === 0 ? 5 : 7);

  return (
    <div
      ref={cardRef}
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      style={{
        position:       "relative",
        width:          "100%",
        height:         "100%",
        borderRadius:   "3px",
        overflow:       "hidden",
        background:     "var(--color-surface)",
        transition:     "transform 0.6s var(--ease-cinematic)",
        border:         "1px solid var(--color-border)",
        cursor:         "pointer",
      }}
    >
      {/* Background Image with Zoom & Color State */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          transition: "transform 1.4s var(--ease-cinematic)",
          transform:  hovered ? "scale(1.06)" : "scale(1)",
        }}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit:  "cover",
            opacity:    hovered ? 0.62 : 0.38,
            transition: "opacity 0.7s var(--ease-cinematic)",
            filter:     hovered ? "grayscale(0%) contrast(1.05)" : "grayscale(25%) brightness(0.9)",
          }}
        />
      </div>

      {/* Cinematic Overlays */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, transparent 60%)",
          zIndex:     1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.92) 100%)",
          zIndex:     1,
          pointerEvents: "none",
        }}
      />

      {/* Gold Left Accent Line */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position:        "absolute",
          left:            0,
          top:             "10%",
          bottom:          "10%",
          width:           "2px",
          background:      "linear-gradient(to bottom, transparent, var(--color-gold), transparent)",
          transformOrigin: "top",
          zIndex:          3,
        }}
      />

      {/* Diagonal Shimmer Sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? "110%" : "-30%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position:    "absolute",
          inset:       "-50%",
          background:  "linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.06) 50%, transparent 60%)",
          zIndex:      2,
          pointerEvents: "none",
        }}
      />

      {/* Card Content */}
      <div
        style={{
          position:        "absolute",
          inset:           0,
          display:         "flex",
          flexDirection:   "column",
          justifyContent:  "space-between",
          padding:         index === 0 ? "clamp(1.5rem, 3.5vw, 3rem)" : "clamp(1.25rem, 2vw, 2rem)",
          zIndex:          2,
        }}
      >
        {/* Top: Serial Number & Gold Accent Arrow */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span
            style={{
              fontFamily:    "var(--font-ibm-plex-mono)",
              fontSize:      "0.5625rem",
              letterSpacing: "0.2em",
              color:         "rgba(255,255,255,0.32)",
            }}
          >
            {work.id}
          </span>

          <motion.div
            animate={{
              opacity: hovered ? 1 : 0.25,
              rotate:  hovered ? 0 : -45,
              x:       hovered ? 0 : 4,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              width:          index === 0 ? "44px" : "36px",
              height:         index === 0 ? "44px" : "36px",
              borderRadius:   "50%",
              border:         "1px solid var(--color-gold)",
              background:     "rgba(201,168,76,0.08)",
              backdropFilter: "blur(4px)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={index === 0 ? 16 : 14} color="var(--color-gold)" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Bottom: Metas, Title, and Description */}
        <div>
          <motion.div
            animate={{ y: hovered ? 0 : 3, opacity: hovered ? 1 : 0.72 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily:    "var(--font-ibm-plex-mono)",
              fontSize:      "0.5625rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "var(--color-gold)",
              marginBottom:  "0.625rem",
            }}
          >
            {work.category} · {work.year}
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h3
              animate={{
                y: hovered ? 0 : 6,
              }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily:    "var(--font-bebas)",
                fontSize:      index === 0 ? "clamp(2.25rem, 4.5vw, 4.5rem)" : "clamp(1.5rem, 2.5vw, 2.5rem)",
                letterSpacing: "0.02em",
                color:         "#FFFFFF",
                lineHeight:    0.95,
              }}
            >
              {work.title}
            </motion.h3>
          </div>

          <motion.p
            animate={{
              opacity:    hovered ? 1 : 0,
              y:          hovered ? 0 : 8,
              marginTop:  hovered ? "0.875rem" : "0rem",
              maxHeight:  hovered ? "80px" : "0px",
            }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize:   "0.8125rem",
              lineHeight: 1.6,
              color:      "rgba(255,255,255,0.58)",
              maxWidth:   index === 0 ? "46ch" : "36ch",
              overflow:   "hidden",
            }}
          >
            {work.description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PORTFOLIO SECTION — Main Dynamic Component
   ════════════════════════════════════════════ */
export function PortfolioSection() {
  const prefersReducedMotion = useReducedMotion();

  /* References for static mobile entry animations */
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const isMobileHeaderInView = useInView(mobileHeaderRef, { once: true, margin: "-10%" });

  return (
    <section
      id="portfolio"
      aria-label="Selected Work"
      style={{
        background: "var(--color-bg-surface)",
        borderTop:  "1px solid var(--color-border)",
        position:   "relative",
        overflow:   "visible", /* CRITICAL: Must be visible to allow sticky grid locking! */
      }}
    >
      {/* Ambient Top Glow Layer */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          top:        "-5%",
          right:      "0",
          width:      "50vw",
          height:     "40vh",
          background: "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex:     1,
        }}
      />

      {/* Cinematic Section Spacer (Breathing Room) */}
      <div className="h-[14vh] md:h-[24vh] w-full pointer-events-none" />

      {/* ════════════════════════════════════════
          1. DESKTOP & TABLET: IMMERSIVE SCROLL ASSEMBLY
         ════════════════════════════════════════ */}
      <div className="hidden md:block">
        <ContainerScroll className="h-[320vh]">
          {/* Bento Grid — Sticky container that locks into place during scroll assembly */}
          <BentoGrid
            variant="default"
            className="sticky left-0 top-0 z-0 h-screen w-full p-8 lg:p-12 gap-5"
            style={{ boxSizing: "border-box" }}
          >
            {WORKS.map((work, index) => {
              /*
                Grid classes corresponding to the 'default' CVA bento template:
                - Child 1: col-span-6 row-span-3 (Featured)
                - Child 2: col-span-2 row-span-2
                - Child 3: col-span-2 row-span-2
                - Child 4: col-span-3
                - Child 5: col-span-3
              */
              return (
                <BentoCell
                  key={work.id}
                  index={index}
                  className="w-full h-full shadow-2xl relative z-10"
                  style={{
                    /* Each cell is styled as a luxury z-10 block to stack on top of the text */
                    gridArea: undefined, 
                    transformBox: "fill-box",
                  }}
                >
                  <PortfolioCard work={work} index={index} />
                </BentoCell>
              );
            })}

            {/* Centered manifesto overlay: absolute-positioned, placed behind the scaling cards (zIndex: 1) as the 6th child */}
            <ContainerScale
              className="flex flex-col items-center justify-center text-center pointer-events-none w-full"
              style={{ zIndex: 1 }}
            >
              <div className="pointer-events-auto max-w-2xl px-6 py-8 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      display:         "block",
                      width:           "28px",
                      height:          "1px",
                      background:      "var(--color-gold)",
                    }}
                  />
                  <span className="label-gold">Selected Work</span>
                </motion.div>

                <h2
                  style={{
                    fontFamily:    "var(--font-bebas)",
                    fontSize:      "clamp(3.5rem, 8vw, 6.5rem)",
                    letterSpacing: "0.01em",
                    lineHeight:    0.92,
                    color:         "var(--color-text-primary)",
                    textAlign:     "center",
                  }}
                >
                  A Few Things
                  <br />
                  <span style={{ color: "var(--color-gold)" }}>We&apos;ve Revealed.</span>
                </h2>

                <div className="mt-10">
                  <Button
                    className="px-8 py-3 text-xs tracking-widest font-mono uppercase bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-mid)] hover:border-gold hover:text-gold transition-colors duration-300"
                    style={{
                      borderRadius: "3px",
                      borderColor: "var(--color-border-mid)",
                      fontFamily: "var(--font-ibm-plex-mono)",
                      letterSpacing: "0.22em",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Full Archive
                  </Button>
                </div>
              </div>
            </ContainerScale>
          </BentoGrid>
        </ContainerScroll>
      </div>

      {/* ════════════════════════════════════════
          2. MOBILE: TOUCH-OPTIMIZED SCROLL STACK
         ════════════════════════════════════════ */}
      <div className="block md:hidden py-16 px-5 relative z-10">
        {/* Mobile Section Header */}
        <div ref={mobileHeaderRef} style={{ marginBottom: "3rem" }}>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={isMobileHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ display: "block", width: "20px", height: "1px", background: "var(--color-gold)" }} />
            <span className="label-gold" style={{ fontSize: "0.625rem" }}>Selected Work</span>
          </motion.div>

          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={isMobileHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={{
              fontFamily:    "var(--font-bebas)",
              fontSize:      "3rem",
              letterSpacing: "0.01em",
              lineHeight:    0.95,
              color:         "var(--color-text-primary)",
            }}
          >
            A Few Things
            <br />
            <span style={{ color: "var(--color-gold)" }}>We&apos;ve Revealed.</span>
          </motion.h2>
        </div>

        {/* Vertically Scrolling Stack for Flawless Mobile UX */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {WORKS.map((work, i) => {
            return (
              <motion.div
                key={work.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                style={{
                  width: "100%",
                  aspectRatio: i === 0 ? "4/3" : "1/1", // Larger card for featured main work
                  minHeight: "260px",
                }}
              >
                <PortfolioCard work={work} index={i} />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Bottom Dynamic Call-To-Action */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
          <Button
            className="px-8 py-3 text-xs tracking-widest font-mono uppercase bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-mid)] hover:border-gold hover:text-gold transition-colors duration-300"
            style={{
              borderRadius: "3px",
              borderColor: "var(--color-border-mid)",
              fontFamily: "var(--font-ibm-plex-mono)",
              letterSpacing: "0.22em",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Full Archive
          </Button>
        </div>
      </div>
    </section>
  );
}
