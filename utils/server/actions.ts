import {
  ServerActionErrorAuthResult,
  ServerActionErrorValidationResult,
} from "@/types/server";
import { ZodError } from "zod";

export const createServerActionValidationError = (
  error: ZodError
): ServerActionErrorValidationResult => ({
  status: "error",
  type: "validation",
  errors: error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  })),
});

export const createServerActionAuthError = (): ServerActionErrorAuthResult => ({
  status: "error",
  type: "auth",
  message: "Invalid email or password",
});
