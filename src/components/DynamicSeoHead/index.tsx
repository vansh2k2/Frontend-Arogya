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
        // Remove any existing CMS-injected schema (avoid duplicates)
        const existing = document.querySelector('script[data-cms-schema]');
        if (existing) existing.remove();

        // Strip surrounding <script> tags if admin saved them
        const rawJson = seo.schemaMarkup
          .replace(/<script[^>]*>/gi, "")
          .replace(/<\/script>/gi, "")
          .trim();

        try {
          // Validate JSON before injecting
          JSON.parse(rawJson);
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.setAttribute("data-cms-schema", "true");
          script.textContent = rawJson;
          document.head.appendChild(script);
        } catch (e) {
          console.warn("[DynamicSeoHead] Invalid JSON-LD from CMS, skipping:", e);
        }
      }
    };

    apply();
  }, [pagePath]);

  return null; // Renders nothing — only affects <head>
};

export default DynamicSeoHead;
