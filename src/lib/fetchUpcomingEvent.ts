/**
 * fetchUpcomingEvent — Server-side utility
 *
 * Loads the home "Upcoming Event & Countdown" section managed from arogya-admin
 * (Pages & CMS → Home). Cached for 30 seconds. Returns null when the backend is
 * unreachable or nothing is saved — the section then shows its built-in content.
 */

export interface UpcomingEventData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** "\n" = line break */
  description?: string;
  dateInfo?: string;
  venueInfo?: string;
  delegatesInfo?: string;
  countriesInfo?: string;
  countdownHeading?: string;
  /** India time, "YYYY-MM-DDTHH:mm" */
  targetDate?: string;
  attendHeading?: string;
  attendItems?: { text: string }[];
  attendImage?: string;
  attendImageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaNewTab?: boolean;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchUpcomingEvent = async (): Promise<UpcomingEventData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/upcoming-event`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as UpcomingEventData) : null;
  } catch {
    return null;
  }
};
