"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─── WhatsApp SVG icon ─── */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   WHATSAPP FLOATING CTA
   ═══════════════════════════════════════════ */
export function WhatsAppCTA() {
  const [visible,  setVisible]  = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [pulsing,  setPulsing]  = useState(false);
  const prefersReducedMotion    = useReducedMotion();
  const pulseTimer              = useRef<ReturnType<typeof setInterval> | null>(null);
  const collapseTimer           = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Slide in after 3.5s (after intro finishes) */
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(showTimer);
  }, []);

  /* Collapse to icon-only after 6s of idle */
  useEffect(() => {
    if (!visible) return;

    collapseTimer.current = setTimeout(() => {
      setExpanded(false);
    }, 6000);

    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, [visible]);

  /* Periodic pulse every 12s */
  useEffect(() => {
    if (!visible || prefersReducedMotion) return;

    pulseTimer.current = setInterval(() => {
      setPulsing(true);
      setTimeout(() => setPulsing(false), 2000);
    }, 12000);

    return () => {
      if (pulseTimer.current) clearInterval(pulseTimer.current);
    };
  }, [visible, prefersReducedMotion]);

  const handleMouseEnter = () => {
    setExpanded(true);
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
  };

  const handleMouseLeave = () => {
    collapseTimer.current = setTimeout(() => setExpanded(false), 3000);
  };

  const whatsappNumber = "+2348107288180";
  const whatsappMessage = "Hello Vattostudio! I'd love to discuss a project.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Vattostudio on WhatsApp"
          initial={{ opacity: 0, x: 80, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={`whatsapp-cta ${pulsing ? "pulsing" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ textDecoration: "none" }}
          data-cursor
        >
          {/* WhatsApp Icon */}
          <motion.div
            style={{ color: "#25D366", flexShrink: 0, lineHeight: 0 }}
            animate={{ scale: pulsing && !prefersReducedMotion ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.4 }}
          >
            <WhatsAppIcon size={18} />
          </motion.div>

          {/* Expandable label */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.span
                key="label"
                initial={{ opacity: 0, width: 0, marginLeft: -4 }}
                animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
                exit={{ opacity: 0, width: 0, marginLeft: -4 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Chat with Us
              </motion.span>
            )}
          </AnimatePresence>

          {/* Gold accent dot */}
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
              scale:   [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#25D366",
              flexShrink: 0,
            }}
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
