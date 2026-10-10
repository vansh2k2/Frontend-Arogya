import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import SpeakerHero from '@/components/speakers/SpeakerHero';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { buildPageMetadata } from '@/lib/fetchCmsSeo';


// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/speakers', {
    title: 'Speakers',
    description: 'Meet world-renowned speakers at Arogya Sangoshthi 2026. 21–23 August 2026, Pragati Maidan, New Delhi.',
  });
}




// Lazy loading the below-the-fold components for performance
const ExpertSpeakers = dynamic(() => import('@/components/speakers/ExpertSpeakers'));
const SpeakerCommittees = dynamic(() => import('@/components/speakers/SpeakerCommittees'));
const PreviousSpeakersRow = dynamic(() => import('@/components/speakers/PreviousSpeakersRow'));
const SpeakerCTA = dynamic(() => import('@/components/speakers/SpeakerCTA'));



export default function SpeakersPage() {
  return (
    <Layout>
      <ServerSeoSchema pagePath="/speakers" />
      <div className="flex flex-col w-full overflow-hidden bg-white">
        <SpeakerHero />
        <ExpertSpeakers />
        <SpeakerCommittees />
        <PreviousSpeakersRow />
        <SpeakerCTA />
      </div>
    </Layout>
  );
}
