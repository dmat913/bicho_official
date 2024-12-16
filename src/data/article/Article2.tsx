import PickUpPhoto from "@/public/article/league2024.jpeg";
import Image from "next/image";

const Article2 = () => {
  return (
    <div className="flex flex-col p-4 w-full">
      <div className="flex flex-col gap-2 py-2 border-b border-green-1">
        <div className="flex items-center gap-2">
          <span className="text-xs block p-1 bg-green-2 text-white-1 rounded-sm">
            NEWS
          </span>
          <span className="text-xs text-gray-2">2024年10月6日</span>
        </div>
        <span className="text-lg font-bold text-green-1">
          2024年度川口市リーグ結果のお知らせ
        </span>
      </div>
      <div className="py-4 flex flex-col gap-2 text-sm text-green-1 border-b border-dashed border-green-1">
        <Image
          src={PickUpPhoto}
          alt=""
          className="border object-contain h-full"
        />
        <span>
          2024年度川口市リーグは、2位という結果に終わりました。
          最終節勝利すれば優勝という状況でしたが、雨により中止となりました。ただこの結果により、2024年度埼玉県南部ブロックリーグ決勝大会への進出を決定しました。
        </span>
        <span>
          初戦は10/27。相手は同リーグチャンピオン川口SCです。難しい試合になることが予想されます。本番まで残り3週間、目標に向けて全力で準備します。
        </span>
      </div>
      <div className="flex flex-col gap-2 text-xs text-green-1 py-4">
        <div className="flex flex-col">
          <span>1節 2024/3/17 vs 川口SC ×0-1</span>
        </div>
        <div className="flex flex-col">
          <span>2節 2024/4/7 vs S・F・C ○3-0</span>
          <span>得点者: 11 榎本歩夢,18 石川諒×2</span>
        </div>
        <div className="flex flex-col">
          <span>3節 2024/4/21 vs HGC ○2-1</span>
          <span>得点者: 15 谷侑樹,4 賀川優斗</span>
        </div>
        <div className="flex flex-col">
          <span>4節 2024/9/8 vs 川口朝日クラブ ○1-0</span>
          <span>得点者: 8 中田湧大</span>
        </div>
        <div className="flex flex-col">
          <span>5節 2024/9/15 vs 埼玉パスポットFC ○1-0</span>
          <span>得点者: 18 石川諒</span>
        </div>
        <div className="flex flex-col">
          <span>6節 2024/10/6 vs 川口FCセカンド △0-0(雨天中止)</span>
        </div>
      </div>
    </div>
  );
};

export default Article2;
