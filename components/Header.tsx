import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => (
  <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2">
        <Image width={48} height={48} src="/icon.png" alt="logo"></Image>
        <span className="font-bold">DocsConvert</span>
      </Link>
      <nav className="hidden items-center gap-4 md:flex">
        {["Features", "Pricing", "About", "Contact"].map((item) => (
          <Link
            key={item}
            href={"/" + item.toLowerCase()}
            className="text-sm font-medium hover:underline"
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link href="/login" className="text-sm font-medium hover:underline">
          Login
        </Link>
        <Link
          href="/sign-up"
          className="pl-4 text-sm font-medium hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  </header>
);
