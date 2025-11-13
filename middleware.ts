import { NextRequest, NextResponse } from "next/server";

import { apiFetchServer } from "./lib/apiFetchServer";

const LOGIN = "/auth/login";
const HOME = "/";

const checkIsLogged = async () => {
  try {
    const res = await apiFetchServer("/api/Users/me");
    return res.ok;
  } catch (error) {
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const isLoggedIn = await checkIsLogged();
  const requestPath = request.nextUrl.pathname;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  if (isLoggedIn && (requestPath === "/" || requestPath.includes("/auth"))) {
    return NextResponse.redirect(new URL(HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/convert"],
};
