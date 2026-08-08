"use client";
import React from "react";
import { Ticket, Calendar, CreditCard, CheckCircle2, Clock } from "lucide-react";

interface PassInformationCardProps {
  delegate: any;
}

export const DAY_INFO: Record<number, { title: string; date: string; tag: string }> = {
  1: { title: "Day 1", date: "21 August 2026 (Friday)", tag: "Integrated AYUSH & Pharma" },
  2: { title: "Day 2", date: "22 August 2026 (Saturday)", tag: "Wellness & Clinical Innovation" },
  3: { title: "Day 3", date: "23 August 2026 (Sunday)", tag: "Global Healthcare & Research" },
};

export const PassInformationCard: React.FC<PassInformationCardProps> = ({ delegate }) => {
  if (!delegate) return null;

  const rawDays = delegate.selectedDays || [];
  const selectedDaysList: number[] = Array.isArray(rawDays)
    ? rawDays.map((d: any) => Number(d))
    : typeof rawDays === "number"
    ? [rawDays]
    : [1, 2, 3];

  const formattedPrice = delegate.price
    ? (String(delegate.price).startsWith("₹") ? delegate.price : `₹${delegate.price}`)
    : "₹1,500";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md font-inter">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-extrabold text-[#143111] flex items-center gap-2">
            <Ticket className="text-[#36682e]" size={20} />
            Delegate Pass & Access Summary
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            Conference entry pass & schedule access details
          </p>
        </div>
        <span className="px-3 py-1 bg-[#eaf3ea] text-[#36682e] border border-[#c4e3c4] rounded-full text-xs font-bold flex items-center gap-1.5">
          <CheckCircle2 size={14} />
          Payment Confirmed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Pass Type */}
        <div className="bg-[#f7f8f2] p-4 rounded-xl border border-gray-200">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Registered Pass Option
          </span>
          <h3 className="text-base font-extrabold text-[#143111] flex items-center gap-2">
            <Ticket className="text-[#36682e]" size={18} />
            {delegate.planName || "Delegate Pass"}
          </h3>
          <p className="text-xs text-gray-600 mt-1">Full access to technical sessions & expo</p>
        </div>

        {/* Amount Paid */}
        <div className="bg-[#eaf3ea] p-4 rounded-xl border border-[#c4e3c4]">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Registration Fee Paid
          </span>
          <h3 className="text-xl font-extrabold text-[#143111]">
            {formattedPrice}
          </h3>
          <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <CreditCard size={13} className="text-[#36682e]" />
            Mode: {delegate.paymentMode || "Online Payment"}
          </p>
        </div>

        {/* Registration Date & Type */}
        <div className="bg-[#f7f8f2] p-4 rounded-xl border border-gray-200">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Registration ID & Date
          </span>
          <h3 className="text-sm font-extrabold text-[#36682e] font-mono">
            {delegate.delegateId || "AGY-2026-DELEGATE"}
          </h3>
          <p className="text-xs text-gray-600 mt-1 flex items-center gap-1 font-medium">
            <Clock size={13} className="text-[#36682e]" />
            {delegate.createdAt
              ? new Date(delegate.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "2026 Registration"}
          </p>
        </div>
      </div>

      {/* Selected Days Access Schedule */}
      <div>
        <h4 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Calendar size={15} className="text-[#36682e]" />
          Authorized Conference Days
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((dayNum) => {
            const isAuthorized = selectedDaysList.includes(dayNum) || selectedDaysList.length === 0;
            const info = DAY_INFO[dayNum];
            return (
              <div
                key={dayNum}
                className={`p-3.5 rounded-xl border transition-all ${
                  isAuthorized
                    ? "bg-[#f5f8f5] border-[#36682e]/40 text-gray-900 shadow-sm"
                    : "bg-gray-100 border-gray-200 text-gray-400 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm text-[#143111]">{info.title}</span>
                  {isAuthorized ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#36682e] text-white font-extrabold">
                      ACCESS GRANTED
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 text-gray-500 font-bold">
                      Not Selected
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-gray-800">{info.date}</p>
                <p className="text-[11px] text-gray-600 mt-1">{info.tag}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
