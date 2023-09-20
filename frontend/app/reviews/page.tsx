import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

// next makes page rerender every 60 secons to reflect changes made to reviews in strapi
// export const revalidate = 60;

export const metadata: Metadata = {
  title: "Reviews",
};

interface ReviewsPageProps {
  searchParams: { page?: string };
}
const PAGE_SIZE = 6;
export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page);
  const reviews = await getReviews(PAGE_SIZE, page);
  console.log("[ReviewsPage] rendering:", page);

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex gap-2 pb-3">
        <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
        <span>Page {page}</span>
        <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt="review.title"
                //sets priority loading for first image others are lazy loaded
                priority={index === 0}
                width="320"
                height="180"
                className="rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
// prevent negative page numbers and non-numeric page numbers
function parsePageParam(paramValue: string): number {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
