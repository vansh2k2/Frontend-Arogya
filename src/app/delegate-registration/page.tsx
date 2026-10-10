// Server Component — NO "use client"
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import DelegateRegistrationClient from "@/components/delegate/DelegateRegistrationClient";
import { buildPageMetadata } from "@/lib/fetchCmsSeo";


// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/delegate-registration', {
    title: 'Delegate Registration',
    description: 'Register as a delegate for Arogya Sangoshthi 2026. 21–23 August 2026, Pragati Maidan, New Delhi.',
  });
}



export default function DelegateRegistrationPage() {
  return (
    <Layout>
      {/* Server-side schema injection — visible to all validators & bots */}
      <ServerSeoSchema pagePath="/delegate-registration" />
      {/* Client-side meta override (title, OG, etc.) */}
      {/* All interactive delegate registration content */}
      <DelegateRegistrationClient />
    </Layout>
  );
}
