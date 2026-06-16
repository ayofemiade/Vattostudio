"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  {
    index:       "01",
    title:       "Story Discovery",
    description: "You might know your story. You might not. Either way, we sit down and figure out what makes your brand tick — your journey, your values, the problem you solved, the 'why' behind everything you do. Then we shape it into something that resonates.",
    tagline:     "This is for brands who need clarity before content.",
    tags:        ["Clarity", "Strategy", "Narrative"],
    image:       "/brand_identity.png",
    outcomes: [
      "Comprehensive Brand Messaging Guide",
      "Curated Core Story Archetype Document",
      "Positioning Framework against Competitors",
      "Tailored Content Strategy Roadmap"
    ]
  },
  {
    index:       "02",
    title:       "Video Production",
    description: "Once we've got your story locked, we produce it. Motion graphics, interviews, cinematic storytelling — whatever format brings your origin to life. Clean. Professional. Real.",
    tagline:     "This is for brands who already know their story and need it brought to life.",
    tags:        ["Cinematic", "Production", "Motion"],
    image:       "/campaign_production.png",
    outcomes: [
      "Premium Motion Graphics & Animation",
      "Professional Sound Design & Audio Mix",
      "Cinematic Grade Color Grading",
      "Multiple Platform Formats (16:9 & 9:16)"
    ]
  },
  {
    index:       "03",
    title:       "Full Package",
    description: "Don't know where to start? We handle it all — from discovery to final edit. You tell us your brand exists. We do the rest. One hero origin video plus four supporting story videos, delivered in three to four weeks.",
    tagline:     "This is our most complete offer. Everything in one place.",
    tags:        ["Discovery + Video", "Turnkey", "3-4 Weeks"],
    image:       "/motion_film.png",
    outcomes: [
      "1x High-End Hero Origin Film (2-3m)",
      "4x Staggered Story Cutdowns for Socials",
      "Full Scriptwriting & Storyboarding Services",
      "Guaranteed Turnkey Delivery in 3-4 Weeks"
    ]
  },
];

/* ─── Single service row ─── */
function ServiceRow({
  service,
  index,
  onOpen,
}: {
  service: typeof SERVICES[0];
  index: number;
  onOpen: (service: typeof SERVICES[0]) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);
  const prefersReducedMotion  = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      data-cursor
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      {/* Drawing row divider at bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px" }} className="pointer-events-none">
        <motion.div
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ delay: index * 0.1, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
          style={{
            width: "100%",
            height: "100%",
            background: "var(--color-border)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT — Card style: image top, text bottom
          Hidden on md+ screens
      ══════════════════════════════════════════════ */}
      <div
        className="md:hidden flex flex-col"
        onClick={() => onOpen(service)}
        style={{ cursor: "pointer" }}
      >
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
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3
              className="font-display leading-none"
              style={{
                fontSize: "clamp(2.25rem, 9vw, 3.5rem)",
                letterSpacing: "0.02em",
                color: "var(--color-white)",
              }}
            >
              {service.title}
            </h3>
            <div
              style={{
                width:          "34px",
                height:         "34px",
                borderRadius:   "50%",
                border:         "1px solid var(--color-gold)",
                background:     "rgba(201,168,76,0.08)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                flexShrink:     0,
              }}
            >
              <ArrowUpRight size={14} color="var(--color-gold)" strokeWidth={1.5} />
            </div>
          </div>
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
        onClick={() => onOpen(service)}
        style={{
          gridTemplateColumns: "4rem 1fr auto",
          alignItems:      "center",
          gap:             "clamp(1.5rem, 3vw, 3.5rem)",
          padding:         "clamp(2.5rem, 5vh, 4rem) clamp(1rem, 3vw, 2.5rem)",
          cursor:          "pointer",
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
            background:    "linear-gradient(to right, rgba(8, 8, 8, 0.96) 0%, rgba(8, 8, 8, 0.75) 45%, rgba(8, 8, 8, 0.15) 100%)",
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

        {/* Index drop slide */}
        <div style={{ overflow: "hidden", paddingTop: "0.5rem" }} className="relative z-10 self-start">
          <motion.span
            data-index
            initial={prefersReducedMotion ? { y: 0 } : { y: "-100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              display:       "block",
              fontFamily:    "var(--font-ibm-plex-mono)",
              fontSize:      "0.6875rem",
              letterSpacing: "0.1em",
              color:         hovered ? "var(--color-gold)" : "var(--color-text-tertiary)",
              transition:    "color 0.35s var(--ease-cinematic)",
            }}
          >
            {service.index}
          </motion.span>
        </div>

        {/* Content reveal */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            transform: hovered ? "translateX(12px)" : "translateX(0px)",
            transition: "transform 0.5s var(--ease-cinematic)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <motion.h3
              initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 22 }}
              whileInView={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.1 + 0.05, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily:    "var(--font-bebas)",
                fontSize:      "clamp(2.25rem, 4.5vw, 4.25rem)",
                letterSpacing: "0.02em",
                color:         hovered ? "#FFFFFF" : "var(--color-text-primary)",
                lineHeight:    1,
                marginBottom:  "0.9rem",
                transition:    "color 0.4s",
              }}
            >
              {service.title}
            </motion.h3>
          </div>
          
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.1 + 0.12, duration: 0.8, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize:   "clamp(0.875rem, 1.2vw, 1rem)",
              lineHeight: 1.75,
              color:      hovered ? "rgba(255, 255, 255, 0.85)" : "var(--color-text-secondary)",
              maxWidth:   "54ch",
              transition: "color 0.4s",
            }}
          >
            {service.description}
          </motion.p>
          
          {service.tagline && (
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.1 + 0.18, duration: 0.8, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize:   "clamp(0.8rem, 1.1vw, 0.9rem)",
                lineHeight: 1.7,
                color:      "var(--color-gold)",
                fontStyle:  "italic",
                marginTop:  "0.65rem",
              }}
            >
              {service.tagline}
            </motion.p>
          )}
        </div>

        {/* Right side: tags + arrow slide reveal */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: index * 0.1 + 0.15, duration: 0.8, ease: "easeOut" }}
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
                color:         hovered ? "#C9A84C" : "var(--color-text-secondary)",
                background:    hovered ? "rgba(201, 168, 76, 0.08)" : "var(--color-surface-2)",
                border:        `1px solid ${hovered ? "#C9A84C" : "var(--color-border)"}`,
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
              border:         `1px solid ${hovered ? "#C9A84C" : "var(--color-gold)"}`,
              background:     "rgba(201,168,76,0.08)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={14} color={hovered ? "#C9A84C" : "var(--color-gold)"} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SERVICE DETAILS MODAL
   ═══════════════════════════════════════════ */
