import React, { Suspense } from "react";
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import RegisterNowContent from "@/components/register-now/RegisterNowContent";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import { buildPageMetadata } from "@/lib/fetchCmsSeo";


// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/register-now', {
    title: 'Register Now',
    description: 'Register for Arogya Sangoshthi 2026. Choose your delegate pass. 21–23 August 2026, Pragati Maidan.',
  });
}






export default function RegisterNow() {
  return (
    <Layout>
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
