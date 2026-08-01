"use client";
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import sleafIcon from '@/assets/icons/sleaf.png';
import P1Icon from '@/assets/icons/P1.png';
import footerRight from '@/assets/icons/footerright.png';
import { Leaf, Droplets, BookOpen, UserCircle, Globe } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';
import { optimizeCloudinaryUrl } from '@/utils/imageOptimization';

import { API_URL, SERVER_URL } from '@/lib/api';

const ExpertSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [heading, setHeading] = useState('OUR ESTEEMED SPEAKERS');
  const [moreSpeakersHeading, setMoreSpeakersHeading] = useState('More speakers will be announced soon. Stay tuned!');

  useEffect(() => {
    // Fetch Heading
    fetch(`${API_URL}/expert-speakers/heading`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHeading(data.data.heading);
        }
      })
      .catch(err => console.error('Error fetching expert speakers heading:', err));

    // Fetch More Speakers MAIN Heading
    fetch(`${API_URL}/more-speakers/categories`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mainCat = data.find(c => c.sectionType === 'MAIN');
          if (mainCat && mainCat.heading) {
            setMoreSpeakersHeading(mainCat.heading);
          }
        }
      })
      .catch(err => console.error('Error fetching more speakers heading:', err));

    // Fetch Speakers
    fetch(`${API_URL}/expert-speakers`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          // Assign random icons sequentially based on the predefined set
          const iconSet = [
            <Leaf size={16} className="text-[#4b6a38]" />,
            <Globe size={16} className="text-[#4b6a38]" />,
            <Droplets size={16} className="text-[#4b6a38]" />,
            <BookOpen size={16} className="text-[#4b6a38]" />,
            <UserCircle size={16} className="text-[#4b6a38]" />
          ];
          
          const speakersWithIcons = data.data.map((speaker, index) => ({
            ...speaker,
            icon: iconSet[index % iconSet.length]
          }));
          setSpeakers(speakersWithIcons);
        }
      })
      .catch(err => console.error('Error fetching expert speakers:', err));
  }, []);

  const midIndex = Math.ceil(speakers.length / 2);
  const topRow = speakers.slice(0, midIndex);
  const bottomRow = speakers.slice(midIndex);

  // Embla Carousel hooks
  const [emblaRef1, emblaApi1] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false
  });
  
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false
  });

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (emblaApi1) emblaApi1.scrollNext();
      if (emblaApi2) emblaApi2.scrollPrev();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoplayInterval);
  }, [emblaApi1, emblaApi2]);

  return (
    <section className="w-full pt-2 md:pt-4 pb-3 md:pb-4 bg-[#fefefe] relative z-0 overflow-hidden">
      <SectionContainer className="mt-0">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-0 md:mb-2">
          <div className="flex justify-center items-center gap-4 mb-2">
            <img src={P1Icon?.src || P1Icon} alt="Decoration" className="w-8 md:w-10 h-auto object-contain" />
            <h2 className="text-[#032e1c] font-inter font-bold text-lg md:text-xl uppercase tracking-wider text-center">
              {heading}
            </h2>
            <img src={P1Icon?.src || P1Icon} alt="Decoration" className="w-8 md:w-10 h-auto object-contain" />
          </div>
        </div>

        {/* Carousels Container */}
        <div className="relative z-10 w-full mt-0 flex flex-col gap-4">
          
          {/* Top Row Carousel */}
          <div className="overflow-hidden" ref={emblaRef1}>
            <div className="flex -ml-4 py-2">
              {topRow.map((speaker, index) => (
                <div key={`top-${speaker._id || speaker.id}-${index}`} className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_16.666%] pl-4 min-w-0">
                  <div className="flex flex-col h-full bg-white rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_0px_0px_1px_rgba(27,31,35,0.15)] p-2 md:p-3 items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                    
                    {/* Profile Image with Leaf overlay */}
                    <div className="relative w-20 h-20 mb-2">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 border border-gray-200 shadow-sm">
                        <img src={speaker.image ? optimizeCloudinaryUrl(speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`, 400) : `https://i.pravatar.cc/150?img=${(index + 10) % 70}`} alt={speaker.name} className="w-full h-full object-cover" />
                      </div>
                      <img src={sleafIcon?.src || sleafIcon} alt="leaf" className="absolute bottom-0 -right-3 w-9 h-10 object-contain pointer-events-none drop-shadow-sm" />
                    </div>

                    {/* Name & Details */}
                    <h3 className="text-[#032e1c] font-inter font-bold text-[13px] leading-tight mb-1">{speaker.name}</h3>
                    <p className="text-gray-900 font-medium text-[10px] mb-0.5">{speaker.designation}</p>
                    <p className="text-[#111844] font-bold text-[12px] mb-2 leading-tight">{speaker.organization}</p>
                    
                    <div className="w-4 h-[1px] bg-[#cba344] opacity-50 mb-2"></div>

                    {/* Tag Box */}
                    <div className="bg-[#f7f7ef] border border-[#e8dfc8] rounded-md py-1 px-1 w-full flex items-center justify-center gap-1 mt-auto">
                      <div className="bg-white p-0.5 rounded-full shadow-sm border border-[#e8dfc8] shrink-0">
                        {speaker.icon}
                      </div>
                      <span className="text-[#032e1c] font-bold text-[11px] leading-tight text-center">
                        {speaker.title}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row Carousel */}
          <div className="overflow-hidden" ref={emblaRef2}>
            <div className="flex -ml-4 py-2">
              {bottomRow.map((speaker, index) => (
                <div key={`bottom-${speaker._id || speaker.id}-${index}`} className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_16.666%] pl-4 min-w-0">
                  <div className="flex flex-col h-full bg-white rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02),0px_0px_0px_1px_rgba(27,31,35,0.15)] p-2 md:p-3 items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                    
                    {/* Profile Image with Leaf overlay */}
                    <div className="relative w-20 h-20 mb-2">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 border border-gray-200 shadow-sm">
                        <img src={speaker.image ? optimizeCloudinaryUrl(speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`, 400) : `https://i.pravatar.cc/150?img=${(index + 20) % 70}`} alt={speaker.name} className="w-full h-full object-cover" />
                      </div>
                      <img src={sleafIcon?.src || sleafIcon} alt="leaf" className="absolute bottom-0 -right-1 w-8 h-10 object-contain pointer-events-none drop-shadow-sm" />
                    </div>

                    {/* Name & Details */}
                    <h3 className="text-[#032e1c] font-inter font-bold text-[13px] leading-tight mb-1">{speaker.name}</h3>
                    <p className="text-gray-900 font-medium text-[10px] mb-0.5">{speaker.designation}</p>
                    <p className="text-[#111844] font-bold text-[12px] mb-2 leading-tight">{speaker.organization}</p>
                    
                    <div className="w-4 h-[1px] bg-[#cba344] opacity-50 mb-2"></div>

                    {/* Tag Box */}
                    <div className="bg-[#f7f7ef] border border-[#e8dfc8] rounded-md py-1 px-1 w-full flex items-center justify-center gap-1 mt-auto">
                      <div className="bg-white p-0.5 rounded-full shadow-sm border border-[#e8dfc8] shrink-0">
                        {speaker.icon}
                      </div>
                      <span className="text-[#032e1c] font-bold text-[11px] leading-tight text-center">
                        {speaker.title}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Coming Soon Message */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="h-[1px] bg-[#e8dfc8] flex-1 max-w-[150px] md:max-w-[250px]"></div>
          <img src={P1Icon?.src || P1Icon} alt="Decoration" className="w-5 md:w-6 h-auto object-contain" />
          <p className="text-black text-[12px] md:text-[14px] font-medium font-inter text-center">
            {moreSpeakersHeading}
          </p>
          <img src={P1Icon?.src || P1Icon} alt="Decoration" className="w-5 md:w-6 h-auto object-contain" />
          <div className="h-[1px] bg-[#e8dfc8] flex-1 max-w-[150px] md:max-w-[250px]"></div>
        </div>

      </SectionContainer>
      
      <img src={footerRight?.src || footerRight} alt="Decorative" className="absolute bottom-40 md:bottom-56 right-0 w-32 md:w-48 lg:w-64 object-contain pointer-events-none opacity-100 z-0" />
    </section>
  );
};

export default ExpertSpeakers;

