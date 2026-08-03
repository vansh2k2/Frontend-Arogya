"use client";
import React, { useState } from "react";
import { CheckCircle, HelpCircle, Mail, Phone, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";
import feesIcon from "../../assets/icons/fees.png";
import pp1Icon from "../../assets/icons/pp1.png";
import pp2Icon from "../../assets/icons/pp2.png";
import pp3Icon from "../../assets/icons/pp3.png";
import pp4Icon from "../../assets/icons/pp4.png";
import footerRightImg from "../../assets/icons/footerright.png";

const SelectionBadge = ({ bgColor = "#012e17" }: { bgColor?: string }) => (
  <AnimatePresence>
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -45 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, rotate: 45 }}
      transition={{ type: "spring", stiffness: 450, damping: 18 }}
      className="absolute -top-3 -right-3 z-30 flex items-center justify-center pointer-events-none"
    >
      <motion.span
        animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: bgColor }}
      />
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
  delegateCount?: number;
  selectedPass?: string | null;
  onSelectPass?: (passId: string) => void;
}

const RegistrationSidebar: React.FC<RegistrationSidebarProps> = ({ 
  delegateCount = 1,
  selectedPass = null,
  onSelectPass = () => {}
}) => {
  const passes = [
    {
      id: "delegate",
      title: "Delegate Pass",
      subtitle: "",
      basePrice: 1500,
      icon: pp1Icon,
      bgColor: "bg-[#f5f6ee]",
      borderColor: "border-[#012e17]",
      ringColor: "ring-[#012e17]/20",
      accentColor: "#012e17",
      features: ["Full-day Access", "Lunch & Refreshments", "Conference Kit"]
    },
    {
      id: "delegate3days",
      title: "Delegate Pass",
      subtitle: "",
      basePrice: 3000,
      icon: pp2Icon,
      isPopular: true,
      bgColor: "bg-[#fdf6ec]",
      borderColor: "border-[#d18e26]",
      ringColor: "ring-[#d18e26]/20",
      accentColor: "#d18e26",
      features: ["All 3 Days Access", "Lunch & Refreshments", "Premium Conference Kit"]
    },
    {
      id: "paper",
      title: "Paper Presentation",
      subtitle: "",
      basePrice: 2500,
      icon: pp3Icon,
      bgColor: "bg-[#f4f5f9]",
      borderColor: "border-[#1b3c73]",
      ringColor: "ring-[#1b3c73]/20",
      accentColor: "#1b3c73",
      features: ["Presentation Slot", "Delegate Access included", "Publication Opportunity"]
    },
    {
      id: "poster",
      title: "Poster Presentation",
      subtitle: "",
      basePrice: 2500,
      icon: pp4Icon,
      bgColor: "bg-[#f5f0f4]",
      borderColor: "border-[#702660]",
      ringColor: "ring-[#702660]/20",
      accentColor: "#702660",
      features: ["Poster Display Area", "Delegate Access included", "Special Recognition"]
    }
  ];

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
        
        <div className="flex flex-col gap-4 p-5 pt-8">

          {/* Notice if no pass selected */}
          {!selectedPass ? (
            <div className="bg-red-50 border-2 border-dashed border-red-400 text-red-700 py-2.5 px-4 rounded-xl text-center text-xs font-bold shadow-sm animate-pulse">
              👉 Please click below to select your Pass *
            </div>
          ) : (
            <>
              <div className="bg-green-50 border border-green-300 text-green-800 py-1.5 px-3 rounded-lg text-center text-xs font-semibold">
                ✓ Pass Selected (Click any card to change)
              </div>

              {/* Group Counter Indicator Banner */}
              <div className="bg-[#f0f7f0] border border-[#c4e0c4] rounded-xl p-3 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#34A99D]" />
                  <span className="text-xs font-bold text-[#113111] uppercase tracking-wide">
                    Total Delegates:
                  </span>
                </div>
                <span className="bg-[#34A99D] text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                  {delegateCount} {delegateCount === 1 ? 'Person' : 'Persons'}
                </span>
              </div>
            </>
          )}
        
          {/* Dynamic Pass Cards matching Single Registration */}
          {passes.map((item, idx) => {
            const isSelected = selectedPass === item.id;
            const totalPrice = selectedPass ? item.basePrice * delegateCount : item.basePrice;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: (idx + 1) * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => onSelectPass(item.id)}
                className={`${item.bgColor} border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${
                  isSelected 
                    ? `${item.borderColor} scale-[1.02] shadow-lg ring-2 ${item.ringColor}` 
                    : 'border-gray-100 hover:border-gray-300'
                }`} 
                style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
              >
                {isSelected && <SelectionBadge bgColor={item.accentColor} />}
                
                {item.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d18e26] text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm whitespace-nowrap z-20">
                    ★ Most Popular
                  </div>
                )}

                <Image src={item.icon} alt="Pass Icon" className={`w-[58px] h-[58px] object-contain shrink-0 ${item.isPopular ? 'mt-2' : 'mt-1'}`} />
                
                <div className={`flex flex-col flex-grow ${item.isPopular ? 'mt-2' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1 whitespace-nowrap">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <span className="text-xs font-semibold text-gray-600 block">{item.subtitle}</span>
                      )}
                    </div>
                    
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[1.55rem] font-bold" style={{ color: item.accentColor }}>
                        ₹{totalPrice.toLocaleString('en-IN')}
                      </span>
                      {selectedPass && delegateCount > 1 && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-mono">
                          ₹{item.basePrice.toLocaleString('en-IN')} × {delegateCount}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
                  <ul className="flex flex-col gap-1.5 mb-2">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex gap-2 text-sm text-gray-900 font-medium">
                        <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: item.accentColor }} /> 
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}

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
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 font-inter">
            <HelpCircle size={20} className="text-[#d18e26]" /> Need Help?
          </h3>
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
