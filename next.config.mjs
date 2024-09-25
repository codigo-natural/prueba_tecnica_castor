/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 't.scdn.co',
        pathname: '/images/**',
      }
    ]
  }
};

export default nextConfig;
