"use client";
import { useState } from "react";
import { ReactNode } from "react";
import Image from "next/image";
import BichoLogo from "@/public/bicho-icon.png";
import { motion, AnimatePresence } from "framer-motion";
import { MdLockOutline, MdArrowForward } from "react-icons/md";

const Layout = ({ children }: { children: ReactNode }) => {
  // 入力password
  const [password, setPassword] = useState<string>("");
  // 認証flag
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  // エラー状態
  const [isError, setIsError] = useState<boolean>(false);

  // 確認ボタン押下時
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsError(false);
    } else {
      setIsError(true);
      // エラー表示を一定時間後に消す
      setTimeout(() => setIsError(false), 2000);
    }
  };

  return (
    <div className="w-full h-full min-h-screen">
      <AnimatePresence mode="wait">
        {isAuthenticated ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-green-900 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="bg-white-1/10 backdrop-blur-xl border border-white-1/20 p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden"
            >
              {/* 背景の装飾 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

              <div className="flex flex-col items-center mb-8 relative z-10">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-24 h-24 bg-white-1 p-3 rounded-2xl shadow-xl mb-6 flex items-center justify-center ring-4 ring-white-1/10"
                >
                  <Image
                    src={BichoLogo}
                    alt="FC.BICHO Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-white-1 tracking-wider text-center"
                >
                  ADMIN CONSOLE
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-green-100/70 text-sm mt-2 font-medium"
                >
                  管理者用パスワードを入力してください
                </motion.p>
              </div>

              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-6 relative z-10"
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MdLockOutline
                      className={`text-xl transition-colors duration-300 ${isError ? "text-red-300" : "text-green-200 group-focus-within:text-green-400"}`}
                    />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsError(false);
                    }}
                    placeholder="Password"
                    className={`w-full pl-12 pr-4 py-4 bg-black-1 border-2 rounded-xl text-white-1 placeholder-white-1/30 outline-none transition-all duration-300
                      ${
                        isError
                          ? "border-red-500/50 focus:border-red-500 bg-red-500/10"
                          : "border-white-1/10 focus:border-green-400 focus:bg-black/30 hover:border-white-1/20"
                      }`}
                    autoFocus
                  />

                  {/* アニメーションするボーダー (Option) */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-400 transition-all duration-300 ${isError ? "w-full" : "w-0"}`}
                  />
                </div>

                <AnimatePresence>
                  {isError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-red-300 text-sm text-center font-bold bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                        パスワードが間違っています
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!password}
                  className="w-full group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white-1 font-bold py-4 rounded-xl shadow-lg shadow-green-900/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="tracking-wide">LOGIN</span>
                  <MdArrowForward className="group-hover:translate-x-1 transition-transform text-lg" />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
