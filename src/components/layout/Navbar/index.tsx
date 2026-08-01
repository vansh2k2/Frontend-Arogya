"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import MsmeHeroLogo from '../MsmeHeroLogo';
import { useQuery } from '@tanstack/react-query';
import { settingsApi, SERVER_URL } from '@/lib/api';

// Sparkle component to enhance button visibility
const Sparkle = ({ style, color = '#F3B71B' }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '20px',
      color: color,
      textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Paper Presentation', path: '/paper-presentation' },
  { name: 'Speakers', path: '/speakers' },
  // { name: 'Enquiry', path: '/enquiry' },
  // { name: 'Registration Fee', path: '/registration-fee' },
  { name: 'Partners & Supporters', path: '/partners' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get,
    staleTime: 5 * 60 * 1000,
  });

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return `${SERVER_URL}${url}`;
  };

  const logoUrl = getImageUrl(settings?.websiteLogo?.url) || getImageUrl(settings?.logo) || '/logo.png';
  const logoAlt = settings?.websiteLogo?.alt || "Arogya Sangoshthi Logo";

  return (
    <>
      <style>{`
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
        }
      `}</style>
      {isScrolled && <div className="h-[60px] w-full" />}
      <nav
        className={cn(
          'w-full z-50 transition-all duration-500',
          isScrolled
            ? 'fixed top-0 bg-background/95 backdrop-blur-md shadow-card animate-slide-down border-b border-slate-200/60'
            : 'relative bg-background border-b border-slate-200/40'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              isScrolled ? 'h-[52px] py-0.5' : 'h-[60px] py-1'
            )}
          >
            {/* ===== LOGO IMAGE ===== */}
            <Link href="/" className="flex items-center h-full">
              <img
                src={logoUrl?.src || logoUrl}
                alt={logoAlt}
                className={cn(
                  'transition-all duration-300',
                  isScrolled ? 'h-10' : 'h-12'
                )}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    'relative px-3 py-2 font-inter font-medium text-sm transition-colors duration-300 group',
                    pathname === link.path
                      ? 'text-primary'
                      : 'text-black hover:text-primary'
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-secondary rounded-full transition-all duration-300',
                      pathname === link.path ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                    )}
                  />
                </Link>
              ))}

              <div style={{ position: 'relative', display: 'inline-block' }} className="ml-1 shrink-0">
                <Sparkle color="#541A1A" style={{ top: '-10px', left: '15%', animationDelay: '0s' }} />
                <Sparkle color="#541A1A" style={{ bottom: '-10px', right: '15%', animationDelay: '0.4s' }} />
                <Sparkle color="#541A1A" style={{ top: '-8px', right: '40%', animationDelay: '0.8s' }} />
                
                <a href="/pdf.pdf" target="_blank" rel="noopener noreferrer">
                  <button className="bg-[#541A1A] hover:bg-[#3b1212] border border-white shadow-md group rounded-full px-3 py-1.5 text-white font-bold text-[10px] uppercase tracking-[0.05em] transition-all duration-300 flex items-center gap-1.5 relative z-10">
                    Download PDF <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </button>
                </a>
              </div>
              
              {/* Partner/MSME Logo Integration */}
              <div className="absolute right-4 top-full mt-2">
                <MsmeHeroLogo />
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-primary hover:bg-muted rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background z-50 lg:hidden transition-transform duration-300 ease-out shadow-2xl',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <img
              src={logoUrl?.src || logoUrl}
              alt={logoAlt}
              className="h-12"
            />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-primary hover:bg-muted rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                style={{ animationDelay: `${index * 50}ms` }}
                className={cn(
                  'block px-6 py-3 mx-3 my-1 rounded-lg font-medium transition-all duration-300',

                  isMobileMenuOpen && 'animate-fade-up',

                  /* 👉 Mobile menu text also BLACK */
                  pathname === link.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-black hover:bg-muted'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Download PDF Button Mobile */}
            <div className="px-6 py-2">
              <a href="/pdf.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
                <div style={{ position: 'relative', display: 'inline-block' }} className="shrink-0">
                  <Sparkle color="#541A1A" style={{ top: '-10px', left: '15%', animationDelay: '0s' }} />
                  <Sparkle color="#541A1A" style={{ bottom: '-10px', right: '15%', animationDelay: '0.4s' }} />
                  <Sparkle color="#541A1A" style={{ top: '-8px', right: '40%', animationDelay: '0.8s' }} />
                  
                  <button className="bg-[#541A1A] hover:bg-[#3b1212] border border-white shadow-md group rounded-full px-4 py-2 text-white font-bold text-[11px] uppercase tracking-[0.05em] transition-all duration-300 flex items-center gap-2 relative z-10">
                    Download PDF <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </button>
                </div>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Link
              href="/register-now"
              className="block w-full py-3 text-center gradient-gold text-secondary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
