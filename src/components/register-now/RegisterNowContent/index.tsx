"use client";
import React, { useEffect, useRef, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SectionContainer from "@/components/layout/SectionContainer";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Globe,
  Users,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Headphones,
  Mail,
  Mail as MailIcon,
  Phone,
  ShieldCheck,
  UserPlus,
  Lock,
  CheckCircle2,
  Check,
  Info,
  ArrowRight,
  Copy,
  UserCheck,
  CheckCircle,
  FileText,
  Smartphone,
  Sparkles,
  Building2,
  Tag,
  Loader2,
  BadgePercent
} from "lucide-react";
import RegistrationSelectionCards from '../RegistrationSelectionCards';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { API_URL } from "@/lib/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import footerRight from "@/assets/icons/footerright.png";
import leafRight from "@/assets/icons/leafright.png";
import cleaf from "@/assets/icons/leafs.png";
import d11 from "@/assets/icons/ddd1.png";
import d22 from "@/assets/icons/ddd2.png";
import d33 from "@/assets/icons/ddd3.png";
import icon1 from "@/assets/icons/icon1.png";
import icon2 from "@/assets/icons/icon2.png";
import icon3 from "@/assets/icons/icon3.png";
import icon4 from "@/assets/icons/icon4.png";
import singleImg from "@/assets/icons/single.png";
import i1 from "@/assets/icons/i1.png";
import i2 from "@/assets/icons/i2.png";
import i3 from "@/assets/icons/i3.png";
import i4 from "@/assets/icons/i4.png";
import zz1 from "@/assets/icons/zzz1.png";
import zz2 from "@/assets/icons/zzz2.png";
import zz3 from "@/assets/icons/zzz3.png";
import zz4 from "@/assets/icons/zzz4.png";

gsap.registerPlugin(ScrollTrigger);

const Sparkle = ({ style, color = '#fff176' }) => (
  <span style={{
    position: 'absolute', pointerEvents: 'none', fontSize: '13px', color,
    animation: 'sparkleAnim 1.6s ease-in-out infinite', zIndex: 20, ...style
  }}>✦</span>
);

const passOptions = [
  { name: "DELEGATE PASS", price: "₹1,500" },
  { name: "DELEGATE PASS ", price: "₹3,000" },
  { name: "STUDENT DELEGATE ONE DAY", price: "₹1,000" },
  { name: "PRACTITIONER DELEGATE ONE DAY", price: "₹1,500" },
  { name: "PAPER PRESENTATION", price: "₹2,500" },
  { name: "POSTER PRESENTATION", price: "₹2,500" },
];

