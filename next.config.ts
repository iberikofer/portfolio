import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: 'export',
    basePath: '/portfolio',
  }),
  reactStrictMode: true,
  allowedDevOrigins: ['26.162.146.190', 'localhost'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

