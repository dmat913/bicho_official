"use client";
import React, { memo, useRef } from "react";
import styles from "./SoccerGround.module.css";
import { motion, useInView } from "framer-motion";
import PlayerCard from "./PlayerCard";
import BackgroundGround from "@/public/backgroundGround.jpg";
import Image from "next/image";
// import { FOUR_THREE_THREE } from "@/data/formation/4-3-3";
import { FOUR_THREE_ONE_TWO } from "@/data/formation/4-3-1-2";

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

        {FOUR_THREE_ONE_TWO.map((player, index) => (
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
