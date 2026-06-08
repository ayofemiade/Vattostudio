"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

// Plans data containing both local (NGN) and global (USD) parameters
const PLANS = [
  {
    id: "discovery",
    label: "Discovery Package",
    price: { NGN: 100000, USD: 100 },
    period: "",
    tagline: "Story discovery & strategy. We find and shape your origin story. No production.",
    features: [
      "In-depth brand positioning & origin story discovery",
      "Strategic narrative development & creative brief",
      "Comprehensive production treatment blueprint",
      "Upgrade to Full Package and your Discovery fee is credited toward the ₦300,000.",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    id: "full",
    label: "Full Package",
    price: { NGN: 300000, USD: 300 },
    period: "",
    tagline: "Discovery + production. Hero video + 4 supporting story videos. 3–4 week delivery.",
    features: [
      "Everything in Discovery Package included",
      "Hero story video + 4 supporting social cutdowns",
      "Professional multi-day filming & premium post-production",
      "Our most popular package. Full story, fully produced.",
    ],
    cta: "Start Full Package",
    featured: true,
  },
  {
    id: "custom",
    label: "Custom Package",
    price: { NGN: "Let's Talk", USD: "Let's Talk" },
    period: "",
    tagline: "Tailored scope based on your specific needs. Reach out for a custom quote.",
    features: [
      "Tailored visual scope designed for your brand scale",
      "Flexible filming locations & customized delivery timeline",
      "Dedicated production coordinator & creative lead",
      "Perfect for larger brands or unique project requirements.",
    ],
    cta: "Let's Talk",
    featured: false,
  },
];

// Currency formatting utility
function formatPrice(val: number | string, currency: "NGN" | "USD") {
  if (typeof val === "string") return val;
  if (currency === "NGN") {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  }
}

/* ─── Premium Pricing Card with Hover Dimming Support ─── */
function PricingCard({
  plan,
  index,
  currency,
  hoveredIndex,
  setHoveredIndex,
}: {
  plan: (typeof PLANS)[0];
  index: number;
  currency: "NGN" | "USD";
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();
  const isHovered = hoveredIndex === index;
  const isAnyCardHovered = hoveredIndex !== null;

  // Determine pricing values
  const currentPriceRaw = plan.price[currency];
  const priceDisplay = typeof currentPriceRaw === "number" ? formatPrice(currentPriceRaw, currency) : currentPriceRaw;

  // Styling properties depending on layout themes
  const baseCardStyles = plan.featured
    ? "bg-[var(--color-bg-deep)] text-[var(--color-text-primary)] border-[var(--color-gold)] shadow-xl"
    : "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border-[var(--color-border)] shadow-md";

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // premium ease-out expo
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`relative flex flex-col p-8 sm:p-10 rounded-[6px] border transition-all duration-700 ease-out-expo overflow-hidden ${baseCardStyles}`}
      style={{
        opacity: isAnyCardHovered ? (isHovered ? 1 : 0.45) : 1,
        transform: isHovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        filter: isAnyCardHovered && !isHovered ? "grayscale(30%) blur(0.4px)" : "grayscale(0%) blur(0px)",
        borderColor: plan.featured
          ? "var(--color-gold)"
          : (isHovered ? "var(--color-border-mid)" : "var(--color-border)"),
        boxShadow: plan.featured && isHovered
          ? "0 24px 48px var(--color-gold-dim)"
          : (isHovered ? "0 20px 40px rgba(0,0,0,0.15)" : "none"),
      }}
    >
      {/* Premium Metallic Shimmer Overlay */}
      <motion.div
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
        }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: plan.featured
            ? "linear-gradient(135deg, transparent 30%, var(--color-gold-dim) 50%, transparent 70%)"
            : "linear-gradient(135deg, transparent 30%, var(--color-border) 50%, transparent 70%)",
        }}
      />

      {/* Featured Badge */}
      {plan.featured && (
        <div className="absolute top-0 right-6 bg-[#C9A84C] text-[#0A0A0A] font-mono text-[9px] tracking-[0.2em] uppercase py-1.5 px-4 rounded-b-[4px] font-bold z-20">
          Most Popular
        </div>
      )}

      {/* Card Header details */}
      <span
        className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4 block"
        style={{
          color: plan.featured ? "var(--color-gold)" : "var(--color-text-secondary)",
        }}
      >
        {plan.label}
      </span>

      {/* Price with slide-and-fade triggers on region switch */}
      <div className="mb-4 flex items-baseline relative z-20 overflow-hidden min-h-[4.5rem]">
        <AnimatePresence mode="wait">
          <motion.span
            key={priceDisplay}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-[2.75rem] sm:text-[3.5rem] tracking-[0.01em] leading-none"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            {priceDisplay}
          </motion.span>
        </AnimatePresence>

        {plan.period && (
          <span
            className="font-mono text-[11px] tracking-[0.1em] ml-2"
            style={{
              color: "var(--color-text-tertiary)",
            }}
          >
            {plan.period}
          </span>
        )}
      </div>

      {/* Tagline */}
      <p
        className="font-body text-[13.5px] leading-relaxed mb-8 pb-8 border-b relative z-20"
        style={{
          color: "var(--color-text-secondary)",
          borderColor: "var(--color-border)",
        }}
      >
        {plan.tagline}
      </p>

      {/* Features checklist */}
      <ul className="flex flex-col gap-4 mb-10 flex-1 list-none p-0 m-0 relative z-20">
        {plan.features.map((feature, fIdx) => (
          <li
            key={fIdx}
            className="flex items-start gap-3.5 font-body text-[13.5px] leading-relaxed"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 6 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 mt-1"
            >
              <Check
                size={14}
                strokeWidth={2.5}
                style={{
                  color: "var(--color-gold)",
                }}
              />
            </motion.div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Interactive CTA buttons */}
      <a
        href="#contact"
        data-cursor
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="inline-flex justify-center items-center font-mono text-[10px] tracking-[0.2em] uppercase py-4 px-6 rounded-[2px] border relative z-20 transition-all duration-500"
        style={{
          background: plan.featured
            ? (isHovered ? "transparent" : "var(--color-gold)")
            : (isHovered ? "var(--color-text-primary)" : "transparent"),
          color: plan.featured
            ? (isHovered ? "var(--color-gold)" : "var(--color-bg-deep)")
            : (isHovered ? "var(--color-bg-deep)" : "var(--color-text-secondary)"),
          borderColor: plan.featured
            ? "var(--color-gold)"
            : (isHovered ? "var(--color-text-primary)" : "var(--color-border-mid)"),
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PRICING COMPONENT
   ═══════════════════════════════════════════ */
export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();

  // Local interactive states
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="pricing"
      aria-label="Pricing Section"
      className="relative py-24 sm:py-36 bg-[var(--color-bg-deep)] border-t border-b border-[var(--color-border)] overflow-hidden"
    >
      {/* Background radial soft light gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] transition-opacity duration-500" style={{ background: "radial-gradient(ellipse at top, var(--color-gold) 0%, transparent 70%)" }} />

      <div ref={containerRef} className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-24 flex flex-col items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="block w-6 h-[1px] bg-[#C9A84C]" />
            <span className="label-gold">Pricing Packages</span>
            <span className="block w-6 h-[1px] bg-[#C9A84C]" />
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={prefersReducedMotion ? {} : { clipPath: "inset(100% 0 0 0)", y: 35 }}
              animate={isHeadingInView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
              transition={{ delay: 0.15, duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-[3.25rem] sm:text-[4.5rem] md:text-[5.5rem] tracking-[0.02em] leading-[0.9] text-[var(--color-text-primary)]"
            >
              Transparent Pricing
            </motion.h2>
          </div>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 15 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-body text-[15px] sm:text-[16px] text-[var(--color-text-secondary)] max-w-[48ch] mx-auto leading-relaxed mb-10"
          >
            We believe you should know what you&apos;re working with before we even get on a call. Here&apos;s how we price our work.
          </motion.p>

          {/* Region / Currency sliding toggle */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={isHeadingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative flex items-center p-1 bg-[var(--color-surface-2)] rounded-full border border-[var(--color-border)]"
          >
            <div className="relative flex justify-between gap-1">
              <button
                onClick={() => setCurrency("NGN")}
                className="relative px-6 py-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-bold transition-all z-20"
                style={{
                  color: currency === "NGN" ? "var(--color-bg-deep)" : "var(--color-text-secondary)",
                }}
              >
                NGN [Local]
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className="relative px-6 py-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-bold transition-all z-20"
                style={{
                  color: currency === "USD" ? "var(--color-bg-deep)" : "var(--color-text-secondary)",
                }}
              >
                USD [Global]
              </button>

              {/* Sliding bubble slider element */}
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute top-0 bottom-0 rounded-full bg-[var(--color-text-primary)] shadow-md z-10"
                style={{
                  left: currency === "NGN" ? 0 : "50%",
                  width: "50%",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24 items-stretch">
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={i}
              currency={currency}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* Dynamic bottom conditions block */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-text-tertiary)] text-center mt-14 leading-relaxed"
        >
          All packages include an initial consultation call to understand your brand before we begin.
        </motion.p>
      </div>
    </section>
  );
}
