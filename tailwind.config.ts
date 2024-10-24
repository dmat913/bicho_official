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
          1: "#003320",
          2: "#007A4D",
          3: "#006036",
          4: "#002911",
        },
        white: {
          1: "#FFF8E7",
          2: "#FFFFFF",
        },
        line: {
          1: "#6b756b",
        },
      },
      animation: {
        bounceSlow: "bounceSlow 1s infinite",
      },
      keyframes: {
        bounceSlow: {
          "0%, 100%": {
            transform: "translateY(-15%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
