"use client";
import React from 'react';
import paperBg from '@/assets/banner/paper.webp';
import mainIcon from '@/assets/icons/main.webp';
import { FileText } from 'lucide-react';
import type { PaperHeroData } from '@/lib/fetchPaperPresentation';

/* Built-in content — shown when the admin-managed hero (GET /api/paper-hero) is not available */
const DEFAULTS = {
  eyebrow: 'SHARE KNOWLEDGE. INSPIRE CHANGE.',
  title: 'Paper\nPresentation',
  description:
    'A platform for researchers, academicians, practitioners\nand students to showcase innovative ideas, original\nresearch and best practices that contribute to the\nfuture of healthcare and wellness.',
  badgeText: 'Present Your\nResearch.\nCreate Impact.',
};

const withBreaks = (text: string) =>
  text.split('\n').map((line, i, all) => (
    <React.Fragment key={i}>
      {line}
      {i < all.length - 1 && <br />}
    </React.Fragment>
  ));

const HeroPaperPresentation = ({ data }: { data?: PaperHeroData | null }) => {
  const eyebrow = data ? data.eyebrow || '' : DEFAULTS.eyebrow;
  const [titleFirst, ...titleRest] = (data?.title || DEFAULTS.title).split('\n');
  const description = data ? data.description || '' : DEFAULTS.description;
  const badgeText = data ? data.badgeText || '' : DEFAULTS.badgeText;
  // With saved data an image left empty is hidden; without data the built-in images show
  const background = data ? data.backgroundImage || '' : paperBg.src;
  const backgroundAlt = data?.backgroundImageAlt || 'Paper Presentation banner';
  const divider = data ? data.dividerImage || '' : mainIcon.src;
  const dividerAlt = data?.dividerImageAlt || 'Green lotus logo';

  return (
    <section className="relative w-full h-[300px] md:h-[380px] lg:h-[480px] bg-[#fdfaf5] flex items-center">
      {/* Background Image — an <img> so it carries alt text */}
      {background && (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <img src={background} alt={backgroundAlt} className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
      )}

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-16 relative z-10 -mt-6">
        <div className="max-w-xl">

          <div className="flex flex-col mb-4 md:ml-8">
            {eyebrow && (
              <p className="text-[#032e1c] font-bold text-xs md:text-sm tracking-[0.15em] uppercase mb-4 ml-2">
                {eyebrow}
              </p>
            )}

            {/* The Paper Presentation page's only H1 */}
            <h1 className="flex flex-col leading-none mb-2">
              <span className="text-[#0c290d] font-serif font-bold text-4xl md:text-5xl lg:text-[64px] tracking-tight mb-2">{titleFirst}</span>
              {titleRest.length > 0 && (
                <>
                  {' '}
                  <span className="text-[#b6811a] font-serif font-bold text-4xl md:text-5xl lg:text-[64px] tracking-tight">{titleRest.join(' ')}</span>
                </>
              )}
            </h1>

            <div className="flex items-center gap-4 mt-0">
              <div className="h-[2px] w-12 md:w-16 bg-[#cba344]"></div>
              {divider && <img src={divider} alt={dividerAlt} className="h-6 w-auto object-contain" />}
            </div>
          </div>

          {description && (
            <p className="text-black text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-lg mt-4 font-inter md:ml-8">
              {withBreaks(description)}
            </p>
          )}
        </div>
      </div>

      {/* Floating Circular Badge */}
      {badgeText && (
        <div className="hidden md:flex absolute bottom-4 lg:bottom-1 right-[260px] lg:right-[480px] xl:right-[560px] w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#032e1c] border-2 border-[#cba344] z-20 shadow-xl flex-col items-center justify-center p-3 lg:p-4 text-center">
          <FileText size={32} className="text-white mb-1.5 lg:mb-2" strokeWidth={1.5} />
          <p className="text-white font-bold text-xs lg:text-sm leading-snug">
            {withBreaks(badgeText)}
          </p>
        </div>
      )}

    </section>
  );
};

export default HeroPaperPresentation;
