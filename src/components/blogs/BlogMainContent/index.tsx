"use client";
import React, { useEffect, useState } from 'react';
import { ArrowRight, Clock, User, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { fetchArticles, staticArticles, type Article } from '@/lib/blogPosts';
import BlogSidebar, { ALL_CATEGORIES } from '../BlogSidebar';
import blogmain from '@/assets/image/blogmain.webp';
import bleaf from '@/assets/icons/bleaf.png';
import test1 from '@/assets/image/test1.webp';
import test2 from '@/assets/image/test2.webp';
import test3 from '@/assets/image/test3.webp';                         
import test4 from '@/assets/image/test4.webp';
import SectionContainer from '@/components/layout/SectionContainer';

// Shown in the Featured Story slider while no post is marked as featured
const FALLBACK_FEATURED = {
  slug: '',
  date: '20 May 2026',
  title: 'Arogya Sangoshthi 2026: Uniting Knowledge, Nature & Innovation',
  excerpt: 'A glimpse into our upcoming edition that brings together experts, researchers and communities for a healthier tomorrow.',
  image: (blogmain as { src: string }).src,
  imageAlt: 'Featured',
};

// Cards shown under "Latest News & Articles" before "View more articles" is pressed
const PAGE_SIZE = 6;

const BlogMainContent = () => {
  // Posts from arogya-admin → Blog & Insights (the website's built-in ones if the backend is down)
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeFeatured, setActiveFeatured] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Category picked in the sidebar
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  useEffect(() => {
    fetchArticles().then((posts) => setArticles(posts ?? staticArticles.slice(1)));
  }, []);

  // "Mark as Featured Story" posts fill the slider; everything else is listed below it
  const featuredPosts = articles.filter((article) => article.featured);
  const slides = featuredPosts.length > 0 ? featuredPosts : [FALLBACK_FEATURED];
  const featured = slides[Math.min(activeFeatured, slides.length - 1)];
  const others = articles.filter((article) => !article.featured);
  // A picked category lists all of its articles (featured ones too); "All Updates" lists the rest
  const latest = activeCategory === ALL_CATEGORIES
    ? (others.length > 0 ? others : articles)
    : articles.filter((article) => article.category === activeCategory);

  const selectCategory = (name: string) => {
    setActiveCategory(name);
    setVisibleCount(PAGE_SIZE);
  };
  const rest = latest.slice(0, visibleCount);

  const moveFeatured = (by: number) => setActiveFeatured((index) => (index + by + slides.length) % slides.length);

  return (
    <SectionContainer className="pt-8 pb-0">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column - Main Content */}
        <div className="lg:w-[60%] xl:w-[70%]">
          
          {/* Featured Story */}
          <div className="mb-4">
            <div 
              className="flex flex-col md:flex-row gap-8 bg-[#fdfdfd] rounded-2xl overflow-hidden group"
              style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
            >
              <div className="md:w-1/2 relative h-[300px] md:h-auto overflow-hidden">
                <img 
                  src={featured.image} 
                  alt={featured.imageAlt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#012c20] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  FEATURED STORY
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center py-6 pr-6 relative">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5 text-[#023b2c]"><CalendarDays size={14} /> {featured.date}</span>
                  <div className="flex gap-2 ml-auto">
                    <button onClick={() => moveFeatured(-1)} aria-label="Previous featured story" className="w-8 h-8 rounded-full bg-[#023b2c] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                      <ArrowRight size={14} className="rotate-180" />
                    </button>
                    <button onClick={() => moveFeatured(1)} aria-label="Next featured story" className="w-8 h-8 rounded-full bg-[#e87a2c] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
                <h2 className="font-inter text-3xl md:text-3xl font-semibold text-[#051f16] mb-4 leading-tight max-w-[440px]">
                  {featured.title}
                </h2>
                <p className="text-black text-sm leading-relaxed mb-8 max-w-[390px] line-clamp-4">
                  {featured.excerpt}
                </p>
                <div>
                  {featured.slug ? (
                    <Link href={`/blogs/${featured.slug}`} className="font-inter bg-[#023b2c] hover:bg-[#064e3b] text-white px-6 py-3 rounded-lg text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-colors relative z-10">
                      READ FULL STORY <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button className="font-inter bg-[#023b2c] hover:bg-[#064e3b] text-white px-6 py-3 rounded-lg text-xs font-bold tracking-wide flex items-center gap-2 transition-colors relative z-10">
                      READ FULL STORY <ArrowRight size={14} />
                    </button>
                  )}
                </div>
                <img src={bleaf?.src || bleaf} alt="" className="absolute bottom-0 right-0 w-24 h-auto pointer-events-none" />
              </div>
            </div>
            
            {/* Pagination dots for featured — one per featured story */}
            <div className="flex justify-center gap-2 mt-6">
              {slides.map((slide, index) => (
                <button
                  key={slide.slug || index}
                  onClick={() => setActiveFeatured(index)}
                  aria-label={`Featured story ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${featured === slide ? 'bg-[#023b2c]' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Latest News & Articles Header */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-inter text-2xl font-semibold text-[#061f18]">
              {activeCategory === ALL_CATEGORIES ? 'Latest News & Articles' : activeCategory}
            </h3>
            <div className="w-8 h-[2px] bg-[#e87a2c]"></div>
            {activeCategory !== ALL_CATEGORIES && (
              <button type="button" onClick={() => selectCategory(ALL_CATEGORIES)} className="ml-auto text-xs font-bold uppercase text-[#e87a2c] hover:underline">
                Show all articles
              </button>
            )}
          </div>

          {latest.length === 0 && (
            <p className="font-inter text-sm text-gray-600 mb-8">No articles in this category yet.</p>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-3 font-inter">
            {rest.map((blog, idx) => (
              <article 
                key={idx} 
                className="bg-[#fcfcfc] rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
              >
                <div className="h-48 overflow-hidden">
                  <img src={blog.image} alt={blog.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-black uppercase tracking-wide mb-3">
                    <span className="flex items-center gap-1.5"><CalendarDays size={12} /> {blog.date}</span>
                    <span className="text-[#023b2c]">{blog.category}</span>
                  </div>
                  <h4 className="font-inter font-bold text-base text-gray-900 leading-snug mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-black text-sm leading-relaxed mb-5 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Link href={`/blogs/${blog.slug}`} className="text-xs font-extrabold flex items-center gap-1.5 text-[#08271d] transition-colors uppercase">
                    READ MORE <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View More Button — only while there are more articles to show */}
          {latest.length > visibleCount && (
            <div className="flex justify-center mb-8">
              <button onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="font-inter border-2 border-[#e87a2c] text-[#e87a2c] hover:bg-[#e87a2c] hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center gap-2">
                VIEW MORE ARTICLES <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Quotes Section - Marquee */}
          <style>{`
            @keyframes scrollMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              animation: scrollMarquee 25s linear infinite;
            }
            .marquee-wrapper:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}</style>
          <div className="flex overflow-hidden w-full marquee-wrapper font-inter pb-4">
            {[0, 1].map((blockIdx) => (
              <div 
                key={blockIdx}
                className="flex gap-6 animate-marquee min-w-full shrink-0 pr-6"
                aria-hidden={blockIdx === 1}
              >
                {[
                  { text: "The future of healthcare lies in integration—of tradition, technology and community.", author: "Dr. Randeep Guleria", role: "Pulmonologist & Director,\nAIIMS, New Delhi", img: test1 },
                  { text: "Ayurveda offers timeless wisdom for holistic well-being and preventive care.", author: "Dr. Renu Boyal", role: "MD (Ayurveda)\nDirector, AIIRC,\nDehradun", img: test2 },
                  { text: "Research and innovation are the pillars of sustainable and inclusive health.", author: "Dr. K. S. Rawat", role: "Scientist, FRI\nDehradun", img: test3 },
                  { text: "Small lifestyle changes today can lead to a healthier planet tomorrow.", author: "Dr. Vandana Shiva", role: "Environmental Activist\n& Author", img: test4 }
                ].map((quote, idx) => {
                  // The second block only repeats the first for the endless scroll — same photo per person
                  const currentImg = quote.img;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white w-[250px] md:w-[280px] xl:w-[260px] shrink-0 rounded-2xl p-6 relative flex flex-col h-full overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                      style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
                    >
                      <div className="mb-3">
                        <span className="text-[44px] font-serif font-black text-[#012d20] leading-none block h-6">“</span>
                      </div>
                      <p className="text-gray-800 text-[13px] leading-relaxed mb-6 relative z-10 flex-grow font-medium whitespace-normal">
                        {quote.text}
                      </p>
                      <div className="flex flex-col relative z-10 mt-auto whitespace-normal">
                        <p className="text-[12px] font-bold text-[#012c20] mb-1.5">{quote.author}</p>
                        <p className="text-[12px] font-semibold text-[#111844] whitespace-pre-line leading-[1.3] w-[65%]">{quote.role}</p>
                      </div>
                      <img 
                        src={currentImg?.src || currentImg} 
                        alt={blockIdx === 1 ? "" : quote.author} 
                        className="absolute bottom-0 right-0 h-[129px] w-auto object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105" 
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-[#023b2c]"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          </div>

        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:w-[40%] xl:w-[30%]">
          <div className="sticky top-24">
            <BlogSidebar activeCategory={activeCategory} onSelectCategory={selectCategory} />
          </div>
        </div>

      </div>
    </SectionContainer>
  );
};

export default BlogMainContent;


