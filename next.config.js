/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        /*  port: '',
        pathname: '/images/anime/4/19644.webp', */
      },
    ],
  },
};

module.exports = nextConfig;
