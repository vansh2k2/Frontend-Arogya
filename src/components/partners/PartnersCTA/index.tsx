"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import cleaf from '@/assets/icons/cleaf.png';
import ww from '@/assets/icons/ww.png';

const Sparkle = ({ style, color = '#fff176' }) => (
  <span style={{ position:'absolute', pointerEvents:'none', fontSize:'13px', color,
    animation:'sparkleAnim 1.6s ease-in-out infinite', opacity:0, zIndex:20, ...style }}>✦</span>
);

const PartnersCTA = () => {
  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity:0; transform:scale(0.5) translateY(0); }
          40%  { opacity:1; transform:scale(1.2) translateY(-4px); }
          80%  { opacity:0.5; transform:scale(0.9) translateY(-6px); }
          100% { opacity:0; transform:scale(0.5) translateY(-8px); }
        }
        @keyframes goldShift {
          0%,100% { background-position:0% 50%; }
          50%      { background-position:100% 50%; }
        }
        @keyframes shimmer {
          0%   { left:-75%; }
          100% { left:150%; }
        }
        .btn-red {
          background:linear-gradient(135deg,#c72f3e 0%,#E03F4F 30%,#f45b69 60%,#c72f3e 100%);
          background-size:200% 200%;
          animation:goldShift 2.5s ease infinite;
          box-shadow:0 0 18px 4px rgba(224,63,79,0.3);
          position:relative; overflow:hidden;
          border:2px solid white !important;
        }
        .btn-red::before {
          content:''; position:absolute; top:-50%; left:-75%; width:50%; height:200%;
          background:linear-gradient(to right,transparent,rgba(255,255,255,0.58),transparent);
          transform:skewX(-20deg); animation:shimmer 2s infinite;
        }
      `}</style>
      <div className="w-full bg-[#0a2312] relative overflow-hidden py-6 px-6 border-b-4 border-[#8bc53f]">
        {/* Decorative background elements */}
        <div className="absolute right-0 top-0 w-64 h-full opacity-20 bg-gradient-to-l from-[#8bc53f] to-transparent pointer-events-none"></div>
        <img src={cleaf?.src || cleaf} alt="Leaf" className="absolute -right-10 -bottom-10 w-48 opacity-80 pointer-events-none transform -rotate-12" />
        
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="flex-1 flex flex-col md:flex-row items-center gap-6 md:gap-16 pl-0">
            <img src={ww?.src || ww} alt="Icon" className="w-32 md:w-40 object-contain shrink-0 transform scale-[1.3] md:scale-[1.6] origin-center" />
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-medium font-inter uppercase tracking-wide mb-2">
                TOGETHER, SHAPING THE FUTURE OF <br className="hidden md:block" />
                <span className="text-[#8bc53f]">HEALTHCARE, WELLNESS & INNOVATION</span>
              </h2>
              <p className="text-gray-200 text-sm md:text-base font-medium font-inter">
                Join hands with global leaders and be a part of IHWE 2026.
              </p>
            </div>
          </div>
          
          <div className="shrink-0 pr-0 md:pr-48 mt-4 md:mt-0">
            <div style={{ position:'relative', display:'inline-block' }} className="shrink-0">
              <Sparkle color="#E03F4F" style={{ top:'-14px', left:'10%', animationDelay:'0s' }} />
              <Sparkle color="#E03F4F" style={{ top:'-12px', left:'48%', animationDelay:'0.4s' }} />
              <Sparkle color="#E03F4F" style={{ bottom:'-14px', right:'16%', animationDelay:'0.8s' }} />
              <button className="btn-red group text-white font-bold font-inter text-xs px-6 py-2.5 rounded-full flex items-center gap-2 transition shadow-lg relative z-10">
                PARTNER WITH US
                <ArrowRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default PartnersCTA;

