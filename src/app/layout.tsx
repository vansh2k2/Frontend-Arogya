import "./globals.css";

export const metadata = {
  title: "Arogya Sangoshthi 2026 | International AYUSH & Homeopathy Seminar",
  description: "Arogya Sangoshthi 2026 is a global AYUSH & Homeopathy seminar uniting experts, researchers, and practitioners for knowledge exchange, innovation, and holistic healthcare advancements.",
};

import { Poppins, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${poppins.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
