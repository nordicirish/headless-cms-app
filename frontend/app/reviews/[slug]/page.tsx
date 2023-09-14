import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}
// next makes page rerender every 60 secons to reflect changes made to reviews in strapi
// export const revalidate = 60;
// Revalidation handled by lib/reviews.ts
export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  console.log("[ReviewPage] generateStaticParams", slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug);
  // notFound is a next function that returns a 404 page
  if (!review) {
    return notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({
  params: { slug },
}: ReviewPageProps) {
  const review = await getReview(slug);
  // console.log("[ReviewPage]", review);
  // notFound is a next function that returns a 404 page
  if (!review) {
    return notFound();
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="pb-3 font-semibold">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}
