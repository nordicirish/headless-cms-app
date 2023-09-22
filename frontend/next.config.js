/** @type {import('next').NextConfig} */

module.exports = {
  // output: "export",
  // specify hostname and port of your Strapi backend server to load images from it
  images: {
    remotePatterns: [toRemotePattern(process.env.CMS_IMAGE_PATTERN)],
  },
};
// 
function toRemotePattern(urlString) {
  const url = new URL(urlString);
  return {
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
}
