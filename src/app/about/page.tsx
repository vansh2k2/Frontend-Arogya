import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import AboutHero from '@/components/about/AboutHero';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { buildPageMetadata } from '@/lib/fetchCmsSeo';
import { fetchAboutHero } from '@/lib/fetchAboutHero';
import { fetchAboutFounder } from '@/lib/fetchAboutFounder';
import { fetchAboutNamoGange } from '@/lib/fetchAboutNamoGange';
import { fetchAboutInitiatives, fetchAboutImpact } from '@/lib/fetchAboutInitiatives';
import { fetchAboutFaq } from '@/lib/fetchAboutFaq';


// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/about', {
    title: 'About Us', description: "Learn about the Arogya Sangoshthi Foundation — organizers of India's premier AYUSH & Integrated Healthcare Conference.",
  });
}




// Lazy loading the below-the-fold components for performance
const AboutFounder = dynamic(() => import('@/components/about/AboutFounder'));
const AboutNamoGange = dynamic(() => import('@/components/about/AboutNamoGange'));
const AboutInitiatives = dynamic(() => import('@/components/about/AboutInitiatives'));
const FAQSection = dynamic(() => import('@/components/about/FAQSection'));
const OurImpact = dynamic(() => import('@/components/about/OurImpact'));



export default async function AboutPage() {
  // Sections managed from arogya-admin (null → built-in content)
  const [aboutHero, aboutFounder, aboutNamoGange, aboutInitiatives, aboutImpact, aboutFaq] = await Promise.all([
    fetchAboutHero(),
    fetchAboutFounder(),
    fetchAboutNamoGange(),
    fetchAboutInitiatives(),
    fetchAboutImpact(),
    fetchAboutFaq(),
  ]);

  return (
    <Layout>
      <ServerSeoSchema pagePath="/about" />
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
        <div className="w-full">
          <AboutHero data={aboutHero} />
        </div>
        <div className="w-full flex flex-col">
          <AboutFounder data={aboutFounder} />
          <AboutNamoGange data={aboutNamoGange} />
          <AboutInitiatives data={aboutInitiatives} />
          <FAQSection data={aboutFaq} />
          <OurImpact data={aboutImpact} />
        </div>
      </main>
    </Layout>
  );
}