interface ServiceModalProps {
  service: typeof SERVICES[0];
  onClose: () => void;
}

function ServiceModal({ service, onClose }: ServiceModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    // Lock scroll with a slight delay to allow the modal entrance animation to start smoothly
    const timeoutId = setTimeout(() => {
      document.body.style.overflow = "hidden";
      const win = window as unknown as { lenis?: { stop: () => void; start: () => void } };
      if (typeof window !== "undefined" && win.lenis) {
        win.lenis.stop();
      }
    }, 80);

    return () => {
      window.removeEventListener("keydown", handleKey);
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
      const win = window as unknown as { lenis?: { stop: () => void; start: () => void } };
      if (typeof window !== "undefined" && win.lenis) {
        win.lenis.start();
      }
    };
  }, [onClose]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClose}
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          99999,
        background:      "rgba(8, 8, 8, 0.95)",
        backdropFilter:  "blur(8px)",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         "clamp(1rem, 4vw, 3rem)",
        willChange:      "opacity",
      }}
    >
      {/* Close button (Fixed to viewport top-right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close details"
        style={{
          position:       "absolute",
          top:            "clamp(1rem, 4vh, 2.5rem)",
          right:          "clamp(1rem, 4vw, 2.5rem)",
          width:          "48px",
          height:         "48px",
          borderRadius:   "50%",
          border:         "1px solid rgba(201,168,76,0.35)",
          background:     "rgba(10,10,10,0.6)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          cursor:         "pointer",
          color:          "var(--color-gold)",
          backdropFilter: "blur(12px)",
          transition:     "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          zIndex:         100000,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(201, 168, 76, 0.15)";
          el.style.borderColor = "var(--color-gold)";
          el.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = "rgba(10,10,10,0.6)";
          el.style.borderColor = "rgba(201,168,76,0.35)";
          el.style.transform = "scale(1)";
        }}
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      {/* Modal Container */}
      <motion.div
        data-lenis-prevent
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position:     "relative",
          width:        "100%",
          maxWidth:     "1000px",
          background:   "linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(8,8,8,0.98) 100%)",
          border:       "1px solid rgba(201,168,76,0.25)",
          boxShadow:    "0 40px 120px rgba(0,0,0,0.85)",
          borderRadius: "4px",
          overflowY:    "auto",
          overflowX:    "hidden",
          willChange:    "opacity, transform",
        }}
        className="max-h-[90vh] md:max-h-[85vh]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Side: Cinematic image cover */}
          <div className="relative col-span-1 md:col-span-5 h-[200px] md:h-auto min-h-[200px] md:min-h-[500px]">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: "cover",
                objectPosition: "center 40%",
                filter: "grayscale(10%) contrast(1.1) brightness(0.65)",
              }}
            />
            {/* Overlay Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 30%, rgba(8,8,8,0.95) 100%)",
              }}
              className="md:hidden"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, transparent 50%, rgba(8,8,8,0.98) 100%)",
              }}
              className="hidden md:block"
            />
            {/* Service Index Indicator */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-gold/80 bg-black/60 px-3 py-1 border border-gold/20 rounded-[2px] backdrop-blur-md">
                SERVICE {service.index}
              </span>
            </div>
          </div>

          {/* Right Side: Service Details */}
          <div className="col-span-1 md:col-span-7 p-5 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Category tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-[0.16em] px-2.5 py-1.5 rounded-[2px]"
                    style={{
                      color: "var(--color-gold)",
                      background: "rgba(201, 168, 76, 0.05)",
                      border: "1px solid rgba(201, 168, 76, 0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2
                className="font-display leading-none mb-3"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 4rem)",
                  letterSpacing: "0.02em",
                  color: "var(--color-white)",
                }}
              >
                {service.title}
              </h2>

              {/* Tagline */}
              {service.tagline && (
                <p className="font-body text-xs sm:text-sm italic mb-4 text-gold/90 font-medium">
                  {service.tagline}
                </p>
              )}

              {/* Divider */}
              <div className="h-[1px] w-full mb-4" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* Detailed Description */}
              <p
                className="font-body text-[14px] sm:text-[15px] leading-relaxed mb-5"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {service.description}
              </p>

              {/* Outcomes / Deliverables */}
              {service.outcomes && service.outcomes.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">
                    What You Get / Key Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {service.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
                        <span className="font-body text-xs sm:text-sm text-white/90 leading-snug">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
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
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

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

        {/* Service list with drawing top line */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px" }} className="pointer-events-none">
            <motion.div
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              style={{
                width: "100%",
                height: "100%",
                background: "var(--color-border)",
                transformOrigin: "center",
              }}
            />
          </div>
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.index}
              service={service}
              index={i}
              onOpen={setSelectedService}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            key="service-modal"
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
