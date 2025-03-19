import { memo } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdLeaderboard, MdOutlinePhotoCamera } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";

// navバー表示アイテム
const navItems = [
  {
    id: "game-schedule",
    label: "Schedule",
    icon: <AiOutlineCalendar color="white" className="w-7 h-7" />,
  },
  {
    id: "photo",
    label: "Photo",
    icon: <MdOutlinePhotoCamera color="white" className="w-7 h-7" />,
  },
  {
    id: "tournament",
    label: "Tournament",
    icon: <FaTrophy color="white" className="w-7 h-7" />,
  },
  {
    id: "league-table",
    label: "League Table",
    icon: <MdLeaderboard color="white" className="w-7 h-7" />,
  },
];

const NavBar = () => {
  // navバーの高さ,スクロール用
  const NAVBAR_HEIGHT = 64;

  // navアイテム押下時
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // 対象の要素の位置を取得
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      // スクロール位置を調整して、ナビバーの高さ分を引く
      window.scrollTo({
        top: elementPosition - NAVBAR_HEIGHT,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-green-1 via-noise-green-3 to-green-3 shadow-2xl sticky top-0 z-40 h-16">
      <ul className="flex h-full">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleScroll(item.id)}
            className="flex flex-1 flex-col items-center justify-center cursor-pointer hover:bg-green-2 transition-colors duration-200 h-full"
          >
            {item.icon}
            <span className="text-white-1 text-xs">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(NavBar);
