"use client";
import { useRef } from 'react';
import { MapPin, Calendar, Clock, Building, Activity, ArrowRight, Navigation } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const EventScheduleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const scheduleItems = [
    { title: 'Registration Opens', time: '8:00 AM IST', delay: 0.5 },
    { title: 'Conference Sessions', time: '9:00 AM – 6:00 PM IST', delay: 0.62 },
    { title: 'Networking Dinner', time: '7:00 PM – 10:00 PM IST', delay: 0.74 },
  ];

  return (
    <section ref={ref} className="py-12 bg-emerald-50/40 overflow-x-hidden relative">

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #065f46 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-white border-l-4 border-emerald-600 shadow-sm mb-3">
            <Activity size={12} /> Event Details
          </span>
          <div className="w-12 h-[3px] bg-emerald-600 mx-auto mb-3" />
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Mark Your <span className="text-emerald-700">Calendar</span>
          </h2>
          <p className="text-muted-foreground text-[15px] mt-2 whitespace-nowrap">
            Three days of insightful sessions, workshops, and networking opportunities
          </p>
        </motion.div>

        {/* MAIN BLOCK */}
        <div className="max-w-4xl mx-auto">

          {/* TOP DATE BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-emerald-700 text-white flex flex-wrap items-center justify-between gap-3 px-6 py-4"
          >
            <div className="flex items-center gap-3">
              <Calendar size={24} className="text-emerald-300 flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold mb-0.5">Conference Dates</p>
                <p className="font-playfair text-xl font-bold leading-none">15 – 17 March 2025</p>
              </div>
            </div>
            <div className="h-8 w-px bg-emerald-500 hidden md:block" />
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-emerald-300 flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold mb-0.5">Daily Timings</p>
                <p className="text-sm font-bold leading-none">8:00 AM – 10:00 PM IST</p>
              </div>
            </div>
            <div className="h-8 w-px bg-emerald-500 hidden md:block" />
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-emerald-300 flex-shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold mb-0.5">City</p>
                <p className="text-sm font-bold leading-none">Mumbai, India</p>
              </div>
            </div>
          </motion.div>

          {/* BOTTOM ROW */}
          <div className="grid lg:grid-cols-5 gap-8 mt-4">

            {/* LEFT — MAP */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-3 bg-white border border-emerald-100 shadow-sm overflow-hidden"
            >
              <div className="relative overflow-hidden" style={{ height: '280px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.1234567890123!2d72.8546!3d19.1234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI0LjQiTiA3MsKwNTEnMTYuNiJF!5e0!3m2!1sen!2sin!4v1234567890123"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Venue Location"
                />
              </div>

              {/* Venue info — bg-gray-50 */}
              <div className="p-4 border-t border-emerald-100 bg-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-white border border-emerald-100 flex-shrink-0 mt-0.5">
                    <MapPin size={15} className="text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-playfair text-[15px] font-bold text-foreground">
                      Mumbai International Convention Centre
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Building size={10} className="text-emerald-500" />
                      <span className="text-xs text-muted-foreground">Goregaon East, Mumbai, Maharashtra</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors group flex-shrink-0">
                    <Navigation size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    Directions
                  </button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — SCHEDULE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-2 flex flex-col bg-white border border-emerald-100 shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 pt-4 pb-3 border-b border-emerald-100">
                <div className="flex items-center gap-2 mb-0.5">
                  <Clock size={13} className="text-emerald-600" />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">Daily Schedule</p>
                </div>
                <p className="text-xs text-muted-foreground">Same timings apply all 3 days</p>
              </div>

              {/* Items */}
              <div className="flex-1 divide-y divide-emerald-50">
                {scheduleItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: item.delay, duration: 0.5 }}
                    className="flex items-center gap-3 px-4 py-4 hover:bg-emerald-50/60 transition-colors group"
                  >
                    <div className="w-2 h-2 bg-emerald-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                    <ArrowRight
                      size={13}
                      className="text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Bottom note */}
              <div className="p-4 border-t border-emerald-100 mt-auto">
                <div className="border-l-4 border-orange-600 pl-3 py-1 bg-orange-50">
                  <p className="text-[10px] text-orange-700 font-semibold uppercase tracking-wide">Registration Required</p>
                  <p className="text-xs text-orange-600 mt-0.5">Secure your spot before seats fill up</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
