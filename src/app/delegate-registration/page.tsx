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

const DelegateRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Layout>
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
