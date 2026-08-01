"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactLenis } from 'lenis/react';
import ScrollToTop from './ScrollToTop';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ReactLenis root>
      <ScrollToTop />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReactLenis>
  );
}
