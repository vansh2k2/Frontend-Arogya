import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustedBy from '@/components/home/TrustedBy';
import WhyArogyaAndTracks from '@/components/home/WhyArogyaAndTracks';
import AboutConferenceSection from '@/components/home/AboutConferenceSection';
import StatsBand from '@/components/home/StatsBand';
import VisionMissionSection from '@/components/home/VisionMissionSection';
import UpcomingEventSection from '@/components/home/UpcomingEventSection';
import EventHighlightsSection from '@/components/home/EventHighlightsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GlobalVoicesSection from '@/components/home/GlobalVoicesSection';
import FeaturedSpeakersSection from '@/components/home/FeaturedSpeakersSection';

export default function HomePage() {
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

