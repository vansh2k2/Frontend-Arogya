"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mic, Users, Lightbulb, Handshake, HeartPulse, Network, 
  MapPin, Calendar, Building, Info, Stethoscope, BookOpen, 
  FlaskConical, Laptop, Leaf, Landmark, TrendingUp, GraduationCap, 
  ArrowRight, ArrowUpRight, Ticket
} from 'lucide-react';
import c1 from '@/assets/image/c1.webp';
import c2 from '@/assets/image/c2.webp';
import c3 from '@/assets/image/c3.webp';
import c4 from '@/assets/image/c4.webp';
import c5 from '@/assets/image/c5.webp';
import c6 from '@/assets/image/c6.webp';
import h1 from '@/assets/image/h1.webp';
import h2 from '@/assets/image/h2.webp';
import h3 from '@/assets/image/h3.webp';
import t1 from '@/assets/icons/t1.png';
import SectionContainer from '@/components/layout/SectionContainer';

// Sparkle component for buttons
const Sparkle = ({ style, color = '#fff176' }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '16px',
      color: color,
      textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

// ---- Light-shade background per highlight card (each one different) ----
const cardBgColors = [
  '#FBF3E2', // Global Keynotes — warm cream-gold
  '#EEF6EF', // Panel Discussions — soft sage
  '#EAF3FB', // Innovation Showcase — soft sky blue
  '#FCEEE5', // Exhibition & B2B — soft peach/terracotta
  '#F0F5E6', // AYUSH & Traditional — soft olive green
  '#F1EEFA', // Networking — soft lavender
];

// ---- A different entrance animation for each of the 6 cards ----
const cardVariantUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const cardVariantFromLeft = {
  hidden: { opacity: 0, x: -55, rotate: -6 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const cardVariantZoomSpring = {
  hidden: { opacity: 0, scale: 0.55 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 14, mass: 0.7 } },
};
const cardVariantFromRight = {
  hidden: { opacity: 0, x: 55, rotate: 6 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const cardVariantFlip = {
  hidden: { opacity: 0, rotateY: -95, scale: 0.85 },
  visible: { opacity: 1, rotateY: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 16, mass: 0.8 } },
};
const cardVariantDrop = {
  hidden: { opacity: 0, y: -55, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 12, mass: 0.6 } },
};
const highlightCardVariants = [
  cardVariantUp,
  cardVariantFromLeft,
  cardVariantZoomSpring,
  cardVariantFromRight,
  cardVariantFlip,
  cardVariantDrop,
];

// ---- Other scroll-triggered variants used across the section ----
const titleRowVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};
const lineDrawVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const highlightsGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const bottomGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const panelVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const dayRowsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};
const dayRowVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const attendeesGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const attendeeItemVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 16 } },
};

const detailsFieldsVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const detailFieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const mapVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const ctaBandVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const ctaTextVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const ctaButtonsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const ctaButtonVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 15 } },
};

