import { NextResponse, type NextRequest } from "next/server";
import {
  SHERLOCK_COOKIE_NAME,
  getSherlockAccessToken,
  getSherlockClientIp,
  isSherlockIpAllowed,
} from "@/lib/sherlock";

const isAuthorized = (request: NextRequest) => {
  const ip = getSherlockClientIp(request);

  if (isSherlockIpAllowed(ip)) {
    return true;
  }

  const token = getSherlockAccessToken();

  if (!token) {
    return false;
  }

  return request.cookies.get(SHERLOCK_COOKIE_NAME)?.value === token;
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/badger") {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }

  if (!request.nextUrl.pathname.startsWith("/sherlock")) {
    return NextResponse.next();
  }

  const token = getSherlockAccessToken();
  const urlToken = request.nextUrl.searchParams.get("access");

  if (token && urlToken === token) {
    const response = NextResponse.next();
    response.cookies.set(SHERLOCK_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    return response;
  }

  if (isAuthorized(request)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
}

export const config = {
  matcher: ["/badger", "/sherlock/:path*"],
};
