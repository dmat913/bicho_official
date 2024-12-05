"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import {
  scheduleState,
  updateTargetScheduleState,
} from "@/recoil/atom/schedule";
import { useRecoilValue, useSetRecoilState } from "recoil";
import BichoLogo from "@/public/bicho-icon.png";
import { formatDate, getLogo } from "@/utils/date";
import DHorizontalLine from "@/components/elements/DHorizontalLine";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { ScheduleData } from "@/types/schedule";

const SchedulePage = () => {
  const router = useRouter();

  // 日程更新対象
  const setUpdateTargetSchedule = useSetRecoilState(updateTargetScheduleState);

  // 試合日程取得
  const schedules = useRecoilValue(scheduleState);
  const today = new Date();

  // 編集アイコン押下時
  const handleClickEditButton = (schedule: ScheduleData) => {
    setUpdateTargetSchedule(schedule);
    router.push("/admin/schedule/edit");
  };

  return (
    <div>
      <Header />
      <div className="p-4 relative">
        <div className="flex justify-end">
          <button
            className="bg-green-1 text-white-1 py-2 px-4 rounded"
            onClick={() => router.push("/admin/schedule/create")}
          >
            新規作成
          </button>
        </div>
        {schedules.map((schedule) => (
          <div key={schedule._id} className={`w-full py-4 border-t-2 relative`}>
            <BiEdit size={24} onClick={() => handleClickEditButton(schedule)} />
            <div className="flex flex-col items-center">
              <span className="text-md">{schedule.title}</span>
              <span className="text-sm">{schedule.description}</span>
            </div>
            <div className="text-text-1 text-sm mt-2">
              <div className="flex items-center justify-between px-4">
                <span>{formatDate(schedule.date, schedule.kickoffTime)}</span>
                <a>
                  <span>{schedule.location}</span>
                </a>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 w-[100px] justify-end">
                  <span>Bicho</span>
                  <Image src={BichoLogo} alt="" width={48} height={48} />
                </div>
                <div className="flex flex-col text-green-1">
                  <span className="text-3xl font-bold">
                    {schedule.result !== "" ? schedule.result : "VS"}
                  </span>
                  {schedule.pk && schedule.pk !== "" && (
                    <span className="text-xs">Pk: {schedule.pk}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2 w-[100px]">
                  {getLogo(schedule.teamName) !== "" ? (
                    <Image
                      src={getLogo(schedule.teamName)}
                      alt=""
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full bg-gray-300" />
                  )}
                  <div>
                    <span className="text-sm">{schedule.teamName}</span>
                  </div>
                </div>
              </div>
              {new Date(schedule.date) < today &&
                schedule.scorer.length > 0 && (
                  <div className="mt-4 w-full">
                    <DHorizontalLine />
                    <div className="flex">
                      <div className="bg-gray-400 text-xs flex items-center justify-center text-white-1 w-[60px]">
                        <span>得点者</span>
                      </div>
                      <div className="flex pl-4">
                        {schedule.scorer.map((row, index) => (
                          <span key={index} className="text-sm text-gray-500">
                            {row}
                            {schedule.scorer.length - 1 !== index && ","}
                          </span>
                        ))}
                      </div>
                    </div>
                    <DHorizontalLine />
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePage;
