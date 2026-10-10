// Server Component — NO "use client"
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import GalleryClient from "@/components/gallery/GalleryClient";
import { buildPageMetadata } from "@/lib/fetchCmsSeo";


// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/gallery', {
    title: 'Gallery',
    description: 'Explore photos and videos from previous editions of Arogya Sangoshthi.',
  });
}



export default function GalleryPage() {
  return (
    <Layout>
      {/* Server-side schema injection — visible to all validators & bots */}
      <ServerSeoSchema pagePath="/gallery" />
      {/* Client-side meta override (title, OG, etc.) */}
      {/* All interactive gallery content (filters, state) */}
      <GalleryClient />
    </Layout>
  );
}
