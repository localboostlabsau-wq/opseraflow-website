import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opseraflow.com.au"),
  title: {
    default: "Opsera Flow | AI Automation for Australian Dental Clinics",
    template: "%s | Opsera Flow",
  },
  description:
    "Opsera Flow delivers Australia's most advanced AI automation platform for dental clinics. Streamline operations, boost patient satisfaction, and grow your practice with fully compliant, intelligent automation.",
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
  authors: [{ name: "Opsera Flow", url: "https://opseraflow.com.au" }],
  creator: "Opsera Flow",
  publisher: "Opsera Flow",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://opseraflow.com.au",
    siteName: "Opsera Flow",
    title: "Opsera Flow | AI Automation for Australian Dental Clinics",
    description:
      "Australia's most advanced AI automation platform purpose-built for dental clinics. Fully compliant, deeply integrated, exceptionally powerful.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Opsera Flow – AI Automation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opsera Flow | AI Automation for Australian Dental Clinics",
    description:
      "Australia's most advanced AI automation platform for dental clinics.",
    images: ["/og-image.png"],
  },
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
  alternates: {
    canonical: "https://opseraflow.com.au",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Opsera Flow",
              url: "https://opseraflow.com.au",
              logo: "https://opseraflow.com.au/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@opseraflow.com.au",
                contactType: "customer service",
                areaServed: "AU",
                availableLanguage: "English",
              },
              sameAs: [],
              description:
                "Australia's most advanced AI automation platform for dental clinics.",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f0f4ff]">
        {children}
      </body>
    </html>
  );
}
