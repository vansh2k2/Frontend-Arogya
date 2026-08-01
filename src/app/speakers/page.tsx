"use client";
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import SpeakerHero from '@/components/speakers/SpeakerHero';

// Lazy loading the below-the-fold components for performance
const ExpertSpeakers = lazy(() => import('@/components/speakers/ExpertSpeakers'));
const SpeakerCommittees = lazy(() => import('@/components/speakers/SpeakerCommittees'));
const PreviousSpeakersRow = lazy(() => import('@/components/speakers/PreviousSpeakersRow'));
const SpeakerCTA = lazy(() => import('@/components/speakers/SpeakerCTA'));

// Simple loading skeleton/spinner for Suspense fallback
const SectionLoader = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-[#F8F9FA]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A7C6E]"></div>
  </div>
);

// Wrapper to prevent layout shifts while loading
const BelowFold = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionLoader />}>
    {children}
  </Suspense>
);

export default function SpeakersPage() {
  return (
    <Layout>
      <div className="flex flex-col w-full overflow-hidden bg-white">
        {/* Above Fold */}
        <SpeakerHero />
        
        {/* Below Fold */}
        <BelowFold><ExpertSpeakers /></BelowFold>
        <BelowFold><SpeakerCommittees /></BelowFold>
        <BelowFold><PreviousSpeakersRow /></BelowFold>
        <BelowFold><SpeakerCTA /></BelowFold>
      </div>
    </Layout>
  );
}
