import Link from "next/link";
export default function NavLink({ href, children, prefetch }) {
  return;
  <Link
    href={href}
    prefetch={prefetch}
    className="text-orange-800 hover:underline"
  >
    {children}
  </Link>;
}
