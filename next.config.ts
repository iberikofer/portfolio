import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/portfolio' : '',
  reactStrictMode: true,
  allowedDevOrigins: ['26.162.146.190', 'localhost'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
