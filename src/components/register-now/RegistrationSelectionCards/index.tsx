import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import singleImg from "@/assets/icons/single.png";
import groupImg from "@/assets/icons/group.png";
import sleafImg from "@/assets/icons/sleaf.png";
import leafRightImg from "@/assets/icons/leafright.png";
import SecureRegistrationBand from '../SecureRegistrationBand';
import { motion } from 'framer-motion';

const Sparkle = ({ style, color = '#173812' }: { style?: React.CSSProperties; color?: string }) => (
  <span style={{ position:'absolute', pointerEvents:'none', fontSize:'13px', color,
    animation:'sparkleAnim 1.6s ease-in-out infinite', opacity:0, zIndex:20, ...style }}>✦</span>
);

// ---- Card 1: "Door Open" 3D flip-in from the left ----
const doorOpenCard = {
  hidden: { opacity: 0, rotateY: -78, x: -50, scale: 0.92 },
  show: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], // expo-out — crisp, premium settle
      delayChildren: 0.35,
      staggerChildren: 0.09,
    },
  },
};

// ---- Card 2: "Elastic Drop" with tilt correction, falls from above ----
const elasticDropCard = {
  hidden: { opacity: 0, y: -90, rotateZ: 9, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 16,
      mass: 0.9,
      delayChildren: 0.45,
      staggerChildren: 0.09,
    },
  },
};

// Shared inner stagger reveal for content (icon / title / divider / desc / features / button)
const childRise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

