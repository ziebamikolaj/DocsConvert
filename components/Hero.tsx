import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export const Hero = () => (
  <section className="bg-gradient-to-r from-primary to-slate-800 py-20 text-primary-foreground">
    <div className="container mx-auto max-w-6xl px-4 md:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Convert your documents with ease
          </h1>
          <p className="text-lg">
            Our document conversion service makes it simple to convert your
            files to HTML, HTL, and XML formats.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="bg-slate-400 text-black hover:bg-slate-300 hover:text-black">
              Get Started
            </Button>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              Learn More
              <FaChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="/placeholder.svg"
            width={600}
            height={400}
            alt="app preview"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  </section>
);
