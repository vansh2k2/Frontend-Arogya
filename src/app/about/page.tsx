import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import AboutHero from '@/components/about/AboutHero';
import DynamicSeoHead from '@/components/DynamicSeoHead';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { fetchCmsSeoForPage, getOgImageUrl } from '@/lib/fetchCmsSeo';

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/about');
  const ogImg = getOgImageUrl(cms);
  return {
    title: cms?.metaTitle || 'About Us',
    description: cms?.metaDescription ||
      "Learn about the Arogya Sangoshthi Foundation — organizers of India's premier AYUSH & Integrated Healthcare Conference.",
    alternates: { canonical: `${SITE_URL}/about` },
    openGraph: { url: `${SITE_URL}/about`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}




// Lazy loading the below-the-fold components for performance
const AboutFounder = dynamic(() => import('@/components/about/AboutFounder'));
const AboutNamoGange = dynamic(() => import('@/components/about/AboutNamoGange'));
const AboutInitiatives = dynamic(() => import('@/components/about/AboutInitiatives'));
const FAQSection = dynamic(() => import('@/components/about/FAQSection'));
const OurImpact = dynamic(() => import('@/components/about/OurImpact'));



export default function AboutPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/about" />
      <ServerSeoSchema pagePath="/about" />
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
        <div className="w-full">
          <AboutHero />
        </div>
        <div className="w-full flex flex-col">
          <AboutFounder />
          <AboutNamoGange />
          <AboutInitiatives />
          <FAQSection />
          <OurImpact />
        </div>
      </main>
    </Layout>
  );
}
