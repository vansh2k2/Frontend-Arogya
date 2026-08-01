import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, Store, Globe, Mic, Calendar, ArrowRight } from "lucide-react";
import delegateBg from "@/assets/banner/delebg.webp";
import logo from "@/assets/banner/logoImg.png";
import dleaf from "@/assets/icons/leafs.png";
import SectionContainer from "@/components/layout/SectionContainer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Sparkle Component ───────────────────────────────────────────────────────
const Sparkle = ({ style, color = '#fff176' }) => (
  <span style={{
    position: 'absolute', pointerEvents: 'none', fontSize: '13px', color,
    animation: 'sparkleAnim 1.6s ease-in-out infinite', opacity: 0, zIndex: 20, ...style
  }}>✦</span>
);

// ─── Animated Counter ────────────────────────────────────────────────────────
const AnimatedCounter = ({ value, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState("0" + (value.includes("+") ? "+" : ""));
  const elRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const numeric = value.replace(/,/g, "").match(/\d+/);
    if (!numeric) { setDisplayValue(value); return; }

    const target = parseInt(numeric[0], 10);
    const suffix = value.includes("+") ? "+" : "";
    const hasComma = value.includes(",");

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return;
      hasAnimated.current = true;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        delay,
        ease: "power4.out",
        onUpdate() {
          const v = Math.round(obj.val);
          setDisplayValue((hasComma ? v.toLocaleString("en-US") : String(v)) + suffix);
        },
        onComplete() { setDisplayValue(value); },
      });
    }, { threshold: 0.25 });

    if (elRef.current) observer.observe(elRef.current);
    return () => { if (elRef.current) observer.unobserve(elRef.current); };
  }, [value, delay]);

  return <span ref={elRef}>{displayValue}</span>;
};

