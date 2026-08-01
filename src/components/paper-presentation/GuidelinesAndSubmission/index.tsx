"use client";
import React from 'react';
import { Download, ArrowRight, FileText, CheckCircle2, Laptop } from 'lucide-react';
import key1 from '@/assets/icons/key1.png';
import leafsImage from '@/assets/icons/leafs.png';
import ke11 from '@/assets/icons/ke11.png';
import ke22 from '@/assets/icons/ke22.png';
import ke2 from '@/assets/icons/ke2.png';
import SectionContainer from '@/components/layout/SectionContainer';

const Sparkle = ({ style, color = '#F3B71B' }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '20px',
      color: color,
      textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const GuidelinesAndSubmission = () => {
  const guidelines = [
    "Original, unpublished work is invited.",
    "Abstract length: Up to 300 words.",
    "Full paper (if selected): 2500 - 4000 words.",
    "Format: MS Word, A4 size, 1.5 line spacing.",
    "Referencing: Vancouver Style.",
    "Presentations: Oral / Poster.",
    "Best Paper Awards for outstanding presentations."
  ];

  const steps = [
    { num: 1, title: 'STEP 1', desc: 'Submit your abstract through the online portal.' },
    { num: 2, title: 'STEP 2', desc: 'Receive acceptance notification via email.' },
    { num: 3, title: 'STEP 3', desc: 'Submit your full paper (if selected).' },
    { num: 4, title: 'STEP 4', desc: 'Present your paper at Arogya Sanghosthi 2026.' }
  ];

  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
      `}</style>
      <section className="w-full bg-white pt-2 pb-12 md:pt-4 md:pb-16 -mt-2 md:-mt-4 relative z-20 overflow-hidden">
      {/* Left side background decoration */}
      <img 
        src={leafsImage?.src || leafsImage} 
        alt="decoration" 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-32 md:w-48 opacity-100 pointer-events-none z-0" 
      />
      
      <SectionContainer className="grid md:grid-cols-2 gap-8 md:gap-10 relative z-10">
        
        {/* LEFT: GUIDELINES */}
        <div className="bg-[#fbfaf6] rounded-2xl pt-4 px-6 pb-3 md:pt-6 md:px-10 md:pb-4 border border-[#e5e9d9] shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={ke11?.src || ke11} alt="Guidelines" className="w-10 md:w-12 h-auto object-contain shrink-0" />
              <h3 className="text-[#032e1c] font-inter font-bold text-lg md:text-xl uppercase tracking-wider">
                GUIDELINES FOR AUTHORS
              </h3>
            </div>
            
            <ul className="space-y-2.5 mb-6 z-10 relative">
              {guidelines.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#032e1c] shrink-0 mt-0.5" />
                  <span className="text-black text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative z-10">
            <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
              <Sparkle color="#0D530E" style={{ top: '-12px', left: '10%', animationDelay: '0s' }} />
              <Sparkle color="#0D530E" style={{ top: '-8px', left: '45%', animationDelay: '0.4s' }} />
              <Sparkle color="#0D530E" style={{ top: '-14px', right: '15%', animationDelay: '0.8s' }} />
              <Sparkle color="#0D530E" style={{ bottom: '-12px', left: '20%', animationDelay: '0.2s' }} />
              <Sparkle color="#0D530E" style={{ bottom: '-8px', right: '25%', animationDelay: '0.6s' }} />
              <Sparkle color="#0D530E" style={{ top: '20%', left: '-8px', animationDelay: '0.3s' }} />
              <Sparkle color="#0D530E" style={{ top: '60%', right: '-8px', animationDelay: '0.7s' }} />
              
              <button className="bg-[#0D530E] hover:bg-[#09390a] border-2 border-white shadow-md group rounded-md px-6 py-3 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 relative z-10 w-fit">
                DOWNLOAD GUIDELINES <Download size={16} />
              </button>
            </div>
          </div>

          {/* Decorative graphic */}
          <img src={key1?.src || key1} alt="decoration" className="absolute right-4 bottom-10 w-32 md:w-40 h-auto opacity-100 pointer-events-none" />
        </div>

        {/* RIGHT: SUBMISSION */}
        <div className="bg-[#fbfaf6] rounded-2xl pt-4 px-6 pb-3 md:pt-6 md:px-10 md:pb-4 border border-[#e5e9d9] shadow-sm relative overflow-hidden flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={ke22?.src || ke22} alt="Process" className="w-10 md:w-12 h-auto object-contain shrink-0" />
              <h3 className="text-[#032e1c] font-inter font-bold text-lg md:text-xl uppercase tracking-wider">
                SUBMISSION PROCESS
              </h3>
            </div>

            <div className="space-y-4 mb-6 z-10 relative">
              {steps.map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#e2e8ce] flex items-center justify-center shrink-0 border border-[#ccd5af] text-[#032e1c] font-bold">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-[#032e1c] font-bold text-xs mb-1">{step.title}</h4>
                    <p className="text-black text-sm font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
              <Sparkle color="#0D530E" style={{ top: '-12px', left: '10%', animationDelay: '0s' }} />
              <Sparkle color="#0D530E" style={{ top: '-8px', left: '45%', animationDelay: '0.4s' }} />
              <Sparkle color="#0D530E" style={{ top: '-14px', right: '15%', animationDelay: '0.8s' }} />
              <Sparkle color="#0D530E" style={{ bottom: '-12px', left: '20%', animationDelay: '0.2s' }} />
              <Sparkle color="#0D530E" style={{ bottom: '-8px', right: '25%', animationDelay: '0.6s' }} />
              <Sparkle color="#0D530E" style={{ top: '20%', left: '-8px', animationDelay: '0.3s' }} />
              <Sparkle color="#0D530E" style={{ top: '60%', right: '-8px', animationDelay: '0.7s' }} />
              
              <button className="bg-[#0D530E] hover:bg-[#09390a] border-2 border-white shadow-md group rounded-md px-6 py-3 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 relative z-10 w-fit">
                SUBMIT ABSTRACT NOW <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Decorative graphic */}
          <img src={ke2?.src || ke2} alt="decoration" className="absolute right-4 bottom-10 w-36 md:w-48 h-auto opacity-100 pointer-events-none" />
        </div>

      </SectionContainer>
    </section>
    </>
  );
};

export default GuidelinesAndSubmission;

