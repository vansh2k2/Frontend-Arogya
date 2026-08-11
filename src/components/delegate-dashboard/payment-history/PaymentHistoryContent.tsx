"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Wallet,
  IndianRupee,
  Receipt,
  Calendar,
  ChevronDown,
  Search,
  Download,
  Copy,
  Check,
  Info,
  ShieldCheck,
  FileText,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import { PaymentReceiptModal } from "./PaymentReceiptModal";
import cdcdIcon from "@/assets/icons/cdcd.png";
import lfsIcon from "@/assets/icons/lfs.png";

interface PaymentHistoryContentProps {
  delegate: any;
  onOpenSupport?: () => void;
  onDownloadReceipt?: () => void;
}

export const PaymentHistoryContent: React.FC<PaymentHistoryContentProps> = ({
  delegate,
  onOpenSupport,
  onDownloadReceipt,
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const txnId = delegate?.transactionId || "pay_TM1htIbDbaTEGj";
  const amountPaid = delegate?.amount ? `₹${delegate.amount}` : "₹1,500";
  const paymentStatus = (delegate?.paymentStatus || "PAID").toUpperCase();
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

  const handleDownloadStatement = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt();
    } else {
      setIsReceiptModalOpen(true);
    }
  };

  return (
    <div className="space-y-3.5 font-inter w-full antialiased">
      {/* ── Page Header (Exact match to MY PASS DETAILS & PERSONAL INFORMATION) ── */}
      <div className="mb-3 bg-transparent p-0 shadow-none">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold font-poppins text-[#0A2947] uppercase tracking-tight mb-1">
                PAYMENT HISTORY
              </h1>
              <div className="h-[2px] w-full bg-[#28396C] mb-1"></div>
            </div>
            <p className="text-gray-500 mt-1 font-medium italic text-xs">
              View all your payments and transactions related to your registration.
            </p>
          </div>
          <img
            src={lfsIcon?.src || lfsIcon}
            alt="Leaf Decorative"
            className="w-28 sm:w-40 md:w-44 h-auto object-contain pointer-events-none shrink-0 -mt-6 sm:-mt-8 relative z-10"
          />
        </div>
      </div>

      {/* ── Top Summary Metric Cards (Exact match to MY PASS DETAILS styling) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: TOTAL PAYMENTS */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-emerald-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-emerald-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
            <CreditCard size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-xs font-semibold text-emerald-600/70 uppercase tracking-wider">
              TOTAL PAYMENTS
            </span>
            <h4 className="text-base font-semibold text-slate-800 truncate leading-tight mt-0.5">
              {amountPaid}
            </h4>
            <span className="inline-block mt-0.5 text-xs font-semibold text-emerald-700 bg-emerald-200/80 px-1.5 rounded-full">
              1 Transaction
            </span>
          </div>
        </div>

        {/* Card 2: AMOUNT PAID */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-amber-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-amber-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Wallet size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-xs font-semibold text-amber-600/70 uppercase tracking-wider">
              AMOUNT PAID
            </span>
            <h4 className="text-base font-semibold text-slate-800 truncate leading-tight mt-0.5">
              {amountPaid}
            </h4>
            <p className="text-xs text-blue-600 font-semibold mt-0.5">
              Total Paid
            </p>
          </div>
        </div>

        {/* Card 3: PENDING AMOUNT */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-blue-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-blue-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
            <IndianRupee size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-xs font-semibold text-blue-600/70 uppercase tracking-wider">
              PENDING AMOUNT
            </span>
            <h4 className="text-base font-semibold text-slate-800 leading-snug mt-0.5">
              ₹0
            </h4>
            <span className="inline-block mt-0.5 text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 rounded-full">
              No Pending Payments
            </span>
          </div>
        </div>

        {/* Card 4: LATEST PAYMENT */}
        <div
          style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
          className="bg-purple-50 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 transition-all border border-purple-100/60"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 border border-purple-200 flex items-center justify-center shrink-0">
            <Receipt size={17} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <span className="block text-xs font-semibold text-purple-600/70 uppercase tracking-wider">
              LATEST PAYMENT
            </span>
            <h4 className="text-base font-semibold text-slate-800 truncate leading-tight mt-0.5">
              {regDateFormatted}
            </h4>
            <p className="text-xs text-purple-600 font-semibold mt-0.5">
              {regTimeFormatted}
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter & Search Controls Bar ── */}
      <div 
        className="bg-white p-4 rounded-xl border border-slate-200/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
        style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 flex-1">
          {/* Date Range */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-black">
              Date Range
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Date Range"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-none text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-black">
              Payment Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-none text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid / Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold text-black">
              Payment Method
            </label>
            <div className="relative">
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-none text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Methods</option>
                <option value="upi">UPI (Google Pay / PhonePe)</option>
                <option value="card">Credit / Debit Card</option>
                <option value="netbanking">Net Banking</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search & Download Statement Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 shrink-0 pt-2 lg:pt-0">
          <div className="relative flex-1 sm:w-56">
            <input
              type="text"
              placeholder="Search by Transaction ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-9 py-2 bg-white border border-slate-200 rounded-none text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            type="button"
            onClick={handleDownloadStatement}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Download size={14} className="text-emerald-600" />
            Download Statement
          </button>
        </div>
      </div>

      {/* ── Transaction History Table ── */}
      <div 
        className="bg-white rounded-xl p-3.5 sm:p-4 border border-transparent"
        style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }}
      >
        <div className="mb-2.5">
          <h3 className="text-[14px] font-semibold text-emerald-800 uppercase tracking-wide">
            TRANSACTION HISTORY
          </h3>
          <p className="text-[10.5px] text-black font-medium mt-0.5">
            Your recent payment transactions
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#133458] text-white font-semibold">
                <th className="py-2.5 px-3">DATE & TIME</th>
                <th className="py-2.5 px-3">TRANSACTION ID</th>
                <th className="py-2.5 px-3">DESCRIPTION</th>
                <th className="py-2.5 px-3">PAYMENT METHOD</th>
                <th className="py-2.5 px-3">AMOUNT</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50/50 transition-colors">
                {/* Date & Time */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="font-bold text-slate-800">{regDateFormatted}</div>
                  <div className="text-[11px] text-slate-500 font-semibold">{regTimeFormatted}</div>
                </td>

                {/* Transaction ID */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#4B1426]">
                      {txnId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyTxn}
                      className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="Copy Transaction ID"
                    >
                      {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>
                </td>

                {/* Description */}
                <td className="py-2.5 px-3">
                  <div className="font-semibold text-slate-800">Delegate Pass Payment</div>
                  <span className="inline-block mt-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 rounded">
                    Arogya Sangosthi 2026
                  </span>
                </td>

                {/* Payment Method */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <div className="font-bold text-slate-800">UPI</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Google Pay</div>
                </td>

                {/* Amount */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="font-bold text-emerald-700">
                    {amountPaid}
                  </span>
                </td>

                {/* Status */}
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-bold">
                    {paymentStatus === "PAID" ? "Paid" : paymentStatus}
                  </span>
                  <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                    Completed
                  </div>
                </td>

                {/* Action */}
                <td className="py-2.5 px-3 whitespace-nowrap text-center">
                  <button
                    type="button"
                    onClick={handleDownloadStatement}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer inline-flex items-center justify-center"
                    title="Download Receipt"
                  >
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Detailed Receipt Card (Payment Details Box matching screenshot) ── */}
      <div 
        className="bg-[#f4f9f6] border border-[#d8eae0] rounded-xl p-5 sm:p-6 relative overflow-hidden"
        style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
      >
        {/* Right Side Illustration (Direct img tag for cdcd.png - no div wrapper) */}
        <img
          src={cdcdIcon?.src || cdcdIcon}
          alt="Payment Details Graphic"
          className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 w-28 sm:w-36 h-auto object-contain pointer-events-none opacity-95"
        />

        <div className="relative z-10 max-w-3xl">
          {/* Card Title */}
          <div className="flex items-center gap-2 mb-2.5 -mt-1.5">
            <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Receipt size={14} />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
              Payment Details
            </h3>
          </div>

          {/* 2 Columns layout with vertical divider */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 md:gap-x-8 text-xs">
            {/* Left Column (3 items) */}
            <div className="space-y-3.5 md:border-r md:border-slate-200/80 md:pr-8">
              {/* Row 1: Payment Status */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-slate-600 font-medium w-32">Payment Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-100/90 text-emerald-800 font-bold">
                  {paymentStatus === "PAID" ? "Paid" : paymentStatus}
                </span>
              </div>

              {/* Row 2: Payment Date */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-slate-600 font-medium w-32">Payment Date</span>
                <span className="font-semibold text-slate-800">{regDateFormatted}, {regTimeFormatted}</span>
              </div>

              {/* Row 3: Payment Method */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-slate-600 font-medium w-32">Payment Method</span>
                <span className="font-semibold text-slate-800">{paymentMethod}</span>
              </div>
            </div>

            {/* Right Column (3 items) */}
            <div className="space-y-3.5">
              {/* Row 1: Transaction ID */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-slate-600 font-medium w-32">Transaction ID</span>
                <span className="font-bold text-[#4B1426] font-mono text-xs">{txnId}</span>
              </div>

              {/* Row 2: Amount Paid */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <span className="text-slate-600 font-medium w-32">Amount Paid</span>
                <span className="font-bold text-slate-900 text-sm">{amountPaid}</span>
              </div>

              {/* Row 3: Invoice / Receipt */}
              <div className="flex items-center justify-between sm:justify-start gap-4 pt-0.5">
                <span className="text-slate-600 font-medium w-32">Invoice / Receipt</span>
                <button
                  type="button"
                  onClick={handleDownloadStatement}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-600/80 text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <Download size={14} className="text-emerald-600" />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Info & Support Link Banner ── */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/50 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="text-amber-500 shrink-0">
            <Info size={16} />
          </div>
          <p className="text-[11px] text-slate-600 font-semibold">
            If you have any queries regarding your payment, please contact our support team.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenSupport}
          className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline transition-colors shrink-0 cursor-pointer text-xs"
        >
          Contact Support <ChevronRight size={14} />
        </button>
      </div>

      {/* Payment Receipt Modal */}
      <PaymentReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        delegate={delegate}
      />
    </div>
  );
};
