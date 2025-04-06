import jwt from "jsonwebtoken";

import { getToken } from "./token";

export const checkSession = async () => {
  const accessToken = await getToken();

  if (!accessToken) return null;

  const payload = jwt.decode(accessToken) as { exp: number } | null;

  if (!payload || payload.exp * 1000 < Date.now()) {
    return null;
  }

  return payload;
};
