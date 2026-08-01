"use client";
import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import sleaf from '@/assets/icons/P1.png';
import { ChevronLeft, ChevronRight, ArrowRight, User } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';
import { previousSpeakersApi, SERVER_URL } from '@/lib/api';
import { optimizeCloudinaryUrl } from '@/utils/imageOptimization';

const PreviousSpeakersRow = () => {
  const [heading, setHeading] = useState('PREVIOUS EDITION SPEAKERS');
  const [speakers, setSpeakers] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const hdg = await previousSpeakersApi.getHeading();
      if (hdg && hdg.heading) setHeading(hdg.heading);
      const items = await previousSpeakersApi.getItems();
      if (items) setSpeakers(items);
    };
    fetchData();
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false, dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollLeft = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollRight = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="w-full pt-0 pb-2 md:pb-4 bg-white relative">
      <SectionContainer>
        <style>{`
          .custom-thin-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-thin-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-thin-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }
          .custom-thin-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-0">
          <div className="flex justify-center items-center gap-4 mb-2">
            <img src={sleaf?.src || sleaf} alt="Decoration" className="w-8 md:w-10 h-auto object-contain" />
            <h2 className="text-[#032e1c] font-inter font-bold text-lg md:text-xl uppercase tracking-wider text-center">
              {heading}
            </h2>
            <img src={sleaf?.src || sleaf} alt="Decoration" className="w-8 md:w-10 h-auto object-contain" />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative group -mt-2">
          {/* Controls */}
          <button 
            onClick={scrollLeft} 
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#032e1c] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#1a4a35] transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={scrollRight} 
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#032e1c] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#1a4a35] transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Embla Carousel Container */}
          <div className="overflow-hidden py-4 px-2 -mx-2" ref={emblaRef}>
            <div className="flex">
              {speakers.map((speaker) => (
                <div 
                  key={speaker._id} 
                  className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_20%] lg:flex-[0_0_14.28%] px-2 min-w-0"
                >
                  <div 
                    className="relative flex flex-col bg-[#fbfcf7] rounded-xl border border-gray-50 p-3 items-center text-center transition-transform duration-300 w-full"
                    style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px', height: '210px' }}
                  >
                    {/* Expanded Overlay */}
                    {expandedCardId === speaker._id && (
                      <div 
                        className="absolute inset-0 bg-white z-50 flex flex-col rounded-xl overflow-hidden shadow-lg p-4"
                        style={{ boxShadow: "inset 0 0 0 2px #e2e8f0" }}
                      >
                        <div className="flex justify-end mb-1">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setExpandedCardId(null); }}
                            className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full text-[#23471d] bg-[#f0faf0] border border-[#c6e6c6]"
                          >
                            ✕ Close
                          </button>
                        </div>
                        <div className="flex-1 overflow-y-auto text-left flex flex-col items-center custom-thin-scrollbar overscroll-contain pr-1">
                            {speaker.image ? (
                                <img src={optimizeCloudinaryUrl(speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`, 300)} alt={speaker.imageAltText || speaker.name} className="w-10 h-10 rounded-full object-cover mb-1.5 shadow-sm bg-gray-200" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1.5 shadow-sm text-gray-300"><User size={16}/></div>
                            )}
                            {speaker.name && <h4 className="text-[#032e1c] font-bold text-[12px] leading-tight mb-0.5 text-center">{speaker.name}</h4>}
                            {speaker.designation && <p className="text-gray-900 font-medium text-[10px] mb-0.5 text-center">{speaker.designation}</p>}
                            {speaker.organization && <p className="text-[#111844] font-bold text-[10px] leading-tight text-center">{speaker.organization}</p>}
                        </div>
                      </div>
                    )}

                    {/* Standard Card View */}
                    {speaker.image ? (
                        <img src={optimizeCloudinaryUrl(speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`, 300)} alt={speaker.imageAltText || speaker.name} className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover mb-2 md:mb-3 shadow-sm bg-gray-200" />
                    ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 flex items-center justify-center mb-2 md:mb-3 shadow-sm text-gray-300"><User size={32}/></div>
                    )}
                    
                    <div className="w-full flex flex-col items-center mb-1">
                        {speaker.name && (
                            <h4 className="text-[#032e1c] font-medium text-[14px] leading-tight mb-1 text-center line-clamp-2">
                                {speaker.name}
                            </h4>
                        )}
                        {speaker.designation && (
                            <p className="text-gray-900 font-medium text-[12px] mb-0.5 text-center line-clamp-2">
                                {speaker.designation}
                            </p>
                        )}
                        {speaker.organization && (
                            <p className="text-[#111844] font-bold text-[12px] leading-tight text-center line-clamp-2">
                                {speaker.organization}
                            </p>
                        )}
                    </div>

                    {((speaker.name || '').length > 25 || (speaker.designation || '').length > 25 || (speaker.organization || '').length > 25) && (
                        <div className="mt-1 flex-shrink-0 w-full flex justify-center mt-auto">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setExpandedCardId(speaker._id); }} 
                              className="text-white text-[8px] font-bold uppercase tracking-wide bg-[#d26019] px-2 py-0.5 rounded hover:bg-[#b04f14] transition-colors"
                            >
                                Read More
                            </button>
                        </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </SectionContainer>
    </section>
  );
};

export default PreviousSpeakersRow;

