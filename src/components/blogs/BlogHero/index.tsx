"use client";
import React from 'react';
import { Search } from 'lucide-react';
import blogbg from '@/assets/banner/blogbg.webp';
import SectionContainer from '@/components/layout/SectionContainer';

const BlogHero = () => {
  return (
    <div className="relative w-full overflow-hidden min-h-[400px] flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${blogbg?.src || blogbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="font-inter text-4xl md:text-5xl lg:text-6xl font-bold text-[#0a2820] mb-6">
            Blog & News
          </h1>
          <p className="font-inter text-black text-lg mb-10 max-w-lg">
            Stay updated with the latest insights, expert opinions, research breakthroughs and announcements from <br />
            <strong className="text-[#0a2820]">Arogya Sanghosthi</strong>.
          </p>
          
          <div className="relative max-w-md flex items-center">
            <input
              type="text"
              placeholder="Search articles, news, topics..."
              className="w-full pl-5 pr-16 py-2.5 rounded-lg shadow-md border-none focus:outline-none focus:ring-2 focus:ring-[#085a44] text-base"
            />
            <button className="absolute right-1 top-1 bottom-1 w-12 flex items-center justify-center bg-[#023b2c] text-white rounded-md hover:bg-[#064e3b] transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;

