"use client";
import React, { useEffect, useState, useRef } from 'react';
import pa1 from '@/assets/icons/pa1.png';
import pa2 from '@/assets/icons/pa2.png';
import pa3 from '@/assets/icons/pa3.png';
import pa4 from '@/assets/icons/pa4.png';
import pa5 from '@/assets/icons/pa5.png';
import SectionContainer from '@/components/layout/SectionContainer';

const statsData = [
  { icon: pa1, number: '50+', text: 'News Mentions' },
  { icon: pa2, number: '25+', text: 'Media Partners' },
  { icon: pa3, number: '100+', text: 'Press Releases' },
  { icon: pa4, number: '1M+', text: 'Digital Reach' },
  { icon: pa5, number: 'Growing', text: 'Every Day' },
];

const AnimatedCounter = ({ endStr }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const numMatch = endStr.match(/\d+/);
  const endNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = endStr.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!endNum) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const duration = 2000;
          
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * endNum));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(endNum);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [endNum, hasAnimated]);

  if (!endNum) return <span>{endStr}</span>;

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const BlogStats = () => {
  return (
    <div className="py-2 bg-white font-inter">
      <SectionContainer>
        <div className="bg-[#f9f8f3] rounded-2xl py-3 px-8 flex flex-wrap justify-between items-center gap-4">
          {statsData.map((stat, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3">
                <img src={stat.icon?.src || stat.icon} alt="" className="w-[35px] h-auto object-contain" />
                <div>
                  <h4 className="font-inter font-bold text-[#012c20] text-[19px] leading-tight mb-0.5">
                    <AnimatedCounter endStr={stat.number} />
                  </h4>
                  <p className="font-inter text-[11px] text-black font-semibold">{stat.text}</p>
                </div>
              </div>
              {idx < statsData.length - 1 && (
                <div className="hidden lg:block w-[1.5px] h-10 bg-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default BlogStats;

