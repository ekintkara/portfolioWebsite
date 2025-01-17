/** @type {import('next').NextConfig} */
const withSitemap = require('next-sitemap')

const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = withSitemap({
  ...nextConfig,
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true, // Generate robots.txt file
})
