import { requirePublishedPage } from '@/lib/sitePages';

// Shows the 404 page while "/delegate-registration" is set to Draft in arogya-admin → Pages & CMS
export default async function Layout({ children }: { children: React.ReactNode }) {
  await requirePublishedPage('/delegate-registration');
  return children;
}
