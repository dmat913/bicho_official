import React, { CSSProperties, memo } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface PlayerCardProps {
  name: string;
  number: number;
  position: string;
  styles: CSSProperties;
  imageUrl: StaticImageData;
}

const PlayerCard = ({ name, number, imageUrl, styles }: PlayerCardProps) => {
  return (
    <div
      className="absolute rounded-md flex items-center justify-center bg-custom-gradient"
      style={styles}
    >
      <Image
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover rounded-md"
      />
      <div>
        <span className="absolute top-1 left-1 text-xs text-white-1">
          {number}
        </span>
      </div>
    </div>
  );
};

export default memo(PlayerCard);
