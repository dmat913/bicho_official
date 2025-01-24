"use client";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import {
  defenders,
  forwards,
  goalkeepers,
  midfielders,
} from "@/features/profile/data/profile";
import ProfileCard from "@/features/profile/profile-card/ProfileCard";

const ProfilePage = () => {
  return (
    <div className="bg-white-2">
      <Header />
      <div className="flex flex-col">
        <div className="flex flex-col border-b-2 border-b-green-1 border-dotted pb-4">
          <div className="flex flex-col gap-2 items-center justify-center py-5">
            <span className="text-green-1 text-4xl font-bold">GK</span>
            <span className="font-semibold text-green-1">ゴールキーパー</span>
          </div>
          <div className="flex flex-wrap gap-2 p-2 w-full">
            {goalkeepers.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col border-b-2 border-b-green-1 border-dotted pb-4">
          <div className="flex flex-col gap-2 items-center justify-center py-5">
            <span className="text-green-1 text-4xl font-bold">DF</span>
            <span className="font-semibold text-green-1">ディフェンダー</span>
          </div>
          <div className="flex flex-wrap gap-2 p-2 w-full">
            {defenders.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col border-b-2 border-b-green-1 border-dotted pb-4">
          <div className="flex flex-col gap-2 items-center justify-center py-5">
            <span className="text-green-1 text-4xl font-bold">MF</span>
            <span className="font-semibold text-green-1">ミッドフィルダー</span>
          </div>
          <div className="flex flex-wrap gap-2 p-2 w-full">
            {midfielders.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col pb-4">
          <div className="flex flex-col gap-2 items-center justify-center py-5">
            <span className="text-green-1 text-4xl font-bold">FW</span>
            <span className="font-semibold text-green-1">フォワード</span>
          </div>
          <div className="flex flex-wrap gap-2 p-2 w-full">
            {forwards.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
