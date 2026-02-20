import { Metadata } from "next";

const SITE_URL = "https://bicho-official.vercel.app";
const SITE_NAME = "FC.BICHO Official Site";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * 各ページのメタデータを生成するユーティリティ関数
 */
export function generateSEO({
  title,
  description,
  path = "",
  ogImage = OG_IMAGE,
  keywords = [],
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes("FC.BICHO") ? title : `${title} | FC.BICHO`;

  const defaultKeywords = [
    "BICHO",
    "埼玉県社会人サッカー",
    "川口市社会人サッカー",
    "FCBICHO",
    "サッカーチーム",
    "サッカー",
    "フットサル",
    "社会人サッカー",
    "募集",
    "選手募集",
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ja_JP",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - FC.BICHO`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * パンくずリスト用の構造化データを生成
 */
export function generateBreadcrumbLD(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

interface StructuredDataProps {
  type: "article" | "schedule" | "profile" | "team-data";
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  imageUrl?: string;
}

export function generateStructuredData(props: StructuredDataProps) {
  const baseUrl = SITE_URL;

  switch (props.type) {
    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: props.title || "FC.BICHOニュース",
        description: props.description || "FC.BICHOの最新情報をお届けします。",
        image: props.imageUrl || OG_IMAGE,
        author: {
          "@type": "Organization",
          name: "FC.BICHO",
        },
        publisher: {
          "@type": "Organization",
          name: "FC.BICHO",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/bicho-icon.png`,
          },
        },
        datePublished: props.date || new Date().toISOString(),
        dateModified: props.date || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/article`,
        },
      };

    case "schedule":
      return {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: props.title || "FC.BICHO 試合",
        description: props.description || "FC.BICHOの試合情報",
        startDate: props.date,
        location: {
          "@type": "Place",
          name: props.location || "未定",
          address: {
            "@type": "PostalAddress",
            addressRegion: "埼玉県",
            addressCountry: "JP",
          },
        },
        homeTeam: {
          "@type": "SportsTeam",
          name: "FC.BICHO",
        },
        sport: "サッカー",
        organizer: {
          "@type": "SportsOrganization",
          name: "埼玉県社会人サッカーリーグ",
        },
      };

    case "profile":
      return {
        "@context": "https://schema.org",
        "@type": "SportsTeam",
        name: "FC.BICHO",
        alternateName: "BICHO",
        sport: "サッカー",
        description:
          "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。",
        foundingDate: "2005",
        memberOf: {
          "@type": "SportsOrganization",
          name: "埼玉県社会人サッカーリーグ",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "川口市",
          addressRegion: "埼玉県",
          addressCountry: "JP",
        },
        url: baseUrl,
        logo: `${baseUrl}/bicho-icon.png`,
      };

    case "team-data":
      return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "FC.BICHOチームデータ",
        description:
          "FC.BICHOのチーム統計、得点ランキング、アシストランキング、年齢分布などの分析データ",
        creator: {
          "@type": "Organization",
          name: "FC.BICHO",
        },
        keywords: [
          "サッカー",
          "統計",
          "チームデータ",
          "分析",
          "得点",
          "アシスト",
        ],
      };

    default:
      return null;
  }
}
