"use client";
import React from 'react';
import P1Icon from '@/assets/icons/P1.png';
import dleafIcon from '@/assets/icons/dleaf.png';
import d1 from '@/assets/icons/d1.png';
import d2 from '@/assets/icons/d2.png';
import d3 from '@/assets/icons/d3.png';
import d4 from '@/assets/icons/d4.png';
import d5 from '@/assets/icons/d5.png';
import SectionContainer from '@/components/layout/SectionContainer';
import type { PaperDate, PaperImportantDatesData } from '@/lib/fetchPaperPresentation';

/* Built-in content — shown when the admin-managed section (GET /api/paper-important-dates) is not available */
const DEFAULT_DATES: PaperDate[] = [
  { label: 'Abstract Submission\nStarts', date: '25 May 2026', icon: d1.src },
  { label: 'Last Date for\nAbstract Submission', date: '25 July 2026', icon: d2.src },
  { label: 'Acceptance\nNotification', date: '10 August 2026', icon: d3.src },
  { label: 'Full Paper Submission\n(If Selected)', date: '25 August 2026', icon: d4.src },
  { label: 'Presentation\nDates', date: '10 - 12 Oct 2026', icon: d5.src },
];
const DEFAULT_REASONS = [
  'Share your innovative research with a global audience',
  'Receive valuable feedback from experts',
  'Enhance your academic and professional profile',
  'Contribute to evidence-based healthcare solutions',
];

const ImportantDatesPaper = ({ data }: { data?: PaperImportantDatesData | null }) => {
  const heading = data?.heading || 'IMPORTANT DATES';
  const dates = data ? data.dates ?? [] : DEFAULT_DATES;
  const whyHeading = data ? data.whyHeading || '' : 'WHY PRESENT?';
  const reasons = data ? (data.reasons ?? []).map((r) => r.text) : DEFAULT_REASONS;
  // With saved data an image left empty is hidden; without data the built-in images show
  const headingIcon = data ? data.headingIcon || '' : P1Icon.src;
  const headingIconAlt = data?.headingIconAlt || 'Green leaf sprig decoration';
  const leaf = data ? data.whyLeafImage || '' : dleafIcon.src;
  const leafAlt = data?.whyLeafImageAlt || 'Green leaf vine decoration';

  return (
    <section className="w-full bg-[#fbfcf7] pt-0 pb-12 md:pt-2 md:pb-12">
      <SectionContainer className="flex flex-col lg:flex-row gap-6">

        {/* LEFT COLUMN: IMPORTANT DATES */}
        <div className="flex-[3] bg-[#032212] rounded-2xl px-6 pb-6 pt-2 md:px-10 md:pb-10 md:pt-4 text-white relative overflow-hidden shadow-lg border border-[#043b24]">

          <div className="flex items-center justify-center gap-3 mb-6">
            {headingIcon && <img src={headingIcon} alt={headingIconAlt} className="w-8 md:w-10 h-auto object-contain" />}
            <h2 className="text-xl md:text-2xl font-semi  bold font-inter uppercase tracking-wider text-center">
              {heading}
            </h2>
            {headingIcon && <img src={headingIcon} alt="" className="w-8 md:w-10 h-auto object-contain" />}
          </div>

          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 relative z-10">
              {dates.map((item, index) => {
                const [line1, ...rest] = item.label.split('\n');
                return (
                  <div key={index} className="flex flex-col items-center text-center w-full md:w-1/5 relative">

                    {/* Icon Area */}
                    <div className="w-full flex justify-center relative mb-6">
                      {item.icon ? (
                        <img src={item.icon} alt={item.iconAlt || `${item.label.replace(/\n/g, ' ')} icon`} className="w-16 h-16 object-contain relative z-10" />
                      ) : (
                        <div className="w-16 h-16" />
                      )}
                      {/* Dashed Line with Dots connecting to next icon */}
                      {index < dates.length - 1 && (
                        <div className="hidden md:flex absolute top-1/2 left-[50%] w-full items-center z-0 px-9">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#cba344] shrink-0"></div>
                           <div className="flex-1 h-[1px] border-t border-dashed border-[#cba344]/70 mx-1"></div>
                           <div className="w-1.5 h-1.5 rounded-full bg-[#cba344] shrink-0"></div>
                        </div>
                      )}
                    </div>

                    {/* Text Area */}
                    <div className="flex flex-col items-center text-center gap-1 w-full px-2 relative min-h-[60px]">
                      <span className="text-[11px] md:text-xs font-semibold leading-tight text-gray-200 block">{line1}</span>
                      {rest.length > 0 && (
                        <span className="text-[11px] md:text-xs font-semibold leading-tight text-gray-200 block">{rest.join(' ')}</span>
                      )}
                      <p className="text-[#cba344] font-bold text-[12px] md:text-sm mt-1">
                        {item.date}
                      </p>

                      {/* Vertical Divider connecting text blocks */}
                      {index < dates.length - 1 && (
                        <div className="hidden md:block absolute right-0 top-1 bottom-1 w-[1px] bg-[#cba344]/40"></div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WHY PRESENT */}
        {(whyHeading || reasons.length > 0) && (
          <div className="flex-[1] bg-[#f5f6f1] rounded-2xl px-6 pb-6 pt-2 md:px-8 md:pb-8 md:pt-4 border border-gray-200 shadow-sm relative overflow-hidden">
            {/* Decorative leaf */}
            {leaf && <img src={leaf} alt={leafAlt} className="absolute bottom-0 right-0 w-32 opacity-40 pointer-events-none mix-blend-multiply" />}

            {whyHeading && (
              <h3 className="text-[#032e1c] font-medium text-lg mb-1 relative z-10 text-center uppercase tracking-wide">
                {whyHeading}
              </h3>
            )}

            <div className="flex flex-col gap-3 relative z-10">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-[#4b6a38]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                  <p className="text-black text-xs md:text-sm font-medium leading-snug">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </SectionContainer>
    </section>
  );
};

export default ImportantDatesPaper;
