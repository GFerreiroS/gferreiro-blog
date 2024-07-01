import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import Link from "next/link";
import "@/styles/mdx.css";
import { Tag } from "@/components/tag";
interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-4xl lg:py-10">
      <Link href="/blog">
        <button className="bg-transparent border border-slate-600 text-slate-600 px-4 py-2 rounded hover:bg-violet-900 hover:text-white transition-all duration-300">
          Go back
        </button>
      </Link>
      <h1 className="mb-2 mt-10">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
