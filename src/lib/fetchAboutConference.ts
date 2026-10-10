/**
 * fetchAboutConference — Server-side utility
 *
 * Loads the home "About The Conference" section managed from arogya-admin
 * (Pages & CMS → Home). Cached for 30 seconds. Returns null when the backend is
 * unreachable or nothing is saved — the section then shows its built-in content.
 */

export interface AboutConferenceData {
  eyebrow?: string;
  eyebrowImage?: string;
  eyebrowImageAlt?: string;
  headingLine1?: string;
  headingLine2?: string;
  subtitle?: string;
  paragraph1?: string;
  paragraph2?: string;
  /** "\n" = line break */
  dateBadge?: string;
  venueBadge?: string;
  delegatesBadge?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchAboutConference = async (): Promise<AboutConferenceData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/about-conference`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as AboutConferenceData) : null;
  } catch {
    return null;
  }
};
