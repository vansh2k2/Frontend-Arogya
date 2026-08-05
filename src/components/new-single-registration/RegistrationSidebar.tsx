"use client";
import React, { useState } from "react";
import { CheckCircle, ArrowRight, HelpCircle, Mail, Phone, Calendar, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import feesIcon from "../../assets/icons/fees.png";
import pp1Icon from "../../assets/icons/pp1.png";
import pp2Icon from "../../assets/icons/pp2.png";
import pp3Icon from "../../assets/icons/pp3.png";
import pp4Icon from "../../assets/icons/pp4.png";
import footerRightImg from "../../assets/icons/footerright.png";

const DAY_OPTIONS = [
  { day: 1, label: 'Day 1', date: '21 Aug (Fri)', bg: '#012e17' },
  { day: 2, label: 'Day 2', date: '22 Aug (Sat)', bg: '#d18e26' },
  { day: 3, label: 'Day 3', date: '23 Aug (Sun)', bg: '#1b3c73' },
];

const SelectionBadge = ({ bgColor = "#012e17" }: { bgColor?: string }) => (
  <AnimatePresence>
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -45 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, rotate: 45 }}
      transition={{ type: "spring", stiffness: 450, damping: 18 }}
      className="absolute -top-3 -right-3 z-30 flex items-center justify-center pointer-events-none"
    >
      {/* Outer Pulse Glow Ring */}
      <motion.span
        animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: bgColor }}
      />
      {/* Big Badge Container */}
      <div 
        className="relative w-9 h-9 rounded-full text-white flex items-center justify-center shadow-xl border-2 border-white"
        style={{ backgroundColor: bgColor }}
      >
        <motion.svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          />
        </motion.svg>
      </div>
    </motion.div>
  </AnimatePresence>
);

interface RegistrationSidebarProps {
  selectedPass?: string | null;
  onSelectPass?: (passId: string) => void;
  selectedDays?: number[];
  onToggleDay?: (dayNum: number) => void;
}

