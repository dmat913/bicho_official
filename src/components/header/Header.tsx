import Image from "next/image";
import React from "react";
import BichoLogo from "@/public/bicho-icon.png";
import Link from "next/link";

const Header = () => {
  return (
    <Link
      href="/home"
      className="flex items-center justify-center gap-1 bg-green-1 py-2 border-b border-slate-600"
    >
      <Image src={BichoLogo} alt="Logo" width={40} height={40} />
      <span className="text-white-1 text-lg lg:text-2xl font-bold">BICHO</span>
    </Link>
  );
};

export default Header;
