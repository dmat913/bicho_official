"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Article1 from "@/data/article/Article1";
import Article2 from "@/data/article/Article2";
import Article3 from "@/data/article/Article3";
import Article4 from "@/data/article/Article4";

import { useSearchParams } from "next/navigation";

const NewsPage = () => {
  const searchParams = useSearchParams();
  const articleNo = searchParams.get("no");

  return (
    <div className="w-full">
      <Header />
      <div className="pt-20">
        {articleNo === "1" && <Article1 />}
        {articleNo === "2" && <Article2 />}
        {articleNo === "3" && <Article3 />}
        {articleNo === "4" && <Article4 />}
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
