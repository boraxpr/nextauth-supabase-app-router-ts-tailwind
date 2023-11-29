import {
  ServerActionErrorAuthResult,
  ServerActionErrorValidationResult,
} from "@/types/server";
import { ZodError } from "zod";

export const createServerActionValidationError = (
  errors: ZodError | Array<{ field: string; message: string }>
): ServerActionErrorValidationResult => ({
  status: "error",
  type: "validation",
  errors:
    errors instanceof ZodError
      ? errors.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }))
      : errors,
});

export const createServerActionAuthError = (
  message: string
): ServerActionErrorAuthResult => ({
  status: "error",
  type: "auth",
  message: message,
});