import { useRouter } from 'next/navigation';
const RegistrationSelectionCards = ({ setRegistrationType }: { setRegistrationType?: any }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[500px] relative">
      {/* Top-Right Animated Leaf Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, rotate: 30, x: 50, y: -40 }}
        whileInView={{ opacity: 0.85, scale: 1, rotate: 0, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.1, delay: 0.15, type: "spring", bounce: 0.45 }}
        className="absolute -top-6 -right-4 sm:-right-8 md:-right-12 md:-top-10 w-28 sm:w-36 md:w-48 z-0 pointer-events-none select-none"
      >
        <motion.img
          animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          src={leafRightImg?.src || leafRightImg}
          alt="Leaf Right"
          className="w-full h-auto object-contain mix-blend-multiply"
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[#204e1f] text-2xl md:text-3xl font-extrabold mb-2 tracking-wide font-inter uppercase relative z-10"
      >
        DELEGATE REGISTRATION
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="flex items-center gap-2 mb-4 origin-center relative z-10"
      >
        <div className="w-16 h-px bg-[#36682e]/50" />
        <div className="w-2 h-2 rounded-full bg-[#36682e]" />
        <div className="w-16 h-px bg-[#36682e]/50" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-black text-sm md:text-base font-medium font-inter text-center mb-6 relative z-10"
      >
        Choose the type of registration that best describes you.
      </motion.p>

      <div
        className="flex flex-col md:flex-row gap-6 w-full max-w-3xl mx-auto relative z-10 font-inter"
        style={{ perspective: 1400 }}
      >
        {/* Card 1: Single — Door Open flip */}
        <motion.div
          variants={doorOpenCard}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          onClick={() => router.push('/new-single-registration')}
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
          className="flex-1 bg-[#fbfdfa] border-2 border-gray-100 hover:border-[#36682e]/30 rounded-2xl px-6 py-5 flex flex-col items-center text-center shadow-[rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] hover:shadow-[rgba(9,30,66,0.25)_0px_2px_4px,rgba(9,30,66,0.13)_0px_0px_2px_1px] transition-shadow duration-300 cursor-pointer relative overflow-hidden group z-10"
        >
          {/* shimmer sweep — left to right, after the card has settled */}
          <motion.div
            initial={{ x: "-120%" }}
            whileInView={{ x: "220%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 2.1, ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
          />

          <img src={sleafImg?.src || sleafImg} alt="" className="absolute bottom-0 left-0 w-16 md:w-24 opacity-90 pointer-events-none z-0" />

          {/* Top-Right Card Leaf Decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 20, x: 20, y: -20 }}
            whileInView={{ opacity: 0.65, scale: 1, rotate: 0, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-16 md:w-20 opacity-60 pointer-events-none z-0"
          >
            <img src={leafRightImg?.src || leafRightImg} alt="" className="w-full h-auto object-contain mix-blend-multiply translate-x-3 -translate-y-3" />
          </motion.div>


          <motion.img
            variants={childRise}
            src={singleImg?.src || singleImg}
            alt="Single Registration"
            className="w-56 h-56 object-contain mb-0 relative z-10"
          />
          <motion.h3 variants={childRise} className="text-xl font-semibold text-[#113111] mb-1.5 uppercase">
            SINGLE REGISTRATION
          </motion.h3>
          <motion.div variants={childRise} className="flex items-center justify-center gap-2 mb-3 w-full">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#c1a052]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </motion.div>
          <motion.p variants={childRise} className="text-xs sm:text-sm text-black font-medium mb-5 max-w-[300px]">
            Register yourself as an individual delegate<br />to participate in the conference.
          </motion.p>

          <div className="flex flex-col gap-2 text-left w-full max-w-[300px] mb-5 mt-auto z-10">
            {[
              "Personal access to all sessions",
              "E-certificate of participation",
              "Networking opportunities",
              "Conference kit",
            ].map((text) => (
              <motion.div
                key={text}
                variants={childRise}
                className="flex items-center gap-3 text-[12px] sm:text-[13px] text-gray-800 font-semibold bg-gradient-to-r from-[#f4f7f4] to-transparent px-4 py-2 rounded-xl border border-gray-100/50"
              >
                <CheckCircle className="w-5 h-5 text-white fill-[#1c4516] shrink-0" /> {text}
              </motion.div>
            ))}
          </div>

          <motion.div variants={childRise} style={{ position:'relative', display:'inline-block' }} className="mt-auto">
            <Sparkle color="#173812" style={{ top:'-14px', left:'10%', animationDelay:'0s' }} />
            <Sparkle color="#173812" style={{ top:'-12px', left:'48%', animationDelay:'0.4s' }} />
            <Sparkle color="#173812" style={{ top:'-10px', right:'15%', animationDelay:'0.7s' }} />
            <Sparkle color="#173812" style={{ bottom:'-14px', right:'16%', animationDelay:'0.8s' }} />
            <Sparkle color="#173812" style={{ bottom:'-12px', left:'30%', animationDelay:'0.3s' }} />
            <Sparkle color="#173812" style={{ bottom:'-8px', left:'5%', animationDelay:'0.6s' }} />
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-[#173812] to-[#25541c] hover:from-[#0f240b] hover:to-[#173812] text-white px-8 py-2.5 rounded-full font-bold text-sm transition-colors duration-300 flex items-center justify-center gap-2 w-[220px] shadow-[0_8px_20px_rgba(32,78,31,0.3)] border border-[#c1a052]/30 relative z-10"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Card 2: Group — Elastic Drop with tilt correction */}
        <motion.div
          variants={elasticDropCard}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          onClick={() => router.push('/new-group-registration')}
          style={{ transformStyle: "preserve-3d" }}
          className="flex-1 bg-[#fbfdfa] border-2 border-gray-100 hover:border-[#36682e]/30 rounded-2xl px-6 py-5 flex flex-col items-center text-center shadow-[rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] hover:shadow-[rgba(9,30,66,0.25)_0px_2px_4px,rgba(9,30,66,0.13)_0px_0px_2px_1px] transition-shadow duration-300 cursor-pointer relative overflow-hidden group z-10"
        >
          {/* shimmer sweep — right to left, different timing so it feels distinct from card 1 */}
          <motion.div
            initial={{ x: "220%" }}
            whileInView={{ x: "-120%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
          />

          <img src={sleafImg?.src || sleafImg} alt="" className="absolute bottom-0 left-0 w-16 md:w-24 opacity-90 pointer-events-none z-0" />

          {/* Top-Right Card Leaf Decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 20, x: 20, y: -20 }}
            whileInView={{ opacity: 0.65, scale: 1, rotate: 0, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-16 md:w-20 opacity-60 pointer-events-none z-0"
          >
            <img src={leafRightImg?.src || leafRightImg} alt="" className="w-full h-auto object-contain mix-blend-multiply translate-x-3 -translate-y-3" />
          </motion.div>

          <motion.img
            variants={childRise}
            src={groupImg?.src || groupImg}
            alt="Group Registration"
            className="w-56 h-56 object-contain mb-0 relative z-10"
          />
          <motion.h3 variants={childRise} className="text-xl font-semibold text-[#113111] mb-1.5 uppercase">
            GROUP REGISTRATION
          </motion.h3>
          <motion.div variants={childRise} className="flex items-center justify-center gap-2 mb-3 w-full">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#c1a052]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </motion.div>
          <motion.p variants={childRise} className="text-xs sm:text-sm text-black font-medium mb-5 max-w-[300px]">
            Register a group of delegates from your<br />organization or institution.
          </motion.p>

          <div className="flex flex-col gap-2 text-left w-full max-w-[300px] mb-5 mt-auto z-10">
            {[
              "Register multiple delegates",
              "Group discount available",
              "E-certificates for all delegates",
              "Dedicated group support",
            ].map((text) => (
              <motion.div
                key={text}
                variants={childRise}
                className="flex items-center gap-3 text-[12px] sm:text-[13px] text-gray-800 font-semibold bg-gradient-to-r from-[#f4f7f4] to-transparent px-4 py-2 rounded-xl border border-gray-100/50"
              >
                <CheckCircle className="w-5 h-5 text-white fill-[#1c4516] shrink-0" /> {text}
              </motion.div>
            ))}
          </div>

          <motion.div variants={childRise} style={{ position:'relative', display:'inline-block' }} className="mt-auto">
            <Sparkle color="#173812" style={{ top:'-14px', left:'10%', animationDelay:'0s' }} />
            <Sparkle color="#173812" style={{ top:'-12px', left:'48%', animationDelay:'0.4s' }} />
            <Sparkle color="#173812" style={{ top:'-10px', right:'15%', animationDelay:'0.7s' }} />
            <Sparkle color="#173812" style={{ bottom:'-14px', right:'16%', animationDelay:'0.8s' }} />
            <Sparkle color="#173812" style={{ bottom:'-12px', left:'30%', animationDelay:'0.3s' }} />
            <Sparkle color="#173812" style={{ bottom:'-8px', left:'5%', animationDelay:'0.6s' }} />
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-[#173812] to-[#25541c] hover:from-[#0f240b] hover:to-[#173812] text-white px-8 py-2.5 rounded-full font-bold text-sm transition-colors duration-300 flex items-center justify-center gap-2 w-[220px] shadow-[0_8px_20px_rgba(32,78,31,0.3)] border border-[#c1a052]/30 relative z-10"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <SecureRegistrationBand />
    </div>
  );
};

export default RegistrationSelectionCards;
