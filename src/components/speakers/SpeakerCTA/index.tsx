"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import ayurvedaImage from '@/assets/icons/ayurveda.png';
import c1Image from '@/assets/icons/cal.png';
import SectionContainer from '@/components/layout/SectionContainer';

// Sparkle component for button
const Sparkle = ({ style, color = '#fff176' }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '16px',
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

const SpeakerCTA = () => {
  return (
    <section className="w-full pt-2 md:pt-4 pb-4 md:pb-6 bg-white relative">
      <SectionContainer>
        
        <div className="bg-[#0c290d] rounded-2xl py-2 md:py-3 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl border border-[#043b24]">
          
          {/* Background decoration */}
          <img 
            src={ayurvedaImage?.src || ayurvedaImage} 
            alt="Ayurveda" 
            className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 h-[120%] md:h-[150%] pointer-events-none object-contain z-0" 
          />

          <div className="flex items-center gap-4 md:gap-5 relative z-10 w-full md:w-auto">
            {/* Calendar Icon Image */}
            <img src={c1Image?.src || c1Image} alt="Calendar" className="w-12 h-12 md:w-16 md:h-16 shrink-0 object-contain" />
            
            {/* Text */}
            <div className="flex flex-col">
              <p className="text-gray-300 text-[11px] md:text-[13px] font-medium font-inter mb-0.5">
                Be a part of insightful sessions and meaningful discussions.
              </p>
              <h2 className="text-white font-inter font-bold text-xl md:text-2xl">
                Register now and secure your seat!
              </h2>
            </div>
          </div>

          {/* Button */}
          <div className="relative z-10 shrink-0 w-full md:w-auto flex justify-center md:justify-end mt-2 md:mt-0 mr-0 md:mr-32 lg:mr-40">
            <style>{`
              @keyframes sparkleAnim {
                0%   { opacity: 0; transform: scale(0.5) translateY(0); }
                40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
                80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
                100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
              }
              @keyframes goldShift {
                0%   { background-position: 0% 50%; }
                50%  { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .golden-btn-cta {
                background: linear-gradient(135deg, #cba344 0%, #ffdd00 30%, #f5c842 60%, #cba344 100%);
                background-size: 200% 200%;
                animation: goldShift 2.5s ease infinite;
                box-shadow: 0 0 15px 2px rgba(203,163,68,0.4);
              }
            `}</style>
            
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
              <Sparkle style={{ top: '-8px', left: '45%', animationDelay: '0.4s' }} />
              <Sparkle style={{ top: '-12px', right: '15%', animationDelay: '0.8s' }} />
              <Sparkle style={{ bottom: '-10px', left: '20%', animationDelay: '0.2s' }} />
              <Sparkle style={{ bottom: '-8px', right: '25%', animationDelay: '0.6s' }} />
              
              <button className="golden-btn-cta group rounded-full px-6 py-2 md:py-2.5 text-[#032e1c] transition-all duration-300 uppercase tracking-[0.12em] text-[11px] md:text-[12px] font-black flex items-center gap-2 relative z-10 w-full md:w-auto justify-center">
                <span>REGISTER NOW</span>
                <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>

      </SectionContainer>
    </section>
  );
};

export default SpeakerCTA;

