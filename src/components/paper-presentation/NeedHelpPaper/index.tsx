"use client";
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import bleaf from '@/assets/icons/bleaf.png';
import n1 from '@/assets/icons/n1.png';
import SectionContainer from '@/components/layout/SectionContainer';
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api';

const NeedHelpPaper = () => {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get
  });

  const sameAsTopbar = settings?.paperPresentationSameAsTopbar !== false;
  const emails = sameAsTopbar ? settings?.topbarEmails : settings?.paperPresentationEmails;
  const phones = sameAsTopbar ? settings?.topbarPhones : settings?.paperPresentationPhones;
  
  const displayEmail = emails && emails.length > 0 ? emails[0] : "papers@arogyasanghosthi.com";
  const displayPhone = phones && phones.length > 0 ? phones[0] : "+91 98765 43210";
  return (
    <section className="w-full bg-[#fbfcf7] pb-2 pt-0 md:pb-4 -mt-4 relative z-10">
      <SectionContainer>
        <div className="w-full bg-[#eeefdf] border border-[#e8ebd9] rounded-xl py-3 px-4 md:py-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-sm relative overflow-hidden">
        
        <div className="flex items-center gap-4">
          <img src={n1?.src || n1} alt="Need Help" className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0" />
          <div>
            <h4 className="text-[#032e1c] font-bold text-sm uppercase">NEED HELP?</h4>
            <p className="text-black text-xs md:text-sm font-medium">Reach out to our paper presentation team for any queries.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 text-[#032e1c] font-bold text-sm relative z-10 md:mr-12 lg:mr-24">
          <a href={`mailto:${displayEmail}`} className="flex items-center gap-2 hover:text-[#cba344] transition-colors">
            <Mail size={16} color="#291f14" /> {displayEmail}
          </a>
          <div className="hidden sm:block w-[1px] h-4 bg-[#032e1c]/20"></div>
          <a href={`tel:${displayPhone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 hover:text-[#cba344] transition-colors">
            <Phone size={16} color="#291f14" /> {displayPhone}
          </a>
        </div>

        {/* Decorative leaf */}
        <img src={bleaf?.src || bleaf} alt="decoration" className="absolute -bottom-2 -right-4 w-12 md:w-16 pointer-events-none" />

        </div>
      </SectionContainer>
    </section>
  );
};

export default NeedHelpPaper;

