"use client";
import React, { useState } from "react";
import { CheckCircle, ArrowRight, HelpCircle, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

import Image from "next/image";
import feesIcon from "../../assets/icons/fees.png";
import pp1Icon from "../../assets/icons/pp1.png";
import pp2Icon from "../../assets/icons/pp2.png";
import pp3Icon from "../../assets/icons/pp3.png";
import pp4Icon from "../../assets/icons/pp4.png";
import footerRightImg from "../../assets/icons/footerright.png";

const RegistrationSidebar = () => {
  const [selectedPass, setSelectedPass] = useState<string>("delegate");

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
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => setSelectedPass('delegate')}
          className={`bg-[#f5f6ee] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'delegate' ? 'border-[#012e17]' : 'border-gray-100 hover:border-[#2b5922]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          <Image src={pp1Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-1" />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1">Delegate Pass</h3>
              <div className="text-right">
                <span className="text-[1.55rem] font-semibold text-[#012e17]">₹1,500</span>
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-2">
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#012e17] shrink-0 mt-0.5" /> Full-day Access</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#012e17] shrink-0 mt-0.5" /> Lunch & Refreshments</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#012e17] shrink-0 mt-0.5" /> Conference Kit</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 2 - Most Popular */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => setSelectedPass('delegate3days')}
          className={`bg-[#fdf6ec] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'delegate3days' ? 'border-[#d18e26] scale-[1.02]' : 'border-gray-100 hover:border-[#d18e26]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d18e26] text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
            ★ Most Popular
          </div>
          <Image src={pp2Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-2" />
          <div className="flex flex-col flex-grow mt-2">
            <div className="flex justify-between items-start">
              <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1">Delegate Pass</h3>
              <div className="text-right">
                <span className="text-[1.55rem] font-semibold text-[#d18e26]">₹3,000</span>
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-1">
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> All 3 Days Access</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> Lunch & Refreshments</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#d18e26] shrink-0 mt-0.5" /> Premium Conference Kit</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 3 - Paper Presentation */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => setSelectedPass('paper')}
          className={`bg-[#f4f5f9] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'paper' ? 'border-[#1b3c73] scale-[1.02]' : 'border-gray-100 hover:border-[#1b3c73]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          <Image src={pp3Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-1" />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1 whitespace-nowrap">Paper Presentation</h3>
              <div className="text-right">
                <span className="text-[1.55rem] font-semibold text-[#1b3c73]">₹2,500</span>
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-2">
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Presentation Slot</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Delegate Access included</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Publication Opportunity</li>
            </ul>
          </div>
        </motion.div>

        {/* Card 4 - Poster Presentation */}
        <motion.div 
          initial={{ opacity: 0, y: -40, rotateZ: 5, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
          onClick={() => setSelectedPass('poster')}
          className={`bg-[#f5f0f4] border-2 cursor-pointer transition-all rounded-xl p-3.5 flex gap-2.5 relative ${selectedPass === 'poster' ? 'border-[#1b3c73] scale-[1.02]' : 'border-gray-100 hover:border-[#1b3c73]'}`} 
          style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
        >
          <Image src={pp4Icon} alt="Pass Icon" className="w-[58px] h-[58px] object-contain shrink-0 mt-1" />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-black font-semibold text-lg uppercase leading-tight mt-1 whitespace-nowrap">Poster Presentation</h3>
              <div className="text-right">
                <span className="text-[1.55rem] font-semibold text-[#1b3c73]">₹2,500</span>
              </div>
            </div>
            
            <span className="text-black text-sm font-semibold mt-2 mb-1">Includes:</span>
            <ul className="flex flex-col gap-1.5 mb-2">
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Poster Display Area</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Delegate Access included</li>
              <li className="flex gap-2 text-sm text-gray-700 font-medium"><CheckCircle size={16} className="text-[#1b3c73] shrink-0 mt-0.5" /> Special Recognition</li>
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
