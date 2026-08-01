"use client";
import React, { useState, useEffect, useRef } from 'react';
import speakerBg from '@/assets/banner/speakerbg.webp';
import leafDecoration from '@/assets/icons/leafs.png';
import mainIcon from '@/assets/icons/main.png';
import P1Icon from '@/assets/icons/P1.png';
import { Users, Mic, Calendar, Globe, Target, UserCheck } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';
import { API_URL, SERVER_URL } from '@/lib/api';

// Animated Counter component
const CountUp = ({ end, duration = 4000 }) => {
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

const SpeakerHero = () => {
  const [heroData, setHeroData] = useState(null);
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    // Fetch Hero Data
    fetch(`${API_URL}/speakers/hero`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHeroData(data.data);
        }
      })
      .catch(err => console.error('Error fetching speaker hero:', err));

    // Fetch Counters
    fetch(`${API_URL}/speakers/counters`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCounters(data.data);
        }
      })
      .catch(err => console.error('Error fetching speaker counters:', err));
  }, []);

  const iconMap = {
    UserCheck,
    Mic,
    Calendar,
    Users,
    Globe,
    Target
  };

  const stats = counters.map(c => {
    const IconComponent = iconMap[c.icon] || UserCheck;
    const numMatch = c.number.match(/\d+/);
    
    let num = undefined;
    let suffix = '';
    let value = undefined;

    if (numMatch) {
      num = parseInt(numMatch[0]);
      suffix = c.number.replace(numMatch[0], '');
    } else {
      value = c.number;
    }

    return {
      icon: <IconComponent size={24} className="text-[#F3B71B]" strokeWidth={1.5} />,
      num,
      suffix,
      value,
      label: c.label
    };
  });

  const getImageUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${SERVER_URL}${url}`;
  };

  const currentBg = heroData?.backgroundImage ? getImageUrl(heroData.backgroundImage) : speakerBg;

  return (
    <section className="relative w-full h-[320px] md:h-[360px] lg:h-[500px] bg-[#fdfaf5] flex items-center mb-8 md:mb-10">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${currentBg?.src || currentBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat'
          }}
          aria-label={heroData?.backgroundImageAlt || "Speakers Hero Background"}
        ></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 relative z-10 -mt-10">
        <div className="max-w-xl">
          <div className="flex flex-col mb-4">
            <h2 
              className="text-[#cba344] font-serif text-2xl md:text-3xl lg:text-4xl mb-2 ml-4 md:ml-8"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
            >
              {heroData?.heading || "Our Esteemed"}
            </h2>
            <div className="relative inline-block self-start ml-2 md:ml-6">
              <img src={P1Icon?.src || P1Icon} alt="Decoration" className="absolute -top-6 md:-top-8 right-2 md:right-4 w-10 md:w-14 h-auto" />
              <h1 className="text-[#032e1c] font-serif font-bold text-4xl md:text-5xl lg:text-[67px] leading-none">
                {heroData?.title || "Speakers"}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <div className="w-16 md:w-24 h-[1px] bg-[#cba344]"></div>
              <img src={mainIcon?.src || mainIcon} alt="Decoration" className="w-5 md:w-7 h-auto opacity-80" />
            </div>
          </div>
          
          <p className="text-gray-800 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mt-4 font-inter whitespace-pre-line">
            {heroData?.shortDescription || "Meet the leading experts, researchers and\npractitioners who are shaping the future of\nintegrated healthcare, wellness and innovation."}
          </p>
        </div>
      </div>

      {/* Overlapping Stats Band */}
      <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 flex justify-center w-full z-20">
        <SectionContainer className="w-full">
          <div className="w-full bg-[#032e1c] border border-[#043b24] rounded-xl md:rounded-2xl py-2 md:py-3 px-4 md:px-10 shadow-[0_15px_40px_rgba(3,46,28,0.15)] flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 md:gap-4 relative">
          
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-4 flex-1 min-w-[140px] justify-center md:justify-start">
              <div className="shrink-0">
                {stat.icon}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#F3B71B] font-bold text-lg md:text-xl leading-none font-inter">
                  {stat.num !== undefined ? (
                    <><CountUp end={stat.num} />{stat.suffix}</>
                  ) : (
                    stat.value
                  )}
                </span>
                <span className="text-white font-semibold text-[8px] md:text-[9px] uppercase tracking-widest mt-0.5">{stat.label}</span>
              </div>
              {/* Divider between items (hidden on last item and mobile) */}
              {idx < stats.length - 1 && (
                <div className="hidden lg:block w-px h-10 bg-[#044a2c] ml-auto"></div>
              )}
            </div>
          ))}

          </div>
        </SectionContainer>
      </div>
    </section>
  );
};

export default SpeakerHero;