const EventHighlightsSection = () => {
  const highlights = [
    {
      title: "GLOBAL KEYNOTES",
      desc: <>Visionary talks from<br />world-renowned experts</>,
      icon: <Mic size={20} />,
      img: c1
    },
    {
      title: "PANEL DISCUSSIONS",
      desc: "Engaging dialogues on emerging trends and challenges",
      icon: <Users size={20} />,
      img: c2
    },
    {
      title: "INNOVATION SHOWCASE",
      desc: "Explore cutting-edge technologies and research breakthroughs",
      icon: <Lightbulb size={20} />,
      img: c3
    },
    {
      title: "EXHIBITION & B2B",
      desc: <>Connect with industry leaders<br />and explore partnerships</>,
      icon: <Handshake size={20} />,
      img: c4
    },
    {
      title: "AYUSH & TRADITIONAL MEDICAL SYSTEMS",
      desc: "Honoring ancient wisdom. Inspiring a modern future.",
      icon: <Leaf size={20} />,
      img: c5
    },
    {
      title: "NETWORKING OPPORTUNITIES",
      desc: <>Build meaningful connections<br />that last beyond the event</>,
      icon: <Network size={20} />,
      img: c6
    }
  ];

  const attendees = [
    { icon: <Stethoscope size={18} />, text: <><span className="whitespace-nowrap">Doctors &</span><span>Clinicians</span></> },
    { icon: <BookOpen size={18} />, text: <><span className="whitespace-nowrap">Researchers &</span><span>Academicians</span></> },
    { icon: <FlaskConical size={18} />, text: <><span className="whitespace-nowrap">Pharma &</span><span>Biotech Companies</span></> },
    { icon: <Laptop size={18} />, text: <><span className="whitespace-nowrap">Health Tech</span><span>Innovators</span></> },
    { icon: <Leaf size={18} />, text: <><span className="whitespace-nowrap">AYUSH</span><span>Practitioners</span></> },
    { icon: <Landmark size={18} />, text: <><span className="whitespace-nowrap">Policy Makers &</span><span>Govt. Officials</span></> },
    { icon: <TrendingUp size={18} />, text: <><span className="whitespace-nowrap">Investors &</span><span>Entrepreneurs</span></> },
    { icon: <GraduationCap size={18} />, text: <><span className="whitespace-nowrap">Students & Young</span><span>Professionals</span></> },
  ];

  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { left: -75%; }
          100% { left: 150%; }
        }
        .teal-btn-hero {
          background: linear-gradient(135deg, #005959 0%, #007979 30%, #009999 60%, #005959 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 15px 3px rgba(0,121,121,0.25), 0 4px 15px rgba(0,121,121,0.15);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2) !important;
        }
        .teal-btn-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .golden-btn-hero {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 20px 5px rgba(255,200,0,0.25), 0 4px 20px rgba(255,165,0,0.15);
          position: relative;
          overflow: hidden;
          border: 2px solid white !important;
        }
        .golden-btn-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .navy-btn-hero {
          background: linear-gradient(135deg, #0a0f2b 0%, #111844 30%, #1a2566 60%, #0a0f2b 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 15px 3px rgba(17,24,68,0.25), 0 4px 15px rgba(17,24,68,0.15);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2) !important;
        }
        .navy-btn-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .emerald-btn-hero {
          background: linear-gradient(135deg, #06554b 0%, #0A7C6E 30%, #0c9e8c 60%, #06554b 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 15px 3px rgba(10,124,110,0.25), 0 4px 15px rgba(10,124,110,0.15);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2) !important;
        }
        .emerald-btn-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
      `}</style>
    <section className="w-full pt-0 -mt-6 pb-1 md:pb-2 bg-[#F8F9FA] relative z-20">
      <SectionContainer>
        
        {/* Section Title */}
        <motion.div
          className="flex justify-center items-center gap-4 mb-5 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={titleRowVariants}
        >
          <motion.div className="h-[1px] w-12 md:w-24 bg-[#011a12]/30" style={{ transformOrigin: 'right' }} variants={lineDrawVariants}></motion.div>
          <h2 className="text-[#032e1c] font-inter font-extrabold text-xs sm:text-sm uppercase tracking-wider text-center whitespace-nowrap">
            EVENT HIGHLIGHTS
          </h2>
          <motion.div className="h-[1px] w-12 md:w-24 bg-[#011a12]/30" style={{ transformOrigin: 'left' }} variants={lineDrawVariants}></motion.div>
        </motion.div>

        {/* Top Grid - 6 Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-5"
          style={{ perspective: 1200 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={highlightsGridVariants}
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              variants={highlightCardVariants[idx % highlightCardVariants.length]}
              style={{ backgroundColor: cardBgColors[idx % cardBgColors.length] }}
              className="flex flex-col rounded-xl shadow-[rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] overflow-hidden group"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img 
                  src={item.img?.src || item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 pt-6 relative flex-1 flex flex-col">
                <div className="absolute -top-5 left-4 w-10 h-10 rounded-full bg-[#001810] border-2 border-white flex items-center justify-center text-[#cba344] shadow-md z-10">
                  {item.icon}
                </div>
                <h4 className="text-[#00261c] font-bold text-[11px] mb-2 uppercase leading-tight mt-1">{item.title}</h4>
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
          <motion.div className="bg-[#FAF7F0] rounded-xl pt-3 pb-3 pl-6 pr-3 border border-[#e8dfc8] h-fit" variants={panelVariants}>
            <h3 className="text-[#001810] font-inter font-bold text-sm uppercase tracking-wider mb-3">At A Glance - 3 Days of Impact</h3>
            <motion.div className="flex flex-col gap-3 relative -ml-2" variants={dayRowsContainerVariants}>
              <div className="absolute left-[32px] top-4 bottom-4 w-[1px] bg-[#cba344]/40 z-0"></div>
              
              {/* Day 1 */}
              <motion.div className="flex items-start gap-4 relative z-10" variants={dayRowVariants}>
                <div className="bg-[#cd861b] text-white rounded px-1.5 py-1 text-center shrink-0 w-[65px] shadow-sm">
                  <div className="text-[10px] font-bold">DAY 1</div>
                  <div className="text-[8px] whitespace-nowrap">21 AUG 2026</div>
                </div>
                <div className="flex-1 mt-1">
                  <p className="text-[#001810] text-[11px] font-medium leading-tight mb-2">Inauguration, Keynotes, Global Health Outlook, Modern Medicine Innovations</p>
                </div>
                <div className="w-20 h-10 rounded overflow-hidden shrink-0 shadow-sm">
                  <img src={h1?.src || h1} alt="Day 1" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              
              {/* Day 2 */}
              <motion.div className="flex items-start gap-4 relative z-10" variants={dayRowVariants}>
                <div className="bg-[#cd861b] text-white rounded px-1.5 py-1 text-center shrink-0 w-[65px] shadow-sm">
                  <div className="text-[10px] font-bold">DAY 2</div>
                  <div className="text-[8px] whitespace-nowrap">22 AUG 2026</div>
                </div>
                <div className="flex-1 mt-1">
                  <p className="text-[#001810] text-[11px] font-medium leading-tight mb-2">AYUSH Conclave, Pharma & Biotech, Health Tech & AI, Panel Discussions</p>
                </div>
                <div className="w-20 h-10 rounded overflow-hidden shrink-0 shadow-sm">
                  <img src={h2?.src || h2} alt="Day 2" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              
              {/* Day 3 */}
              <motion.div className="flex items-start gap-4 relative z-10" variants={dayRowVariants}>
                <div className="bg-[#cd861b] text-white rounded px-1.5 py-1 text-center shrink-0 w-[65px] shadow-sm">
                  <div className="text-[10px] font-bold">DAY 3</div>
                  <div className="text-[8px] whitespace-nowrap">23 AUG 2026</div>
                </div>
                <div className="flex-1 mt-1">
                  <p className="text-[#001810] text-[11px] font-medium leading-tight mb-2">Startup Pitch, Research Presentations, Workshops, Valedictory & Awards</p>
                </div>
                <div className="w-20 h-10 rounded overflow-hidden shrink-0 shadow-sm">
                  <img src={h3?.src || h3} alt="Day 3" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              
            </motion.div>
          </motion.div>

          {/* 2. Who Should Attend */}
          <motion.div className="bg-[#012b1d] rounded-xl py-6 px-6 border border-white/10 flex flex-col justify-between h-fit" variants={panelVariants}>
            <div>
              <h3 className="text-white font-inter font-bold text-sm uppercase tracking-wider mb-6 text-center">Who Should Attend?</h3>
              <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-2 mb-8" variants={attendeesGridVariants}>
                {attendees.map((item, idx) => (
                  <motion.div key={idx} className="flex flex-row items-center text-left gap-2" variants={attendeeItemVariants}>
                    <div className="text-white shrink-0">
                      {item.icon}
                    </div>
                    <div className="text-gray-300 text-[9px] leading-tight flex flex-col">
                      {item.text}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="flex justify-center mt-auto">
              <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                <Sparkle color="#007979" style={{ top: '-15px', left: '10%', animationDelay: '0s' }} />
                <Sparkle color="#007979" style={{ top: '-12px', left: '45%', animationDelay: '0.4s' }} />
                <Sparkle color="#007979" style={{ top: '-16px', right: '15%', animationDelay: '0.8s' }} />
                <Sparkle color="#007979" style={{ bottom: '-15px', left: '20%', animationDelay: '0.2s' }} />
                <Sparkle color="#007979" style={{ bottom: '-12px', right: '25%', animationDelay: '0.6s' }} />
                <Sparkle color="#007979" style={{ top: '20%', left: '-10px', animationDelay: '0.3s' }} />
                <Sparkle color="#007979" style={{ top: '60%', right: '-10px', animationDelay: '0.7s' }} />
                
                <button className="teal-btn-hero group rounded-full px-5 py-2 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[10px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                  <span>View Detailed Agenda</span>
                  <ArrowRight size={13} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3. Event Details */}
          <motion.div className="bg-[#FAF7F0] rounded-xl pt-3 pb-3 pl-6 pr-3 border border-[#e8dfc8] flex flex-col h-fit" variants={panelVariants}>
            <h3 className="text-[#001810] font-inter font-bold text-sm uppercase tracking-wider mb-0">Event Details</h3>
            
            <div className="flex flex-row gap-4 h-full items-stretch mt-1">
              <motion.div className="flex flex-col justify-start gap-1.5 w-[45%]" variants={detailsFieldsVariants}>
                <motion.div className="flex flex-col gap-0" variants={detailFieldVariants}>
                  <div className="text-[#001810] text-[9px] font-bold uppercase tracking-wider">Dates</div>
                  <div className="text-[#001810] text-[10px] font-medium leading-tight">21ST &ndash; 23RD AUGUST 2026</div>
                </motion.div>
                <div className="w-full h-[1px] bg-black/5 my-0.5"></div>
                <motion.div className="flex flex-col gap-0" variants={detailFieldVariants}>
                  <div className="text-[#001810] text-[9px] font-bold uppercase tracking-wider">Venue</div>
                  <div className="text-[#001810] text-[10px] font-medium leading-tight">PRAGATI MAIDAN, NEW DELHI, INDIA</div>
                </motion.div>
                <div className="w-full h-[1px] bg-black/5 my-0.5"></div>
                <motion.div className="flex flex-col gap-0" variants={detailFieldVariants}>
                  <div className="text-[#001810] text-[9px] font-bold uppercase tracking-wider">Format</div>
                  <div className="text-[#001810] text-[10px] font-medium leading-tight">IN-PERSON CONFERENCE & EXHIBITION</div>
                </motion.div>
                <div className="w-full h-[1px] bg-black/5 my-0.5"></div>
                <motion.div className="flex flex-col gap-0" variants={detailFieldVariants}>
                  <div className="text-[#001810] text-[9px] font-bold uppercase tracking-wider">Organized By</div>
                  <div className="text-[#001810] text-[10px] font-medium leading-tight">AROGYA SANGHOSTHI FOUNDATION</div>
                </motion.div>
              </motion.div>

              {/* Google Map */}
              <motion.div className="w-[55%] bg-gray-200 rounded-lg overflow-hidden relative border border-gray-300" variants={mapVariants}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.843655569632!2d77.22758546992978!3d28.61594503757779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce328b5a553f7%3A0x795cf6ea0f8b5378!2sPragati%20Maidan%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1779771849819!5m2!1sen!2sin" 
                  className="w-full h-full min-h-[120px]" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Event Venue Location"
                ></iframe>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>

        {/* Call to Action Band */}
        <motion.div
          className="bg-[#012b1d] rounded-xl pt-2 pb-1 px-6 md:px-8 mt-4 flex flex-col xl:flex-row items-center justify-between gap-6 shadow-lg w-full border border-[#01412c]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ctaBandVariants}
        >
          {/* Left Side: Icon and Text */}
          <motion.div className="flex flex-col md:flex-row items-center md:items-start gap-4 xl:gap-6 text-center md:text-left flex-1 -ml-2" variants={ctaTextVariants}>
            <img src={t1?.src || t1} alt="Ticket" className="w-14 object-cover shrink-0 transform scale-[1.1] translate-y-1 origin-center ml-2" />
            <div className="flex flex-col gap-1 mt-1 px-2 md:px-0">
              <h3 className="text-white font-inter text-sm xl:text-base leading-tight font-extrabold tracking-wide md:whitespace-nowrap">
                BE PART OF INDIA'S MOST TRANSFORMATIVE HEALTHCARE EVENT
              </h3>
              <p className="text-gray-300 text-[13px] font-medium mt-1">
                Register today and join a global community committed to building a healthier tomorrow.
              </p>
            </div>
          </motion.div>
          
          {/* Right Side: Buttons */}
          <motion.div className="flex flex-wrap justify-center xl:justify-end gap-3 shrink-0" variants={ctaButtonsContainerVariants}>
            {/* Button 1 */}
            <motion.div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0" variants={ctaButtonVariants}>
              <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
              <Sparkle style={{ top: '-8px', left: '45%', animationDelay: '0.4s' }} />
              <Sparkle style={{ top: '-12px', right: '15%', animationDelay: '0.8s' }} />
              <Sparkle style={{ bottom: '-10px', left: '20%', animationDelay: '0.2s' }} />
              <Sparkle style={{ bottom: '-8px', right: '25%', animationDelay: '0.6s' }} />
              
              <Link href="/delegate-registration" target="_blank" rel="noopener noreferrer">
                <button className="golden-btn-hero group rounded-full px-4 py-1.5 text-[#0b2912] transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                  <span>Register as Delegate</span>
                  <ArrowRight size={12} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </motion.div>
            
            {/* Button 2 */}
            <motion.div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0" variants={ctaButtonVariants}>
              <Sparkle color="#111844" style={{ top: '-10px', left: '20%', animationDelay: '0.1s' }} />
              <Sparkle color="#111844" style={{ top: '-8px', left: '60%', animationDelay: '0.5s' }} />
              <Sparkle color="#111844" style={{ bottom: '-10px', left: '30%', animationDelay: '0.3s' }} />
              <Sparkle color="#111844" style={{ bottom: '-8px', right: '15%', animationDelay: '0.7s' }} />
              
              <Link href="/speakers" target="_blank" rel="noopener noreferrer">
                <button className="navy-btn-hero group rounded-full px-4 py-1.5 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                  <span>Become a Speaker</span>
                </button>
              </Link>
            </motion.div>
            
            {/* Button 3 */}
            <motion.div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0" variants={ctaButtonVariants}>
              <Sparkle color="#0A7C6E" style={{ top: '-12px', left: '15%', animationDelay: '0.2s' }} />
              <Sparkle color="#0A7C6E" style={{ top: '-9px', left: '50%', animationDelay: '0.6s' }} />
              <Sparkle color="#0A7C6E" style={{ bottom: '-12px', left: '25%', animationDelay: '0.4s' }} />
              <Sparkle color="#0A7C6E" style={{ bottom: '-9px', right: '20%', animationDelay: '0.8s' }} />
              
              <button className="emerald-btn-hero group rounded-full px-4 py-1.5 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10">
                <span>Book Exhibition Space</span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </section>
    </>
  );
};

export default EventHighlightsSection;
