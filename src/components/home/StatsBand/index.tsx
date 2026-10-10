"use client";
import React, { useEffect, useState, useRef } from 'react';
import {
  Award, Briefcase, Building2, Calendar, Globe, GraduationCap, Handshake, HeartPulse,
  Infinity as InfinityIcon, MapPin, Mic, Presentation, Star, TrendingUp, Trophy, Users,
  type LucideIcon,
} from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';
import type { StatsBandItem } from '@/lib/fetchStatsBand';

/* Icon names saved by arogya-admin (backend models/home/StatsBand.js) */
const ICONS: Record<string, LucideIcon> = {
  'users': Users,
  'mic': Mic,
  'calendar': Calendar,
  'globe': Globe,
  'infinity': InfinityIcon,
  'handshake': Handshake,
  'award': Award,
  'briefcase': Briefcase,
  'building': Building2,
  'star': Star,
  'trending-up': TrendingUp,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  'map-pin': MapPin,
  'presentation': Presentation,
  'trophy': Trophy,
};

/* Built-in counters — shown when the admin-managed band (GET /api/stats-band) is not available */
const DEFAULT_STATS: StatsBandItem[] = [
  { number: '150+', label: 'EXPERT SPEAKERS', icon: 'users' },
  { number: '18', label: 'PREMIUM SESSIONS', icon: 'mic' },
  { number: '3', label: 'DAYS MAJOR CONFERENCES', icon: 'calendar' },
  { number: '1,000+', label: 'VISITORS/DELEGATES', icon: 'users' },
  { number: '1,000+', label: 'GLOBAL BUYERS', icon: 'globe' },
  { number: 'ENDLESS', label: 'OPPORTUNITIES', icon: 'infinity' },
];

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

const StatsBand = ({ data }: { data?: StatsBandItem[] | null }) => {
  const stats = (data?.length ? data : DEFAULT_STATS).map((stat) => {
    const Icon = ICONS[stat.icon] ?? Users;
    return {
      icon: <Icon size={24} className="text-[#cfa144] shrink-0" />,
      number: stat.number,
      label: stat.label,
    };
  });

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

