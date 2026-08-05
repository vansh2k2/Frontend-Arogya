"use client";
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, UploadCloud, Leaf } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import camm from '@/assets/icons/camm.png';
import rightLeaf from '@/assets/icons/footerright.webp';
import { glimpseApi, SERVER_URL } from '@/lib/api';
import SectionContainer from '@/components/layout/SectionContainer';

gsap.registerPlugin(ScrollTrigger);

const defaultVideos = [
  {
    _id: 'default1',
    title: 'Inauguration Highlights',
    thumbnail: 'https://img.youtube.com/vi/fqAFs6KPwbM/mqdefault.jpg',
    sourceType: 'YOUTUBE',
    videoUrl: 'https://www.youtube.com/embed/fqAFs6KPwbM?autoplay=1',
    orderNumber: 1
  },
  {
    _id: 'default2',
    title: 'Scientific Sessions',
    thumbnail: 'https://img.youtube.com/vi/3Ybp5BzK8fc/mqdefault.jpg',
    sourceType: 'YOUTUBE',
    videoUrl: 'https://www.youtube.com/embed/3Ybp5BzK8fc?autoplay=1',
    orderNumber: 2
  },
  {
    _id: 'default3',
    title: 'Expo (IHWE 2025)',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    sourceType: 'YOUTUBE',
    videoUrl: '',
    orderNumber: 3
  },
  {
    _id: 'default4',
    title: 'Cultural Programs',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
    sourceType: 'YOUTUBE',
    videoUrl: '',
    orderNumber: 4
  }
];

const HeartbeatLine = ({ isLeft }) => (
  <div className="flex flex-1 items-center gap-1">
    {isLeft ? (
      <>
        <div className="h-[1.5px] bg-[#1b5e20]/60 flex-1"></div>
        <svg viewBox="0 0 50 20" className="w-12 h-5 text-[#1b5e20]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,10 L10,10 L15,2 L25,18 L30,10 L50,10" />
        </svg>
        <Leaf size={18} className="text-[#1b5e20]" fill="currentColor" />
      </>
    ) : (
      <>
        <svg viewBox="0 0 50 20" className="w-12 h-5 text-[#1b5e20]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,10 L20,10 L25,2 L35,18 L40,10 L50,10" />
        </svg>
        <div className="h-[1.5px] bg-[#1b5e20]/60 flex-1"></div>
      </>
    )}
  </div>
);

