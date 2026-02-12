// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// メタデータの設定
export const metadata: Metadata = {
  metadataBase: new URL("https://bicho-official.vercel.app"),
  title: {
    default: "FC.BICHO Official Site - 川口市の社会人サッカーチーム",
    template: "%s | FC.BICHO",
  },
  description:
    "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。埼玉県社会人サッカーリーグ3部所属。試合日程、チーム情報、写真ギャラリーを掲載。",
  applicationName: "FC.BICHO Official Site",
  keywords: [
    "FC.BICHO",
    "FC BICHO",
    "ビーチョ",
    "サッカー",
    "社会人サッカー",
    "川口市",
    "埼玉県",
    "社会人サッカーリーグ",
    "埼玉県3部",
    "サッカーチーム",
    "フットボール",
    "スポーツ",
    "地域スポーツ",
    "アマチュアサッカー",
    "試合日程",
    "リーグ戦",
    "選手紹介",
  ],
  authors: [{ name: "FC.BICHO", url: "https://bicho-official.vercel.app" }],
  creator: "FC.BICHO",
  publisher: "FC.BICHO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "FC.BICHO Official Site - 川口市の社会人サッカーチーム",
    description:
      "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。埼玉県社会人サッカーリーグ3部所属。試合日程、チーム情報、写真ギャラリーを掲載。",
    url: "https://bicho-official.vercel.app",
    siteName: "FC.BICHO Official Site",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://bicho-official.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FC.BICHO - 川口市の社会人サッカーチーム集合写真",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FC.BICHO Official Site - 川口市の社会人サッカーチーム",
    description:
      "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。埼玉県社会人サッカーリーグ3部所属。",
    images: ["https://bicho-official.vercel.app/og-image.jpg"],
    creator: "@FC_BICHO",
  },
  verification: {
    google: "googlef24988d19a190633",
  },
  alternates: {
    canonical: "https://bicho-official.vercel.app",
  },
  category: "sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="FC.Bicho" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bicho-official.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsTeam",
              name: "FC.Bicho",
              alternateName: "Bicho",
              description:
                "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。",
              foundingDate: "2005",
              sport: "サッカー",
              address: {
                "@type": "PostalAddress",
                addressLocality: "川口市",
                addressRegion: "埼玉県",
                addressCountry: "JP",
              },
              url: "https://bicho-official.vercel.app",
              logo: "https://bicho-official.vercel.app/bicho-icon.png",
              memberOf: {
                "@type": "SportsOrganization",
                name: "埼玉県社会人サッカーリーグ",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>{children}</body>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </html>
  );
}
