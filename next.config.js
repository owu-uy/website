require("dotenv").config();

module.exports = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/keystatic/[[...params]]": ["./content/**/*"],
      "/keystatic": ["./content/**/*"],
      "/api/keystatic/[...params]": ["./content/**/*"],
      "/la-meetup": ["./content/**/*"],
    },
  },
};
