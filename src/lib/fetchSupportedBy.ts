/**
 * fetchSupportedBy — Server-side utility
 *
 * Loads the home page "Supported By" strip managed from arogya-admin
 * (Pages & CMS → Home → Supported By). Cached for 30 seconds.
 * Returns null when the backend is unreachable — the strip then shows
 * its built-in groups.
 */

export interface SupportedByItem {
  line1: string;
  line2?: string;
  icon: string;
  color?: string;
}

export interface SupportedByData {
  eyebrow?: string;
  items: SupportedByItem[];
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith("/api") ? env : `${env}/api`;
  return "http://localhost:5001/api";
};

export const fetchSupportedBy = async (): Promise<SupportedByData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/supported-by`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    const data = body?.success ? (body.data as SupportedByData | null) : null;
    return data && Array.isArray(data.items) && data.items.length ? data : null;
  } catch {
    return null;
  }
};
