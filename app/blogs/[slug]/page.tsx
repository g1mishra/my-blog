import Error from "next/error";
import Image from "next/image";
import { getDocumentSlugs, load } from "outstatic/server";
import React from "react";

export async function generateStaticParams() {
  const posts = getDocumentSlugs("blogs");
  return posts.map((slug) => ({ slug }));
}

async function getData(params: any) {
  const db = await load();
  console.log(params);
  const posts = await db
    .find(
      {
        collection: "blogs",
        slug: params?.slug,
        $not: {
          status: "draft",
        },
      },
      [
        "title",
        "publishedAt",
        "description",
        "slug",
        "author",
        "content",
        "coverImage",
      ]
    )
    .first();

  return posts;
}

const BlogDeatils = async ({ params }: any) => {
  const data = await getData(params);
  if (!data) {
    return null;
  }
  return (
    <div className="container mx-auto text-white px-4">
      <div className="flex flex-col gap-2 my-6">
        <h1 className="uppercase font-bold  text-3xl leading-normal">
          {data.title}
        </h1>
        <p>{data.description}</p>
      </div>
      <Image
        priority
        src={data.coverImage || ""}
        alt={data.title}
        width={1000}
        height={1000}
        className="object-contain w-full h-full"
      />
      <article className="prose lg:prose-xl w-full text-white min-w-full mt-8">
        {data.content}
      </article>
    </div>
  );
};

export default BlogDeatils;
