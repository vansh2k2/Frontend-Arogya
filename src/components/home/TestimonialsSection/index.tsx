"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Quote, ChevronLeft, ChevronRight, Star, 
  Users, ThumbsUp, Share2, Globe, Play, 
  ArrowRight, Building2, X
} from 'lucide-react';
import goldImage from '@/assets/icons/gold.png';
import mainIcon from '@/assets/icons/main22.webp';
import footerRightImage from '@/assets/icons/footerright.webp';
import leafLeftBg from '@/assets/icons/leafg.webp';
import leafRightBg from '@/assets/icons/leafright.webp';
import SectionContainer from '@/components/layout/SectionContainer';
import { testimonialsApi, SERVER_URL } from '@/lib/api';

const CountUpNumber = ({ end, duration = 2, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration * 60);
          const animate = () => {
            start += increment;
            if (start < end) {
              setCount(start);
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
};

const TestimonialsSection = () => {
  const carouselRef = useRef(null);
  const videoCarouselRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  
  const [settings, setSettings] = useState({
    heading: 'TESTIMONIALS',
    mainTitle: 'What Healthcare Leaders Say',
    highlightText: '',
    shortDescription: 'Voices of impact from our global community',
    leftImage: '',
    rightImage: '',
    topImage: '',
    videoHeading: 'VIDEO TESTIMONIALS',
    videoShortDescription: 'Hear it from those WHO EXPERIENCED IT!',
    videoTopImage: ''
  });
  const [textTestimonials, setTextTestimonials] = useState([]);
  const [videoTestimonials, setVideoTestimonials] = useState([]);
  const [counters, setCounters] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  const getEmbedUrl = (url, sourceType) => {
    if (!url) return '';
    if (sourceType === 'YOUTUBE') {
        const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]{11})/;
        const match = url.match(regExp);
        const videoId = match && match[1] ? match[1] : '';
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
    }
    if (sourceType === 'INSTAGRAM' || url.includes('instagram.com')) {
        let cleanUrl = url.split('?')[0];
        if (!cleanUrl.endsWith('/')) cleanUrl += '/';
        return `${cleanUrl}embed`;
    }
    return url;
  };

  useEffect(() => {
    const loadData = async () => {
      const [setRes, testRes, countRes, vidRes] = await Promise.all([
        testimonialsApi.getSettings(),
        testimonialsApi.getTestimonials(),
        testimonialsApi.getCounters(),
        testimonialsApi.getVideoTestimonials()
      ]);
      if (setRes) setSettings(setRes);
      if (testRes) setTextTestimonials(testRes);
      if (countRes) setCounters(countRes);
      if (vidRes) setVideoTestimonials(vidRes);
    };
    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrameId;
    const scroll = () => {
      if (carouselRef.current && !isHovered) {
        carouselRef.current.scrollLeft += 1;
        if (carouselRef.current.scrollLeft >= (carouselRef.current.scrollWidth / 2)) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  useEffect(() => {
    let animationFrameId;
    const scroll = () => {
      if (videoCarouselRef.current && !isVideoHovered) {
        videoCarouselRef.current.scrollLeft -= 1;
        if (videoCarouselRef.current.scrollLeft <= 0) {
          videoCarouselRef.current.scrollLeft = videoCarouselRef.current.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVideoHovered]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const videoScrollLeft = () => {
    if (videoCarouselRef.current) {
      videoCarouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const videoScrollRight = () => {
    if (videoCarouselRef.current) {
      videoCarouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${SERVER_URL}${url}`;
  };

  const getVideoThumbnail = (url, type, existingThumbnail) => {
      if (existingThumbnail) return existingThumbnail.startsWith('http') ? existingThumbnail : `${SERVER_URL}${existingThumbnail}`;
      if (type === 'YOUTUBE' && url) {
          const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]{11})/;
          const match = url.match(regExp);
          const videoId = match && match[1] ? match[1] : '';
          if (videoId) return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      }
      return 'https://via.placeholder.com/400x300?text=No+Thumbnail';
  };

  return (
    <section className="w-full bg-[#fdfaf5] relative pt-6 md:pt-8 pb-4 md:pb-6 ">
      {/* Background decorations */}

      <SectionContainer className="relative z-10">
        
        {/* Right Decoration Next To Header */}
        <Image 
          src={footerRightImage}
          alt="Decoration Right"
          sizes="180px"
          className="hidden md:block absolute right-0 top-0 w-[100px] md:w-[150px] lg:w-[180px] h-auto opacity-90 pointer-events-none -mt-8"
        />

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4 relative z-10 -mt-2 md:-mt-3">
          <Image 
            src={settings.topImage ? getImageUrl(settings.topImage) : mainIcon} 
            alt="Lotus" 
            width={160}
            height={125}
            quality={75}
            className="h-7 w-auto mb-2 object-contain" 
          />
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-[1px] bg-[#cba344]"></div>
            <span className="text-[#cba344] font-bold text-sm tracking-widest uppercase">{settings.heading || 'TESTIMONIALS'}</span>
            <div className="w-8 h-[1px] bg-[#cba344]"></div>
          </div>
          <h2 className="text-[#1d3129] font-inter text-2xl md:text-[38px] font-semibold mb-3">
            {settings.mainTitle || 'What Healthcare Leaders Say'} <span className="text-[#cba344] font-bold">{settings.highlightText}</span>
          </h2>
          <p className="text-gray-900 font-medium font-inter">
            {settings.shortDescription || 'Voices of impact from our global community'}
          </p>
        </div>

        {/* Text Testimonials Carousel Area */}
        <div 
          className="relative mb-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Gold Decoration Behind First Card */}
          <Image 
            src={goldImage} 
            alt="Gold Decoration"
            width={180}
            height={468}
            sizes="180px"
            quality={70}
            className="absolute -left-2 md:-left-4 lg:-left-6 -top-10 md:-top-12 lg:-top-16 w-[130px] md:w-[150px] lg:w-[180px] h-auto opacity-100 rotate-[30deg] origin-top pointer-events-none z-0"
          />
          {/* Controls */}
          <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-6 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full p-2.5 z-20 text-gray-500 hover:text-[#032e1c] transition-all" aria-label="Previous Testimonials">
            <ChevronLeft size={20} />
          </button>
          <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-6 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-full p-2.5 z-20 text-gray-500 hover:text-[#032e1c] transition-all" aria-label="Next Testimonials">
            <ChevronRight size={20} />
          </button>

          {/* Cards */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 px-4 md:px-8 pb-4 pt-4 relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {Array.from({ length: 10 }).flatMap(() => textTestimonials).map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] border border-gray-100 min-w-[220px] md:min-w-[240px] lg:min-w-[220px] xl:min-w-[240px] flex-1 flex flex-col transition-transform duration-300 hover:-translate-y-1">
                <Quote className="text-[#cba344] mb-3 rotate-180" size={20} fill="#cba344" fillOpacity="0.2" strokeWidth={1} />
                <p className="text-gray-700 text-[12px] mb-3 flex-grow leading-normal font-inter font-medium">
                  {testimonial.feedback || testimonial.text}
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#cba344]/30">
                  <div className="flex-1">
                    <h4 className="text-[#032e1c] font-bold text-[11px] md:text-[12px] font-inter leading-tight">{testimonial.name}</h4>
                    <p className="text-[#0A7C6E] text-[9px] leading-tight font-inter">{testimonial.designation || testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Band */}
        <div className="bg-[#edf0e9] rounded-xl md:rounded-2xl py-4 md:py-2 xl:py-1 px-2 md:px-8 mb-8 relative z-20 grid grid-cols-6 xl:flex xl:flex-nowrap items-start xl:items-center justify-between gap-y-5 gap-x-2 xl:gap-6 shadow-sm border border-[#e2e8da]">
          {counters && counters.length > 0 ? counters.map((counter, idx) => {
            // Determine icon component
            let IconComponent = Users;
            if (counter.icon === 'ThumbsUp') IconComponent = ThumbsUp;
            else if (counter.icon === 'Star') IconComponent = Star;
            else if (counter.icon === 'Share2') IconComponent = Share2;
            else if (counter.icon === 'Globe') IconComponent = Globe;
            
            // Extract numbers and suffixes from string like "98%" or "4.8/5"
            let numberVal = parseFloat(counter.number);
            let suffixStr = counter.number.replace(/[\d.]/g, '');
            let hasDecimals = counter.number.includes('.');
            
            return (
              <React.Fragment key={counter._id || idx}>
                <div className={`col-span-${idx === 3 || idx === 4 ? '3' : '2'} xl:col-span-1 flex flex-col xl:flex-row items-center text-center xl:text-left gap-1.5 xl:gap-3 flex-1`}>
                  <div className="w-8 h-8 md:w-11 md:h-11 rounded-full border border-gray-300 bg-white flex items-center justify-center text-[#032e1c] shrink-0">
                    <IconComponent size={18} className="md:w-[22px] md:h-[22px]" />
                  </div>
                  <div className="flex flex-col items-center xl:items-start">
                    <div className="font-bold text-sm md:text-[22px] text-[#032e1c] leading-none font-inter mb-0.5 md:mb-1">
                      <CountUpNumber end={numberVal || 0} decimals={hasDecimals ? 1 : 0} suffix={suffixStr} />
                    </div>
                    <div className="text-[8px] md:text-[11px] text-gray-700 font-medium leading-tight max-w-[110px] xl:max-w-[160px]">
                      {counter.label}
                    </div>
                  </div>
                </div>
                {idx < counters.length - 1 && <div className="hidden xl:block w-px h-8 bg-gray-900/50"></div>}
              </React.Fragment>
            );
          }) : null}
        </div>

      </SectionContainer>

      {/* Video Testimonials Section */}
      <div className="bg-[#042e1d] w-full py-3 md:py-4 relative shadow-[inset_0_10px_30px_rgba(0,0,0,0.2)]">
        <SectionContainer className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 relative z-10">
          
          {/* Left Text */}
          <div className="lg:w-1/4 text-white text-center lg:text-left -mt-2 lg:-mt-6">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 text-[#cba344]">
              <img src={settings.videoTopImage ? getImageUrl(settings.videoTopImage) : (mainIcon?.src || mainIcon)} alt="icon" className="h-5 object-contain brightness-200" />
              <span className="text-xs font-bold tracking-widest uppercase mt-1">{settings.videoHeading || 'VIDEO TESTIMONIALS'}</span>
            </div>
            <h3 ref={videoRef} className="font-inter text-base md:text-lg font-extrabold uppercase tracking-wider mb-6 leading-none text-white flex flex-col gap-0">
              <span>{settings.videoShortDescription || 'Hear it from those WHO EXPERIENCED IT!'}</span>
            </h3>
            <button className="border border-[#cba344] bg-[#cba344] text-[#02291b] hover:bg-transparent hover:text-[#cba344] transition-all rounded-full px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mx-auto lg:mx-0">
              <Play size={12} fill="currentColor" /> WATCH ALL VIDEOS
            </button>
          </div>

          {/* Video Carousel */}
          <div 
            className="lg:w-3/4 relative w-full group"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            onTouchStart={() => setIsVideoHovered(true)}
            onTouchEnd={() => setIsVideoHovered(false)}
          >
            <button onClick={videoScrollLeft} className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 border border-white/20 text-white hover:bg-white/10 rounded-full p-2.5 z-20 transition-colors backdrop-blur-sm" aria-label="Previous Video Testimonial">
              <ChevronLeft size={20} />
            </button>
            <button onClick={videoScrollRight} className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 border border-white/20 text-white hover:bg-white/10 rounded-full p-2.5 z-20 transition-colors backdrop-blur-sm" aria-label="Next Video Testimonial">
              <ChevronRight size={20} />
            </button>

            <div 
              ref={videoCarouselRef}
              className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {Array.from({ length: 10 }).flatMap(() => videoTestimonials).map((video, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveVideo(video)}
                  className="relative rounded-xl overflow-hidden min-w-[260px] md:min-w-[280px] flex-1 aspect-video cursor-pointer border border-white/10 shadow-lg group/video"
                >
                  <img src={getVideoThumbnail(video.videoUrl, video.sourceType, video.thumbnail)} alt={video.name} className="w-full h-full object-cover transition-transform duration-700 group-hover/video:scale-110" />
                  


                  {/* Info and Play Button */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-[2px] py-1.5 px-4 flex justify-between items-center rounded-b-xl transition-all duration-300">
                    <div>
                      <h4 className="text-white font-medium text-[12px] leading-tight font-inter">{video.name}</h4>
                      <p className="text-gray-300 font-medium text-[10px] leading-tight mt-0.5 font-inter">{video.designation || video.title}</p>
                    </div>
                    {/* Play Button */}
                    <div className="w-7 h-7 shrink-0 rounded-full border border-[#cba344] flex items-center justify-center bg-[#cba344] shadow-md group-hover/video:scale-110 transition-all duration-300">
                      <Play size={12} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-6 h-1.5 rounded-full bg-[#cba344]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
            </div>
          </div>

        </SectionContainer>
      </div>


      {/* Bottom Trusted Band */}
      <div className="w-full bg-[#edeee8] pt-2 pb-3 md:pt-3 md:pb-3 mt-0 relative">
        
        <SectionContainer className="relative">
          
          {/* Left Leaf Background */}
          <Image 
            src={leafLeftBg} 
            alt="Leaf Decoration Left" 
            width={60}
            height={55}
            quality={70}
            sizes="60px"
            className="absolute left-0 md:-left-1 top-1/2 -translate-y-1/2 w-[15px] md:w-[25px] lg:w-[55px] h-auto opacity-100 object-contain pointer-events-none z-0 mix-blend-multiply" 
          />

          {/* Right Leaf Background */}
          <Image 
            src={leafRightBg} 
            alt="Leaf Decoration Right" 
            width={80}
            height={74}
            quality={70}
            sizes="80px"
            className="absolute right-0 md:-right-4 xl:-right-8 top-1/2 -translate-y-1/2 w-[40px] md:w-[60px] lg:w-[80px] h-auto opacity-100 object-contain pointer-events-none z-0 mix-blend-multiply" 
          />

          <div className="pt-0 pb-0 mt-1 md:mt-1.5 flex flex-col xl:flex-row items-center justify-start gap-8 md:gap-16 relative z-10">
          
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#032e1c] flex items-center justify-center shrink-0 shadow-md">
              <Quote size={20} className="text-white rotate-180" fill="white" />
            </div>
            <div>
              <h3 className="text-[#032e1c] font-inter text-sm md:text-base font-extrabold uppercase tracking-wider mb-1 whitespace-nowrap">
                Trusted by Thousands. Inspired for Life.
              </h3>
              <p className="text-gray-900 text-xs md:text-sm font-inter whitespace-nowrap">
                Join a global community of changemakers committed to better health for all.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 md:gap-5 shrink-0">
            <div className="flex items-center gap-2.5">
              <Users size={24} className="text-[#032e1c]" strokeWidth={1.5} />
              <div>
                <div className="font-bold text-lg md:text-xl text-[#032e1c] leading-none font-inter">
                  <CountUpNumber end={1000} suffix="+" duration={2.5} />
                </div>
                <div className="text-[9px] uppercase tracking-wider text-black font-bold mt-1">Past Speakers</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Globe size={24} className="text-[#032e1c]" strokeWidth={1.5} />
              <div>
                <div className="font-bold text-lg md:text-xl text-[#032e1c] leading-none font-inter">
                  <CountUpNumber end={25} suffix="+" duration={2} />
                </div>
                <div className="text-[9px] uppercase tracking-wider text-black font-bold mt-1">Countries</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Building2 size={24} className="text-[#032e1c]" strokeWidth={1.5} />
              <div>
                <div className="font-bold text-lg md:text-xl text-[#032e1c] leading-none font-inter">
                  <CountUpNumber end={18} duration={1.5} />
                </div>
                <div className="text-[9px] uppercase tracking-wider text-black font-bold mt-1">Successful Editions</div>
              </div>
            </div>

            <button className="bg-[#032e1c] hover:bg-[#021f13] text-[#cba344] px-6 py-3 md:ml-4 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              JOIN THE NEXT LEGACY <ArrowRight size={14} />
            </button>
          </div>
        </div>
        </SectionContainer>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
          <div className={`relative w-full ${activeVideo.sourceType === 'INSTAGRAM' ? 'max-w-[400px] h-[80vh] md:h-[90vh]' : 'max-w-4xl aspect-video'} bg-black rounded-xl overflow-hidden shadow-2xl flex flex-col`} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors w-8 h-8 flex items-center justify-center"
              aria-label="Close Video Modal"
            >
              <X size={16} />
            </button>
            {activeVideo.sourceType === 'YOUTUBE' ? (
              <iframe
                src={getEmbedUrl(activeVideo.videoUrl, activeVideo.sourceType)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : activeVideo.sourceType === 'INSTAGRAM' ? (
              <iframe 
                src={getEmbedUrl(activeVideo.videoUrl, activeVideo.sourceType)}
                title="Instagram Embed" 
                frameBorder="0" 
                scrolling="yes"
                allowTransparency={true}
                className="w-full h-full bg-white"
              ></iframe>
            ) : (
              <video 
                src={activeVideo.videoUrl.startsWith('http') ? activeVideo.videoUrl : `${SERVER_URL}${activeVideo.videoUrl}`} 
                className="w-full h-full object-contain"
                controls 
                autoPlay 
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;

