"use client";
import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Phone, Briefcase, Building2, Users, UploadCloud, ArrowRight, Loader2, CheckCircle, UserPlus, ShieldCheck, Trash2, Tag, BadgePercent, Sparkles, FileText, X, Check, Calendar, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import bleafImg from "../../assets/icons/bleaf.png";
import leafgImg from "../../assets/icons/leafg.png";
import leafRightImg from "../../assets/icons/leafright.png";
import { useLocations } from "@/hooks/useLocations";
import { useCategories } from "@/hooks/useCategories";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

export const DAY_OPTIONS = [
  { day: 1, label: "Day 1", date: "21 Aug (Fri)", bg: "#143111" },
  { day: 2, label: "Day 2", date: "22 Aug (Sat)", bg: "#0B2C66" },
  { day: 3, label: "Day 3", date: "23 Aug (Sun)", bg: "#6A3DF0" },
];

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const PASS_OPTIONS: Record<string, { name: string; price: number }> = {
  delegate: { name: "Delegate Pass", price: 1500 },
  delegate3days: { name: "Delegate Pass", price: 3000 },
  paper: { name: "Paper Presentation", price: 2500 },
  poster: { name: "Poster Presentation", price: 2500 },
};

interface GroupMember {
  title: string;
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
}

interface GroupDelegateFormProps {
  onGroupMembersChange?: (count: number) => void;
  isSuccess?: boolean;
  setIsSuccess?: (val: boolean) => void;
  selectedPass?: string | null;
  setSelectedPass?: (val: string) => void;
  selectedDays?: number[];
  setSelectedDays?: React.Dispatch<React.SetStateAction<number[]>>;
}

