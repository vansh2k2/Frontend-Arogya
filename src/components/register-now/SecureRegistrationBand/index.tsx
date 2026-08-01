import React from 'react';
import secureIcon from "@/assets/icons/secure.png";
import { motion } from 'framer-motion';

const SecureRegistrationBand = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8, type: "spring", bounce: 0.35 }}
      className="w-full max-w-3xl mx-auto mt-8 bg-[#fbfdfa] border border-[#d6ebd5] rounded-2xl px-8 py-3 flex flex-col md:flex-row items-center gap-4 shadow-sm font-inter relative z-10"
    >
      {/* Left Icon */}
      <img src={secureIcon?.src || secureIcon} alt="Secure" className="shrink-0 w-14 h-14 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />

      {/* Text Content */}
      <div className="flex-1 text-center md:text-left flex flex-col justify-center">
        <h3 className="text-base md:text-lg font-semibold text-[#113111] uppercase mb-0.5 tracking-wide">
          SECURE REGISTRATION
        </h3>
        <p className="text-black text-xs md:text-sm font-medium md:whitespace-nowrap">
          Your information is safe with us. We use advanced security measures to protect your data.
        </p>
      </div>
    </motion.div>
  );
};

export default SecureRegistrationBand;
