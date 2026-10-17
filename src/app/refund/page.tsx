import type { Metadata } from 'next';
import LegalPageView, { fetchLegalPage, LEGAL_TITLES } from '@/components/legal/LegalPageView';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://arogya.namogange.org').replace(/\/$/, '');

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLegalPage('refund');
  const title = page?.title || LEGAL_TITLES.refund;
  return {
    title,
    description: `${title} of Arogya Sangoshthi, organised by Namo Gange Trust.`,
    alternates: { canonical: `${SITE_URL}/refund` },
  };
}

export default async function Page() {
  return <LegalPageView slug="refund" page={await fetchLegalPage('refund')} />;
}
