import React, { Suspense } from "react";
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import RegisterNowContent from "@/components/register-now/RegisterNowContent";
import DynamicSeoHead from "@/components/DynamicSeoHead";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import { fetchCmsSeoForPage, resolveOgImageUrl } from "@/lib/fetchCmsSeo";

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/register-now');
  const ogImg = cms?.ogImage ? resolveOgImageUrl(cms.ogImage) : `${SITE_URL}/ogimage.webp`;
  return {
    title: cms?.metaTitle || 'Register Now',
    description: cms?.metaDescription ||
      'Register for Arogya Sangoshthi 2026. Choose your delegate pass. 21–23 August 2026, Pragati Maidan.',
    alternates: { canonical: `${SITE_URL}/register-now` },
    openGraph: { url: `${SITE_URL}/register-now`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}

export const metadata: Metadata = {
  title: "Register Now",
  description:
    "Register for Arogya Sangoshthi 2026 — India's premier healthcare conference. Choose your delegate pass and secure your spot at Pragati Maidan, New Delhi, 21–23 August 2026.",
  alternates: { canonical: `${SITE_URL}/register-now` },
  openGraph: {
    title: "Register Now | Arogya Sangoshthi 2026",
    description:
      "Book your delegate pass for India's most transformative healthcare conference. 21–23 August 2026, Pragati Maidan, New Delhi.",
    url: `${SITE_URL}/register-now`,
  },
};



export default function RegisterNow() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/register-now" />
      <ServerSeoSchema pagePath="/register-now" />
      <div className="bg-[#fcfdfa] min-h-screen">
        <RegisterNowHero />
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Loading registration details...
            </div>
          }
        >
          <RegisterNowContent />
        </Suspense>
      </div>
    </Layout>
  );
}
