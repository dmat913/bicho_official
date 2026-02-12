"use client";

import PickUpPhoto from "@/public/article/champion.jpeg";
import Photo1 from "@/public/article/article3-1.jpeg";
import Photo2 from "@/public/article/article3-2.jpeg";
import Photo3 from "@/public/article/article3-3.jpeg";
import Image from "next/image";
import { motion } from "framer-motion";
import Tournament from "@/features/home/tournament/Tournament";

const Article3 = () => {
  const matchReports = [
    {
      title: "1回戦 vs 川口SC",
      date: "2024/10/27",
      result: "1-1 (PK4-1)",
      scorer: "17 山口大貴",
      image: Photo1,
      content: [
        "相手は同じ川口市リーグ所属の川口SC。今年のリーグ戦では0-1で敗れており、ここ2年は勝てていない相性の悪い相手でした。",
        "立ち上がりから気持ちの入ったゲームとなり、お互いに譲らない一進一退の攻防が続きます。両チームとも決定的な場面を作れないまま前半が終了します。",
        "迎えた後半15分、先制点を奪います。左サイドのペナルティエリア角でフリーキックを獲得すると、4番・賀川のボールを17番・山口がヘディングで流し込みゴール。気持ちの入った得点で、一気にチームの雰囲気が高まります。",
        "しかし後半40分、右サイドを突破されクロスを上げられると、ヘディングシュートを決められてしまい、試合は振り出しに戻ります。その後は相手に押し込まれる展開が続きましたが、なんとか耐え抜き、試合はPK戦へともつれ込みました。",
        "PK戦ではBICHOが19番・岩瀬、15番・谷、7番・貫井と順調に成功させます。そして、28番・滝島が気迫の2本連続セーブを見せ、勝利に王手をかけました。4番手のキッカーはキャプテン賀川。決めたら勝利という中で冷静に右隅へと流し込み、1-1（PK4-1）で勝利を収めました",
      ],
    },
    {
      title: "準決勝 vs 下落合FC",
      date: "2024/11/3",
      result: "1-0",
      scorer: "18 石川諒",
      image: Photo2,
      content: [
        "対戦相手は、さいたま市北部リーグ1位の下落合FCです。初めての対戦で、お互いに情報がない状態での試合となりました。",
        "前半10分、18番・石川がドリブルで2人をかわし、キーパーと1対1の場面を迎えましたが、シュートはキーパーの正面へ。惜しくもゴールとはなりませんでしたが、シュートまで持ち込む場面が多く、良い立ち上がりとなりました。",
        "そして迎えた前半40分、先制点を奪います。左サイドのハーフライン付近でこぼれ球を拾った18番・石川がドリブルで運び、そのままペナルティエリア手前からクロスを上げると、ボールはそのままゴールへ吸い込まれ、待望の先制点となりました。",
        "後半に入ると、お互いに決定的なチャンスが増えましたが、なかなか追加点を奪えませんでした。しかし、4番・賀川を中心に粘り強く戦い、ギリギリのところで体を張ってゴールを死守。チーム全体で最後まで走り抜き、前半の1点を守り切って1-0で勝利を収めました。",
      ],
    },
    {
      title: "決勝 vs ほのぼのクラブ",
      date: "2024/11/17",
      result: "0-0(PK5-3)",
      scorer: "",
      image: Photo3,
      content: [
        "決勝の対戦相手は、戸田市リーグ1位のほのぼのクラブ。対戦成績はなく、勝てば優勝と県3部リーグ昇格が決まる一戦となりました。",
        "前半開始直後は相手にボールを持たれる時間が続くも、集中した守備で危ない場面はなし。中盤以降はBICHOが主導権を握り、17番・山口のパスから18番・石川が抜け出し、キーパーと1対1になるも足を滑らせ惜しくも得点とはならず。その後、11番・榎本のロングシュートがネットを揺らすも、オフサイドの判定でノーゴール。BICHOペースのまま前半を終えます。",
        "後半もBICHOが攻勢を続け、相手コートで試合を展開し続けます。9番・小林、15番・谷を投入して攻撃を厚くするも、決定力を欠き0-0のまま90分が終了し、勝負は1回戦と同様にPK戦へ突入します。",
        "BICHOの1番手・18番石川が冷静に左隅へ沈めます。相手の1番手は2度のやり直しを経るも、28番・滝島が3本連続でセーブ。続く19番・岩瀬、15番・谷、9番・小林も確実に決め、リードを守ります。相手も以降は全員が決め、食い下がりますが、BICHOの5番手が決めれば優勝という場面で、キッカーは1回戦同様にキャプテン賀川。冷静に右隅へ流し込み、0-0 (PK5-3) で見事優勝を果たしました。",
      ],
    },
  ];

  return (
    <div className="relative w-full px-4 pt-8 pb-16 bg-gradient-to-br from-neutral-50 via-green-50 to-accent-gold/10 min-h-screen">
      {/* 特別な背景装飾 */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-accent-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        {/* 優勝ヘッダー */}
        <motion.div
          className="bg-gradient-to-r from-accent-gold to-yellow-400 rounded-3xl shadow-2xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 text-center">
            {/* 優勝アイコン */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white-1/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-4xl">🏆</span>
              </div>
            </div>

            {/* メタ情報 */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1 bg-white-1/20 backdrop-blur-sm text-white-2 px-4 py-2 rounded-full text-sm font-bold">
                <span>📰</span>
                NEWS
              </span>
              <span className="text-white-1/80 text-sm">2024年11月17日</span>
            </div>

            {/* タイトル */}
            <h1 className="text-3xl lg:text-4xl font-black text-white-2 leading-tight mb-4">
              🎉 優勝のお知らせ 🎉
            </h1>
            <p className="text-xl text-white-1/90 font-semibold">
              2024埼玉県南部ブロック決勝大会優勝
            </p>
          </div>
        </motion.div>

        {/* メイン画像 */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative h-64 md:h-96">
            <Image
              src={PickUpPhoto}
              alt="優勝写真"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-1/40 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* 記事本文 */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p className="text-lg">
                2024年11月17日に開催されました「埼玉県南部ブロックリーグ決勝大会
                決勝戦 BICHO vs ほのぼのクラブ」
                <strong className="text-accent-gold">0-0(PK5-3)</strong>
                の結果を持ちまして、2024年度南部ブロック決勝大会を
                <strong className="text-accent-gold text-xl">🏆 優勝 🏆</strong>
                することが出来ました。
              </p>

              <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-2xl p-6">
                <p className="text-xl font-bold text-accent-gold mb-2">
                  🎊 県3部リーグ昇格決定！ 🎊
                </p>
                <p className="text-neutral-700">
                  これにより、2025年度より長年の目標であった県3部リーグへの
                  <strong className="text-accent-gold">昇格</strong>
                  を果たすことが出来ました。
                </p>
              </div>

              <p>
                大会を通じて1人1人が全てを出し切り、最後まで諦めず戦い抜くことが出来ました。
              </p>

              <p>
                来年度は10数年ぶりに、県3部リーグでの挑戦になります。今年度同様、全力を出し切り、目標に向かって全員で戦って行きたいと思います。
              </p>
            </div>
          </div>
        </motion.div>

        {/* トーナメント表 */}
        <Tournament />

        {/* マッチレポート */}
        <motion.div
          className="bg-white-1 rounded-3xl shadow-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-accent-gold rounded-full"></div>
            Match Report
            <span className="text-lg">⚽</span>
          </h2>

          <div className="space-y-12">
            {matchReports.map((match, index) => (
              <motion.div
                key={index}
                className="border-b border-neutral-200 last:border-b-0 pb-12 last:pb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
              >
                {/* 試合ヘッダー */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-green-700 mb-2">
                        {match.title}
                      </h3>
                      <p className="text-sm text-neutral-600">{match.date}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        {match.result}
                      </div>
                      {match.scorer && (
                        <div className="text-sm text-neutral-600">
                          得点者: {match.scorer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 試合画像 */}
                <div className="mb-6">
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                    <Image
                      src={match.image}
                      alt={match.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black-1/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* 試合内容 */}
                <div className="space-y-4">
                  {match.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-neutral-700 leading-relaxed"
                    >
                      {paragraph
                        .split(/(\b(?:先制点|王手|勝利|優勝)\b)/)
                        .map((part, partIndex) => {
                          if (
                            ["先制点", "王手", "勝利", "優勝"].includes(part)
                          ) {
                            return (
                              <strong
                                key={partIndex}
                                className="text-accent-gold"
                              >
                                {part}
                              </strong>
                            );
                          }
                          return part;
                        })}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Article3;
