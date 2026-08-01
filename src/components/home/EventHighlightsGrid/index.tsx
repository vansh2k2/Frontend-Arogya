"use client";
import React, { useState, useEffect } from 'react';
import { Shield, Dna, Leaf, Landmark, Network, Sparkles, Users, Activity, Handshake, TrendingUp, Globe, ArrowRight, UserCheck } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/utils/imageOptimization';
import { API_URL, SERVER_URL } from "@/lib/api";

const EventHighlightsGrid = () => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(`${API_URL}/eminent-speakers`);
        const data = await res.json();
        if (data.success) {
          // Take the first 5 speakers for the grid
          setSpeakers(data.data.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch eminent speakers:', error);
      }
    };
    fetchSpeakers();
  }, []);

  return (
    <section className="py-12 bg-[#F8FAFC]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Conference Themes Top Bar */}
        <div className="bg-white rounded-[20px] border border-gray-100 p-6 mb-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-[#143111]"></div>
            <h2 className="text-[#143111] font-bold text-xl uppercase tracking-[0.1em]">CONFERENCE THEMES</h2>
            <div className="h-[1px] w-12 bg-[#143111]"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex flex-col items-center text-center p-3">
              <Shield className="w-12 h-12 text-[#143111] mb-4 stroke-[1.5]" />
              <span className="text-xs font-bold text-gray-800 leading-tight">Preventive &<br/>Integrative<br/>Healthcare</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-100 hidden lg:block"></div>
              <Dna className="w-12 h-12 text-[#143111] mb-4 stroke-[1.5]" />
              <span className="text-xs font-bold text-gray-800 leading-tight">Medical Innovation<br/>& Research</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-100 hidden lg:block"></div>
              <Leaf className="w-12 h-12 text-[#143111] mb-4 stroke-[1.5]" />
              <span className="text-xs font-bold text-gray-800 leading-tight">Wellness, Nutrition<br/>& Lifestyle</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-100 hidden lg:block"></div>
              <Landmark className="w-12 h-12 text-[#143111] mb-4 stroke-[1.5]" />
              <span className="text-xs font-bold text-gray-800 leading-tight">Healthcare Policy<br/>& Governance</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-100 hidden lg:block"></div>
              <Network className="w-12 h-12 text-[#143111] mb-4 stroke-[1.5]" />
              <span className="text-xs font-bold text-gray-800 leading-tight">Digital Health &<br/>Technology</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gray-100 hidden lg:block"></div>
              <Sparkles className="w-12 h-12 text-[#143111] mb-4 stroke-[1.5]" />
              <span className="text-xs font-bold text-gray-800 leading-tight">AYUSH & Traditional<br/>Wisdom</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Why Attend */}
          <div className="lg:col-span-4 bg-white rounded-[20px] border border-gray-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col relative overflow-hidden">
            <h3 className="text-lg font-bold text-[#143111] mb-6 uppercase tracking-wide">WHY ATTEND AROGYA 2026?</h3>
            <ul className="space-y-6 relative z-10 flex-grow">
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f8faec] flex items-center justify-center shrink-0">
                  <Users className="text-[#cb8134] w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700 text-sm">Connect with Global Leaders</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f8faec] flex items-center justify-center shrink-0">
                  <TrendingUp className="text-[#cb8134] w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700 text-sm">Gain Insights on Emerging Trends</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f8faec] flex items-center justify-center shrink-0">
                  <Handshake className="text-[#cb8134] w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700 text-sm">Build Strategic Collaborations</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f8faec] flex items-center justify-center shrink-0">
                  <Activity className="text-[#cb8134] w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700 text-sm">Influence Policy & Practice</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f8faec] flex items-center justify-center shrink-0">
                  <Globe className="text-[#cb8134] w-4 h-4" />
                </div>
                <span className="font-medium text-gray-700 text-sm">Shape the Future of Healthcare</span>
              </li>
            </ul>
            {/* Background decorative element */}
            <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] pointer-events-none">
              <Users size={250} className="text-[#143111]" />
            </div>
          </div>

          {/* Speakers */}
          <div className="lg:col-span-8 bg-white rounded-[20px] border border-gray-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <h3 className="text-lg font-bold text-[#143111] mb-4 sm:mb-0 uppercase tracking-wide">MEET OUR EMINENT SPEAKERS & LEADERS</h3>
              <a href="/speakers" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-[#143111]/20 rounded-full px-5 py-2 text-xs font-bold uppercase text-[#143111] hover:bg-[#143111] hover:text-white transition-all">
                VIEW ALL SPEAKERS <ArrowRight size={14} />
              </a>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-between h-[180px] sm:h-auto items-stretch flex-grow">
              {speakers.length > 0 ? speakers.map((speaker, idx) => (
                <div key={idx} className="flex-1 min-w-[120px] flex flex-col items-center text-center">
                  <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl bg-[#f4f2ee] mb-3 overflow-hidden shadow-inner border border-gray-100 flex items-end justify-center pt-2">
                    <img src={speaker.image ? optimizeCloudinaryUrl(speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`, 300) : ''} alt={speaker.name} className="w-[85%] h-[85%] object-cover rounded-t-lg" />
                  </div>
                  <h4 className="font-bold text-[#143111] text-[13px] leading-tight mb-1">{speaker.name}</h4>
                  <p className="text-[11px] text-gray-500 font-medium px-2">{speaker.designation}{speaker.organization ? `,\n${speaker.organization}` : ''}</p>
                </div>
              )) : (
                <div className="flex-1 text-center py-8 text-gray-500">Loading speakers...</div>
              )}
              
              <div className="flex-1 min-w-[90px] flex flex-col items-center justify-center border border-dashed border-[#cb8134]/40 rounded-xl bg-[#cb8134]/[0.02] p-4 ml-2">
                <div className="w-10 h-10 rounded-full bg-[#143111] text-white flex items-center justify-center mb-3 shadow-md">
                  <UserCheck size={18} />
                </div>
                <span className="font-bold text-[#143111] text-[13px] leading-tight">& Many<br/>More</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EventHighlightsGrid;

