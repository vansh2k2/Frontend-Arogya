import type { Metadata } from 'next';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { buildPageMetadata } from '@/lib/fetchCmsSeo';
import { requirePublishedPage } from '@/lib/sitePages';

// The page itself is a client component, so its SEO lives here.
// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/paper-presentation', {
    title: 'Paper Presentation',
    description: 'Submit and present your research paper at Arogya Sangoshthi 2026. 21–23 August 2026, Pragati Maidan, New Delhi.',
  });
}

// Shows the 404 page while "/paper-presentation" is set to Draft in arogya-admin → Pages & CMS
export default async function Layout({ children }: { children: React.ReactNode }) {
  await requirePublishedPage('/paper-presentation');
  return (
    <>
      <ServerSeoSchema pagePath="/paper-presentation" />
      {children}
    </>
  );
}
