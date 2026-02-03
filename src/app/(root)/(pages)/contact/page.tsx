import ContactForm from "@/features/contact/ContactForm";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

export const metadata = {
  title: "お問い合わせ | BICHO",
  description: "BICHOへのお問い合わせフォーム",
};

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
