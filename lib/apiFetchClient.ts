"use client";

import Cookies from "js-cookie";

export const apiFetchClient = async (
  url: string,
  options: RequestInit = {},
) => {
  const auth = Cookies.get("Authorization");
  if (!auth) {
    throw new Error("No authorization token found");
  }
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `${auth}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return res.json();
};
