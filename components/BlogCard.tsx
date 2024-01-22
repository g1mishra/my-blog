import Image from "next/image";
import React from "react";
import ArrowIcon from "./icons/Arrow.icon";

export interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];

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
  description,
  image,
  date,
  tags,
  type = "top-bottom",
}: BlogCardProps) => {
  return (
    <div className={`w-full h-full gap-6 ${getContainerClass(type)}`}>
      <Image
        src={image}
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
        <span className="text-sm font-semibold text-[#6941C6] font-inter mt-8">
          {date}
        </span>
        <h3 className="text-white font-inter text-2xl font-semibold whitespace-nowrap text-center flex justify-between mt-3">
          {title} <ArrowIcon />
        </h3>
        <p className="mt-3 font-normal text-base text-gray">{description}</p>
        <ul className="flex mt-6 gap-2">
          {tags.map((tag, index) => (
            <li
              className={`py-0.5 px-2.5 bg-white rounded-full font-medium capitalize text-sm ${chipColors[index]}`}
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
