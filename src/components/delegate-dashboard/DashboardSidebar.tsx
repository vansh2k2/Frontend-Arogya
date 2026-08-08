"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  LayoutDashboard,
  Ticket,
  User,
  CreditCard,
  Download,
  Calendar,
  Mic,
  Users,
  MapPin,
  HelpCircle,
  Headphones,
  LogOut,
  X,
} from "lucide-react";
import { settingsApi, SERVER_URL } from "@/lib/api";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenSupport: () => void;
  onLogout: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onClose,
  onOpenSupport,
  onLogout,
}) => {
  const [logoUrl, setLogoUrl] = useState("/logo.png");

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
              return `${SERVER_URL}${u}`;
            }
            return `${SERVER_URL}${url}`;
          };
          const finalUrl = getImageUrl(settings?.adminLogo) || getImageUrl(settings?.websiteLogo) || getImageUrl(settings?.logo) || "/logo.png";
          setLogoUrl(finalUrl);
        }
      })
      .catch(() => {
        setLogoUrl("/logo.png");
      });
  }, []);

  const menuSections = [
    {
      label: null,
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
      ],
    },
    {
      label: "MY REGISTRATION",
      items: [
        { id: "pass-details", label: "My Pass Details", icon: Ticket },
        { id: "personal-info", label: "Personal Information", icon: User },
        { id: "payment-history", label: "Payment History", icon: CreditCard },
        { id: "download-pass", label: "Download Pass", icon: Download },
      ],
    },
    {
      label: "EVENT INFORMATION",
      items: [
        { id: "event-schedule", label: "Event Schedule", icon: Calendar },
        { id: "speakers", label: "Speakers", icon: Mic },
        { id: "partners", label: "Partners & Supporters", icon: Users },
        { id: "venue-info", label: "Venue Information", icon: MapPin },
        { id: "faqs", label: "FAQs", icon: HelpCircle },
      ],
    },
    {
      label: "SUPPORT & HELP",
      items: [
        { id: "support", label: "Contact Support", icon: Headphones },
      ],
    },
  ];

  const handleItemClick = (id: string) => {
    if (id === "support") {
      onOpenSupport();
    } else {
      setActiveTab(id);
    }
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background-color: #10b981; border-radius: 10px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; border-radius: 10px; }
      `}</style>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* ── Sidebar Container matching Admin Layout exactly ── */}
      <aside
        id="delegate-sidebar"
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-75 bg-[#052613] text-slate-300 flex flex-col justify-between border-r border-[#0d3b1e] transition-all duration-300 font-inter shadow-xl shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header - Matches Topbar Height (h-14) */}
        <div className="relative h-14 flex items-center justify-center border-b border-[#0d3b1e] shrink-0 bg-[#031d0e]">
          <div className="flex justify-center w-full px-4">
            <Link href="/" className="flex items-center justify-center">
              <img
                src={logoUrl}
                alt="Arogya Sangosthi"
                style={{
                  filter:
                    "drop-shadow(1px 0px 0 #ffffff) drop-shadow(-1px 0px 0 #ffffff) drop-shadow(0px 1px 0 #ffffff) drop-shadow(0px -1px 0 #ffffff) drop-shadow(0 0 3px rgba(255,255,255,0.8))",
                }}
                className="h-12 w-auto object-contain max-w-[200px]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </Link>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 p-1 rounded-lg bg-[#f97316] hover:bg-[#ea580c] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Menu Items Section */}
        <div className="h-[calc(100vh-140px)] overflow-y-auto sidebar-scroll p-2.5 space-y-0.5 text-[13px]">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="w-full">
              {section.label && (
                <p className="px-3 mt-1.5 mb-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-[#34d399]">
                  {section.label}
                </p>
              )}

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={`sb-item w-full flex items-center gap-3 px-3 py-1.5 rounded-[3px] border text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#0e4425] text-white border-emerald-400/80 font-semibold shadow-xs"
                        : "border-transparent text-slate-300 hover:bg-[#083818] hover:text-white"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-emerald-300" : "text-emerald-400"}
                    />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer with Logout Button & Version tag matching admin panel exactly */}
        <div className="sb-footer p-2 border-t border-[#0d3b1e] bg-inherit mt-auto shrink-0">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onLogout}
              className="w-full px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors cursor-pointer"
            >
              Logout
            </button>
            <span className="text-[10px] text-gray-400">
              v1.0.0 • Arogya Sangosthi
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
