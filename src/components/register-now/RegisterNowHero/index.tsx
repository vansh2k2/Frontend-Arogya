"use client";
import React, { useState, useEffect, useRef } from "react";
import bannerBg from "@/assets/banner/delebg.webp";
import SectionContainer from "@/components/layout/SectionContainer";
import dleaf from "@/assets/icons/leafs.png";
import arrowIcon from "@/assets/icons/arrow.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Mic, Calendar, Globe, MapPin, Lightbulb, Leaf } from "lucide-react";
import c1Icon from "@/assets/icons/c1.webp";
import d33Icon from "@/assets/icons/d33.png";
import d100Icon from "@/assets/icons/d100.png";

const Sparkle = ({ style, color = '#133513' }: { style?: React.CSSProperties, color?: string }) => (
  <span style={{ position: 'absolute', pointerEvents: 'none', fontSize: '13px', color,
    animation: 'sparkleAnim 1.6s ease-in-out infinite', opacity: 0, zIndex: 20, ...style }}>✦</span>
);

gsap.registerPlugin(ScrollTrigger);

// Animated Counter component
const CountUp = ({ end, duration = 4000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};

const RegisterNowHero = ({ showThemesBand = false }: { showThemesBand?: boolean }) => {
  const sectionRef = useRef(null);
  const leafRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const taglineRef = useRef(null);
  const statsBandRef = useRef(null);
  const shimmerRef = useRef(null);
  const eventInfoRef = useRef(null);
  const underlineRef = useRef(null);
  const statItemsRef = useRef([]);
  const dividerRefs = useRef([]);

  const stats = [
    { num: 121, suffix: "+", label: "EXPERT SPEAKERS", icon: <Users size={24} className="text-[#F3B71B]" strokeWidth={1.5} /> },
    { num: 14, suffix: "", label: "PREMIUM SESSIONS", icon: <Mic size={24} className="text-[#F3B71B]" strokeWidth={1.5} /> },
    { num: 2, suffix: "", label: "DAYS CONFERENCE", icon: <Calendar size={24} className="text-[#F3B71B]" strokeWidth={1.5} /> },
    { num: 811, suffix: "+", label: "DELEGATES", icon: <Users size={24} className="text-[#F3B71B]" strokeWidth={1.5} /> },
    { num: 20, suffix: "+", label: "COUNTRIES", icon: <Globe size={24} className="text-[#F3B71B]" strokeWidth={1.5} /> },
    {
      value: "ENDLESS",
      label: "OPPORTUNITIES",
      icon: (
        <svg className="w-6 h-6 text-[#F3B71B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 100 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 100-8c-2 0-4 1.33-6 4z" />
        </svg>
      )
    },
  ];

  const themes = [
    {
      day: "DAY 1",
      date: "21 AUGUST 2026",
      title: "INNOVATE",
      subtitle: "Driving Healthcare\nThrough Innovation",
      icon: <Lightbulb size={24} className="text-[#1a4a15]" strokeWidth={2.5} />,
      iconBg: "bg-[#e1f0db]",
      textColor: "text-[#1a4a15]"
    },
    {
      day: "DAY 2",
      date: "22 AUGUST 2026",
      title: "COLLABORATE",
      subtitle: "Building Partnerships\nfor a Healthier World",
      icon: <Users size={24} className="text-white" strokeWidth={2.5} />,
      iconBg: "bg-[#256ea4]",
      textColor: "text-[#256ea4]"
    },
    {
      day: "DAY 3",
      date: "23 AUGUST 2026",
      title: "SUSTAIN",
      subtitle: "Sustainable Solutions\nfor Long-Term Impact",
      icon: <Leaf size={24} className="text-white" strokeWidth={2.5} />,
      iconBg: "bg-[#5e7732]",
      textColor: "text-[#5e7732]"
    }
  ];

  // Clear refs to prevent stale elements during soft navigation
  statItemsRef.current = [];
  dividerRefs.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline, gated behind ScrollTrigger so it plays the moment
      // this section enters the viewport (and replays if you scroll away & back).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // Decorative leaf — elastic pop + rotate in
      tl.fromTo(
        leafRef.current,
        { opacity: 0, scale: 0.35, rotate: -30, y: 50 },
        { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.55)" },
        0
      );

      // Heading — masked line-reveal with a subtle 3D tilt
      tl.fromTo(
        line1Ref.current,
        { yPercent: 120, rotationX: 65, opacity: 0 },
        { yPercent: 0, rotationX: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
        0.15
      ).fromTo(
        line2Ref.current,
        { yPercent: 120, rotationX: 65, opacity: 0 },
        { yPercent: 0, rotationX: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
        0.32
      );

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 24, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.85 },
        0.6
      );

      // Event info reveal
      tl.fromTo(
        eventInfoRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.75
      );

      // Underline animation
      tl.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: "left center", opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        1.1
      );

      // Stats band — clip-path wipe reveal, left to right
      tl.fromTo(
        statsBandRef.current,
        { opacity: 0, y: 20, clipPath: "inset(0% 100% 0% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power4.inOut" },
        0.75
      );

      // Shimmer sweep across the band right after the wipe lands
      tl.fromTo(
        shimmerRef.current,
        { xPercent: -130, opacity: 0.9 },
        { xPercent: 230, opacity: 0, duration: 1.1, ease: "power1.inOut" },
        1.35
      );

      // Divider lines grow in
      tl.fromTo(
        dividerRefs.current.filter(Boolean),
        { scaleY: 0 },
        { scaleY: 1, duration: 0.45, stagger: 0.07, ease: "power2.out" },
        1.1
      );

      // Stat items — 3D flip-in, staggered
      tl.fromTo(
        statItemsRef.current.filter(Boolean),
        { opacity: 0, rotationX: -90, y: 25, transformOrigin: "top center" },
        { opacity: 1, rotationX: 0, y: 0, duration: 0.65, stagger: 0.12, ease: "back.out(1.7)" },
        1.15
      );

      // Gentle continuous float on the leaf once it has landed
      gsap.to(leafRef.current, {
        y: "+=12",
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-auto md:h-[320px] overflow-hidden py-8 md:py-0 flex flex-col justify-center"
      >
        {/* Background */}
        <img
          src={bannerBg?.src || bannerBg}
          alt="Delegate Registration Background"
          className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
        />

        {/* Decorative Left Leaf */}
        <img
          ref={leafRef}
          src={dleaf?.src || dleaf}
          alt="Decorative Leaf"
          style={{ opacity: 0 }}
          className="absolute bottom-0 -left-6 md:-left-10 lg:-left-12 w-24 md:w-32 lg:w-40 z-20 pointer-events-none object-contain drop-shadow-xl"
        />

        <SectionContainer className="relative z-10 w-full flex flex-col items-start justify-center pt-8 md:pt-12 pb-16">
          <div className="w-full lg:w-1/2 md:pl-12 lg:pl-20 relative z-30">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold uppercase leading-tight tracking-tight mb-4 font-inter [perspective:700px]">
              <span className="block overflow-hidden">
                <span ref={line1Ref} style={{ opacity: 0 }} className="block text-[#133513]">
                  DELEGATE
                </span>
              </span>
              <span className="block overflow-hidden">
                <span ref={line2Ref} style={{ opacity: 0 }} className="block text-[#519B3E]">
                  REGISTRATION
                </span>
              </span>
            </h1>
            <p
              ref={taglineRef}
              style={{ opacity: 0 }}
              className="text-gray-900 text-base md:text-lg font-medium mb-6 max-w-lg font-inter"
            >
              Be part of Asia's premier platform for
              <br />
              Health, Wellness, Innovation &amp; Collaboration.
            </p>

            {/* Added Event Info based on mockup */}
            <div ref={eventInfoRef} style={{ opacity: 0 }} className="flex flex-col items-start gap-2 mt-2">
              <div className="flex items-center gap-2 relative">
                <img src={arrowIcon?.src || arrowIcon} className="w-10 h-10 object-contain" alt="arrow" />
                <div className="flex flex-col items-center">
                  <div className="relative inline-block">
                    <Sparkle style={{ top: '-10px', right: '5%' }} color="#133513" />
                    <Sparkle style={{ bottom: '-5px', left: '10%', animationDelay: '0.4s' }} color="#133513" />
                    <Sparkle style={{ top: '40%', right: '-15px', animationDelay: '0.8s' }} color="#133513" />
                    <span className="text-lg md:text-xl font-bold text-[#133513] font-serif tracking-wide">18th Integrated Arogya Sangosthi</span>
                  </div>
                  <div ref={underlineRef} className="w-full h-[2px] bg-[#F3B71B] mt-0.5 rounded-full opacity-0" style={{ transformOrigin: 'left center' }}></div>
                </div>
                <img src={arrowIcon?.src || arrowIcon} className="w-10 h-10 object-contain -scale-x-100" alt="arrow" />
              </div>
              <div className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-[#133513] tracking-wide">
                <div className="flex items-center gap-1"><Calendar size={15} className="text-[#133513]" strokeWidth={2} /> 21 - 23 AUGUST 2026</div>
                <div className="w-px h-3 bg-[#133513]/40"></div>
                <div className="flex items-center gap-1"><MapPin size={15} className="text-[#133513]" strokeWidth={2} /> PRAGATI MAIDAN, NEW DELHI</div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <SectionContainer className="relative z-30 -mt-2 pb-6 bg-transparent mb-8 sm:mb-12">
        <div
          ref={statsBandRef}
          style={{ opacity: 0 }}
          className={`w-full ${showThemesBand ? "bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-3 md:py-4" : "bg-[#032e1c] border border-[#043b24] shadow-[0_15px_40px_rgba(3,46,28,0.15)] py-2 md:py-3"} rounded-xl md:rounded-2xl px-4 md:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 md:gap-4 relative overflow-hidden [perspective:1000px]`}
        >
          {/* Shimmer sweep overlay */}
          <div
            ref={shimmerRef}
            style={{
              opacity: 0,
              background: showThemesBand 
                ? "linear-gradient(100deg, transparent, rgba(26,74,21,0.08), transparent)"
                : "linear-gradient(100deg, transparent, rgba(243,183,27,0.22), transparent)",
            }}
            className="absolute inset-y-0 left-0 w-1/3 pointer-events-none"
          />

          {showThemesBand ? (
            themes.map((theme, idx) => (
              <div
                key={idx}
                ref={(el) => { if (el) statItemsRef.current[idx] = el; }}
                style={{ opacity: 0 }}
                className="flex items-center gap-3 md:gap-5 flex-1 justify-center md:justify-start"
              >
                <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center ${theme.iconBg}`}>
                  {theme.icon}
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <span className={`text-[10px] md:text-xs font-semibold ${theme.textColor} mb-0.5`}>
                    {theme.day} <span className="text-gray-300 font-normal mx-1.5">|</span> <span className="text-[#133513]">{theme.date}</span>
                  </span>
                  <span className={`font-bold text-base md:text-xl leading-none font-inter uppercase ${theme.textColor} mb-1`}>
                    {theme.title}
                  </span>
                  <span className="text-gray-600 text-[10px] md:text-xs leading-tight whitespace-pre-line font-medium">
                    {theme.subtitle}
                  </span>
                </div>
                {/* Divider between items */}
                {idx < themes.length - 1 && (
                  <div
                    ref={(el) => { if (el) dividerRefs.current[idx] = el; }}
                    className="hidden lg:block w-px h-16 bg-gray-200 ml-auto"
                  ></div>
                )}
              </div>
            ))
          ) : (
            stats.map((stat, idx) => (
              <div
                key={idx}
                ref={(el) => { if (el) statItemsRef.current[idx] = el; }}
                style={{ opacity: 0 }}
                className="flex items-center gap-3 md:gap-4 flex-1 min-w-[140px] justify-center md:justify-start"
              >
                <div className="shrink-0 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-[#F3B71B] font-bold text-lg md:text-xl leading-none font-inter">
                    {stat.num !== undefined ? (
                      <><CountUp end={stat.num} />{stat.suffix}</>
                    ) : (
                      stat.value
                    )}
                  </span>
                  <span className="text-white font-semibold text-[8px] md:text-[9px] uppercase tracking-widest mt-0.5 whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
                {/* Divider between items */}
                {idx < stats.length - 1 && (
                  <div
                    ref={(el) => { if (el) dividerRefs.current[idx] = el; }}
                    className="hidden lg:block w-px h-10 bg-[#044a2c] ml-auto"
                  ></div>
                )}
              </div>
            ))
          )}
        </div>
      </SectionContainer>
    </>
  );
};

export default RegisterNowHero;