"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  Menu,
  LogOut,
  HelpCircle,
  BellRing,
  Sun,
  Moon,
  Sunrise,
  Search,
  ChevronDown,
  User,
  ShieldCheck,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
interface DashboardTopBarProps {
  delegate: any;
  onLogout: () => void;
  onToggleSidebar?: () => void;
  onOpenModal?: (tab: string) => void;
}

export const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  delegate,
  onLogout,
  onToggleSidebar,
  onOpenModal,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [greeting, setGreeting] = useState<{
    text: string;
    icon: React.ReactNode;
    color: string;
  }>({
    text: "Good Afternoon",
    icon: <Sun size={20} className="text-orange-500" />,
    color: "from-blue-500 to-cyan-500",
  });

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting({
          text: "Good Morning",
          icon: <Sunrise size={20} className="text-amber-500" />,
          color: "from-amber-500 to-orange-500",
        });
      } else if (hour >= 12 && hour < 17) {
        setGreeting({
          text: "Good Afternoon",
          icon: <Sun size={20} className="text-orange-500" />,
          color: "from-blue-500 to-cyan-500",
        });
      } else {
        setGreeting({
          text: "Good Evening",
          icon: <Moon size={20} className="text-indigo-400" />,
          color: "from-indigo-500 to-purple-500",
        });
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  const getInitials = (name?: string) => {
    if (!name || name.trim() === "") return "VC";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getFirstName = (name?: string) => {
    if (!name || name.trim() === "") return "Vansh";
    const first = name.trim().split(/\s+/)[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  };

  const handleLogoutClick = () => {
    onLogout();
  };

  const delegateName = delegate?.fullName || delegate?.name || "Vansh Chaudhary";
  const delegateFirstName = getFirstName(delegateName);
  const delegateInitials = getInitials(delegateName);
  const delegateRole = delegate?.delegateType || "VERIFIED DELEGATE";

  return (
    <header className="w-full sticky top-0 z-40 font-inter">
      {/* ── Main Topbar matching Admin Navbar exactly ── */}
      <div className="h-14 bg-white/95 backdrop-blur-lg border-b border-slate-200/80 shadow-xs px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT – Mobile Toggle, Greeting Card & Search */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Sidebar Toggle Button (Desktop & Mobile) */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-all cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>

          {/* 🌟 PREMIUM GREETING CARD (Admin layout match) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center gap-2.5 bg-slate-50/80 px-3 py-1.5 rounded-xl border border-slate-200/80 group transition-all duration-300 hover:bg-white hover:border-emerald-600/30 hover:shadow-xs"
          >
            {/* Icon Circle */}
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white border border-slate-100 shadow-xs transition-all duration-300 group-hover:scale-110 shrink-0">
              {greeting.icon}
            </div>

            {/* Text Content */}
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-[11.5px] font-medium text-black tracking-tight">
                  {greeting.text},
                </span>
                <span className="text-[11.5px] font-bold text-[#23471d] tracking-tight">
                  {delegateFirstName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="text-[8.5px] font-bold text-red-600 uppercase tracking-widest">
                  {delegateRole}
                </span>
              </div>
            </div>
          </motion.div>

          {/* SEARCH BOX (Admin layout match) */}
          <div className="hidden lg:flex items-center relative ml-2">
            <Search className="absolute left-3 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-3.5 py-1.5 w-52 lg:w-56 bg-white border-2 border-slate-300 shadow-xs rounded-full text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#23471d] focus:ring-4 focus:ring-[#23471d]/10 transition-all focus:w-64"
            />
          </div>
        </div>

        {/* RIGHT – Action Icons & Profile Pill (Admin layout match) */}
        <div className="flex items-center gap-1.5 sm:gap-3 relative">
          {/* Help & Support */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setActiveTitle(activeTitle === "help" ? null : "help");
                onOpenModal?.("support");
              }}
              className="p-1.5 rounded-lg hover:bg-[#23471d]/10 transition-all duration-200 hover:scale-105 cursor-pointer text-[#23471d]"
              aria-label="Help & Support"
            >
              <HelpCircle size={17} />
            </button>

            {activeTitle === "help" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="whitespace-nowrap absolute top-10 right-0 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50"
              >
                Help &amp; Support
                <div className="absolute -top-1 right-2 w-2 h-2 bg-slate-900 rotate-45" />
              </motion.div>
            )}
          </div>

          {/* Reminder / Schedule List */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setActiveTitle(activeTitle === "reminder" ? null : "reminder");
                onOpenModal?.("schedule");
              }}
              className="p-1.5 rounded-lg hover:bg-[#23471d]/10 transition-all duration-200 hover:scale-105 cursor-pointer text-[#23471d]"
              aria-label="Reminder List"
            >
              <BellRing size={17} />
            </button>

            {activeTitle === "reminder" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="whitespace-nowrap absolute top-10 right-0 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-50"
              >
                Event Schedule &amp; Reminders
                <div className="absolute -top-1 right-2 w-2 h-2 bg-slate-900 rotate-45" />
              </motion.div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveTitle(activeTitle === "notify" ? null : "notify")
              }
              className="relative p-1.5 rounded-lg hover:bg-[#23471d]/10 transition-all duration-200 hover:scale-105 cursor-pointer text-[#23471d]"
              aria-label="Notifications"
            >
              <Bell size={17} />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[9px] min-w-[18px] min-h-[18px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-md leading-none"
              >
                3
              </motion.span>
            </button>

            {/* Notification Dropdown Panel */}
            {activeTitle === "notify" && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="whitespace-nowrap absolute top-10 right-0 w-72 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-50"
              >
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Notifications</span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto text-xs whitespace-normal">
                  <div
                    onClick={() => { setActiveTitle(null); onOpenModal?.("profile"); }}
                    className="p-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <p className="font-semibold text-slate-800">Registration Verified ✅</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Your pass is active for Pragati Maidan conference.</p>
                  </div>
                  <div
                    onClick={() => { setActiveTitle(null); onOpenModal?.("badge"); }}
                    className="p-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <p className="font-semibold text-slate-800">Badge Ready to Download 🪪</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Digital pass and QR Code ready in your portal.</p>
                  </div>
                  <div
                    onClick={() => { setActiveTitle(null); onOpenModal?.("schedule"); }}
                    className="p-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <p className="font-semibold text-slate-800">Event Schedule Released 📅</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">21-23 August session timetable has been updated.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Profile Button Pill with Avatar & Status Dot */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setActiveTitle(null);
              }}
              className="relative flex items-center gap-2 p-1 sm:pr-3.5 bg-white border-2 border-slate-300 shadow-xs rounded-full hover:bg-slate-50 transition-all duration-200 cursor-pointer"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-xs bg-white aspect-square overflow-hidden">
                  <div className="w-full h-full scale-[1.75] flex items-center justify-center">
                    <DotLottieReact
                      src="https://lottie.host/5e04817f-911f-4ca1-a53a-feef6a26ff2b/fKxwVsHxr2.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>

                {/* Online Status Dot */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10 flex items-center justify-center">
                  <div className="absolute inset-0 w-full h-full bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
              </div>

              {/* User Info */}
              <div className="hidden sm:flex items-center gap-1.5 ml-0.5">
                <span className="text-xs font-bold text-blue-600 truncate max-w-[110px]">
                  {delegateFirstName}
                </span>
                <ChevronDown
                  size={13}
                  className={`text-slate-500 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* PROFILE DROPDOWN */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-nowrap absolute right-0 top-12 w-60 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-50 font-inter"
                >
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
                    <p className="text-[11px] text-slate-500 font-medium">Delegates Portal</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{delegateName}</p>
                    <p className="text-[10px] font-mono text-emerald-700 font-bold mt-0.5">
                      ID: {delegate?.delegateId || "AGS-2026"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="py-1 text-xs text-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenModal?.("profile");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <User size={15} className="text-blue-600" />
                      <span>Personal Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenModal?.("badge");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <ShieldCheck size={15} className="text-emerald-700" />
                      <span>Official ID Badge</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenModal?.("download");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Download size={15} className="text-emerald-700" />
                      <span>Download Pass</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogoutClick();
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-semibold transition-colors cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>Logout Portal</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
