import React, { Suspense } from "react";
import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import RegisterNowContent from "@/components/register-now/RegisterNowContent";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL, eventPlace, organizer } from "@/lib/schemas";
import DynamicSeoHead from "@/components/DynamicSeoHead";

export const metadata: Metadata = {
  title: "Register Now",
  description:
    "Register for Arogya Sangoshthi 2026 — India's premier healthcare conference. Choose your delegate pass and secure your spot at Pragati Maidan, New Delhi, 21–23 August 2026.",
  alternates: { canonical: `${SITE_URL}/register-now` },
  openGraph: {
    title: "Register Now | Arogya Sangoshthi 2026",
    description:
      "Book your delegate pass for India's most transformative healthcare conference. 21–23 August 2026, Pragati Maidan, New Delhi.",
    url: `${SITE_URL}/register-now`,
  },
};

// Rich Event schema with detailed registration offers
const registrationEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Arogya Sangoshthi 2026 — Delegate Registration",
  description:
    "Register as a delegate for Arogya Sangoshthi 2026 — India's premier 3-day international conference on Integrated Healthcare, AYUSH, Pharma, Wellness & Innovation.",
  url: `${SITE_URL}/register-now`,
  startDate: "2026-08-21",
  endDate: "2026-08-23",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: eventPlace,
  organizer: organizer,
  offers: [
    {
      "@type": "Offer",
      name: "Single Delegate Pass",
      description: "Full access to all 3-day conference sessions, workshops, and networking events",
      url: `${SITE_URL}/new-single-registration`,
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      priceCurrency: "INR",
      category: "delegate",
    },
    {
      "@type": "Offer",
      name: "Group Delegate Pass",
      description: "Group registration for 3+ delegates with discounted pricing",
      url: `${SITE_URL}/new-group-registration`,
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      priceCurrency: "INR",
      category: "group",
    },
  ],
};

const registerBreadcrumb = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Register Now", url: `${SITE_URL}/register-now` },
]);

export default function RegisterNow() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/register-now" />
      <JsonLd data={[registrationEventSchema, registerBreadcrumb]} />
      <div className="bg-[#fcfdfa] min-h-screen">
        <RegisterNowHero />
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Loading registration details...
            </div>
          }
        >
          <RegisterNowContent />
        </Suspense>
      </div>
    </Layout>
  );
}
