/**
 * fetchCmsSeoForPage — Server-side utility
 *
 * Used inside Next.js generateMetadata() to fetch CMS SEO data
 * (og:image, title, description) on the SERVER, so it appears
 * in the HTML <head> and is visible to WhatsApp, Facebook, etc.
 *
 * Cached for 30 seconds, so a save in arogya-admin (Pages & CMS → SEO
 * Information) shows on the website within half a minute.
 */
import type { Metadata } from "next";

const LIVE_SITE_URL = "https://arogya.namogange.org";

/** This website's own address — canonical / og:url are built on it */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? LIVE_SITE_URL : "http://localhost:3000")
).replace(/\/$/, "");

// Resolve the API base URL safely on the server (no window access)
const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith("/api") ? env : `${env}/api`;
  return "http://localhost:5001/api";
};

export interface CmsSeoData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;  // comma separated
  ogImage?: string;       // uploaded file path like /uploads/seo/image.jpg
  openGraphTags?: string; // raw HTML string with <meta property="og:*"> tags
  schemaMarkup?: string;  // JSON-LD (raw JSON or <script> blocks)
  canonicalTag?: string;  // <link rel="canonical" href="..."> or a plain URL
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  isActive?: boolean;
}

export const fetchCmsSeoForPage = async (
  pagePath: string
): Promise<CmsSeoData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/seo/all`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;
    const found = (data.data as CmsSeoData[]).find(
      (item: any) => item.page === pagePath && item.isActive
    );
    return found || null;
  } catch (error) {
    return null; // fallback to static metadata if backend down or timeout
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
  if (!ogImagePath) return `${LIVE_SITE_URL}/ogimage.webp`;
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
  return `${LIVE_SITE_URL}/ogimage.webp`;
};

/** All <meta property|name="x" content="y"> pairs of the admin's Open Graph tags → { x: y } */
export const parseMetaTags = (html?: string): Record<string, string> => {
  const tags: Record<string, string> = {};
  for (const [tag] of (html || "").matchAll(/<meta\b[^>]*>/gi)) {
    // content="India's ..." — a quote of the other kind inside the value is fine
    const attr = (name: string) => {
      const m = tag.match(new RegExp(`(?:${name})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
      return (m?.[1] ?? m?.[2])?.replace(/\s+/g, " ").trim();
    };
    const key = attr("property|name")?.toLowerCase();
    const value = attr("content");
    if (key && value && !(key in tags)) tags[key] = value;
  }
  return tags;
};

const SITE_HOSTS = ["localhost", "127.0.0.1", new URL(LIVE_SITE_URL).hostname, `www.${new URL(LIVE_SITE_URL).hostname}`];

/**
 * Canonical URL of a page — generated automatically from its path.
 * A canonical saved in the admin wins; when it points at localhost or the
 * live domain it is re-based onto this site (so a value saved while working
 * locally never shows "localhost" on the live website).
 */
export const resolveCanonical = (pagePath: string, saved?: string): string => {
  const auto = `${SITE_URL}${pagePath === "/" ? "" : pagePath}`;
  const text = (saved || "").trim();
  const href = (text.match(/href=["']([^"']+)["']/i)?.[1] ?? text.replace(/<[^>]*>/g, "")).trim();
  if (!href) return auto;
  try {
    const url = new URL(href);
    if (!SITE_HOSTS.includes(url.hostname)) return href;
    return `${SITE_URL}${url.pathname.replace(/\/+$/, "")}${url.search}`;
  } catch {
    return auto;
  }
};

const TWITTER_CARDS = ["summary", "summary_large_image", "app", "player"] as const;

/**
 * Full page metadata from the admin's SEO record (Pages & CMS → SEO
 * Information), falling back to the page's built-in text when nothing is
 * saved or the record is set to Inactive.
 */
export const buildPageMetadata = async (
  pagePath: string,
  fallback: { title?: string; description: string },
): Promise<Metadata> => {
  const cms = await fetchCmsSeoForPage(pagePath);
  const tags = parseMetaTags(cms?.openGraphTags);
  const canonical = resolveCanonical(pagePath, cms?.canonicalTag);
  const cmsTitle = cms?.metaTitle?.trim();
  const description = cms?.metaDescription?.trim() || fallback.description;
  const shareTitle =
    tags["og:title"] ||
    cmsTitle ||
    (fallback.title ? `${fallback.title} | Arogya Sangoshthi 2026` : "Arogya Sangoshthi 2026 | International AYUSH & Integrated Healthcare Conference");
  const shareDescription = tags["og:description"] || description;
  const image = getOgImageUrl(cms);
  const card = TWITTER_CARDS.find((c) => c === tags["twitter:card"]) ?? "summary_large_image";
  const keywords = (cms?.metaKeywords || "").split(",").map((k) => k.trim()).filter(Boolean);

  return {
    // The admin types the full title, so the "| Arogya Sangoshthi 2026" template is not added to it
    ...(cmsTitle ? { title: { absolute: cmsTitle } } : fallback.title ? { title: fallback.title } : {}),
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical },
    ...(cms
      ? {
          robots: {
            index: cms.robotsIndex !== false,
            follow: cms.robotsFollow !== false,
            googleBot: { index: cms.robotsIndex !== false, follow: cms.robotsFollow !== false, "max-image-preview": "large" },
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: /^[a-z]{2}_[A-Z]{2}$/.test(tags["og:locale"] || "") ? tags["og:locale"] : "en_IN",
      siteName: tags["og:site_name"] || "Arogya Sangoshthi 2026",
      title: shareTitle,
      description: shareDescription,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: tags["og:image:alt"] || shareTitle }],
    },
    twitter: {
      card,
      title: tags["twitter:title"] || shareTitle,
      description: tags["twitter:description"] || shareDescription,
      images: [tags["twitter:image"] || image],
    },
  };
};
