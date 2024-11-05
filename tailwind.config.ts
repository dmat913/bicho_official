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
        black: {
          1: "#333333",
          2: "#4A4A4A",
        },
        line: {
          1: "#6b756b",
        },
        text: {
          1: "#333333",
        },
        gray: {
          1: "#e5e7eb",
          2: "#6B7280",
        },
      },
      animation: {
        bounceSlow: "bounceSlow 1s infinite",
        // movePattern: "movePattern 8s ease-in-out forwards",
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
        // movePattern: {
        //   "0%": { transform: "translate(0, 0)" },
        //   "20%": { transform: "translate(120px, 0)" },
        //   "40%": { transform: "translate(120px, 20px)" },
        //   "60%": { transform: "translate(170px, 20px)" },
        //   "80%": { transform: "translate(170px, -14px)" },
        //   "100%": { transform: "translate(210px, -14px)" },
        // },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(135deg, rgba(0, 51, 32, 1) 0%, rgba(0, 122, 77, 1) 50%, rgba(0, 51, 32, 1) 50%, rgba(0, 51, 32, 1) 100%)",
      },
      width: {
        "profile-width-default": "calc(50% - 8px)",
        "lg-profile-width": "calc(33% - 8px)",
      },
    },
  },
  plugins: [],
};
export default config;
