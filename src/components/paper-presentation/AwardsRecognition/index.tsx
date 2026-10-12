"use client";
import React from 'react';
import p1Icon from '@/assets/icons/P1.png';
import x1 from '@/assets/icons/x1.png';
import x2 from '@/assets/icons/x2.png';
import x3 from '@/assets/icons/x3.png';
import x4 from '@/assets/icons/x4.png';
import j1 from '@/assets/icons/j1.png';
import SectionContainer from '@/components/layout/SectionContainer';
import type { PaperAwardsData } from '@/lib/fetchPaperPresentation';

/* Built-in content — shown when the admin-managed section (GET /api/paper-awards) is not available */
const DEFAULT_AWARDS = [
  { title: 'Best Oral\nPresentation', icon: x1.src },
  { title: 'Best Poster\nPresentation', icon: x2.src },
  { title: 'Young Researcher Award\n(Under 35)', icon: x3.src },
  { title: 'Certificate of Participation\nfor all presenters', icon: x4.src },
];

const AwardsRecognition = ({ data }: { data?: PaperAwardsData | null }) => {
  const heading = data?.heading || 'AWARDS & RECOGNITION';
  const awards = data ? data.awards ?? [] : DEFAULT_AWARDS;
  // With saved data an image left empty is hidden; without data the built-in images show
  const headingIcon = data ? data.headingIcon || '' : p1Icon.src;
  const headingIconAlt = data?.headingIconAlt || 'Green leaf sprig decoration';
  const graphic = data ? data.graphic || '' : j1.src;
  const graphicAlt = data?.graphicAlt || 'Award Graphic';

  return (
    <section className="w-full bg-white pt-2 pb-4 md:pt-4 md:pb-6 -mt-6 md:-mt-10 relative z-20">
      <SectionContainer>

        {/* Header */}
        <div className="flex justify-center items-center gap-4 mb-10">
          {headingIcon && <img src={headingIcon} alt={headingIconAlt} className="w-8 h-8 md:w-10 md:h-10 object-contain" />}
          <h2 className="text-[#032e1c] font-inter font-semibold text-2xl md:text-2xl uppercase tracking-wider text-center">
            {heading}
          </h2>
          {headingIcon && <img src={headingIcon} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />}
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1 w-full -mt-4 lg:-mt-8">
            {awards.map((award, index) => {
              const lines = award.title.split('\n');
              return (
                <div
                  key={index}
                  className="bg-[#f9f6ef] border border-[#e8ebd9] rounded-2xl px-4 py-3 md:px-2 md:py-3 lg:px-4 flex flex-col items-center justify-center text-center gap-2 md:gap-3 h-full"
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                >
                  {award.icon && (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#eef1e6] flex items-center justify-center shrink-0 border border-[#e1e6d3] shadow-sm">
                      <img src={award.icon} alt={award.iconAlt || lines.join(' ')} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                    </div>
                  )}
                  <h3 className="text-[#032e1c] font-semibold text-[13px] md:text-sm leading-tight flex flex-col items-center justify-center w-full">
                    {lines.map((line, i) => (
                      <span key={i} className="whitespace-nowrap">
                        {line}
                        {i < lines.length - 1 && ' '}
                      </span>
                    ))}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right graphic */}
          {graphic && (
            <img src={graphic} alt={graphicAlt} className="hidden xl:block w-64 md:w-72 h-auto object-contain shrink-0 -mt-4 lg:-mt-8" />
          )}

        </div>

      </SectionContainer>
    </section>
  );
};

export default AwardsRecognition;
