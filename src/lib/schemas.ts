/**
 * Centralized schema.org structured data for Arogya Sangoshthi 2026
 * Used by JSON-LD components across all pages.
 * 
 * Schemas included:
 *   - Event (conference)
 *   - Organization (Arogya Sangoshthi Foundation)
 *   - Place (Pragati Maidan)
 */

export const SITE_URL = "https://arogya.namogange.org";
export const LOGO_URL = `${SITE_URL}/logo.png`;
export const OG_IMAGE = `${SITE_URL}/ogimage.png`;

// ─── PLACE ───────────────────────────────────────────────────────────────────
export const eventPlace = {
  "@type": "Place",
  name: "Pragati Maidan",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bhairon Road, Pragati Maidan",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.615945,
    longitude: 77.240784,
  },
  url: "https://pragatimaidannewdelhi.com/",
};

// ─── ORGANIZER ────────────────────────────────────────────────────────────────
export const organizer = {
  "@type": "Organization",
  name: "Arogya Sangoshthi Foundation",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 493,
    height: 94,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@namogange.org",
    url: `${SITE_URL}/contact`,
  },
  sameAs: [
    "https://www.namogange.org",
  ],
};

// ─── EVENT (main conference) ───────────────────────────────────────────────────
export const mainEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Arogya Sangoshthi 2026 — 18th International AYUSH & Integrated Healthcare Conference",
  alternateName: "Arogya 2026",
  description:
    "Arogya Sangoshthi 2026 is India's premier 3-day international conference on Integrated Healthcare, AYUSH, Pharma, Wellness & Innovation. Uniting world-class experts, researchers, policy makers, and practitioners for knowledge exchange, innovation showcases, and holistic healthcare advancements.",
  url: SITE_URL,
  image: OG_IMAGE,
  startDate: "2026-08-21",
  endDate: "2026-08-23",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: eventPlace,
  organizer: organizer,
  offers: [
    {
      "@type": "Offer",
      name: "Delegate Registration",
      url: `${SITE_URL}/delegate-registration`,
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      priceCurrency: "INR",
    },
  ],
  audience: {
    "@type": "Audience",
    audienceType:
      "Doctors, Clinicians, Researchers, Academicians, Pharma & Biotech Companies, Health Tech Innovators, AYUSH Practitioners, Policy Makers, Investors, Students",
  },
  about: [
    { "@type": "Thing", name: "AYUSH" },
    { "@type": "Thing", name: "Integrated Healthcare" },
    { "@type": "Thing", name: "Homeopathy" },
    { "@type": "Thing", name: "Pharma Innovation" },
    { "@type": "Thing", name: "Wellness" },
    { "@type": "Thing", name: "Traditional Medicine" },
  ],
  keywords:
    "AYUSH conference, integrated healthcare, homeopathy seminar, pharma innovation, wellness, Pragati Maidan, New Delhi, Arogya Sangoshthi 2026",
  inLanguage: "en",
  isAccessibleForFree: false,
};

// ─── ORGANIZATION schema (standalone for About/Contact pages) ────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arogya Sangoshthi Foundation",
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Arogya Sangoshthi Foundation organizes India's leading healthcare conferences, uniting medical professionals, researchers, and policy makers to advance integrated healthcare.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@namogange.org",
    url: `${SITE_URL}/contact`,
  },
  sameAs: ["https://www.namogange.org"],
};

// ─── BREADCRUMB helper ────────────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── WEBPAGE helper ───────────────────────────────────────────────────────────
export function webPageSchema(opts: {
  type?: string;
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type || "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: opts.image || OG_IMAGE,
    isPartOf: {
      "@type": "WebSite",
      name: "Arogya Sangoshthi 2026",
      url: SITE_URL,
    },
    publisher: organizer,
    inLanguage: "en",
  };
}
