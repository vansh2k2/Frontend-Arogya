"use client";
import { useState, useEffect } from 'react';
import { Award, Users } from 'lucide-react';
import previousSpeakers from '@/data/previousSpeakers';
import { optimizeCloudinaryUrl } from '@/utils/imageOptimization';

const PreviousSpeakersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 8) % previousSpeakers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('previous-speakers-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Get 8 visible speakers
  const getVisibleSpeakers = () => {
    const visible = [];
    for (let i = 0; i < 8; i++) {
      visible.push(previousSpeakers[(currentIndex + i) % previousSpeakers.length]);
    }
    return visible;
  };

  return (
    <section
      id="previous-speakers-section"
      className="pt-8 pb-14 relative "
      style={{ background: 'linear-gradient(120deg, #fff7ed 0%, #fff7ed 45%, #ecfdf5 55%, #ecfdf5 100%)' }}
    >

      {/* Medical Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-10 left-10 text-teal-600 text-5xl">⚕️</div>
        <div className="absolute bottom-20 right-20 text-teal-500 text-4xl">🏥</div>
        <div className="absolute top-1/2 right-10 text-cyan-400 text-4xl">💊</div>
        <div className="absolute bottom-1/3 left-20 text-teal-400 text-5xl">🩺</div>
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #0891b2 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header Section */}
        <div
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-30px)'
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-4 border border-teal-200">
            <Users size={16} className="text-teal-700" />
            <span className="text-xs font-bold text-teal-700 tracking-wider uppercase">Our Legacy</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            PREVIOUS YEARS <span className="text-teal-700">SPEAKERS</span>
          </h2>
          <p className="text-slate-600 text-sm">Distinguished guests from our past conferences</p>
        </div>

        {/* Speakers Grid - Auto Rotating */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getVisibleSpeakers().map((speaker, idx) => (
            <div
              key={`${currentIndex}-${idx}`}
              className="
                flex items-center gap-4 p-4 rounded-xl 
                bg-white backdrop-blur-lg shadow-md
                border border-slate-200 
                hover:shadow-xl hover:border-teal-400
                transition-all duration-500 group
                animate-slideIn
              "
              style={{
                animationDelay: `${idx * 0.1}s`
              }}
            >
              {/* Image with Professional Border */}
              <div className="
                w-16 h-16 rounded-full overflow-hidden 
                shadow-md border-3 border-white ring-2 ring-teal-300
                group-hover:ring-4 group-hover:ring-teal-600 
                transition-all duration-500 flex-shrink-0
              ">
                <img
                  src={optimizeCloudinaryUrl(speaker.image, 200)}
                  alt={speaker.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
              </div>

              {/* Text Block */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-slate-800 group-hover:text-teal-700 transition-colors truncate">
                  {speaker.name}
                </h3>

                <p className="text-teal-700 text-xs font-medium leading-tight truncate">
                  {speaker.role}
                </p>

                <p className="text-slate-500 text-xs leading-tight truncate">
                  {speaker.org}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(previousSpeakers.length / 8) }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 ${Math.floor(currentIndex / 8) === idx
                  ? 'w-8 bg-teal-600'
                  : 'w-2 bg-slate-300'
                }`}
            />
          ))}
        </div>

      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default PreviousSpeakersSection;
