"use client";
import React from 'react';
import { Send } from 'lucide-react';
import ss1 from '@/assets/icons/ss1.png';
import ss2 from '@/assets/icons/ss2.png';
import SectionContainer from '@/components/layout/SectionContainer';

const BlogNewsletterBanner = () => {
  return (
    <SectionContainer className="pt-4 pb-6 font-inter">
      <div className="bg-[#002d20] rounded-2xl relative overflow-hidden py-5 px-8 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Background decorative elements */}
        <img src={ss1?.src || ss1} alt="" className="absolute bottom-0 left-0 w-[90px] md:w-[110px] object-contain pointer-events-none" />
        <img src={ss2?.src || ss2} alt="" className="absolute top-0 right-0 w-[90px] md:w-[110px] object-contain pointer-events-none" />

        <div className="relative z-10 text-white max-w-xl md:ml-16 lg:ml-28">
          <p className="text-emerald-100 text-sm font-semibold tracking-wide uppercase mb-2">
            Be a part of insightful sessions and meaningful discussions.
          </p>
          <h2 className="font-inter text-xl md:text-2xl font-bold whitespace-nowrap">
            Subscribe to our newsletter and stay ahead!
          </h2>
        </div>

        <div className="relative z-10 w-full md:w-auto flex-1 max-w-sm md:mr-8 lg:mr-16">
          <div className="flex w-full bg-white rounded-lg overflow-hidden p-1">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-3 py-1.5 text-xs text-gray-800 outline-none"
            />
            <button className="bg-[#e87a2c] hover:bg-[#d4661c] transition-colors px-5 py-2 rounded-md text-white text-xs font-bold flex items-center gap-2">
              SUBSCRIBE <Send size={12} />
            </button>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
};

export default BlogNewsletterBanner;

