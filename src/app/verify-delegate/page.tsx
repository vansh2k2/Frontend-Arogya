'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyDelegateContent() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id') || 'N/A';
  const name = searchParams.get('name') || 'Delegate';
  const rawType = searchParams.get('type') || 'SINGLE';
  const pass = searchParams.get('pass') || 'DELEGATE PASS';
  const days = searchParams.get('days') || 'All Days';
  const mobile = searchParams.get('mobile') || '';
  const email = searchParams.get('email') || '';
  const amount = searchParams.get('amount') || searchParams.get('price') || '';
  const status = searchParams.get('status') || 'VERIFIED';
  const members = searchParams.get('members') || '';

  const isVerified = status.toUpperCase() === 'VERIFIED';
  
  let formattedType = 'SINGLE REGISTRATION';
  if (rawType.startsWith('GROUP')) {
    const count = rawType.split('_')[1] || '';
    formattedType = `GROUP REGISTRATION ${count ? `(${count} Members)` : ''}`;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Top Header */}
        <div className="bg-[#1e3a8a] text-white p-6 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-200">Official Verification Pass</p>
          <h1 className="text-xl font-extrabold mt-1">18th Integrated Arogya Sangosthi 2026</h1>
          <p className="text-xs text-slate-300 mt-1">Pragati Maidan, New Delhi • 21-23 Aug 2026</p>
        </div>

        {/* Verification Status Banner */}
        <div className={`p-4 text-center ${isVerified ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-100' : 'bg-amber-50 text-amber-800 border-b border-amber-100'}`}>
          <div className="inline-flex items-center gap-2 font-black text-lg tracking-wide uppercase">
            <span className={`w-3 h-3 rounded-full ${isVerified ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
            {isVerified ? '✓ VERIFIED DELEGATE PASS' : 'PENDING VERIFICATION'}
          </div>
          <p className="text-xs text-slate-600 mt-0.5">Scanned & Authenticated via Arogya Delegate Portal</p>
        </div>

        {/* Delegate Details List */}
        <div className="p-6 space-y-4 text-slate-800 text-sm">
          
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Registration Type</p>
            <p className="font-bold text-blue-900 text-base mt-0.5">{formattedType}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Delegate ID</p>
              <p className="font-mono font-bold text-purple-900 text-xs mt-1 break-all">{id}</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pass Type</p>
              <p className="font-bold text-emerald-800 text-xs mt-1">{pass}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Name / Primary</p>
              <p className="font-bold text-slate-900 text-base">{name}</p>
            </div>
            
            {(mobile || email) && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                {mobile && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Mobile</p>
                    <p className="font-semibold text-blue-700">{mobile}</p>
                  </div>
                )}
                {email && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                    <p className="font-semibold text-slate-700 truncate">{email}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conference Days</p>
              <p className="font-semibold text-slate-800 text-xs mt-1">{days}</p>
            </div>

            {amount && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount Paid</p>
                <p className="font-extrabold text-emerald-700 text-sm mt-1">{amount.startsWith('₹') ? amount : `₹${amount}`}</p>
              </div>
            )}
          </div>

          {members && (
            <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200">
              <p className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1">Group Members</p>
              <p className="font-medium text-slate-800 text-xs leading-relaxed">{members}</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 text-center border-t border-slate-200">
          <p className="text-xs text-slate-500 font-medium">Namo Gange Trust • www.arogyasangosthi.com</p>
          <div className="mt-3">
            <Link href="/" className="inline-block text-xs font-bold text-blue-700 hover:underline">
              ← Return to Main Website
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function VerifyDelegatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-bold">
        Loading Verification Details...
      </div>
    }>
      <VerifyDelegateContent />
    </Suspense>
  );
}