const getYoutubeVideoId = (url) => {
  if (!url) return '';
  if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/');
    if (parts[1]) {
      const id = parts[1].split(/[?#&]/)[0];
      if (id.length === 11) return id;
    }
  }
  if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/');
    if (parts[1]) {
      const id = parts[1].split(/[?#&]/)[0];
      const cleanId = id.split('/')[0];
      if (cleanId.length === 11) return cleanId;
    }
  }
  if (url.includes('v=')) {
    const parts = url.split('v=');
    if (parts[1]) {
      const id = parts[1].split(/[?#&]/)[0];
      if (id.length === 11) return id;
    }
  }
  if (url.includes('/embed/')) {
    const parts = url.split('/embed/');
    if (parts[1]) {
      const id = parts[1].split(/[?#&]/)[0];
      if (id.length === 11) return id;
    }
  }
  try {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return match[1];
    }
  } catch (e) {}
  return '';
};

const formatEmbedUrl = (url, type) => {
  if (!url) return '';
  if (type === 'UPLOAD') {
    return url.startsWith('http') ? url : `${SERVER_URL}${url}`;
  }
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = getYoutubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  }
  
  if (url.includes('instagram.com')) {
    if (url.includes('/embed')) return url;
    const cleanUrl = url.split('?')[0].replace(/\/$/, '');
    return `${cleanUrl}/embed`;
  }
  
  return url;
};

const getThumbnail = (video) => {
  if (video.thumbnail) return (video.thumbnail.startsWith('http') || video.thumbnail.startsWith('data:')) ? video.thumbnail : `${SERVER_URL}${video.thumbnail}`;
  if (video.sourceType === 'YOUTUBE' && video.videoUrl) {
    const videoId = getYoutubeVideoId(video.videoUrl);
    if (videoId) return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }
  if (video.sourceType === 'INSTAGRAM') {
    return "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2MDAnIGhlaWdodD0nNDAwJz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJScgeTE9JzEwMCUnIHgyPScxMDAlJyB5Mj0nMCUnPjxzdG9wIG9mZnNldD0nMCUnIHN0b3AtY29sb3I9JyNmMDk0MzMnLz48c3RvcCBvZmZzZXQ9JzI1JScgc3RvcC1jb2xvcj0nI2U2NjgzYycvPjxzdG9wIG9mZnNldD0nNTAlJyBzdG9wLWNvbG9yPScjZGMyNzQzJy8+PHN0b3Agb2Zmc2V0PSc3NSUnIHN0b3AtY29sb3I9JyNjYzIzNjYnLz48c3RvcCBvZmZzZXQ9JzEwMCUnIHN0b3AtY29sb3I9JyNiYzE4ODgnLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0nNjAwJyBoZWlnaHQ9JzQwMCcgZmlsbD0ndXJsKCNnKScvPjxwYXRoIGQ9J00zMDAsMTUwIGE1MCw1MCAwIDEsMCAwLDEwMCBhNTAsNTAgMCAxLDAgMCwtMTAwIHogTTMwMCwxNzAgYTMwLDMwIDAgMSwxIDAsNjAgYTMwLDMwIDAgMSwxIDAsLTYwIHogTTM1NSwxNDUgYTgsOCAwIDEsMCAwLDE2IGE4LDggMCAxLDAgMCwtMTYgeicgZmlsbD0nI2ZmZmZmZicvPjxyZWN0IHg9JzIxMCcgeT0nMTEwJyB3aWR0aD0nMTgwJyBoZWlnaHQ9JzE4MCcgcng9JzQwJyByeT0nNDAnIGZpbGw9J25vbmUnIHN0cm9rZT0nI2ZmZmZmZicgc3Ryb2tlLXdpZHRoPScxNScvPjwvc3ZnPg==";
  }
  return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop';
};

const VideoHighlights = () => {
  const sectionRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loadedVideos, setLoadedVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await glimpseApi.getVideos();
        if (data && data.length > 0) {
          const sorted = [...data].sort((a, b) => (a.orderNumber || 0) - (b.orderNumber || 0));
          setLoadedVideos(sorted);
        } else {
          setLoadedVideos(defaultVideos);
        }
      } catch (err) {
        console.error(err);
        setLoadedVideos(defaultVideos);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    if (loadedVideos.length === 0) return;
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      }
    });

    tl.fromTo(el.querySelector('.video-title-area'),
      { opacity: 0, scale: 0.8, filter: 'blur(5px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'back.out(1.2)' }
    );

    tl.fromTo(el.querySelector('.video-marquee-container'),
      { opacity: 0, y: 30, filter: 'blur(5px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    );

    tl.fromTo(el.querySelector('.share-box'),
      { opacity: 0, x: 60, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      "-=0.6"
    );
  }, [loadedVideos]);

  const getDoubledVideos = () => {
    if (loadedVideos.length === 0) return [];
    if (loadedVideos.length < 4) {
      const repeated = [];
      while (repeated.length < 8) {
        repeated.push(...loadedVideos);
      }
      return repeated;
    }
    return [...loadedVideos, ...loadedVideos];
  };

  const doubledVideos = getDoubledVideos();

  return (
    <>
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 10px)); }
        }
        .animate-scroll {
          animation: scrollMarquee 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <section ref={sectionRef} className="w-full pb-12 pt-0 -mt-2 relative z-10 font-inter perspective-1000">
        <SectionContainer>
        <img 
          src={rightLeaf?.src || rightLeaf} 
          alt="" 
          className="absolute -right-8 top-0 md:-top-4 lg:-top-6 h-48 md:h-72 lg:h-[400px] w-auto opacity-100 pointer-events-none z-0 object-contain"
        />
        <div className="video-title-area flex items-center justify-center gap-4 mb-8 w-full max-w-4xl mx-auto" style={{ willChange: 'transform, opacity, filter' }}>
          <HeartbeatLine isLeft={true} />
          <h2 className="text-lg md:text-xl font-semibold tracking-widest uppercase text-[#0e3b1c] whitespace-nowrap">
            VIDEO HIGHLIGHTS
          </h2>
          <HeartbeatLine isLeft={false} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-stretch max-w-[1250px] mx-auto relative z-10">
          
          <div className="lg:col-span-4 overflow-hidden py-1 relative video-marquee-container" style={{ willChange: 'transform, opacity, filter' }}>
            <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-scroll w-max gap-4 lg:gap-5 h-full">
              {doubledVideos.map((video, idx) => {
                const videoTitle = video.title || 'Highlights';
                const videoThumbnail = getThumbnail(video);
                const embedUrl = formatEmbedUrl(video.videoUrl, video.sourceType);

                return (
                  <div 
                    key={idx} 
                    onClick={() => embedUrl && setActiveVideo(embedUrl)}
                    className="w-[220px] md:w-[190px] lg:w-[200px] xl:w-[210px] h-full shrink-0 flex flex-col rounded-xl overflow-hidden cursor-pointer shadow-sm bg-white transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
                  >
                    <div className="relative flex-1 w-full overflow-hidden">
                      <img 
                        src={videoThumbnail.startsWith('http') || videoThumbnail.startsWith('data:') ? videoThumbnail : `${SERVER_URL}${videoThumbnail}`} 
                        alt={videoTitle} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-colors duration-300 hover:bg-black/30" />
                      <div className="absolute bottom-2 right-2 flex items-center justify-center z-10">
                        <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all hover:bg-[#1b5e20]/90 hover:scale-110">
                          <Play className="text-white ml-0.5" size={14} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f1f1f1] py-3 px-2 text-center border-t border-gray-100 shrink-0">
                      <h3 className="text-[12px] md:text-[13px] font-semibold text-[#0e3b1c]">
                        {videoTitle}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="share-box lg:col-span-1 bg-gradient-to-b from-[#f0f7f2] to-[#e4f1e7] rounded-xl p-5 flex flex-col justify-between border border-[#c3dec7] relative overflow-hidden h-full shadow-sm" style={{ willChange: 'transform, opacity' }}>
            <Leaf className="absolute -top-6 -left-6 text-[#d1e8d6] rotate-45" size={90} fill="currentColor" opacity={0.6} />
            <Leaf className="absolute bottom-10 -right-6 text-[#d1e8d6] -rotate-12" size={70} fill="currentColor" opacity={0.6} />
            
            <div className="flex flex-col gap-3 relative z-10 mb-4 mt-1">
              <div className="flex flex-row md:flex-col lg:flex-row items-center lg:items-start gap-3">
                <img src={camm?.src || camm} alt="Camera" className="w-16 h-16 object-contain shrink-0 drop-shadow-sm transition-transform hover:scale-105" />
                <div className="flex flex-col text-left lg:mt-1">
                  <h3 className="text-[15px] font-semibold text-[#0e3b1c] mb-1">Share Your Moments</h3>
                  <p className="text-[12px] text-gray-900 font-medium leading-relaxed">
                    Were you part of Arogya Sanghoshti?<br className="hidden lg:block"/>
                    Share your photos!
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#1b5e20] hover:bg-[#134216] text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-[13px] relative z-10 shadow-md mt-auto">
              Upload Your Photos
              <UploadCloud size={16} />
            </button>
          </div>

        </div>

        {activeVideo && typeof document !== 'undefined' && createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setActiveVideo(null)}>
            <div className={`relative w-full ${activeVideo.includes('instagram.com') ? 'max-w-[400px] h-[80vh] md:h-[90vh]' : 'max-w-5xl aspect-video'} bg-black rounded-xl overflow-hidden shadow-2xl flex flex-col`} onClick={e => e.stopPropagation()}>
              <button 
                className="absolute top-3 right-3 text-white hover:text-gray-300 bg-black/50 hover:bg-black/80 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-50 transition-colors"
                onClick={() => setActiveVideo(null)}
              >
                ✕
              </button>
              {activeVideo.includes('instagram.com') ? (
                <iframe 
                  src={activeVideo?.src || activeVideo} 
                  title="Instagram Embed" 
                  frameBorder="0" 
                  scrolling="yes"
                  allowTransparency="true"
                  className="w-full h-full bg-white"
                ></iframe>
              ) : activeVideo.endsWith('.mp4') || activeVideo.endsWith('.webm') || activeVideo.endsWith('.ogg') || activeVideo.includes('/video/upload/') ? (
                <video src={activeVideo?.src || activeVideo} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <iframe 
                  src={activeVideo?.src || activeVideo} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              )}
            </div>
          </div>,
          document.body
        )}
        </SectionContainer>
      </section>
    </>
  );
};

export default VideoHighlights;

