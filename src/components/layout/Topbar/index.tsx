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

          {/* Delegates Login Circle Expansion Button */}
          <a
            href="/login"
            className="delegate-circle-fill-btn relative z-50 cursor-pointer pointer-events-auto"
          >
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
            <span className="text">Delegates Login</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              ></path>
            </svg>
          </a>

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

        /* CIRCLE EXPANSION DELEGATES LOGIN BUTTON (GOLDEN THEME) */
        .delegate-circle-fill-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 22px;
          border: 2px solid transparent;
          font-size: 0.62rem;
          background-color: transparent;
          border-radius: 100px;
          font-weight: 700;
          color: #ffd700;
          box-shadow: 0 0 0 1.5px #ffd700;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          text-decoration: none;
          white-space: nowrap;
        }

        .delegate-circle-fill-btn svg {
          position: absolute;
          width: 12px;
          height: 12px;
          fill: #ffd700;
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .delegate-circle-fill-btn .arr-1 {
          right: 8px;
        }

        .delegate-circle-fill-btn .arr-2 {
          left: -35%;
        }

        .delegate-circle-fill-btn .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background-color: #ffd700;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .delegate-circle-fill-btn .text {
          position: relative;
          z-index: 1;
          transform: translateX(-6px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .delegate-circle-fill-btn:hover {
          box-shadow: 0 0 0 12px transparent;
          color: #0b251a;
          border-radius: 6px;
        }

        .delegate-circle-fill-btn:hover .arr-1 {
          right: -35%;
        }

        .delegate-circle-fill-btn:hover .arr-2 {
          left: 8px;
        }

        .delegate-circle-fill-btn:hover .text {
          transform: translateX(6px);
        }

        .delegate-circle-fill-btn:hover svg {
          fill: #0b251a;
        }

        .delegate-circle-fill-btn:active {
          scale: 0.95;
          box-shadow: 0 0 0 3px #ffd700;
        }

        .delegate-circle-fill-btn:hover .circle {
          width: 160px;
          height: 160px;
          opacity: 1;
        }

        /* MOBILE RESPONSIVE FIX */
        @media (max-width: 640px) {
          .reg-btn, .delegate-circle-fill-btn {
            width: auto;
            flex: 1 1 auto;
            font-size: 0.55rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Topbar;

