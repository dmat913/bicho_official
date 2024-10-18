import Image from "next/image";
import React from "react";
import BichoLogo from "@/public/bicho-icon.png";
import InstagramLogo from "@/public/instagram.webp";
import YoutubeLogo from "@/public/youtube.png";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-green-1 py-2 px-10">
      <div className="flex items-center gap-2">
        <Image src={BichoLogo} alt="Logo" width={40} height={40} />
        <span className="text-white text-lg lg:text-2xl">BICHO</span>
      </div>
      <div className="flex items-center gap-2 lg:gap-5">
        <a href="https://www.instagram.com/fc_bicho" target="_blank">
          <Image
            src={InstagramLogo}
            alt="Instagram Logo"
            width={32}
            height={32}
          />
        </a>
        <a href="https://www.youtube.com/@MAN-rw5zg" target="_blank">
          <Image src={YoutubeLogo} alt="Youtube Logo" width={32} height={32} />
        </a>
      </div>
    </div>
  );
};

export default Header;
