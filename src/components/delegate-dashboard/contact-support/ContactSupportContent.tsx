"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Paperclip,
  Send,
  ShieldCheck,
  CreditCard,
  Info,
  Calendar,
  Headphones,
  HelpCircle,
  Clock,
  Eye,
  ChevronRight,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import lfsIcon from "@/assets/icons/lfs.png";
import cdcdIcon from "@/assets/icons/ss.png";

interface ContactSupportContentProps {
  delegate: any;
}

export const ContactSupportContent: React.FC<ContactSupportContentProps> = ({
  delegate,
}) => {
  const delegateName = delegate?.fullName || delegate?.name || "Vansh Chaudhary";
  const delegateEmail = delegate?.email || "vansh.2002vc@gmail.com";
  const delegatePhone = delegate?.mobile || delegate?.phone || "8076750278";

  const [fullName, setFullName] = useState(delegateName);
  const [email, setEmail] = useState(delegateEmail);
  const [phone, setPhone] = useState(delegatePhone);
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Ticket View Modal
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const sampleTickets = [
    {
      id: "#AS1258",
      subject: "Payment failed but amount deducted",
      category: "Payment",
      date: "19 Aug 2026, 11:30 AM",
      status: "Resolved",
      response:
        "Dear Vansh, your payment of ₹1,500 has been verified. Transaction ID: pay_TM1htIbDbaTEGj. Thank you!",
    },
    {
      id: "#AS1190",
      subject: "Digital Pass QR code download query",
      category: "Pass & QR Code",
      date: "10 Aug 2026, 04:15 PM",
      status: "Resolved",
      response:
        "Your digital entry pass and QR Code are active in your portal under 'My Pass Details'.",
    },
    {
      id: "#AS1045",
      subject: "Delegate Pass registration confirmation",
      category: "Registration",
      date: "05 Aug 2026, 02:20 PM",
      status: "Resolved",
      response:
        "Delegate ID AGS18/SR/DEL/D1/05/26/015 is confirmed. We look forward to seeing you at Pragati Maidan!",
    },
  ];

  const handleCategoryClick = (catName: string) => {
    setCategory(catName);
    const formElement = document.getElementById("support-form-card");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File Too Large",
          text: "Maximum allowed file size is 5MB.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim() || !category) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please select a category and fill in both Subject and Message.",
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Swal.fire({
        icon: "success",
        title: "Query Submitted!",
        text: `Thank you ${fullName}. Your support request has been registered under ticket #AS${Math.floor(
          1000 + Math.random() * 9000
        )}. Our team will contact you shortly.`,
        confirmButtonColor: "#059669",
      });

      setSubject("");
      setMessage("");
      setFile(null);
    }, 900);
  };

  return (
    <div className="space-y-3.5 font-inter w-full antialiased text-slate-800">
      {/* ── Page Header (Exact 100% Match to PAYMENT HISTORY & PERSONAL INFORMATION) ── */}
      <div className="mb-3 bg-transparent p-0 shadow-none">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold font-poppins text-[#0A2947] uppercase tracking-tight mb-1">
                CONTACT SUPPORT
              </h1>
              <div className="h-[2px] w-full bg-[#28396C] mb-1"></div>
            </div>
            <p className="text-gray-500 mt-1 font-medium italic text-xs">
              We're here to help! Send us your queries and our team will get back to you.
            </p>
          </div>
          <img
            src={typeof lfsIcon === "string" ? lfsIcon : lfsIcon.src}
            alt="Leaf Decorative"
            className="w-28 sm:w-40 md:w-44 h-auto object-contain pointer-events-none shrink-0 -mt-6 sm:-mt-8 relative z-10"
          />
        </div>
      </div>

      {/* ── Top Layout Grid: Left Form (7 Cols) & Right Quick Selector Cards (5 Cols) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: Send us a Message Card */}
        <div
          id="support-form-card"
          className="lg:col-span-7 bg-white border border-slate-200/80 rounded-none p-5 sm:p-6 relative"
          style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
        >
          {/* Card Header Title */}
          <div className="flex items-center gap-2 mb-2.5 -mt-1.5">
            <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <MessageSquare size={14} />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
              Send us a Message
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-4">
            Fill in the details below and we will respond as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl font-medium text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl font-medium text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Mobile Number & Query Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl font-medium text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Query Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50/70 border border-slate-200 rounded-xl font-medium text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="Registration">Registration Issues</option>
                  <option value="Payment">Payment & Refunds</option>
                  <option value="Pass & QR Code">Pass & QR Code</option>
                  <option value="Event Information">Event Information & Schedule</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Other Queries">Other Queries</option>
                </select>
              </div>
            </div>

            {/* Row 3: Subject */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter the subject of your query"
                required
                className="w-full px-3.5 py-2 bg-slate-50/70 border border-slate-200 rounded-xl font-medium text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all"
              />
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                required
                className="w-full px-3.5 py-2 bg-slate-50/70 border border-slate-200 rounded-xl font-medium text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/10 transition-all resize-none"
              />
            </div>

            {/* Row 5: Attach File (Optional) Box */}
            <div className="p-3 bg-[#f0f7ff] border border-dashed border-[#b0d4ff] rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-md bg-blue-100/90 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <Paperclip size={14} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-800">
                    Attach File <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
                  </p>
                  <p className="text-[10px] text-red-600 font-medium truncate">
                    {file ? file.name : "Upload any screenshot or document (Max. 5MB)"}
                  </p>
                </div>
              </div>

              <label className="px-3 py-1.5 bg-white border border-blue-200 hover:border-blue-400 text-blue-700 text-xs font-semibold rounded-lg shadow-2xs hover:bg-blue-50 transition-colors cursor-pointer shrink-0">
                Choose File
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-60"
              >
                <Send size={13} />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: How can we help you? & Support Information */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: How can we help you? */}
          <div
            className="bg-white border border-slate-200/80 rounded-xl p-5 sm:p-6 relative"
            style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
          >
            <div className="flex items-center gap-2 mb-2.5 -mt-1.5">
              <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <HelpCircle size={14} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
                How can we help you?
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium mb-3.5">
              Choose a category to quickly reach the right team.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Category 1: Registration */}
              <div
                onClick={() => handleCategoryClick("Registration")}
                className="p-3 bg-white border border-slate-200/80 hover:border-emerald-500 rounded-xl transition-all hover:shadow-xs cursor-pointer group flex flex-col items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <ShieldCheck size={15} />
                </div>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  Registration
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">
                  Issues related to registration
                </p>
              </div>

              {/* Category 2: Payment */}
              <div
                onClick={() => handleCategoryClick("Payment")}
                className="p-3 bg-white border border-slate-200/80 hover:border-amber-500 rounded-xl transition-all hover:shadow-xs cursor-pointer group flex flex-col items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100/70 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <CreditCard size={15} />
                </div>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                  Payment
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">
                  Payment failed or refund queries
                </p>
              </div>

              {/* Category 3: Pass & QR Code */}
              <div
                onClick={() => handleCategoryClick("Pass & QR Code")}
                className="p-3 bg-white border border-slate-200/80 hover:border-blue-500 rounded-xl transition-all hover:shadow-xs cursor-pointer group flex flex-col items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Info size={15} />
                </div>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                  Pass &amp; QR Code
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">
                  Issues with pass download or QR
                </p>
              </div>

              {/* Category 4: Event Information */}
              <div
                onClick={() => handleCategoryClick("Event Information")}
                className="p-3 bg-white border border-slate-200/80 hover:border-purple-500 rounded-xl transition-all hover:shadow-xs cursor-pointer group flex flex-col items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Calendar size={15} />
                </div>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">
                  Event Information
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">
                  Schedule, venue or session queries
                </p>
              </div>

              {/* Category 5: Technical Support */}
              <div
                onClick={() => handleCategoryClick("Technical Support")}
                className="p-3 bg-white border border-slate-200/80 hover:border-teal-500 rounded-xl transition-all hover:shadow-xs cursor-pointer group flex flex-col items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Headphones size={15} />
                </div>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                  Technical Support
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">
                  App / portal related technical issues
                </p>
              </div>

              {/* Category 6: Other Queries */}
              <div
                onClick={() => handleCategoryClick("Other Queries")}
                className="p-3 bg-white border border-slate-200/80 hover:border-rose-500 rounded-xl transition-all hover:shadow-xs cursor-pointer group flex flex-col items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-100/70 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <HelpCircle size={15} />
                </div>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-rose-700 transition-colors">
                  Other Queries
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5 font-medium">
                  Any other questions
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Support Information (Exact match to Payment Details Box with cdcd.png) */}
          <div
            className="bg-[#f4f9f6] border border-[#d8eae0] rounded-xl p-5 relative overflow-hidden"
            style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
          >
            {/* Right Side ss.png graphic without div wrapper */}
            <img
              src={typeof cdcdIcon === "string" ? cdcdIcon : cdcdIcon.src}
              alt="Support Details Graphic"
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-[10%] w-28 sm:w-36 h-auto object-contain pointer-events-none opacity-95"
            />

            <div className="relative z-10 max-w-xs">
              <div className="flex items-center gap-2 mb-2.5 -mt-1.5">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Info size={14} />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
                  Support Information
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-3.5">
                Reach out to us through any of the channels below.
              </p>

              <div className="space-y-2.5 text-xs">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 font-medium w-14">Email</span>
                  <a
                    href="mailto:support@arogyasangosthi.com"
                    className="font-semibold text-emerald-700 hover:underline"
                  >
                    support@arogyasangosthi.com
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 font-medium w-14">Phone</span>
                  <a
                    href="tel:+919654900525"
                    className="font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
                  >
                    +91 96549 00525
                  </a>
                </div>

                {/* Support Hours */}
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 font-medium w-14">Hours</span>
                  <span className="font-semibold text-slate-800">
                    Mon - Sat : 10:00 AM - 06:00 PM (IST)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Table Section: YOUR RECENT QUERIES (Exact 100% Match to TRANSACTION HISTORY) ── */}
      <div className="pt-2">
        <div className="mb-2 bg-transparent p-0 shadow-none">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex flex-col">
              <h2 className="text-xs font-bold text-[#0A2947] uppercase tracking-wider">
                YOUR RECENT QUERIES
              </h2>
              <p className="text-gray-500 mt-0.5 font-medium italic text-[11px]">
                Track the status of your previous support requests
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                Swal.fire({
                  title: "All Support Requests",
                  text: "You have 3 active support tickets registered.",
                  icon: "info",
                  confirmButtonColor: "#059669",
                });
              }}
              className="text-emerald-700 hover:text-emerald-800 text-xs font-bold hover:underline transition-colors shrink-0 cursor-pointer flex items-center gap-1 self-start sm:self-auto"
            >
              View All <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div
          className="bg-white border border-slate-200/80 rounded-xl overflow-hidden"
          style={{ boxShadow: "rgba(9, 30, 66, 0.05) 0px 1px 2px" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-inter">
              <thead>
                <tr className="bg-[#133458] text-white text-[11px] font-semibold tracking-wider uppercase">
                  <th className="py-2.5 px-3 whitespace-nowrap">TICKET ID</th>
                  <th className="py-2.5 px-3">SUBJECT</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">CATEGORY</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">DATE &amp; TIME</th>
                  <th className="py-2.5 px-3 text-center whitespace-nowrap">STATUS</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">ACTION</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/70 bg-white">
                {sampleTickets.map((t, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Ticket ID (Deep Burgundy Maroon Red matching Transaction ID) */}
                    <td className="py-2.5 px-3 font-mono font-bold text-[#4B1426] whitespace-nowrap">
                      {t.id}
                    </td>

                    {/* Subject */}
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      {t.subject}
                    </td>

                    {/* Category */}
                    <td className="py-2.5 px-3 font-semibold text-slate-600 whitespace-nowrap">
                      {t.category}
                    </td>

                    {/* Date & Time */}
                    <td className="py-2.5 px-3 text-slate-500 font-medium whitespace-nowrap">
                      {t.date}
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>{t.status}</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedTicket(t)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold transition-colors cursor-pointer border border-slate-200"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ticket Details View Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 relative font-inter">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                  {selectedTicket.category}
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1">
                  Ticket {selectedTicket.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Subject:</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">
                  {selectedTicket.subject}
                </p>
              </div>

              <div>
                <span className="text-slate-500 font-medium">Submitted On:</span>
                <p className="font-semibold text-slate-700">{selectedTicket.date}</p>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Support Response:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedTicket.response}
                </p>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
