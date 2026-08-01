"use client";
import React from 'react';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import contactbg from '@/assets/banner/contactbg1.webp';
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api';
import SectionContainer from '@/components/layout/SectionContainer';

const ContactHero = () => {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get,
    staleTime: 5 * 60 * 1000,
  });

  const defaultContactInfo = [
    {
      icon: <MapPin size={20} className="text-[#032e1c]" />,
      title: 'Visit Us',
      lines: ['Pragati Maidan,', 'New Delhi - 110001, India']
    },
    {
      icon: <Mail size={20} className="text-[#032e1c]" />,
      title: 'Email Us',
      lines: ['arogyasanghosthi@gmail.com', 'info@arogyasanghosthi.com']
    },
    {
      icon: <Phone size={20} className="text-[#032e1c]" />,
      title: 'Call Us',
      lines: ['+91 98765 43210', '+91 11 1234 5678']
    },
    {
      icon: <Clock size={20} className="text-[#032e1c]" />,
      title: 'Office Hours',
      lines: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed']
    }
  ];

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Mail': return <Mail size={20} className="text-[#032e1c]" />;
      case 'Phone': return <Phone size={20} className="text-[#032e1c]" />;
      case 'Clock': return <Clock size={20} className="text-[#032e1c]" />;
      case 'MapPin':
      default: return <MapPin size={20} className="text-[#032e1c]" />;
    }
  };

  const contactInfo = settings?.infoBarCards?.length > 0
    ? settings.infoBarCards.map(card => ({
      icon: getIconComponent(card.icon),
      title: card.title,
      lines: card.text ? card.text.split('\n') : []
    }))
    : defaultContactInfo;

  return (
    <section className="relative w-full pb-20 pt-0 bg-[#fbfcf7]">
      {/* Hero Banner Section */}
      <div className="w-full h-[320px] md:h-[420px] relative overflow-hidden flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-right md:bg-center"
          style={{ backgroundImage: `url(${contactbg?.src || contactbg})` }}
        >
          {/* Faint white gradient overlay on the left side to ensure text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 md:from-white/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <SectionContainer className="relative z-10 w-full">
          <div className="max-w-xl -mt-10 md:-mt-16 ml-4 md:ml-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e9f0cd] text-[#032e1c] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6 border border-[#dce3ca]">
              <Send size={14} className="-rotate-45" /> CONTACT US
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif font-[600] text-[#03221c] leading-tight mb-4">
              Let's <span className="text-[#fe7c0c]">Connect</span><br />With You!
            </h1>

            {/* Decoration line */}
            <svg width="60" height="10" viewBox="0 0 60 10" className="mb-4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 5C10 -2 20 12 30 5C40 -2 50 12 60 5" stroke="#fe7c0c" strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* Subtitle */}
            <p className="text-black text-sm md:text-base max-w-md leading-relaxed">
              We're here to answer your questions and <br />
              collaborate with you.
            </p>
          </div>
        </SectionContainer>
      </div>

      {/* Contact Info Bar */}
      <SectionContainer className="relative z-20 -mt-6 md:-mt-8">
        <div className="bg-[#fefefe] rounded-2xl shadow-lg border border-gray-100 py-4 px-6 md:py-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

          {contactInfo.map((info, idx) => (
            <div key={idx} className="flex items-start justify-start md:justify-center gap-3 xl:gap-4 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:px-4 first:pl-0 last:border-0 last:pb-0 md:last:pr-0">
              <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-[#e9f0cd] flex items-center justify-center shrink-0 border border-[#dce3ca]">
                {info.icon}
              </div>
              <div className="flex flex-col">
                <h4 className="font-[600] text-[#032e1c] text-sm mb-1">{info.title}</h4>
                {info.lines.map((line, i) => (
                  <p key={i} className="text-black text-[11px] xl:text-xs font-medium leading-tight">{line}</p>
                ))}
              </div>
            </div>
          ))}

        </div>
      </SectionContainer>

    </section>
  );
};

export default ContactHero;

