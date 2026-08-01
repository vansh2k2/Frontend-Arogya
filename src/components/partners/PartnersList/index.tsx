"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Building2, GraduationCap, Handshake, Mic } from 'lucide-react';
import { partnersPageApi, SERVER_URL } from '@/lib/api';
import dleaf from '@/assets/icons/dleaf.png';
import leafs from '@/assets/icons/leafs.png';

// Static fallback icons
import icon1 from '@/icons/icon1.png';
import icon2 from '@/icons/icon2.png';
import icon3 from '@/icons/icon3.jpg';
import icon4 from '@/icons/icon4.png';
import icon5 from '@/icons/icon5.jpg';
import icon6 from '@/icons/icon6.jpg';

gsap.registerPlugin(ScrollTrigger);

// Static fallback data (shown until admin adds real logos)
const fallbackSections = [
  {
    name: 'Knowledge Partners', color: '#0a4b9c',
    items: [
      { _id: 'k1', name: 'NITI Aayog',    designation: 'Government of India',                                      logo: icon1 },
      { _id: 'k2', name: 'ICMR',           designation: 'Indian Council of Medical Research',                      logo: icon2 },
      { _id: 'k3', name: 'AIIMS',          designation: 'All India Institute of Medical Sciences',                 logo: icon3 },
      { _id: 'k4', name: 'FICCI',          designation: 'Federation of Indian Chambers of Commerce & Industry',    logo: icon4 },
      { _id: 'k5', name: 'NHSRC',          designation: 'National Health Systems Resource Centre',                 logo: icon5 },
      { _id: 'k6', name: 'NABH',           designation: 'National Accreditation Board for Hospitals & Healthcare Providers', logo: icon6 },
    ]
  },
  {
    name: 'Industry Partners', color: '#65a30d',
    items: [
      { _id: 'i1', name: 'Apollo',   designation: 'Apollo Hospitals Group',               logo: icon1 },
      { _id: 'i2', name: 'MAX',      designation: 'Max Healthcare Institute Limited',     logo: icon2 },
      { _id: 'i3', name: 'Fortis',   designation: 'Fortis Healthcare Limited',            logo: icon3 },
      { _id: 'i4', name: 'Medanta',  designation: 'Medanta The Medicity',                 logo: icon4 },
      { _id: 'i5', name: 'Cipla',    designation: 'Cipla Limited',                        logo: icon5 },
      { _id: 'i6', name: 'SUN PHARMA', designation: 'Sun Pharmaceutical Industries Ltd.', logo: icon6 },
    ]
  },
  {
    name: 'Academic & Research Associates', color: '#6b21a8',
    items: [
      { _id: 'a1', name: 'Manipal', designation: 'Manipal Academy of Higher Education',              logo: icon1 },
      { _id: 'a2', name: 'Amity',   designation: 'Amity University',                                 logo: icon2 },
      { _id: 'a3', name: 'Jaypee',  designation: 'Jaypee Institute of Information Technology',       logo: icon3 },
      { _id: 'a4', name: 'IIHMR',   designation: 'International Institute of Health Management Research', logo: icon4 },
      { _id: 'a5', name: 'PHFI',    designation: 'Public Health Foundation of India',                logo: icon5 },
      { _id: 'a6', name: 'TERI',    designation: 'The Energy and Resources Institute',               logo: icon6 },
    ]
  },
  {
    name: 'Supporting Associations', color: '#d97706',
    items: [
      { _id: 's1', name: 'FIA',        designation: 'Fitness Industry Association',                               logo: icon1 },
      { _id: 's2', name: 'ASSOCHAM',   designation: 'The Associated Chambers of Commerce and Industry of India', logo: icon2 },
      { _id: 's3', name: 'PHD',        designation: 'PHD Chamber of Commerce and Industry',                      logo: icon3 },
      { _id: 's4', name: 'NATHEALTH',  designation: 'Healthcare Federation of India',                             logo: icon4 },
      { _id: 's5', name: 'AHPI',       designation: 'Association of Healthcare Providers (India)',                logo: icon5 },
      { _id: 's6', name: 'ISQua',      designation: 'International Society for Quality in Health Care',           logo: icon6 },
    ]
  },
  {
    name: 'Media Partners', color: '#dc2626',
    items: [
      { _id: 'm1', name: 'Express',     designation: 'Express Healthcare',                   logo: icon1 },
      { _id: 'm2', name: 'ET',          designation: 'The Economic Times (ET Healthworld)',  logo: icon2 },
      { _id: 'm3', name: 'MediTrina',   designation: 'MediTrina',                            logo: icon3 },
      { _id: 'm4', name: 'Health Today', designation: 'The Healthcare Today',                logo: icon4 },
      { _id: 'm5', name: 'Health Voice', designation: 'Health Voice',                        logo: icon5 },
      { _id: 'm6', name: 'Radio One',   designation: 'Radio One International',              logo: icon6 },
    ]
  },
];

