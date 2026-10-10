/**
 * fetchAboutFounder — Server-side utility
 *
 * Loads the About Us page "About The Founder" section managed from arogya-admin
 * (Pages & CMS → About Us), stored as the founder message. Cached for 30 seconds.
 * Returns null when the backend is unreachable — the section then shows its
 * built-in content.
 */

export interface AboutFounderData {
  heading?: string;
  name?: string;
  designation?: string;
  description?: string;
  messageHeading?: string;
  message?: string;
  image?: { url?: string; altText?: string };
  leafImage?: string;
  leafImageAlt?: string;
  lotusImage?: string;
  lotusImageAlt?: string;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchAboutFounder = async (): Promise<AboutFounderData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/founder-message`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as AboutFounderData) : null;
  } catch {
    return null;
  }
};
