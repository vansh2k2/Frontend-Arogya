"use client";
import React, { useRef } from "react";
import {
  X,
  CheckCircle,
  Calendar,
  MapPin,
  CreditCard,
  Printer,
  Download,
  Share2,
  Copy,
  Check,
  Info,
  ShieldCheck,
  FileText,
  Building,
} from "lucide-react";
import Swal from "sweetalert2";

interface PaymentReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  delegate: any;
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  isOpen,
  onClose,
  delegate,
}) => {
  const [copied, setCopied] = React.useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const txnId = delegate?.transactionId || "pay_TM1htIbDbaTEGj";
  const amountPaid = delegate?.amount ? `₹${delegate.amount}` : "₹1,500";
  const delegateId = delegate?.delegateId || "AGS18/SR/DEL/D1/05/26/015";
  const fullName = delegate?.fullName || "Vansh Chaudhary";
  const paymentMethod = delegate?.paymentMethod || "UPI (Google Pay)";

  const regDateFormatted = delegate?.createdAt
    ? new Date(delegate.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "05 Aug 2026";

  const regTimeFormatted = delegate?.createdAt
    ? new Date(delegate.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "02:13 pm";

  const getInitials = (name: string) => {
    if (!name) return "VC";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleCopyTxn = () => {
    navigator.clipboard.writeText(txnId);
    setCopied(true);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Transaction ID Copied!",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Arogya Sangosthi 2026 Payment Receipt",
        text: `Payment Receipt for ${fullName} - ${delegateId}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Receipt Link Copied!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs font-inter overflow-y-auto animate-in fade-in">
      <div className="bg-[#111827] text-slate-100 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-700/60 overflow-hidden my-auto relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-8 h-8 rounded-full bg-black/40 text-slate-300 hover:text-white hover:bg-black/70 flex items-center justify-center transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Printable Receipt Paper Container */}
        <div ref={receiptRef} className="bg-white text-slate-900 p-6 sm:p-8 space-y-5 print:p-0 print:shadow-none">
          {/* ── Top Header: Logos & Leaf Watermark ── */}
          <div className="relative flex items-center justify-between pb-2 border-b border-slate-100">
            {/* Logos */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.png"
                  alt="Arogya Sangosthi"
                  className="h-11 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div>
                  <h2 className="text-xl font-extrabold text-[#0d4722] tracking-tight font-poppins leading-none">
                    arogya<span className="text-[#c2982d]">sangosthi</span>
                  </h2>
                  <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                    A Journey to Healthier World...
                  </p>
                </div>
              </div>
            </div>

            {/* Pill Badge */}
            <div className="bg-[#eaf5ee] border border-[#c4e4ce] text-[#0d542b] px-3 py-1 rounded-full text-[10.5px] font-bold tracking-wide uppercase">
              18TH AROGYA SANGOSTHI 2026
            </div>

            {/* Top Right Decorative Watermark Leaves */}
            <div className="absolute right-0 top-0 pointer-events-none opacity-20 overflow-hidden">
              <svg width="150" height="90" viewBox="0 0 150 90" fill="none">
                <path d="M140 0C100 20 60 50 40 90M140 0C110 35 90 65 80 85M140 0C90 25 50 35 10 40" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* ── Title Banner: Payment Receipt ── */}
          <div className="flex items-start justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-md">
                <CheckCircle size={26} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight font-poppins">
                  Payment Receipt
                </h1>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Your payment has been successfully completed
                </p>
              </div>
            </div>
          </div>

          {/* ── Delegate & Event Banner ── */}
          <div className="bg-[#f0f8f3] border border-[#d2e8d9] rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Section 1: Delegate Info */}
            <div className="flex items-center gap-3 md:pr-2">
              <div className="w-11 h-11 rounded-full bg-[#052613] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                {getInitials(fullName)}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Dear
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm leading-tight truncate">
                  {fullName}
                </h3>
                <p className="text-[11px] font-bold text-[#059669] mt-0.5 truncate">
                  Delegate ID: <span className="font-mono">{delegateId}</span>
                </p>
              </div>
            </div>

            {/* Section 2: Event Dates */}
            <div className="flex items-start gap-3 md:border-l md:border-slate-200/80 md:px-3 pt-2 md:pt-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 mt-0.5">
                <Calendar size={16} />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Event Dates
                </span>
                <p className="font-extrabold text-slate-900 text-xs">
                  21 - 23 Aug 2026
                </p>
                <p className="text-[10.5px] font-medium text-slate-600">
                  Friday - Sunday
                </p>
              </div>
            </div>

            {/* Section 3: Venue */}
            <div className="flex items-start gap-3 md:border-l md:border-slate-200/80 md:pl-3 pt-2 md:pt-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 mt-0.5">
                <MapPin size={16} />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Venue
                </span>
                <p className="font-extrabold text-slate-900 text-xs leading-snug">
                  Pragati Maidan,
                </p>
                <p className="text-[10.5px] font-medium text-slate-600">
                  New Delhi
                </p>
              </div>
            </div>
          </div>

          {/* ── Two-Column Middle Section ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Column: Payment Details (7 cols) */}
            <div className="md:col-span-7 bg-[#f9fbf9] border border-slate-200/80 rounded-2xl p-4 space-y-3">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-slate-200/70 pb-2.5">
                <div className="w-5 h-5 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CreditCard size={12} />
                </div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Payment Details
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 text-xs">
                {/* Transaction ID */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <FileText size={13} className="text-slate-400" />
                    Transaction ID
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-bold font-mono text-slate-800">{txnId}</span>
                    <button
                      type="button"
                      onClick={handleCopyTxn}
                      className="p-1 rounded text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Copy Transaction ID"
                    >
                      {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>

                {/* Payment Date */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <Calendar size={13} className="text-slate-400" />
                    Payment Date
                  </span>
                  <span className="font-bold text-slate-800">{regDateFormatted}, {regTimeFormatted}</span>
                </div>

                {/* Amount Paid */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <span className="font-bold text-slate-400">₹</span>
                    Amount Paid
                  </span>
                  <span className="font-extrabold text-[#059669] text-sm">{amountPaid}</span>
                </div>

                {/* Payment Method */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <CreditCard size={13} className="text-slate-400" />
                    Payment Method
                  </span>
                  <span className="font-bold text-slate-800">{paymentMethod}</span>
                </div>

                {/* Purpose */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium flex items-center gap-2">
                    <Building size={13} className="text-slate-400" />
                    Purpose
                  </span>
                  <span className="font-bold text-slate-800">Delegate Pass Payment</span>
                </div>
              </div>
            </div>

            {/* Right Column: Payment Status & QR Code (5 cols) */}
            <div className="md:col-span-5 bg-[#f9fbf9] border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              {/* Header */}
              <div className="flex items-center gap-2 border-b border-slate-200/70 pb-2.5">
                <ShieldCheck size={14} className="text-emerald-700" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Payment Status
                </h3>
              </div>

              {/* Status Box */}
              <div className="bg-[#eef8f2] border border-[#c6e8d2] rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0">
                  <CheckCircle size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#046c4b] text-sm leading-tight">
                    Paid
                  </h4>
                  <p className="text-[10px] font-semibold text-emerald-800 mt-0.5">
                    Payment completed successfully!
                  </p>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(delegateId)}`}
                  alt="Delegate QR Code"
                  className="w-16 h-16 object-contain rounded-lg border border-slate-100 shrink-0"
                />
                <div className="text-[10px] text-slate-500 font-medium">
                  <p className="font-bold text-slate-700 mb-0.5">QR Code</p>
                  Show this QR code at the entry gate for verification.
                </div>
              </div>
            </div>
          </div>

          {/* ── Receipt Summary Bar ── */}
          <div className="bg-[#f9fbf9] border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200/70 pb-2">
              <FileText size={14} className="text-emerald-700" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Receipt Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-white border border-slate-200/70 rounded-xl p-2">
                <span className="text-[9.5px] font-semibold text-slate-400 block uppercase">Event</span>
                <span className="font-bold text-[#059669] text-[11px] mt-0.5 block truncate">Arogya Sangosthi 2026</span>
              </div>
              <div className="bg-white border border-slate-200/70 rounded-xl p-2">
                <span className="text-[9.5px] font-semibold text-slate-400 block uppercase">Pass Type</span>
                <span className="font-bold text-slate-800 text-[11px] mt-0.5 block truncate">Delegate Pass</span>
              </div>
              <div className="bg-white border border-slate-200/70 rounded-xl p-2">
                <span className="text-[9.5px] font-semibold text-slate-400 block uppercase">Valid From</span>
                <span className="font-bold text-slate-800 text-[11px] mt-0.5 block truncate">21 Aug 2026</span>
              </div>
              <div className="bg-white border border-slate-200/70 rounded-xl p-2">
                <span className="text-[9.5px] font-semibold text-slate-400 block uppercase">Valid Till</span>
                <span className="font-bold text-slate-800 text-[11px] mt-0.5 block truncate">23 Aug 2026</span>
              </div>
              <div className="bg-white border border-slate-200/70 rounded-xl p-2 col-span-2 sm:col-span-1">
                <span className="text-[9.5px] font-semibold text-slate-400 block uppercase">Access Type</span>
                <span className="font-bold text-emerald-700 text-[11px] mt-0.5 block truncate">Full Access</span>
              </div>
            </div>

            {/* Disclaimer Info */}
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 flex items-center gap-2 text-[10.5px] text-emerald-900 font-medium">
              <Info size={14} className="text-emerald-700 shrink-0" />
              <span>This is a computer generated receipt and does not require a physical signature.</span>
            </div>
          </div>

          {/* ── Footer: Cursive Thank You & Stamp ── */}
          <div className="pt-2 flex items-end justify-between gap-4 border-t border-slate-100">
            {/* Thank you text */}
            <div>
              <h2 className="text-2xl font-bold font-serif italic text-slate-800">
                Thank You!
              </h2>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                For being a part of Arogya Sangosthi 2026.
              </p>
            </div>

            {/* Signature & Round Stamp */}
            <div className="flex items-center gap-4 text-right">
              <div className="text-right">
                <p className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 pb-0.5">
                  Organizing Team
                </p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  Arogya Sangosthi 2026
                </p>
              </div>

              {/* Round Stamp Vector */}
              <div className="w-14 h-14 rounded-full border-2 border-emerald-700/80 p-0.5 flex items-center justify-center rotate-[-12deg] opacity-85 shrink-0">
                <div className="w-full h-full rounded-full border border-dashed border-emerald-600 flex flex-col items-center justify-center text-[7px] font-black text-emerald-800 uppercase tracking-tighter text-center leading-none">
                  <span>AROGYA</span>
                  <span className="my-0.5 text-emerald-600">🌿</span>
                  <span>2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Dark Green Bottom Footer Bar ── */}
          <div className="bg-[#052613] text-white rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-medium">
            <div className="flex flex-wrap items-center gap-4 text-emerald-200">
              <span>✉ info@arogyasangosthi.com</span>
              <span>📞 +91 96549 00525</span>
              <span>🌐 www.ihwe.in</span>
            </div>
            <div className="text-emerald-300 font-semibold">
              Stay Connected: <span className="text-white">Arogya Sangosthi</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Action Buttons ── */}
        <div className="bg-[#1f2937] p-4 flex flex-wrap items-center justify-center gap-3 border-t border-slate-700/60 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Printer size={15} />
            Print Receipt
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Download size={15} />
            Download PDF
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Share2 size={15} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
