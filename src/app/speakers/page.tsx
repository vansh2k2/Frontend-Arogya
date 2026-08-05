import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import SpeakerHero from '@/components/speakers/SpeakerHero';
import JsonLd from '@/components/JsonLd';
import { webPageSchema, breadcrumbSchema, SITE_URL, mainEventSchema } from '@/lib/schemas';
import DynamicSeoHead from '@/components/DynamicSeoHead';

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

const speakersPageSchema = webPageSchema({
  name: "Speakers | Arogya Sangoshthi 2026",
  description:
    "100+ global healthcare leaders, researchers, and policy makers speaking at Arogya Sangoshthi 2026.",
  url: `${SITE_URL}/speakers`,
});

// Event schema specifically for the speakers page (includes performer type)
const speakersEventSchema = {
  ...mainEventSchema,
  "@context": "https://schema.org",
  performer: {
    "@type": "Person",
    description: "World-renowned healthcare experts, AYUSH practitioners, researchers, and policy makers",
  },
};

const speakersBreadcrumb = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Speakers", url: `${SITE_URL}/speakers` },
]);

export default function SpeakersPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/speakers" />
      <JsonLd data={[speakersPageSchema, speakersEventSchema, speakersBreadcrumb]} />
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
