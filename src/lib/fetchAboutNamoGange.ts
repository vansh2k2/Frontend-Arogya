/**
 * fetchAboutNamoGange — Server-side utility
 *
 * Loads the About Us page "About Namo Gange Trust" section managed from
 * arogya-admin (Pages & CMS → About Us). Cached for 30 seconds. Returns null when
 * the backend is unreachable or nothing is saved — the section then shows its
 * built-in content.
 */

export interface AboutNamoGangeData {
  heading?: string;
  subheading?: string;
  paragraph?: string;
  highlights?: { text: string }[];
  bulletIcon?: string;
  bulletIconAlt?: string;
  image?: string;
  imageAlt?: string;
  visionTitle?: string;
  visionText?: string;
  missionTitle?: string;
  /** "\n" = line break (desktop) */
  missionText?: string;
  leafImage?: string;
  leafImageAlt?: string;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchAboutNamoGange = async (): Promise<AboutNamoGangeData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/about-namo-gange`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as AboutNamoGangeData) : null;
  } catch {
    return null;
  }
};
