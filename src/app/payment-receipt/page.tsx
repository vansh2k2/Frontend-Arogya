"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentReceiptContent } from "@/components/delegate-dashboard";
import { Loader2 } from "lucide-react";

export default function StandalonePaymentReceiptPage() {
  const router = useRouter();
  const [delegate, setDelegate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserStr = localStorage.getItem("arogya_delegate_user");
    if (storedUserStr) {
      try {
        setDelegate(JSON.parse(storedUserStr));
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-inter">
        <Loader2 size={36} className="animate-spin text-emerald-700 mb-2" />
        <p className="text-xs font-bold text-slate-700">Loading Payment Receipt...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] p-3 sm:p-6 lg:p-10 font-inter">
      <PaymentReceiptContent
        delegate={delegate}
        onBack={() => router.push("/delegate-profile")}
      />
    </div>
  );
}
