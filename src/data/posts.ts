import { StaticImageData } from "next/image";
import Post1 from "./contents/Post1";
import Post2 from "./contents/Post2";
import Post3 from "./contents/Post3";
import Post4 from "./contents/Post4";

// Images
import img1 from "@/public/article/ club2024.jpeg";
import img2 from "@/public/article/league2024.jpeg";
import img3 from "@/public/article/champion.jpeg";
import img4 from "@/public/article/league2025.jpeg";

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  category: "Match" | "News" | "Team";
  thumbnail: string | StaticImageData;
  description: string;
  component: React.ComponentType;
};

export const blogPosts: BlogPost[] = [
  {
    id: "4",
    title: "2025年度埼玉県3部リーグ優勝",
    date: "2025-10-05",
    category: "Match",
    thumbnail: img4,
    description:
      "FC.BICHOが2025年度埼玉県3部リーグで見事優勝を果たしました！悲願の3部リーグ制覇！",
    component: Post4,
  },
  {
    id: "3",
    title: "2024年度埼玉県南部ブロック決勝大会優勝",
    date: "2024-11-17",
    category: "Match",
    thumbnail: img3,
    description:
      "FC.BICHOが2024年度埼玉県南部地区ブロックリーグ決勝大会で優勝！",
    component: Post3,
  },
  {
    id: "2",
    title: "2024年度川口市リーグ 結果報告",
    date: "2024-10-08",
    category: "Match",
    thumbnail: img2,
    description: "2024年度川口市リーグの結果をお知らせします。",
    component: Post2,
  },
  {
    id: "1",
    title: "2024年度全国クラブチームサッカー選手権 結果",
    date: "2024-06-02",
    category: "Match",
    thumbnail: img1,
    description:
      "2024年度全国クラブチームサッカー選手権の結果をお知らせします。",
    component: Post1,
  },
];

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};
