"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import leafsImg from '@/assets/icons/leafs.png';

export default function DecorativeBackground() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50, rotate: -15 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="absolute -left-20 top-1/4 -z-0 pointer-events-none opacity-40 hidden lg:block"
    >
      <Image src={leafsImg} alt="Leaf Decoration" className="w-[300px] h-auto object-contain" />
    </motion.div>
  );
}