const RegistrationSidebar: React.FC<RegistrationSidebarProps> = ({
  selectedPass = null,
  onSelectPass = () => {},
  selectedDays = [],
  onToggleDay
}) => {
  const daysMultiplier = selectedDays.length > 0 ? selectedDays.length : 1;
  const delegate1DayPrice = 1500 * daysMultiplier;
  const delegate3DaysPrice = 3000 * daysMultiplier;
  const paperPrice = 2500 * daysMultiplier;
  const posterPrice = 2500 * daysMultiplier;

  return (
    <div className="flex flex-col gap-6 relative z-10">
      
      {/* Decorative footer right image */}
      <motion.div 
        initial={{ opacity: 0, x: 50, y: -90, rotateZ: 9, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, mass: 0.9, delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute -right-8 top-[15%] -z-10 pointer-events-none opacity-80"
      >
        <Image src={footerRightImg} alt="Leaf Decoration" className="w-80 h-auto object-contain" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, rotateY: 30, x: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-50px" }}
        className="bg-white overflow-visible relative mt-4 rounded-xl" 
        style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', perspective: '1000px' }}
      >
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex justify-center w-full">
          <Image src={feesIcon} alt="Registration Fees" className="h-10 w-auto object-contain" />
        </div>
        
        <div className="flex flex-col gap-3.5 p-5 pt-8">

        {/* Notice if no pass selected */}
        {!selectedPass ? (
          <div className="bg-red-50 border-2 border-dashed border-red-400 text-red-700 py-2 px-4 rounded-xl text-center text-xs font-bold shadow-xs animate-pulse">
            👉 Please click below to select your Pass *
          </div>
        ) : (
          <div className="bg-green-50 border border-green-300 text-green-800 py-1.5 px-3 rounded-lg text-center text-xs font-semibold">
            ✓ Pass Selected (Click any card to change)
          </div>
        )}

        {/* Compact Conference Day Selection Card */}
        <div className="bg-[#f8faf8] border-2 border-[#2b5922]/20 rounded-xl p-3 flex flex-col gap-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-[#2b5922] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Calendar size={12} />
              </div>
              <span className="text-[11px] font-bold text-[#113111] uppercase tracking-wide">
                Select Conference Day(s) <span className="text-red-500">*</span>
              </span>
            </div>
            <span className="text-[10px] font-semibold text-gray-500">
              21–23 Aug 2026
            </span>
          </div>

          {/* Small boxes for 3 days */}
          <div className="grid grid-cols-3 gap-1.5 pt-0.5">
            {DAY_OPTIONS.map(({ day, label, date, bg }) => {
              const isSelected = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onToggleDay && onToggleDay(day)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border-2 transition-all cursor-pointer relative select-none group ${
                    isSelected
                      ? 'text-white shadow-xs font-bold scale-[1.02]'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-[#2b5922]/50 hover:bg-gray-50'
                  }`}
                  style={isSelected ? { backgroundColor: bg, borderColor: bg } : {}}
                >
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white/30 flex items-center justify-center">
                      <Check size={9} className="text-white" strokeWidth={3.5} />
                    </div>
                  )}
                  <span className="text-[11px] font-extrabold uppercase leading-tight">{label}</span>
                  <span className={`text-[9.5px] font-semibold leading-tight mt-0.5 ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                    {date}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active days summary badge */}
          <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-dashed border-red-200">
            {selectedDays.length === 0 ? (
              <span className="text-gray-500 font-semibold flex items-center gap-1">
                👉 Please select conference day(s)
              </span>
            ) : (
              <span className="text-red-600 font-bold flex items-center gap-1">
                <CheckCircle size={12} className="text-red-600 shrink-0" />
                <span>{selectedDays.length} {selectedDays.length === 1 ? 'Day' : 'Days'} Selected ({selectedDays.map(d => `Day ${d}`).join(', ')})</span>
              </span>
            )}
            {selectedPass === 'delegate' && selectedDays.length > 0 && (
              <span className="text-red-600 font-bold text-[10px] font-mono bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                ₹1,500/day
              </span>
            )}
            {selectedPass === 'delegate3days' && (
              <span className="text-red-600 font-bold text-[10px] bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                3 Days Pass
              </span>
            )}
          </div>
        </div>
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => onSelectPass('delegate')}
          className={`bg-[#f5f6ee] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'delegate' ? 'border-[#012e17] scale-[1.02] shadow-lg ring-2 ring-[#012e17]/20' : 'border-gray-100 hover:border-[#2b5922]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          {selectedPass === 'delegate' && <SelectionBadge bgColor="#012e17" />}
          <Image src={pp1Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-1" />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1">Delegate Pass</h3>
                {selectedPass === 'delegate' && selectedDays.length > 0 && (
                  <span className="text-[10.5px] font-bold text-[#012e17] bg-[#e3f0e8] px-1.5 py-0.5 rounded inline-block mt-0.5">
                    {selectedDays.length} {selectedDays.length === 1 ? 'Day' : 'Days'} ({selectedDays.map(d => `D${d}`).join('+')})
                  </span>
                )}
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[1.55rem] font-semibold text-[#012e17]">
                  ₹{delegate1DayPrice.toLocaleString("en-IN")}
                </span>
                {selectedDays.length > 1 && selectedPass === 'delegate' && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-mono">
                    ₹1,500 × {selectedDays.length}
                  </span>
                )}
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-2">
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#012e17] shrink-0 mt-0.5" /> Full-day Access</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#012e17] shrink-0 mt-0.5" /> Lunch & Refreshments</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#012e17] shrink-0 mt-0.5" /> Conference Kit</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 2 - Most Popular */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => onSelectPass('delegate3days')}
          className={`bg-[#fdf6ec] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'delegate3days' ? 'border-[#d18e26] scale-[1.03] shadow-lg ring-2 ring-[#d18e26]/20' : 'border-gray-100 hover:border-[#d18e26]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          {selectedPass === 'delegate3days' && <SelectionBadge bgColor="#d18e26" />}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d18e26] text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm whitespace-nowrap z-20">
            ★ Most Popular
          </div>
          <Image src={pp2Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-2" />
          <div className="flex flex-col flex-grow mt-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1">Delegate Pass</h3>
                {selectedPass === 'delegate3days' && selectedDays.length > 0 && (
                  <span className="text-[10.5px] font-bold text-[#d18e26] bg-[#fdf1db] px-1.5 py-0.5 rounded inline-block mt-0.5">
                    {selectedDays.length} {selectedDays.length === 1 ? 'Day' : 'Days'} ({selectedDays.map(d => `D${d}`).join('+')})
                  </span>
                )}
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[1.55rem] font-semibold text-[#d18e26]">
                  ₹{delegate3DaysPrice.toLocaleString("en-IN")}
                </span>
                {selectedDays.length > 1 && selectedPass === 'delegate3days' && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-mono">
                    ₹3,000 × {selectedDays.length}
                  </span>
                )}
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-1">
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> Full Access</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> Lunch & Refreshments</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> Premium Conference Kit</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 3 - Paper Presentation */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => onSelectPass('paper')}
          className={`bg-[#f4f5f9] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'paper' ? 'border-[#1b3c73] scale-[1.02] shadow-lg ring-2 ring-[#1b3c73]/20' : 'border-gray-100 hover:border-[#1b3c73]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          {selectedPass === 'paper' && <SelectionBadge bgColor="#1b3c73" />}
          <Image src={pp3Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-1" />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1 whitespace-nowrap">Paper Presentation</h3>
                {selectedPass === 'paper' && selectedDays.length > 0 && (
                  <span className="text-[10.5px] font-bold text-[#1b3c73] bg-[#e6ecf7] px-1.5 py-0.5 rounded inline-block mt-0.5">
                    {selectedDays.length} {selectedDays.length === 1 ? 'Day' : 'Days'} ({selectedDays.map(d => `D${d}`).join('+')})
                  </span>
                )}
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[1.55rem] font-semibold text-[#1b3c73]">
                  ₹{paperPrice.toLocaleString("en-IN")}
                </span>
                {selectedDays.length > 1 && selectedPass === 'paper' && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-mono">
                    ₹2,500 × {selectedDays.length}
                  </span>
                )}
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-2">
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Presentation Slot</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Delegate Access included</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Publication Opportunity</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 4 - Poster Presentation */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => onSelectPass('poster')}
          className={`bg-[#f5f0f4] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'poster' ? 'border-[#702660] scale-[1.02] shadow-lg ring-2 ring-[#702660]/20' : 'border-gray-100 hover:border-[#702660]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          {selectedPass === 'poster' && <SelectionBadge bgColor="#702660" />}
          <Image src={pp4Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-1" />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1 whitespace-nowrap">Poster Presentation</h3>
                {selectedPass === 'poster' && selectedDays.length > 0 && (
                  <span className="text-[10.5px] font-bold text-[#702660] bg-[#faedf7] px-1.5 py-0.5 rounded inline-block mt-0.5">
                    {selectedDays.length} {selectedDays.length === 1 ? 'Day' : 'Days'} ({selectedDays.map(d => `D${d}`).join('+')})
                  </span>
                )}
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-[1.55rem] font-semibold text-[#702660]">
                  ₹{posterPrice.toLocaleString("en-IN")}
                </span>
                {selectedDays.length > 1 && selectedPass === 'poster' && (
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-mono">
                    ₹2,500 × {selectedDays.length}
                  </span>
                )}
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-2">
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#702660] shrink-0 mt-0.5" /> Poster Display Area</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#702660] shrink-0 mt-0.5" /> Delegate Access included</li>
              <li className="flex gap-2 text-sm text-gray-900 font-medium"><CheckCircle size={16} className="text-[#702660] shrink-0 mt-0.5" /> Special Recognition</li>
            </ul>
          </div>
        </motion.div>

        </div>
      </motion.div>

      {/* NEED HELP BOX */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-[#1a3813] text-white rounded-xl p-6 shadow-xl relative overflow-hidden mt-2"
      >
        <div className="absolute -right-6 -bottom-6 opacity-10">
          <HelpCircle size={120} />
        </div>
        <div className="relative z-10">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 font-inter"><HelpCircle size={20} className="text-[#d18e26]" /> Need Help?</h3>
          <p className="text-sm text-white/80 mb-5">Our support team is here to assist you with any registration queries.</p>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
              <Mail size={18} className="text-[#d18e26]" />
              <span className="text-sm font-medium">info@arogyasangosthi.com</span>
            </div>
            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
              <Phone size={18} className="text-[#d18e26]" />
              <span className="text-sm font-medium">+91 9654900525</span>
            </div>
            <div className="bg-black/20 p-3 rounded-lg text-xs mt-2 font-medium text-white/90 text-center tracking-wide">
              Mon - Sat: 9:00 AM - 6:00 PM (IST)
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationSidebar;
