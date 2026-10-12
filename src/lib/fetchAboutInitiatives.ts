/**
 * fetchAboutInitiatives / fetchAboutImpact — Server-side utilities
 *
 * Load the About Us page "Our Initiatives" section and "Our Impact So Far" band
 * managed from arogya-admin (Pages & CMS → About Us). Cached for 30 seconds.
 * Return null when the backend is unreachable or nothing is saved — the section
 * then shows its built-in content.
 */

export interface InitiativeCard {
  /** "\n" = line break */
  title: string;
  /** "\n" = line break */
  description?: string;
  icon?: string;
  iconAlt?: string;
  image?: string;
  imageAlt?: string;
}

export interface FocusArea {
  /** Lucide icon name, e.g. "HeartHandshake" */
  icon: string;
  /** "\n" = line break (wide screens) */
  text: string;
}

export interface AboutInitiativesData {
  heading?: string;
  dividerImage?: string;
  dividerImageAlt?: string;
  decorImage?: string;
  decorImageAlt?: string;
  cards?: InitiativeCard[];
  /** "\n" = line break (wide screens) */
  focusTitle?: string;
  focusAreas?: FocusArea[];
}

export interface ImpactStat {
  icon?: string;
  iconAlt?: string;
  /** Only digits → counts up ("1000"); anything else is shown as it is ("Countless") */
  value: string;
  suffix?: string;
  /** "\n" = line break */
  label: string;
}

export interface AboutImpactData {
  title?: string;
  stats?: ImpactStat[];
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

const fetchSection = async <T,>(path: string): Promise<T | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}${path}`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as T) : null;
  } catch {
    return null;
  }
};

export const fetchAboutInitiatives = () => fetchSection<AboutInitiativesData>('/about-initiatives');
export const fetchAboutImpact = () => fetchSection<AboutImpactData>('/about-impact');
