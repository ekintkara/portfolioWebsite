/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true, // robots.txt dosyasını oluştur
  changefreq: 'daily',
  priority: 0.7,
};
