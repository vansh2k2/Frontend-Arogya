"use client";
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import {
  Mic, Users, Lightbulb, Handshake, HeartPulse, Network,
  Stethoscope, BookOpen, FlaskConical, Laptop, Leaf, Landmark, TrendingUp, GraduationCap,
  Globe, Award, Briefcase, Building2, Presentation, Star, Pill, Microscope,
  ArrowRight, type LucideIcon
} from 'lucide-react';
import type { StaticImageData } from 'next/image';
import type { EventHighlightsData, EventHighlightsButton } from '@/lib/fetchEventHighlights';
import c1 from '@/assets/image/c1.webp';
import c2 from '@/assets/image/c2.webp';
import c3 from '@/assets/image/c3.webp';
import c4 from '@/assets/image/c4.webp';
import c5 from '@/assets/image/c5.webp';
import c6 from '@/assets/image/c6.webp';
import h1 from '@/assets/image/h1.webp';
import h2 from '@/assets/image/h2.webp';
import h3 from '@/assets/image/h3.webp';
import t1 from '@/assets/icons/t1.webp';
import SectionContainer from '@/components/layout/SectionContainer';

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  return img.src || '';
};

// Sparkle component for buttons
const Sparkle = ({ style, color = '#fff176' }: { style?: React.CSSProperties; color?: string }) => (
  <span
    className="sparkle-star"
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '15px',
      color: color,
      textShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
      opacity: 0,
      zIndex: 20,
      willChange: 'transform, opacity',
      ...style,
    }}
  >
    ✦
  </span>
);

// Light-shade background per highlight card
const cardBgColors = [
  '#FBF3E2', // Global Keynotes — warm cream-gold
  '#EEF6EF', // Panel Discussions — soft sage
  '#EAF3FB', // Innovation Showcase — soft sky blue
  '#FCEEE5', // Exhibition & B2B — soft peach/terracotta
  '#F0F5E6', // AYUSH & Traditional — soft olive green
  '#F1EEFA', // Networking — soft lavender
];

/* Icon names saved by arogya-admin (backend models/home/EventHighlights.js) */
const ICONS: Record<string, LucideIcon> = {
  'mic': Mic, 'users': Users, 'lightbulb': Lightbulb, 'handshake': Handshake, 'leaf': Leaf,
  'network': Network, 'stethoscope': Stethoscope, 'book-open': BookOpen, 'flask': FlaskConical,
  'laptop': Laptop, 'landmark': Landmark, 'trending-up': TrendingUp, 'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse, 'globe': Globe, 'award': Award, 'briefcase': Briefcase,
  'building': Building2, 'presentation': Presentation, 'star': Star, 'pill': Pill, 'microscope': Microscope,
};

type ImageSrc = string | StaticImageData;
type Highlight = { title: string; desc?: string; image?: ImageSrc; imageAlt?: string; icon?: string; bgColor?: string };
type AgendaDay = { badge: string; date?: string; text?: string; image?: ImageSrc; imageAlt?: string };

