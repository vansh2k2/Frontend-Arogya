"use client";
import React from 'react';
import bl1 from '@/assets/icons/bl1.png';
import bl2 from '@/assets/icons/bl2.png';
import bl3 from '@/assets/icons/bl3.png';
import bl4 from '@/assets/icons/bl4.png';
import bl5 from '@/assets/icons/bl5.png';
import bl6 from '@/assets/icons/bl6.png';
import bl7 from '@/assets/icons/bl7.png';
import SectionContainer from '@/components/layout/SectionContainer';

const categories = [
  { line1: 'Latest', line2: 'Updates', icon: bl1 },
  { line1: 'Expert', line2: 'Insights', icon: bl2 },
  { line1: 'Health &', line2: 'Innovations', icon: bl3 },
  { line1: 'News &', line2: 'Wellness', icon: bl4 },
  { line1: 'News &', line2: 'Announcements', icon: bl5 },
  { line1: 'Events &', line2: 'Highlights', icon: bl6 },
  { line1: 'Stories that', line2: 'Inspire', icon: bl7 },
];

const BlogCategoryNav = () => {
  return (
    <div className="w-full relative -mt-8 z-20">
      <SectionContainer>
        <div className="bg-[#fdfdfd] border border-gray-100 shadow-md rounded-2xl px-6 flex items-center overflow-x-auto hide-scrollbar py-4 gap-6 md:justify-center">
          {categories.map((cat, index) => (
            <React.Fragment key={index}>
              <button
                className="flex items-center gap-2.5 min-w-max group transition-colors duration-200"
              >
                <img 
                  src={cat.icon?.src || cat.icon} 
                  alt={cat.line1}
                  className="h-7 w-auto object-contain group-hover:scale-110 transition-transform duration-300" 
                />
                <span className="font-inter text-xs font-bold text-[#0e372b] group-hover:text-[#023b2c] uppercase tracking-wide text-left leading-tight">
                  {cat.line1}<br />{cat.line2}
                </span>
              </button>
              {index < categories.length - 1 && (
                <div className="w-px h-6 bg-gray-300 shrink-0"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </SectionContainer>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default BlogCategoryNav;

