/**
 * Renders the header / footer code pasted in arogya-admin → Advanced SEO.
 * <script>, <noscript> and <meta> tags are kept; a bare JS snippet (no tags) runs as a script.
 */
import React from "react";

interface ParsedScript {
  src?: string;
  id?: string;
  async?: boolean;
  defer?: boolean;
  type?: string;
  code: string;
}

const attr = (raw: string, name: string) => raw.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1];

export function parseCustomScripts(html?: string) {
  const scripts: ParsedScript[] = [];
  const noscripts: string[] = [];
  const metas: Record<string, string>[] = [];
  if (!html || typeof html !== "string") return { scripts, noscripts, metas };

  const withoutComments = html.replace(/<!--[\s\S]*?-->/g, "");

  for (const match of withoutComments.matchAll(/<noscript\b[^>]*>([\s\S]*?)<\/noscript>/gi)) {
    if (match[1]?.trim()) noscripts.push(match[1].trim());
  }

  for (const match of withoutComments.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const rawAttrs = match[1] || "";
    scripts.push({
      src: attr(rawAttrs, "src"),
      id: attr(rawAttrs, "id"),
      type: attr(rawAttrs, "type"),
      async: /\basync\b/i.test(rawAttrs),
      defer: /\bdefer\b/i.test(rawAttrs),
      code: (match[2] || "").trim(),
    });
  }

  // e.g. <meta name="facebook-domain-verification" content="...">
  const outsideNoscript = withoutComments.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");
  for (const match of outsideNoscript.matchAll(/<meta\b([^>]*)\/?>/gi)) {
    const meta: Record<string, string> = {};
    for (const key of ["name", "property", "content", "http-equiv"]) {
      const value = attr(match[1], key);
      if (value !== undefined) meta[key === "http-equiv" ? "httpEquiv" : key] = value;
    }
    if (meta.content !== undefined) metas.push(meta);
  }

  // Raw JS pasted without a <script> tag
  if (!scripts.length && !noscripts.length && !metas.length && withoutComments.trim() && !/<\w/.test(withoutComments)) {
    scripts.push({ code: withoutComments.trim() });
  }

  return { scripts, noscripts, metas };
}

function ScriptTags({ scripts, prefix }: { scripts: ParsedScript[]; prefix: string }) {
  return (
    <>
      {scripts.map((s, idx) =>
        s.src ? (
          <script key={`${prefix}-src-${idx}`} id={s.id} src={s.src} async={s.async} defer={s.defer} type={s.type} />
        ) : s.code ? (
          <script key={`${prefix}-inline-${idx}`} id={s.id} type={s.type} dangerouslySetInnerHTML={{ __html: s.code }} />
        ) : null
      )}
    </>
  );
}

/** Code for inside <head> */
export function HeadScripts({ html }: { html?: string }) {
  if (!html) return null;
  const { scripts, noscripts, metas } = parseCustomScripts(html);
  return (
    <>
      {metas.map((meta, idx) => (
        <meta key={`custom-meta-${idx}`} {...meta} />
      ))}
      <ScriptTags scripts={scripts} prefix="custom-head" />
      {noscripts.map((content, idx) => (
        <noscript key={`custom-head-noscript-${idx}`} dangerouslySetInnerHTML={{ __html: content }} />
      ))}
    </>
  );
}

/** Code for just before </body> */
export function FooterScripts({ html }: { html?: string }) {
  if (!html) return null;
  const { scripts, noscripts } = parseCustomScripts(html);
  return (
    <>
      {noscripts.map((content, idx) => (
        <noscript key={`custom-footer-noscript-${idx}`} dangerouslySetInnerHTML={{ __html: content }} />
      ))}
      <ScriptTags scripts={scripts} prefix="custom-footer" />
    </>
  );
}
