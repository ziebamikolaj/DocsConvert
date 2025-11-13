import React from "react";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

import Providers from "./providers";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "DocsConvert - Convert your documents with ease",
  description:
    "Our subscription-based document conversion service makes it simple to convert your files to HTML, HTL, and XML formats.",
};

interface LayoutProps {
  readonly children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        <Providers>
          <Header />
          {children}
          <Analytics />
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
