import React, { useEffect, useRef } from "react";
import { Check, Lightbulb, Handshake, Globe, Heart, Stethoscope, Activity, Shield, Smartphone, Leaf } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import im1 from "@/assets/image/im1.webp";
import im2 from "@/assets/image/im2.webp";
import im3 from "@/assets/image/im3.webp";

gsap.registerPlugin(ScrollTrigger);

const RegistrationStepper = ({ currentStep }: { currentStep?: number }) => {
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const lineLeftRef  = useRef(null);
  const lineRightRef = useRef(null);
  const dotsLeftRef  = useRef([]);
  const dotsRightRef = useRef([]);
  const cardsRef     = useRef([]);
  const glowRefs     = useRef([]);
  const badgeRefs    = useRef([]);
  const titleRefs    = useRef([]);
  const subRefs      = useRef([]);
  const listRefs     = useRef([]);
  const themeHeaderRef = useRef(null);
  const themeCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header decorative line + dots draw-in ──────────────────────────────
      gsap.fromTo(
        [lineLeftRef.current, lineRightRef.current],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        [...dotsLeftRef.current, ...dotsRightRef.current].filter(Boolean),
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5,
          ease: "back.out(3)",
          stagger: 0.08,
          delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );

      // ── Heading: fade up + slight letter-spacing settle ────────────────────
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 18, letterSpacing: "0.25em" },
        {
          opacity: 1, y: 0, letterSpacing: "0.1em",
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      );

      // ── Cards: staggered rise with subtle 3D tilt-in ────────────────────────
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 70, scale: 0.92, rotateX: 8, transformPerspective: 800 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
        }
      );

      // ── Background glow blobs: scale in softly after the card lands ────────
      gsap.fromTo(
        glowRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1, scale: 1,
          duration: 1.3,
          ease: "power2.out",
          stagger: 0.18,
          delay: 0.35,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
        }
      );

      // ── Badges: pop in with a tiny bounce ───────────────────────────────────
      gsap.fromTo(
        badgeRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.6, x: -10 },
        {
          opacity: 1, scale: 1, x: 0,
          duration: 0.6,
          ease: "back.out(2.2)",
          stagger: 0.18,
          delay: 0.45,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
        }
      );

      // ── Titles: fade up with a touch of blur-clear for a premium reveal ────
      gsap.fromTo(
        titleRefs.current.filter(Boolean),
        { opacity: 0, y: 24, filter: "blur(6px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.18,
          delay: 0.55,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
        }
      );

      // ── Subtitles: fade up slightly after titles ────────────────────────────
      gsap.fromTo(
        subRefs.current.filter(Boolean),
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.18,
          delay: 0.68,
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
        }
      );

      // ── List items: per-card staggered slide-in with check-icon pop ────────
      listRefs.current.forEach((listEl, cardIndex) => {
        if (!listEl) return;
        const items = listEl.querySelectorAll("li");
        const icons = listEl.querySelectorAll("li .check-circle");

        gsap.fromTo(
          items,
          { opacity: 0, x: -22 },
          {
            opacity: 1, x: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.09,
            delay: 0.85 + cardIndex * 0.18,
            scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
          }
        );

        gsap.fromTo(
          icons,
          { scale: 0, rotate: -90 },
          {
            scale: 1, rotate: 0,
            duration: 0.45,
            ease: "back.out(3)",
            stagger: 0.09,
            delay: 0.92 + cardIndex * 0.18,
            scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%", once: true },
          }
        );
      });

      // ── Conference Themes ─────────────────────────────────────────────────
      gsap.fromTo(
        themeHeaderRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: themeHeaderRef.current, start: "top 85%", once: true },
        }
      );

      if (themeCardsRef.current.length > 0) {
        gsap.fromTo(
          themeCardsRef.current.filter(Boolean),
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: themeCardsRef.current[0], start: "top 85%", once: true },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const themesData = [
    { title: "Preventive &\nIntegrative Healthcare", icon: <Heart className="w-6 h-6 text-[#143111]" /> },
    { title: "Medical Innovation\n& Research", icon: <Stethoscope className="w-6 h-6 text-[#143111]" /> },
    { title: "Wellness, Nutrition\n& Lifestyle", icon: <Activity className="w-6 h-6 text-[#143111]" /> },
    { title: "Healthcare Policy\n& Governance", icon: <Shield className="w-6 h-6 text-[#143111]" /> },
    { title: "Digital Health &\nTechnology", icon: <Smartphone className="w-6 h-6 text-[#143111]" /> },
    { title: "AYUSH & Traditional\nWisdom", icon: <Leaf className="w-6 h-6 text-[#143111]" /> },
  ];

  const dayData = [
    {
      bg: im1,
      glowClass: "absolute -left-10 -bottom-10 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none z-0",
      contentClass: "relative z-10 ml-8 md:ml-16 lg:ml-[145px]",
      badgeBg: "bg-[#548a15] border border-green-600/30",
      day: "DAY 1",
      date: "21 AUGUST 2026",
      title: "INNOVATE",
      subtitle: <>Driving Healthcare <br /> Through Innovation</>,
      iconBg: "bg-[#143111] border border-green-500/50",
      items: [
        "Medical Innovation & Research",
        "Digital Health & AI",
        "Startups & Emerging Technologies",
        "Future of Healthcare Delivery",
      ],
    },
    {
      bg: im2,
      glowClass: "absolute -right-10 top-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0",
      contentClass: "relative z-10",
      badgeBg: "bg-[#123170] border border-blue-500/30",
      day: "DAY 2",
      date: "22 AUGUST 2026",
      title: "COLLABORATE",
      subtitle: <>Building Partnerships <br /> for a Healthier World</>,
      iconBg: "bg-[#0B2C66] border border-blue-500/50",
      items: [
        "Industry Collaboration",
        "Global Health Partnerships",
        "Public-Private Synergy",
        "Community Engagement",
      ],
    },
    {
      bg: im3,
      glowClass: "absolute -right-10 -bottom-10 w-48 h-48 bg-green-400/10 rounded-full blur-3xl pointer-events-none z-0",
      contentClass: "relative z-10",
      badgeBg: "bg-[#143111] border border-green-600/30",
      day: "DAY 3",
      date: "23 AUGUST 2026",
      title: "SUSTAIN",
      subtitle: <>Sustainable Solutions <br /> for Long-Term Impact</>,
      iconBg: "bg-[#143111] border border-green-500/50",
      items: [
        "Sustainable Healthcare Systems",
        "Wellness, Nutrition & Lifestyle",
        "Environmental Health",
        "Policy & Governance for Tomorrow",
      ],
    },
  ];

  return (
    <div ref={sectionRef} className="w-full pt-2 pb-8 px-4 sm:px-6 lg:px-10 bg-white">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
        <div className="flex items-center">
          <div ref={el => (dotsLeftRef.current[0] = el)} className="w-1 h-1 rounded-full bg-[#143111]" style={{ opacity: 0 }} />
          <div ref={lineLeftRef} className="h-[1px] w-8 sm:w-16 bg-[#143111] origin-right" style={{ opacity: 0 }} />
          <div ref={el => (dotsLeftRef.current[1] = el)} className="w-1.5 h-1.5 rotate-45 bg-[#143111]" style={{ opacity: 0 }} />
        </div>
        <h2
          ref={headerRef}
          style={{ opacity: 0 }}
          className="text-[#143111] text-[14px] sm:text-[18px] md:text-[17px] font-semibold tracking-[0.1em] uppercase text-center px-2"
        >
          3 DAYS. 3 POWERFUL THEMES. ENDLESS POSSIBILITIES.
        </h2>
        <div className="flex items-center">
          <div ref={el => (dotsRightRef.current[0] = el)} className="w-1.5 h-1.5 rotate-45 bg-[#143111]" style={{ opacity: 0 }} />
          <div ref={lineRightRef} className="h-[1px] w-8 sm:w-16 bg-[#143111] origin-left" style={{ opacity: 0 }} />
          <div ref={el => (dotsRightRef.current[1] = el)} className="w-1 h-1 rounded-full bg-[#143111]" style={{ opacity: 0 }} />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">

        {dayData.map((day, idx) => (
          <div
            key={idx}
            ref={el => (cardsRef.current[idx] = el)}
            className="relative rounded-[20px] overflow-hidden py-4 lg:py-5 px-4 lg:px-6 shadow-xl border border-gray-200 group bg-cover bg-center font-inter"
            style={{ backgroundImage: `url(${day.bg?.src || day.bg})`, opacity: 0 }}
          >
            {/* Background Glow */}
            <div ref={el => (glowRefs.current[idx] = el)} className={day.glowClass} style={{ opacity: 0 }} />

            <div className={day.contentClass}>
              <div className="">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white">
                  <span ref={el => (badgeRefs.current[idx] = el)} style={{ opacity: 0 }} className={`${day.badgeBg} px-2 py-0.5 rounded-md`}>
                    {day.day}
                  </span>
                  <span className="opacity-80">|</span>
                  <span>{day.date}</span>
                </div>

                {/* Title */}
                <h3 ref={el => (titleRefs.current[idx] = el)} style={{ opacity: 0 }} className="text-[26px] sm:text-[28px] font-bold text-white uppercase tracking-tight mb-1">
                  {day.title}
                </h3>
                <p ref={el => (subRefs.current[idx] = el)} style={{ opacity: 0 }} className="text-[13px] font-medium text-white/90 mb-3 max-w-[200px] leading-snug">
                  {day.subtitle}
                </p>
              </div>

              {/* List */}
              <ul ref={el => (listRefs.current[idx] = el)} className="space-y-1.5 mb-2">
                {day.items.map((item, i) => (
                  <li key={i} style={{ opacity: 0 }} className="flex items-center gap-2.5 text-[12px] font-medium text-white/90">
                    <div className={`check-circle rounded-full ${day.iconBg} p-0.5 shrink-0`}>
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                    <span className="whitespace-nowrap">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default RegistrationStepper;