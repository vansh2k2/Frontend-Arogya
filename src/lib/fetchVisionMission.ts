/**
 * fetchVisionMission — Server-side utility
 *
 * Loads the home "Our Vision / Our Mission / Chairman's Message" cards managed from
 * arogya-admin (Pages & CMS → Home). Cached for 30 seconds. Returns null when the
 * backend is unreachable or nothing is saved — the cards then show their built-in content.
 */

export interface VisionMissionData {
  dividerImage?: string;
  dividerImageAlt?: string;
  visionHeading?: string;
  /** "\n" = line break */
  visionText?: string;
  visionIcon?: string;
  visionIconAlt?: string;
  visionImage?: string;
  visionImageAlt?: string;
  missionHeading?: string;
  missionBlocks: { heading: string; body?: string; image?: string; imageAlt?: string }[];
  chairman?: {
    heading?: string;
    message?: string;
    name?: string;
    designation?: string;
    image?: string;
    imageAlt?: string;
    leafImage?: string;
    leafImageAlt?: string;
  };
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchVisionMission = async (): Promise<VisionMissionData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/vision-mission`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    const data = body?.success ? (body.data as VisionMissionData | null) : null;
    return data && Array.isArray(data.missionBlocks) ? data : null;
  } catch {
    return null;
  }
};
