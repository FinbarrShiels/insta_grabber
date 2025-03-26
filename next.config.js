/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['instagrab.download'],
  },
  env: {
    INSTAGRAM_API_KEY: process.env.INSTAGRAM_API_KEY,
    INSTAGRAM_API_HOST: process.env.INSTAGRAM_API_HOST,
  },
};

module.exports = nextConfig; 