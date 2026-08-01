"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { partnersPageApi } from '@/lib/api';
import adbg from '@/assets/banner/adbg.webp';
import gg1 from '@/assets/icons/gg1.png';
import gg2 from '@/assets/icons/gg2.png';
import gg3 from '@/assets/icons/gg3.png';

gsap.registerPlugin(ScrollTrigger);

const fallbackSettings = {
  blueTitle: 'OUR PARTNERS',
  greenTitle: '& ASSOCIATES',
  description: 'United by a shared vision for a healthier, sustainable and innovative tomorrow.',
  badge1Title: 'Trusted Collaborations',
  badge2Title: 'Stronger Together',
  badge3Title: 'Impacting Lives',
  bgImage: '',
  bgImageAlt: 'Partners & Associates Banner',
};

const PartnersHero = () => {
  const [settings, setSettings] = useState(fallbackSettings);
  const sectionRef = useRef(null);
  const titleRef1 = useRef(null);
  const titleRef2 = useRef(null);
  const lineRef = useRef(null);
  const paraRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    partnersPageApi.get().then(data => {
      if (data?.settings) {
        setSettings({ ...fallbackSettings, ...data.settings });
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(titleRef1.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo(titleRef2.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo(lineRef.current, { width: 0, opacity: 0 }, { width: '4rem', opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .fromTo(paraRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .fromTo(badgesRef.current?.children, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.15 }, '-=0.1');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bgStyle = settings.bgImage
    ? { backgroundImage: `url(${settings.bgImage?.src || settings.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center 20%', backgroundRepeat: 'no-repeat' }
    : { backgroundImage: `url(${adbg?.src || adbg})`, backgroundSize: 'cover', backgroundPosition: 'center 20%', backgroundRepeat: 'no-repeat' };

  return (
    <div ref={sectionRef} className="w-full relative pt-16 pb-10 overflow-hidden" style={bgStyle}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 font-inter">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-[60%] z-10 flex flex-col items-start text-left lg:ml-8 xl:ml-12">
            <h1 ref={titleRef1} className="text-[#112E81] text-2xl md:text-3xl lg:text-5xl font-bold uppercase leading-tight tracking-tight mb-1">
              {settings.blueTitle}
            </h1>
            <h1 ref={titleRef2} className="text-[#498111] text-2xl md:text-3xl lg:text-5xl font-bold uppercase leading-tight tracking-tight mb-4">
              {settings.greenTitle}
            </h1>
            <div ref={lineRef} className="w-16 h-1 bg-[#498111] mb-4"></div>
            <p ref={paraRef} className="text-black text-base md:text-lg font-medium mb-8 max-w-lg">
              {settings.description}
            </p>
            {/* Badges */}
            <div ref={badgesRef} className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <div className="flex items-center gap-3">
                <img src={gg1?.src || gg1} alt={settings.badge1Title} className="w-12 h-12 object-contain shrink-0" />
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {settings.badge1Title.split(' ')[0]}<br />{settings.badge1Title.split(' ').slice(1).join(' ')}
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <img src={gg2?.src || gg2} alt={settings.badge2Title} className="w-12 h-12 object-contain shrink-0" />
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {settings.badge2Title.split(' ')[0]}<br />{settings.badge2Title.split(' ').slice(1).join(' ')}
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <img src={gg3?.src || gg3} alt={settings.badge3Title} className="w-12 h-12 object-contain shrink-0" />
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {settings.badge3Title.split(' ')[0]}<br />{settings.badge3Title.split(' ').slice(1).join(' ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersHero;
