"use client";
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import bleaf from '@/assets/icons/bleaf.png';
import n1 from '@/assets/icons/n1.png';
import SectionContainer from '@/components/layout/SectionContainer';
import type { PaperNeedHelpData } from '@/lib/fetchPaperPresentation';

/* Built-in content — shown when the admin-managed strip (GET /api/paper-need-help) is not available */
const DEFAULTS = {
  heading: 'NEED HELP?',
  description: 'Reach out to our paper presentation team for any queries.',
  email: 'info@arogyasangoshthi.com',
  phone: '+91 98765 43210',
};

const NeedHelpPaper = ({ data }: { data?: PaperNeedHelpData | null }) => {
  const heading = data?.heading || DEFAULTS.heading;
  const description = data ? data.description || '' : DEFAULTS.description;
  const email = data ? data.email : DEFAULTS.email;
  const phone = data ? data.phone : DEFAULTS.phone;
  // With saved data an image left empty is hidden; without data the built-in images show
  const icon = data ? data.icon || '' : n1.src;
  const iconAlt = data?.iconAlt || 'Need help document with magnifier icon';
  const leaf = data ? data.leafImage || '' : bleaf.src;
  const leafAlt = data?.leafImageAlt || 'Green leaf branch decoration';

  return (
    <section className="w-full bg-[#fbfcf7] pb-2 pt-0 md:pb-4 -mt-4 relative z-10">
      <SectionContainer>
        <div className="w-full bg-[#eeefdf] border border-[#e8ebd9] rounded-xl py-3 px-4 md:py-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-sm relative overflow-hidden">

        <div className="flex items-center gap-4">
          {icon && <img src={icon} alt={iconAlt} className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0" />}
          <div>
            <h4 className="text-[#032e1c] font-bold text-sm uppercase">{heading}</h4>
            {description && <p className="text-black text-xs md:text-sm font-medium">{description}</p>}
          </div>
        </div>

        {(email || phone) && (
          <div className="flex flex-col sm:flex-row items-center gap-6 text-[#032e1c] font-bold text-sm relative z-10 md:mr-12 lg:mr-24">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[#cba344] transition-colors">
                <Mail size={16} color="#291f14" /> {email}
              </a>
            )}
            {email && phone && <div className="hidden sm:block w-[1px] h-4 bg-[#032e1c]/20"></div>}
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 hover:text-[#cba344] transition-colors">
                <Phone size={16} color="#291f14" /> {phone}
              </a>
            )}
          </div>
        )}

        {/* Decorative leaf */}
        {leaf && <img src={leaf} alt={leafAlt} className="absolute -bottom-2 -right-4 w-12 md:w-16 pointer-events-none" />}

        </div>
      </SectionContainer>
    </section>
  );
};

export default NeedHelpPaper;
