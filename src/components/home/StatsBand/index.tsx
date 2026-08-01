"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Users, Mic, Calendar, Globe, Handshake } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';

const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const numericPart = value.replace(/,/g, '').match(/\d+/);
    if (!numericPart) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numericPart[0], 10);
    const suffix = value.includes('+') ? '+' : '';
    const hasComma = value.includes(',');

    setDisplayValue(`0${suffix}`);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const duration = 4000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * target);

            const formattedCount = hasComma 
              ? currentCount.toLocaleString('en-US') 
              : currentCount.toString();

            setDisplayValue(`${formattedCount}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value]);

  return <span ref={elementRef}>{displayValue}</span>;
};

const StatsBand = () => {
  const stats = [
    {
      icon: <Users size={24} className="text-[#cfa144] shrink-0" />,
      number: '150+',
      label: 'EXPERT SPEAKERS',
    },
    {
      icon: <Mic size={24} className="text-[#cfa144] shrink-0" />,
      number: '18',
      label: 'PREMIUM SESSIONS',
    },
    {
      icon: <Calendar size={24} className="text-[#cfa144] shrink-0" />,
      number: '3',
      label: 'DAYS MAJOR CONFERENCES',
    },
    {
      icon: <Users size={24} className="text-[#cfa144] shrink-0" />,
      number: '1,000+',
      label: 'VISITORS/DELEGATES',
    },
    {
      icon: <Globe size={24} className="text-[#cfa144] shrink-0" />,
      number: '1,000+',
      label: 'GLOBAL BUYERS',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#cfa144] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 100 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 100-8c-2 0-4 1.33-6 4z" />
        </svg>
      ),
      number: 'ENDLESS',
      label: 'OPPORTUNITIES',
    },
  ];

  return (
    <SectionContainer className="-mt-6 mb-4 relative z-20 font-inter">
      <div className="bg-[#032e1c] border border-white/5 rounded-xl shadow-2xl px-6 py-2.5 lg:py-2 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-3 lg:gap-y-0 gap-x-2 lg:gap-x-4 w-full">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center gap-1.5 w-[45%] sm:w-[30%] lg:w-auto justify-start lg:justify-center px-1">
              <div className="shrink-0 flex items-center justify-center">
                {stat.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-semibold text-xs sm:text-sm md:text-base leading-none">
                  <AnimatedCounter value={stat.number} />
                </span>
                <span className="text-gray-300 font-medium text-[8px] sm:text-[9px] uppercase tracking-wider mt-0.5 sm:mt-1 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </div>

            {index < stats.length - 1 && (
              <div className="hidden lg:block w-[1px] h-5 bg-white/10 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </SectionContainer>
  );
};

export default StatsBand;

