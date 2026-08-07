"use client";
import { useState, useEffect, useRef } from 'react';
import { Building2, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images from assets folder
import guest1 from '@/assets/guest1.jpg';
import guest2 from '@/assets/guest2.jpg';
import guest3 from '@/assets/guest3.jpg';

const chiefGuests = [
  {
    id: 1,
    name: "Dr. Rajesh Kotecha",
    designation: "Secretary",
    organization: "Ministry of AYUSH, Government of India",
    location: "New Delhi, India",
    image: guest1,
    initials: "RK",
  },
  {
    id: 2,
    name: "Dr. Ananya Sharma",
    designation: "Director General",
    organization: "Central Council for Research in Homeopathy",
    location: "Mumbai, India",
    image: guest2,
    initials: "AS",
  },
  {
    id: 3,
    name: "Dr. Vikram Patel",
    designation: "Professor of Global Health",
    organization: "Harvard Medical School",
    location: "Boston, USA",
    image: guest3,
    initials: "VP",
  },
  {
    id: 4,
    name: "Dr. Priya Mehta",
    designation: "Chief Medical Officer",
    organization: "All India Institute of Medical Sciences",
    location: "Delhi, India",
    image: guest1,
    initials: "PM",
  },
  {
    id: 5,
    name: "Dr. Arjun Desai",
    designation: "Head of Research",
    organization: "Indian Council of Medical Research",
    location: "Bangalore, India",
    image: guest2,
    initials: "AD",
  },
  {
    id: 6,
    name: "Dr. Meera Kapoor",
    designation: "Director of Public Health",
    organization: "World Health Organization",
    location: "Geneva, Switzerland",
    image: guest3,
    initials: "MK",
  },
  {
    id: 7,
    name: "Dr. Sanjay Gupta",
    designation: "Senior Consultant",
    organization: "Johns Hopkins Medicine",
    location: "Baltimore, USA",
    image: guest1,
    initials: "SG",
  },
];

const accentColors = [
  { bg: 'bg-orange-100', text: 'text-orange-600', pill: 'bg-orange-50 text-orange-600', bar: 'bg-orange-500' },
  { bg: 'bg-emerald-100', text: 'text-emerald-600', pill: 'bg-emerald-50 text-emerald-600', bar: 'bg-emerald-500' },
  { bg: 'bg-amber-100', text: 'text-amber-600', pill: 'bg-amber-50 text-amber-600', bar: 'bg-amber-500' },
  { bg: 'bg-orange-100', text: 'text-orange-700', pill: 'bg-orange-50 text-orange-700', bar: 'bg-orange-600' },
  { bg: 'bg-emerald-100', text: 'text-emerald-700', pill: 'bg-emerald-50 text-emerald-700', bar: 'bg-emerald-600' },
];

const ChiefGuestsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState('next');
  const intervalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    const section = document.getElementById('chief-guests');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % chiefGuests.length);
      setAnimKey((k) => k + 1);
    }, 3500);
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % chiefGuests.length);
    setAnimKey((k) => k + 1);
    startInterval();
  };

  const goPrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + chiefGuests.length) % chiefGuests.length);
    setAnimKey((k) => k + 1);
    startInterval();
  };

  const goTo = (i) => {
    setDirection(i > currentIndex ? 'next' : 'prev');
    setCurrentIndex(i);
    setAnimKey((k) => k + 1);
    startInterval();
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 5; i++) {
      const idx = (currentIndex + i) % chiefGuests.length;
      cards.push({ ...chiefGuests[idx], colorScheme: accentColors[i % accentColors.length], displayIndex: i });
    }
    return cards;
  };

  const visibleGuests = getVisibleCards();

  return (
    <section
      id="chief-guests"
      className="py-20 bg-white relative  border-t border-gray-100"
    >
      {/* Top-Right Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER — Left aligned like About section */}
        <div
          className="mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-50 border-l-4 border-orange-600">
              <Users size={12} /> Distinguished Speakers
            </span>
          </div>

          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
            Our <span className="text-orange-600">Chief Guests</span>
          </h2>

          <p className="text-muted-foreground text-[15px] whitespace-nowrap overflow-hidden text-ellipsis">
            Honored to have these distinguished medical leaders grace our conference and share their transformative insights.
          </p>
        </div>

        {/* CARDS — 5 cards in a row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {visibleGuests.map((guest) => {
            const c = guest.colorScheme;
            return (
              <div
                key={`${animKey}-${guest.displayIndex}`}
                className="bg-white border border-gray-200 overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300 transition-all duration-300"
                style={{
                  borderRadius: '0px',
                  animation: `cardSlideIn${direction === 'next' ? 'Right' : 'Left'} 0.38s cubic-bezier(0.22, 1, 0.36, 1) both`,
                  animationDelay: `${guest.displayIndex * 60}ms`,
                }}
              >
                {/* Colored top bar */}
                <div className={`h-[3px] w-full ${c.bar}`} />

                {/* Avatar + Name block */}
                <div className="px-4 pt-4 pb-3 flex items-center gap-3 border-b border-gray-100">
                  <div className="flex-shrink-0">
                    <img
                      src={guest.image?.src || guest.image}
                      alt={guest.name}
                      className="w-12 h-12 object-cover rounded-full ring-2 ring-gray-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.nextSibling) {
                          (target.nextSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div
                      className={`w-12 h-12 rounded-full ${c.bg} ${c.text} items-center justify-center font-semibold text-xs`}
                      style={{ display: 'none' }}
                    >
                      {guest.initials}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-gray-800 leading-tight line-clamp-1">{guest.name}</p>
                    <p className={`text-[11px] font-medium mt-0.5 ${c.text} leading-tight line-clamp-1`}>{guest.designation}</p>
                  </div>
                </div>

                {/* Org + Location */}
                <div className="px-4 py-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <Building2 size={12} className="text-gray-600 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] text-gray-700 leading-snug line-clamp-2">{guest.organization}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={11} className="text-emerald-700 flex-shrink-0" />
                    <p className="text-[11px] text-emerald-800 font-medium line-clamp-1">{guest.location}</p>
                  </div>
                </div>

                {/* Footer — Speaker pill only */}
                <div className="px-4 pb-4 pt-1">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 ${c.pill} tracking-widest uppercase`}
                    style={{ borderRadius: '2px' }}
                  >
                    Speaker
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* DOTS & NAV — Left aligned */}
        <div className="flex items-center gap-6 mt-10">
          <div className="flex gap-1.5">
            {chiefGuests.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                style={{ borderRadius: '0px' }}
                aria-label={`Go to chief guest slide ${index + 1}`}
                className={`h-[3px] transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-600 w-10'
                    : 'bg-gray-200 hover:bg-gray-300 w-3'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="w-10 h-10 flex items-center justify-center border border-orange-100 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm"
              aria-label="Previous Chief Guest"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 flex items-center justify-center border border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all duration-200 shadow-sm"
              aria-label="Next Chief Guest"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes cardSlideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardSlideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default ChiefGuestsSection;
