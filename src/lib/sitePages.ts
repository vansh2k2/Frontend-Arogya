/**
 * Website page visibility — Server-side utility
 *
 * Pages can be set to Draft in arogya-admin (Pages & CMS → page toggle).
 * A Draft page answers with the 404 page and disappears from the navbar.
 * Cached for 30 seconds. If the backend cannot be reached every page stays
 * visible, so a backend outage never takes the website down.
 */
import { notFound } from 'next/navigation';

export interface SitePageStatus {
  key: string;
  path: string;
  isPublished: boolean;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchSitePages = async (): Promise<SitePageStatus[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/site-pages`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return [];
    const body = await res.json();
    return body?.success && Array.isArray(body.data) ? body.data : [];
  } catch {
    return [];
  }
};

/** Call at the top of a route's layout: shows the 404 page while the page is in Draft. */
export const requirePublishedPage = async (path: string) => {
  const pages = await fetchSitePages();
  if (pages.some((page) => page.path === path && page.isPublished === false)) {
    notFound();
  }
};
