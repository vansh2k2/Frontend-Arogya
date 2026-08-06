import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import delecard from "@/assets/banner/dele1card.webp";
import p1Leaf from "@/assets/icons/P1.png";
import m1 from "@/assets/icons/m1.png";
import m2 from "@/assets/icons/m2.png";
import m3 from "@/assets/icons/m3.png";
import m4 from "@/assets/icons/m4.png";
import m5 from "@/assets/icons/m5.png";
import {
  CalendarDays, GraduationCap, Stethoscope, Presentation, LayoutTemplate,
  Award, Users, Globe, MessageSquare, Utensils, Calendar, MapPin
} from "lucide-react";

const CARD_STYLES = [
  {
    icon: <CalendarDays className="w-5 h-5" style={{ color: "#185FA5" }} />,
    gradient: "linear-gradient(160deg, #e8f4ff 0%, #ffffff 55%, #f0f8ff 100%)",
    borderColor: "#bdd8f5",
    shadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
    hoverShadow: "0 12px 36px 0 rgba(24,95,165,0.22), 0 3px 10px 0 rgba(24,95,165,0.12)",
    textColor: "#185FA5",
    btnGradient: "linear-gradient(135deg, #3d8fd6, #185FA5)",
    accentLine: "#185FA5",
  },
  {
    icon: <CalendarDays className="w-5 h-5" style={{ color: "#534AB7" }} />,
    gradient: "linear-gradient(160deg, #efedff 0%, #ffffff 55%, #f5f2ff 100%)",
    borderColor: "#cdc7f5",
    shadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
    hoverShadow: "0 12px 36px 0 rgba(83,74,183,0.22), 0 3px 10px 0 rgba(83,74,183,0.12)",
    textColor: "#534AB7",
    btnGradient: "linear-gradient(135deg, #8f88e0, #534AB7)",
    accentLine: "#534AB7",
  },
  {
    icon: <Presentation className="w-5 h-5" style={{ color: "#993556" }} />,
    gradient: "linear-gradient(160deg, #ffeef4 0%, #ffffff 55%, #fff4f7 100%)",
    borderColor: "#f4a8c5",
    shadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
    hoverShadow: "0 12px 36px 0 rgba(153,53,86,0.22), 0 3px 10px 0 rgba(153,53,86,0.12)",
    textColor: "#993556",
    btnGradient: "linear-gradient(135deg, #e5749a, #993556)",
    accentLine: "#993556",
  },
  {
    icon: <LayoutTemplate className="w-5 h-5" style={{ color: "#3B6D11" }} />,
    gradient: "linear-gradient(160deg, #edf7e1 0%, #ffffff 55%, #f2faea 100%)",
    borderColor: "#a5d96a",
    shadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
    hoverShadow: "0 12px 36px 0 rgba(59,109,17,0.22), 0 3px 10px 0 rgba(59,109,17,0.12)",
    textColor: "#3B6D11",
    btnGradient: "linear-gradient(135deg, #85cc50, #3B6D11)",
    accentLine: "#3B6D11",
  },
];

const bandItems = [
  { icon: m1, text: "CERTIFICATE\nOF PARTICIPATION" },
  { icon: m2, text: "NETWORK WITH\nEXPERTS" },
  { icon: m3, text: "ACCESS TO INTERNATIONAL\nHEALTH & WELLNESS EXPO" },
  { icon: m4, text: "KNOWLEDGE SESSIONS\n& PANEL DISCUSSIONS" },
  { icon: m5, text: "LUNCH INCLUDED\n(AS PER CATEGORY)" },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
};

