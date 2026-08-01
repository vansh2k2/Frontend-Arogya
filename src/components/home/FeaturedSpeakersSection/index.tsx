"use client";
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SectionContainer from '@/components/layout/SectionContainer';
import { globalVoicesApi, SERVER_URL } from '@/lib/api';
import { optimizeCloudinaryUrl } from '@/utils/imageOptimization';

const CARD_WIDTH = 260;
const CARD_GAP   = 12;
const SPEED      = 0.6; // px per frame

const Sparkle = ({ style, color = '#fff176' }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '16px',
      color,
      textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >✦</span>
);

const FeaturedSpeakersSection = () => {
  const router = useRouter();
  const trackRef  = useRef(null);
  const animRef   = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  const [speakersData, setSpeakersData] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      const res = await globalVoicesApi.getCarouselSpeakers();
      if (res && res.length > 0) {
        setSpeakersData(res);
      }
    };
    fetchSpeakers();
  }, []);

  const getSpeakerImage = (speaker) => {
      if (speaker.image) {
        const url = speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`;
        return optimizeCloudinaryUrl(url, 300);
      }
      return 'https://via.placeholder.com/400x300?text=No+Image';
  };

  const doubled = [...speakersData, ...speakersData];
  const singleW = speakersData.length > 0 ? speakersData.length * (CARD_WIDTH + CARD_GAP) : 0;

  const applyTransform = () => {
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
  };

  useEffect(() => {
    if (speakersData.length === 0) return;
    // left-to-right: offset decreases (cards move right)
    // We start at singleW so we can go negative toward 0
    offsetRef.current = singleW;
    applyTransform();

    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current -= SPEED;
        // when we reach 0, jump back to singleW for seamless loop
        if (offsetRef.current <= 0) offsetRef.current += singleW;
        applyTransform();
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [speakersData, singleW]);

  const handlePrev = () => {
    offsetRef.current = offsetRef.current + (CARD_WIDTH + CARD_GAP);
    if (offsetRef.current > singleW * 2) offsetRef.current -= singleW;
    applyTransform();
  };

  const handleNext = () => {
    offsetRef.current = offsetRef.current - (CARD_WIDTH + CARD_GAP);
    if (offsetRef.current <= 0) offsetRef.current += singleW;
    applyTransform();
  };

  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity:0; transform:scale(.5) translateY(0); }
          40%  { opacity:1; transform:scale(1.2) translateY(-4px); }
          80%  { opacity:.6; transform:scale(.9) translateY(-6px); }
          100% { opacity:0; transform:scale(.5) translateY(-8px); }
        }
        @keyframes shimmer {
          0%   { left:-75%; }
          100% { left:150%; }
        }
        .orange-btn-hero {
          background: #D97A2B;
          position: relative;
          overflow: hidden;
          border: 2px solid white !important;
          box-shadow: 0 4px 15px rgba(217,122,43,.3);
        }
        .orange-btn-hero::before {
          content: '';
          position: absolute;
          top: -50%; left: -75%;
          width: 50%; height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,.4), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .spk-marquee-outer {
          overflow: hidden;
          flex: 1;
          min-width: 0;
        }
        .spk-marquee-track {
          display: flex;
          gap: ${CARD_GAP}px;
          will-change: transform;
        }
        .spk-card {
          flex-shrink: 0;
          width: ${CARD_WIDTH}px;
          background: white;
          border-radius: 12px;
          padding: 20px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: rgba(0,0,0,.02) 0 1px 3px, rgba(27,31,35,.15) 0 0 0 1px;
          transition: transform .3s;
        }
        .spk-card:hover { transform: translateY(-2px); }
        .spk-img {
          flex-shrink: 0;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #e8e3d5;
        }
        .spk-img img { width:100%; height:100%; object-fit:cover; }
        .spk-name {
          color: #032e1c;
          font-weight: 700;
          font-size: 14px;
          line-height: 1.2;
          margin-bottom: 3px;
          font-family: Inter, sans-serif;
        }
        .spk-org {
          color: #000000;
          font-weight: 600;
          font-size: 11px;
          line-height: 1.3;
          font-family: Inter, sans-serif;
        }
      `}</style>

      <section className="bg-[#04311c] py-6 sm:py-8 font-inter relative z-20">
        <SectionContainer className="w-full">

          {/* Header */}
          <div className="relative mb-6 -mt-4 w-full h-8 flex items-center">
            <div className="absolute inset-0 flex items-center gap-2 sm:gap-3 justify-center pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
              <div className="h-[1px] bg-gradient-to-r from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] w-[100px]" />
              <h2 className="text-white font-bold font-inter text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap">
                FEATURED SPEAKERS
              </h2>
              <div className="h-[1px] bg-gradient-to-l from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] w-[100px]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
            </div>

            {/* View All — desktop */}
            <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }} className="shrink-0 hidden md:block z-10">
              <Sparkle color="#D97A2B" style={{ top: '-15px', left: '10%',    animationDelay: '0s'   }} />
              <Sparkle color="#D97A2B" style={{ top: '-12px', left: '45%',    animationDelay: '0.4s' }} />
              <Sparkle color="#D97A2B" style={{ top: '-16px', right: '15%',   animationDelay: '0.8s' }} />
              <Sparkle color="#D97A2B" style={{ bottom: '-15px', left: '20%', animationDelay: '0.2s' }} />
              <Sparkle color="#D97A2B" style={{ bottom: '-12px', right: '25%',animationDelay: '0.6s' }} />
              <Sparkle color="#D97A2B" style={{ top: '20%', left: '-10px',    animationDelay: '0.3s' }} />
              <Sparkle color="#D97A2B" style={{ top: '60%', right: '-10px',   animationDelay: '0.7s' }} />
              <button
                onClick={() => window.open('/speakers', '_blank')}
                className="orange-btn-hero group rounded-full px-3 py-1.5 text-white transition-all duration-300 font-bold font-inter text-[9px] tracking-wider uppercase flex items-center gap-1 relative z-10 whitespace-nowrap pointer-events-auto"
              >
                <span>VIEW ALL SPEAKERS</span>
                <ArrowRight size={11} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Row: Prev | Marquee | Next | View All */}
          <div className="relative flex items-center w-full">

            {/* Prev */}
            <button
              onClick={handlePrev}
              aria-label="Previous speakers"
              className="absolute -left-2 sm:-left-4 md:-left-10 shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#a99539] hover:border-[#a99539] transition-all duration-300 z-10"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Marquee */}
            <div
              className="spk-marquee-outer w-full pl-4 md:pl-6"
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
            >
              <div className="spk-marquee-track" ref={trackRef}>
                {doubled.map((speaker, idx) => (
                  <div key={idx} className="spk-card">
                    <div className="spk-img">
                      <img src={getSpeakerImage(speaker)} alt={speaker.name} loading="lazy" decoding="async" />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="spk-name">{speaker.name}</div>
                      <div className="spk-org">{speaker.designation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={handleNext}
              aria-label="Next speakers"
              className="absolute -right-2 sm:-right-4 md:-right-10 shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-[#a99539] hover:border-[#a99539] transition-all duration-300 z-10"
            >
              <ChevronRight size={14} />
            </button>

          </div>

          {/* View All — mobile */}
          <div className="flex justify-center mt-4 md:hidden">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Sparkle color="#D97A2B" style={{ top: '-15px', left: '10%',    animationDelay: '0s'   }} />
              <Sparkle color="#D97A2B" style={{ top: '-12px', left: '45%',    animationDelay: '0.4s' }} />
              <Sparkle color="#D97A2B" style={{ top: '-16px', right: '15%',   animationDelay: '0.8s' }} />
              <Sparkle color="#D97A2B" style={{ bottom: '-15px', left: '20%', animationDelay: '0.2s' }} />
              <Sparkle color="#D97A2B" style={{ bottom: '-12px', right: '25%',animationDelay: '0.6s' }} />
              <Sparkle color="#D97A2B" style={{ top: '20%', left: '-10px',    animationDelay: '0.3s' }} />
              <Sparkle color="#D97A2B" style={{ top: '60%', right: '-10px',   animationDelay: '0.7s' }} />
              <button
                onClick={() => window.open('/speakers', '_blank')}
                className="orange-btn-hero group rounded-full px-4 py-2 text-white transition-all duration-300 font-bold font-inter text-[10px] tracking-wider uppercase flex items-center gap-1.5 relative z-10"
              >
                <span>VIEW ALL SPEAKERS</span>
                <ArrowRight size={12} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </SectionContainer>
      </section>
    </>
  );
};

export default FeaturedSpeakersSection;

