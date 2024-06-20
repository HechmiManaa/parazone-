/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.parazone.tn",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.parafendri.tn",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.maparatunisie.tn",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lecoinpara.tn",
        pathname: "**",
      },
    ], // Allows Next.js Image Optimization to load images from this domain
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // Applies headers to all API routes
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" }, // Allows credentials to be included in requests
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allows all origins to access the resources (may not be ideal for production)
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          }, // Specifies the allowed HTTP methods
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization",
          }, // Specifies the allowed headers
        ],
      },
    ];
  },
};

export default nextConfig;
