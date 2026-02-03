import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import {
  defenders,
  forwards,
  goalkeepers,
  midfielders,
} from "@/features/profile/data/profile";
import ProfileCard from "@/features/profile/profile-card/ProfileCard";

// セクションヘッダーコンポーネント
const SectionHeader = ({
  simpleTitle,
  jaTitle,
  enTitle,
}: {
  simpleTitle: string;
  jaTitle: string;
  enTitle: string;
}) => (
  <div className="relative py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden w-full">
    {/* 背景装飾 */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span
        className="text-[6rem] md:text-[10rem] font-black text-white/[0.03] tracking-tighter leading-none italic select-none whitespace-nowrap"
        style={{ fontFamily: "sans-serif" }}
      >
        {enTitle}
      </span>
    </div>

    {/* メインタイトル */}
    <div className="relative z-10 text-center">
      <div className="flex flex-col items-center">
        <h2
          className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600 italic tracking-tighter mb-2 drop-shadow-lg"
          style={{ fontFamily: "sans-serif" }}
        >
          {simpleTitle}
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-green-500 to-transparent mb-3 opacity-50"></div>
        <p className="text-neutral-400 text-xs md:text-sm font-bold tracking-[0.4em] uppercase pl-1">
          {jaTitle}
        </p>
      </div>
    </div>
  </div>
);

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 relative selection:bg-green-500/30 selection:text-green-200">
      {/* ページ全体の背景パターン */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-neutral-950 to-neutral-950"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      <Header />

      <main className="relative z-10 pt-[104px] pb-20 px-4 md:px-8 max-w-[1920px] mx-auto">
        {/* GOALKEEPER */}
        <section className="mb-12">
          <SectionHeader
            simpleTitle="GK"
            jaTitle="ゴールキーパー"
            enTitle="GOALKEEPER"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 w-full max-w-7xl mx-auto">
            {goalkeepers.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </section>

        {/* DEFENDER */}
        <section className="mb-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green-900/20 to-transparent mb-8"></div>
          <SectionHeader
            simpleTitle="DF"
            jaTitle="ディフェンダー"
            enTitle="DEFENDER"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 w-full max-w-7xl mx-auto">
            {defenders.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </section>

        {/* MIDFIELDER */}
        <section className="mb-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green-900/20 to-transparent mb-8"></div>
          <SectionHeader
            simpleTitle="MF"
            jaTitle="ミッドフィルダー"
            enTitle="MIDFIELDER"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 w-full max-w-7xl mx-auto">
            {midfielders.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </section>

        {/* FORWARD */}
        <section className="mb-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green-900/20 to-transparent mb-8"></div>
          <SectionHeader
            simpleTitle="FW"
            jaTitle="フォワード"
            enTitle="FORWARD"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 w-full max-w-7xl mx-auto">
            {forwards.map((row, index) => (
              <ProfileCard profile={row} key={index} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
