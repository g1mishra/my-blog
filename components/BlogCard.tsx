import Image from "next/image";
import React from "react";
import ArrowIcon from "./icons/Arrow.icon";
import Link from "next/link";

export interface BlogCardProps {
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  tags: string[];
  href: string;

  //   type: "1" | "1:2" | "1:2/1";
  type?: "top-bottom" | "left-right" | "top-bottom/left-right";
}

const chipColors = [
  "text-[#6941C6]",
  "text-[#3538CD]",
  "text-[#C11574]",
  "text-[#027A48]",
  "text-pink-700",
];

const BlogCard = ({
  title,
  href,
  description,
  coverImage,
  publishedAt,
  tags,
  type = "top-bottom",
}: BlogCardProps) => {
  if (!title) return null;
  return (
    <Link
      href={href}
      className={`w-full h-full gap-6 ${getContainerClass(type)}`}
    >
      <Image
        src={coverImage}
        alt={title}
        width={600}
        height={300}
        className={`w-full object-cover object-center max-h-[300px] flex-1 ${
          type === "left-right"
            ? "h-full"
            : type === "top-bottom"
            ? "h-1/2"
            : ""
        }`}
      />
      <div className="flex flex-col flex-1">
        <span
          className={`text-sm font-semibold text-[#6941C6] font-inter ${
            type === "left-right" ? "" : "mt-8"
          }`}
        >
          {publishedAt}
        </span>
        <h3 className="text-white font-inter text-2xl font-semibold text-left flex justify-between mt-3">
          {title} <ArrowIcon />
        </h3>
        <p className="mt-3 font-normal text-base text-gray line-clamp-3">
          {description}
        </p>
        <ul className="flex mt-6 gap-2  flex-wrap">
          {tags?.map(({ label, value }: any, index) => (
            <li
              className={`py-0.5 px-2.5 bg-white rounded-full font-medium capitalize text-sm ${chipColors[index]}`}
              key={label}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default BlogCard;

const getContainerClass = (type: BlogCardProps["type"]) => {
  switch (type) {
    case "top-bottom":
      return "flex flex-col justify-between";
    case "left-right":
      return "flex flex-col sm:flex-row justify-between";
    case "top-bottom/left-right":
      return "flex flex-col xl:flex-row justify-between";
    default:
      return "";
  }
};
