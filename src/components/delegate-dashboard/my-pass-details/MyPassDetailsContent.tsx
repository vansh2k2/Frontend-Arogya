"use client";
import React from "react";
import {
  Download,
  Printer,
  User,
  Calendar,
  MapPin,
  Ticket,
  ShieldCheck,
  Building2,
  QrCode,
  Clock,
  FileCheck,
} from "lucide-react";
import lfsIcon from "@/assets/icons/lfs.png";
import rr12Icon from "@/assets/icons/rr12.png";

interface MyPassDetailsContentProps {
  delegate: any;
  onDownloadPass?: () => void;
}

export const MyPassDetailsContent: React.FC<MyPassDetailsContentProps> = ({
  delegate,
  onDownloadPass,
}) => {
  const fullName = delegate?.fullName || "Vansh Chaudhary";
  const delegateId = delegate?.delegateId || "AGS18/SR/DEL/D1/05/26/015";
  const passType = delegate?.ticketType || delegate?.passType || "Delegate Pass";

  const qrData = encodeURIComponent(
    `AROGYA-2026|${delegateId}|${fullName}|${delegate?.email || ""}|${passType}`
  );
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Delegate_Pass_QR_${delegateId.replace(/[\/\\:]/g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(qrUrl, "_blank");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-pass-page space-y-4 font-inter w-full antialiased pb-10">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body * {
            visibility: hidden !important;
          }
          .printable-pass-page,
          .printable-pass-page * {
            visibility: visible !important;
          }
          .printable-pass-page {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* ── Page Header (Exact match to PAYMENT HISTORY) ── */}
      <div className="mb-3 bg-transparent p-0 shadow-none">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold font-poppins text-[#0A2947] uppercase tracking-tight mb-1">
                MY PASS DETAILS
              </h1>
              <div className="h-[2px] w-full bg-[#28396C] mb-1"></div>
            </div>
            <p className="text-gray-500 mt-1 font-medium italic text-xs">
              View your digital entry pass and related information for the event.
            </p>
          </div>

          <img
            src={typeof lfsIcon === "string" ? lfsIcon : lfsIcon.src}
            alt="Leaf Decorative"
            className="w-28 sm:w-40 md:w-44 h-auto object-contain pointer-events-none shrink-0 -mt-6 sm:-mt-8 relative z-10"
          />
        </div>
      </div>

      {/* ── Top Metrics Grid (4 Cards: Delegate Name, Event Dates, Venue, Pass Type) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Card 1: Delegate Name */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-emerald-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-emerald-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <User size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-[10px] font-semibold text-emerald-600/70 uppercase tracking-wider">
              DELEGATE NAME
            </span>
            <h4 className="text-[13px] font-semibold text-slate-800 truncate leading-tight mt-0.5">
              {fullName}
            </h4>
            <span className="block text-[8.5px] font-semibold text-[#4B1426] mt-0.5 leading-tight">
              Delegate ID: {delegateId}
            </span>
          </div>
        </div>

        {/* Card 2: Event Dates */}
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

        {/* Card 3: Venue */}
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

        {/* Card 4: Pass Type */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-purple-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-purple-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0">
            <Ticket size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-[10px] font-semibold text-purple-600/70 uppercase tracking-wider">
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

      </div>

      {/* ── Main Middle Section: 2 Columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Digital Pass Ribbon Frame & Details Table */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-transparent p-5 sm:p-6 flex flex-col justify-between"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6">
            
            {/* Delegate Pass Badge Image (rr12.png) */}
            <img
              src={typeof rr12Icon === "string" ? rr12Icon : rr12Icon.src}
              alt="18th Arogya Sangosthi 2026 Delegate Pass"
              className="w-full sm:w-48 h-auto object-contain shrink-0 -mt-3 sm:-mt-5 self-start"
            />

            {/* Pass Details Table (Right Side of Left Card) */}
            <div className="flex-1 w-full space-y-2.5 font-medium text-xs text-slate-700 py-1">
              
              {/* Delegate Name */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="flex items-center gap-2 text-slate-500 font-medium">
                  <User size={15} className="text-[#0f4d1e]" />
                  Delegate Name
                </span>
                <span className="text-slate-300 font-light">:</span>
                <span className="font-bold text-slate-900 text-sm text-right">{fullName}</span>
              </div>

              {/* Delegate ID */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="flex items-center gap-2 text-slate-500 font-medium">
                  <QrCode size={15} className="text-[#0f4d1e]" />
                  Delegate ID
                </span>
                <span className="text-slate-300 font-light">:</span>
                <span className="font-bold text-[#4B1426] text-right">{delegateId}</span>
              </div>

              {/* Pass Type */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="flex items-center gap-2 text-slate-500 font-medium">
                  <Ticket size={15} className="text-[#0f4d1e]" />
                  Pass Type
                </span>
                <span className="text-slate-300 font-light">:</span>
                <span className="font-bold text-slate-900 text-right">{passType}</span>
              </div>

              {/* Valid From */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="flex items-center gap-2 text-slate-500 font-medium">
                  <Clock size={15} className="text-[#0f4d1e]" />
                  Valid From
                </span>
                <span className="text-slate-300 font-light">:</span>
                <span className="font-bold text-slate-900 text-right">21 Aug 2026 (Friday)</span>
              </div>

              {/* Valid Till */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar size={15} className="text-[#0f4d1e]" />
                  Valid Till
                </span>
                <span className="text-slate-300 font-light">:</span>
                <span className="font-bold text-slate-900 text-right">23 Aug 2026 (Sunday)</span>
              </div>

              {/* Access Type */}
              <div className="flex items-center justify-between py-2 border-b border-slate-200">
                <span className="flex items-center gap-2 text-slate-500 font-medium">
                  <ShieldCheck size={15} className="text-[#0f4d1e]" />
                  Access Type
                </span>
                <span className="text-slate-300 font-light">:</span>
                <span className="font-bold text-[#0f4d1e] text-right">Full Access</span>
              </div>
            </div>

          </div>

          {/* Bottom Disclaimer Banner */}
          <div className="bg-[#eff6ff] border border-[#dbeafe] rounded-xl p-2.5 flex items-center gap-2.5 text-blue-900 text-[11px] font-medium mt-2">
            <div className="w-4.5 h-4.5 rounded-full border border-blue-700 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0">
              i
            </div>
            <span>
              This is your digital entry pass. Please carry a valid ID proof along with this pass at the event.
            </span>
          </div>
        </div>

        {/* Right Column: Entry QR Code & Action Buttons */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-transparent p-5 sm:p-6 text-center flex flex-col justify-between space-y-4"
        >
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">Your Entry QR Code</h3>
            <p className="text-xs text-slate-500">Show this QR code at the entry gate.</p>
          </div>

          <div className="my-auto flex flex-col items-center justify-center py-2">
            <div className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
              <img
                src={qrUrl}
                alt="Entry QR Code"
                className="w-40 h-40 sm:w-44 sm:h-44 object-contain"
              />
            </div>

            <p className="text-[11px] text-slate-900 font-medium mt-3">
              Keep this pass handy for a smooth check-in.
            </p>
          </div>

          {/* Action Buttons (Download Pass & Print Pass) */}
          <div className="flex items-center gap-3 pt-2 print:hidden">
            <button
              type="button"
              onClick={handleDownloadQR}
              className="flex-1 border border-[#0f4d1e] hover:bg-[#eaf5ee] text-[#0f4d1e] rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download Pass</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 bg-[#0f4d1e] hover:bg-[#093514] text-white rounded-xl py-2.5 px-3 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <Printer size={14} />
              <span>Print Pass</span>
            </button>
          </div>
        </div>

      </div>

      {/* ── Bottom Section: SUMMARY Bar ── */}
      <div className="pt-2">
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="rounded-xl border border-slate-200 overflow-hidden bg-white"
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 divide-x divide-slate-200 bg-white p-3 text-xs text-slate-800">
            
            {/* Event */}
            <div className="flex items-center gap-2.5 px-2 py-1">
              <div className="w-8 h-8 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                <Building2 size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-semibold text-slate-400 uppercase block">Event</span>
                <span className="font-bold text-slate-900 text-[11px] block whitespace-nowrap">Arogya Sangosthi 2026</span>
              </div>
            </div>

            {/* Pass Type */}
            <div className="flex items-center gap-2.5 pl-3 sm:pl-4 pr-1 py-1">
              <div className="w-8 h-8 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                <Ticket size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-semibold text-slate-400 uppercase block">Pass Type</span>
                <span className="font-bold text-slate-900 text-[11px] truncate block">{passType}</span>
              </div>
            </div>

            {/* Valid From */}
            <div className="flex items-center gap-2.5 pl-3 sm:pl-4 pr-1 py-1">
              <div className="w-8 h-8 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                <Calendar size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-semibold text-slate-400 uppercase block">Valid From</span>
                <span className="font-bold text-slate-900 text-[11px] truncate block">21 Aug 2026</span>
                <span className="text-[9.5px] text-slate-500 font-medium">(Friday)</span>
              </div>
            </div>

            {/* Valid Till */}
            <div className="flex items-center gap-2.5 pl-3 sm:pl-4 pr-1 py-1">
              <div className="w-8 h-8 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                <Calendar size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-semibold text-slate-400 uppercase block">Valid Till</span>
                <span className="font-bold text-slate-900 text-[11px] truncate block">23 Aug 2026</span>
                <span className="text-[9.5px] text-slate-500 font-medium">(Sunday)</span>
              </div>
            </div>

            {/* Access Type */}
            <div className="flex items-center gap-2.5 pl-3 sm:pl-4 pr-1 py-1">
              <div className="w-8 h-8 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                <ShieldCheck size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] font-semibold text-slate-400 uppercase block">Access Type</span>
                <span className="font-bold text-[#0f4d1e] text-[11px] truncate block">Full Access</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
