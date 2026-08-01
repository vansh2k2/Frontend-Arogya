"use client";
import React from "react";
import { CheckCircle, ArrowRight, HelpCircle, Mail, Phone } from "lucide-react";

import Image from "next/image";
import feesIcon from "../../assets/icons/fees.png";

const RegistrationSidebar = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white overflow-visible relative mt-4" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex justify-center w-full">
          <Image src={feesIcon} alt="Registration Fees" className="h-10 w-auto object-contain" />
        </div>
        
        <div className="flex flex-col gap-4 p-5 pt-8">
        
        <div className="bg-[#fffdf5] border-2 border-[#d18e26] rounded-xl p-5 relative group scale-[1.02] transform" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d18e26] text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
            Group Pass (10+ Delegates)
          </div>
          <div className="flex justify-between items-start mb-3 mt-2">
            <h3 className="font-semibold text-[#7a4e0c] text-lg uppercase w-2/3 leading-tight">Corporate Pass <br/><span className="text-sm">(3 Days)</span></h3>
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block mb-0.5">PRICE</span>
              <span className="text-xl font-black text-[#d18e26]">?2,500<span className="text-xs font-normal">/person</span></span>
            </div>
          </div>
          <ul className="flex flex-col gap-2 mb-5">
            <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> All 3 Days Access</li>
            <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> Dedicated Group Registration Desk</li>
            <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> E-certificates for all members</li>
          </ul>
          <button className="w-full bg-[#d18e26] text-white hover:bg-[#b0741c] font-bold py-2.5 rounded-lg text-sm transition-colors flex justify-center items-center gap-2 shadow-sm">
            Select Group Pass <ArrowRight size={16} />
          </button>
        </div>

        <div className="bg-[#f5f6ee] border-2 border-gray-100 hover:border-[#2b5922] rounded-xl p-5 transition-all hover:shadow-md group relative mt-2" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-[#113111] text-lg uppercase w-2/3 leading-tight">Student Group <br/><span className="text-sm">(20+ Delegates)</span></h3>
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block mb-0.5">PRICE</span>
              <span className="text-xl font-black text-[#2b5922]">?800<span className="text-xs font-normal">/person</span></span>
            </div>
          </div>
          <ul className="flex flex-col gap-2 mb-5">
            <li className="flex gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-[#2b5922] shrink-0 mt-0.5" /> Full-day Access</li>
            <li className="flex gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-[#2b5922] shrink-0 mt-0.5" /> Faculty Coordinator Free</li>
            <li className="flex gap-2 text-sm text-gray-600"><CheckCircle size={16} className="text-[#2b5922] shrink-0 mt-0.5" /> Student Kits</li>
          </ul>
          <button className="w-full bg-[#f0f7f0] text-[#2b5922] group-hover:bg-[#2b5922] group-hover:text-white font-bold py-2.5 rounded-lg text-sm transition-colors flex justify-center items-center gap-2">
            Select Student Pass <ArrowRight size={16} />
          </button>
        </div>

      </div>
      </div>

      {/* NEED HELP BOX */}
      <div className="bg-[#1a3813] text-white rounded-xl p-6 shadow-xl relative overflow-hidden mt-2">
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <HelpCircle size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 font-inter"><HelpCircle size={20} className="text-[#d18e26]" /> Need Help?</h3>
          <p className="text-sm text-white/80 mb-5">Our support team is here to assist you with any registration queries.</p>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
              <Mail size={18} className="text-[#d18e26]" />
              <span className="text-sm font-medium">info@arogyasangosthi.com</span>
            </div>
            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
              <Phone size={18} className="text-[#d18e26]" />
              <span className="text-sm font-medium">+91 9654900525</span>
            </div>
          </div>
          <p className="text-xs text-white/60 mt-4 text-center">Mon - Sat: 9:00 AM - 6:00 PM (IST)</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSidebar;
