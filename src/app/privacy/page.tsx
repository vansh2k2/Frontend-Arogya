import type { Metadata } from 'next';
import LegalPageView, { fetchLegalPage, LEGAL_TITLES } from '@/components/legal/LegalPageView';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://arogya.namogange.org').replace(/\/$/, '');

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLegalPage('privacy');
  const title = page?.title || LEGAL_TITLES.privacy;
  return {
    title,
    description: `${title} of Arogya Sangoshthi, organised by Namo Gange Trust.`,
    alternates: { canonical: `${SITE_URL}/privacy` },
  };
}

export default async function Page() {
  return <LegalPageView slug="privacy" page={await fetchLegalPage('privacy')} />;
}
