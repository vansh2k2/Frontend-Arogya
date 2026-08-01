"use client";
import React, { useState } from "react";
import { User, Mail, Phone, Briefcase, Building2, Users, UploadCloud, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const GroupDelegateForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", fullName: "", email: "", mobile: "",
    designation: "", organization: "", country: "India",
    state: "", city: "", category: "", 
    groupSize: "5", // Group specific
    agreeTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-[#f7f7f7] rounded-2xl overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
      <div className="bg-[#012e17] px-6 py-2.5 border-b border-[#012e17]">
        <h2 className="text-white text-lg font-semibold flex items-center gap-2 font-inter uppercase tracking-wider">
          <User size={22} className="text-white" />
          Group Coordinator Details
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 flex flex-col gap-8">
        
        {/* Primary Contact Information */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 -ml-1 relative after:absolute after:bottom-0 after:left-1.5 after:w-12 after:h-[2.5px] after:bg-[#d18e26]">
            <div className="bg-[#f0f7f0] p-1.5 rounded-md text-[#2b5922]">
              <User size={18} />
            </div>
            <h3 className="font-bold text-[#113111] text-base uppercase tracking-wide font-inter">Primary Contact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">Title <span className="text-red-500">*</span></label>
              <select name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select</option>
                <option>Mr.</option><option>Ms.</option><option>Dr.</option><option>Prof.</option>
              </select>
            </div>
            <div className="md:col-span-9 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">Coordinator Full Name <span className="text-red-500">*</span></label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter full name" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold text-black">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Enter email address" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold text-black">Mobile Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <select className="border border-gray-300 border-r-0 rounded-l-sm px-2 py-2.5 text-sm bg-gray-100 text-gray-600 outline-none w-20">
                  <option>+91</option>
                </select>
                <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required placeholder="Enter mobile number" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold text-black">Designation <span className="text-red-500">*</span></label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="designation" value={formData.designation} onChange={handleChange} required placeholder="Enter designation" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold text-black">Organization / Institution <span className="text-red-500">*</span></label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="organization" value={formData.organization} onChange={handleChange} required placeholder="Enter organization name" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">Country <span className="text-red-500">*</span></label>
              <select name="country" value={formData.country} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option>India</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">State / Province <span className="text-red-500">*</span></label>
              <select name="state" value={formData.state} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select State</option>
                <option>Delhi</option><option>Maharashtra</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">City <span className="text-red-500">*</span></label>
              <select name="city" value={formData.city} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select City</option>
                <option>New Delhi</option><option>Mumbai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Group Size and Details */}
        <div className="flex flex-col gap-5 mt-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 -ml-1 relative after:absolute after:bottom-0 after:left-1.5 after:w-12 after:h-[2.5px] after:bg-[#d18e26]">
            <div className="bg-[#f0f7f0] p-1.5 rounded-md text-[#2b5922]">
              <Users size={18} />
            </div>
            <h3 className="font-bold text-[#113111] text-base uppercase tracking-wide">Group Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">Number of Delegates <span className="text-red-500">*</span></label>
              <select name="groupSize" value={formData.groupSize} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="5">5-10 Delegates</option>
                <option value="11">11-20 Delegates</option>
                <option value="21">21+ Delegates</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">Category <span className="text-red-500">*</span></label>
              <select name="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select Category</option>
                <option>Professional</option><option>Student</option><option>Corporate</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-xs font-bold text-black">Upload Group Members Excel/CSV <span className="text-red-500">*</span></label>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-[#f0f7f0] hover:border-[#2b5922] transition-colors cursor-pointer group">
              <div className="bg-white p-3 rounded-full shadow-sm text-gray-400 group-hover:text-[#2b5922] mb-3 transition-colors">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm text-gray-700 font-semibold mb-1">Click to upload delegate list</p>
              <p className="text-xs text-gray-500 mb-2">Excel or CSV format (max. 10MB)</p>
              <a href="#" className="text-xs text-[#2b5922] font-semibold underline">Download Template</a>
            </div>
          </div>
        </div>

        {/* Checkbox and Buttons */}
        <div className="flex items-start gap-3 mt-4 bg-[#f8fcf8] p-4 rounded-lg border border-[#e2f0e2]">
          <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 w-4 h-4 text-[#2b5922] border-gray-300 rounded focus:ring-[#2b5922]" />
          <p className="text-sm text-gray-700">
            I agree to the <a href="#" className="text-[#2b5922] font-semibold underline">Terms & Conditions</a> and <a href="#" className="text-[#2b5922] font-semibold underline">Privacy Policy</a> of the 18th Integrated Arogya Sangosthi.
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button type="button" onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-800 font-semibold text-sm transition-colors">
            &larr; Back to Home
          </button>
          <button type="submit" className="bg-[#2b5922] hover:bg-[#1a3d14] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group">
            Submit Group Registration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </form>
    </div>
  );
};

export default GroupDelegateForm;


