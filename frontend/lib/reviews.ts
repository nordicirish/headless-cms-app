import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import qs from 'qs';

export interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  body: string;
}

export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
  const { content, data: { title, date, image } } = matter(text);
  const body = marked(content, { headerIds: false, mangle: false });
  return { slug, title, date, image, body };
}

export async function getReviews(): Promise<Review[]> {
  const url =
  "http://localhost:1337/api/reviews?" +
  qs.stringify(
    // fields array with properties we want
    {
      fields: ["slug", "title, subtitle", "publishedAt"],
      // image is nested object in repsonse so we need to populate it with just the relevant fields
      populate: { image: { fields: ["url"] } },
      // sort by publishedAt in descending order
      sort: "publishedAt:desc",
      // pagination default size is 25
      pagination: { pageSize: 6 },
    },
    // encodeValuesOnly: true to encode only values, not keys
    { encodeValuesOnly: true }
  );
console.log(url);
const response = await fetch(url);
const { data } = await response.json();
return data.map((review) => ({
  slug: review.attributes.slug,
  title: review.attributes.title,
  date: review.attributes.publishedAt,
  // image: review.attributes.image.data[0].url,
}));

}

export async function getSlugs(): Promise<string[]> {
  const files = await readdir('./content/reviews');
  return files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
}
