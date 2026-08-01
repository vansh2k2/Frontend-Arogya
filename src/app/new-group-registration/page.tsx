import React from "react";
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import GroupDelegateForm from "@/components/new-group-registration/GroupDelegateForm";
import RegistrationSidebar from "@/components/new-group-registration/RegistrationSidebar";
import RegistrationFeatures from "@/components/new-group-registration/RegistrationFeatures";
import SectionContainer from "@/components/layout/SectionContainer";

export const metadata = {
  title: "Group Registration | IHWE 2026",
};

export default function NewGroupRegistration() {
  return (
    <Layout>
      <div className="min-h-screen bg-white pb-10 relative overflow-x-hidden">
        
        {/* Reusing existing Hero with the exact required UI */}
        <RegisterNowHero />

        {/* MAIN CONTENT (Grid) */}
        <SectionContainer className="relative z-10 -mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN - FORM */}
            <div className="lg:col-span-8">
              <GroupDelegateForm />
            </div>

            {/* RIGHT COLUMN - SIDEBAR */}
            <div className="lg:col-span-4">
              <RegistrationSidebar />
            </div>

          </div>
        </SectionContainer>

        {/* BOTTOM BANNER: YOUR REGISTRATION INCLUDES */}
        <SectionContainer className="mt-0">
          <RegistrationFeatures />
        </SectionContainer>

      </div>
    </Layout>
  );
}
