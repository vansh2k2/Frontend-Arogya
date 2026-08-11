"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardTopBar,
  DashboardSidebar,
  DashboardWelcomeBanner,
  DashboardQuickMetrics,
  DashboardDigitalPass,
  DashboardNextSteps,
  DashboardModals,
  DashboardFooter,
  MyPassDetailsContent,
  PersonalInfoContent,
  PaymentHistoryContent,
  ContactSupportContent,
  VenueInformationContent,
  PaymentReceiptContent,
} from "@/components/delegate-dashboard";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import Swal from "sweetalert2";

export default function DelegateDashboardPage() {
  const router = useRouter();
  const [delegate, setDelegate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreshProfile = async () => {
      try {
        const storedUserStr = localStorage.getItem("arogya_delegate_user");
        if (!storedUserStr) {
          router.push("/login");
          return;
        }

        const initialUser = JSON.parse(storedUserStr);
        setDelegate(initialUser);

        // Fetch fresh profile from backend if identifier available
        const identifier = initialUser.delegateId || initialUser.email || initialUser.mobile;
        if (identifier) {
          const res = await fetch(`${API_URL}/delegates-registration/profile/${encodeURIComponent(identifier)}`);
          const data = await res.json();
          if (data.success && data.data) {
            setDelegate(data.data);
            localStorage.setItem("arogya_delegate_user", JSON.stringify(data.data));
          }
        }
      } catch (err: any) {
        console.error("Error loading delegate profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreshProfile();
  }, [router]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to log out of the portal?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout"
    });

    if (result.isConfirmed) {
      localStorage.removeItem("arogya_delegate_user");
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been safely logged out.",
        timer: 1200,
        showConfirmButton: false
      }).then(() => {
        router.push("/login");
      });
    }
  };

  const handlePrintBadge = () => {
    setActiveModal(null);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleSidebarTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "event-schedule") {
      setActiveModal("schedule");
    } else if (tabId === "download-pass") {
      setActiveModal("badge");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 font-inter">
        <Loader2 size={38} className="animate-spin text-emerald-700 mb-3" />
        <p className="text-sm font-bold text-slate-800">Loading your Delegate Portal...</p>
      </div>
    );
  }

  if (!delegate) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center font-inter">
        <AlertCircle size={48} className="text-red-500 mb-3" />
        <h2 className="text-2xl font-extrabold text-slate-900">No Active Session Found</h2>
        <p className="text-sm text-slate-600 mt-1.5 max-w-sm font-medium">
          Please log in with your registered email or mobile number to view your delegate dashboard.
        </p>
        <Link
          href="/login"
          className="mt-5 px-6 py-3 rounded-xl bg-[#052613] hover:bg-[#083a1d] text-white text-xs font-extrabold shadow-md transition-all uppercase tracking-wider"
        >
          Go to Login Page
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] flex font-inter text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── Left Sidebar (Dark Luxury Forest Green) ── */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={handleSidebarTabClick}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenSupport={() => setActiveTab("support")}
        onLogout={handleLogout}
      />

      {/* ── Main Layout Column ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bars */}
        <DashboardTopBar
          delegate={delegate}
          onLogout={handleLogout}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenModal={(modal) => {
            if (modal === "profile") {
              setActiveTab("personal-info");
            } else {
              setActiveModal(modal);
            }
          }}
        />

        {/* Dashboard Main Content Body */}
        <main className="flex-1 px-3 py-1 sm:px-4 sm:py-2 lg:px-4 lg:py-2 w-full overflow-hidden">
          <div className="bg-white shadow-md p-4 sm:p-6 min-h-screen">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
              {/* Welcome Banner */}
              <DashboardWelcomeBanner delegate={delegate} />

              {/* 4 Quick Stat Metric Cards */}
              <DashboardQuickMetrics delegate={delegate} />

              {/* Two-Column Grid: My Pass (Left) & Next Steps (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Digital Pass */}
                <div className="lg:col-span-7 xl:col-span-7">
                  <DashboardDigitalPass
                    delegate={delegate}
                    onDownloadPass={() => setActiveModal("badge")}
                  />
                </div>

                {/* Right Column: Next Steps & Assistance */}
                <div className="lg:col-span-5 xl:col-span-5">
                  <DashboardNextSteps
                    onOpenProfile={() => setActiveTab("personal-info")}
                    onOpenSchedule={() => setActiveModal("schedule")}
                    onDownloadBadge={() => setActiveModal("badge")}
                    onOpenSupport={() => setActiveTab("support")}
                  />
                </div>
              </div>
              </div>
            )}

          {activeTab === "pass-details" && (
            <MyPassDetailsContent
              delegate={delegate}
              onDownloadPass={() => setActiveModal("badge")}
            />
          )}

          {activeTab === "personal-info" && (
            <PersonalInfoContent delegate={delegate} />
          )}

          {activeTab === "payment-history" && (
            <PaymentHistoryContent
              delegate={delegate}
              onOpenSupport={() => setActiveTab("support")}
              onDownloadReceipt={() => setActiveTab("receipt")}
            />
          )}

          {activeTab === "receipt" && (
            <PaymentReceiptContent
              delegate={delegate}
              onBack={() => setActiveTab("payment-history")}
            />
          )}

          {activeTab === "support" && (
            <ContactSupportContent delegate={delegate} />
          )}

          {(activeTab === "venue-info" || activeTab === "venue") && (
            <VenueInformationContent delegate={delegate} />
          )}
          </div>
        </main>

        {/* Portal Footer */}
        <DashboardFooter />
      </div>

      {/* Modals & Dialogs */}
      <DashboardModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        delegate={delegate}
        onPrintBadge={handlePrintBadge}
      />
    </div>
  );
}
