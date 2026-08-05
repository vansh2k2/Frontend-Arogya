import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustedBy from '@/components/home/TrustedBy';
import WhyArogyaAndTracks from '@/components/home/WhyArogyaAndTracks';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema, SITE_URL } from '@/lib/schemas';
import DynamicSeoHead from '@/components/DynamicSeoHead';

// Below the fold sections dynamically imported
const AboutConferenceSection = dynamic(() => import('@/components/home/AboutConferenceSection'));
const StatsBand = dynamic(() => import('@/components/home/StatsBand'));
const VisionMissionSection = dynamic(() => import('@/components/home/VisionMissionSection'));
const UpcomingEventSection = dynamic(() => import('@/components/home/UpcomingEventSection'));
const EventHighlightsSection = dynamic(() => import('@/components/home/EventHighlightsSection'));
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'));
const GlobalVoicesSection = dynamic(() => import('@/components/home/GlobalVoicesSection'));
const FeaturedSpeakersSection = dynamic(() => import('@/components/home/FeaturedSpeakersSection'));

const homePageSchema = webPageSchema({
  type: "WebPage",
  name: "Arogya Sangoshthi 2026 — Home",
  description:
    "India's premier international conference on Integrated Healthcare, AYUSH, Pharma, Wellness & Innovation. 21–23 August 2026, Pragati Maidan, New Delhi.",
  url: SITE_URL,
});

const homeBreadcrumb = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
]);

export default function Home() {
  return (
    <Layout>
      {/* Backend CMS SEO — overrides static metadata if admin has set it */}
      <DynamicSeoHead pagePath="/" />
      <JsonLd data={[homePageSchema, homeBreadcrumb]} />
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
