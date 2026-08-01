"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  activeClassName?: string;
  pendingClassName?: string;
  to?: string; // for backward compatibility with react-router-dom
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, href, ...props }, ref) => {
    const pathname = usePathname();
    const destination = href || to || "";
    
    // Exact match for home, startsWith for others to keep active state on child routes
    const isActive = 
      destination === "/" 
        ? pathname === "/" 
        : pathname?.startsWith(destination as string);

    return (
      <Link
        ref={ref}
        href={destination}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
