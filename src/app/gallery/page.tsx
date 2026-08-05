"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/gallery/Hero";
import { glimpseApi } from "@/lib/api";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema, SITE_URL } from "@/lib/schemas";
import DynamicSeoHead from "@/components/DynamicSeoHead";

// Lazy loading the below-the-fold components for performance
const YearsFilter = lazy(() => import("@/components/gallery/YearsFilter"));
const CategoryFilter = lazy(() => import("@/components/gallery/CategoryFilter"));
const GalleryGrid = lazy(() => import("@/components/gallery/GalleryGrid"));
const Counters = lazy(() => import("@/components/gallery/Counters"));
const VideoHighlights = lazy(() => import("@/components/gallery/VideoHighlights"));
const JoinUsBanner = lazy(() => import("@/components/gallery/JoinUsBanner"));

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

const galleryPageSchema = webPageSchema({
  type: "CollectionPage",
  name: "Gallery | Arogya Sangoshthi 2026",
  description:
    "Photo and video gallery from previous editions of Arogya Sangoshthi — India's premier AYUSH & Integrated Healthcare Conference.",
  url: `${SITE_URL}/gallery`,
});

const galleryBreadcrumb = breadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Gallery", url: `${SITE_URL}/gallery` },
]);

export default function GalleryPage() {
  const [activeYear, setActiveYear] = useState('All Years');
  const [activeCategory, setActiveCategory] = useState('All Activities');
  const [dbYears, setDbYears] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [dbGallery, setDbGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yrRes, catRes, galRes] = await Promise.all([
          glimpseApi.getYears(),
          glimpseApi.getCategories(),
          glimpseApi.getGallery()
        ]);
        if (yrRes) setDbYears(yrRes);
        if (catRes) setDbCategories(catRes);
        if (galRes) setDbGallery(galRes);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <DynamicSeoHead pagePath="/gallery" />
      <JsonLd data={[galleryPageSchema, galleryBreadcrumb]} />
      <Hero />
      <div className="bg-white">
        <BelowFold>
          <YearsFilter activeYear={activeYear} onYearChange={setActiveYear} dbYears={dbYears} />
        </BelowFold>
        <BelowFold>
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} dbCategories={dbCategories} />
        </BelowFold>
        <BelowFold>
          <GalleryGrid activeYear={activeYear} activeCategory={activeCategory} dbGallery={dbGallery} />
        </BelowFold>
      </div>
      <BelowFold><Counters /></BelowFold>
      <BelowFold><VideoHighlights /></BelowFold>
      <BelowFold><JoinUsBanner /></BelowFold>
    </Layout>
  );
}
