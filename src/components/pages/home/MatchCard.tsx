import DHorizontalLine from "@/components/elements/DHorizontalLine";
import BichoLogo from "@/public/bicho-icon.png";
import { ScheduleData } from "@/types/schedule";
import Image from "next/image";

const MatchCard = ({ schedule }: { schedule: ScheduleData }) => {
  return (
    <div className="w-full h-[300px] flex flex-col shadow-lg rounded-lg">
      <div className="flex items-center h-[64px] w-full bg-green-3 rounded-t-lg">
        <div className="flex flex-col justify-center items-center h-full w-[100px] border-r-[1px] border-line-1">
          <span className="text-white-1 font-bold text-2xl">
            {new Date(schedule.date).toLocaleDateString("ja-JP", {
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
          <span className="text-white-1 text-sm">SUN</span>
        </div>
        <div className="flex flex-1 pl-4 flex-col">
          <span className="text-white-1">{schedule.title}</span>
          <span className="text-white-1 text-sm">{schedule.description}</span>
        </div>
      </div>
      <div className="bg-white-2 p-4 flex flex-1 flex-col items-center justify-center rounded-b-lg">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-2 w-[80px]">
            <Image src={BichoLogo} alt="" height={64} width={64} />
            <span className="text-md text-gray-600">Bicho</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {schedule.result ? (
              <span className="text-green-1 font-bold text-5xl">
                {schedule.result}
              </span>
            ) : (
              <span className="text-4xl text-green-1 font-bold">VS</span>
            )}
            <span className="text-xs text-gray-500">
              {schedule.kickoffTime}/{schedule.location}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 w-[80px]">
            <div className="w-[64px] h-[64px] rounded-full bg-gray-300" />
            <span className="text-gray-600 text-sm">{schedule.teamName}</span>
          </div>
        </div>
        {new Date(schedule.date) < new Date() && schedule.scorer.length > 0 && (
          <div className="mt-4 w-full">
            <DHorizontalLine />
            <div className="flex">
              <div className="bg-gray-400 text-xs flex items-center justify-center text-white-1 w-[60px]">
                <span>得点者</span>
              </div>
              <div className="flex flex-col pl-4">
                {schedule.scorer.map((row, index) => (
                  <span key={index} className="text-sm text-gray-500">
                    {row}
                  </span>
                ))}
              </div>
            </div>
            <DHorizontalLine />
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
