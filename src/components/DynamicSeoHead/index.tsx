/**
 * DynamicSeoHead — Injects SEO meta tags from backend CMS into the page <head>
 *
 * This is a Client Component that:
 * 1. Fetches SEO data for the current page from /api/seo/all
 * 2. Dynamically updates <title>, <meta>, and <script type="application/ld+json">
 *    using next/head (or direct DOM manipulation since we are in App Router)
 * 3. Falls back gracefully if no backend SEO data exists (code-level metadata still works)
 *
 * Usage: <DynamicSeoHead pagePath="/" />
 */
"use client";
import { useEffect } from "react";
import { seoApi } from "@/lib/api";

interface DynamicSeoHeadProps {
  pagePath: string; // e.g. "/" | "/about" | "/speakers"
}

const DynamicSeoHead = ({ pagePath }: DynamicSeoHeadProps) => {
  useEffect(() => {
    const apply = async () => {
      const seo = await seoApi.getByPage(pagePath);
      if (!seo) return; // No CMS data — code-level metadata takes over

      // ── Meta Title ────────────────────────────────────────────────────────
      if (seo.metaTitle) {
        document.title = seo.metaTitle;
      }

      const setMeta = (name: string, content: string, attr = "name") => {
        if (!content) return;
        let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        }
        el.setAttribute("content", content);
      };

      // ── Meta Tags ─────────────────────────────────────────────────────────
      setMeta("description", seo.metaDescription);
      setMeta("keywords", seo.metaKeywords);

      // ── Open Graph (from raw HTML string stored in backend) ──────────────
      if (seo.openGraphTags) {
        // Parse the raw OG HTML string and extract individual meta tags
        const parser = new DOMParser();
        const doc = parser.parseFromString(
          `<html><head>${seo.openGraphTags}</head></html>`,
          "text/html"
        );
        doc.querySelectorAll("meta").forEach((tag) => {
          const property = tag.getAttribute("property") || tag.getAttribute("name");
          const content = tag.getAttribute("content");
          if (property && content) {
            setMeta(property, content, tag.getAttribute("property") ? "property" : "name");
          }
        });
      }

      // ── Canonical Tag ─────────────────────────────────────────────────────
      if (seo.canonicalTag) {
        // Strip HTML tags if canonical was saved with <link> wrapper
        const canonical = seo.canonicalTag
          .replace(/<[^>]+>/g, "")
          .trim();
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!link) {
          link = document.createElement("link");
          link.setAttribute("rel", "canonical");
          document.head.appendChild(link);
        }
        link.setAttribute("href", canonical);
      }

      // ── OG Image ──────────────────────────────────────────────────────────
      if (seo.ogImage) {
        setMeta("og:image", seo.ogImage, "property");
        setMeta("twitter:image", seo.ogImage);
      }

      // ── Schema Markup (JSON-LD) ────────────────────────────────────────────
      if (seo.schemaMarkup) {
        // Remove any existing CMS-injected schema tags (avoid duplicates on re-render)
        document.querySelectorAll('script[data-cms-schema]').forEach((el) => el.remove());

        const raw = seo.schemaMarkup.trim();

        // Helper: inject a single validated JSON-LD block into <head>
        const injectScript = (jsonText: string, index: number) => {
          const text = jsonText.trim();
          if (!text) return;
          try {
            JSON.parse(text); // validate
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.setAttribute("data-cms-schema", String(index));
            script.textContent = text;
            document.head.appendChild(script);
          } catch (e) {
            console.warn(`[DynamicSeoHead] Invalid JSON-LD block #${index}, skipping:`, e);
          }
        };

        // Case 1: admin saved one or more <script type="application/ld+json">…</script> blocks
        const scriptTagPattern = /<script[^>]*>([\s\S]*?)<\/script>/gi;
        const scriptBlocks: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = scriptTagPattern.exec(raw)) !== null) {
          scriptBlocks.push(match[1]);
        }

        if (scriptBlocks.length > 0) {
          scriptBlocks.forEach((block, i) => injectScript(block, i));
        } else {
          // Case 2: admin saved raw JSON (array or object) without <script> wrapper
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              // Array of schema objects → inject each as a separate <script>
              parsed.forEach((item, i) => injectScript(JSON.stringify(item), i));
            } else {
              injectScript(raw, 0);
            }
          } catch (e) {
            console.warn("[DynamicSeoHead] Unparseable schema markup from CMS, skipping:", e);
          }
        }
      }
    };

    apply();
  }, [pagePath]);

  return null; // Renders nothing — only affects <head>
};

export default DynamicSeoHead;
