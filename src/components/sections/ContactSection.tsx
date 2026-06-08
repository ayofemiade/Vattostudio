"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Instagram, Twitter } from "lucide-react";

/* ═══════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════ */
export function ContactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(headingRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  const [formState, setFormState] = useState({
    name: "", email: "", project: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* In production — wire to Resend / Formspree / email API */
    setSubmitted(true);
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "var(--color-gold)" : "var(--color-border-mid)"}`,
    padding: "1rem 0",
    fontFamily: "var(--font-satoshi)",
    fontSize: "1rem",
    color: "var(--color-text-primary)",
    outline: "none",
    transition: "border-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    borderRadius: 0,
    appearance: "none" as const,
  });

  const labelStyle = {
    fontFamily: "var(--font-ibm-plex-mono)",
    fontSize: "0.5625rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "var(--color-dim)",
    display: "block",
    marginBottom: "0.25rem",
  };

  return (
    <section
      id="contact"
      aria-label="Contact Vattostudio"
      style={{
        padding: "clamp(5rem, 10vh, 9rem) 0",
        background: "var(--color-bg-surface)",
        borderTop: "1px solid var(--color-border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gold glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vh",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 5vw, 3rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: "clamp(3.5rem, 7vh, 6rem)" }}>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}
          >
            <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)" }} />
            <span className="label-gold">Start a Project</span>
          </motion.div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 20 }}
              animate={isInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
              transition={{ delay: 0.1, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3rem, 9vw, 8rem)",
                letterSpacing: "0.01em",
                lineHeight: 0.9,
                color: "var(--color-text-primary)",
              }}
            >
              Let&apos;s Talk
              <br />
              <span style={{ color: "var(--color-gold)" }}>About Your Story.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "55ch",
              marginTop: "2rem",
            }}
          >
            Ready to tell your brand&apos;s real story? We&apos;d love to hear about it. Drop us a line. Tell us about your brand, what you&apos;re struggling with, or where you want to go. We&apos;ll set up a call and figure out if we&apos;re a fit.
          </motion.p>
        </div>

        {/* Two-column: form + info */}
        <div
          className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px] lg:gap-24"
        >
          {/* ── Contact form ── */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "1rem",
                  padding: "3rem 0",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                  }}
                >
                  Received ✓
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: "var(--color-white)",
                    lineHeight: 1,
                  }}
                >
                  We&apos;ll be in touch soon.
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    fontSize: "1rem",
                    color: "var(--color-dim)",
                    lineHeight: 1.7,
                    maxWidth: "40ch",
                  }}
                >
                  Real responses within 48 hours. No auto-replies. No templates.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
                noValidate
              >
                {/* Row 1: Name + Email */}
                <div
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                >
                  <div style={{ position: "relative" }}>
                    <label htmlFor="contact-name" style={labelStyle}>Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("name"), caretColor: "var(--color-gold)" }}
                    />
                    <motion.div
                      animate={{ scaleX: focused === "name" ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "1px",
                        background: "var(--color-gold)",
                        transformOrigin: "left",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <div style={{ position: "relative" }}>
                    <label htmlFor="contact-email" style={labelStyle}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("email"), caretColor: "var(--color-gold)" }}
                    />
                    <motion.div
                      animate={{ scaleX: focused === "email" ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "1px",
                        background: "var(--color-gold)",
                        transformOrigin: "left",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Project type */}
                <div style={{ position: "relative" }}>
                  <label htmlFor="contact-project" style={labelStyle}>Project Type</label>
                  <select
                    id="contact-project"
                    required
                    value={formState.project}
                    onChange={(e) => setFormState((s) => ({ ...s, project: e.target.value }))}
                    onFocus={() => setFocused("project")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("project"),
                      cursor: "pointer",
                      background: "transparent",
                    }}
                  >
                    <option value="" disabled style={{ background: "var(--color-bg-surface)", color: "var(--color-text-tertiary)" }}>
                      Select what you need
                    </option>
                    {[
                      "Brand Identity",
                      "Campaign Production",
                      "Motion & Film",
                      "Digital Experience",
                      "Full Studio Retainer",
                      "Something else",
                    ].map((opt) => (
                      <option key={opt} value={opt} style={{ background: "var(--color-bg-surface)", color: "var(--color-text-primary)" }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <motion.div
                    animate={{ scaleX: focused === "project" ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: "1px",
                      background: "var(--color-gold)",
                      transformOrigin: "left",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Message */}
                <div style={{ position: "relative" }}>
                  <label htmlFor="contact-message" style={labelStyle}>
                    Tell us about your project
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="What are you building? What's the timeline? Any budget in mind?"
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("message"),
                      resize: "none",
                      lineHeight: 1.7,
                    }}
                  />
                  <motion.div
                    animate={{ scaleX: focused === "message" ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: "1px",
                      background: "var(--color-gold)",
                      transformOrigin: "left",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    data-cursor
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--color-bg-deep)",
                      background: "var(--color-text-primary)",
                      padding: "1.1rem 2.5rem",
                      borderRadius: "2px",
                      border: "1px solid var(--color-text-primary)",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "transparent";
                      el.style.color = "var(--color-text-primary)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "var(--color-text-primary)";
                      el.style.color = "var(--color-bg-deep)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    Send Message
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── Info sidebar ── */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            {/* Direct email */}
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>Email directly</p>
              <a
                href="mailto:hello@vattostudio.com"
                data-cursor
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.0625rem)",
                  color: "var(--color-text-primary)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-gold)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)"; }}
              >
                <Mail size={14} strokeWidth={1.5} style={{ color: "var(--color-gold)" }} />
                hello@vattostudio.com
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="label" style={{ marginBottom: "0.75rem" }}>Based in</p>
              <p
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "clamp(0.9rem, 1.3vw, 1.0625rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                <MapPin size={14} strokeWidth={1.5} style={{ color: "var(--color-gold)" }} />
                Lagos, Nigeria
              </p>
              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.5625rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-dim)",
                  marginTop: "0.5rem",
                }}
              >
                Available for international projects
              </p>
            </div>

            {/* Response time */}
            <div
              style={{
                padding: "1.5rem",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg-deep)",
                borderRadius: "3px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-gold)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-gold)]"></span>
                </span>
                <p className="label-gold" style={{ margin: 0 }}>Response Time</p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-primary)",
                  lineHeight: 1.6,
                }}
              >
                We reply to every message personally.
                <br />
                Expect a response within <strong style={{ color: "var(--color-gold)" }}>48 hours</strong>.
              </p>
            </div>

            {/* Social */}
            <div>
              <p className="label" style={{ marginBottom: "1rem" }}>Follow the work</p>
              <div style={{ display: "flex", gap: "1.25rem" }}>
                {[
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com/vattostudio" },
                  { icon: Twitter,   label: "X / Twitter", href: "https://twitter.com/vattostudio" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    data-cursor
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid var(--color-border-mid)",
                      color: "var(--color-text-secondary)",
                      transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--color-gold)";
                      el.style.color = "var(--color-gold)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = "var(--color-border-mid)";
                      el.style.color = "var(--color-text-secondary)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <Icon size={15} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
