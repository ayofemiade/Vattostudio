"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Instagram, Twitter, LucideIcon } from "lucide-react";

/* ─── Animated Logo Mark ─── */
function FooterLogoMark() {
  return (
    <svg width="44" height="44" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="2,4 16,28 30,4 26,4 16,21 6,4" fill="#C9A84C" />
    </svg>
  );
}

/* ─── Premium Tactile Hover Link ─── */
function FooterLink({ href, children }: { href: string; children: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-satoshi)",
        fontSize: "clamp(0.875rem, 1.1vw, 0.9375rem)",
        color: hovered ? "var(--color-white)" : "var(--color-dim)",
        transform: hovered ? "translateX(6px)" : "translateX(0px)",
        transition: "all 0.35s var(--ease-cinematic)",
      }}
    >
      {children}
    </a>
  );
}

/* ─── Premium Tactile Social Icon Button ─── */
function SocialIcon({ icon: Icon, href, label }: { icon: LucideIcon; href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${hovered ? "var(--color-gold)" : "var(--color-border)"}`,
        borderRadius: "50%",
        color: hovered ? "var(--color-gold)" : "var(--color-dim)",
        background: hovered ? "rgba(201,168,76,0.06)" : "transparent",
        boxShadow: hovered ? "0 0 12px rgba(201,168,76,0.12)" : "none",
        transition: "all 0.4s var(--ease-cinematic)",
      }}
    >
      <Icon
        size={14}
        strokeWidth={1.5}
        style={{
          transform: hovered ? "scale(1.15)" : "scale(1.0)",
          transition: "all 0.35s var(--ease-cinematic)",
        }}
      />
    </a>
  );
}

const FOOTER_LINKS = {
  Work:     ["Brand Identity", "Campaign Production", "Motion & Film", "Digital Experience"],
  Studio:   ["About", "Process", "Pricing", "Contact"],
  Social:   ["Instagram", "Twitter / X", "LinkedIn", "Behance"],
};

/* ═══════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════ */
export function Footer() {
  const currentYear          = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const [brandHovered, setBrandHovered] = useState(false);

  /* Animation trigger refs */
  const sectionRef   = useRef<HTMLDivElement>(null);
  const isInView     = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <footer
      ref={sectionRef}
      aria-label="Vattostudio footer"
      style={{
        background: "var(--color-bg-deep)",
        borderTop: "1px solid var(--color-border)",
        padding: "clamp(4rem, 8vh, 7rem) 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Stage light from below — cinematic floor atmosphere */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "50vh",
          background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.055) 0%, rgba(201,168,76,0.015) 40%, transparent 70%)",
          pointerEvents: "none",
          filter: "blur(1px)",
        }}
      />
      
      {/* Top-left subtle ambient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "40vw",
          height: "40vh",
          background: "radial-gradient(ellipse at 0% 0%, rgba(201,168,76,0.025) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        {/* ─── Top section: CTA callout with smooth entry ─── */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-start gap-8 pb-12 border-b border-[var(--color-border)] md:flex-row md:items-end md:justify-between md:pb-16"
          style={{
            marginBottom: "clamp(4rem, 8vh, 6rem)",
          }}
        >
          <div>
            <p className="label-gold" style={{ marginBottom: "1rem" }}>Ready to Begin?</p>
            <h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                letterSpacing: "0.01em",
                lineHeight: 0.88,
                color: "var(--color-white)",
              }}
            >
              Your Brand.
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(201,168,76,0.35)",
                }}
              >
                Revealed.
              </span>
            </h2>
          </div>
          <a
            href="#contact"
            data-cursor
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#0A0A0A",
              background: "var(--color-gold)",
              padding: "1.1rem 2.5rem",
              borderRadius: "2px",
              border: "1px solid var(--color-gold)",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.4s var(--ease-cinematic)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.color = "var(--color-gold)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--color-gold)";
              el.style.color = "#0A0A0A";
            }}
          >
            Start a Project
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </motion.div>

        {/* ─── Middle: Link columns + Brand column with grid layout ─── */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-[2.2fr_1fr_1fr_1fr]"
          style={{
            marginBottom: "clamp(4rem, 8vh, 6.5rem)",
          }}
        >
          {/* Brand Column */}
          <div
            onMouseEnter={() => setBrandHovered(true)}
            onMouseLeave={() => setBrandHovered(false)}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div
                style={{
                  transform: brandHovered ? "rotate(15deg) scale(1.08)" : "rotate(0deg) scale(1)",
                  transformOrigin: "center",
                  transition: "all 0.5s var(--ease-cinematic)",
                }}
              >
                <FooterLogoMark />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "1.375rem",
                  letterSpacing: "0.08em",
                  color: brandHovered ? "var(--color-gold)" : "var(--color-white)",
                  transition: "color 0.4s var(--ease-cinematic)",
                }}
              >
                VATTOSTUDIO
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "var(--color-dim)",
                maxWidth: "28ch",
                marginBottom: "1.75rem",
              }}
            >
              A creative production studio from Lagos. We reveal the truth in brands.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <SocialIcon icon={Instagram} href="https://instagram.com/vattostudio" label="Instagram" />
              <SocialIcon icon={Twitter} href="https://twitter.com/vattostudio" label="X / Twitter" />
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-dim)",
                }}
              >
                {category}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0, margin: 0 }}>
                {links.map((link) => (
                  <li key={link}>
                    <FooterLink href="#">{link}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* ─── Bottom Bar with perfect horizontal responsive alignment ─── */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col gap-4 py-8 border-t border-[var(--color-border)] md:flex-row md:items-center md:justify-between"
        >
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
              margin: 0,
            }}
          >
            © {currentYear} Vattostudio · All rights reserved · Lagos, Nigeria
          </p>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-dim)",
              margin: 0,
            }}
          >
            We Reveal, Not Invent
            <span style={{ color: "var(--color-gold)", marginLeft: "0.5rem" }}>·</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
