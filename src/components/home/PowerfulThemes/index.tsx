"use client";
import React from 'react';
import { motion } from 'framer-motion';
import mainIcon from '@/assets/icons/main.png';
import SectionContainer from '@/components/layout/SectionContainer';
const PowerfulThemes = () => {
  return (
    <section className="py-12 sm:py-16 bg-white  relative">
      <SectionContainer className="relative z-10 font-inter">
        <motion.div
          className="flex flex-col items-center mb-8 sm:mb-12 w-full text-center"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={(mainIcon as any)?.src || (mainIcon as any)} alt="Logo" className="h-7 w-auto object-contain mb-2" />
          <div className="flex items-center gap-2 sm:gap-3 w-full justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
            <div className="h-[1px] bg-gradient-to-r from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px] sm:max-w-[120px]" />
            <h3 className="text-[#032e1c] font-extrabold text-sm sm:text-base md:text-xl tracking-wider uppercase font-inter">
              3 DAYS. 3 POWERFUL THEMES. ENDLESS POSSIBILITIES.
            </h3>
            <div className="h-[1px] bg-gradient-to-l from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px] sm:max-w-[120px]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Day 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#f8faec] p-5 sm:p-6 lg:p-8 rounded-2xl border border-[#e2e8c1] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-block bg-[#011a12] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">DAY 1 | 21 AUGUST 2026</div>
            <h3 className="text-xl font-bold text-[#cb8134] mb-2 uppercase">INNOVATE</h3>
            <p className="text-[#011a12] font-semibold text-sm mb-6">Driving Healthcare Through Innovation</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#cb8134] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Medical Innovation & Research</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#cb8134] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Digital Health & AI</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#cb8134] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Startups & Emerging Technologies</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#cb8134] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Future of Healthcare Delivery</span>
              </li>
            </ul>
          </motion.div>

          {/* Day 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#eef5fa] p-5 sm:p-6 lg:p-8 rounded-2xl border border-[#c9def0] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-block bg-[#011a12] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">DAY 2 | 22 AUGUST 2026</div>
            <h3 className="text-xl font-bold text-[#1a5c7a] mb-2 uppercase">COLLABORATE</h3>
            <p className="text-[#011a12] font-semibold text-sm mb-6">Building Partnerships for a Healthier World</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a5c7a] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Industry Collaboration</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a5c7a] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Global Health Partnerships</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a5c7a] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Public-Private Synergy</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1a5c7a] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Community Engagement</span>
              </li>
            </ul>
          </motion.div>

          {/* Day 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#fcf0ed] p-5 sm:p-6 lg:p-8 rounded-2xl border border-[#f5d0c6] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="inline-block bg-[#011a12] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">DAY 3 | 23 AUGUST 2026</div>
            <h3 className="text-xl font-bold text-[#b54a32] mb-2 uppercase">SUSTAIN</h3>
            <p className="text-[#011a12] font-semibold text-sm mb-6">Sustainable Solutions for Long-Term Impact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b54a32] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Sustainable Healthcare Systems</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b54a32] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Wellness, Nutrition & Lifestyle</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b54a32] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Environmental Health</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b54a32] mt-1.5 shrink-0"></div>
                <span className="text-gray-700 text-sm">Policy & Governance for Tomorrow</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default PowerfulThemes;

