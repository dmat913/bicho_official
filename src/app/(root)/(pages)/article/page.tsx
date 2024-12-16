"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import PickUpPhoto from "@/public/article/champion.jpeg";
import Image from "next/image";

const NewsPage = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col p-4 w-full">
        <div className="flex flex-col gap-2 py-2 border-b border-green-1">
          <div className="flex items-center gap-2">
            <span className="text-xs block p-1 bg-green-2 text-white-1 rounded-sm">
              NEWS
            </span>
            <span className="text-xs text-gray-2">2024年11月17日</span>
          </div>
          <span className="text-lg font-bold text-green-1">
            2024埼玉県南部ブロック決勝大会優勝のお知らせ
          </span>
        </div>
        <div className="py-4 flex flex-col gap-2 text-sm text-green-1 border-b border-dashed border-green-1">
          <Image src={PickUpPhoto} alt="" className="border" />
          <span>
            2024年11月17日に開催されました「埼玉県南部ブロックリーグ決勝大会
            決勝戦 BICHO vs ほのぼのクラブ」の試合にて、 0-0(PK5-3)
            の結果を持ちまして、2024年度南部ブロック決勝大会を
            <strong className="text-gold-1">優勝</strong>することが出来ました。
          </span>
          <span>
            この結果を受けまして、2025年度より長年の目標であった県3部リーグへの
            <strong className="text-gold-1">昇格</strong>
            を果たすことが出来ました。
          </span>
          <span>
            大会を通じて1人1人が全てを出し切り、最後まで諦めず戦い抜くことが出来ました。
          </span>
          <span>
            来年度は10数年ぶりに、県3部リーグでの挑戦になります。今年度同様、全力を出し切り目標に向かって、全員で戦って行きたいと思います。
          </span>
        </div>
        <div className="flex flex-col gap-2 text-xs text-green-1 py-4">
          <div className="flex flex-col">
            <span>1回戦 2024/10/27 vs 川口SC 1-1 (PK4-1)</span>
            <span>得点者: 17 山口大貴</span>
          </div>
          <div className="flex flex-col">
            <span>準決勝 2024/11/3 vs 下落合FC 1-0</span>
            <span>得点者: 18 石川諒</span>
          </div>
          <div className="flex flex-col">
            <span>決勝 2024/11/17 vs ほのぼのクラブ 0-0(PK-5-3)</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
