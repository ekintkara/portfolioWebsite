/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'http://localhost:5002',
    generateRobotsTxt: true, // (optional)
    // ...other options
  }