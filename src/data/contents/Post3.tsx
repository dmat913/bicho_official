"use client";

import {
  ArticleH2,
  ArticleH3,
  ArticleP,
  ArticleSection,
} from "@/features/article/components/ArticleParts";
import Image from "next/image";

// 画像のパスは public フォルダからの相対パスとして指定するか、importする
// ここでは一旦文字列パスとして扱い、next/image に渡す際には静的インポートではなく文字列として渡す想定だが、
// publicフォルダにあるなら `/article/...` でアクセス可能。
// もしビルド時に最適化したいならimportが必要だが、動的コンテンツとしての柔軟性を優先しパス文字列にする手もある。
// しかし、Article3.tsxでimportしていたので、ここでもimportする形が安全。

import Photo1 from "@/public/article/article3-1.jpeg";
import Photo2 from "@/public/article/article3-2.jpeg";
import Photo3 from "@/public/article/article3-3.jpeg";

export default function Post3() {
  return (
    <>
      <ArticleSection>
        <ArticleP>
          10月から行われた埼玉県南部地区ブロックリーグ決勝大会において、
          見事優勝を果たし、来季からの埼玉県3部リーグへの昇格が決定いたしました。
        </ArticleP>
        <ArticleP>たくさんのご声援、本当にありがとうございました。</ArticleP>
      </ArticleSection>

      <ArticleSection>
        <ArticleH2>大会レポート</ArticleH2>

        <div className="space-y-12">
          {/* 1回戦 */}
          <article>
            <ArticleH3>1回戦 vs 川口SC</ArticleH3>
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-md">
                <Image
                  src={Photo1}
                  alt="vs 川口SC"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <p className="font-bold text-neutral-800 border-b border-neutral-200 pb-2 mb-2">
                    試合結果
                  </p>
                  <div className="flex justify-between items-center mb-1">
                    <span>スコア</span>
                    <span className="font-bold text-xl">
                      1 - 1{" "}
                      <span className="text-sm font-normal text-neutral-500">
                        (PK 4-1)
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-neutral-600">
                    <span>得点者</span>
                    <span>17 山口大貴</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 text-right">
                    2024/10/27
                  </div>
                </div>
              </div>
            </div>
            <ArticleP>
              相手は同じ川口市リーグ所属の川口SC。今年のリーグ戦では0-1で敗れており、ここ2年は勝てていない相性の悪い相手でした。
            </ArticleP>
            <ArticleP>
              立ち上がりから気持ちの入ったゲームとなり、お互いに譲らない一進一退の攻防が続きます。両チームとも決定的な場面を作れないまま前半が終了します。
            </ArticleP>
            <ArticleP>
              迎えた後半15分、先制点を奪います。左サイドのペナルティエリア角でフリーキックを獲得すると、4番・賀川のボールを17番・山口がヘディングで流し込みゴール。気持ちの入った得点で、一気にチームの雰囲気が高まります。
            </ArticleP>
            <ArticleP>
              しかし後半40分、右サイドを突破されクロスを上げられると、ヘディングシュートを決められてしまい、試合は振り出しに戻ります。その後は相手に押し込まれる展開が続きましたが、なんとか耐え抜き、試合はPK戦へともつれ込みました。
            </ArticleP>
            <ArticleP>
              PK戦ではBICHOが19番・岩瀬、15番・谷、7番・貫井と順調に成功させます。そして、28番・滝島が気迫の2本連続セーブを見せ、勝利に王手をかけました。4番手のキッカーはキャプテン賀川。決めたら勝利という中で冷静に右隅へと流し込み、1-1（PK4-1）で勝利を収めました。
            </ArticleP>
          </article>

          {/* 準決勝 */}
          <article>
            <ArticleH3>準決勝 vs 下落合FC</ArticleH3>
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-md">
                <Image
                  src={Photo2}
                  alt="vs 下落合FC"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <p className="font-bold text-neutral-800 border-b border-neutral-200 pb-2 mb-2">
                    試合結果
                  </p>
                  <div className="flex justify-between items-center mb-1">
                    <span>スコア</span>
                    <span className="font-bold text-xl">1 - 0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-neutral-600">
                    <span>得点者</span>
                    <span>19 岩瀬輝</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 text-right">
                    2024/11/3
                  </div>
                </div>
              </div>
            </div>
            <ArticleP>
              準決勝の相手はさいたま市リーグ1位の下落合FC。勝てば県リーグ参入戦への出場権が得られる大一番です。
            </ArticleP>
            <ArticleP>
              前半は相手にボールを持たれる時間が長く我慢の展開となります。それでも全員で体を張り、決定機を作らせません。
              すると前半終了間際、相手の一瞬の隙きを突き、ロングボールに抜け出した19番・岩瀬がGKとの1対1を冷静に制し先制点を奪います。
            </ArticleP>
            <ArticleP>
              後半に入ると相手の攻撃がさらに激しさを増しますが、GK滝島を中心とした守備陣が集中力を切らさず対応。
              カウンターから追加点のチャンスも作りましたが決めきれず、そのまま1-0で勝利。
            </ArticleP>
            <ArticleP>
              この勝利により、決勝進出と同時に県リーグ参入戦への出場権を獲得しました。
            </ArticleP>
          </article>

          {/* 決勝 */}
          <article>
            <ArticleH3>決勝 vs F.C.C.O</ArticleH3>
            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-md">
                <Image
                  src={Photo3}
                  alt="vs F.C.C.O"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="bg-neutral-100 p-4 rounded-lg">
                  <p className="font-bold text-neutral-800 border-b border-neutral-200 pb-2 mb-2">
                    試合結果
                  </p>
                  <div className="flex justify-between items-center mb-1">
                    <span>スコア</span>
                    <span className="font-bold text-xl">1 - 0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-neutral-600">
                    <span>得点者</span>
                    <span>18 石川諒</span>
                  </div>
                  <div className="text-xs text-neutral-400 mt-2 text-right">
                    2024/11/17
                  </div>
                </div>
              </div>
            </div>
            <ArticleP>
              決勝戦の相手はF.C.C.O。お互いに県リーグ昇格を決めているものの、タイトルをかけた負けられない戦いです。
            </ArticleP>
            <ArticleP>
              試合は序盤から激しい球際の攻防となります。前半20分、コーナーキックの流れから18番・石川が押し込み先制に成功します。
            </ArticleP>
            <ArticleP>
              後半は相手の猛攻を受けますが、この大会を通じて安定感抜群の守備陣が最後までゴールを割らせません。
              試合終了のホイッスルとともに歓喜の輪が広がりました。
            </ArticleP>
            <ArticleP>
              創設以来の悲願であった県リーグ昇格、そして南部ブロック優勝という最高の形でシーズンを締めくくることができました。
            </ArticleP>
          </article>
        </div>
      </ArticleSection>
    </>
  );
}
