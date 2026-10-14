import { getBackendRoot } from '@/lib/advancedSeo';

// sitemap.xml comes from backend-arogya: every published page plus every live blog post
// (or the sitemap.xml uploaded in arogya-admin → Advanced SEO). Cached 60 s; the main
// pages only if the backend is down.
export const revalidate = 60;

const SITE_URL = 'https://arogya.namogange.org';
const FALLBACK_PATHS = ['', '/about', '/speakers', '/register-now', '/delegate-registration', '/contact', '/gallery', '/partners', '/paper-presentation', '/blogs'];

const fallbackXml = () =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${FALLBACK_PATHS.map(
    (p) => `  <url><loc>${SITE_URL}${p}</loc></url>`
  ).join('\n')}\n</urlset>\n`;

export async function GET() {
  let body = '';
  try {
    const res = await fetch(`${getBackendRoot()}/sitemap.xml`, { next: { revalidate: 60 } });
    if (res.ok) body = await res.text();
  } catch {
    // use the fallback
  }
  return new Response(body || fallbackXml(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