// ===== Staggered 3D flip-in for the form rows =====
const formContainerVariants: any = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};
const formRowVariants: any = {
  hidden: { opacity: 0, rotateX: -90, y: 22 },
  show: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.34, 1.56, 0.64, 1],
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
};
// ===== Individual field slide-in (child of each row) =====
const formFieldVariants: any = {
  hidden: { opacity: 0, x: -18, filter: "blur(5px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};


const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RegisterNowContent = () => {
  const containerRef = useRef(null);

  const bgDecorRef = useRef(null);
  const leftLeafRef = useRef(null);
  const formLeafRef = useRef(null);

  const eventCardRef = useRef(null);
  const whyAttendCardRef = useRef(null);
  const whyAttendItemsRef = useRef<any[]>([]);
  const needHelpCardRef = useRef(null);
  const needHelpBgIconRef = useRef(null);

  const formPanelRef = useRef(null);
  const formPanelShimmerRef = useRef(null);
  const formRef = useRef(null);
  const formTitleRef = useRef(null);
  const secureBadgeRef = useRef(null);
  const formRowsRef = useRef<any[]>([]);

  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('planName') || "";
  const initialPrice = searchParams.get('price') || "";

  const [formData, setFormData] = useState({
    planName: initialPlan, price: initialPrice,
    title: "", fullName: "", email: "", mobile: "", whatsappNumber: "",
    designation: "", organization: "", country: "India", state: "", city: "",
    industryType: "", areasOfInterest: "", source: ""
  });

  const [registrationType, setRegistrationType] = useState(null); // null, 'single', 'group'
  const [groupMembers, setGroupMembers] = useState([]); // Array of extra delegates

  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/countries`)
      .then(res => res.json())
      .then(data => setCountriesList(data.data || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedCountryCode) {
      fetch(`${API_URL}/states?countryCode=${selectedCountryCode}`)
        .then(res => res.json())
        .then(data => setStatesList(data.data || []))
        .catch(err => console.error(err));
    } else {
      setStatesList([]);
    }
  }, [selectedCountryCode]);

  useEffect(() => {
    if (selectedStateCode) {
      fetch(`${API_URL}/cities?stateCode=${selectedStateCode}`)
        .then(res => res.json())
        .then(data => setCitiesList(data.data || []))
        .catch(err => console.error(err));
    } else {
      setCitiesList([]);
    }
  }, [selectedStateCode]);

  useEffect(() => {
    if (registrationType && formRef.current) {
      setTimeout(() => {
        const y = formRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 300);
    }
  }, [registrationType]);

  const [isLoading, setIsLoading] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [whatsappOtpSent, setWhatsappOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [whatsappOtpVerified, setWhatsappOtpVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [whatsappOtp, setWhatsappOtp] = useState("");
  const [emailTimer, setEmailTimer] = useState(0);
  const [whatsappTimer, setWhatsappTimer] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [otpAlert, setOtpAlert] = useState({ show: false, message: "", type: "sent" });

  // Day selection (multi-select: Day 1, Day 2, Day 3)
  const [selectedDays, setSelectedDays] = useState([]);

  // Coupon state
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);  // { code, discountPercent }
  const [couponError, setCouponError] = useState("");
  const [couponAlert, setCouponAlert] = useState({ show: false, message: "" });
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  const DAY_OPTIONS = [
    { day: 1, label: "Day 1", date: "21 Aug", bg: "#143111" },
    { day: 2, label: "Day 2", date: "22 Aug", bg: "#0B2C66" },
    { day: 3, label: "Day 3", date: "23 Aug", bg: "#6A3DF0" },
  ];

  const toggleDay = (dayNum) => {
    setSelectedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  // Validate & apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);
    try {
      const res = await fetch(`${API_URL}/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase(), registrationType }),
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon(data.data);
        setCouponAlert({ show: true, message: `Great! ${data.data.discountPercent}% discount applied successfully.` });
        setTimeout(() => setCouponAlert(prev => ({ ...prev, show: false })), 3000);
      } else {
        setCouponError(data.message || "Invalid coupon.");
      }
    } catch {
      setCouponError("Failed to validate coupon.");
    } finally {
      setIsCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const showOtpAlert = (message, type = "sent") => {
    setOtpAlert({ show: true, message, type });
    setTimeout(() => {
      setOtpAlert(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Timer countdown logic
  useEffect(() => {
    let emailInterval;
    if (emailTimer > 0) {
      emailInterval = setInterval(() => setEmailTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(emailInterval);
  }, [emailTimer]);

  useEffect(() => {
    let whatsappInterval;
    if (whatsappTimer > 0) {
      whatsappInterval = setInterval(() => setWhatsappTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(whatsappInterval);
  }, [whatsappTimer]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [industries, setIndustries] = useState([]);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    // Fetch categories dynamically
    const fetchCategories = async () => {
      try {
        const indRes = await fetch(`${API_URL}/categories?type=industry`);
        const indData = await indRes.json();
        if (indData.success) setIndustries(indData.data);

        const intRes = await fetch(`${API_URL}/categories?type=interest`);
        const intData = await intRes.json();
        if (intData.success) setInterests(intData.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInitiate = async (e, channel) => {
    e.preventDefault();
    if (!formData.fullName) {
      toast.error('Please fill in your Full Name first.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
      return;
    }
    if (channel === 'email' && !formData.email) {
      toast.error('Please fill in your Email Address.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
      return;
    }
    if (channel === 'whatsapp' && !formData.whatsappNumber) {
      toast.error('Please fill in your WhatsApp Number.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, mobile: formData.whatsappNumber, channel })
      });
      const data = await res.json();
      if (data.success) {
        if (channel === 'email') {
          setEmailOtpSent(true);
          setEmailTimer(30); // Start 30s timer
        }
        if (channel === 'whatsapp') {
          setWhatsappOtpSent(true);
          setWhatsappTimer(30); // Start 30s timer
        }
        showOtpAlert(data.message || `OTP sent successfully to ${channel}.`, 'sent');
      } else {
        toast.error(data.message || 'Error initiating registration.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to initiate registration.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInlineVerify = async (e, channel) => {
    e.preventDefault();
    setIsLoading(true);
    const otpToVerify = channel === 'email' ? emailOtp : whatsappOtp;

    try {
      const res = await fetch(`${API_URL}/delegates-registration/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, whatsappNumber: formData.whatsappNumber, channel, otp: otpToVerify })
      });
      const data = await res.json();
      if (data.success) {
        if (channel === 'email') setEmailOtpVerified(true);
        if (channel === 'whatsapp') setWhatsappOtpVerified(true);
        showOtpAlert(`${channel === 'email' ? 'Email' : 'WhatsApp'} OTP Verified!`, 'verified');
      } else {
        toast.error(data.message || 'Invalid OTP', { className: 'bg-red-500 border-none', style: { color: 'white' } });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify OTP', { className: 'bg-red-500 border-none', style: { color: 'white' } });
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic total price calculation
  // Base price from pass selection
  const basePriceNum = parseInt(formData.price.replace(/[^\d]/g, '')) || 0;

  // Days multiplier: for ONE DAY pass, use selected days count (min 1); for other passes always 1
  const isOneDayPass = !!formData.planName;
  const daysMultiplier = selectedDays.length > 0 ? selectedDays.length : 1;

  // Group multiplier
  const multiplier = registrationType === 'group' ? (1 + groupMembers.length) : 1;

  // Sub-total before coupon
  const subTotal = basePriceNum * daysMultiplier * multiplier;

  // Coupon discount
  const discountAmount = appliedCoupon ? Math.round(subTotal * appliedCoupon.discountPercent / 100) : 0;
  const finalTotal = subTotal - discountAmount;

  const totalAmountStr = formData.price ? `₹${finalTotal.toLocaleString('en-IN')}` : "₹0";
  const subTotalStr = formData.price ? `₹${subTotal.toLocaleString('en-IN')}` : "₹0";

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.price || formData.price === "₹0" || formData.price === "") {
      toast.error("Please select a valid pass first.", { className: 'bg-red-500 border-none', style: { color: 'white' } });
      return;
    }
    if (!termsAccepted) {
      toast.error('Please agree to the Terms & Conditions and Privacy Policy first.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
      return;
    }
    if (!emailOtpVerified && !whatsappOtpVerified) {
      toast.error('Please verify your Email or WhatsApp OTP first.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
      return;
    }

    const channel = searchParams.get('channel') || "Direct";

    // Amount uses finalTotal which already accounts for multiplier
    const amountNum = finalTotal * 100;

    let isLoaded = await loadRazorpay();

    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load. Check your connection.", { className: 'bg-red-500 border-none', style: { color: 'white' } });
      setIsLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(`${API_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountNum, currency: "INR" })
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        toast.error("Could not initiate payment order", { className: 'bg-red-500 border-none', style: { color: 'white' } });
        setIsLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_RTd9y3ngRanKxq", // Forced test key as requested
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Arogya Sangosthi",
        description: formData.planName,
        image: window.location.origin + "/logo.png",
        order_id: orderData.orderId,
        handler: async function (response) {
          setIsLoading(true);
          try {
            const verifyRes = await fetch(`${API_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              const finalOtp = emailOtpVerified ? emailOtp : whatsappOtp;
              let finalRes;

              if (registrationType === 'group') {
                const delegatesData = [
                  { ...formData, selectedDays, couponCode: appliedCoupon?.code || null, price: totalAmountStr, mobile: formData.whatsappNumber, transactionId: response.razorpay_payment_id },
                  ...groupMembers.map(m => ({
                    ...formData,
                    price: "Group Member",
                    title: m.title,
                    fullName: m.fullName,
                    email: m.email,
                    mobile: m.whatsappNumber || m.mobile,
                    whatsappNumber: m.whatsappNumber,
                    designation: m.designation,
                    transactionId: response.razorpay_payment_id
                  }))
                ];
                finalRes = await fetch(`${API_URL}/delegates-registration/verify-group`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    primaryEmail: formData.email,
                    primaryWhatsapp: formData.whatsappNumber,
                    otp: finalOtp,
                    delegatesData
                  })
                });
              } else {
                finalRes = await fetch(`${API_URL}/delegates-registration/verify`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...formData, selectedDays, couponCode: appliedCoupon?.code || null, price: totalAmountStr, mobile: formData.whatsappNumber, otp: finalOtp, transactionId: response.razorpay_payment_id })
                });
              }

              const finalData = await finalRes.json();

              if (finalData.success) {
                setIsSuccess(true);
                formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                setPaymentId(response.razorpay_payment_id);

                setFormData({
                  planName: initialPlan, price: initialPrice,
                  title: "", fullName: "", email: "", mobile: "", whatsappNumber: "",
                  designation: "", organization: "", country: "India", state: "", city: "",
                  industryType: "", areasOfInterest: "", source: ""
                });
                setSelectedDays([]);
                setAppliedCoupon(null);
                setCouponCode("");
                setCouponError("");
                setShowCouponInput(false);
                setGroupMembers([]);
                setRegistrationType(null);
                setSelectedCountryCode("");
                setSelectedStateCode("");
                setEmailOtp("");
                setWhatsappOtp("");
                setEmailOtpSent(false);
                setWhatsappOtpSent(false);
                setEmailOtpVerified(false);
                setWhatsappOtpVerified(false);
                setTermsAccepted(false);

                setTimeout(() => {
                  setIsSuccess(false);
                  setPaymentId("");
                }, 5000);
              } else {
                toast.error(finalData.message || 'Registration failed after payment.', { className: 'bg-red-500 border-none', style: { color: 'white' } });
              }
            } else {
              toast.error("Payment verification failed", { className: 'bg-red-500 border-none', style: { color: 'white' } });
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("An error occurred while verifying payment. Please contact support.", { className: 'bg-red-500 border-none', style: { color: 'white' } });
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.whatsappNumber
        },
        theme: {
          color: "#1e3a8a"
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        toast.error(response.error.description, { className: 'bg-red-500 border-none', style: { color: 'white' } });
      });
      paymentObject.open();

    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed.", { className: 'bg-red-500 border-none', style: { color: 'white' } });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // Ambient background watermark — fades/scales in (settles at its original 60% opacity)
      tl.fromTo(
        bgDecorRef.current,
        { opacity: 0, scale: 0.5, rotate: -30, x: 100, y: 50 },
        { opacity: 0.8, scale: 1, rotate: 0, x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.75)" },
        0
      );

      // Left leaf — elastic pop in
      tl.fromTo(
        leftLeafRef.current,
        { opacity: 0, scale: 0.4, rotate: -25, x: -30 },
        { opacity: 1, scale: 1, rotate: 0, x: 0, duration: 1, ease: "elastic.out(1, 0.55)" },
        0.1
      );

      // Left column cards — cascading 3D flip-up
      tl.fromTo(
        eventCardRef.current,
        { opacity: 0, y: 40, rotationX: -25, transformOrigin: "top center" },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.7 },
        0.15
      );

      // Form panel — clip-path wipe reveal (parallel with the left column)
      tl.fromTo(
        formPanelRef.current,
        { opacity: 0, y: 30, clipPath: "inset(0% 0% 100% 0%)" },
        { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" },
        0.2
      );

      // Shimmer sweep across the form panel right after the wipe lands
      tl.fromTo(
        formPanelShimmerRef.current,
        { xPercent: -130, opacity: 0.9 },
        { xPercent: 230, opacity: 0, duration: 1.1, ease: "power1.inOut" },
        0.85
      );

      tl.fromTo(
        whyAttendCardRef.current,
        { opacity: 0, y: 40, rotationX: -25, transformOrigin: "top center" },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.7 },
        0.32
      );

      tl.fromTo(
        needHelpCardRef.current,
        { opacity: 0, y: 40, rotationX: -25, transformOrigin: "top center" },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.7 },
        0.49
      );

      // Top-right form leaf — pop in
      tl.fromTo(
        formLeafRef.current,
        { opacity: 0, scale: 0.5, rotate: 20 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" },
        0.55
      );

      // "Why attend" list rows — quick mini-stagger once the card has landed
      tl.fromTo(
        whyAttendItemsRef.current.filter(Boolean),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 },
        0.65
      );

      // Form fields - handled by framer-motion (staggered 3D flip-in) once the form mounts

      // Gentle, always-on ambient motion once things have landed
      gsap.to(leftLeafRef.current, {
        y: "+=10", duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.2,
      });
      gsap.to(formLeafRef.current, {
        y: "+=8", rotate: "+=4", duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.4,
      });
      gsap.to(bgDecorRef.current, {
        scale: 1.04, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5,
      });
      gsap.to(needHelpBgIconRef.current, {
        rotate: 8, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-10 flex justify-center pb-20 font-inter -mt-4 md:-mt-8 overflow-x-clip">
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
      `}</style>
      <SectionContainer className="relative z-10 w-full">
        {/* Background Decoration Image */}
        <div
          ref={bgDecorRef}
          className="absolute top-0 md:-top-[5%] right-0 z-[-1] pointer-events-none w-72 md:w-[450px]"
        >
          <div className="translate-x-12 md:translate-x-20">
            <img src={(footerRight?.src || footerRight) as string} alt="Decoration" className="w-full h-auto object-contain" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative z-10">

          {/* ================= LEFT PANEL ================= */}
          <div className="w-full lg:w-[28%] flex flex-col gap-6 lg:pr-4 relative [perspective:1000px]">

            {/* Left Leaf Decoration */}
            <div
              ref={leftLeafRef}
              style={{ opacity: 0 }}
              className="absolute top-[15%] left-0 w-48 md:w-72 z-[-1] pointer-events-none"
            >
              <div className="-translate-x-16 md:-translate-x-28">
                <img src={(cleaf?.src || cleaf) as string} alt="Decoration Left" className="w-full h-auto object-contain" />
              </div>
            </div>

            {/* EVENT DETAILS */}
            <div ref={eventCardRef} style={{ opacity: 0, boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em" }} className="bg-[#f5f8f5] rounded-xl overflow-hidden border border-gray-100 relative">
              <div className="bg-[#36682e] text-white font-extrabold px-5 py-3 text-sm tracking-wider font-inter inline-block pr-8 rounded-br-[20px]">
                EVENT DETAILS
              </div>
              <div className="p-5 bg-[#f7f8f2]">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-300 mb-4">
                  <img src={(d11?.src || d11) as string} alt="Date" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm font-inter">21 - 23 AUGUST 2026</p>
                    <p className="text-gray-600 text-xs font-inter">Friday - Sunday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-gray-300 mb-4">
                  <img src={(d22?.src || d22) as string} alt="Location" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm font-inter">Pragati Maidan,</p>
                    <p className="font-bold text-[#1a1a1a] text-sm font-inter">New Delhi</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img src={(d33?.src || d33) as string} alt="Website" className="w-10 h-10 object-contain shrink-0" />
                  <div>
                    <a href="https://www.ihwe.in" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline text-sm font-inter transition-colors">www.ihwe.in</a>
                  </div>
                </div>
              </div>
              {/* Bottom Right Lottie Animation */}
              <div className="absolute bottom-2 right-2 w-20 h-20 md:w-24 md:h-24 pointer-events-none opacity-90 mix-blend-multiply">
                <DotLottieReact
                  src="https://lottie.host/0377a8f0-5e77-4c4f-a32c-87cd5b02665e/hWCGCNJukt.lottie"
                  autoplay
                />
              </div>
            </div>

            {/* WHY ATTEND IHWE 2026? */}
            <div ref={whyAttendCardRef} style={{ opacity: 0, boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em" }} className="bg-[#f7f8f2] rounded-xl border border-gray-100 p-5">
              <h3 className="text-[#092912] font-extrabold text-sm tracking-wider mb-5 font-inter">WHY ATTEND IHWE 2026?</h3>
              <div className="flex flex-col gap-5">
                {[
                  { icon: <img src={(zz1?.src || zz1) as string} alt="Connect" className="w-8 h-8 object-contain shrink-0 pt-0.5" />, title: "Connect", desc: <>Network with global leaders,<br />experts & professionals</> },
                  { icon: <img src={(zz2?.src || zz2) as string} alt="Discover" className="w-8 h-8 object-contain shrink-0 pt-0.5" />, title: "Discover", desc: <>Explore the latest products,<br />technologies & innovations</> },
                  { icon: <img src={(zz3?.src || zz3) as string} alt="Learn" className="w-8 h-8 object-contain shrink-0 pt-0.5" />, title: "Learn", desc: <>Gain insights from world-class<br />conferences & workshops</> },
                  { icon: <img src={(zz4?.src || zz4) as string} alt="Grow" className="w-8 h-8 object-contain shrink-0 pt-0.5" />, title: "Grow", desc: <>Expand your knowledge,<br />business & opportunities</> },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    ref={(el) => { if (el) whyAttendItemsRef.current[idx] = el as any; }}
                    style={{ opacity: 0 }}
                    className="flex gap-4 items-start"
                  >
                    {item.icon}
                    <div>
                      <p className="text-[#092912] font-bold text-sm mb-0.5 font-inter">{item.title}</p>
                      <p className="text-black text-xs leading-snug font-inter">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NEED HELP? */}
            <div ref={needHelpCardRef} style={{ opacity: 0 }} className="bg-[#1e3b1c] rounded-xl text-white p-6 shadow-md relative overflow-hidden">
              <div className="flex gap-4 items-start relative z-10 mb-4">
                <div className="shrink-0 pt-1">
                  <Headphones size={28} className="text-[#d8a956]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base mb-1 tracking-wide font-inter">NEED HELP?</h3>
                  <p className="text-white/80 text-xs leading-relaxed max-w-[200px]">
                    Our team is here to assist you with your registration.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 relative z-10 mt-5">
                <a href="mailto:delegate@ihwe.in" className="flex items-center gap-3 hover:text-[#d8a956] transition-colors">
                  <Mail size={16} />
                  <span className="text-sm font-medium">info@arogyasangosthi.com</span>
                </a>
                <a href="tel:+918448395698" className="flex items-center gap-3 hover:text-[#d8a956] transition-colors">
                  <Phone size={16} />
                  <span className="text-sm font-medium">+91 9876543210</span>
                </a>
              </div>

              {/* Background pattern */}
              <div ref={needHelpBgIconRef} className="absolute -bottom-6 -right-6 opacity-10">
                <Headphones size={120} />
              </div>
            </div>

          </div>

          {/* ================= RIGHT PANEL (FORM) ================= */}
          <div
            ref={formPanelRef}
            style={{ opacity: 0, boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
            className={`w-full lg:w-[72%] rounded-2xl p-5 md:p-6 relative overflow-hidden transition-colors duration-700 bg-white border border-gray-100 flex flex-col ${isSuccess ? 'min-h-[500px]' : ''}`}
          >
            {/* Shimmer sweep overlay — plays once, right after the panel finishes wiping in */}
            <div
              ref={formPanelShimmerRef}
              style={{
                opacity: 0,
                background: "linear-gradient(100deg, transparent, rgba(54,104,46,0.12), transparent)",
              }}
              className="absolute inset-y-0 left-0 w-1/3 pointer-events-none z-30"
            />

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, rotateX: -90, y: -30, scale: 0.95, filter: 'blur(8px)' }}
                animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, rotateX: -90, y: -30, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                className="border-2 border-[#36682e] p-12 bg-[#f0f9f0] shadow-lg flex flex-col items-center justify-center min-h-[500px] h-full rounded-xl w-full"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
                  className="w-full max-w-[320px] h-[180px] mb-2 flex items-center justify-center"
                >
                  <DotLottieReact
                    src="https://lottie.host/ab646915-b3e2-48fa-8af7-245fd427baf7/DbbMej8R1U.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-3xl font-bold text-gray-900 mb-4 text-center"
                >
                  Payment &amp; Registration Successful!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="text-gray-600 text-center mb-8 max-w-md text-lg"
                >
                  Thank you for registering! Our team will review your details and contact you shortly.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="flex items-center gap-2 text-sm text-[#36682e]"
                >
                  <div className="w-2 h-2 bg-[#36682e] rounded-full animate-pulse"></div>
                  Form will reset automatically...
                </motion.div>
              </motion.div>
            )}


            {!registrationType && !isSuccess && (
              <RegistrationSelectionCards setRegistrationType={setRegistrationType} />
            )}

            {registrationType && !isSuccess && (
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, scale: 0.9, y: 60, rotateX: 15, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                className="block"
              >
                {/* Top Right Leaf Decoration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: 45, x: 30, y: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }}
                  transition={{ delay: 0.4, duration: 1.2, type: "spring", bounce: 0.6 }}
                  className="absolute top-0 right-0 w-28 md:w-48 z-0 pointer-events-none"
                >
                  <div className="translate-x-6 -translate-y-4">
                    <img src={(leafRight?.src || leafRight) as string} alt="Decoration" className="w-full h-auto object-contain" />
                  </div>
                </motion.div>

                <div className="relative z-10">
                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5 border-b border-gray-100 pb-4">
                    <div>

                      <h2 className="text-[#204e1f] text-xl md:text-2xl font-extrabold tracking-wide font-inter uppercase">
                        {registrationType === 'group' ? 'GROUP REGISTRATION' : 'DELEGATE REGISTRATION'}
                      </h2>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-16 h-px bg-[#36682e]/50" />
                        <div className="w-2 h-2 rounded-full bg-[#36682e]" />
                        <div className="w-16 h-px bg-[#36682e]/50" />
                      </div>
                      <p className="text-gray-900 text-sm font-inter">Please fill in the details below to register {registrationType === 'group' ? 'your group' : 'as a delegate'}.</p>
                    </div>
                    {registrationType ? (
                      <button
                        type="button"
                        onClick={() => setRegistrationType(null)}
                        className="bg-[#f0f7ff] border border-[#d6e8ff] text-[#0052cc] hover:bg-[#e0f0ff] px-4 py-2 rounded-lg flex items-center gap-2 shrink-0 self-start transition-colors"
                      >
                        <span className="text-lg font-bold leading-none">&larr;</span>
                        <span className="text-xs font-bold font-inter tracking-wide uppercase">Back to Registration</span>
                      </button>
                    ) : (
                      <div className="bg-[#f6faf6] border border-[#d6ebd5] text-[#36682e] px-4 py-2 rounded-lg flex items-center gap-3 shrink-0 self-start">
                        <ShieldCheck size={20} className="shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold">SECURE REGISTRATION</span>
                          <span className="text-[10px]">Your information is safe with us.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.form
                    onSubmit={handleFinalSubmit}
                    variants={formContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-4 [perspective:1000px]"
                  >
                    {/* Row 0 - Plan Selection + Day Selector (single row) */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="bg-[#f6faf6] p-4 rounded-xl border border-[#d6ebd5]">
                      <div className="flex flex-col md:flex-row md:items-end gap-3">

                        {/* Pass name */}
                        <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 md:w-[38%]">
                          <div className="flex items-center gap-2">
                            <label className="text-xs font-bold text-[#1a1a1a]">Selected Pass <span className="text-red-500">*</span></label>
                            {isOneDayPass && selectedDays.length > 0 && (
                              <span className="text-[10px] text-red-600 font-semibold leading-tight">
                                ({selectedDays.length} day{selectedDays.length > 1 ? 's' : ''} → ₹{(basePriceNum * selectedDays.length).toLocaleString('en-IN')}
                                {registrationType === 'group' && ` × ${1 + groupMembers.length} = ₹${(basePriceNum * selectedDays.length * (1 + groupMembers.length)).toLocaleString('en-IN')}`})
                              </span>
                            )}
                          </div>
                          <select
                            name="planName"
                            value={formData.planName}
                            onChange={(e) => {
                              const selected = passOptions.find(p => p.name === e.target.value);
                              setFormData({ ...formData, planName: e.target.value, price: selected ? selected.price : "" });
                              setSelectedDays([]);
                              setAppliedCoupon(null);
                              setCouponCode("");
                            }}
                            required
                            disabled
                            className="border border-[#36682e] rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#36682e] transition-all bg-gray-50 font-bold text-[#36682e] appearance-none cursor-not-allowed opacity-90"
                          >
                            <option value="">Select a Pass</option>
                            {passOptions.map(p => (
                              <option key={p.name} value={p.name} className="text-black font-medium">{p.name}</option>
                            ))}
                          </select>
                        </motion.div>

                        {/* Amount */}
                        <motion.div variants={formFieldVariants} className="flex flex-col gap-1 md:w-[16%] shrink-0">
                          <label className="text-xs font-bold text-[#1a1a1a]">Amount</label>
                          <div className="flex flex-col justify-center pb-0.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {appliedCoupon && (
                                <span className="text-red-500 line-through text-xs font-medium">{subTotalStr}</span>
                              )}
                              <span className={`font-semibold text-lg leading-tight ${appliedCoupon ? 'text-green-600' : 'text-[#36682e]'}`}>
                                {totalAmountStr}
                              </span>
                            </div>
                            {appliedCoupon && (
                              <span className="text-[9px] text-green-600 font-bold leading-tight">🎉 {appliedCoupon.discountPercent}% off</span>
                            )}
                          </div>
                        </motion.div>

                        {/* Day Selector — compact inline buttons */}
                        <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 flex-1">
                          <label className="text-xs font-bold text-[#1a1a1a]">
                            Select Day(s) <span className="text-red-500">*</span>
                            <span className="ml-1.5 text-[9px] font-semibold" style={{ color: '#4B1426' }}>
                              21–23 Aug {isOneDayPass ? `· ₹${basePriceNum.toLocaleString('en-IN')}/day` : ''}
                            </span>
                          </label>
                          <div className="flex gap-1.5">
                            {DAY_OPTIONS.map(({ day, label, date, bg }) => {
                              const isSelected = selectedDays.includes(day);
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => toggleDay(day)}
                                  className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded border-2 text-[11px] font-bold transition-all ${
                                    isSelected
                                      ? 'text-white border-transparent shadow-sm'
                                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                                  }`}
                                  style={isSelected ? { backgroundColor: bg, borderColor: bg } : {}}
                                >
                                  <span>{label}</span>
                                  <span className={`text-[9px] font-normal leading-tight ${isSelected ? 'text-white/75' : 'text-gray-400'}`}>{date}</span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>

                      </div>
                    </motion.div>





                    {/* Row 1 */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 md:col-span-1">
                        <label className="text-xs font-bold text-[#1a1a1a]">Title <span className="text-red-500">*</span></label>
                        <select name="title" value={formData.title} onChange={handleChange} required className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700">
                          <option value="">Select</option>
                          <option>Mr.</option>
                          <option>Ms.</option>
                          <option>Dr.</option>
                          <option>Prof.</option>
                        </select>
                      </motion.div>
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 md:col-span-3">
                        <label className="text-xs font-bold text-[#1a1a1a]">Full Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <UserPlus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input name="fullName" value={formData.fullName} onChange={handleChange} required type="text" placeholder="Enter your full name" className="border border-gray-200 rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full" />
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Row 2 */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 relative">
                        <AnimatePresence>
                          {otpAlert.show && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full shadow-lg shadow-black/10 flex items-center gap-2 z-50 text-[11px] font-bold ${
                                otpAlert.type === 'sent' ? 'bg-[#eab308] text-white' : 
                                otpAlert.type === 'coupon' ? 'bg-[#e6f4ea] text-[#1e8e3e]' : 
                                'bg-[#3e8914] text-white'
                              } whitespace-nowrap`}
                            >
                              <div className={otpAlert.type === 'coupon' ? '' : 'bg-white rounded-full p-0.5'}>
                                {otpAlert.type === 'coupon' ? (
                                  <Sparkles className="w-3.5 h-3.5 text-[#1e8e3e]" />
                                ) : (
                                  <Check className={`w-3 h-3 ${otpAlert.type === 'sent' ? 'text-[#eab308]' : 'text-[#3e8914]'}`} strokeWidth={3} />
                                )}
                              </div>
                              {otpAlert.message}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <label className="text-xs font-bold text-[#1a1a1a]">Email Address <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <MailIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Enter your email address" className="border border-gray-200 rounded-sm pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full" />
                          </div>
                          {!emailOtpSent ? (
                            <button type="button" onClick={(e) => handleInitiate(e, 'email')} disabled={isLoading} className="bg-[#36682e] hover:bg-[#2a5223] text-white text-xs font-bold px-4 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Send OTP</button>
                          ) : emailOtpVerified ? (
                            <button type="button" disabled className="bg-green-600 text-white text-xs font-bold px-4 rounded-sm flex items-center gap-1 transition-all"><CheckCircle2 size={14} /> Verified</button>
                          ) : null}
                        </div>
                        {emailOtpSent && !emailOtpVerified && (
                          <div className="mt-2 flex gap-2 animate-[float_0.3s_ease-out]">
                            <input type="text" maxLength={6} value={emailOtp} onChange={(e) => setEmailOtp(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Enter 6-digit OTP" className="border border-gray-300 text-center tracking-[0.5em] rounded-sm px-3 py-2 focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all flex-1 text-sm font-bold placeholder:tracking-normal placeholder:font-normal" />
                            <button type="button" onClick={(e) => handleInitiate(e, 'email')} disabled={isLoading || emailTimer > 0} className="text-[#36682e] hover:text-[#2a5223] text-xs font-bold px-2 underline transition-colors disabled:opacity-50 disabled:no-underline whitespace-nowrap">
                              {emailTimer > 0 ? `Resend in ${emailTimer}s` : 'Resend'}
                            </button>
                            <button type="button" onClick={(e) => handleInlineVerify(e, 'email')} disabled={isLoading || emailOtp.length !== 6} className="bg-[#36682e] hover:bg-[#2a5223] text-white text-xs font-bold px-4 rounded-sm transition-colors disabled:opacity-50 whitespace-nowrap">{isLoading ? 'Verifying...' : 'Verify'}</button>
                          </div>
                        )}
                      </motion.div>

                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1a1a1a]">WhatsApp Number <span className="text-red-500">*</span></label>
                        <div className="flex">
                          <select className="border border-gray-200 border-r-0 rounded-l-sm px-2 py-2 text-sm bg-white focus:outline-none w-[90px] shrink-0 text-gray-700">
                            <option>🇮🇳 +91</option>
                          </select>
                          <input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} required type="tel" placeholder="Enter WhatsApp number" className="border border-gray-200 border-r-0 px-3 py-2 text-sm flex-1 focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full" />
                          {!whatsappOtpSent ? (
                            <button type="button" onClick={(e) => handleInitiate(e, 'whatsapp')} disabled={isLoading} className="bg-[#36682e] hover:bg-[#2a5223] text-white text-xs font-bold px-4 rounded-r-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">Send OTP</button>
                          ) : whatsappOtpVerified ? (
                            <button type="button" disabled className="bg-green-600 text-white text-xs font-bold px-4 rounded-r-sm flex items-center gap-1 transition-all whitespace-nowrap"><CheckCircle2 size={14} /> Verified</button>
                          ) : null}
                        </div>
                        {whatsappOtpSent && !whatsappOtpVerified && (
                          <div className="mt-2 flex gap-2 animate-[float_0.3s_ease-out]">
                            <input type="text" maxLength={6} value={whatsappOtp} onChange={(e) => setWhatsappOtp(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Enter OTP" className="border border-gray-300 text-center tracking-[0.5em] rounded-sm px-3 py-2 focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all flex-1 text-sm font-bold placeholder:tracking-normal placeholder:font-normal" />
                            <button type="button" onClick={(e) => handleInitiate(e, 'whatsapp')} disabled={isLoading || whatsappTimer > 0} className="text-[#36682e] hover:text-[#2a5223] text-xs font-bold px-2 underline transition-colors disabled:opacity-50 disabled:no-underline whitespace-nowrap">
                              {whatsappTimer > 0 ? `Resend in ${whatsappTimer}s` : 'Resend'}
                            </button>
                            <button type="button" onClick={(e) => handleInlineVerify(e, 'whatsapp')} disabled={isLoading || whatsappOtp.length !== 6} className="bg-[#36682e] hover:bg-[#2a5223] text-white text-xs font-bold px-4 rounded-sm transition-colors disabled:opacity-50 whitespace-nowrap">{isLoading ? 'Verifying...' : 'Verify'}</button>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Row 3 */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="flex flex-col md:flex-row gap-4">
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 md:w-1/2">
                        <label className="text-xs font-bold text-[#1a1a1a]">Position <span className="text-red-500">*</span></label>
                        <input name="designation" value={formData.designation} onChange={handleChange} required type="text" placeholder="Enter your position" className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full" />
                      </motion.div>
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 md:w-1/2">
                        <label className="text-xs font-bold text-[#1a1a1a]">Organization / Company <span className="text-red-500">*</span></label>
                        <input name="organization" value={formData.organization} onChange={handleChange} required type="text" placeholder="Enter organization / company" className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full" />
                      </motion.div>
                    </motion.div>

                    {/* Group Members Block */}
                    {registrationType === 'group' && (
                      <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="flex flex-col gap-4 mt-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-[#113111] uppercase border-b border-[#36682e]/20 pb-1 w-full flex justify-between items-center">
                            Group Members
                            <span className="text-xs bg-[#e8f3e8] text-[#36682e] px-2 py-0.5 rounded-full">{groupMembers.length} Added</span>
                          </h3>
                        </div>

                        {groupMembers.map((member, index) => (
                          <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col gap-3 relative">
                            <button
                              type="button"
                              onClick={() => setGroupMembers(prev => prev.filter((_, i) => i !== index))}
                              className="absolute -top-2 -right-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                              title="Remove Member"
                            >
                              &times;
                            </button>
                            <div className="text-xs font-bold text-gray-500 mb-[-8px]">Delegate {index + 2}</div>

                            <div className="flex flex-col md:flex-row gap-3">
                              <div className="flex flex-col gap-1 md:w-1/4">
                                <label className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">Title <span className="text-red-500">*</span></label>
                                <select
                                  value={member.title}
                                  onChange={(e) => {
                                    const newMembers = [...groupMembers];
                                    newMembers[index].title = e.target.value;
                                    setGroupMembers(newMembers);
                                  }}
                                  required
                                  className="border border-gray-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700"
                                >
                                  <option value="">Select</option>
                                  <option>Mr.</option>
                                  <option>Ms.</option>
                                  <option>Dr.</option>
                                  <option>Prof.</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1 md:w-3/4">
                                <label className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                                <input
                                  value={member.fullName}
                                  onChange={(e) => {
                                    const newMembers = [...groupMembers];
                                    newMembers[index].fullName = e.target.value;
                                    setGroupMembers(newMembers);
                                  }}
                                  required
                                  type="text"
                                  placeholder="Enter full name"
                                  className="border border-gray-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-3">
                              <div className="flex flex-col gap-1 md:w-1/3">
                                <label className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">Email <span className="text-red-500">*</span></label>
                                <input
                                  value={member.email}
                                  onChange={(e) => {
                                    const newMembers = [...groupMembers];
                                    newMembers[index].email = e.target.value;
                                    setGroupMembers(newMembers);
                                  }}
                                  required
                                  type="email"
                                  placeholder="Email address"
                                  className="border border-gray-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 md:w-1/3">
                                <label className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">WhatsApp Number <span className="text-red-500">*</span></label>
                                <input
                                  value={member.whatsappNumber}
                                  onChange={(e) => {
                                    const newMembers = [...groupMembers];
                                    newMembers[index].whatsappNumber = e.target.value.replace(/[^0-9]/g, '');
                                    setGroupMembers(newMembers);
                                  }}
                                  required
                                  type="tel"
                                  placeholder="WhatsApp number"
                                  className="border border-gray-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 md:w-1/3">
                                <label className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">Position <span className="text-red-500">*</span></label>
                                <input
                                  value={member.designation}
                                  onChange={(e) => {
                                    const newMembers = [...groupMembers];
                                    newMembers[index].designation = e.target.value;
                                    setGroupMembers(newMembers);
                                  }}
                                  required
                                  type="text"
                                  placeholder="Position"
                                  className="border border-gray-200 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all w-full"
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => setGroupMembers([...groupMembers, { title: "", fullName: "", email: "", whatsappNumber: "", designation: "" }])}
                          className="mt-1 bg-white border border-[#36682e] text-[#36682e] hover:bg-[#f6faf6] px-4 py-2 rounded-sm font-bold text-xs transition-colors self-start flex items-center gap-2"
                        >
                          <UserPlus size={14} /> Add Another Delegate
                        </button>
                      </motion.div>
                    )}


                    {/* Row 4 */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1a1a1a]">Country <span className="text-red-500">*</span></label>
                        <select name="country"
                          value={selectedCountryCode}
                          onChange={(e) => {
                            const code = e.target.value;
                            setSelectedCountryCode(code);
                            const countryObj = countriesList.find(c => c.countryCode.toString() === code);
                            setFormData(prev => ({ ...prev, country: countryObj ? countryObj.name : "", state: "", city: "" }));
                            setSelectedStateCode("");
                          }}
                          required className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700">
                          <option value="">Select country</option>
                          {countriesList.map(c => (
                            <option key={c._id} value={c.countryCode}>{c.name}</option>
                          ))}
                        </select>
                      </motion.div>
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1a1a1a]">State <span className="text-red-500">*</span></label>
                        <select name="state"
                          value={selectedStateCode}
                          onChange={(e) => {
                            const code = e.target.value;
                            setSelectedStateCode(code);
                            const stateObj = statesList.find(s => s.stateCode.toString() === code);
                            setFormData(prev => ({ ...prev, state: stateObj ? stateObj.name : "", city: "" }));
                          }}
                          required className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700"
                          disabled={!selectedCountryCode}>
                          <option value="">Select state</option>
                          {statesList.map(s => (
                            <option key={s._id} value={s.stateCode}>{s.name}</option>
                          ))}
                        </select>
                      </motion.div>
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1a1a1a]">City <span className="text-red-500">*</span></label>
                        <select name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700"
                          disabled={!selectedStateCode}>
                          <option value="">Select city</option>
                          {citiesList.map(c => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </motion.div>
                    </motion.div>

                    {/* Row 5 */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="flex flex-col md:flex-row gap-4">
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 md:w-1/2">
                        <label className="text-xs font-bold text-[#1a1a1a]">Industry Type <span className="text-red-500">*</span></label>
                        <select name="industryType" value={formData.industryType} onChange={handleChange} required className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700">
                          <option value="">Select industry</option>
                          {industries.map(ind => (
                            <option key={ind._id} value={ind.name}>{ind.name}</option>
                          ))}
                        </select>
                      </motion.div>
                      <motion.div variants={formFieldVariants} className="flex flex-col gap-1.5 md:w-1/2">
                        <label className="text-xs font-bold text-[#1a1a1a]">Areas of Interest <span className="text-red-500">*</span></label>
                        <select name="areasOfInterest" value={formData.areasOfInterest} onChange={handleChange} required className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700">
                          <option value="">Select your area of interest</option>
                          {interests.map(int => (
                            <option key={int._id} value={int.name}>{int.name}</option>
                          ))}
                        </select>
                      </motion.div>
                    </motion.div>

                    {/* Row 6 */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#1a1a1a]">How did you hear about Arogya Sangosthi 2026? <span className="text-red-500">*</span></label>
                      <select name="source" value={formData.source} onChange={handleChange} required className="border border-gray-200 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#36682e] focus:ring-1 focus:ring-[#36682e] transition-all bg-white text-gray-700 w-full">
                        <option value="">Select an option</option>
                        <option>Social Media</option>
                        <option>Email</option>
                        <option>Friend / Colleague</option>
                        <option>Website</option>
                      </select>
                    </motion.div>

                    {/* Coupon Code Row — checkbox toggle first */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="flex flex-col gap-2">


                      {/* Coupon Code Row — Redesigned */}
                      <div className="relative border border-dashed border-green-300 bg-[#f4fcf6] rounded-xl p-4 transition-all w-full">
                        <AnimatePresence>
                          {couponAlert.show && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full shadow-lg shadow-black/10 flex items-center gap-2 z-50 text-[11px] font-bold bg-[#e6f4ea] text-[#1e8e3e] whitespace-nowrap"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#1e8e3e]" />
                              {couponAlert.message}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {/* Header with Tag and Toggle */}
                        <div 
                          className="flex items-center justify-between cursor-pointer select-none" 
                          onClick={() => {
                            if (!appliedCoupon) {
                              setShowCouponInput((v) => !v);
                              if(showCouponInput) { setCouponCode(""); setCouponError(""); }
                            }
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <Tag className="w-5 h-5 text-[#55a243]" style={{ transform: 'rotate(90deg)' }} fill="currentColor" />
                            <span className="text-sm font-bold text-gray-900">I have a coupon code</span>
                          </div>
                          {/* Toggle Switch */}
                          <div className={`w-11 h-6 rounded-full relative transition-colors ${showCouponInput || appliedCoupon ? 'bg-[#55a243]' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-sm ${showCouponInput || appliedCoupon ? 'left-[22px]' : 'left-0.5'}`} />
                          </div>
                        </div>

                        {/* Expandable Input Area */}
                        <AnimatePresence>
                          {(showCouponInput || appliedCoupon) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 overflow-hidden"
                            >
                              <div className="flex gap-3">
                                <input
                                  type="text"
                                  value={couponCode}
                                  onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                                  placeholder="AROGYA10"
                                  autoFocus
                                  disabled={!!appliedCoupon}
                                  className={`flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus:border-[#55a243] focus:ring-1 focus:ring-[#55a243] transition-all ${appliedCoupon ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800'}`}
                                />
                                <button
                                  type="button"
                                  onClick={handleApplyCoupon}
                                  disabled={isCouponLoading || !couponCode.trim() || !!appliedCoupon}
                                  className={`text-white text-xs font-bold px-8 rounded-md shadow-sm transition-all whitespace-nowrap ${
                                    appliedCoupon ? 'bg-[#55a243] opacity-80 cursor-not-allowed' : 'bg-[#55a243] hover:bg-green-600'
                                  }`}
                                >
                                  {isCouponLoading ? 'APPLYING...' : 'APPLY'}
                                </button>
                              </div>
                              
                              {/* Success or Error messages */}
                              {appliedCoupon && (
                                <div className="flex items-center gap-2 mt-3 text-[#22c55e] text-[13px] font-semibold">
                                  <CheckCircle2 size={18} fill="#22c55e" stroke="white" /> 
                                  Great! {appliedCoupon.discountPercent}% discount applied successfully.
                                </div>
                              )}
                              {couponError && (
                                <div className="flex items-center gap-2 mt-3 text-red-600 text-[13px] font-semibold">
                                  ⚠ {couponError}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Payment Summary — Always visible */}
                      <div className="flex gap-4 px-4 py-3.5 bg-[#f4fcf6] border border-green-200 rounded-xl mt-4 group">
                        {/* Left Icon */}
                        <div className="w-12 h-12 rounded-full bg-[#e3f3e7] flex items-center justify-center shrink-0">
                          <BadgePercent className="w-6 h-6 text-[#143111]" />
                        </div>

                        {/* Right Content */}
                        <div className="flex-1 flex flex-col">
                          <div className="text-[13px] font-bold text-[#143111] tracking-wide mb-2 flex items-center justify-between">
                            PAYMENT SUMMARY
                            {appliedCoupon && (
                              <button
                                type="button"
                                onClick={() => { handleRemoveCoupon(); setShowCouponInput(false); }}
                                className="text-red-500 hover:text-red-700 text-[11px] font-bold transition-colors whitespace-nowrap"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[13px] font-semibold text-gray-800">
                              <span>Subtotal <span className="text-blue-600">{isOneDayPass ? `(${daysMultiplier} Day${daysMultiplier > 1 ? 's' : ''} Pass)` : "(3 Days Pass)"}</span></span>
                              <span>₹{subTotal.toLocaleString('en-IN')}</span>
                            </div>
                            {appliedCoupon && (
                              <div className="flex justify-between text-[13px] font-semibold text-[#f04438]">
                                <span>Discount ({appliedCoupon.code} - {appliedCoupon.discountPercent}%)</span>
                                <span>- ₹{(subTotal - finalTotal).toLocaleString('en-IN')}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-2.5 pt-2.5 border-t border-dashed border-green-200 flex justify-between text-[15px] font-bold text-[#143111]">
                            <span>Total Amount</span>
                            <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                    </motion.div>

                    {/* Terms Checkbox */}
                    <motion.label variants={formRowVariants} style={{ transformOrigin: "top center" }} className="flex items-start gap-3 mt-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-[#36682e] bg-gray-100 border-gray-300 rounded focus:ring-[#36682e]"
                      />
                      <span className="text-xs text-gray-900 leading-snug">
                        I agree to the <Link href="/terms" className="text-[#36682e] font-bold underline hover:text-[#2a5223]">Terms & Conditions</Link> and <Link href="/privacy" className="text-[#36682e] font-bold underline hover:text-[#2a5223]">Privacy Policy</Link>. <span className="text-red-500">*</span>
                      </span>
                    </motion.label>

                    {/* Submit Button */}
                    <motion.div variants={formRowVariants} style={{ transformOrigin: "top center" }} className="pt-2">
                      <div style={{ position: 'relative', display: 'inline-block', zIndex: 10 }} className="w-full">
                        <Sparkle color="#063a10" style={{ top: '-10px', left: '15%', animationDelay: '0s' }} />
                        <Sparkle color="#063a10" style={{ bottom: '-10px', right: '15%', animationDelay: '0.7s' }} />
                        <Sparkle color="#063a10" style={{ top: '10px', right: '-12px', animationDelay: '0.3s' }} />
                        <Sparkle color="#063a10" style={{ bottom: '10px', left: '-12px', animationDelay: '1s' }} />
                        <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#2a5223] to-[#36682e] hover:from-[#1e3b1c] hover:to-[#2a5223] text-white font-extrabold py-3.5 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 tracking-[0.1em] text-sm overflow-hidden group relative">
                          <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shineSweep_1.5s_ease-in-out]"></span>
                          <span className="relative z-10">{isLoading ? 'PROCESSING...' : 'REGISTER NOW'}</span>
                          {!isLoading && <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                        </button>
                      </div>
                    </motion.div>

                    <div className="flex items-center justify-center gap-2 text-gray-500 mt-2">
                      <Lock size={12} />
                      <span className="text-[10px] font-medium">Your information is secure with us.</span>
                    </div>
                  </motion.form>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default RegisterNowContent;

