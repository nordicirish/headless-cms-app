/** @type {import('next').NextConfig} */
module.exports = {
  // output: "export",
  // specify hostname and port of your Strapi backend server to load images from it
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};
