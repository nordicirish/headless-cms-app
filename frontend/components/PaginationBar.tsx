import Link from "next/link";
export default function PaginationBar({ page, pageCount }) {
  return (
    <div className="flex gap-2 pb-3">
      <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
      <span>
        Page {page} of {pageCount}
      </span>
      <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
    </div>
  );
}
