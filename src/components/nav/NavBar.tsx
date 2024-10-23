import React from "react";
import { IoMdPhotos } from "react-icons/io";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-green-1 shadow-lg">
      <ul className="flex">
        <li className="flex flex-1 items-center justify-center focus:bg-green-2 active:bg-green-2 transition-colors duration-200 py-2">
          <Link
            href="/photoList"
            className="flex flex-col items-center justify-center"
          >
            <IoMdPhotos color="white" className="w-[24px] h-[24px]" />
            <span className="text-white-1">Photo</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
