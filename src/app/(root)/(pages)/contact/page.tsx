import ContactForm from "@/features/contact/ContactForm";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { generateSEO } from "@/utils/seo";

export const metadata = generateSEO({
  title: "お問い合わせ",
  description:
    "FC.BICHOへのお問い合わせフォーム。ご質問、ご意見、取材依頼、スポンサー募集など、お気軽にお問い合わせください。",
  path: "/contact",
  keywords: ["お問い合わせ", "コンタクト", "連絡先", "問い合わせフォーム"],
});

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-green-50 to-white">
      <Header />
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4 text-green-800">
              お問い合わせ
            </h1>
            <p className="text-neutral-600 text-lg">
              お気軽にお問い合わせください。
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
