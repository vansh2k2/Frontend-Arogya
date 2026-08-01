"use client";
import React, { useState, useEffect, useRef } from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import i1 from '@/assets/icons/i1.png';
import i2 from '@/assets/icons/i2.png';
import i3 from '@/assets/icons/i3.png';
import i4 from '@/assets/icons/i4.png';
import i5 from '@/assets/icons/i5.png';
import i6 from '@/assets/icons/i6.png';

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

const impactData = [
  { image: i1, value: 1000, suffix: "+", label: <>Health Camps<br/>Organized</> },
  { image: i2, value: 50000, suffix: "+", label: <>Beneficiaries<br/>Reached</> },
  { image: i3, value: 25, suffix: "+", label: <>States & UTs<br/>Covered</> },
  { image: i4, value: 100, suffix: "+", label: <>Partners &<br/>Organizations</> },
  { image: i5, value: 100, suffix: "+", label: <>Projects<br/>Executed</> },
  { image: i6, value: "Countless", suffix: "", label: <>Lives Touched<br/>Every Day</> }
];

const OurImpact = () => {
  return (
    <section className="bg-[#f8f7f3] pt-2 md:pt-3 pb-1 md:pb-2 relative z-20 overflow-hidden">
      <SectionContainer>
        {/* Impact Band */}
        <div className="relative border border-[#d2ccbf] rounded-[1rem] px-6 pt-6 pb-1 md:px-8 md:pt-4 md:pb-2 flex flex-wrap xl:flex-nowrap justify-between items-center gap-8 xl:gap-0">
          {/* Title breaking the top border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f8f7f3] px-4 text-[#00281a] font-inter font-extrabold text-[14px] md:text-[16px] uppercase tracking-wide whitespace-nowrap">
            OUR IMPACT SO FAR
          </div>

          {/* Items */}
          {impactData.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 justify-center xl:justify-start">
                  <img src={item.image} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0" />
                  <div className="flex flex-col">
                    <div className="text-[#00281a] font-extrabold text-[17px] md:text-[20px] font-inter leading-none mb-1">
                      {typeof item.value === 'number' ? (
                        <><CountUp end={item.value} />{item.suffix}</>
                      ) : (
                        <>{item.value}{item.suffix}</>
                      )}
                    </div>
                    <div className="text-black/80 font-medium text-[10.5px] md:text-[11.5px] leading-tight">
                      {item.label}
                    </div>
                  </div>
                </div>
                {/* Divider */}
                {idx < impactData.length - 1 && (
                  <div className="hidden xl:block w-[1px] h-12 bg-[#d2ccbf] mx-2 2xl:mx-4 shrink-0" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </SectionContainer>
    </section>
  );
};

export default OurImpact;
