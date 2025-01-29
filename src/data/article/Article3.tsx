import PickUpPhoto from "@/public/article/champion.jpeg";
import Photo1 from "@/public/article/article3-1.jpeg";
import Photo2 from "@/public/article/article3-2.jpeg";
import Photo3 from "@/public/article/article3-3.jpeg";
import Image from "next/image";

const Article3 = () => {
  return (
    <div className="flex flex-col p-4 w-full">
      <div className="flex flex-col gap-2 py-2 border-b border-green-1">
        <div className="flex items-center gap-2">
          <div className="w-12 h-6 rounded-sm bg-green-2 text-white-1 flex items-center justify-center">
            <span className="text-sm">News</span>
          </div>
          <span className="text-xs text-gray-2">2024年11月17日</span>
        </div>
        <span className="text-lg font-bold text-green-1">
          2024埼玉県南部ブロック決勝大会優勝のお知らせ
        </span>
      </div>
      <div className="py-4 flex flex-col gap-2 text-sm text-green-1 border-b border-green-1">
        <Image src={PickUpPhoto} alt="" className="border" />
        <span>
          2024年11月17日に開催されました「埼玉県南部ブロックリーグ決勝大会
          決勝戦 BICHO vs ほのぼのクラブ」<strong>0-0(PK5-3)</strong>
          の結果を持ちまして、2024年度南部ブロック決勝大会を
          <strong className="text-gold-1">優勝</strong>
          することが出来ました。
        </span>
        <span>
          これにより、2025年度より長年の目標であった県3部リーグへの
          <strong className="text-gold-1">昇格</strong>
          を果たすことが出来ました。
        </span>
        <span>
          大会を通じて1人1人が全てを出し切り、最後まで諦めず戦い抜くことが出来ました。
        </span>
        <span>
          来年度は10数年ぶりに、県3部リーグでの挑戦になります。今年度同様、全力を出し切り、目標に向かって全員で戦って行きたいと思います。
        </span>
      </div>
      <div className="py-4 flex flex-col gap-4">
        <b className="text-green-1 border-b border-green-1 pb-4">
          Match Report
        </b>
        <div className="flex flex-col gap-2 text-sm text-green-1 border-b border-dashed border-green-1 pb-4">
          <div className="flex flex-col">
            <span>2024/10/27 1回戦 vs 川口SC 1-1 (PK4-1)</span>
            <span>得点者: 17 山口大貴</span>
          </div>
          <Image src={Photo1} alt="" />
          <div className="flex flex-col">
            <span>
              相手は同じ川口市リーグ所属の川口SC。今年のリーグ戦では0-1で敗れており、ここ2年は勝てていない相性の悪い相手でした。
            </span>
            <span>
              立ち上がりから気持ちの入ったゲームとなり、お互いに譲らない一進一退の攻防が続きます。両チームとも決定的な場面を作れないまま前半が終了します。
            </span>
            <span>
              迎えた後半15分、<strong className="text-gold-1">先制点</strong>
              を奪います。
              左サイドのペナルティエリア角でフリーキックを獲得すると、4番・賀川のボールを17番・山口がヘディングで流し込みゴール。気持ちの入った得点で、一気にチームの雰囲気が高まります。
            </span>
            <span>
              しかし後半40分、右サイドを突破されクロスを上げられると、ヘディングシュートを決められてしまい、試合は振り出しに戻ります。その後は相手に押し込まれる展開が続きましたが、なんとか耐え抜き、試合はPK戦へともつれ込みました。
            </span>
            <span>
              PK戦ではBICHOが19番・岩瀬、15番・谷、7番・貫井と順調に成功させます。そして、28番・滝島が気迫の2本連続セーブを見せ、勝利に
              <strong className="text-gold-1">王手</strong>
              をかけました。4番手のキッカーはキャプテン賀川。決めたら勝利という中で冷静に右隅へと流し込み、1-1（PK4-1）で
              <strong className="text-gold-1">勝利</strong>を収めました
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-green-1 border-b border-dashed border-green-1 pb-4">
          <div className="flex flex-col">
            <span>2024/11/3 準決勝 vs 下落合FC 1-0</span>
            <span>得点者: 18 石川諒</span>
          </div>
          <Image src={Photo2} alt="" />
          <div className="flex flex-col">
            <span>
              対戦相手は、さいたま市北部リーグ1位の下落合FCです。初めての対戦で、お互いに情報がない状態での試合となりました。
            </span>
            <span>
              前半10分、18番・石川がドリブルで2人をかわし、キーパーと1対1の場面を迎えましたが、シュートはキーパーの正面へ。惜しくもゴールとはなりませんでしたが、シュートまで持ち込む場面が多く、良い立ち上がりとなりました。
            </span>
            <span>
              そして迎えた前半40分、
              <strong className="text-gold-1">先制点</strong>
              を奪います。左サイドのハーフライン付近でこぼれ球を拾った18番・石川がドリブルで運び、そのままペナルティエリア手前からクロスを上げると、ボールはそのままゴールへ吸い込まれ、待望の先制点となりました。
            </span>
            <span>
              後半に入ると、お互いに決定的なチャンスが増えましたが、なかなか追加点を奪えませんでした。しかし、4番・賀川を中心に粘り強く戦い、ギリギリのところで体を張ってゴールを死守。チーム全体で最後まで走り抜き、前半の1点を守り切って
              <strong className="text-gold-1">1-0で勝利</strong> を収めました。
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-green-1  pb-4">
          <div className="flex flex-col">
            <span>2024/11/17 決勝 vs ほのぼのクラブ 0-0(PK-5-3)</span>
          </div>
          <Image src={Photo3} alt="" />
          <div className="flex flex-col">
            <span>
              決勝の対戦相手は、戸田市リーグ1位のほのぼのクラブ。対戦成績はなく、勝てば優勝と県3部リーグ昇格が決まる一戦となりました。
            </span>
            <span>
              前半開始直後は相手にボールを持たれる時間が続くも、集中した守備で危ない場面はなし。中盤以降はBICHOが主導権を握り、17番・山口のパスから18番・石川が抜け出し、キーパーと1対1になるも足を滑らせ惜しくも得点とはならず。その後、11番・榎本のロングシュートがネットを揺らすも、オフサイドの判定でノーゴール。BICHOペースのまま前半を終えます。
            </span>
            <span>
              後半もBICHOが攻勢を続け、相手コートで試合を展開し続けます。9番・小林、15番・谷を投入して攻撃を厚くするも、決定力を欠き0-0のまま90分が終了し、勝負は1回戦と同様にPK戦へ突入します。
            </span>
            <span>
              BICHOの1番手・18番石川が冷静に左隅へ沈めます。相手の1番手は2度のやり直しを経るも、28番・滝島が3本連続でセーブ。続く19番・岩瀬、15番・谷、9番・小林も確実に決め、リードを守ります。相手も以降は全員が決め、食い下がりますが、BICHOの5番手が決めれば優勝という場面で、キッカーは1回戦同様にキャプテン賀川。冷静に右隅へ流し込み、0-0
              (PK5-3) で見事<strong>優勝</strong> を果たしました。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article3;
