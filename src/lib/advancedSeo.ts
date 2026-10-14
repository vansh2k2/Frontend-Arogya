/**
 * Global tracking settings from arogya-admin → Advanced SEO (server-side, cached 60 s):
 * header / footer scripts, GA4 + GTM IDs, the Search Console code and the global
 * index / follow switches. If the backend cannot be reached nothing is injected.
 */
export interface AdvancedSeoSettings {
  headerScripts: string;
  footerScripts: string;
  ga4MeasurementId: string;
  gtmContainerId: string;
  googleSearchConsoleVerification: string;
  allowIndex: boolean;
  allowFollow: boolean;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5000/api';
};

/** Backend root (robots.txt, sitemap.xml and uploaded root files live there) */
export const getBackendRoot = () => getApiBase().replace(/\/api$/, '');

export const fetchAdvancedSeo = async (): Promise<AdvancedSeoSettings | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${getApiBase()}/seo-settings/advanced`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const body = await res.json();
    return body?.success ? body.data : null;
  } catch {
    return null;
  }
};
