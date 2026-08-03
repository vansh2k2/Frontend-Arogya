import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustedBy from '@/components/home/TrustedBy';
import WhyArogyaAndTracks from '@/components/home/WhyArogyaAndTracks';

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

