import axios from "axios";
import { z } from "zod";

export function displayError(
  error: unknown,
  defaultMessage: string = "Network error, please try again later.",
) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => issue.message).join("\n");
  }

  if (axios.isAxiosError(error)) {
    return error.response
      ? error.response.data.message || defaultMessage
      : error.message;
  }
}
