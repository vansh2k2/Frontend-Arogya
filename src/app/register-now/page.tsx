import React, { Suspense } from "react";
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import RegisterNowContent from "@/components/register-now/RegisterNowContent";
import DynamicSeoHead from "@/components/DynamicSeoHead";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import { fetchCmsSeoForPage, getOgImageUrl } from "@/lib/fetchCmsSeo";

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/register-now');
  const ogImg = getOgImageUrl(cms);
  return {
    title: cms?.metaTitle || 'Register Now',
    description: cms?.metaDescription ||
      'Register for Arogya Sangoshthi 2026. Choose your delegate pass. 21–23 August 2026, Pragati Maidan.',
    alternates: { canonical: `${SITE_URL}/register-now` },
    openGraph: { url: `${SITE_URL}/register-now`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}






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
