"use client";
import React from 'react';
import { motion } from 'framer-motion';
import aboutBg from '@/assets/banner/aboutbg.webp';
import mainIcon from '@/assets/icons/main.webp';
import { Calendar, MapPin, Users } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';

// ---- Scroll-triggered animation variants ----

// Background image: slow Ken-Burns style zoom-out + fade, adds cinematic depth
const bgVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// Card: orchestrates the cascading reveal of everything inside it
const cardVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

// ABOUT label + lotus row: slides in from the left
const labelRowVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Generic fade-up used for headings & paragraphs
const fadeUpVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Info-pills row: itself orchestrates its 3 children with a springy pop
const pillsRowVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.05,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 170, damping: 13, mass: 0.5 },
  },
};

const AboutConferenceSection = () => {
  return (
    <div className="relative w-full font-inter min-h-[500px] md:min-h-[400px] flex items-center" style={{ lineHeight: 1 }}>
      {/* Background Image */}
      <motion.img
        src={aboutBg?.src || aboutBg}
        alt="About the Conference"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: 'center 20%',
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={bgVariants}
      />

      {/* Overlay Content — left side */}
      <div className="relative z-10 w-full py-8 md:py-0">
        <SectionContainer>
          <motion.div
            className="w-full sm:max-w-[80%] md:max-w-[42%] md:-mt-10 bg-white/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 sm:p-6 md:p-0 rounded-2xl md:rounded-none border border-white/60 md:border-transparent shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:shadow-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >

            {/* ABOUT label + lotus with lines */}
            <motion.div className="flex items-center gap-4 mb-2" variants={labelRowVariants}>
              <span className="text-[#b78941] font-semibold text-[13px] sm:text-[15px] tracking-widest uppercase font-poppins">
                ABOUT
              </span>
              <div className="flex items-center gap-2">
                <div className="h-[1px] bg-[#a99539] w-[40px]" />
                <img src={mainIcon?.src || mainIcon} alt="lotus" className="h-7 w-auto object-contain" />
                <div className="h-[1px] bg-[#a99539] w-[40px]" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="font-bold leading-tight text-[#1a2e1a] font-inter"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}
              variants={fadeUpVariants}
            >
              ABOUT
            </motion.h2>
            <motion.h2
              className="font-bold leading-tight mb-2 font-inter"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)', color: '#ba8f4d' }}
              variants={fadeUpVariants}
            >
              THE CONFERENCE
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-[#323f37] font-bold text-[12px] sm:text-[14px] tracking-wider uppercase mb-2 font-inter"
              variants={fadeUpVariants}
            >
              INDIA'S PREMIER PLATFORM FOR INTEGRATED HEALTHCARE
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-black text-[12px] sm:text-[15px] leading-relaxed mb-2 font-inter"
              variants={fadeUpVariants}
            >
              Now in its 9th Edition, this landmark conference brings together the best minds from across the globe to advance the frontiers of healthcare.
            </motion.p>
            <motion.p
              className="text-black text-[12px] sm:text-[15px] leading-relaxed mb-3 font-inter"
              variants={fadeUpVariants}
            >
              A confluence of AYUSH, Modern Medicine, Pharma, Health Tech and Traditional Medical Systems — working together for a healthier, sustainable and equitable tomorrow.
            </motion.p>

            {/* Info pills */}
            <motion.div
              className="flex flex-wrap md:flex-nowrap items-center gap-y-3 gap-x-2 sm:gap-x-4 text-black font-bold text-[9px] sm:text-[11px] lg:text-[13px] uppercase mb-3 -mt-1 border-b border-[#e2d4b7]/60 py-2 sm:py-3 w-full"
              variants={pillsRowVariants}
            >
              <motion.div className="flex items-center gap-1.5 sm:gap-2 shrink-0" variants={pillVariants}>
                <Calendar size={22} className="text-[#a07b30] shrink-0" />
                <span>21-23 AUGUST 2026</span>
              </motion.div>
              <div className="hidden md:block w-[1.5px] h-8 bg-[#a07b30] shrink-0" />
              <motion.div className="flex items-center gap-1.5 sm:gap-2 shrink-0" variants={pillVariants}>
                <MapPin size={22} className="text-[#a07b30] shrink-0" />
                <span className="leading-tight">PRAGATI MAIDAN,<br />NEW DELHI</span>
              </motion.div>
              <div className="hidden md:block w-[1.5px] h-8 bg-[#a07b30] shrink-0" />
              <motion.div className="flex items-center gap-1.5 sm:gap-2 shrink-0" variants={pillVariants}>
                <Users size={22} className="text-[#a07b30] shrink-0" />
                <span className="leading-tight">1000+ DELEGATES<br />FROM 25+ COUNTRIES</span>
              </motion.div>
            </motion.div>

          </motion.div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default AboutConferenceSection;
