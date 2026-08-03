"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Calendar, MapPin, Users, Globe, Check, ArrowRight } from 'lucide-react';
import bgImage from '@/assets/banner/sangoobg.webp';
import main22 from '@/assets/icons/main22.png';
import SectionContainer from '@/components/layout/SectionContainer';

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  return img.src || '';
};

// Animated Counter component
const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
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

// Lightweight, performant animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
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
          0%   { opacity: 0; transform: translate3d(0, 0, 0) scale(0.4); }
          50%  { opacity: 1; transform: translate3d(0, -4px, 0) scale(1.2); }
          100% { opacity: 0; transform: translate3d(0, -8px, 0) scale(0.4); }
        }
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .sparkle-star {
          animation: sparkleAnim 1.8s ease-in-out infinite;
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
      `}</style>
      <section className="relative w-full py-0 bg-[#F8F9FA] lg:bg-transparent">
        {/* Background Image Container */}
        <div 
          className="absolute top-0 bottom-0 right-0 -left-[50px] z-0"
          style={{
            backgroundImage: `url(${getImageSrc(bgImage)})`,
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
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            
            {/* Header Title */}
            <motion.div className="flex justify-start items-center gap-4 mt-3 mb-1 w-full" variants={fadeUpVariants}>
              <div className="h-[1px] w-12 bg-[#011a12]/30"></div>
              <h4 className="text-[#011a12] font-semibold tracking-[0.2em] text-xs uppercase">Upcoming Event</h4>
              <div className="h-[1px] w-12 bg-[#011a12]/30"></div>
            </motion.div>
            
            <motion.h1 className="text-5xl md:text-[46px] lg:text-[45px] font-serif font-medium text-[#05241c] mb-2 leading-tight" variants={fadeUpVariants}>
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
            <motion.div className="flex flex-wrap items-center gap-3 md:gap-5 lg:gap-8 mb-4" variants={fadeUpVariants}>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                  <Calendar className="text-white" size={16} />
                </div>
                <div className="text-xs font-bold text-[#001810] leading-tight">
                  21ST &ndash; 23RD<br/>AUGUST 2026
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                  <MapPin className="text-white" size={16} />
                </div>
                <div className="text-xs font-bold text-[#001810] leading-tight">
                  PRAGATI MAIDAN,<br/>NEW DELHI, INDIA
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                  <Users className="text-white" size={16} />
                </div>
                <div className="text-xs font-bold text-[#001810] leading-tight">
                  <CountUp end={1000} />+<br/>DELEGATES
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#001810] flex items-center justify-center shrink-0">
                  <Globe className="text-white" size={16} />
                </div>
                <div className="text-xs font-bold text-[#001810] leading-tight">
                  <CountUp end={25} />+<br/>COUNTRIES
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Info Boxes */}
            <motion.div className="flex flex-col xl:flex-row items-stretch gap-6 mr-4 lg:mr-24 mb-10" variants={fadeUpVariants}>
              
              {/* Countdown Box */}
              <div className="bg-[#001810] rounded-xl p-5 flex flex-col shadow-xl w-full xl:w-[42%] shrink-0 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cba344] to-transparent opacity-50"></div>
                <h4 className="text-[#F3B71B] text-center font-medium text-sm tracking-wider uppercase mb-5">The Countdown Has Begun!</h4>
                <div className="flex justify-between items-center px-3 py-2 border border-[#F3B71B]/40 rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.days}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Days</div>
                  </div>
                  <div className="w-[1px] h-8 bg-[#F3B71B]/30"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Hours</div>
                  </div>
                  <div className="w-[1px] h-8 bg-[#F3B71B]/30"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Minutes</div>
                  </div>
                  <div className="w-[1px] h-8 bg-[#F3B71B]/30"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl lg:text-3xl font-medium text-white leading-none mb-1">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Seconds</div>
                  </div>
                </div>
              </div>
              
              {/* Why You Should Attend Box */}
              <div className="bg-[#f4eee0] rounded-xl py-5 pl-5 pr-6 flex flex-col shadow-xl w-fit border border-[#e8dfc8] relative overflow-hidden">
                {/* Subtle background lotus image */}
                <div className="absolute -bottom-8 -right-8 opacity-70 pointer-events-none">
                   <img src={getImageSrc(main22)} alt="Lotus" className="w-40 h-40 object-contain" />
                </div>
                <h4 className="text-[#001810] font-bold text-sm tracking-wider uppercase mb-4">Why You Should Attend</h4>
                <ul className="flex flex-col gap-2 relative z-10">
                  <li className="flex items-start gap-2">
                    <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                    <span className="text-gray-800 text-[12px] font-medium">Gain insights from global leaders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                    <span className="text-gray-800 text-[12px] font-medium">Discover innovations shaping healthcare</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                    <span className="text-gray-800 text-[12px] font-medium">Network with top professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-[#cba344] shrink-0 mt-0.5" size={16} />
                    <span className="text-gray-800 text-[12px] font-medium">Explore business & collaboration opportunities</span>
                  </li>
                </ul>
              </div>
              
              {/* Register As Delegate Button with Sparkles */}
              <div className="flex flex-col justify-end xl:ml-auto mt-4 xl:mt-0 mb-2 xl:mb-4 xl:-mr-16">
                <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0 self-end">
                  <Sparkle style={{ top: '-12px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle style={{ top: '-10px', left: '45%', animationDelay: '0.4s' }} />
                  <Sparkle style={{ top: '-12px', right: '15%', animationDelay: '0.8s' }} />
                  <Sparkle style={{ bottom: '-12px', left: '20%', animationDelay: '0.2s' }} />
                  <Sparkle style={{ bottom: '-10px', right: '25%', animationDelay: '0.6s' }} />
                  
                  <Link
                    href="/delegate-registration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="golden-btn-hero group rounded-full px-5 py-2 text-[#0b2912] transition-all duration-300 uppercase tracking-[0.12em] text-[10px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg relative z-10 shrink-0"
                  >
                    <span>Register as Delegate</span>
                    <ArrowRight size={13} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
              
            </motion.div>
            
          </motion.div>
        </SectionContainer>
      </section>
    </>
  );
};

export default UpcomingEventSection;



