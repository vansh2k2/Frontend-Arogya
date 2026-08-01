"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gallarybg from '@/assets/banner/gallarybg.webp';
import { Leaf } from 'lucide-react';
import { glimpseApi, SERVER_URL } from '@/lib/api';
import SectionContainer from '@/components/layout/SectionContainer';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.92, 
    filter: 'blur(12px)', 
    rotateX: -15 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
};

// Character animation for the main title
const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const titleChars = "GLIMPSES".split("");
const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -50, filter: 'blur(10px)', scale: 0.9 },
  visible: {
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    filter: 'blur(0px)',
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const Hero = () => {
  const [settings, setSettings] = useState({
    heading: 'GLIMPSES',
    subheading: 'Moments of Knowledge, Collaboration & Wellness',
    description: 'Relive the inspiring moments from past editions of Arogya Sanghoshti \nwhere experts, researchers and healthcare leaders came together \nto shape the future of integrated healthcare.',
    bgImage: '',
    bgAlt: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await glimpseApi.getSettings();
      if (data) {
        setSettings(data);
      }
    };
    fetchSettings();
  }, []);

  const titleChars = (settings.heading || "GLIMPSES").split("");
  const bgUrl = settings.bgImage ? (settings.bgImage.startsWith('http') ? settings.bgImage : `${SERVER_URL}${settings.bgImage}`) : gallarybg;

  return (
    <section className="relative w-full py-8 md:py-12 lg:py-16 bg-[#f8faf8] overflow-hidden font-inter" style={{ perspective: 1200 }}>
      {/* Background Image Setup */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgUrl?.src || bgUrl})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transformOrigin: 'center'
        }}
        initial={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      ></motion.div>

      <SectionContainer className="relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center flex flex-col items-center relative -left-6 md:-left-16 lg:-left-28 xl:-left-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ perspective: 1200 }}
        >
          {/* Animated Title Character by Character */}
          <motion.h1
            variants={titleContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1b5e20] mb-2 tracking-tight uppercase flex justify-center"
            style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.7)' }}
          >
            {titleChars.map((char, index) => (
              <motion.span key={index} variants={charVariants} style={{ display: 'inline-block' }}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl text-[#0e3b1c] font-medium mb-1 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {settings.subheading}
          </motion.h2>

          {/* Decorative Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-2 w-full max-w-[240px]"
          >
            <motion.div 
              className="h-[1px] bg-[#1b5e20]/80 flex-1 relative"
              initial={{ scaleX: 0, transformOrigin: 'right' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#1b5e20]"></div>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0, rotate: -180, filter: 'blur(4px)' }}
              whileInView={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, ease: "backOut" }}
            >
              <Leaf size={18} className="text-[#1b5e20]" fill="currentColor" />
            </motion.div>

            <motion.div 
              className="h-[1px] bg-[#1b5e20]/80 flex-1 relative"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#1b5e20]"></div>
            </motion.div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-gray-900 text-sm md:text-base max-w-2xl font-medium leading-relaxed whitespace-pre-line"
          >
            {settings.description}
          </motion.p>
        </motion.div>
      </SectionContainer>
    </section>
  );
};

export default Hero;

