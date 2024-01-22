import BlogCard, { BlogCardProps } from "@/components/BlogCard";
import { getDocuments, load } from "outstatic/server";
import React from "react";

// const recentBlogPosts: BlogCardProps[] = [
//   {
//     title: "UX review presentations",
//     description:
//       "How do you create compelling presentations that wow your colleagues and impress your managers?",
//     image: "/images/blog_1.jpeg",
//     date: "2021-10-01",

//     tags: ["design", "research", "presentation"],
//     type: "top-bottom",
//   },
//   {
//     title: "Migrating to Linear 101",
//     description:
//       "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...",
//     image: "/images/blog_2.jpeg",
//     date: "2021-10-02",

//     tags: ["design", "research"],
//     type: "left-right",
//   },
//   {
//     title: "My Third Blog Post",
//     description: "This is my third blog post",
//     image: "/images/blog_3.jpeg",
//     date: "2021-10-03",
//     tags: ["third", "post"],
//     type: "left-right",
//   },
//   {
//     title: "My Fourth Blog Post",
//     description:
//       "A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.",
//     image: "/images/blog_1.jpeg",
//     date: "2021-10-04",
//     tags: ["fourth", "post"],
//     type: "top-bottom/left-right",
//   },
// ];

// const allBlogPosts: BlogCardProps[] = [
//   {
//     title: "UX review presentations",
//     description:
//       "How do you create compelling presentations that wow your colleagues and impress your managers?",
//     image: "/images/blog_1.jpeg",
//     date: "2021-10-01",

//     tags: ["design", "research", "presentation"],
//   },
//   {
//     title: "Migrating to Linear 101",
//     description:
//       "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...",
//     image: "/images/blog_2.jpeg",
//     date: "2021-10-02",

//     tags: ["design", "research"],
//   },
//   {
//     title: "My Third Blog Post",
//     description: "This is my third blog post",
//     image: "/images/blog_3.jpeg",
//     date: "2021-10-03",
//     tags: ["third", "post"],
//   },
//   {
//     title: "My Fourth Blog Post",
//     description:
//       "A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.",
//     image: "/images/blog_1.jpeg",
//     date: "2021-10-04",
//     tags: ["fourth", "post"],
//   },
//   {
//     title: "My Fifth Blog Post",
//     description:
//       "A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.",
//     image: "/images/blog_2.jpeg",
//     date: "2021-10-05",
//     tags: ["fifth", "post"],
//   },
// ];

async function getData(skip: number = 0, limit: number = 4) {
  const db = await load();
  const posts = await db
    .find(
      {
        collection: "blogs",
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
        "tags",
      ]
    )
    .sort({ publishedAt: -1 })
    // .skip(skip)
    // .limit(limit)
    .toArray();

  return posts;
}

const Home = async () => {
  const recentBlogPosts = await getData(0, 4);
  const allBlogPosts = (await getData(4, 15)) || [];

  return (
    <main className="container mx-auto px-4 sm:px-0">
      <h1 className="uppercase font-bold text-[70px] sm:text-[160px] xl:text-[243px] border-y text-center border-white mt-6 leading-none">
        My Blog
      </h1>
      <section className="py-8 flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">Recent blog posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {recentBlogPosts?.map((post: any, index) => (
            <div
              key={post.title}
              className={`${
                index === 0
                  ? "row-span-2"
                  : index < 3
                  ? "col-span-1"
                  : "col-span-2"
              } `}
            >
              <BlogCard
                href={`/blogs/${post?.slug}`}
                type={
                  index === 0
                    ? "top-bottom"
                    : index < 3
                    ? "left-right"
                    : "top-bottom/left-right"
                }
                {...post}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 flex flex-col gap-8">
        <h2 className="text-2xl font-semibold">All blog posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {[allBlogPosts, ...allBlogPosts]?.map((post: any, index) => (
            <BlogCard
              href={`/blogs/${post?.slug}`}
              key={post?.title}
              type="top-bottom"
              {...post}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
