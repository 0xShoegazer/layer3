import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mg.reservoir.tools',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
