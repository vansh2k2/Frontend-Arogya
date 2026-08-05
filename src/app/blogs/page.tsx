"use client";
import React, { lazy, Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import BlogHero from '@/components/blogs/BlogHero';
import DynamicSeoHead from '@/components/DynamicSeoHead';

// Lazy loading the below-the-fold components
const BlogCategoryNav = lazy(() => import('@/components/blogs/BlogCategoryNav'));
const BlogMainContent = lazy(() => import('@/components/blogs/BlogMainContent'));
const BlogStats = lazy(() => import('@/components/blogs/BlogStats'));
const BlogNewsletterBanner = lazy(() => import('@/components/blogs/BlogNewsletterBanner'));

const SectionLoader = () => (
  <div className="w-full h-[200px] flex items-center justify-center bg-[#F8F9FA]">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A7C6E]"></div>
  </div>
);

const BelowFold = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionLoader />}>
    {children}
  </Suspense>
);

export default function BlogsPage() {
  return (
    <Layout>
      <DynamicSeoHead pagePath="/blogs" />
      <div className="bg-[#fcfcfc] min-h-screen font-sans">
        <BlogHero />
        <BelowFold><BlogCategoryNav /></BelowFold>
        <BelowFold><BlogMainContent /></BelowFold>
        <BelowFold><BlogStats /></BelowFold>
        <BelowFold><BlogNewsletterBanner /></BelowFold>
      </div>
    </Layout>
  );
}
