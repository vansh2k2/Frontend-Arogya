/**
 * fetchHeroCarousel — Server-side utility
 *
 * Loads the home page hero carousel managed from arogya-admin
 * (Pages & CMS → Home → Hero Carousel Slides). Cached for 30 seconds,
 * so admin changes show on the website within half a minute.
 * Returns null when the backend is unreachable or nothing is saved —
 * the carousel then shows its built-in slides.
 */

export type HeroTheme = "gold" | "blue" | "green";

export interface HeroSlideData {
  _id?: string;
  image: string;
  imageAlt: string;
  logo?: string;
  logoAlt?: string;
  subtitle?: string;
  theme?: HeroTheme;
  button1Label?: string;
  button1Link?: string;
  button1NewTab?: boolean;
  button2Label?: string;
  button2Link?: string;
  button2NewTab?: boolean;
}

export interface HeroCarouselData {
  editionTag?: string;
  eventDates?: string;
  venue?: string;
  slides: HeroSlideData[];
}

const getApiBase = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  if (env) return env.endsWith("/api") ? env : `${env}/api`;
  return "http://localhost:5001/api";
};

export const fetchHeroCarousel = async (): Promise<HeroCarouselData | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${getApiBase()}/home-hero`, {
      next: { revalidate: 30 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const body = await res.json();
    const data = body?.success ? (body.data as HeroCarouselData | null) : null;
    return data && Array.isArray(data.slides) && data.slides.length ? data : null;
  } catch {
    return null;
  }
};
