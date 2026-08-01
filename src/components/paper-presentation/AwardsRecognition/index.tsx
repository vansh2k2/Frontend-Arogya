"use client";
import React from 'react';
import sleafIcon from '@/assets/icons/sleaf.png';
import p1Icon from '@/assets/icons/P1.png';
import x1 from '@/assets/icons/x1.png';
import x2 from '@/assets/icons/x2.png';
import x3 from '@/assets/icons/x3.png';
import x4 from '@/assets/icons/x4.png';
import j1 from '@/assets/icons/j1.png';
import { Trophy, Medal, Award, FileBadge } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';

const AwardsRecognition = () => {
  const awards = [
    { id: 1, title: 'Best Oral', subtitle: 'Presentation', img: x1 },
    { id: 2, title: 'Best Poster', subtitle: 'Presentation', img: x2 },
    { id: 3, title: 'Young Researcher Award', subtitle: '(Under 35)', img: x3 },
    { id: 4, title: 'Certificate of Participation', subtitle: 'for all presenters', img: x4 },
  ];

  return (
    <section className="w-full bg-white pt-2 pb-4 md:pt-4 md:pb-6 -mt-6 md:-mt-10 relative z-20">
      <SectionContainer>
        
        {/* Header */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <img src={p1Icon?.src || p1Icon} alt="P1" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <h2 className="text-[#032e1c] font-inter font-semibold text-2xl md:text-2xl uppercase tracking-wider text-center">
            AWARDS & RECOGNITION
          </h2>
          <img src={p1Icon?.src || p1Icon} alt="P1" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1 w-full -mt-4 lg:-mt-8">
            {awards.map((award) => (
              <div 
                key={award.id}
                className="bg-[#f9f6ef] border border-[#e8ebd9] rounded-2xl px-4 py-3 md:px-2 md:py-3 lg:px-4 flex flex-col items-center justify-center text-center gap-2 md:gap-3 h-full"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#eef1e6] flex items-center justify-center shrink-0 border border-[#e1e6d3] shadow-sm">
                  <img src={award.img?.src || award.img} alt={award.title} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                </div>
                <h3 className="text-[#032e1c] font-semibold text-[13px] md:text-sm leading-tight flex flex-col items-center justify-center w-full">
                  <span className="whitespace-nowrap">{award.title}</span>
                  <span className="whitespace-nowrap">{award.subtitle}</span>
                </h3>
              </div>
            ))}
          </div>

          {/* Right Image/Graphic (Optional if an exact image isn't available) */}
          <img src={j1?.src || j1} alt="Award Graphic" className="hidden xl:block w-64 md:w-72 h-auto object-contain shrink-0 -mt-4 lg:-mt-8" />

        </div>

      </SectionContainer>
    </section>
  );
};

export default AwardsRecognition;

