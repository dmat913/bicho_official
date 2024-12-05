"use client";
import { useState } from "react";
import { ReactNode } from "react";
import Image from "next/image";
import BichoLogo from "@/public/bicho-icon.png";

const Layout = ({ children }: { children: ReactNode }) => {
  // 入力password
  const [password, setPassword] = useState<string>("");
  // 認証flag
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 簡易的なパスワードの確認
  const correctPassword = "bicho1111";

  // 確認ボタン押下時
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("パスワードが間違っています");
    }
  };

  return (
    <div className="w-full h-full">
      {isAuthenticated ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 bg-noise-green-3 w-full h-[100svh]">
          <Image src={BichoLogo} alt="Loading Icon" height={100} width={100} />
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="p-2 border border-gray-400 rounded"
              autoFocus
            />
            <button
              type="submit"
              className="bg-green-3 text-white-1 py-2 px-4 rounded active:bg-green-1 transition"
            >
              確認
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Layout;
