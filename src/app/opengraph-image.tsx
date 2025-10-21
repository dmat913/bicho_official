import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FC.Bicho Official Site",
    description:
      "FC.BICHOは、2005年に創設され、川口市を拠点に活動している社会人サッカーチームです。",
    openGraph: {
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "FC.Bicho Official Site",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
