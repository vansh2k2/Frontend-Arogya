"use client";
import React, { useRef } from "react";
import { Printer, Award, Calendar, MapPin, ShieldCheck } from "lucide-react";

interface DelegateBadgeCardProps {
  delegate: any;
}

export const DelegateBadgeCard: React.FC<DelegateBadgeCardProps> = ({ delegate }) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  if (!delegate) return null;

  const delegateId = delegate.delegateId || "AGY-2026-DELEGATE";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    `https://arogyasangosththi.com/verify-delegate?id=${delegateId}`
  )}&color=143111&bgcolor=ffffff`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md font-inter">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-extrabold text-[#143111] flex items-center gap-2">
            <Award className="text-amber-500" size={20} />
            Official Conference Badge ID Card
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            Present this scannable pass badge at entry gates during August 21–23, 2026
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-gradient-to-r from-[#143111] via-[#36682e] to-[#0f5240] hover:from-[#1b4317] hover:to-[#136650] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <Printer size={16} />
          Print / Download Badge
        </button>
      </div>

      {/* PRINTABLE BADGE CONTAINER */}
      <div className="flex justify-center my-2">
        <div
          ref={badgeRef}
          id="printable-delegate-badge"
          className="w-full max-w-sm rounded-2xl overflow-hidden border-2 border-[#36682e] shadow-xl bg-white text-gray-900 font-sans relative print:shadow-none print:w-[350px]"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#143111] via-[#36682e] to-[#0f5240] p-4 text-center border-b-2 border-amber-400 relative overflow-hidden text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
              NAMO GANGE WELLNESS PRESENTS
            </p>
            <h3 className="text-lg font-black text-white tracking-tight uppercase mt-0.5 drop-shadow">
              18TH AROGYA SANGOSTHTHI
            </h3>
            <p className="text-[10px] text-emerald-100 font-bold mt-0.5 flex items-center justify-center gap-2">
              <span><Calendar size={11} className="inline mr-0.5 text-amber-300" /> 21–23 AUG 2026</span>
              <span>•</span>
              <span><MapPin size={11} className="inline mr-0.5 text-amber-300" /> PRAGATI MAIDAN, NEW DELHI</span>
            </p>
          </div>

          {/* Badge Body */}
          <div className="p-5 text-center flex flex-col items-center bg-[#fdfdfd]">
            {/* QR Code Container */}
            <div className="p-2 bg-white rounded-xl shadow border border-gray-300 mb-4 inline-block">
              <img
                src={qrUrl}
                alt="Delegate QR Code"
                className="w-28 h-28 object-contain rounded"
              />
            </div>

            {/* Delegate Name & Details */}
            <span className="px-3 py-1 bg-[#eaf3ea] text-[#143111] border border-[#c4e3c4] rounded-full font-mono text-xs font-black tracking-wider mb-2">
              {delegateId}
            </span>

            <h4 className="text-xl font-extrabold text-gray-900 tracking-tight">
              {delegate?.title ? `${delegate.title} ` : ""}
              {delegate?.fullName || "Delegate User"}
            </h4>

            {delegate?.designation && (
              <p className="text-xs font-bold text-[#36682e] mt-1">
                {delegate.designation}
              </p>
            )}

            {delegate?.organization && (
              <p className="text-xs text-gray-600 mt-0.5 font-medium">
                {delegate.organization}
              </p>
            )}

            <div className="mt-4 pt-3 border-t border-gray-200 w-full flex items-center justify-around text-center">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Category</span>
                <span className="text-xs font-extrabold text-[#143111] capitalize">{delegate?.category || "Delegate"}</span>
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">Status</span>
                <span className="text-xs font-extrabold text-emerald-700 flex items-center justify-center gap-1">
                  <ShieldCheck size={13} />
                  CONFIRMED
                </span>
              </div>
            </div>
          </div>

          {/* Footer Ribbon */}
          <div className="bg-gradient-to-r from-[#143111] via-[#36682e] to-[#0f5240] py-2.5 px-4 text-center text-amber-300 font-black text-xs uppercase tracking-widest">
            OFFICIAL DELEGATE ENTRY PASS
          </div>
        </div>
      </div>
    </div>
  );
};
