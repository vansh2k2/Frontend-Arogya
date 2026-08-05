import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  CheckCircle, Users, TrendingUp, Briefcase, FileText, Globe, 
  Stethoscope, Heart, Activity, Shield, Smartphone, Leaf, ShieldPlus, Dna, Landmark, Network, Salad, ArrowRight, User
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import d1 from "@/assets/image/dr.webp"; // Placeholder for doctors image
import zz1 from "@/assets/icons/zz1.png";
import zz2 from "@/assets/icons/zz2.png";
import zz3 from "@/assets/icons/zz3.png";
import zz4 from "@/assets/icons/zz4.png";
import zz5 from "@/assets/icons/zz5.png";
import zz6 from "@/assets/icons/zz6.png";
import footerright from "@/assets/icons/footerright.webp";
import leafs from "@/assets/icons/leafs.png";
import SectionContainer from "@/components/layout/SectionContainer";
import { API_URL, SERVER_URL } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

// ─── Sparkle Component ───────────────────────────────────────────────────────
const Sparkle = ({ style, color = '#fff176' }) => (
  <span style={{
    position: 'absolute', pointerEvents: 'none', fontSize: '13px', color,
    animation: 'sparkleAnim 1.6s ease-in-out infinite', opacity: 0, zIndex: 20, ...style
  }}>✦</span>
);

const themes = [
  { title: "Preventive &\nIntegrative\nHealthcare", image: zz1 },
  { title: "Medical\u00A0Innovation\n& Research", image: zz2 },
  { title: "Wellness,\u00A0Nutrition\n& Lifestyle", image: zz3 },
  { title: "Healthcare\u00A0Policy\n& Governance", image: zz4 },
  { title: "Digital Health &\nTechnology", image: zz5 },
  { title: "AYUSH & Traditional Wisdom", image: zz6 },
];

const whyAttend = [
  { text: "Connect with\nGlobal Leaders", icon: <Users className="w-5 h-5 text-[#143111]" /> },
  { text: "Gain Insights on\nEmerging Trends", icon: <Activity className="w-5 h-5 text-[#143111]" /> },
  { text: "Build Strategic\nCollaborations", icon: <Briefcase className="w-5 h-5 text-[#143111]" /> },
  { text: "Influence Policy\n& Practice", icon: <TrendingUp className="w-5 h-5 text-[#143111]" /> },
  { text: "Shape the Future\nof Healthcare", icon: <Shield className="w-5 h-5 text-[#143111]" /> },
];

