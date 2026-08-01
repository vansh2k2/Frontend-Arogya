"use client";
import React from 'react';
import { motion } from 'framer-motion';
import leafsImage from '@/assets/icons/leafs.png';
import mainIcon from '@/assets/icons/main.png';
import icon1 from '@/assets/icons/icon1.png';
import icon2 from '@/assets/icons/icon2.png';
import icon3 from '@/assets/icons/icon3.png';
import icon4 from '@/assets/icons/icon4.png';
import a1 from '@/assets/icons/a1.png';
import a2 from '@/assets/icons/a2.png';
import a3 from '@/assets/icons/a3.png';
import a4 from '@/assets/icons/a4.png';
import a5 from '@/assets/icons/a5.png';
import a6 from '@/assets/icons/a6.png';
import SectionContainer from '@/components/layout/SectionContainer';

// Lotus header leaf decoration
const HeaderLeaf = () => (
  <div className="flex justify-center mb-2">
    <svg className="w-6 h-6 text-[#0f5433] filter drop-shadow-sm animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21c0 0-4-3.5-4-7s2.5-5 4-8.5c1.5 3.5 4 5 4 8.5s-4 7-4 7z" fill="currentColor" fillOpacity="0.15" />
      <path d="M12 21c0 0-6-1.5-7.5-5.5s1-6.5 3.5-8.5c1.5 2 3.5 4 4 6" />
      <path d="M12 21c0 0 6-1.5 7.5-5.5s-1-6.5-3.5-8.5c-1.5 2-3.5 4-4 6" />
      <path d="M12 14c-1.5-1.5-3-1.5-4-1" />
      <path d="M12 14c1.5-1.5 3-1.5 4-1" />
    </svg>
  </div>
);

// ---- Scroll-triggered animation variants ----
// Header (logo + title row): gentle fade + drop-in from top
const headerVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

// Outer glass box: soft fade + rise + scale
const boxVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any },
  },
};

// Grid wrapper: orchestrates the staggered reveal of its children
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// "Why Arogya" cards: pop up with a springy settle
const cardItemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14, mass: 0.6 } as any,
  },
};

// Conference track medallions: pop with a slight overshoot for personality
const trackItemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.75 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 160, damping: 11, mass: 0.5 } as any,
  },
};

