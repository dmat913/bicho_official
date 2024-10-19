import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          1: "#006036",
          2: "#007A4D",
        },
        white: {
          1: "#FFF8E7",
        },
        line: {
          1: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
