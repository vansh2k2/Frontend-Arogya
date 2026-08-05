// Server Component — NO "use client"
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import DynamicSeoHead from "@/components/DynamicSeoHead";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import GalleryClient from "@/components/gallery/GalleryClient";
import { fetchCmsSeoForPage, resolveOgImageUrl } from "@/lib/fetchCmsSeo";

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/gallery');
  const ogImg = cms?.ogImage ? resolveOgImageUrl(cms.ogImage) : `${SITE_URL}/ogimage.webp`;
  return {
    title: cms?.metaTitle || 'Gallery',
    description: cms?.metaDescription ||
      "Explore photos and videos from previous editions of Arogya Sangoshthi.",
    alternates: { canonical: `${SITE_URL}/gallery` },
    openGraph: { url: `${SITE_URL}/gallery`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}



export default function GalleryPage() {
  return (
    <Layout>
      {/* Server-side schema injection — visible to all validators & bots */}
      <ServerSeoSchema pagePath="/gallery" />
      {/* Client-side meta override (title, OG, etc.) */}
      <DynamicSeoHead pagePath="/gallery" />
      {/* All interactive gallery content (filters, state) */}
      <GalleryClient />
    </Layout>
  );
}
