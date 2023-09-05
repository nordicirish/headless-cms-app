import { writeFileSync } from "node:fs";
// append ?populate=* to get all data including images
const url = "http://localhost:1337/api/reviews" + "?populate=*";
const response = await fetch(url);
const body = await response.json();
// stringify to read data 2nd arg is replacer, 3rd is space
const formatted = JSON.stringify(body, null, 2);
console.log(formatted);
const file = "scripts/strapi-response.json";
writeFileSync(file, formatted, "utf-8");
