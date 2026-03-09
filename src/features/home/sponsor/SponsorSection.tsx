import { motion } from "framer-motion";
import { sponsors } from "@/data/sponsors";
import Image from "next/image";

const SponsorSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse [animation-delay:4s]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 opacity-50 animate-pulse" />
              <p className="relative text-sm font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent px-4 py-2">
                Official Club Partner
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"
          />
        </motion.div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index, duration: 0.8, type: "spring" }}
              className="group"
            >
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  {/* グロー効果 - モバイルは常時表示、デスクトップはホバー時 */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 rounded-3xl blur-2xl opacity-75 md:opacity-0 md:group-hover:opacity-75 transition-all duration-700 md:group-hover:duration-200 animate-gradient-x" />

                  {/* メインカード */}
                  <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-blue-500/50 md:border-slate-700/50 md:group-hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                    {/* 内側グロー - モバイルは常時表示 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-emerald-500/0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                    {/* コーナー装飾 - モバイルは明るい色 */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500 md:border-blue-500/30 md:group-hover:border-blue-500 transition-colors duration-500" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-emerald-500 md:border-emerald-500/30 md:group-hover:border-emerald-500 transition-colors duration-500" />

                    <div className="relative flex flex-col items-center justify-center space-y-8">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="relative w-full max-w-md h-48 flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-2xl blur-xl md:group-hover:blur-2xl transition-all duration-500" />
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="object-contain max-h-full max-w-full drop-shadow-2xl transition-all duration-500 filter brightness-110 md:brightness-95 md:group-hover:brightness-110"
                          sizes="(max-width: 768px) 90vw, 448px"
                        />
                      </motion.div>
                      <div className="text-center">
                        {/* 会社名 - モバイルは常にカラフル、株式会社で改行 */}
                        <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 via-emerald-300 to-blue-300 md:from-white md:via-blue-100 md:to-white bg-clip-text text-transparent md:group-hover:from-blue-300 md:group-hover:via-emerald-300 md:group-hover:to-blue-300 transition-all duration-500">
                          {sponsor.name.includes("株式会社") ? (
                            <>
                              {sponsor.name.replace("株式会社", "")}
                              <br className="md:hidden" />
                              株式会社
                            </>
                          ) : (
                            sponsor.name
                          )}
                        </h3>
                      </div>

                      {/* リンクアイコン - モバイルはエメラルド色 */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-emerald-400 md:text-blue-400 md:group-hover:text-emerald-400 transition-colors duration-300"
                      >
                        <span className="text-sm font-semibold tracking-wide">
                          Visit Website
                        </span>
                        <motion.svg
                          className="w-5 h-5"
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
