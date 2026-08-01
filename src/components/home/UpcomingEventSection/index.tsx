"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Globe, Clock, User, BookOpen, Handshake, Network, Check, ArrowRight } from 'lucide-react';
import bgImage from '@/assets/banner/sangoobg.webp';
import main22 from '@/assets/icons/main22.png';
import SectionContainer from '@/components/layout/SectionContainer';

// Animated Counter component
const CountUp = ({ end, duration = 3000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};

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

// ---- Scroll-triggered animation variants ----

// Root: orchestrates the whole left column as a top-level cascade
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.05,
    },
  },
};

// Generic fade-up for simple text blocks
const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Hero heading: a touch more travel for extra presence
const headingVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

// Decorative divider lines either side of "Upcoming Event": draw outward
const lineLeftVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Info icon row: its own nested stagger for the 4 pills
const iconsRowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const iconItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.6, rotate: -14 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 220, damping: 15, mass: 0.5 },
  },
};

// Bottom row is a pure pass-through so each box can have its own distinct motion
const bottomRowVariants = { hidden: {}, visible: {} };

// Countdown box: glides in from the left
const countdownBoxVariants = {
  hidden: { opacity: 0, x: -48, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// The 4 digit blocks inside the countdown: pop in one-by-one like a clock assembling
const countdownDigitsRowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.35 },
  },
};

const digitItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 240, damping: 16 },
  },
};

// "Why Attend" box: glides in from the right, mirroring the countdown box
const attendBoxVariants = {
  hidden: { opacity: 0, x: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Checklist items cascade in after the box has arrived
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// CTA: arrives last with a confident springy pop
const ctaVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 14, delay: 0.55 },
  },
};

