import Image from "next/image";
import React from "react";
import InstagramLogo from "@/public/instagram.webp";
import YoutubeLogo from "@/public/youtube.png";
import { IoMdPhotos } from "react-icons/io";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-green-1  shadow-lg">
      <ul className="flex">
        <li className="flex flex-1 items-center justify-center focus:bg-green-2 active:bg-green-2 transition-colors duration-200 py-2">
          <a
            href="https://www.instagram.com/fc_bicho"
            target="_blank"
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={InstagramLogo}
              alt="InstagramLogo"
              width={24}
              height={24}
            />
            <span className="text-white-1">Instagram</span>
          </a>
        </li>
        <li className="flex flex-1 items-center justify-center focus:bg-green-2 active:bg-green-2 transition-colors duration-200 py-2">
          <a
            href="https://www.youtube.com/@MAN-rw5zg"
            target="_blank"
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={YoutubeLogo}
              alt="Youtube Logo"
              width={24}
              height={24}
            />
            <span className="text-white-1">Youtube</span>
          </a>
        </li>
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
