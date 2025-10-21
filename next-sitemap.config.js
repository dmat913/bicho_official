// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://bicho-official.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/api/*"],
  additionalPaths: async () => {
    const additionalPaths = [
      // 静的ページ
      {
        loc: "/",
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/schedule",
        changefreq: "daily",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/profile",
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/data",
        changefreq: "weekly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: "/article",
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      },
    ];

    // 記事の動的ページを追加
    const articleNumbers = [1, 2, 3]; // 実際の記事数に応じて調整
    articleNumbers.forEach((num) => {
      additionalPaths.push({
        loc: `/article?no=${num}`,
        changefreq: "monthly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });

    return additionalPaths;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    additionalSitemaps: ["https://bicho-official.vercel.app/sitemap.xml"],
  },
  transform: async (config, path) => {
    // カスタム変換ロジック
    const customPriority = {
      "/": 1.0,
      "/schedule": 0.9,
      "/profile": 0.8,
      "/data": 0.7,
      "/article": 0.6,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: customPriority[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};

module.exports = config;
