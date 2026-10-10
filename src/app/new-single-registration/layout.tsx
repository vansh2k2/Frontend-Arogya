import { requirePublishedPage } from '@/lib/sitePages';

// Shows the 404 page while "/new-single-registration" is set to Draft in arogya-admin → Pages & CMS
export default async function Layout({ children }: { children: React.ReactNode }) {
  await requirePublishedPage('/new-single-registration');
  return children;
}
