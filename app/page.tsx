import { buttonVariants } from "@/components/ui/button";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <div className="md:flex mb-10">
        <section className="mt-20 sm:pb-10">
          <div className="container flex flex-col gap-4 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
              Gabriel Ferreiro
            </h1>
            <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
              Welcome to my blog. I&apos;m Paella or GFerreiro in most places on the internet. I&apos;m a dev, docker enthusiast and a gamer. 
            </p>
            <div className="flex flex-col gap-4 justify-center sm:flex-row">
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-fit"
                )}
              >
                View my blog
              </Link>
              <Link
                href="https://github.gferreiro.com"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-fit"
                )}
              >
                GitHub
              </Link>
            </div>
          </div>
        </section>
        <section className="container max-w-4xl flex flex-col space-y-6 mt-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
            Latest Posts
          </h2>
          <ul className="flex flex-col">
            {latestPosts.map(
              (post) =>
                post.published && (
                  <li
                    key={post.slug}
                  >
                    <PostItem
                      slug={post.slug}
                      title={post.title}
                      description={post.description}
                      date={post.date}
                      tags={post.tags}
                    />
                  </li>
                )
            )}
          </ul>
          <p className="text-xs">I am not a big fan of paella</p>
        </section>
      </div>
    </>
  );
}
