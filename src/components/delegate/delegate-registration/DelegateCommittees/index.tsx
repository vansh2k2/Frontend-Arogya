import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Users, FileText, CheckSquare, Presentation, Star, User, ArrowRight } from 'lucide-react';
import xx1 from '@/assets/image/xx1.webp';
import xx2 from '@/assets/icons/xx2.png';
import gold from '@/assets/icons/gold.png';
import award from '@/assets/icons/award.png';
import footerright from '@/assets/icons/footerright.webp';
import leafright from '@/assets/icons/leafright.webp';
import cleaf from '@/assets/icons/cleaf.png';
import SectionContainer from '@/components/layout/SectionContainer';
import { API_URL, SERVER_URL } from '@/lib/api';

const Sparkle = ({ style, color = '#fff176' }) => (
  <span style={{
    position: 'absolute', pointerEvents: 'none', fontSize: '13px', color,
    animation: 'sparkleAnim 1.6s ease-in-out infinite', zIndex: 20, ...style
  }}>✦</span>
);

const DelegateCommittees = () => {
  const navigate = useRouter();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_URL}/organising-committee`);
        const data = await res.json();
        if (data.success) {
          setMembers(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    };
    fetchMembers();
  }, []);

  const scrollToFees = () => {
    const feesSection = document.getElementById('registration-fees');
    if (feesSection) {
      const headerOffset = 100;
      const elementPosition = feesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-white font-inter pb-16 pt-2 relative">
      <img 
        src={leafright?.src || leafright} 
        alt="Decorative Leaf Right" 
        className="absolute right-0 -top-6 md:-top-10 w-20 md:w-28 lg:w-36 pointer-events-none object-contain z-30 opacity-80" 
      />
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity:0; transform:scale(0.5) translateY(0); }
          40%  { opacity:1; transform:scale(1.2) translateY(-4px); }
          80%  { opacity:0.5; transform:scale(0.9) translateY(-6px); }
          100% { opacity:0; transform:scale(0.5) translateY(-8px); }
        }
        @keyframes shineSweep {
          0% { transform: skewX(-20deg) translateX(-130%); }
          100% { transform: skewX(-20deg) translateX(250%); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <SectionContainer className="flex flex-col gap-6 -mt-6 md:-mt-10 relative z-20">
        
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Left Card: Paper Presentation */}
          <div className="bg-[#00190a] rounded-2xl px-6 py-4 md:px-8 md:py-5 relative overflow-hidden flex flex-col justify-between" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 15px" }}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at top right, #34d399, transparent 60%)" }}></div>
            
            <div className="relative z-10 flex gap-4">
               {/* Left lady image (Absolute) */}
               <div className="hidden sm:block absolute left-[-20px] -top-4 w-48 xl:w-56 pointer-events-none">
                 <img src={xx1?.src || xx1} alt="Presenter" className="w-full h-full object-contain object-top" />
               </div>
               
               <div className="sm:ml-44 xl:ml-52 w-full">
                 <div className="-ml-8 sm:-ml-12 lg:-ml-16">
                   <h2 className="text-[#e7af4f] text-2xl md:text-3xl font-semibold tracking-tight mb-1">PAPER PRESENTATION</h2>
                   <p className="text-white text-sm md:text-base font-medium mb-6 whitespace-nowrap">Present Your Research. <span className="text-[#e7af4f]">Influence the Future.</span></p>
                 </div>
                 
                 <ul className="space-y-4 mb-8">
                   {[
                     "Open to Doctors, Researchers,\nAcademicians & Students",
                     "Best Paper Awards in\nMultiple Categories",
                     "Publication Opportunities in\nIndexed Journals",
                     "Increase Visibility &\nAcademic Impact"
                   ].map((text, idx) => (
                     <li key={idx} className="flex items-start gap-2">
                       <CheckCircle className="text-[#e7af4f] w-4 h-4 shrink-0 mt-0.5" />
                       <span className="text-white text-[10px] md:text-xs whitespace-pre-line leading-snug">{text}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Right Award */}
               <img src={award?.src || award} alt="Award" className="absolute right-0 top-28 w-32 md:w-40 object-contain hidden lg:block" />

            </div>

            <div className="relative z-10 flex flex-col gap-4 mt-2 md:-mt-4">
              {/* White steps band */}
              <div className="bg-[#fcfcf0] rounded-xl p-2 md:px-3 md:py-3 flex flex-wrap justify-between items-center gap-1 md:gap-2">
                 <div className="flex items-center gap-1.5 md:gap-2">
                   <FileText className="w-6 h-6 md:w-7 md:h-7 text-[#143111]" strokeWidth={1.5} />
                   <div className="flex flex-col">
                     <span className="text-[9px] md:text-[10px] font-bold text-black uppercase leading-tight">Submit</span>
                     <span className="text-[8px] md:text-[9px] font-medium text-black uppercase leading-tight">Your Abstract</span>
                   </div>
                 </div>
                 <div className="hidden md:block w-px h-6 bg-gray-300"></div>
                 <div className="flex items-center gap-1.5 md:gap-2">
                   <CheckSquare className="w-6 h-6 md:w-7 md:h-7 text-[#143111]" strokeWidth={1.5} />
                   <div className="flex flex-col">
                     <span className="text-[9px] md:text-[10px] font-bold text-black uppercase leading-tight">Review</span>
                     <span className="text-[8px] md:text-[9px] font-medium text-black uppercase leading-tight">By Expert Panel</span>
                   </div>
                 </div>
                 <div className="hidden md:block w-px h-6 bg-gray-300"></div>
                 <div className="flex items-center gap-1.5 md:gap-2">
                   <Presentation className="w-6 h-6 md:w-7 md:h-7 text-[#143111]" strokeWidth={1.5} />
                   <div className="flex flex-col">
                     <span className="text-[9px] md:text-[10px] font-bold text-black uppercase leading-tight">Present</span>
                     <span className="text-[8px] md:text-[9px] font-medium text-black uppercase leading-tight">At Conference</span>
                   </div>
                 </div>
                 <div className="hidden md:block w-px h-6 bg-gray-300"></div>
                 <div className="flex items-center gap-1.5 md:gap-2">
                   <Star className="w-6 h-6 md:w-7 md:h-7 text-[#143111]" strokeWidth={1.5} />
                   <div className="flex flex-col">
                     <span className="text-[9px] md:text-[10px] font-bold text-black uppercase leading-tight">Get Recognized</span>
                     <span className="text-[8px] md:text-[9px] font-medium text-black uppercase leading-tight">& Published</span>
                   </div>
                 </div>
              </div>

              <div className="flex flex-col items-center -mt-2 relative">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <Sparkle color="#112E81" style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#112E81" style={{ bottom: '-10px', right: '10%', animationDelay: '0.7s' }} />
                  <button className="bg-[#112E81] hover:bg-[#0c205c] border-2 border-white text-white font-black text-[10px] md:text-xs px-6 py-2 rounded-full flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 relative overflow-hidden group">
                    <span className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-[130%] group-hover:animate-[shineSweep_1.5s_infinite]"></span>
                    <span className="relative z-10">SUBMIT YOUR ABSTRACT NOW</span>
                    <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="text-white text-xs mt-3 font-medium tracking-wide">Last Date: 30th June 2026</p>
              </div>
            </div>
          </div>

          {/* Right Card: Organising Committee */}
          <div className="bg-[#fbfcf7] rounded-2xl px-6 py-4 md:px-8 md:py-5 flex flex-col justify-between" style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
             <div className="flex items-center gap-3 mb-0 relative z-10">
               <Users className="w-6 h-6 text-[#143111]" />
               <h2 className="text-[#143111] font-semibold text-lg md:text-xl tracking-tight uppercase">ORGANISING COMMITTEE</h2>
             </div>
             <div className="overflow-hidden w-full relative flex items-center border-b border-gray-200 pb-2 mb-0 mt-4" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                 <div className="flex animate-[marqueeRight_20s_linear_infinite] whitespace-nowrap gap-12 items-start pl-12">
                   {members.concat(members, members, members).map((member, idx) => (
                     <div key={idx} className="flex flex-col items-center text-center shrink-0">
                       <img src={member.image && member.image.startsWith('http') ? member.image : `${SERVER_URL}${member.image}`} className="w-16 h-16 rounded-full object-cover mb-2 shadow-sm border border-gray-200" alt={member.name} />
                       <p className="text-[#111844] font-bold text-[11px] leading-tight mb-0.5">{member.name}</p>
                       <p className="text-black text-[9px] leading-tight">{member.designation}<br/>{member.organization}</p>
                     </div>
                   ))}
                 </div>
              </div>

             <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-4 relative z-10">
               {/* Advisory Board */}
               <div className="flex-1">
                 <h3 className="text-[#143111] font-bold text-[11px] mb-3">ADVISORY BOARD</h3>
                 <ul className="space-y-2">
                   {[
                     "Dr. Anurag Aggarwal",
                     "Dr. G. N. Singh",
                     "Dr. Bhushan Patwardhan",
                     "Dr. Abhay Bang",
                     "Dr. Rama Joshi",
                     "And Many More"
                   ].map((name, idx) => (
                     <li key={idx} className="flex items-center gap-2">
                       <User className="w-3 h-3 text-[#143111] stroke-[2.5]" />
                       <span className="text-black font-semibold text-[10px]">{name}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Organising Members */}
               <div className="flex-[1.5] flex flex-col justify-center items-center text-center px-2 border-l border-gray-100 pl-6">
                 <h3 className="text-[#143111] font-bold text-[11px] mb-4 text-left w-full">ORGANISING MEMBERS</h3>
                 <div className="flex items-center gap-4 text-left mb-6">
                   <img src={xx2?.src || xx2} alt="Team" className="w-16 h-16 shrink-0 object-contain" />
                   <p className="text-gray-700 text-[11px] font-medium leading-relaxed">
                     A Dedicated Team of Healthcare Professionals Working Together to Deliver an Impactful Experience
                   </p>
                 </div>
                 <button className="border border-gray-300 bg-white rounded-full px-6 py-2.5 text-[10px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2 hover:bg-gray-50 transition w-full justify-center">
                   VIEW FULL COMMITTEE <ArrowRight size={12} />
                 </button>
               </div>
             </div>
          </div>
        </div>


        {/* Bottom Banner */}
        <div className="w-full bg-[#f8faf6] rounded-2xl py-4 px-6 md:px-10 flex flex-col md:flex-row items-center justify-center md:gap-12 gap-4 mt-2 border border-[#e8f0e8] relative overflow-hidden text-center">
          <h2 className="text-[#143111] font-semibold text-[13px] md:text-[15px] uppercase tracking-wide z-10 relative">
            BE A PART OF THE CHANGE. SHAPE THE FUTURE OF HEALTHCARE.
          </h2>
          
          <div style={{ position: 'relative', display: 'inline-block', zIndex: 10 }} className="shrink-0 mt-2 md:mt-0">
            <Sparkle color="#810B38" style={{ top: '-10px', left: '15%', animationDelay: '0s' }} />
            <Sparkle color="#810B38" style={{ bottom: '-10px', right: '15%', animationDelay: '0.7s' }} />
            <Sparkle color="#810B38" style={{ top: '5px', right: '-12px', animationDelay: '0.3s' }} />
            <Sparkle color="#810B38" style={{ bottom: '5px', left: '-12px', animationDelay: '1s' }} />
            <button onClick={scrollToFees} className="bg-[#810B38] hover:bg-[#68092d] border-2 border-white text-white font-black text-[10px] md:text-xs px-5 py-2 rounded-md flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 relative overflow-hidden group uppercase tracking-[0.1em]">
              <span className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-[130%] group-hover:animate-[shineSweep_1.5s_infinite]"></span>
              <span className="relative z-10">REGISTER NOW</span>
              <ArrowRight size={12} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <img src={cleaf?.src || cleaf} className="absolute right-[-10px] top-[-10px] w-28 md:w-32 opacity-100 pointer-events-none z-0 object-contain" alt="leaf" />
        </div>

      </SectionContainer>
    </div>
  );
};

export default DelegateCommittees;


