"use client";
import { ReactNode } from "react";
import { AppProvider } from "@/contexts/AppContext";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <AppProvider>{children}</AppProvider>;
};

export default layout;
