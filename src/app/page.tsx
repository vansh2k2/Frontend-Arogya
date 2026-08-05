import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustedBy from '@/components/home/TrustedBy';
import WhyArogyaAndTracks from '@/components/home/WhyArogyaAndTracks';
import DynamicSeoHead from '@/components/DynamicSeoHead';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { fetchCmsSeoForPage, getOgImageUrl } from '@/lib/fetchCmsSeo';

const SITE_URL = 'https://arogya.namogange.org';

// generateMetadata runs on the SERVER — og:image goes into <head> HTML
// WhatsApp / Facebook / Twitter bots will see it without JavaScript
export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/');
  const ogImg = getOgImageUrl(cms);
  return {
    title: cms?.metaTitle ||
      'Arogya Sangoshthi 2026 | International AYUSH & Integrated Healthcare Conference',
    description: cms?.metaDescription ||
      "Arogya Sangoshthi 2026 — India's premier 3-day international conference. 21–23 Aug 2026, Pragati Maidan, New Delhi.",
    openGraph: {
      images: [{ url: ogImg, width: 1200, height: 630 }],
    },
    twitter: { images: [ogImg] },
  };
}

// Below the fold sections dynamically imported
const AboutConferenceSection = dynamic(() => import('@/components/home/AboutConferenceSection'));
const StatsBand = dynamic(() => import('@/components/home/StatsBand'));
const VisionMissionSection = dynamic(() => import('@/components/home/VisionMissionSection'));
const UpcomingEventSection = dynamic(() => import('@/components/home/UpcomingEventSection'));
const EventHighlightsSection = dynamic(() => import('@/components/home/EventHighlightsSection'));
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'));
const GlobalVoicesSection = dynamic(() => import('@/components/home/GlobalVoicesSection'));
const FeaturedSpeakersSection = dynamic(() => import('@/components/home/FeaturedSpeakersSection'));



export default function Home() {
  return (
    <Layout>
      {/* Backend CMS SEO — overrides static metadata if admin has set it */}
      <DynamicSeoHead pagePath="/" />
      <ServerSeoSchema pagePath="/" />
      <HeroCarousel />
      <TrustedBy />
      <WhyArogyaAndTracks />
      <AboutConferenceSection />
      <StatsBand />
      <VisionMissionSection />
      <UpcomingEventSection />
      <EventHighlightsSection />
      <TestimonialsSection />
      <GlobalVoicesSection />
      <FeaturedSpeakersSection />
    </Layout>
  );
}
