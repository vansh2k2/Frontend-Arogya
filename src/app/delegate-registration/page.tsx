// Server Component — NO "use client"
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import DynamicSeoHead from "@/components/DynamicSeoHead";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import DelegateRegistrationClient from "@/components/delegate/DelegateRegistrationClient";
import { fetchCmsSeoForPage, resolveOgImageUrl } from "@/lib/fetchCmsSeo";

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/delegate-registration');
  const ogImg = cms?.ogImage ? resolveOgImageUrl(cms.ogImage) : `${SITE_URL}/ogimage.webp`;
  return {
    title: cms?.metaTitle || 'Delegate Registration',
    description: cms?.metaDescription ||
      'Register as a delegate for Arogya Sangoshthi 2026. 21–23 August 2026, Pragati Maidan, New Delhi.',
    alternates: { canonical: `${SITE_URL}/delegate-registration` },
    openGraph: { url: `${SITE_URL}/delegate-registration`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}



export default function DelegateRegistrationPage() {
  return (
    <Layout>
      {/* Server-side schema injection — visible to all validators & bots */}
      <ServerSeoSchema pagePath="/delegate-registration" />
      {/* Client-side meta override (title, OG, etc.) */}
      <DynamicSeoHead pagePath="/delegate-registration" />
      {/* All interactive delegate registration content */}
      <DelegateRegistrationClient />
    </Layout>
  );
}
