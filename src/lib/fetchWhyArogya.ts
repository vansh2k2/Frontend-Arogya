/**
 * fetchWhyArogya — Server-side utility
 *
 * Loads the home "Why Arogya Sanghosthi? / Conference Tracks" section managed from
 * arogya-admin (Pages & CMS → Home). Cached for 30 seconds. Returns null when the
 * backend is unreachable or nothing is saved — the section then shows its built-in content.
 */

export type TrackColor = 'green' | 'blue' | 'purple' | 'lime' | 'brown' | 'teal';

export interface WhyArogyaData {
  leftHeading?: string;
  leftHeadingImage?: string;
  leftHeadingImageAlt?: string;
  rightHeading?: string;
  rightHeadingImage?: string;
  rightHeadingImageAlt?: string;
  benefits: { title: string; text?: string; image?: string; imageAlt?: string }[];
  tracks: { label: string; image?: string; imageAlt?: string; color?: TrackColor }[];
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchWhyArogya = async (): Promise<WhyArogyaData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/why-arogya`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    const data = body?.success ? (body.data as WhyArogyaData | null) : null;
    return data && Array.isArray(data.benefits) && Array.isArray(data.tracks) ? data : null;
  } catch {
    return null;
  }
};
