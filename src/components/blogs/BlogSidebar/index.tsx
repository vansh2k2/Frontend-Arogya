"use client";
import React from 'react';
import { ArrowRight, CalendarDays, MapPin, Clock, ClipboardList, Newspaper, Mic, Microscope, Heart, Calendar, Leaf, Handshake } from 'lucide-react';
import Link from 'next/link';
import stayIcon from '@/assets/icons/stay.png';

const categoriesList = [
  { name: 'All Updates', count: 24, icon: <ClipboardList size={16} /> },
  { name: 'News & Announcements', count: 12, icon: <Newspaper size={16} /> },
  { name: 'Conference Highlights', count: '09', icon: <Mic size={16} /> },
  { name: 'Research & Innovations', count: 15, icon: <Microscope size={16} /> },
  { name: 'Health & Wellness', count: 11, icon: <Heart size={16} /> },
  { name: 'Events & Highlights', count: 10, icon: <Calendar size={16} /> },
  { name: 'Sustainability', count: '09', icon: <Leaf size={16} /> },
  { name: 'Partner Corner', count: '05', icon: <Handshake size={16} /> },
];

const popularPosts = [
  {
    title: <>Arogya Sanghosthi 2025:<br/>Key Takeaways</>,
    date: '28 Apr 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&q=80'
  },
  {
    title: <>Sustainable Health for<br/>Future Generations</>,
    date: '20 Apr 2026',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=150&q=80'
  },
  {
    title: <>Integrating Tradition,<br/>Advancing Tomorrow</>,
    date: '18 Apr 2026',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=150&q=80'
  },
  {
    title: <>Nutrition & Lifestyle:<br/>Small Changes, Big Impact</>,
    date: '15 Apr 2026',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=150&q=80'
  },
  {
    title: <>The Role of Ayurveda in<br/>Modern Healthcare</>,
    date: '10 Apr 2026',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&q=80'
  }
];

const upcomingEvents = [
  {
    date: '10',
    month: 'OCT',
    title: 'Pre-Conference Workshop',
    location: 'Pragati Maidan, New Delhi',
    time: '09:00 AM - 05:00 PM'
  },
  {
    date: '11',
    month: 'OCT',
    title: 'Arogya Sanghosthi Day 1',
    location: 'Pragati Maidan, New Delhi',
    time: '09:00 AM - 06:00 PM'
  },
  {
    date: '12',
    month: 'OCT',
    title: 'Arogya Sanghosthi Day 2',
    location: 'Pragati Maidan, New Delhi',
    time: '09:00 AM - 06:00 PM'
  }
];

const BlogSidebar = () => {
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
          <Link href="#" className="text-xs font-bold uppercase text-[#122923] flex items-center gap-1 hover:text-emerald-700">
            VIEW ALL <ArrowRight size={12} />
          </Link>
        </div>
        <ul className="space-y-4">
          {categoriesList.map((cat, idx) => (
            <li key={idx} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-[#023b2c] group-hover:text-emerald-600 transition-colors">{cat.icon}</span>
                <span className="text-sm font-medium text-black group-hover:text-emerald-600 transition-colors">{cat.name}</span>
              </div>
              <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-md">{cat.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Posts */}
      <div 
        className="bg-white rounded-2xl p-6 font-inter"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-inter text-xl font-semibold text-[#122923]">Popular Posts</h3>
          <Link href="#" className="text-xs font-bold uppercase text-[#122923] flex items-center gap-1 hover:text-emerald-700">
            VIEW ALL <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-5">
          {popularPosts.map((post, idx) => (
            <div key={idx} className="flex gap-4 group cursor-pointer">
              <img src={post.image?.src || post.image} alt={post.title} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-emerald-700 transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-900 font-medium">{post.date}</p>
              </div>
            </div>
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
          <Link href="#" className="text-xs font-bold uppercase text-[#122923] flex items-center gap-1 hover:text-emerald-700">
            VIEW ALL EVENTS <ArrowRight size={12} />
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
          
          <Link href="#" className="flex items-center justify-center gap-2 text-sm font-bold text-gray-800 uppercase pt-4 border-t border-gray-100 hover:text-emerald-700 transition-colors">
            VIEW ALL EVENTS <ArrowRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default BlogSidebar;


