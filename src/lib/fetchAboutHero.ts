/**
 * fetchAboutHero — Server-side utility
 *
 * Loads the About Us page "About Hero" banner managed from arogya-admin
 * (Pages & CMS → About Us). Cached for 30 seconds. Returns null when the backend
 * is unreachable or nothing is saved — the banner then shows its built-in content.
 */

export interface AboutHeroStat {
  /** Lucide icon name, e.g. "BookOpen" */
  icon: string;
  value: number;
  suffix?: string;
  label: string;
}

export interface AboutHeroData {
  eyebrow?: string;
  /** "\n" = line break */
  headline?: string;
  dividerImage?: string;
  dividerImageAlt?: string;
  /** "\n" = line break */
  paragraph?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  stats?: AboutHeroStat[];
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchAboutHero = async (): Promise<AboutHeroData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/about-hero`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as AboutHeroData) : null;
  } catch {
    return null;
  }
};
