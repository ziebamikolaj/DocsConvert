import type { ReactNode } from "react";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const footerData = {
  DocsConvert: [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Resources: [
    { name: "Blog", href: "/resources/blog" },
    { name: "Support", href: "/resources/support" },
    { name: "FAQ", href: "/resources/faq" },
  ],
  Legal: [
    { name: "Terms of Service", href: "/legal/tos" },
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Cookie Policy", href: "/legal/cookie-policy" },
  ],
  "Follow Us": [
    { name: "Twitter", href: "#", icon: <FaTwitter className="h-5 w-5" /> },
    {
      name: "Facebook",
      href: "https://www.facebook.com/DocsConvert/",
      icon: <FaFacebook className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/docsconvert",
      icon: <FaLinkedin className="h-5 w-5" />,
    },
  ],
};

export const Footer = () => (
  <footer className="sticky z-50 bg-muted py-8">
    <div className="container mx-auto max-w-6xl px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.entries(footerData).map(([section, links]) => (
          <div key={section} className="space-y-2">
            <h4 className="text-lg font-bold">{section}</h4>
            {section === "Follow Us" ? (
              <div className="flex items-center gap-2">
                {links.map(
                  ({
                    name,
                    href,
                    icon,
                  }: {
                    name: string;
                    href: string;
                    icon?: ReactNode;
                  }) => (
                    <Link
                      key={name}
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      {icon}
                    </Link>
                  ),
                )}
              </div>
            ) : (
              <ul className="space-y-1">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="text-sm hover:underline"
                      prefetch={false}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  </footer>
);