// ─── Word-by-word heading reveal ─────────────────────────────────────────────
const SplitHeading = ({ text, onComplete }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = text
      .split(" ")
      .map(
        w =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.28em">` +
          `<span class="word" style="display:inline-block;transform:translateY(115%)">${w}</span>` +
          `</span>`
      )
      .join("");

    const words = el.querySelectorAll(".word");

    const tween = gsap.to(words, {
      y: 0,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.06,
      delay: 0.55,
      onComplete: () => onComplete && onComplete(),
    });

    return () => tween.kill();
  }, [text]);

  return (
    <h1
      ref={ref}
      className="font-inter text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#143111] leading-tight mb-1 uppercase tracking-tight md:pl-[30px]"
    >
      {text}
    </h1>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const DelegateHero = () => {
  const navigate = useRouter();
  const statsBarRef = useRef(null);
  
  const scrollToFees = () => {
    const feesSection = document.getElementById('registration-fees');
    if (feesSection) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = feesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  const statItemsRef = useRef([]);
  const iconRefs = useRef([]);

  const bgRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const logoRef = useRef(null);
  const subTextRef = useRef(null);
  const btnGroupRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const shine1Ref = useRef(null);
  const shine2Ref = useRef(null);
  const heroSectionRef = useRef(null);

  const stats = [
    { label: "Expected Delegates", value: "15,000+", delay: 0, icon: <Users size={24} className="text-[#F3B71B] shrink-0" strokeWidth={1.5} /> },
    { label: "Exhibitors", value: "500+", delay: 0.15, icon: <Store size={24} className="text-[#F3B71B] shrink-0" strokeWidth={1.5} /> },
    { label: "Countries", value: "50+", delay: 0.30, icon: <Globe size={24} className="text-[#F3B71B] shrink-0" strokeWidth={1.5} /> },
    { label: "Speakers", value: "200+", delay: 0.45, icon: <Mic size={24} className="text-[#F3B71B] shrink-0" strokeWidth={1.5} /> },
    { label: "Days of Innovation", value: "3", delay: 0.60, icon: <Calendar size={24} className="text-[#F3B71B] shrink-0" strokeWidth={1.5} /> },
  ];

  // ── Page-load hero intro timeline ─────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Background: cinematic zoom-out + blur clear, settles and STAYS still (no loop)
      gsap.fromTo(
        bgRef.current,
        { scale: 1.18, opacity: 0, filter: "blur(6px)" },
        {
          scale: 1, opacity: 1, filter: "blur(0px)",
          duration: 1.6,
          ease: "power2.out",
        }
      );

      // Soft dark-to-clear overlay wipe for extra depth on load
      gsap.fromTo(
        bgOverlayRef.current,
        { opacity: 0.45 },
        {
          opacity: 0,
          duration: 1.8,
          ease: "power2.out",
          delay: 0.1,
        }
      );

      // Logo: pop in with a soft rotation + scale + fade
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.6, rotate: -8, y: 30 },
        {
          opacity: 1, scale: 1, rotate: 0, y: 0,
          duration: 1.05,
          ease: "back.out(1.6)",
          delay: 0.15,
        }
      );

      // Subheading: fade up + soft letter-spacing settle, timed after heading words finish
      gsap.fromTo(
        subTextRef.current,
        { opacity: 0, y: 22, letterSpacing: "0.08em" },
        {
          opacity: 1, y: 0, letterSpacing: "0em",
          duration: 0.9,
          ease: "power3.out",
          delay: 1.35,
        }
      );

      gsap.set(btnGroupRef.current, { opacity: 1 });

      // Buttons: elastic pop-in, staggered
      gsap.fromTo(
        [btn1Ref.current, btn2Ref.current],
        { opacity: 0, scale: 0.4, y: 24, rotate: -4 },
        {
          opacity: 1, scale: 1, y: 0, rotate: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "elastic.out(1, 0.55)",
          delay: 1.65,
        }
      );

      // One-time diagonal "shine" sweep across each button after it lands
      gsap.fromTo(
        [shine1Ref.current, shine2Ref.current],
        { xPercent: -130 },
        {
          xPercent: 130,
          duration: 0.9,
          ease: "power2.inOut",
          stagger: 0.18,
          delay: 2.35,
        }
      );

    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // ── Stats bar scroll-triggered reveal ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // stats bar — slide up + fade + slight scale
      gsap.fromTo(
        statsBarRef.current,
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: statsBarRef.current, start: "top 93%", once: true },
        }
      );

      // subtle glow pulse around the bar as it lands (one-time, not looping)
      gsap.fromTo(
        statsBarRef.current,
        { boxShadow: "0 0 0 0 rgba(243,183,27,0)" },
        {
          boxShadow: "0 15px 40px rgba(3,46,28,0.15)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: statsBarRef.current, start: "top 93%", once: true },
        }
      );

      // stat items — pop-in stagger with back.out bounce
      gsap.fromTo(
        statItemsRef.current.filter(Boolean),
        { opacity: 0, scale: 0.7, y: 18 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.65,
          stagger: 0.12,
          delay: 0.2,
          ease: "back.out(2)",
          scrollTrigger: { trigger: statsBarRef.current, start: "top 93%", once: true },
        }
      );

      // icons — playful spin-in, slightly offset from their parent items
      gsap.fromTo(
        iconRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.3, rotate: -120 },
        {
          opacity: 1, scale: 1, rotate: 0,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.35,
          ease: "back.out(2.4)",
          scrollTrigger: { trigger: statsBarRef.current, start: "top 93%", once: true },
        }
      );

      // dividers — grow from 0 height for a clean "drawing in" feel
      gsap.fromTo(
        statsBarRef.current.querySelectorAll(".stat-divider"),
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1, opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.45,
          ease: "power2.out",
          transformOrigin: "center",
          scrollTrigger: { trigger: statsBarRef.current, start: "top 93%", once: true },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  // ── Button hover micro-interactions (GSAP, not pure CSS) ───────────────────
  const handleBtnEnter = (ref) => {
    gsap.to(ref.current, { scale: 1.06, y: -2, duration: 0.3, ease: "power2.out" });
  };
  const handleBtnLeave = (ref) => {
    gsap.to(ref.current, { scale: 1, y: 0, duration: 0.35, ease: "power2.out" });
  };

  return (
    <div className="flex flex-col w-full" ref={heroSectionRef}>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity:0; transform:scale(0.5) translateY(0); }
          40%  { opacity:1; transform:scale(1.2) translateY(-4px); }
          80%  { opacity:0.5; transform:scale(0.9) translateY(-6px); }
          100% { opacity:0; transform:scale(0.5) translateY(-8px); }
        }
        .btn-delegate-green {
          background:#007979;
          position:relative; overflow:hidden;
          border:2px solid white !important;
          transition:background 0.3s;
          will-change: transform;
        }
        .btn-delegate-green:hover { background:#005c5c; }
        
        .btn-delegate-darkgreen {
          background:#063e26;
          position:relative; overflow:hidden;
          border:2px solid white !important;
          transition:background 0.3s;
          will-change: transform;
        }
        .btn-delegate-darkgreen:hover { background:#042f1c; }
        
        .btn-delegate-white {
          background: white;
          position:relative; overflow:hidden;
          border:1px solid #e5e7eb !important;
          transition:background 0.3s;
        }
        .btn-delegate-white:hover { background:#f8fafc; }

        .stat-divider {
          transform-origin: center;
        }

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
        }
      `}</style>
      <section className="relative w-full h-auto md:h-[320px] overflow-hidden py-8 md:py-0 font-inter">
        {/* full width bg image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={bgRef}
            src={delegateBg?.src || delegateBg}
            alt="Conference Venue"
            className="w-full h-full object-cover object-[center_45%]"
            style={{ opacity: 0 }}
          />
          <div
            ref={bgOverlayRef}
            className="absolute inset-0 w-full h-full bg-black pointer-events-none"
            style={{ opacity: 0 }}
          ></div>
        </div>

        {/* Decorative Left Leaf */}
        <img
          src={dleaf?.src || dleaf}
          alt="Decorative Leaf"
          className="absolute bottom-[-10px] left-[-10px] md:bottom-[-16px] md:left-[-16px] w-20 md:w-28 xl:w-32 z-20 pointer-events-none object-contain drop-shadow-lg opacity-100"
        />

        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-0">

          {/* Left — heading + subtitle */}
          <div className="w-full md:w-1/2 z-10 text-center md:text-left md:mt-6">
            <div className="flex flex-col items-center md:items-start md:pl-[30px] lg:pl-[50px] mb-4">
              <img
                ref={logoRef}
                src={logo?.src || logo}
                className="h-[140px] md:h-[180px] object-contain"
                alt="logo"
                style={{ opacity: 0 }}
              />
              <h2
                ref={subTextRef}
                style={{ opacity: 0 }}
                className="text-[#143111] text-[18px] md:text-[20px] font-medium leading-snug max-w-[480px] -mt-2 md:-mt-6 md:ml-[90px] lg:ml-[140px]"
              >
                <span className="text-black">Uniting Innovation, Wellness & <br className="hidden md:block" />
                  Sustainability for a </span> Better Tomorrow
              </h2>

              {/* Action Buttons */}
              <div
                ref={btnGroupRef}
                style={{ opacity: 0 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-5 md:ml-[90px] lg:ml-[140px]"
              >

                <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                  <Sparkle color="#007979" style={{ top: '-14px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#007979" style={{ top: '-12px', left: '48%', animationDelay: '0.4s' }} />
                  <Sparkle color="#007979" style={{ bottom: '-14px', right: '16%', animationDelay: '0.8s' }} />
                  <button
                    onClick={scrollToFees}
                    ref={btn1Ref}
                    style={{ opacity: 0 }}
                    onMouseEnter={() => handleBtnEnter(btn1Ref)}
                    onMouseLeave={() => handleBtnLeave(btn1Ref)}
                    className="btn-delegate-green group rounded-full px-5 py-2 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[10px] sm:text-[11px] font-black flex items-center gap-2 shadow-md hover:shadow-lg shrink-0 relative z-10"
                  >
                    <span ref={shine1Ref} className="btn-shine"></span>
                    <span>REGISTER NOW</span>
                    <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                  <Sparkle color="#063e26" style={{ top: '-14px', left: '38%', animationDelay: '0s' }} />
                  <Sparkle color="#063e26" style={{ bottom: '-14px', left: '15%', animationDelay: '0.7s' }} />
                  <button
                    onClick={() => window.open('/speakers', '_blank')}
                    ref={btn2Ref}
                    style={{ opacity: 0 }}
                    onMouseEnter={() => handleBtnEnter(btn2Ref)}
                    onMouseLeave={() => handleBtnLeave(btn2Ref)}
                    className="btn-delegate-darkgreen group rounded-full px-5 py-2 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[10px] sm:text-[11px] font-black flex items-center gap-2 shadow-md hover:shadow-lg shrink-0 relative z-10"
                  >
                    <span ref={shine2Ref} className="btn-shine"></span>
                    <Mic size={14} className="shrink-0" />
                    <span>BECOME A SPEAKER</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats bar (Moved below the hero banner) */}
      <div className="w-full relative z-30 -mt-2 pb-6 bg-transparent">
        <SectionContainer>
          <div
            ref={statsBarRef}
            style={{ opacity: 0 }}
            className="w-full bg-[#032e1c] border border-[#043b24] rounded-xl md:rounded-2xl py-2 md:py-3 px-4 md:px-10 shadow-[0_15px_40px_rgba(3,46,28,0.15)] flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 md:gap-4 relative mx-auto"
          >
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => (statItemsRef.current[index] = el)}
              style={{ opacity: 0 }}
              className="flex items-center gap-3 md:gap-4 flex-1 min-w-[140px] justify-center md:justify-start"
            >
              <div
                ref={el => (iconRefs.current[index] = el)}
                style={{ opacity: 0 }}
                className="shrink-0 flex items-center justify-center"
              >
                {stat.icon}
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[#F3B71B] font-bold text-lg md:text-xl leading-none font-inter">
                  <AnimatedCounter value={stat.value} delay={stat.delay} />
                </span>
                <span className="text-white font-semibold text-[8px] md:text-[9px] uppercase tracking-widest mt-0.5 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
              {/* Divider between items (hidden on last item and mobile) */}
              {index < stats.length - 1 && (
                <div className="stat-divider hidden lg:block w-px h-10 bg-[#044a2c] ml-auto" style={{ opacity: 0 }}></div>
              )}
            </div>
          ))}
        </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default DelegateHero;
