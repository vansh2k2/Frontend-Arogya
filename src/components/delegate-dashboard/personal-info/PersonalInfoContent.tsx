import React, { useState } from "react";
import { 
  User, Mail, Phone, Briefcase, Building, Globe, MapPin, Tag, 
  Mic, Star, Leaf, HelpCircle, Edit, Info
} from "lucide-react";

interface PersonalInfoContentProps {
  delegate: any;
}

export const PersonalInfoContent: React.FC<PersonalInfoContentProps> = ({ delegate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const InfoField = ({ icon: Icon, label, value, required = false }: any) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-black">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={14} />
        </div>
        <input 
          type="text" 
          value={value || ""} 
          readOnly={!isEditing}
          className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-none text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 font-inter w-full max-w-6xl mx-auto">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
        <div className="flex-1">
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-semibold font-poppins text-[#0A2947] uppercase tracking-tight mb-1">
              PERSONAL INFORMATION
            </h1>
            <div className="h-[2px] w-full bg-[#28396C] mb-1"></div>
          </div>
          <p className="text-gray-500 mt-2 font-medium italic text-xs">
            Manage your personal details used for registration and event communication.
          </p>
        </div>
      </div>

      {/* ── Main Form Section ── */}
      <div 
        className="bg-white p-5 sm:p-7 mt-4"
        style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-slate-800">Personal Information</h2>
            <div className="h-[3px] w-12 bg-emerald-600 mt-1 rounded-full"></div>
          </div>
          
          <button 
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors text-xs font-semibold shadow-sm"
          >
            <Edit size={14} />
            {isEditing ? "Cancel Editing" : "Edit Information"}
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5">
          {/* Row 1 */}
          <InfoField icon={User} label="Title" value={delegate?.title || "Mr."} required />
          <InfoField icon={User} label="Full Name" value={delegate?.fullName || delegate?.name || "Vansh Chaudhary"} required />
          <InfoField icon={Mail} label="Email Address" value={delegate?.email || "vansh.2002vc@gmail.com"} required />
          <InfoField icon={Phone} label="Mobile Number" value={delegate?.mobile || "+91 8076750278"} required />

          {/* Row 2 */}
          <InfoField icon={Briefcase} label="Designation" value={delegate?.designation || "Software Developer"} required />
          <InfoField icon={Building} label="Organization / Institution" value={delegate?.organization || "Design House Private Ltd"} required />
          <InfoField icon={Globe} label="Country" value={delegate?.country || "India"} required />
          <InfoField icon={MapPin} label="State / Province" value={delegate?.state || "Haryana"} required />

          {/* Row 3 */}
          <InfoField icon={MapPin} label="City" value={delegate?.city || "Ballabgarh"} required />
          <InfoField icon={Tag} label="Category" value={delegate?.category || "Delegate"} required />
          <InfoField icon={Mic} label="Are you a speaker?" value={delegate?.isSpeaker ? "Yes" : "No"} required />
          <InfoField icon={Star} label="Specialization / Area of Interest" value={delegate?.specialization || "Ayurveda"} />

          {/* Row 4 */}
          <InfoField icon={Leaf} label="Dietary Preference" value={delegate?.diet || "Vegetarian"} />
          <InfoField icon={HelpCircle} label="Any Assistance Required?" value={delegate?.assistance || "None"} />
        </div>

        {/* Info Banner */}
        <div className="mt-7 flex items-center gap-3 bg-emerald-50/80 border border-emerald-100 rounded-lg p-3.5 text-emerald-800">
          <Info size={16} className="text-emerald-600 shrink-0" />
          <p className="text-[11px] font-medium">
            Ensure your details are correct. These details will be used for all event related communication.
          </p>
        </div>
      </div>
    </div>
  );
};
