"use client";
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import PartnersHero from '@/components/partners/PartnersHero';
import DynamicSeoHead from '@/components/DynamicSeoHead';

// Lazy loading the below-the-fold components for performance
const PartnersList = lazy(() => import('@/components/partners/PartnersList'));
const PartnersCTA = lazy(() => import('@/components/partners/PartnersCTA'));

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

export default function PartnersPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/partners" />
      <div className="w-full">
        {/* Above Fold */}
        <PartnersHero />
        
        {/* Below Fold */}
        <BelowFold><PartnersList /></BelowFold>
        <BelowFold><PartnersCTA /></BelowFold>
      </div>
    </Layout>
  );
}
