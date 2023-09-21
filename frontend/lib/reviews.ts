
import { marked } from 'marked';
import qs from 'qs';
// needs to be exported for use in route.tsx
export const CACHE_TAG_REVIEWS = 'reviews';

const CMS_URL = 'http://localhost:1337';

interface CmsItem {
  id: number;
  attributes: any;
}

export interface Review {
  slug: string;
  title: string;
  date: string;
  image: string;
  subtitle: string;
}

export interface FullReview extends Review {
  body: string;
}
export interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}



export async function getReview(slug: string): Promise<FullReview | null> {
  const { data } = await fetchReviews({
    // slug is unique so we can filter by it and return 1 item
    filters: { slug: { $eq: slug } },
    // fields array with properties we want
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    // image is nested object in repsonse so we need to populate it with just the relevant fields
    populate: { image: { fields: ['url'] } },
    // pageSize 1 prevents further api calls
    pagination: { pageSize: 1, withCount: false },
  });
// add check for empty data
    if (data.length === 0) {
    return null;
  }

  const item = data[0];
  return {
    // copy properties from item and append header
    ...toReview(item),
    // mangle: false prevents compiler from renaming variables
    body: marked(item.attributes.body, { headerIds: false, mangle: false }),
  };
}
// pass page size and page number to getReviews so we can paginate
// if page number is undefined strapi will return first page
export async function getReviews(pageSize: number, page?:number): Promise<PaginatedReviews> {
  const { data, meta } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize, page },
  });

// return object with page count and reviews properties
  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview)}
}

export async function getSearchableReviews(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ['slug', 'title'], sort: ['publishedAt:desc'], pagination: { pageSize: 100 },
  })
  return data.map(({attributes}) => ({
  slug: attributes.slug,
  title: attributes.title,
}));
}

export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchReviews({
    fields: ['slug'], sort: ['publishedAt:desc'], pagination: { pageSize: 100 },
  })
  return data.map((item: CmsItem) => item.attributes.slug);
}

// common fetch code
async function fetchReviews(parameters: any) {
  const url = `${CMS_URL}/api/reviews?`
    + qs.stringify(parameters, { encodeValuesOnly: true });
  // console.log('[fetchReviews]:', url);
  // pass tag to all reviews and review pages
const response = await fetch(url, {next: {tags: [CACHE_TAG_REVIEWS
  ]}});
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item: CmsItem): Review {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
  };
}


