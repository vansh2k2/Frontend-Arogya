"use client";
import React, { useState } from "react";
import { User, Mail, Briefcase, Building2, ShieldCheck, UploadCloud, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import leafRightImg from "../../assets/icons/leafright.png";

const SingleDelegateForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", fullName: "", email: "", mobile: "",
    designation: "", organization: "", country: "India",
    state: "", city: "", category: "", isSpeaker: "",
    specialization: "", dietary: "", assistance: "",
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
    <motion.div 
      initial={{ opacity: 0, rotateY: -78, x: -50, scale: 0.92 }}
      whileInView={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#f9fbfb] rounded-2xl overflow-hidden relative" 
      style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', perspective: '1000px' }}
    >
      {/* Shimmer sweep */}
      <motion.div
        initial={{ x: "-120%" }}
        whileInView={{ x: "220%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
      />
      <div className="bg-[#012e17] px-6 py-2.5 border-b border-[#012e17]">
        <h2 className="text-white text-lg font-semibold flex items-center gap-2 font-inter uppercase tracking-wider">
          <User size={22} className="text-white" />
          Delegate Information
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 flex flex-col gap-8">
        
        {/* Personal Information */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-start border-b border-gray-100 pb-2 -ml-1 relative after:absolute after:bottom-0 after:left-1.5 after:w-12 after:h-[2.5px] after:bg-[#d18e26]">
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-[#f0f7f0] p-1.5 rounded-md text-[#2b5922]">
                <User size={18} />
              </div>
              <h3 className="font-bold text-[#113111] text-base uppercase tracking-wide font-inter">Personal Information</h3>
            </div>
            
            <motion.img 
              src={leafRightImg.src} 
              alt="Leaf Right" 
              initial={{ opacity: 0, x: 50, y: -90, rotateZ: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 25, y: -5, rotateZ: 0, scale: 2.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, mass: 0.9, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-14 w-auto object-contain origin-right" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Title <span className="text-red-500">*</span></label>
              <select name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select</option>
                <option>Mr.</option><option>Ms.</option><option>Dr.</option><option>Prof.</option>
              </select>
            </div>
            <div className="md:col-span-9 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Full Name <span className="text-red-500">*</span></label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-black">Email Address <span className="text-red-500">*</span></label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email address" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-black">Mobile Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <select className="border border-gray-300 border-r-0 rounded-l-sm px-2 py-2.5 text-sm bg-gray-100 text-gray-600 outline-none w-20">
                  <option>+91</option>
                </select>
                <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required placeholder="Enter your mobile number" className="w-full border border-gray-300 rounded-r-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-black">Designation <span className="text-red-500">*</span></label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="designation" value={formData.designation} onChange={handleChange} required placeholder="Enter your designation" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-black">Organization / Institution <span className="text-red-500">*</span></label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="organization" value={formData.organization} onChange={handleChange} required placeholder="Enter organization name" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Country <span className="text-red-500">*</span></label>
              <select name="country" value={formData.country} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option>India</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">State / Province <span className="text-red-500">*</span></label>
              <select name="state" value={formData.state} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select State</option>
                <option>Delhi</option><option>Maharashtra</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">City <span className="text-red-500">*</span></label>
              <select name="city" value={formData.city} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select City</option>
                <option>New Delhi</option><option>Mumbai</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="flex flex-col gap-5 mt-0">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 -ml-1 relative after:absolute after:bottom-0 after:left-1.5 after:w-12 after:h-[2.5px] after:bg-[#d18e26]">
            <div className="bg-[#f0f7f0] p-1.5 rounded-md text-[#2b5922]">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-[#113111] text-base uppercase tracking-wide">Additional Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Category <span className="text-red-500">*</span></label>
              <select name="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select Category</option>
                <option>Professional</option><option>Student</option><option>Researcher</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Are you a speaker? <span className="text-red-500">*</span></label>
              <select name="isSpeaker" value={formData.isSpeaker} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select Option</option>
                <option>Yes</option><option>No</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-semibold text-black">Specialization / Area of Interest</label>
            <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="E.g., Ayurveda, Yoga, Naturopathy" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Dietary Preference</label>
              <select name="dietary" value={formData.dietary} onChange={handleChange} className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select Preference</option>
                <option>Vegetarian</option><option>Vegan</option><option>Non-Vegetarian</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Any Assistance Required?</label>
              <input name="assistance" value={formData.assistance} onChange={handleChange} placeholder="E.g., Wheelchair access" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-xs font-semibold text-black">Upload Document (ID Proof / Student ID) <span className="text-red-500">*</span></label>
            <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-[#f0f7f0] hover:border-[#2b5922] transition-colors cursor-pointer group">
              <div className="bg-white p-3 rounded-full shadow-sm text-gray-400 group-hover:text-[#2b5922] mb-3 transition-colors">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm text-gray-700 font-semibold mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</p>
            </div>
          </div>
        </div>

        {/* Checkbox and Buttons */}
        <div className="flex items-start gap-3 mt-0 bg-[#f8fcf8] p-4 rounded-lg border border-[#e2f0e2]">
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
            Submit Registration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </form>
    </motion.div>
  );
};

export default SingleDelegateForm;


