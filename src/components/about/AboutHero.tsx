"use client";
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Users, Globe, MonitorPlay } from 'lucide-react';
import aboutback from '@/assets/banner/aboutback.webp'; 
import main22 from '@/assets/icons/main22.webp';
import SectionContainer from '@/components/layout/SectionContainer';

// Animated Counter component
const CountUp = ({ end, duration = 2000 }) => {
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

const AboutHero = () => {
  return (
    <section className="relative w-full h-[350px] lg:h-[400px] overflow-hidden bg-white">
      {/* Background Image Container with Reduced Width */}
      <div className="absolute top-0 right-0 w-full xl:w-[95%] 2xl:w-[90%] h-full">
        <img
          src={aboutback?.src || aboutback}
          alt="About Background"
          className="w-full h-full object-cover object-left"
        />
      </div>
        
        {/* Absolute Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-start pt-8 md:pt-10 lg:pt-12 w-full">
          <SectionContainer className="flex justify-start w-full">
            
            <div className="max-w-sm sm:max-w-md lg:max-w-xl w-full">
              <h4 className="text-[#cba344] font-bold tracking-widest text-xs md:text-sm uppercase mb-2">ABOUT US</h4>
              <h2 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#142e22] leading-tight mb-0 md:mb-1">
                Our Purpose.<br />
                Our Promise. Our Planet.
              </h2>
              
              <div className="flex items-center mb-2 md:mb-4 w-full max-w-[150px] md:max-w-[200px]">
                <div className="h-[2px] bg-[#cba344] flex-1"></div>
                <div className="pl-3">
                  <img src={main22?.src || main22} alt="Divider" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                </div>
              </div>
              
              <p className="text-black font-medium mb-6 md:mb-8 leading-relaxed text-xs sm:text-sm md:text-[15px] max-w-sm lg:max-w-lg">
                Arogya Sangoshthi is India's Premier Integrated Healthcare Conference
                uniting Modern Medicine, AYUSH, Technology and Traditional Wisdom
                for a healthier tomorrow.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-2 max-w-2xl mt-2">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <BookOpen className="text-[#032e1c] w-6 h-6 md:w-8 md:h-8 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="font-bold text-[#F3B71B] text-base md:text-xl leading-none"><CountUp end={18} />+</span>
                    <span className="text-[9px] md:text-[10px] text-[#032e1c] uppercase tracking-wider font-bold mt-0.5">Editions</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Users className="text-[#032e1c] w-6 h-6 md:w-8 md:h-8 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="font-bold text-[#F3B71B] text-base md:text-xl leading-none"><CountUp end={1000} />+</span>
                    <span className="text-[9px] md:text-[10px] text-[#032e1c] uppercase tracking-wider font-bold mt-0.5">Delegates</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Globe className="text-[#032e1c] w-6 h-6 md:w-8 md:h-8 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="font-bold text-[#F3B71B] text-base md:text-xl leading-none"><CountUp end={25} />+</span>
                    <span className="text-[9px] md:text-[10px] text-[#032e1c] uppercase tracking-wider font-bold mt-0.5">Countries</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <MonitorPlay className="text-[#032e1c] w-6 h-6 md:w-8 md:h-8 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="font-bold text-[#F3B71B] text-base md:text-xl leading-none"><CountUp end={100} />+</span>
                    <span className="text-[9px] md:text-[10px] text-[#032e1c] uppercase tracking-wider font-bold mt-0.5">Sessions</span>
                  </div>
                </div>
              </div>
            </div>

          </SectionContainer>
        </div>
    </section>
  );
};

export default AboutHero;
