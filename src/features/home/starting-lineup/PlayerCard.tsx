import Image, { StaticImageData } from "next/image";
import { CSSProperties } from "react";
import BICHOLOGO from "@/public/bicho-icon.png";

interface PlayerCardProps {
  number: string;
  name: string;
  image: StaticImageData;
  styles: CSSProperties;
}

export default function PlayerCard({
  number,
  name,
  image,
  styles,
}: PlayerCardProps) {
  return (
    <div className="absolute" style={styles}>
      <div className="relative w-full h-full">
        {/* Card Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl transform rotate-[1deg]" />

        {/* Main Card Content */}
        <div className="relative h-full flex flex-col items-center">
          {/* Top Section */}
          <div className="w-full flex justify-between items-start">
            <span className="absolute top-1 left-1 text-xs font-bold text-white-1">
              {number}.
            </span>
          </div>

          {/* Player Image Container */}
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Bottom Flags */}
          <div className="absolute top-1 right-1 flex gap-2 text-lg">
            <Image src={BICHOLOGO} alt="" width={16} height={16} />
          </div>
        </div>

        {/* Decorative Border */}
        <div className="absolute inset-0 border-2 border-green-500/20 rounded-2xl" />
        <div className="absolute inset-0 border border-green-500/10 rounded-xl transform rotate-[2deg]" />
      </div>
    </div>
  );
}
