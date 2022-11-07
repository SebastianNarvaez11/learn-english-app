/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media4.giphy.com', 'https://images.unsplash.com']
  }
}

module.exports = nextConfig
