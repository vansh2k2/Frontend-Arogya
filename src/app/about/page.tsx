"use client";
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import AboutHero from '@/components/about/AboutHero';

// Lazy loading the below-the-fold components for performance
const AboutFounder = lazy(() => import('@/components/about/AboutFounder'));
const AboutNamoGange = lazy(() => import('@/components/about/AboutNamoGange'));
const AboutInitiatives = lazy(() => import('@/components/about/AboutInitiatives'));
const FAQSection = lazy(() => import('@/components/about/FAQSection'));
const OurImpact = lazy(() => import('@/components/about/OurImpact'));

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

export default function AboutPage() {
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden">
        {/* Hero Section (Above Fold) - Loaded immediately */}
        <div className="w-full">
          <AboutHero />
        </div>

        {/* Below Fold Components - Lazy loaded */}
        <div className="w-full flex flex-col">
          <BelowFold><AboutFounder /></BelowFold>
          <BelowFold><AboutNamoGange /></BelowFold>
          <BelowFold><AboutInitiatives /></BelowFold>
          <BelowFold><FAQSection /></BelowFold>
          <BelowFold><OurImpact /></BelowFold>
        </div>
      </main>
    </Layout>
  );
}
