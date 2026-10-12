"use client";
import React from 'react';
import {
  HeartHandshake, Stethoscope, Leaf, Users, FileText, Heart, BookOpen, GraduationCap,
  FlaskConical, Apple, ShieldCheck, Handshake, Globe, Sprout, Brain, Award,
  type LucideIcon,
} from 'lucide-react';
import main22 from '@/assets/icons/main22.webp';
import d11Icon from '@/assets/icons/d11.png';
import d22Icon from '@/assets/icons/d22.png';
import d33Icon from '@/assets/icons/d33.png';
import d44Icon from '@/assets/icons/d44.png';
import d55Icon from '@/assets/icons/d55.png';
import d66Icon from '@/assets/icons/d66.png';
import d77Icon from '@/assets/icons/d77.png';
import d88Icon from '@/assets/icons/d88.png';
import d99Icon from '@/assets/icons/d99.png';
import d100Icon from '@/assets/icons/d100.png';
import footerRight from '@/assets/icons/footerright.webp';
import SectionContainer from '@/components/layout/SectionContainer';
import img1 from '@/assets/image/d1.webp';
import img2 from '@/assets/image/d2.webp';
import img3 from '@/assets/image/d3.webp';
import img4 from '@/assets/image/d4.webp';
import img5 from '@/assets/image/d5.webp';
import img6 from '@/assets/image/d6.webp';
import img7 from '@/assets/image/d7.webp';
import img8 from '@/assets/image/d8.webp';
import img9 from '@/assets/image/d9.webp';
import img10 from '@/assets/image/d10.webp';
import type { AboutInitiativesData, FocusArea, InitiativeCard } from '@/lib/fetchAboutInitiatives';

/* Built-in content — shown when the admin-managed section (GET /api/about-initiatives) is not available */
const DEFAULT_CARDS: InitiativeCard[] = [
  ['Integrated Healthcare', 'Promoting synergy between\nModern Medicine, AYUSH and\ntraditional wisdom for\nholistic well-being.', d11Icon, img1],
  ['Health Awareness\n& Education', 'Spreading knowledge on preventive healthcare, wellness and healthy living for all.', d22Icon, img2],
  ['Community Empowerment', 'Empowering communities through health camps, workshops and outreach programs.', d33Icon, img3],
  ['Environment Sustainability', 'Working towards clean rivers,\ngreen initiatives and a\nsustainable future.', d44Icon, img4],
  ['Youth\nEngagement', 'Inspiring youth to lead\nchange and build a\nhealthier tomorrow.', d55Icon, img5],
  ['Research &\nInnovation', 'Encouraging research, innovation and technology for holistic well-being.', d66Icon, img6],
  ['Wellness &\nMental Health', 'Promoting mental well-being, stress management and lifestyle balance.', d77Icon, img7],
  ['Nutrition &\nLifestyle', 'Advocating balanced nutrition, healthy lifestyles and preventive care.', d88Icon, img8],
  ['Women Empowerment', 'Empowering women with health awareness, skills and leadership opportunities.', d99Icon, img9],
  ['Collaboration & Partnerships', 'Building partnerships with organizations, experts\nand government bodies for\nlarger impact.', d100Icon, img10],
].map(([title, description, icon, image]) => ({
  title: title as string,
  description: description as string,
  icon: (icon as { src: string }).src,
  iconAlt: (title as string).replace(/\n/g, ' '),
  image: (image as { src: string }).src,
  imageAlt: (title as string).replace(/\n/g, ' '),
}));

const DEFAULT_FOCUS_AREAS: FocusArea[] = [
  { icon: 'HeartHandshake', text: 'Holistic Health\nfor All' },
  { icon: 'Stethoscope', text: 'Preventive\nHealthcare' },
  { icon: 'Leaf', text: 'Sustainable\nEnvironment' },
  { icon: 'Users', text: 'Healthy\nCommunities' },
  { icon: 'FileText', text: 'Knowledge &\nInnovation' },
  { icon: 'Heart', text: 'Compassion &\nService' },
];

/* Icon names the admin can pick (backend models/about/AboutInitiatives.js) */
const ICONS: Record<string, LucideIcon> = {
  HeartHandshake, Stethoscope, Leaf, Users, FileText, Heart, BookOpen, GraduationCap,
  FlaskConical, Apple, ShieldCheck, Handshake, Globe, Sprout, Brain, Award,
};

/** "Youth\nEngagement" → Youth<br />Engagement */
const withBreaks = (text: string) =>
  text.split('\n').map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 && <br />}
    </React.Fragment>
  ));

/** Description: single text flows; lines typed with Enter stay on their own line */
const renderDescription = (text: string) =>
  text.includes('\n')
    ? text.split('\n').map((line, i) => <span key={i} className="block xl:whitespace-nowrap">{line}</span>)
    : text;

