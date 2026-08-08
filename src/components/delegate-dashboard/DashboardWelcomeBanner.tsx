"use client";
import React from "react";
import { Ticket, Calendar } from "lucide-react";
import deleIcon from "@/assets/icons/dele.png";

interface DashboardWelcomeBannerProps {
  delegate: any;
}

export const DashboardWelcomeBanner: React.FC<DashboardWelcomeBannerProps> = ({ delegate }) => {
  const formattedDate = delegate?.createdAt
    ? new Date(delegate.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "08 Aug 2026";

  const delegateName = delegate?.fullName || "Vansh Chaudhary";
  const delegateId = delegate?.delegateId || "AS2187";

  return (
    <div
      className="w-full border border-[#cde8d6] rounded-xl px-5 py-3.5 relative font-inter shadow-sm flex items-center gap-4 sm:gap-6"
      style={{
        background: "linear-gradient(135deg, #f2faf4 0%, #e7f5eb 100%)",
      }}
    >
      {/* Ticket Icon */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-emerald-200/80 flex items-center justify-center text-emerald-700 shadow-sm shrink-0 z-10">
        <Ticket size={20} className="text-emerald-700" />
      </div>

      {/* Text & Meta Information */}
      <div className="space-y-1 flex-1 z-10 pr-[100px] sm:pr-[140px]">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 tracking-tight leading-tight">
          Welcome Back, <span className="text-[#0e4425] font-bold">{delegateName}</span>!
        </h2>
        <p className="text-[11px] sm:text-xs text-blue-600 font-medium">
          Here&apos;s your registration overview and event information.
        </p>

        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-emerald-200 text-[11px] font-semibold text-emerald-900 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Delegate ID: {delegateId}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs">
            <Calendar size={11} className="text-slate-500" />
            <span>Registration Date: {formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Delegate illustration - fully visible, right aligned */}
      <img
        src={(deleIcon?.src || deleIcon) as string}
        alt="Delegate"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-[100px] sm:h-[120px] w-auto object-contain select-none pointer-events-none z-0"
      />
    </div>
  );
};
