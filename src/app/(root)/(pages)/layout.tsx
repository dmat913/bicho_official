"use client";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { imagesState } from "@/recoil/atom/image";
import { useRouter } from "next/navigation";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // Recoil の atom の状態を取得
  const images = useRecoilValue(imagesState);
  const router = useRouter();

  useEffect(() => {
    // images が空の場合、/ に遷移
    if (images.length === 0) {
      router.push("/");
    }
  }, [images, router]);

  return <>{images.length > 0 && children}</>;
};

export default Layout;
