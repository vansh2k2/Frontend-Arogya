"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import leafsImg from '@/assets/icons/leafs.png';

export default function DecorativeBackground({ isSuccess }: { isSuccess?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50, rotate: -15 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`absolute -left-20 -z-0 pointer-events-none opacity-40 hidden lg:block ${isSuccess ? 'top-10 -translate-y-10 scale-75 origin-top-left' : 'top-1/4'}`}
    >
      <Image src={leafsImg} alt="Leaf Decoration" className={`${isSuccess ? 'w-[180px]' : 'w-[300px]'} h-auto object-contain transition-all duration-700`} />
    </motion.div>
  );
}
