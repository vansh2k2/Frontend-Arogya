"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import about1 from '@/assets/about1.jpg';
import about2 from '@/assets/about2.jpg';
import about3 from '@/assets/about3.jpg';
import about4 from '@/assets/about4.jpg';
import leafDecoration from '@/assets/icons/leafs.png';
import SectionContainer from '@/components/layout/SectionContainer';
import { API_URL, SERVER_URL } from '@/lib/api';

const marqueeStyles = `
  @keyframes scrollUp {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  @keyframes scrollDown {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }
  .marquee-up {
    animation: scrollUp 15s linear infinite;
  }
  .marquee-down {
    animation: scrollDown 15s linear infinite;
  }
  .marquee-up:hover, .marquee-down:hover {
    animation-play-state: paused;
  }
`;

const SpeakerCommittees = () => {
  const [categories, setCategories] = useState({
    MAIN: { heading: 'More speakers will be announced soon. Stay tuned!', description: '' },
    ADVISORS: { heading: 'OUR ADVISORS', description: '' },
    SCIENTIFIC: { heading: 'SCIENTIFIC COMMITTEE', description: '' },
    HIGHLIGHTS: { heading: 'PREVIOUS EDITION HIGHLIGHTS', description: 'A glimpse of the insightful sessions and knowledge shared in our previous editions.' }
  });

  const [items, setItems] = useState({
    ADVISOR: [],
    SCIENTIFIC: [],
    HIGHLIGHT: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, itemRes] = await Promise.all([
          fetch(`${API_URL}/more-speakers/categories`).then(res => res.json()),
          fetch(`${API_URL}/more-speakers/items`).then(res => res.json())
        ]);
        
        if (catRes && catRes.length > 0) {
          const newCats = { ...categories };
          catRes.forEach(c => newCats[c.sectionType] = c);
          setCategories(newCats);
        }

        if (itemRes) {
          const newItems = { ADVISOR: [], SCIENTIFIC: [], HIGHLIGHT: [] };
          itemRes.forEach(i => {
            if (newItems[i.type]) newItems[i.type].push(i);
          });
          setItems(newItems);
        }
      } catch (error) {
        console.error('Failed to load more speakers data', error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="w-full pt-0 pb-2 md:pb-4 bg-white relative overflow-hidden">
      <style>{marqueeStyles}</style>
      <SectionContainer className="relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Column 1: OUR ADVISORS */}
          <div className="flex flex-col bg-[#f9f8f3] border border-[#e8dfc8] rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#042418] py-3 text-center">
              <h3 className="text-white font-inter font-bold text-sm tracking-wider uppercase">{categories.ADVISORS.heading}</h3>
            </div>
            <div className="p-5 pr-10 md:p-6 md:pr-16 flex-1 flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                <div className="flex flex-col gap-2 marquee-up absolute top-0 left-0 w-full">
                  {[...items.ADVISOR, ...items.ADVISOR].map((adv, idx) => (
                    <div key={idx} className={`flex items-center gap-4 ${idx !== items.ADVISOR.length * 2 - 1 ? 'border-b border-gray-300 pb-1' : ''}`}>
                      <img src={adv.image ? (adv.image.startsWith('http') ? adv.image : `${SERVER_URL}${adv.image}`) : "https://i.pravatar.cc/150?img=11"} alt={adv.imageAltText || adv.name} className="w-16 h-16 rounded-full object-cover shadow-sm shrink-0 bg-gray-200" />
                      <div>
                        <h4 className="text-[#032e1c] font-bold text-[14px] font-inter leading-tight">{adv.name}</h4>
                        <p className="text-black text-[12px] font-medium leading-snug mt-0.5 whitespace-pre-line">{adv.designation}</p>
                        <p className="text-black text-[10px] font-medium leading-snug mt-0.5 whitespace-pre-line text-[#007979] font-semibold">{adv.organization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: SCIENTIFIC COMMITTEE */}
          <div className="flex flex-col bg-[#f9f8f3] border border-[#e8dfc8] rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#042418] py-3 text-center">
              <h3 className="text-white font-inter font-bold text-sm tracking-wider uppercase">{categories.SCIENTIFIC.heading}</h3>
            </div>
            <div className="px-5 pb-5 pt-2 md:px-6 md:pb-6 md:pt-3 flex-1 flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                <div className="flex flex-col gap-2 marquee-down absolute top-0 left-0 w-full">
                  {[...items.SCIENTIFIC, ...items.SCIENTIFIC].map((member, idx) => (
                    <div key={idx} className={`flex items-center gap-4 ${idx !== items.SCIENTIFIC.length * 2 - 1 ? 'border-b border-gray-300 pb-1' : ''}`}>
                      <img src={member.image ? (member.image.startsWith('http') ? member.image : `${SERVER_URL}${member.image}`) : "https://i.pravatar.cc/150?img=14"} alt={member.imageAltText || member.name} className="w-16 h-16 rounded-full object-cover shadow-sm shrink-0 bg-gray-200" />
                      <div>
                         <h4 className="text-[#032e1c] font-bold text-[14px] font-inter leading-tight">{member.name}</h4>
                        <p className="text-black text-[12px] font-medium leading-snug mt-0.5 whitespace-pre-line">{member.designation}</p>
                        <p className="text-black text-[10px] font-medium leading-snug mt-0.5 whitespace-pre-line text-[#007979] font-semibold">{member.organization}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: PREVIOUS EDITION HIGHLIGHTS */}
          <div className="flex flex-col bg-[#f9f8f3] border border-[#e8dfc8] rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#042418] py-3 text-center">
              <h3 className="text-white font-inter font-bold text-sm tracking-wider uppercase">{categories.HIGHLIGHTS.heading}</h3>
            </div>
            <div className="p-5 md:p-6 flex-1 flex flex-col">
              <div className="flex flex-col gap-2 flex-1">
                {/* Top Row: 3 images */}
                <div className="grid grid-cols-3 gap-2">
                  <img src={items.HIGHLIGHT[0]?.image ? (items.HIGHLIGHT[0].image.startsWith('http') ? items.HIGHLIGHT[0].image : `${SERVER_URL}${items.HIGHLIGHT[0].image}`) : about1} className="w-full aspect-[3/2] object-cover rounded shadow-sm bg-gray-200" alt={items.HIGHLIGHT[0]?.imageAltText || "Highlight 1"} />
                  <img src={items.HIGHLIGHT[1]?.image ? (items.HIGHLIGHT[1].image.startsWith('http') ? items.HIGHLIGHT[1].image : `${SERVER_URL}${items.HIGHLIGHT[1].image}`) : about2} className="w-full aspect-[3/2] object-cover rounded shadow-sm bg-gray-200" alt={items.HIGHLIGHT[1]?.imageAltText || "Highlight 2"} />
                  <img src={items.HIGHLIGHT[2]?.image ? (items.HIGHLIGHT[2].image.startsWith('http') ? items.HIGHLIGHT[2].image : `${SERVER_URL}${items.HIGHLIGHT[2].image}`) : about4} className="w-full aspect-[3/2] object-cover rounded shadow-sm bg-gray-200" alt={items.HIGHLIGHT[2]?.imageAltText || "Highlight 3"} />
                </div>
                {/* Bottom Row: 1 landscape (col-span-2) + 1 portrait (col-span-1) */}
                <div className="grid grid-cols-3 gap-2">
                  <img src={items.HIGHLIGHT[3]?.image ? (items.HIGHLIGHT[3].image.startsWith('http') ? items.HIGHLIGHT[3].image : `${SERVER_URL}${items.HIGHLIGHT[3].image}`) : about3} className="w-full h-28 md:h-32 object-cover rounded shadow-sm bg-gray-200 col-span-2" alt={items.HIGHLIGHT[3]?.imageAltText || "Highlight 4"} />
                  <div className="relative col-span-1 h-28 md:h-32">
                    <img src={items.HIGHLIGHT[4]?.image ? (items.HIGHLIGHT[4].image.startsWith('http') ? items.HIGHLIGHT[4].image : `${SERVER_URL}${items.HIGHLIGHT[4].image}`) : about4} className="w-full h-full object-cover rounded shadow-sm bg-gray-200" alt={items.HIGHLIGHT[4]?.imageAltText || "Highlight 5"} />
                    <div 
                      onClick={() => window.open('/gallery', '_blank')}
                      className="absolute inset-0 bg-black/40 rounded flex items-center justify-center cursor-pointer hover:bg-black/30 transition"
                    >
                      <span className="text-white text-xs font-bold">+ MORE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-black text-[11px] font-medium leading-relaxed">
                  {categories.HIGHLIGHTS.description}
                </p>
              </div>
              <button 
                onClick={() => window.open('/gallery', '_blank')}
                className="w-[85%] mx-auto mt-2 py-2 border border-[#032e1c] rounded-lg text-[#032e1c] text-[10px] font-bold uppercase tracking-wider hover:bg-[#032e1c] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                VIEW GALLERY <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </SectionContainer>
      
      {/* Decorative Left Leaf */}
      <img 
        src={leafDecoration?.src || leafDecoration} 
        alt="Decorative" 
        className="absolute top-1/2 -translate-y-1/2 -left-10 w-24 md:w-32 lg:w-48 object-contain pointer-events-none opacity-80 z-0" 
      />
    </section>
  );
};

export default SpeakerCommittees;

