"use client";
import React from "react";
import { Download, Calendar, ShieldCheck, Sparkles, QrCode } from "lucide-react";
import leafsIcon from "@/assets/icons/leafs.png";

interface DashboardDigitalPassProps {
  delegate: any;
  onDownloadPass: () => void;
}

export const DashboardDigitalPass: React.FC<DashboardDigitalPassProps> = ({
  delegate,
  onDownloadPass,
}) => {
  const delegateName = delegate?.fullName || "Vansh Sharma";
  const delegateId = delegate?.delegateId || "AS2187";
  const passType = delegate?.passType || delegate?.registrationType || "Delegate Pass";

  const qrData = encodeURIComponent(
    `AROGYA-2026|${delegateId}|${delegateName}|${delegate?.email || ""}|${passType}`
  );
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${qrData}&color=032410`;

  return (
    <div
      className="bg-white rounded-2xl p-4 font-inter space-y-3 border border-transparent"
      style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
    >
      {/* ── Section Title ── */}
      <div>
        <h3 className="text-sm font-semibold text-emerald-700">My Pass</h3>
        <p className="text-[11px] text-black font-medium">
          Your digital entry pass for the event
        </p>
      </div>

      {/* ── Digital Badge Card ── */}
      <div
        id="printable-digital-pass"
        className="w-full flex flex-col rounded-xl overflow-hidden shadow-md border border-slate-200"
      >
        {/* Top Green Section */}
        <div className="bg-gradient-to-br from-[#032410] via-[#05381a] to-[#021d0d] p-5 text-white space-y-4 relative border-b border-emerald-700/50">
          {/* Card Top */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-400" />
              18TH AROGYA SANGOSTHI 2026
            </span>
            <span className="bg-[#0e4d25] border border-emerald-500/50 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
              Active
            </span>
          </div>

          {/* Badge Heading */}
          <h2 className="text-xl sm:text-2xl font-semibold tracking-wide text-white uppercase leading-tight">
            DELEGATE PASS
          </h2>

          {/* Info Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Left Details */}
            <div className="space-y-4">
              <div>
                <span className="block text-[11px] text-emerald-300 font-semibold tracking-wider mb-0.5">
                  Delegate Name
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
                  {delegateName}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-[10px] text-emerald-300 font-semibold mb-0.5">
                    Delegate ID
                  </span>
                  <strong className="block text-sm font-semibold text-white font-mono leading-snug">
                    {delegateId}
                  </strong>
                </div>
                <div className="border-l border-emerald-700/60 pl-6">
                  <span className="block text-[10px] text-emerald-300 font-semibold mb-0.5">
                    Pass Type
                  </span>
                  <strong className="block text-sm font-semibold text-white">
                    {passType}
                  </strong>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-1.5 rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <img
                src={qrUrl}
                alt="Delegate Pass QR Code"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom White Section (Footer) */}
        <div className="bg-slate-50/80 px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-2.5 grid grid-cols-3 gap-2 border-t border-slate-200 divide-x divide-slate-300">
          <div className="flex items-center justify-center gap-2 text-slate-700 px-2">
            <Calendar size={16} className="text-emerald-700 shrink-0" />
            <div className="text-left flex flex-col justify-center">
              <span className="block text-[8px] sm:text-[9px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">Valid From</span>
              <strong className="block text-[10px] sm:text-[11px] font-bold text-slate-800">21 Aug 2026</strong>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-700 px-2">
            <Calendar size={16} className="text-emerald-700 shrink-0" />
            <div className="text-left flex flex-col justify-center">
              <span className="block text-[8px] sm:text-[9px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">Valid Till</span>
              <strong className="block text-[10px] sm:text-[11px] font-bold text-slate-800">23 Aug 2026</strong>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-700 px-2">
            <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
            <div className="text-left flex flex-col justify-center">
              <span className="block text-[8px] sm:text-[9px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">Access</span>
              <strong className="block text-[10px] sm:text-[11px] font-bold text-emerald-700">Full Access</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── Download Button ── */}
      <button
        type="button"
        onClick={onDownloadPass}
        className="w-full py-2 rounded-lg border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50 hover:border-emerald-300 text-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <Download size={13} className="text-emerald-700" />
        <span>Download Digital Pass</span>
      </button>
    </div>
  );
};
