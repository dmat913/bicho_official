import { useRouter } from "next/navigation";
import React, { memo } from "react";
import { FaAngleRight } from "react-icons/fa";

const DMoreButton = ({ path }: { path: string }) => {
  const router = useRouter();

  // ボタン押下時画面遷移
  const handleClick = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-r from-green-3 to-green-2 w-full text-white-1 font-bold relative rounded-full py-2 px-6 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg active:shadow-none transition-all duration-300"
    >
      MORE
      <FaAngleRight
        className="transition-transform group-active:translate-x-4"
        size={20}
      />
    </button>
  );
};

export default memo(DMoreButton);
