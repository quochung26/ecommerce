"use server";

import { request } from "@/requests/request";
import { cookies } from "next/headers";

export const serverRequest = (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  options?: Omit<RequestInit, "method" | "body">
) => {
  const headers = new Headers(options?.headers);

  const cookieStore = cookies();
  if (cookieStore.has("customerToken")) {
    headers.set(
      "Authorization",
      `Bearer ${cookieStore.get("customerToken")?.value}`
    );
  }

  return request(url, method, body, { ...options, headers });
};
