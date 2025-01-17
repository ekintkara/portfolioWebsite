/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

const withSitemap = async () => {
  const { default: sitemap } = await import('next-sitemap');
  return sitemap({
    ...nextConfig,
    siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    generateRobotsTxt: true, // Generate robots.txt file
  });
};

module.exports = withSitemap();
