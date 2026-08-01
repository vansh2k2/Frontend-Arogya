import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Phone, X, MessageSquare } from "lucide-react";

const WhatsAppFloating = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "919876543210";
  const whatsappMessage = "Hello! I'm interested in Arogya Sangoshthi 2025.";
  const callNumber = "919876543210";

  const handleWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
  };

  const handleCall = () => {
    window.open(`tel:+${callNumber}`, "_self");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">

      {/* Expanded options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex flex-col gap-2 mb-1"
          >
            {/* WhatsApp */}
            <motion.button
              onClick={handleWhatsApp}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ delay: 0.05 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-white rounded-full shadow-xl px-4 py-2.5 border border-green-100"
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shadow-md shrink-0">
                <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white">
                  <path d="M16.01 3.2c-7.11 0-12.88 5.76-12.88 12.86 0 2.27.59 4.48 1.72 6.43L3.2 28.8l6.49-1.7a12.85 12.85 0 0 0 6.32 1.63h.01c7.1 0 12.88-5.77 12.88-12.86 0-3.44-1.34-6.67-3.78-9.1A12.8 12.8 0 0 0 16.01 3.2zm7.55 18.37c-.31.87-1.82 1.67-2.52 1.78-.65.1-1.48.14-2.39-.15-.55-.18-1.25-.41-2.16-.8-3.8-1.64-6.27-5.39-6.46-5.64-.18-.25-1.54-2.05-1.54-3.92 0-1.87.97-2.78 1.32-3.16.35-.38.76-.48 1.01-.48.25 0 .51 0 .73.01.24.01.55-.09.86.65.31.75 1.06 2.59 1.15 2.78.09.19.15.41.03.66-.12.25-.18.41-.35.63-.18.21-.38.47-.54.64-.18.18-.36.38-.15.74.21.36.93 1.53 2 2.48 1.38 1.23 2.53 1.62 2.89 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.09.99 2.45 1.17.36.18.6.27.69.42.09.15.09.87-.22 1.74z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-gray-800 leading-none">WhatsApp</p>
                <p className="text-[9px] text-black mt-0.5 leading-none">Chat with us now</p>
              </div>
            </motion.button>

            {/* Call */}
            <motion.button
              onClick={handleCall}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-white rounded-full shadow-xl px-4 py-2.5 border border-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-[#1a3a08] flex items-center justify-center shadow-md shrink-0">
                <Phone size={14} className="text-[#c8960c]" strokeWidth={2.5} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-gray-800 leading-none">Call Us</p>
                <p className="text-[9px] text-black mt-0.5 leading-none">Speak to our team</p>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <div className="relative">

        {/* Pulse rings — orange */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-500/40"
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-400/25"
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' }}
          aria-label="Enquiry"
        >
          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} className="text-white" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="enquire"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-0.5"
              >
                <MessageSquare size={18} className="text-white" strokeWidth={2} />
                <span
                  className="text-white font-bold tracking-wider leading-none"
                  style={{ fontSize: '6px', letterSpacing: '1.5px' }}
                >
                  ENQUIRE
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Red dot with pulse */}
        {!isOpen && (
          <div className="absolute -top-0.5 -right-0.5">
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500"
              animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppFloating;