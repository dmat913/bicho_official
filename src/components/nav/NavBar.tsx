import React from "react";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const NavBar = () => {
  return (
    <nav className="bg-green-1 shadow-lg">
      <ul className="flex">
        <li className="flex flex-1 items-center justify-center focus:bg-green-2 active:bg-green-2 transition-colors duration-200 py-2">
          <Link
            href="/schedule"
            className="flex flex-col items-center justify-center"
          >
            <CiCalendarDate color="white" className="w-[28px] h-[28px]" />
            <span className="text-white-1 text-sm">schedule</span>
          </Link>
        </li>
        <li className="flex flex-1 items-center justify-center focus:bg-green-2 active:bg-green-2 transition-colors duration-200 py-2">
          <Link
            href="/photo"
            className="flex flex-col items-center justify-center"
          >
            <MdOutlineAddPhotoAlternate
              color="white"
              className="w-[28px] h-[28px]"
            />
            <span className="text-white-1 text-sm">photo</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
