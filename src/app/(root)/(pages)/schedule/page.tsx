"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { scheduleState } from "@/recoil/atom/schedule";
import React, { useEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import BichoLogo from "@/public/bicho-icon.png";
import { formatDate, getLogo } from "@/utils/date";
import DHorizontalLine from "@/components/elements/DHorizontalLine";
import Image from "next/image";

const SchedulePage = () => {
  const nextMatchRef = useRef<HTMLDivElement>(null);

  // 試合日程取得
  const schedules = useRecoilValue(scheduleState);
  const today = new Date();

  // 一番近い試合のindex
  const nextMatchIndex: number = useMemo(() => {
    if (schedules.length === 0) return -1;
    // 今日の日付を取得
    const today = new Date();
    // 未来の日程
    const closestIndex = schedules.findIndex((schedule) => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= today;
    });
    if (closestIndex === -1) return -1;
    return closestIndex;
  }, [schedules]);

  // マウント時に次の試合の位置までスクロール
  useEffect(() => {
    if (nextMatchRef.current && nextMatchIndex !== -1) {
      // スムーズスクロールのオプションを設定
      nextMatchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // eslint-disable-next-line
  }, [nextMatchIndex]);

  return (
    <div>
      <Header />
      <div className="p-4">
        {schedules.map((schedule, index) => (
          <div
            key={schedule._id}
            ref={index === nextMatchIndex ? nextMatchRef : null}
            className={`w-full py-4 border-t-2 ${
              index === nextMatchIndex ? "bg-blue-100" : "bg-white-2"
            } relative`}
          >
            {index === nextMatchIndex && (
              <span className="bg-green-1 text-white-1 px-2 py-1 font-bold  text-sm absolute top-1 left-0">
                NEXT
              </span>
            )}
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
                <div className="flex items-center gap-2 mt-2 w-[100px]">
                  {getLogo(schedule.teamName) !== "" ? (
                    <Image
                      src={getLogo(schedule.teamName)}
                      alt=""
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
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
                      <div className="pl-4">
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
