import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { REFRESH_TOKEN_URL } from "./lib/shared/endpoints";
import { handleError } from "./lib/shared/handle-error";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  // check if the token is present in the cookies, if not, try to refresh the token
  if (!token) {
    return await handleRefreshToken(req);
  }

  try {
    // decode and verify the token
    const payload = jwt.decode(token) as { exp: number } | null;

    // token is either invalid or expired
    if (!payload || payload.exp * 1000 < Date.now()) {
      return await handleRefreshToken(req);
    }

    // token is valid, proceed to the requested page
    return NextResponse.next();
  } catch (error: unknown) {
    const message = handleError(error, "Invalid or expired token");
    return new NextResponse(message, { status: 401 });
  }
}

// protect all routes except the login page
export const config = {
  matcher: ["/", "/publications/:path*", "/projects/:path*"],
};

/**
 * handler to refresh the access token
 */
async function handleRefreshToken(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const response = await axios.post(REFRESH_TOKEN_URL, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Cookie: `refresh_token=${refreshToken}`,
      },
      withCredentials: true,
    });

    if (response.status < 200 || response.status >= 300) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next(); // proceed to the requested page
  } catch (error) {
    const message = handleError(error, "Invalid or expired token");
    return new NextResponse(message, { status: 401 });
  }
}
