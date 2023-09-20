import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
export default function PaginationBar({ page, pageCount, href }) {
  return (
    <div className="flex gap-2 items-center pb-3">
      <Link href={`${href}?page=${page - 1}`}>
        <ChevronLeftIcon className="h-5 w-5" />
      </Link>
      <span>
        Page {page} of {pageCount}
      </span>
      <Link href={`${href}?page=${page + 1}`}>
        <ChevronRightIcon className="h-5 w-5" />
      </Link>
    </div>
  );
}
