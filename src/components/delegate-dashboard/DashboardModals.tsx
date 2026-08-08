"use client";
import React from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  CreditCard,
  Printer,
  ShieldCheck,
  Headphones,
  CheckCircle,
  FileText,
} from "lucide-react";

interface DashboardModalsProps {
  activeModal: string | null;
  onClose: () => void;
  delegate: any;
  onPrintBadge: () => void;
}

export const DashboardModals: React.FC<DashboardModalsProps> = ({
  activeModal,
  onClose,
  delegate,
  onPrintBadge,
}) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-inter animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#052613] text-white p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/50 flex items-center justify-center text-emerald-300">
              {activeModal === "profile" && <User size={16} />}
              {activeModal === "payment" && <CreditCard size={16} />}
              {activeModal === "schedule" && <Calendar size={16} />}
              {activeModal === "badge" && <ShieldCheck size={16} />}
              {activeModal === "support" && <Headphones size={16} />}
              {activeModal === "download" && <FileText size={16} />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {activeModal === "profile" && "Personal & Registration Information"}
                {activeModal === "payment" && "Payment & Fee Summary"}
                {activeModal === "schedule" && "Conference Event Schedule"}
                {activeModal === "badge" && "Official Entry Badge ID"}
                {activeModal === "support" && "Delegate Help & Support"}
                {activeModal === "download" && "Download Documents & Pass"}
              </h3>
              <p className="text-[11px] text-emerald-300/80">
                Delegate ID: {delegate?.delegateId || "AGS-2026"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {/* PROFILE MODAL */}
          {activeModal === "profile" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Full Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{delegate?.fullName || "N/A"}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Designation</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{delegate?.designation || "Delegate"}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Email Address</span>
                  <p className="font-bold text-slate-900 mt-0.5">{delegate?.email || "N/A"}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</span>
                  <p className="font-bold text-slate-900 mt-0.5">{delegate?.mobile || "N/A"}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Organization / Institute</span>
                  <p className="font-bold text-slate-900 mt-0.5">{delegate?.organization || "Design House Private Ltd"}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 sm:col-span-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Address & City</span>
                  <p className="font-bold text-slate-900 mt-0.5">{delegate?.city ? `${delegate.city}, ${delegate?.state || ""}` : "New Delhi, India"}</p>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENT MODAL */}
          {activeModal === "payment" && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">Payment Status</span>
                  <p className="text-base font-extrabold text-emerald-900 mt-0.5">Payment Confirmed ✅</p>
                </div>
                <span className="text-xl font-black text-emerald-900">
                  ₹{delegate?.amount || delegate?.fee || "150"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Payment Mode</span>
                  <p className="font-bold text-slate-900 mt-0.5">{delegate?.paymentMode || "Online (Razorpay / UPI)"}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Transaction Ref</span>
                  <p className="font-mono font-bold text-slate-900 mt-0.5">{delegate?.transactionId || "TXN-2026-94812"}</p>
                </div>
              </div>
            </div>
          )}

          {/* SCHEDULE MODAL */}
          {activeModal === "schedule" && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 border-l-4 border-emerald-600 rounded-r-xl">
                <div className="flex items-center justify-between">
                  <strong className="text-emerald-900 font-bold text-xs">Day 1: 21 August 2026 (Friday)</strong>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Access Granted</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">Inaugural Session, Integrated AYUSH Keynotes &amp; Pharma Tech Expo</p>
              </div>

              <div className="p-3.5 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl">
                <div className="flex items-center justify-between">
                  <strong className="text-blue-900 font-bold text-xs">Day 2: 22 August 2026 (Saturday)</strong>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">Access Granted</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">Wellness &amp; Clinical Innovation, International Delegate Sessions</p>
              </div>

              <div className="p-3.5 bg-slate-50 border-l-4 border-amber-600 rounded-r-xl">
                <div className="flex items-center justify-between">
                  <strong className="text-amber-900 font-bold text-xs">Day 3: 23 August 2026 (Sunday)</strong>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">Access Granted</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">Global Healthcare Research &amp; Official Valedictory Ceremony</p>
              </div>
            </div>
          )}

          {/* SUPPORT MODAL */}
          {activeModal === "support" && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-900 mb-1">Arogya Delegate Helpdesk</h4>
                <p className="text-slate-600 text-xs">
                  For pass modifications, certificates, or hotel queries, contact our organizing team:
                </p>
                <div className="mt-3 space-y-2 text-xs">
                  <p className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Mail size={14} className="text-emerald-700" />
                    info@arogyasangosthi.com
                  </p>
                  <p className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Phone size={14} className="text-emerald-700" />
                    +91 96549 00525 / +91 98112 34567
                  </p>
                  <p className="flex items-center gap-2 text-slate-800 font-semibold">
                    <MapPin size={14} className="text-emerald-700" />
                    Hall No. 5 &amp; 6, Pragati Maidan, New Delhi
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BADGE / DOWNLOAD MODAL */}
          {(activeModal === "badge" || activeModal === "download") && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="font-bold text-slate-900 text-sm">
                  Ready to print your verified badge!
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  Keep your digital pass or physical badge handy at the Pragati Maidan security gate.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPrintBadge();
                }}
                className="w-full py-3 bg-[#052613] hover:bg-[#083a1d] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Printer size={16} />
                <span>Print Official Badge ID</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
