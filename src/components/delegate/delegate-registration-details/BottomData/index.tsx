import React, { useEffect, useRef } from "react";
import { Users, Building2, Globe, Mic, CalendarDays } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        number: 8000,
        suffix: "+",
        label: "Visitors / Delegates",
        icon: <Users size={20} strokeWidth={1.8} className="text-[#cfa144]" />,
    },
    {
        number: 150,
        suffix: "+",
        label: "Exhibitors",
        icon: <Building2 size={20} strokeWidth={1.8} className="text-[#cfa144]" />,
    },
    {
        number: 1000,
        suffix: "+",
        label: "Global Buyes",
        icon: <Globe size={20} strokeWidth={1.8} className="text-[#cfa144]" />,
    },
    {
        number: 150,
        suffix: "+",
        label: "Speakers",
        icon: <Mic size={20} strokeWidth={1.8} className="text-[#cfa144]" />,
    },
    {
        number: 3,
        suffix: "",
        label: "Days of Innovation",
        icon: <CalendarDays size={20} strokeWidth={1.8} className="text-[#cfa144]" />,
    },
];

const BottomData = () => {
    const counterRefs = useRef([]);

    useEffect(() => {
        counterRefs.current.forEach((el, index) => {
            if (el) {
                const targetValue = stats[index].number;
                const proxy = { val: 0 };
                gsap.to(proxy, {
                    val: targetValue,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 95%",
                        once: true
                    },
                    onUpdate: function () {
                        el.innerText = Math.floor(proxy.val).toLocaleString() + stats[index].suffix;
                    }
                });
            }
        });
    }, []);

    return (
        <div className="bg-[#FAFBF6] py-4 font-inter">

            {/* Stats Card */}
            <div className="bg-[#032e1c] rounded-t-xl px-6 py-4 flex items-center justify-between shadow-2xl border border-white/5">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`flex items-center justify-center flex-1 ${index !== stats.length - 1 ? "border-r border-white/10" : ""
                            } px-2 md:px-4`}
                    >
                        <div className="flex items-center gap-3">
                            {/* Icon container */}
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-sm shrink-0">
                                {stat.icon}
                            </div>
                            <div className="flex flex-col items-start">
                                <p 
                                    ref={(el) => (counterRefs.current[index] = el)}
                                    className="text-[17px] font-bold text-[#cfa144] leading-none mb-1"
                                >
                                    0{stat.suffix}
                                </p>
                                <p className="text-[11px] font-medium text-[#ffffff] uppercase tracking-wide leading-none">{stat.label}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Help Bar */}
            {/* <div className="bg-[#1a5c1a] rounded-b-xl px-8 py-3 flex items-center shadow-lg">
            
                <div className="flex items-center gap-4 flex-[1.2] pr-7 border-r border-white/25">
                    <div className="w-13 h-13 border-2 border-white/60 rounded-full flex items-center justify-center flex-shrink-0 p-2.5">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M5 14 Q5 6 14 6 Q23 6 23 14" stroke="white" strokeWidth="2" fill="none" />
                            <rect x="3" y="13" width="5" height="8" rx="2.5" fill="white" />
                            <rect x="20" y="13" width="5" height="8" rx="2.5" fill="white" />
                            <path d="M23 20 Q23 24 18 24 L16 24" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-white font-bold text-sm">Need Help?</p>
                        <p className="text-white/80 text-xs leading-snug">
                            Our team is here to assist you<br />with your registration.
                        </p>
                    </div>
                </div>

        
                <div className="flex items-center gap-2 flex-1 justify-center px-5 border-r border-white/25 text-white text-sm font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <polyline points="2,4 12,13 22,4" />
                    </svg>
                    info@ihwe.in
                </div>

               
                <div className="flex items-center gap-2 flex-1 justify-center px-5 border-r border-white/25 text-white text-sm font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +91 9654900525
                </div>

              
                <div className="flex items-center gap-2 flex-1 justify-center px-5 text-white text-sm font-medium">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    www.ihwe.in
                </div>
            </div> */}

        </div>
    );
};

export default BottomData;
