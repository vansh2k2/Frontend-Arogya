import React, { useEffect, useRef } from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import { Calendar, MapPin, Users, Lightbulb, BookOpen, TrendingUp } from "lucide-react";
import leftImg from "@/assets/icons/left.png";
import footerRightImg from "@/assets/icons/footerright.png";
import leafrightImg from "@/assets/icons/leafright.png";
import BottomData from "./BottomData";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import gsap from "gsap";

const SingleRegistration = () => {
  const wrapperRef       = useRef(null);
  const leftPanelRef     = useRef(null);
  const headingRef       = useRef(null);
  const taglineRef       = useRef(null);
  const dateBlockRef     = useRef(null);
  const locationBlockRef = useRef(null);
  const illustrationRef  = useRef(null);
  const whyCardRef       = useRef(null);
  const whyItemsRef      = useRef([]);
  const formPanelRef     = useRef(null);
  const formTitleRef     = useRef(null);
  const formRowsRef      = useRef([]);
  const submitBtnRef     = useRef(null);
  const leafRightRef     = useRef(null);
  const footerRightRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // wrapper
      tl.fromTo(wrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
      );

      // left + right panel — together, fast
      tl.fromTo(leftPanelRef.current,
        { opacity: 0, x: -40, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.45 },
        "-=0.1"
      );
      tl.fromTo(formPanelRef.current,
        { opacity: 0, x: 40, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.45 },
        "<"
      );

      // heading words
      const headingEl = headingRef.current;
      if (headingEl) {
        const words = headingEl.innerText.split(" ");
        headingEl.innerHTML = words
          .map(w =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.2em">` +
            `<span class="hw" style="display:inline-block;transform:translateY(110%)">${w}</span>` +
            `</span>`
          ).join("");
        tl.to(headingEl.querySelectorAll(".hw"), {
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power4.out",
        }, "-=0.3");
      }

      // tagline
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 12, filter: "blur(2px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
        "-=0.3"
      );

      // date + location
      tl.fromTo(
        [dateBlockRef.current, locationBlockRef.current],
        { opacity: 0, y: 16, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32, stagger: 0.08, ease: "back.out(1.7)" },
        "-=0.2"
      );

      // illustration
      tl.fromTo(illustrationRef.current,
        { opacity: 0, scale: 0.9, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.38 },
        "-=0.2"
      );

      // why card
      tl.fromTo(whyCardRef.current,
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35 },
        "-=0.25"
      );

      // why items
      tl.fromTo(
        whyItemsRef.current.filter(Boolean),
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.055 },
        "-=0.25"
      );

      // form title
      tl.fromTo(formTitleRef.current,
        { opacity: 0, y: 12, filter: "blur(2px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 },
        "-=0.5"
      );

      // form rows cascade
      tl.fromTo(
        formRowsRef.current.filter(Boolean),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.05 },
        "-=0.25"
      );

      // submit button
      tl.fromTo(submitBtnRef.current,
        { opacity: 0, y: 14, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(2)" },
        "-=0.08"
      );

      // decorative images
      tl.fromTo(leafRightRef.current,
        { opacity: 0, x: 20, y: -20, rotation: 5 },
        { opacity: 0.8, x: 0, y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.3"
      );

      tl.fromTo(footerRightRef.current,
        { opacity: 0, x: 20, y: 20, scale: 0.95 },
        { opacity: 0.5, x: 0, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.4"
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ opacity: 0 }} className="bg-[#FAFBF6] font-inter relative overflow-hidden">
      <SectionContainer className="relative z-10">
        <div className="flex w-full flex-col lg:flex-row gap-6 py-6 relative">
          {/* Decorative Leaf */}
          <img ref={leafRightRef} style={{ opacity: 0 }} src={leafrightImg?.src || leafrightImg} alt="Leaf Right" className="absolute -right-28 -top-12 w-72 opacity-80 pointer-events-none z-20 mix-blend-multiply hidden lg:block" />

          {/* ===== LEFT PANEL ===== */}
          <div ref={leftPanelRef} style={{ opacity: 0 }} className="w-[35%] flex-shrink-0 flex flex-col">

            <p ref={taglineRef} style={{ opacity: 0 }} className="text-sm font-semibold text-gray-700 mb-1">
              Join the Global Movement for a
            </p>

            <h1 ref={headingRef} className="text-4xl font-medium text-[#1a5c1a] leading-tight mb-2">
              Healthier Tomorrow
            </h1>

            <div className="w-10 h-[3px] bg-[#1a5c1a] mb-2" />

            <p className="text-sm text-gray-900 mb-7 leading-relaxed">
              Be part of Asia's premier platform for<br />
              Health, Wellness, Innovation & Collaboration.
            </p>

            <div className="flex flex-row gap-4 mb-4">
              <div ref={dateBlockRef} style={{ opacity: 0 }} className="flex items-start gap-4">
                <div className="w-9 h-9 border border-[#1a5c1a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-[#1a5c1a]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-blue-600">21 – 23 August 2026</p>
                  <p className="text-sm font-medium text-blue-600">Friday – Sunday</p>
                </div>
              </div>

              <div ref={locationBlockRef} style={{ opacity: 0 }} className="flex items-start gap-4">
                <div className="w-9 h-9 border border-[#1a5c1a] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#1a5c1a]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-blue-600">PRAGATI MAIDAN,</p>
                  <p className="font-semibold text-sm text-blue-600">NEW DELHI, INDIA</p>
                </div>
              </div>
            </div>

            <div ref={illustrationRef} style={{ opacity: 0 }} className="flex items-end justify-start overflow-hidden">
              <img src={leftImg?.src || leftImg} alt="IHWE" className="h-full object-contain" />
            </div>

            <div
              ref={whyCardRef}
              style={{ opacity: 0, boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
              className="bg-white rounded-2xl p-5"
            >
              <h3 className="text-[#1a5c1a] font-semibold text-base mb-4">Why Attend IHWE 2026?</h3>
              {[
                { icon: <Users size={18} className="text-[#1a5c1a]" />, title: "Connect", desc: "Network with global leaders, experts & professionals" },
                { icon: <Lightbulb size={18} className="text-[#1a5c1a]" />, title: "Discover", desc: "Explore the latest products, technologies & innovations" },
                { icon: <BookOpen size={18} className="text-[#1a5c1a]" />, title: "Learn", desc: "Gain insights from world-class conferences & workshops" },
                { icon: <TrendingUp size={18} className="text-[#1a5c1a]" />, title: "Grow", desc: "Expand your knowledge, business & opportunities" },
              ].map((item, i) => (
                <div key={item.title} ref={el => (whyItemsRef.current[i] = el)} style={{ opacity: 0 }} className="flex gap-3 mb-4 items-start">
                  <div className="w-9 h-9 bg-[#f0f7f0] rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#1a5c1a] font-medium text-sm">{item.title}</p>
                    <p className="text-gray-900 text-xs leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== RIGHT FORM PANEL ===== */}
          <div
            ref={formPanelRef}
            style={{ opacity: 0, boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
            className="flex-1 w-[65%] bg-white rounded-2xl px-10 pb-10 pt-6 relative overflow-hidden"
          >
            <div ref={formTitleRef} style={{ opacity: 0 }}>
              <h2 className="text-2xl font-medium text-[#1a5c1a] mb-2">Delegate Registration</h2>
              <div className="w-9 h-[2px] bg-[#1a5c1a] mb-3" />
              <p className="text-sm text-gray-900 mb-7">Please fill in the details below to register as a delegate.</p>
            </div>

            {/* Row 1 */}
            <div ref={el => (formRowsRef.current[0] = el)} style={{ opacity: 0 }} className="flex gap-5 mb-5">
              <div className="flex flex-col gap-1.5 w-28 flex-shrink-0">
                <label className="text-sm font-medium text-gray-800">Title <span className="text-red-500">*</span></label>
                <select className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-[#1a5c1a]">
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                  <option>Prof.</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Full Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your full name"
                  className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] w-full" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Email Address <span className="text-red-500">*</span></label>
                <input type="email" placeholder="Enter your email address"
                  className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] w-full" />
              </div>
            </div>

            {/* Row 2 */}
            <div ref={el => (formRowsRef.current[1] = el)} style={{ opacity: 0 }} className="flex gap-5 mb-5">
              {["Mobile Number *", "WhatsApp Number"].map((label, i) => (
                <div key={i} className="flex flex-col gap-1.5 flex-1">
                  <label className="text-sm font-medium text-gray-800">
                    {label.replace(" *", "")} {i === 0 && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex">
                    <select className="border border-gray-300 border-r-0 rounded-l-sm px-2 py-1.5 text-sm bg-white focus:outline-none">
                      <option>🇮🇳 +91</option>
                    </select>
                    <input type="tel" placeholder={i === 0 ? "Enter mobile number" : "Enter WhatsApp number"}
                      className="border border-gray-300 rounded-r-sm px-3 py-1.5 text-sm flex-1 focus:outline-none focus:border-[#1a5c1a]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Row 3 */}
            <div ref={el => (formRowsRef.current[2] = el)} style={{ opacity: 0 }} className="flex gap-5 mb-5">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Designation <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your designation"
                  className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Organization / Company <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter organization / company"
                  className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
              </div>
            </div>

            {/* Row 4 */}
            <div ref={el => (formRowsRef.current[3] = el)} style={{ opacity: 0 }} className="flex gap-5 mb-5">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Country <span className="text-red-500">*</span></label>
                <select className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                  <option value="">Select country</option>
                  <option>India</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">City <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your city"
                  className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
              </div>
            </div>

            {/* Row 5 */}
            <div ref={el => (formRowsRef.current[4] = el)} style={{ opacity: 0 }} className="flex gap-5 mb-5">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Industry Type <span className="text-red-500">*</span></label>
                <select className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                  <option value="">Select industry</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Areas of Interest <span className="text-red-500">*</span></label>
                <select className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                  <option value="">Select your area of interest</option>
                </select>
              </div>
            </div>

            {/* Row 6 */}
            <div ref={el => (formRowsRef.current[5] = el)} style={{ opacity: 0 }} className="flex flex-col gap-1.5 mb-5">
              <label className="text-sm font-medium text-gray-800">How did you hear about IHWE 2026? <span className="text-red-500">*</span></label>
              <select className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm w-full focus:outline-none focus:border-[#1a5c1a]">
                <option value="">Select an option</option>
                <option>Social Media</option>
                <option>Email</option>
                <option>Friend/Colleague</option>
                <option>Website</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div ref={el => (formRowsRef.current[6] = el)} style={{ opacity: 0 }} className="w-full space-y-2">
              <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                <span className="text-[11px] font-medium text-black group-hover:text-black transition-colors leading-relaxed">
                  I hereby confirm that the information provided is accurate. I have read and agree to the <Link href={`/terms-of-service?page=exhibitor-registration`} className="text-blue-600 font-bold hover:underline" target="_blank">Terms & Conditions</Link> and the exhibition policy for IHWE Stand Booking.
                </span>
              </label>
              <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                <span className="text-[11px] font-medium text-black group-hover:text-black transition-colors leading-relaxed">
                  I have read and agree to the <Link href="/refund-policy" className="text-blue-600 font-bold hover:underline" target="_blank">Refund & Cancellation Policy</Link> for IHWE Stand Booking.
                </span>
              </label>
              <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                <span className="text-[11px] font-medium text-black group-hover:text-black transition-colors leading-relaxed">
                  I have read and agree to the <Link href="/privacy-policy" className="text-blue-600 font-bold hover:underline" target="_blank">Privacy Policy</Link> of IHWE.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button ref={submitBtnRef} style={{ opacity: 0 }} className="w-full mt-4 bg-[#1a5c1a] relative z-10 text-white font-medium py-2 rounded-lg text-sm hover:bg-[#145014] transition-colors">
              Register Now
            </button>
            <img ref={footerRightRef} style={{ opacity: 0 }} src={footerRightImg?.src || footerRightImg} alt="background right" className="absolute right-0 bottom-0 h-[40%] object-contain pointer-events-none z-0 mix-blend-multiply " />

          </div>
        </div>

        <BottomData />
      </SectionContainer>
    </div>
  );
};

export default SingleRegistration;
