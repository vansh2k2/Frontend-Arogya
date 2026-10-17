"use client";
import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Clock, ClipboardList, Newspaper, Mic, Microscope, Heart, Calendar, Leaf, Handshake } from 'lucide-react';
import Link from 'next/link';
import stayIcon from '@/assets/icons/stay.png';
import { fetchArticleCategories, fetchArticles, type Article } from '@/lib/blogPosts';

// The "All Updates" row: every article, no category filter
export const ALL_CATEGORIES = 'All Updates';

// An icon for a category, picked from the words in its name
const categoryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n === ALL_CATEGORIES.toLowerCase()) return <ClipboardList size={16} />;
  if (n.includes('conference')) return <Mic size={16} />;
  if (n.includes('research') || n.includes('innovation')) return <Microscope size={16} />;
  if (n.includes('health') || n.includes('wellness')) return <Heart size={16} />;
  if (n.includes('event')) return <Calendar size={16} />;
  if (n.includes('sustainab')) return <Leaf size={16} />;
  if (n.includes('partner')) return <Handshake size={16} />;
  return <Newspaper size={16} />;
};

const twoDigits = (count: number) => String(count).padStart(2, '0');

// Shown until the categories load from the backend — names only, no made-up counts
const defaultCategories: { name: string; count?: number }[] = [
  { name: ALL_CATEGORIES },
  { name: 'News & Announcements' },
  { name: 'Conference Highlights' },
  { name: 'Research & Innovations' },
  { name: 'Health & Wellness' },
  { name: 'Events & Highlights' },
  { name: 'Sustainability' },
  { name: 'Partner Corner' },
];

// The three conference days (19–21 February 2027)
const upcomingEvents = [
  { date: '19', month: 'FEB', title: 'Arogya Sangoshthi Day 1', location: 'Pragati Maidan, New Delhi', time: '09:00 AM - 06:00 PM' },
  { date: '20', month: 'FEB', title: 'Arogya Sangoshthi Day 2', location: 'Pragati Maidan, New Delhi', time: '09:00 AM - 06:00 PM' },
  { date: '21', month: 'FEB', title: 'Arogya Sangoshthi Day 3', location: 'Pragati Maidan, New Delhi', time: '09:00 AM - 06:00 PM' },
];

interface BlogSidebarProps {
  /** The category whose articles are listed ("All Updates" = every article) */
  activeCategory?: string;
  onSelectCategory?: (name: string) => void;
}

const BlogSidebar = ({ activeCategory = ALL_CATEGORIES, onSelectCategory }: BlogSidebarProps) => {
  // Categories and their article counts from arogya-admin → Blog & Insights → Manage Categories
  const [categoriesList, setCategoriesList] = useState(defaultCategories);
  // Most-read articles from arogya-admin → Blog & Insights
  const [popularPosts, setPopularPosts] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticleCategories().then((data) => {
      if (data) setCategoriesList([{ name: ALL_CATEGORIES, count: data.total }, ...data.categories]);
    });
    fetchArticles().then((articles) => {
      if (articles) setPopularPosts([...articles].sort((a, b) => b.views - a.views).slice(0, 5));
    });
  }, []);

  return (
    <div className="space-y-10">
      
      {/* Newsletter Box */}
      <div className="font-inter bg-[#023b2c] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <h3 className="font-inter text-xl font-semibold mb-2">Stay in the loop!</h3>
        <p className="text-white text-sm mb-6 max-w-[200px]">
          Subscribe to our newsletter and get the latest updates, stories and announcements.
        </p>
        <div className="space-y-3 relative z-10">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full px-4 py-3 rounded-lg text-sm text-gray-800 outline-none"
          />
          <button className="bg-[#e87a2c] hover:bg-[#d4661c] transition-colors w-[130px] py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
            SUBSCRIBE <ArrowRight size={14} />
          </button>
        </div>
        <img src={stayIcon?.src || stayIcon} alt="" className="absolute top-16 right-0 w-40 h-auto pointer-events-none" />
      </div>

      {/* Categories */}
      <div 
        className="bg-white rounded-2xl p-6 font-inter"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-inter text-xl font-semibold text-[#122923]">Categories</h3>
          <button type="button" onClick={() => onSelectCategory?.(ALL_CATEGORIES)} className="text-xs font-bold uppercase text-[#122923] flex items-center gap-1 hover:text-emerald-700">
            VIEW ALL <ArrowRight size={12} />
          </button>
        </div>
        <ul className="space-y-4">
          {categoriesList.map((cat) => {
            const isActive = cat.name === activeCategory;
            return (
              <li key={cat.name}>
                <button
                  type="button"
                  onClick={() => onSelectCategory?.(cat.name)}
                  aria-pressed={isActive}
                  className="w-full flex items-center justify-between group cursor-pointer text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className={`transition-colors ${isActive ? 'text-emerald-600' : 'text-[#023b2c] group-hover:text-emerald-600'}`}>{categoryIcon(cat.name)}</span>
                    <span className={`text-sm transition-colors ${isActive ? 'font-bold text-emerald-700' : 'font-medium text-black group-hover:text-emerald-600'}`}>{cat.name}</span>
                  </span>
                  {typeof cat.count === 'number' && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${isActive ? 'text-white bg-orange-500' : 'text-orange-500 bg-orange-50'}`}>{twoDigits(cat.count)}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Popular Posts */}
      <div 
        className="bg-white rounded-2xl p-6 font-inter"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-inter text-xl font-semibold text-[#122923]">Popular Posts</h3>
          <button type="button" onClick={() => onSelectCategory?.(ALL_CATEGORIES)} className="text-xs font-bold uppercase text-[#122923] flex items-center gap-1 hover:text-emerald-700">
            VIEW ALL <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-5">
          {popularPosts.length === 0 && <p className="text-xs text-gray-500">Articles will appear here soon.</p>}
          {popularPosts.map((post) => (
            <Link key={post.id} href={`/blogs/${post.slug}`} className="flex gap-4 group">
              {post.image && <img src={post.image} alt={post.imageAlt || post.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />}
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-emerald-700 transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-900 font-medium">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div 
        className="bg-[#f6f9f8] rounded-2xl px-6 pt-6 pb-3 font-inter"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-inter text-xl font-semibold text-[#122923]">Upcoming Events</h3>
          <Link href="/register-now" className="text-xs font-bold uppercase text-[#122923] flex items-center gap-1 hover:text-emerald-700">
            REGISTER <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-5">
          {upcomingEvents.map((event, idx) => (
            <div key={idx} className="flex gap-4 group cursor-pointer">
              <div className="flex flex-col items-center justify-center w-[60px] h-[70px] rounded-xl bg-[#fcf2e8] text-[#012d20] shrink-0">
                <span className="text-2xl font-bold leading-none">{event.date}</span>
                <span className="text-xs font-bold uppercase mt-1">{event.month}</span>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors mb-2">
                  {event.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-black mb-1">
                  <MapPin size={12} className="text-[#e87a2c]" /> {event.location}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-black">
                  <Clock size={12} className="text-[#e87a2c]" /> {event.time}
                </div>
              </div>
            </div>
          ))}
          
          <Link href="/register-now" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-800 uppercase pt-4 border-t border-gray-100 hover:text-emerald-700 transition-colors">
            REGISTER FOR THE CONFERENCE <ArrowRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default BlogSidebar;


