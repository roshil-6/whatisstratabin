/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "procreator.design",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "banner2.cleanpng.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
