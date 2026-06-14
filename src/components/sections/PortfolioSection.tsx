"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContainerScroll,
  BentoGrid,
  BentoCell,
  ContainerScale,
} from "@/components/ui/hero-gallery-scroll-animation";

/* ════════════════════════════════════════════
   VIDEO WORKS DATA — 3 Real Projects
   ════════════════════════════════════════════ */
const WORKS = [
  {
    id:          "01",
    title:       "Motion Reel I",
    category:    "Motion Graphics",
    year:        "2024",
    description: "Kinetic brand storytelling through motion. Typography, transitions, and visual rhythm crafted into a cohesive narrative.",
    videoSrc:    "/Motion_graohics(720p).mp4",
  },
  {
    id:          "02",
    title:       "Motion Reel II",
    category:    "Motion Design",
    year:        "2024",
    description: "High-production motion identity — bold compositions built for brand recognition at scale.",
    videoSrc:    "/MOTION_GRAPHICS_1(1080p).mp4",
  },
  {
    id:          "03",
    title:       "Web Campaign Ads",
    category:    "Digital Campaign",
    year:        "2024",
    description: "Scroll-stopping web ad creatives engineered for conversion. Motion-led, message-first.",
    videoSrc:    "/motion_graphics_web_ads(1080p).mp4",
  },
];

/* ════════════════════════════════════════════
   VIDEO LIGHTBOX — Full-screen modal player
   ════════════════════════════════════════════ */
interface VideoLightboxProps {
  src:     string;
  title:   string;
  onClose: () => void;
}

