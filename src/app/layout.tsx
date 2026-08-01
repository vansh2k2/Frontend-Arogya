import "./globals.css";

export const metadata = {
  title: "Arogya Sangoshthi 2026 | International AYUSH & Homeopathy Seminar",
  description: "Arogya Sangoshthi 2026 is a global AYUSH & Homeopathy seminar uniting experts, researchers, and practitioners for knowledge exchange, innovation, and holistic healthcare advancements.",
};

import { Providers } from "@/components/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
