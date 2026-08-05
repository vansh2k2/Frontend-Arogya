import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import AboutHero from '@/components/about/AboutHero';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema, SITE_URL } from '@/lib/schemas';
import DynamicSeoHead from '@/components/DynamicSeoHead';

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Arogya Sangoshthi Foundation — organizers of India's premier AYUSH & Integrated Healthcare Conference. Discover our mission, vision, and impact.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Arogya Sangoshthi 2026",
    description:
      "Discover the mission and vision behind India's most transformative healthcare conference.",
    url: `${SITE_URL}/about`,
  },
};

// Lazy loading the below-the-fold components for performance
const AboutFounder = dynamic(() => import('@/components/about/AboutFounder'));
const AboutNamoGange = dynamic(() => import('@/components/about/AboutNamoGange'));
const AboutInitiatives = dynamic(() => import('@/components/about/AboutInitiatives'));
const FAQSection = dynamic(() => import('@/components/about/FAQSection'));
const OurImpact = dynamic(() => import('@/components/about/OurImpact'));

const aboutPageSchema = webPageSchema({
  type: "AboutPage",
  name: "About Arogya Sangoshthi Foundation",
  description:
    "Learn about the Arogya Sangoshthi Foundation — organizers of India's premier AYUSH & Integrated Healthcare Conference.",
  url: `${SITE_URL}/about`,
});

const aboutBreadcrumb = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "About", url: `${SITE_URL}/about` },
]);

export default function AboutPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/about" />
      <JsonLd data={[aboutPageSchema, aboutBreadcrumb]} />
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
