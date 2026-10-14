import { getBackendRoot } from '@/lib/advancedSeo';

// robots.txt comes from backend-arogya: the file uploaded in arogya-admin → Advanced SEO,
// else the auto-generated one. Cached 60 s; a basic allow-all file if the backend is down.
export const revalidate = 60;

const FALLBACK = `User-agent: *
Allow: /

Sitemap: https://arogya.namogange.org/sitemap.xml
`;

export async function GET() {
  let body = FALLBACK;
  try {
    const res = await fetch(`${getBackendRoot()}/robots.txt`, { next: { revalidate: 60 } });
    if (res.ok) body = await res.text();
  } catch {
    // keep the fallback
  }
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
