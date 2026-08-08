"use client";
import React from "react";
import { User, BadgeCheck, LogOut, Printer, Building2, MapPin, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProfileHeaderProps {
  delegate: any;
  onPrintBadge?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ delegate, onPrintBadge }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("arogya_delegate_user");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "DG";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#143111] via-[#36682e] to-[#0f5240] text-white p-6 sm:p-8 shadow-xl border border-[#2b5922]">
      {/* Decorative Shimmer */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Avatar & Name/Details */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Avatar Circle */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#ffd700] p-1 shadow-lg">
              <div className="w-full h-full rounded-[12px] bg-[#143111] flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl border border-amber-300/40">
                {getInitials(delegate?.fullName)}
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-[#ffd700] text-slate-950 p-1 rounded-full border-2 border-[#143111] shadow-md">
              <BadgeCheck size={16} />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-md bg-amber-400 text-slate-950 font-mono text-xs font-black tracking-wider shadow-sm">
                ID: {delegate?.delegateId || "AGY-2026-DELEGATE"}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/15 text-emerald-100 text-xs font-semibold capitalize border border-white/20">
                {delegate?.category || "Delegate Participant"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-300" />
                Verified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {delegate?.title ? `${delegate.title} ` : ""}
              {delegate?.fullName || "Delegate User"}
            </h1>

            <p className="text-emerald-100 text-xs sm:text-sm mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
              {delegate?.designation && (
                <span className="flex items-center gap-1.5 font-medium">
                  <User size={14} className="text-amber-300" />
                  {delegate.designation}
                </span>
              )}
              {delegate?.organization && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 size={14} className="text-emerald-300" />
                  {delegate.organization}
                </span>
              )}
              {delegate?.city && (
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin size={14} className="text-amber-300" />
                  {delegate.city}, {delegate.state || "India"}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          {onPrintBadge && (
            <button
              type="button"
              onClick={onPrintBadge}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#ffd700] hover:bg-[#e6c200] text-slate-950 font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer uppercase tracking-wider"
            >
              <Printer size={16} />
              Print Badge
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
