// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// メタデータの設定
export const metadata: Metadata = {
  title: "Bicho Official",
  description: "Bicho",
  keywords: [
    "Bicho",
    "official",
    "website",
    "社会人",
    "サッカー",
    "社会人サッカー",
    "埼玉県社会人サッカー",
    "埼玉県3部",
  ],
  openGraph: {
    title: "FC.Bicho Official Site",
    description:
      "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。",
    url: "https://bicho-official.vercel.app",
    siteName: "Bicho Official",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FC.Bicho Official Site",
    description:
      "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Dmat" />
        <meta name="robots" content="index, follow" />
      </head>
      <body>{children}</body>
    </html>
  );
}
