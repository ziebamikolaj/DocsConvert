"use client";

import type { UserInfo } from "@/types/userInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { apiFetchClient } from "@/lib/apiFetchClient";
import { userInfo } from "@/types/userInfo";

const getUserInfo = async () => {
  const res = await apiFetchClient("/api/users/me");

  const validateResponse = userInfo.safeParse(res);

  if (!validateResponse.success) {
    throw new Error("Invalid response");
  }

  const data = validateResponse.data;
  return data;
};

export const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userInfo } = useQuery<UserInfo>({
    queryFn: getUserInfo,
    queryKey: ["isLoggedIn"],
  });

  const handleLogout = async () => {
    Cookies.remove("Authorization");
    queryClient.setQueryData(["isLoggedIn"], false);
    router.push("/");
  };

  return (
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
        {userInfo ? (
          <div className="flex items-center gap-4">
            <Link href="/home" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Button
              className="text-sm font-medium hover:underline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="text-sm font-medium hover:underline"
            >
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              className="pl-4 text-sm font-medium hover:underline"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
