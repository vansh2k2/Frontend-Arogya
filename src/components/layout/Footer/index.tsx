"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import main22 from "@/assets/icons/main22.webp";
import foot1 from "@/assets/icons/foot1.webp";
import foot2 from "@/assets/icons/foot2.webp";
import foot3 from "@/assets/icons/foot3.webp";
import foot4 from "@/assets/icons/foot4.webp";
import foot11 from "@/assets/icons/foot11.webp";
import foot22 from "@/assets/icons/foot22.webp";
import foot33 from "@/assets/icons/foot33.webp";
import footerRight from "@/assets/icons/footerright.webp";
import footerBot from "@/assets/icons/footerbot.webp";
import notesIcon from "@/assets/icons/notes.webp";
import pdfIcon from "@/assets/icons/pdf.webp";
import parliaIcon from "@/assets/icons/parlia.webp";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  Globe,
  MapPin,
  Users,
  Mic,
  Lightbulb,
  Handshake,
  Rocket,
  Headphones,
  ChevronRight,
  MonitorPlay,
  Heart,
  FileText
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { settingsApi, socialMediaApi, SERVER_URL } from '@/lib/api';

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

const Footer = () => {
  const getHighlightIcon = (iconType) => {
    switch (iconType) {
      case "Keynote": return <img src={foot2?.src || foot2} alt="Keynote" className="h-[28px] w-[28px] object-contain" />;
      case "Panel Discussions": return <img src={foot1?.src || foot1} alt="Panel Discussions" className="h-[28px] w-[28px] object-contain" />;
      case "Workshops": return <img src={foot11?.src || foot11} alt="Workshops" className="h-[28px] w-[28px] object-contain" />;
      case "Networking": return <img src={foot22?.src || foot22} alt="Networking" className="h-[28px] w-[28px] object-contain" />;
      case "Innovation Showcase": return <img src={foot33?.src || foot33} alt="Innovation Showcase" className="h-[28px] w-[28px] object-contain" />;
      default: return <img src={foot2?.src || foot2} alt="Highlight" className="h-[28px] w-[28px] object-contain" />;
    }
  };

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get,
    staleTime: 5 * 60 * 1000,
  });

  const { data: socialMedia } = useQuery({
    queryKey: ['socialMedia'],
    queryFn: socialMediaApi.get,
  });

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${SERVER_URL}${url}`;
  };

  const logoUrl = getImageUrl(settings?.footerLogo?.url) || getImageUrl(settings?.logo) || '/logo1.png';
  const logoAlt = settings?.footerLogo?.alt || "Arogya Sangoshthi Logo";

  const footerEmails = settings?.footerEmails?.length > 0 ? settings.footerEmails : ['info@ihwe.in'];
  const footerPhones = settings?.footerPhones?.length > 0 ? settings.footerPhones : ['9654900525'];

  const footerWebsite = settings?.footerWebsite || "www.ihwe.in";
  const footerAddress = settings?.footerAddress || "12/29, Site 2 Industrial Area,\nMohan Nagar, Ghaziabad - 200107,\nUttar Pradesh, India";
  const footerHelplineTitle = settings?.footerHelplineTitle || "Conference Helpline";
  const footerHelplinePhone = settings?.footerHelplinePhone || "9654900525";
  const footerHelplineTiming = settings?.footerHelplineTiming || "Mon - Sat: 9:00 AM - 6:00 PM (IST)";
  
  const footerGetInTouchTitle = settings?.footerGetInTouchTitle || "Get In Touch";
  
  const footerQuickLinksTitle = settings?.footerQuickLinksTitle || "Quick Links";
  const quickLinks = settings?.footerQuickLinks?.length > 0 ? settings.footerQuickLinks : [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Conference Tracks", path: "/tracks" },
    { name: "Speakers", path: "/speakers" },
    { name: "Agenda", path: "/agenda" },
    { name: "Registration", path: "/register-now" },
    { name: "Exhibition", path: "/exhibition" },
    { name: "Partners & Supporters", path: "/partners" },
    { name: "Venue", path: "/venue" },
    { name: "Media & Gallery", path: "/media" },
    { name: "Contact Us", path: "/contact" },
    { name: "FAQ's", path: "/faqs" }
  ];

  const footerHighlightsTitle = settings?.footerHighlightsTitle || "Conference Highlights";
  const highlights = settings?.footerHighlights?.length > 0 ? settings.footerHighlights : [
    { iconType: "Keynote", title: "Keynote Sessions", desc: "Global thought leaders share their vision" },
    { iconType: "Panel Discussions", title: "Panel Discussions", desc: "Diverse perspectives on critical healthcare topics" },
    { iconType: "Workshops", title: "Workshops", desc: "Hands-on learning from experts" },
    { iconType: "Networking", title: "Networking", desc: "Connect. Collaborate. Create impact." },
    { iconType: "Innovation Showcase", title: "Innovation Showcase", desc: "Discover breakthrough ideas & solutions" }
  ];

  const footerAboutText = settings?.footerAboutText || "India's Premier Integrated Healthcare Conference\nuniting Modern Medicine, AYUSH, Technology\nand Traditional Wisdom for a healthier tomorrow.";
  const footerAboutHighlighted = settings?.footerAboutHighlighted || "healthier tomorrow.";

  const renderFooterAboutText = () => {
    if (!footerAboutText) return null;
    
    const parts = footerAboutHighlighted ? footerAboutText.split(footerAboutHighlighted) : [footerAboutText];
    
    return parts.map((part, index) => (
      <React.Fragment key={`part-${index}`}>
        {part.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map((line, i, arr) => (
          <React.Fragment key={`line-${index}-${i}`}>
            {line}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
        {index < parts.length - 1 && (
          <span className="text-[#F3B71B]">{footerAboutHighlighted}</span>
        )}
      </React.Fragment>
    ));
  };

  const footerStats = settings?.footerStats?.length === 4 ? settings.footerStats : [
    { icon: "foot1", number: 1000, label: "Delegates" },
    { icon: "foot2", number: 150, label: "Speakers" },
    { icon: "foot3", number: 25, label: "Countries" },
    { icon: "foot4", number: 100, label: "Sessions" }
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

  return (
    <footer className="bg-[#001810] text-white font-inter text-sm w-full relative overflow-hidden">
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { left: -75%; }
          100% { left: 150%; }
        }
        .golden-btn-footer {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 0 20px 5px rgba(255,200,0,0.25), 0 4px 20px rgba(255,165,0,0.15);
          position: relative;
          overflow: hidden;
          border: 2px solid white !important;
        }
        .golden-btn-footer::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
      `}</style>
      
      {/* Top Grid Section */}
      <div className="container mx-auto px-4 md:px-8 xl:px-12 pt-8 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.95fr_0.95fr_0.95fr] gap-8 lg:gap-2 xl:gap-2 pb-4">
          
          {/* Column 1: Logo & Stats */}
          <div className="flex flex-col gap-6 lg:pr-0 xl:pr-2">
            <div className="w-48 sm:w-56 relative inline-block">
              {/* Sparkles around the logo */}
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
                className="w-full h-auto object-contain brightness-0 invert sepia(1) saturate(5) hue-rotate(5deg) contrast(1.2)"
                style={{ filter: "drop-shadow(0 0 15px rgba(243,183,27,0.6))" }}
              />
            </div>
            <p className="text-white text-[13px] leading-relaxed whitespace-nowrap">
              {renderFooterAboutText()}
            </p>
            
            <div className="flex items-center gap-2 w-full -mt-2 mb-5">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#F3B71B]/80" />
              <img src={main22?.src || main22} alt="divider" className="h-5 w-auto object-contain" />
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#F3B71B]/80" />
            </div>
            
            <div className="flex justify-between items-center w-full -mt-8 mb-5">
              {footerStats.map((stat, index) => (
                <React.Fragment key={`stat-${index}`}>
                  <div className="flex flex-col items-center gap-1 w-1/4">
                    <img src={getStatIcon(stat.icon)?.src || getStatIcon(stat.icon)} alt={stat.label} className="h-7 w-auto object-contain" />
                    <span className="font-medium font-inter tracking-wider text-[#F3B71B] text-[16px] mt-1">
                      <CountUp end={stat.number || 0} />+
                    </span>
                    <span className="text-[10px] text-white uppercase tracking-wider font-medium text-center">{stat.label}</span>
                  </div>
                  {index < footerStats.length - 1 && (
                    <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-[#F3B71B]/60 to-transparent shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:border-l lg:border-white/20 lg:pl-3 xl:pl-4">
            <h4 className="text-[#F3B71B] font-bold font-inter text-[14px] mb-3 uppercase tracking-wider">{footerQuickLinksTitle}</h4>
            <ul className="grid grid-cols-1 gap-y-1.5">
              {quickLinks.map((link, index) => (
                <li key={`${link.path}-${index}`}>
                  <Link href={link.path} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group text-[13px]">
                    <ChevronRight size={14} className="text-[#F3B71B] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Conference Highlights */}
          <div className="lg:border-l lg:border-white/20 lg:pl-3 xl:pl-4">
            <h4 className="text-[#F3B71B] font-bold font-inter text-[14px] mb-3 uppercase tracking-wider whitespace-nowrap">{footerHighlightsTitle}</h4>
            <div className="flex flex-col gap-3">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0">
                    {getHighlightIcon(item.iconType)}
                  </div>
                  <div>
                    <h5 className="text-white text-[13px] font-normal">{item.title}</h5>
                    <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="lg:border-l lg:border-white/20 lg:pl-3 xl:pl-4">
            <h4 className="text-[#F3B71B] font-bold font-inter text-[14px] mb-3 uppercase tracking-wider">{footerGetInTouchTitle}</h4>
            <div className="flex flex-col gap-3 mb-2">
              {footerPhones.length > 0 && (
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-7 h-7 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-[#F3B71B]" />
                  </div>
                  <div className="flex flex-wrap items-center text-[13px]">
                    {footerPhones.map((phone, idx) => (
                      <React.Fragment key={`phone-${idx}`}>
                        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                          {phone}
                        </a>
                        {idx < footerPhones.length - 1 && <span className="mx-1">,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              {footerEmails.length > 0 && (
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-7 h-7 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-[#F3B71B]" />
                  </div>
                  <div className="flex flex-wrap items-center text-[13px]">
                    {footerEmails.map((email, idx) => (
                      <React.Fragment key={`email-${idx}`}>
                        <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                          {email}
                        </a>
                        {idx < footerEmails.length - 1 && <span className="mx-1">,</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
              <a href={`https://${footerWebsite.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <div className="w-7 h-7 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0">
                  <Globe size={14} className="text-[#F3B71B]" />
                </div>
                <span className="text-[13px]">{footerWebsite}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <div className="w-7 h-7 rounded-full border border-[#F3B71B] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-[#F3B71B]" />
                </div>
                <span className="text-[11px] leading-relaxed pr-4 whitespace-pre-line">
                  {footerAddress}
                </span>
              </div>
            </div>

            <div className="border border-[#F3B71B]/40 rounded-lg py-2.5 px-3 bg-[#F3B71B]/5 flex items-center gap-2 relative w-full">
              <div className="text-[#F3B71B]">
                <Headphones size={24} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#F3B71B] text-[11px] font-semibold uppercase tracking-wider mb-0.5">{footerHelplineTitle}</p>
                <p className="text-white font-semibold text-[16px] leading-tight mb-0.5">{footerHelplinePhone}</p>
                <p className="text-white text-[10px] leading-tight whitespace-nowrap">{footerHelplineTiming}</p>
              </div>
            </div>
          </div>

          {/* Column 5: Connect With Us */}
          <div className="lg:border-l lg:border-white/20 lg:pl-3 xl:pl-4">
            <h4 className="text-[#F3B71B] font-bold font-inter text-[14px] mb-3 uppercase tracking-wider">Connect With Us</h4>
            <div className="flex gap-2 mb-4">
              <a href={socialMedia?.facebook || "https://www.facebook.com/ArogyaSangoshthi"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#F3B71B] flex items-center justify-center text-[#F3B71B] hover:bg-[#F3B71B] hover:text-[#001810] transition-colors">
                <Facebook size={14} />
              </a>
              <a href={socialMedia?.twitter || "https://twitter.com"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#F3B71B] flex items-center justify-center text-[#F3B71B] hover:bg-[#F3B71B] hover:text-[#001810] transition-colors">
                <Twitter size={14} />
              </a>
              <a href={socialMedia?.linkedin || "https://in.linkedin.com/showcase/arogya-sangoshthi/"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#F3B71B] flex items-center justify-center text-[#F3B71B] hover:bg-[#F3B71B] hover:text-[#001810] transition-colors">
                <Linkedin size={14} />
              </a>
              <a href={socialMedia?.instagram || "https://www.instagram.com/arogyasangoshthi/"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#F3B71B] flex items-center justify-center text-[#F3B71B] hover:bg-[#F3B71B] hover:text-[#001810] transition-colors">
                <Instagram size={14} />
              </a>
              <a href={socialMedia?.youtube || "https://www.youtube.com/@NamoGangeTrust"} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[#F3B71B] flex items-center justify-center text-[#F3B71B] hover:bg-[#F3B71B] hover:text-[#001810] transition-colors">
                <Youtube size={14} />
              </a>
            </div>

            <h4 className="text-[#F3B71B] font-bold font-inter text-[14px] mb-3 uppercase tracking-wider">Download Our App</h4>
            <p className="text-gray-300 text-[11px] mb-4 leading-relaxed whitespace-nowrap">
              Your conference companion for agenda,<br/>updates and networking.
            </p>
            <div className="flex gap-2 mb-5">
              {/* Play Store */}
              <button className="flex items-center gap-2 bg-black border border-white/20 rounded-md px-2 py-1.5 hover:border-white/40 transition-colors flex-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
              </button>
              {/* App Store */}
              <button className="flex items-center gap-2 bg-black border border-white/20 rounded-md px-2 py-1.5 hover:border-white/40 transition-colors flex-1">
                <div className="text-white shrink-0 pl-1"><svg viewBox="0 0 384 512" width="14" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg></div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[7px] text-white/80">Download on the</span>
                  <span className="text-[12px] font-semibold text-white">App Store</span>
                </div>
              </button>
            </div>

            <h4 className="text-[#F3B71B] font-bold font-inter text-[14px] mb-3 uppercase tracking-wider">Organized By</h4>
            <div className="flex items-start">
              <div className="relative inline-block w-32 md:w-40">
                <Sparkle color="#FFFFFF" style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                <Sparkle color="#FFFFFF" style={{ top: '15px', left: '-10px', animationDelay: '0.4s' }} />
                <Sparkle color="#FFFFFF" style={{ top: '-10px', right: '15%', animationDelay: '0.8s' }} />
                <Sparkle color="#FFFFFF" style={{ bottom: '5px', left: '5%', animationDelay: '0.2s' }} />
                <Sparkle color="#FFFFFF" style={{ bottom: '-10px', right: '10%', animationDelay: '0.6s' }} />
                <Sparkle color="#FFFFFF" style={{ top: '40%', right: '-15px', animationDelay: '0.3s' }} />
                <Image src="/namo.webp" alt="Namo Gange" width={256} height={105} className="w-full h-auto object-contain" style={{ filter: "drop-shadow(-1px 0px 2px rgba(255,255,255,0.25))" }} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Banner: Newsletter & Brochure */}
      <div className="container mx-auto px-4 md:px-8 xl:px-12 pb-4 relative z-10 -mt-8">
        <div className="relative w-full flex items-center">
          
          {/* Parlia Image stuck to the far right corner */}
          <Image src={parliaIcon} alt="Parlia" className="absolute -right-6 md:-right-12 lg:-right-20 xl:-right-32 top-1/2 -translate-y-1/2 -mt-2 md:-mt-4 h-24 md:h-32 lg:h-40 w-auto object-contain z-0 pointer-events-none" />

          {/* Banner Band with gradient fading out on the right to overlap Parlia */}
          <div className="bg-gradient-to-r from-[#f5f0e1] via-[#e8dfc8] to-transparent rounded-l-[2rem] rounded-r-none xl:rounded-l-full xl:rounded-r-none flex flex-col xl:flex-row items-center justify-start pl-4 md:pl-6 pr-8 border-y border-l border-r-0 border-white/20 gap-2 xl:gap-0 w-full lg:w-[92%] xl:w-[85%] relative z-10 py-0">
          
          <div className="flex flex-col md:flex-row items-center w-full xl:w-auto py-0">
            {/* Newsletter Info */}
            <div className="flex items-center gap-3 pr-2 xl:pr-4">
              <img src={notesIcon?.src || notesIcon} alt="Newsletter" className="h-9 w-auto object-contain shrink-0" />
              <div>
                <h4 className="text-[#001810] font-medium text-[13px] leading-tight -mt-0.5">STAY CONNECTED. STAY INFORMED.</h4>
                <p className="text-black text-[10px] leading-tight -mt-1 whitespace-nowrap">Subscribe to get the latest updates, speaker announcements,<br />agenda highlights and exclusive offers.</p>
              </div>
            </div>

            {/* Sub-divider */}
            <div className="hidden md:block w-[1px] h-12 bg-black/20 shrink-0 ml-0 mr-4"></div>

            {/* Input & Button */}
            <div className="flex w-full md:w-[350px] h-9 bg-[#001810] rounded-lg overflow-hidden shrink-0">
              <div className="flex-1 flex items-center px-4 gap-2">
                <Mail size={14} className="text-gray-400" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-transparent text-white text-[11px] w-full focus:outline-none placeholder:text-gray-400"
                />
              </div>
              <button className="bg-[#cba344] hover:bg-[#b58c35] text-[#001810] font-bold text-[11px] px-5 transition-colors flex items-center gap-2 uppercase">
                Subscribe <ChevronRight size={14} />
              </button>
            </div>
            {/* Main Divider */}
            <div className="hidden xl:block w-[1px] h-12 bg-black/20 ml-2 mr-6 shrink-0" />
          </div>

          {/* Brochure */}
          <div className="flex items-center gap-3 w-full xl:w-auto justify-start xl:justify-end py-1 xl:py-0 border-t xl:border-t-0 border-black/10 mt-1 xl:mt-0 pt-1 xl:pt-0">
            <img src={pdfIcon?.src || pdfIcon} alt="PDF Icon" className="h-9 w-auto object-contain shrink-0" />
            <div className="flex flex-col items-start mr-2">
              <h4 className="text-[#F3B71B] font-medium text-[12px] whitespace-nowrap mb-0.5">DOWNLOAD BROCHURE</h4>
              <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0 -mt-0.5">
                <Sparkle color="#541A1A" style={{ top: '-12px', left: '10%', animationDelay: '0s' }} />
                <Sparkle color="#541A1A" style={{ top: '-8px', left: '45%', animationDelay: '0.4s' }} />
                <Sparkle color="#541A1A" style={{ top: '-14px', right: '15%', animationDelay: '0.8s' }} />
                <Sparkle color="#541A1A" style={{ bottom: '-12px', left: '20%', animationDelay: '0.2s' }} />
                <Sparkle color="#541A1A" style={{ bottom: '-8px', right: '25%', animationDelay: '0.6s' }} />
                <Sparkle color="#541A1A" style={{ top: '20%', left: '-8px', animationDelay: '0.3s' }} />
                <Sparkle color="#541A1A" style={{ top: '60%', right: '-8px', animationDelay: '0.7s' }} />
                
                <a href="/pdf.pdf" target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#541A1A] hover:bg-[#3b1212] border border-white shadow-md group rounded-full px-2.5 py-1 text-white font-bold text-[9px] uppercase tracking-[0.05em] transition-all duration-300 flex items-center gap-1 relative z-10">
                    Download PDF <svg className="w-2.5 h-2.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
          
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-2.5 bg-[#00100a] relative z-10">
        <div className="container mx-auto px-4 md:px-8 xl:px-12 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          
          <div className="flex items-center gap-3">
            <span className="text-white font-normal tracking-wide">Arogya Sangoshthi</span>
            <div className="w-[1px] h-3 bg-white/30" />
            <span className="text-[#F3B71B] font-normal tracking-widest">18TH EDITION</span>
            <img src={main22?.src || main22} alt="divider" className="h-5 md:h-6 w-auto object-contain" />
          </div>

          <div className="text-center">
            © 2026 Arogya Sanghosthi. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 xl:gap-8">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-600">|</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span className="text-gray-600">|</span>
            <a href="/refund" className="hover:text-white transition-colors">Refund Policy</a>
          </div>

          <div className="flex items-center gap-1.5">
            Designed with <Heart size={12} className="text-[#cba344] fill-[#cba344]" /> for a healthier tomorrow
          </div>
          
        </div>
      </div>

      {/* Decorative Right Corner Image */}
      <Image 
        src={footerRight} 
        alt="Decorative" 
        className="absolute top-0 right-0 z-0 w-16 md:w-20 lg:w-24 h-auto object-contain pointer-events-none" 
      />
      
      {/* Decorative Left Corner Image (Footer Bot) */}
      <Image 
        src={footerBot} 
        alt="Decorative" 
        className="absolute bottom-0 -left-6 md:-left-10 lg:-left-12 z-0 w-32 md:w-48 lg:w-64 h-auto object-contain pointer-events-none opacity-20" 
      />
    </footer>
  );
};

export default Footer;
