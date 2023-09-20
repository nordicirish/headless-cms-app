import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
export default function PaginationBar({ page, pageCount, href }) {
  return (
    <div className="flex gap-2 items-center pb-3">
      <PaginationLink href={`${href}?page=${page - 1}`}>
        <ChevronLeftIcon className="h-5 w-5" />
      </PaginationLink>
      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink href={`${href}?page=${page + 1}`}>
        <ChevronRightIcon className="h-5 w-5" />
      </PaginationLink>
    </div>
  );
}
function PaginationLink({ href, children }) {
  return (
    <Link
      href={href}
      className="border rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
    >
      {children}
    </Link>
  );
}