const DEFAULT_CARDS = [
  {
    title: "DELEGATE\nPASS",
    planName: "DELEGATE PASS",
    price: "₹1,500",
    features: ["Full-day Access", "Lunch & Refreshments", "Conference Kit"],
    ...CARD_STYLES[0]
  },
  {
    title: "DELEGATE\nPASS",
    planName: "DELEGATE PASS",
    price: "₹3,000",
    features: ["All 3 Days Access", "Lunch & Refreshments", "Premium Conference Kit"],
    badge: "★ MOST POPULAR ★",
    badgeBg: "linear-gradient(90deg, #d4537e, #b03060)",
    ...CARD_STYLES[1]
  },
  {
    title: "PAPER\nPRESENTATION",
    planName: "PAPER PRESENTATION",
    price: "₹2,500",
    features: ["Presentation Slot", "Delegate Access included", "Publication Opportunity"],
    ...CARD_STYLES[2]
  },
  {
    title: "POSTER\nPRESENTATION",
    planName: "POSTER PRESENTATION",
    price: "₹2,500",
    features: ["Poster Display Area", "Delegate Access included", "Special Recognition"],
    ...CARD_STYLES[3]
  }
];

const RegistrationFees = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [sectionRef, sectionInView] = useInView(0.1);
  const [passesList, setPassesList] = useState<any[]>(DEFAULT_CARDS);
  const router = useRouter();

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
        const res = await fetch(`${apiUrl}/delegate-passes`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((p: any, idx: number) => {
            const style = CARD_STYLES[idx % CARD_STYLES.length];
            return {
              title: p.name.includes('\n') ? p.name : p.name.replace(' ', '\n'),
              planName: p.name,
              price: `₹${Number(p.price).toLocaleString('en-IN')}`,
              features: p.includes && p.includes.length > 0 ? p.includes : ["Delegate Access", "Lunch & Refreshments"],
              badge: p.isMostPopular ? "★ MOST POPULAR ★" : null,
              badgeBg: p.isMostPopular ? "linear-gradient(90deg, #d4537e, #b03060)" : null,
              ...style
            };
          });
          setPassesList(mapped);
        }
      } catch (err) {
        console.error("Error fetching dynamic passes:", err);
      }
    };
    fetchPasses();
  }, []);

  return (
    <>
      <style>{`
        /* Heading gradient */
        .heading-delegate {
          color: #133513;
        }
        .heading-registration {
          color: #519B3E;
        }

        /* Card top accent bar */
        .card-accent-bar {
          position: absolute;
          top: 0;
          left: 16px;
          right: 16px;
          height: 3px;
          border-radius: 0 0 4px 4px;
          opacity: 0.7;
        }

        /* === ANIMATIONS === */

        /* Heading: letters slide up from below, staggered */
        @keyframes letterRise {
          0%   { opacity: 0; transform: translateY(28px) skewY(4deg); }
          60%  { opacity: 1; transform: translateY(-3px) skewY(-1deg); }
          100% { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        .letter-animate {
          display: inline-block;
          opacity: 0;
        }
        .letter-animate.go {
          animation: letterRise 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Subtitle: wipe in from left */
        @keyframes wipeLeft {
          0%   { opacity: 0; clip-path: inset(0 100% 0 0); }
          100% { opacity: 1; clip-path: inset(0 0% 0 0); }
        }
        .subtitle-animate {
          opacity: 0;
        }
        .subtitle-animate.go {
          animation: wipeLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Date bar: slide down */
        @keyframes slideDown {
          0%   { opacity: 0; transform: translateY(-18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .datebar-animate {
          opacity: 0;
        }
        .datebar-animate.go {
          animation: slideDown 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Divider line: expand from center */
        @keyframes expandLine {
          0%   { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        .divider-animate {
          opacity: 0;
          transform-origin: center;
        }
        .divider-animate.go {
          animation: expandLine 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Cards: flip in from slight perspective tilt */
        @keyframes cardFlipIn {
          0%   { opacity: 0; transform: perspective(600px) rotateX(18deg) translateY(30px); }
          70%  { opacity: 1; transform: perspective(600px) rotateX(-3deg) translateY(-4px); }
          100% { opacity: 1; transform: perspective(600px) rotateX(0deg) translateY(0); }
        }
        .card-animate {
          opacity: 0;
        }
        .card-animate.go {
          animation: cardFlipIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Bottom band: cool elastic pop in */
        @keyframes coolBandReveal {
          0% {
            opacity: 0;
            transform: perspective(800px) translateY(60px) scale(0.85) rotateX(25deg);
          }
          50% {
            opacity: 1;
            transform: perspective(800px) translateY(-10px) scale(1.02) rotateX(-8deg);
          }
          75% {
            transform: perspective(800px) translateY(4px) scale(0.98) rotateX(4deg);
          }
          100% {
            opacity: 1;
            transform: perspective(800px) translateY(0) scale(1) rotateX(0deg);
          }
        }
        .band-animate {
          opacity: 0;
          transform-origin: center top;
        }
        .band-animate.go {
          animation: coolBandReveal 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* Price shimmer on hover */
        @keyframes priceShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .price-shimmer {
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hovered .price-shimmer {
          animation: priceShimmer 1.2s linear infinite;
        }
      `}</style>

      <div
        id="registration-fees"
        ref={sectionRef}
        className="w-full relative overflow-hidden bg-gray-50 flex items-center justify-center font-inter pt-10 pb-16"
      >
        <img
          src={(delecard?.src || delecard) as string}
          alt="Delegate Card Background"
          className="absolute top-0 left-0 w-full h-[550px] object-fill object-top z-0"
        />

        <div className="w-full max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

          {/* Header Section */}
          <div className="text-center mb-8 flex flex-col items-center">

            {/* Heading with letter-by-letter animation */}
            <h2
              className="text-4xl md:text-5xl font-black tracking-wider uppercase mb-2 font-inter ml-8 md:ml-16 -mt-6 transform scale-y-[0.9]"
            >
              {"DELEGATE".split("").map((ch, i) => (
                <span
                  key={i}
                  className={`letter-animate heading-delegate${sectionInView ? " go" : ""}`}
                  style={{ animationDelay: `${i * 0.045}s` }}
                >
                  {ch}
                </span>
              ))}
              <span> </span>
              {"REGISTRATION".split("").map((ch, i) => (
                <span
                  key={i}
                  className={`letter-animate heading-registration${sectionInView ? " go" : ""}`}
                  style={{ animationDelay: `${(i + 9) * 0.045}s` }}
                >
                  {ch}
                </span>
              ))}
            </h2>

            {/* Subtitle wipe */}
            <div
              className={`flex items-center justify-center gap-2 mb-4 subtitle-animate${sectionInView ? " go" : ""}`}
              style={{ animationDelay: "0.85s" }}
            >
              <img src={(p1Leaf?.src || p1Leaf) as string} alt="leaf" className="w-6 h-6 object-contain -rotate-12" />
              <span
                className="text-2xl md:text-[28px] text-green-900 font-bold"
                style={{ fontFamily: 'var(--font-dancing-script, "Dancing Script"), cursive' }}
              >
                18th Integrated Arogya Sanghosthi
              </span>
              <img src={(p1Leaf?.src || p1Leaf) as string} alt="leaf" className="w-6 h-6 object-contain rotate-12" />
            </div>

            {/* Date bar slide down */}
            <div
              className={`bg-[#012a2c] text-white px-6 py-2 rounded-full flex flex-wrap items-center justify-center gap-4 text-sm font-medium shadow-md datebar-animate${sectionInView ? " go" : ""}`}
              style={{ animationDelay: "1.05s" }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <span>21 - 23 AUGUST 2026</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white"></div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white" />
                <span>PRAGATI MAIDAN, NEW DELHI</span>
              </div>
            </div>
          </div>

          {/* Section divider — expand from center */}
          <div
            className={`flex items-center justify-center gap-4 mb-4 w-full max-w-lg mx-auto -mt-6 divider-animate${sectionInView ? " go" : ""}`}
            style={{ animationDelay: "1.2s" }}
          >
            <div className="h-px bg-[#022c2a] flex-1"></div>
            <div className="flex items-center gap-2 text-[#022c2a] font-bold tracking-wider text-sm">
              <span>⟷</span>
              REGISTRATION FEES
              <span>⟷</span>
            </div>
            <div className="h-px bg-[#022c2a] flex-1"></div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-full max-w-[850px] mx-auto md:translate-x-10 lg:translate-x-16 -mt-2">
            {passesList.map((card, idx) => (
              <div
                key={idx}
                className={`card-animate${sectionInView ? " go" : ""}${hoveredIdx === idx ? " card-hovered" : ""} rounded-2xl flex flex-col items-center relative pt-3 pb-3`}
                style={{
                  background: card.gradient,
                  border: `1px solid ${hoveredIdx === idx ? card.accentLine + "55" : card.borderColor}`,
                  boxShadow: hoveredIdx === idx ? card.hoverShadow : card.shadow,
                  transform: hoveredIdx === idx ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
                  transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease, border-color 0.2s ease",
                  animationDelay: `${1.3 + idx * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Top accent bar */}
                <div
                  className="card-accent-bar"
                  style={{ background: card.btnGradient }}
                />

                {/* Badge */}
                {card.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold text-white px-3 py-1 rounded-full z-20"
                    style={{ background: card.badgeBg }}
                  >
                    {card.badge}
                  </div>
                )}

                {/* Title */}
                <h3
                  className="font-bold text-[10px] leading-tight whitespace-pre-line text-center uppercase mb-1.5 tracking-wide px-2 mt-0.5"
                  style={{ color: card.textColor }}
                >
                  {card.title}
                </h3>

                {/* Icon Circle */}
                <div
                  className="w-11 h-11 bg-white rounded-full flex items-center justify-center mb-1.5"
                  style={{
                    boxShadow: hoveredIdx === idx
                      ? `0 3px 12px 0 ${card.accentLine}33`
                      : "0 1px 6px rgba(0,0,0,0.10)",
                    transition: "box-shadow 0.25s ease",
                  }}
                >
                  {card.icon}
                </div>

                {/* Price */}
                <div
                  className="text-[22px] font-extrabold mb-1.5 tracking-tight price-shimmer"
                  style={{
                    backgroundImage: hoveredIdx === idx
                      ? `linear-gradient(90deg, ${card.textColor}, ${card.accentLine}bb, ${card.textColor})`
                      : `linear-gradient(90deg, ${card.textColor}, ${card.textColor})`,
                  }}
                >
                  {card.price}
                </div>

                {/* Includes Divider */}
                <div className="flex items-center w-full px-3 mb-2">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-[8.5px] text-gray-800 px-2 font-bold uppercase tracking-widest">
                    Includes
                  </span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-1 mb-3 w-full px-4 text-left">
                  {card.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="text-[9.5px] text-gray-900 font-medium flex items-start gap-1.5"
                    >
                      <span
                        className="text-[9px] mt-0.5 font-bold"
                        style={{ color: card.accentLine }}
                      >
                        ✓
                      </span>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="mt-auto w-full px-3">
                  <button
                    onClick={() => router.push("/register-now", { state: { planName: card.planName || card.title.replace('\n', ' '), price: card.price } })}
                    className="w-full py-2 rounded-full text-white text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 active:scale-95"
                    style={{
                      background: card.btnGradient,
                      boxShadow: hoveredIdx === idx
                        ? `0 5px 16px 0 ${card.accentLine}50`
                        : "0 3px 10px rgba(0,0,0,0.15)",
                      transition: "box-shadow 0.25s ease, transform 0.15s ease",
                      transform: hoveredIdx === idx ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    Register Now →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Band */}
          <div
            className={`bg-white relative z-20 rounded-xl shadow-lg py-3 px-6 w-full max-w-5xl flex flex-wrap lg:flex-nowrap items-end justify-between gap-4 -mt-1 md:-mt-2 ml-16 md:ml-40 band-animate${sectionInView ? " go" : ""}`}
            style={{ animationDelay: "1.2s" }}
          >
            {bandItems.map((item, idx) => (
              <div key={idx} className="flex items-end gap-3 w-[45%] lg:w-auto shrink-0">
                <img src={(item.icon?.src || item.icon) as string} alt="icon" className="w-10 h-10 object-contain shrink-0" />
                <span className="text-[10px] font-bold text-black whitespace-pre-line leading-tight pb-1">
                  {item.text}
                </span>
                {idx !== bandItems.length - 1 && (
                  <div className="hidden lg:block w-px h-8 bg-gray-200 ml-4 mb-1"></div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default RegistrationFees;
