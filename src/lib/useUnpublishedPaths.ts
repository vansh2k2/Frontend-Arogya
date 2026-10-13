"use client";
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/lib/api';

/**
 * Paths of website pages set to Draft in arogya-admin — the navbar and footer
 * leave out links to them. Empty while loading or if the backend is unreachable.
 */
export const useUnpublishedPaths = (): Set<string> => {
  const { data } = useQuery({
    queryKey: ['site-pages'],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_URL}/site-pages`);
        const body = await res.json();
        return body?.success && Array.isArray(body.data) ? body.data : [];
      } catch {
        return [];
      }
    },
    staleTime: 60 * 1000,
    // Read-only: the cache is seeded with the server snapshot in Providers.
    // A client-side fetch could resolve mid-hydration and drop links (e.g. a
    // freshly drafted page) after the server HTML was painted, which React
    // reports as a hydration mismatch.
    enabled: false,
  });

  return new Set(
    (data ?? [])
      .filter((page: { isPublished?: boolean }) => page.isPublished === false)
      .map((page: { path: string }) => page.path),
  );
};

/** "/about", "/about/", "/about?x=1" and "/about#team" all count as "/about". */
export const pagePathOf = (href: string) => {
  const path = (href || '').split(/[?#]/)[0].replace(/\/+$/, '');
  return path === '' ? '/' : path;
};
