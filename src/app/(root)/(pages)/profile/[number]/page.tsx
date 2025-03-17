"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { ProfileDetailState } from "@/recoil/atom/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

const PlayerDetailPage = () => {
  const router = useRouter();

  const profileDetail = useRecoilValue(ProfileDetailState);

  // 戻るボタン押下時
  const handleBackPage = () => {
    router.back();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {profileDetail ? (
        <div className="flex flex-col p-2 pb-4 gap-4">
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-lg">{profileDetail.number}</span>
              <span className="text-lg">{profileDetail.name}</span>
            </div>
            <span className="text-sm">{profileDetail.position}</span>
          </div>
          <div className="flex gap-1 items-center overflow-x-auto">
            {profileDetail.detail?.images.map((profile, index) => (
              <Image
                key={index}
                src={profile}
                alt=""
                className="w-full h-52 object-cover rounded-md border"
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {profileDetail.detail?.competitionData.map(
                (competition, index) => (
                  <div key={index}>
                    <span className="text-xs font-bold">
                      {competition.competition}
                    </span>
                    <table className="w-full bg-white-2 rounded-sm">
                      <thead className="border-b">
                        <tr className="uppercase tracking-wider text-black-1 text-sm border-b border-gray-300">
                          <th className="p-2 text-[10px]">年</th>
                          <th className="p-2 text-[10px]">試合数</th>
                          <th className="p-2 text-[10px]">得点</th>
                          <th className="p-2 text-[10px]">アシスト</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competition.contents.map((row, index) => (
                          <tr
                            key={index}
                            className={`border-b border-gray-300 text-center text-sm`}
                          >
                            <td className="p-2 text-[10px]">{row.year}</td>
                            <td className="p-2 text-[10px]">{row.gameCount}</td>
                            <td className="p-2 text-[10px]">{row.goal}</td>
                            <td className="p-2 text-[10px]">{row.assist}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div>
          <button
            onClick={handleBackPage}
            className="bg-green-3 text-white-1 py-2 px-4 rounded active:bg-green-1 transition"
          >
            戻る
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col flex-1 gap-6">
          <span>選手データが見つかりません。</span>
          <button
            onClick={handleBackPage}
            className="bg-green-3 text-white-1 py-2 px-4 rounded active:bg-green-1 transition"
          >
            戻る
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PlayerDetailPage;
