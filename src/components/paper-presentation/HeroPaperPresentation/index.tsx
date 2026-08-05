"use client";
import React from 'react';
import paperBg from '@/assets/banner/paper.webp';
import mainIcon from '@/assets/icons/main.webp';
import { FileText } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';

const HeroPaperPresentation = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[380px] lg:h-[480px] bg-[#fdfaf5] flex items-center">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${paperBg?.src || paperBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 relative z-10 -mt-6">
        <div className="max-w-xl">
          
          <div className="flex flex-col mb-4 md:ml-8">
            <p className="text-[#032e1c] font-bold text-xs md:text-sm tracking-[0.15em] uppercase mb-4 ml-2">
              SHARE KNOWLEDGE. INSPIRE CHANGE.
            </p>
            
            <h1 className="flex flex-col leading-none mb-2">
              <span className="text-[#0c290d] font-serif font-bold text-4xl md:text-5xl lg:text-[64px] tracking-tight mb-2">Paper</span>
              <span className="text-[#b6811a] font-serif font-bold text-4xl md:text-5xl lg:text-[64px] tracking-tight">Presentation</span>
            </h1>

            <div className="flex items-center gap-4 mt-0">
              <div className="h-[2px] w-12 md:w-16 bg-[#cba344]"></div>
              <img src={mainIcon?.src || mainIcon} alt="decoration" className="h-6 w-auto object-contain" />
            </div>
          </div>
          
          <p className="text-black text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mt-4 font-inter md:ml-8">
            A platform for researchers, academicians, practitioners<br />
            and students to showcase innovative ideas, original<br />
            research and best practices that contribute to the<br />
            future of healthcare and wellness.
          </p>
        </div>
      </div>
      
      {/* Floating Circular Badge */}
      <div className="hidden md:flex absolute bottom-4 lg:bottom-1 right-[260px] lg:right-[480px] xl:right-[560px] w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#032e1c] border-2 border-[#cba344] z-20 shadow-xl flex-col items-center justify-center p-3 lg:p-4 text-center">
        <FileText size={32} className="text-white mb-1.5 lg:mb-2" strokeWidth={1.5} />
        <p className="text-white font-bold text-xs lg:text-sm leading-snug">
          Present Your<br />Research.<br />Create Impact.
        </p>
      </div>
      
    </section>
  );
};

export default HeroPaperPresentation;

