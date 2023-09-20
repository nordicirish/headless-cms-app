import type { ReactNode } from "react";
import Link from "next/link";

export interface NavLinkProps {
  children: ReactNode;
  href: string;
  prefetch?: boolean;
}
export default function NavLink({ href, children, prefetch }: NavLinkProps) {
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