/* Built-in content — shown when the admin-managed block (GET /api/event-highlights) is not available */
const DEFAULT_MAP = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.843655569632!2d77.22758546992978!3d28.61594503757779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce328b5a553f7%3A0x795cf6ea0f8b5378!2sPragati%20Maidan%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1779771849819!5m2!1sen!2sin";
const DEFAULT_HIGHLIGHTS: Highlight[] = [
  { title: 'GLOBAL KEYNOTES', desc: 'Visionary talks from\nworld-renowned experts', icon: 'mic', image: c1, imageAlt: 'Woman delivering a keynote address at a podium to a conference audience' },
  { title: 'PANEL DISCUSSIONS', desc: 'Engaging dialogues on emerging trends and challenges', icon: 'users', image: c2, imageAlt: 'Panel of healthcare experts seated on stage during a discussion' },
  { title: 'INNOVATION SHOWCASE', desc: 'Explore cutting-edge technologies and research breakthroughs', icon: 'lightbulb', image: c3, imageAlt: 'Digital human body with health data dashboards showcasing medical technology' },
  { title: 'EXHIBITION & B2B', desc: 'Connect with industry leaders\nand explore partnerships', icon: 'handshake', image: c4, imageAlt: 'Visitors walking through a busy healthcare exhibition hall with company stalls' },
  { title: 'AYUSH & TRADITIONAL MEDICAL SYSTEMS', desc: 'Honoring ancient wisdom. Inspiring a modern future.', icon: 'leaf', image: c5, imageAlt: 'Mortar and pestle with Ayurvedic herbs and oil bottles among green plants' },
  { title: 'NETWORKING OPPORTUNITIES', desc: 'Build meaningful connections\nthat last beyond the event', icon: 'network', image: c6, imageAlt: 'Healthcare professionals networking and talking at the event' },
];
const DEFAULT_AGENDA: AgendaDay[] = [
  { badge: 'DAY 1', date: '21 AUG 2026', text: 'Inauguration, Keynotes, Global Health Outlook, Modern Medicine Innovations', image: h1, imageAlt: 'Keynote speaker at Arogya Sangoshthi Day 1 inauguration' },
  { badge: 'DAY 2', date: '22 AUG 2026', text: 'AYUSH Conclave, Pharma & Biotech, Health Tech & AI, Panel Discussions', image: h2, imageAlt: 'Panel discussion at Arogya Sangoshthi Day 2' },
  { badge: 'DAY 3', date: '23 AUG 2026', text: 'Startup Pitch, Research Presentations, Workshops, Valedictory & Awards', image: h3, imageAlt: 'Awards ceremony at Arogya Sangoshthi Day 3 valedictory' },
];
const DEFAULT_ATTENDEES = [
  { text: 'Doctors &\nClinicians', icon: 'stethoscope' },
  { text: 'Researchers &\nAcademicians', icon: 'book-open' },
  { text: 'Pharma &\nBiotech Companies', icon: 'flask' },
  { text: 'Health Tech\nInnovators', icon: 'laptop' },
  { text: 'AYUSH\nPractitioners', icon: 'leaf' },
  { text: 'Policy Makers &\nGovt. Officials', icon: 'landmark' },
  { text: 'Investors &\nEntrepreneurs', icon: 'trending-up' },
  { text: 'Students & Young\nProfessionals', icon: 'graduation-cap' },
];
const DEFAULT_CTA_BUTTONS: EventHighlightsButton[] = [
  { label: 'Register as Delegate', href: '/delegate-registration', newTab: true },
  { label: 'Become a Speaker', href: '/speakers', newTab: true },
  { label: 'Book Exhibition Space', href: '', newTab: true },
];

/** "A\nB" → A<br />B */
const renderLines = (text = '') =>
  text.split('\n').map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 && <br />}
    </React.Fragment>
  ));

