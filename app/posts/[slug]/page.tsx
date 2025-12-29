import { allPosts } from "content-collections";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path === slug);

  if (!post) notFound();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:py-20">
      <header className="mb-12 ">
        <div className="space-y-4">
          <time className="block text-sm font-medium text-gray-500 uppercase tracking-wide">
            {formattedDate}
          </time>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {post.title}
          </h1>
          <p className="text-gray-500">
            This article was written by{" "}
            <Link className="underline" href={"/"}>
              {post.author}
            </Link>
            .
          </p>
        </div>
      </header>

      <div className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500">
        <MDXContent code={post.mdx} />
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-300">
        <p className="text-gray-600 italic">
          © {new Date().getFullYear()} Ephraim Siegfried, licensed under{" "}
          <Link
            href="https://creativecommons.org/licenses/by-sa/4.0/deed.en"
            className="underline"
          >
            CC BY-SA 4.0
          </Link>
        </p>
      </footer>
    </article>
  );
};

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;

  const post = allPosts.find((p) => p._meta.path === slug);
  if (!post) return;

  return {
    title: post.title,
    description: post.summary,
  };
};

export const dynamicParams = false;

export default PostPage;