const UpcomingEventSection = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('August 21, 2026 09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

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
      `}</style>
      <section className="relative w-full py-0 bg-[#F8F9FA] overflow-hidden lg:bg-transparent">
        {/* Background Image Container */}
        <div 
          className="absolute top-0 bottom-0 right-0 -left-[50px] z-0"
          style={{
            backgroundImage: `url(${bgImage?.src || bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right -30px',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Mobile Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[3px] lg:hidden z-0 pointer-events-none" />
        <SectionContainer className="relative z-10 flex flex-col lg:flex-row gap-8 xl:gap-12 py-6 lg:py-0">
        {/* Main Content Area */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          
          {/* Header Title */}
          <motion.div className="flex justify-start items-center gap-4 mt-3 mb-1 w-full" variants={fadeUpVariants}>
            <motion.div className="h-[1px] w-12 bg-[#011a12]/30" style={{ transformOrigin: 'right' }} variants={lineLeftVariants}></motion.div>
            <h4 className="text-[#011a12] font-semibold tracking-[0.2em] text-xs uppercase">Upcoming Event</h4>
            <motion.div className="h-[1px] w-12 bg-[#011a12]/30" style={{ transformOrigin: 'left' }} variants={lineLeftVariants}></motion.div>
          </motion.div>
          
          <motion.h1 className="text-5xl md:text-[46px] lg:text-[45px] font-serif font-medium text-[#05241c] mb-2 leading-tight" variants={headingVariants}>
            Arogya Sanghosthi 2026
          </motion.h1>
          
          <motion.h3 className="text-[#cb8134] font-inter font-medium text-xs md:text-sm mb-3 uppercase tracking-wider" variants={fadeUpVariants}>
            18TH EDITION &mdash; INDIA'S PREMIER INTEGRATED HEALTHCARE CONFERENCE
          </motion.h3>
          
          <motion.p className="text-gray-900 text-xs md:text-sm mb-3 leading-relaxed font-medium" variants={fadeUpVariants}>
            A global platform bringing together the best minds from Medical, Pharma, Health Tech, AYUSH<br />
            and Traditional Medical Systems to drive innovation, collaboration and a healthier tomorrow.
          </motion.p>
          
          {/* Info Icons Row */}
          <motion.div className="flex flex-wrap items-center gap-3 md:gap-5 lg:gap-8 mb-4" variants={iconsRowVariants}>
            <motion.div className="flex items-center gap-2" variants={iconItemVariants}>
              <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                <Calendar className="text-white" size={16} />
              </div>
              <div className="text-xs font-bold text-[#001810] leading-tight">
                21ST &ndash; 23RD<br/>AUGUST 2026
              </div>
            </motion.div>
            
            <motion.div className="flex items-center gap-2" variants={iconItemVariants}>
              <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                <MapPin className="text-white" size={16} />
              </div>
              <div className="text-xs font-bold text-[#001810] leading-tight">
                PRAGATI MAIDAN,<br/>NEW DELHI, INDIA
              </div>
            </motion.div>
            
            <motion.div className="flex items-center gap-2" variants={iconItemVariants}>
              <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                <Users className="text-white" size={16} />
              </div>
              <div className="text-xs font-bold text-[#001810] leading-tight">
                <CountUp end={1000} />+<br/>DELEGATES
              </div>
            </motion.div>
            
            <motion.div className="flex items-center gap-2" variants={iconItemVariants}>
              <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                <Globe className="text-white" size={16} />
              </div>
              <div className="text-xs font-bold text-[#001810] leading-tight">
                <CountUp end={25} />+<br/>COUNTRIES
              </div>
            </motion.div>
          </motion.div>
          
          {/* Bottom Info Boxes */}
          <motion.div className="flex flex-col xl:flex-row items-stretch gap-6 mr-4 lg:mr-24 mb-10" variants={bottomRowVariants}>
            
            {/* Countdown Box */}
            <motion.div className="bg-[#001810] rounded-xl p-5 flex flex-col shadow-xl w-full xl:w-[42%] shrink-0 border border-white/10 relative overflow-hidden" variants={countdownBoxVariants}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cba344] to-transparent opacity-50"></div>
              <h4 className="text-[#F3B71B] text-center font-medium text-sm tracking-wider uppercase mb-5">The Countdown Has Begun!</h4>
              <motion.div className="flex justify-between items-center px-3 py-2 border border-[#F3B71B]/40 rounded-lg" variants={countdownDigitsRowVariants}>
                <motion.div className="flex flex-col items-center" variants={digitItemVariants}>
                  <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.days}</div>
                  <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Days</div>
                </motion.div>
                <div className="w-[1px] h-8 bg-[#F3B71B]/30"></div>
                <motion.div className="flex flex-col items-center" variants={digitItemVariants}>
                  <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Hours</div>
                </motion.div>
                <div className="w-[1px] h-8 bg-[#F3B71B]/30"></div>
                <motion.div className="flex flex-col items-center" variants={digitItemVariants}>
                  <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Minutes</div>
                </motion.div>
                <div className="w-[1px] h-8 bg-[#F3B71B]/30"></div>
                <motion.div className="flex flex-col items-center" variants={digitItemVariants}>
                  <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Seconds</div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Why You Should Attend Box */}
            <motion.div className="bg-[#f4eee0] rounded-xl py-5 pl-5 pr-6 flex flex-col shadow-xl w-fit border border-[#e8dfc8] relative overflow-hidden" variants={attendBoxVariants}>
              {/* Subtle background lotus image (optional) */}
              <div className="absolute -bottom-8 -right-8 opacity-70">
                 <img src={main22?.src || main22} alt="Lotus" className="w-40 h-40 object-contain" />
              </div>
              <h4 className="text-[#001810] font-bold text-sm tracking-wider uppercase mb-4">Why You Should Attend</h4>
              <motion.ul className="flex flex-col gap-2 relative z-10" variants={listVariants}>
                <motion.li className="flex items-start gap-2" variants={listItemVariants}>
                  <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-800 text-[12px] font-medium">Gain insights from global leaders</span>
                </motion.li>
                <motion.li className="flex items-start gap-2" variants={listItemVariants}>
                  <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-800 text-[12px] font-medium">Discover innovations shaping healthcare</span>
                </motion.li>
                <motion.li className="flex items-start gap-2" variants={listItemVariants}>
                  <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-800 text-[12px] font-medium">Network with top professionals</span>
                </motion.li>
                <motion.li className="flex items-start gap-2" variants={listItemVariants}>
                  <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                  <span className="text-gray-800 text-[12px] font-medium">Explore business & collaboration opportunities</span>
                </motion.li>
              </motion.ul>
            </motion.div>
            
            {/* Register As Delegate Button */}
            <motion.div className="flex flex-col justify-end xl:ml-auto mt-4 xl:mt-0 mb-2 xl:mb-4 xl:-mr-16" variants={ctaVariants}>
              <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0 self-end">
                <Sparkle style={{ top: '-15px', left: '10%', animationDelay: '0s' }} />
                <Sparkle style={{ top: '-12px', left: '45%', animationDelay: '0.4s' }} />
                <Sparkle style={{ top: '-16px', right: '15%', animationDelay: '0.8s' }} />
                <Sparkle style={{ bottom: '-15px', left: '20%', animationDelay: '0.2s' }} />
                <Sparkle style={{ bottom: '-12px', right: '25%', animationDelay: '0.6s' }} />
                <Sparkle style={{ top: '20%', left: '-10px', animationDelay: '0.3s' }} />
                <Sparkle style={{ top: '60%', right: '-10px', animationDelay: '0.7s' }} />
                
                <a
                  href="/delegate-registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="golden-btn-hero group rounded-full px-4 py-1.5 text-[#0b2912] transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg shrink-0 relative z-10"
                >
                  <span>Register as Delegate</span>
                  <ArrowRight size={12} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
            
          </motion.div>
          
        </motion.div>
      </SectionContainer>
    </section>
    </>
  );
};

export default UpcomingEventSection;