const DelegateInfoSections = ({ middleComponent }) => {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(`${API_URL}/eminent-speakers`);
        const data = await res.json();
        if (data.success) {
          setSpeakers(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch eminent speakers:', error);
      }
    };
    fetchSpeakers();
  }, []);
  const rootRef        = useRef(null);

  // Conference Themes header
  const themesHeaderRef = useRef(null);
  const lineLeftRef     = useRef(null);
  const lineRightRef    = useRef(null);
  const leafLeftRef     = useRef(null);
  const leafRightRef    = useRef(null);
  const themesHeadingRef = useRef(null);

  // Conference Themes box
  const themesBoxRef    = useRef(null);
  const themeItemRefs   = useRef([]);
  const themeIconRefs   = useRef([]);
  const themeHaloRefs   = useRef([]);

  // Why Attend (left card)
  const whyCardRef      = useRef(null);
  const whyHeadingRef   = useRef(null);
  const whyUnderlineRef = useRef(null);
  const whyItemRefs     = useRef([]);
  const whyIconRefs     = useRef([]);
  const whyHaloRefs     = useRef([]);
  const doctorsImgRef   = useRef(null);

  // Speakers (right card)
  const speakersCardRef = useRef(null);
  const speakersHeadingRef = useRef(null);
  const speakersUnderlineRef = useRef(null);
  const speakersBtnRef  = useRef(null);
  const speakersHaloRef = useRef(null);
  const marqueeWrapRef  = useRef(null);

  // Decorative footer image (parallax)
  const footerImgRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Conference Themes header: lines draw-in, leaves rotate-pop, text fade ──
      gsap.fromTo(
        [lineLeftRef.current, lineRightRef.current],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: themesHeaderRef.current, start: "top 88%", once: true },
        }
      );

      gsap.fromTo(
        [leafLeftRef.current, leafRightRef.current],
        { opacity: 0, scale: 0, rotate: 0 },
        {
          opacity: 1, scale: 1,
          duration: 0.6,
          ease: "back.out(2.5)",
          stagger: 0.1,
          delay: 0.25,
          scrollTrigger: { trigger: themesHeaderRef.current, start: "top 88%", once: true },
        }
      );

      gsap.fromTo(
        themesHeadingRef.current,
        { opacity: 0, y: 16, letterSpacing: "0.2em" },
        {
          opacity: 1, y: 0, letterSpacing: "0em",
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: themesHeaderRef.current, start: "top 88%", once: true },
        }
      );

      // ── Themes box: clip-path wipe reveal, left to right ────────────────────────
      gsap.fromTo(
        themesBoxRef.current,
        { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)", opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: themesBoxRef.current, start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        themeIconRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.4, rotate: -90 },
        {
          opacity: 1, scale: 1, rotate: 0,
          duration: 0.6,
          ease: "back.out(2.2)",
          stagger: 0.08,
          delay: 0.45,
          scrollTrigger: { trigger: themesBoxRef.current, start: "top 90%", once: true },
        }
      );

      // halo pulse rings behind each theme icon — one-time expand & fade
      gsap.fromTo(
        themeHaloRefs.current.filter(Boolean),
        { opacity: 0.5, scale: 0.3 },
        {
          opacity: 0, scale: 1.8,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.45,
          scrollTrigger: { trigger: themesBoxRef.current, start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        themeItemRefs.current.map(el => el && el.querySelector("h3")).filter(Boolean),
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.55,
          scrollTrigger: { trigger: themesBoxRef.current, start: "top 90%", once: true },
        }
      );

      // ── Why Attend card: slide in from left with slight rotation settle ────────
      gsap.fromTo(
        whyCardRef.current,
        { opacity: 0, x: -60, rotate: -1.5 },
        {
          opacity: 1, x: 0, rotate: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: whyCardRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        whyHeadingRef.current,
        { opacity: 0, y: 14, filter: "blur(5px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: { trigger: whyCardRef.current, start: "top 85%", once: true },
        }
      );

      // animated underline drawing beneath the "WHY ATTEND" heading
      gsap.fromTo(
        whyUnderlineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.inOut",
          delay: 0.45,
          transformOrigin: "left center",
          scrollTrigger: { trigger: whyCardRef.current, start: "top 85%", once: true },
        }
      );

      // Why Attend list — items slide in, icons pop with a little spin
      gsap.fromTo(
        whyItemRefs.current.filter(Boolean),
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.55,
          scrollTrigger: { trigger: whyCardRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        whyIconRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.4, rotate: -45 },
        {
          opacity: 1, scale: 1, rotate: 0,
          duration: 0.5,
          ease: "back.out(2.8)",
          stagger: 0.12,
          delay: 0.6,
          scrollTrigger: { trigger: whyCardRef.current, start: "top 85%", once: true },
        }
      );

      // halo pulse rings behind each "why attend" icon
      gsap.fromTo(
        whyHaloRefs.current.filter(Boolean),
        { opacity: 0.45, scale: 0.4 },
        {
          opacity: 0, scale: 2.2,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.6,
          scrollTrigger: { trigger: whyCardRef.current, start: "top 85%", once: true },
        }
      );

      // Doctors image — clip-path reveal rising from the bottom, like a curtain lift
      gsap.fromTo(
        doctorsImgRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, scale: 1.05 },
        {
          clipPath: "inset(0% 0% 0% 0%)", opacity: 0.9, scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: { trigger: whyCardRef.current, start: "top 85%", once: true },
        }
      );

      // ── Speakers card: slide in from right with slight rotation settle ─────────
      gsap.fromTo(
        speakersCardRef.current,
        { opacity: 0, x: 60, rotate: 1.5 },
        {
          opacity: 1, x: 0, rotate: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: speakersCardRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        speakersHeadingRef.current,
        { opacity: 0, y: 14, filter: "blur(5px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: { trigger: speakersCardRef.current, start: "top 85%", once: true },
        }
      );

      // animated underline drawing beneath the speakers heading
      gsap.fromTo(
        speakersUnderlineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.inOut",
          delay: 0.45,
          transformOrigin: "center",
          scrollTrigger: { trigger: speakersCardRef.current, start: "top 85%", once: true },
        }
      );

      // Speakers CTA button — elastic pop + halo ring pulse on arrival
      gsap.fromTo(
        speakersBtnRef.current,
        { opacity: 0, scale: 0.5, y: 10 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.6)",
          delay: 0.4,
          scrollTrigger: { trigger: speakersCardRef.current, start: "top 85%", once: true },
        }
      );

      gsap.fromTo(
        speakersHaloRef.current,
        { opacity: 0.5, scale: 1 },
        {
          opacity: 0, scale: 1.9,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.55,
          scrollTrigger: { trigger: speakersCardRef.current, start: "top 85%", once: true },
        }
      );

      // Marquee strip — fade + slide up, with a soft mask wipe from both sides
      gsap.fromTo(
        marqueeWrapRef.current,
        { opacity: 0, y: 28, clipPath: "inset(0% 8% 0% 8%)" },
        {
          opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: { trigger: speakersCardRef.current, start: "top 85%", once: true },
        }
      );

      // ── Decorative footer artwork: gentle parallax drift while scrolling ───────
      gsap.to(footerImgRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full bg-white font-inter pb-16 pt-2 relative overflow-hidden">
      <img 
        ref={footerImgRef}
        src={footerright?.src || footerright} 
        alt="Decorative Footer" 
        className="absolute right-0 bottom-10 md:bottom-24 w-32 md:w-48 lg:w-72 pointer-events-none object-contain z-0" 
      />
      <img 
        src={leafs?.src || leafs} 
        alt="Decorative Leafs" 
        className="absolute left-[-20px] top-1/4 md:top-1/3 w-16 md:w-24 lg:w-32 pointer-events-none object-contain z-20 opacity-80" 
      />
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity:0; transform:scale(0.5) translateY(0); }
          40%  { opacity:1; transform:scale(1.2) translateY(-4px); }
          80%  { opacity:0.5; transform:scale(0.9) translateY(-6px); }
          100% { opacity:0; transform:scale(0.5) translateY(-8px); }
        }
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: scrollMarquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .btn-delegate-blue {
          background:#111844;
          position:relative; overflow:hidden;
          border:2px solid white !important;
          transition:background 0.3s;
          will-change: transform;
        }
        .btn-delegate-blue:hover { background:#0a0e29; }
        .btn-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg) translateX(-130%);
          pointer-events: none;
          z-index: 5;
          animation: shineSweep 3s infinite;
        }
        @keyframes shineSweep {
          0% { transform: skewX(-20deg) translateX(-130%); }
          100% { transform: skewX(-20deg) translateX(250%); }
        }
        .theme-icon {
          transform-origin: center;
        }
        .halo-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          pointer-events: none;
        }
      `}</style>
      <SectionContainer className="flex flex-col gap-6 -mt-2 md:-mt-2 relative z-10">
        
        {/* Conference Themes Header */}
        <div ref={themesHeaderRef} className="flex items-center justify-center gap-4">
          <div ref={lineLeftRef} className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-[#143111]/30 origin-right" style={{ opacity: 0 }}></div>
          <div className="flex items-center gap-3">
            <Leaf ref={leafLeftRef} style={{ opacity: 0 }} className="w-4 h-4 text-[#4a7238] fill-[#4a7238] -rotate-45" />
            <h2 ref={themesHeadingRef} style={{ opacity: 0 }} className="text-[#143111] font-semibold text-xl md:text-2xl tracking-tight uppercase">
              CONFERENCE THEMES
            </h2>
            <Leaf ref={leafRightRef} style={{ opacity: 0 }} className="w-4 h-4 text-[#4a7238] fill-[#4a7238] rotate-45" />
          </div>
          <div ref={lineRightRef} className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-[#143111]/30 origin-left" style={{ opacity: 0 }}></div>
        </div>

        {/* Conference Themes Box */}
        <div ref={themesBoxRef} style={{ opacity: 0 }} className="w-full border border-gray-200 rounded-2xl py-4 px-4 md:py-5 md:px-6 bg-[#fbfcf7] shadow-sm -mt-2">
          
          {/* Themes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-gray-300">
            {themes.map((theme, idx) => (
              <div key={idx} ref={el => (themeItemRefs.current[idx] = el)} className="flex items-center justify-center gap-3 md:gap-4 px-4 py-2 md:py-1 md:px-6 lg:px-8">
                <div className="relative shrink-0 w-12 h-12 flex items-center justify-center">
                  <span
                    ref={el => (themeHaloRefs.current[idx] = el)}
                    className="halo-ring"
                    style={{ opacity: 0, background: "radial-gradient(circle, rgba(74,114,56,0.35) 0%, rgba(74,114,56,0) 70%)" }}
                  ></span>
                  <img
                    ref={el => (themeIconRefs.current[idx] = el)}
                    src={theme.image}
                    alt="theme"
                    className="theme-icon w-12 h-12 object-contain relative z-10"
                    style={{ opacity: 0 }}
                  />
                </div>
                <h3 className="text-black font-medium text-[12px] leading-snug whitespace-pre-line" style={{ opacity: 0 }}>
                  {theme.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {middleComponent && (
        <div className="w-full relative z-20">
          {middleComponent}
        </div>
      )}

      <SectionContainer className="flex flex-col gap-6 mt-12 relative z-10">
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Why Attend IHWE 2026? (Left) */}
          <div ref={whyCardRef} className="lg:col-span-5 bg-[#f5f8f5] rounded-2xl overflow-hidden flex relative" style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", opacity: 0 }}>
            <div className="px-5 pt-5 pb-5 md:px-6 md:pt-6 md:pb-6 w-full md:w-[55%] z-10 relative">
              <h3 ref={whyHeadingRef} style={{ opacity: 0 }} className="font-bold text-[#143111] text-lg md:text-[18px] uppercase mb-1 whitespace-nowrap">
                WHY ATTEND IHWE 2026?
              </h3>
              <div ref={whyUnderlineRef} className="h-[2px] w-16 bg-[#4a7238] mb-5" style={{ transform: "scaleX(0)" }}></div>
              <ul className="space-y-4">
                {whyAttend.map((item, idx) => (
                  <li key={idx} ref={el => (whyItemRefs.current[idx] = el)} style={{ opacity: 0 }} className="flex items-start gap-4">
                    <div className="relative mt-1 shrink-0 w-5 h-5 flex items-center justify-center">
                      <span
                        ref={el => (whyHaloRefs.current[idx] = el)}
                        className="halo-ring"
                        style={{ opacity: 0, background: "radial-gradient(circle, rgba(20,49,17,0.35) 0%, rgba(20,49,17,0) 70%)" }}
                      ></span>
                      <div ref={el => (whyIconRefs.current[idx] = el)} style={{ opacity: 0 }} className="relative z-10">
                        {item.icon}
                      </div>
                    </div>
                    <span className="text-[13px] font-medium text-black whitespace-pre-line leading-tight">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Doctors Image */}
            <div className="absolute right-0 bottom-0 w-[60%] md:w-[65%] h-[150%] pointer-events-none">
              <img 
                ref={doctorsImgRef}
                src={d1?.src || d1} 
                alt="Doctors" 
                className="w-full h-full object-contain object-right-bottom mix-blend-multiply" 
                style={{ opacity: 0 }}
              />
            </div>
          </div>

          {/* Meet Our Eminent Speakers (Right) */}
          <div ref={speakersCardRef} className="lg:col-span-7 bg-[#fbfdfa] rounded-2xl px-6 pb-6 pt-4 md:px-8 md:pb-8 md:pt-5" style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px", opacity: 0 }}>
            <div className="flex flex-col sm:flex-row items-center justify-center mb-8 gap-4 relative w-full">
              <div className="flex flex-col items-center w-full sm:w-auto md:-translate-x-8">
                <h3 ref={speakersHeadingRef} style={{ opacity: 0 }} className="font-bold text-[#143111] text-base md:text-[18px] uppercase text-center">
                  MEET OUR EMINENT SPEAKERS & LEADERS
                </h3>
                <div ref={speakersUnderlineRef} className="h-[2px] w-20 bg-[#111844] mt-1" style={{ transform: "scaleX(0)" }}></div>
              </div>
              <div className="sm:absolute sm:right-0 flex">
                <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                  <Sparkle color="#111844" style={{ top: '-14px', left: '20%', animationDelay: '0s' }} />
                  <Sparkle color="#111844" style={{ bottom: '-14px', right: '20%', animationDelay: '0.7s' }} />
                  <span
                    ref={speakersHaloRef}
                    className="halo-ring"
                    style={{ opacity: 0, background: "radial-gradient(circle, rgba(17,24,68,0.35) 0%, rgba(17,24,68,0) 70%)" }}
                  ></span>
                  <Link href="/speakers" target="_blank" rel="noopener noreferrer" ref={speakersBtnRef} style={{ opacity: 0 }} className="btn-delegate-blue group rounded-full px-3 py-1.5 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[9px] font-black flex items-center gap-1.5 shadow-md hover:shadow-lg shrink-0 relative z-10 whitespace-nowrap">
                    <span className="btn-shine"></span>
                    <span>VIEW ALL SPEAKERS</span>
                    <ArrowRight size={10} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300 text-white" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div ref={marqueeWrapRef} style={{ opacity: 0 }} className="overflow-hidden w-full relative pt-2 pb-4">
              {/* Fade masks for smooth edges */}
              <div className="absolute inset-y-0 left-0 w-6 md:w-10 bg-gradient-to-r from-[#fbfdfa] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-6 md:w-10 bg-gradient-to-l from-[#fbfdfa] to-transparent z-10 pointer-events-none"></div>
              
              <div className="animate-marquee gap-3 lg:gap-4">
                {[...speakers, ...speakers].map((speaker, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group cursor-pointer w-[120px] md:w-[130px] shrink-0">
                    <div className="w-[85px] md:w-[95px] aspect-[4/5] rounded-xl overflow-hidden mb-3 mx-auto">
                      <img 
                        src={speaker.image && speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`} 
                        alt={speaker.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <h3 className="text-[#111844] font-medium text-[12px] leading-tight mb-1 whitespace-pre-line">{speaker.name}</h3>
                    <p className="text-black text-[10px] font-medium leading-tight whitespace-pre-line">{speaker.designation}{speaker.organization ? `,\n${speaker.organization}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </SectionContainer>
      {/* -- Decorative Top/Bottom overlays can go here if needed -- */}
    </div>
  );
};

export default DelegateInfoSections;
