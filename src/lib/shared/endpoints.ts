import { env } from "@/env";

const apiUrl = env.NEXT_PUBLIC_API_URL;

export const LOGIN_URL = `${apiUrl}/auth/login`;
export const LOGOUT_URL = `${apiUrl}/auth/logout`;

// url to refresh the access token
export const REFRESH_TOKEN_URL = `${apiUrl}/auth/refresh-token`;
