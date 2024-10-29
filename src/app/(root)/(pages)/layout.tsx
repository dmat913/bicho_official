"use client";
import { imagesState } from "@/recoil/atom/image";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const images = useRecoilValue(imagesState);

  useEffect(() => {
    if (images.length === 0) {
      router.push("/");
    }
    // eslint-disable-next-line
  }, [images]);
  return <div className="w-full h-full">{images.length > 0 && children}</div>;
};

export default Layout;
