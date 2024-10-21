"use client";
import { RecoilRoot } from "recoil";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default layout;
