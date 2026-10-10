"use client";
import React, { useEffect, useMemo, useRef } from 'react';
import {
  Award, Briefcase, Building2, FlaskConical, Globe, GraduationCap, Handshake,
  HeartPulse, Hospital, Landmark, Leaf, Pill, Stethoscope, Users,
  type LucideIcon,
} from 'lucide-react';
import type { SupportedByData, SupportedByItem } from '@/lib/fetchSupportedBy';

/* Icon names saved by arogya-admin (backend models/home/SupportedBy.js) */
const ICONS: Record<string, LucideIcon> = {
  'stethoscope': Stethoscope,
  'landmark': Landmark,
  'leaf': Leaf,
  'globe': Globe,
  'briefcase': Briefcase,
  'graduation-cap': GraduationCap,
  'heart-pulse': HeartPulse,
  'hospital': Hospital,
  'pill': Pill,
  'flask': FlaskConical,
  'users': Users,
  'handshake': Handshake,
  'building': Building2,
  'award': Award,
};

/* Built-in groups — shown when the admin-managed strip (GET /api/supported-by) is not available */
const DEFAULT_EYEBROW = 'SUPPORTED BY';
const DEFAULT_ITEMS: SupportedByItem[] = [
  { line1: 'HEALTHCARE', line2: 'LEADERS', icon: 'stethoscope', color: '#15803d' },
  { line1: 'GOVERNMENT', line2: 'BODIES', icon: 'landmark', color: '#1d4ed8' },
  { line1: 'AYUSH', line2: 'INDUSTRY', icon: 'leaf', color: '#16a34a' },
  { line1: 'INTERNATIONAL', line2: 'BUYERS', icon: 'globe', color: '#4f46e5' },
  { line1: 'HOSPITAL & CLINIC', line2: 'PROCUREMENT TEAMS', icon: 'briefcase', color: '#dc2626' },
  { line1: 'UNIVERSITY/', line2: 'ACADEMIC PARTNERS', icon: 'graduation-cap', color: '#d97706' },
];

/* Entrance animation + delay cycle through these for any number of groups */
const ANIMS = ['rise', 'drop', 'left', 'right', 'zoom', 'flip'];
const STAGGER_MS = 248;
const bgColor = '#00291b';

const animStyles = `
  @keyframes tb-rise {
    0%   { opacity: 0; transform: translateY(42px) scale(0.96); }
    60%  { opacity: 1; }
    100% { opacity: 1; transform: translateY(0px) scale(1); }
  }
  @keyframes tb-drop {
    0%   { opacity: 0; transform: translateY(-42px) scale(0.96); }
    60%  { opacity: 1; }
    100% { opacity: 1; transform: translateY(0px) scale(1); }
  }
  @keyframes tb-left {
    0%   { opacity: 0; transform: translateX(-48px) scale(0.95); }
    60%  { opacity: 1; }
    100% { opacity: 1; transform: translateX(0px) scale(1); }
  }
  @keyframes tb-right {
    0%   { opacity: 0; transform: translateX(48px) scale(0.95); }
    60%  { opacity: 1; }
    100% { opacity: 1; transform: translateX(0px) scale(1); }
  }
  @keyframes tb-zoom {
    0%   { opacity: 0; transform: scale(0.4) rotate(-6deg); }
    70%  { opacity: 1; transform: scale(1.06) rotate(1deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes tb-flip {
    0%   { opacity: 0; transform: rotateY(110deg) scale(0.9); }
    65%  { opacity: 1; }
    100% { opacity: 1; transform: rotateY(0deg) scale(1); }
  }

  .tb-anim-rise  { animation: tb-rise  1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .tb-anim-drop  { animation: tb-drop  1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .tb-anim-left  { animation: tb-left  1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .tb-anim-right { animation: tb-right 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .tb-anim-zoom  { animation: tb-zoom  1.3s cubic-bezier(0.34, 1.4, 0.64, 1) forwards; }
  .tb-anim-flip  { animation: tb-flip  1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; transform-style: preserve-3d; }

  .tb-icon-wrap {
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.45s ease;
  }
  .tb-item-group:hover .tb-icon-wrap {
    transform: scale(1.22) rotate(-10deg);
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  }
  .tb-label-wrap {
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .tb-item-group:hover .tb-label-wrap {
    transform: translateX(3px);
  }
`;

const TrustedBy = ({ data }: { data?: SupportedByData | null }) => {
  const eyebrow = data?.eyebrow || DEFAULT_EYEBROW;
  const items = useMemo(
    () =>
      (data?.items?.length ? data.items : DEFAULT_ITEMS).map((item, i) => ({
        label: item.line1,
        label2: item.line2 || '',
        anim: ANIMS[i % ANIMS.length],
        Icon: ICONS[item.icon] ?? Stethoscope,
        color: item.color || '#15803d',
      })),
    [data],
  );

  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const animatedRef = useRef(false);

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = animStyles;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  useEffect(() => {
    const trigger = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const cls = `tb-anim-${items[i].anim}`;
        setTimeout(() => el.classList.add(cls), i * STAGGER_MS);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) trigger(); },
      { threshold: 0.25 }
    );

    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative z-40 w-full py-2 md:py-1 border-y border-white/5 shadow-xl"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* Heading Row */}
        <div className="relative -top-7 md:-top-10 flex items-center justify-center gap-2 md:gap-4 mb-2 md:mb-0 w-full max-w-2xl mx-auto z-50">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-orange-500/40 to-orange-500" />
          <div
            className="flex items-center px-4 md:px-6 py-0.5 md:py-1 backdrop-blur-md rounded-full border border-white/10 shadow-lg"
            style={{ backgroundColor: `${bgColor}ee` }}
          >
            <p className="text-[8px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.35em] text-white whitespace-nowrap font-inter">
              {eyebrow}
            </p>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-orange-500/40 to-orange-500" />
        </div>

        {/* Grid Items */}
        <div className="flex items-center justify-center w-full mt-2 md:-mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-nowrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-2 w-full font-inter">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-start sm:justify-center xl:justify-start"
              >
                <div
                  ref={el => { itemRefs.current[i] = el; }}
                  className="tb-item-group flex items-center gap-2 md:gap-2.5 group cursor-default"
                  style={{ opacity: 0 }}
                >
                  <div className="tb-icon-wrap w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 shadow-md bg-white">
                    <item.Icon color={item.color} strokeWidth={2} style={{ width: 14, height: 14 }} />
                  </div>
                  <div className="tb-label-wrap flex flex-col min-w-0">
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight text-white leading-tight break-words">
                      {item.label}
                    </p>
                    <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-tight text-white/70 leading-tight break-words">
                      {item.label2}
                    </p>
                  </div>
                </div>

                {i < items.length - 1 && (
                  <div className="hidden xl:block w-px h-5 bg-white/10 flex-shrink-0 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrustedBy;
