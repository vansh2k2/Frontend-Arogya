"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  HeartHandshake,
  BookOpen,
  Users,
  Leaf,
  GraduationCap,
  FlaskConical,
  UserPlus,
  Apple,
  ShieldCheck,
  Handshake,
  Stethoscope,
  FileText,
  Heart,
  BriefcaseMedical,
  Map,
  ClipboardList
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

// Placeholders for the bottom images
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

const initiatives = [
  {
    title: "Integrated Healthcare",
    desc: (
      <>
        <span className="whitespace-nowrap block">Promoting synergy between</span>
        <span className="whitespace-nowrap block">Modern Medicine, AYUSH and</span>
        <span className="whitespace-nowrap block">traditional wisdom for</span>
        <span className="whitespace-nowrap block">holistic well-being.</span>
      </>
    ),
    iconImg: d11Icon,
    image: img1
  },
  {
    title: (
      <>
        Health Awareness<br />
        & Education
      </>
    ),
    desc: "Spreading knowledge on preventive healthcare, wellness and healthy living for all.",
    iconImg: d22Icon,
    image: img2
  },
  {
    title: "Community Empowerment",
    desc: "Empowering communities through health camps, workshops and outreach programs.",
    iconImg: d33Icon,
    image: img3
  },
  {
    title: "Environment Sustainability",
    desc: (
      <>
        <span className="whitespace-nowrap block">Working towards clean rivers,</span>
        <span className="whitespace-nowrap block">green initiatives and a</span>
        <span className="whitespace-nowrap block">sustainable future.</span>
      </>
    ),
    iconImg: d44Icon,
    image: img4
  },
  {
    title: (
      <>
        Youth<br />
        Engagement
      </>
    ),
    desc: (
      <>
        <span className="whitespace-nowrap block">Inspiring youth to lead</span>
        <span className="whitespace-nowrap block">change and build a</span>
        <span className="whitespace-nowrap block">healthier tomorrow.</span>
      </>
    ),
    iconImg: d55Icon,
    image: img5
  },
  {
    title: (
      <>
        Research &<br />
        Innovation
      </>
    ),
    desc: "Encouraging research, innovation and technology for holistic well-being.",
    iconImg: d66Icon,
    image: img6
  },
  {
    title: (
      <>
        Wellness &<br />
        Mental Health
      </>
    ),
    desc: "Promoting mental well-being, stress management and lifestyle balance.",
    iconImg: d77Icon,
    image: img7
  },
  {
    title: (
      <>
        Nutrition &<br />
        Lifestyle
      </>
    ),
    desc: "Advocating balanced nutrition, healthy lifestyles and preventive care.",
    iconImg: d88Icon,
    image: img8
  },
  {
    title: "Women Empowerment",
    desc: "Empowering women with health awareness, skills and leadership opportunities.",
    iconImg: d99Icon,
    image: img9
  },
  {
    title: "Collaboration & Partnerships",
    desc: (
      <>
        Building partnerships with organizations, experts<br />
        and government bodies for<br />
        larger impact.
      </>
    ),
    iconImg: d100Icon,
    image: img10
  }
];

const focusAreas = [
  { icon: HeartHandshake, text: <>Holistic Health<br/>for All</> },
  { icon: Stethoscope, text: <>Preventive<br/>Healthcare</> },
  { icon: Leaf, text: <>Sustainable<br/>Environment</> },
  { icon: Users, text: <>Healthy<br/>Communities</> },
  { icon: FileText, text: <>Knowledge &<br/>Innovation</> },
  { icon: Heart, text: <>Compassion &<br/>Service</> },
];

const AboutInitiatives = () => {
  return (
    <section className="pt-4 md:pt-8 pb-4 md:pb-6 bg-[#f8f7f3] -mt-4 md:-mt-8 relative z-20 overflow-hidden">
      {/* Decorative Right Image */}
      <img 
        src={footerRight?.src || footerRight} 
        alt="Decorative" 
        className="absolute top-0 md:-top-4 right-0 w-32 md:w-48 lg:w-64 xl:w-72 object-contain pointer-events-none opacity-80 z-0 hidden md:block" 
      />
      
      <SectionContainer className="relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-4 md:mb-5 flex flex-col items-center">
          <h2 className="text-[#04150b] font-serif text-base md:text-lg lg:text-[20px] font-bold uppercase tracking-wide">
            OUR INITIATIVES <span className="font-light mx-2">–</span> BUILDING A BETTER TOMORROW
          </h2>
          <div className="mt-1 md:mt-2">
            <img src={main22?.src || main22} alt="decorative divider" className="h-5 md:h-6 object-contain opacity-80" />
          </div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 xl:gap-5">
          {initiatives.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#faf9f5] rounded-[1.25rem] border border-[#e5e0d8] overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
              >
                {/* Top Text Content */}
                <div className="pt-3 px-3 pb-1.5 xl:pt-4 xl:px-4 xl:pb-2 flex-1 flex gap-2.5 md:gap-3 items-start">
                  {/* Icon or Image */}
                  {item.iconImg ? (
                    <img src={item.iconImg?.src || item.iconImg} alt="" className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 object-contain shrink-0" />
                  ) : (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#00281a] flex items-center justify-center shrink-0">
                      <IconComponent className="text-white w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                    </div>
                  )}
                  {/* Text Box */}
                  <div className="flex flex-col flex-1">
                    <h3 className="text-[#00281a] font-bold text-[12px] md:text-[13px] xl:text-[14px] leading-tight font-inter mb-1 pt-0.5 pr-1">
                      {item.title}
                    </h3>
                    <p className="text-black/80 font-medium text-[9.5px] xl:text-[10.5px] leading-[1.4] tracking-tight pr-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                {/* Bottom Image */}
                <div className="h-[90px] xl:h-[100px] w-full">
                  <img 
                    src={item.image?.src || item.image} 
                    alt={typeof item.title === 'string' ? item.title : 'Initiative image'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Focus Areas Band */}
        <div className="mt-4 md:mt-6 bg-[#00281a] rounded-[1rem] px-6 py-1 md:px-8 md:py-1.5 flex flex-col xl:flex-row items-center gap-6 xl:gap-8 justify-between">
          {/* Title */}
          <div className="text-[#F3B71B] font-serif text-xs md:text-sm font-bold uppercase tracking-wider leading-tight text-center xl:text-left shrink-0">
            OUR KEY<br className="hidden xl:block" />
            <span className="xl:hidden"> </span>FOCUS<br className="hidden xl:block" />
            <span className="xl:hidden"> </span>AREAS
          </div>
          
          {/* Divider (Hidden on small) */}
          <div className="hidden xl:block w-[1px] h-10 bg-white/10 shrink-0" />

          {/* Items Container */}
          <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-between items-center w-full gap-6 xl:gap-0">
            {focusAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#F3B71B]" strokeWidth={1} />
                    <div className="text-white text-[12px] md:text-[13px] font-medium leading-tight">
                      {item.text}
                    </div>
                  </div>
                  {/* Divider */}
                  {idx < focusAreas.length - 1 && (
                    <div className="hidden xl:block w-[1px] h-10 bg-white/10 mx-2 2xl:mx-4" />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default AboutInitiatives;
