"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  children: ReactNode;
  href: string;
  prefetch?: boolean;
}
export default function NavLink({ href, children, prefetch }: NavLinkProps) {
  //makes the link unclickable if it is the current page
  const pathName = usePathname();
  if (href === pathName) {
    return <span className="text-orange-800">{children}</span>;
  }
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="text-orange-800 hover:underline"
    >
      {children}
    </Link>
  );
}
