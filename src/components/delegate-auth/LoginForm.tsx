"use client";
import React, { useState } from "react";
import { Mail, ShieldCheck, UserCheck, AlertCircle, ArrowRight, KeyRound, Loader2, Send, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { API_URL } from "@/lib/api";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<"otp" | "direct">("otp");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [maskedContact, setMaskedContact] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!identifier.trim()) { setErrorMessage("Please enter your registered Email or Mobile Number."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "OTP sent successfully!");
        setMaskedContact(data.maskedContact || identifier);
        setStep("otp");
      } else {
        setErrorMessage(data.message || "Account not found. Please register first.");
      }
    } catch { setErrorMessage("Network error. Please check your internet connection."); }
    finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!otp.trim()) { setErrorMessage("Please enter the 6-digit OTP received."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/verify-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), otp: otp.trim() }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        localStorage.setItem("arogya_delegate_user", JSON.stringify(data.data));
        const userDisplayName = data.data.fullName || data.data.name || "";
        Swal.fire({
          icon: "success",
          title: userDisplayName ? `<div class="text-[18px] font-semibold text-slate-800">Welcome Back, <span class="text-[#0D47A1]">${userDisplayName}</span>!</div>` : `<div class="text-[18px] font-semibold text-slate-800">Welcome Back!</div>`,
          text: "Loading your profile...",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
          width: '420px',
        }).then(() => {
          router.push("/delegate-profile");
        });
      } else {
        setErrorMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch { setErrorMessage("Verification failed. Please try again."); }
    finally { setLoading(false); }
  };

  const handleDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!identifier.trim()) { setErrorMessage("Please enter your Email, Mobile, or Delegate ID."); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/profile/${encodeURIComponent(identifier.trim())}`);
      const data = await res.json();
      if (data.success && data.data) {
        localStorage.setItem("arogya_delegate_user", JSON.stringify(data.data));
        const userDisplayName = data.data.fullName || data.data.name || "";
        Swal.fire({
          icon: "success",
          title: userDisplayName ? `<div class="text-[18px] font-semibold text-slate-800">Welcome Back, <span class="text-[#0D47A1]">${userDisplayName}</span>!</div>` : `<div class="text-[18px] font-semibold text-slate-800">Welcome Back!</div>`,
          text: "Loading your profile...",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
          width: '420px',
        }).then(() => {
          router.push("/delegate-profile");
        });
      } else {
        setErrorMessage("Delegate account not found with this ID or Email.");
      }
    } catch { setErrorMessage("Login failed. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="w-full">
      {/* ── Section Heading ── */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0d6e38] tracking-tight">
          Delegates Login
        </h3>
        <p className="text-xs text-black font-medium mt-0.5">
          {authMethod === "otp"
            ? "Login using your registered email or mobile number"
            : "Enter your assigned Delegate ID or Email to access your portal"}
        </p>
      </div>

      {/* ── Tab switcher ── */}
      <div className="flex border-2 border-slate-200 mb-4">
        <button
          type="button"
          onClick={() => { setAuthMethod("otp"); setStep("input"); setErrorMessage(""); }}
          className={`flex-1 py-2 px-2 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
            authMethod === "otp"
              ? "bg-[#0b3c1a] text-white shadow-inner"
              : "bg-white text-slate-700 hover:bg-slate-50 hover:text-[#0b3c1a]"
          }`}
        >
          <KeyRound size={13} className="shrink-0" />
          <span>OTP Login</span>
        </button>
        <div className="w-px bg-slate-200" />
        <button
          type="button"
          onClick={() => { setAuthMethod("direct"); setStep("input"); setErrorMessage(""); }}
          className={`flex-1 py-2 px-2 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
            authMethod === "direct"
              ? "bg-[#0b3c1a] text-white shadow-inner"
              : "bg-white text-slate-700 hover:bg-slate-50 hover:text-[#0b3c1a]"
          }`}
        >
          <User size={13} className="shrink-0" />
          <span>Delegate ID / Quick Login</span>
        </button>
      </div>

      {/* ── Error Banner ── */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-4 p-2.5 bg-red-50 border-2 border-red-300 text-red-700 text-xs font-semibold flex items-center gap-2"
          >
            <AlertCircle size={15} className="text-red-500 shrink-0" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OTP FLOW ── */}
      {authMethod === "otp" && (
        <div className="space-y-3.5">
          {step === "input" ? (
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-black mb-1.5 uppercase tracking-wider">
                  Registered Email or Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your registered email or 10-digit mobile"
                    className="w-full px-3.5 py-2.5 pl-9 bg-white border-2 border-slate-200 focus:outline-none focus:border-emerald-500 transition-all text-xs font-medium shadow-sm focus:shadow-emerald-100"
                    required
                  />
                </div>
                <p className="mt-1.5 text-[10.5px] sm:text-[11px] text-red-500 font-medium whitespace-nowrap">
                  We will send a 6-digit verification code to your registered Email &amp; WhatsApp.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0b3c1a] hover:bg-[#072811] text-white font-medium py-2.5 px-4 transition-all duration-200 shadow-md hover:shadow-[#0b3c1a]/20 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 text-xs flex items-center justify-center gap-2 transform cursor-pointer"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /><span>Sending OTP...</span></>
                ) : (
                  <><Send size={15} /><span>Send Login OTP</span></>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-3.5">
              <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 px-3 py-2">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">OTP Sent To:</span>
                  <strong className="text-emerald-700 font-mono font-bold text-xs">{maskedContact}</strong>
                </div>
                <button type="button" onClick={() => setStep("input")} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 underline cursor-pointer">
                  Change
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-black mb-1.5 uppercase tracking-wider">
                  Enter 6-Digit OTP Code <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="1 2 3 4 5 6"
                    className="w-full px-3 py-2 pl-9 bg-white border-2 border-slate-200 focus:outline-none focus:border-emerald-500 transition-all text-lg font-mono font-bold text-center tracking-widest shadow-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0b3c1a] hover:bg-[#072811] text-white font-medium py-2.5 px-4 transition-all duration-200 shadow-md hover:shadow-[#0b3c1a]/20 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 text-xs flex items-center justify-center gap-2 transform cursor-pointer"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /><span>Verifying...</span></>
                ) : (
                  <><UserCheck size={16} /><span>Verify &amp; Login</span></>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ── DIRECT / QUICK LOGIN ── */}
      {authMethod === "direct" && (
        <form onSubmit={handleDirectLogin} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-bold text-black mb-1.5 uppercase tracking-wider">
              Delegate ID / Registered Email or Mobile <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. AGY-2026-1002 or email address"
                className="w-full px-3.5 py-2.5 pl-9 bg-white border-2 border-slate-200 focus:outline-none focus:border-emerald-500 transition-all text-xs font-medium shadow-sm focus:shadow-emerald-100"
                required
              />
            </div>
            <p className="mt-1.5 text-[10px] sm:text-[10.5px] text-red-500 font-medium whitespace-nowrap">
              Directly view your verified delegate pass by entering your assigned ID or Email.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0b3c1a] hover:bg-[#072811] text-white font-medium py-2.5 px-4 transition-all duration-200 shadow-md hover:shadow-[#0b3c1a]/20 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 text-xs flex items-center justify-center gap-2 transform cursor-pointer"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /><span>Searching Profile...</span></>
            ) : (
              <><ArrowRight size={16} /><span>View Delegate Profile</span></>
            )}
          </button>
        </form>
      )}

      {/* ── Divider ── */}
      <div className="relative my-4 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          OR
        </span>
      </div>

      {/* ── Security note — compact & neat ── */}
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3 py-2 w-fit">
        <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
        <div>
          <strong className="block text-[11px] font-bold text-emerald-800 leading-tight">Your security is our priority</strong>
          <span className="text-[10px] text-emerald-600 leading-tight">We never share your details with anyone.</span>
        </div>
      </div>
    </div>
  );
};
