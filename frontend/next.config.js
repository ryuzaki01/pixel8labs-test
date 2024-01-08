/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/octocat',
        permanent: true,
      }
    ];
  },
}

module.exports = nextConfig
