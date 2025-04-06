"use server";

import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return accessToken;
};