const WhyArogyaAndTracks = () => {
  const whyCards = [
    {
      title: "INTEGRATED HEALTHCARE",
      text: "Uniting AYUSH, Modern Medicine & Wellness for a holistic future",
      icon: <img src={(icon1 as any)?.src || (icon1 as any)} alt="Integrated Healthcare" className="h-10 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      title: "KNOWLEDGE EXCHANGE",
      text: "Connect with global experts and thought leaders",
      icon: <img src={(icon2 as any)?.src || (icon2 as any)} alt="Knowledge Exchange" className="h-10 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      title: "INDUSTRY NETWORKING",
      text: "Build meaningful partnerships and business opportunities",
      icon: <img src={(icon3 as any)?.src || (icon3 as any)} alt="Industry Networking" className="h-10 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      title: "RESEARCH & INNOVATION",
      text: "Driving research, innovation & evidence based healthcare",
      icon: <img src={(icon4 as any)?.src || (icon4 as any)} alt="Research & Innovation" className="h-10 w-auto object-contain mb-2 transition-transform duration-300 group-hover:scale-110" />
    }
  ];

  const tracks = [
    {
      label: "AYUSH",
      textColor: "text-[#0f5433]",
      borderColor: "border-[#b2d3c2]",
      bgColor: "bg-gradient-to-br from-[#f2f7f4] to-[#e1efe8]",
      glowColor: "hover:shadow-[0_0_16px_rgba(15,84,51,0.30)]",
      icon: <img src={(a1 as any)?.src || (a1 as any)} alt="AYUSH" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
    },
    {
      label: <>MODERN<br />MEDICINE</>,
      textColor: "text-[#1a4f8b]",
      borderColor: "border-[#b5cce7]",
      bgColor: "bg-gradient-to-br from-[#f3f6fa] to-[#e2ebf5]",
      glowColor: "hover:shadow-[0_0_16px_rgba(26,79,139,0.30)]",
      icon: <img src={(a2 as any)?.src || (a2 as any)} alt="MODERN MEDICINE" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
    },
    {
      label: <>PHARMA<br />INNOVATION</>,
      textColor: "text-[#632ca6]",
      borderColor: "border-[#ceb3eb]",
      bgColor: "bg-gradient-to-br from-[#f7f3fb] to-[#ece0f7]",
      glowColor: "hover:shadow-[0_0_16px_rgba(99,44,166,0.30)]",
      icon: <img src={(a3 as any)?.src || (a3 as any)} alt="PHARMA INNOVATION" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
    },
    {
      label: <>WELLNESS &<br />LIFESTYLE</>,
      textColor: "text-[#3d7a1f]",
      borderColor: "border-[#c2ddb2]",
      bgColor: "bg-gradient-to-br from-[#f5f8f3] to-[#e7f0e2]",
      glowColor: "hover:shadow-[0_0_16px_rgba(61,122,31,0.30)]",
      icon: <img src={(a4 as any)?.src || (a4 as any)} alt="WELLNESS & LIFESTYLE" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
    },
    {
      label: <>RESEARCH &<br />ACADEMICS</>,
      textColor: "text-[#7a541a]",
      borderColor: "border-[#dfc299]",
      bgColor: "bg-gradient-to-br from-[#faf6f0] to-[#f2e7d5]",
      glowColor: "hover:shadow-[0_0_16px_rgba(122,84,26,0.30)]",
      icon: <img src={(a5 as any)?.src || (a5 as any)} alt="RESEARCH & ACADEMICS" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
    },
    {
      label: <>HEALTHCARE<br />TECHNOLOGY</>,
      textColor: "text-[#0f5c54]",
      borderColor: "border-[#b2dbd5]",
      bgColor: "bg-gradient-to-br from-[#f2f8fa] to-[#e1f0f5]",
      glowColor: "hover:shadow-[0_0_16px_rgba(15,92,84,0.30)]",
      icon: <img src={(a6 as any)?.src || (a6 as any)} alt="HEALTHCARE TECHNOLOGY" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
    }
  ];

  return (
    <section 
      className="relative bg-[#f7f4eb]  pt-2 pb-5 sm:pt-3 sm:pb-8 border-b border-[#ebdcb3]/20"
      style={{
        backgroundImage: `url(${(leafsImage as any)?.src || (leafsImage as any)})`,
        backgroundPosition: '-45px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '140px',
      }}
    >
      <SectionContainer className="relative z-10 font-inter">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-6 items-stretch">
          
          {/* LEFT PANEL - WHY AROGYA SANGHOSTHI */}
          <div className="xl:col-span-6 flex flex-col h-full justify-between">
            {/* Header */}
            <motion.div
              className="flex flex-col items-center mb-3 w-full text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={headerVariants}
            >
              <img src={(mainIcon as any)?.src || (mainIcon as any)} alt="Logo" className="h-7 w-auto object-contain mb-2" />
              <div className="flex items-center gap-2 sm:gap-3 w-full justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
                <div className="h-[1px] bg-gradient-to-r from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px]" />
                <h3 className="text-[#032e1c] font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap font-inter">
                  WHY AROGYA SANGHOSTHI?
                </h3>
                <div className="h-[1px] bg-gradient-to-l from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
              </div>
            </motion.div>

            {/* Container Box with elegant border and shadow */}
            <motion.div
              className="bg-[#faf8f3]/70 backdrop-blur-sm border border-[#e3dac4] rounded-2xl p-3 sm:p-4 shadow-[0_10px_35px_rgba(40,30,10,0.04)] flex-grow flex items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={boxVariants}
            >
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={gridVariants}
              >
                {whyCards.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    variants={cardItemVariants}
                    className="group bg-[#f5f2e6] border border-[#ebe7da] rounded-xl p-3 flex flex-col items-center text-center transition-all duration-500 hover:border-[#a99539]/50 hover:bg-[#fff] hover:shadow-[0_8px_20px_rgba(169,149,57,0.08)] hover:-translate-y-1"
                  >
                    {card.icon}
                    {/* Title */}
                    <h4 className="text-[#032e1c] font-bold text-[9px] sm:text-[11px] tracking-wider mb-1.5 uppercase leading-snug font-inter">
                      {card.title}
                    </h4>
                    {/* Subtext */}
                    <p className="text-black text-[8px] sm:text-[9px] leading-relaxed line-clamp-3 sm:line-clamp-4">
                      {card.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT PANEL - CONFERENCE TRACKS */}
          <div className="xl:col-span-6 flex flex-col h-full justify-between">
            {/* Header */}
            <motion.div
              className="flex flex-col items-center mb-3 w-full text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={headerVariants}
            >
              <img src={(mainIcon as any)?.src || (mainIcon as any)} alt="Logo" className="h-7 w-auto object-contain mb-2" />
              <div className="flex items-center gap-2 sm:gap-3 w-full justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
                <div className="h-[1px] bg-gradient-to-r from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px]" />
                <h3 className="text-[#032e1c] font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap font-inter">
                  CONFERENCE TRACKS
                </h3>
                <div className="h-[1px] bg-gradient-to-l from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
              </div>
            </motion.div>

            {/* Container Box with elegant border and shadow */}
            <motion.div
              className="bg-[#faf8f3]/90 backdrop-blur-sm border border-[#e3dac4] rounded-2xl p-3 sm:p-4 shadow-[0_10px_35px_rgba(40,30,10,0.04)] flex-grow flex items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={boxVariants}
            >
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={gridVariants}
              >
                {tracks.map((track, idx) => (
                  <motion.div key={idx} variants={trackItemVariants} className="group flex flex-col items-center text-center">
                    {/* Icon with circular border — like demo image */}
                    <div className={`
                      flex items-center justify-center
                      w-16 h-16 sm:w-[72px] sm:h-[72px]
                      rounded-full
                      border-2 ${track.borderColor} ${track.bgColor}
                      ${track.glowColor}
                      mb-2
                      transition-all duration-300
                      group-hover:scale-105
                    `}>
                      {track.icon}
                    </div>
                    {/* Label */}
                    <h4 className={`text-[9px] sm:text-[10px] md:text-[10px] font-bold font-inter tracking-wider mb-1.5 ${track.textColor} uppercase leading-snug block w-full px-0.5`}>
                      {track.label}
                    </h4>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
};

export default WhyArogyaAndTracks;
