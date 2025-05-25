import PickUpPhoto from "@/public/article/ club2024.jpeg";
import Image from "next/image";

const Article1 = () => {
  return (
    <div className="flex flex-col p-4 w-full">
      <div className="flex flex-col gap-2 py-2 border-b border-green-1">
        <div className="flex items-center gap-2">
          <div className="w-12 h-6 rounded-sm bg-green-2 text-white-1 flex items-center justify-center">
            <span className="text-sm px-2 py-1">NEWS</span>
          </div>
          <span className="text-xs text-gray-2">2024年6月2日</span>
        </div>
        <span className="text-lg font-bold text-green-1">
          2024年度全国クラブチームサッカー選手権,結果のお知らせ
        </span>
      </div>
      <div className="py-4 flex flex-col gap-2 text-sm text-green-1 border-b border-dashed border-green-1">
        <Image src={PickUpPhoto} alt="" className="border object-cover h-80 " />
        <span>
          2024年度全国クラブチームサッカー選手権が, 6/2(日)に開催されました。
          大雨によりコイントスでの決着でしたが、残念ながら敗戦となりました。
        </span>
        <span>
          ただ、一回戦では格上のチームを相手に、粘り強い戦いができ勝利を収めることが出来ました。
        </span>
        <span>
          この経験を無駄にはせず、今年度必ず県3部リーグへの昇格という目標を果たしたいと思います。
        </span>
      </div>
      <div className="flex flex-col gap-2 text-xs text-green-1 py-4">
        <div className="flex flex-col">
          <span>1回戦 2024/5/17 vs 深谷クラブ 1-1 (PK4-2)</span>
          <span>得点者: 18 石川諒</span>
        </div>
        <div className="flex flex-col">
          <span>2回戦 2024/6/2 vs 川口朝日FC コイントス負け</span>
        </div>
      </div>
    </div>
  );
};

export default Article1;
