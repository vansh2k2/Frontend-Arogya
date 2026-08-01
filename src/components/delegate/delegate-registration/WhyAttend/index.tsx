import React, { useEffect, useRef } from "react";
import { Users, Lightbulb, Globe, CheckCircle, BarChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyAttend = () => {
  const cardRefs = useRef([]);
  const titleRef = useRef(null);

  const benefits = [
    {
      title: <><span>Learn from</span><br /><span>Industry Experts</span></>,
      description: "Gain knowledge from leading experts",
      icon: <Users className="w-4 h-4 lg:w-5 lg:h-5 text-[#143111]" />,
      bg: "bg-[#EAF3DE]",
      iconBg: "bg-[#d4eac2] border-[#143111]/20",
      // slide in from left
      animFrom: { x: -60, y: 0, rotation: -4, opacity: 0 },
    },
    {
      title: "Discover Latest Innovations",
      description: "Explore cutting-edge technologies & trends",
      icon: <Lightbulb className="w-4 h-4 lg:w-5 lg:h-5 text-[#7c5e0f]" />,
      bg: "bg-[#FDF3DC]",
      iconBg: "bg-[#f5e2aa] border-[#a99539]/30",
      // drop from top
      animFrom: { x: 0, y: -60, rotation: 3, opacity: 0 },
    },
    {
      title: "Build Valuable Connections",
      description: "Network with decision makers & professionals",
      icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-[#1a5c7a]" />,
      bg: "bg-[#DFF0F8]",
      iconBg: "bg-[#bce0f0] border-[#1a5c7a]/20",
      // scale up from center
      animFrom: { x: 0, y: 0, scale: 0.6, rotation: 0, opacity: 0 },
    },
    {
      title: "Business & Growth Opportunities",
      description: "Expand your business & collaborations",
      icon: <BarChart className="w-4 h-4 lg:w-5 lg:h-5 text-[#7a1a4a]" />,
      bg: "bg-[#F8E8F0]",
      iconBg: "bg-[#f0c8df] border-[#7a1a4a]/20",
      // drop from top
      animFrom: { x: 0, y: -60, rotation: -3, opacity: 0 },
    },
    {
      title: "Certificate of Participation",
      description: "Get an official certificate for your participation",
      icon: <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-[#4a7a1a]" />,
      bg: "bg-[#EEF8E8]",
      iconBg: "bg-[#ceedb8] border-[#4a7a1a]/20",
      // slide in from right
      animFrom: { x: 60, y: 0, rotation: 4, opacity: 0 },
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Title line reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 16, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 88%", once: true },
        }
      );

      // Each card — unique entry animation
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const from = benefits[i].animFrom;

        gsap.fromTo(
          card,
          { ...from, scale: from.scale ?? 1 },
          {
            x: 0, y: 0, scale: 1, rotation: 0, opacity: 1,
            duration: 0.75,
            delay: i * 0.1,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        );

        // subtle float on hover via GSAP
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -5, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, scale: 1, duration: 0.35, ease: "power2.inOut" });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white py-6 px-6 lg:px-10 font-inter">
      <div className="max-w-[1360px] mx-auto pl-0 md:pl-[30px]">

        {/* Section Title */}
        <div ref={titleRef} style={{ opacity: 0 }} className="flex flex-col items-center mb-5 w-full text-center">
          <div className="flex items-center gap-2 sm:gap-3 w-full justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
            <div className="h-[1px] bg-gradient-to-r from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px]" />
            <h3 className="text-[#032e1c] font-extrabold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap font-inter">
              WHY ATTEND AROGYA SANGHOSHTI 2026?
            </h3>
            <div className="h-[1px] bg-gradient-to-l from-[#a99539]/10 via-[#a99539]/60 to-[#a99539] flex-grow max-w-[80px]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#a99539] shrink-0" />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap lg:flex-nowrap items-stretch justify-between gap-4 lg:gap-5">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={el => (cardRefs.current[index] = el)}
              style={{ opacity: 0 }}
              className={`flex-1 flex flex-col items-center lg:items-start text-center lg:text-left min-w-[200px] p-3 lg:p-3.5 rounded-xl ${benefit.bg} shadow-[rgba(0,0,0,0.04)_0px_1px_4px_0px,rgba(27,31,35,0.10)_0px_0px_0px_1px] cursor-default`}
            >
              <div className="flex items-center gap-2 mb-2 w-full justify-center lg:justify-start">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center shrink-0 ${benefit.iconBg}`}>
                  {benefit.icon}
                </div>
                <h4 className="text-[#032e1c] font-bold text-[11px] lg:text-[12px] tracking-wider uppercase leading-snug font-inter text-left">
                  {benefit.title}
                </h4>
              </div>
              <p className="text-black text-[10px] lg:text-[11px] leading-snug font-medium text-center lg:text-left lg:pl-[3rem]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyAttend;