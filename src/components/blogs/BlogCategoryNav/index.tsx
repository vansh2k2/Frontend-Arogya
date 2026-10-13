"use client";
import React, { useEffect, useState } from 'react';
import bl1 from '@/assets/icons/bl1.png';
import bl2 from '@/assets/icons/bl2.png';
import bl3 from '@/assets/icons/bl3.png';
import bl4 from '@/assets/icons/bl4.png';
import bl5 from '@/assets/icons/bl5.png';
import bl6 from '@/assets/icons/bl6.png';
import bl7 from '@/assets/icons/bl7.png';
import SectionContainer from '@/components/layout/SectionContainer';
import { blogPageApi } from '@/lib/api';

// Shown until the links load from the backend ("\n" splits a title over two lines)
const defaultCategories = [
  { title: 'Latest\nUpdates', icon: bl1, iconAlt: '' },
  { title: 'Expert\nInsights', icon: bl2, iconAlt: '' },
  { title: 'Health &\nInnovations', icon: bl3, iconAlt: '' },
  { title: 'News &\nWellness', icon: bl4, iconAlt: '' },
  { title: 'News &\nAnnouncements', icon: bl5, iconAlt: '' },
  { title: 'Events &\nHighlights', icon: bl6, iconAlt: '' },
  { title: 'Stories that\nInspire', icon: bl7, iconAlt: '' },
];

const BlogCategoryNav = () => {
  // Links from arogya-admin → Pages & CMS → Blogs & News
  const [categories, setCategories] = useState<any[]>(defaultCategories);

  useEffect(() => {
    blogPageApi.get().then((data) => {
      if (Array.isArray(data?.categories) && data.categories.length > 0) setCategories(data.categories);
    });
  }, []);

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
                  alt={cat.iconAlt || ""}
                  className="h-7 w-auto object-contain group-hover:scale-110 transition-transform duration-300" 
                />
                <span className="font-inter text-xs font-bold text-[#0e372b] group-hover:text-[#023b2c] uppercase tracking-wide text-left leading-tight whitespace-pre-line">
                  {cat.title}
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

