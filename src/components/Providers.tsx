"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ReactLenis, useLenis } from 'lenis/react';
import ScrollToTop from './ScrollToTop';
import { Toaster } from "@/components/ui/sonner";

function LenisSyncHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.resize();

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (typeof document !== 'undefined' && document.body) {
      resizeObserver.observe(document.body);
    }

    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, [lenis]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ReactLenis root options={{ autoRaf: true, duration: 1.1, smoothWheel: true }}>
      <ScrollToTop />
      <LenisSyncHandler />
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors closeButton position="top-center" />
      </QueryClientProvider>
    </ReactLenis>
  );
}

