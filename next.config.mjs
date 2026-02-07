/** @type {import('next').NextConfig} */
const nextConfig = {
      optimizeFonts: true,
      experimental: {
        optimizeCss: false,
      },

      reactStrictMode: true,
    
      images: {
        unoptimized: true,
        formats: [
          'image/avif',
          'image/webp'
        ],
    
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'cdn.example.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
        ],
      },
};

export default nextConfig;


