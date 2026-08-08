"use client";
import React from "react";
import { User, Mail, Phone, Building2, Briefcase, Tag, Globe, MapPin, Utensils, Award, FileText, CheckCircle2, ShieldAlert } from "lucide-react";

interface ProfileDetailsCardProps {
  delegate: any;
}

export const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({ delegate }) => {
  if (!delegate) return null;

  const infoFields = [
    { label: "Full Name", value: `${delegate.title ? delegate.title + " " : ""}${delegate.fullName || "N/A"}`, icon: User },
    { label: "Email Address", value: delegate.email || "N/A", icon: Mail },
    { label: "Mobile / WhatsApp", value: delegate.mobile || delegate.whatsappNumber || "N/A", icon: Phone },
    { label: "Organization / Institution", value: delegate.organization || "N/A", icon: Building2 },
    { label: "Designation", value: delegate.designation || "N/A", icon: Briefcase },
    { label: "Category", value: delegate.category || "General Delegate", icon: Tag },
    { label: "Specialization", value: delegate.specialization || "N/A", icon: Award },
    { label: "Country", value: delegate.country || "India", icon: Globe },
    { label: "State & City", value: `${delegate.city || "N/A"}${delegate.state ? `, ${delegate.state}` : ""}`, icon: MapPin },
    { label: "Dietary Preference", value: delegate.dietary || "Standard", icon: Utensils },
    { label: "Special Assistance", value: delegate.assistance || "None", icon: ShieldAlert },
    { label: "Interested in Speaking", value: delegate.isSpeaker === "yes" || delegate.isSpeaker === true ? "Yes" : "No", icon: CheckCircle2 },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md font-inter">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-extrabold text-[#143111] flex items-center gap-2">
            <User className="text-[#36682e]" size={20} />
            Delegate Personal & Registration Details
          </h2>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            Information submitted during delegate registration process
          </p>
        </div>
        <span className="text-xs px-3 py-1 bg-[#eaf3ea] text-[#36682e] border border-[#c4e3c4] rounded-full font-bold">
          Verified Participant
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infoFields.map((field, idx) => {
          const IconComponent = field.icon;
          return (
            <div
              key={idx}
              className="bg-[#f7f8f2] p-3.5 rounded-xl border border-gray-200/80 hover:border-[#36682e]/40 transition-all"
            >
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1 uppercase tracking-wider">
                <IconComponent size={14} className="text-[#36682e] shrink-0" />
                <span>{field.label}</span>
              </div>
              <p className="text-sm font-bold text-gray-900 truncate">
                {field.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Uploaded Document Section if available */}
      {delegate.documentUrl && (
        <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#eaf3ea] p-4 rounded-xl border border-[#c4e3c4]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#36682e] text-white rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-gray-900">Uploaded Document Proof</h4>
              <p className="text-[11px] text-gray-600">ID / Student card submitted during registration</p>
            </div>
          </div>

          <a
            href={delegate.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#36682e] hover:bg-[#285023] text-white font-bold text-xs rounded-lg transition-all shadow flex items-center gap-1.5 uppercase"
          >
            View Document
          </a>
        </div>
      )}
    </div>
  );
};
