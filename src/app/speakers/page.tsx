import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import SpeakerHero from '@/components/speakers/SpeakerHero';
import DynamicSeoHead from '@/components/DynamicSeoHead';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { fetchCmsSeoForPage, resolveOgImageUrl } from '@/lib/fetchCmsSeo';

const SITE_URL = 'https://arogya.namogange.org';

export async function generateMetadata(): Promise<Metadata> {
  const cms = await fetchCmsSeoForPage('/speakers');
  const ogImg = cms?.ogImage ? resolveOgImageUrl(cms.ogImage) : `${SITE_URL}/ogimage.webp`;
  return {
    title: cms?.metaTitle || 'Speakers',
    description: cms?.metaDescription ||
      'Meet world-renowned speakers at Arogya Sangoshthi 2026. 21–23 August 2026, Pragati Maidan, New Delhi.',
    alternates: { canonical: `${SITE_URL}/speakers` },
    openGraph: { url: `${SITE_URL}/speakers`, images: [{ url: ogImg, width: 1200, height: 630 }] },
    twitter: { images: [ogImg] },
  };
}

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Meet world-renowned speakers and experts at Arogya Sangoshthi 2026 — India's premier AYUSH & Integrated Healthcare Conference, 21–23 August 2026, Pragati Maidan, New Delhi.",
  alternates: { canonical: `${SITE_URL}/speakers` },
  openGraph: {
    title: "Speakers | Arogya Sangoshthi 2026",
    description:
      "100+ global healthcare leaders, researchers, and policy makers speaking at Arogya Sangoshthi 2026.",
    url: `${SITE_URL}/speakers`,
  },
};

// Lazy loading the below-the-fold components for performance
const ExpertSpeakers = dynamic(() => import('@/components/speakers/ExpertSpeakers'));
const SpeakerCommittees = dynamic(() => import('@/components/speakers/SpeakerCommittees'));
const PreviousSpeakersRow = dynamic(() => import('@/components/speakers/PreviousSpeakersRow'));
const SpeakerCTA = dynamic(() => import('@/components/speakers/SpeakerCTA'));



export default function SpeakersPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/speakers" />
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
