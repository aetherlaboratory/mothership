/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    allowedDevOrigins: ['http://192.168.1.185:3000'],
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mothership.wordifysites.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
