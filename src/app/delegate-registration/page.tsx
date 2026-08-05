"use client";
import React, { useState } from "react";
import DelegateHero from "@/components/delegate/delegate-registration/DelegateHero";
import RegistrationStepper from "@/components/delegate/delegate-registration/RegistrationStepper";
import SessionSelection from "@/components/delegate/delegate-registration/SessionSelection";
import RegistrationSidebar from "@/components/delegate/delegate-registration/RegistrationSidebar";
import DelegateFooter from "@/components/delegate/delegate-registration/DelegateFooter";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import DelegateInfoSections from "@/components/delegate/delegate-registration/DelegateInfoSections";
import DelegateCommittees from "@/components/delegate/delegate-registration/DelegateCommittees";
import RegistrationFees from "@/components/delegate/delegate-registration/RegistrationFees";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, SITE_URL, eventPlace, organizer } from "@/lib/schemas";
import DynamicSeoHead from "@/components/DynamicSeoHead";

const delegatePageSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Arogya Sangoshthi 2026 — Delegate Registration",
  url: `${SITE_URL}/delegate-registration`,
  startDate: "2026-08-21",
  endDate: "2026-08-23",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: eventPlace,
  organizer: organizer,
  offers: {
    "@type": "Offer",
    name: "Delegate Registration Pass",
    url: `${SITE_URL}/delegate-registration`,
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
  },
};

const delegateBreadcrumb = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Delegate Registration", url: `${SITE_URL}/delegate-registration` },
]);

const DelegateRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Layout>
      <DynamicSeoHead pagePath="/delegate-registration" />
      <JsonLd data={[delegatePageSchema, delegateBreadcrumb]} />
      <div className="min-h-screen bg-white flex flex-col font-inter overflow-x-hidden">
        {/* Hero Section */}
        <DelegateHero />

        {/* Main Content Area */}
        <main className="flex-grow bg-[#F8FAFC]/30">
          {/* Stepper Container - Compact py-4 */}
          <div className="bg-white border-b border-gray-100 py-1 -mt-4 relative z-10">
            <RegistrationStepper currentStep={currentStep} />
          </div>
        </main>

        {/* Info Sections (Themes, Why Attend, Speakers) */}
        <div className="relative z-10 bg-white">
          <DelegateInfoSections middleComponent={<RegistrationFees />} />
          <DelegateCommittees />
        </div>

        {/* Footer */}
        <div className="-mt-6 relative z-20">
          <DelegateFooter />
        </div>
      </div>
    </Layout>
  );
};

export default DelegateRegistration;
