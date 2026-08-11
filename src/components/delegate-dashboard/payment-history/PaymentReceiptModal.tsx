"use client";
import React, { useRef, useState, useEffect } from "react";
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
  ShieldCheck,
  FileText,
  User,
  Award,
  Wallet,
  Building,
  Mail,
  Phone,
  Globe,
  Clock,
} from "lucide-react";
import Swal from "sweetalert2";
import { settingsApi, SERVER_URL } from "@/lib/api";
import rrIcon from "@/assets/icons/rr.png";
import p1Icon from "@/assets/icons/P1.png";

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
  const [copied, setCopied] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    settingsApi
      .get()
      .then((settings) => {
        if (settings) {
          const getImageUrl = (url: any) => {
            if (!url) return null;
            if (typeof url === "string" && (url.startsWith("http") || url.startsWith("data:"))) return url;
            if (url?.url) {
              const u = url.url;
              if (u.startsWith("http") || u.startsWith("data:")) return u;
              const cleanPath = u.startsWith('/') ? u : `/${u}`;
              return `${SERVER_URL}${cleanPath}`;
            }
            if (typeof url === "string") {
              const cleanPath = url.startsWith('/') ? url : `/${url}`;
              return `${SERVER_URL}${cleanPath}`;
            }
            return null;
          };
          const finalUrl = getImageUrl(settings?.adminLogo) || getImageUrl(settings?.websiteLogo) || getImageUrl(settings?.logo) || "/logo.png";
          setLogoUrl(finalUrl);
        }
      })
      .catch(() => {
        setLogoUrl("/logo.png");
      });
  }, []);

  if (!isOpen) return null;

  const txnId = delegate?.transactionId || "TXN876543210";
  const amountPaid = delegate?.amount ? `₹${delegate.amount}` : "₹1,500";
  const delegateId = delegate?.delegateId || "AGS18/SR/DEL/D1/05/26/015";
  const fullName = delegate?.fullName || "Vansh Chaudhary";
  const paymentMethod = delegate?.paymentMethod || "UPI (Google Pay)";
  const receiptId = delegate?.receiptId || "RCPT-2026-0001487";

  const regDateFormatted = delegate?.createdAt
    ? new Date(delegate.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "08 Aug 2026";

  const regTimeFormatted = delegate?.createdAt
    ? new Date(delegate.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "10:30 AM";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs font-inter overflow-y-auto animate-in fade-in">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body * {
            visibility: hidden !important;
          }
          .printable-receipt-area,
          .printable-receipt-area * {
            visibility: visible !important;
          }
          .printable-receipt-area {
            position: absolute !important;
            left: 2% !important;
            top: 10px !important;
            width: 96% !important;
            margin: 0 !important;
            padding: 10px 12px !important;
            border: none !important;
            box-shadow: none !important;
            background: white !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
      <div className="bg-[#111827] text-slate-100 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden my-auto relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 w-8 h-8 rounded-full bg-black/50 text-slate-300 hover:text-white hover:bg-black/80 flex items-center justify-center transition-all cursor-pointer shadow-md print:hidden"
        >
          <X size={18} />
        </button>

        {/* Printable Receipt Frame (Thin Light Green Border) */}
        <div ref={receiptRef} className="printable-receipt-area bg-white text-slate-900 pt-2 sm:pt-3 px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 print:p-0 print:shadow-none relative border border-[#15803d]/30 rounded-xl m-2 sm:m-3">
          {/* Decorative corner flourishes */}
          <div className="absolute top-1 left-1 pointer-events-none text-[#15803d]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M 3,12 C 3,7 7,3 12,3" />
            </svg>
          </div>
          <div className="absolute top-1 right-1 pointer-events-none text-[#15803d]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M 12,3 C 17,3 21,7 21,12" />
            </svg>
          </div>

          {/* ── Top Header Bar (Reduced Top Space, Direct rr.png Icon) ── */}
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80 relative pt-1">
            {/* Left: Sidebar Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <img
                src={logoUrl}
                alt="Arogya Sangosthi"
                className="h-12 sm:h-16 md:h-18 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                }}
              />
            </div>

            {/* Center: Title & Subtitle matching typography with reduced top space */}
            <div className="flex flex-col items-center text-center px-1 -mt-2 sm:-mt-3">
              <h1 className="text-sm sm:text-lg md:text-xl font-semibold text-[#0a4019] tracking-wide uppercase font-inter leading-tight">
                18TH AROGYA SANGOSTHI 2026
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="h-[1px] w-6 sm:w-12 bg-slate-400" />
                <span className="text-xs sm:text-sm font-medium text-slate-900 tracking-widest uppercase font-inter">
                  UNITING MINDS, ADVANCING HEALTH
                </span>
                <div className="h-[1px] w-6 sm:w-12 bg-slate-400" />
              </div>
              <div className="text-[#0a4019]/40 text-[7px] leading-none mt-0.5">
                ◇
              </div>
            </div>

            {/* Right: Direct rr.png image without wrapping div */}
            <img
              src={(rrIcon?.src || rrIcon) as string}
              alt="Payment Receipt"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain shrink-0 -mt-5 sm:-mt-7 -mr-2"
            />
          </div>

          {/* ── Top Details Grid (Delegate Name, Event Dates, Venue, Pass Type + Receipt ID Card) ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Left 8 Cols: 2x2 Metadata Grid */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-1">
              {/* Item 1: Delegate Name */}
              <div className="flex items-start gap-2.5 sm:border-r sm:border-slate-200/80 sm:pr-4">
                <div className="w-8 h-8 rounded-full bg-[#eaf5ee] text-[#0f4d1e] flex items-center justify-center shrink-0 border border-[#c4e4ce]">
                  <User size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Delegate Name
                  </span>
                  <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight truncate">
                    {fullName}
                  </h3>
                  <p className="text-[10px] font-semibold text-[#4B1426] truncate mt-0.5">
                    Delegate ID: <span className="font-mono font-bold text-[#4B1426]">{delegateId}</span>
                  </p>
                </div>
              </div>

              {/* Item 2: Event Dates */}
              <div className="flex items-start gap-2.5 sm:pl-4">
                <div className="w-8 h-8 rounded-xl bg-[#eaf5ee] text-[#0f4d1e] flex items-center justify-center shrink-0 border border-[#c4e4ce]">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Event Dates
                  </span>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm">
                    21 – 23 Aug 2026
                  </p>
                  <p className="text-[10px] font-semibold text-blue-600">
                    Friday – Sunday
                  </p>
                </div>
              </div>

              {/* Item 3: Venue */}
              <div className="flex items-start gap-2.5 sm:border-r sm:border-slate-200/80 sm:pr-4">
                <div className="w-8 h-8 rounded-full bg-[#eaf5ee] text-[#0f4d1e] flex items-center justify-center shrink-0 border border-[#c4e4ce]">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Venue
                  </span>
                  <p className="font-semibold text-slate-900 text-[11px] sm:text-xs leading-tight truncate">
                    Pragati Maidan, New Delhi
                  </p>
                </div>
              </div>

              {/* Item 4: Pass Type */}
              <div className="flex items-start gap-2.5 sm:pl-4">
                <div className="w-8 h-8 rounded-xl bg-[#eaf5ee] text-[#0f4d1e] flex items-center justify-center shrink-0 border border-[#c4e4ce]">
                  <Award size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Pass Type
                  </span>
                  <p className="font-bold text-slate-900 text-xs sm:text-sm">
                    Delegate Pass
                  </p>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Receipt ID Box */}
            <div
              className="md:col-span-4 bg-slate-50/70 p-3 text-center flex flex-col justify-center rounded-none"
              style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            >
              <span className="text-[9.5px] font-extrabold text-slate-900 uppercase tracking-widest block">
                RECEIPT ID
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#15803d] tracking-wide my-1">
                {receiptId}
              </p>
              <div className="border-b border-dashed border-slate-200 my-1.5" />
              <div className="flex items-center justify-center gap-3 text-[10.5px] font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-slate-400" />
                  {regDateFormatted}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-slate-400" />
                  {regTimeFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* ── PAYMENT DETAILS Table & QR Code ── */}
          <div className="rounded-none border border-slate-200 overflow-hidden">
            {/* Table Header Bar */}
            <div className="bg-[#0a4019] text-white px-3.5 py-1.5 font-bold text-xs tracking-wider uppercase font-inter">
              PAYMENT DETAILS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 bg-white">
              {/* Left 7 Cols: Details Rows */}
              <div className="md:col-span-7 divide-y divide-slate-200 text-xs border-r border-slate-200/80">
                {/* Transaction ID */}
                <div className="flex items-center px-3.5 py-2">
                  <span className="w-6 shrink-0 text-slate-500">
                    <CreditCard size={15} />
                  </span>
                  <span className="w-36 font-semibold text-slate-700">Transaction ID</span>
                  <span className="font-semibold text-slate-400 mr-4">:</span>
                  <span className="font-bold text-blue-600 font-mono text-[11px] truncate flex-1">{txnId}</span>
                  <button
                    type="button"
                    onClick={handleCopyTxn}
                    className="p-1 text-slate-400 hover:text-emerald-700 transition-colors print:hidden cursor-pointer"
                    title="Copy Transaction ID"
                  >
                    {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                  </button>
                </div>

                {/* Payment Date & Time */}
                <div className="flex items-center px-3.5 py-2">
                  <span className="w-6 shrink-0 text-slate-500">
                    <Calendar size={15} />
                  </span>
                  <span className="w-36 font-semibold text-slate-700">Payment Date & Time</span>
                  <span className="font-semibold text-slate-400 mr-4">:</span>
                  <span className="font-semibold text-slate-900 flex-1">{regDateFormatted}, {regTimeFormatted}</span>
                </div>

                {/* Payment Method */}
                <div className="flex items-center px-3.5 py-2">
                  <span className="w-6 shrink-0 text-slate-500">
                    <Wallet size={15} />
                  </span>
                  <span className="w-36 font-semibold text-slate-700">Payment Method</span>
                  <span className="font-semibold text-slate-400 mr-4">:</span>
                  <span className="font-semibold text-slate-900 flex-1">{paymentMethod}</span>
                </div>

                {/* Amount Paid */}
                <div className="flex items-center px-3.5 py-2 bg-emerald-50/30">
                  <span className="w-5 h-5 rounded-full bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center font-bold text-xs shrink-0 mr-1">
                    ₹
                  </span>
                  <span className="w-36 font-semibold text-slate-700">Amount Paid</span>
                  <span className="font-semibold text-slate-400 mr-4">:</span>
                  <span className="font-semibold text-[#0a4019] text-sm flex-1">{amountPaid}</span>
                </div>

                {/* Purpose */}
                <div className="flex items-center px-3.5 py-2">
                  <span className="w-6 shrink-0 text-slate-500">
                    <FileText size={15} />
                  </span>
                  <span className="w-36 font-semibold text-slate-700">Purpose</span>
                  <span className="font-semibold text-slate-400 mr-4">:</span>
                  <span className="font-semibold text-slate-900 flex-1">Delegate Pass Payment</span>
                </div>

                {/* Payment Status */}
                <div className="flex items-center px-3.5 py-2">
                  <span className="w-6 shrink-0 text-slate-500">
                    <CheckCircle size={15} />
                  </span>
                  <span className="w-36 font-semibold text-slate-700">Payment Status</span>
                  <span className="font-semibold text-slate-400 mr-4">:</span>
                  <div className="flex-1">
                    <span className="bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] px-2.5 py-0.5 rounded-full text-[10.5px] font-bold inline-flex items-center gap-1">
                      <Check size={11} strokeWidth={3} />
                      PAID
                    </span>
                  </div>
                </div>

                {/* Access Type */}
                <div className="flex items-center px-3.5 py-2">
                  <span className="w-6 shrink-0 text-slate-500">
                    <ShieldCheck size={15} />
                  </span>
                  <span className="w-36 font-semibold text-slate-700">Access Type</span>
                  <span className="font-semibold text-slate-400 mr-4">:</span>
                  <span className="font-semibold text-slate-900 flex-1">Full Access</span>
                </div>
              </div>

              {/* Right 5 Cols: SCAN FOR VERIFICATION Box */}
              <div className="md:col-span-5 bg-slate-50/50 p-4 flex flex-col items-center justify-center text-center">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2.5 font-inter">
                  SCAN FOR VERIFICATION
                </h4>
                <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-xs mb-2">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(delegateId)}`}
                    alt="Verification QR Code"
                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain rounded-md"
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-medium max-w-[170px] leading-tight">
                  Show this QR code at the entry gate for verification.
                </p>
              </div>
            </div>
          </div>

          {/* ── SUMMARY Bar ── */}
          <div className="rounded-none border border-slate-200 overflow-hidden">
            <div className="bg-[#0a4019] text-white px-3.5 py-1.5 font-bold text-xs tracking-wider uppercase font-inter">
              SUMMARY
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] divide-x divide-slate-200 bg-white p-2.5 text-xs text-slate-800">
              {/* Event */}
              <div className="flex items-center gap-2 px-2 py-1">
                <div className="w-7 h-7 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                  <Building size={14} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-semibold text-slate-400 uppercase block">Event</span>
                  <span className="font-bold text-slate-900 text-[10.5px] block whitespace-nowrap">Arogya Sangosthi 2026</span>
                </div>
              </div>

              {/* Pass Type */}
              <div className="flex items-center gap-2 pl-3 sm:pl-4 pr-1 py-1">
                <div className="w-7 h-7 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                  <Award size={14} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-semibold text-slate-400 uppercase block">Pass Type</span>
                  <span className="font-bold text-slate-900 text-[10.5px] truncate block">Delegate Pass</span>
                </div>
              </div>

              {/* Valid From */}
              <div className="flex items-center gap-2 pl-3 sm:pl-4 pr-1 py-1">
                <div className="w-7 h-7 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                  <Calendar size={14} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-semibold text-slate-400 uppercase block">Valid From</span>
                  <span className="font-bold text-slate-900 text-[10.5px] truncate block">21 Aug 2026</span>
                  <span className="text-[9px] text-slate-500 font-medium">(Friday)</span>
                </div>
              </div>

              {/* Valid Till */}
              <div className="flex items-center gap-2 pl-3 sm:pl-4 pr-1 py-1">
                <div className="w-7 h-7 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                  <Calendar size={14} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-semibold text-slate-400 uppercase block">Valid Till</span>
                  <span className="font-bold text-slate-900 text-[10.5px] truncate block">23 Aug 2026</span>
                  <span className="text-[9px] text-slate-500 font-medium">(Sunday)</span>
                </div>
              </div>

              {/* Access Type */}
              <div className="flex items-center gap-2 pl-3 sm:pl-4 pr-1 py-1 col-span-2 sm:col-span-1">
                <div className="w-7 h-7 rounded-lg bg-[#eaf5ee] text-[#0f4d1e] border border-[#c4e4ce] flex items-center justify-center shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-semibold text-slate-400 uppercase block">Access Type</span>
                  <span className="font-bold text-slate-900 text-[10.5px] truncate block">Full Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Disclaimer Box ── */}
          <div className="bg-[#f4fbf6] border border-[#d8eae0] rounded-none p-2.5 flex items-center justify-between gap-2.5 text-slate-700 text-[11px] font-medium relative overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border border-slate-800 text-slate-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                i
              </div>
              <span className="relative z-10">This is a computer generated receipt and does not require a signature.</span>
            </div>
            
            <img src={typeof p1Icon === "string" ? p1Icon : p1Icon.src} alt="P1 Icon" className="h-9 w-auto object-contain shrink-0 -my-1.5" />
          </div>

          {/* ── Footer Contact Info & Cursive Thank You ── */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 text-[11px] font-medium text-slate-600">
            {/* Left Contact Links */}
            <div className="flex flex-wrap items-center gap-3 text-slate-600">
              <span className="flex items-center gap-1 text-[#0a4019] font-medium">
                <Mail size={13} className="text-slate-500" />
                info@arogyasangosthi.com
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-[#0a4019] font-medium">
                <Phone size={13} className="text-slate-500" />
                +91 96549 00525
              </span>
              <span className="text-slate-300">|</span>
              <a href="https://arogya.namogange.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#0a4019] hover:underline font-medium">
                <Globe size={13} className="text-slate-500" />
                arogya.namogange.org
              </a>
            </div>

            {/* Right Thank You */}
            <div className="text-center sm:text-right">
              <h3 className="font-serif italic font-extrabold text-[#0a4019] text-base sm:text-lg leading-tight">
                Thank You!
              </h3>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                We look forward to welcoming you at <span className="font-bold text-slate-800">18TH AROGYA SANGOSTHI 2026</span>.
              </p>
            </div>
          </div>
        </div>

        {/* ── Action Buttons Footer ── */}
        <div className="bg-[#1f2937] p-3 sm:p-4 flex flex-wrap items-center justify-center gap-3 border-t border-slate-700/60 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Printer size={15} />
            Print Receipt
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Download size={15} />
            Download PDF
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2 bg-[#059669] hover:bg-[#047857] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Share2 size={15} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
