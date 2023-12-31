import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
// next makes page rerender every 60 secons to reflect changes made to reviews in strapi
export const revalidate = 60;

export default async function HomePage() {
  //destructure reviews from getReviews
  const { reviews } = await getReviews(3);
  // console.log('[HomePage] rendering');
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80
                      hover:shadow-xl sm:w-full"
          >
            <Link
              href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                src={review.image}
                alt="review.title"
                priority={index === 0}
                width="320"
                height="180"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
              />
              <div className="px-2 text-center sm:text-left">
                <h2 className="font-orbitron font-semibold">{review.title}</h2>
                {/* visible only on sm or larger screens */}
                <p className=" hidden pt-2 sm:block">{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
