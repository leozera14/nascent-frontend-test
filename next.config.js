/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/orderbook/:path*",
        destination: "http://localhost:3001/orderbook/:path*",
      },
      {
        source: "/trade",
        destination: "http://localhost:3001/trade",
      },
    ];
  },
};

module.exports = nextConfig;
