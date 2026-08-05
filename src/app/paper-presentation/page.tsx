"use client";
import { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import HeroPaperPresentation from '@/components/paper-presentation/HeroPaperPresentation';
import DynamicSeoHead from '@/components/DynamicSeoHead';

// Lazy load below-the-fold sections for performance (same pattern as home/about)
const ImportantDatesPaper = lazy(() => import('@/components/paper-presentation/ImportantDatesPaper'));
const TopicsOfInterest = lazy(() => import('@/components/paper-presentation/TopicsOfInterest'));
const GuidelinesAndSubmission = lazy(() => import('@/components/paper-presentation/GuidelinesAndSubmission'));
const AwardsRecognition = lazy(() => import('@/components/paper-presentation/AwardsRecognition'));
const WhyChoosePaper = lazy(() => import('@/components/paper-presentation/WhyChoosePaper'));
const NeedHelpPaper = lazy(() => import('@/components/paper-presentation/NeedHelpPaper'));

const SectionLoader = () => (
  <div className="w-full h-[300px] flex items-center justify-center bg-[#fbfcf7]">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#032e1c]"></div>
  </div>
);

const BelowFold = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionLoader />}>
    {children}
  </Suspense>
);

export default function PaperPresentationPage() {
  return (
    <Layout>
      {/* ── ABOVE THE FOLD — Hero loaded eagerly ── */}
      <DynamicSeoHead pagePath="/paper-presentation" />
      <HeroPaperPresentation />

      {/* ── BELOW THE FOLD — Lazy loaded ── */}
      <BelowFold><ImportantDatesPaper /></BelowFold>
      <BelowFold><TopicsOfInterest /></BelowFold>
      <BelowFold><GuidelinesAndSubmission /></BelowFold>
      <BelowFold><AwardsRecognition /></BelowFold>
      <BelowFold><WhyChoosePaper /></BelowFold>
      <BelowFold><NeedHelpPaper /></BelowFold>
    </Layout>
  );
}
