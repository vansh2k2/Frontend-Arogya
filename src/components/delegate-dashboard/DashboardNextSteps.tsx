"use client";
import React from "react";
import { User, Calendar, Award, ChevronRight, Headphones } from "lucide-react";
import bleafIcon from "@/assets/icons/bleaf.png";

interface DashboardNextStepsProps {
  onOpenProfile: () => void;
  onOpenSchedule: () => void;
  onDownloadBadge: () => void;
  onOpenSupport: () => void;
}

export const DashboardNextSteps: React.FC<DashboardNextStepsProps> = ({
  onOpenProfile,
  onOpenSchedule,
  onDownloadBadge,
  onOpenSupport,
}) => {
  const steps = [
    {
      id: "profile",
      icon: User,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      title: "Complete Your Profile",
      description: "Add remaining details to complete your profile",
      onClick: onOpenProfile,
    },
    {
      id: "schedule",
      icon: Calendar,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      title: "View Event Schedule",
      description: "Check sessions and plan your agenda",
      onClick: onOpenSchedule,
    },
    {
      id: "badge",
      icon: Award,
      iconBg: "bg-red-50 text-red-500 border border-red-100",
      title: "Download Entry Badge",
      description: "Download your digital entry badge",
      onClick: onDownloadBadge,
    },
  ];

  return (
    <div className="space-y-4 font-inter">
      {/* ── Next Steps Card ── */}
      <div
        className="bg-white rounded-2xl p-5 sm:p-6 border border-transparent"
        style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
      >
        <div className="mb-3">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900">Next Steps</h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            Complete the following to make the most of your event experience.
          </p>
        </div>

        <div className="space-y-2.5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={step.onClick}
                className="w-full p-2.5 sm:p-3 flex items-center justify-between gap-3 text-left bg-white hover:bg-slate-50/80 rounded-xl transition-all group cursor-pointer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${step.iconBg}`}
                  >
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] sm:text-xs font-semibold text-emerald-700 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-[9.5px] text-black font-medium truncate mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  size={14}
                  className="text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Need Assistance? Dark Green Banner ── */}
      <div
        className="w-full bg-gradient-to-br from-[#042612] via-[#073819] to-[#042612] rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden shadow-md border border-emerald-800/60"
      >
        {/* Leaf Watermark */}
        <div className="absolute right-[-15px] bottom-[-15px] pointer-events-none w-[130px] h-[130px] opacity-20 z-0">
          <img
            src={(bleafIcon?.src || bleafIcon) as string}
            alt="Leaf decor"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
              <Headphones size={16} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Need Assistance?</h4>
              <p className="text-[11px] text-emerald-100/80 font-medium">
                We&apos;re here to help you with any queries.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenSupport}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-emerald-500/50 cursor-pointer shadow-sm"
          >
            <Headphones size={13} />
            <span>Contact Support &gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
