/**
 * fetchStatsBand — Server-side utility
 *
 * Loads the home counter strip managed from arogya-admin
 * (Pages & CMS → Home → Stats Band). Cached for 30 seconds.
 * Returns null when the backend is unreachable — the strip then
 * shows its built-in counters.
 */

export interface StatsBandItem {
  number: string;
  label: string;
  icon: string;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchStatsBand = async (): Promise<StatsBandItem[] | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/stats-band`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    const items = body?.success ? body.data?.items : null;
    return Array.isArray(items) && items.length ? items : null;
  } catch {
    return null;
  }
};
