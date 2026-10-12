/**
 * fetchAboutFaq — Server-side utility
 *
 * Loads the About Us page "Frequently Asked Questions" section managed from
 * arogya-admin (Pages & CMS → About Us). Cached for 30 seconds. Returns null when
 * the backend is unreachable — the section then shows its built-in content.
 */

export interface AboutFaqItem {
  question: string;
  answer: string;
  image?: string;
  /** stored by the backend as imageAltText */
  imageAltText?: string;
}

export interface AboutFaqData {
  subheading?: string;
  heading?: string;
  highlightText?: string;
  description?: string;
  defaultImage?: string;
  defaultImageAlt?: string;
  leftImage?: string;
  leftImageAlt?: string;
  rightImage?: string;
  rightImageAlt?: string;
  ctaQuestion?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaNewTab?: boolean;
  items?: AboutFaqItem[];
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith('/api') ? env : `${env}/api`;
  return 'http://localhost:5001/api';
};

export const fetchAboutFaq = async (): Promise<AboutFaqData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/faq`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    return body?.success && body.data ? (body.data as AboutFaqData) : null;
  } catch {
    return null;
  }
};
