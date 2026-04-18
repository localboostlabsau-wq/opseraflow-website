import type { Metadata } from "next";
import { Outfit, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opseraflow.com.au"),
  title: {
    default: "OpseraFlow | AI Automation for Australian Dental Clinics",
    template: "%s | OpseraFlow",
  },
  description:
    "OpseraFlow delivers Australia's most advanced AI automation platform for dental clinics. Streamline operations, boost patient satisfaction, and grow your practice with fully compliant, intelligent automation.",
  keywords: [
    "AI automation dental clinic Australia",
    "dental practice management AI",
    "AI automation Australia",
    "dental software integration",
    "practice management automation",
    "AI for dentists Australia",
    "dental clinic AI",
    "intelligent automation healthcare Australia",
    "Dental4Windows automation",
    "Exact Dental software",
    "automated patient recall",
    "dental AI appointment booking",
    "AI for healthcare Australia",
    "practice growth automation",
    "dental operations AI",
  ],
  authors: [{ name: "OpseraFlow", url: "https://opseraflow.com.au" }],
  creator: "OpseraFlow",
  publisher: "OpseraFlow",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://opseraflow.com.au",
    siteName: "OpseraFlow",
    title: "OpseraFlow | AI Automation for Australian Dental Clinics",
    description:
      "Australia's most advanced AI automation platform purpose-built for dental clinics. Fully compliant, deeply integrated, exceptionally powerful.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OpseraFlow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpseraFlow | AI Automation for Australian Dental Clinics",
    description: "Australia's most advanced AI automation platform for dental clinics.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://opseraflow.com.au" },
  category: "technology",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${outfit.variable} ${sora.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OpseraFlow",
              url: "https://opseraflow.com.au",
              contactPoint: { "@type": "ContactPoint", email: "info@opseraflow.com.au", contactType: "customer service", areaServed: "AU" },
              description: "Australia's most advanced AI automation platform for dental clinics.",
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col text-[#f0f4ff]"
        style={{ background: "#000000", fontFamily: "var(--font-outfit), system-ui, sans-serif" }}
      >
        {/* Cosmic star field — fixed behind everything */}
        <div className="star-field" aria-hidden />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
