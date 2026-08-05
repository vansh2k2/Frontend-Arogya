"use client";
import React, { useState, useEffect } from 'react';
import founderImg from '@/assets/guest1.jpg';
import main22 from '@/assets/icons/main22.webp';
import gold1 from '@/assets/icons/gold1.png';
import SectionContainer from '@/components/layout/SectionContainer';
import { API_URL, SERVER_URL } from '@/lib/api';

const AboutFounder = () => {
  const [data, setData] = useState({
    heading: "ABOUT THE FOUNDER",
    name: "PANKAJ JAIN",
    designation: "Founder, Namo Gange Trust",
    description: "A visionary leader with a deep commitment to holistic health, sustainability and nation building. His mission is to create a healthier India by integrating ancient wisdom with modern science, empowering communities and driving meaningful change.",
    messageHeading: "FOUNDER'S MESSAGE",
    message: "True wellness is the balance of body, mind, society and nature. Through Arogya Sangoshthi and Namo Gange Trust, we aim to inspire collective action for a healthier and sustainable Bharat.",
    image: { url: '', altText: 'Pankaj Jain' }
  });

  useEffect(() => {
    const fetchFounderMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/founder-message`);
        const data = await response.json();
        if (data?.success && data?.data) {
          setData(data.data);
        }
      } catch (error) {
        console.error("Error fetching founder message:", error);
      }
    };
    fetchFounderMessage();
  }, []);

  return (
    <section className="-mt-3 md:-mt-5 pb-6 md:pb-8 bg-[#f8f7f3] relative z-20">
      <SectionContainer>
        <div className="bg-[#00281a] rounded-2xl md:rounded-[2rem] px-6 sm:px-10 lg:px-14 py-5 md:py-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch justify-between">

          {/* Lotus Background - Bottom Right */}
          <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4 w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
            <img src={main22?.src || main22} alt="" className="w-full h-full object-contain" />
          </div>

          {/* ───── LEFT: Founder Info ───── */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center sm:items-start md:w-[48%] lg:w-[46%] relative z-10">

            {/* Circular Image with Leaf Decor */}
            <div className="relative shrink-0 w-[110px] h-[110px] md:w-[130px] md:h-[130px] xl:w-[140px] xl:h-[140px]">
              {/* Gold Leaf */}
              <img
                src={gold1?.src || gold1}
                alt=""
                className="absolute bottom-2 md:bottom-3 -left-1 md:-left-6 w-[45px] md:w-[55px] h-auto object-contain pointer-events-none z-20"
              />
              {/* Photo Ring */}
              <div className="w-full h-full rounded-full border-[3px] border-[#cba344] bg-[#f8f5ee] overflow-hidden relative z-10 shadow-lg">
                <img
                  src={data.image?.url ? (data.image.url.startsWith('http') ? data.image.url : `${SERVER_URL}${data.image.url}`) : founderImg}
                  alt={data.image?.altText || data.name}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center sm:text-left pt-1 flex-1">
              <p className="text-white/70 text-[10px] font-semibold tracking-[2px] uppercase mb-1">
                {data.heading}
              </p>
              <h2 className="text-[#cba344] font-serif text-[20px] md:text-[24px] lg:text-[26px] font-bold uppercase leading-tight mb-0.5">
                {data.name}
              </h2>
              <p className="text-white font-semibold text-[10px] md:text-[11px] mb-2">
                {data.designation}
              </p>
              <p className="text-white/75 text-[10px] md:text-[11px] leading-[1.6] max-w-[320px]">
                {data.description}
              </p>
            </div>
          </div>

          {/* ───── DIVIDER ───── */}
          {/* Desktop: vertical dotted */}
          <div className="hidden md:block w-px border-r-2 border-dotted border-[#cba344]/40 self-stretch relative z-10 mx-1 lg:mx-3 my-1" />
          {/* Mobile: horizontal dotted */}
          <div className="md:hidden border-b-2 border-dotted border-[#cba344]/40 w-full relative z-10" />

          {/* ───── RIGHT: Founder's Message ───── */}
          <div className="md:w-[48%] lg:w-[50%] relative z-10 flex flex-col justify-center pb-2 md:pb-0">

            <p className="text-white/70 text-[10px] font-semibold tracking-[2px] uppercase mb-3 text-center md:text-left">
              {data.messageHeading}
            </p>

            <div className="relative pl-8 md:pl-10">
              {/* Opening quote */}
              <span className="text-[#cba344] text-[40px] md:text-[50px] absolute -top-4 left-0 font-serif leading-none select-none">
                “
              </span>

              <p className="text-white/90 text-[11px] md:text-[12px] leading-[1.6] mb-3 pr-2 -ml-2 md:-ml-3 whitespace-pre-wrap">
                {data.message}
              </p>

              {/* Attribution row */}
              <div className="flex items-center gap-3 flex-wrap mt-1">
                <div className="flex items-center gap-3 flex-1 relative -top-1 md:-top-3">
                  <span className="text-white font-semibold text-[11px] md:text-[12px] whitespace-nowrap">
                    – {data.name}
                  </span>

                  {/* Divider line + dot + line */}
                  <div className="flex items-center gap-2 flex-1 min-w-[80px]">
                    <div className="h-px bg-[#cba344]/55 flex-1" />
                    <div className="w-[6px] h-[6px] rounded-full border border-[#cba344]/70 shrink-0" />
                    <div className="h-px bg-[#cba344]/55 flex-1" />
                  </div>
                </div>

                {/* Closing quote */}
                <span className="text-[#cba344] text-[40px] md:text-[50px] font-serif leading-none select-none inline-block relative -top-1 md:-top-2">
                  ”
                </span>
              </div>
            </div>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
};

export default AboutFounder;