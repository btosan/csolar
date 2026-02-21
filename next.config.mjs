/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false,
  },
  turbopack: {
    resolveAlias: {},   // keep your aliases here if you add any later
  },

  reactStrictMode: true,

  images: {
    qualities: [75, 100],
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      // Cloudinary – FIXED version
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dibsqsrei/**',   // ← change to this (or '/**' if you have multiple clouds)
      },

      // Keep the others if you're actually using them
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;