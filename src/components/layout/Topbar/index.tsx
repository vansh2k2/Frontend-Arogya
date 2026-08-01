"use client";
import React from "react";
import { Mail, Phone, User, Briefcase, Stethoscope } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api';

const Topbar = () => {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get
  });

  const emails = settings?.topbarEmails?.length > 0 ? settings.topbarEmails : ['info@arogyasangoshthi.com'];
  const phones = settings?.topbarPhones?.length > 0 ? settings.topbarPhones : ['+91 98765 43210'];

  return (
    <div className="topbar-root w-full py-1 relative z-[60]">

      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-col lg:flex-row items-center justify-between text-[11px] py-1.5 gap-2 lg:gap-0">

        {/* LEFT — Contact Info */}
        <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-6 text-white w-full lg:w-auto">
          {emails.map((email, idx) => (
            <React.Fragment key={`email-${idx}`}>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors duration-200 font-medium text-[10px] sm:text-[11px]"
              >
                <Mail size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>{email}</span>
              </a>
              {(idx < emails.length - 1 || phones.length > 0) && (
                <span className="w-px h-3 sm:h-4 bg-emerald-600/60"></span>
              )}
            </React.Fragment>
          ))}

          {phones.map((phone, idx) => (
            <React.Fragment key={`phone-${idx}`}>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors duration-200 font-medium text-[10px] sm:text-[11px]"
              >
                <Phone size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>{phone}</span>
              </a>
              {idx < phones.length - 1 && (
                <span className="w-px h-3 sm:h-4 bg-emerald-600/60"></span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* RIGHT — Responsive Buttons */}
        <div className="flex items-center justify-center lg:justify-end gap-1.5 sm:gap-3 flex-wrap w-full lg:w-auto relative z-[60] pointer-events-auto">

          {/* Delegate Registration */}
          <a
            href="/register-now"
            target="_blank"
            rel="noopener noreferrer"
            className="reg-btn border-emerald-500 text-white relative z-50 cursor-pointer pointer-events-auto"
          >
            <span className="bg-anim from-emerald-500 to-teal-500"></span>
            <span className="shine"></span>

            <span className="relative z-10 flex items-center gap-1">
              <User size={11} strokeWidth={2.3} />
              Delegate Registration
            </span>
          </a>

          {/* User Login */}
          <a
            href="/login"
            className="reg-btn border-white text-[#0a3558] relative z-50 cursor-pointer pointer-events-auto shadow-sm"
          >
            <span className="bg-anim from-white to-gray-100"></span>
            <span className="shine"></span>

            <span className="relative z-10 flex items-center gap-1">
              <User size={11} strokeWidth={2.3} />
              User Login
            </span>
          </a>

          {/* Corporate Registration */}
          {/* <a
            href="/corporate-registration"
            target="_blank"
            rel="noopener noreferrer"
            className="reg-btn border-blue-500 text-white relative z-50 cursor-pointer pointer-events-auto"
          >
            <span className="bg-anim from-blue-500 to-cyan-500"></span>
            <span className="shine"></span>

            <span className="relative z-10 flex items-center gap-1">
              <Briefcase size={11} strokeWidth={2.3} />
              Corporate Registration
            </span>
          </a> */}

          {/* Doctor Registration */}
          {/* <a
            href="/doctor-registration"
            target="_blank"
            rel="noopener noreferrer"
            className="reg-btn border-red-500 text-white relative z-50 cursor-pointer pointer-events-auto"
          >
            <span className="bg-anim from-red-500 to-orange-500"></span>
            <span className="shine"></span>

            <span className="relative z-10 flex items-center gap-1">
              <Stethoscope size={11} strokeWidth={2.3} />
              Doctor Registration
            </span>
          </a> */}
        </div>
      </div>

      <style>{`
        .topbar-root {
          background: linear-gradient(100deg, #0b3d2e 0%, #0f5240 40%, #0d4a6b 80%, #0a3558 100%);
          border-bottom: 1px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 2px 12px rgba(0,0,0,0.25), inset 0 -1px 0 rgba(212,175,55,0.2);
          position: relative;
        }

        .topbar-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 120px,
            rgba(212, 175, 55, 0.03) 120px,
            rgba(212, 175, 55, 0.03) 121px
          );
          pointer-events: none;
        }

        .reg-btn {
          position: relative;
          padding: 4px 8px;
          font-size: 0.62rem;
          font-weight: 600;
          border-radius: 5px;
          overflow: hidden;
          border-width: 1.5px;
          min-width: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-anim {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to));
          transform: translateX(-100%);
          animation: fillBg 0.8s ease-out forwards;
        }

        @keyframes fillBg {
          to {
            transform: translateX(0);
          }
        }

        .shine {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%);
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          animation: shineMove 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes shineMove {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(120%) translateY(120%) rotate(45deg);
          }
        }

        /* MOBILE RESPONSIVE FIX */
        @media (max-width: 640px) {
          .reg-btn {
            width: auto;
            flex: 1 1 auto;
            font-size: 0.55rem;
            padding: 4px 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default Topbar;
