"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { scheduleState } from "@/recoil/atom/schedule";
import React from "react";
import { useRecoilValue } from "recoil";
import BichoLogo from "@/public/bicho-icon.png";
import { formatDate } from "@/utils/date";
import DHorizontalLine from "@/components/elements/DHorizontalLine";
import Image from "next/image";

const SchedulePage = () => {
  // 試合日程取得
  const schedules = useRecoilValue(scheduleState);
  const today = new Date();

  return (
    <div>
      <Header />
      <div className="p-4">
        {schedules.map((schedule) => {
          const isFutureMatch = new Date(schedule.date) > today;
          return (
            <div
              key={schedule._id}
              className={`w-full py-4 border-t-2 ${
                isFutureMatch ? "bg-blue-100" : "bg-white-2"
              } relative`}
            >
              {isFutureMatch && (
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
                  <span className="text-3xl font-bold">
                    {schedule.result !== "" ? schedule.result : "VS"}
                  </span>
                  <div className="flex items-center gap-1 mt-2 w-[100px]">
                    {schedule.thumbnail ? (
                      <Image
                        src={schedule.thumbnail}
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
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePage;
