import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Inter, Roboto, Nunito, Dancing_Script } from "next/font/google";
import { Providers } from "@/components/Providers";
import { fetchSitePages } from "@/lib/sitePages";
import Script from "next/script";
import { fetchAdvancedSeo } from "@/lib/advancedSeo";
import { HeadScripts, FooterScripts } from "@/components/seo/CustomScripts";


const SITE_URL = "https://arogya.namogange.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Arogya Sangoshthi 2026 | International AYUSH & Integrated Healthcare Conference",
    template: "%s | Arogya Sangoshthi 2026",
  },
  description:
    "Arogya Sangoshthi 2026 — India's premier 3-day international conference on Integrated Healthcare, AYUSH, Pharma, Wellness & Innovation. 19–21 February 2027, Pragati Maidan, New Delhi.",
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
      "India's premier healthcare conference — 19–21 February 2027, Pragati Maidan, New Delhi. Join 1000+ delegates and 150+ speakers from 25+ countries.",
    images: [
      {
        url: `${SITE_URL}/ogimage.jpg`,
        width: 1200,
        height: 630,
        alt: "Arogya Sangoshthi 2026 — International Healthcare Conference",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arogya Sangoshthi 2026 | AYUSH & Healthcare Conference",
    description:
      "India's premier healthcare conference — 19–21 February 2027, Pragati Maidan, New Delhi.",
    images: [`${SITE_URL}/ogimage.jpg`],
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
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Pages set to Draft in arogya-admin → Pages & CMS (cached 30 s)
  // arogya-admin → Advanced SEO (cached 60 s)
  const [sitePages, seo] = await Promise.all([fetchSitePages(), fetchAdvancedSeo()]);
  const ga4Id = /^G-[A-Z0-9]+$/i.test(seo?.ga4MeasurementId ?? "") ? seo!.ga4MeasurementId : undefined;
  const gtmId = /^GTM-[A-Z0-9]+$/i.test(seo?.gtmContainerId ?? "") ? seo!.gtmContainerId : undefined;
  const gscCode = /^[w-]+$/.test(seo?.googleSearchConsoleVerification ?? "") ? seo!.googleSearchConsoleVerification : undefined;
  // Global switches: an extra robots tag; search engines follow the strictest one on the page
  const blockedRobots = [seo?.allowIndex === false && "noindex", seo?.allowFollow === false && "nofollow"].filter(Boolean).join(", ");
  return (
    <html lang="en" className={`antialiased ${poppins.variable} ${inter.variable} ${roboto.variable} ${nunito.variable} ${dancingScript.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {gscCode && <meta name="google-site-verification" content={gscCode} />}
        {blockedRobots && <meta name="robots" content={blockedRobots} />}
        <HeadScripts html={seo?.headerScripts} />
      </head>
      <body
        className="flex flex-col font-inter bg-background text-foreground antialiased min-h-screen"
        suppressHydrationWarning
      >
        {/* ── Schema is injected per-page by ServerSeoSchema (arogya-admin → Pages & CMS → SEO Information) ── */}

        <Providers sitePages={sitePages}>{children}</Providers>

        <FooterScripts html={seo?.footerScripts} />
        {ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="lazyOnload" />
            <Script id="google-analytics" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}');`}
            </Script>
          </>
        )}
        {gtmId && (
          <Script id="google-tag-manager" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
