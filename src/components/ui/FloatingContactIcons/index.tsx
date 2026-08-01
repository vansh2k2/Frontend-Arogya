import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const FloatingContactIcons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* CALL */}
      <div className="relative group">
        {/* Pulse Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute w-full h-full rounded-full bg-emerald-400/60 border border-emerald-400/40"
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-full h-full rounded-full bg-emerald-400/40 border border-emerald-400/20"
            animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>

        <a
          href="tel:+919876543210"
          className="relative z-10 block"
          aria-label="Call"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 ring-4 ring-white ring-opacity-30">
            <Phone className="w-5 h-5 text-white" />
          </div>

          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg">
            Call Us
          </span>
        </a>
      </div>

    </div>
  );
};

export default FloatingContactIcons;