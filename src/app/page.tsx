"use client";
import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import TrustedBy from '@/components/home/TrustedBy';
import WhyArogyaAndTracks from '@/components/home/WhyArogyaAndTracks';
import AboutConferenceSection from '@/components/home/AboutConferenceSection';

// Lazy load below-the-fold components to split CSS and JS chunks, drastically improving LCP and TBT
const StatsBand = lazy(() => import('@/components/home/StatsBand'));
const VisionMissionSection = lazy(() => import('@/components/home/VisionMissionSection'));
const UpcomingEventSection = lazy(() => import('@/components/home/UpcomingEventSection'));
const EventHighlightsSection = lazy(() => import('@/components/home/EventHighlightsSection'));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection'));
const GlobalVoicesSection = lazy(() => import('@/components/home/GlobalVoicesSection'));
const FeaturedSpeakersSection = lazy(() => import('@/components/home/FeaturedSpeakersSection'));

// Reusable wrapper: acts as Suspense fallback container
const BelowFold = ({ children }) => (
  <Suspense fallback={null}>
    {children}
  </Suspense>
);

export default function Home() {
  return (
    <Layout>
      {/* ── ABOVE THE FOLD — always rendered eagerly ── */}
      <HeroCarousel />
      <TrustedBy />
      <WhyArogyaAndTracks />
      <AboutConferenceSection />

      {/* ── BELOW THE FOLD — content-visibility:auto for faster LCP + Lazy Loading for chunk splitting ── */}
      <BelowFold><StatsBand /></BelowFold>
      <BelowFold><VisionMissionSection /></BelowFold>
      <BelowFold><UpcomingEventSection /></BelowFold>
      <BelowFold><EventHighlightsSection /></BelowFold>
      <BelowFold><TestimonialsSection /></BelowFold>
      <BelowFold><GlobalVoicesSection /></BelowFold>
      <BelowFold><FeaturedSpeakersSection /></BelowFold>

    </Layout>
  );
}
