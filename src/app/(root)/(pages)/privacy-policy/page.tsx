import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import Link from "next/link";
import React from "react";
import { generateSEO } from "@/utils/seo";

export const metadata = generateSEO({
  title: "プライバシーポリシー",
  description:
    "FC.BICHOのプライバシーポリシー（個人情報保護方針）。個人情報の利用目的、管理方法、お問い合わせ対応について詳しく説明します。",
  path: "/privacy-policy",
  keywords: ["プライバシーポリシー", "個人情報保護", "利用規約"],
  noIndex: false,
});

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold mb-4 text-green-900 border-l-4 border-green-500 pl-3">
      {title}
    </h2>
    <div className="text-neutral-600 leading-relaxed text-sm md:text-base">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-green-50 to-white">
      <Header />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-100">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-800">
              プライバシーポリシー
            </h1>
            <p className="text-neutral-500">
              BICHO（以下、「当チーム」）は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全関係者に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。
            </p>
          </div>

          <Section title="個人情報の利用目的">
            <p>
              本ウェブサイトでは、お客様からのお問い合わせ時に、お名前、e-mailアドレス等の個人情報をご登録いただく場合がございますが、これらの個人情報はご提供いただく際の目的以外では利用いたしません。
              <br className="my-2" />
              お預かりした個人情報は、当チームからのご連絡やご質問に対する回答として、電子メールの送付に利用いたします。
            </p>
          </Section>

          <Section title="個人情報の第三者への開示・提供の禁止">
            <p className="mb-4">
              当チームは、お預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>ご本人の同意がある場合</li>
              <li>
                希望されるサービスを行なうために当チームが業務を委託する業者に対して開示する場合
              </li>
              <li>法令に基づき開示することが必要である場合</li>
            </ul>
          </Section>

          <Section title="広告の配信について">
            <p>
              当サイトは第三者配信の広告サービス「Google Adsense
              グーグルアドセンス」を利用する予定です。
              <br className="my-2" />
              広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
              <br className="my-2" />
              Cookie（クッキー）を無効にする設定およびGoogleアドセンスに関する詳細は
              <a
                href="https://policies.google.com/technologies/ads?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline mx-1"
              >
                「Googleポリシーと規約 – 広告」
              </a>
              をご覧ください。
            </p>
          </Section>

          <Section title="免責事項">
            <p>
              当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
              <br className="my-2" />
              当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
              <br className="my-2" />
              当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
          </Section>

          <Section title="お問い合わせ">
            <p className="mb-4">
              当チームの個人情報の取扱に関するお問い合わせは下記までご連絡ください。
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 text-center">
              <p className="mb-4 font-bold text-green-800">
                BICHO お問い合わせ窓口
              </p>
              <Link
                href="/contact"
                className="inline-block bg-green-600 text-white-1 px-8 py-3 rounded-full hover:bg-green-700 transition duration-300 font-semibold shadow-md hover:shadow-lg"
              >
                お問い合わせフォームへ
              </Link>
            </div>
          </Section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