// ── Icon map ──
const iconMap = {
  'knowledge': BookOpen, 'industry': Building2,
  'academic': GraduationCap, 'research': GraduationCap,
  'supporting': Handshake, 'media': Mic, 'default': Handshake,
};
const getIcon = (name = '') => {
  const n = name.toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (n.includes(key)) return Icon;
  }
  return iconMap.default;
};

// ── Single category section ──
const PartnerSection = ({ name, color, items, direction }) => {
  const Icon = getIcon(name);

  // Triple the items to ensure smooth infinite marquee layout
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full mb-8">
      {/* CSS Stylesheet Inject for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-ltr {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-container-custom {
          display: flex;
          overflow: hidden;
          width: 100%;
          user-select: none;
        }
        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
        }
        .marquee-ltr-anim {
          animation: marquee-ltr 30s linear infinite;
        }
        .marquee-rtl-anim {
          animation: marquee-rtl 30s linear infinite;
        }
        .marquee-container-custom:hover .marquee-track {
          animation-play-state: paused;
        }
      `}} />

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2.5 pl-3 pr-5 py-2 rounded-r-xl rounded-l-sm text-white shadow-md relative" style={{ backgroundColor: color }}>
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
          <h2 className="text-[10px] md:text-xs font-medium font-inter tracking-wide uppercase">{name}</h2>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <div className="bg-white rounded-2xl p-5 md:p-6" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
        <div className="marquee-container-custom">
          <div className={`marquee-track ${direction === 'ltr' ? 'marquee-ltr-anim' : 'marquee-rtl-anim'}`}>
            {repeatedItems.map((item, idx) => (
              <div key={idx}
                className="bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[140px] w-[180px] shrink-0 border border-gray-100 hover:shadow-lg"
                style={{ boxShadow: 'rgba(9, 30, 66, 0.15) 0px 2px 4px 0px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px' }}>
                {item.logo && <img src={(() => { const img = item.logo; const imgStr = img?.src || img; return typeof imgStr === 'string' && imgStr.startsWith('/uploads') ? `${SERVER_URL}${imgStr}` : imgStr; })()} alt={item.logoAlt || item.name} className="w-22 h-20 object-contain mb-3" />}
                <h3 className="text-[#111844] font-semibold font-inter text-xs mb-1">{item.name}</h3>
                {item.designation && <p className="text-gray-900 font-medium font-inter text-[10px] leading-tight px-1">{item.designation}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main component ──
const PartnersList = () => {
  const [sections, setSections] = useState(fallbackSections);

  useEffect(() => {
    partnersPageApi.get().then(data => {
      if (data?.categories && data.categories.length > 0) {
        // Merge DB categories with fallback: if a DB category has logos use them,
        // otherwise find matching fallback section by name and use its items
        const merged = data.categories.map(cat => {
          const dbLogos = cat.logos || [];
          if (dbLogos.length > 0) {
            return { name: cat.name, color: cat.color, items: dbLogos };
          }
          // Try to match a fallback section by category name
          const fbMatch = fallbackSections.find(fb =>
            fb.name.toLowerCase() === cat.name.toLowerCase()
          );
          return { name: cat.name, color: cat.color, items: fbMatch ? fbMatch.items : [] };
        });
        setSections(merged.filter(s => s.items.length > 0));
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="w-full bg-[#f9fafc] font-inter pt-4 pb-4 relative overflow-hidden">
      <img src={dleaf?.src || dleaf} alt="Decorative background leaf right" className="absolute -right-20 top-20 w-[400px] object-contain opacity-100 pointer-events-none z-0" />
      <img src={leafs?.src || leafs} alt="Decorative background leaf left" className="absolute -left-20 top-[65%] transform -translate-y-1/2 w-[350px] object-contain opacity-100 pointer-events-none z-0" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {sections.map((section, idx) => (
          <PartnerSection
            key={section.name + idx}
            name={section.name}
            color={section.color}
            items={section.items}
            direction={idx % 2 === 0 ? 'ltr' : 'rtl'}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersList;
