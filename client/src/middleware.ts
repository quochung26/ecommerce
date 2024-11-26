import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";
import { CustomerDataType } from "@/types/customer";

interface CustomerJWTPayload extends JWTPayload {
  customerData: CustomerDataType;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let customerData: CustomerDataType = { isLogin: false, customer: null };
  const cookieStore = request.cookies;
  if (cookieStore.has("customerDataToken")) {
    const { payload }: { payload: CustomerJWTPayload } = await jwtVerify(
      cookieStore.get("customerDataToken")?.value || "",
      new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
    );
    customerData = payload["customerData"];
  }

  if (pathname.startsWith("/customer") && !customerData.isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    (pathname.startsWith("/login") || pathname.startsWith("/register")) &&
    customerData.isLogin
  ) {
    return NextResponse.redirect(new URL("/customer", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/customer/:path*"],
};
