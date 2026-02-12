import { notFound } from "next/navigation";
import { getPostById, blogPosts } from "@/data/posts";
import ArticleTemplate from "@/features/article/components/ArticleTemplate";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

// 静的生成のためのパラメータを生成
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

// メタデータの動的生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostById(params.id);

  if (!post) {
    return {
      title: "記事が見つかりません",
    };
  }

  const thumbnail = post.thumbnail;
  const imageUrl = typeof thumbnail === "string" ? thumbnail : thumbnail.src;

  return {
    title: `${post.title} | FC.BICHO`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const post = getPostById(params.id);

  if (!post) {
    notFound();
  }

  // コンポーネントを変数として取り出す
  const ContentComponent = post.component;

  return (
    <ArticleTemplate
      title={post.title}
      date={post.date}
      category={post.category}
      imagePath={post.thumbnail}
    >
      <ContentComponent />
    </ArticleTemplate>
  );
}
