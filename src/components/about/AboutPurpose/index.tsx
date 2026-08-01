"use client";
import React from 'react';
import { BookOpen, Users, Globe, MonitorPlay } from 'lucide-react';
import parliamentImg from '@/assets/about2.jpg'; 
import SectionContainer from '@/components/layout/SectionContainer';

const AboutPurpose = () => {
  return (
    <section className="py-16 bg-white">
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-center bg-[#faf8f4] lg:bg-transparent rounded-3xl lg:rounded-none overflow-hidden">
          
          {/* Left Content */}
          <div className="p-8 lg:p-12 lg:bg-[#faf8f4] lg:rounded-l-3xl border-t border-b border-l border-[#e2d4b7]/50 lg:border-r-0 lg:-mr-10 relative z-10 lg:shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)]">
            <h4 className="text-[#cba344] font-bold tracking-widest text-sm uppercase mb-4">ABOUT US</h4>
            <h2 className="font-poppins text-3xl md:text-5xl font-bold text-[#032e1c] leading-tight mb-6">
              Our Purpose.<br />
              Our Promise. Our Planet.
            </h2>
            
            <div className="flex items-center mb-6 w-full max-w-xs">
              <div className="h-[2px] bg-[#cba344]/40 flex-1"></div>
              <div className="text-[#cba344] px-4 text-2xl">❁</div>
              <div className="h-[2px] bg-[#cba344]/40 flex-1"></div>
            </div>
            
            <p className="text-gray-800 font-medium mb-10 leading-relaxed text-sm md:text-base">
              Arogya Sangoshthi is India's Premier Integrated Healthcare Conference
              uniting Modern Medicine, AYUSH, Technology and Traditional Wisdom
              for a healthier tomorrow.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="text-[#032e1c] mb-2" size={32} strokeWidth={1.5} />
                <span className="font-bold text-[#cba344] text-lg">18+</span>
                <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Editions</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="text-[#032e1c] mb-2" size={32} strokeWidth={1.5} />
                <span className="font-bold text-[#cba344] text-lg">1000+</span>
                <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Delegates</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="text-[#032e1c] mb-2" size={32} strokeWidth={1.5} />
                <span className="font-bold text-[#cba344] text-lg">25+</span>
                <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Countries</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <MonitorPlay className="text-[#032e1c] mb-2" size={32} strokeWidth={1.5} />
                <span className="font-bold text-[#cba344] text-lg">100+</span>
                <span className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">Sessions</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-full min-h-[400px] w-full relative lg:rounded-r-3xl overflow-hidden lg:rounded-tl-[80px]">
            <img 
              src={parliamentImg?.src || parliamentImg} 
              alt="Our Purpose" 
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      </SectionContainer>
    </section>
  );
};

export default AboutPurpose;
