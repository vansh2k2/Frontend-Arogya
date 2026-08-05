"use client";
import React, { useState, useEffect } from 'react';
import { Target, Lightbulb, Microscope, HeartHandshake, Quote } from 'lucide-react';
import mainIcon from '@/assets/icons/main.webp';
import main2Icon from '@/assets/icons/main22.webp';
import v1Icon from '@/assets/icons/v1.webp';
import c1Icon from '@/assets/icons/c1.webp';
import c2Icon from '@/assets/icons/c2.webp';
import c3Icon from '@/assets/icons/c31.webp';
import c4Icon from '@/assets/icons/c4.webp';
import leafRightIcon from '@/assets/icons/leafright.webp';
import chairmanDefaultImg from '@/assets/speaker1.webp';
import SectionContainer from '@/components/layout/SectionContainer';
import { API_URL, SERVER_URL } from '@/lib/api';

const VisionMissionSection = () => {
  const [chairman, setChairman] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/chairman-message`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && json?.data) {
          setChairman(json.data);
        }
      })
      .catch(() => {
        // Silently fallback to defaults below
      });
  }, []);

  // Resolve chairman image: Cloudinary URL → fallback static asset
  const chairmanImg =
    chairman?.image?.url
      ? (chairman.image.url.startsWith('http') ? chairman.image.url : `${SERVER_URL}${chairman.image.url}`)
      : chairmanDefaultImg;

  const chairmanImgAlt = chairman?.image?.altText || 'Chairman';

  // Resolve leaf-right image: Cloudinary URL → fallback static asset
  const leafImg =
    chairman?.leafRight?.url && chairman.leafRight.url.startsWith('http')
      ? chairman.leafRight.url
      : leafRightIcon;

  const leafAlt = chairman?.leafRight?.altText || 'Leaf Decoration';

  const heading = chairman?.heading || "CHAIRMAN'S MESSAGE";
  const message = chairman?.message ||
    "Healthcare is not just about treatment, it is about integration – of knowledge, systems and compassion.\n\nWith the 18th Edition, we bring together diverse medical systems, innovations, and human values to create a healthier world.";
  const name = chairman?.name || 'Dr. Vansh Chaudhary';
  const designation = chairman?.designation || 'Chairman';

  // Split message into paragraphs
  const paragraphs = message.split('\n').filter((p) => p.trim() !== '');

  return (
    <div className="w-full relative mt-2 mb-8 font-inter ">
      
      <SectionContainer className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
        
        {/* OUR VISION CARD */}
        <div className="w-full lg:w-[21%] bg-[#00291b] rounded-xl p-3 lg:p-4 flex flex-col relative overflow-hidden shadow-lg border border-[#0f5433]">
          {/* Decorative faint leaves or abstract shapes in background if needed */}
          <div className="absolute -bottom-10 -left-10 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
              <path d="M12 21C12 21 4 17.5 4 10.5C4 7 6.5 4.5 10 4.5C11.5 4.5 13 5.5 14 6.5C15 5.5 16.5 4.5 18 4.5C21.5 4.5 24 7 24 10.5C24 17.5 12 21 12 21Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="flex items-center gap-3 mb-3 relative z-10 ml-2 lg:ml-4">
            <img src={(v1Icon as any)?.src || (v1Icon as any)} alt="Vision" className="w-8 h-8 shrink-0 object-contain" />
            <div className="flex flex-col w-full">
              <h3 className="text-[#cfa144] font-extrabold text-lg tracking-wider uppercase font-inter mb-1">OUR VISION</h3>
              <div className="flex items-center gap-1.5">
                <div className="h-[1px] bg-[#cfa144] w-full max-w-[30px]" />
                <img src={(mainIcon as any)?.src || (mainIcon as any)} alt="lotus" className="h-3 w-auto object-contain" />
                <div className="h-[1px] bg-[#cfa144] w-full max-w-[30px]" />
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 relative z-10 mt-1 mb-1">
            <img src={(main2Icon as any)?.src || (main2Icon as any)} alt="Decorative Lotus" className="w-16 h-16 shrink-0 object-contain" />
            <p className="text-white text-[13px] leading-relaxed font-normal font-inter whitespace-nowrap">
              A world where<br/>
              integrated healthcare<br/>
              is accessible, evidence-<br/>
              based and rooted in<br/>
              compassion.
            </p>
          </div>
        </div>

        {/* OUR MISSION CARD */}
        <div className="w-full lg:w-[39%] bg-[#fcfbf8] rounded-xl py-3 px-2 lg:py-4 lg:px-2 flex flex-col shadow-lg border border-[#e2d4b7]/50 relative overflow-hidden">
          <div className="flex flex-col items-center mb-3 w-full text-center">
            <h3 className="text-[#032e1c] font-extrabold text-xl tracking-wider uppercase font-inter mb-2">OUR MISSION</h3>
            <div className="flex items-center gap-1.5 justify-center w-full">
              <div className="h-[1px] bg-[#a07b30] w-12" />
              <img src={(mainIcon as any)?.src || (mainIcon as any)} alt="lotus" className="h-3.5 w-auto object-contain" />
              <div className="h-[1px] bg-[#a07b30] w-12" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 mt-2 sm:divide-x divide-[#cfa144]/30 gap-y-2 sm:gap-y-0">
            {/* MISSION 1 */}
            <div className="flex flex-col items-center text-center px-1 sm:px-2">
              <img src={(c1Icon as any)?.src || (c1Icon as any)} alt="Connect" className="w-10 h-10 object-contain mb-1 shrink-0" />
              <h4 className="text-[#032e1c] font-bold text-[9px] sm:text-[11px] tracking-wider mb-1.5 uppercase leading-snug font-inter">CONNECT</h4>
              <p className="text-black text-[8px] sm:text-[9px] leading-relaxed whitespace-nowrap">
                To connect global<br/>
                experts & communities<br/>
                across disciplines.
              </p>
            </div>
            
            {/* MISSION 2 */}
            <div className="flex flex-col items-center text-center px-1 sm:px-2">
              <img src={(c2Icon as any)?.src || (c2Icon as any)} alt="Collaborate" className="w-10 h-10 object-contain mb-1 shrink-0" />
              <h4 className="text-[#032e1c] font-bold text-[9px] sm:text-[11px] tracking-wider mb-1.5 uppercase leading-snug font-inter">COLLABORATE</h4>
              <p className="text-black text-[8px] sm:text-[9px] leading-relaxed whitespace-nowrap">
                To foster meaningful<br/>
                collaborations for<br/>
                real-world impact.
              </p>
            </div>

            {/* MISSION 3 */}
            <div className="flex flex-col items-center text-center px-1 sm:px-2">
              <img src={(c3Icon as any)?.src || (c3Icon as any)} alt="Innovate" className="w-10 h-10 object-contain mb-1 shrink-0" />
              <h4 className="text-[#032e1c] font-bold text-[9px] sm:text-[11px] tracking-wider mb-1.5 uppercase leading-snug font-inter">INNOVATE</h4>
              <p className="text-black text-[8px] sm:text-[9px] leading-relaxed whitespace-nowrap">
                To promote research<br/>
                & technology for the<br/>
                evolution of healthcare.
              </p>
            </div>

            {/* MISSION 4 */}
            <div className="flex flex-col items-center text-center px-1 sm:px-2">
              <img src={(c4Icon as any)?.src || (c4Icon as any)} alt="Transform" className="w-10 h-10 object-contain mb-1 shrink-0" />
              <h4 className="text-[#032e1c] font-bold text-[9px] sm:text-[11px] tracking-wider mb-1.5 uppercase leading-snug font-inter">TRANSFORM</h4>
              <p className="text-black text-[8px] sm:text-[9px] leading-relaxed whitespace-nowrap">
                To transform lives<br/>
                through preventive &<br/>
                patient-centric care.
              </p>
            </div>
          </div>
        </div>

        {/* CHAIRMAN'S MESSAGE CARD */}
        <div className="w-full lg:w-[40%] bg-[#f8f5f0] rounded-xl p-3 lg:p-4 flex flex-col shadow-lg border border-[#e2d4b7]/50 relative overflow-hidden">
          {/* Leaf decoration right side — from backend or fallback */}
          <img
            src={(leafImg as any)?.src || (leafImg as any)}
            alt={leafAlt}
            className="absolute -top-2 -right-2 w-20 sm:w-28 h-auto object-contain z-0 pointer-events-none"
          />

          <div className="flex flex-col items-center mb-1 w-full text-center relative z-10">
            <h3 className="text-[#032e1c] font-extrabold text-xl tracking-wider uppercase font-inter mb-2">
              {heading}
            </h3>
            <div className="flex items-center gap-1.5 justify-center w-full">
              <div className="h-[1px] bg-[#a07b30] w-12" />
              <img src={(mainIcon as any)?.src || (mainIcon as any)} alt="lotus" className="h-3.5 w-auto object-contain" />
              <div className="h-[1px] bg-[#a07b30] w-12" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 relative z-10 mt-0">
            <div className="w-full sm:w-[40%] shrink-0">
              <div className="bg-gray-200 w-full h-[160px] rounded-lg overflow-hidden shadow-sm">
                <img
                  src={(chairmanImg as any)?.src || (chairmanImg as any)}
                  alt={chairmanImgAlt}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-[60%] flex flex-col relative">
              <Quote className="absolute -top-2 -left-2 text-[#cfa144]/30" size={32} />
              <div className="text-black text-[10px] sm:text-[11px] leading-relaxed space-y-2 relative z-10 pl-2 font-inter">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              
              <div className="mt-2 pl-2">
                <h5 className="text-[#032e1c] font-bold text-xs uppercase tracking-wide">{name}</h5>
                <p className="text-[#4B1426] font-semibold text-[10px] mb-1">{designation}</p>
              </div>
            </div>
          </div>

        </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default VisionMissionSection;

