"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
    // Fallback for lenis if it intercepts scroll
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
