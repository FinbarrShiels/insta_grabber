/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    INSTAGRAM_API_KEY: process.env.INSTAGRAM_API_KEY,
    INSTAGRAM_API_HOST: process.env.INSTAGRAM_API_HOST,
  },
};

module.exports = nextConfig; 