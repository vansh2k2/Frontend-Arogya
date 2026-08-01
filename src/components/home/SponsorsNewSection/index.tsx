"use client";
import { motion } from "framer-motion";
import sponsors from "@/data/sponsorsData";
import { Handshake } from "lucide-react";

const SponsorsMarqueeSection = () => {
  return (
    <section className="pt-10 pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-x-hidden">

      {/* Medical Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 text-teal-600 text-5xl">⚕️</div>
        <div className="absolute bottom-10 right-20 text-teal-500 text-4xl">🏥</div>
        <div className="absolute top-1/2 right-10 text-cyan-400 text-3xl">💊</div>
      </div>

      {/* Soft Medical Gradient Orbs */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[280px] h-[280px] bg-teal-300 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[240px] h-[240px] bg-cyan-300 rounded-full blur-[130px]" />
      </div>

      {/* Header Section */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-4 border border-teal-200">
          <Handshake size={16} className="text-teal-700" />
          <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">Our Partners</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          OUR <span className="text-teal-700">SPONSORS</span>
        </h2>

        <p className="text-slate-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Honored to collaborate with our valued partners & supporters.
        </p>

        {/* Underline accent */}
        <div className="mt-3 mx-auto w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full" />
      </div>

      {/* Premium Medical Marquee Container */}
      <div className="relative w-full overflow-hidden py-4">

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex items-center gap-8 marquee-track"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >

          {[...sponsors, ...sponsors].map((sp, index) => (
            <div
              key={index}
              className="
                min-w-[150px] h-[110px]
                flex items-center justify-center
                bg-white backdrop-blur-xl 
                border-2 border-teal-200
                shadow-md hover:shadow-xl
                hover:border-teal-500
                rounded-2xl px-6
                transition-all duration-500 group
                relative overflow-hidden
              "
            >
              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-cyan-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-teal-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-lg"></div>

              <img
                src={(sp.logo as any)?.src || (sp.logo as any)}
                alt={sp.name}
                className="
                  max-h-12 object-contain
                  opacity-80 group-hover:opacity-100
                  group-hover:scale-110
                  transition-all duration-500
                  relative z-10
                "
              />
            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsMarqueeSection;
