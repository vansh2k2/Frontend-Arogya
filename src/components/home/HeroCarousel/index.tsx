"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight, User, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import hero1 from '@/assets/banner/hero2.webp';
import hero2 from '@/assets/banner/hero3.webp';
import hero3 from '@/assets/banner/hero4.webp';
import hero4 from '@/assets/banner/hero55.webp';

/* ─────────────────────────────────────────
   SPARKLE
───────────────────────────────────────── */
const Sparkle = ({ style, color = '#fff176' }) => (
  <span style={{ position:'absolute', pointerEvents:'none', fontSize:'13px', color,
    animation:'sparkleAnim 1.6s ease-in-out infinite', opacity:0, zIndex:20, ...style }}>✦</span>
);

/* ─────────────────────────────────────────
   SLIDE DATA
───────────────────────────────────────── */
const SLIDES = [
  {
    id: 0, img: hero1, theme: 'gold',
    accentHex: '#b08735', textHex: '#063e26', iconHex: '#a07b30',
    subtitle: <>India's Premier Conference on<br />Integrated Healthcare, AYUSH, Pharma,<br />Wellness & Innovation</>,
    btn1: { cls: 'btn-gold', label: 'Register as Delegate', textCls:'text-[#0b2912]', hasArrow:true, link: '/delegate-registration', newTab: true },
    btn2: { cls: 'btn-darkgreen', label: 'Become a Speaker', textCls:'text-white', hasUser:true, sparkleColor:'#063e26' },
  },
  {
    id: 1, img: hero2, theme: 'blue',
    accentHex: '#0a2c53', textHex: '#043055', iconHex: '#0a2c53',
    subtitle: <>Advancing Science. Enhancing Lives.<br />Building the Future of Medicine.</>,
    btn1: { cls: 'btn-blue', label: 'Explore Sessions', textCls:'text-white', hasArrow:true, sparkleColor:'#032e55' },
    btn2: { cls: 'btn-gold', label: 'Register Now', textCls:'text-[#0b2912]', hasUser:true },
  },
  {
    id: 2, img: hero3, theme: 'green',
    accentHex: '#063e26', textHex: '#063e26', iconHex: '#a07b30',
    subtitle: <>Reviving Ancient Wisdom for<br />a Healthier Tomorrow</>,
    btn1: { cls: 'btn-blue', label: 'Explore Sessions', textCls:'text-white', hasArrow:true, sparkleColor:'#032e55' },
    btn2: { cls: 'btn-gold', label: 'Register Now', textCls:'text-[#0b2912]', hasUser:true },
  },
  {
    id: 3, img: hero4, theme: 'green',
    accentHex: '#063e26', textHex: '#063e26', iconHex: '#a07b30',
    subtitle: <>Innovating Today for a<br />Healthier Tomorrow</>,
    btn1: { cls: 'btn-blue', label: 'Explore Sessions', textCls:'text-white', hasArrow:true, sparkleColor:'#032e55' },
    btn2: { cls: 'btn-gold', label: 'Register Now', textCls:'text-[#0b2912]', hasUser:true },
  },
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const HeroCarousel = () => {
  const [cur, setCur] = useState(0);
  const curRef   = useRef(0);
  const busyRef  = useRef(false);
  const timerRef = useRef(null);

  /* layer refs */
  const wrapperRef   = useRef(null);        // section
  const bgLayers     = useRef([]);          // one wrapper div per slide
  const imgEls       = useRef([]);          // <img> inside each bgLayer
  const panels       = useRef([]);          // content panels
  const lensRef      = useRef(null);        // cinematic lens-flare div
  const vigRef       = useRef(null);        // vignette overlay
  const revealBar    = useRef(null);        // horizontal wipe bar
  const kenTimeline  = useRef(null);

  /* ── Ken-Burns on current slide ── */
  const playKenBurns = useCallback((idx) => {
    if (kenTimeline.current) kenTimeline.current.kill();
    const img = imgEls.current[idx];
    if (!img) return;
    const origins = ['50% 50%','40% 60%','60% 40%','55% 45%'];
    gsap.set(img, { scale:1.0, transformOrigin: origins[idx % origins.length] });
    kenTimeline.current = gsap.to(img, {
      scale: 1.08,
      duration: 9,
      ease: 'none',
    });
  }, []);

  /* ── Animate content OUT ── */
  const contentOut = useCallback((idx, done) => {
    const panel = panels.current[idx];
    if (!panel) { done?.(); return; }
    const items = panel.querySelectorAll('[data-anim]');

    gsap.to(items, {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      stagger: { each: 0.045, from:'start' },
      onComplete: done,
    });
  }, []);

  /* ── Animate content IN ── */
  const contentIn = useCallback((idx) => {
    const panel = panels.current[idx];
    if (!panel) return;
    const items = panel.querySelectorAll('[data-anim]');

    gsap.set(items, { opacity:0, y:40, filter:'blur(4px)' });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.75,
      ease: 'power3.out',
      stagger: { each: 0.08, from:'start' },
      delay: 0.1,
    });
  }, []);

  /* ── CORE TRANSITION ── */
  const goTo = useCallback((targetIdx) => {
    if (busyRef.current || targetIdx === curRef.current) return;
    busyRef.current = true;
    clearTimeout(timerRef.current);

    const prevIdx  = curRef.current;
    const prevBg   = bgLayers.current[prevIdx];
    const prevImg  = imgEls.current[prevIdx];
    const nextBg   = bgLayers.current[targetIdx];
    const nextImg  = imgEls.current[targetIdx];

    curRef.current = targetIdx;

    /* kill ken burns */
    if (kenTimeline.current) kenTimeline.current.kill();

    /* ── MASTER TIMELINE ── */
    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
        /* reset prev layer */
        gsap.set(prevBg, { zIndex:1, clipPath:'inset(0 0% 0 0)', opacity:1, x:0 });
        gsap.set(prevImg, { scale:1, filter:'none' });
        startTimer(targetIdx);
        playKenBurns(targetIdx);
      }
    });

    /* 1 ── content exits */
    tl.add(() => contentOut(prevIdx, null), 0);

    /* 2 ── Lens flare burst */
    tl.fromTo(lensRef.current,
      { opacity:0, scale:0.3, x:'-50%', y:'-50%' },
      { opacity:0.55, scale:2.2, duration:0.22, ease:'power2.out' },
      0.05
    ).to(lensRef.current, { opacity:0, scale:3, duration:0.4, ease:'power2.in' }, 0.22);

    /* 3 ── Vignette pulse */
    tl.fromTo(vigRef.current,
      { opacity:0.0 },
      { opacity:0.55, duration:0.25, ease:'power2.out', yoyo:true, repeat:1 },
      0
    );

    /* 4 ── REVEAL BAR: horizontal wipe across screen */
    gsap.set(nextBg, { zIndex:4 });
    gsap.set(nextImg, { scale:1.1, filter:'brightness(0.6) saturate(0.4)' });

    /* reveal bar sweeps left→right revealing next image */
    tl.set(revealBar.current, { scaleX:0, transformOrigin:'left center', opacity:1 }, 0.08);
    tl.to(revealBar.current,
      { scaleX:1, duration:0.55, ease:'power4.inOut' },
      0.08
    );

    /* next image unclips from left to right (wipe-in) */
    gsap.set(nextBg, { clipPath:'inset(0 100% 0 0)' });
    tl.to(nextBg,
      { clipPath:'inset(0 0% 0 0)', duration:0.55, ease:'power4.inOut' },
      0.08
    );

    /* bar then disappears by scaling right→left */
    tl.to(revealBar.current,
      { scaleX:0, transformOrigin:'right center', duration:0.4, ease:'power4.in', opacity:0 },
      0.6
    );

    /* 5 ── prev slides away to left */
    tl.to(prevBg, { x:'-6%', opacity:0, duration:0.5, ease:'power2.in' }, 0.12);

    /* 6 ── next image sharpens + zooms to normal */
    tl.to(nextImg,
      { scale:1, filter:'brightness(1) saturate(1)', duration:0.85, ease:'power2.out' },
      0.35
    );

    /* 7 ── React state update + content in */
    tl.add(() => {
      setCur(targetIdx);
      gsap.set(prevBg, { x:0 }); // reset translate
      gsap.set(nextBg, { zIndex:2 });
    }, 0.55);

    tl.add(() => contentIn(targetIdx), 0.6);

  }, [contentOut, contentIn, playKenBurns]);

  const startTimer = useCallback((idx) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goTo((idx + 1) % SLIDES.length);
    }, 5000);
  }, [goTo]);

  /* ── INIT ── */
  useEffect(() => {
    /* ── PRELOAD first hero image for LCP ── */
    const preloadFirst = document.createElement('link');
    preloadFirst.rel = 'preload';
    preloadFirst.as = 'image';
    preloadFirst.href = typeof hero1 === 'string' ? hero1 : (hero1 as any).src;
    preloadFirst.fetchPriority = 'high';
    document.head.prepend(preloadFirst);

    /* ── Preload remaining images during idle time ── */
    const preloadFn = () => {
      [hero2, hero3, hero4].forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = typeof src === 'string' ? src : (src as any).src;
        link.fetchPriority = 'low';
        document.head.appendChild(link);
      });
    };
    const idleId = window.requestIdleCallback 
      ? window.requestIdleCallback(preloadFn, { timeout: 3000 })
      : window.setTimeout(preloadFn, 3000);

    /* set all bg layers z-index=1, clip visible for cur=0, hidden for rest */
    bgLayers.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { zIndex: i === 0 ? 2 : 1, clipPath:'inset(0 0% 0 0)', opacity:1, x:0 });
    });

    /* hide content panels initially */
    panels.current.forEach((panel, i) => {
      if (!panel) return;
      const items = panel.querySelectorAll('[data-anim]');
      gsap.set(items, { opacity:0, y:40, filter:'blur(4px)' });
    });

    /* lens flare init */
    gsap.set(lensRef.current, { opacity:0, xPercent:-50, yPercent:-50 });
    gsap.set(vigRef.current, { opacity:0 });
    gsap.set(revealBar.current, { scaleX:0, opacity:0 });

    /* initial content in with a beautiful staggered entrance */
    const initPanel = panels.current[0];
    if (initPanel) {
      const items = initPanel.querySelectorAll('[data-anim]');
      gsap.set(items, { opacity:0, y:60, filter:'blur(8px)' });
      gsap.to(items, {
        opacity:1, y:0, filter:'blur(0px)',
        duration:1.0, ease:'power4.out',
        stagger: { each:0.1, from:'start' },
        delay: 0.3,
      });
    }

    playKenBurns(0);
    startTimer(0);
    return () => {
      clearTimeout(timerRef.current);
      if (kenTimeline.current) kenTimeline.current.kill();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      if (preloadFirst.parentNode) preloadFirst.parentNode.removeChild(preloadFirst);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity:0; transform:scale(0.5) translateY(0); }
          40%  { opacity:1; transform:scale(1.2) translateY(-4px); }
          80%  { opacity:0.5; transform:scale(0.9) translateY(-6px); }
          100% { opacity:0; transform:scale(0.5) translateY(-8px); }
        }
        @keyframes goldShift {
          0%,100% { background-position:0% 50%; }
          50%      { background-position:100% 50%; }
        }
        @keyframes shimmer {
          0%   { left:-75%; }
          100% { left:150%; }
        }
        @keyframes dotPulse {
          0%,100% { box-shadow:0 0 0 0px rgba(255,255,255,0.4); }
          50%      { box-shadow:0 0 0 4px rgba(255,255,255,0.15); }
        }

        /* ── GOLD BUTTON ── */
        .btn-gold {
          background:linear-gradient(135deg,#f5c842 0%,#ffdd00 30%,#ffa500 60%,#f5c842 100%);
          background-size:200% 200%;
          animation:goldShift 2.5s ease infinite;
          box-shadow:0 0 18px 4px rgba(255,200,0,0.22);
          position:relative; overflow:hidden;
          border:2px solid white !important;
        }
        .btn-gold::before {
          content:''; position:absolute; top:-50%; left:-75%; width:50%; height:200%;
          background:linear-gradient(to right,transparent,rgba(255,255,255,0.58),transparent);
          transform:skewX(-20deg); animation:shimmer 2s infinite;
        }

        /* ── BLUE BUTTON ── */
        .btn-blue {
          background:linear-gradient(135deg,#021a30 0%,#032e55 30%,#054885 60%,#021a30 100%);
          background-size:200% 200%;
          animation:goldShift 2.5s ease infinite;
          box-shadow:0 0 18px 4px rgba(3,46,85,0.22);
          position:relative; overflow:hidden;
          border:2px solid white !important;
        }
        .btn-blue::before {
          content:''; position:absolute; top:-50%; left:-75%; width:50%; height:200%;
          background:linear-gradient(to right,transparent,rgba(255,255,255,0.38),transparent);
          transform:skewX(-20deg); animation:shimmer 2s infinite;
        }

        /* ── DARK GREEN BUTTON ── */
        .btn-darkgreen {
          background:#063e26;
          position:relative; overflow:hidden;
          border:2px solid white !important;
          transition:background 0.3s;
        }
        .btn-darkgreen:hover { background:#042f1c; }

        /* ── DOT ACTIVE ── */
        .dot-active { animation: dotPulse 1.8s ease-in-out infinite; }

        /* ── ARROW BUTTONS ── */
        .carousel-arrow {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .carousel-arrow:hover { transform: translateY(-50%) scale(1.18); background:rgba(255,255,255,0.92); }
      `}</style>

      <section
        ref={wrapperRef}
        className="relative w-full overflow-hidden bg-[#faf8f4] aspect-[0.82/1] sm:aspect-[16/8.9] md:aspect-[16/5.44] flex items-center font-inter"
      >

        {/* ── BACKGROUND LAYERS ── */}
        {SLIDES.map(({ id, img }) => (
          <div
            key={id}
            ref={el => { bgLayers.current[id] = el as any; }}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: id === 0 ? 2 : 1, willChange:'clip-path, opacity, transform' }}
          >
            <Image
              ref={el => { imgEls.current[id] = el as any; }}
              src={img}
              alt={`Arogya Banner ${id + 1}`}
              fill
              sizes="100vw"
              className="object-cover select-none"
              style={{ willChange:'transform, filter' }}
              priority={id < 2}
            />
          </div>
        ))}

        {/* ── CINEMATIC VIGNETTE (always on) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex:6,
            background:'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.38) 100%)',
          }}
        />

        {/* ── TRANSITION VIGNETTE PULSE ── */}
        <div
          ref={vigRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex:7, background:'rgba(0,0,0,0.6)', opacity:0 }}
        />

        {/* ── LENS FLARE ── */}
        <div
          ref={lensRef}
          className="absolute pointer-events-none"
          style={{
            zIndex:8, top:'42%', left:'35%',
            width:180, height:180,
            borderRadius:'50%',
            background:'radial-gradient(circle, rgba(255,230,120,0.85) 0%, rgba(255,180,0,0.4) 35%, transparent 70%)',
            mixBlendMode:'screen',
            opacity:0,
          }}
        />

        {/* ── WIPE BAR ── */}
        <div
          ref={revealBar}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex:5,
            background:'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.0) 100%)',
            transformOrigin:'left center',
            transform: 'scaleX(0)',
          }}
        />

        {/* ── MOBILE GRADIENT ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/65 via-white/20 to-transparent pointer-events-none md:hidden" style={{zIndex:9}} />

        {/* ── CONTENT PANELS ── */}
        <div className="relative container mx-auto px-6 md:px-16 max-w-[1400px] w-full h-full grid items-center justify-items-start" style={{zIndex:10}}>

          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              ref={el => { panels.current[slide.id] = el as any; }}
              className="col-start-1 row-start-1 w-full max-w-xl md:max-w-2xl flex flex-col justify-center md:pl-4 lg:pl-6"
              style={{
                visibility: cur === slide.id ? 'visible' : 'hidden',
                pointerEvents: cur === slide.id ? 'auto' : 'none',
              }}
            >
              {/* Edition tag */}
              <div
                data-anim="1"
                className="flex items-center gap-3 font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase mb-0.5 ml-4 md:ml-8"
                style={{ color: slide.accentHex }}
              >
                <span className="w-8 sm:w-12 h-[1.5px]" style={{ background: slide.accentHex }} />
                <span>18th Edition of</span>
                <span className="w-8 sm:w-12 h-[1.5px]" style={{ background: slide.accentHex }} />
              </div>

              {/* Logo */}
              <div data-anim="2" className="mb-2 sm:mb-3 -mt-1 sm:-mt-2">
                <Image
                  src="/logo1.png"
                  alt="Arogya Sangoshthi Logo"
                  width={313}
                  height={128}
                  priority={slide.id === 0}
                  className="h-20 sm:h-26 md:h-32 lg:h-36 xl:h-32 w-auto max-w-none ml-6 md:ml-10 object-contain scale-x-[1.15]"
                />
              </div>

              {/* Subtitle */}
              <p
                data-anim="3"
                className="font-medium text-xs sm:text-sm md:text-[15px] lg:text-lg max-w-md sm:max-w-xl leading-relaxed mb-2 sm:mb-3 -mt-0.5 sm:-mt-1"
                style={{ color: slide.textHex }}
              >
                {slide.subtitle}
              </p>

              {/* Date / Location */}
              <div
                data-anim="4"
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-black font-bold text-[9px] sm:text-[11px] lg:text-[13px] uppercase mb-3.5 sm:mb-5 py-2 sm:py-3 w-full max-w-md sm:max-w-lg -mt-2 sm:-mt-3.5"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar size={15} className="shrink-0" style={{ color: slide.iconHex }} />
                  <span>21-23 August 2026</span>
                </div>
                <span className="hidden sm:inline opacity-40" style={{ color: slide.accentHex }}>|</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin size={15} className="shrink-0" style={{ color: slide.iconHex }} />
                  <span>Pragati Maidan, New Delhi</span>
                </div>
              </div>

              {/* Buttons */}
              <div data-anim="5" className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 w-full -mt-1.5 sm:-mt-2.5">
                {/* BTN 1 */}
                <div style={{ position:'relative', display:'inline-block' }} className="shrink-0">
                  <Sparkle color={slide.btn1.sparkleColor || '#032e55'} style={{ top:'-14px', left:'10%', animationDelay:'0s' }} />
                  <Sparkle color={slide.btn1.sparkleColor || '#032e55'} style={{ top:'-12px', left:'48%', animationDelay:'0.4s' }} />
                  <Sparkle color={slide.btn1.sparkleColor || '#032e55'} style={{ bottom:'-14px', right:'16%', animationDelay:'0.8s' }} />
                  <Link
                    href={slide.btn1.link || "/register-now"}
                    target={slide.btn1.newTab ? "_blank" : undefined}
                    rel={slide.btn1.newTab ? "noopener noreferrer" : undefined}
                    className={`${slide.btn1.cls} group rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 ${slide.btn1.textCls} transition-all duration-300 uppercase tracking-[0.12em] text-[9px] sm:text-[10px] font-black flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg shrink-0 relative z-10`}
                  >
                    <span>{slide.btn1.label}</span>
                    {slide.btn1.hasArrow && <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />}
                  </Link>
                </div>

                {/* BTN 2 */}
                <div style={{ position:'relative', display:'inline-block' }} className="shrink-0">
                  <Sparkle color={slide.btn2.sparkleColor || '#fff176'} style={{ top:'-14px', left:'38%', animationDelay:'0s' }} />
                  <Sparkle color={slide.btn2.sparkleColor || '#fff176'} style={{ bottom:'-14px', left:'15%', animationDelay:'0.7s' }} />
                  <Link
                    href="/register-now"
                    className={`${slide.btn2.cls} group rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 ${slide.btn2.textCls} transition-all duration-300 uppercase tracking-[0.12em] text-[9px] sm:text-[10px] font-black flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg shrink-0 relative z-10`}
                  >
                    {slide.btn2.hasUser && <User size={14} className="shrink-0" />}
                    <span>{slide.btn2.label}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── PROGRESS BAR ── */}
        <ProgressBar cur={cur} total={SLIDES.length} duration={5000} key={cur} />

        {/* ── ARROWS ── */}
        <button
          onClick={() => goTo((cur - 1 + SLIDES.length) % SLIDES.length)}
          className="carousel-arrow absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/70 border border-white/40 flex items-center justify-center shadow"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => goTo((cur + 1) % SLIDES.length)}
          className="carousel-arrow absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/70 border border-white/40 flex items-center justify-center shadow"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>

        {/* ── DOTS ── */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {SLIDES.map(({ id }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className={`rounded-full border border-white/40 transition-all duration-400 ${
                cur === id
                  ? 'w-5 h-2 bg-white dot-active'
                  : 'w-2 h-2 bg-white/45 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${id + 1}`}
            />
          ))}
        </div>

      </section>
    </>
  );
};

/* ─────────────────────────────────────────
   CINEMATIC PROGRESS BAR
   Thin gold line at the bottom that fills
   up over the slide duration
───────────────────────────────────────── */
const ProgressBar = ({ cur, total, duration }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(barRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: duration / 1000, ease: 'none', transformOrigin: 'left center' }
    );
    return () => gsap.killTweensOf(barRef.current);
  }, [cur, duration]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden" style={{ zIndex:30 }}>
      <div
        ref={barRef}
        className="h-full w-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #f5c842, #ffdd00, #ffa500)',
          boxShadow: '0 0 8px 2px rgba(255,200,0,0.5)',
          transformOrigin: 'left center',
        }}
      />
    </div>
  );
};

export default HeroCarousel;