const GroupDelegateForm: React.FC<GroupDelegateFormProps> = ({ 
  onGroupMembersChange,
  isSuccess: externalIsSuccess,
  setIsSuccess: externalSetIsSuccess,
  selectedPass = null,
  setSelectedPass,
  selectedDays: externalSelectedDays,
  setSelectedDays: externalSetSelectedDays
}) => {
  const router = useRouter();
  const { categories, loading: loadingCategories } = useCategories('group');
  const [formData, setFormData] = useState({
    title: "", 
    fullName: "", 
    email: "", 
    mobile: "",
    designation: "", 
    organization: "", 
    country: "India",
    state: "", 
    city: "", 
    category: "", 
    isSpeaker: "",
    specialization: "",
    dietary: "",
    assistance: "",
    agreeTerms: false
  });

  const [registeredDelegates, setRegisteredDelegates] = useState<any[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Selected Days State (Controlled or Uncontrolled)
  const [internalSelectedDays, setInternalSelectedDays] = useState<number[]>([]);
  const selectedDays = externalSelectedDays !== undefined ? externalSelectedDays : internalSelectedDays;
  const setSelectedDays = externalSetSelectedDays || setInternalSelectedDays;

  const toggleDay = (dayNum: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
    setSubmitError("");
  };

  // Sync selectedPass with selectedDays
  useEffect(() => {
    if (selectedPass && selectedDays.length === 0) {
      setSelectedDays([1]);
    }
  }, [selectedPass]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [localIsSuccess, setLocalIsSuccess] = useState(false);
  const isSuccess = externalIsSuccess !== undefined ? externalIsSuccess : localIsSuccess;
  const setIsSuccess = externalSetIsSuccess || setLocalIsSuccess;

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        const el = document.getElementById("success-card") || document.getElementById("registration-form-container");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 500, behavior: "smooth" });
        }
      }, 100);
    }
  }, [isSuccess]);

  const [dynamicPassMap, setDynamicPassMap] = useState<Record<string, { id?: string; name: string; price: number }>>(PASS_OPTIONS);

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const res = await fetch(`${API_URL}/delegate-passes`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const newMap: Record<string, any> = { ...PASS_OPTIONS };
          data.data.forEach((p: any, idx: number) => {
            const passId = p._id || p.name;
            const passObj = {
              id: passId,
              name: p.name,
              price: Number(p.price)
            };
            newMap[passId] = passObj;
            if (idx === 0) newMap["delegate"] = passObj;
            if (idx === 1) newMap["delegate3days"] = passObj;
            if (idx === 2) newMap["paper"] = passObj;
            if (idx === 3) newMap["poster"] = passObj;
          });
          setDynamicPassMap(newMap);
        }
      } catch (err) {
        console.error("Error fetching pass options for group:", err);
      }
    };
    fetchPasses();
  }, []);

  // Alert State for OTP & Coupons
  const [otpAlert, setOtpAlert] = useState<{ show: boolean; message: string; type: "sent" | "verified" | "coupon" }>({
    show: false,
    message: "",
    type: "sent"
  });

  const showOtpAlert = (message: string, type: "sent" | "verified" | "coupon" = "sent") => {
    setOtpAlert({ show: true, message, type });
    setTimeout(() => {
      setOtpAlert(prev => ({ ...prev, show: false }));
    }, 3500);
  };

  // File Upload State & Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit.");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Group Members state
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);

  // OTP State Management
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailOtpInput, setEmailOtpInput] = useState("");
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);

  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [mobileOtpInput, setMobileOtpInput] = useState("");
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [mobileTimer, setMobileTimer] = useState(0);

  // Coupon State Management
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  // Timers countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emailTimer > 0) {
      timer = setInterval(() => setEmailTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [emailTimer]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mobileTimer > 0) {
      timer = setInterval(() => setMobileTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [mobileTimer]);

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      toast.warning("Please enter your email address first!");
      return;
    }
    if (!formData.fullName) {
      toast.warning("Please enter your full name first!");
      return;
    }
    setEmailOtpLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, fullName: formData.fullName, channel: "email" })
      });
      const data = await res.json();
      if (data.success) {
        setEmailOtpSent(true);
        setEmailTimer(30);
        showOtpAlert(data.message || "OTP sent successfully to Email.", "sent");
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP.");
    } finally {
      setEmailOtpLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtpInput) {
      toast.warning("Please enter the OTP!");
      return;
    }
    setEmailOtpLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, channel: "email", otp: emailOtpInput })
      });
      const data = await res.json();
      if (data.success) {
        setEmailOtpVerified(true);
        showOtpAlert("Email OTP Verified!", "verified");
      } else {
        toast.error(data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP.");
    } finally {
      setEmailOtpLoading(false);
    }
  };

  const handleSendMobileOtp = async () => {
    if (!formData.mobile) {
      toast.warning("Please enter your mobile number first!");
      return;
    }
    if (!formData.fullName) {
      toast.warning("Please enter your full name first!");
      return;
    }
    setMobileOtpLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email || "temp@arogya.in",
          fullName: formData.fullName,
          whatsappNumber: formData.mobile,
          channel: "whatsapp"
        })
      });
      const data = await res.json();
      if (data.success) {
        setMobileOtpSent(true);
        setMobileTimer(30);
        showOtpAlert(data.message || "OTP sent successfully to Mobile.", "sent");
      } else {
        toast.error(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending OTP.");
    } finally {
      setMobileOtpLoading(false);
    }
  };

  const handleVerifyMobileOtp = async () => {
    if (!mobileOtpInput) {
      toast.warning("Please enter the OTP!");
      return;
    }
    setMobileOtpLoading(true);
    try {
      const res = await fetch(`${API_URL}/delegates-registration/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber: formData.mobile, channel: "whatsapp", otp: mobileOtpInput })
      });
      const data = await res.json();
      if (data.success) {
        setMobileOtpVerified(true);
        showOtpAlert("Mobile OTP Verified!", "verified");
      } else {
        toast.error(data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP.");
    } finally {
      setMobileOtpLoading(false);
    }
  };

  // Coupon Application Handler
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);
    try {
      const res = await fetch(`${API_URL}/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim().toUpperCase(), registrationType: "group" })
      });
      const data = await res.json();
      if (data.success) {
        setAppliedCoupon(data.data);
        showOtpAlert(`Great! ${data.data.discountPercent}% discount applied successfully.`, "coupon");
      } else {
        setCouponError(data.message || "Invalid coupon code.");
      }
    } catch (err) {
      console.error(err);
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

  const {
    countries,
    states,
    cities,
    loadingCountries,
    loadingStates,
    loadingCities
  } = useLocations(formData.country, formData.state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "country") {
      setFormData((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: ""
      }));
      return;
    }

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        city: ""
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddMember = () => {
    const newCount = groupMembers.length + 2;
    setGroupMembers((prev) => [
      ...prev,
      { title: "", fullName: "", email: "", mobile: "", designation: "" }
    ]);
    if (onGroupMembersChange) onGroupMembersChange(newCount);
  };

  const handleRemoveMember = (index: number) => {
    const newCount = groupMembers.length;
    setGroupMembers((prev) => prev.filter((_, i) => i !== index));
    if (onGroupMembersChange) onGroupMembersChange(newCount);
  };

  const handleMemberChange = (index: number, field: keyof GroupMember, value: string) => {
    setGroupMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!formData.agreeTerms) {
      setSubmitError("Please agree to the Terms & Conditions and Privacy Policy first.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.mobile || !formData.designation || !formData.organization) {
      setSubmitError("Please fill in all required fields for Primary Contact.");
      return;
    }

    // Validate group members if any
    for (let i = 0; i < groupMembers.length; i++) {
      const member = groupMembers[i];
      if (!member.fullName || !member.email || !member.mobile || !member.designation) {
        setSubmitError(`Please fill all required fields for Delegate #${i + 2}.`);
        return;
      }
    }

    if (!selectedPass || !(dynamicPassMap[selectedPass] || PASS_OPTIONS[selectedPass])) {
      setSubmitError("Please select a pass from the Registration Fees section on the right to proceed.");
      toast.warning("Please select a pass first from the Registration Fees section on the right!");
      return;
    }

    if (selectedDays.length === 0) {
      setSubmitError("Please select at least one Conference Day (Day 1, Day 2, or Day 3).");
      toast.warning("Please select at least one Conference Day (Day 1, Day 2, or Day 3) to proceed!");
      return;
    }

    const currentPass = dynamicPassMap[selectedPass] || PASS_OPTIONS[selectedPass] || PASS_OPTIONS["delegate3days"];
    const totalDelegates = groupMembers.length + 1;
    const daysMultiplier = selectedDays.length > 0 ? selectedDays.length : 1;
    const basePrice = currentPass.price * daysMultiplier * totalDelegates;
    const discount = appliedCoupon ? Math.round((basePrice * appliedCoupon.discountPercent) / 100) : 0;
    const finalAmt = basePrice - discount;
    const priceStr = `₹${finalAmt.toLocaleString("en-IN")}`;
    const amountNum = finalAmt * 100;

    setIsSubmitting(true);
    try {
      // 1. Load Razorpay
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        setSubmitError("Razorpay SDK failed to load. Check your connection.");
        setIsSubmitting(false);
        return;
      }

      // 2. Create Order
      const orderRes = await fetch(`${API_URL}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountNum, currency: "INR" })
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
        setSubmitError("Could not initiate payment order");
        setIsSubmitting(false);
        return;
      }

      // 3. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_RTd9y3ngRanKxq",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Arogya Sangosthi 2026",
        description: `${currentPass.name} (Group: ${totalDelegates} Delegates · ${selectedDays.length} ${selectedDays.length === 1 ? 'Day' : 'Days'})`,
        image: window.location.origin + "/logo.png",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          setIsSubmitting(true);
          try {
            // Verify Payment
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
              // 4. If file is uploaded, upload it
              let docUrl = "";
              if (uploadedFile) {
                try {
                  const fileFormData = new FormData();
                  fileFormData.append("document", uploadedFile);
                  const uploadRes = await fetch(`${API_URL}/delegates-registration/upload-document`, {
                    method: "POST",
                    body: fileFormData
                  });
                  const uploadData = await uploadRes.json();
                  if (uploadData.success && uploadData.url) {
                    docUrl = uploadData.url;
                  }
                } catch (fileErr) {
                  console.error("Document upload error:", fileErr);
                }
              }

              // 5. Construct primary and group delegate records
              const primaryDelegate = {
                planName: currentPass.name,
                selectedDays: selectedDays,
                title: formData.title || "Mr.",
                fullName: formData.fullName,
                email: formData.email,
                mobile: formData.mobile,
                whatsappNumber: formData.mobile,
                designation: formData.designation || "Delegate",
                organization: formData.organization || "Independent",
                country: formData.country || "India",
                state: formData.state || "",
                city: formData.city || "",
                category: formData.category || "",
                industryType: formData.category || "",
                areasOfInterest: formData.specialization || "",
                source: "Website",
                isSpeaker: formData.isSpeaker || "No",
                specialization: formData.specialization || "",
                dietary: formData.dietary || "",
                assistance: formData.assistance || "",
                documentUrl: docUrl,
                couponCode: appliedCoupon?.code || null,
                price: priceStr,
                otp: "VERIFIED_WEBSITE",
                transactionId: response.razorpay_payment_id
              };

              const additionalDelegates = groupMembers.map((m) => ({
                planName: currentPass.name,
                selectedDays: selectedDays,
                title: m.title || "Mr.",
                fullName: m.fullName,
                email: m.email,
                mobile: m.mobile,
                whatsappNumber: m.mobile,
                designation: m.designation || "Delegate",
                organization: formData.organization || "Independent",
                country: formData.country || "India",
                state: formData.state || "",
                city: formData.city || "",
                category: formData.category || "",
                industryType: formData.category || "",
                areasOfInterest: formData.specialization || "",
                source: "Website",
                isSpeaker: formData.isSpeaker || "No",
                specialization: formData.specialization || "",
                dietary: formData.dietary || "",
                assistance: formData.assistance || "",
                documentUrl: docUrl,
                couponCode: appliedCoupon?.code || null,
                price: "Group Member",
                otp: "VERIFIED_WEBSITE",
                transactionId: response.razorpay_payment_id
              }));

              const regRes = await fetch(`${API_URL}/delegates-registration/verify-group`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  otp: "VERIFIED_WEBSITE",
                  primaryEmail: formData.email,
                  primaryWhatsapp: formData.mobile,
                  delegatesData: [primaryDelegate, ...additionalDelegates]
                })
              });
              const regData = await regRes.json();

              if (regData.success) {
                setRegisteredDelegates(Array.isArray(regData.data) ? regData.data : [regData.data]);
                setIsSuccess(true);
              } else {
                setSubmitError(regData.message || "Group registration failed. Please try again.");
              }
            } else {
              setSubmitError("Payment verification failed.");
            }
          } catch (err) {
            console.error("Submit error:", err);
            setSubmitError("Failed to submit group registration. Please check your connection.");
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile
        },
        theme: {
          color: "#2b5922"
        },
        modal: {
          ondismiss: function() {
            setIsSubmitting(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setSubmitError(response.error.description || "Payment failed");
        setIsSubmitting(false);
      });
      rzp.open();
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError("Failed to initiate payment. Please check your connection.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const currentPass = (selectedPass && (dynamicPassMap[selectedPass] || PASS_OPTIONS[selectedPass])) ? (dynamicPassMap[selectedPass] || PASS_OPTIONS[selectedPass]) : (dynamicPassMap["delegate3days"] || PASS_OPTIONS["delegate3days"]);
    const totalDelegates = groupMembers.length + 1;
    const daysMultiplier = selectedDays.length > 0 ? selectedDays.length : 1;
    const basePrice = currentPass.price * daysMultiplier * totalDelegates;
    const discountAmount = appliedCoupon ? Math.round((basePrice * appliedCoupon.discountPercent) / 100) : 0;
    const finalTotal = basePrice - discountAmount;

    const passCode = selectedPass?.includes('paper') ? 'PAP' : selectedPass?.includes('poster') ? 'POS' : 'DEL';
    const dayCode = selectedDays.length === 3 || selectedDays.length === 0 ? 'AD' : selectedDays.length === 1 ? `D${selectedDays[0]}` : `D${[...selectedDays].sort().join('')}`;
    const dd = String(new Date().getDate()).padStart(2, '0');

    const delegateList = registeredDelegates.length > 0 ? registeredDelegates : [
      {
        fullName: `${formData.title} ${formData.fullName}`,
        email: formData.email,
        mobile: formData.mobile,
        designation: formData.designation,
        delegateId: `AGS18/GR/${passCode}/${dayCode}/${dd}/26/001`
      },
      ...groupMembers.map((m, idx) => ({
        fullName: `${m.title} ${m.fullName}`,
        email: m.email,
        mobile: m.mobile,
        designation: m.designation,
        delegateId: `AGS18/GR/${passCode}/${dayCode}/${dd}/26/${String(idx + 2).padStart(3, '0')}`
      }))
    ];

    const txnId = registeredDelegates[0]?.transactionId || "Online Verified";

    return (
      <motion.div
        id="success-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#f0f9f0] border-2 border-[#2b5922] p-6 md:p-10 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center my-6 relative overflow-hidden font-inter"
      >
        <div className="w-32 h-32 md:w-44 md:h-44 mb-1 flex items-center justify-center">
          <DotLottieReact
            src="https://lottie.host/ab646915-b3e2-48fa-8af7-245fd427baf7/DbbMej8R1U.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
          Group Registration Confirmed ({totalDelegates} Delegates)
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#113111] mb-2 uppercase tracking-wide font-inter">
          Group Registration Successful!
        </h2>

        <p className="text-gray-700 text-xs md:text-sm max-w-lg mb-4 leading-relaxed">
          Thank you <strong className="text-gray-900">{formData.title} {formData.fullName}</strong>. All <strong>{totalDelegates} delegates</strong> have been successfully registered for the <strong>18th Integrated Arogya Sangosthi 2026</strong>.
        </p>

        {/* REGISTERED DELEGATES CARDS LIST */}
        <div className="w-full max-w-xl bg-white border border-[#2b5922]/20 rounded-xl p-4 my-2 shadow-xs text-left">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Registered Delegates & Pass IDs</span>
            <span className="text-[11px] font-semibold text-[#2b5922] bg-[#f0f9f0] px-2 py-0.5 rounded-full">
              {totalDelegates} Passes
            </span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {delegateList.map((del: any, idx: number) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-green-200 transition-colors gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">{del.fullName || del.name}</span>
                    {idx === 0 && (
                      <span className="text-[9.5px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">Primary</span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500">{del.email} {del.mobile ? `· ${del.mobile}` : ''}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-roboto text-xs font-bold text-[#14532d] bg-green-50 border border-green-200 px-2 py-1 rounded">
                    {del.delegateId || `AGS18/GR/DEL/AD/26/00${idx + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(del.delegateId || '');
                        setCopiedIndex(idx);
                        toast.success(`${del.fullName}'s Delegate ID copied!`);
                        setTimeout(() => setCopiedIndex(null), 2500);
                      }
                    }}
                    className="p-1 rounded hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                    title="Copy Delegate ID"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY DETAILS GRID */}
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-xs rounded-xl border border-gray-200 p-4 my-3 text-left space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Selected Pass:</span>
            <span className="font-semibold text-gray-900">{currentPass.name} ({totalDelegates} Delegates)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Conference Days:</span>
            <span className="font-bold text-[#0B2C66]">
              {selectedDays.length === 3 ? 'All 3 Days (21-23 Aug 2026)' : selectedDays.map(d => `Day ${d}`).join(', ')}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-500 font-medium">Transaction ID:</span>
            <span className="font-mono text-gray-700 font-medium text-[11px]">{txnId}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-500 font-medium">Total Paid:</span>
            <span className="font-bold text-red-600 text-sm">₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {appliedCoupon && (
          <div className="bg-[#eaf4ff] border border-[#b8daff] rounded-lg px-3.5 py-2 text-xs font-bold text-[#0056b3] mb-4 shadow-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0056b3]" />
            Coupon <strong className="text-[#004085]">{appliedCoupon.code}</strong> Applied ({appliedCoupon.discountPercent}% Off)
          </div>
        )}

        <p className="text-gray-500 text-[11px] max-w-md mb-5 leading-normal">
          📩 Detailed registration summary and passes have been emailed to <span className="text-gray-800 font-semibold">{formData.email}</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-1 w-full max-w-md justify-center">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setRegisteredDelegates([]);
              setFormData({
                title: "", fullName: "", email: "", mobile: "",
                designation: "", organization: "", country: "India",
                state: "", city: "", category: "", isSpeaker: "",
                specialization: "", dietary: "", assistance: "",
                agreeTerms: false
              });
              setGroupMembers([]);
              setAppliedCoupon(null);
              setCouponCode("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-[#2b5922] hover:bg-[#1a3d14] text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex-1"
          >
            Submit Another Registration
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer flex-1"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, rotateY: -30, x: -30, scale: 0.95 }}
      whileInView={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="bg-[#f9fbfb] rounded-2xl overflow-hidden relative" 
      style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px', perspective: '1000px' }}
    >
      {/* Shimmer sweep */}
      <motion.div
        initial={{ x: "-120%" }}
        whileInView={{ x: "220%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, delay: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
      />
      <div className="bg-[#012e17] px-6 py-2.5 border-b border-[#012e17]">
        <h2 className="text-white text-lg font-semibold flex items-center gap-2 font-inter uppercase tracking-wider">
          <Users size={22} className="text-white" />
          Group Registration
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="px-6 pb-6 pt-3 md:px-8 md:pb-8 md:pt-4 flex flex-col gap-8 relative overflow-hidden">
        
        {/* Personal Information */}
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2 -ml-1 relative after:absolute after:bottom-0 after:left-1.5 after:w-12 after:h-[2.5px] after:bg-[#d18e26]">
            <div className="flex items-center gap-2">
              <div className="bg-[#f0f7f0] p-1.5 rounded-md text-[#2b5922]">
                <User size={18} />
              </div>
              <h3 className="font-bold text-[#113111] text-base uppercase tracking-wide font-inter flex items-center gap-1.5">
                <span>Personal Information</span>
                <span className="text-sm font-bold text-[#4B1426] normal-case tracking-normal font-sans">(Primary Contact)</span>
              </h3>
            </div>

            <div className="flex items-center gap-3 z-20">
              <button
                type="button"
                onClick={() => router.push('/register-now')}
                className="bg-[#f0f7ff] border border-[#d6e8ff] text-[#0052cc] hover:bg-[#e0f0ff] px-3 py-1.5 rounded-md flex items-center gap-1.5 shrink-0 transition-all shadow-2xs cursor-pointer z-20"
              >
                <span className="text-sm font-bold leading-none">&larr;</span>
                <span className="text-[11px] font-bold font-inter tracking-wide uppercase">Back to Registration</span>
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute -right-3 md:-right-6 -top-6 md:-top-8 z-10 pointer-events-none"
            >
              <img 
                src={leafRightImg.src} 
                alt="Leaf Right" 
                className="w-20 md:w-28 h-auto object-contain select-none drop-shadow-sm origin-top-right" 
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Title <span className="text-red-500">*</span></label>
              <select name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select</option>
                <option>Mr.</option><option>Ms.</option><option>Dr.</option><option>Prof.</option>
              </select>
            </div>
            <div className="md:col-span-9 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Full Name <span className="text-red-500">*</span></label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
            {/* OTP & Coupon Floating Alert Pill */}
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

            {/* Email Field with Send/Verify OTP */}
            <div className="flex flex-col gap-1.5 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-black">Email Address <span className="text-red-500">*</span></label>
                {emailOtpVerified && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} className="text-emerald-600" /> Verified
                  </span>
                )}
              </div>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  disabled={emailOtpVerified}
                  placeholder="Enter your email address" 
                  className={`w-full border rounded-sm pl-9 pr-24 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none transition-all ${
                    emailOtpVerified ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950 font-medium' : 'bg-gray-50 border-gray-300'
                  }`} 
                />
                {!emailOtpVerified && (
                  <button
                    type="button"
                    onClick={handleSendEmailOtp}
                    disabled={emailOtpLoading || emailTimer > 0}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#2b5922] hover:bg-[#1f4218] text-white text-xs font-semibold px-3 py-1.5 rounded transition-all shadow-sm active:scale-95 z-10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    {emailOtpLoading ? <Loader2 size={12} className="animate-spin" /> : null}
                    {emailTimer > 0 ? `Resend (${emailTimer}s)` : emailOtpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                )}
              </div>

              {/* Email OTP Input Row */}
              <AnimatePresence>
                {emailOtpSent && !emailOtpVerified && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-1 bg-amber-50/70 border border-amber-200 p-2.5 rounded-md flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-xs text-amber-900 font-medium">
                      <span>Enter 6-digit OTP sent to your Email</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={emailOtpInput}
                        onChange={(e) => setEmailOtpInput(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="flex-grow border border-amber-300 rounded px-3 py-1.5 text-sm outline-none bg-white text-gray-800 focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyEmailOtp}
                        disabled={emailOtpLoading || !emailOtpInput}
                        className="bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-4 py-2 rounded-md transition-all shadow-md active:scale-95 whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-[#d97706] disabled:opacity-85 disabled:cursor-not-allowed"
                      >
                        {emailOtpLoading ? <Loader2 size={12} className="animate-spin" /> : null}
                        Verify OTP
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Field with Send/Verify OTP */}
            <div className="flex flex-col gap-1.5 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-black">Mobile Number <span className="text-red-500">*</span></label>
                {mobileOtpVerified && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={12} className="text-emerald-600" /> Verified
                  </span>
                )}
              </div>
              <div className="flex relative items-center">
                <select className="border border-gray-300 border-r-0 rounded-l-sm px-2 py-2.5 text-sm bg-gray-100 text-gray-600 outline-none w-20 shrink-0">
                  <option>+91</option>
                </select>
                <input 
                  name="mobile" 
                  type="tel" 
                  value={formData.mobile} 
                  onChange={handleChange} 
                  required 
                  disabled={mobileOtpVerified}
                  placeholder="Enter your mobile number" 
                  className={`w-full border rounded-r-sm pl-3 pr-24 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none transition-all ${
                    mobileOtpVerified ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950 font-medium' : 'bg-gray-50 border-gray-300'
                  }`} 
                />
                {!mobileOtpVerified && (
                  <button
                    type="button"
                    onClick={handleSendMobileOtp}
                    disabled={mobileOtpLoading || mobileTimer > 0}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#2b5922] hover:bg-[#1f4218] text-white text-xs font-semibold px-3 py-1.5 rounded transition-all shadow-sm active:scale-95 z-10 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    {mobileOtpLoading ? <Loader2 size={12} className="animate-spin" /> : null}
                    {mobileTimer > 0 ? `Resend (${mobileTimer}s)` : mobileOtpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                )}
              </div>

              {/* Mobile OTP Input Row */}
              <AnimatePresence>
                {mobileOtpSent && !mobileOtpVerified && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-1 bg-amber-50/70 border border-amber-200 p-2.5 rounded-md flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-xs text-amber-900 font-medium">
                      <span>Enter 6-digit OTP sent to Mobile</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={mobileOtpInput}
                        onChange={(e) => setMobileOtpInput(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        className="flex-grow border border-amber-300 rounded px-3 py-1.5 text-sm outline-none bg-white text-gray-800 focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyMobileOtp}
                        disabled={mobileOtpLoading || !mobileOtpInput}
                        className="bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold px-4 py-2 rounded-md transition-all shadow-md active:scale-95 whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-[#d97706] disabled:opacity-85 disabled:cursor-not-allowed"
                      >
                        {mobileOtpLoading ? <Loader2 size={12} className="animate-spin" /> : null}
                        Verify OTP
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-black">Designation <span className="text-red-500">*</span></label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="designation" value={formData.designation} onChange={handleChange} required placeholder="Enter your designation" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-black">Organization / Institution <span className="text-red-500">*</span></label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="organization" value={formData.organization} onChange={handleChange} required placeholder="Enter organization name" className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-semibold text-black flex items-center gap-1.5">
                <Calendar size={14} className="text-[#2b5922]" /> Select Conference Day(s) <span className="text-red-500">*</span>
              </label>
              <select 
                value={selectedPass === 'delegate3days' ? 'all' : (selectedDays[0] || '')}
                onChange={(e) => {
                  if (selectedPass === 'delegate3days') return;
                  const val = parseInt(e.target.value);
                  if (val) setSelectedDays([val]);
                }}
                disabled={selectedPass === 'delegate3days'}
                required
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <option value="" disabled>Select Conference Day</option>
                {selectedPass === 'delegate3days' ? (
                  <option value="all">All Days (21, 22, 23 Aug 2026)</option>
                ) : (
                  <>
                    <option value="1">Day 1 - 21 Aug 2026</option>
                    <option value="2">Day 2 - 22 Aug 2026</option>
                    <option value="3">Day 3 - 23 Aug 2026</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black flex items-center justify-between">
                <span>Country <span className="text-red-500">*</span></span>
                {loadingCountries && <Loader2 size={12} className="animate-spin text-gray-400" />}
              </label>
              <select 
                name="country" 
                value={formData.country} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all cursor-pointer"
              >
                {countries && countries.length > 0 ? (
                  countries.map((c) => (
                    <option key={c.countryCode ?? c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <option value="India">India</option>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black flex items-center justify-between">
                <span>State / Province <span className="text-red-500">*</span></span>
                {loadingStates && <Loader2 size={12} className="animate-spin text-gray-400" />}
              </label>
              <select 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all cursor-pointer"
              >
                <option value="">{loadingStates ? "Loading States..." : "Select State"}</option>
                {states.map((s) => (
                  <option key={s.stateCode ?? s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black flex items-center justify-between">
                <span>City <span className="text-red-500">*</span></span>
                {loadingCities && <Loader2 size={12} className="animate-spin text-gray-400" />}
              </label>
              <select 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                required 
                className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all cursor-pointer"
              >
                <option value="">
                  {loadingCities 
                    ? "Loading Cities..." 
                    : !formData.state 
                    ? "Select State First" 
                    : cities.length === 0 
                    ? "No Cities Found" 
                    : "Select City"}
                </option>
                {cities.map((c) => (
                  <option key={c.cityCode ?? c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="flex flex-col gap-5 mt-0">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 -ml-1 relative after:absolute after:bottom-0 after:left-1.5 after:w-12 after:h-[2.5px] after:bg-[#d18e26]">
            <div className="bg-[#f0f7f0] p-1.5 rounded-md text-[#2b5922]">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-[#113111] text-base uppercase tracking-wide">Additional Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Category <span className="text-red-500">*</span></label>
              <select name="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">{loadingCategories ? "Loading Categories..." : "Select Category"}</option>
                {categories && categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Professional">Professional</option>
                    <option value="Student">Student</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Corporate">Corporate</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Are you a speaker? <span className="text-red-500">*</span></label>
              <select name="isSpeaker" value={formData.isSpeaker} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select Option</option>
                <option>Yes</option><option>No</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-xs font-semibold text-black">Specialization / Area of Interest</label>
            <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="E.g., Ayurveda, Yoga, Naturopathy" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Dietary Preference</label>
              <select name="dietary" value={formData.dietary} onChange={handleChange} className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all">
                <option value="">Select Preference</option>
                <option>Vegetarian</option><option>Vegan</option><option>Non-Vegetarian</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-black">Any Assistance Required?</label>
              <input name="assistance" value={formData.assistance} onChange={handleChange} placeholder="E.g., Wheelchair access" className="w-full border border-gray-300 rounded-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#2b5922] focus:border-transparent outline-none bg-gray-50 transition-all" />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-xs font-semibold text-black">
              Upload Document (ID Proof / Student ID) <span className="text-blue-600 font-semibold ml-1">(Optional)</span>
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
            {uploadedFile ? (
              <div className="w-full border border-emerald-300 rounded-xl p-4 flex items-center justify-between bg-emerald-50/70 shadow-2xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-emerald-100 p-2.5 rounded-lg text-[#2b5922] shrink-0">
                    <FileText size={22} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-emerald-950 truncate">{uploadedFile.name}</span>
                    <span className="text-[11px] font-medium text-emerald-700">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-md transition-colors shrink-0"
                  title="Remove file"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    const file = e.dataTransfer.files[0];
                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("File size exceeds 5MB limit.");
                      return;
                    }
                    setUploadedFile(file);
                  }
                }}
                className="w-full border-2 border-dashed border-[#2b5922]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-[#f0f7f0] hover:bg-[#e4f2e4] hover:border-[#2b5922] transition-colors cursor-pointer group select-none"
              >
                <div className="bg-white p-3 rounded-full shadow-sm text-[#2b5922] group-hover:scale-110 mb-3 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <p className="text-sm text-gray-700 font-semibold mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* Group Members Block (Add Another Delegate) */}
        <div className="flex flex-col gap-5 mt-2">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 -ml-1 relative after:absolute after:bottom-0 after:left-1.5 after:w-12 after:h-[2.5px] after:bg-[#d18e26]">
            <div className="flex items-center gap-2">
              <div className="bg-[#f0f7f0] p-1.5 rounded-md text-[#2b5922]">
                <Users size={18} />
              </div>
              <h3 className="font-bold text-[#113111] text-base uppercase tracking-wide">Additional Group Delegates</h3>
            </div>
            <span className="text-xs font-semibold bg-[#249D8F] text-white px-2.5 py-1 rounded-full border border-[#249D8F] shadow-2xs">
              {groupMembers.length + 1} Total Delegates
            </span>
          </div>

          <AnimatePresence>
            {groupMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col gap-3 relative shadow-2xs hover:border-[#2b5922]/50 transition-all"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-[11px] font-bold text-[#2b5922] bg-[#f0f7f0] px-2 py-0.5 rounded-md border border-[#d2e8d2]">
                    Delegate #{index + 2}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors flex items-center gap-1 text-[11px] font-semibold"
                    title="Remove Delegate"
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-3 flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-black">Title <span className="text-red-500">*</span></label>
                    <select
                      value={member.title}
                      onChange={(e) => handleMemberChange(index, "title", e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-[11px] h-8 focus:ring-1 focus:ring-[#2b5922] outline-none bg-gray-50 focus:bg-white"
                    >
                      <option value="">Select</option>
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Dr.</option>
                      <option>Prof.</option>
                    </select>
                  </div>
                  <div className="md:col-span-9 flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-black">Full Name <span className="text-red-500">*</span></label>
                    <input
                      value={member.fullName}
                      onChange={(e) => handleMemberChange(index, "fullName", e.target.value)}
                      required
                      type="text"
                      placeholder="Enter full name"
                      className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-[11px] h-8 focus:ring-1 focus:ring-[#2b5922] outline-none bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-black">Email Address <span className="text-red-500">*</span></label>
                    <input
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                      required
                      type="email"
                      placeholder="Enter email address"
                      className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-[11px] h-8 focus:ring-1 focus:ring-[#2b5922] outline-none bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-black">Mobile Number <span className="text-red-500">*</span></label>
                    <input
                      value={member.mobile}
                      onChange={(e) => handleMemberChange(index, "mobile", e.target.value.replace(/[^0-9]/g, ''))}
                      required
                      type="tel"
                      placeholder="Enter mobile number"
                      className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-[11px] h-8 focus:ring-1 focus:ring-[#2b5922] outline-none bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-black">Designation <span className="text-red-500">*</span></label>
                    <input
                      value={member.designation}
                      onChange={(e) => handleMemberChange(index, "designation", e.target.value)}
                      required
                      type="text"
                      placeholder="Enter designation"
                      className="w-full border border-gray-300 rounded-md px-2.5 py-1.5 text-[11px] h-8 focus:ring-1 focus:ring-[#2b5922] outline-none bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleAddMember}
            className="bg-white border-2 border-dashed border-[#2b5922] text-[#2b5922] hover:bg-[#f0f7f0] px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
          >
            <UserPlus size={16} className="group-hover:scale-110 transition-transform" />
            <span>+ Add Another Delegate</span>
          </button>
        </div>

        {/* Coupon Code & Payment Breakdown Section */}
        {(() => {
          const passConfig = (selectedPass && PASS_OPTIONS[selectedPass]) ? PASS_OPTIONS[selectedPass] : null;
          const totalDelegates = groupMembers.length + 1;
          const daysMultiplier = 1;
          const subTotal = passConfig ? (totalDelegates * passConfig.price * daysMultiplier) : 0;
          const discountAmount = (appliedCoupon && passConfig) ? Math.round((subTotal * appliedCoupon.discountPercent) / 100) : 0;
          const finalTotal = subTotal - discountAmount;

          return (
            <div className="flex flex-col gap-3 -mt-2">
              {/* Coupon Toggle & Input */}
              <div className="relative border border-dashed border-emerald-300 bg-[#f4fcf6] rounded-xl p-4 transition-all w-full">
                <div 
                  className="flex items-center justify-between cursor-pointer select-none" 
                  onClick={() => {
                    if (!appliedCoupon) {
                      setShowCouponInput((v) => !v);
                      if (showCouponInput) { setCouponCode(""); setCouponError(""); }
                    }
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Tag className="w-5 h-5 text-[#2b5922]" style={{ transform: 'rotate(90deg)' }} fill="currentColor" />
                    <span className="text-sm font-bold text-gray-900">I have a coupon code</span>
                  </div>
                  <div className={`w-11 h-6 rounded-full relative transition-colors ${showCouponInput || appliedCoupon ? 'bg-[#2b5922]' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-sm ${showCouponInput || appliedCoupon ? 'left-[22px]' : 'left-0.5'}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {(showCouponInput || appliedCoupon) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                          placeholder="e.g. AROGYA10"
                          disabled={!!appliedCoupon}
                          className={`flex-1 border border-gray-300 rounded-md px-3 py-2 text-xs font-semibold uppercase outline-none focus:ring-1 focus:ring-[#2b5922] ${
                            appliedCoupon ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isCouponLoading || !couponCode.trim() || !!appliedCoupon}
                          className={`text-white text-xs font-bold px-6 py-2 rounded-md shadow-xs transition-all whitespace-nowrap flex items-center gap-1 ${
                            appliedCoupon ? 'bg-[#2b5922] opacity-80 cursor-not-allowed' : 'bg-[#2b5922] hover:bg-[#1a3d14]'
                          }`}
                        >
                          {isCouponLoading ? <Loader2 size={12} className="animate-spin" /> : null}
                          {isCouponLoading ? 'APPLYING...' : 'APPLY'}
                        </button>
                      </div>
                      
                      {appliedCoupon && (
                        <div className="flex items-center gap-2 mt-2.5 text-emerald-700 text-xs font-semibold">
                          <CheckCircle size={16} className="text-emerald-600" /> 
                          Great! {appliedCoupon.discountPercent}% discount applied successfully.
                        </div>
                      )}
                      {couponError && (
                        <div className="flex items-center gap-2 mt-2.5 text-red-600 text-xs font-semibold">
                          ⚠ {couponError}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Payment Summary Breakdown Table */}
              <div className="flex gap-4 px-4 py-3.5 bg-[#f4fcf6] border border-emerald-200 rounded-xl group">
                <div className="w-10 h-10 rounded-full bg-[#e3f3e7] flex items-center justify-center shrink-0">
                  <BadgePercent className="w-5 h-5 text-[#2b5922]" />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="text-xs font-bold text-[#113111] tracking-wide mb-2 flex items-center justify-between uppercase">
                    <span>Payment Summary</span>
                    {appliedCoupon && (
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700 text-[11px] font-bold transition-colors whitespace-nowrap normal-case cursor-pointer"
                      >
                        Remove Coupon
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1.5 text-xs">
                    <div className="flex justify-between items-center font-semibold text-gray-700">
                      <span>Selected Pass:</span>
                      {passConfig ? (
                        <span className="font-bold text-[#2b5922]">{passConfig.name}</span>
                      ) : (
                        <span className="font-bold text-red-600 text-[11px] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          * Please Select Pass from Right
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center font-semibold text-gray-700">
                      <span>Selected Days:</span>
                      {selectedDays.length > 0 ? (
                        <span className="font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px]">
                          {selectedDays.map(d => `Day ${d}`).join(", ")} ({selectedDays.length} {selectedDays.length === 1 ? 'Day' : 'Days'})
                        </span>
                      ) : (
                        <span className="font-bold text-red-600 text-[11px]">
                          None selected
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between font-bold text-red-600">
                      <span>Subtotal ({totalDelegates} {totalDelegates > 1 ? 'Delegates' : 'Delegate'})</span>
                      <span>{passConfig ? `₹${subTotal.toLocaleString('en-IN')}` : '₹0'}</span>
                    </div>
                    {appliedCoupon && passConfig && (
                      <div className="flex justify-between font-semibold text-red-600">
                        <span>Discount ({appliedCoupon.code} - {appliedCoupon.discountPercent}%)</span>
                        <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-dashed border-emerald-200 flex justify-between text-sm font-bold text-[#113111]">
                    <span>Total Amount Payable</span>
                    <span className="text-[#2b5922]">
                      {passConfig ? `₹${finalTotal.toLocaleString('en-IN')}` : '₹0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Error message banner */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3.5 rounded-xl flex items-center gap-2">
            <span>⚠</span>
            <span>{submitError}</span>
          </div>
        )}

        {/* Checkbox and Buttons */}
        <div className="flex flex-col gap-3 -mt-2">
          <div className="flex items-start gap-3 bg-[#edf4ff] p-4 rounded-xl border border-[#c7ddff] shadow-xs">
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 w-4 h-4 text-[#1b3c73] border-blue-300 rounded focus:ring-[#1b3c73] cursor-pointer" />
            <p className="text-sm text-[#1e3a8a] font-medium leading-relaxed">
              I agree to the <a href="#" className="text-[#1b3c73] font-bold underline hover:text-[#1d4ed8]">Terms & Conditions</a> and <a href="#" className="text-[#1b3c73] font-bold underline hover:text-[#1d4ed8]">Privacy Policy</a> of the 18th Integrated Arogya Sangosthi.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 relative z-10">
            <button type="button" onClick={() => router.push('/register-now')} className="text-red-600 hover:text-red-800 font-semibold text-sm transition-colors flex items-center gap-1">
              &larr; Back to Registration
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#2b5922] hover:bg-[#1a3d14] disabled:opacity-70 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Submit Group Registration</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated Left Green Leaf (leafg) */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: -20, rotate: -25, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
          className="absolute top-[35%] -left-4 md:-left-6 w-12 md:w-16 pointer-events-none z-10 select-none origin-left"
        >
          <motion.img
            src={leafgImg.src}
            alt="Left Leaf Decoration"
            animate={{ y: [0, 8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-auto object-contain filter drop-shadow-sm"
          />
        </motion.div>

        {/* Animated Bottom Right Leaf */}
        <motion.div
          initial={{ opacity: 0, x: 50, y: 50, rotate: 25, scale: 0.8 }}
          whileInView={{ opacity: 0.9, x: 12, y: 12, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
          className="absolute -bottom-2 -right-2 w-20 md:w-28 pointer-events-none z-0 select-none origin-bottom-right"
        >
          <motion.img
            src={bleafImg.src}
            alt="Bottom Right Leaf"
            animate={{ y: [0, -6, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-auto object-contain"
          />
        </motion.div>

      </form>
    </motion.div>
  );
};

export default GroupDelegateForm;
