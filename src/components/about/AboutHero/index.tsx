"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Users, Globe, MonitorPlay, Award, Calendar, Mic, Building2, HeartPulse, Stethoscope, Leaf, Star, Trophy, GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import aboutback from '@/assets/banner/aboutback.webp';
import main22 from '@/assets/icons/main22.webp';
import SectionContainer from '@/components/layout/SectionContainer';
import type { AboutHeroData, AboutHeroStat } from '@/lib/fetchAboutHero';

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

/* Built-in content — shown when the admin-managed banner (GET /api/about-hero) is not available */
const DEFAULT_STATS: AboutHeroStat[] = [
  { icon: 'BookOpen', value: 18, suffix: '+', label: 'Editions' },
  { icon: 'Users', value: 1000, suffix: '+', label: 'Delegates' },
  { icon: 'Globe', value: 25, suffix: '+', label: 'Countries' },
  { icon: 'MonitorPlay', value: 100, suffix: '+', label: 'Sessions' },
];
const DEFAULT_HEADLINE = 'Our Purpose.\nOur Promise. Our Planet.';
const DEFAULT_PARAGRAPH =
  "Arogya Sangoshthi is India's Premier Integrated Healthcare Conference\nuniting Modern Medicine, AYUSH, Technology and Traditional Wisdom\nfor a healthier tomorrow.";

/* Icon names the admin can pick (backend models/about/AboutHero.js) */
const ICONS: Record<string, LucideIcon> = {
  BookOpen, Users, Globe, MonitorPlay, Award, Calendar, Mic, Building2, HeartPulse, Stethoscope, Leaf, Star, Trophy, GraduationCap,
};

/** "Our Purpose.\nOur Promise." → Our Purpose.<br />Our Promise. */
const renderLines = (text: string) =>
  text.split('\n').map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 && <br />}
    </React.Fragment>
  ));

const AboutHero = ({ data }: { data?: AboutHeroData | null }) => {
  // With saved data an image left empty is hidden; without data the built-in images show
  const background = data ? data.backgroundImage || '' : aboutback.src;
  const backgroundAlt = data?.backgroundImageAlt || 'Arogya Sangoshthi About Us background';
  const divider = data ? data.dividerImage || '' : main22.src;
  const dividerAlt = data?.dividerImageAlt || 'Lotus divider';
  const eyebrow = data?.eyebrow || 'ABOUT US';
  const headline = data?.headline || DEFAULT_HEADLINE;
  const paragraph = data ? data.paragraph || '' : DEFAULT_PARAGRAPH;
  const stats = data ? data.stats ?? [] : DEFAULT_STATS;

  return (
    <section className="relative w-full h-[350px] lg:h-[400px] overflow-hidden bg-white">
      {/* Background Image Container with Reduced Width */}
      {background && (
        <div className="absolute top-0 right-0 w-full xl:w-[95%] 2xl:w-[90%] h-full">
          <img
            src={background}
            alt={backgroundAlt}
            className="w-full h-full object-cover object-left"
          />
        </div>
      )}

        {/* Absolute Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-start pt-8 md:pt-10 lg:pt-12 w-full">
          <SectionContainer className="flex justify-start w-full">

            <div className="max-w-sm sm:max-w-md lg:max-w-xl w-full">
              <h4 className="text-[#cba344] font-bold tracking-widest text-xs md:text-sm uppercase mb-2">{eyebrow}</h4>
              {/* The About Us page's only H1 */}
              <h1 className="font-inter text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#142e22] leading-tight mb-0 md:mb-1">
                {renderLines(headline)}
              </h1>

              <div className="flex items-center mb-2 md:mb-4 w-full max-w-[150px] md:max-w-[200px]">
                <div className="h-[2px] bg-[#cba344] flex-1"></div>
                {divider && (
                  <div className="pl-3">
                    <img src={divider} alt={dividerAlt} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                )}
              </div>

              {paragraph && (
                <p className="text-black font-medium mb-6 md:mb-8 leading-relaxed text-xs sm:text-sm md:text-[15px] max-w-sm lg:max-w-lg">
                  {renderLines(paragraph)}
                </p>
              )}

              {stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-2 max-w-2xl mt-2">
                  {stats.map((stat, i) => {
                    const Icon = ICONS[stat.icon] || BookOpen;
                    return (
                      <div key={i} className="flex items-center gap-1.5 md:gap-2">
                        <Icon className="text-[#032e1c] w-6 h-6 md:w-8 md:h-8 shrink-0" strokeWidth={1.5} />
                        <div className="flex flex-col">
                          <span className="font-bold text-[#F3B71B] text-base md:text-xl leading-none"><CountUp end={stat.value} />{stat.suffix}</span>
                          <span className="text-[9px] md:text-[10px] text-[#032e1c] uppercase tracking-wider font-bold mt-0.5">{stat.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </SectionContainer>
        </div>
    </section>
  );
};

export default AboutHero;
