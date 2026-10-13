"use client";
import React from 'react';
import fe1Icon from '@/assets/icons/fe1.png';
import aboutImage from '@/assets/about1.jpg';
import leafLeft from '@/assets/icons/leafs.png';
import SectionContainer from '@/components/layout/SectionContainer';
import type { AboutNamoGangeData } from '@/lib/fetchAboutNamoGange';

/* Built-in content — shown when the admin-managed section (GET /api/about-namo-gange) is not available */
const DEFAULTS = {
  heading: 'ABOUT NAMO GANGE TRUST',
  subheading: 'The Parent Organization Behind Arogya Sanghosthi',
  paragraph:
    'Namo Gange Trust is a registered non-profit organization committed to promoting holistic health, wellness and sustainability through integrated healthcare initiatives. Arogya Sanghosthi is its flagship mission that brings together healthcare leaders, experts and changemakers to shape a healthier and sustainable India.',
  highlights: [
    'Established with a vision for healthier communities',
    'Working across India through impactful initiatives',
    'Driven by values of service, compassion and sustainability',
  ],
  visionTitle: 'Our Vision',
  visionText: 'Healthy People. Healthy Communities. Sustainable Future.',
  missionTitle: 'Our Mission',
  missionText:
    'To promote holistic health, wellness and sustainability through\nintegrated healthcare, education, research, community\nempowerment and environmental stewardship.',
};

/** Line breaks only from md up, like the original layout */
const renderLines = (text: string) =>
  text.split('\n').map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 && <>{' '}<br className="hidden md:block" /></>}
    </React.Fragment>
  ));

const AboutNamoGange = ({ data }: { data?: AboutNamoGangeData | null }) => {
  const c = {
    heading: data?.heading || DEFAULTS.heading,
    subheading: data ? data.subheading || '' : DEFAULTS.subheading,
    paragraph: data ? data.paragraph || '' : DEFAULTS.paragraph,
    highlights: data ? (data.highlights ?? []).map((h) => h.text) : DEFAULTS.highlights,
    visionTitle: data ? data.visionTitle || '' : DEFAULTS.visionTitle,
    visionText: data ? data.visionText || '' : DEFAULTS.visionText,
    missionTitle: data ? data.missionTitle || '' : DEFAULTS.missionTitle,
    missionText: data ? data.missionText || '' : DEFAULTS.missionText,
  };
  // With saved data an image left empty is hidden; without data the built-in images show
  const leaf = data ? data.leafImage || '' : leafLeft.src;
  const leafAlt = data?.leafImageAlt || 'Decorative leaves';
  const bullet = data ? data.bulletIcon || '' : fe1Icon.src;
  const bulletAlt = data?.bulletIconAlt || 'Green lotus bullet icon';
  const photo = data ? data.image || '' : aboutImage.src;
  const photoAlt = data?.imageAlt || 'Namo Gange Trust vision and mission';
  const hasCard = Boolean(c.visionTitle || c.visionText || c.missionTitle || c.missionText);

  return (
    <section className="-mt-2 md:-mt-4 pb-2 md:pb-4 bg-[#f8f7f3] relative z-10 overflow-hidden">
      {/* Decorative Left Leaf */}
      {leaf && (
        <img
          src={leaf}
          alt={leafAlt}
          className="absolute left-[-20px] md:left-[-40px] lg:left-[-60px] top-1/4 w-32 md:w-48 lg:w-64 opacity-70 z-0 pointer-events-none"
        />
      )}

      <SectionContainer className="relative z-10">
        {/* Main Card Container */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0 relative">

          {/* Left Section: Text Content */}
          <div className="lg:w-[50%] flex flex-col justify-start pt-2 md:pt-4 pr-0 lg:pr-12">
            <h2 className="text-[#00281a] font-serif text-xl md:text-2xl lg:text-[23px] font-bold uppercase mb-2 whitespace-nowrap">
              {c.heading}
            </h2>
            {c.subheading && (
              <h3 className="text-[#F3B71B] font-inter font-semibold tracking-wide text-[13px] md:text-[15px] mb-2 md:mb-3">
                {c.subheading}
              </h3>
            )}

            {c.paragraph && (
              <p className="text-black font-medium text-[12px] md:text-[13px] leading-[1.8] mb-4 md:mb-5">
                {c.paragraph}
              </p>
            )}

            {c.highlights.length > 0 && (
              <ul className="space-y-2 md:space-y-2.5">
                {c.highlights.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 md:gap-4">
                    {bullet && (
                      <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shrink-0">
                        <img src={bullet} alt={bulletAlt} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <span className="text-black font-medium text-[11px] md:text-[12.5px]">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Section: Image and Mission/Vision Card */}
          <div className="lg:w-[50%] flex">
            <div className="w-full rounded-2xl md:rounded-[1.5rem] overflow-hidden relative shadow-lg h-[320px] md:h-[360px] lg:h-auto min-h-[320px]">
              {/* Background Image */}
              {photo && (
                <img
                  src={photo}
                  alt={photoAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Bottom Overlay Card */}
              {hasCard && (
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-12 md:right-24 lg:right-32 bg-[#00281a]/60 rounded-xl md:rounded-2xl px-4 md:px-6 py-2 md:py-3 text-white shadow-2xl border border-white/10">
                  {(c.visionTitle || c.visionText) && (
                    <div className="mb-2 md:mb-3">
                      {c.visionTitle && <h4 className="font-serif font-bold text-[15px] md:text-lg mb-0.5 md:mb-1">{c.visionTitle}</h4>}
                      {c.visionText && (
                        <p className="text-white/90 text-[11px] md:text-[12px] leading-relaxed">
                          {c.visionText}
                        </p>
                      )}
                    </div>
                  )}
                  {(c.missionTitle || c.missionText) && (
                    <div>
                      {c.missionTitle && <h4 className="font-serif font-bold text-[15px] md:text-lg mb-1 md:mb-1.5">{c.missionTitle}</h4>}
                      {c.missionText && (
                        <p className="text-white/85 text-[11px] md:text-[12px] leading-relaxed">
                          {renderLines(c.missionText)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
};

export default AboutNamoGange;