/** Focus title / texts: line breaks only on wide screens (stacked band), spaces below that */
const wideBreaks = (text: string) =>
  text.split('\n').map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 && (
        <>
          <br className="hidden xl:block" />
          <span className="xl:hidden"> </span>
        </>
      )}
    </React.Fragment>
  ));

/** "OUR INITIATIVES – BUILDING ..." keeps the light dash between the two parts */
const renderHeading = (heading: string) => {
  const [first, ...rest] = heading.split(' – ');
  if (!rest.length) return heading;
  return (
    <>
      {first} <span className="font-light mx-2">–</span> {rest.join(' – ')}
    </>
  );
};

const AboutInitiatives = ({ data }: { data?: AboutInitiativesData | null }) => {
  const heading = data?.heading || 'OUR INITIATIVES – BUILDING A BETTER TOMORROW';
  // With saved data an image left empty is hidden; without data the built-in images show
  const divider = data ? data.dividerImage || '' : main22.src;
  const dividerAlt = data?.dividerImageAlt || 'decorative divider';
  const decor = data ? data.decorImage || '' : footerRight.src;
  const decorAlt = data?.decorImageAlt || 'Decorative';
  const cards = data ? data.cards ?? [] : DEFAULT_CARDS;
  const focusTitle = data ? data.focusTitle || '' : 'OUR KEY\nFOCUS\nAREAS';
  const focusAreas = data ? data.focusAreas ?? [] : DEFAULT_FOCUS_AREAS;

  return (
    <section className="pt-4 md:pt-8 pb-4 md:pb-6 bg-[#f8f7f3] -mt-4 md:-mt-8 relative z-20 overflow-hidden">
      {/* Decorative Right Image */}
      {decor && (
        <img
          src={decor}
          alt={decorAlt}
          className="absolute top-0 md:-top-4 right-0 w-32 md:w-48 lg:w-64 xl:w-72 object-contain pointer-events-none opacity-80 z-0 hidden md:block"
        />
      )}

      <SectionContainer className="relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-4 md:mb-5 flex flex-col items-center">
          <h2 className="text-[#04150b] font-serif text-base md:text-lg lg:text-[20px] font-bold uppercase tracking-wide">
            {renderHeading(heading)}
          </h2>
          {divider && (
            <div className="mt-1 md:mt-2">
              <img src={divider} alt={dividerAlt} className="h-5 md:h-6 object-contain opacity-80" />
            </div>
          )}
        </div>

        {/* 5-Column Grid */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 xl:gap-5">
            {cards.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#faf9f5] rounded-[1.25rem] border border-[#e5e0d8] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
              >
                {/* Top Text Content */}
                <div className="pt-3 px-3 pb-1.5 xl:pt-4 xl:px-4 xl:pb-2 flex-1 flex gap-2.5 md:gap-3 items-start">
                  {item.icon && (
                    <img src={item.icon} alt={item.iconAlt || item.title.replace(/\n/g, ' ')} className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 object-contain shrink-0" />
                  )}
                  {/* Text Box */}
                  <div className="flex flex-col flex-1">
                    <h3 className="text-[#00281a] font-bold text-[12px] md:text-[13px] xl:text-[14px] leading-tight font-inter mb-1 pt-0.5 pr-1">
                      {withBreaks(item.title)}
                    </h3>
                    {item.description && (
                      <p className="text-black/80 font-medium text-[9.5px] xl:text-[10.5px] leading-[1.4] tracking-tight pr-0.5">
                        {renderDescription(item.description)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Image */}
                {item.image && (
                  <div className="h-[90px] xl:h-[100px] w-full">
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title.replace(/\n/g, ' ')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Key Focus Areas Band */}
        {(focusTitle || focusAreas.length > 0) && (
          <div className="mt-4 md:mt-6 bg-[#00281a] rounded-[1rem] px-6 py-1 md:px-8 md:py-1.5 flex flex-col xl:flex-row items-center gap-6 xl:gap-8 justify-between">
            {/* Title */}
            {focusTitle && (
              <div className="text-[#F3B71B] font-serif text-xs md:text-sm font-bold uppercase tracking-wider leading-tight text-center xl:text-left shrink-0">
                {wideBreaks(focusTitle)}
              </div>
            )}

            {/* Divider (Hidden on small) */}
            <div className="hidden xl:block w-[1px] h-10 bg-white/10 shrink-0" />

            {/* Items Container */}
            <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-between items-center w-full gap-6 xl:gap-0">
              {focusAreas.map((item, idx) => {
                const Icon = ICONS[item.icon] || Heart;
                return (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-3">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#F3B71B]" strokeWidth={1} />
                      <div className="text-white text-[12px] md:text-[13px] font-medium leading-tight">
                        {withBreaks(item.text)}
                      </div>
                    </div>
                    {/* Divider */}
                    {idx < focusAreas.length - 1 && (
                      <div className="hidden xl:block w-[1px] h-10 bg-white/10 mx-2 2xl:mx-4" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </SectionContainer>
    </section>
  );
};

export default AboutInitiatives;
