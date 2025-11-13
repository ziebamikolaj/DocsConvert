import React from "react";

import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";

const Home = async () => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>
    </div>
  );
};
export default Home;
