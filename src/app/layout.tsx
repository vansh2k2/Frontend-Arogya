import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Inter, Roboto } from "next/font/google";
import { Providers } from "@/components/Providers";


const SITE_URL = "https://arogya.namogange.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arogya Sangoshthi 2026 | International AYUSH & Integrated Healthcare Conference",
    template: "%s | Arogya Sangoshthi 2026",
  },
  description:
    "Arogya Sangoshthi 2026 — India's premier 3-day international conference on Integrated Healthcare, AYUSH, Pharma, Wellness & Innovation. 21–23 August 2026, Pragati Maidan, New Delhi.",
  keywords: [
    "AYUSH conference 2026",
    "integrated healthcare conference",
    "homeopathy seminar India",
    "pharma innovation conference",
    "Pragati Maidan event 2026",
    "Arogya Sangoshthi",
    "NamoGange healthcare",
    "wellness conference India",
    "traditional medicine conference",
  ],
  authors: [{ name: "Arogya Sangoshthi Foundation", url: SITE_URL }],
  creator: "Arogya Sangoshthi Foundation",
  publisher: "Arogya Sangoshthi Foundation",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Arogya Sangoshthi 2026",
    title: "Arogya Sangoshthi 2026 | International AYUSH & Integrated Healthcare Conference",
    description:
      "India's premier healthcare conference — 21–23 August 2026, Pragati Maidan, New Delhi. Join 5000+ delegates, 100+ speakers from 50+ countries.",
    images: [
      {
        url: `${SITE_URL}/ogimage.webp`,
        width: 1200,
        height: 630,
        alt: "Arogya Sangoshthi 2026 — International Healthcare Conference",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arogya Sangoshthi 2026 | AYUSH & Healthcare Conference",
    description:
      "India's premier healthcare conference — 21–23 August 2026, Pragati Maidan, New Delhi.",
    images: [`${SITE_URL}/ogimage.webp`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`antialiased ${poppins.variable} ${inter.variable} ${roboto.variable}`}>
      <body
        className="flex flex-col font-inter bg-background text-foreground antialiased min-h-screen"
        suppressHydrationWarning
      >
        {/* ── Schema is injected per-page via CMS DynamicSeoHead ── */}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
