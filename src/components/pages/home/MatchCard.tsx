import DHorizontalLine from "@/components/elements/DHorizontalLine";
import BichoLogo from "@/public/bicho-icon.png";
import Image from "next/image";

const MatchCard = () => {
  return (
    <div className="w-full h-[300px] flex flex-col shadow-lg rounded-lg">
      <div className="flex items-center h-[64px] w-full bg-green-1 rounded-t-lg">
        <div className="flex flex-col justify-center items-center h-full w-[100px] border-r-[1px] border-line-1">
          <span className="text-white-1 font-bold text-2xl">10/13</span>
          <span className="text-white-1 text-sm">SUN</span>
        </div>
        <div className="flex flex-1 pl-4 flex-col">
          <span className="text-white-1">川口市民選手権</span>
          <span className="text-white-1 text-sm">二回戦</span>
        </div>
      </div>
      <div className="bg-white-2 p-4 flex flex-1 flex-col items-center justify-center rounded-b-lg">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Image src={BichoLogo} alt="" height={64} width={64} />
            <span className="text-gray-600">Bicho</span>
          </div>
          <div>
            <span className="text-green-1 font-bold text-3xl">2 - 3</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-[64px] h-[64px] rounded-full bg-gray-300" />
            <span className="text-gray-600">川口SC</span>
          </div>
        </div>
        <div className="mt-4 w-full">
          <DHorizontalLine />
          <div className="flex">
            <div className="bg-gray-400 text-xs flex items-center justify-center text-white-1 w-[60px]">
              <span>得点者</span>
            </div>
            <div className="flex flex-col pl-4">
              <span className="text-sm text-gray-500">11,榎本歩</span>
              <span className="text-sm text-gray-500">99,浅子太我</span>
            </div>
          </div>
          <DHorizontalLine />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
