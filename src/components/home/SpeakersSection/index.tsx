"use client";
import { useState, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight, User } from 'lucide-react';
import speakersData from '@/data/speakersData';
import { optimizeCloudinaryUrl } from '@/utils/imageOptimization';

const SpeakerCard = ({ speaker, accentColor }) => (
  <div 
    className="group relative bg-white border border-slate-100 p-3 hover:shadow-xl hover:scale-[0.98] transition-all duration-300 cursor-pointer"
    style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
  >
    {/* Top Accent Line */}
    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
    
    <div className="flex flex-col items-center">
      {/* Small Image */}
      <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-50 border border-slate-100 mb-3 group-hover:border-orange-100 transition-colors">
        <img
          src={optimizeCloudinaryUrl(speaker.image, 200)}
          alt={speaker.name}
          className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-110"
        />
      </div>

      <div className="text-center w-full">
        <h3 className="text-[13px] font-bold text-slate-800 group-hover:text-orange-600 transition-colors leading-tight mb-1 truncate">
          {speaker.name}
        </h3>
        <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide mb-1 truncate">
          {speaker.role}
        </p>
        <p className="text-[10px] text-slate-500 leading-tight line-clamp-1">
          {speaker.org}
        </p>
      </div>
    </div>
  </div>
);

const SpeakersSection = () => {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const row1Speakers = speakersData.slice(0, 11);
  const row2Speakers = speakersData.slice(11);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex1((prev) => (prev + 1) % row1Speakers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [row1Speakers.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex2((prev) => (prev + 1) % row2Speakers.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [row2Speakers.length]);

  const getRow1Display = () => {
    const display = [];
    for (let i = 0; i < 6; i++) {
      display.push(row1Speakers[(currentIndex1 + i) % row1Speakers.length]);
    }
    return display;
  };

  const getRow2Display = () => {
    const display = [];
    for (let i = 0; i < 6; i++) {
      display.push(row2Speakers[(currentIndex2 + i) % row2Speakers.length]);
    }
    return display;
  };

  return (
    <section className="py-20 bg-white relative ">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-emerald-50/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 mb-5 border-l-4 border-orange-600">
            <Award size={14} className="text-orange-700" />
            <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">Distinguished Panel</span>
          </div>

          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            SANGOSHTHI PRESENT <span className="text-orange-600">SPEAKERS 2025</span>
          </h2>
          <p className="text-slate-500 text-[15px] max-w-2xl">Expert practitioners and visionaries sharing transformative insights in medicine.</p>
        </div>

        {/* First Row */}
        <div className="relative mb-8 group/row">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getRow1Display().map((speaker, idx) => (
              <SpeakerCard 
                key={`row1-${currentIndex1}-${idx}`} 
                speaker={speaker} 
                accentColor="from-orange-500 to-orange-300"
              />
            ))}
          </div>
          
          {/* Subtle Navigation Overlays */}
          <button 
            onClick={() => setCurrentIndex1(p => (p - 1 + row1Speakers.length) % row1Speakers.length)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all z-20 shadow-sm"
            aria-label="Previous Row 1 Speakers"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentIndex1(p => (p + 1) % row1Speakers.length)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all z-20 shadow-sm"
            aria-label="Next Row 1 Speakers"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Second Row */}
        <div className="relative group/row">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {getRow2Display().map((speaker, idx) => (
              <SpeakerCard 
                key={`row2-${currentIndex2}-${idx}`} 
                speaker={speaker} 
                accentColor="from-emerald-500 to-emerald-300"
              />
            ))}
          </div>

          <button 
            onClick={() => setCurrentIndex2(p => (p - 1 + row2Speakers.length) % row2Speakers.length)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 hover:bg-orange-600 hover:text-white transition-all z-20 shadow-sm"
            aria-label="Previous Row 2 Speakers"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentIndex2(p => (p + 1) % row2Speakers.length)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all z-20 shadow-sm"
            aria-label="Next Row 2 Speakers"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default SpeakersSection;
