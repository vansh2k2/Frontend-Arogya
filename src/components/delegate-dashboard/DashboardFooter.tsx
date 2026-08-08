"use client";
import React from "react";
import Link from "next/link";

export const DashboardFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#E0D6C8] font-inter">
      <div className="px-6 md:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-700">
            &copy; 2026 <span className="text-[#d26019]">18th Arogya Sangosthi</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
