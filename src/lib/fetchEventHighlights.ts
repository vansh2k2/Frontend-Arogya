/**
 * fetchEventHighlights — Server-side utility
 *
 * Loads the home "Event Highlights & CTA" block managed from arogya-admin
 * (Pages & CMS → Home). Cached for 30 seconds. Returns null when the backend is
 * unreachable or nothing is saved — the block then shows its built-in content.
 */

export interface EventHighlightsButton {
  label?: string;
  href?: string;
  newTab?: boolean;
}

export interface EventHighlightsData {
  heading?: string;
  /** desc / attendee text: "\n" = line break */
  highlights: { title: string; desc?: string; image?: string; imageAlt?: string; icon?: string; bgColor?: string }[];
  glanceHeading?: string;
  agendaDays: { badge: string; date?: string; text?: string; image?: string; imageAlt?: string }[];
  whoHeading?: string;
  attendees: { text: string; icon?: string }[];
  viewAgenda?: EventHighlightsButton;
  detailsHeading?: string;
  datesValue?: string;
  venueValue?: string;
  formatValue?: string;
  organizerValue?: string;
  mapEmbedUrl?: string;
  ctaIcon?: string;
  ctaIconAlt?: string;
  ctaHeading?: string;
  ctaParagraph?: string;
  ctaButtons?: EventHighlightsButton[];
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchEventHighlights = async (): Promise<EventHighlightsData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/event-highlights`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    const data = body?.success ? (body.data as EventHighlightsData | null) : null;
    return data && Array.isArray(data.highlights) ? data : null;
  } catch {
    return null;
  }
};
