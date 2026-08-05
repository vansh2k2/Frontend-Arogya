import React, { useEffect, useRef } from "react";
import bannerBg from "@/assets/banner/detailsbg.png";
import logo from "@/assets/banner/logoImg.png";
import SectionContainer from "@/components/layout/SectionContainer";
import SingleRegistration from "./SingleRegistration";
import GroupRegistration from "./GroupRegistration";
import c1Icon from "@/assets/icons/c1.webp";
import d33Icon from "@/assets/icons/d33.png";
import d100Icon from "@/assets/icons/d100.png";
import d5Icon from "@/assets/icons/d5.png";
import leafs from "@/assets/icons/leafs.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DelegateDetailsHero = () => {
  const [delegateType, setDelegateType] = React.useState(null);
  const formRef = React.useRef(null);

  // ── Refs ──────────────────────────────────────────────────────
  const logoRef        = useRef(null);
  const taglineRef     = useRef(null);
  const dateBlockRef   = useRef(null);
  const venueBlockRef  = useRef(null);

  const statsBandRef   = useRef(null);
  const statItemsRef   = useRef([]);

  const leftTextRef    = useRef(null);
  const dividerLineRef = useRef(null);
  const card1Ref       = useRef(null);
  const card2Ref       = useRef(null);

  const handleDelegateTypeChange = (type) => {
    setDelegateType(type);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero Banner ───────────────────────────────────────────

      // Logo — scale + fade from top-left
      gsap.fromTo(logoRef.current,
        { opacity: 0, scale: 0.82, x: -30, y: -20 },
        {
          opacity: 1, scale: 1, x: 0, y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: logoRef.current, start: "top 90%", once: true },
        }
      );

      // Tagline — blur fade up
      gsap.fromTo(taglineRef.current,
        { opacity: 0, y: 24, filter: "blur(5px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: taglineRef.current, start: "top 92%", once: true },
        }
      );

      // Date block — slide from left
      gsap.fromTo(dateBlockRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 0.7,
          delay: 0.45,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: dateBlockRef.current, start: "top 93%", once: true },
        }
      );

      // Venue block — slide from right
      gsap.fromTo(venueBlockRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: venueBlockRef.current, start: "top 93%", once: true },
        }
      );

      // ── Stats Band ────────────────────────────────────────────

      // Band bg — slide up
      gsap.fromTo(statsBandRef.current,
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: statsBandRef.current, start: "top 95%", once: true },
        }
      );

      // Each stat item — pop stagger
      gsap.fromTo(statItemsRef.current.filter(Boolean),
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: statsBandRef.current, start: "top 95%", once: true },
        }
      );

      // ── Choose Category Section ───────────────────────────────

      // Left text — fade + drift up
      gsap.fromTo(leftTextRef.current,
        { opacity: 0, y: 30, filter: "blur(3px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: leftTextRef.current, start: "top 90%", once: true },
        }
      );

      // Divider line — scaleY reveal
      gsap.fromTo(dividerLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 0.7,
          delay: 0.25,
          ease: "power2.inOut",
          scrollTrigger: { trigger: leftTextRef.current, start: "top 90%", once: true },
        }
      );

      // Card 1 — slide from left + bounce
      gsap.fromTo(card1Ref.current,
        { opacity: 0, x: -50, rotation: -3 },
        {
          opacity: 1, x: 0, rotation: 0,
          duration: 0.75,
          delay: 0.15,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: card1Ref.current, start: "top 92%", once: true },
        }
      );

      // Card 2 — slide from right + bounce
      gsap.fromTo(card2Ref.current,
        { opacity: 0, x: 50, rotation: 3 },
        {
          opacity: 1, x: 0, rotation: 0,
          duration: 0.75,
          delay: 0.28,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: card2Ref.current, start: "top 92%", once: true },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden min-h-[440px]">
        <img
          src={bannerBg?.src || bannerBg}
          alt="9th International Health & Wellness Expo 2026"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/20" />

        <SectionContainer className="relative z-10 flex flex-col items-start justify-start">

          {/* Logo */}
          <div ref={logoRef} style={{ opacity: 0 }} className="flex mt-10">
            <img src={logo?.src || logo} className="h-[220px]" alt="logo" />
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            style={{ opacity: 0 }}
            className="text-[#3B3F35] border-t-[3px] border-[#D9D8C4] pt-3 text-lg font-medium mb-4 -mt-6 ml-40"
          >
            Uniting Innovation, Wellness &amp;<br />
            Sustainability for a <strong className="font-bold text-[#366225]">Better Tomorrow</strong>
          </p>

          {/* Date & Venue */}
          <div className="w-full flex items-center justify-start flex-wrap gap-10 py-2">

            {/* Date */}
            <div ref={dateBlockRef} style={{ opacity: 0 }} className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: "#2d6e2a", width: "54px", height: "54px" }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <rect x="2.5" y="3.5" width="19" height="18" rx="2" stroke="white" strokeWidth="1.6" />
                  <line x1="7" y1="2" x2="7" y2="5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="17" y1="2" x2="17" y2="5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="2.5" y1="9" x2="21.5" y2="9" stroke="white" strokeWidth="1.5" />
                  <rect x="5" y="11.5" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="10.5" y="11.5" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="16" y="11.5" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="5" y="15.5" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="10.5" y="15.5" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="16" y="15.5" width="3" height="2.5" rx="0.5" fill="white" />
                </svg>
              </div>
              <div>
                <p className="m-0 text-[#131E0C] font-semibold text-[17px] leading-snug">21 – 23 August 2026</p>
                <p className="m-0 text-[#1C2716] text-[14px] font-medium">Friday – Sunday</p>
              </div>
            </div>

            <div className="hidden sm:block opacity-50" style={{ width: "1.5px", height: "50px", background: "#5a7a52" }} />

            {/* Venue */}
            <div ref={venueBlockRef} style={{ opacity: 0 }} className="flex items-center gap-4">
              <div className="flex items-center justify-center flex-shrink-0" style={{ width: "40px" }}>
                <svg width="34" height="42" viewBox="0 0 34 44" fill="none">
                  <path d="M17 2C9.82 2 4 7.82 4 15C4 24.5 17 42 17 42C17 42 30 24.5 30 15C30 7.82 24.18 2 17 2Z" fill="#1e5c1a" />
                  <circle cx="17" cy="15" r="6" fill="white" />
                </svg>
              </div>
              <div>
                <p className="m-0 text-[#131E0C] font-semibold text-[17px] leading-snug">PRAGATI MAIDAN,</p>
                <p className="m-0 text-[#131E0C] font-semibold text-[17px] leading-snug">NEW DELHI, INDIA</p>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* ── Stats Band ───────────────────────────────────────────── */}
      <SectionContainer className="relative z-20 -mt-4 sm:-mt-0">
        <section
          ref={statsBandRef}
          style={{ opacity: 0 }}
          className="grid grid-cols-1 md:flex md:items-center md:justify-between mb-3 p-4 md:py-3 md:px-2 gap-4 md:gap-0 bg-[#032e1c] border border-white/5 rounded-xl shadow-2xl"
        >
          {[
            {
              icon: <img src={c1Icon?.src || c1Icon} alt="Global Platform" className="w-full h-full object-contain" />,
              title: 'Global Platform',
              desc: 'Uniting healthcare, wellness, and sustainable industries',
            },
            {
              icon: <img src={d33Icon?.src || d33Icon} alt="Trusted Brands" className="w-full h-full object-contain" />,
              title: 'Trusted Brands',
              desc: "Connect with India's most trusted brands & manufacturers",
            },
            {
              icon: <img src={d100Icon?.src || d100Icon} alt="Targeted Audience" className="w-full h-full object-contain" />,
              title: 'Targeted Audience',
              desc: 'Engage with qualified buyers, Investors & decision makers',
            },
            {
              icon: <img src={d5Icon?.src || d5Icon} alt="Business Growth" className="w-full h-full object-contain" />,
              title: 'Business Growth',
              desc: 'Expand your market & accelerate your growth',
            },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div
                ref={el => (statItemsRef.current[i] = el)}
                style={{ opacity: 0 }}
                className="flex items-start gap-4 flex-1 px-2 md:px-4"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#cfa144] mb-0.5">{item.title}</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              {i < 3 && (
                <>
                  <div className="hidden md:block w-[1px] h-12 bg-white/10 shrink-0" />
                  <div className="block md:hidden h-[1px] w-full bg-white/10 my-1" />
                </>
              )}
            </React.Fragment>
          ))}
        </section>
      </SectionContainer>

      {/* ── Choose Delegate Category ─────────────────────────────── */}
      <SectionContainer>
        <section className="relative bg-white border border-gray-100 my-3 py-6 rounded-xl p-4 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-10 font-inter overflow-hidden" style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}>

          {/* Decorative Leafs */}
          <img src={leafs?.src || leafs} alt="Leafs" className="absolute -left-16 top-0 w-40 opacity-100 pointer-events-none z-0 mix-blend-multiply" />
          <img src={leafs?.src || leafs} alt="Leafs" className="absolute -right-16 bottom-0 w-40 opacity-100 pointer-events-none z-0 mix-blend-multiply rotate-180" />

          {/* Left text */}
          <div ref={leftTextRef} style={{ opacity: 0 }} className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-gray-900 text-xl font-medium mb-1">Edition Of Health & Wellness At</p>
              <h2 className="text-[#1a4d1a] text-2xl font-semibold leading-snug mb-2">
                9th International Health & Wellness Expo 2026<br />(IHWE Global Edition)
              </h2>
              <div className="w-8 h-[3px] bg-[#4a8f2f] rounded mb-4" />
              <p className="text-gray-900 text-sm leading-relaxed mb-4 text-justify">
                Step into IHWE 2026, a leading global platform uniting healthcare, wellness, AYUSH,
                organic, and sustainable industries under one roof. Whether you are a visitor
                discovering innovations or a corporate buyer seeking meaningful business
                connections, IHWE offers a high-value, curated experience with India's most
                trusted brands and manufacturers.
              </p>
              <p className="text-gray-900 text-sm text-justify">
                Register now and be part of a powerful global movement in{' '}
                <span className="text-[#4a8f2f] font-semibold">health & wellness.</span>
              </p>
            </div>
          </div>

          {/* Vertical divider */}
          <div
            ref={dividerLineRef}
            style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
            className="hidden lg:block w-px bg-gray-200 self-stretch"
          />
          <div className="block lg:hidden h-px w-full bg-gray-200 my-2" />

          {/* Right — cards */}
          <div className="flex-1">
            <h3 className="text-gray-900 text-xl font-medium mb-1">Choose Delegate Category</h3>
            <div className="w-8 h-[3px] bg-[#4a8f2f] rounded mb-5" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Single */}
              <div
                ref={card1Ref}
                style={{ opacity: 0, boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                onClick={() => handleDelegateTypeChange('single')}
                className={`cursor-pointer transition-all duration-300 rounded-xl px-5 py-4 flex flex-col items-center text-center gap-2 border-2 ${delegateType === 'single' ? 'bg-[#f0f7e6] border-[#4a8f2f] shadow-lg scale-[1.02]' : 'bg-[#f0f7e6]/50 border-transparent hover:border-[#c8e6a0] hover:bg-[#f0f7e6]'}`}
              >
                <div className="flex items-center justify-center">
                  <img src="/exhibition/dom.png" alt="Single Delegate" className="w-18 h-20 object-contain" />
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-base mb-1">Delegate Register</p>
                  <p className="text-gray-700 text-xs">For individual delegates</p>
                </div>
                <button
                  type="button"
                  className={`flex gap-2 items-center text-white text-xs font-medium uppercase tracking-widest px-5 py-2 rounded-lg transition-colors ${delegateType === 'single' ? 'bg-[#1a4d1a]' : 'bg-[#23471d] hover:bg-[#1a4d1a]'}`}
                >
                  {delegateType === 'single' ? 'Selected' : 'Register Now'}
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className={`w-3 h-3 ${delegateType === 'single' ? 'text-[#1a4d1a]' : 'text-[#23471d]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Group */}
              <div
                ref={card2Ref}
                style={{ opacity: 0, boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                onClick={() => handleDelegateTypeChange('group')}
                className={`cursor-pointer transition-all duration-300 rounded-xl px-5 py-4 flex flex-col items-center text-center gap-2 border-2 ${delegateType === 'group' ? 'bg-[#f0f5fa] border-[#2563eb] shadow-lg scale-[1.02]' : 'bg-[#f0f5fa]/50 border-transparent hover:border-[#93c5fd] hover:bg-[#f0f5fa]'}`}
              >
                <div className="flex items-center justify-center">
                  <img src="/exhibition/int.png" alt="Group Delegate" className="w-18 h-20 object-contain" />
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-base mb-1">Delegate Group Register</p>
                  <p className="text-gray-700 text-xs">For group of delegates</p>
                </div>
                <button
                  type="button"
                  className={`flex items-center gap-2 text-white text-xs font-medium uppercase tracking-widest px-5 py-2 rounded-lg transition-colors ${delegateType === 'group' ? 'bg-[#2563eb]' : 'bg-[#3b82f6] hover:bg-[#2563eb]'}`}
                >
                  {delegateType === 'group' ? 'Selected' : 'Register Now'}
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className={`w-3 h-3 ${delegateType === 'group' ? 'text-[#2563eb]' : 'text-[#3b82f6]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </div>

            </div>
          </div>
        </section>
      </SectionContainer>

      {/* Form */}
      <div ref={formRef}>
        {delegateType === 'single' && <SingleRegistration />}
        {delegateType === 'group' && <GroupRegistration />}
      </div>
    </>
  );
};

export default DelegateDetailsHero;