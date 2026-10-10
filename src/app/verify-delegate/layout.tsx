import { requirePublishedPage } from '@/lib/sitePages';

// Shows the 404 page while "/verify-delegate" is set to Draft in arogya-admin → Pages & CMS
export default async function Layout({ children }: { children: React.ReactNode }) {
  await requirePublishedPage('/verify-delegate');
  return children;
}
