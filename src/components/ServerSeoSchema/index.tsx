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

import { fetchCmsSeoForPage } from "@/lib/fetchCmsSeo";

// Same cached request as the page's generateMetadata (30 s)
const fetchSeoForPage = fetchCmsSeoForPage;

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
          // "<" → < (still valid JSON) so text like "</script>" in the schema can't break out of the tag
          dangerouslySetInnerHTML={{ __html: block.replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
};

export default ServerSeoSchema;
