import { motion, useInView } from "framer-motion";
import React, { memo, useRef } from "react";
import PickUpPhoto from "@/public/article/champion.jpeg";
import Image from "next/image";
import Link from "next/link";

const Article = () => {
  // 画面に入ったかどうかを監視するための参照
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col items-center mb-4">
        {/* アニメーションを適用する要素 */}
        <motion.span
          ref={ref}
          className="text-green-1 font-bold text-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          NEWS
        </motion.span>
        <motion.span
          className="text-green-1 font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ニュース/お知らせ
        </motion.span>
      </div>
      <div>
        <Link href={"/article?no=3"} className="flex flex-col gap-2">
          <Image src={PickUpPhoto} alt="" className="w-full border" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs block py-1 px-2 bg-gold-1 text-green-4 rounded-sm">
                PICK UP
              </span>
              <span className="text-xs block py-1 px-2 bg-green-2 text-white-1 rounded-sm">
                NEWS
              </span>
              <span className="text-xs text-gray-2">2024年11月17日</span>
            </div>
            <span className="text-sm">
              2024年度埼玉県南部ブロック決勝大会,結果のお知らせ
            </span>
          </div>
        </Link>
      </div>
      <div className="mt-4 border-t">
        <Link href={"/article?no=2"} className="flex flex-col py-2 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xs block py-1 px-2 bg-green-2 text-white-1 rounded-sm">
              NEWS
            </span>
            <span className="text-xs text-gray-2">2024年10月8日</span>
          </div>
          <div>
            <span className="text-sm">
              2024年度川口市リーグ, 結果のお知らせ
            </span>
          </div>
        </Link>
        <Link href={"/article?no=1"} className="flex flex-col py-2 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xs block py-1 px-2 bg-green-2 text-white-1 rounded-sm">
              NEWS
            </span>
            <span className="text-xs text-gray-2">2024年6月2日</span>
          </div>
          <div>
            <span className="text-sm">
              2024年度全国クラブチームサッカー選手権,結果のお知らせ
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default memo(Article);
