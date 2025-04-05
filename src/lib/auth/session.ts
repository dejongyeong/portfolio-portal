"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const checkSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return null;

  const payload = jwt.decode(accessToken) as { exp: number } | null;

  if (!payload || payload.exp * 1000 < Date.now()) {
    return null;
  }

  return payload;
};
