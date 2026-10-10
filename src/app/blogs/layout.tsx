import type { Metadata } from 'next';
import ServerSeoSchema from '@/components/ServerSeoSchema';
import { buildPageMetadata } from '@/lib/fetchCmsSeo';
import { requirePublishedPage } from '@/lib/sitePages';

// The page itself is a client component, so its SEO lives here.
// Meta tags, Open Graph, canonical (auto) and robots from arogya-admin → Pages & CMS → SEO Information
export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/blogs', {
    title: 'Blogs & News',
    description: 'Latest news, articles and updates on AYUSH and integrated healthcare from Arogya Sangoshthi.',
  });
}

// Shows the 404 page while "/blogs" is set to Draft in arogya-admin → Pages & CMS
export default async function Layout({ children }: { children: React.ReactNode }) {
  await requirePublishedPage('/blogs');
  return (
    <>
      <ServerSeoSchema pagePath="/blogs" />
      {children}
    </>
  );
}
