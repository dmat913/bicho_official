interface StructuredDataProps {
  type: "article" | "schedule" | "profile" | "team-data";
  title?: string;
  description?: string;
  date?: string;
  location?: string;
}

export function generateStructuredData(props: StructuredDataProps) {
  const baseUrl = "https://bicho-official.vercel.app";

  switch (props.type) {
    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: props.title || "FC.Bichoニュース",
        description: props.description,
        author: {
          "@type": "Organization",
          name: "FC.Bicho",
        },
        publisher: {
          "@type": "Organization",
          name: "FC.Bicho",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/bicho-icon.png`,
          },
        },
        datePublished: props.date || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/article`,
        },
      };

    case "schedule":
      return {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: props.title || "FC.Bicho 試合",
        description: props.description,
        startDate: props.date,
        location: {
          "@type": "Place",
          name: props.location,
        },
        homeTeam: {
          "@type": "SportsTeam",
          name: "FC.Bicho",
        },
        sport: "サッカー",
        organizer: {
          "@type": "Organization",
          name: "埼玉県社会人サッカーリーグ",
        },
      };

    case "profile":
      return {
        "@context": "https://schema.org",
        "@type": "SportsTeam",
        name: "FC.Bicho",
        sport: "サッカー",
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
      };

    case "team-data":
      return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "FC.Bichoチームデータ",
        description: "FC.BICHOのチーム統計と分析データ",
        creator: {
          "@type": "Organization",
          name: "FC.Bicho",
        },
        keywords: ["サッカー", "統計", "チームデータ", "分析"],
      };

    default:
      return null;
  }
}
