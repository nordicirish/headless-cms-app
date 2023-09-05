import { writeFileSync } from "node:fs";
import qs from "qs";
// append ?populate=* to get all data including images
const url =
  "http://localhost:1337/api/reviews" +
  "?" +
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
const body = await response.json();
// stringify to read data 2nd arg is replacer, 3rd is space
const formatted = JSON.stringify(body, null, 2);
console.log(formatted);
const file = "scripts/strapi-response.json";
writeFileSync(file, formatted, "utf-8");
