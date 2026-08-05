"use client";
import React from 'react';
import { Leaf } from 'lucide-react';
import fe1Icon from '@/assets/icons/fe1.png';
import mainLogo from '@/assets/icons/main.webp';
import aboutImage from '@/assets/about1.jpg'; // Using placeholder for nature image
import leafLeft from '@/assets/icons/leafs.png';
import SectionContainer from '@/components/layout/SectionContainer';

const AboutNamoGange = () => {
  return (
    <section className="-mt-2 md:-mt-4 pb-2 md:pb-4 bg-[#f8f7f3] relative z-10 overflow-hidden">
      {/* Decorative Left Leaf */}
      <img 
        src={leafLeft?.src || leafLeft} 
        alt="Decorative leaves" 
        className="absolute left-[-20px] md:left-[-40px] lg:left-[-60px] top-1/4 w-32 md:w-48 lg:w-64 opacity-70 z-0 pointer-events-none"
      />
      
      <SectionContainer className="relative z-10">
        {/* Main Card Container */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0 relative">
          
          {/* Left Section: Text Content */}
          <div className="lg:w-[50%] flex flex-col justify-start pt-2 md:pt-4 pr-0 lg:pr-12">
            <h2 className="text-[#00281a] font-serif text-xl md:text-2xl lg:text-[23px] font-bold uppercase mb-2 whitespace-nowrap">
              ABOUT NAMO GANGE TRUST
            </h2>
            <h3 className="text-[#F3B71B] font-inter font-semibold tracking-wide text-[13px] md:text-[15px] mb-2 md:mb-3">
              The Parent Organization Behind Arogya Sanghosthi
            </h3>
            
            <p className="text-black font-medium text-[12px] md:text-[13px] leading-[1.8] mb-4 md:mb-5">
              Namo Gange Trust is a registered non-profit organization committed to promoting
              holistic health, wellness and sustainability through integrated healthcare initiatives.
              Arogya Sanghosthi is its flagship mission that brings together healthcare leaders,
              experts and changemakers to shape a healthier and sustainable India.
            </p>
            
            <ul className="space-y-2 md:space-y-2.5">
              {[
                "Established with a vision for healthier communities",
                "Working across India through impactful initiatives",
                "Driven by values of service, compassion and sustainability"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 md:gap-4">
                  <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0">
                    <img src={fe1Icon?.src || fe1Icon} alt="bullet" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-black font-medium text-[11px] md:text-[12.5px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Section: Image and Mission/Vision Card */}
          <div className="lg:w-[50%] flex">
            <div className="w-full rounded-2xl md:rounded-[1.5rem] overflow-hidden relative shadow-lg h-[320px] md:h-[360px] lg:h-auto min-h-[320px]">
              {/* Background Image */}
              <img 
                src={aboutImage?.src || aboutImage} 
                alt="Nature River Landscape" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Bottom Overlay Card */}
              <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-12 md:right-24 lg:right-32 bg-[#00281a]/60 rounded-xl md:rounded-2xl px-4 md:px-6 py-2 md:py-3 text-white shadow-2xl border border-white/10">
                <div className="mb-2 md:mb-3">
                  <h4 className="font-serif font-bold text-[15px] md:text-lg mb-0.5 md:mb-1">Our Vision</h4>
                  <p className="text-white/90 text-[11px] md:text-[12px] leading-relaxed">
                    Healthy People. Healthy Communities. Sustainable Future.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[15px] md:text-lg mb-1 md:mb-1.5">Our Mission</h4>
                  <p className="text-white/85 text-[11px] md:text-[12px] leading-relaxed">
                    To promote holistic health, wellness and sustainability through<br className="hidden md:block" />
                    integrated healthcare, education, research, community<br className="hidden md:block" />
                    empowerment and environmental stewardship.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </SectionContainer>
    </section>
  );
};

export default AboutNamoGange;
