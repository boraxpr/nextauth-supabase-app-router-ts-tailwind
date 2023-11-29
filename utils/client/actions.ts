import { ServerActionErrorResult } from "@/types/server";
import { FieldValues, UseFormReturn } from "react-hook-form";

export function handleFormServerActionError<T extends FieldValues>(
  result: ServerActionErrorResult,
  form: UseFormReturn<T>
) {
  if (result.type === "validation") {
    result.errors.forEach((error) => {
      // @ts-ignore
      form.setError(error.field, { message: error.message });
    });
  }
  if (result.type === "auth") {
    if (result.message === "Invalid credentials") {
      // @ts-ignore
      form.setError("email", { message: " " });
      // @ts-ignore
      form.setError("password", { message: result.message });
    } else if (result.message === "Email already exists") {
      // @ts-ignore
      form.setError("email", { message: result.message });
    } else {
      // @ts-ignore
      form.setError("email", { message: result.message });
    }
  }
}
