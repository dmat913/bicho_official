// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// メタデータの設定
export const metadata: Metadata = {
  title: "Bicho Official",
  description: "Bicho",
  keywords: ["Bicho", "official", "website"],
  openGraph: {
    title: "Bicho Official",
    description: "Welcome to the official Bicho site.",
    url: "https://bicho-official.vercel.app",
    siteName: "Bicho Official",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bicho Official",
    description: "Bicho's official site on the web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
