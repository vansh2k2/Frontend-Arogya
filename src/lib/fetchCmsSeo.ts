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
  ogImage?: string;       // path like /uploads/seo/image.jpg
  openGraphTags?: string; // raw HTML string
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
 * Build the og:image URL from a CMS ogImage path
 * e.g. "/uploads/seo/image.jpg" → "https://backend.url/uploads/seo/image.jpg"
 */
export const resolveOgImageUrl = (ogImagePath: string): string => {
  if (!ogImagePath) return `${SITE_URL}/ogimage.png`;
  // Already absolute URL
  if (ogImagePath.startsWith("http")) return ogImagePath;
  // Relative path from backend server
  const serverBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api")
    .replace(/\/api$/, "");
  return `${serverBase}${ogImagePath}`;
};
