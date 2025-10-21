"use client";
import HomeLoading from "@/features/home/loading/HomeLoading";
import { AnimatePresence, motion } from "framer-motion";

const loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-10 bg-noise-green-3 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.8 }}
      >
        <HomeLoading />
      </motion.div>
    </AnimatePresence>
  );
};

export default loading;
