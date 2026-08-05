"use client";
import React, { useState } from "react";
import DelegateHero from "@/components/delegate/delegate-registration/DelegateHero";
import RegistrationStepper from "@/components/delegate/delegate-registration/RegistrationStepper";
import DelegateFooter from "@/components/delegate/delegate-registration/DelegateFooter";
import DelegateInfoSections from "@/components/delegate/delegate-registration/DelegateInfoSections";
import DelegateCommittees from "@/components/delegate/delegate-registration/DelegateCommittees";
import RegistrationFees from "@/components/delegate/delegate-registration/RegistrationFees";

// All client-side state lives here — page.tsx can stay as a Server Component
const DelegateRegistrationClient = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter overflow-x-hidden">
      {/* Hero Section */}
      <DelegateHero />

      {/* Main Content Area */}
      <main className="flex-grow bg-[#F8FAFC]/30">
        {/* Stepper Container */}
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
  );
};

export default DelegateRegistrationClient;
