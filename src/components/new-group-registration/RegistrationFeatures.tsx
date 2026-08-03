"use client";
import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import arrowIcon from "@/assets/icons/arrow.png";
import sleaf from "@/assets/icons/sleaf.png";
import bleaf from "@/assets/icons/bleaf.png";
import rr1 from "@/assets/icons/rr1.png";
import rr2 from "@/assets/icons/rr2.png";
import rr3 from "@/assets/icons/rr3.png";
import rr4 from "@/assets/icons/rr4.png";
import rr5 from "@/assets/icons/rr5.png";

const features = [
  {
    icon: rr1,
    title: "CERTIFICATE\nOF PARTICIPATION",
  },
  {
    icon: rr2,
    title: "NETWORK WITH\nEXPERTS",
  },
  {
    icon: rr3,
    title: "ACCESS TO\nINTERNATIONAL\nHEALTH & WELLNESS EXPO",
  },
  {
    icon: rr4,
    title: "KNOWLEDGE SESSIONS\n& PANEL DISCUSSIONS",
  },
  {
    icon: rr5,
    title: "LUNCH INCLUDED\n(AS PER CATEGORY)",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      mass: 0.8,
    },
  },
};

const RegistrationFeatures = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative max-w-7xl w-full mx-auto mt-8 md:mt-12 bg-white shadow-sm border border-[#e2f0e2] rounded-2xl pt-4 pb-3 md:pb-4 px-3 md:px-6 font-inter overflow-hidden"
    >
      {/* Decorative Bottom Left Leaf with scroll-in and floating motion */}
      <motion.div
        initial={{ opacity: 0, x: -40, y: 40, rotate: -25 }}
        whileInView={{ opacity: 0.85, x: 0, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.4 }}
        className="absolute bottom-0 left-0 w-12 sm:w-14 md:w-16 lg:w-18 pointer-events-none z-0 select-none"
      >
        <motion.div
          animate={{ y: [0, -4, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={sleaf}
            alt="Decorative Leaf"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Decorative Bottom Right Leaf with scroll-in and floating motion */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 40, rotate: 25 }}
        whileInView={{ opacity: 0.85, x: 0, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
        className="absolute bottom-0 right-0 w-16 sm:w-20 md:w-24 pointer-events-none z-0 select-none"
      >
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image
            src={bleaf}
            alt="Decorative Leaf Right"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image src={arrowIcon} className="w-7 h-7 md:w-9 md:h-9 object-contain" alt="arrow left" />
        </motion.div>
        <h2 className="text-center text-[#133513] text-lg sm:text-xl md:text-2xl font-bold font-serif uppercase tracking-wide m-0">
          Your Registration Includes
        </h2>
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image src={arrowIcon} className="w-7 h-7 md:w-9 md:h-9 object-contain -scale-x-100" alt="arrow right" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`flex flex-col items-center justify-start text-center px-2 sm:px-3 py-2 md:py-1.5 cursor-default ${
              idx !== features.length - 1 ? "lg:border-r lg:border-gray-300" : ""
            } ${idx % 2 === 0 ? "border-r sm:border-r-0 border-gray-300" : ""}`}
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Image
                src={item.icon}
                alt={item.title.replace(/\n/g, ' ')}
                className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px] object-contain mb-1.5 md:mb-2"
              />
            </motion.div>
            <h4 className="font-inter font-semibold text-black text-[11px] sm:text-xs md:text-sm tracking-wide uppercase leading-snug whitespace-pre-line">
              {item.title}
            </h4>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RegistrationFeatures;


