"use client";
import React from "react";
import { Award, Network, Globe, Coffee } from "lucide-react";
import Image from "next/image";
import arrowIcon from "@/assets/icons/arrow.png";

const RegistrationFeatures = () => {
  return (
    <div className="max-w-7xl w-full mx-auto mt-4 bg-white shadow-sm border border-[#e2f0e2] rounded-2xl p-8 lg:p-12">
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-10">
        <Image src={arrowIcon} className="w-8 h-8 md:w-10 md:h-10 object-contain" alt="arrow left" />
        <h2 className="text-center text-[#133513] text-xl md:text-2xl font-bold font-serif uppercase tracking-wide m-0">
          Your Registration Includes
        </h2>
        <Image src={arrowIcon} className="w-8 h-8 md:w-10 md:h-10 object-contain -scale-x-100" alt="arrow right" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Award size={32} />
          </div>
          <h4 className="font-inter font-semibold text-[#113111] uppercase tracking-wide text-xs md:text-sm">Certificate of<br/>Participation</h4>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Network size={32} />
          </div>
          <h4 className="font-inter font-semibold text-[#113111] uppercase tracking-wide text-xs md:text-sm">Network with<br/>Experts</h4>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Globe size={32} />
          </div>
          <h4 className="font-inter font-semibold text-[#113111] uppercase tracking-wide text-xs md:text-sm">Access to<br/>International Expo</h4>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Coffee size={32} />
          </div>
          <h4 className="font-inter font-semibold text-[#113111] uppercase tracking-wide text-xs md:text-sm">Lunch &<br/>Refreshments</h4>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFeatures;
