import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import HeroPaperPresentation from '@/components/paper-presentation/HeroPaperPresentation';
import { fetchPaperHero, fetchPaperImportantDates, fetchPaperTopics, fetchPaperGuidelines, fetchPaperAwards, fetchPaperWhyChoose, fetchPaperNeedHelp } from '@/lib/fetchPaperPresentation';

// SEO (meta tags, canonical, JSON-LD) for this page is set in ./layout.tsx

// Below the fold sections dynamically imported (same pattern as home/about)
const ImportantDatesPaper = dynamic(() => import('@/components/paper-presentation/ImportantDatesPaper'));
const TopicsOfInterest = dynamic(() => import('@/components/paper-presentation/TopicsOfInterest'));
const GuidelinesAndSubmission = dynamic(() => import('@/components/paper-presentation/GuidelinesAndSubmission'));
const AwardsRecognition = dynamic(() => import('@/components/paper-presentation/AwardsRecognition'));
const WhyChoosePaper = dynamic(() => import('@/components/paper-presentation/WhyChoosePaper'));
const NeedHelpPaper = dynamic(() => import('@/components/paper-presentation/NeedHelpPaper'));

export default async function PaperPresentationPage() {
  // Sections managed from arogya-admin (null → built-in content)
  const [paperHero, paperDates, paperTopics, paperGuidelines, paperAwards, paperWhyChoose, paperNeedHelp] = await Promise.all([
    fetchPaperHero(),
    fetchPaperImportantDates(),
    fetchPaperTopics(),
    fetchPaperGuidelines(),
    fetchPaperAwards(),
    fetchPaperWhyChoose(),
    fetchPaperNeedHelp(),
  ]);

  return (
    <Layout>
      {/* ── ABOVE THE FOLD — Hero (its title is the page's only H1) ── */}
      <HeroPaperPresentation data={paperHero} />

      {/* ── BELOW THE FOLD ── */}
      <ImportantDatesPaper data={paperDates} />
      <TopicsOfInterest data={paperTopics} />
      <GuidelinesAndSubmission data={paperGuidelines} />
      <AwardsRecognition data={paperAwards} />
      <WhyChoosePaper data={paperWhyChoose} />
      <NeedHelpPaper data={paperNeedHelp} />
    </Layout>
  );
}
