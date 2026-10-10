import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustedBy from '@/components/home/TrustedBy';
import WhyArogyaAndTracks from '@/components/home/WhyArogyaAndTracks';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { buildPageMetadata } from '@/lib/fetchCmsSeo';
import { fetchHeroCarousel } from '@/lib/fetchHeroCarousel';
import { fetchSupportedBy } from '@/lib/fetchSupportedBy';
import { fetchWhyArogya } from '@/lib/fetchWhyArogya';
import { fetchAboutConference } from '@/lib/fetchAboutConference';
import { fetchStatsBand } from '@/lib/fetchStatsBand';
import { fetchVisionMission } from '@/lib/fetchVisionMission';
import { fetchUpcomingEvent } from '@/lib/fetchUpcomingEvent';
import { fetchEventHighlights } from '@/lib/fetchEventHighlights';


// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/', {
    description: "Arogya Sangoshthi 2026 — India's premier 3-day international conference. 21–23 Aug 2026, Pragati Maidan, New Delhi.",
  });
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



export default async function Home() {
  // Hero, Supported By and Why Arogya / Tracks managed from arogya-admin (null → built-in content)
  const [heroCarousel, supportedBy, whyArogya, aboutConference, statsBand, visionMission, upcomingEvent, eventHighlights] = await Promise.all([
    fetchHeroCarousel(),
    fetchSupportedBy(),
    fetchWhyArogya(),
    fetchAboutConference(),
    fetchStatsBand(),
    fetchVisionMission(),
    fetchUpcomingEvent(),
    fetchEventHighlights(),
  ]);

  return (
    <Layout>
      <ServerSeoSchema pagePath="/" />
      <HeroCarousel data={heroCarousel} />
      <TrustedBy data={supportedBy} />
      <WhyArogyaAndTracks data={whyArogya} />
      <AboutConferenceSection data={aboutConference} />
      <StatsBand data={statsBand} />
      <VisionMissionSection data={visionMission} />
      <UpcomingEventSection data={upcomingEvent} />
      <EventHighlightsSection data={eventHighlights} />
      <TestimonialsSection />
      <GlobalVoicesSection />
      <FeaturedSpeakersSection />
    </Layout>
  );
}
