import { env } from "@/env";

const apiUrl = env.NEXT_PUBLIC_API_URL;

export const LOGIN_URL = `${apiUrl}/auth/login`;
