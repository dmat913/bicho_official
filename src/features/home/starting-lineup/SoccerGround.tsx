"use client";
import React, { memo, useRef } from "react";
import styles from "./SoccerGround.module.css";
import { motion, useInView } from "framer-motion";
import PlayerCard from "./PlayerCard";
import YUUTOKAGAWA_IMG from "@/public/profile/YUUTOKAGAWA.png";
import SATHUKITAKISHIMA_IMG from "@/public/profile/SATHUKITAKISHIMA.png";
import UnknownImage from "@/public/profile/unknown.png";
import RIKUOONO_IMG from "@/public/profile/RIKUOONO.png";
import AYUMUENOMOTO_IMG from "@/public/profile/AYUMUENOMOTO.png";
import HIKARUIWASE_IMG from "@/public/profile/HIKARUIWASE.png";
import DAIKIYAMAGUCHI_IMG from "@/public/profile/DAIKIYAMAGUCHI.png";
import RYOUISHIKAWA_IMG from "@/public/profile/RYOUISHIKAWA.png";
import YUDAINAKATA_IMG from "@/public/profile/YUDAINAKATA.png";
import BackgroundGround from "@/public/backgroundGround.jpg";
import Image from "next/image";

const players = [
  {
    name: "SATHUKI",
    number: 28,
    position: "GK",
    imageUrl: SATHUKITAKISHIMA_IMG,
    styles: {
      left: "50%",
      transform: "translateX(-50%)",
      top: "14%",
      width: "48px",
      height: "66px",
    },
  },
  {
    name: "KAGAWA",
    number: 4,
    position: "CB",
    imageUrl: YUUTOKAGAWA_IMG,
    styles: { left: "26%", top: "20%", width: "56px", height: "76px" },
  },
  {
    name: "小飯田豪",
    number: 5,
    position: "CB",
    imageUrl: UnknownImage,
    styles: { right: "26%", top: "20%", width: "56px", height: "76px" },
  },
  {
    name: "石川靖人",
    number: 2,
    position: "RB",
    imageUrl: UnknownImage,
    styles: { left: "4%", top: "24%", width: "58px", height: "80px" },
  },
  {
    name: "大野莉久",
    number: 26,
    position: "RB",
    imageUrl: RIKUOONO_IMG,
    styles: { right: "4%", top: "24%", width: "58px", height: "80px" },
  },
  {
    name: "浅子太我",
    number: 41,
    position: "CDM",
    imageUrl: UnknownImage,
    styles: {
      left: "50%",
      transform: "translateX(-50%)",
      top: "36%",
      width: "58px",
      height: "82px",
    },
  },
  {
    name: "中田湧大",
    number: 8,
    position: "RCM",
    imageUrl: YUDAINAKATA_IMG,
    styles: { left: "23%", top: "44%", width: "60px", height: "86px" },
  },
  {
    name: "山口大貴",
    number: 17,
    position: "LCM",
    imageUrl: DAIKIYAMAGUCHI_IMG,
    styles: { right: "23%", top: "44%", width: "60px", height: "86px" },
  },
  {
    name: "岩瀬輝",
    number: 19,
    position: "LW",
    imageUrl: HIKARUIWASE_IMG,
    styles: { left: "2%", top: "60%", width: "66px", height: "94px" },
  },
  {
    name: "石川諒",
    number: 18,
    position: "RW",
    imageUrl: RYOUISHIKAWA_IMG,
    styles: { right: "2%", top: "60%", width: "66px", height: "94px" },
  },
  {
    name: "榎本歩夢",
    number: 11,
    position: "CF",
    imageUrl: AYUMUENOMOTO_IMG,
    styles: {
      left: "50%",
      transform: "translateX(-50%)",
      top: "66%",
      width: "70px",
      height: "100px",
    },
  },
];

const SoccerGround = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative overflow-hidden bg-noise-green-1 pt-10">
      <Image
        src={BackgroundGround}
        alt=""
        layout="fill"
        objectFit="cover"
        style={{ position: "absolute", top: 0, opacity: 0.4 }}
      />
      <div className="flex flex-col items-center">
        <motion.span
          ref={ref}
          className="text-gradient font-bold text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Starting 11
        </motion.span>
        <motion.span
          className="text-gradient font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Last Match
        </motion.span>
      </div>
      <div className={styles.groundWrapper}>
        <div className={styles.background}>
          <div className={styles.goalArea}></div>
          <div className={styles.penaltyArea}></div>
          <div className={styles.penaltyArc}></div>
          <div className={styles.centerLine}></div>
          <div className={styles.centerCircle}></div>
        </div>

        {players.map((player, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1,
              ease: "easeIn",
              delay: 0.4 + index * 0.2,
            }}
          >
            <PlayerCard
              name={player.name}
              number={String(player.number)}
              image={player.imageUrl}
              styles={player.styles}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default memo(SoccerGround);
