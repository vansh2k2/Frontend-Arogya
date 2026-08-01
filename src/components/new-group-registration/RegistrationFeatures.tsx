"use client";
import React from "react";
import { Award, Network, Globe, Coffee } from "lucide-react";

const RegistrationFeatures = () => {
  return (
    <div className="max-w-7xl w-full mx-auto mt-16 bg-white shadow-sm border border-[#e2f0e2] rounded-2xl p-8 lg:p-12">
      <h2 className="text-center text-[#113111] text-2xl font-black uppercase tracking-wide mb-10">
        Your Registration Includes
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Award size={32} />
          </div>
          <h4 className="font-bold text-gray-800 text-sm md:text-base">Certificate of<br/>Participation</h4>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Network size={32} />
          </div>
          <h4 className="font-bold text-gray-800 text-sm md:text-base">Network with<br/>Experts</h4>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Globe size={32} />
          </div>
          <h4 className="font-bold text-gray-800 text-sm md:text-base">Access to<br/>International Expo</h4>
        </div>
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-[#f0f7f0] text-[#2b5922] rounded-full flex items-center justify-center mb-2 shadow-sm border border-[#d6ecd6]">
            <Coffee size={32} />
          </div>
          <h4 className="font-bold text-gray-800 text-sm md:text-base">Lunch &<br/>Refreshments</h4>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFeatures;
