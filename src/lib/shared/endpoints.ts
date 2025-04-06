import { env } from "@/env";

const apiUrl = env.NEXT_PUBLIC_API_URL;

// auth endpoints
export const LOGIN_URL = `${apiUrl}/auth/login`;
export const LOGOUT_URL = `${apiUrl}/auth/logout`;
export const FORGOT_PASSWORD_URL = `${apiUrl}/auth/forgot-password`;
export const RESET_PASSWORD_URL = `${apiUrl}/auth/reset-password`;

// url to refresh the access token
export const REFRESH_TOKEN_URL = `${apiUrl}/auth/refresh-token`;
