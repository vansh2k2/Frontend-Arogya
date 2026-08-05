/**
 * JsonLd - Server-safe JSON-LD structured data injector
 * Usage: <JsonLd data={schemaObject} />
 * Works in both Server Components and Client Components.
 */
const JsonLd = ({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) => (
  <script
    type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data is static
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
  />
);

export default JsonLd;
