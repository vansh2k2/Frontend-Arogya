"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import GroupDelegateForm from "@/components/new-group-registration/GroupDelegateForm";
import RegistrationSidebar from "@/components/new-group-registration/RegistrationSidebar";
import RegistrationFeatures from "@/components/new-group-registration/RegistrationFeatures";
import SectionContainer from "@/components/layout/SectionContainer";
import DecorativeBackground from "@/components/new-single-registration/DecorativeBackground";

export default function NewGroupRegistration() {
  const [delegateCount, setDelegateCount] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPass, setSelectedPass] = useState<string | null>(null);

  return (
    <Layout>
      <div className="min-h-screen bg-white pb-10 relative overflow-x-hidden">

        {/* Reusing existing Hero with the exact required UI */}
        <RegisterNowHero />

        {/* MAIN CONTENT (Exact 64% / 36% Flex Layout matching Single Registration) */}
        <SectionContainer className="relative z-10 -mt-12">
          <DecorativeBackground isSuccess={isSuccess} />
          <div className="flex flex-col lg:flex-row gap-8 relative z-10">

            {/* LEFT COLUMN - FORM (64% or full width on success) */}
            <div className={isSuccess ? "w-full" : "w-full lg:w-[64%]"}>
              <GroupDelegateForm
                onGroupMembersChange={(count) => setDelegateCount(count)}
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
                selectedPass={selectedPass}
                setSelectedPass={setSelectedPass}
              />
            </div>

            {/* RIGHT COLUMN - SIDEBAR (36%) (Hidden on registration success) */}
            {!isSuccess && (
              <div className="w-full lg:w-[36%]">
                <RegistrationSidebar
                  delegateCount={delegateCount}
                  selectedPass={selectedPass}
                  onSelectPass={(passId: string) => setSelectedPass(passId)}
                />
              </div>
            )}

          </div>
        </SectionContainer>

        {/* BOTTOM BANNER: YOUR REGISTRATION INCLUDES (Hidden on registration success) */}
        {!isSuccess && (
          <SectionContainer className="mt-0">
            <RegistrationFeatures />
          </SectionContainer>
        )}

      </div>
    </Layout>
  );
}