/** A button wrapped in a link when it has one (an empty link keeps the plain button) */
const MaybeLink = ({ button, children }: { button: EventHighlightsButton; children: React.ReactNode }) =>
  button.href ? (
    <Link href={button.href} target={button.newTab ? '_blank' : undefined} rel={button.newTab ? 'noopener noreferrer' : undefined}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

// Lightweight, performant animation variants
const fadeInUpVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

const highlightsGridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const bottomGridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const EventHighlightsSection = ({ data }: { data?: EventHighlightsData | null }) => {
  const mapRef = useRef<HTMLIFrameElement>(null);
  const mapSrc = data ? data.mapEmbedUrl || '' : DEFAULT_MAP;

  // Saved text wins; built-in text only fills what was never saved
  const heading = data?.heading || 'EVENT HIGHLIGHTS';
  const glanceHeading = data ? data.glanceHeading || '' : 'At A Glance - 3 Days of Impact';
  const agendaDays: AgendaDay[] = data ? data.agendaDays ?? [] : DEFAULT_AGENDA;
  const whoHeading = data ? data.whoHeading || '' : 'Who Should Attend?';
  const viewAgenda: EventHighlightsButton = data?.viewAgenda ?? { label: 'View Detailed Agenda', href: '/delegate-registration', newTab: true };
  const detailsHeading = data ? data.detailsHeading || '' : 'Event Details';
  const details = [
    { label: 'Dates', value: data ? data.datesValue : '21ST – 23RD AUGUST 2026' },
    { label: 'Venue', value: data ? data.venueValue : 'PRAGATI MAIDAN, NEW DELHI, INDIA' },
    { label: 'Format', value: data ? data.formatValue : 'IN-PERSON CONFERENCE & EXHIBITION' },
    { label: 'Organized By', value: data ? data.organizerValue : 'AROGYA SANGHOSTHI FOUNDATION' },
  ].filter((d) => d.value);
  const ctaIcon: ImageSrc = data ? data.ctaIcon || '' : t1;
  const ctaIconAlt = data?.ctaIconAlt || 'Registration ticket icon';
  const ctaHeading = data ? data.ctaHeading || '' : "BE PART OF INDIA'S MOST TRANSFORMATIVE HEALTHCARE EVENT";
  const ctaParagraph = data ? data.ctaParagraph || '' : 'Register today and join a global community committed to building a healthier tomorrow.';
  const ctaButtons = data?.ctaButtons ?? DEFAULT_CTA_BUTTONS;
  const [cta1 = {}, cta2 = {}, cta3 = {}] = ctaButtons;

  // Lazy load Google Maps only when user scrolls near this section
  useEffect(() => {
    const iframe = mapRef.current;
    if (!iframe) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!iframe.src) iframe.src = mapSrc;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(iframe);
    return () => observer.disconnect();
  }, [mapSrc]);

  const highlights = (data?.highlights?.length ? data.highlights : DEFAULT_HIGHLIGHTS).map((item: Highlight, idx) => {
    const Icon = ICONS[item.icon ?? ''] ?? Mic;
    return {
      title: item.title,
      desc: renderLines(item.desc),
      icon: <Icon size={20} />,
      img: item.image || '',
      alt: item.imageAlt || item.title,
      bgColor: item.bgColor || cardBgColors[idx % cardBgColors.length],
    };
  });

  const attendees = (data ? data.attendees ?? [] : DEFAULT_ATTENDEES).map((item) => {
    const Icon = ICONS[item.icon ?? ''] ?? Users;
    const [line1, ...rest] = item.text.split('\n');
    return {
      icon: <Icon size={18} />,
      text: <><span className="whitespace-nowrap">{line1}</span>{rest.length > 0 && <span>{rest.join(' ')}</span>}</>,
    };
  });

  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: translate3d(0, 0, 0) scale(0.4); }
          50%  { opacity: 1; transform: translate3d(0, -4px, 0) scale(1.2); }
          100% { opacity: 0; transform: translate3d(0, -8px, 0) scale(0.4); }
        }
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        .sparkle-star {
          animation: sparkleAnim 1.8s ease-in-out infinite;
        }
        .teal-btn-hero {
          background: linear-gradient(135deg, #005959 0%, #007979 30%, #009999 60%, #005959 100%);
          background-size: 200% 200%;
          animation: goldShift 3s ease infinite;
          box-shadow: 0 4px 15px rgba(0,121,121,0.25);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.25) !important;
        }
        .golden-btn-hero {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 3s ease infinite;
          box-shadow: 0 4px 18px rgba(255,180,0,0.3);
          position: relative;
          overflow: hidden;
          border: 2px solid white !important;
        }
        .navy-btn-hero {
          background: linear-gradient(135deg, #0a0f2b 0%, #111844 30%, #1a2566 60%, #0a0f2b 100%);
          background-size: 200% 200%;
          animation: goldShift 3s ease infinite;
          box-shadow: 0 4px 15px rgba(17,24,68,0.25);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.25) !important;
        }
        .emerald-btn-hero {
          background: linear-gradient(135deg, #06554b 0%, #0A7C6E 30%, #0c9e8c 60%, #06554b 100%);
          background-size: 200% 200%;
          animation: goldShift 3s ease infinite;
          box-shadow: 0 4px 15px rgba(10,124,110,0.25);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.25) !important;
        }
      `}</style>
      <section className="w-full pt-0 -mt-6 pb-1 md:pb-2 bg-[#F8F9FA] relative z-20">
        <SectionContainer>
          
          {/* Section Title */}
          <div className="flex justify-center items-center gap-4 mb-5 w-full">
            <div className="h-[1px] w-12 md:w-24 bg-[#011a12]/30"></div>
            <h2 className="text-[#032e1c] font-inter font-extrabold text-xs sm:text-sm uppercase tracking-wider text-center whitespace-nowrap">
              {heading}
            </h2>
            <div className="h-[1px] w-12 md:w-24 bg-[#011a12]/30"></div>
          </div>

          {/* Top Grid - 6 Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={highlightsGridVariants}
          >
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUpVariant}
                style={{ backgroundColor: item.bgColor }}
                className="flex flex-col rounded-xl shadow-[rgba(9,30,66,0.15)_0px_1px_1px,rgba(9,30,66,0.08)_0px_0px_1px_1px] overflow-hidden group hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-32 w-full overflow-hidden relative">
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 250px"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4 pt-6 relative flex-1 flex flex-col">
                  <div className="absolute -top-5 left-4 w-10 h-10 rounded-full bg-[#001810] border-2 border-white flex items-center justify-center text-[#cba344] shadow-md z-10">
                    {item.icon}
                  </div>
                  <h3 className="text-[#00261c] font-bold text-[11px] mb-2 uppercase leading-tight mt-1">{item.title}</h3>
                  <p className="text-black font-medium text-[10px] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom 3 Sections Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_1fr] gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={bottomGridVariants}
          >
            
            {/* 1. At A Glance */}
            <motion.div className="bg-[#FAF7F0] rounded-xl pt-3 pb-3 pl-6 pr-3 border border-[#e8dfc8] h-fit" variants={fadeInUpVariant}>
              {glanceHeading && (
                <h3 className="text-[#001810] font-inter font-bold text-sm uppercase tracking-wider mb-3">{glanceHeading}</h3>
              )}
              <div className="flex flex-col gap-3 relative -ml-2">
                <div className="absolute left-[32px] top-4 bottom-4 w-[1px] bg-[#cba344]/40 z-0"></div>

                {agendaDays.map((day, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative z-10">
                    <div className="bg-[#cd861b] text-white rounded px-1.5 py-1 text-center shrink-0 w-[65px] shadow-sm">
                      <div className="text-[10px] font-bold">{day.badge}</div>
                      {day.date && <div className="text-[8px] whitespace-nowrap">{day.date}</div>}
                    </div>
                    <div className="flex-1 mt-1">
                      <p className="text-[#001810] text-[11px] font-medium leading-tight mb-2">{day.text}</p>
                    </div>
                    {day.image && (
                      <div className="w-20 h-10 rounded overflow-hidden shrink-0 shadow-sm relative">
                        <Image src={day.image} alt={day.imageAlt || day.badge} fill sizes="120px" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}

              </div>
            </motion.div>

            {/* 2. Who Should Attend */}
            <motion.div className="bg-[#012b1d] rounded-xl py-6 px-6 border border-white/10 flex flex-col justify-between h-fit" variants={fadeInUpVariant}>
              <div>
                {whoHeading && (
                  <h3 className="text-white font-inter font-bold text-sm uppercase tracking-wider mb-6 text-center">{whoHeading}</h3>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-2 mb-8">
                  {attendees.map((item, idx) => (
                    <div key={idx} className="flex flex-row items-center text-left gap-2">
                      <div className="text-white shrink-0">
                        {item.icon}
                      </div>
                      <div className="text-gray-300 text-[9px] leading-tight flex flex-col">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {viewAgenda.label && (
              <div className="flex justify-center mt-auto">
                <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                  <Sparkle color="#00ffff" style={{ top: '-14px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#00ffff" style={{ top: '-10px', left: '50%', animationDelay: '0.4s' }} />
                  <Sparkle color="#00ffff" style={{ top: '-14px', right: '15%', animationDelay: '0.8s' }} />
                  <Sparkle color="#00ffff" style={{ bottom: '-14px', left: '25%', animationDelay: '0.3s' }} />
                  <Sparkle color="#00ffff" style={{ bottom: '-10px', right: '25%', animationDelay: '0.6s' }} />
                  
                  <MaybeLink button={viewAgenda}>
                    <button className="teal-btn-hero group rounded-full px-5 py-2 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[10px] font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                      <span>{viewAgenda.label}</span>
                      <ArrowRight size={13} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </MaybeLink>
                </div>
              </div>
              )}
            </motion.div>

            {/* 3. Event Details */}
            <motion.div className="bg-[#FAF7F0] rounded-xl pt-3 pb-3 pl-6 pr-3 border border-[#e8dfc8] flex flex-col h-fit" variants={fadeInUpVariant}>
              {detailsHeading && (
                <h3 className="text-[#001810] font-inter font-bold text-sm uppercase tracking-wider mb-0">{detailsHeading}</h3>
              )}

              <div className="flex flex-row gap-4 h-full items-stretch mt-1">
                <div className={`flex flex-col justify-start gap-1.5 ${mapSrc ? 'w-[45%]' : 'w-full'}`}>
                  {details.map((detail, idx) => (
                    <React.Fragment key={detail.label}>
                      {idx > 0 && <div className="w-full h-[1px] bg-black/5 my-0.5"></div>}
                      <div className="flex flex-col gap-0">
                        <div className="text-[#001810] text-[9px] font-bold uppercase tracking-wider">{detail.label}</div>
                        <div className="text-[#001810] text-[10px] font-medium leading-tight">{detail.value}</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* Google Map — lazy loaded via IntersectionObserver */}
                {mapSrc && (
                <div className="w-[55%] bg-gray-200 rounded-lg overflow-hidden relative border border-gray-300">
                  <iframe 
                    ref={mapRef}
                    className="w-full h-full min-h-[120px]" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Event Venue Location"
                  ></iframe>
                </div>
                )}
              </div>
            </motion.div>

          </motion.div>

          {/* Call to Action Band */}
          <motion.div
            className="bg-[#012b1d] rounded-xl pt-2 pb-1 px-6 md:px-8 mt-4 flex flex-col xl:flex-row items-center justify-between gap-6 shadow-lg w-full border border-[#01412c]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUpVariant}
          >
            {/* Left Side: Icon and Text */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 xl:gap-6 text-center md:text-left flex-1 -ml-2">
              {ctaIcon && (
                <Image src={ctaIcon} alt={ctaIconAlt} width={56} height={56} className="w-14 h-auto object-cover shrink-0 transform scale-[1.1] translate-y-1 origin-center ml-2" />
              )}
              <div className="flex flex-col gap-1 mt-1 px-2 md:px-0">
                <h3 className="text-white font-inter text-sm xl:text-base leading-tight font-extrabold tracking-wide md:whitespace-nowrap">
                  {ctaHeading}
                </h3>
                {ctaParagraph && (
                  <p className="text-gray-300 text-[13px] font-medium mt-1">
                    {ctaParagraph}
                  </p>
                )}
              </div>
            </div>
            
            {/* Right Side: Buttons with Sparkles */}
            <div className="flex flex-wrap justify-center xl:justify-end gap-3 shrink-0">
              {/* Button 1: Register as Delegate */}
              {cta1.label && (
              <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                <Sparkle style={{ top: '-8px', left: '50%', animationDelay: '0.4s' }} />
                <Sparkle style={{ top: '-10px', right: '15%', animationDelay: '0.8s' }} />
                <Sparkle style={{ bottom: '-10px', left: '20%', animationDelay: '0.2s' }} />
                <Sparkle style={{ bottom: '-8px', right: '25%', animationDelay: '0.6s' }} />
                
                <MaybeLink button={cta1}>
                  <button className="golden-btn-hero group rounded-full px-4 py-1.5 text-[#0b2912] transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                    <span>{cta1.label}</span>
                    <ArrowRight size={12} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </MaybeLink>
              </div>
              )}

              {/* Button 2: Become a Speaker */}
              {cta2.label && (
              <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                <Sparkle color="#7d9eff" style={{ top: '-10px', left: '15%', animationDelay: '0.1s' }} />
                <Sparkle color="#7d9eff" style={{ top: '-8px', left: '60%', animationDelay: '0.5s' }} />
                <Sparkle color="#7d9eff" style={{ bottom: '-10px', left: '30%', animationDelay: '0.3s' }} />
                <Sparkle color="#7d9eff" style={{ bottom: '-8px', right: '15%', animationDelay: '0.7s' }} />
                
                <MaybeLink button={cta2}>
                  <button className="navy-btn-hero group rounded-full px-4 py-1.5 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                    <span>{cta2.label}</span>
                  </button>
                </MaybeLink>
              </div>
              )}

              {/* Button 3: Book Exhibition Space */}
              {cta3.label && (
              <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                <Sparkle color="#6ee7b7" style={{ top: '-10px', left: '15%', animationDelay: '0.2s' }} />
                <Sparkle color="#6ee7b7" style={{ top: '-8px', left: '55%', animationDelay: '0.6s' }} />
                <Sparkle color="#6ee7b7" style={{ bottom: '-10px', left: '25%', animationDelay: '0.4s' }} />
                <Sparkle color="#6ee7b7" style={{ bottom: '-8px', right: '20%', animationDelay: '0.8s' }} />
                
                <MaybeLink button={cta3}>
                  <button className="emerald-btn-hero group rounded-full px-4 py-1.5 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                    <span>{cta3.label}</span>
                  </button>
                </MaybeLink>
              </div>
              )}
            </div>
          </motion.div>
        </SectionContainer>
      </section>
    </>
  );
};

export default EventHighlightsSection;