function VideoLightbox({ src, title, onClose }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Escape key closes lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    // Prevent body scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Pause and clean up when closing
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleClose} // click backdrop to close
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          99999,
        background:      "rgba(0,0,0,0.95)",
        backdropFilter:  "blur(8px)",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         "clamp(1rem, 4vw, 3rem)",
      }}
    >
      {/* Video container — stop click propagation so clicking video doesn't close */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position:     "relative",
          width:        "100%",
          maxWidth:     "1100px",
          background:   "#0A0A0A",
          border:       "1px solid rgba(201,168,76,0.2)",
          boxShadow:    "0 40px 120px rgba(0,0,0,0.8)",
        }}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          style={{
            width:   "100%",
            display: "block",
            maxHeight: "80vh",
            objectFit: "contain",
            background: "#000",
          }}
        />

        {/* Title bar */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            padding:        "0.875rem 1.25rem",
            borderTop:      "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <span
            style={{
              fontFamily:    "var(--font-ibm-plex-mono)",
              fontSize:      "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         "var(--color-gold)",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily:    "var(--font-ibm-plex-mono)",
              fontSize:      "0.5625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.3)",
            }}
          >
            ESC to close
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close video"
          style={{
            position:       "absolute",
            top:            "-44px",
            right:          0,
            width:          "36px",
            height:         "36px",
            borderRadius:   "50%",
            border:         "1px solid rgba(201,168,76,0.4)",
            background:     "rgba(10,10,10,0.8)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
            color:          "var(--color-gold)",
            backdropFilter: "blur(4px)",
          }}
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   VIDEO CARD — Thumbnail + Play Button
   ════════════════════════════════════════════ */
interface VideoCardProps {
  work:    typeof WORKS[0];
  index:   number;
  onPlay:  (work: typeof WORKS[0]) => void;
}

function VideoCard({ work, index, onPlay }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef               = useRef<HTMLDivElement>(null);
  const videoRef              = useRef<HTMLVideoElement>(null);

  // 3D tilt on mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      const str  = index === 0 ? 5 : 7;
      el.style.transform = `perspective(800px) rotateY(${x * str}deg) rotateX(${-y * str}deg) scale3d(1.02,1.02,1.02)`;
    },
    [index]
  );

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
  }, []);

  // Muted preview plays on hover (silent autoplay, for visual interest)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) {
      v.currentTime = 0;
      v.play().catch(() => {}); // silently ignore if blocked
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered]);

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
      onClick={() => onPlay(work)}
      style={{
        position:   "relative",
        width:      "100%",
        height:     "100%",
        borderRadius: "3px",
        overflow:   "hidden",
        background: "var(--color-surface)",
        transition: "transform 0.6s var(--ease-cinematic)",
        border:     "1px solid var(--color-border)",
        cursor:     "pointer",
      }}
    >
      {/* Video thumbnail — preload="metadata" loads only first frame, no full download */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          transition: "transform 1.4s var(--ease-cinematic)",
          transform:  hovered ? "scale(1.06)" : "scale(1)",
        }}
      >
        <video
          ref={videoRef}
          src={work.videoSrc}
          preload="metadata"
          muted
          playsInline
          loop
          style={{
            width:      "100%",
            height:     "100%",
            objectFit:  "cover",
            opacity:    hovered ? 0.72 : 0.45,
            transition: "opacity 0.7s var(--ease-cinematic)",
            filter:     hovered
              ? "grayscale(0%) contrast(1.05)"
              : "grayscale(20%) brightness(0.85)",
          }}
        />
      </div>

      {/* Cinematic gradient overlays — identical to original PortfolioCard */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, transparent 60%)",
          zIndex:        1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    "linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.92) 100%)",
          zIndex:        1,
          pointerEvents: "none",
        }}
      />

      {/* Gold left accent line */}
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

      {/* Diagonal shimmer sweep */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? "110%" : "-30%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position:      "absolute",
          inset:         "-50%",
          background:    "linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.06) 50%, transparent 60%)",
          zIndex:        2,
          pointerEvents: "none",
        }}
      />

      {/* ── PLAY BUTTON — centre of card on hover ── */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
          scale:   hovered ? 1 : 0.6,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position:        "absolute",
          top:             "50%",
          left:            "50%",
          transform:       "translate(-50%, -50%)",
          zIndex:          4,
          width:           index === 0 ? "72px" : "56px",
          height:          index === 0 ? "72px" : "56px",
          borderRadius:    "50%",
          border:          "1.5px solid var(--color-gold)",
          background:      "rgba(201,168,76,0.12)",
          backdropFilter:  "blur(8px)",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          boxShadow:       "0 0 40px rgba(201,168,76,0.25)",
        }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={hovered ? { scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          style={{
            position:     "absolute",
            inset:        "-6px",
            borderRadius: "50%",
            border:       "1px solid rgba(201,168,76,0.35)",
          }}
        />
        <Play
          size={index === 0 ? 22 : 18}
          color="var(--color-gold)"
          strokeWidth={1.5}
          style={{ marginLeft: "2px" }} // optical centering
        />
      </motion.div>

      {/* Card content — top serial + bottom metadata */}
      <div
        style={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          flexDirection:  "column",
          justifyContent: "space-between",
          padding:        index === 0
            ? "clamp(1.5rem, 3.5vw, 3rem)"
            : "clamp(1.25rem, 2vw, 2rem)",
          zIndex:         3,
        }}
      >
        {/* Top: serial number */}
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
        </div>

        {/* Bottom: category, title, description */}
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
              animate={{ y: hovered ? 0 : 6 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily:    "var(--font-bebas)",
                fontSize:      index === 0
                  ? "clamp(2rem, 4vw, 4rem)"
                  : "clamp(1.5rem, 2.2vw, 2.5rem)",
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
              opacity:   hovered ? 1 : 0,
              y:         hovered ? 0 : 8,
              maxHeight: hovered ? "80px" : "0px",
              marginTop: hovered ? "0.875rem" : "0rem",
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

          {/* "Click to play" hint fades in on hover */}
          <motion.div
            animate={{ opacity: hovered ? 0.5 : 0, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            style={{
              marginTop:     "0.625rem",
              fontFamily:    "var(--font-ibm-plex-mono)",
              fontSize:      "0.5rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         "var(--color-gold)",
            }}
          >
            ▶ Click to play
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PORTFOLIO SECTION — Main Component
   ════════════════════════════════════════════ */
export function PortfolioSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeLightbox, setActiveLightbox] = useState<typeof WORKS[0] | null>(null);

  const mobileHeaderRef     = useRef<HTMLDivElement>(null);
  const isMobileHeaderInView = useInView(mobileHeaderRef, { once: true, margin: "-10%" });

  const openLightbox  = useCallback((work: typeof WORKS[0]) => setActiveLightbox(work), []);
  const closeLightbox = useCallback(() => setActiveLightbox(null), []);

  return (
    <section
      id="portfolio"
      aria-label="Selected Work"
      style={{
        background: "var(--color-bg-surface)",
        borderTop:  "1px solid var(--color-border)",
        position:   "relative",
        overflow:   "visible",
      }}
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "-5%",
          right:         "0",
          width:         "50vw",
          height:        "40vh",
          background:    "radial-gradient(ellipse at 100% 0%, rgba(201,168,76,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex:        1,
        }}
      />

      {/* Section breathing room */}
      <div className="h-[14vh] md:h-[24vh] w-full pointer-events-none" />

      {/* ══════════════════════════════════════════
          DESKTOP — Bento scroll assembly (3 videos)
         ══════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* 220vh gives enough scroll travel for 3 cards to fly in cleanly */}
        <ContainerScroll className="h-[220vh]">
          <BentoGrid
            variant="threeVideos"
            className="sticky left-0 top-0 z-0 h-screen w-full p-8 lg:p-12 gap-5"
            style={{ boxSizing: "border-box" }}
          >
            {WORKS.map((work, index) => (
              <BentoCell
                key={work.id}
                index={index}
                className="w-full h-full shadow-2xl relative z-10"
              >
                <VideoCard work={work} index={index} onPlay={openLightbox} />
              </BentoCell>
            ))}

            {/* Manifesto text — fades out as cards fly in */}
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
                      display:    "block",
                      width:      "28px",
                      height:     "1px",
                      background: "var(--color-gold)",
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
                      borderRadius:  "3px",
                      borderColor:   "var(--color-border-mid)",
                      fontFamily:    "var(--font-ibm-plex-mono)",
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

      {/* ══════════════════════════════════════════
          MOBILE — Touch-optimised vertical stack
         ══════════════════════════════════════════ */}
      <div className="block md:hidden py-16 px-5 relative z-10">
        {/* Mobile section header */}
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

        {/* Video cards — 16:9 ratio, full width, stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {WORKS.map((work, i) => (
            <motion.div
              key={work.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              style={{
                width:       "100%",
                aspectRatio: "16/9",
                minHeight:   "220px",
              }}
            >
              <VideoCard work={work} index={i} onPlay={openLightbox} />
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3.5rem" }}>
          <Button
            className="px-8 py-3 text-xs tracking-widest font-mono uppercase bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-mid)] hover:border-gold hover:text-gold transition-colors duration-300"
            style={{
              borderRadius:  "3px",
              borderColor:   "var(--color-border-mid)",
              fontFamily:    "var(--font-ibm-plex-mono)",
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

      {/* ══════════════════════════════════════════
          VIDEO LIGHTBOX MODAL
         ══════════════════════════════════════════ */}
      <AnimatePresence>
        {activeLightbox && (
          <VideoLightbox
            key="lightbox"
            src={activeLightbox.videoSrc}
            title={`${activeLightbox.id} — ${activeLightbox.title}`}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
