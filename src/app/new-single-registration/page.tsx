import React from 'react';
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import SingleDelegateForm from "@/components/new-single-registration/SingleDelegateForm";
import RegistrationSidebar from "@/components/new-single-registration/RegistrationSidebar";
import RegistrationFeatures from "@/components/new-single-registration/RegistrationFeatures";
import SectionContainer from "@/components/layout/SectionContainer";
import DecorativeBackground from "@/components/new-single-registration/DecorativeBackground";

export const metadata = {
  title: 'Delegate Registration - 18th Integrated Arogya Sangosthi',
  description: 'Register yourself as an individual delegate to participate in the conference.',
};

export default function SingleRegistrationPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-white pb-10 relative overflow-x-hidden">
        
        {/* Reusing existing Hero with the exact required UI */}
        <RegisterNowHero />

        {/* MAIN CONTENT (Grid) */}
        <SectionContainer className="relative z-10 -mt-12">
          <DecorativeBackground />
          <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            
            {/* LEFT COLUMN - FORM */}
            <div className="w-full lg:w-[64%]">
              <SingleDelegateForm />
            </div>

            {/* RIGHT COLUMN - SIDEBAR */}
            <div className="w-full lg:w-[36%]">
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
