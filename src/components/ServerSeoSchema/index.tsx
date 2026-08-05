/**
 * ServerSeoSchema — Async Server Component (NO "use client")
 *
 * Fetches schemaMarkup from the CMS backend DURING SSR and renders
 * <script type="application/ld+json"> tags directly into the HTML.
 *
 * Because this runs on the server:
 * ✅ schema.org validator sees it
 * ✅ WhatsApp / Facebook / Twitter bots see it
 * ✅ Google crawler sees it
 * ✅ Any tool that reads raw HTML sees it
 *
 * Usage (Server Component pages only):
 *   <ServerSeoSchema pagePath="/about" />
 */

// Server-side direct fetch — does NOT use window/localStorage
const fetchSeoForPage = async (pagePath: string) => {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  const base = apiBase.endsWith("/api") ? apiBase : `${apiBase}/api`;

  try {
    const res = await fetch(`${base}/seo/all`, {
      next: { revalidate: 300 }, // cache 5 minutes — fresh enough, not too many requests
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;
    const found = (data.data as any[]).find(
      (item) => item.page === pagePath && item.isActive
    );
    return found || null;
  } catch {
    return null;
  }
};

// Parse schemaMarkup string → array of valid JSON strings
const parseSchemaBlocks = (raw: string): string[] => {
  const trimmed = raw.trim();
  const blocks: string[] = [];

  // Case 1: one or more <script type="application/ld+json">…</script> wrappers
  const scriptTagPattern = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = scriptTagPattern.exec(trimmed)) !== null) {
    blocks.push(match[1].trim());
  }

  if (blocks.length > 0) return blocks;

  // Case 2: raw JSON — array or single object (no script wrapper)
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => JSON.stringify(item));
    }
    return [trimmed];
  } catch {
    return [];
  }
};

interface Props {
  pagePath: string;
}

const ServerSeoSchema = async ({ pagePath }: Props) => {
  const seo = await fetchSeoForPage(pagePath);
  if (!seo?.schemaMarkup) return null;

  const blocks = parseSchemaBlocks(seo.schemaMarkup);

  // Keep only blocks that are valid JSON
  const validBlocks = blocks.filter((block) => {
    try {
      JSON.parse(block);
      return true;
    } catch {
      return false;
    }
  });

  if (validBlocks.length === 0) return null;

  return (
    <>
      {validBlocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data from CMS
          dangerouslySetInnerHTML={{ __html: block }}
        />
      ))}
    </>
  );
};

export default ServerSeoSchema;
