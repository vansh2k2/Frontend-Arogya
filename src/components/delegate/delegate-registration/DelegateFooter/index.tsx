import React, { useEffect, useRef } from "react";
import { Headphones, Phone, Mail, Globe, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DelegateFooter = () => {
  const contactBarRef = useRef(null);
  const helplineRef   = useRef(null);
  const phoneRef      = useRef(null);
  const emailRef      = useRef(null);
  const webRef        = useRef(null);
  const socialsRef    = useRef(null);
  const socialIconRefs = useRef([]);

  const logoRef       = useRef(null);
  const brandTextRef  = useRef(null);
  const partOfRef     = useRef(null);
  const supportedRef  = useRef(null);

  const socialLinks = {
    facebook:  "https://www.facebook.com/namogangewellness.event",
    instagram: "https://instagram.com",
    twitter:   "https://twitter.com",
    youtube:   "https://youtube.com",
    linkedin:  "https://linkedin.com",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Contact bar bg — slide up ──────────────────────────────
      gsap.fromTo(
        contactBarRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: contactBarRef.current, start: "top 95%", once: true },
        }
      );

      // ── Helpline — fade in from left ──────────────────────────
      gsap.fromTo(
        helplineRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.65,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: contactBarRef.current, start: "top 95%", once: true },
        }
      );

      // ── Contact items — stagger slide up ──────────────────────
      gsap.fromTo(
        [phoneRef.current, emailRef.current, webRef.current],
        { opacity: 0, y: 20, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.55,
          stagger: 0.12,
          delay: 0.28,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: contactBarRef.current, start: "top 95%", once: true },
        }
      );

      // ── Socials label — fade ──────────────────────────────────
      gsap.fromTo(
        socialsRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: contactBarRef.current, start: "top 95%", once: true },
        }
      );

      // ── Social icons — pop in one by one ─────────────────────
      gsap.fromTo(
        socialIconRefs.current.filter(Boolean),
        { opacity: 0, scale: 0, rotation: -25 },
        {
          opacity: 1, scale: 1, rotation: 0,
          duration: 0.45,
          stagger: 0.08,
          delay: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: contactBarRef.current, start: "top 95%", once: true },
        }
      );

      // ── Logo — slide in from left ─────────────────────────────
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -40, scale: 0.85 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: logoRef.current, start: "top 98%", once: true },
        }
      );

      // ── Brand text — words slide up ───────────────────────────
      gsap.fromTo(
        brandTextRef.current,
        { opacity: 0, y: 22, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.7,
          delay: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: logoRef.current, start: "top 98%", once: true },
        }
      );

      // ── Part Of — slide up ────────────────────────────────────
      gsap.fromTo(
        partOfRef.current,
        { opacity: 0, y: 28, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65,
          delay: 0.25,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: partOfRef.current, start: "top 99%", once: true },
        }
      );

      // ── Supported By — slide up ───────────────────────────────
      gsap.fromTo(
        supportedRef.current,
        { opacity: 0, y: 28, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65,
          delay: 0.38,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: supportedRef.current, start: "top 99%", once: true },
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="w-full bg-white">

      {/* ── Top Contact Bar ─────────────────────────────────────── */}
      <div ref={contactBarRef} style={{ opacity: 0 }} className="bg-[#143111] py-6 md:py-4 px-4 sm:px-6 lg:px-10 font-inter">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pl-0 md:pl-[30px]">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-6 md:gap-10 w-full md:w-auto">

            {/* Helpline */}
            <div ref={helplineRef} style={{ opacity: 0 }} className="flex items-center gap-3">
              <Headphones className="w-6 h-6 text-[#A3E635]" />
              <div className="text-white">
                <p className="text-[10px] font-semibold opacity-100 uppercase tracking-tighter">Have Questions?</p>
                <p className="text-[13px] font-medium leading-none">We're here to help!</p>
              </div>
            </div>

            <div className="hidden md:block h-8 w-[1px] bg-white/10" />

            {/* Phone */}
            <div ref={phoneRef} style={{ opacity: 0 }} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Phone className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[15px] font-medium text-white">+91-9654900525</span>
            </div>

            <div className="hidden md:block h-8 w-[1px] bg-white/10" />

            {/* Email */}
            <div ref={emailRef} style={{ opacity: 0 }} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-medium text-white tracking-tight">info@ihwe.in</span>
            </div>

            <div className="hidden md:block h-8 w-[1px] bg-white/10" />

            {/* Web */}
            <div ref={webRef} style={{ opacity: 0 }} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-medium text-white tracking-tight">www.ihwe.in</span>
            </div>
          </div>

          {/* Socials */}
          <div ref={socialsRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full md:w-auto mt-4 md:mt-0 border-t border-white/10 pt-4 md:border-none md:pt-0">
            <span className="text-[12px] font-semibold text-white uppercase tracking-widest opacity-100 text-center">Follow Us</span>
            <div className="flex items-center gap-3 justify-center">
              {[
                { href: socialLinks.linkedin,  bg: "bg-[#0077b5]", el: <Linkedin  className="w-4 h-4" /> },
                { href: socialLinks.facebook,  bg: "bg-[#1877f2]", el: <Facebook  className="w-4 h-4" /> },
                { href: socialLinks.twitter,   bg: "bg-black",     el: <span className="font-black text-[10px]">X</span> },
                { href: socialLinks.instagram, bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", el: <Instagram className="w-4 h-4" /> },
                { href: socialLinks.youtube,   bg: "bg-[#ff0000]", el: <Youtube   className="w-4 h-4" /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  ref={el => (socialIconRefs.current[i] = el)}
                  style={{ opacity: 0 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-full ${s.bg} flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg`}
                >
                  {s.el}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Branding Section ────────────────────────────────────── */}


    </footer>
  );
};

export default DelegateFooter;