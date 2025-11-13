"use client";

import type { UserInfo } from "@/types/userInfo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import NotFound from "../not-found";

const Home = () => {
  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["isLoggedIn"],
  });
  if (!userInfo) return <NotFound />;
  return (
    <div className="flex min-h-[calc(100vh-236px-65px)] items-start justify-center bg-gradient-to-b from-background to-background/80 p-8">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Convert Your Documents
          </h1>
          <p className="mt-4 text-muted-foreground">
            Our document conversion service makes it easy to convert your files
            to the format you need.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/convert" className="w-full py-2">
                Convert Document
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <aside className="hidden w-72 flex-col gap-4 bg-muted p-6 md:flex">
        <div className="flex items-center gap-4">
          <Avatar className="grid place-items-center">
            <FaRegUser />
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">{userInfo.email}</p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Subscription</p>
            <p className="text-sm text-muted-foreground">
              {userInfo.subscriptionTier}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Conversion Limit</p>
            <p className="text-sm text-muted-foreground">100 per month</p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Change Email
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Change Password
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Upgrade Subscription
          </Link>
        </div>
      </aside>
    </div>
  );
};
export default Home;
