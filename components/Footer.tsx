import React from "react";

const footerLinks = [
  //     © 2023
  // Twitter
  // LinkedIn
  // Email

  {
    href: "https://twitter.com/iamnotstatic",
    label: "Twitter",
  },
  {
    href: "https://www.linkedin.com/in/iamnotstatic/",
    label: "LinkedIn",
  },
  {
    href: "mailto:test@gmail.com",
    label: "Email",
  },
];

const Footer = () => {
  return (
    <footer className="py-8 px-4 container mx-auto">
      <ul className="flex gap-3 items-center">
        <li>© 2023</li>
        {footerLinks.map(({ href, label }) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
