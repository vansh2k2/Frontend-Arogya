"use client";
import React from "react";
import Layout from "@/components/layout/Layout";
import { LoginForm } from "@/components/delegate-auth/LoginForm";
import Link from "next/link";
import { Calendar, MapPin, Globe, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import leafsIcon from "@/assets/icons/leafs.png";
import footerRightIcon from "@/assets/icons/footerright.webp";
import bleafIcon from "@/assets/icons/bleaf.png";

const styleSheet = `
@keyframes floatLeaf {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-12px) translateX(6px); }
  50% { transform: translateY(-20px) translateX(-8px); }
  75% { transform: translateY(-8px) translateX(-10px); }
}
.animate-float-leaf {
  animation: floatLeaf 14s infinite ease-in-out;
}
`;

export default function LoginPage() {
  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />

      {/* Background Wrapper */}
      <div className="min-h-[calc(100vh-140px)] bg-slate-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 font-inter relative overflow-hidden">

        {/* Left Background Leaf Decor — Animated Entrance & Float */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotate: -20 }}
          animate={{ opacity: 0.8, x: 0, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[-160px] lg:left-[-120px] top-[10%] lg:top-[8%] pointer-events-none z-0 w-[360px] lg:w-[420px] h-[360px] lg:h-[420px] animate-float-leaf"
        >
          <img
            src={(leafsIcon?.src || leafsIcon) as string}
            alt="Leaves decoration"
            className="w-full h-full object-contain drop-shadow-xl opacity-80"
          />
        </motion.div>

        {/* ── Main Unified Merged Card (Tile Style matching admin) with Smooth Scale Entrance ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl bg-white overflow-hidden flex flex-col lg:flex-row relative z-10"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          {/* ─── LEFT HALF: Info & Event Highlights (Half White & Half Green Gradient) ─── */}
          <div
            className="lg:w-1/2 relative overflow-hidden flex items-center justify-center lg:justify-start p-6 lg:py-8 lg:pl-10 lg:pr-6 xl:pl-12 border-b-2 lg:border-b-0 lg:border-r-2 border-emerald-100"
            style={{
              background: "linear-gradient(135deg, #ffffff 45%, #eaf5e9 100%)",
            }}
          >

            {/* Animated background blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-emerald-100/40 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-teal-100/30 rounded-full blur-[120px]" />
            </div>

            {/* Top-Right Footer / Leaf Decor inside Left Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
              animate={{ opacity: 0.75, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="absolute right-[-10px] top-[-10px] pointer-events-none z-0 w-[110px] lg:w-[140px]"
            >
              <img
                src={(footerRightIcon?.src || footerRightIcon) as string}
                alt="Footer right decoration"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </motion.div>

            {/* Content with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[370px]"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e1efe0] border border-[#b5dab3] text-[#1c4717] font-extrabold text-[10px] uppercase tracking-wider mb-4">
                <Sparkles size={11} className="text-amber-600" />
                18TH AROGYA SANGOSTIHI 2026
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-snug mb-2">
                Delegates <br />
                <span className="text-[#0d6e38]">Login Portal</span>
              </h1>

              <p className="text-xs text-black font-medium leading-relaxed mb-5">
                Access your verified delegate dashboard, view pass <br />
                details &amp; download official entry badge.
              </p>

              {/* EVENT HIGHLIGHTS divider */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-gray-300 font-bold text-xs">───</span>
                <span className="text-[#0f4d1e] font-black text-[11px] uppercase tracking-widest">
                  EVENT HIGHLIGHTS
                </span>
                <span className="text-gray-300 font-bold text-xs">───</span>
              </div>

              {/* Highlights */}
              <div className="space-y-3.5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0f4d1e] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">21 - 23 AUGUST 2026</h4>
                    <p className="text-[11px] text-blue-600 font-semibold">Friday - Sunday</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0f4d1e] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Pragati Maidan,</h4>
                    <p className="text-xs font-bold text-gray-900">New Delhi</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0f4d1e] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Globe size={16} />
                  </div>
                  <div>
                    <a
                      href="https://www.ihwe.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#0f4d1e] hover:underline"
                    >
                      www.ihwe.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Register CTA box — half white & half green */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="rounded-xl p-3 flex items-center justify-between gap-2.5"
                style={{
                  background: "linear-gradient(135deg, #ffffff 40%, #e5f2e3 100%)",
                  border: "1px solid #bcdbc9",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0f4d1e] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-900 leading-tight">Haven't registered yet?</h5>
                    <p className="text-[10px] text-gray-600 font-medium leading-tight">
                      Register now to get your pass.
                    </p>
                  </div>
                </div>
                <Link
                  href="/register-now"
                  className="border-2 border-[#0f4d1e] text-[#0f4d1e] bg-white hover:bg-[#0f4d1e] hover:text-white font-extrabold text-[11px] px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 shrink-0 whitespace-nowrap"
                >
                  Register Now
                  <ArrowRight size={12} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* ─── RIGHT HALF: Login Form ─── */}
          <div className="lg:w-1/2 bg-gradient-to-br from-white via-[#f4fcf7] to-white p-6 lg:p-8 xl:p-10 flex items-center justify-center relative overflow-hidden">

            {/* Subtle green glow blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-100/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-teal-50/40 rounded-full blur-[80px]" />
            </div>

            {/* Bottom-right bleaf with Entrance Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
              animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="absolute bottom-[-10px] right-[-10px] pointer-events-none z-0 w-[90px] lg:w-[120px]"
            >
              <img
                src={(bleafIcon?.src || bleafIcon) as string}
                alt="Bottom Right decoration"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Form container with Slide-in Entrance */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[380px] relative z-10"
            >
              <LoginForm />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
