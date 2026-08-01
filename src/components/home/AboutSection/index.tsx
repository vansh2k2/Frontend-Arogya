"use client";
import { CheckCircle, Users, Award, Globe, Clock } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import aboutImage from "@/assets/about1.jpg";
import aboutImage2 from "@/assets/about2.jpg";
import aboutImage3 from "@/assets/about3.jpg";
import aboutImage4 from "@/assets/about4.jpg";

const features = [
  { icon: Users, text: "500+ Expected Delegates" },
  { icon: Globe, text: "20+ Countries Represented" },
  { icon: Award, text: "50+ Expert Speakers" },
  { icon: CheckCircle, text: "CME Credit Points" },
];

const images = [aboutImage, aboutImage2, aboutImage3, aboutImage4];

// Image positions: col, row, height
const imageLayout = [
  { col: 0, mt: 0,  height: "h-52" },
  { col: 0, mt: 0,  height: "h-44" },
  { col: 1, mt: 32, height: "h-44" },
  { col: 1, mt: 0,  height: "h-52" },
];

const imageVariants = {
  hidden: { opacity: 0, scale: 1.12, y: 30, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.2 + i * 0.28,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const clipVariants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (i) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      delay: 0.2 + i * 0.28,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= 15) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-5"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-50 border-l-4 border-orange-600">
              <Clock size={12} /> About The Conference
            </span>

            <div className="w-12 h-[3px] bg-orange-600" />

            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Welcome to{" "}
              <span className="text-orange-700">Arogya Sangoshthi</span> 2025
            </h2>

            <p className="text-muted-foreground text-[15px] leading-relaxed text-justify">
              Arogya Sangoshthi 2025 is a premier international conference
              dedicated to advancing AYUSH systems and homeopathic medicine.
              This three-day event brings together practitioners, researchers,
              and healthcare professionals from around the world.
            </p>

            <p className="text-muted-foreground text-[15px] leading-relaxed text-justify">
              Join us for insightful keynote sessions, interactive workshops,
              research presentations, and networking opportunities that define
              the future of integrative healthcare.
            </p>

            {/* Features — NO RADIUS */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 border border-yellow-400 bg-background hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-emerald-50 flex-shrink-0">
                      <Icon size={15} className="text-emerald-700" />
                    </div>
                    <span className="text-[12.5px] font-semibold text-foreground">
                      {feature.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT — IMAGES one by one reveal */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {/* Col 1 */}
              <div className="flex flex-col gap-3">
                {[0, 1].map((idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={clipVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className={`relative overflow-hidden ${imageLayout[idx].height} group shadow-md rounded-xl`}
                  >
                    <motion.img
                      custom={idx}
                      variants={imageVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      src={images[idx]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/20 pointer-events-none" />
                  </motion.div>
                ))}
              </div>

              {/* Col 2 — offset */}
              <div className="flex flex-col gap-3 mt-8">
                {[2, 3].map((idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={clipVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className={`relative overflow-hidden ${imageLayout[idx].height} group shadow-md rounded-xl`}
                  >
                    <motion.img
                      custom={idx}
                      variants={imageVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      src={images[idx]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-900/20 pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.4, duration: 0.5, ease: "backOut" }}
              className="absolute -bottom-4 -left-4 bg-emerald-800 text-white px-5 py-4 shadow-2xl z-10 rounded-xl"
            >
              <div className="text-3xl font-bold text-yellow-400 font-playfair leading-none">
                {count}+
              </div>
              <div className="text-[11px] opacity-80 mt-1 tracking-wide">
                Years of Excellence
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
