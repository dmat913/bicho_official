"use client";

import {
  ArticleH2,
  ArticleP,
  ArticleSection,
} from "@/features/article/components/ArticleParts";

export default function Post1() {
  return (
    <>
      <ArticleSection>
        <ArticleP>
          2024年度全国クラブチームサッカー選手権が、6/2(日)に開催されました。
          大雨によりコイントスでの決着でしたが、残念ながら敗戦となりました。
        </ArticleP>
        <ArticleP>
          ただ、一回戦では格上のチームを相手に、粘り強い戦いができ勝利を収めることが出来ました。
        </ArticleP>
        <ArticleP>
          この経験を無駄にはせず、今年度必ず県3部リーグへの昇格という目標を果たしたいと思います。
        </ArticleP>
      </ArticleSection>

      <ArticleSection>
        <ArticleH2>試合結果</ArticleH2>

        {/* 1回戦 */}
        <div className="bg-green-50 p-6 rounded-xl border border-green-100 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
            <div>
              <span className="inline-block bg-green-500 text-white-1 px-3 py-1 rounded-full text-xs font-bold mb-1">
                1回戦
              </span>
              <p className="text-sm text-neutral-500">2024/5/17</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-neutral-800">
                FC.BICHO vs 深谷クラブ
              </h3>
              <p className="text-2xl font-black text-green-600">
                1 - 1{" "}
                <span className="text-base text-neutral-500 font-normal">
                  (PK 4-2)
                </span>{" "}
                ⚪️
              </p>
            </div>
          </div>
          <p className="text-center md:text-right text-sm text-neutral-600 mt-2 border-t border-green-200 pt-2">
            得点者: 18 石川諒
          </p>
        </div>

        {/* 2回戦 */}
        <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
            <div>
              <span className="inline-block bg-neutral-500 text-white-1 px-3 py-1 rounded-full text-xs font-bold mb-1">
                2回戦
              </span>
              <p className="text-sm text-neutral-500">2024/6/2</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg text-neutral-800">
                FC.BICHO vs 川口朝日FC
              </h3>
              <p className="text-xl font-bold text-neutral-500">
                コイントス敗戦 💔
              </p>
            </div>
          </div>
        </div>
      </ArticleSection>
    </>
  );
}
