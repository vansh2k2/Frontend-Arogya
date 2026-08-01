"use client";
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import ContactHero from '@/components/contact/ContactHero';

// Lazy loading the below-the-fold components
const ContactForm = lazy(() => import('@/components/contact/ContactForm'));
const ContactBottom = lazy(() => import('@/components/contact/ContactBottom'));

const SectionLoader = () => (
  <div className="w-full h-[300px] flex items-center justify-center bg-[#F8F9FA]">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A7C6E]"></div>
  </div>
);

const BelowFold = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionLoader />}>
    {children}
  </Suspense>
);

export default function ContactPage() {
  return (
    <Layout>
      <div className="bg-[#fbfcf7] min-h-screen">
        <ContactHero />
        <BelowFold><ContactForm /></BelowFold>
        <BelowFold><ContactBottom /></BelowFold>
      </div>
    </Layout>
  );
}
