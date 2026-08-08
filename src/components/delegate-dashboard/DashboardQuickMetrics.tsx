"use client";
import React, { useState, useEffect } from "react";
import { Ticket, Calendar, MapPin, ShieldCheck, Clock } from "lucide-react";

interface DashboardQuickMetricsProps {
  delegate: any;
}

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

export const DashboardQuickMetrics: React.FC<DashboardQuickMetricsProps> = ({ delegate }) => {
  const passType = delegate?.passType || delegate?.registrationType || "Delegate Pass";
  const { days, hours, minutes, seconds } = useCountdown();

  const cardShadowStyle = {
    boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-inter">
      {/* ── Metric 1: PASS TYPE ── emerald/green light bg */}
      <div
        style={cardShadowStyle}
        className="bg-emerald-50 rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 transition-all border border-emerald-100/60"
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
          <Ticket size={17} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-semibold text-emerald-600/70 uppercase tracking-wider">
            PASS TYPE
          </span>
          <h4 className="text-[13px] font-semibold text-slate-800 truncate leading-tight mt-0.5">
            {passType}
          </h4>
          <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-200/80 px-1.5 rounded-full">
            Active
          </span>
        </div>
      </div>

      {/* ── Metric 2: EVENT DATES ── amber/yellow light bg */}
      <div
        style={cardShadowStyle}
        className="bg-amber-50 rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 transition-all border border-amber-100/60"
      >
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
          <Calendar size={17} />
        </div>
        <div className="flex-1 min-w-0">
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

      {/* ── Metric 3: VENUE ── blue light bg */}
      <div
        style={cardShadowStyle}
        className="bg-blue-50 rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 transition-all border border-blue-100/60"
      >
        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
          <MapPin size={17} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-semibold text-blue-600/70 uppercase tracking-wider">
            VENUE
          </span>
          <h4 className="text-[13px] font-semibold text-slate-800 leading-snug mt-0.5">
            Pragati Maidan, New Delhi
          </h4>
        </div>
      </div>

      {/* ── Metric 4: REGISTRATION STATUS ── purple light bg */}
      <div
        style={cardShadowStyle}
        className="bg-purple-50 rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 transition-all border border-purple-100/60"
      >
        <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0">
          <ShieldCheck size={17} />
        </div>
        <div className="flex-1 min-w-0">
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

      {/* ── Metric 5: DAYS TO EVENT ── white bg with live countdown */}
      <div
        style={cardShadowStyle}
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

        {/* Countdown blocks */}
        <div className="flex items-center gap-1 justify-start">
          {/* Days */}
          <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
            <span className="text-[17px] font-extrabold text-rose-600 leading-none">{pad(days)}</span>
            <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Day</span>
          </div>
          <span className="text-rose-400 font-bold text-sm leading-none mb-2">:</span>
          {/* Hours */}
          <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
            <span className="text-[17px] font-extrabold text-amber-600 leading-none">{pad(hours)}</span>
            <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Hr</span>
          </div>
          <span className="text-rose-400 font-bold text-sm leading-none mb-2">:</span>
          {/* Minutes */}
          <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
            <span className="text-[17px] font-extrabold text-blue-600 leading-none">{pad(minutes)}</span>
            <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Min</span>
          </div>
          <span className="text-rose-400 font-bold text-sm leading-none mb-2">:</span>
          {/* Seconds */}
          <div className="flex flex-col items-center px-1.5 py-1 min-w-[34px]">
            <span className="text-[17px] font-extrabold text-emerald-600 leading-none">{pad(seconds)}</span>
            <span className="text-[7.5px] font-semibold text-slate-400 uppercase mt-0.5">Sec</span>
          </div>
        </div>
      </div>
    </div>
  );
};
