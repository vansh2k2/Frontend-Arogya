"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import SectionContainer from "@/components/layout/SectionContainer";

const SingleDelegateForm = dynamic(() => import("@/components/new-single-registration/SingleDelegateForm"), { ssr: false });
const RegistrationSidebar = dynamic(() => import("@/components/new-single-registration/RegistrationSidebar"), { ssr: false });
const RegistrationFeatures = dynamic(() => import("@/components/new-single-registration/RegistrationFeatures"), { ssr: false });
const DecorativeBackground = dynamic(() => import("@/components/new-single-registration/DecorativeBackground"), { ssr: false });

export default function SingleRegistrationPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPass, setSelectedPass] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const handleSelectPass = (passId: string) => {
    setSelectedPass(passId);
    if (passId === 'delegate3days') {
      setSelectedDays([1, 2, 3]);
    } else {
      setSelectedDays([1]);
    }
  };

  const handleToggleDay = (dayNum: number) => {
    // We handle this via select dropdown now for single day passes
    setSelectedDays([dayNum]);
  };

  return (
    <Layout>
      <div className="w-full bg-white pb-10 relative">
        
        {/* Reusing existing Hero */}
        <RegisterNowHero />

        {/* MAIN CONTENT */}
        <SectionContainer className="relative z-10 -mt-12">
          <DecorativeBackground isSuccess={isSuccess} />
          <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            
            {/* FORM / THANK YOU CARD CONTAINER - Takes full width when isSuccess is true */}
            <div className={isSuccess ? "w-full" : "w-full lg:w-[64%]"}>
              <SingleDelegateForm 
                isSuccess={isSuccess} 
                setIsSuccess={setIsSuccess} 
                selectedPass={selectedPass}
                setSelectedPass={setSelectedPass}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
              />
            </div>

            {/* RIGHT COLUMN - SIDEBAR (Hidden on registration success) */}
            {!isSuccess && (
              <div className="w-full lg:w-[36%]">
                <RegistrationSidebar 
                  selectedPass={selectedPass}
                  onSelectPass={handleSelectPass}
                  selectedDays={selectedDays}
                  onToggleDay={handleToggleDay}
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
