"use client";
import React from 'react';
import bleaf from '@/assets/icons/bleaf.png';
import w1 from '@/assets/icons/w1.png';
import w2 from '@/assets/icons/w2.png';
import w3 from '@/assets/icons/w3.png';
import w4 from '@/assets/icons/w4.png';
import w5 from '@/assets/icons/w5.png';
import SectionContainer from '@/components/layout/SectionContainer';

const WhyChoosePaper = () => {
  const features = [
    { id: 1, title: 'Interdisciplinary\nPlatform', image: w1 },
    { id: 2, title: 'Expert Review &\nFeedback', image: w2 },
    { id: 3, title: 'High Visibility\n& Networking', image: w3 },
    { id: 4, title: 'Publication\nOpportunities*', image: w4 },
    { id: 5, title: 'Career Growth\n& Recognition', image: w5 },
  ];

  return (
    <section className="w-full bg-[#fbfcf7] pb-8 pt-2 md:pt-4 -mt-2 md:-mt-4 relative z-10">
      <SectionContainer>
        <div className="w-full bg-[#032e1c] rounded-2xl flex flex-col lg:flex-row items-center justify-between px-4 pt-3 pb-2 sm:px-6 sm:pt-4 sm:pb-3 lg:px-8 lg:pt-5 lg:pb-3 overflow-hidden shadow-lg border border-[#043b24] relative">
        
        {/* LEFT BLOCK: FEATURES */}
        <div className="flex-1 w-full lg:pr-8 mb-8 lg:mb-0 relative">
          <div className="flex justify-center mb-4 relative">
             <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#cba344]/50 to-transparent -z-10"></div>
             <h3 className="text-white font-inter font-bold text-base sm:text-lg md:text-xl uppercase tracking-wider bg-[#032e1c] px-4 text-center">
               WHY CHOOSE AROGYA SANGHOSTHI FOR YOUR RESEARCH?
             </h3>
          </div>

          <div className="flex flex-row justify-between items-center w-full mt-0 md:-mt-2">
            {features.map((feature, index) => (
              <React.Fragment key={feature.id}>
                <div className="flex flex-col items-center text-center gap-3 flex-1">
                  <img src={feature.image?.src || feature.image} alt="icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain" />
                  <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm font-medium whitespace-pre-line leading-snug">
                    {feature.title}
                  </p>
                </div>
                {index < features.length - 1 && (
                  <div className="h-12 sm:h-16 md:h-20 w-[1px] bg-gradient-to-b from-transparent via-[#cba344]/50 to-transparent mx-1 sm:mx-2 md:mx-4"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-[#cba344] text-[9px] sm:text-[10px] text-center mt-6">
            * Selected papers may be considered for publication in our partner journals.
          </p>
        </div>

        {/* RIGHT BLOCK: CTA CARD */}
        <div className="w-full lg:w-[400px] xl:w-[450px] bg-[#fbfcf7] rounded-2xl p-4 md:py-6 md:px-8 flex flex-col justify-center relative shadow-md flex-shrink-0 overflow-hidden">
          {/* Decorative leaf */}
          <img src={bleaf?.src || bleaf} alt="decoration" className="absolute bottom-0 right-0 w-20 sm:w-28 pointer-events-none" />
          
          <div className="relative z-10">
            <p className="text-gray-900 text-sm sm:text-base font-medium mb-3">
              Be a part of insightful sessions and<br />meaningful discussions.
            </p>
            <h2 className="text-[#0c290d] font-inter font-semibold text-xl sm:text-2xl md:text-2xl leading-tight">
              Share your research.<br />Make an impact!
            </h2>
          </div>
        </div>

        </div>
      </SectionContainer>
    </section>
  );
};

export default WhyChoosePaper;

