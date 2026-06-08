import type { Metadata } from "next";
import { IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CinematicIntroWrapper } from "@/components/ui/CinematicIntroWrapper";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ThemeHydrator } from "@/components/providers/ThemeHydrator";

/* IBM Plex Mono */
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight:  ["300", "400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

/* Bebas Neue */
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight:  ["400"],
  variable: "--font-bebas",
  display: "swap",
});

/* ═══════════════════════════════════════════
   SEO METADATA — Fully Optimised
   ═══════════════════════════════════════════ */
export const metadata: Metadata = {
  /* ─── Core ─── */
  title: {
    default: "Vattostudio — Visual Storytelling Studio | Lagos, Nigeria",
    template: "%s | Vattostudio",
  },
  description:
    "Vattostudio is a Nigerian creative production studio crafting cinematic brand identities, campaigns, and visual stories that reveal the truth of a brand. Based in Lagos — built for the world.",

  /* ─── Keywords ─── */
  keywords: [
    "Vattostudio",
    "creative studio Nigeria",
    "creative production studio Lagos",
    "brand identity Lagos",
    "visual storytelling Nigeria",
    "cinematic branding",
    "campaign production",
    "brand film Lagos",
    "motion design Nigeria",
    "digital experience studio",
    "Nigerian creative agency",
    "logo design Lagos",
    "web design Nigeria",
    "brand strategy Nigeria",
  ],

  /* ─── Canonical & Language ─── */
  alternates: {
    canonical: "https://vattostudio.com",
  },

  /* ─── Favicon / App Icons ─── */
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },

  /* ─── Open Graph (Facebook, LinkedIn, WhatsApp previews) ─── */
  openGraph: {
    title: "Vattostudio — Visual Storytelling Studio",
    description:
      "We don't invent brands. We reveal them. Premium creative production from Lagos, Nigeria — built for global ambition.",
    url: "https://vattostudio.com",
    siteName: "Vattostudio",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/logo-gold.png",
        width: 1200,
        height: 630,
        alt: "Vattostudio — Visual Storytelling Studio",
      },
    ],
  },

  /* ─── Twitter / X Card ─── */
  twitter: {
    card: "summary_large_image",
    title: "Vattostudio — Visual Storytelling Studio",
    description:
      "Premium Nigerian creative production studio. We reveal brands, not invent them. Brand identity · Campaign Production · Motion · Digital.",
    images: ["/logo-gold.png"],
    creator: "@vattostudio",
    site: "@vattostudio",
  },

  /* ─── Robots ─── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ─── Author / Creator ─── */
  authors: [{ name: "Vattostudio", url: "https://vattostudio.com" }],
  creator: "Vattostudio",
  publisher: "Vattostudio",

  /* ─── App manifest colour ─── */
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-Flash Theme Hydrator Script */}
        <script
          id="theme-hydration"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var active = saved || pref || 'dark';
                  document.documentElement.setAttribute('data-theme', active);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })()
            `,
          }}
        />

        {/* Satoshi — from Fontshare CDN */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />

        {/* Structured Data — JSON-LD for Google rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeAgency",
              name: "Vattostudio",
              url: "https://vattostudio.com",
              logo: "https://vattostudio.com/logo-gold.png",
              description:
                "Nigerian creative production studio crafting cinematic brand identities, campaigns, and visual stories.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.instagram.com/vattostudio",
                "https://twitter.com/vattostudio",
              ],
              foundingDate: "2021",
              areaServed: ["Nigeria", "Africa", "Worldwide"],
              serviceType: [
                "Brand Identity Design",
                "Campaign Production",
                "Motion & Film",
                "Digital Experience",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeHydrator />
        {/* Cinematic grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Scroll progress bar */}
        <ScrollProgress />

        {/* Custom cursor — desktop only */}
        <CustomCursor />

        {/* Cinematic intro — once per session */}
        <CinematicIntroWrapper />

        {/* Floating WhatsApp CTA */}
        <WhatsAppCTA />

        {/* Smooth scroll wrapper */}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
