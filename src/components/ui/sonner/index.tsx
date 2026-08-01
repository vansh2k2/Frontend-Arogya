import { useEffect, useState } from "react";
import { Toaster as Sonner, toast } from "sonner";
import { Sparkles, AlertCircle, Info, TriangleAlert } from "lucide-react";

const Toaster = (props) => {
  const [theme, setTheme] = useState("light");

  // Detect system theme in Vite React
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      setTheme(media.matches ? "dark" : "light");
    };

    updateTheme(); // initial load
    media.addEventListener("change", updateTheme);

    return () => media.removeEventListener("change", updateTheme);
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/90 dark:group-[.toaster]:bg-slate-950/90 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-slate-900 dark:group-[.toaster]:text-slate-50 group-[.toaster]:border-white/20 dark:group-[.toaster]:border-slate-800/50 group-[.toaster]:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group-[.toaster]:rounded-xl font-medium transition-all duration-300",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:!bg-[#f0fdf4] group-[.toaster]:!text-[#15803d] group-[.toaster]:!border-[#bbf7d0] shadow-sm",
          error: "group-[.toaster]:!bg-[#4B1426] group-[.toaster]:!text-white group-[.toaster]:!border-[#6a1c36] shadow-sm",
          info: "group-[.toaster]:!bg-blue-600 group-[.toaster]:!text-white group-[.toaster]:!border-blue-700 shadow-sm",
          warning: "group-[.toaster]:!bg-yellow-500 group-[.toaster]:!text-white group-[.toaster]:!border-yellow-600 shadow-sm",
        },
      }}
      icons={{
        success: <Sparkles className="h-5 w-5 animate-pulse text-[#22c55e]" />,
        error: <AlertCircle className="h-5 w-5 text-rose-200" />,
        info: <Info className="h-5 w-5 text-blue-100" />,
        warning: <TriangleAlert className="h-5 w-5 text-yellow-100" />,
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
