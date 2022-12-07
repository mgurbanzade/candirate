/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/positions',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
