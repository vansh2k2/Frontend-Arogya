/**
 * fetchCmsSeoForPage — Server-side utility
 *
 * Used inside Next.js generateMetadata() to fetch CMS SEO data
 * (og:image, title, description) on the SERVER, so it appears
 * in the HTML <head> and is visible to WhatsApp, Facebook, etc.
 *
 * Uses ISR caching (revalidate: 300 = 5 min) for performance.
 */

const SITE_URL = "https://arogya.namogange.org";

// Resolve the API base URL safely on the server (no window access)
const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith("/api") ? env : `${env}/api`;
  return "http://localhost:5001/api";
};

export interface CmsSeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;       // uploaded file path like /uploads/seo/image.jpg
  openGraphTags?: string; // raw HTML string with <meta property="og:*"> tags
  isActive?: boolean;
}

export const fetchCmsSeoForPage = async (
  pagePath: string
): Promise<CmsSeoData | null> => {
  try {
    const res = await fetch(`${getApiBase()}/seo/all`, {
      next: { revalidate: 300 }, // cache 5 min — zero perf cost after first hit
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;
    const found = (data.data as CmsSeoData[]).find(
      (item: any) => item.page === pagePath && item.isActive
    );
    return found || null;
  } catch {
    return null; // fallback to static metadata if backend down
  }
};

/**
 * Extract og:image URL from an HTML string of <meta> tags.
 * Admin stores OG tags as raw HTML — e.g.:
 *   <meta property="og:image" content="https://...">
 * This function parses that string and returns the content value.
 */
export const extractOgImageFromHtml = (html: string): string | null => {
  if (!html) return null;
  // Match property="og:image" or name="og:image"
  const match = html.match(
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
  ) || html.match(
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i
  );
  return match ? match[1].trim() : null;
};

/**
 * Build the og:image URL from a CMS ogImage path
 * e.g. "/uploads/seo/image.jpg" → "https://backend.url/uploads/seo/image.jpg"
 */
export const resolveOgImageUrl = (ogImagePath: string): string => {
  if (!ogImagePath) return `${SITE_URL}/ogimage.webp`;
  // Already absolute URL
  if (ogImagePath.startsWith("http")) return ogImagePath;
  // Relative path from backend server
  const serverBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api")
    .replace(/\/api$/, "");
  return `${serverBase}${ogImagePath}`;
};

/**
 * Get the best OG image URL from CMS data.
 * Priority:
 *   1. cms.ogImage (uploaded file field)
 *   2. og:image extracted from cms.openGraphTags HTML
 *   3. Default fallback ogimage.webp
 */
export const getOgImageUrl = (cms: CmsSeoData | null): string => {
  // 1. Uploaded file field
  if (cms?.ogImage) return resolveOgImageUrl(cms.ogImage);

  // 2. Parse from openGraphTags HTML string
  if (cms?.openGraphTags) {
    const fromHtml = extractOgImageFromHtml(cms.openGraphTags);
    if (fromHtml) return fromHtml;
  }

  // 3. Static fallback in /public
  return `${SITE_URL}/ogimage.webp`;
};
