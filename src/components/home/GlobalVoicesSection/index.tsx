"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Globe, Mic, Users, Play, ArrowRight, BookOpen, Handshake, Globe2, Network, X } from 'lucide-react';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { globalVoicesApi, SERVER_URL } from '@/lib/api';
import { optimizeCloudinaryUrl } from '@/utils/imageOptimization';
import h1Image from '@/assets/icons/h1.png';
import lightImage from '@/assets/image/light.webp';
import s1 from '@/assets/icons/s1.png';
import s2 from '@/assets/icons/s2.png';
import s3 from '@/assets/icons/s3.png';
import s4 from '@/assets/icons/s4.png';
import leafright from '@/assets/icons/leafright.png';
import SectionContainer from '@/components/layout/SectionContainer';

const Sparkle = ({ style, color = '#fff176' }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '13px',
      color: color,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

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

const GlobalVoicesSection = () => {
  const [activeTab, setActiveTab] = useState('ALL SPEAKERS');
  
  const [settings, setSettings] = useState({
      heading: 'GLOBAL VOICES OF',
      subheading: 'Healthcare Innovation',
      description: "Learn from the world's leading minds shaping the future of healthcare.",
      leftImage: h1Image,
      rightImage: lightImage
  });
  
  const [categories, setCategories] = useState([]);
  const [counters, setCounters] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [carouselSpeakers, setCarouselSpeakers] = useState([]);
  const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const [setRes, catRes, countRes, speakRes, carouselRes] = await Promise.all([
            globalVoicesApi.getSettings(),
            globalVoicesApi.getCategories(),
            globalVoicesApi.getCounters(),
            globalVoicesApi.getSpeakers(),
            globalVoicesApi.getCarouselSpeakers()
        ]);
        
        if (setRes) {
            setSettings({
                heading: setRes.heading || 'GLOBAL VOICES OF',
                subheading: setRes.subheading || 'Healthcare Innovation',
                description: setRes.description || "Learn from the world's leading minds shaping the future of healthcare.",
                leftImage: setRes.leftImage ? (setRes.leftImage.startsWith('http') ? setRes.leftImage : `${SERVER_URL}${setRes.leftImage}`) : h1Image,
                rightImage: setRes.rightImage ? (setRes.rightImage.startsWith('http') ? setRes.rightImage : `${SERVER_URL}${setRes.rightImage}`) : lightImage
            });
        }
        if (catRes && catRes.length > 0) setCategories(catRes);
        if (countRes && countRes.length > 0) setCounters(countRes);
        if (speakRes && speakRes.length > 0) setSpeakers(speakRes);
        if (carouselRes && carouselRes.length > 0) setCarouselSpeakers(carouselRes);
    };
    fetchData();
  }, []);

  const getIconForCategory = (idx) => {
      const icons = [Mic, Globe, Handshake, BookOpen, Users, Network, Globe2];
      return icons[idx % icons.length];
  };

  const tabs = [
    { id: 'ALL SPEAKERS', icon: Users },
    ...categories.filter(c => c.category.toUpperCase() !== 'ALL SPEAKERS').map((c, idx) => ({ id: c.category, icon: getIconForCategory(idx) }))
  ];

  const filteredSpeakers = activeTab === 'ALL SPEAKERS' 
      ? speakers 
      : speakers.filter(s => s.category?.toLowerCase() === activeTab.toLowerCase());

  // Show large speakers only
  const largeSpeakers = filteredSpeakers;

  const formatVideoPreviewUrl = (url, type) => {
    if (!url) return '';
    if (type === 'UPLOAD') return url.startsWith('http') ? url : `${SERVER_URL}${url}`;
    if (type === 'INSTAGRAM' || url.includes('instagram.com')) {
        let cleanUrl = url.split('?')[0];
        if (!cleanUrl.endsWith('/')) cleanUrl += '/';
        return `${cleanUrl}embed`;
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]{11})/;
        const match = url.match(regExp);
        const videoId = match && match[1] ? match[1] : '';
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    }
    return url;
  };

  const handlePlayVideo = (speaker, e) => {
      e.stopPropagation();
      if (!speaker.videoUrl) return;
      setPreviewVideoUrl({
          url: formatVideoPreviewUrl(speaker.videoUrl, speaker.sourceType),
          type: speaker.sourceType
      });
  };

  const getSpeakerImage = (speaker) => {
      if (speaker.videoThumbnail) {
        const url = speaker.videoThumbnail.startsWith('http') ? speaker.videoThumbnail : `${SERVER_URL}${speaker.videoThumbnail}`;
        return optimizeCloudinaryUrl(url, 400);
      }
      if (speaker.image) {
        const url = speaker.image.startsWith('http') ? speaker.image : `${SERVER_URL}${speaker.image}`;
        return optimizeCloudinaryUrl(url, 400);
      }
      if (speaker.sourceType === 'YOUTUBE' && speaker.videoUrl) {
          const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]{11})/;
          const match = speaker.videoUrl.match(regExp);
          const videoId = match && match[1] ? match[1] : '';
          if (videoId) return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      }
      return 'https://via.placeholder.com/400x300?text=No+Image';
  };

  return (
    <section className="w-full bg-[#f8f5f0] relative pt-12 md:pt-16 pb-4 md:pb-6 ">
      {/* Top Left Leaf Decoration */}
      <img
        src={settings.leftImage?.src || settings.leftImage}
        alt="Decoration"
        className="absolute -top-2 md:-top-4 -left-2 md:-left-4 lg:-left-10 w-[100px] md:w-[140px] lg:w-[180px] h-auto object-contain pointer-events-none z-0 opacity-100 mix-blend-multiply"
      />

      {/* Right Decoration */}
      <img
        src={settings.rightImage?.src || settings.rightImage}
        alt="Decoration Right"
        className="absolute top-0 right-0 w-[200px] md:w-[350px] lg:w-[450px] h-auto object-contain pointer-events-none z-0 opacity-100 mix-blend-multiply [mask-image:linear-gradient(to_right,transparent,black_20%)]"
      />

      <SectionContainer className="relative z-10">

        {/* Header Area */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-4">

          <div className="flex-1 -mt-6 md:-mt-10">
            <div className="flex items-center gap-3 mb-2 -mt-1 md:-mt-3 ml-3 md:ml-6 lg:ml-8">
              <span className="text-[#9c7a4c] font-semibold text-sm md:text-base tracking-widest uppercase font-inter">{settings.heading}</span>
              <div className="w-12 h-[1px] bg-[#9c7a4c]"></div>
            </div>
            <h2 className="text-[#082018] text-2xl md:text-4xl lg:text-[40px] font-bold mb-1 whitespace-nowrap font-inter">
              {settings.subheading}
            </h2>
            <p className="text-gray-900 font-medium font-inter text-xs md:text-sm whitespace-nowrap">
              {settings.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0 -mt-4 md:-mt-8 mr-4 lg:mr-16">
            {counters.length > 0 ? counters.map((counter, idx) => (
                <div key={idx} className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-2 min-w-[120px]">
                  <div className="flex items-center justify-center shrink-0">
                    {idx % 2 === 0 ? <Globe size={28} className="text-[#032e1c]" /> : <Mic size={28} className="text-[#cba344]" />}
                  </div>
                  <div>
                    <div className="text-base md:text-lg font-bold text-[#032e1c] leading-none mb-0.5 font-inter">
                        {isNaN(parseInt(counter.number)) ? counter.number : <CountUp end={parseInt(counter.number)} />}{counter.number.replace(/[0-9]/g, '')}
                    </div>
                    <div className="text-[9px] md:text-[10px] font-medium text-black uppercase tracking-wider">{counter.label}</div>
                  </div>
                </div>
            )) : (
              // Fallback static counters if none in DB
              <>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-2 min-w-[120px]">
                  <div className="flex items-center justify-center shrink-0"><Globe size={28} className="text-[#032e1c]" /></div>
                  <div>
                    <div className="text-base md:text-lg font-bold text-[#032e1c] leading-none mb-0.5 font-inter"><CountUp end={42} />+</div>
                    <div className="text-[9px] md:text-[10px] font-medium text-black uppercase tracking-wider">Expert Speakers</div>
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-2 min-w-[120px]">
                  <div className="flex items-center justify-center shrink-0"><Mic size={28} className="text-[#cba344]" /></div>
                  <div>
                    <div className="text-base md:text-lg font-bold text-[#032e1c] leading-none mb-0.5 font-inter"><CountUp end={5} /></div>
                    <div className="text-[9px] md:text-[10px] font-medium text-black uppercase tracking-wider">Keynote Addresses</div>
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-2 min-w-[120px]">
                  <div className="flex items-center justify-center shrink-0"><Users size={28} className="text-[#032e1c]" /></div>
                  <div>
                    <div className="text-base md:text-lg font-bold text-[#032e1c] leading-none mb-0.5 font-inter"><CountUp end={7} />+</div>
                    <div className="text-[9px] md:text-[10px] font-medium text-black uppercase tracking-wider">Countries</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center overflow-x-auto hide-scrollbar border-y border-[#cba344]/40 py-2 mb-8">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            return (
                <React.Fragment key={tab.id}>
                {idx > 0 && <div className="w-[1px] h-3.5 bg-[#cba344]/40 shrink-0 mx-0.5 md:mx-1"></div>}
                <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-2 md:px-2.5 py-1.5 rounded-full whitespace-nowrap font-medium text-[10px] md:text-[11px] tracking-wider transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-[#032e1c] text-white shadow-md'
                        : 'text-black hover:text-[#032e1c]'
                    }`}
                >
                    <Icon size={16} className={activeTab === tab.id ? (tab.id === 'ALL SPEAKERS' ? 'text-white' : 'text-[#cba344]') : 'text-[#cba344]'} />
                    {tab.id.toUpperCase()}
                </button>
                </React.Fragment>
            );
          })}
        </div>

        {/* Large Speakers */}
        {largeSpeakers.length > 0 ? (
            <div className="mb-6">
            <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-2">
            {largeSpeakers.map((speaker, idx) => (
                <div key={idx} className="w-[220px] sm:w-[240px] md:w-[260px] lg:w-[240px] xl:w-[250px] mx-2 lg:mx-2.5 relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg bg-gray-100 border border-gray-200 shrink-0">
                <img src={getSpeakerImage(speaker)} alt={speaker.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100" />

                {activeTab === 'ALL SPEAKERS' && (
                    <div className="absolute top-0 left-4 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#032e1c] px-4 py-1.5 rounded-b-lg font-bold text-[10px] tracking-wider uppercase shadow-md z-10">
                        {speaker.category}
                    </div>
                )}

                <div className="absolute inset-0 bg-black/40"></div>
                {speaker.showOverlay !== false && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                )}
                <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-5 flex flex-col justify-end h-full pointer-events-none text-left">
                    <h3 className="text-white font-medium text-[12px] md:text-[13px] mb-0.5 font-inter mt-auto leading-tight pr-12">{speaker.name}</h3>
                    <p className="text-gray-300 font-medium text-[9px] md:text-[10px] mb-0.5 whitespace-pre-line leading-snug font-inter pr-12">{speaker.designation}</p>
                    <p className="text-[#cba344] font-medium text-[8px] md:text-[9px] mb-0 leading-snug tracking-wider uppercase pr-12">
                        {speaker.organization} {speaker.organization && speaker.country ? '|' : ''} {speaker.country}
                    </p>

                    {speaker.videoUrl && (
                        <button onClick={(e) => handlePlayVideo(speaker, e)} className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md hover:bg-[#cba344] transition-colors z-20 pointer-events-auto">
                            <Play size={16} className="text-[#032e1c] ml-0.5" fill="currentColor" />
                        </button>
                    )}
                </div>
                </div>
            ))}
            </Marquee>
            </div>
        ) : (
            <div className="text-center text-gray-500 py-10 font-medium">No speakers found for {activeTab}.</div>
        )}

        {/* Small Carousel Speakers */}
        {carouselSpeakers.length > 0 && (
            <div className="bg-[#fffdf8] rounded-2xl border border-[#cba344]/30 shadow-md py-4 md:py-6 mb-6 overflow-hidden -mt-2">
            <Marquee gradient={false} speed={30} pauseOnHover={true} direction="right" className="flex">
                {carouselSpeakers.map((speaker, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group px-3 md:px-4 w-[180px] md:w-[220px] shrink-0 border-r border-[#cba344]/40">
                    <div className="relative mb-3">
                    <img src={getSpeakerImage(speaker)} alt={speaker.imageAltText || speaker.name} loading="lazy" decoding="async" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-contain bg-white border-2 border-[#cba344] transition-colors shadow-sm" />
                    {speaker.videoUrl && (
                        <button onClick={(e) => handlePlayVideo(speaker, e)} className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow hover:bg-[#cba344] transition-colors">
                             <Play size={10} className="text-[#032e1c] ml-0.5" fill="currentColor" />
                        </button>
                    )}
                    </div>
                    <h4 className="text-[#032e1c] font-bold text-[10px] md:text-[11.5px] mb-1 leading-tight font-inter whitespace-nowrap">{speaker.name}</h4>
                    <p className="text-black text-[9px] md:text-[10px] mb-4 leading-tight font-inter px-1">{speaker.designation}</p>
                    
                    {speaker.categoryTag && (
                        <div className="bg-[#032e1c] text-[#f3ce71] px-3 py-1 rounded-full text-[8px] md:text-[9px] font-bold tracking-widest uppercase mt-auto whitespace-nowrap shadow-sm">
                        {speaker.categoryTag}
                        </div>
                    )}
                </div>
                ))}
            </Marquee>
            </div>
        )}

        {/* Carousel Dots - Removed for Marquee */}
        {/* {speakers.length > 0 && (
            <div className="flex justify-center gap-2 mb-10">
            <div className="w-2 h-2 rounded-full bg-[#032e1c]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
        )} */}

        {/* Bottom Banner */}
        <div className="bg-[#022c1f] rounded-2xl py-4 md:py-5 px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 relative overflow-hidden shadow-xl -mt-6">
          <div className="absolute right-0 top-0 w-64 h-full bg-[#044027] transform skew-x-[-20deg] translate-x-10 hidden lg:block"></div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 relative z-10 w-full lg:w-auto">
            {/* Feature 1 */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <img src={s1?.src || s1} alt="Icon" className="w-9 h-9 md:w-10 md:h-10 object-contain shrink-0" />
              <div>
                <h4 className="text-[#f7c45a] font-medium font-inter text-xs md:text-sm mb-0.5 whitespace-nowrap">World-Class Speakers</h4>
                <p className="text-white text-[10px] md:text-[11px] leading-tight whitespace-nowrap">Thought leaders from across the<br />globe under one roof.</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/20"></div>

            {/* Feature 2 */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <img src={s2?.src || s2} alt="Icon" className="w-9 h-9 md:w-10 md:h-10 object-contain shrink-0" />
              <div>
                <h4 className="text-[#f7c45a] font-medium font-inter text-xs md:text-sm mb-0.5 whitespace-nowrap">Diverse Expertise</h4>
                <p className="text-white text-[10px] md:text-[11px] leading-tight whitespace-nowrap">Covering Modern Medicine, AYUSH,<br />Pharma, Tech & more.</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/20"></div>

            {/* Feature 3 */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <img src={s3?.src || s3} alt="Icon" className="w-9 h-9 md:w-10 md:h-10 object-contain shrink-0" />
              <div>
                <h4 className="text-[#f7c45a] font-medium font-inter text-xs md:text-sm mb-0.5 whitespace-nowrap">Actionable Insights</h4>
                <p className="text-white text-[10px] md:text-[11px] leading-tight whitespace-nowrap">Real-world solutions for a<br />healthier tomorrow.</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-white/20"></div>

            {/* Feature 4 */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <img src={s4?.src || s4} alt="Icon" className="w-9 h-9 md:w-10 md:h-10 object-contain shrink-0" />
              <div>
                <h4 className="text-[#f7c45a] font-medium font-inter text-xs md:text-sm mb-0.5 whitespace-nowrap">Unmatched Networking</h4>
                <p className="text-white text-[10px] md:text-[11px] leading-tight whitespace-nowrap">Connect, collaborate and create<br />lasting impact.</p>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
            <Sparkle color="#60a5fa" style={{ top: '-14px', left: '10%', animationDelay: '0s' }} />
            <Sparkle color="#60a5fa" style={{ top: '-12px', left: '48%', animationDelay: '0.45s' }} />
            <Sparkle color="#60a5fa" style={{ top: '-15px', right: '14%', animationDelay: '0.85s' }} />
            <Sparkle color="#60a5fa" style={{ bottom: '-14px', left: '20%', animationDelay: '0.2s' }} />
            <Sparkle color="#60a5fa" style={{ bottom: '-12px', right: '24%', animationDelay: '0.65s' }} />
            <Link href="/speakers" target="_blank" rel="noopener noreferrer" className="bg-[#60a5fa] hover:bg-[#3b82f6] group rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-white transition-all duration-300 uppercase tracking-[0.12em] text-[9px] sm:text-[10px] font-semibold flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg relative z-10">
              <span>VIEW FULL SPEAKER LIST</span>
              <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

      </SectionContainer>

      {/* Bottom Left Leaf Decoration */}
      <img
        src={leafright?.src || leafright}
        alt="Decoration"
        className="absolute bottom-0 -left-6 md:-left-10 lg:-left-12 w-[80px] md:w-[120px] lg:w-[160px] h-auto object-contain pointer-events-none z-0 mix-blend-multiply opacity-40"
      />

      {/* Video Modal */}
      {previewVideoUrl && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setPreviewVideoUrl(null)}>
              <div className={`relative w-full ${previewVideoUrl.type === 'INSTAGRAM' ? 'max-w-[400px] h-[80vh] md:h-[90vh]' : 'max-w-4xl aspect-video'} bg-black rounded-lg overflow-hidden shadow-2xl animate-fade-in flex flex-col`} onClick={e => e.stopPropagation()}>
                  <button className="absolute top-3 right-3 text-white hover:text-gray-300 bg-black/50 hover:bg-black/80 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-50 transition-colors" onClick={() => setPreviewVideoUrl(null)}>
                      <X size={20} />
                  </button>
                  {previewVideoUrl.type === 'UPLOAD' || previewVideoUrl.url.endsWith('.mp4') || previewVideoUrl.url.endsWith('.webm') ? (
                      <video src={previewVideoUrl.url} controls autoPlay className="w-full h-full object-contain" />
                  ) : previewVideoUrl.type === 'INSTAGRAM' ? (
                      <iframe src={previewVideoUrl.url} title="Video Player" frameBorder="0" scrolling="yes" allowTransparency="true" className="w-full h-full bg-white"></iframe>
                  ) : (
                      <iframe src={previewVideoUrl.url} title="Video Player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full"></iframe>
                  )}
              </div>
          </div>
      )}
    </section>
  );
};

export default GlobalVoicesSection;

