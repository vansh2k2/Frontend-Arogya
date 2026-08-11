"use client";
import React, { useState, useEffect } from "react";
import { Download, Ticket, Calendar, MapPin, CheckCircle, ChevronRight, User, Mail, Phone, Building, FileText, IndianRupee, ShieldCheck, Clock } from "lucide-react";
import { DashboardDigitalPass } from "../DashboardDigitalPass";

const EVENT_DATE = new Date("2026-08-21T00:00:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date().getTime();
      const diff = EVENT_DATE.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

interface MyPassDetailsContentProps {
  delegate: any;
  onDownloadPass?: () => void;
}

export const MyPassDetailsContent: React.FC<MyPassDetailsContentProps> = ({
  delegate,
  onDownloadPass
}) => {
  const { days, hours, minutes, seconds } = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="space-y-6 font-inter w-full">
      {/* ── Header Row ── */}
      <div className="mb-6 bg-transparent p-0 shadow-none">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold font-poppins text-[#0A2947] uppercase tracking-tight mb-1">
                MY PASS DETAILS
              </h1>
              <div className="h-[2px] w-full bg-[#28396C] mb-1"></div>
            </div>
            <p className="text-gray-500 mt-2 font-medium italic text-xs">
              View your pass information, validity and download your digital pass.
            </p>
          </div>
        </div>
      </div>

      {/* ── Top Metrics Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Pass Type */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-emerald-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-emerald-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <Ticket size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-[10px] font-semibold text-emerald-600/70 uppercase tracking-wider">
              PASS TYPE
            </span>
            <h4 className="text-[13px] font-semibold text-slate-800 truncate leading-tight mt-0.5">
              Delegate Pass
            </h4>
            <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-200/80 px-1.5 rounded-full">
              Active
            </span>
          </div>
        </div>

        {/* Event Dates */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-amber-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-amber-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Calendar size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-[10px] font-semibold text-amber-600/70 uppercase tracking-wider">
              EVENT DATES
            </span>
            <h4 className="text-[13px] font-semibold text-slate-800 truncate leading-tight mt-0.5">
              21 - 23 Aug 2026
            </h4>
            <p className="text-[10px] text-blue-600 font-semibold mt-0.5">
              Friday - Sunday
            </p>
          </div>
        </div>

        {/* Venue */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-blue-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-blue-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
            <MapPin size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-[10px] font-semibold text-blue-600/70 uppercase tracking-wider">
              VENUE
            </span>
            <h4 className="text-[13px] font-semibold text-slate-800 leading-snug mt-0.5">
              Pragati Maidan, New Delhi
            </h4>
          </div>
        </div>

        {/* Registration Status */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-purple-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-purple-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0">
            <ShieldCheck size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-[10px] font-semibold text-purple-600/70 uppercase tracking-wider">
              REG. STATUS
            </span>
            <h4 className="text-[13px] font-semibold text-slate-800 truncate leading-tight mt-0.5">
              Confirmed
            </h4>
            <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 rounded-full">
              Verified
            </span>
          </div>
        </div>

        {/* DAYS TO EVENT */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-white rounded-xl p-3 sm:p-3.5 transition-all border border-slate-200/60 col-span-2 sm:col-span-1"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Clock size={12} />
            </div>
            <span className="text-[9px] font-semibold text-rose-600/80 uppercase tracking-wider">
              DAYS TO EVENT
            </span>
          </div>

          <div className="flex items-center gap-1 justify-start">
            <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
              <span className="text-[17px] font-extrabold text-rose-600 leading-none">{pad(days)}</span>
              <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Day</span>
            </div>
            <span className="text-rose-400 font-bold text-sm leading-none mb-2">:</span>
            <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
              <span className="text-[17px] font-extrabold text-amber-600 leading-none">{pad(hours)}</span>
              <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Hr</span>
            </div>
            <span className="text-rose-400 font-bold text-sm leading-none mb-2">:</span>
            <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
              <span className="text-[17px] font-extrabold text-blue-600 leading-none">{pad(minutes)}</span>
              <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Min</span>
            </div>
            <span className="text-rose-400 font-bold text-sm leading-none mb-2">:</span>
            <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
              <span className="text-[17px] font-extrabold text-emerald-600 leading-none">{pad(seconds)}</span>
              <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Sec</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Two Column Details ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Digital Pass Card */}
        <div className="lg:col-span-7 xl:col-span-7 h-full">
          {/* We reuse the DashboardDigitalPass directly as requested ("card and pass aap yr same mere dashbord wale hi dena") */}
          <DashboardDigitalPass 
            delegate={delegate}
            onDownloadPass={onDownloadPass}
          />
        </div>

        {/* Right Column: Pass Information Table */}
        <div className="lg:col-span-5 xl:col-span-5 bg-white rounded-2xl p-5 border border-transparent h-full flex flex-col" style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}>
          <div className="mb-4">
            <h3 className="text-[15px] font-semibold text-emerald-800 uppercase tracking-wide">PASS INFORMATION</h3>
            <p className="text-[11px] text-black font-medium mt-0.5">Your registration and pass details</p>
          </div>

          <div className="flex-1 divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden text-xs">
            {/* Row: Full Name */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <User size={14} className="text-emerald-600" />
                Full Name
              </div>
              <div className="w-[55%] font-bold text-blue-700">{delegate?.fullName || "N/A"}</div>
            </div>

            {/* Row: Email Address */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <Mail size={14} className="text-emerald-600" />
                Email Address
              </div>
              <div className="w-[55%] font-bold text-slate-800 break-words">{delegate?.email || "N/A"}</div>
            </div>

            {/* Row: Mobile Number */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <Phone size={14} className="text-emerald-600" />
                Mobile Number
              </div>
              <div className="w-[55%] font-bold text-slate-800">{delegate?.mobile || "N/A"}</div>
            </div>

            {/* Row: Organization */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <Building size={14} className="text-emerald-600" />
                Organization
              </div>
              <div className="w-[55%] font-bold text-slate-800">{delegate?.organization || "Arogya Sangosthi"}</div>
            </div>

            {/* Row: Pass Type */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <Ticket size={14} className="text-emerald-600" />
                Pass Type
              </div>
              <div className="w-[55%] font-bold text-slate-800">{delegate?.ticketType || "Delegate Pass"}</div>
            </div>

            {/* Row: Registration Date */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <Calendar size={14} className="text-emerald-600" />
                Registration Date
              </div>
              <div className="w-[55%] font-bold text-slate-800">{delegate?.createdAt ? new Date(delegate.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "08 Aug 2026, 10:30 AM"}</div>
            </div>

            {/* Row: Payment Status */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                Payment Status
              </div>
              <div className="w-[55%] font-bold">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700">
                  {delegate?.paymentStatus?.toUpperCase() || "PAID"}
                </span>
              </div>
            </div>

            {/* Row: Transaction ID */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <FileText size={14} className="text-emerald-600" />
                Transaction ID
              </div>
              <div className="w-[55%] font-bold text-[#4B1426]">{delegate?.transactionId || "N/A"}</div>
            </div>

            {/* Row: Amount Paid */}
            <div className="flex py-3 px-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-[45%] text-slate-500 font-semibold flex items-center gap-2">
                <IndianRupee size={14} className="text-emerald-600" />
                Amount Paid
              </div>
              <div className="w-[55%] font-bold text-emerald-700">₹{delegate?.amount || "1,500"}</div>
            </div>
          </div>

          {/* Important Note Warning Box */}
          <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/50 flex gap-3">
            <div className="text-amber-500 shrink-0 mt-0.5">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h5 className="text-[11px] font-bold text-slate-800 mb-0.5">Important Note</h5>
              <p className="text-[10px] text-slate-600 font-semibold">This pass is non-transferable. Please carry a valid ID proof along with this pass.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
