"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Profile } from "@/types/profile";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { ProfileDetailState } from "@/recoil/atom/profile";

const ProfileCard = ({ profile }: { profile: Profile }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // 表示領域に入ったら一度だけアニメーション

  const router = useRouter();
  const setProfileDetail = useSetRecoilState(ProfileDetailState);

  // profile押下時
  const handleClickProfile = () => {
    if (profile.detail) {
      router.push(`/profile/${profile.number}`);
      setProfileDetail(profile);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-custom-gradient text-white-1 rounded-md flex items-center justify-center 
        w-profile-width-default lg:w-lg-profile-width p-4"
      onClick={handleClickProfile}
    >
      <span className="absolute top-2 left-2 font-bold text-3xl">
        {profile.number}
      </span>
      {profile.img ? (
        <Image src={profile.img} alt="" className="h-[45svh] object-cover" />
      ) : (
        <span>Now Printing</span>
      )}
      <div className="absolute bottom-0 left-0 pl-2 pb-2 flex flex-col font-bold w-full">
        <span className="text-md">{profile.name}</span>
        <span className="text-sm">{profile.englishName}</span>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
