"use client";
//need to use client because is rendered on the client side
import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchableReview } from "@/lib/reviews";

export default function SearchBox() {
  // useRouter is a hook that gives us access to the router object
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState<SearchableReview[]>([]);
  useEffect(() => {
    if (query.length > 1) {
      // cancel previous requests as the user types
      // makes app more performant and avoids responses being returned out of order
      const controller = new AbortController();
      // need to wrap await in an async function
      //otherwise it will not be compatible with useEffect
      (async () => {
        // encodeURIComponent escapes special characters in the query
        const url = "/api/search?query=" + encodeURIComponent(query);
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      // cleanup function fires everytime useEfect is called
      return () => controller.abort();
    } else {
      //if query is less than 1 character, set reviews to an empty array
      setReviews([]);
    }
  }, [query]);

  const handleChange = (review: SearchableReview) => {
    router.push(`/reviews/${review.slug}`);
  };
  //   console.log("[SearchBox] query:", query);

  // prevents search box from rendering on the server
  if (!isClient) {
    return null;
  }

  //only return first 5 results in the search box
  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
