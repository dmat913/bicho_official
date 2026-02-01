import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // メインカラー：緑を基調とした現代的なパレット
        green: {
          50: "#f0fdf4", // 最も薄い緑 - 背景やハイライト用
          100: "#dcfce7", // 薄い緑 - カード背景
          200: "#bbf7d0", // ライトグリーン - アクセント
          300: "#86efac", // ミディアムライトグリーン
          400: "#4ade80", // ブライトグリーン - プライマリアクション
          500: "#22c55e", // メイングリーン - ブランドカラー
          600: "#16a34a", // ダークグリーン - ホバー効果
          700: "#15803d", // より濃いグリーン
          800: "#166534", // 最も濃いグリーン - テキスト
          900: "#14532d", // 最も暗いグリーン
          // 従来の色も互換性のため維持
          1: "#14532d", // 旧green-1 → green-900
          2: "#22c55e", // 旧green-2 → green-500
          3: "#16a34a", // 旧green-3 → green-600
          4: "#166534", // 旧green-4 → green-800
        },
        // ニュートラルカラー：現代的なグレースケール
        neutral: {
          50: "#fafafa", // 最も薄いグレー
          100: "#f5f5f5", // 背景用薄いグレー
          200: "#e5e5e5", // ボーダー用
          300: "#d4d4d4", // 無効化要素
          400: "#a3a3a3", // プレースホルダー
          500: "#737373", // セカンダリテキスト
          600: "#525252", // プライマリテキスト
          700: "#404040", // ヘッドライン
          800: "#262626", // 強調テキスト
          900: "#171717", // 最も暗いテキスト
        },
        // アクセントカラー
        accent: {
          gold: "#fbbf24", // 現代的なゴールド
          orange: "#f97316", // エネルギッシュなオレンジ
          blue: "#3b82f6", // 信頼感のあるブルー
          red: "#ef4444", // 警告・エラー用
        },
        // セマンティックカラー
        success: "#22c55e", // 成功
        warning: "#f59e0b", // 警告
        error: "#ef4444", // エラー
        info: "#3b82f6", // 情報
        // 旧カラーとの互換性維持
        white: {
          1: "#fafafa", // 旧white-1 → neutral-50ベース
          2: "#ffffff", // 純白維持
        },
        black: {
          1: "#404040", // 旧black-1 → neutral-700
          2: "#525252", // 旧black-2 → neutral-600
        },
        line: {
          1: "#d4d4d4", // 旧line-1 → neutral-300
        },
        text: {
          1: "#404040", // 旧text-1 → neutral-700
        },
        gray: {
          1: "#e5e5e5", // 旧gray-1 → neutral-200
          2: "#737373", // 旧gray-2 → neutral-500
        },
        gold: {
          1: "#fbbf24", // 旧gold-1 → accent.gold
        },
      },
      // 現代的なフォントファミリー
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"], // ヘッドライン用
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      // レスポンシブなフォントサイズ
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      // 現代的なスペーシングシステム
      spacing: {
        "18": "4.5rem", // 72px
        "88": "22rem", // 352px
        "128": "32rem", // 512px
        "144": "36rem", // 576px
      },
      // 現代的なアニメーション
      animation: {
        // 既存のアニメーション
        bounceSlow: "bounceSlow 1s infinite",
        // 新しいモダンなアニメーション
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "gradient-flow": "gradientFlow 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        leagueMarquee: "leagueMarquee 10s linear infinite",
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
        // 新しいモダンなキーフレーム
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(34, 197, 94, 0.2), 0 0 10px rgba(34, 197, 94, 0.1)",
          },
          "100%": {
            boxShadow:
              "0 0 20px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.2)",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        leagueMarquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      backgroundImage: {
        // 既存のグラデーション
        "custom-gradient":
          "linear-gradient(135deg, rgba(0, 51, 32, 1) 0%, rgba(0, 122, 77, 1) 50%, rgba(0, 51, 32, 1) 50%, rgba(0, 51, 32, 1) 100%)",
        // 新しいモダンなグラデーション
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "green-aurora":
          "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #22c55e 100%)",
        "green-mesh":
          "linear-gradient(45deg, #22c55e 0%, #16a34a 25%, #15803d 50%, #166534 75%, #14532d 100%)",
        "green-subtle": "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        "green-vibrant":
          "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)",
        "hero-gradient":
          "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
      // 現代的なシャドウシステム
      boxShadow: {
        // 既存のシャドウはそのまま
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
        // 新しいカスタムシャドウ
        soft: "0 2px 15px 0 rgb(0 0 0 / 0.08)",
        medium: "0 4px 20px 0 rgb(0 0 0 / 0.12)",
        strong: "0 8px 30px 0 rgb(0 0 0 / 0.16)",
        "green-glow": "0 0 20px rgba(34, 197, 94, 0.3)",
        "green-soft": "0 4px 14px 0 rgba(34, 197, 94, 0.15)",
        "card-hover": "0 10px 40px rgba(0, 0, 0, 0.1)",
        "button-hover": "0 4px 14px 0 rgba(34, 197, 94, 0.39)",
      },
      // 現代的なボーダーラジアス
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
        // 新しいカスタムラジアス
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      width: {
        // 既存のカスタム幅
        "profile-width-default": "calc(50% - 8px)",
        "lg-profile-width": "calc(33% - 8px)",
        // 新しいレスポンシブ幅
        content: "calc(100% - 2rem)",
        "content-lg": "calc(100% - 4rem)",
        "card-sm": "calc(100% - 1rem)",
        "card-md": "calc(50% - 0.75rem)",
        "card-lg": "calc(33.333% - 0.667rem)",
        "card-xl": "calc(25% - 0.75rem)",
      },
      // 現代的なマックス幅
      maxWidth: {
        none: "none",
        "0": "0rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        prose: "65ch",
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
        // カスタムマックス幅
        container: "1200px",
        content: "800px",
      },
    },
  },
  plugins: [],
};
export default config;
