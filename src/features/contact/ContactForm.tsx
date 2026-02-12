"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAgreed) return;

    setStatus("submitting");

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_FORMSPREE_URL || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        },
      );

      if (response.ok) {
        setStatus("success");
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setIsAgreed(false);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white-1 shadow-xl rounded-2xl p-8 border border-green-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-green-800 mb-2"
          >
            お名前 <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="山田太郎"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-green-800 mb-2"
          >
            メールアドレス <span className="text-error">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-green-800 mb-2"
          >
            件名 <span className="text-error">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2316a34a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value="" disabled>
              件名を選択してください
            </option>
            <option value="新規加入">入団希望・練習体験について</option>
            <option value="練習試合">練習試合の申し込み</option>
            <option value="スポンサー依頼">
              パートナーシップ・協賛について
            </option>
            <option value="その他">その他のお問い合わせ</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-green-800 mb-2"
          >
            メッセージ <span className="text-error">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
            placeholder="お問い合わせ内容をご記入ください"
          />
        </div>

        {/* プライバシーポリシー同意 */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="privacy-policy"
              name="privacy-policy"
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="privacy-policy"
              className="font-medium text-neutral-700 cursor-pointer"
            >
              <Link
                href="/privacy-policy"
                target="_blank"
                className="text-green-600 hover:text-green-700 underline mr-1"
              >
                プライバシーポリシー
              </Link>
              に同意する
            </label>
            <p className="text-neutral-500 text-xs mt-1">
              送信前にプライバシーポリシーをご確認ください。
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "submitting" || !isAgreed}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white-1 font-semibold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-md hover:shadow-lg disabled:from-neutral-300 disabled:to-neutral-300 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {status === "submitting" ? "送信中..." : "送信する"}
        </button>

        {status === "success" && (
          <div className="bg-green-50 border-2 border-green-200 text-green-800 px-5 py-4 rounded-lg font-medium">
            ✓ お問い合わせありがとうございます。メッセージを送信しました。
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-5 py-4 rounded-lg font-medium">
            ✗ 送信に失敗しました。もう一度お試しください。
          </div>
        )}
      </form>
    </div>
  );
}
