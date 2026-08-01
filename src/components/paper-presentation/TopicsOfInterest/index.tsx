"use client";
import React, { useEffect, useRef } from 'react';
import P1Icon from '@/assets/icons/P1.png';
import f1 from '@/assets/icons/f1.png';
import f2 from '@/assets/icons/f2.png';
import f3 from '@/assets/icons/f3.png';
import f4 from '@/assets/icons/f4.png';
import f5 from '@/assets/icons/f5.png';
import f6 from '@/assets/icons/f6.png';
import f7 from '@/assets/icons/f7.png';
import f8 from '@/assets/icons/f8.png';
import footerRightImage from '@/assets/icons/footerright.png';
import SectionContainer from '@/components/layout/SectionContainer';

const topics = [
  { id: 1, title: 'AYUSH Systems', desc: <><span className="whitespace-nowrap">Traditional medicine, integrative</span><br />approaches, clinical research</>, icon: f1 },
  { id: 2, title: 'Modern Medicine', desc: <><span className="whitespace-nowrap">Advancements in diagnostics,</span><br />therapeutics & patient care</>, icon: f2 },
  { id: 3, title: 'Pharma Innovation', desc: <><span className="whitespace-nowrap">Drug discovery, formulation,</span><br />biotechnology & more</>, icon: f3 },
  { id: 4, title: 'Wellness & Lifestyle', desc: <><span className="whitespace-nowrap">Nutrition, yoga, mental health,</span><br />well-being & lifestyle</>, icon: f4 },
  { id: 5, title: 'Research & Academia', desc: <><span className="whitespace-nowrap">Basic science, clinical studies,</span><br />epidemiology & public health</>, icon: f5 },
  { id: 6, title: 'Healthcare Technology', desc: <><span className="whitespace-nowrap">Digital health, AI, IoT, medical</span><br />devices & innovations</>, icon: f6 },
  { id: 7, title: 'Public Health', desc: 'Community health, policy, environment & sanitation', icon: f7 },
  { id: 8, title: 'Sustainable Health', desc: 'Environment, biodiversity, one health & sustainability', icon: f8 },
];

const TopicsOfInterest = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const idx = parseInt(el.dataset.index);
            setTimeout(() => {
              el.classList.add('toi-card-visible');
            }, idx * 200);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .toi-card-animate {
          opacity: 0;
          transform: translateX(-60px) rotate(-4deg);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.2s ease;
        }
        .toi-card-visible {
          opacity: 1 !important;
          transform: translateX(0) rotate(0deg) !important;
        }
        .toi-card-animate:hover {
          transform: translateY(-3px) scale(1.015) !important;
          box-shadow: rgba(9,30,66,0.22) 0px 6px 16px,
                      rgba(9,30,66,0.13) 0px 0px 1px 1px !important;
        }
      `}</style>

      <section className="w-full bg-[#fbfcf7] pt-0 pb-12 md:pt-0 md:pb-16 -mt-2 md:-mt-4 relative z-20 overflow-hidden">
        
        {/* Right side background decoration */}
        <img 
          src={footerRightImage?.src || footerRightImage} 
          alt="decoration" 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-48 md:w-64 opacity-100 pointer-events-none z-0" 
        />
        
        <SectionContainer className="relative z-10">

          {/* Header */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <img src={P1Icon?.src || P1Icon} alt="decoration" className="w-8 md:w-10 h-auto object-contain" />
            <h2 className="text-[#032e1c] font-inter font-bold text-xl md:text-2xl uppercase tracking-wider text-center">
              TOPICS OF INTEREST
            </h2>
            <img src={P1Icon?.src || P1Icon} alt="decoration" className="w-8 md:w-10 h-auto object-contain" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {topics.map((topic, index) => (
              <div
                key={topic.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className="toi-card-animate bg-white border border-gray-100 rounded-2xl pt-4 px-4 pb-2 md:pt-5 md:px-5 md:pb-3 shadow-[rgba(9,30,66,0.25)_0px_1px_1px,rgba(9,30,66,0.13)_0px_0px_1px_1px] flex items-start gap-3 md:gap-4"
              >
                <img src={topic.icon?.src || topic.icon} alt={topic.title} className="w-12 md:w-14 h-16 md:h-30 object-contain shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#032e1c] font-semibold text-sm mb-2 leading-tight">{topic.title}</h3>
                  <p className="text-gray-900 text-[11.5px] xl:text-xs tracking-tight leading-relaxed font-medium">
                    {topic.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </SectionContainer>
      </section>
    </>
  );
};

export default TopicsOfInterest;
