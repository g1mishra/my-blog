"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// const PATHS = ["/about-us", "/contact-us"];

const PATHS = [
  {
    href: "/about-us",
    label: "About Us",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
  },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="container mx-auto flex items-center px-4 justify-between bg-dark py-7">
      <h1 className="text-xl">
        <Link href="/">My blog</Link>
      </h1>
      <nav>
        <ul className="flex items-center justify-between gap-5">
          {PATHS.map(({ href, label }) => {
            return (
              <li key={href}>
                <Link
                  className={`
                  tex-lg border-b border-transparent
                  ${isActive(href, pathname) ? "font-bold border-b border-white pb-1" : ""}`}
                  href={href}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

const isActive = (href: string, pathname: string) => {
  return href === pathname;
};
