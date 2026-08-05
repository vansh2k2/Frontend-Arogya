"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { glimpseApi } from "@/lib/api";
import Hero from "@/components/gallery/Hero";

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

// All client-side state and data fetching lives here
const GalleryClient = () => {
  const [activeYear, setActiveYear] = useState("All Years");
  const [activeCategory, setActiveCategory] = useState("All Activities");
  const [dbYears, setDbYears] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [dbGallery, setDbGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yrRes, catRes, galRes] = await Promise.all([
          glimpseApi.getYears(),
          glimpseApi.getCategories(),
          glimpseApi.getGallery(),
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
    <>
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
    </>
  );
};

export default GalleryClient;
