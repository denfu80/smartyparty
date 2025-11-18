/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_COMMIT_HASH: process.env.NEXT_PUBLIC_COMMIT_HASH || 'development',
  },
};

export default nextConfig;
