"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUnpublishedPaths, pagePathOf } from "@/lib/useUnpublishedPaths";
import Image from "next/image";
import main22 from "@/assets/icons/main22.webp";
import foot1 from "@/assets/icons/foot1.webp";
import foot2 from "@/assets/icons/foot2.webp";
import foot3 from "@/assets/icons/foot3.webp";
import foot4 from "@/assets/icons/foot4.webp";
import foot11 from "@/assets/icons/foot11.webp";
import foot22 from "@/assets/icons/foot22.webp";
import foot33 from "@/assets/icons/foot33.webp";
import {
  Phone,
  Mail,
  Globe,
  ChevronRight,
  Leaf,
  Users,
  Settings,
  ArrowUp,
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { settingsApi, SERVER_URL } from '@/lib/api';

// Sparkle component to enhance logo visibility
const Sparkle = ({ style, color = '#F3B71B' }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '20px',
      color: color,
      textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

// Animated Counter component
const CountUp = ({ end, duration = 2000 }) => {
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

// Strip above the footer
const FEATURES = [
  { icon: Leaf, title: "India's Leading", text: "Integrated Healthcare Conference" },
  { icon: Users, title: "Knowledge Sharing", text: "by Global Experts" },
  { icon: Globe, title: "Policy • Innovation", text: "Technology • Tradition" },
  { icon: Settings, title: "End to End Support", text: "From Planning to Execution" },
];

// Offices of the organiser (Namo Gange Wellness Pvt. Ltd.)
const OFFICES = [
  {
    title: "Head Office",
    lines: [
      "Namo Gange Wellness Pvt. Ltd.",
      "Plot No. 12/29, Site II Industrial Area",
      "Mohan Nagar, Ghaziabad 201007",
      "Uttar Pradesh, India",
    ],
    emails: ["info@ihwe.in", "info@namogangewellness.com"],
  },
  {
    title: "Regional Office",
    lines: [
      "Namo Gange Wellness Pvt. Ltd.",
      "Door No. 36-46-51, 2nd Floor, Main Road",
      "Kancharapalem, Visakhapatnam 530008",
      "Andhra Pradesh, India",
    ],
    emails: ["srujana@namogangewellness.com"],
  },
];

const Footer = () => {
  const getHighlightIcon = (iconType) => {
    switch (iconType) {
      case "Keynote": return <img src={foot2?.src || foot2} alt="Keynote" className="h-[30px] w-[30px] object-contain" />;
      case "Panel Discussions": return <img src={foot1?.src || foot1} alt="Panel Discussions" className="h-[30px] w-[30px] object-contain" />;
      case "Workshops": return <img src={foot11?.src || foot11} alt="Workshops" className="h-[30px] w-[30px] object-contain" />;
      case "Networking": return <img src={foot22?.src || foot22} alt="Networking" className="h-[30px] w-[30px] object-contain" />;
      case "Innovation Showcase": return <img src={foot33?.src || foot33} alt="Innovation Showcase" className="h-[30px] w-[30px] object-contain" />;
      default: return <img src={foot2?.src || foot2} alt="Highlight" className="h-[30px] w-[30px] object-contain" />;
    }
  };

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get,
    staleTime: 5 * 60 * 1000,
  });

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${SERVER_URL}${url}`;
  };

  const logoUrl = getImageUrl(settings?.footerLogo?.url) || getImageUrl(settings?.logo) || '/logo1.png';
  const logoAlt = settings?.footerLogo?.alt || "Arogya Sangoshthi Logo";

  const footerEmails = settings?.footerEmails?.length > 0 ? settings.footerEmails : ['info@arogyasangoshthi.com'];
  const footerPhones = settings?.footerPhones?.length > 0 ? settings.footerPhones : ['9810247319', '9310608427'];
  // The old saved value (arogya.namogange.org) is the staging address — show the official site instead
  const savedWebsite = settings?.footerWebsite;
  const footerWebsite = savedWebsite && !/namogange\.org/i.test(savedWebsite) ? savedWebsite : "arogyasangoshthi.com";
  const footerGetInTouchTitle = settings?.footerGetInTouchTitle || "Get In Touch";

  const footerQuickLinksTitle = settings?.footerQuickLinksTitle || "Quick Links";
  // Pages set to Draft in arogya-admin are left out of the quick links
  const unpublishedPaths = useUnpublishedPaths();
  const quickLinks = settings?.footerQuickLinks?.length > 0 ? settings.footerQuickLinks : [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Conference Tracks", path: "/tracks" },
    { name: "Agenda", path: "/agenda" },
    { name: "Registration", path: "/register-now" },
    { name: "Exhibition", path: "/exhibition" },
    { name: "Partners & Supporters", path: "/partners" },
    { name: "Venue", path: "/venue" },
    { name: "Media & Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ's", path: "/faqs" },
    { name: "Speakers", path: "/speakers" }
  ];

  const footerHighlightsTitle = settings?.footerHighlightsTitle || "Conference Highlights";
  const highlights = settings?.footerHighlights?.length > 0 ? settings.footerHighlights : [
    { iconType: "Keynote", title: "Keynote Sessions", desc: "Global thought leaders share their vision" },
    { iconType: "Panel Discussions", title: "Panel Discussions", desc: "Diverse perspectives on critical healthcare topics" },
    { iconType: "Workshops", title: "Workshops", desc: "Hands-on learning from experts" },
    { iconType: "Networking", title: "Networking", desc: "Connect. Collaborate. Create impact." },
    { iconType: "Innovation Showcase", title: "Innovation Showcase", desc: "Discover breakthrough ideas & solutions" }
  ];

  const footerAboutText = settings?.footerAboutText || "India's Premier Integrated\nHealthcare Conference uniting\nModern Medicine, AYUSH, Technology\nand Traditional Wisdom for a healthier tomorrow.";
  const footerAboutHighlighted = settings?.footerAboutHighlighted || "healthier tomorrow.";

  const renderFooterAboutText = () => {
    if (!footerAboutText) return null;

    const parts = footerAboutHighlighted ? footerAboutText.split(footerAboutHighlighted) : [footerAboutText];

    return parts.map((part, index) => (
      <React.Fragment key={`part-${index}`}>
        {part.replace(/\s*[\r\n]+\s*/g, ' ').split('\n').map((line, i, arr) => (
          <React.Fragment key={`line-${index}-${i}`}>
            {line}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
        {index < parts.length - 1 && (
          <span className="text-[#F3B71B] font-semibold">{footerAboutHighlighted}</span>
        )}
      </React.Fragment>
    ));
  };

  // Delegates, Speakers and Sessions (the "Countries" stat is not shown in the footer)
  const savedStats = settings?.footerStats?.length ? settings.footerStats : [];
  const footerStats = (savedStats.length ? savedStats : [
    { icon: "foot1", number: 1000, label: "Delegates" },
    { icon: "foot2", number: 150, label: "Speakers" },
    { icon: "foot4", number: 100, label: "Sessions" }
  ]).filter((stat) => !/countr/i.test(stat.label || '')).slice(0, 3);

  // Rest of the footer (arogya-admin → Pages & CMS → Footer). Empty values use the built-in ones.
  const ex = settings?.footerExtras || {};
  const srcOf = (saved, fallback) => saved || fallback?.src || fallback;
  const textOr = (saved, fallback) => (saved === undefined || saved === null ? fallback : saved);
  const lines = (text = '') =>
    text.replace(/\r\n/g, '\n').split('\n').map((line, i, all) => (
      <React.Fragment key={i}>
        {line}
        {i < all.length - 1 && <br />}
      </React.Fragment>
    ));
  const divider = srcOf(ex.dividerImage, main22);
  const dividerAlt = ex.dividerImageAlt || 'Gold lotus divider';
  const policyLinks = [
    { label: 'Sitemap', href: '/sitemap.xml' },
    ...(ex.policyLinks?.length ? ex.policyLinks : [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
    ]),
  ];

  const getStatIcon = (iconName) => {
    switch(iconName) {
      case "foot1": return foot1;
      case "foot2": return foot2;
      case "foot3": return foot3;
      case "foot4": return foot4;
      default: return foot1;
    }
  };

  const columnBorder = "lg:border-l lg:border-white/20 lg:pl-4 xl:pl-5";
  const headingClass = "text-[#F3B71B] font-bold font-inter text-[14px] mb-2 uppercase tracking-wider";
  const iconCircle = "w-7 h-7 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0";

  return (
    <footer className="text-white font-inter text-sm w-full relative overflow-hidden">
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
      `}</style>

      {/* ── Feature strip ─────────────────────────────────────────── */}
      <div className="bg-[#f7f2e8] border-b border-[#e8dfca]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`flex items-center gap-3 py-2 lg:py-2.5 lg:justify-center ${i > 0 ? 'lg:border-l lg:border-[#d9cfb8]' : ''}`}
            >
              <Icon size={30} strokeWidth={1.4} className="text-[#F39C12] shrink-0" />
              <div className="leading-snug">
                <p className="text-[#1d2b22] text-[14px] font-semibold">{title}</p>
                <p className="text-[#3b4a40] text-[13px]">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main footer ───────────────────────────────────────────── */}
      <div className="bg-[#001810] relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-4 pb-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1.05fr_1.3fr_1.1fr] gap-8 lg:gap-0">

            {/* Column 1: Logo, about & stats */}
            <div className="flex flex-col gap-3 lg:pr-5">
              <div className="w-48 sm:w-56 relative inline-block">
                <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                <Sparkle style={{ top: '20px', left: '-15px', animationDelay: '0.4s' }} />
                <Sparkle style={{ top: '-15px', right: '15%', animationDelay: '0.8s' }} />
                <Sparkle style={{ bottom: '10px', left: '5%', animationDelay: '0.2s' }} />
                <Sparkle style={{ bottom: '-10px', right: '20%', animationDelay: '0.6s' }} />
                <Sparkle style={{ top: '40%', right: '-20px', animationDelay: '0.3s' }} />
                <Image
                  src={logoUrl?.src || logoUrl}
                  alt={logoAlt}
                  width={300}
                  height={80}
                  unoptimized
                  className="w-full h-auto object-contain"
                  style={{ filter: "drop-shadow(0 0 10px rgba(243,183,27,0.35))" }}
                />
              </div>
              <p className="text-white text-[13px] leading-relaxed">
                {renderFooterAboutText()}
              </p>

              <div className="flex items-center gap-2 w-full">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#F3B71B]/80" />
                <img src={divider} alt={dividerAlt} className="h-5 w-auto object-contain" />
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#F3B71B]/80" />
              </div>

              <div className="flex justify-between items-start w-full">
                {footerStats.map((stat, index) => (
                  <React.Fragment key={`stat-${index}`}>
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <div className="w-10 h-10 rounded-full border border-[#F3B71B] flex items-center justify-center">
                        <img src={srcOf(stat.image, getStatIcon(stat.icon))} alt={stat.imageAlt || stat.label} className="h-5 w-auto object-contain" />
                      </div>
                      <span className="font-bold font-inter text-[#F3B71B] text-[16px] leading-none mt-1">
                        <CountUp end={stat.number || 0} />+
                      </span>
                      <span className="text-[10px] text-white uppercase tracking-wider font-medium text-center">{stat.label}</span>
                    </div>
                    {index < footerStats.length - 1 && (
                      <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-[#F3B71B]/50 to-transparent shrink-0 self-center" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className={columnBorder}>
              <h2 className={headingClass}>{footerQuickLinksTitle}</h2>
              <ul className="grid grid-cols-1 gap-y-2">
                {quickLinks.filter((link) => !unpublishedPaths.has(pagePathOf(link.path))).map((link, index) => (
                  <li key={`${link.path}-${index}`}>
                    <Link href={link.path} className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group text-[13px]">
                      <ChevronRight size={14} className="text-[#F3B71B] group-hover:translate-x-1 transition-transform" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Conference Highlights */}
            <div className={columnBorder}>
              <h2 className={`${headingClass} whitespace-nowrap`}>{footerHighlightsTitle}</h2>
              <div className="flex flex-col gap-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0">
                      {item.image
                        ? <img src={item.image} alt={item.imageAlt || item.title} className="h-[30px] w-[30px] object-contain" />
                        : getHighlightIcon(item.iconType)}
                    </div>
                    <div>
                      <h3 className="text-white text-[13px] font-normal">{item.title}</h3>
                      <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Get In Touch */}
            <div className={columnBorder}>
              <h2 className={headingClass}>{footerGetInTouchTitle}</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className={iconCircle}><Phone size={14} className="text-[#F3B71B]" /></div>
                  <div className="flex flex-wrap items-center text-[13px]">
                    {footerPhones.map((phone, idx) => (
                      <React.Fragment key={`phone-${idx}`}>
                        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
                        {idx < footerPhones.length - 1 && <span className="mr-1">,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className={iconCircle}><Mail size={14} className="text-[#F3B71B]" /></div>
                  <div className="flex flex-wrap items-center text-[13px]">
                    {footerEmails.map((email, idx) => (
                      <React.Fragment key={`email-${idx}`}>
                        <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                        {idx < footerEmails.length - 1 && <span className="mr-1">,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <a href={`https://${footerWebsite.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <div className={iconCircle}><Globe size={14} className="text-[#F3B71B]" /></div>
                  <span className="text-[13px]">{footerWebsite}</span>
                </a>

                {OFFICES.map((office) => (
                  <div key={office.title} className="flex items-start gap-2">
                    <img src="/l1.png" alt="" aria-hidden="true" className="w-[42px] h-auto object-contain shrink-0 mt-0.5" />
                    <div className="text-[11px] leading-snug text-gray-300">
                      <p className="text-[#F3B71B] font-semibold text-[12px] mb-0.5">{office.title}</p>
                      {office.lines.map((line) => <p key={line}>{line}</p>)}
                      {office.emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="block hover:text-white transition-colors">{email}</a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 5: App & Organised By — India Gate behind it */}
            <div className={`${columnBorder} relative min-h-[300px] lg:min-h-0`}>
              <div className="relative z-10">
                <h2 className={headingClass}>{textOr(ex.appTitle, 'Download Our App')}</h2>
                <p className="text-gray-300 text-[11px] mb-3 leading-relaxed">
                  {lines(textOr(ex.appText, 'Your conference companion for agenda,\nupdates and networking.'))}
                </p>
                <div className="flex gap-2 mb-2 max-w-[280px]">
                  <a href={ex.googlePlayUrl || undefined} target={ex.googlePlayUrl ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black border border-white/30 rounded-md px-2.5 py-1.5 hover:border-white/60 transition-colors flex-1">
                    <div className="text-white shrink-0"><svg viewBox="0 0 512 512" width="16" fill="currentColor" aria-hidden="true"><path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg></div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[8px] text-white/80">GET IT ON</span>
                      <span className="text-[12px] font-semibold text-white">Google Play</span>
                    </div>
                  </a>
                  <a href={ex.appStoreUrl || undefined} target={ex.appStoreUrl ? '_blank' : undefined} rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black border border-white/30 rounded-md px-2.5 py-1.5 hover:border-white/60 transition-colors flex-1">
                    <div className="text-white shrink-0"><svg viewBox="0 0 384 512" width="15" fill="currentColor" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg></div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[8px] text-white/80">Download on the</span>
                      <span className="text-[12px] font-semibold text-white">App Store</span>
                    </div>
                  </a>
                </div>

                <h2 className={`${headingClass} mt-5`}>{textOr(ex.organizedByTitle, 'Organised By')}</h2>
                <div className="relative inline-block w-36 md:w-44 mt-4">
                  <Sparkle color="#FFFFFF" style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#FFFFFF" style={{ top: '15px', left: '-10px', animationDelay: '0.4s' }} />
                  <Sparkle color="#FFFFFF" style={{ bottom: '5px', left: '5%', animationDelay: '0.2s' }} />
                  <Sparkle color="#FFFFFF" style={{ top: '40%', right: '-15px', animationDelay: '0.3s' }} />
                  {(() => {
                    const organiserSrc = ex.organizedByLogo || "/namo.webp";
                    // Thin white outline so the logo reads on the bright India Gate photo.
                    // The default logo's tagline (bottom ~9%) gets a fainter outline, drawn as a second layer.
                    const outline = (w, colour) =>
                      `drop-shadow(${w}px 0 0 ${colour}) drop-shadow(-${w}px 0 0 ${colour}) drop-shadow(0 ${w}px 0 ${colour}) drop-shadow(0 -${w}px 0 ${colour})`;
                    const splitTagline = !ex.organizedByLogo;
                    const organiser = (
                      <span className="relative block">
                        <Image src={organiserSrc} alt={ex.organizedByLogoAlt || "Namo Gange"} width={256} height={105} className="w-full h-auto object-contain"
                          style={{ filter: `${outline(0.5, '#fff')} drop-shadow(0 2px 4px rgba(0,0,0,0.45))`, clipPath: splitTagline ? 'inset(0 0 9.5% 0)' : undefined }} />
                        {splitTagline && (
                          <Image src={organiserSrc} alt="" aria-hidden="true" width={256} height={105} className="absolute inset-0 w-full h-auto object-contain"
                            style={{ filter: `${outline(0.3, 'rgba(255,255,255,0.55)')} drop-shadow(0 1px 2px rgba(0,0,0,0.5))`, clipPath: 'inset(90.5% 0 0 0)' }} />
                        )}
                      </span>
                    );
                    return ex.organizedByLink
                      ? <a href={ex.organizedByLink} target="_blank" rel="noopener noreferrer">{organiser}</a>
                      : organiser;
                  })()}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* India Gate at sunset behind "Organised By", fading into the footer colour */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] lg:h-[60%] w-full md:w-[60%] lg:w-[27%] z-0">
          <img
            src="/footb.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[88%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001810] via-[#001810]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001810] via-transparent to-transparent" />
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────────── */}
      <div className="bg-black border-t border-white/10 py-2">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col xl:flex-row items-center justify-between gap-2 xl:gap-3 text-[11px] text-gray-300">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-2 gap-y-1 text-center lg:whitespace-nowrap">
            <span>© 2026 Arogya Sangoshthi – Bridging AYUSH &amp; Modern Medicine</span>
            <span className="text-gray-500">|</span>
            <span>An Initiative of Namo Gange Trust</span>
            <span className="text-gray-500">|</span>
            <span>All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-2 gap-y-2 lg:whitespace-nowrap">
            {policyLinks.map((link, i) => (
              <React.Fragment key={`${link.href}-${i}`}>
                {i > 0 && <span className="text-gray-500">|</span>}
                <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
              </React.Fragment>
            ))}
            <span className="text-gray-500">|</span>
            <span className="flex items-center gap-2">
              Designed &amp; Developed by
              <img src="/encodencylogo.jpeg" alt="enCodency Pvt. Ltd." width={100} height={28} className="h-7 w-auto rounded" />
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="ml-1 w-8 h-8 rounded-full border-2 border-[#F3B71B] text-[#F3B71B] flex items-center justify-center hover:bg-[#F3B71B] hover:text-black transition-colors"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
