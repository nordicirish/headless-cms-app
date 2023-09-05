import { readdir, readFile } from 'node:fs/promises';
// import matter from 'gray-matter';
import { marked } from 'marked';
import qs from 'qs';
const CMS_URL = 'http://localhost:1337';

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
  const url =
  `${CMS_URL}/api/reviews?` +
  qs.stringify(
    // fields array with properties we want
    {
      // slug is unique so we can filter by it and return 1 item
      filter: { slug: { eq: slug } },
      fields: ["slug", "title, subtitle", "publishedAt", "body"],
      // image is nested object in repsonse so we need to populate it with just the relevant fields
      populate: { image: { fields: ["url"] } },
      // sort by publishedAt in descending order
      sort: "publishedAt:desc",
      // pageSize 1 prevents further api calls
      pagination: { pageSize: 1, withcount: false },
    },
    // encodeValuesOnly: true to encode only values, not keys
    { encodeValuesOnly: true }
  );
// console.log("getReview", url);
const response = await fetch(url);
const { data } = await response.json();
// item is first element in the data array
// destructure item to attributes
const {attributes} = data[0];
return {
  slug: attributes.slug,
  title: attributes.title,
  date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
  image: CMS_URL + attributes.image.data.attributes.url,
  // marked renders markdown correctly on the page
  body: marked(attributes.body, { headerIds: false, mangle: false })}
}

export async function getReviews(): Promise<Review[]> {
  const url =
  `${CMS_URL}/api/reviews?` +
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
return data.map(({ attributes }) => ({
  slug: attributes.slug,
  title: attributes.title,
  date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
  image: CMS_URL + attributes.image.data.attributes.url,
}));
}

export async function getSlugs(): Promise<string[]> {
  const files = await readdir('./content/reviews');
  return files.filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -'.md'.length));
}
